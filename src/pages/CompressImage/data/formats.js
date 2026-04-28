export const FORMAT_OPTIONS = [
  { value: 'jpg',  label: 'JPG'  },
  { value: 'png',  label: 'PNG'  },
  { value: 'webp', label: 'WebP' },
]

export const FORMAT_CONFIG = {
  jpg:  { mime: 'image/jpeg', ext: 'jpg',  defaultQuality: 0.82, hasQuality: true  },
  png:  { mime: 'image/png',  ext: 'png',  defaultQuality: undefined, hasQuality: false },
  webp: { mime: 'image/webp', ext: 'webp', defaultQuality: 0.82, hasQuality: true  },
}

export const COMPRESS_SLUGS        = ['compress-jpg', 'compress-png', 'compress-webp']
export const DEFAULT_COMPRESS_SLUG = 'compress-jpg'
export const DEFAULT_QUALITY       = 82
