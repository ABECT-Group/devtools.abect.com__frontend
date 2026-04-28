import { formatSize } from '../../utils/formatSize'
import ConvertFileRow from '../ConvertFileRow/ConvertFileRow'
import { ClearAllButton, PrimaryButton, AccentButton } from '../../../../components/Buttons/Buttons'
import './ConvertFileTable.scss'

export default function ConvertFileTable({
  files, toLabel,
  onConvert, onConvertAll,
  onDownload, onDownloadAll,
  onDelete, onClearAll,
}) {
  const doneFiles   = files.filter(f => f.status === 'done')
  const hasConverted = doneFiles.length > 0
  const originalSize = doneFiles.reduce((sum, f) => sum + f.originalSize, 0)
  const resultSize   = doneFiles.reduce((sum, f) => sum + (f.resultSize ?? 0), 0)
  const savedBytes   = originalSize - resultSize

  return (
    <div className="ConvertFileTable">
      <div className="ConvertFileTable__head">
        <div className="ConvertFileTable__th"></div>
        <div className="ConvertFileTable__th">File</div>
        <div className="ConvertFileTable__th">Status</div>
        <div className="ConvertFileTable__th">Convert</div>
        <div className="ConvertFileTable__th"></div>
      </div>

      {files.map(file => (
        <ConvertFileRow
          key={file.id}
          file={file}
          toLabel={toLabel}
          onConvert={onConvert}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}

      <div className="ConvertFileTable__footer">
        <div className="ConvertFileTable__stats">
          <div className="ConvertFileTable__stat">
            <span className="ConvertFileTable__stat-label">Files</span>
            <span className="ConvertFileTable__stat-value">{files.length}</span>
          </div>
          <div className="ConvertFileTable__stat">
            <span className="ConvertFileTable__stat-label">Converted</span>
            <span className="ConvertFileTable__stat-value">{doneFiles.length} / {files.length}</span>
          </div>
          <div className="ConvertFileTable__stat">
            <span className="ConvertFileTable__stat-label">Original</span>
            <span className="ConvertFileTable__stat-value">
              {hasConverted ? formatSize(originalSize) : '—'}
            </span>
          </div>
          <div className="ConvertFileTable__stat">
            <span className="ConvertFileTable__stat-label">{toLabel} size</span>
            <span className="ConvertFileTable__stat-value">
              {hasConverted ? formatSize(resultSize) : '—'}
            </span>
          </div>
          <div className="ConvertFileTable__stat">
            <span className="ConvertFileTable__stat-label">Saved</span>
            <span className={`ConvertFileTable__stat-value${
              !hasConverted ? '' :
              savedBytes > 0 ? ' ConvertFileTable__stat-value--green' :
              savedBytes < 0 ? ' ConvertFileTable__stat-value--red' : ''
            }`}>
              {!hasConverted
                ? '—'
                : savedBytes > 0
                  ? formatSize(savedBytes)
                  : savedBytes < 0
                    ? `−${formatSize(-savedBytes)}`
                    : '0 B'
              }
            </span>
          </div>
        </div>

        <div className="ConvertFileTable__actions">
          <ClearAllButton onClick={onClearAll} />
          <PrimaryButton onClick={onConvertAll}>Convert all</PrimaryButton>
          <AccentButton onClick={onDownloadAll} disabled={!hasConverted}>Download all</AccentButton>
        </div>
      </div>
    </div>
  )
}
