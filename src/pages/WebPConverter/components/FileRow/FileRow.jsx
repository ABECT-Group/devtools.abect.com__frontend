import { formatSize } from '../../utils/formatSize'
import './FileRow.scss'

function shortenFileName(name) {
  const extensionIndex = name.lastIndexOf('.')
  const hasExtension = extensionIndex > 0
  const extension = hasExtension ? name.slice(extensionIndex) : ''
  const baseName = hasExtension ? name.slice(0, extensionIndex) : name

  if (baseName.length <= 10) return name
  return `${baseName.slice(0, 10)}...${extension}`
}

export default function FileRow({ file, onQualityChange, onConvert, onDownload, onDelete }) {
  const isConverting = file.status === 'converting'
  const isDone = file.status === 'done'
  const mobileFileName = shortenFileName(file.name)

  return (
    <div className="FileRow">
      <div className="FileRow__delete">
        <button
          className="FileRow__btn-delete"
          onClick={() => onDelete(file.id)}
          aria-label="Remove file"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      </div>

      <div className="FileRow__info">
        <div className="FileRow__thumb-wrap">
          {file.previewUrl ? (
            <img
              src={file.previewUrl}
              alt={file.name}
              className={`FileRow__thumb${isDone ? ' FileRow__thumb--done' : ''}`}
            />
          ) : (
            <div className="FileRow__thumb-placeholder">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="FileRow__file">
          <div className="FileRow__file-name" title={file.name}>
            <span className="FileRow__file-name-desktop">{file.name}</span>
            <span className="FileRow__file-name-mobile">{mobileFileName}</span>
          </div>
          <div className="FileRow__file-meta">
            {file.type} · {formatSize(file.originalSize)}
            {isDone && file.resultSize != null && (
              <>{' -> '}<span>{formatSize(file.resultSize)}</span></>
            )}
          </div>
        </div>
      </div>

      <div className="FileRow__quality">
        <span className="FileRow__quality-value">{file.quality}%</span>
        <input
          type="range"
          className="FileRow__quality-slider"
          min="10"
          max="100"
          value={file.quality}
          onChange={event => onQualityChange(file.id, Number(event.target.value))}
        />
      </div>

      <div className="FileRow__status">
        <span className={`FileRow__status-badge FileRow__status-badge--${file.status}`}>
          {file.status === 'ready' && 'Ready'}
          {file.status === 'converting' && 'Converting...'}
          {file.status === 'done' && 'Done'}
          {file.status === 'error' && 'Error'}
        </span>
      </div>

      <div className="FileRow__convert">
        <button
          className="FileRow__btn-convert"
          onClick={() => onConvert(file.id)}
          disabled={isConverting}
        >
          Convert
        </button>
      </div>

      <div className="FileRow__download">
        <button
          className={`FileRow__btn-download${isDone ? ' FileRow__btn-download--visible' : ''}`}
          onClick={() => onDownload(file.id)}
          aria-label="Download"
        >
          <svg viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
