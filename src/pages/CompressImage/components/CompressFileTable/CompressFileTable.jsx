import { formatSize } from '../../utils/formatSize'
import CompressFileRow from '../CompressFileRow/CompressFileRow'
import { ClearAllButton, PrimaryButton, AccentButton } from '../../../../components/Buttons/Buttons'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import './CompressFileTable.scss'

export default function CompressFileTable({
  files, toLabel, hasQuality,
  onCompress, onCompressAll,
  onQualityChange, onPreviewClick,
  onDownload, onDownloadAll,
  onDelete, onClearAll,
}) {
  const doneFiles    = files.filter(f => f.status === 'done')
  const hasCompressed = doneFiles.length > 0
  const originalSize  = doneFiles.reduce((sum, f) => sum + f.originalSize, 0)
  const resultSize    = doneFiles.reduce((sum, f) => sum + (f.resultSize ?? 0), 0)
  const savedBytes    = originalSize - resultSize
  const savedPct      = originalSize > 0 ? Math.round((savedBytes / originalSize) * 100) : 0

  return (
    <div className={`CompressFileTable${!hasQuality ? ' CompressFileTable--lossless' : ''}`}>
      <div className="CompressFileTable__head">
        <div className="CompressFileTable__th"></div>
        <div className="CompressFileTable__th">File</div>
        {hasQuality && (
          <div className="CompressFileTable__th">
            Quality
            <Tooltip>
              <span className="Tooltip__row"><b>100%</b> — max quality, file barely shrinks</span>
              <span className="Tooltip__row"><b>82%</b> — recommended: −50–70% size, quality looks the same</span>
              <span className="Tooltip__row"><b>10%</b> — max compression, visible artifacts</span>
            </Tooltip>
          </div>
        )}
        <div className="CompressFileTable__th">Preview</div>
        <div className="CompressFileTable__th">Compress</div>
        <div className="CompressFileTable__th"></div>
      </div>

      {files.map(file => (
        <CompressFileRow
          key={file.id}
          file={file}
          toLabel={toLabel}
          hasQuality={hasQuality}
          onCompress={onCompress}
          onQualityChange={onQualityChange}
          onPreviewClick={onPreviewClick}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}

      <div className="CompressFileTable__footer">
        <div className="CompressFileTable__stats">
          <div className="CompressFileTable__stat">
            <span className="CompressFileTable__stat-label">Files</span>
            <span className="CompressFileTable__stat-value">{files.length}</span>
          </div>
          <div className="CompressFileTable__stat">
            <span className="CompressFileTable__stat-label">Compressed</span>
            <span className="CompressFileTable__stat-value">{doneFiles.length} / {files.length}</span>
          </div>
          <div className="CompressFileTable__stat">
            <span className="CompressFileTable__stat-label">Original</span>
            <span className="CompressFileTable__stat-value">
              {hasCompressed ? formatSize(originalSize) : '—'}
            </span>
          </div>
          <div className="CompressFileTable__stat">
            <span className="CompressFileTable__stat-label">{toLabel} size</span>
            <span className="CompressFileTable__stat-value">
              {hasCompressed ? formatSize(resultSize) : '—'}
            </span>
          </div>
          <div className="CompressFileTable__stat">
            <span className="CompressFileTable__stat-label">Saved</span>
            <span className={`CompressFileTable__stat-value${
              !hasCompressed ? '' :
              savedBytes > 0 ? ' CompressFileTable__stat-value--green' :
              savedBytes < 0 ? ' CompressFileTable__stat-value--red' : ''
            }`}>
              {!hasCompressed
                ? '—'
                : savedBytes > 0
                  ? `${formatSize(savedBytes)} (−${savedPct}%)`
                  : savedBytes < 0
                    ? `−${formatSize(-savedBytes)}`
                    : '0 B'
              }
            </span>
          </div>
        </div>

        <div className="CompressFileTable__actions">
          <ClearAllButton onClick={onClearAll} />
          <PrimaryButton onClick={onCompressAll}>Compress all</PrimaryButton>
          <AccentButton onClick={onDownloadAll} disabled={!hasCompressed}>Download all</AccentButton>
        </div>
      </div>
    </div>
  )
}
