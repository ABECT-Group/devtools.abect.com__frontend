import { formatSize } from '../../utils/formatSize'
import { DeleteButton, DownloadButton, SecondaryButton } from '../../../../components/Buttons/Buttons'
import './ConvertFileRow.scss'

function shortenFileName(name) {
  const extensionIndex = name.lastIndexOf('.')
  const hasExtension = extensionIndex > 0
  const extension = hasExtension ? name.slice(extensionIndex) : ''
  const baseName = hasExtension ? name.slice(0, extensionIndex) : name
  if (baseName.length <= 10) return name
  return `${baseName.slice(0, 10)}...${extension}`
}

export default function ConvertFileRow({ file, toLabel, onConvert, onDownload, onDelete }) {
  const isConverting = file.status === 'converting'
  const isDone = file.status === 'done'
  const mobileFileName = shortenFileName(file.name)

  return (
    <div className="ConvertFileRow">
      <div className="ConvertFileRow__delete">
        <DeleteButton onClick={() => onDelete(file.id)} />
      </div>

      <div className="ConvertFileRow__info">
        <div className="ConvertFileRow__thumb-wrap">
          {file.previewUrl ? (
            <img
              src={file.previewUrl}
              alt={file.name}
              className={`ConvertFileRow__thumb${isDone ? ' ConvertFileRow__thumb--done' : ''}`}
            />
          ) : (
            <div className="ConvertFileRow__thumb-placeholder">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="ConvertFileRow__file">
          <div className="ConvertFileRow__file-name" title={file.name}>
            <span className="ConvertFileRow__file-name-desktop">{file.name}</span>
            <span className="ConvertFileRow__file-name-mobile">{mobileFileName}</span>
          </div>
          <div className="ConvertFileRow__file-meta">
            {file.type} · {formatSize(file.originalSize)}
            {isDone && file.resultSize != null && (
              <>{' → '}<span className="ConvertFileRow__result-size">{toLabel} · {formatSize(file.resultSize)}</span></>
            )}
          </div>
        </div>
      </div>

      <div className="ConvertFileRow__status">
        <span className={`ConvertFileRow__status-badge ConvertFileRow__status-badge--${file.status}`}>
          {file.status === 'ready'      && 'Ready'}
          {file.status === 'converting' && 'Converting...'}
          {file.status === 'done'       && 'Done'}
          {file.status === 'error'      && 'Error'}
        </span>
      </div>

      <div className="ConvertFileRow__convert">
        <SecondaryButton onClick={() => onConvert(file.id)} disabled={isConverting}>Convert</SecondaryButton>
      </div>

      <div className="ConvertFileRow__download">
        <DownloadButton onClick={() => onDownload(file.id)} visible={isDone} />
      </div>
    </div>
  )
}
