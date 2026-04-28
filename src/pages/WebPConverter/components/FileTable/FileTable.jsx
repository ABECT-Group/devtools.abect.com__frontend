import { formatSize } from '../../utils/formatSize'
import FileRow from '../FileRow/FileRow'
import { ClearAllButton, PrimaryButton, AccentButton } from '../../../../components/Buttons/Buttons'
import './FileTable.scss'

export default function FileTable({ files, onQualityChange, onConvert, onConvertAll, onDownload, onDownloadAll, onDelete, onClearAll, onPreviewClick }) {
  const doneFiles = files.filter(file => file.status === 'done')
  const hasConverted = doneFiles.length > 0
  // Compare only converted files: original vs result (apples-to-apples)
  const originalSize = doneFiles.reduce((sum, file) => sum + file.originalSize, 0)
  const webpSize = doneFiles.reduce((sum, file) => sum + (file.resultSize ?? 0), 0)
  const savedBytes = originalSize - webpSize  // can be negative if WebP is larger

  return (
    <div className="FileTable">
      <div className="FileTable__head">
        <div className="FileTable__th"></div>
        <div className="FileTable__th">File</div>
        <div className="FileTable__th">
          Quality
          <span className="FileTable__tooltip-wrap" aria-label="Quality guide">
            <svg className="FileTable__tooltip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
            </svg>
            <span className="FileTable__tooltip" role="tooltip">
              <span className="FileTable__tooltip-row"><b>100%</b> — max quality, file barely shrinks</span>
              <span className="FileTable__tooltip-row"><b>82%</b> — recommended: −50–70% size, quality looks the same</span>
              <span className="FileTable__tooltip-row"><b>10%</b> — max compression, visible artifacts</span>
            </span>
          </span>
        </div>
        <div className="FileTable__th">Preview</div>
        <div className="FileTable__th">Convert</div>
        <div className="FileTable__th"></div>
      </div>

      {files.map(file => (
        <FileRow
          key={file.id}
          file={file}
          onQualityChange={onQualityChange}
          onConvert={onConvert}
          onPreviewClick={onPreviewClick}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}

      <div className="FileTable__footer">
        <div className="FileTable__stats">
          <div className="FileTable__stat">
            <span className="FileTable__stat-label">Files</span>
            <span className="FileTable__stat-value">{files.length}</span>
          </div>
          <div className="FileTable__stat">
            <span className="FileTable__stat-label">Converted</span>
            <span className="FileTable__stat-value">{doneFiles.length} / {files.length}</span>
          </div>
          <div className="FileTable__stat">
            <span className="FileTable__stat-label">Original</span>
            <span className="FileTable__stat-value">
              {hasConverted ? formatSize(originalSize) : '-'}
            </span>
          </div>
          <div className="FileTable__stat">
            <span className="FileTable__stat-label">WebP size</span>
            <span className="FileTable__stat-value">
              {hasConverted ? formatSize(webpSize) : '-'}
            </span>
          </div>
          <div className="FileTable__stat">
            <span className="FileTable__stat-label">Saved</span>
            <span className={`FileTable__stat-value${
              !hasConverted ? '' :
              savedBytes > 0 ? ' FileTable__stat-value--green' :
              savedBytes < 0 ? ' FileTable__stat-value--red' : ''
            }`}>
              {!hasConverted
                ? '-'
                : savedBytes > 0
                  ? formatSize(savedBytes)
                  : savedBytes < 0
                    ? `−${formatSize(-savedBytes)}`
                    : '0 B'
              }
            </span>
          </div>
        </div>
        <div className="FileTable__actions">
          <ClearAllButton onClick={onClearAll} />
          <PrimaryButton onClick={onConvertAll}>Convert all</PrimaryButton>
          <AccentButton onClick={onDownloadAll} disabled={!hasConverted}>Download all</AccentButton>
        </div>
      </div>
    </div>
  )
}
