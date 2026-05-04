import { useEffect, useRef } from 'react'
import ImagePicker from '../../../../components/ImagePicker/ImagePicker'
import { ASPECT_PRESETS } from '../../utils/generateOGCode'
import { computeFramePercents } from '../../utils/cropToBlob'
import './OGCropEditor.scss'

const CANVAS_W = 720
const CANVAS_H = 540 // 4:3 matches CONTAINER_RATIO

export default function OGCropEditor({
  imageFile, workingImage, isQualityLoading,
  offsetXFrac, offsetYFrac, relScale, aspectKey,
  quality, onQualityChange, blobSizeKB,
  onImageSelect, onImageClear, onOffsetChange, onScaleChange,
  onAspectChange, onReset,
}) {
  const canvasRef     = useRef(null)
  const rafRef        = useRef(null)

  const isDragging      = useRef(false)
  const dragStart       = useRef({ x: 0, y: 0 })
  const dragOriginFrac  = useRef({ x: 0, y: 0 })
  const lastPinchDist   = useRef(null)

  const onOffsetRef    = useRef(onOffsetChange)
  const onScaleRef     = useRef(onScaleChange)
  const aspectKeyRef   = useRef(aspectKey)
  const offsetXRef     = useRef(offsetXFrac)
  const offsetYRef     = useRef(offsetYFrac)
  const relScaleRef    = useRef(relScale)
  onOffsetRef.current  = onOffsetChange
  onScaleRef.current   = onScaleChange
  aspectKeyRef.current = aspectKey
  offsetXRef.current   = offsetXFrac
  offsetYRef.current   = offsetYFrac
  relScaleRef.current  = relScale

  const { pctW, pctH, pctLeft, pctTop } = computeFramePercents(aspectKey)
  const pctRight  = 100 - pctLeft - pctW
  const pctBottom = 100 - pctTop  - pctH

  // ── Draw from workingImage ──────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !workingImage) return
    cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current
      if (!canvas || !workingImage) return
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

      const { pctW: fw, pctH: fh, pctLeft: fl, pctTop: ft } = computeFramePercents(aspectKeyRef.current)
      const frameW       = fw / 100 * CANVAS_W
      const frameH       = fh / 100 * CANVAS_H
      const frameCenterX = fl / 100 * CANVAS_W + frameW / 2
      const frameCenterY = ft / 100 * CANVAS_H + frameH / 2

      const coverScale = Math.max(frameW / workingImage.naturalWidth, frameH / workingImage.naturalHeight)
      const drawScale  = coverScale * relScaleRef.current

      ctx.save()
      ctx.translate(
        frameCenterX + offsetXRef.current * frameW,
        frameCenterY + offsetYRef.current * frameH,
      )
      ctx.scale(drawScale, drawScale)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(workingImage, -workingImage.naturalWidth / 2, -workingImage.naturalHeight / 2)
      ctx.restore()
    })

    return () => cancelAnimationFrame(rafRef.current)
  }, [workingImage, offsetXFrac, offsetYFrac, relScale, aspectKey])

  function getFrameCSS() {
    const el = canvasRef.current
    if (!el) return { fw: 1, fh: 1 }
    const rect = el.getBoundingClientRect()
    const { pctW, pctH } = computeFramePercents(aspectKeyRef.current)
    return { fw: rect.width * pctW / 100, fh: rect.height * pctH / 100 }
  }

  // ── Window mouse events ─────────────────────────────────────
  useEffect(() => {
    function onMouseMove(e) {
      if (!isDragging.current) return
      const { fw, fh } = getFrameCSS()
      const dxFrac = (e.clientX - dragStart.current.x) / fw
      const dyFrac = (e.clientY - dragStart.current.y) / fh
      onOffsetRef.current(dragOriginFrac.current.x + dxFrac, dragOriginFrac.current.y + dyFrac)
    }
    function onMouseUp() { isDragging.current = false }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Canvas touch + wheel ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageFile) return

    function onWheel(e) {
      e.preventDefault()
      const factor = e.deltaY > 0 ? 0.95 : 1.05
      onScaleRef.current(prev => Math.max(0.5, Math.min(4, prev * factor)))
    }

    function onTouchStart(e) {
      e.preventDefault()
      if (e.touches.length === 1) {
        isDragging.current     = true
        lastPinchDist.current  = null
        dragStart.current      = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        dragOriginFrac.current = { x: offsetXRef.current, y: offsetYRef.current }
      } else if (e.touches.length === 2) {
        isDragging.current = false
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        lastPinchDist.current = Math.hypot(dx, dy)
      }
    }

    function onTouchMove(e) {
      e.preventDefault()
      if (e.touches.length === 1 && isDragging.current) {
        const { fw, fh } = getFrameCSS()
        const dxFrac = (e.touches[0].clientX - dragStart.current.x) / fw
        const dyFrac = (e.touches[0].clientY - dragStart.current.y) / fh
        onOffsetRef.current(dragOriginFrac.current.x + dxFrac, dragOriginFrac.current.y + dyFrac)
      } else if (e.touches.length === 2 && lastPinchDist.current !== null) {
        const dx   = e.touches[0].clientX - e.touches[1].clientX
        const dy   = e.touches[0].clientY - e.touches[1].clientY
        const dist = Math.hypot(dx, dy)
        onScaleRef.current(prev => Math.max(0.5, Math.min(4, prev * (dist / lastPinchDist.current))))
        lastPinchDist.current = dist
      }
    }

    function onTouchEnd(e) {
      e.preventDefault()
      if (e.touches.length === 0) {
        isDragging.current    = false
        lastPinchDist.current = null
      } else if (e.touches.length === 1) {
        lastPinchDist.current  = null
        isDragging.current     = true
        dragStart.current      = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        dragOriginFrac.current = { x: offsetXRef.current, y: offsetYRef.current }
      }
    }

    canvas.addEventListener('wheel',      onWheel,      { passive: false })
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
    canvas.addEventListener('touchend',   onTouchEnd,   { passive: false })

    return () => {
      canvas.removeEventListener('wheel',      onWheel)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove',  onTouchMove)
      canvas.removeEventListener('touchend',   onTouchEnd)
    }
  }, [imageFile]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleMouseDown(e) {
    isDragging.current     = true
    dragStart.current      = { x: e.clientX, y: e.clientY }
    dragOriginFrac.current = { x: offsetXFrac, y: offsetYFrac }
  }

  return (
    <div className="OGCropEditor">
      {imageFile ? (
        <div className="OGCropEditor__outer">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className={`OGCropEditor__canvas${isQualityLoading ? ' OGCropEditor__canvas--loading' : ''}`}
            onMouseDown={handleMouseDown}
          />

          {/* Dim overlays */}
          <div className="OGCropEditor__dim OGCropEditor__dim--top"
            style={{ height: `${pctTop}%` }} />
          <div className="OGCropEditor__dim OGCropEditor__dim--bottom"
            style={{ height: `${pctBottom}%` }} />
          <div className="OGCropEditor__dim OGCropEditor__dim--left"
            style={{ top: `${pctTop}%`, height: `${pctH}%`, width: `${pctLeft}%` }} />
          <div className="OGCropEditor__dim OGCropEditor__dim--right"
            style={{ top: `${pctTop}%`, height: `${pctH}%`, width: `${pctRight}%` }} />

          {/* Crop frame border */}
          <div className="OGCropEditor__frame"
            style={{ left: `${pctLeft}%`, top: `${pctTop}%`, width: `${pctW}%`, height: `${pctH}%` }} />

          {/* TOP-LEFT: aspect ratio buttons */}
          <div className="OGCropEditor__aspect-overlay">
            {Object.entries(ASPECT_PRESETS).map(([key, { label, shortLabel }]) => (
              <button
                key={key}
                type="button"
                className={`OGCropEditor__ratio-btn${aspectKey === key ? ' OGCropEditor__ratio-btn--active' : ''}`}
                aria-label={label}
                data-tooltip={label}
                onClick={() => onAspectChange(key)}
              >
                {shortLabel}
              </button>
            ))}
          </div>

          {/* TOP-RIGHT: action buttons */}
          <div className="OGCropEditor__action-overlay">
            <button
              type="button"
              className="OGCropEditor__icon-btn"
              aria-label="Reset position"
              data-tooltip="Reset position"
              onClick={onReset}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.4" />
              </svg>
            </button>
            <button
              type="button"
              className="OGCropEditor__icon-btn"
              aria-label="Remove image"
              data-tooltip="Remove image"
              onClick={onImageClear}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </button>
          </div>

          {/* BOTTOM: quality (left) + zoom (right) */}
          <div className="OGCropEditor__bottom-overlay">

            <div className="OGCropEditor__ctrl-pill">
              <input
                type="range"
                className="OGCropEditor__ctrl-slider"
                min={1}
                max={100}
                step={1}
                value={quality}
                onChange={e => onQualityChange(Number(e.target.value))}
                aria-label="Export quality"
              />
              <span className="OGCropEditor__ctrl-label">
                {quality}%{blobSizeKB != null ? ` · ~${blobSizeKB} KB` : ''}
              </span>
            </div>

            <div className="OGCropEditor__ctrl-pill">
              <button
                type="button"
                className="OGCropEditor__zoom-btn"
                aria-label="Zoom out"
                onClick={() => onScaleChange(prev => Math.max(0.5, prev - 0.1))}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7.5" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <input
                type="range"
                className="OGCropEditor__ctrl-slider"
                min={0.5}
                max={4}
                step={0.01}
                value={relScale}
                onChange={e => onScaleChange(Number(e.target.value))}
                aria-label="Zoom level"
              />
              <button
                type="button"
                className="OGCropEditor__zoom-btn"
                aria-label="Zoom in"
                onClick={() => onScaleChange(prev => Math.min(4, prev + 0.1))}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7.5" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      ) : (
        <ImagePicker
          previewUrl={null}
          onFileSelect={onImageSelect}
          onClear={onImageClear}
          accept="image/*"
        />
      )}
    </div>
  )
}
