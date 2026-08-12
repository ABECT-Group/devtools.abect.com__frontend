import { useEffect, useRef, useState } from 'react'
import { PrimaryButton, SecondaryButton } from '../../../../components/Buttons/Buttons'
import { createMatrix, drawMatrixToCanvas, drawLogoToCanvas } from '../../utils/renderQr'
import { buildSvg, canvasToPngBlob, downloadBlob, svgToBlob, fileToDataUri } from '../../utils/exportQr'
import './QrPreview.scss'

// Bitmap resolution of the on-screen canvas. Higher than the CSS size so the
// code stays sharp when the column goes full-width on a phone.
const PREVIEW_SIZE = 640

// Shown at low opacity before the form has anything in it — an empty box tells
// the user nothing, whereas a faded real code shows exactly what their color
// and shape choices will look like.
const PLACEHOLDER_PAYLOAD = 'https://devtools.abect.com/'

export default function QrPreview({ payload, style, logoFile, logoPreviewUrl, validation, filename }) {
  const canvasRef = useRef(null)
  // Cached alongside the input that produced it — a stale matrix must never be
  // reused for export after the payload changes.
  const matrixRef = useRef(null)
  const [logoImage, setLogoImage] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const { missing, warnings, isValid, byteLength, capacity } = validation
  const isPlaceholder = !isValid
  const drawnPayload = isValid ? payload : PLACEHOLDER_PAYLOAD

  // Decode the logo once per file. Keeping the decoded image in state means a
  // color change redraws without touching the file again, and makes the
  // decoded image a proper dependency of the draw effect.
  useEffect(() => {
    if (!logoPreviewUrl) {
      setLogoImage(null)
      return
    }
    let cancelled = false
    const image = new Image()
    image.onload = () => { if (!cancelled) setLogoImage(image) }
    image.onerror = () => { if (!cancelled) setError('Could not read that image file.') }
    image.src = logoPreviewUrl
    return () => { cancelled = true }
  }, [logoPreviewUrl])

  // Canvas work only ever runs in an effect — during prerender there is no DOM.
  useEffect(() => {
    let cancelled = false

    async function draw() {
      try {
        const matrix = await createMatrix(drawnPayload, style.ecc)
        if (cancelled) return

        matrixRef.current = { payload: drawnPayload, ecc: style.ecc, matrix }
        setError('')

        const target = canvasRef.current
        if (!target) return
        // The on-screen canvas is fixed-size; export renders at the chosen size.
        const previewStyle = { ...style, size: PREVIEW_SIZE }
        drawMatrixToCanvas(target, matrix, previewStyle)
        if (logoImage) drawLogoToCanvas(target, logoImage, matrix, previewStyle)
      } catch {
        if (cancelled) return
        matrixRef.current = null
        setError('This content is too long to fit into a QR code. Shorten it and try again.')
      }
    }

    draw()
    return () => { cancelled = true }
  }, [drawnPayload, style, logoImage])

  /** Returns the matrix for the current payload, reusing the cache only on an exact hit. */
  async function currentMatrix() {
    const cached = matrixRef.current
    if (cached && cached.payload === payload && cached.ecc === style.ecc) return cached.matrix
    return createMatrix(payload, style.ecc)
  }

  async function handleDownloadPng() {
    if (!isValid) return
    setBusy(true)
    try {
      const matrix = await currentMatrix()
      const canvas = document.createElement('canvas')
      drawMatrixToCanvas(canvas, matrix, style)
      if (logoImage) drawLogoToCanvas(canvas, logoImage, matrix, style)
      downloadBlob(await canvasToPngBlob(canvas), `${filename}.png`)
    } catch {
      setError('Could not export the PNG. Try a smaller size.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDownloadSvg() {
    if (!isValid) return
    setBusy(true)
    try {
      const matrix = await currentMatrix()
      const logoDataUri = logoFile ? await fileToDataUri(logoFile) : null
      downloadBlob(svgToBlob(buildSvg(matrix, style, logoDataUri)), `${filename}.svg`)
    } catch {
      setError('Could not export the SVG.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="QrPreview">
      <div className="QrPreview__box">
        <div className="QrPreview__canvas-wrap">
          <canvas
            ref={canvasRef}
            className={`QrPreview__canvas${isPlaceholder ? ' QrPreview__canvas--placeholder' : ''}`}
            width={PREVIEW_SIZE}
            height={PREVIEW_SIZE}
          />
          {isPlaceholder && (
            <span className="QrPreview__placeholder-label">
              Example — fill in the form to generate your code
            </span>
          )}
        </div>
      </div>

      <div className="QrPreview__validation">
        {isValid ? (
          <div className="QrPreview__status QrPreview__status--ok">
            <svg className="QrPreview__status-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Ready to download — {byteLength} of {capacity} bytes used
          </div>
        ) : (
          <div className="QrPreview__status QrPreview__status--error">
            <svg className="QrPreview__status-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="currentColor" />
            </svg>
            Nothing to encode yet
          </div>
        )}

        {missing.length > 0 && (
          <ul className="QrPreview__missing">
            {missing.map((label, i) => <li key={i}>{label}</li>)}
          </ul>
        )}

        {warnings.length > 0 && (
          <ul className="QrPreview__warnings">
            {warnings.map((w, i) => (
              <li key={i}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M8 6v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="8" cy="11" r="0.6" fill="currentColor" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        )}

        {error && <p className="QrPreview__error">{error}</p>}
      </div>

      <div className="QrPreview__actions">
        <PrimaryButton
          onClick={handleDownloadPng}
          loading={busy}
          loadingText="Exporting…"
          disabled={!isValid}
          fullWidth
        >
          Download PNG
        </PrimaryButton>
        <SecondaryButton onClick={handleDownloadSvg} disabled={!isValid || busy} fullWidth>
          Download SVG
        </SecondaryButton>
      </div>

      <p className="QrPreview__note">
        SVG is vector — use it for anything printed. PNG is the right choice for screens.
      </p>
    </div>
  )
}
