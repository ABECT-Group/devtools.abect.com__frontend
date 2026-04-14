// Shared FAQ items reused across routes
const FAQ_UPLOAD = {
  question: 'Are my files uploaded to a server?',
  answer: 'No. All conversion happens directly in your browser using the Canvas API. Your files never leave your device — no uploads, no server processing, 100% private. This also means the tool works without an internet connection once the page has loaded.',
}
const FAQ_BATCH = {
  question: 'Can I convert multiple files at once?',
  answer: 'Yes. Drop as many files as you need in one go and click "Convert all" to process everything at once. When done, click "Download all" to get a single ZIP archive containing all converted files.',
}

// Format display labels
export const FORMAT_LABELS = {
  jpg: 'JPG', jpeg: 'JPEG', png: 'PNG', webp: 'WebP',
  gif: 'GIF', bmp: 'BMP', avif: 'AVIF', tiff: 'TIFF',
}

// Available FROM and TO options for the format selector
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

// Output format configuration
export const OUTPUT_MIME    = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }
export const OUTPUT_EXT     = { jpg: 'jpg', png: 'png', webp: 'webp' }
export const OUTPUT_QUALITY = { jpg: 0.92, png: undefined, webp: 0.92 }

export const DEFAULT_SLUG = 'png-to-jpg'

