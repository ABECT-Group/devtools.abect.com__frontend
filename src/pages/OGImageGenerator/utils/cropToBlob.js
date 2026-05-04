import { ASPECT_PRESETS } from './generateOGCode'

// Outer container fixed aspect ratio — matches OGCropEditor__outer CSS aspect-ratio
export const CONTAINER_RATIO = 4 / 3

const IMAGE_LOADERS = new WeakMap()

export function loadImage(file) {
  if (IMAGE_LOADERS.has(file)) return IMAGE_LOADERS.get(file)
  const promise = new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload  = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not load image')) }
    img.src = url
  })
  IMAGE_LOADERS.set(file, promise)
  return promise
}

// Returns frame position as percentages of the outer container.
// pctLeft/pctTop = offset from container edge to frame edge.
export function computeFramePercents(aspectKey) {
  const { width: ew, height: eh } = ASPECT_PRESETS[aspectKey]
  const exportRatio = ew / eh

  if (exportRatio >= CONTAINER_RATIO) {
    // Frame fills full width, is shorter than container
    const pctH = (CONTAINER_RATIO / exportRatio) * 100
    return { pctW: 100, pctH, pctLeft: 0, pctTop: (100 - pctH) / 2 }
  } else {
    // Frame fills full height, is narrower than container
    const pctW = (exportRatio / CONTAINER_RATIO) * 100
    return { pctW, pctH: 100, pctLeft: (100 - pctW) / 2, pctTop: 0 }
  }
}

// Export the cropped image.
// imageObj: already-loaded Image element (quality-adjusted working image).
// offsetXFrac/YFrac: image shift as fraction of the export frame size (0 = centered).
// relScale: 1.0 = image just covers the frame (cover fit); > 1.0 = zoomed in.
export async function cropToBlob({ imageObj, offsetXFrac, offsetYFrac, relScale, aspectKey, quality = 100 }) {
  const { width: exportW, height: exportH } = ASPECT_PRESETS[aspectKey]
  const canvas = document.createElement('canvas')
  canvas.width  = exportW
  canvas.height = exportH
  const ctx = canvas.getContext('2d')

  const coverScale = Math.max(exportW / imageObj.naturalWidth, exportH / imageObj.naturalHeight)
  const drawScale  = coverScale * relScale

  ctx.save()
  ctx.translate(
    exportW / 2 + offsetXFrac * exportW,
    exportH / 2 + offsetYFrac * exportH,
  )
  ctx.scale(drawScale, drawScale)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(imageObj, -imageObj.naturalWidth / 2, -imageObj.naturalHeight / 2)
  ctx.restore()

  // imageObj is already quality-adjusted — encode at max quality to avoid double compression
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('Export failed')),
      'image/jpeg',
      quality / 100,
    )
  })
}
