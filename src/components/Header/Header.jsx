import { Link } from 'react-router-dom'
import './Header.scss'

export default function Header({ isSidebarOpen, onMenuToggle }) {
  return (
    <header className="Header">
      <Link to="/" className="Header__logo">
        tools.<span>abect</span>.com
      </Link>
      <div className="Header__right">
        {/* <button className="Header__signin">Sign in</button> */}
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
