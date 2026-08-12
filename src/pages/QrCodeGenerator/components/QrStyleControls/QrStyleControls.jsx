import ImagePicker from '../../../../components/ImagePicker/ImagePicker'
import SegmentedControl from '../../../../components/SegmentedControl/SegmentedControl'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import { DOT_STYLE_OPTIONS, ECC_OPTIONS, SIZE_OPTIONS } from '../../data/types'
import './QrStyleControls.scss'

export default function QrStyleControls({
  style,
  logoPreviewUrl,
  onStyleChange,
  onLogoSelect,
  onLogoClear,
}) {
  const hasLogo = Boolean(logoPreviewUrl)

  return (
    <div className="QrStyleControls">

      <div className="QrStyleControls__group">
        <span className="QrStyleControls__group-label">Colors</span>

        <div className="QrStyleControls__colors">
          <label className="QrStyleControls__color-field">
            <span className="QrStyleControls__label">Foreground</span>
            <div className="QrStyleControls__color-row">
              <input
                className="QrStyleControls__color-swatch"
                type="color"
                value={style.foreground}
                onChange={e => onStyleChange('foreground', e.target.value)}
              />
              <span className="QrStyleControls__color-hex">{style.foreground}</span>
            </div>
          </label>

          <label className="QrStyleControls__color-field">
            <span className="QrStyleControls__label">Background</span>
            <div className="QrStyleControls__color-row">
              <input
                className="QrStyleControls__color-swatch"
                type="color"
                value={style.background}
                onChange={e => onStyleChange('background', e.target.value)}
                disabled={style.transparent}
              />
              <span className="QrStyleControls__color-hex">
                {style.transparent ? 'transparent' : style.background}
              </span>
            </div>
          </label>
        </div>

        <label className="QrStyleControls__checkbox">
          <input
            type="checkbox"
            checked={style.transparent}
            onChange={e => onStyleChange('transparent', e.target.checked)}
          />
          <span>Transparent background</span>
          <Tooltip>
            Useful when placing the code over a colored layout. Keep in mind that scanners
            need contrast against whatever ends up behind it — a transparent code on a dark
            background will not scan.
          </Tooltip>
        </label>
      </div>

      <div className="QrStyleControls__group">
        <span className="QrStyleControls__group-label">Shape</span>

        <div className="QrStyleControls__field">
          <span className="QrStyleControls__label">Module style</span>
          <SegmentedControl
            options={DOT_STYLE_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
            value={style.dotStyle}
            onChange={value => onStyleChange('dotStyle', value)}
          />
          <p className="QrStyleControls__hint">
            The three corner squares always stay square — scanners lock onto them first.
          </p>
        </div>

        <div className="QrStyleControls__field">
          <div className="QrStyleControls__label-row">
            <span className="QrStyleControls__label">Quiet zone</span>
            <span className="QrStyleControls__value">{style.margin} modules</span>
          </div>
          <input
            className="QrStyleControls__range"
            type="range"
            min="0"
            max="8"
            value={style.margin}
            onChange={e => onStyleChange('margin', Number(e.target.value))}
          />
          <p className="QrStyleControls__hint">
            Fine at 1 for screens. Raise it to 4 before printing — that is the specification
            minimum, and too little margin is the most common print failure.
          </p>
        </div>
      </div>

      <div className="QrStyleControls__group">
        <span className="QrStyleControls__group-label">Logo</span>

        <ImagePicker
          previewUrl={logoPreviewUrl}
          onFileSelect={onLogoSelect}
          onClear={onLogoClear}
        />

        {hasLogo && (
          <p className="QrStyleControls__notice">
            Error correction raised to level H so the code still scans with the center covered.
          </p>
        )}
      </div>

      <div className="QrStyleControls__group">
        <span className="QrStyleControls__group-label">Export</span>

        <div className="QrStyleControls__row">
          <div className="QrStyleControls__row-half">
            <label className="QrStyleControls__label" htmlFor="qr-size">Size</label>
            <select
              id="qr-size"
              className="QrStyleControls__select"
              value={style.size}
              onChange={e => onStyleChange('size', Number(e.target.value))}
            >
              {SIZE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="QrStyleControls__row-half">
            <label className="QrStyleControls__label" htmlFor="qr-ecc">
              Correction
              <Tooltip>
                Higher levels recover more of a damaged or covered code but produce a denser
                pattern. Level H is required when a logo covers the center.
              </Tooltip>
            </label>
            <select
              id="qr-ecc"
              className="QrStyleControls__select"
              value={style.ecc}
              onChange={e => onStyleChange('ecc', e.target.value)}
              disabled={hasLogo}
            >
              {ECC_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

    </div>
  )
}
