// Matrix → pixels. We draw the modules ourselves instead of using the library's
// own renderer, because that is the only way to control dot shape, punch a real
// hole behind the logo (rather than painting over live modules), and emit SVG
// from the same geometry.

/**
 * `qrcode` is ~20 kB and only needed once someone actually generates a code,
 * so it is imported at the call site — a static import would put it in the
 * entry chunk of all 50+ prerendered pages.
 */
export async function createMatrix(payload, errorCorrectionLevel) {
  const { create } = await import('qrcode')
  const qr = create(payload, { errorCorrectionLevel })
  return {
    size: qr.modules.size,
    data: qr.modules.data, // Uint8Array, 1 = dark module
    version: qr.version,
  }
}

/** True when the module at (row, col) is dark. Out-of-range reads as light. */
function isDark(matrix, row, col) {
  if (row < 0 || col < 0 || row >= matrix.size || col >= matrix.size) return false
  return matrix.data[row * matrix.size + col] === 1
}

/**
 * Modules covered by the logo are skipped entirely, so the background shows
 * through. Painting the logo on top of live modules leaves dark fringes that
 * some scanners read as data.
 */
function buildLogoMask(matrix, logoRatio) {
  if (!logoRatio) return null
  const span = Math.ceil(matrix.size * logoRatio)
  // Center the hole and keep it symmetric — an off-by-one makes the logo
  // sit visibly off-center on small versions.
  const start = Math.floor((matrix.size - span) / 2)
  return { start, end: start + span }
}

function isMasked(mask, row, col) {
  if (!mask) return false
  return row >= mask.start && row < mask.end && col >= mask.start && col < mask.end
}

/**
 * Geometry shared by the canvas and SVG renderers, so both always agree.
 * Returns the module size in device pixels and the drawing offset.
 */
export function computeGeometry(matrix, size, margin) {
  const total = matrix.size + margin * 2
  const moduleSize = size / total
  const offset = margin * moduleSize
  return { moduleSize, offset, total }
}

function drawSquare(ctx, x, y, s) {
  ctx.fillRect(x, y, s, s)
}

function drawDot(ctx, x, y, s) {
  const r = s / 2
  ctx.beginPath()
  ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
  ctx.fill()
}

function drawRounded(ctx, x, y, s, radius) {
  const r = Math.min(radius, s / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + s - r, y)
  ctx.arcTo(x + s, y, x + s, y + r, r)
  ctx.lineTo(x + s, y + s - r)
  ctx.arcTo(x + s, y + s, x + s - r, y + s, r)
  ctx.lineTo(x + r, y + s)
  ctx.arcTo(x, y + s, x, y + s - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
  ctx.fill()
}

/**
 * The three finder patterns are what a scanner locks onto first. They stay
 * square even in dot mode — rounding them measurably hurts detection on cheap
 * cameras, and every serious styled-QR implementation keeps them intact.
 */
function isFinderModule(matrix, row, col) {
  const s = matrix.size
  const inBlock = (r0, c0) => row >= r0 && row < r0 + 7 && col >= c0 && col < c0 + 7
  return inBlock(0, 0) || inBlock(0, s - 7) || inBlock(s - 7, 0)
}

/**
 * Draws the code onto an existing canvas. The canvas is sized by the caller so
 * the same function serves both the on-screen preview and the export render.
 */
export function drawMatrixToCanvas(canvas, matrix, style) {
  const {
    size, margin, foreground, background, dotStyle, transparent, logoRatio,
  } = style

  const ctx = canvas.getContext('2d')
  canvas.width = size
  canvas.height = size

  ctx.clearRect(0, 0, size, size)
  if (!transparent) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, size, size)
  }

  const { moduleSize, offset } = computeGeometry(matrix, size, margin)
  const mask = buildLogoMask(matrix, logoRatio)

  ctx.fillStyle = foreground

  for (let row = 0; row < matrix.size; row++) {
    for (let col = 0; col < matrix.size; col++) {
      if (!isDark(matrix, row, col)) continue
      if (isMasked(mask, row, col)) continue

      const x = offset + col * moduleSize
      const y = offset + row * moduleSize

      if (dotStyle === 'square' || isFinderModule(matrix, row, col)) {
        // +0.5 closes the hairline seams that appear between adjacent
        // fractional-width rects at some canvas sizes.
        drawSquare(ctx, x, y, moduleSize + 0.5)
      } else if (dotStyle === 'dots') {
        drawDot(ctx, x, y, moduleSize)
      } else {
        drawRounded(ctx, x, y, moduleSize + 0.5, moduleSize * 0.35)
      }
    }
  }

  return { moduleSize, offset, mask }
}

/**
 * Draws the logo centered over the punched-out area. Called after the modules,
 * on the same canvas.
 */
export function drawLogoToCanvas(canvas, image, matrix, style) {
  const { size, margin, logoRatio, background, transparent } = style
  if (!logoRatio || !image) return

  const ctx = canvas.getContext('2d')
  const { moduleSize, offset } = computeGeometry(matrix, size, margin)
  const mask = buildLogoMask(matrix, logoRatio)

  const boxX = offset + mask.start * moduleSize
  const boxY = offset + mask.start * moduleSize
  const boxSize = (mask.end - mask.start) * moduleSize

  // A quiet zone behind the logo keeps it legible against dark modules.
  if (!transparent) {
    ctx.fillStyle = background
    ctx.fillRect(boxX, boxY, boxSize, boxSize)
  }

  // Contain the logo inside the box, preserving its aspect ratio.
  const pad = boxSize * 0.1
  const inner = boxSize - pad * 2
  const w = image.naturalWidth || image.width
  const h = image.naturalHeight || image.height
  if (!w || !h) return

  const scale = Math.min(inner / w, inner / h)
  const drawW = w * scale
  const drawH = h * scale

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(
    image,
    boxX + (boxSize - drawW) / 2,
    boxY + (boxSize - drawH) / 2,
    drawW,
    drawH,
  )
}

export { isDark, buildLogoMask, isMasked, isFinderModule }
