import { useState } from 'react'
import { authApi } from '../../api/auth.js'
import useAuthStore from '../../store/authStore.js'
import { PrimaryButton } from '../Buttons/Buttons.jsx'
import './AuthForms.scss'

export default function RegisterForm({ onSuccess, footer, showHeading = true }) {
  const setAuth = useAuthStore(s => s.setAuth)

  const [step,     setStep]     = useState(1)
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [code,     setCode]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleRegister(e) {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    setError('')
    setLoading(true)
    try {
      await authApi.register(email, password, name.trim() || undefined)
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authApi.verifyEmail(email, code)
      setAuth(data.data.user, data.data.accessToken)
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    try { await authApi.resendCode(email) } catch {}
  }

  return (
    <div className="AuthForm">
      {showHeading && (
        <div className="AuthForm__header-block">
          <h1 className="AuthForm__heading">
            {step === 1 ? 'Create account' : 'Check your email'}
          </h1>
          <p className="AuthForm__sub">
            {step === 1
              ? 'Free plan — 100K tokens / month'
              : `We sent a code to ${email}`
            }
          </p>
        </div>
      )}

      {step === 1 ? (
        <form className="AuthForm__form" onSubmit={handleRegister}>
          <div className="AuthForm__field">
            <label className="AuthForm__label" htmlFor="rf-name">Your name</label>
            <input
              id="rf-name"
              className="AuthForm__input"
              type="text"
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="AuthForm__field">
            <label className="AuthForm__label" htmlFor="rf-email">Email</label>
            <input
              id="rf-email"
              className="AuthForm__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="AuthForm__field">
            <label className="AuthForm__label" htmlFor="rf-password">Password</label>
            <input
              id="rf-password"
              className="AuthForm__input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="AuthForm__field">
            <label className="AuthForm__label" htmlFor="rf-confirm">Confirm password</label>
            <input
              id="rf-confirm"
              className="AuthForm__input"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <p className="AuthForm__error">{error}</p>}
          <PrimaryButton type="submit" loading={loading} loadingText="Creating account…" fullWidth>
            Create account
          </PrimaryButton>
          <p className="AuthForm__fine-print">No credit card required.</p>
        </form>
      ) : (
        <form className="AuthForm__form" onSubmit={handleVerify}>
          <p className="AuthForm__hint">
            Enter the 6-digit code we sent to <strong>{email}</strong>
          </p>
          <input
            className="AuthForm__input AuthForm__input--code"
            type="text"
            placeholder="000000"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            autoFocus
            maxLength={6}
          />
          {error && <p className="AuthForm__error">{error}</p>}
          <PrimaryButton type="submit" loading={loading} loadingText="Verifying…" fullWidth>
            Verify email
          </PrimaryButton>
          <button type="button" className="AuthForm__resend" onClick={handleResend}>
            Resend code
          </button>
        </form>
      )}

      {footer}
    </div>
  )
}
