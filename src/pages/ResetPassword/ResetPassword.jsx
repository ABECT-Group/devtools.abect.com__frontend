import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../../api/auth.js'
import { PrimaryButton } from '../../components/Buttons/Buttons.jsx'
import './ResetPassword.scss'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const resetToken = params.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState(false)

  useEffect(() => {
    if (!resetToken) navigate('/forgot-password')
  }, [resetToken, navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setError('')
    setLoading(true)
    try {
      await authApi.resetPassword(resetToken, password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Reset password — Abect Dev Tools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="ResetPassword">
        <div className="ResetPassword__card">
          <h1 className="ResetPassword__title">New password</h1>
          <p className="ResetPassword__sub">Choose a strong password</p>

          {success ? (
            <p className="ResetPassword__success">
              Password updated. Redirecting to login…
            </p>
          ) : (
            <form className="ResetPassword__form" onSubmit={handleSubmit}>
              <div className="ResetPassword__field">
                <label className="ResetPassword__label" htmlFor="rp-password">New password</label>
                <input
                  id="rp-password"
                  className="ResetPassword__input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="ResetPassword__field">
                <label className="ResetPassword__label" htmlFor="rp-confirm">Confirm password</label>
                <input
                  id="rp-confirm"
                  className="ResetPassword__input"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />
              </div>
              {error && <p className="ResetPassword__error">{error}</p>}
              <PrimaryButton type="submit" loading={loading} loadingText="Saving…" fullWidth>
                Set new password
              </PrimaryButton>
            </form>
          )}

          <Link to="/login" className="ResetPassword__back">← Back to login</Link>
        </div>
      </div>
    </>
  )
}
