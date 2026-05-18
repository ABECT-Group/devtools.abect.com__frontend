/**
 * Converts a HEIC/HEIF File to the target MIME type.
 *
 * Safari supports HEIC natively via createImageBitmap — no library needed.
 * Chrome/Firefox fall back to heic-to (WebAssembly, lazy-loaded on first use).
 */
const HEIC_QUALITY = 0.8

export async function convertHeicImage(file, mimeType) {
  // Safari native path — zero bundle cost
  try {
    const bitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext('2d')
    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    ctx.drawImage(bitmap, 0, 0)
    bitmap.close()
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error('Conversion failed'))),
        mimeType,
        HEIC_QUALITY,
      )
    })
  } catch {
    // Chrome/Firefox: lazy-load heic-to (WASM, ~1.2 MB, cached after first load)
    const { heicTo } = await import('heic-to')
    return heicTo({ blob: file, type: mimeType, quality: HEIC_QUALITY })
  }
}
