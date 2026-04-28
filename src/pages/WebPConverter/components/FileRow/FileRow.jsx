import { useEffect, useMemo } from 'react'
import { formatSize } from '../../utils/formatSize'
import { DeleteButton, DownloadButton, SecondaryButton } from '../../../../components/Buttons/Buttons'
import './FileRow.scss'

function shortenFileName(name) {
  const extensionIndex = name.lastIndexOf('.')
  const hasExtension = extensionIndex > 0
  const extension = hasExtension ? name.slice(extensionIndex) : ''
  const baseName = hasExtension ? name.slice(0, extensionIndex) : name

  if (baseName.length <= 10) return name
  return `${baseName.slice(0, 10)}...${extension}`
}

export default function FileRow({ file, onQualityChange, onConvert, onDownload, onDelete, onPreviewClick }) {
  const isConverting = file.status === 'converting'
  const isDone = file.status === 'done'
  const mobileFileName = shortenFileName(file.name)

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
    <div className="FileRow">
      <div className="FileRow__delete">
        <DeleteButton onClick={() => onDelete(file.id)} />
      </div>

      <div className="FileRow__info">
        <div className="FileRow__thumb-wrap">
          {file.previewUrl ? (
            <img
              src={file.previewUrl}
              alt={file.name}
              className="FileRow__thumb"
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
              <>{' → '}<span>{formatSize(file.resultSize)}</span></>
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

      <div className="FileRow__preview">
        {resultPreviewUrl ? (
          <button
            className="FileRow__preview-btn"
            onClick={() => onPreviewClick(resultPreviewUrl)}
            aria-label="Preview converted image"
          >
            <img src={resultPreviewUrl} alt="Result preview" className="FileRow__preview-thumb" />
            <span className="FileRow__preview-zoom">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        ) : (
          <div className={`FileRow__preview-placeholder${isConverting ? ' FileRow__preview-placeholder--loading' : ''}`}>
            {isConverting ? (
              <svg className="FileRow__preview-spinner" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28 56"/>
              </svg>
            ) : (
              <span className="FileRow__preview-dash">—</span>
            )}
          </div>
        )}
      </div>

      <div className="FileRow__convert">
        <SecondaryButton onClick={() => onConvert(file.id)} disabled={isConverting}>Convert</SecondaryButton>
      </div>

      <div className="FileRow__download">
        <DownloadButton onClick={() => onDownload(file.id)} visible={isDone} />
      </div>
    </div>
  )
}
