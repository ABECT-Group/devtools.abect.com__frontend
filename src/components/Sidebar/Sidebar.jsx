import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore.js'
import useConversationStore from '../../store/conversationStore.js'
import { aiApi } from '../../api/ai.js'
import SegmentedControl from '../SegmentedControl/SegmentedControl.jsx'
import TokenBadge from '../TokenBadge/TokenBadge.jsx'
import './Sidebar.scss'


// ─── Other family slug sets ───────────────────────────────────────────────────

const IMAGE_CONVERTER_SLUGS = new Set([
  'png-to-jpg', 'webp-to-jpg', 'gif-to-jpg', 'bmp-to-jpg', 'avif-to-jpg', 'tiff-to-jpg',
  'jpg-to-png', 'jpeg-to-png', 'webp-to-png', 'gif-to-png', 'bmp-to-png', 'avif-to-png', 'tiff-to-png',
  'png-to-webp', 'jpg-to-webp', 'jpeg-to-webp', 'gif-to-webp', 'bmp-to-webp', 'avif-to-webp', 'tiff-to-webp',
  'heic-to-jpg', 'heic-to-webp',
])

const COMPRESS_SLUGS = new Set(['compress-jpg', 'compress-png', 'compress-webp'])

const SCHEMA_GENERATOR_SLUGS = new Set([
  'product-schema-generator',
  'article-schema-generator',
  'faq-schema-generator',
  'organization-schema-generator',
  'local-business-schema-generator',
  'breadcrumb-schema-generator',
])

// ─── Nav tree ────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: 'SEO & Schema',
    items: [
      { name: 'Meta Tag Generator', route: '/meta-tags-generator', ready: true },
      { name: 'OG Image Generator', route: '/og-image-generator', ready: true },
      {
        name: 'Schema Markup Generator',
        group: true,
        customActive: 'schemaGenerator',
        children: [
          { name: 'Product Schema Generator', route: '/product-schema-generator' },
          { name: 'Article Schema Generator', route: '/article-schema-generator' },
          { name: 'FAQ Schema Generator', route: '/faq-schema-generator' },
          { name: 'Organization Schema Generator', route: '/organization-schema-generator' },
          { name: 'Local Business Schema Generator', route: '/local-business-schema-generator' },
          { name: 'Breadcrumb Schema Generator', route: '/breadcrumb-schema-generator' },
        ],
      },
    ],
  },
  {
    label: 'Images',
    items: [
      { name: 'Favicon Generator', route: '/favicon-generator', ready: true },
      { name: 'WebP Converter', route: '/webp-converter', ready: true },
      {
        name: 'Image Converter',
        group: true,
        customActive: 'imageConverter',
        children: [
          { name: 'PNG to JPG', route: '/png-to-jpg' },
          { name: 'JPG to PNG', route: '/jpg-to-png' },
          { name: 'PNG to WebP', route: '/png-to-webp' },
          { name: 'JPG to WebP', route: '/jpg-to-webp' },
          { name: 'WebP to JPG', route: '/webp-to-jpg' },
          { name: 'WebP to PNG', route: '/webp-to-png' },
          { name: 'GIF to JPG', route: '/gif-to-jpg' },
          { name: 'GIF to PNG', route: '/gif-to-png' },
          { name: 'GIF to WebP', route: '/gif-to-webp' },
          { name: 'BMP to JPG', route: '/bmp-to-jpg' },
          { name: 'BMP to PNG', route: '/bmp-to-png' },
          { name: 'BMP to WebP', route: '/bmp-to-webp' },
          { name: 'AVIF to JPG', route: '/avif-to-jpg' },
          { name: 'AVIF to PNG', route: '/avif-to-png' },
          { name: 'AVIF to WebP', route: '/avif-to-webp' },
          { name: 'TIFF to JPG', route: '/tiff-to-jpg' },
          { name: 'TIFF to PNG', route: '/tiff-to-png' },
          { name: 'TIFF to WebP', route: '/tiff-to-webp' },
          { name: 'JPEG to PNG', route: '/jpeg-to-png' },
          { name: 'JPEG to WebP', route: '/jpeg-to-webp' },
          { name: 'HEIC to JPG', route: '/heic-to-jpg' },
          { name: 'HEIC to WebP', route: '/heic-to-webp' },
        ],
      },
      {
        name: 'Compress Image',
        group: true,
        customActive: 'compress',
        children: [
          { name: 'Compress JPG', route: '/compress-jpg' },
          { name: 'Compress PNG', route: '/compress-png' },
          { name: 'Compress WebP', route: '/compress-webp' },
        ],
      },
    ],
  },
  {
    label: 'Text & Code',
    items: [
      { name: 'HTML ↔ Markdown', route: '/html-to-markdown', ready: true, slugSet: new Set(['html-to-markdown', 'markdown-to-html']) },
      { name: 'HTML ↔ JSX', route: '/html-to-jsx', ready: true, slugSet: new Set(['html-to-jsx', 'jsx-to-html']) },
      { name: 'HTML ↔ TSX', route: '/html-to-tsx', ready: true, slugSet: new Set(['html-to-tsx', 'tsx-to-html']) },
      { name: 'JSON ↔ CSV', route: '/json-to-csv', ready: true, slugSet: new Set(['json-to-csv', 'csv-to-json']) },
      { name: 'XML ↔ JSON', route: '/xml-to-json', ready: true, slugSet: new Set(['xml-to-json', 'json-to-xml']) },
      { name: 'YAML ↔ JSON', route: '/yaml-to-json', ready: true, slugSet: new Set(['yaml-to-json', 'json-to-yaml']) },
      { name: 'Base64', route: '/base64-encode', ready: true, slugSet: new Set(['base64-encode', 'base64-decode']) },
    ],
  },
]