// All 20 conversion configs
export const CONVERSIONS = {

  // ─── TO JPG ───────────────────────────────────────────────────────────────

  'png-to-jpg': {
    from: 'png', to: 'jpg',
    title: 'Free PNG to JPG Converter Online | Abect',
    description: 'Convert PNG to JPG online — free, instant, right in your browser. Batch conversion, no uploads, no signup. Note: transparent areas become white. Try it now.',
    h1: 'PNG to JPG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your PNG files onto the converter above — or click to browse. You can add multiple files at once.',
      'Click Convert on a single file or Convert all to process everything at once.',
      'Download files individually or click Download all for a ZIP archive.',
      'Note: if your PNG has a transparent background, transparent areas will be filled with white in the JPG output.',
    ],
    whatIs: {
      heading: 'PNG vs JPG — when should you convert?',
      blocks: [
        { type: 'p', text: 'PNG (Portable Network Graphics) is a lossless format — it stores every pixel exactly as captured with no quality degradation. It supports full alpha-channel transparency, making it the standard for logos, icons, UI screenshots, and graphics where precision matters. The downside is file size: PNG files are significantly larger than JPG for photographic content.' },
        { type: 'p', text: 'JPG (JPEG) uses lossy compression that discards some image data to achieve much smaller file sizes — typically 5–10× smaller than PNG for photographs. At quality 92 (the default this converter uses), the difference is nearly imperceptible to the human eye. This makes JPG the standard for web photos, social media, email attachments, and any use case where bandwidth and storage matter.' },
        { type: 'h3', text: 'When to convert PNG to JPG' },
        { type: 'ul', items: [
          'Uploading product photos, blog images, or social media visuals — JPG loads faster and costs less bandwidth',
          'Sending images by email where file size limits apply',
          'Submitting to platforms that require or strongly prefer JPG (some CMS, print services)',
          'Reducing storage costs on cloud drives or CDNs for large image libraries',
        ]},
        { type: 'h3', text: 'When to keep the PNG' },
        { type: 'ul', items: [
          'The image has a transparent background — JPG fills transparency with white',
          'You need pixel-perfect quality for logos, text overlays, or graphic design assets',
          'The image will be edited and re-saved multiple times — JPG accumulates artifacts with each re-save',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert PNG to JPG online for free?', answer: 'Drop your PNG files onto the converter above, click "Convert", then "Download". The entire process takes seconds. No account, no software, no uploads — everything runs in your browser using the Canvas API.' },
      { question: 'Does converting PNG to JPG lose quality?', answer: 'Yes, some quality is lost because JPG uses lossy compression. At quality 92 (this converter\'s default), the difference is nearly invisible for photographs. For graphics with sharp edges, text, or flat color areas, the artifacts may be more noticeable — in those cases, keep the PNG.' },
      { question: 'What happens to transparent areas when converting PNG to JPG?', answer: 'JPG does not support transparency. Transparent areas in a PNG are filled with white in the JPG output. If you need to preserve transparency, convert to WebP or keep the PNG format instead.' },
      { question: 'Why is my JPG sometimes larger than the original PNG?', answer: 'This happens with simple graphics, screenshots with large flat-color areas, or images with few colors. PNG\'s lossless compression handles solid blocks of color very efficiently. JPG is designed for photographs with complex gradients and textures — not for solid-color graphics.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-webp', 'webp-to-jpg'],
  },

  'webp-to-jpg': {
    from: 'webp', to: 'jpg',
    title: 'Free WebP to JPG Converter Online | Abect',
    description: 'Convert WebP to JPG online — free, instant, no uploads. Fix compatibility with apps and services that don\'t support WebP. Batch supported. Try it now.',
    h1: 'WebP to JPG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your WebP files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all to get a ZIP archive.',
      'Note: WebP files with transparent backgrounds will have transparent areas filled with white in the JPG output.',
    ],
    whatIs: {
      heading: 'Why convert WebP to JPG?',
      blocks: [
        { type: 'p', text: 'WebP is a modern image format developed by Google that produces 25–34% smaller files than JPEG at equivalent quality. All major modern browsers support it. However, many desktop applications, older software, and some online services still do not accept WebP files.' },
        { type: 'p', text: 'Converting WebP to JPG solves compatibility problems instantly. JPG (JPEG) has been the universal image standard for decades — it opens in every photo editor, email client, social platform, CMS, and OS-level image viewer without any plugin or conversion.' },
        { type: 'h3', text: 'Common reasons to convert WebP to JPG' },
        { type: 'ul', items: [
          'Opening WebP images downloaded from the web in desktop apps like older Photoshop, Paint, or Lightroom',
          'Uploading to platforms that reject WebP (some e-commerce CMSs, email newsletters, stock sites)',
          'Sending to clients or colleagues who use older software',
          'Printing — many print services and kiosks only accept JPG or PNG',
          'Embedding in Word, PowerPoint, or older Office documents',
        ]},
        { type: 'h3', text: 'Will the JPG be lower quality than the WebP?' },
        { type: 'p', text: 'At quality 92, the visual difference between the WebP and the resulting JPG is minimal and difficult to detect at normal viewing sizes. The JPG file will be larger than the source WebP, since WebP achieves better compression.' },
      ],
    },
    faq: [
      { question: 'How do I convert WebP to JPG online?', answer: 'Drop your WebP files onto the converter above, click "Convert all", then "Download all". No software required, no uploads — conversion happens in seconds directly in your browser.' },
      { question: 'Why can\'t I open WebP files on my computer?', answer: 'Older applications do not support the WebP format. Windows Photo Viewer (pre-Windows 10), older versions of Photoshop, and some other apps require JPG or PNG. Converting WebP to JPG solves this — JPG is supported by every application that can open images.' },
      { question: 'Will the JPG be larger than the original WebP?', answer: 'Yes. WebP is 25–34% more efficient than JPEG. Converting WebP to JPG will produce a larger file. If file size matters, keep the WebP where it is supported and only convert to JPG when compatibility requires it.' },
      { question: 'Does WebP support transparency? What happens when converting to JPG?', answer: 'Yes, WebP supports alpha-channel transparency. When you convert a transparent WebP to JPG, transparent areas are filled with white — JPG has no transparency support. To preserve transparency, convert to PNG instead.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-jpg', 'webp-to-png', 'jpg-to-webp'],
  },

  'gif-to-jpg': {
    from: 'gif', to: 'jpg',
    title: 'Free GIF to JPG Converter Online | Abect',
    description: 'Convert GIF to JPG online — free, instant, in your browser. First frame exported as a static JPG. No uploads, no server. Batch supported. Try it now.',
    h1: 'GIF to JPG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your GIF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Note: only the first frame of animated GIFs is exported. Animation is not preserved in JPG.',
    ],
    whatIs: {
      heading: 'What happens when you convert GIF to JPG?',
      blocks: [
        { type: 'p', text: 'GIF (Graphics Interchange Format) was created in 1987 and is limited to 256 colors per frame. This makes it poor for photographic content — complex images appear with visible color banding and dithering. GIF files are also relatively large compared to modern formats.' },
        { type: 'p', text: 'Converting a GIF to JPG replaces the 256-color palette with full-color JPEG compression. For static GIF images — icons, logos, simple graphics — the result is a sharper, smaller, and more color-accurate image. For animated GIFs, only the first frame is exported as a static image.' },
        { type: 'h3', text: 'Limitations of GIF to JPG conversion' },
        { type: 'ul', items: [
          'Animation is not preserved — only the first frame is converted',
          'GIF transparency becomes white in the JPG output',
          'JPG adds its own compression artifacts — for pixel-perfect output, convert to PNG instead',
          'For animated GIF to video, use a dedicated tool like FFmpeg',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert a GIF to JPG online?', answer: 'Drop your GIF files onto the converter, click "Convert all", then "Download all". The converter exports the first frame of each GIF as a static JPG. No software, no upload needed.' },
      { question: 'Does converting GIF to JPG preserve the animation?', answer: 'No. JPG is a static image format — it cannot store animation. Only the first frame of an animated GIF is exported. If you need an animated format with better quality and smaller size than GIF, consider converting to WebP which supports animation.' },
      { question: 'Will the JPG look better than the GIF?', answer: 'For photographic content, yes — significantly better. GIF is limited to 256 colors which causes banding and dithering on complex images. JPG supports millions of colors and produces much smoother gradients and more accurate photo representation.' },
      { question: 'What happens to GIF transparency when converting to JPG?', answer: 'GIF supports single-color transparency. When converting to JPG, all transparent areas are filled with white, since JPG does not support transparency of any kind. To preserve transparency, convert to PNG or WebP instead.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-png', 'gif-to-webp', 'png-to-jpg'],
  },

  'bmp-to-jpg': {
    from: 'bmp', to: 'jpg',
    title: 'Free BMP to JPG Converter Online | Abect',
    description: 'Convert BMP to JPG online — free, instant, no uploads. Reduce 20 MB BMP files to under 500 KB without visible quality loss. Batch supported. Try it now.',
    h1: 'BMP to JPG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your BMP files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: BMP files are large and uncompressed — expect significant file size reduction in the JPG output.',
    ],
    whatIs: {
      heading: 'Why convert BMP to JPG?',
      blocks: [
        { type: 'p', text: 'BMP (Windows Bitmap) is an uncompressed raster format built into Windows. Every pixel is stored at full depth with no compression, making BMP files extremely large. A 1920×1080 screenshot in BMP format is around 6 MB; a full-resolution photo can easily reach 50–100 MB.' },
        { type: 'p', text: 'Converting BMP to JPG applies JPEG compression, typically reducing file sizes by 90–98% with minimal visible quality loss. A 20 MB BMP photograph becomes a 200–500 KB JPG at quality 92. This makes files shareable, email-friendly, and suitable for web use.' },
        { type: 'h3', text: 'BMP vs JPG — file size comparison' },
        { type: 'ul', items: [
          'BMP 1920×1080: ~6 MB (uncompressed 24-bit)',
          'JPG 1920×1080 at quality 92: ~300–800 KB — 90% smaller',
          'BMP 4K photo: ~25 MB → JPG equivalent: ~1–3 MB',
          'No transparency in either format — safe to convert without visual differences',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert BMP to JPG online for free?', answer: 'Drop your BMP files into the converter above, click "Convert all", then "Download all". Conversion happens in your browser — no software to install, no upload required. Large BMP files may take a moment to process.' },
      { question: 'How much smaller will the JPG be compared to BMP?', answer: 'Typically 90–98% smaller. A 20 MB BMP photo usually becomes a 200–600 KB JPG at quality 92. The exact ratio depends on image content — photos with complex detail compress less than flat-color areas.' },
      { question: 'Is there any quality loss when converting BMP to JPG?', answer: 'At quality 92 (the default), the difference is nearly imperceptible for photographs. You would need to zoom in significantly to see any compression artifacts. For images with sharp text, UI elements, or hard edges, converting to PNG instead gives a lossless result.' },
      { question: 'Why are BMP files so large?', answer: 'BMP stores every pixel raw — no compression algorithm is applied. A 1920×1080 image with 24-bit color stores 6.2 million pixels × 3 bytes = ~18 MB of raw data, saved mostly as-is. JPG and PNG compress this same data significantly.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-png', 'bmp-to-webp', 'png-to-jpg'],
  },

  'avif-to-jpg': {
    from: 'avif', to: 'jpg',
    title: 'Free AVIF to JPG Converter Online | Abect',
    description: 'Convert AVIF to JPG online — free, instant, no uploads. Get universal JPG compatibility from next-gen AVIF images. Batch supported. Try it now.',
    h1: 'AVIF to JPG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your AVIF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Note: AVIF files with transparent backgrounds will have transparency replaced with white in the JPG output.',
    ],
    whatIs: {
      heading: 'What is AVIF and why convert it to JPG?',
      blocks: [
        { type: 'p', text: 'AVIF (AV1 Image File Format) is one of the most efficient image formats available — it achieves 50% smaller file sizes than JPEG at the same visual quality, outperforming even WebP. It is supported in Chrome, Firefox, and Safari 16+.' },
        { type: 'p', text: 'Despite its technical advantages, AVIF support outside browsers is still limited. Photo editors, email clients, print services, and many CMS platforms do not yet accept AVIF. Converting to JPG gives instant compatibility with every device and application that handles images.' },
        { type: 'h3', text: 'AVIF vs JPG compatibility' },
        { type: 'ul', items: [
          'AVIF: Chrome 85+, Firefox 93+, Safari 16+, Edge 121+ — ~90% browser support',
          'JPG: 100% support — every browser, OS, app, printer, and device',
          'Convert AVIF to JPG when opening in Photoshop, Lightroom, Affinity Photo, or similar apps',
          'Convert when uploading to services that reject AVIF (stock sites, print labs, many CMS)',
        ]},
      ],
    },
    faq: [
      { question: 'How do I open AVIF files that won\'t open on my computer?', answer: 'Convert them to JPG using this tool. Drop the AVIF file onto the converter, click Convert, then Download. The resulting JPG opens in every application — no software updates or plugins needed.' },
      { question: 'Will the JPG be larger than the AVIF?', answer: 'Yes. AVIF achieves roughly 50% better compression than JPEG. Converting AVIF to JPG will produce a noticeably larger file. Keep AVIF for web delivery where browsers support it; convert to JPG for compatibility with software and services that don\'t.' },
      { question: 'Does AVIF support transparency?', answer: 'Yes, AVIF supports alpha-channel transparency. When you convert an AVIF with transparency to JPG, transparent areas are replaced with white. To preserve transparency, convert to PNG or WebP instead.' },
      { question: 'Why use AVIF instead of JPG in the first place?', answer: 'AVIF achieves 50% smaller files than JPEG at the same perceptible quality. For websites, this means faster loading, lower bandwidth costs, and better Core Web Vitals. Use AVIF for web delivery to modern browsers, and convert to JPG only when compatibility with older tools is needed.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-png', 'png-to-jpg', 'webp-to-jpg'],
  },

  'tiff-to-jpg': {
    from: 'tiff', to: 'jpg',
    title: 'Free TIFF to JPG Converter Online | Abect',
    description: 'Convert TIFF to JPG online — free, instant, no uploads. Reduce 50 MB TIFF files to web-ready JPG in seconds. Batch supported. Try it now.',
    h1: 'TIFF to JPG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your TIFF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: TIFF files are large — processing may take a moment for high-resolution files. Keep your original TIFF; the JPG is for sharing and web use.',
    ],
    whatIs: {
      heading: 'Why convert TIFF to JPG?',
      blocks: [
        { type: 'p', text: 'TIFF (Tagged Image File Format) is the professional standard for high-quality image storage. It uses lossless or no compression, preserving maximum image detail for editing, printing, and archiving. A single scanned photo or RAW export can be 50–200 MB in TIFF format.' },
        { type: 'p', text: 'Converting TIFF to JPG makes images web-ready and shareable. JPG reduces a 50 MB TIFF to 1–3 MB with minimal visible quality difference at screen sizes. Browsers also do not display TIFF files natively, making JPG essential for any online use.' },
        { type: 'h3', text: 'TIFF vs JPG — the professional workflow' },
        { type: 'ul', items: [
          'Shoot, scan, or edit in RAW/TIFF → preserve maximum quality for the master file',
          'Export to JPG for web, social media, email, and client delivery',
          'Always keep the original TIFF — re-editing JPG accumulates quality loss with each re-save',
          'TIFF is not supported in browsers; JPG is required for any web embedding',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert TIFF to JPG online?', answer: 'Drop your TIFF files onto the converter above, click "Convert all", then "Download all". Large TIFF files may take a moment to load in the browser. No software needed, no upload required — everything runs locally.' },
      { question: 'How much smaller will the JPG be compared to the TIFF?', answer: 'Dramatically smaller. A 50 MB TIFF photo typically becomes 1–3 MB as a JPG at quality 92 — a 94–98% reduction. The compression ratio depends on image content: complex photos compress less aggressively than flat-color areas.' },
      { question: 'Should I delete the TIFF after converting to JPG?', answer: 'No — keep the original TIFF for future editing. TIFF is a master file format with no generational quality loss. Use the JPG only for distribution. If you need to re-edit, always work from the TIFF master.' },
      { question: 'Why can\'t browsers display TIFF files directly?', answer: 'TIFF is not part of the web image standard. Chrome, Firefox, and Edge do not display TIFF natively. Safari on macOS can, but other browsers cannot. Converting TIFF to JPG makes your images universally viewable in any browser.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['tiff-to-png', 'tiff-to-webp', 'png-to-jpg'],
  },

  // ─── TO PNG ───────────────────────────────────────────────────────────────

  'jpg-to-png': {
    from: 'jpg', to: 'png',
    title: 'Free JPG to PNG Converter Online | Abect',
    description: 'Convert JPG to PNG online — free, instant, lossless output. No more quality loss on re-save. No uploads, no signup. Batch supported. Try it now.',
    h1: 'JPG to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your JPG files onto the converter above — or click to browse. Multiple files are supported.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: converting JPG to PNG does not recover quality lost during previous JPG compression — it only stops further degradation.',
    ],
    whatIs: {
      heading: 'JPG vs PNG — when does converting make sense?',
      blocks: [
        { type: 'p', text: 'JPG (JPEG) uses lossy compression — every time a JPG is edited and re-saved, the algorithm re-encodes the image and discards more detail. After several rounds of editing, compression artifacts become visible. PNG is lossless — once in PNG format, re-saving never degrades quality.' },
        { type: 'p', text: 'Converting JPG to PNG is the right move when you plan to edit an image multiple times, add text overlays, or use it in a design workflow. The resulting PNG will be larger than the JPG but will not accumulate any further quality loss.' },
        { type: 'h3', text: 'Important: converting JPG to PNG does not restore quality' },
        { type: 'p', text: 'If your JPG already has compression artifacts — blurry edges, blocky areas, color noise — those artifacts are baked in and will appear in the PNG. Conversion captures the JPG at its current state in a lossless container. Use PNG going forward to prevent further degradation.' },
        { type: 'h3', text: 'Common reasons to convert JPG to PNG' },
        { type: 'ul', items: [
          'Editing in Photoshop, GIMP, or Affinity Photo — avoid re-saving as JPG during the workflow',
          'Adding a transparent background (requires removing background in an editor after conversion)',
          'Using images in presentations or documents where white backgrounds should be transparent',
          'Creating web graphics where lossless sharpness is needed for logos or UI elements',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert JPG to PNG online for free?', answer: 'Drop your JPG files onto the converter above, click "Convert all", then "Download all". Conversion happens in your browser — no account, no software, no upload needed.' },
      { question: 'Will converting JPG to PNG improve the image quality?', answer: 'No. The conversion captures the JPG at its current quality in a lossless PNG container. Any JPEG compression artifacts already in the image will remain. What you gain is that no further quality loss occurs on future re-saves.' },
      { question: 'Why is the PNG so much larger than the JPG?', answer: 'PNG is lossless — it stores more pixel information than JPG. For photographs, PNG files are typically 3–8× larger than the equivalent JPG. This is the trade-off: larger file, but no quality loss on editing.' },
      { question: 'How do I get a transparent background after converting JPG to PNG?', answer: 'Converting JPG to PNG does not automatically add transparency — it just changes the container format. To make a background transparent, open the PNG in an editor like Photoshop, GIMP, or remove.bg and manually remove the background layer.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-jpg', 'jpg-to-webp', 'webp-to-png'],
  },

  'jpeg-to-png': {
    from: 'jpeg', to: 'png',
    title: 'Free JPEG to PNG Converter Online | Abect',
    description: 'Convert JPEG to PNG online — free, instant, lossless PNG output. No re-compression, no upload, no signup. Batch supported. Try it now.',
    h1: 'JPEG to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your JPEG files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: PNG output is lossless — no further quality loss when re-saving from this point forward.',
    ],
    whatIs: {
      heading: 'JPEG vs PNG — understanding the difference',
      blocks: [
        { type: 'p', text: 'JPEG and JPG are the same format — two names for the same standard (Joint Photographic Experts Group). JPEG is the original full extension; JPG is the shortened 3-character version that became common on Windows. They are processed identically by every tool and browser.' },
        { type: 'p', text: 'PNG is a lossless format that stores image data without any quality reduction. Where JPEG compresses and discards detail to achieve smaller file sizes, PNG preserves all original pixel values. PNG files are larger but can be re-saved indefinitely without accumulating compression artifacts.' },
        { type: 'h3', text: 'When JPEG to PNG conversion is useful' },
        { type: 'ul', items: [
          'Switching to a lossless editing workflow — once PNG, no further compression on re-save',
          'Preparing images for use in presentations where sharp text and graphics are needed',
          'Converting JPEG logos or product shots to PNG for use in design tools',
          'Using images on websites where pixel-perfect clarity matters over file size',
        ]},
      ],
    },
    faq: [
      { question: 'What is the difference between JPEG and JPG?', answer: 'No technical difference. JPEG is the full name of the format standard; JPG is the shortened file extension. On older Windows systems, file extensions were limited to 3 characters — hence .jpg. Modern systems accept both. The format, compression, and quality are identical.' },
      { question: 'How do I convert JPEG to PNG online?', answer: 'Drop your JPEG files onto the converter above, click "Convert all", then "Download all". The PNG output is lossless — no further compression is applied. Everything runs in your browser, no upload needed.' },
      { question: 'Does the PNG output have better quality than the JPEG?', answer: 'The PNG captures the JPEG at its current quality level — it does not restore detail lost during JPEG compression. However, going forward the PNG will not degrade further on re-save, unlike JPEG.' },
      { question: 'Will the PNG file be much larger than the JPEG?', answer: 'Yes — PNG files are typically 3–8× larger than the equivalent JPEG for photographs. PNG stores pixel data losslessly, so more data per pixel compared to JPEG\'s compressed representation.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-png', 'jpeg-to-webp', 'webp-to-png'],
  },

  'webp-to-png': {
    from: 'webp', to: 'png',
    title: 'Free WebP to PNG Converter Online | Abect',
    description: 'Convert WebP to PNG online — free, lossless output, preserves transparency. Works in your browser, no uploads. Batch supported. Try it now.',
    h1: 'WebP to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your WebP files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: transparent WebP backgrounds are preserved in the PNG output — PNG supports full alpha-channel transparency.',
    ],
    whatIs: {
      heading: 'Why convert WebP to PNG?',
      blocks: [
        { type: 'p', text: 'WebP is a modern, efficient format with broad browser support. However, many desktop applications — older versions of Photoshop, Lightroom, Affinity Photo, Sketch — still do not accept WebP files. PNG is the universal lossless format accepted everywhere.' },
        { type: 'p', text: 'A key advantage of WebP to PNG over WebP to JPG is transparency. Both WebP and PNG support full alpha-channel transparency, so converting between them preserves transparent backgrounds completely. This makes WebP to PNG the right choice for logos, icons, and UI assets.' },
        { type: 'h3', text: 'WebP to PNG vs WebP to JPG' },
        { type: 'ul', items: [
          'Choose PNG when the WebP has a transparent background — PNG preserves it, JPG fills it with white',
          'Choose PNG when you need lossless output for editing or design work',
          'Choose JPG when you need the smallest file size and don\'t need transparency',
          'PNG is larger than both JPG and WebP, but lossless and universally supported',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert WebP to PNG online?', answer: 'Drop your WebP files onto the converter above, click "Convert all", then "Download all". The PNG output is lossless and preserves transparency. No upload, no account needed.' },
      { question: 'Does WebP to PNG preserve transparency?', answer: 'Yes. Both WebP and PNG support full alpha-channel transparency. When you convert a WebP image with a transparent background to PNG, the transparency is preserved exactly.' },
      { question: 'Will the PNG be larger than the WebP?', answer: 'Yes. WebP achieves better compression than PNG. The PNG will be noticeably larger than the source WebP. If file size matters, keep the WebP wherever it is supported.' },
      { question: 'Can I edit the PNG in Photoshop after conversion?', answer: 'Yes. PNG is fully supported in Photoshop, Illustrator, GIMP, Figma, Sketch, and virtually every other design application — which is often the main reason to convert WebP to PNG in the first place.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-png', 'webp-to-jpg', 'png-to-webp'],
  },

  'gif-to-png': {
    from: 'gif', to: 'png',
    title: 'Free GIF to PNG Converter Online | Abect',
    description: 'Convert GIF to PNG online — free, lossless, preserves transparency. Better quality and smaller files than GIF. No uploads. Batch supported. Try it now.',
    h1: 'GIF to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your GIF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Note: only the first frame of animated GIFs is exported as PNG. Animation is not preserved.',
    ],
    whatIs: {
      heading: 'GIF vs PNG — why PNG is superior for static images',
      blocks: [
        { type: 'p', text: 'GIF is limited to 256 colors per frame and uses dithering to simulate additional colors. For modern images with rich gradients, photographs, or UI screenshots, this results in visible color banding and an artificial, retro look. PNG supports millions of colors with no such limitation.' },
        { type: 'p', text: 'For static images, PNG typically produces smaller files than GIF with significantly better quality. The only reason to keep GIF over PNG is animation — and even there, animated WebP is a better modern alternative.' },
        { type: 'h3', text: 'GIF to PNG — what to expect' },
        { type: 'ul', items: [
          'Full-color output — no more 256-color banding or dithering artifacts',
          'GIF transparency is preserved — transparent areas carry over to the PNG',
          'Usually smaller file size than the original GIF',
          'Animation is lost — only the first frame is exported',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert GIF to PNG online?', answer: 'Drop your GIF files onto the converter, click "Convert all", then "Download all". The first frame of each GIF is exported as a full-color PNG. No upload, no software needed.' },
      { question: 'Does GIF to PNG preserve animation?', answer: 'No. PNG is a static image format and does not support animation. Only the first frame of each GIF is exported. If you need to preserve animation, consider converting to WebP or using a video format.' },
      { question: 'Does GIF to PNG preserve transparency?', answer: 'Yes. GIF supports single-color transparency, and PNG supports full alpha-channel transparency. The transparent areas in the GIF are preserved in the PNG output.' },
      { question: 'Will PNG be smaller than the original GIF?', answer: 'Often yes. PNG compresses most image content more efficiently than GIF, especially when there are more than 256 colors. For very simple two-color or line-art images, GIF may sometimes be smaller — but for most web graphics, PNG wins on both quality and size.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-jpg', 'gif-to-webp', 'jpg-to-png'],
  },

  'bmp-to-png': {
    from: 'bmp', to: 'png',
    title: 'Free BMP to PNG Converter Online | Abect',
    description: 'Convert BMP to PNG online — free, instant, lossless. Shrink 20 MB BMP files by 90% with zero quality loss. No uploads. Batch supported. Try it now.',
    h1: 'BMP to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your BMP files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: BMP to PNG is completely lossless — every pixel is preserved exactly. Choose PNG for screenshots and graphics, JPG for photos.',
    ],
    whatIs: {
      heading: 'Why convert BMP to PNG instead of JPG?',
      blocks: [
        { type: 'p', text: 'BMP is uncompressed — every pixel stored at full size with no compression. PNG applies lossless compression to the same data, typically achieving 70–95% size reduction with absolutely no quality loss. Unlike JPEG, no pixel data is discarded.' },
        { type: 'p', text: 'For screenshots, UI captures, diagrams, and graphics with text or sharp edges, PNG is far superior to JPG. JPEG introduces compression artifacts around edges and text. PNG preserves them perfectly.' },
        { type: 'h3', text: 'BMP to PNG vs BMP to JPG — which to choose?' },
        { type: 'ul', items: [
          'PNG: lossless, sharp text and edges, preserves transparency — ideal for screenshots and graphics',
          'JPG: lossy, even smaller files, no transparency — better for photographic images',
          'BMP screenshots convert to PNG with 70–90% size reduction and perfect quality',
          'BMP photos can go to either PNG (lossless) or JPG (smaller)',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert BMP to PNG online for free?', answer: 'Drop your BMP files onto the converter, click "Convert all", then "Download all". The conversion is completely lossless — every pixel is preserved. No upload or software needed.' },
      { question: 'Is there any quality loss when converting BMP to PNG?', answer: 'No. Both BMP and PNG store image data losslessly. Converting BMP to PNG is a perfectly lossless operation — every pixel is preserved exactly as in the original.' },
      { question: 'How much smaller will the PNG be than the BMP?', answer: 'Typically 70–95% smaller, depending on image content. A 6 MB screenshot BMP frequently becomes 200–600 KB as PNG. Simple images (solid colors, gradients) compress more than complex photographic detail.' },
      { question: 'Should I use PNG or JPG when converting from BMP?', answer: 'Use PNG for screenshots, UI images, diagrams, logos, and anything with sharp text or edges — PNG is lossless and preserves sharpness perfectly. Use JPG for photographs where even smaller file sizes are acceptable at the cost of some quality.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-jpg', 'bmp-to-webp', 'jpg-to-png'],
  },

  'avif-to-png': {
    from: 'avif', to: 'png',
    title: 'Free AVIF to PNG Converter Online | Abect',
    description: 'Convert AVIF to PNG online — free, lossless output, preserves transparency. Works in your browser, no uploads. Batch supported. Try it now.',
    h1: 'AVIF to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your AVIF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: transparent AVIF backgrounds are preserved in the PNG output.',
    ],
    whatIs: {
      heading: 'Why convert AVIF to PNG?',
      blocks: [
        { type: 'p', text: 'AVIF is a next-generation format with exceptional compression, but its support in design tools is still limited. Photoshop (versions before 2021), Lightroom, older Affinity Photo, Figma (via plugins only), and many other tools still do not handle AVIF natively.' },
        { type: 'p', text: 'PNG is the universal lossless format. It works in every image editor, every browser, every OS viewer, and every application that handles images. Converting AVIF to PNG gives you a file that opens everywhere with no plugins, no updates required.' },
        { type: 'h3', text: 'AVIF to PNG vs AVIF to JPG' },
        { type: 'ul', items: [
          'Choose PNG when AVIF has a transparent background — PNG preserves alpha, JPG does not',
          'Choose PNG when you need lossless quality for further editing',
          'Choose JPG when you need smaller files and transparency is not needed',
          'PNG will be larger than AVIF but fully portable and editable',
        ]},
      ],
    },
    faq: [
      { question: 'How do I open AVIF files in Photoshop or other editors?', answer: 'Convert the AVIF to PNG using this tool, then open the PNG in any image editor. PNG is fully supported in Photoshop, GIMP, Affinity Photo, Figma, and all other major design applications.' },
      { question: 'Does AVIF to PNG preserve transparency?', answer: 'Yes. Both AVIF and PNG support full alpha-channel transparency. Converting AVIF to PNG preserves all transparent areas completely.' },
      { question: 'Why is the PNG much larger than the AVIF?', answer: 'AVIF achieves exceptional compression — typically 50% smaller than equivalent PNG. Converting AVIF to PNG expands the data back to lossless representation, resulting in a much larger file. This is expected behavior.' },
      { question: 'Is there any quality loss converting AVIF to PNG?', answer: 'The PNG captures the AVIF at the quality level it was encoded at. If the AVIF was encoded at high quality, the PNG will accurately represent it. PNG itself is lossless, so no additional quality loss is introduced during conversion.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-jpg', 'jpg-to-png', 'webp-to-png'],
  },

  'tiff-to-png': {
    from: 'tiff', to: 'png',
    title: 'Free TIFF to PNG Converter Online | Abect',
    description: 'Convert TIFF to PNG online — free, lossless, instant. Reduce huge TIFF files without any quality loss. No uploads, works in browser. Try it now.',
    h1: 'TIFF to PNG Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your TIFF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: TIFF to PNG is completely lossless — every pixel from the TIFF is preserved in the PNG.',
    ],
    whatIs: {
      heading: 'TIFF to PNG — lossless to lossless, smaller files',
      blocks: [
        { type: 'p', text: 'Both TIFF and PNG are lossless formats, so converting between them involves zero quality loss. The main reason to convert TIFF to PNG is practical: file size and compatibility. Many TIFF files are stored completely uncompressed, resulting in enormous file sizes. PNG applies lossless compression that dramatically reduces size.' },
        { type: 'p', text: 'PNG is also universally web-compatible — browsers display PNG natively, while TIFF is not supported in Chrome, Firefox, or Edge. Converting TIFF to PNG makes your images shareable, uploadable, and displayable anywhere without special software.' },
        { type: 'h3', text: 'TIFF vs PNG — use case guide' },
        { type: 'ul', items: [
          'Keep TIFF for: professional print production, archiving, multi-layer Photoshop editing',
          'Use PNG for: web, presentations, email, design assets, any distribution scenario',
          'TIFF to PNG: lossless — no pixel data lost, just more efficient compression applied',
          'A typical uncompressed TIFF becomes 60–90% smaller as PNG with identical visual quality',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert TIFF to PNG online?', answer: 'Drop your TIFF files onto the converter above, click "Convert all", then "Download all". Note: TIFF support in browsers varies — if a file fails, try Chrome which has the most complete TIFF Canvas support.' },
      { question: 'Is there any quality loss when converting TIFF to PNG?', answer: 'No. Both TIFF and PNG are lossless formats. Converting TIFF to PNG preserves every pixel exactly — no detail is discarded, no artifacts are introduced.' },
      { question: 'How much smaller will the PNG be compared to TIFF?', answer: 'Substantially smaller in most cases. An uncompressed 50 MB TIFF frequently converts to a 2–10 MB PNG. The ratio depends on image content — scanned documents with large white areas compress more aggressively than densely detailed photographs.' },
      { question: 'Can I display the PNG in a browser after converting from TIFF?', answer: 'Yes. PNG is natively supported in every browser — Chrome, Firefox, Safari, Edge. TIFF is not displayable in most browsers. Converting TIFF to PNG is the standard way to make high-quality professional images web-ready.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['tiff-to-jpg', 'tiff-to-webp', 'jpg-to-png'],
  },

  // ─── TO WEBP ──────────────────────────────────────────────────────────────

  'png-to-webp': {
    from: 'png', to: 'webp',
    title: 'Free PNG to WebP Converter Online | Abect',
    description: 'Convert PNG to WebP online — free, instant. Up to 26% smaller files, preserves transparency. No uploads, no signup. Batch supported. Try it now.',
    h1: 'PNG to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your PNG files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: transparent PNG backgrounds are preserved in the WebP output — WebP supports full alpha-channel transparency.',
    ],
    whatIs: {
      heading: 'Why convert PNG to WebP?',
      blocks: [
        { type: 'p', text: 'WebP is a modern image format developed by Google specifically to replace JPEG and PNG on the web. WebP lossless compression achieves files up to 26% smaller than equivalent PNG. With lossy WebP, the savings are even greater — often 60–80% smaller than PNG for photographic content.' },
        { type: 'p', text: 'For web developers, converting PNG assets to WebP is one of the most impactful performance optimizations available. Smaller images mean faster LCP (Largest Contentful Paint), lower bandwidth costs, and better Core Web Vitals scores. Browser support is now universal: Chrome, Firefox, Safari 14+, and Edge all support WebP.' },
        { type: 'h3', text: 'PNG vs WebP — size comparison' },
        { type: 'ul', items: [
          'PNG lossless → WebP lossless: ~26% smaller, same visual quality',
          'PNG → WebP lossy (quality 92): often 50–80% smaller, near-identical appearance',
          'WebP supports transparency — transparent PNG backgrounds carry over perfectly',
          'WebP is now supported by 97%+ of browsers worldwide',
        ]},
        { type: 'h3', text: 'How to serve WebP on your website' },
        { type: 'ul', items: [
          'Use the HTML <picture> element: WebP as primary source, PNG as fallback',
          'Modern frameworks (Next.js, Nuxt, Astro) handle WebP serving automatically',
          'CDNs like Cloudflare and Cloudinary can convert PNG to WebP on-the-fly',
          'Keep the original PNG as backup for design tools that don\'t support WebP',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert PNG to WebP online for free?', answer: 'Drop your PNG files onto the converter above, click "Convert all", then "Download all". Conversion happens instantly in your browser. No upload, no account, no software needed.' },
      { question: 'Does PNG to WebP preserve transparency?', answer: 'Yes. WebP supports full alpha-channel transparency, just like PNG. When you convert a PNG with a transparent background to WebP, the transparency is preserved completely.' },
      { question: 'How much smaller will the WebP be compared to PNG?', answer: 'For lossless WebP: approximately 20–30% smaller. For lossy WebP at quality 92 (this converter\'s default): 50–80% smaller for photographic content, 20–40% for graphics and icons. The savings are substantial for image-heavy websites.' },
      { question: 'Is WebP supported in all browsers?', answer: 'Yes. WebP is supported in Chrome (since 2010), Firefox (since 2019), Safari (since version 14, late 2020), and Edge. It covers over 97% of global browser usage. It\'s safe to use WebP as the primary format for new web projects.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-webp', 'png-to-jpg', 'webp-to-png'],
  },

  'jpg-to-webp': {
    from: 'jpg', to: 'webp',
    title: 'Free JPG to WebP Converter Online | Abect',
    description: 'Convert JPG to WebP online — free, instant. Get 25–34% smaller files for faster web pages. No uploads, no signup. Batch supported. Try it now.',
    h1: 'JPG to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your JPG files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: WebP achieves 25–34% smaller files than JPG at the same visual quality — significant savings for photo-heavy pages.',
    ],
    whatIs: {
      heading: 'Why convert JPG to WebP for your website?',
      blocks: [
        { type: 'p', text: 'WebP was built to replace JPEG for web images. At equivalent visual quality, WebP files are 25–34% smaller than JPEG. This directly reduces page weight, improves loading speed, and boosts LCP (Largest Contentful Paint) — one of Google\'s Core Web Vitals ranking signals.' },
        { type: 'p', text: 'For a website with 50 product photos averaging 200 KB each (10 MB total), switching to WebP brings that to approximately 6.6–7.5 MB — saving 2.5–3.5 MB of data transfer per page load. Multiply that by thousands of monthly visitors and the bandwidth savings become meaningful.' },
        { type: 'h3', text: 'JPG to WebP performance impact' },
        { type: 'ul', items: [
          '25–34% smaller files → faster page loads → better user experience',
          'Lower bandwidth costs for your hosting or CDN',
          'Improved LCP score → better Core Web Vitals → potential Google ranking boost',
          'WebP supported by Chrome, Firefox, Safari 14+, Edge — 97%+ of browsers',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert JPG to WebP online?', answer: 'Drop your JPG files onto the converter above, click "Convert all", then "Download all". Each file is converted to WebP in your browser — no upload, no signup, no software needed.' },
      { question: 'How much smaller will WebP be compared to JPG?', answer: 'On average 25–34% smaller at equivalent visual quality. A 500 KB JPEG typically becomes a 330–375 KB WebP. For large batches — a product catalog of 500 images — the cumulative savings are significant for bandwidth and storage.' },
      { question: 'Will my website visitors be able to see WebP images?', answer: 'Yes. WebP is supported in Chrome, Firefox, Safari (14+), and Edge — over 97% of browsers worldwide. For the remaining percentage (older Safari, IE), use the HTML <picture> element with a JPG fallback: <picture><source type="image/webp" srcset="image.webp"><img src="image.jpg"></picture>.' },
      { question: 'Is WebP better than JPG for all types of images?', answer: 'For photographs and complex images: yes. For very simple graphics with solid colors and sharp edges, lossless PNG or WebP lossless may be more appropriate. WebP has the greatest impact on photo-heavy pages.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-webp', 'jpg-to-png', 'webp-to-jpg'],
  },

  'jpeg-to-webp': {
    from: 'jpeg', to: 'webp',
    title: 'Free JPEG to WebP Converter Online | Abect',
    description: 'Convert JPEG to WebP online — free, instant. 25–34% smaller files, same quality. No uploads, no signup. Batch supported. Try it now.',
    h1: 'JPEG to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your JPEG files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: JPEG and JPG are the same format — use whichever file extension your images have.',
    ],
    whatIs: {
      heading: 'JPEG to WebP — better compression, same quality',
      blocks: [
        { type: 'p', text: 'JPEG (also .jpg) is the most widely used image format for photographs, but it was designed in 1992. WebP, released by Google in 2010, uses a fundamentally more efficient compression algorithm that delivers 25–34% smaller files at the same perceptible quality.' },
        { type: 'p', text: 'For web developers managing large image libraries, converting JPEG to WebP is among the highest-ROI performance improvements available. It requires no design changes — just swap the format and serve smaller files to the same audience.' },
        { type: 'h3', text: 'How to serve WebP with JPEG fallback' },
        { type: 'ul', items: [
          'Keep the JPEG as a fallback for browsers that don\'t support WebP (very rare now)',
          'Use HTML <picture> element: WebP as primary, JPEG as fallback',
          'Next.js, Nuxt, Gatsby, and most modern frameworks serve WebP automatically',
          'Cloudflare Polish and image CDNs can convert JPEG to WebP on-the-fly at the edge',
        ]},
      ],
    },
    faq: [
      { question: 'Is JPEG the same as JPG?', answer: 'Yes. JPEG is the full format name (Joint Photographic Experts Group); JPG is the 3-character extension used on Windows. Both refer to the identical format and compress images using the same algorithm. They are processed identically by every tool.' },
      { question: 'How much smaller will WebP be than JPEG?', answer: 'Typically 25–34% smaller at equivalent visual quality. A 1 MB JPEG typically becomes a 660–750 KB WebP. For a website with 1000 product images, this can save hundreds of megabytes of total image weight.' },
      { question: 'Does WebP support transparency unlike JPEG?', answer: 'Yes. WebP supports full alpha-channel transparency while JPEG has none. If you plan to later add a transparent background to the converted image, WebP supports it — unlike JPEG which would require converting to PNG.' },
      { question: 'How do I add WebP images to a website?', answer: 'Use the <picture> element for safe delivery: <picture><source type="image/webp" srcset="photo.webp"><img src="photo.jpg" alt="..."></picture>. This serves WebP to supporting browsers (97%+) and falls back to JPEG for the rest.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-webp', 'jpeg-to-png', 'png-to-webp'],
  },

  'gif-to-webp': {
    from: 'gif', to: 'webp',
    title: 'Free GIF to WebP Converter Online | Abect',
    description: 'Convert GIF to WebP online — free, instant, in your browser. Full color, smaller files. No uploads, no signup. Batch supported. Try it now.',
    h1: 'GIF to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your GIF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Note: only the first frame of animated GIFs is exported as static WebP. Animation is not preserved.',
    ],
    whatIs: {
      heading: 'Why convert GIF to WebP?',
      blocks: [
        { type: 'p', text: 'GIF is a 256-color format from 1987. For static images, WebP is strictly superior: it supports millions of colors, achieves better compression, and produces sharper images without GIF\'s characteristic color banding.' },
        { type: 'p', text: 'For static GIF images — icons, logos, diagrams, simple graphics — converting to WebP typically reduces file size by 50–80% while eliminating the color limitations that make GIFs look dated on modern screens.' },
        { type: 'h3', text: 'Note on animated GIFs' },
        { type: 'ul', items: [
          'This converter exports only the first frame as a static WebP image',
          'For animated GIF to animated WebP, use a dedicated tool like FFmpeg or Ezgif',
          'Animated WebP is far more efficient than animated GIF — often 50% smaller',
          'Most modern browsers support animated WebP',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert GIF to WebP online?', answer: 'Drop your GIF files onto the converter, click "Convert all", then "Download all". The first frame of each GIF is exported as a static WebP image. No upload, no software needed.' },
      { question: 'Does converting GIF to WebP preserve animation?', answer: 'No. This converter exports only the first frame as a static WebP. WebP does support animation (and is far more efficient than GIF for it), but animated GIF conversion requires a specialized tool like FFmpeg or Ezgif.com.' },
      { question: 'How much smaller will the WebP be compared to the GIF?', answer: 'For static GIFs: typically 50–80% smaller with noticeably better color quality. WebP supports millions of colors versus GIF\'s 256, and its compression algorithm far outperforms GIF\'s LZW compression for most image content.' },
      { question: 'Does GIF to WebP preserve transparency?', answer: 'Yes. GIF supports single-color transparency, and WebP supports full alpha-channel transparency. The transparent areas from the GIF are preserved in the WebP output.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-jpg', 'gif-to-png', 'png-to-webp'],
  },

  'bmp-to-webp': {
    from: 'bmp', to: 'webp',
    title: 'Free BMP to WebP Converter Online | Abect',
    description: 'Convert BMP to WebP online — free, instant, no uploads. Reduce 20 MB BMP files by 98%. Batch supported. Try it now.',
    h1: 'BMP to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your BMP files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: BMP is uncompressed — expect dramatic file size reduction. A 20 MB BMP commonly becomes 100–400 KB WebP.',
    ],
    whatIs: {
      heading: 'BMP to WebP — extreme size reduction for web use',
      blocks: [
        { type: 'p', text: 'BMP stores image data completely uncompressed — every pixel at full depth. A 1920×1080 screenshot is ~6 MB; a 4K photo can exceed 25 MB. This makes BMP impractical for web, email, or storage.' },
        { type: 'p', text: 'WebP applies highly efficient compression while maintaining excellent visual quality. Converting BMP to WebP typically achieves 95–99% file size reduction. A 20 MB BMP can become a 200–400 KB WebP — 50–100× smaller — with minimal visible quality difference.' },
        { type: 'h3', text: 'BMP to WebP vs other target formats' },
        { type: 'ul', items: [
          'BMP to WebP: smallest output, excellent quality, ideal for web delivery',
          'BMP to PNG: lossless, slightly larger than WebP, ideal for editing workflows',
          'BMP to JPG: slightly larger than WebP, maximum compatibility with older software',
          'For most web use cases, WebP is the best choice for BMP conversion',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert BMP to WebP online?', answer: 'Drop your BMP files onto the converter, click "Convert all", then "Download all". Large BMP files may take a moment to load due to their size. Conversion is instant once loaded.' },
      { question: 'How much smaller will the WebP be compared to BMP?', answer: 'Typically 95–99% smaller. A 10 MB BMP photo usually becomes 100–400 KB as WebP at quality 92. BMP is completely uncompressed, so any compressed format delivers dramatic savings.' },
      { question: 'Is WebP quality 92 noticeable compared to the original BMP?', answer: 'At quality 92, the visual difference between the BMP and WebP is minimal and difficult to detect at normal viewing sizes. For pixel-perfect lossless output, convert to PNG instead.' },
      { question: 'Can I use BMP to WebP for website images?', answer: 'Yes. WebP is the recommended modern format for web images — smaller than both JPG and PNG, supported by Chrome, Firefox, Safari 14+, and Edge (covering 97%+ of browsers). For older browser support, use a JPG or PNG fallback.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-jpg', 'bmp-to-png', 'png-to-webp'],
  },

  'avif-to-webp': {
    from: 'avif', to: 'webp',
    title: 'Free AVIF to WebP Converter Online | Abect',
    description: 'Convert AVIF to WebP online — free, instant, in your browser. Better compatibility than AVIF, still smaller than JPG. No uploads. Try it now.',
    h1: 'AVIF to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your AVIF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: transparent AVIF backgrounds are preserved in the WebP output.',
    ],
    whatIs: {
      heading: 'AVIF vs WebP — choosing the right format',
      blocks: [
        { type: 'p', text: 'AVIF achieves the best compression of any common image format — typically 50% smaller than WebP and 70% smaller than JPEG at the same visual quality. However, AVIF browser support (~90%) and tool support lag behind WebP (~97% browser support, widely supported in design tools).' },
        { type: 'p', text: 'Converting AVIF to WebP gives you a format that is nearly as efficient as AVIF with substantially broader compatibility — supported by more browsers, CDNs, CMS platforms, and image processing tools that don\'t yet handle AVIF.' },
        { type: 'h3', text: 'When to convert AVIF to WebP' },
        { type: 'ul', items: [
          'When your image pipeline or CMS doesn\'t support AVIF yet',
          'When targeting browsers that support WebP but not AVIF (older Edge, some mobile)',
          'When using tools like Figma or Sketch that don\'t import AVIF',
          'WebP is a safe "almost as good" fallback when AVIF causes compatibility issues',
        ]},
      ],
    },
    faq: [
      { question: 'Is WebP or AVIF the better format?', answer: 'AVIF achieves better compression — typically 20–50% smaller than WebP at the same quality. But WebP has broader compatibility (97% vs ~90% browser support) and better tool support. For cutting-edge sites: AVIF. For broad compatibility with still-excellent compression: WebP.' },
      { question: 'Will the WebP be larger than the AVIF?', answer: 'Yes. AVIF has superior compression. Converting AVIF to WebP produces a larger file. If you need the absolute smallest file size, keep the AVIF where it\'s supported.' },
      { question: 'Does AVIF to WebP preserve transparency?', answer: 'Yes. Both AVIF and WebP support full alpha-channel transparency. Converting AVIF to WebP preserves all transparent areas.' },
      { question: 'What is the practical difference between 90% and 97% browser support?', answer: 'The gap is mostly older browsers: Safari before version 16 (2022) lacks AVIF support. For most modern sites, both formats work fine. If your analytics show significant traffic from older iOS devices (iPhone running iOS 15 or earlier), WebP is the safer choice.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-jpg', 'avif-to-png', 'png-to-webp'],
  },

  'tiff-to-webp': {
    from: 'tiff', to: 'webp',
    title: 'Free TIFF to WebP Converter Online | Abect',
    description: 'Convert TIFF to WebP online — free, instant, no uploads. Make large TIFF files web-ready. 96%+ smaller than source. Batch supported. Try it now.',
    h1: 'TIFF to WebP Converter',
    sub: 'Converted locally in your browser — files never leave your device.',
    howTo: [
      'Drop your TIFF files onto the converter above — or click to browse.',
      'Click Convert on a single file, or Convert all to process everything at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: always keep the original TIFF as your master file. Use the WebP only for web and distribution.',
    ],
    whatIs: {
      heading: 'Why convert TIFF to WebP for web delivery?',
      blocks: [
        { type: 'p', text: 'TIFF is the professional standard for high-quality image production — used in print, archiving, and RAW photo editing. But TIFF files are enormous (often 50–200 MB) and browsers cannot display them. Converting to WebP makes these images web-ready.' },
        { type: 'p', text: 'WebP is the optimal format for web delivery — 25–34% smaller than JPEG, supported by all modern browsers, and capable of excellent quality at high compression ratios. A 50 MB TIFF becomes a 500 KB–2 MB WebP, reducing page weight by 96–99%.' },
        { type: 'h3', text: 'The professional TIFF + WebP workflow' },
        { type: 'ul', items: [
          'Capture or edit in RAW/TIFF — preserve maximum quality in the master file',
          'Export to WebP for web delivery — smallest file, best quality',
          'Keep TIFF for reprints, future edits, and high-resolution exports',
          'Never re-edit from the WebP — always go back to the TIFF master',
        ]},
      ],
    },
    faq: [
      { question: 'How do I convert TIFF to WebP online?', answer: 'Drop your TIFF files onto the converter above, click "Convert all", then "Download all". Large TIFF files may take a moment to load in the browser. If a file fails, try Chrome which has the most complete TIFF canvas support.' },
      { question: 'How much smaller will the WebP be than the TIFF?', answer: 'Dramatically smaller — typically 96–99%. A 50 MB TIFF photo usually becomes 500 KB–2 MB as WebP at quality 92. TIFF files are often stored completely uncompressed, so the compression ratio is extreme.' },
      { question: 'Is quality lost when converting TIFF to WebP?', answer: 'At quality 92, the visual difference is minimal and barely detectable at normal screen sizes. For pixel-perfect lossless conversion, convert to PNG instead. For web delivery where performance matters, WebP quality 92 is an excellent balance.' },
      { question: 'Will the WebP work on my website?', answer: 'Yes. WebP is supported by Chrome, Firefox, Safari 14+, and Edge — covering 97%+ of global browser traffic. It is the recommended modern format for web images. For very old browsers, serve a JPG or PNG fallback using the <picture> element.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['tiff-to-jpg', 'tiff-to-png', 'png-to-webp'],
  },
}

// All 20 slugs — used in App.jsx routing and the "All image converters" section
export const ALL_SLUGS = Object.keys(CONVERSIONS)
