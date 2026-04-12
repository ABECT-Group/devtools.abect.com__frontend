import JSZip from 'jszip'
import { renderFaviconPngBlob } from './drawFaviconToCanvas'

const PNG_ASSET_SPECS = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
]

function createIcoBlob(buffers) {
  const imageCount = buffers.length
  const directorySize = 6 + imageCount * 16
  // FIX: buffers is [{ size, buffer }] — must access item.buffer.byteLength
  const totalSize = directorySize + buffers.reduce((sum, item) => sum + item.buffer.byteLength, 0)
  const output = new Uint8Array(totalSize)
  const view = new DataView(output.buffer)

  view.setUint16(0, 0, true)
  view.setUint16(2, 1, true)
  view.setUint16(4, imageCount, true)

  let imageOffset = directorySize

  buffers.forEach(({ size, buffer }, index) => {
    const entryOffset = 6 + index * 16
    const byteLength = buffer.byteLength

    view.setUint8(entryOffset, size === 256 ? 0 : size)
    view.setUint8(entryOffset + 1, size === 256 ? 0 : size)
    view.setUint8(entryOffset + 2, 0)
    view.setUint8(entryOffset + 3, 0)
    view.setUint16(entryOffset + 4, 1, true)
    view.setUint16(entryOffset + 6, 32, true)
    view.setUint32(entryOffset + 8, byteLength, true)
    view.setUint32(entryOffset + 12, imageOffset, true)

    output.set(new Uint8Array(buffer), imageOffset)
    imageOffset += byteLength
  })

  return new Blob([output], { type: 'image/x-icon' })
}

const WEBMANIFEST = JSON.stringify({
  name: '',
  short_name: '',
  icons: [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: '#ffffff',
  background_color: '#ffffff',
  display: 'standalone',
}, null, 2)

const DOCS = `Favicon Package — Installation Guide
=====================================

Files included:
  favicon.ico                  Legacy fallback (16×16, 32×32, 48×48 embedded)
  favicon-16x16.png            Browser tab — small
  favicon-32x32.png            Browser tab — standard
  apple-touch-icon.png         iOS / macOS home screen bookmark (180×180)
  android-chrome-192x192.png   Android Chrome home screen
  android-chrome-512x512.png   PWA splash screen
  site.webmanifest             Web App Manifest template
  docs.txt                     This file

──────────────────────────────────────────────────────────────
Step 1 — Copy all files to your site root
  Place them in /public, /static, or whichever folder
  is served as the web root.

Step 2 — Add to your HTML <head>:

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

Step 3 — Edit site.webmanifest and fill in:
  "name"             — Your full app or site name
  "short_name"       — Short name shown on home screens (max ~12 chars)
  "theme_color"      — Browser UI color  (e.g. "#1d4ed8")
  "background_color" — Splash screen background (e.g. "#ffffff")

──────────────────────────────────────────────────────────────
Generated with Abect Favicon Generator
https://devtools.abect.com/favicon-generator
`

export async function generateFaviconAssets(options) {
  const pngAssets = await Promise.all(
    PNG_ASSET_SPECS.map(async asset => {
      const blob = await renderFaviconPngBlob(asset.size, options)
      return { ...asset, blob }
    })
  )

  // 48px is only needed for favicon.ico — not included in the final zip
  const icoSourceSizes = [16, 32, 48]
  const icoBuffers = await Promise.all(
    icoSourceSizes.map(async size => {
      const existing = pngAssets.find(a => a.size === size)
      const blob = existing ? existing.blob : await renderFaviconPngBlob(size, options)
      return { size, buffer: await blob.arrayBuffer() }
    })
  )

  const icoBlob = createIcoBlob(icoBuffers)
  const zip = new JSZip()

  pngAssets.forEach(asset => zip.file(asset.name, asset.blob))
  zip.file('favicon.ico', icoBlob)
  zip.file('site.webmanifest', WEBMANIFEST)
  zip.file('docs.txt', DOCS)

  return {
    pngAssets,
    icoBlob,
    zipBlob: await zip.generateAsync({ type: 'blob' }),
  }
}
