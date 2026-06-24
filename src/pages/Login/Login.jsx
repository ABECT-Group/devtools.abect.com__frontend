import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../../components/AuthForms/LoginForm.jsx'
import './Login.scss'

export default function Login() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Log in — Abect Dev Tools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="Login">
        <div className="Login__card">
          <LoginForm
            showHeading
            onSuccess={() => navigate('/ai')}
            footer={
              <p className="AuthForm__switch">
                No account? <Link to="/register">Create one</Link>
              </p>
            }
          />
        </div>
      </div>
    </>
  )
}
