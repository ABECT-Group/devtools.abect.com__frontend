import { useEffect, useRef, useState } from 'react'
import { authApi } from '../../api/auth.js'
import { userApi } from '../../api/user.js'
import useAuthStore from '../../store/authStore.js'
import { PrimaryButton } from '../Buttons/Buttons.jsx'
import './AuthModal.scss'

export default function AuthModal() {
  const authModalOpen = useAuthStore(s => s.authModalOpen)
  const closeAuthModal = useAuthStore(s => s.closeAuthModal)
  const setAuth = useAuthStore(s => s.setAuth)

  const [tab, setTab]         = useState('login')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [code, setCode]       = useState('')
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const overlayRef = useRef(null)

  useEffect(() => {
    if (authModalOpen) {
      setTab('login')
      setStep(1)
      setEmail('')
      setPassword('')
      setConfirm('')
      setCode('')
      setError('')
    }
  }, [authModalOpen])

  useEffect(() => {
    if (!authModalOpen) return
    const onKey = e => { if (e.key === 'Escape') closeAuthModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [authModalOpen, closeAuthModal])

  if (!authModalOpen) return null

  const handleOverlayClick = e => {
    if (e.target === overlayRef.current) closeAuthModal()
  }

  const switchTab = t => {
    setTab(t)
    setStep(1)
    setError('')
    setEmail('')
    setPassword('')
    setConfirm('')
    setCode('')
  }

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authApi.login(email, password)
      setAuth(data.data.user, data.data.accessToken)
      closeAuthModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterStep1 = async e => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setError('')
    setLoading(true)
    try {
      await authApi.register(email, password)
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authApi.verifyEmail(email, code)
      setAuth(data.data.user, data.data.accessToken)
      closeAuthModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try { await authApi.resendCode(email) } catch {}
  }

  return (
    <div className="AuthModal" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="AuthModal__card">
        <button className="AuthModal__close" onClick={closeAuthModal} aria-label="Close">✕</button>

        <div className="AuthModal__tabs">
          <button
            className={`AuthModal__tab${tab === 'login' ? ' AuthModal__tab--active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Log in
          </button>
          <button
            className={`AuthModal__tab${tab === 'register' ? ' AuthModal__tab--active' : ''}`}
            onClick={() => switchTab('register')}
          >
            Register
          </button>
        </div>

        {tab === 'login' && (
          <form className="AuthModal__form" onSubmit={handleLogin}>
            <input
              className="AuthModal__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <input
              className="AuthModal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <p className="AuthModal__error">{error}</p>}
            <PrimaryButton loading={loading} loadingText="Logging in…" fullWidth>
              Log in
            </PrimaryButton>
            <a
              href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
              className="AuthModal__google"
            >
              Sign in with Google
            </a>
          </form>
        )}

        {tab === 'register' && step === 1 && (
          <form className="AuthModal__form" onSubmit={handleRegisterStep1}>
            <input
              className="AuthModal__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <input
              className="AuthModal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              className="AuthModal__input"
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
            {error && <p className="AuthModal__error">{error}</p>}
            <PrimaryButton loading={loading} loadingText="Creating account…" fullWidth>
              Create account
            </PrimaryButton>
          </form>
        )}

        {tab === 'register' && step === 2 && (
          <form className="AuthModal__form" onSubmit={handleVerify}>
            <p className="AuthModal__hint">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
            <input
              className="AuthModal__input AuthModal__input--code"
              type="text"
              placeholder="000000"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              autoFocus
              maxLength={6}
            />
            {error && <p className="AuthModal__error">{error}</p>}
            <PrimaryButton loading={loading} loadingText="Verifying…" fullWidth>
              Verify email
            </PrimaryButton>
            <button type="button" className="AuthModal__resend" onClick={handleResend}>
              Resend code
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
