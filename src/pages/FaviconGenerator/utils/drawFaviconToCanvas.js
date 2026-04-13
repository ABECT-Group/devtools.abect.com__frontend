const IMAGE_LOADERS = new WeakMap()

function createCanvas(size) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  return canvas
}

function loadImageFromFile(file) {
  if (IMAGE_LOADERS.has(file)) {
    return IMAGE_LOADERS.get(file)
  }

  const imagePromise = new Promise((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load image file'))
    }

    image.src = url
  })

  IMAGE_LOADERS.set(file, imagePromise)
  return imagePromise
}

function applyRoundedClip(context, size, radiusPercent) {
  const r = Math.min(Math.round(size * radiusPercent / 100), size / 2)
  if (r <= 0) return

  context.beginPath()
  context.moveTo(r, 0)
  context.lineTo(size - r, 0)
  context.arcTo(size, 0, size, r, r)
  context.lineTo(size, size - r)
  context.arcTo(size, size, size - r, size, r)
  context.lineTo(r, size)
  context.arcTo(0, size, 0, size - r, r)
  context.lineTo(0, r)
  context.arcTo(0, 0, r, 0, r)
  context.closePath()
  context.clip()
}

function fillBackground(context, size, color) {
  context.fillStyle = color
  context.fillRect(0, 0, size, size)
}

function drawText(context, size, text, foregroundColor, fontScale) {
  const safeText = text.trim().slice(0, 3)
  const fontSize = Math.round(size * (fontScale / 100))

  context.fillStyle = foregroundColor
  context.textAlign = 'center'
  context.font = `600 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", "Apple Color Emoji", sans-serif`

  // textBaseline 'middle' aligns to the EM box center, not the visual glyph center.
  // Use actualBoundingBoxAscent/Descent to compute the true visual midpoint.
  context.textBaseline = 'alphabetic'
  const metrics = context.measureText(safeText)
  // baseline position that puts the glyph bounding box exactly centered
  const y = size / 2 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2

  context.fillText(safeText, size / 2, y)
}

function drawImage(context, size, image, fitMode) {
  const sourceWidth = image.naturalWidth || image.width
  const sourceHeight = image.naturalHeight || image.height

  if (!sourceWidth || !sourceHeight) {
    throw new Error('Invalid source image size')
  }

  const hasContain = fitMode === 'contain'
  const scale = hasContain
    ? Math.min(size / sourceWidth, size / sourceHeight)
    : Math.max(size / sourceWidth, size / sourceHeight)

  const drawWidth = sourceWidth * scale
  const drawHeight = sourceHeight * scale
  const offsetX = (size - drawWidth) / 2
  const offsetY = (size - drawHeight) / 2

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob)
        return
      }
      reject(new Error('Could not export PNG'))
    }, 'image/png')
  })
}

export async function drawFaviconToCanvas(canvas, options) {
  const {
    mode, text, imageFile,
    backgroundColor, foregroundColor,
    fontScale, fitMode,
    borderRadius = 0,
  } = options

  const context = canvas.getContext('2d')
  const size = canvas.width

  // Clear the entire canvas first (outside any clip)
  context.clearRect(0, 0, size, size)

  // Apply rounded clip if needed — save so we can restore after drawing
  const hasClip = borderRadius > 0
  if (hasClip) {
    context.save()
    applyRoundedClip(context, size, borderRadius)
  }

  fillBackground(context, size, backgroundColor)

  if (mode === 'text') {
    if (!text.trim()) {
      if (hasClip) context.restore()
      throw new Error('Missing text')
    }
    drawText(context, size, text, foregroundColor, fontScale)
    if (hasClip) context.restore()
    return canvas
  }

  if (!imageFile) {
    if (hasClip) context.restore()
    throw new Error('Missing image file')
  }

  const image = await loadImageFromFile(imageFile)
  drawImage(context, size, image, fitMode)
  if (hasClip) context.restore()
  return canvas
}

export async function renderFaviconPngBlob(size, options) {
  const canvas = createCanvas(size)
  await drawFaviconToCanvas(canvas, options)
  return canvasToBlob(canvas)
}
