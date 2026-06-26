import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { setSession, getSession } from './hooks/useAdminSession'

const ADMIN_HASH = import.meta.env.VITE_ADMIN_HASH ?? ''

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  // Already logged in
  if (getSession()) {
    navigate('/admin', { replace: true })
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!password || loading) return
    setLoading(true)
    setError('')

    // bcryptjs.compare is async
    const match = await bcrypt.compare(password, ADMIN_HASH)

    if (match) {
      setSession(password)
      navigate('/admin', { replace: true })
    } else {
      setPassword('')
      setError('Incorrect password.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      inputRef.current?.focus()
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div
        className={`w-full max-w-sm ${shake ? 'animate-shake' : ''}`}
        style={shake ? { animation: 'shake 0.4s ease' } : {}}
      >
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-rose-600 text-white">
            <Lock size={22} />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900">Admin Access</h1>
          <p className="mt-1 text-sm text-slate-500">ZFFA Trading — Pricing Dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field pr-10"
                placeholder="Enter admin password"
                autoFocus
                autoComplete="current-password"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!password || loading}
            className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white
              transition-all hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
          >
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          This page is not linked from the public site.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  )
}
