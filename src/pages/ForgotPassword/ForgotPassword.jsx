import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.js'
import { PrimaryButton } from '../../components/Buttons/Buttons.jsx'
import './ForgotPassword.scss'

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [step, setStep]       = useState(1)
  const [email, setEmail]     = useState('')
  const [code, setCode]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSend = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.forgotPassword(email)
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
      const data = await authApi.verifyResetCode(email, code)
      navigate(`/reset-password?token=${data.data.resetToken}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot password — Abect Dev Tools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="ForgotPassword">
        <div className="ForgotPassword__card">
          <h1 className="ForgotPassword__title">
            {step === 1 ? 'Forgot password' : 'Enter the code'}
          </h1>
          <p className="ForgotPassword__sub">
            {step === 1
              ? "Enter your email and we'll send a reset code"
              : `We sent a 6-digit code to ${email}`}
          </p>

          {step === 1 && (
            <form className="ForgotPassword__form" onSubmit={handleSend}>
              <div className="ForgotPassword__field">
                <label className="ForgotPassword__label" htmlFor="fp-email">Email</label>
                <input
                  id="fp-email"
                  className="ForgotPassword__input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              {error && <p className="ForgotPassword__error">{error}</p>}
              <PrimaryButton type="submit" loading={loading} loadingText="Sending…" fullWidth>
                Send reset code
              </PrimaryButton>
            </form>
          )}

          {step === 2 && (
            <form className="ForgotPassword__form" onSubmit={handleVerify}>
              <input
                className="ForgotPassword__input ForgotPassword__input--code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                autoFocus
                maxLength={6}
              />
              {error && <p className="ForgotPassword__error">{error}</p>}
              <PrimaryButton type="submit" loading={loading} loadingText="Verifying…" fullWidth>
                Verify code
              </PrimaryButton>
            </form>
          )}

          <Link to="/login" className="ForgotPassword__back">← Back to login</Link>
        </div>
      </div>
    </>
  )
}
