import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.js'
import { PrimaryButton } from '../../components/Buttons/Buttons.jsx'
import useAuthStore from '../../store/authStore.js'
import './Login.scss'

function GoogleIcon() {
  return (
    <svg className="Login__google-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84-.62.32z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Login() {
  const navigate  = useNavigate()
  const setAuth   = useAuthStore(s => s.setAuth)

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authApi.login(email, password)
      setAuth(data.data.user, data.data.accessToken)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Log in — Abect Dev Tools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="Login">
        <div className="Login__card">
          <h1 className="Login__title">Log in</h1>
          <p className="Login__sub">Welcome back</p>

          <form className="Login__form" onSubmit={handleSubmit}>
            <div className="Login__field">
              <label className="Login__label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="Login__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="Login__field">
              <div className="Login__field-header">
                <label className="Login__label" htmlFor="login-password">Password</label>
                <Link to="/forgot-password" className="Login__forgot">Forgot?</Link>
              </div>
              <input
                id="login-password"
                className="Login__input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="Login__error">{error}</p>}
            <PrimaryButton type="submit" loading={loading} loadingText="Logging in…" fullWidth>
              Log in
            </PrimaryButton>
          </form>

          <div className="Login__or"><span>or</span></div>

          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            className="Login__google"
          >
            <GoogleIcon />
            Continue with Google
          </a>

          <p className="Login__switch">
            No account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </>
  )
}
