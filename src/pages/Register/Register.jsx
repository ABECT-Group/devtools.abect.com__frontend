import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/AuthForms/RegisterForm.jsx'
import './Register.scss'

export default function Register() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Register — Abect Dev Tools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="Register">
        <div className="Register__card">
          <RegisterForm
            showHeading
            onSuccess={() => navigate('/ai')}
            footer={
              <p className="AuthForm__switch">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            }
          />
        </div>
      </div>
    </>
  )
}
