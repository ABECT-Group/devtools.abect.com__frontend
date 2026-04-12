import { NavLink } from 'react-router-dom'
import './Sidebar.scss'

const NAV_SECTIONS = [
  {
    label: 'General',
    items: [
      { name: 'All tools', route: '/', ready: true },
    ],
  },
  {
    label: 'Images',
    items: [
      { name: 'Favicon generator', route: '/favicon-generator', ready: true },
      { name: 'WebP converter', route: '/webp-converter', ready: true },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="Sidebar__backdrop" onClick={onClose} />}
      <aside
        id="sidebar-navigation"
        className={`Sidebar${isOpen ? ' Sidebar--open' : ''}`}
      >
        <nav className="Sidebar__nav">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <div className="Sidebar__section-label">{section.label}</div>
              {section.items.map(item =>
                item.ready ? (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className={({ isActive }) =>
                      `Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`
                    }
                    onClick={onClose}
                  >
                    {item.name}
                  </NavLink>
                ) : (
                  <span key={item.route} className="Sidebar__nav-item Sidebar__nav-item--coming-soon">
                    {item.name}
                  </span>
                )
              )}
            </div>
          ))}
        </nav>
        <footer className="Sidebar__footer">
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) =>
              `Sidebar__footer-link${isActive ? ' Sidebar__footer-link--active' : ''}`
            }
            onClick={onClose}
          >
            Privacy Policy
          </NavLink>
        </footer>
      </aside>
    </>
  )
}
