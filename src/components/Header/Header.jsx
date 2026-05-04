import { Link, NavLink } from 'react-router-dom'
import './Header.scss'

export default function Header({ isSidebarOpen, onMenuToggle }) {
  return (
    <header className="Header">
      <Link to="/" className="Header__logo">
        tools.<span>abect</span>.com
      </Link>
      <div className="Header__right">
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
          {/* <button className="Header__signin">Sign in</button> */}
        </nav>
        <div className="Header__avatar">
          <div className="Header__avatar-dot" />
        </div>
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
