import CodeBox from '../../../../components/CodeBox/CodeBox'
import ImagePicker from '../../../../components/ImagePicker/ImagePicker'
import { PrimaryButton } from '../../../../components/Buttons/Buttons'
import SegmentedControl from '../../../../components/SegmentedControl/SegmentedControl'
import './FaviconControls.scss'

const HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`

export default function FaviconControls({
  mode,
  text,
  backgroundColor,
  foregroundColor,
  fontScale,
  borderRadius,
  fitMode,
  imagePreviewUrl,
  isGenerating,
  errorMessage,
  onModeChange,
  onTextChange,
  onBackgroundColorChange,
  onForegroundColorChange,
  onFontScaleChange,
  onBorderRadiusChange,
  onFitModeChange,
  onImageSelect,
  onImageClear,
  onDownload,
}) {
  return (
    <div className="FaviconControls">

      <SegmentedControl
        options={[
          { value: 'text',  label: 'Text / Emoji' },
          { value: 'image', label: 'Image' },
        ]}
        value={mode}
        onChange={onModeChange}
      />

      {/* Text mode inputs */}
      {mode === 'text' ? (
        <>
          <div className="FaviconControls__field">
            <label className="FaviconControls__label" htmlFor="favicon-text">
              Text or emoji
            </label>
            <input
              id="favicon-text"
              className="FaviconControls__input"
              type="text"
              maxLength="3"
              value={text}
              onChange={event => onTextChange(event.target.value)}
              placeholder="A or 😀"
            />
            <p className="FaviconControls__hint">Single letter, number, symbol, or any emoji</p>
          </div>

          <div className="FaviconControls__field">
            <div className="FaviconControls__label-row">
              <label className="FaviconControls__label" htmlFor="favicon-font-scale">
                Font size
              </label>
              <span className="FaviconControls__value">{fontScale}%</span>
            </div>
            <input
              id="favicon-font-scale"
              className="FaviconControls__range"
              type="range"
              min="10"
              max="100"
              value={fontScale}
              onChange={event => onFontScaleChange(Number(event.target.value))}
            />
          </div>

          <div className="FaviconControls__colors">
            <label className="FaviconControls__color-field">
              <span className="FaviconControls__label">Background</span>
              <div className="FaviconControls__color-row">
                <input
                  className="FaviconControls__color-swatch"
                  type="color"
                  value={backgroundColor}
                  onChange={event => onBackgroundColorChange(event.target.value)}
                />
                <span className="FaviconControls__color-hex">{backgroundColor}</span>
              </div>
            </label>
            <label className="FaviconControls__color-field">
              <span className="FaviconControls__label">Text color</span>
              <div className="FaviconControls__color-row">
                <input
                  className="FaviconControls__color-swatch"
                  type="color"
                  value={foregroundColor}
                  onChange={event => onForegroundColorChange(event.target.value)}
                />
                <span className="FaviconControls__color-hex">{foregroundColor}</span>
              </div>
            </label>
          </div>
        </>
      ) : (
        <>
          <div className="FaviconControls__field">
            <ImagePicker
              previewUrl={imagePreviewUrl}
              onFileSelect={onImageSelect}
              onClear={onImageClear}
            />
          </div>

          <div className="FaviconControls__row">
            <div className="FaviconControls__row-half">
              <label className="FaviconControls__label" htmlFor="favicon-fit-mode">
                Image fit
              </label>
              <select
                id="favicon-fit-mode"
                className="FaviconControls__select"
                value={fitMode}
                onChange={event => onFitModeChange(event.target.value)}
              >
                <option value="cover">Cover — fill entire icon</option>
                <option value="contain">Contain — show full image</option>
              </select>
            </div>
            <div className="FaviconControls__row-half">
              <label className="FaviconControls__label" htmlFor="favicon-bg-img">
                Background
              </label>
              <div className="FaviconControls__color-row">
                <input
                  id="favicon-bg-img"
                  className="FaviconControls__color-swatch"
                  type="color"
                  value={backgroundColor}
                  onChange={event => onBackgroundColorChange(event.target.value)}
                />
                <span className="FaviconControls__color-hex">{backgroundColor}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Corner radius — shown in both modes */}
      <div className="FaviconControls__field">
        <div className="FaviconControls__label-row">
          <label className="FaviconControls__label" htmlFor="favicon-border-radius">
            Corner radius
          </label>
          <span className="FaviconControls__value">{borderRadius}%</span>
        </div>
        <input
          id="favicon-border-radius"
          className="FaviconControls__range"
          type="range"
          min="0"
          max="50"
          value={borderRadius}
          onChange={event => onBorderRadiusChange(Number(event.target.value))}
        />
        <p className="FaviconControls__hint">0% = square · 50% = circle</p>
      </div>

      {errorMessage && (
        <p className="FaviconControls__error">{errorMessage}</p>
      )}

      <PrimaryButton onClick={onDownload} loading={isGenerating} loadingText="Generating…" fullWidth>
        <svg className="FaviconControls__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download favicon package
      </PrimaryButton>

      {/* HTML snippet */}
      <CodeBox label="Paste into <head>" code={HTML_SNIPPET} />

    </div>
  )
}
