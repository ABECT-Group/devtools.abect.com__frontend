const FAQ_UPLOAD = {
  question: 'Are my files uploaded to a server?',
  answer: 'No. All compression happens directly in your browser using the Canvas API. Your files never leave your device — no uploads, no server processing, 100% private.',
}

const FAQ_BATCH = {
  question: 'Can I compress multiple files at once?',
  answer: 'Yes. Drop as many files as you need and click "Compress all" to process everything at once. Click "Download all" to get a single ZIP archive with all compressed files.',
}

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

export const COMPRESS_SLUGS = ['compress-jpg', 'compress-png', 'compress-webp']
export const DEFAULT_COMPRESS_SLUG = 'compress-jpg'

export const COMPRESSIONS = {
  'compress-jpg': {
    format: 'jpg',
    title: 'Compress JPG Online — Reduce JPEG File Size Free | Abect',
    description: 'Compress JPG images online — free, instant. Adjust quality per file, reduce size by 50–80%, preview result before downloading. No uploads, batch supported.',
    h1: 'JPG Image Compressor',
    sub: 'Reduce JPEG file size instantly in your browser — your files never leave your device.',
    howTo: [
      'Drop your images onto the compressor above — or click to browse. Any format works: JPG, PNG, WebP, GIF, BMP, AVIF, TIFF.',
      'Adjust the quality slider to control the compression level. Lower quality means smaller files.',
      'Click Compress on a single file or Compress all to process everything at once.',
      'Download files individually or click Download all to get a ZIP archive with all compressed JPGs.',
    ],
    whatIs: {
      heading: 'What is JPG compression and when should you use it?',
      blocks: [
        { type: 'p', text: 'JPG (or JPEG) uses lossy compression — it discards some image data to achieve smaller file sizes. The quality slider controls how much data is removed: higher quality means larger files but better visual fidelity, while lower quality gives smaller files with more visible artifacts.' },
        { type: 'h3', text: 'When JPG compression saves you the most' },
        { type: 'ul', items: [
          'Photographs and complex images with many colors — JPG excels here',
          'Web pages that need fast loading times — smaller images improve Core Web Vitals',
          'Email attachments — reduce JPGs to under 1 MB for easy sharing',
          'Social media uploads — avoid platforms re-compressing your images by pre-compressing yourself',
        ]},
        { type: 'h3', text: 'Quality vs file size trade-off' },
        { type: 'p', text: 'A quality setting of 75–85% is the sweet spot for most web use cases — it reduces file size by 50–70% with minimal visible quality loss. For print or archival purposes, stay above 90%. For thumbnails or previews, you can go as low as 50–60%.' },
        { type: 'p', text: 'Note: if you compress a JPG that was already compressed, each re-compression cycle introduces more artifacts. For best results, always compress from the original high-quality source.' },
      ],
    },
    faq: [
      FAQ_UPLOAD,
      FAQ_BATCH,
      {
        question: 'What quality setting should I use?',
        answer: 'For websites and social media, 75–85% is the sweet spot — it typically cuts file size by 50–70% with barely visible quality loss. For print or archival use, stay at 90%+. For thumbnails and previews, 50–65% is fine.',
      },
      {
        question: 'Can I compress PNG or WebP files to JPG here?',
        answer: 'Yes. The compressor accepts any image format — JPG, PNG, WebP, GIF, BMP, AVIF, TIFF — and outputs compressed JPG. This is also a quick way to convert format and reduce size in one step.',
      },
      {
        question: 'Does JPG compression affect image quality permanently?',
        answer: 'Yes — JPG compression is lossy and irreversible. Once saved, the discarded data cannot be recovered. Always keep the original file and compress a copy, especially if you may need to edit it later.',
      },
      {
        question: 'How much can I reduce a JPG file size?',
        answer: 'Typically 40–80% reduction depending on the original file and quality setting chosen. A 5 MB photo compressed at 80% quality usually lands around 800 KB–1.5 MB.',
      },
      {
        question: 'Can I preview the compressed image before downloading?',
        answer: 'Yes. After compression, a thumbnail of the result appears in the Preview column. Click it to open a fullscreen lightbox so you can inspect quality before downloading. If the result looks too compressed, adjust the quality slider and re-compress.',
      },
    ],
    relatedSlugs: ['compress-png', 'compress-webp', 'jpg-to-webp', 'jpg-to-png'],
  },

  'compress-png': {
    format: 'png',
    title: 'Compress PNG Online — Reduce PNG File Size Free | Abect',
    description: 'Compress PNG images online — free, instant, lossless. Strip metadata, re-encode PNGs to reduce file size without quality loss. No uploads, no signup required.',
    h1: 'PNG Image Compressor',
    sub: 'Reduce PNG file size in your browser — lossless compression, files never leave your device.',
    howTo: [
      'Drop your PNG or other image files onto the compressor above — or click to browse.',
      'Click Compress on a single file or Compress all to process everything in one go.',
      'Download files individually or click Download all for a ZIP archive of all compressed PNGs.',
      'Tip: if you need even smaller files, try the WebP compressor — WebP achieves 25–35% smaller sizes than PNG with the same visual quality.',
    ],
    whatIs: {
      heading: 'What is PNG compression and how does it work?',
      blocks: [
        { type: 'p', text: 'PNG uses lossless compression — every pixel is preserved exactly as in the original. Unlike JPG, no image data is discarded. This makes PNG the right choice for graphics, logos, screenshots, and images with sharp edges or transparency.' },
        { type: 'h3', text: 'What this tool does' },
        { type: 'p', text: 'The browser re-encodes your image as PNG using the Canvas API. This strips embedded metadata (EXIF, color profiles, comments) and re-renders the image, which can reduce file size — especially for PNGs that carry large metadata payloads or were exported from design tools with verbose headers.' },
        { type: 'h3', text: 'When PNG is the right format' },
        { type: 'ul', items: [
          'Logos and icons — sharp edges stay crisp, no JPG artifacts',
          'Screenshots and UI mockups — text and UI elements render cleanly',
          'Images with transparency — PNG supports alpha channels, JPG does not',
          'Source files for editing — lossless means no quality degradation when re-saving',
        ]},
        { type: 'h3', text: 'Want smaller files? Consider WebP' },
        { type: 'p', text: 'WebP achieves 25–35% smaller file sizes than PNG while maintaining the same visual quality, and also supports transparency. If your target browsers support WebP (all modern browsers do), it is worth switching.' },
      ],
    },
    faq: [
      FAQ_UPLOAD,
      FAQ_BATCH,
      {
        question: 'Is PNG compression lossless?',
        answer: 'Yes. PNG always uses lossless compression — no pixel data is discarded. This tool re-encodes the image as PNG via the browser Canvas API, which can reduce file size by stripping metadata while keeping every pixel intact.',
      },
      {
        question: 'Why is my compressed PNG the same size or larger?',
        answer: 'PNG lossless compression has limits. If your original PNG was already well-optimized, re-encoding may not reduce the size further. In that case, consider converting to WebP for significant size savings while keeping visual quality.',
      },
      {
        question: 'Does PNG support transparency?',
        answer: 'Yes — PNG fully supports alpha channel transparency. JPG does not. If your image has transparent areas, keep it as PNG or convert to WebP (which also supports transparency).',
      },
      {
        question: 'What image formats can I compress to PNG?',
        answer: 'You can drop any image — JPG, PNG, WebP, GIF, BMP, AVIF, TIFF — and it will be re-encoded as a compressed PNG. Transparent areas in the source are preserved.',
      },
      {
        question: 'How much smaller will my PNG get?',
        answer: 'It depends on the source file. PNGs from design tools (Figma, Photoshop) often contain large metadata chunks that can be stripped for 10–40% size savings. Already-optimized PNGs may see little to no reduction.',
      },
      {
        question: 'When should I use PNG vs JPG vs WebP?',
        answer: 'Use PNG for logos, icons, and images with transparency. Use JPG for photographs where some quality loss is acceptable. Use WebP for the best balance — smaller than both PNG and JPG, supports transparency, and is supported by all modern browsers.',
      },
      {
        question: 'Can I preview the compressed PNG before downloading?',
        answer: 'Yes. After compression, a thumbnail appears in the Preview column. Click it to open the image fullscreen and inspect the result before downloading.',
      },
    ],
    relatedSlugs: ['compress-jpg', 'compress-webp', 'png-to-webp', 'png-to-jpg'],
  },

  'compress-webp': {
    format: 'webp',
    title: 'Compress WebP Online — Reduce WebP File Size Free | Abect',
    description: 'Compress WebP images online — free, instant, browser-based. Adjust quality slider, reduce WebP file size by 50–80%. No uploads, batch compression supported.',
    h1: 'WebP Image Compressor',
    sub: 'Reduce WebP file size in your browser — your files never leave your device.',
    howTo: [
      'Drop your images onto the compressor above — any format works: JPG, PNG, WebP, GIF, BMP, AVIF, TIFF.',
      'Adjust the quality slider to control compression. 75–85% is the sweet spot for most use cases.',
      'Click Compress on a single file or Compress all to process everything at once.',
      'Download individually or click Download all to get a ZIP of all compressed WebP files.',
    ],
    whatIs: {
      heading: 'Why use WebP compression?',
      blocks: [
        { type: 'p', text: 'WebP is a modern image format developed by Google that achieves significantly smaller file sizes than JPG and PNG while maintaining comparable visual quality. It supports both lossy and lossless compression, as well as alpha channel transparency.' },
        { type: 'h3', text: 'WebP vs JPG vs PNG — size comparison' },
        { type: 'ul', items: [
          'WebP lossy is ~25–35% smaller than JPG at equivalent visual quality',
          'WebP lossless is ~26% smaller than PNG',
          'WebP supports transparency (unlike JPG)',
          'All modern browsers support WebP: Chrome, Firefox, Safari 14+, Edge',
        ]},
        { type: 'h3', text: 'Best use cases for WebP' },
        { type: 'ul', items: [
          'Website images — fastest loading times, best Core Web Vitals scores',
          'Product photos in e-commerce — smaller files, faster pages, more conversions',
          'Blog post images — WebP reduces bandwidth without sacrificing quality',
          'Converting old JPG/PNG assets — compressing to WebP is a quick win for any website',
        ]},
        { type: 'h3', text: 'Quality settings for WebP' },
        { type: 'p', text: 'A quality setting of 75–85% gives the best balance of file size and visual fidelity. At 80% quality, WebP images are typically 3–5× smaller than their original JPG equivalents. For images where quality is critical (portfolio, product photos), stay at 85–90%.' },
      ],
    },
    faq: [
      FAQ_UPLOAD,
      FAQ_BATCH,
      {
        question: 'How much smaller is WebP compared to JPG?',
        answer: 'WebP is typically 25–35% smaller than JPG at equivalent visual quality. A 1 MB JPG compressed to WebP at 80% quality usually lands around 300–500 KB.',
      },
      {
        question: 'Do all browsers support WebP?',
        answer: 'Yes — WebP is supported by all modern browsers: Chrome, Firefox, Edge, Opera, and Safari 14+. For broader compatibility with older Safari versions, you can use the <picture> element with a JPG fallback.',
      },
      {
        question: 'Does WebP support transparency?',
        answer: 'Yes. WebP supports alpha channel transparency, making it a direct replacement for PNG in most cases while achieving smaller file sizes.',
      },
      {
        question: 'What quality setting should I use for WebP?',
        answer: '75–85% is ideal for web use — it cuts file size dramatically with minimal visible quality loss. Use 85–90% for portfolio or product images where fidelity matters. Go as low as 60–70% for thumbnails and previews.',
      },
      {
        question: 'Can I compress JPG or PNG files to WebP?',
        answer: 'Yes. Drop any image format — JPG, PNG, GIF, BMP, AVIF, TIFF — and this tool will compress and convert it to WebP. This is one of the best ways to reduce image weight for websites.',
      },
      {
        question: 'Is WebP compression lossy or lossless?',
        answer: 'WebP supports both. This tool uses lossy compression with an adjustable quality slider, which gives the smallest file sizes. For truly lossless WebP, set quality to 100%, but file sizes will be larger.',
      },
      {
        question: 'Can I preview the compressed WebP image before downloading?',
        answer: 'Yes. After compression, a thumbnail of the result appears in the Preview column. Click it to open a fullscreen view so you can compare quality before downloading. If needed, adjust the quality slider and re-compress.',
      },
    ],
    relatedSlugs: ['compress-jpg', 'compress-png', 'webp-to-jpg', 'webp-to-png'],
  },
}
