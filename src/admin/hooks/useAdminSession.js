const SESSION_KEY = 'zffa_admin'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session.ok || !session.exp || Date.now() > session.exp) {
      sessionStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function setSession(password) {
  const session = { ok: true, exp: Date.now() + SESSION_DURATION, password }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getSessionPassword() {
  return getSession()?.password ?? null
}
