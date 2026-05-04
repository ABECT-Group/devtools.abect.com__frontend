import { ASPECT_PRESETS } from '../../utils/generateOGCode'
import './OGCardPreview.scss'

function formatUrl(raw) {
  try {
    const { hostname, pathname } = new URL(raw)
    return hostname + (pathname === '/' ? '' : pathname)
  } catch {
    return raw || 'example.com'
  }
}

function truncate(str, max) {
  if (!str || str.length <= max) return str || ''
  return str.slice(0, max - 1) + '…'
}

export default function OGCardPreview({ title, description, siteName, pageUrl, imageObjectUrl, aspectKey }) {
  const { width: EW, height: EH } = ASPECT_PRESETS[aspectKey]
  const isEmpty = !title && !description && !pageUrl && !imageObjectUrl

  const displayTitle = truncate(title, 70)   || 'Page title'
  const displayDesc  = truncate(description, 200) || 'Page description will appear here.'
  const displayUrl   = siteName || formatUrl(pageUrl) || 'example.com'

  return (
    <div className="OGCardPreview">
      <div className="OGCardPreview__label">Social Preview</div>
      <div className={`OGCardPreview__card${isEmpty ? ' OGCardPreview__card--empty' : ''}`}>
        <div
          className="OGCardPreview__image-wrap"
          style={{ aspectRatio: `${EW} / ${EH}` }}
        >
          {imageObjectUrl
            ? <img src={imageObjectUrl} alt="" className="OGCardPreview__image" />
            : <div className="OGCardPreview__image-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Upload an image to preview</span>
              </div>
          }
        </div>
        <div className="OGCardPreview__meta">
          <div className="OGCardPreview__url">{displayUrl}</div>
          <div className="OGCardPreview__title">{displayTitle}</div>
          <div className="OGCardPreview__desc">{displayDesc}</div>
        </div>
      </div>
    </div>
  )
}
