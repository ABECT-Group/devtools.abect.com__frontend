export const HOW_TO_STEPS = [
  'Drop your JPG, PNG, GIF, AVIF or BMP files onto the converter — or click "Choose files" to browse.',
  'Adjust the quality slider per file. Quality 80–90 is the sweet spot for web images — significantly smaller file, near-identical look.',
  'Click Convert on a single file, or Convert all to process everything at once.',
  'Download files individually or click Download all to get a single ZIP archive.',
]

export const FAQ = [
  {
    question: 'Is WebP supported in all browsers?',
    answer: 'WebP is supported in all modern browsers — Chrome, Firefox, Safari (since version 14), Edge, and Opera. Global coverage is 97%. The remaining 3% are legacy environments. For full coverage, wrap images in a <picture> element with a JPG fallback so older browsers receive the JPG automatically.',
  },
  {
    question: 'What is the difference between lossy and lossless WebP?',
    answer: 'Lossy WebP (the default in this converter) removes some image data to reduce file size — similar to how JPG works, but 25–34% more efficient at the same visual quality. Lossless WebP keeps every pixel intact, like PNG, and still produces files about 26% smaller than equivalent PNG. Use lossy for photos and web content; lossless for logos, icons, or source files you plan to edit further.',
  },
  {
    question: 'What quality setting should I use for WebP?',
    answer: 'For web photos and editorial images: quality 80–90. For images with sharp edges or text overlays: 90–95. For thumbnails where size matters most: 60–75. Quality 100 disables most lossy compression — use it only when maximum fidelity is required.',
  },
  {
    question: 'Is WebP better than AVIF?',
    answer: 'AVIF achieves 40–50% smaller files than JPG, beating WebP\'s 25–34% reduction. However, WebP has 97% browser support versus AVIF\'s ~93%, and WebP encodes significantly faster. For most websites in 2026, WebP is the practical choice: excellent compression, near-universal support, and instant in-browser conversion.',
  },
  {
    question: 'Does WebP support transparency?',
    answer: 'Yes. WebP supports full alpha-channel transparency, exactly like PNG. Converting a transparent PNG to WebP preserves the transparency completely, making WebP a direct drop-in replacement for PNG in most web contexts.',
  },
  {
    question: 'Can I convert multiple files to WebP at once?',
    answer: 'Yes. Drop multiple files at once and click "Convert all" to process them in one go, then "Download all" to get a ZIP archive with all converted WebP files.',
  },
  {
    question: 'Can I convert WebP back to JPG or PNG?',
    answer: 'Yes — use the dedicated WebP to JPG or WebP to PNG converters on this site. Both run entirely in your browser with no uploads.',
  },
  {
    question: 'Are my files uploaded to a server?',
    answer: 'No. All conversion happens directly in your browser using the Canvas API. Your files never leave your device. You can verify this by opening browser DevTools → Network tab while converting — you will see zero file transfers.',
  },
]

export const PICTURE_CODE = `<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description of the image">
</picture>`

export const RELATED_TOOLS = [
  { to: '/png-to-webp',       name: 'PNG to WebP',       desc: 'Convert PNG images to WebP — up to 26% smaller' },
  { to: '/jpg-to-webp',       name: 'JPG to WebP',       desc: 'Convert JPG images to WebP — 25–34% smaller files' },
  { to: '/webp-to-jpg',       name: 'WebP to JPG',       desc: 'Convert WebP to JPG for maximum compatibility' },
  { to: '/webp-to-png',       name: 'WebP to PNG',       desc: 'Convert WebP to PNG — preserves transparency' },
  { to: '/compress-webp',     name: 'Compress WebP',     desc: 'Reduce WebP file size with adjustable quality' },
  { to: '/favicon-generator', name: 'Favicon Generator', desc: 'Generate favicons from text, emoji, or image' },
]
