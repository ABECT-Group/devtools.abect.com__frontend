export const MIN_PIXEL_SIZE = 1
export const MAX_PIXEL_SIZE = 10
export const DEFAULT_PIXEL_SIZE = 5
export const MIN_QUALITY = 10
export const MAX_QUALITY = 100
export const DEFAULT_QUALITY = 100

// How many pixel-art "cells" the longer side is cut into. Size 1 is the finest
// grid that still reads as pixel art rather than a blurry thumbnail; size 10 is
// the chunkiest. Geometric steps, because perceived chunkiness is relative:
// 128 → 16 cells gives 128, 102, 81, 64, 51, 40, 32, 25, 20, 16.
const MAX_CELLS = 128
const MIN_CELLS = 16

export function cellsForPixelSize(pixelSize) {
  const t = (pixelSize - MIN_PIXEL_SIZE) / (MAX_PIXEL_SIZE - MIN_PIXEL_SIZE)
  return Math.round(MAX_CELLS * Math.pow(MIN_CELLS / MAX_CELLS, t))
}

// Quality is the palette size: 100 keeps every color, 10 leaves 4. Exponential,
// because the jump from 8 to 16 colors is far more visible than 128 to 256.
const MIN_COLORS = 4
const MAX_COLORS = 256

export function colorsForQuality(quality) {
  const t = (quality - MIN_QUALITY) / (MAX_QUALITY - MIN_QUALITY)
  return Math.round(MIN_COLORS * Math.pow(MAX_COLORS / MIN_COLORS, t))
}

// Median cut: repeatedly split the box of pixels with the widest color range at
// its median, then paint every pixel with the average color of its box. Runs on
// the small pre-upscale canvas (at most 128 × 128), so it is instant.
function quantize(canvas, colorCount) {
  const ctx = canvas.getContext('2d')
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = image.data

  const indices = []
  for (let i = 0; i < data.length; i += 4) {
    // Pixel art has hard edges: semi-transparent pixels snap to opaque or clear.
    if (data[i + 3] < 128) data[i + 3] = 0
    else {
      data[i + 3] = 255
      indices.push(i)
    }
  }

  const boxes = [indices]
  while (boxes.length < colorCount) {
    let target = -1
    let targetChannel = 0
    let targetRange = 0
    boxes.forEach((box, boxIndex) => {
      if (box.length < 2) return
      for (let channel = 0; channel < 3; channel++) {
        let lo = 255
        let hi = 0
        for (const i of box) {
          const v = data[i + channel]
          if (v < lo) lo = v
          if (v > hi) hi = v
        }
        if (hi - lo > targetRange) {
          targetRange = hi - lo
          target = boxIndex
          targetChannel = channel
        }
      }
    })
    if (target === -1) break // every remaining box is a single flat color

    const box = boxes[target]
    box.sort((a, b) => data[a + targetChannel] - data[b + targetChannel])
    const middle = box.length >> 1
    boxes.splice(target, 1, box.slice(0, middle), box.slice(middle))
  }

  for (const box of boxes) {
    if (box.length === 0) continue
    let r = 0
    let g = 0
    let b = 0
    for (const i of box) {
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
    }
    r = Math.round(r / box.length)
    g = Math.round(g / box.length)
    b = Math.round(b / box.length)
    for (const i of box) {
      data[i] = r
      data[i + 1] = g
      data[i + 2] = b
    }
  }
  ctx.putImageData(image, 0, 0)
}

function makeCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

// Halves repeatedly before the final draw: a single huge → tiny drawImage
// samples sparsely and gives noisy cells, halving averages them properly.
function downscale(source, sourceWidth, sourceHeight, targetWidth, targetHeight) {
  let current = source
  let width = sourceWidth
  let height = sourceHeight
  while (width / 2 >= targetWidth && height / 2 >= targetHeight) {
    width = Math.ceil(width / 2)
    height = Math.ceil(height / 2)
    const step = makeCanvas(width, height)
    const ctx = step.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(current, 0, 0, width, height)
    current = step
  }
  const result = makeCanvas(targetWidth, targetHeight)
  const ctx = result.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(current, 0, 0, targetWidth, targetHeight)
  return result
}

export async function pixelate(file, pixelSize, quality = DEFAULT_QUALITY) {
  const bitmap = await createImageBitmap(file)
  try {
    const { width, height } = bitmap
    const longest = Math.max(width, height)
    // Never ask for more cells than the source has pixels.
    const cells = Math.min(cellsForPixelSize(pixelSize), longest)
    const ratio = cells / longest
    const smallWidth = Math.max(1, Math.round(width * ratio))
    const smallHeight = Math.max(1, Math.round(height * ratio))

    const small = downscale(bitmap, width, height, smallWidth, smallHeight)
    if (quality < MAX_QUALITY) quantize(small, colorsForQuality(quality))

    // Whole-number upscale keeps every cell the same size, so the output stays
    // close to the original dimensions with perfectly square pixels.
    const scale = Math.max(1, Math.round(longest / cells))
    const output = makeCanvas(smallWidth * scale, smallHeight * scale)
    const ctx = output.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(small, 0, 0, output.width, output.height)

    return await new Promise((resolve, reject) => {
      output.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Conversion failed'))), 'image/png')
    })
  } finally {
    bitmap.close()
  }
}
