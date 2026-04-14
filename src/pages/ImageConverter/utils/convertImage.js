/**
 * Converts a File to the target MIME type using the Canvas API.
 * quality: 0–1 for jpeg/webp, undefined for png (lossless).
 */
export async function convertImage(file, mimeType, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          blob ? resolve(blob) : reject(new Error('Conversion failed'))
        },
        mimeType,
        quality,
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    img.src = url
  })
}
