/**
 * Run once to generate the bcrypt hash for your admin password.
 * Usage: node scripts/generate-hash.mjs yourpassword
 * Copy the printed hash into VITE_ADMIN_HASH in your Vercel env vars.
 */
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/generate-hash.mjs <your-password>')
  process.exit(1)
}

const hash = bcrypt.hashSync(password, 12)
console.log('\nBcrypt hash (paste this as VITE_ADMIN_HASH in Vercel):\n')
console.log(hash)
console.log()
