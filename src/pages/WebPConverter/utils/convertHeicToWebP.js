// Safari supports HEIC natively via createImageBitmap — no library needed.
// Chrome/Firefox fall back to heic-to (WebAssembly, lazy-loaded on first use).
export async function convertHeicToWebP(file, quality) {
  try {
    const bitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    canvas.getContext('2d').drawImage(bitmap, 0, 0)
    bitmap.close()
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error('Conversion failed'))),
        'image/webp',
        quality / 100,
      )
    })
  } catch {
    const { heicTo } = await import('heic-to')
    return heicTo({ blob: file, type: 'image/webp', quality: quality / 100 })
  }
}
