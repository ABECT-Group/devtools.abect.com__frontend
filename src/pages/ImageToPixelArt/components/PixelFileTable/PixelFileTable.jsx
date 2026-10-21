import { formatSize } from '../../utils/formatSize'
import PixelFileRow from '../PixelFileRow/PixelFileRow'
import SettingPopover from '../SettingPopover/SettingPopover'
import { ClearAllButton, PrimaryButton, AccentButton } from '../../../../components/Buttons/Buttons'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import './PixelFileTable.scss'

export default function PixelFileTable({ files, globalSize, onGlobalSizeChange, globalQuality, onGlobalQualityChange, onSizeChange, onQualityChange, onConvert, onConvertAll, onDownload, onDownloadAll, onDelete, onClearAll, onPreviewClick }) {
  const doneFiles = files.filter(file => file.status === 'done')
  const hasConverted = doneFiles.length > 0
  // Compare only converted files: original vs result (apples-to-apples)
  const originalSize = doneFiles.reduce((sum, file) => sum + file.originalSize, 0)
  const resultSize = doneFiles.reduce((sum, file) => sum + (file.resultSize ?? 0), 0)
  const savedBytes = originalSize - resultSize  // can be negative if the PNG is larger

  return (
    <div className="PixelFileTable">
      <div className="PixelFileTable__head">
        <div className="PixelFileTable__th"></div>
        <div className="PixelFileTable__th">File</div>
        <div className="PixelFileTable__th">
          <SettingPopover label="Pixel size for all files" value={globalSize} onChange={onGlobalSizeChange} min={1} max={10} />
          Pixel size
          <Tooltip>
            <span className="Tooltip__row"><b>1</b> — finest grid, most detail, still reads as pixel art</span>
            <span className="Tooltip__row"><b>5</b> — balanced retro look</span>
            <span className="Tooltip__row"><b>10</b> — coarsest grid, big chunky pixels</span>
          </Tooltip>
        </div>
        <div className="PixelFileTable__th">
          <SettingPopover label="Quality for all files" value={globalQuality} onChange={onGlobalQualityChange} min={10} max={100} suffix="%" />
          Quality
          <Tooltip>
            <span className="Tooltip__row"><b>100%</b> — every color kept, smooth gradients</span>
            <span className="Tooltip__row"><b>60%</b> — limited palette, classic retro look</span>
            <span className="Tooltip__row"><b>10%</b> — only a handful of colors, smallest file</span>
          </Tooltip>
        </div>
        <div className="PixelFileTable__th">Preview</div>
        <div className="PixelFileTable__th">Convert</div>
        <div className="PixelFileTable__th"></div>
      </div>

      {files.map(file => (
        <PixelFileRow
          key={file.id}
          file={file}
          onSizeChange={onSizeChange}
          onQualityChange={onQualityChange}
          onConvert={onConvert}
          onPreviewClick={onPreviewClick}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}

      <div className="PixelFileTable__footer">
        <div className="PixelFileTable__stats">
          <div className="PixelFileTable__stat">
            <span className="PixelFileTable__stat-label">Files</span>
            <span className="PixelFileTable__stat-value">{files.length}</span>
          </div>
          <div className="PixelFileTable__stat">
            <span className="PixelFileTable__stat-label">Converted</span>
            <span className="PixelFileTable__stat-value">{doneFiles.length} / {files.length}</span>
          </div>
          <div className="PixelFileTable__stat">
            <span className="PixelFileTable__stat-label">Original</span>
            <span className="PixelFileTable__stat-value">
              {hasConverted ? formatSize(originalSize) : '-'}
            </span>
          </div>
          <div className="PixelFileTable__stat">
            <span className="PixelFileTable__stat-label">Result</span>
            <span className="PixelFileTable__stat-value">
              {hasConverted ? formatSize(resultSize) : '-'}
            </span>
          </div>
          <div className="PixelFileTable__stat">
            <span className="PixelFileTable__stat-label">Saved</span>
            <span className={`PixelFileTable__stat-value${
              !hasConverted ? '' :
              savedBytes > 0 ? ' PixelFileTable__stat-value--green' :
              savedBytes < 0 ? ' PixelFileTable__stat-value--red' : ''
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
        <div className="PixelFileTable__actions">
          <ClearAllButton onClick={onClearAll} />
          <PrimaryButton onClick={onConvertAll}>Convert all</PrimaryButton>
          <AccentButton onClick={onDownloadAll} disabled={!hasConverted}>Download all</AccentButton>
        </div>
      </div>
    </div>
  )
}
