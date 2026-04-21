import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './NotFound.scss'

export default function NotFound() {
  return (
    <main className="NotFound">
      <Helmet>
        <title>404 — Page Not Found | Abect</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="NotFound__code">404</h1>
      <p className="NotFound__text">This page doesn't exist.</p>
      <Link to="/" className="NotFound__link">Go to homepage</Link>
    </main>
  )
}
