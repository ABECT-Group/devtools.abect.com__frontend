import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../../store/authStore.js'
import TokenBadge from '../TokenBadge/TokenBadge.jsx'
import './Header.scss'

export default function Header({ isSidebarOpen, onMenuToggle }) {
  const user        = useAuthStore(s => s.user)
  const accessToken = useAuthStore(s => s.accessToken)
  const loading     = useAuthStore(s => s.loading)
  const hint        = useAuthStore(s => s.hint)

  return (
    <header className="Header">
      <Link to="/" className="Header__logo">
        <span>Dev</span> Tools
      </Link>

      <nav className="Header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `Header__nav-link${isActive ? ' Header__nav-link--active' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `Header__nav-link${isActive ? ' Header__nav-link--active' : ''}`
          }
        >
          About
        </NavLink>
      </nav>

      <div className="Header__right">
        {loading
          ? (hint
              ? <div className="Header__avatar Header__avatar--skeleton" aria-hidden="true" />
              : <Link to="/login" className="Header__signin">Sign in</Link>
            )
          : (user
              ? (
                <>
                  <TokenBadge token={accessToken} />
                  <Link to="/profile" className="Header__user">
                    <span className="Header__user-email">
                      {(() => { const u = user.email?.split('@')[0] ?? ''; return u.length > 18 ? u.slice(0, 15) + '…' : u })()}
                    </span>
                    <div className="Header__avatar">
                      {user.photoUrl
                        ? <img src={user.photoUrl} alt="" className="Header__avatar-img" referrerPolicy="no-referrer" />
                        : <span className="Header__avatar-initials">{user.email?.[0]?.toUpperCase() ?? '?'}</span>
                      }
                    </div>
                  </Link>
                </>
              )
              : <Link to="/login" className="Header__signin">Sign in</Link>
            )
        }
        <button
          className={`Header__burger${isSidebarOpen ? ' Header__burger--open' : ''}`}
          onClick={onMenuToggle}
          aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
