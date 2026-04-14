import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.scss'

const IMAGE_CONVERTER_SLUGS = new Set([
  'png-to-jpg', 'webp-to-jpg', 'gif-to-jpg', 'bmp-to-jpg', 'avif-to-jpg', 'tiff-to-jpg',
  'jpg-to-png', 'jpeg-to-png', 'webp-to-png', 'gif-to-png', 'bmp-to-png', 'avif-to-png', 'tiff-to-png',
  'png-to-webp', 'jpg-to-webp', 'jpeg-to-webp', 'gif-to-webp', 'bmp-to-webp', 'avif-to-webp', 'tiff-to-webp',
])

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
      { name: 'WebP converter',    route: '/webp-converter',    ready: true },
      { name: 'Image converter',   route: '/png-to-jpg',        ready: true, customActive: true },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const isImageConverterActive = IMAGE_CONVERTER_SLUGS.has(pathname.slice(1))

  function handleCookieSettingsClick() {
    window.dispatchEvent(new Event('open-cookie-consent'))
    onClose()
  }

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
                  item.customActive ? (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      className={`Sidebar__nav-item${isImageConverterActive ? ' Sidebar__nav-item--active' : ''}`}
                      onClick={onClose}
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      end
                      className={({ isActive }) =>
                        `Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`
                      }
                      onClick={onClose}
                    >
                      {item.name}
                    </NavLink>
                  )
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
          <button
            type="button"
            className="Sidebar__footer-btn"
            onClick={handleCookieSettingsClick}
          >
            Cookie Settings
          </button>
        </footer>
      </aside>
    </>
  )
}
