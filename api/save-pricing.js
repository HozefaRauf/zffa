/**
 * Vercel Serverless Function: POST /api/save-pricing
 *
 * Required env vars (set in Vercel dashboard — NOT prefixed with VITE_):
 *   ADMIN_PASSWORD  — plaintext admin password
 *   GITHUB_TOKEN    — Fine-grained PAT with Contents: Read & Write on this repo
 *   GITHUB_OWNER    — GitHub username or org
 *   GITHUB_REPO     — Repository name
 *   GITHUB_BRANCH   — Branch to commit to (e.g. main)
 */

const GITHUB_FILE_PATH = 'src/data/pricingData.js'

function generatePricingFile(categories) {
  return `export const categories = ${JSON.stringify(categories, null, 2)}\n\nexport default categories\n`
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Validate auth
  const auth = req.headers['authorization'] ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Validate body
  const { categories } = req.body ?? {}
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: 'Invalid pricing data' })
  }

  // Trim every value — trailing spaces/newlines from copy-paste are a common cause of 404s
  const GITHUB_TOKEN  = (process.env.GITHUB_TOKEN  || '').trim()
  const GITHUB_OWNER  = (process.env.GITHUB_OWNER  || '').trim()
  const GITHUB_REPO   = (process.env.GITHUB_REPO   || '').trim()
  const GITHUB_BRANCH = (process.env.GITHUB_BRANCH || 'master').trim()

  const missing = []
  if (!GITHUB_TOKEN) missing.push('GITHUB_TOKEN')
  if (!GITHUB_OWNER) missing.push('GITHUB_OWNER')
  if (!GITHUB_REPO) missing.push('GITHUB_REPO')
  if (missing.length) {
    return res.status(500).json({ error: `Missing env vars: ${missing.join(', ')}` })
  }

  const apiBase = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`
  const target = `${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}:${GITHUB_FILE_PATH}`
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  try {
    // Step 1: Get current file SHA (required by GitHub API to update a file)
    const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, { headers })
    if (!getRes.ok) {
      const detail = await getRes.text()
      let hint = ''
      if (getRes.status === 404) hint = ' — check GITHUB_OWNER/GITHUB_REPO/GITHUB_BRANCH spelling, or the token lacks Contents access to this repo.'
      if (getRes.status === 401) hint = ' — GITHUB_TOKEN is invalid or expired.'
      return res.status(502).json({
        error: `GitHub GET ${getRes.status} for ${target}.${hint} [${detail.slice(0, 120)}]`,
      })
    }
    const { sha } = await getRes.json()

    // Step 2: Generate new file content and base64-encode it
    const newContent = generatePricingFile(categories)
    const encoded = Buffer.from(newContent, 'utf8').toString('base64')

    // Step 3: Commit the updated file
    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'chore: update pricing data [admin dashboard]',
        content: encoded,
        sha,
        branch: GITHUB_BRANCH,
      }),
    })

    if (!putRes.ok) {
      const detail = await putRes.text()
      let hint = ''
      if (putRes.status === 403 || putRes.status === 404) hint = ' — the token needs Contents: Read AND Write permission on this repo.'
      return res.status(502).json({
        error: `GitHub PUT ${putRes.status} for ${target}.${hint} [${detail.slice(0, 120)}]`,
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message ?? 'Unexpected error' })
  }
}
