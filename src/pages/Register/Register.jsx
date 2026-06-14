import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.js'
import { PrimaryButton } from '../../components/Buttons/Buttons.jsx'
import useAuthStore from '../../store/authStore.js'
import './Register.scss'

export default function Register() {
  const navigate = useNavigate()
  const setAuth  = useAuthStore(s => s.setAuth)

  const [step, setStep]         = useState(1)
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [code, setCode]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleRegister = async e => {
    e.preventDefault()
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

  const handleVerify = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authApi.verifyEmail(email, code)
      setAuth(data.data.user, data.data.accessToken)
      navigate('/')
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
    <>
      <Helmet>
        <title>Register — Abect Dev Tools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="Register">
        <div className="Register__card">
          <h1 className="Register__title">
            {step === 1 ? 'Create account' : 'Check your email'}
          </h1>
          <p className="Register__sub">
            {step === 1 ? 'Free plan — 100 tokens/month' : `We sent a code to ${email}`}
          </p>

          {step === 1 && (
            <form className="Register__form" onSubmit={handleRegister}>
              <div className="Register__field">
                <label className="Register__label" htmlFor="reg-name">Your name</label>
                <input
                  id="reg-name"
                  className="Register__input"
                  type="text"
                  placeholder="First name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="Register__field">
                <label className="Register__label" htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  className="Register__input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="Register__field">
                <label className="Register__label" htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  className="Register__input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="Register__field">
                <label className="Register__label" htmlFor="reg-confirm">Confirm password</label>
                <input
                  id="reg-confirm"
                  className="Register__input"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />
              </div>
              {error && <p className="Register__error">{error}</p>}
              <PrimaryButton type="submit" loading={loading} loadingText="Creating account…" fullWidth>
                Create account
              </PrimaryButton>
            </form>
          )}

          {step === 2 && (
            <form className="Register__form" onSubmit={handleVerify}>
              <p className="Register__hint">Enter the 6-digit code from your email</p>
              <input
                className="Register__input Register__input--code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                autoFocus
                maxLength={6}
              />
              {error && <p className="Register__error">{error}</p>}
              <PrimaryButton type="submit" loading={loading} loadingText="Verifying…" fullWidth>
                Verify email
              </PrimaryButton>
              <button type="button" className="Register__resend" onClick={handleResend}>
                Resend code
              </button>
            </form>
          )}

          <p className="Register__switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  )
}
