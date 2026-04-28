import { useEffect, useMemo } from 'react'
import { formatSize } from '../../utils/formatSize'
import { DeleteButton, DownloadButton, SecondaryButton } from '../../../../components/Buttons/Buttons'
import './CompressFileRow.scss'

function shortenFileName(name) {
  const extensionIndex = name.lastIndexOf('.')
  const hasExtension = extensionIndex > 0
  const extension = hasExtension ? name.slice(extensionIndex) : ''
  const baseName = hasExtension ? name.slice(0, extensionIndex) : name
  if (baseName.length <= 10) return name
  return `${baseName.slice(0, 10)}...${extension}`
}

export default function CompressFileRow({ file, toLabel, hasQuality, onCompress, onQualityChange, onDownload, onDelete, onPreviewClick }) {
  const isCompressing = file.status === 'converting'
  const isDone = file.status === 'done'
  const mobileFileName = shortenFileName(file.name)

  const savedPct = isDone && file.resultSize != null && file.originalSize > 0
    ? Math.round((1 - file.resultSize / file.originalSize) * 100)
    : null

  const resultPreviewUrl = useMemo(() => {
    if (!file.resultBlob) return null
    return URL.createObjectURL(file.resultBlob)
  }, [file.resultBlob])

  useEffect(() => {
    return () => {
      if (resultPreviewUrl) URL.revokeObjectURL(resultPreviewUrl)
    }
  }, [resultPreviewUrl])

  return (
    <div className={`CompressFileRow${!hasQuality ? ' CompressFileRow--lossless' : ''}`}>
      <div className="CompressFileRow__delete">
        <DeleteButton onClick={() => onDelete(file.id)} />
      </div>

      <div className="CompressFileRow__info">
        <div className="CompressFileRow__thumb-wrap">
          {file.previewUrl ? (
            <img
              src={file.previewUrl}
              alt={file.name}
              className="CompressFileRow__thumb"
            />
          ) : (
            <div className="CompressFileRow__thumb-placeholder">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="CompressFileRow__file">
          <div className="CompressFileRow__file-name" title={file.name}>
            <span className="CompressFileRow__file-name-desktop">{file.name}</span>
            <span className="CompressFileRow__file-name-mobile">{mobileFileName}</span>
          </div>
          <div className="CompressFileRow__file-meta">
            {file.type} · {formatSize(file.originalSize)}
            {isDone && file.resultSize != null && (
              <>
                {' → '}
                <span className="CompressFileRow__result-size">
                  {toLabel} · {formatSize(file.resultSize)}
                </span>
                {savedPct !== null && (
                  <span className={`CompressFileRow__saved-pct${savedPct > 0 ? ' CompressFileRow__saved-pct--green' : savedPct < 0 ? ' CompressFileRow__saved-pct--red' : ''}`}>
                    {savedPct > 0 ? ` −${savedPct}%` : savedPct < 0 ? ` +${Math.abs(savedPct)}%` : ' 0%'}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {hasQuality && (
        <div className="CompressFileRow__quality">
          <span className="CompressFileRow__quality-value">{file.quality}%</span>
          <input
            type="range"
            className="CompressFileRow__quality-slider"
            min="10"
            max="100"
            value={file.quality}
            onChange={event => onQualityChange(file.id, Number(event.target.value))}
          />
        </div>
      )}

      <div className="CompressFileRow__preview">
        {resultPreviewUrl ? (
          <button
            className="CompressFileRow__preview-btn"
            onClick={() => onPreviewClick(resultPreviewUrl)}
            aria-label="Preview compressed image"
          >
            <img src={resultPreviewUrl} alt="Result preview" className="CompressFileRow__preview-thumb" />
            <span className="CompressFileRow__preview-zoom">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        ) : (
          <div className={`CompressFileRow__preview-placeholder${isCompressing ? ' CompressFileRow__preview-placeholder--loading' : ''}`}>
            {isCompressing ? (
              <svg className="CompressFileRow__preview-spinner" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28 56"/>
              </svg>
            ) : (
              <span className="CompressFileRow__preview-dash">—</span>
            )}
          </div>
        )}
      </div>

      <div className="CompressFileRow__convert">
        <SecondaryButton onClick={() => onCompress(file.id)} disabled={isCompressing}>Compress</SecondaryButton>
      </div>

      <div className="CompressFileRow__download">
        <DownloadButton onClick={() => onDownload(file.id)} visible={isDone} />
      </div>
    </div>
  )
}
