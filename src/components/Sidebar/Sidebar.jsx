import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.scss'

const IMAGE_CONVERTER_SLUGS = new Set([
  'png-to-jpg', 'webp-to-jpg', 'gif-to-jpg', 'bmp-to-jpg', 'avif-to-jpg', 'tiff-to-jpg',
  'jpg-to-png', 'jpeg-to-png', 'webp-to-png', 'gif-to-png', 'bmp-to-png', 'avif-to-png', 'tiff-to-png',
  'png-to-webp', 'jpg-to-webp', 'jpeg-to-webp', 'gif-to-webp', 'bmp-to-webp', 'avif-to-webp', 'tiff-to-webp',
])

const COMPRESS_SLUGS = new Set(['compress-jpg', 'compress-png', 'compress-webp'])

const NAV_SECTIONS = [
  {
    label: 'SEO & Schema',
    items: [
      { name: 'Meta tag generator',  route: '/meta-tags-generator', ready: true },
      { name: 'OG Image Generator', route: '/og-image-generator',  ready: true },
    ],
  },
  {
    label: 'Images',
    items: [
      { name: 'Favicon generator', route: '/favicon-generator', ready: true },
      { name: 'WebP converter',    route: '/webp-converter',    ready: true },
      { name: 'Image converter',   route: '/png-to-jpg',        ready: true, customActive: 'imageConverter' },
      { name: 'Compress image',    route: '/compress-jpg',      ready: true, customActive: 'compress' },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const slug = pathname.slice(1)
  const isImageConverterActive = IMAGE_CONVERTER_SLUGS.has(slug)
  const isCompressActive = COMPRESS_SLUGS.has(slug)

  function handleCookieSettingsClick() {
    window.dispatchEvent(new Event('open-cookie-consent'))
    onClose()
  }

  function renderNavItem(item) {
    if (!item.ready) {
      return (
        <span key={item.route} className="Sidebar__nav-item Sidebar__nav-item--coming-soon">
          {item.name}
        </span>
      )
    }
    if (item.customActive) {
      const isActive =
        (item.customActive === 'imageConverter' && isImageConverterActive) ||
        (item.customActive === 'compress' && isCompressActive)
      return (
        <NavLink
          key={item.route}
          to={item.route}
          className={`Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`}
          onClick={onClose}
        >
          {item.name}
        </NavLink>
      )
    }
    return (
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
  }

  return (
    <>
      {isOpen && <div className="Sidebar__backdrop" onClick={onClose} />}
      <aside
        id="sidebar-navigation"
        className={`Sidebar${isOpen ? ' Sidebar--open' : ''}`}
      >

        {/* ── Mobile top nav ──────────────────────────────── */}
        <div className="Sidebar__mobile-top">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`
            }
            onClick={onClose}
          >
            Home
          </NavLink>

          <details className="Sidebar__accordion" open>
            <summary className="Sidebar__accordion-summary">
              Tools
              <svg className="Sidebar__accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="Sidebar__accordion-body">
              {NAV_SECTIONS.map(section => (
                <div key={section.label}>
                  <div className="Sidebar__section-label">{section.label}</div>
                  {section.items.map(renderNavItem)}
                </div>
              ))}
            </div>
          </details>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`
            }
            onClick={onClose}
          >
            About
          </NavLink>
        </div>

        {/* ── Desktop tool sections ───────────────────────── */}
        <nav className="Sidebar__nav">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <div className="Sidebar__section-label">{section.label}</div>
              {section.items.map(renderNavItem)}
            </div>
          ))}
        </nav>

        {/* ── Footer ─────────────────────────────────────── */}
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
