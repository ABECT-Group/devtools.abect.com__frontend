import './SnippetPreview.scss'

function formatUrl(raw) {
  try {
    const { hostname, pathname } = new URL(raw)
    const path = pathname === '/' ? '' : pathname
    return hostname + path
  } catch {
    return raw || 'example.com/page-url'
  }
}

function truncate(text, max) {
  if (!text || text.length <= max) return text || ''
  return text.slice(0, max - 1) + '…'
}

export default function SnippetPreview({ title, description, canonicalUrl }) {
  const displayTitle = truncate(title, 60) || 'Page title'
  const displayDesc  = truncate(description, 160) || 'Page description will appear here.'
  const displayUrl   = formatUrl(canonicalUrl)
  const isEmpty      = !title && !description && !canonicalUrl

  return (
    <div className="SnippetPreview">
      <div className="SnippetPreview__label">Google Search Preview</div>
      <div className={`SnippetPreview__card${isEmpty ? ' SnippetPreview__card--empty' : ''}`}>
        <div className="SnippetPreview__url">{displayUrl}</div>
        <div className="SnippetPreview__title">{displayTitle}</div>
        <div className="SnippetPreview__description">{displayDesc}</div>
      </div>
    </div>
  )
}
