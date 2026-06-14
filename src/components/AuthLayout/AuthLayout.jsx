import { Link, Outlet } from 'react-router-dom'
import './AuthLayout.scss'

export default function AuthLayout() {
  return (
    <div className="AuthLayout">
      <header className="AuthLayout__header">
        <Link to="/" className="AuthLayout__logo">
          <span>Dev</span> Tools
        </Link>
      </header>
      <main className="AuthLayout__main">
        <Outlet />
      </main>
    </div>
  )
}
