export const FORMAT_LABELS = {
  jpg: 'JPG', jpeg: 'JPEG', png: 'PNG', webp: 'WebP',
  gif: 'GIF', bmp: 'BMP', avif: 'AVIF', tiff: 'TIFF',
}

export const FROM_OPTIONS = [
  { value: 'jpg',  label: 'JPG'  },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png',  label: 'PNG'  },
  { value: 'webp', label: 'WebP' },
  { value: 'gif',  label: 'GIF'  },
  { value: 'bmp',  label: 'BMP'  },
  { value: 'avif', label: 'AVIF' },
  { value: 'tiff', label: 'TIFF' },
]

export const TO_OPTIONS = [
  { value: 'jpg',  label: 'JPG'  },
  { value: 'png',  label: 'PNG'  },
  { value: 'webp', label: 'WebP' },
]

export const OUTPUT_MIME    = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }
export const OUTPUT_EXT     = { jpg: 'jpg', png: 'png', webp: 'webp' }
export const OUTPUT_QUALITY = { jpg: 0.92, png: undefined, webp: 0.92 }

export const DEFAULT_SLUG = 'png-to-jpg'