// ─── Conversation date grouping ───────────────────────────────────────────────

function groupConversations(conversations) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const groups = { Today: [], Yesterday: [], Earlier: [] }
  for (const conv of conversations) {
    const d = new Date(conv.updatedAt || conv.createdAt)
    if (d.toDateString() === today.toDateString()) groups.Today.push(conv)
    else if (d.toDateString() === yesterday.toDateString()) groups.Yesterday.push(conv)
    else groups.Earlier.push(conv)
  }
  return groups
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const Chevron = () => (
  <svg className="Sidebar__group-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const slug = pathname.slice(1)

  const user = useAuthStore(s => s.user)
  const accessToken = useAuthStore(s => s.accessToken)
  const loading = useAuthStore(s => s.loading)
  const hint = useAuthStore(s => s.hint)


  const sidebarMode = useConversationStore(s => s.sidebarMode)
  const setSidebarMode = useConversationStore(s => s.setSidebarMode)
  const conversations = useConversationStore(s => s.conversations)
  const conversationsLoading = useConversationStore(s => s.conversationsLoading)
  const fetchConversations = useConversationStore(s => s.fetchConversations)
  const removeConversation = useConversationStore(s => s.removeConversation)

  const isAiMode = sidebarMode === 'ai'
  const hasFetchedRef = useRef(false)
  const listRef = useRef(null)
  const [listScrolled, setListScrolled] = useState(false)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const handler = () => setListScrolled(el.scrollTop > 0)
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [isAiMode])

  const isImageConverterActive = IMAGE_CONVERTER_SLUGS.has(slug)
  const isCompressActive = COMPRESS_SLUGS.has(slug)
  const isSchemaGeneratorActive = SCHEMA_GENERATOR_SLUGS.has(slug)

  // Sync sidebar mode with route: /ai/* → ai, everything else → tools
  useEffect(() => {
    const target = pathname.startsWith('/ai') ? 'ai' : 'tools'
    if (sidebarMode !== target) setSidebarMode(target)
  }, [pathname])

  // Fetch conversations once when switching to AI mode; reset on logout
  useEffect(() => {
    if (!accessToken) { hasFetchedRef.current = false; return }
    if (!isAiMode || hasFetchedRef.current) return
    hasFetchedRef.current = true
    fetchConversations(accessToken)
  }, [isAiMode, accessToken, fetchConversations])

  function isGroupActive(item) {
    return (
      (item.customActive === 'schemaGenerator' && isSchemaGeneratorActive) ||
      (item.customActive === 'imageConverter' && isImageConverterActive) ||
      (item.customActive === 'compress' && isCompressActive)
    )
  }

  function handleCookieSettingsClick() {
    window.dispatchEvent(new Event('open-cookie-consent'))
    onClose()
  }

  function handleOpenConversation(conv) {
    navigate(`/ai/${conv._id}`)
    onClose()
  }

  async function handleDeleteConversation(e, convId) {
    e.stopPropagation()
    try {
      await aiApi.deleteConversation(convId, accessToken)
      removeConversation(convId)
      // Clear from localStorage if it's the active conversation for its tool
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('conv:') && localStorage.getItem(key) === String(convId)) {
          localStorage.removeItem(key)
        }
      }
    } catch { }
  }

  function renderNavItem(item) {
    if (item.group) {
      const active = isGroupActive(item)
      return (
        <details
          key={item.name}
          className={`Sidebar__group${active ? ' Sidebar__group--active' : ''}`}
          open={active || undefined}
        >
          <summary className="Sidebar__group-summary">
            {item.name}
            <Chevron />
          </summary>
          <div className="Sidebar__group-children">
            {item.children.map(child => (
              <NavLink
                key={child.route}
                to={child.route}
                end
                className={({ isActive }) =>
                  `Sidebar__nav-item Sidebar__nav-item--child${isActive ? ' Sidebar__nav-item--active' : ''}`
                }
                onClick={onClose}
              >
                {child.name}
              </NavLink>
            ))}
          </div>
        </details>
      )
    }

    if (!item.ready) {
      return (
        <span key={item.route} className="Sidebar__nav-item Sidebar__nav-item--coming-soon">
          {item.name}
        </span>
      )
    }

    const isCustomActive = item.slugSet?.has(slug)

    return (
      <NavLink
        key={item.route}
        to={item.route}
        end
        className={({ isActive }) =>
          `Sidebar__nav-item${(isActive || isCustomActive) ? ' Sidebar__nav-item--active' : ''}`
        }
        onClick={onClose}
      >
        {item.name}
      </NavLink>
    )
  }

  function handleModeChange(mode) {
    setSidebarMode(mode)
    if (mode === 'ai' && !pathname.startsWith('/ai')) {
      navigate('/ai')
    }
  }

  function handleNewAiChat() {
    navigate('/ai')
    onClose()
  }

  function renderAiPanel() {
    const groups = groupConversations(conversations)
    const hasAny = conversations.length > 0

    return (
      <div className="Sidebar__ai-panel">
        <button
          type="button"
          className="Sidebar__ai-new"
          onClick={handleNewAiChat}
        >
          <span>+</span> New chat
        </button>

        <div className={`Sidebar__ai-list${listScrolled ? ' Sidebar__ai-list--scrolled' : ''}`} ref={listRef}>
          {(loading || conversationsLoading) ? null : !user ? (
            <p className="Sidebar__ai-empty">
              <Link to="/login" onClick={onClose}>Sign in</Link> to see your conversations
            </p>
          ) : !hasAny ? (
            <p className="Sidebar__ai-empty">No conversations yet</p>
          ) : (
            Object.entries(groups)
              .filter(([, items]) => items.length > 0)
              .map(([label, items]) => (
                <div key={label}>
                  <div className="Sidebar__ai-date-label">{label}</div>
                  {items.map(conv => (
                    <div key={String(conv._id)} className="Sidebar__conv-item">
                      <button
                        type="button"
                        className="Sidebar__conv-title"
                        onClick={() => handleOpenConversation(conv)}
                      >
                        {conv.title || 'Untitled chat'}
                      </button>
                      <button
                        type="button"
                        className="Sidebar__conv-delete"
                        onClick={(e) => handleDeleteConversation(e, conv._id)}
                        aria-label="Delete conversation"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ))
          )}
        </div>
      </div>
    )
  }

  const showUser = !loading && user
  const showSignIn = !loading && !user && !hint

  return (
    <>
      {isOpen && <div className="Sidebar__backdrop" onClick={onClose} />}
      <aside
        id="sidebar-navigation"
        className={`Sidebar${isOpen ? ' Sidebar--open' : ''}`}
      >

        {/* ── Mode toggle — desktop and mobile ────────────── */}
        <div className="Sidebar__mode-toggle">
          <SegmentedControl
            options={[
              { value: 'tools', label: 'Menu' },
              { value: 'ai', label: 'AI' },
            ]}
            value={sidebarMode}
            onChange={handleModeChange}
          />
        </div>

        {isAiMode ? (
          renderAiPanel()
        ) : (
          <>
            {/* Desktop: flat nav sections */}
            <nav className="Sidebar__nav">
              {NAV_SECTIONS.map(section => (
                <div key={section.label}>
                  <div className="Sidebar__section-label">{section.label}</div>
                  {section.items.map(item => renderNavItem(item))}
                </div>
              ))}
            </nav>

            {/* Mobile: accordion nav */}
            <div className="Sidebar__mobile-nav">
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

              <details className="Sidebar__accordion">
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
                      {section.items.map(item => renderNavItem(item))}
                    </div>
                  ))}
                </div>
              </details>

              <NavLink
                to="/ai"
                className={({ isActive }) =>
                  `Sidebar__nav-item${isActive || pathname.startsWith('/ai') ? ' Sidebar__nav-item--active' : ''}`
                }
                onClick={onClose}
              >
                AI assistant
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`
                }
                onClick={onClose}
              >
                About
              </NavLink>

              <NavLink
                to="/privacy-policy"
                className={({ isActive }) =>
                  `Sidebar__nav-item${isActive ? ' Sidebar__nav-item--active' : ''}`
                }
                onClick={onClose}
              >
                Privacy Policy
              </NavLink>

              <button
                type="button"
                className="Sidebar__nav-item"
                onClick={handleCookieSettingsClick}
              >
                Cookie Settings
              </button>
            </div>
          </>
        )}

        {/* ── Desktop footer ──────────────────────────────── */}
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

        {/* ── Mobile bottom: user info ────────────────────── */}
        <div className="Sidebar__mobile-bottom">
          {showUser && (
            <div className="Sidebar__user-row">
              <Link to="/profile" className="Sidebar__user" onClick={onClose}>
                <div className="Sidebar__user-avatar">
                  {user.photoUrl
                    ? <img src={user.photoUrl} alt="" referrerPolicy="no-referrer" />
                    : <span>{user.email?.[0]?.toUpperCase() ?? '?'}</span>
                  }
                </div>
                <div className="Sidebar__user-info">
                  <span className="Sidebar__user-name">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <span className="Sidebar__user-email">{user.email}</span>
                </div>
              </Link>
              <TokenBadge />
            </div>
          )}

          {showSignIn && (
            <Link to="/login" className="Sidebar__nav-item" onClick={onClose}>
              Sign in
            </Link>
          )}
        </div>

      </aside>
    </>
  )
}
