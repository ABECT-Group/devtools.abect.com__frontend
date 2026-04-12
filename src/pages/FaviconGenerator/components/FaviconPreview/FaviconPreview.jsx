import { useEffect, useRef } from 'react'
import { drawFaviconToCanvas } from '../../utils/drawFaviconToCanvas'
import './FaviconPreview.scss'

const SIZE_CARDS = [
  { size: 16, label: '16×16', desc: 'Tab small' },
  { size: 32, label: '32×32', desc: 'Tab / taskbar' },
  { size: 64, label: '64×64', desc: 'High-DPI' },
  { size: 180, label: '180×180', desc: 'Apple Touch' },
]

function PreviewCanvas({ canvasSize, displaySize, options, className }) {
  const canvasRef = useRef(null)
  const { mode, text, imageFile, backgroundColor, foregroundColor, fontScale, fitMode, borderRadius, isEmpty } = options

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (isEmpty) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    drawFaviconToCanvas(canvas, { mode, text, imageFile, backgroundColor, foregroundColor, fontScale, fitMode, borderRadius })
      .catch(() => {})
  }, [mode, text, imageFile, backgroundColor, foregroundColor, fontScale, fitMode, borderRadius, isEmpty])

  const style = displaySize
    ? { width: `${displaySize}px`, height: `${displaySize}px` }
    : undefined

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={canvasSize}
      height={canvasSize}
      style={style}
    />
  )
}

export default function FaviconPreview({
  mode, text, imageFile, backgroundColor, foregroundColor,
  fontScale, borderRadius, fitMode, isEmpty,
}) {
  const options = { mode, text, imageFile, backgroundColor, foregroundColor, fontScale, borderRadius, fitMode, isEmpty }

  return (
    <section className="FaviconPreview">
      <div className="FaviconPreview__eyebrow">Live preview</div>

      <div className="FaviconPreview__body">
        {/* Left: large preview */}
        <div className="FaviconPreview__hero-wrap">
          {isEmpty ? (
            <p className="FaviconPreview__empty">Add text, emoji,<br />or an image to preview</p>
          ) : (
            <PreviewCanvas
              canvasSize={256}
              options={options}
              className="FaviconPreview__hero-canvas"
            />
          )}
        </div>

        {/* Right: size cards */}
        <div className="FaviconPreview__sizes">
          {SIZE_CARDS.map(({ size, label, desc }) => (
            <div key={size} className="FaviconPreview__size-card">
              <div className="FaviconPreview__size-icon">
                {isEmpty ? (
                  <div
                    className="FaviconPreview__size-placeholder"
                    style={{ width: Math.min(size, 44), height: Math.min(size, 44) }}
                  />
                ) : (
                  <PreviewCanvas
                    canvasSize={size}
                    displaySize={Math.min(size, 44)}
                    options={options}
                    className="FaviconPreview__size-canvas"
                  />
                )}
              </div>
              <div className="FaviconPreview__size-info">
                <span className="FaviconPreview__size-label">{label}</span>
                <span className="FaviconPreview__size-desc">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
