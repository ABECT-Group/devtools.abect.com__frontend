import {
  computeGeometry, isDark, buildLogoMask, isMasked, isFinderModule,
} from './renderQr.js'

/** Shared download helper — same pattern as the favicon generator. */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('Could not export PNG'))
    }, 'image/png')
  })
}

/** Trims float noise so the SVG source stays readable. */
const n = (value) => Number(value.toFixed(3))

/**
 * Builds SVG from the same matrix the canvas uses — that is the payoff for
 * owning the renderer. A vector code prints at any size without resampling,
 * which matters for stickers, packaging and large-format signage.
 *
 * `logoDataUri` must be a data: URI: an external href would not survive being
 * opened from disk or placed in a print workflow.
 */
export function buildSvg(matrix, style, logoDataUri) {
  const {
    size, margin, foreground, background, dotStyle, transparent, logoRatio,
  } = style

  const { moduleSize, offset } = computeGeometry(matrix, size, margin)
  const mask = buildLogoMask(matrix, logoRatio)
  const shapes = []

  for (let row = 0; row < matrix.size; row++) {
    for (let col = 0; col < matrix.size; col++) {
      if (!isDark(matrix, row, col)) continue
      if (isMasked(mask, row, col)) continue

      const x = n(offset + col * moduleSize)
      const y = n(offset + row * moduleSize)
      const s = n(moduleSize)

      if (dotStyle === 'dots' && !isFinderModule(matrix, row, col)) {
        const r = n(moduleSize / 2)
        shapes.push(`<circle cx="${n(offset + col * moduleSize + moduleSize / 2)}" cy="${n(offset + row * moduleSize + moduleSize / 2)}" r="${r}"/>`)
      } else if (dotStyle === 'rounded' && !isFinderModule(matrix, row, col)) {
        shapes.push(`<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${n(moduleSize * 0.35)}"/>`)
      } else {
        shapes.push(`<rect x="${x}" y="${y}" width="${s}" height="${s}"/>`)
      }
    }
  }

  const bg = transparent
    ? ''
    : `<rect width="${size}" height="${size}" fill="${background}"/>`

  let logo = ''
  if (logoDataUri && mask) {
    const boxX = offset + mask.start * moduleSize
    const boxSize = (mask.end - mask.start) * moduleSize
    const pad = boxSize * 0.1
    const inner = boxSize - pad * 2
    const bgPatch = transparent
      ? ''
      : `<rect x="${n(boxX)}" y="${n(boxX)}" width="${n(boxSize)}" height="${n(boxSize)}" fill="${background}"/>`
    logo = `${bgPatch}<image x="${n(boxX + pad)}" y="${n(boxX + pad)}" width="${n(inner)}" height="${n(inner)}" href="${logoDataUri}" preserveAspectRatio="xMidYMid meet"/>`
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">`,
    bg,
    `<g fill="${foreground}">${shapes.join('')}</g>`,
    logo,
    '</svg>',
  ].join('')
}

export function svgToBlob(svg) {
  return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
}

/** Reads a File into a data: URI so it can be inlined into the SVG. */
export function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read logo file'))
    reader.readAsDataURL(file)
  })
}
