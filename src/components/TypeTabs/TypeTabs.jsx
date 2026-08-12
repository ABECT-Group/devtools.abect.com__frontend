import { Link } from 'react-router-dom'
import './TypeTabs.scss'

/**
 * Row of type tabs for family tools — one <Link> per sibling page.
 *
 * Every tab is a real link, so the prerendered HTML carries the whole family
 * as crawlable internal links. Used by JsonLdGenerator (6 schema types) and
 * QrCodeGenerator (QR content types).
 */
export default function TypeTabs({ items, activeKey, description }) {
  return (
    <div className="TypeTabs">
      <div className="TypeTabs__tabs">
        {items.map(item => (
          <Link
            key={item.key}
            to={item.to}
            className={`TypeTabs__tab${item.key === activeKey ? ' TypeTabs__tab--active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {description && <p className="TypeTabs__desc">{description}</p>}
    </div>
  )
}
