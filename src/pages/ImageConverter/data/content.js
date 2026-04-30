// Shared FAQ items reused across routes
const FAQ_UPLOAD = {
  question: 'Are my files uploaded to a server?',
  answer: 'No. All conversion happens directly in your browser using the Canvas API. Your files never leave your device — no uploads, no server processing, 100% private. This also means the tool works without an internet connection once the page has loaded.',
}
const FAQ_BATCH = {
  question: 'Can I convert multiple files at once?',
  answer: 'Yes. Drop as many files as you need in one go and click "Convert all" to process everything at once. When done, click "Download all" to get a single ZIP archive containing all converted files.',
}

// All 20 conversion configs
export const CONVERSIONS = {

  // ─── TO JPG ───────────────────────────────────────────────────────────────

  'png-to-jpg': {
    from: 'png', to: 'jpg',
    title: 'Free PNG to JPG Converter Online — No Upload, No Ads | Abect',
    description: 'Convert PNG to JPG free — instant, browser-based, no upload. Batch convert multiple files, no signup, no ads. Transparent areas auto-fill white. Try now.',
    h1: 'Free PNG to JPG Converter Online — Reduce File Size Instantly',
    sub: 'Batch convert PNG to JPG in your browser — no upload, no signup, no quality loss on photos.',
    howTo: [
      'Drop your PNG files onto the converter above — or click to browse and select multiple files at once.',
      'Click Convert on a single file, or Convert all to process the entire batch in one go.',
      'Download each JPG individually, or click Download all to save everything as a single ZIP archive.',
      'Important: PNG files with a transparent background will have transparent areas replaced with white in the JPG output — JPG does not support transparency.',
    ],
    sections: [
      {
        heading: 'Your PNG files stay on your device — 100% private',
        blocks: [
          { type: 'p', text: 'Unlike cloud-based converters that upload your images to remote servers, this tool processes everything locally. When you drop a PNG, it is loaded into your browser\'s RAM via the File API — no bytes are transmitted over the network.' },
          { type: 'p', text: 'This matters for screenshots with sensitive content, unreleased product photos, or personal images. Disconnect from the internet after the page loads — the converter keeps working. Zero server dependency at any step.' },
          { type: 'code', label: 'JavaScript', code: `// PNG to JPG conversion happens entirely in your browser:
const reader = new FileReader();
reader.onload = (e) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    // Fill white — JPG has no transparency channel
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    // Your PNG is converted to JPG locally — no upload, no server
    canvas.toBlob((blob) => { /* download */ }, 'image/jpeg', 0.92);
  };
  img.src = e.target.result;
};
reader.readAsDataURL(file);` },
        ],
      },
      {
        heading: 'Why convert PNG to JPG? — Real use cases',
        blocks: [
          { type: 'p', text: 'PNG is the gold standard for pixel-perfect graphics — logos, UI elements, and screenshots where transparency preservation matters. But for photos without transparency, PNG is overkill: a 1920×1080 photo can reach 5–8 MB.' },
          { type: 'p', text: 'Converting to JPG at quality 92 reduces that same photo to 200–600 KB with no visible difference. This directly impacts page load speed, WordPress media library performance, and Shopify\'s image optimization pipeline.' },
          { type: 'p', text: 'JPG is also the expected format for email attachments, print services, and stock photo platforms. Browser-based batch conversion lets you process an entire folder of PNG product shots in seconds — no software, no queue, no file size limits.' },
        ],
      },
      {
        heading: 'PNG vs JPG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'PNG', 'JPG'], rows: [
            ['Compression', 'Lossless', 'Lossy (quality 92 default)'],
            ['Transparency', 'Full alpha channel', 'None — fills with white'],
            ['File size', '3–8× larger than JPG', 'Smallest for photos'],
            ['Re-save quality', 'No loss on each save', 'Degrades with each re-save'],
            ['Metadata', 'No native EXIF support', 'Full EXIF, IPTC, XMP'],
            ['Best for', 'Logos, icons, UI, graphics', 'Photos, blog images, web'],
          ]},
        ],
      },
      {
        heading: 'When to use JPG and when to keep PNG',
        blocks: [
          { type: 'h3', text: 'Choose JPG when:' },
          { type: 'ul', items: [
            '**Uploading photos to WordPress, Shopify, or Squarespace** — JPG is 3–8× smaller and improves web performance',
            '**Sending images by email** — fits within 10–25 MB attachment limits without issues',
            '**Publishing to Instagram, Facebook, or LinkedIn** — social platforms re-compress anyway, JPG avoids double-compression',
            '**Storing large photo libraries** in Google Drive, Dropbox, or AWS S3 — cut storage costs significantly',
            '**Submitting to print services** or stock photo platforms that require JPG specifically',
          ]},
          { type: 'h3', text: 'Keep the PNG when:' },
          { type: 'ul', items: [
            '**The image has a transparent background** — JPG fills transparency with white, breaking logos and cut-out assets',
            '**Working in Figma, Adobe Illustrator, or Photoshop** — lossless PNG ensures pixel-perfect quality during editing',
            '**Re-editing and re-saving multiple times** — JPG accumulates compression artifacts with each re-save, PNG does not',
            '**Text overlays or flat-color graphics** — JPG creates visible ringing artifacts around sharp edges',
          ]},
        ],
      },
      {
        heading: 'How PNG to JPG conversion works in your browser',
        blocks: [
          { type: 'p', text: 'This converter uses the HTML5 Canvas API to re-encode your PNG as a JPEG. The PNG is loaded into an HTMLImageElement, drawn onto an off-screen canvas, and exported via canvas.toBlob() with MIME type image/jpeg at quality 0.92.' },
          { type: 'p', text: 'Before drawing, the canvas is pre-filled with white via ctx.fillStyle = \'#ffffff\' — this replaces PNG transparency, since JPEG has no alpha channel. The Blob is downloaded via URL.createObjectURL(). Your CPU handles everything — no data leaves the browser tab.' },
          { type: 'code', label: 'JavaScript', code: `// Simplified PNG to JPG conversion pipeline:
function convertPNGtoJPG(file, quality = 0.92) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      // Fill white background — JPG has no transparency support
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Export as JPEG Blob, quality 0.92 = visually lossless
      canvas.toBlob(resolve, 'image/jpeg', quality);
      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = reject;
    img.src = objectUrl;
  });
}` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert PNG to JPG online for free?', answer: 'Drop your PNG files onto the converter above, click "Convert", then "Download". The entire process takes seconds. No account, no software, no uploads — everything runs in your browser using the HTML5 Canvas API.' },
      { question: 'Does converting PNG to JPG lose quality?', answer: 'Some quality is lost because JPG uses lossy compression. At quality 92 — this converter\'s default — the difference is nearly invisible for photographs. For graphics with sharp edges, text, or flat-color areas, compression artifacts may be more noticeable. In those cases, keep the PNG.' },
      { question: 'What happens to transparent areas when converting PNG to JPG?', answer: 'JPG does not support transparency. Any transparent areas in your PNG will be filled with white in the JPG output. If you need to preserve transparency, convert to WebP instead — WebP supports full alpha channel and is supported by all modern browsers.' },
      { question: 'Why is my JPG sometimes larger than the original PNG?', answer: 'This happens with simple graphics, screenshots with large flat-color areas, or images with very few colors. PNG\'s lossless compression handles uniform blocks of color very efficiently. JPG is optimized for photographs with complex gradients and textures — not for flat graphics or screenshots.' },
      { question: 'How do I convert PNG to JPG on Windows or Mac without software?', answer: 'Use this browser-based converter — no installation needed. Open the page, drop your PNG files, click Convert, and download. It works on Windows, Mac, Linux, and any modern mobile browser. No software, no plugins, no account.' },
      { question: 'What quality setting does this converter use?', answer: 'This converter outputs JPG at quality 92, which is the professional standard that balances file size and visual quality. The difference from the original PNG is imperceptible for photographs at this setting. Tools targeting maximum compression typically use quality 70–80, which produces visible artifacts.' },
      { question: 'Can I convert PNG to JPG in bulk?', answer: 'Yes. Drop multiple PNG files at once (or select them with the file picker), then click "Convert all" to process the entire batch. When done, use "Download all" to save everything as a single ZIP archive.' },
      { question: 'Is PNG to JPG conversion reversible?', answer: 'No. Once the original PNG is discarded, you cannot recover the lossless quality. Always keep the original PNG as a backup. Converting the JPG back to PNG will produce a lossless file, but the JPEG compression artifacts that were baked in will remain.' },
      { question: 'Does this converter work offline?', answer: 'Yes, once the page has loaded, the converter works without an internet connection. All processing is done locally using your browser\'s Canvas API — there is no server dependency at any step of the conversion.' },
      { question: 'Does this PNG to JPG converter work on mobile?', answer: 'Yes. The converter works on any modern browser — including Safari on iPhone and iPad, and Chrome on Android. You can select PNG files directly from your Photos app or Files app. Batch conversion and ZIP download are supported on mobile browsers as well.' },
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-webp', 'webp-to-jpg'],
  },

  'webp-to-jpg': {
    from: 'webp', to: 'jpg',
    title: 'Free WebP to JPG Converter Online | Abect',
    description: 'Convert WebP to JPG online — free, instant, no uploads. Fix compatibility with apps and services that don\'t support WebP. Batch supported. Try it now.',
    h1: 'Free WebP to JPG Converter Online — Instant Compatibility',
    sub: 'Fix WebP compatibility instantly — convert to JPG that opens in every app, email client, and CMS.',
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
        { type: 'h3', text: 'WebP vs JPG — quick comparison' },
        { type: 'table', headers: ['', 'WebP', 'JPG'], rows: [
          ['File size', '25–34% smaller than JPG', 'Baseline'],
          ['Transparency', 'Full alpha channel', 'None'],
          ['Browser support', '97%+', '100%'],
          ['App support', 'Limited in older apps', 'Universal'],
          ['Animation', 'Yes', 'No'],
        ]},
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
      { question: 'How do I open WebP files that won\'t open on my computer?', answer: 'Convert them to JPG using this tool. Drop the WebP file onto the converter, click Convert, then Download. The resulting JPG opens in every application — no software updates or plugins needed.' },
      { question: 'Can I convert WebP to JPG on iPhone or Android?', answer: 'Yes. This tool runs in any mobile browser — Safari on iPhone, Chrome on Android, Firefox on any device. Tap "click to browse" to select files from your camera roll or files app, convert, and download directly to your device.' },
      { question: 'How do I convert WebP to JPG in bulk?', answer: 'Drop multiple WebP files onto the converter at once, click "Convert all", then "Download all". You\'ll receive a single ZIP archive containing all the converted JPG files.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-jpg', 'webp-to-png', 'jpg-to-webp'],
  },

  'gif-to-jpg': {
    from: 'gif', to: 'jpg',
    title: 'GIF to JPG Converter — Full Color, No Upload, No Ads | Abect',
    description: 'Convert GIF to JPG free — full color, no banding. First frame of animated GIFs exported as static JPG. Browser-based, no upload, no ads. Batch ready. Try now.',
    h1: 'Free GIF to JPG Converter Online — Full Color, No 256-Color Limit',
    sub: 'Extract a full-color static JPG from any GIF — no 256-color limit, no upload, no signup.',
    howTo: [
      'Drop your GIF files onto the converter above — static and animated GIFs are both accepted. Click the area to use a file picker.',
      'Click Convert on any individual GIF to preview the static JPG output, or click Convert all to process the entire batch at once.',
      'Download each converted JPG file individually, or click Download all to receive everything in a single ZIP archive.',
      'Important: only the first frame of each animated GIF is exported as a static JPG — JPG has no animation support. To convert animation, use GIF to WebP instead.',
    ],
    sections: [
      {
        heading: 'Your GIF files are processed locally — no upload, no queue',
        blocks: [
          { type: 'p', text: 'No upload queue, no file size caps. GIF files can be surprisingly large — especially animated exports with many frames. This converter loads each GIF directly into your browser\'s RAM via the FileReader API, bypassing any network transfer entirely.' },
          { type: 'p', text: 'Once the page has loaded, the converter works without an internet connection — useful for batch-exporting GIFs from confidential design projects. Nothing is cached on a remote server. Disconnect your network after page load and it continues running.' },
          { type: 'code', label: 'JavaScript', code: `// Converting GIF to JPG locally — no upload, no queue:
const reader = new FileReader();
reader.onload = (e) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    // Fill white — JPG has no transparency; replaces GIF's binary alpha
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Browser renders the first frame of animated GIFs automatically
    ctx.drawImage(img, 0, 0);
    // GIF is now full-color JPG — still on your device, never uploaded
    canvas.toBlob((blob) => { /* download */ }, 'image/jpeg', 0.92);
  };
  img.src = e.target.result;
};
reader.readAsDataURL(file);` },
        ],
      },
      {
        heading: 'Why convert GIF to JPG? — Breaking the 256-color barrier',
        blocks: [
          { type: 'p', text: 'GIF was designed in 1987 for simple web graphics — before photography made the web its home. Its 256-color palette was adequate for logos and icons, but produces visible banding on photographic content: skies, skin tones, and smooth gradients all degrade noticeably.' },
          { type: 'p', text: 'Converting GIF to JPG replaces the 256-color palette with full JPEG color depth — 16.7 million colors, smooth gradients, no dithering. For GIF screenshots of photo-heavy websites or design exports accidentally saved as GIF, the quality improvement is immediate.' },
          { type: 'p', text: 'File size is the second reason. GIF uses LZW compression on 256-color data — poorly suited for photos. A 1 MB GIF photo typically becomes 100–200 KB as JPG at quality 92 with no perceptible difference for photographic content.' },
        ],
      },
      {
        heading: 'GIF vs JPG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'GIF', 'JPG'], rows: [
            ['Color depth', '256 colors max', '16.7 million colors'],
            ['Compression', 'LZW lossless', 'Lossy (quality 92 default)'],
            ['Transparency', 'Single-color binary', 'None — fills with white'],
            ['Animation', 'Yes (multi-frame)', 'No (static only)'],
            ['File size (photos)', 'Large (palette inefficiency)', 'Significantly smaller'],
            ['Metadata', 'Minimal', 'Full EXIF, IPTC, XMP'],
            ['Best for', 'Simple animations, icons', 'Photos, gradients, web'],
          ]},
        ],
      },
      {
        heading: 'When to convert GIF to JPG and when to keep the GIF',
        blocks: [
          { type: 'h3', text: 'Convert to JPG when:' },
          { type: 'ul', items: [
            '**Saving photos or screenshots that arrived as GIF** — JPG removes the 256-color limit and produces dramatically better quality',
            '**Sharing on social media, email, or Slack** — JPG is universally supported and opens in every app without plugins',
            '**Reducing file size of photo-content GIFs** — JPG typically shrinks a photo GIF by 50–80% at quality 92',
            '**Uploading to WordPress, Shopify, or any CMS** — JPG is the expected format for photographic web content',
          ]},
          { type: 'h3', text: 'Keep the GIF when:' },
          { type: 'ul', items: [
            '**The GIF is animated and you need to preserve the animation** — convert to WebP for a modern animated format with 50–80% smaller file sizes',
            '**The image has very few colors and binary transparency** — GIF handles single-color transparency that JPG cannot store',
            '**You need animated graphics in email clients** — animated GIF is still the only animated format supported in most email clients including Outlook',
          ]},
        ],
      },
      {
        heading: 'How GIF to JPG conversion works in your browser',
        blocks: [
          { type: 'p', text: 'This converter uses the HTML5 Canvas API to re-encode your GIF as JPEG. The browser\'s built-in GIF decoder renders the first animation frame into an HTMLImageElement. The Canvas API draws it onto an off-screen canvas and exports via canvas.toBlob() with MIME type image/jpeg.' },
          { type: 'p', text: 'Before export, the canvas is pre-filled with white via ctx.fillStyle = \'#ffffff\' — replacing GIF\'s single-color transparency, since JPEG has no alpha channel. Quality is set to 0.92, the standard for visually lossless JPEG. No data leaves the browser tab at any step.' },
          { type: 'code', label: 'JavaScript', code: `// Simplified GIF to JPG conversion pipeline:
function convertGIFtoJPG(file, quality = 0.92) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      // Fill white — JPEG has no transparency; replaces GIF's binary alpha
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Browser renders the first frame of animated GIF automatically
      ctx.drawImage(img, 0, 0);
      // Export as JPEG — full 16.7M colors, quality 0.92
      canvas.toBlob(resolve, 'image/jpeg', quality);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert GIF to JPG online for free?', answer: 'Drop your GIF files onto the converter above, click "Convert all", then "Download all". Each GIF is exported as a static JPG — the first frame for animated GIFs. No software, no upload, no signup required.' },
      { question: 'Does converting GIF to JPG preserve the animation?', answer: 'No. JPG is a static image format and cannot store animation. Only the first frame of each animated GIF is exported as a static JPG. If you need a better animated format with smaller files than GIF, convert the GIF to WebP — WebP supports animation.' },
      { question: 'Will the JPG look better than the GIF?', answer: 'For photographic content, yes — significantly better. GIF\'s 256-color limit produces visible banding on photos, gradients, and skin tones. JPG supports 16.7 million colors and renders complex images with smooth gradients. For simple logos and icons with few colors, the improvement is minor.' },
      { question: 'What happens to GIF transparency when converting to JPG?', answer: 'GIF supports single-color binary transparency. When converting to JPG, all transparent areas are filled with white — JPG has no transparency support of any kind. To preserve transparency in the output, convert GIF to PNG or WebP instead.' },
      { question: 'How do I extract the first frame of a GIF as a JPG?', answer: 'Drop the GIF onto this converter — it automatically renders and exports the first frame as a static JPG. No additional configuration needed. For extracting multiple specific frames or all frames separately, use a dedicated GIF editor like GIMP or Photoshop.' },
      { question: 'What quality setting does this GIF to JPG converter use?', answer: 'This converter exports JPG at quality 0.92 (92%), the professional standard for visually lossless JPEG output. At this setting, compression artifacts are nearly invisible on photographic content. Note: GIF\'s 256-color dithering exists in the source — quality 92 JPG encodes what is there without adding new artifacts.' },
      { question: 'Is GIF to JPG conversion reversible?', answer: 'Not fully. Converting GIF to JPG applies JPEG lossy compression, discarding some image data. You can convert the JPG back to GIF, but JPEG artifacts remain baked in and the original palette structure is gone. Always keep the original GIF as a backup before deleting it.' },
      { question: 'Why does my converted JPG still show color banding?', answer: 'The banding originates in the GIF source, not in the JPG conversion. GIF\'s 256-color palette forces dithering on photos during the original GIF encoding — that artifact is already baked into the file. Converting to JPG preserves those dither patterns. For pixel-perfect output, start from the original uncompressed source, not the GIF.' },
      { question: 'Does this GIF to JPG converter work offline?', answer: 'Yes. Once the page has loaded, conversion works without an internet connection. All processing uses your browser\'s Canvas API — there is no server involved at any step.' },
      { question: 'Does this GIF to JPG converter work on iPhone and Android?', answer: 'Yes. The converter works on Safari (iPhone/iPad), Chrome and Firefox (Android), and any modern mobile browser. Select GIF files from your Files app, convert, and download the JPG files directly to your device.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-png', 'gif-to-webp', 'png-to-jpg'],
  },

  'bmp-to-jpg': {
    from: 'bmp', to: 'jpg',
    title: 'Free BMP to JPG Converter Online | Abect',
    description: 'Convert BMP to JPG online — free, instant, no uploads. Reduce 20 MB BMP files to under 500 KB without visible quality loss. Batch supported. Try it now.',
    h1: 'Free BMP to JPG Converter Online — From 20 MB to Under 500 KB',
    sub: 'Shrink massive BMP files to web-ready JPG — batch convert without uploading anything.',
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
        { type: 'h3', text: 'BMP vs JPG — quick comparison' },
        { type: 'table', headers: ['', 'BMP', 'JPG'], rows: [
          ['Compression', 'None (raw pixels)', 'Lossy (quality 92 default)'],
          ['File size', '~6 MB for 1920×1080', '300–800 KB for same image'],
          ['Transparency', 'No', 'No'],
          ['Web use', 'Not usable (too large)', 'Standard web format'],
          ['Best for', 'Windows internal use', 'Web, email, sharing'],
        ]},
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
      { question: 'How do I reduce the size of a BMP file?', answer: 'Convert BMP to JPG — file size typically drops 90–98%. A 20 MB BMP photo becomes 200–600 KB as JPG at quality 92. Drop the file onto the converter above and download the result instantly.' },
      { question: 'Can I send a BMP file by email?', answer: 'Most email clients have attachment size limits (typically 10–25 MB) and may reject large BMP files entirely. Converting to JPG first reduces a 20 MB BMP to under 1 MB — accepted by every email service and opens on every device.' },
      { question: 'Should I convert BMP to JPG or to PNG?', answer: 'Use JPG for photographs — it produces the smallest files. Use PNG for screenshots, UI captures, and images with text or sharp edges — PNG is lossless and preserves sharpness perfectly. BMP to JPG is the right choice when file size matters and the image is photographic.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-png', 'bmp-to-webp', 'png-to-jpg'],
  },

  'avif-to-jpg': {
    from: 'avif', to: 'jpg',
    title: 'Free AVIF to JPG Converter Online | Abect',
    description: 'Convert AVIF to JPG online — free, instant, no uploads. Get universal JPG compatibility from next-gen AVIF images. Batch supported. Try it now.',
    h1: 'Free AVIF to JPG Converter Online — Universal Compatibility',
    sub: 'Convert AVIF to universally supported JPG — works in every app, browser, and email client. No upload.',
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
        { type: 'h3', text: 'AVIF vs JPG — quick comparison' },
        { type: 'table', headers: ['', 'AVIF', 'JPG'], rows: [
          ['File size', '~50% smaller than JPG', 'Baseline'],
          ['Browser support', '~90%', '100%'],
          ['App / tool support', 'Limited (newer format)', 'Universal'],
          ['Transparency', 'Yes', 'No'],
          ['Best for', 'Modern web delivery', 'Universal compatibility'],
        ]},
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
      { question: 'How do I open AVIF files downloaded from websites?', answer: 'Convert them to JPG using this browser-based tool. Drop the file onto the converter, click Convert, then Download. The JPG output opens in every image viewer, editor, and application without requiring any software updates.' },
      { question: 'Which browsers and apps support AVIF natively?', answer: 'Chrome 85+, Firefox 93+, Safari 16+, and Edge 121+ support AVIF in browsers. Photoshop added AVIF support in 2021. Older versions of Photoshop, Lightroom Classic, Affinity Photo (pre-2.0), and most CMS platforms still require conversion to JPG or PNG.' },
      { question: 'Is AVIF better than WebP?', answer: 'AVIF achieves 20–50% better compression than WebP at the same quality, making it the most efficient common image format. However, WebP has broader compatibility — 97% browser support vs ~90% for AVIF. For maximum performance: AVIF. For broad compatibility with still-excellent compression: WebP.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-png', 'png-to-jpg', 'webp-to-jpg'],
  },

  'tiff-to-jpg': {
    from: 'tiff', to: 'jpg',
    title: 'Free TIFF to JPG Converter Online | Abect',
    description: 'Convert TIFF to JPG online — free, instant, no uploads. Reduce 50 MB TIFF files to web-ready JPG in seconds. Batch supported. Try it now.',
    h1: 'Free TIFF to JPG Converter Online — Web-Ready in Seconds',
    sub: 'Make heavy TIFF files web-ready in seconds — convert to JPG locally, no upload, no software.',
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
        { type: 'h3', text: 'TIFF vs JPG — quick comparison' },
        { type: 'table', headers: ['', 'TIFF', 'JPG'], rows: [
          ['Compression', 'Lossless or none', 'Lossy'],
          ['File size', '50–200 MB typical', '1–3 MB for same content'],
          ['Browser support', 'None (not displayable)', '100%'],
          ['Best for', 'Print, archiving, editing', 'Web, email, sharing'],
          ['Editing suitability', 'Master file, no loss', 'Degrades on re-save'],
        ]},
        { type: 'h3', text: 'The professional TIFF + JPG workflow' },
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
      { question: 'How do I make a TIFF file small enough to email?', answer: 'Convert to JPG — a 50 MB TIFF typically becomes 1–3 MB as JPG. Drop the file onto the converter above, click Convert, then Download. Most email services accept JPG files up to 25 MB without issues.' },
      { question: 'Should I keep the original TIFF after converting to JPG?', answer: 'Yes. Always archive the original TIFF. JPG is for distribution only — re-editing from JPG accumulates compression artifacts with each save. Keep the TIFF as your master file and generate new JPGs from it as needed.' },
      { question: 'Why can\'t I display TIFF images on a website?', answer: 'TIFF is not a web-supported image format. Chrome, Firefox, and Edge do not render TIFF natively. Convert to JPG or WebP first — both formats display natively in all browsers without plugins or configuration changes.' },
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
    h1: 'Free JPG to PNG Converter Online — Lossless Output, No Re-Save Loss',
    sub: 'Get lossless PNG output — stop quality loss on every re-save. Batch supported, no upload, no signup.',
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
        { type: 'h3', text: 'JPG vs PNG — quick comparison' },
        { type: 'table', headers: ['', 'JPG', 'PNG'], rows: [
          ['Compression', 'Lossy', 'Lossless'],
          ['Transparency', 'None', 'Full alpha channel'],
          ['File size', 'Smaller for photos', '3–8× larger'],
          ['Re-save quality', 'Degrades each save', 'No loss ever'],
          ['Best for', 'Photos, web images', 'Graphics, logos, editing'],
        ]},
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
      { question: 'How do I convert JPG to PNG on Windows or Mac without installing software?', answer: 'Use this browser-based converter — no installation needed. Open the page, drop your JPG files, click Convert, and download. Works on Windows, Mac, Linux, and mobile browsers.' },
      { question: 'Does converting JPG to PNG make the image sharper?', answer: 'No. The conversion captures the JPG at its current quality in a lossless PNG container. JPEG compression artifacts present in the original are preserved in the PNG output. What you gain is that the PNG will not degrade further on future re-saves.' },
      { question: 'How do I add a white background when converting JPG to PNG?', answer: 'JPG has no transparency to begin with — the background is already whatever color it is in the source image. The PNG output preserves this exactly. If you need to change the background color, open the PNG in an editor after conversion.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-jpg', 'jpg-to-webp', 'webp-to-png'],
  },

  'jpeg-to-png': {
    from: 'jpeg', to: 'png',
    title: 'Free JPEG to PNG Converter Online | Abect',
    description: 'Convert JPEG to PNG online — free, instant, lossless PNG output. No re-compression, no upload, no signup. Batch supported. Try it now.',
    h1: 'Free JPEG to PNG Converter Online — Stop Compression on Every Save',
    sub: 'Convert JPEG to lossless PNG — no re-compression artifacts, no upload, runs entirely in your browser.',
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
        { type: 'h3', text: 'JPEG vs PNG — quick comparison' },
        { type: 'table', headers: ['', 'JPEG', 'PNG'], rows: [
          ['Compression', 'Lossy', 'Lossless'],
          ['Transparency', 'None', 'Full alpha channel'],
          ['File size', 'Smaller for photos', '3–8× larger'],
          ['Re-save quality', 'Degrades each save', 'No loss ever'],
          ['Best for', 'Photos, web images', 'Graphics, logos, editing'],
        ]},
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
      { question: 'How do I convert JPEG to PNG on Mac for free?', answer: 'Use this browser-based tool — no software needed. Open in Safari, Chrome, or Firefox on any Mac, drop your JPEG files, click Convert, and download the PNG output. No installation required.' },
      { question: 'Why would I convert JPEG to PNG instead of keeping JPEG?', answer: 'When you plan to edit and re-save the image multiple times. Each JPEG save re-encodes the file and discards more detail — compression artifacts accumulate over time. PNG is lossless — re-saving never reduces quality, making it ideal for images still in the editing workflow.' },
      { question: 'Is JPEG to PNG lossless?', answer: 'The conversion is lossless going forward. The PNG accurately captures the JPEG at its current quality state with no additional loss. However, any JPEG compression artifacts already in the source image are preserved — the conversion does not undo existing JPEG compression.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-png', 'jpeg-to-webp', 'webp-to-png'],
  },

  'webp-to-png': {
    from: 'webp', to: 'png',
    title: 'WebP to PNG — Open in Photoshop, No Upload, No Ads | Abect',
    description: 'Convert WebP to PNG free — lossless, transparency preserved. Browser-based, no upload, no ads. Photoshop, Figma, Sketch ready. Batch supported. Try now.',
    h1: 'Free WebP to PNG Converter Online — Preserves Transparency',
    sub: 'Convert WebP to lossless PNG with full transparency — open in Photoshop, Figma, or any editor.',
    howTo: [
      'Drop your WebP files onto the converter above — or click to browse and select multiple files at once.',
      'Click Convert on a single file, or Convert all to process the entire batch in one go.',
      'Download each PNG individually, or click Download all to save everything as a single ZIP archive.',
      'Tip: transparent WebP backgrounds are fully preserved in the PNG output — both formats support the full alpha channel, so no data is lost.',
    ],
    sections: [
      {
        heading: 'Your design assets never leave your browser',
        blocks: [
          { type: 'p', text: 'Design files, exported icons, and UI assets often contain unreleased product work. This converter processes every WebP file entirely inside your browser tab — no file is transmitted over the network at any point. Files are decoded in browser RAM via the File API and re-encoded to PNG using the Canvas API.' },
          { type: 'p', text: 'Disconnect from the internet right now and the converter will still work. Once the page has loaded, there is no server dependency at any step. Nothing is queued, nothing is cached on external infrastructure. 100% offline-capable by design.' },
          { type: 'code', label: 'JavaScript', code: `// Converting WebP to PNG locally in your browser:
const reader = new FileReader();
reader.onload = (e) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    // Draw WebP — alpha channel is preserved automatically in PNG
    ctx.drawImage(img, 0, 0);
    // PNG output: lossless, full transparency, zero upload
    canvas.toBlob((blob) => { /* download */ }, 'image/png');
  };
  img.src = e.target.result;
};
reader.readAsDataURL(file);` },
        ],
      },
      {
        heading: 'Why convert WebP to PNG? — Compatibility and transparency',
        blocks: [
          { type: 'p', text: 'WebP became the dominant web format after Google pushed it for Core Web Vitals performance. As a result, nearly every image downloaded from a modern website arrives as a WebP file. The problem: design tools have been slower to adopt it.' },
          { type: 'p', text: 'Photoshop CS6–CC 2014, older Sketch builds, and Affinity Photo prior to v1.8 still fail to open WebP files. Converting to PNG restores full compatibility — PNG is natively supported in every image editor since the 1990s, with no plugins or updates required.' },
          { type: 'p', text: '**Transparency preservation** is the second key reason. Unlike WebP-to-JPG — where transparent backgrounds fill with white — WebP to PNG keeps the alpha channel intact. Essential for logos, icons, and any UI asset composited in Figma or Illustrator.' },
        ],
      },
      {
        heading: 'WebP vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'WebP', 'PNG'], rows: [
            ['Compression', 'Lossy or lossless', 'Lossless only'],
            ['Transparency', 'Full alpha channel', 'Full alpha channel'],
            ['Animation', 'Yes (multi-frame)', 'No (APNG only, limited support)'],
            ['App support', 'Limited in older software', 'Universal'],
            ['Browser support', '97%+', '100%'],
            ['File size', 'Smaller (optimized)', 'Larger (lossless)'],
            ['Metadata', 'Partial EXIF support', 'Limited (iTXt/tEXt chunks)'],
          ]},
        ],
      },
      {
        heading: 'When to convert to PNG and when to keep WebP',
        blocks: [
          { type: 'h3', text: 'Convert to PNG when:' },
          { type: 'ul', items: [
            '**Opening in Photoshop, Illustrator, or Affinity Photo** — PNG is natively supported in all versions without plugins',
            '**Working in Figma, Sketch, or InVision** — PNG preserves alpha channels and displays correctly in design handoffs',
            '**The image has a transparent background** — PNG keeps the alpha channel intact; JPG fills it with white',
            '**Submitting to a CMS or email template builder** that does not accept WebP — older Mailchimp, Klaviyo, or Shopify theme editors',
            '**Archiving for long-term storage** — PNG lossless guarantees zero quality degradation across re-saves',
          ]},
          { type: 'h3', text: 'Keep the WebP when:' },
          { type: 'ul', items: [
            '**Serving images on a website or web app** — WebP loads 25–34% faster than PNG, directly improving Core Web Vitals scores',
            '**Storing animated images** — animated WebP is more efficient than APNG and has broader browser support',
            '**Your target viewer already supports WebP** — all modern browsers, Android, iOS 14+, and macOS Big Sur+',
          ]},
        ],
      },
      {
        heading: 'How WebP to PNG conversion works in your browser',
        blocks: [
          { type: 'p', text: 'The browser\'s built-in WebP decoder parses the VP8/VP8L bitstream and rebuilds the full pixel grid — including the alpha channel — into an HTMLImageElement. The Canvas API draws it onto an off-screen canvas and exports the result via canvas.toBlob() with MIME type image/png.' },
          { type: 'p', text: 'PNG export is lossless by definition — no quality parameter to tune. The canvas captures every pixel exactly, including the full alpha channel. WebP transparency maps directly to the PNG alpha — which is why this conversion is pixel-perfect for icons, logos, and design assets.' },
          { type: 'code', label: 'JavaScript', code: `// Simplified WebP to PNG conversion pipeline:
function convertWebPtoPNG(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      // No fill needed — PNG supports the full alpha channel
      ctx.drawImage(img, 0, 0);

      // Export as PNG — lossless, transparency preserved, no upload
      canvas.toBlob(resolve, 'image/png');
      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = reject;
    img.src = objectUrl;
  });
}` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert WebP to PNG online for free?', answer: 'Drop your WebP files onto the converter above, click "Convert all", then "Download all". The PNG output is lossless and preserves transparency. No account, no software, no upload — everything runs in your browser.' },
      { question: 'Does WebP to PNG preserve transparency?', answer: 'Yes. Both WebP and PNG support full alpha-channel transparency. When you convert a WebP image with a transparent background to PNG, every transparent pixel is preserved exactly — no white fill, no quality loss.' },
      { question: 'Will the PNG be larger than the original WebP?', answer: 'Yes. WebP achieves 25–34% better compression than PNG for equivalent visual quality. The PNG will be noticeably larger than the source WebP. If file size matters for web use, keep the WebP wherever it is supported and only convert to PNG when compatibility requires it.' },
      { question: 'How do I open WebP files in Photoshop?', answer: 'Convert WebP to PNG using this tool, then open the PNG in Photoshop. PNG is natively supported in all versions of Photoshop without plugins — from CS3 through the latest Creative Cloud release. Photoshop added native WebP support only in CC 2023; earlier versions require a plugin or this conversion.' },
      { question: 'How do I use a WebP image in Figma or Sketch?', answer: 'Convert the WebP to PNG first. Figma fully supports PNG (including transparency) and you can import it as a fill, component asset, or frame content. Sketch also accepts PNG natively. Both tools have limited or version-specific WebP support, so PNG is the safer choice for design handoffs.' },
      { question: 'Does WebP to PNG conversion lose image quality?', answer: 'No. PNG is a lossless format — no quality is introduced or removed during conversion. The PNG captures the WebP at its existing quality level. If the WebP was encoded with lossy compression, those artifacts are already present; PNG conversion does not add new ones.' },
      { question: 'How do I convert WebP to PNG on Mac or Windows without software?', answer: 'Use this browser-based converter — no installation needed. It works in Safari, Chrome, Edge, and Firefox on any Mac or Windows computer. Drop your files, click Convert, and download. No account, no software, no plugins.' },
      { question: 'Does this WebP to PNG converter work offline?', answer: 'Yes. Once the page has loaded, the converter runs entirely without an internet connection. All processing uses the browser\'s Canvas API locally. You can verify this by disconnecting your network after page load — conversion continues without interruption.' },
      { question: 'Can I convert WebP to PNG on iPhone or Android?', answer: 'Yes. The converter runs in any modern mobile browser — Safari on iPhone and iPad, Chrome on Android, Firefox on any device. Tap "click to browse" to select files from your camera roll or Files app, convert, and download directly to your device.' },
      { question: 'Is there a quality setting for WebP to PNG conversion?', answer: 'No. PNG is a lossless format — there is no quality parameter to configure. Every pixel from the source WebP is captured exactly in the PNG output. If the original WebP was lossy-encoded, those artifacts exist in the source; PNG preserves them as-is without adding new ones.' },
      { question: 'Is WebP to PNG conversion reversible?', answer: 'Technically yes — you can convert the resulting PNG back to WebP at any time. However, if the original WebP was lossy-encoded, those compression artifacts are baked into the PNG. Converting back to WebP applies WebP compression on top. Keep the original WebP as a backup for archival purposes.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-png', 'webp-to-jpg', 'png-to-webp'],
  },

  'gif-to-png': {
    from: 'gif', to: 'png',
    title: 'Free GIF to PNG Converter Online | Abect',
    description: 'Convert GIF to PNG online — free, lossless, preserves transparency. Better quality and smaller files than GIF. No uploads. Batch supported. Try it now.',
    h1: 'Free GIF to PNG Converter Online — Full Color Output',
    sub: 'Get full-color PNG from any GIF — break the 256-color limit, preserve transparency, no upload.',
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
        { type: 'h3', text: 'GIF vs PNG — quick comparison' },
        { type: 'table', headers: ['', 'GIF', 'PNG'], rows: [
          ['Color depth', '256 colors', '16.7 million colors'],
          ['Animation', 'Yes', 'No (first frame only)'],
          ['Transparency', 'Single-color only', 'Full alpha channel'],
          ['File size', 'Larger for most images', 'Usually smaller'],
          ['Quality', 'Banding on complex images', 'Crisp, full color'],
        ]},
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
      { question: 'How do I convert a GIF to a static PNG image?', answer: 'Drop the GIF onto the converter — the first frame is automatically exported as a full-color PNG. No additional settings or steps needed.' },
      { question: 'Will PNG be better quality than GIF?', answer: 'Yes, significantly. GIF is limited to 256 colors; PNG supports 16.7 million. Any GIF with complex colors, gradients, or photographic content will look noticeably better as PNG — no color banding or dithering artifacts.' },
      { question: 'I need to keep the GIF animation — can I export all frames as PNG?', answer: 'This converter exports only the first frame. For frame-by-frame extraction from animated GIFs, use a specialized tool like Ezgif.com\'s GIF frame extractor.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-jpg', 'gif-to-webp', 'jpg-to-png'],
  },

  'bmp-to-png': {
    from: 'bmp', to: 'png',
    title: 'Free BMP to PNG Converter Online | Abect',
    description: 'Convert BMP to PNG online — free, instant, lossless. Shrink 20 MB BMP files by 90% with zero quality loss. No uploads. Batch supported. Try it now.',
    h1: 'Free BMP to PNG Converter Online — Lossless, 70–95% Smaller',
    sub: 'Convert BMP to lossless PNG — 70–95% smaller files with zero quality loss. Batch, no upload.',
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
        { type: 'h3', text: 'BMP vs PNG — quick comparison' },
        { type: 'table', headers: ['', 'BMP', 'PNG'], rows: [
          ['Compression', 'None (raw pixels)', 'Lossless compression'],
          ['File size', '~6 MB for 1920×1080', '200–600 KB for same image'],
          ['Transparency', 'No', 'Full alpha channel'],
          ['Browser support', 'No', '100%'],
          ['Best for', 'Windows internal use', 'Web, design, editing'],
        ]},
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
      { question: 'How do I reduce a BMP screenshot file size?', answer: 'Convert to PNG — most screenshots become 70–90% smaller with zero quality loss. Drop the BMP onto the converter above and download the PNG output instantly.' },
      { question: 'Is BMP to PNG conversion lossless?', answer: 'Yes, completely. Both BMP and PNG are lossless formats — every pixel is preserved exactly. No detail is discarded, no compression artifacts are introduced. You get a pixel-perfect copy at a fraction of the file size.' },
      { question: 'Should I convert BMP to PNG or to JPG?', answer: 'PNG for screenshots, UI, and graphics with text or hard edges — lossless and perfectly sharp. JPG for photographs where even smaller file size is acceptable at the cost of some quality. PNG is the right choice for most BMP files since they are typically captures of UI or documents.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-jpg', 'bmp-to-webp', 'jpg-to-png'],
  },

  'avif-to-png': {
    from: 'avif', to: 'png',
    title: 'Free AVIF to PNG Converter Online | Abect',
    description: 'Convert AVIF to PNG online — free, lossless output, preserves transparency. Works in your browser, no uploads. Batch supported. Try it now.',
    h1: 'Free AVIF to PNG Converter Online — Open in Any Editor',
    sub: 'Convert AVIF to lossless PNG — open in Photoshop, Figma, or any editor that doesn\'t support AVIF.',
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
        { type: 'h3', text: 'AVIF vs PNG — quick comparison' },
        { type: 'table', headers: ['', 'AVIF', 'PNG'], rows: [
          ['Compression', '~50% smaller than PNG', 'Lossless (baseline)'],
          ['Transparency', 'Yes', 'Yes'],
          ['Browser support', '~90%', '100%'],
          ['App / tool support', 'Limited (newer format)', 'Universal'],
          ['Best for', 'Modern web delivery', 'Editing, design, compatibility'],
        ]},
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
      { question: 'How do I open AVIF files in Photoshop or Illustrator?', answer: 'Convert to PNG first using this tool. PNG is universally supported in all versions of Photoshop and Illustrator without plugins, updates, or extensions.' },
      { question: 'Does AVIF to PNG preserve transparency?', answer: 'Yes. Both formats support full alpha-channel transparency. Transparent areas in the AVIF are preserved exactly in the PNG output.' },
      { question: 'Why is AVIF not supported in my software?', answer: 'AVIF is a newer format (standardized in 2019). Support in design tools improved significantly after 2021, but older versions of Photoshop, Lightroom, and many CMS platforms still don\'t handle AVIF natively. PNG is the universal fallback that works everywhere.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-jpg', 'jpg-to-png', 'webp-to-png'],
  },

  'tiff-to-png': {
    from: 'tiff', to: 'png',
    title: 'Free TIFF to PNG Converter Online | Abect',
    description: 'Convert TIFF to PNG online — free, lossless, instant. Reduce huge TIFF files without any quality loss. No uploads, works in browser. Try it now.',
    h1: 'Free TIFF to PNG Converter Online — Web-Ready, Zero Quality Loss',
    sub: 'Convert TIFF to lossless PNG — dramatically smaller files, zero quality loss, no upload needed.',
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
        { type: 'h3', text: 'TIFF vs PNG — quick comparison' },
        { type: 'table', headers: ['', 'TIFF', 'PNG'], rows: [
          ['Compression', 'Lossless or none', 'Lossless'],
          ['File size', '50–200 MB typical', '2–10 MB for same content'],
          ['Browser support', 'None', '100%'],
          ['Multi-layer support', 'Yes (Photoshop)', 'No'],
          ['Best for', 'Print, professional editing', 'Web, distribution'],
        ]},
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
      { question: 'How do I make a TIFF file web-ready?', answer: 'Convert to PNG — browsers display PNG natively while TIFF is unsupported in Chrome, Firefox, and Edge. Drop the TIFF onto the converter above and download the PNG. For the smallest file size, convert to WebP instead.' },
      { question: 'Is TIFF to PNG lossless?', answer: 'Yes. Both TIFF and PNG are lossless formats. Converting TIFF to PNG preserves every pixel exactly — no detail is lost, no compression artifacts are introduced. You get an identical visual result at a much smaller file size.' },
      { question: 'How do I display TIFF images on a website?', answer: 'TIFF is not supported in Chrome, Firefox, or Edge. Convert to PNG or WebP first — both are native browser image formats that display in any browser without plugins or configuration.' },
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
    h1: 'Free PNG to WebP Converter Online — 26% Smaller, Keeps Transparency',
    sub: 'Optimize PNG for the web — 26% smaller WebP files that keep full transparency. Batch, no upload.',
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
        { type: 'h3', text: 'PNG vs WebP — quick comparison' },
        { type: 'table', headers: ['', 'PNG', 'WebP'], rows: [
          ['File size (lossless)', 'Baseline', '~26% smaller'],
          ['File size (lossy)', '—', '50–80% smaller than PNG'],
          ['Transparency', 'Yes', 'Yes'],
          ['Browser support', '100%', '97%+'],
          ['Animation', 'No', 'Yes'],
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
      { question: 'How do I use WebP images in HTML?', answer: 'Use the <picture> element: <picture><source type="image/webp" srcset="image.webp"><img src="image.png" alt="..."></picture>. This serves WebP to supporting browsers and falls back to PNG automatically for the 3% that don\'t.' },
      { question: 'Does PNG to WebP preserve transparency?', answer: 'Yes. WebP supports full alpha-channel transparency just like PNG. Transparent areas in the source PNG are preserved exactly in the WebP output.' },
      { question: 'How do I use WebP in Next.js or React?', answer: 'In Next.js, use the built-in <Image> component — it automatically serves WebP to supported browsers from any source PNG. In plain React, use the HTML <picture> element with a WebP <source> and PNG <img> fallback.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-webp', 'png-to-jpg', 'webp-to-png'],
  },

  'jpg-to-webp': {
    from: 'jpg', to: 'webp',
    title: 'Free JPG to WebP Converter — No Upload, No Ads | Abect',
    description: 'Convert JPG to WebP free — no upload, no ads. Files are 25–34% smaller than JPG at equivalent quality. Boosts Google PageSpeed score. Batch supported. Try now.',
    h1: 'Free JPG to WebP Converter Online — 25–34% Smaller Files',
    sub: 'Speed up your website with WebP — 25–34% smaller than JPG, same visual quality. Batch, no upload.',
    howTo: [
      'Drop your JPG files onto the converter above — or click to browse and select multiple files at once.',
      'Click Convert on a single file, or Convert all to process the entire batch in one go.',
      'Download each WebP individually, or click Download all to save everything as a single ZIP archive.',
      'Tip: JPG has no alpha channel — converting to WebP does not add transparency. If you need a WebP file with a transparent background, convert from PNG instead. For standard photos and product images, JPG to WebP conversion is direct and visually identical.',
    ],
    sections: [
      {
        heading: 'Your JPG files are converted locally — no upload, no wait',
        blocks: [
          { type: 'p', text: 'Unlike server-based converters where you upload files and wait for processing, this tool converts everything in your browser immediately. Drop your JPGs and conversion starts — no queuing, no bandwidth wasted uploading to a remote server.' },
          { type: 'p', text: 'This is especially useful when batch-converting large photo libraries for a website relaunch or product catalog update. Convert dozens of JPG files in seconds — no upload limits, no per-file restrictions, no account required.' },
          { type: 'code', label: 'JavaScript', code: `// Optimizing JPG to WebP in your browser — no server, no upload:
const reader = new FileReader();
reader.onload = (e) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // Re-encoded as WebP locally — your JPG never leaves this tab
    canvas.toBlob((blob) => { /* download */ }, 'image/webp', 0.82);
  };
  img.src = e.target.result;
};
reader.readAsDataURL(file);` },
        ],
      },
      {
        heading: 'Why convert JPG to WebP? — Web performance and Core Web Vitals',
        blocks: [
          { type: 'p', text: 'Google\'s Core Web Vitals measure how fast your images load. LCP (Largest Contentful Paint) — the time for the biggest visual element to appear — is directly influenced by image file size. WebP files are 25–34% smaller than JPG at the same visual quality, which means measurably faster LCP scores.' },
          { type: 'p', text: 'For a WordPress blog with 30 images per article, switching to WebP can reduce total page weight by 2–4 MB. For a Shopify store with hundreds of product photos, the bandwidth savings translate to lower CDN costs and significantly faster mobile load times.' },
          { type: 'p', text: '"Serve images in next-gen formats" is one of the most common warnings in Google PageSpeed Insights. Converting your JPG library to WebP directly resolves this warning and improves your PageSpeed score — often by 5–15 points on image-heavy pages.' },
        ],
      },
      {
        heading: 'JPG vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'JPG', 'WebP'], rows: [
            ['Compression', 'Lossy (JPEG algorithm)', 'Lossy + Lossless modes'],
            ['File size', 'Baseline', '25–34% smaller'],
            ['Transparency', 'No alpha channel', 'Full alpha channel'],
            ['Animation', 'No', 'Yes (animated WebP)'],
            ['Metadata', 'Full EXIF, IPTC, XMP', 'EXIF supported'],
            ['Browser support', '100%', '97%+ (all modern browsers)'],
            ['Best for', 'Universal compatibility', 'Modern web delivery'],
          ]},
        ],
      },
      {
        heading: 'When to use WebP and when to keep JPG',
        blocks: [
          { type: 'h3', text: 'Switch to WebP when:' },
          { type: 'ul', items: [
            '**Optimizing images for WordPress, Shopify, or Squarespace** — WebP cuts page weight by 25–34% and directly improves Google PageSpeed score',
            '**Deploying to a CDN (Cloudflare, AWS CloudFront, Fastly)** — smaller WebP files reduce bandwidth costs and time-to-first-byte',
            '**Building a Next.js, Nuxt, or Astro site** — these frameworks serve WebP natively via their image optimization pipelines',
            '**Targeting mobile users** — 25–34% smaller images load noticeably faster on 3G/4G connections',
            '**Fixing "Serve images in next-gen formats"** warning in Google PageSpeed Insights or Lighthouse',
          ]},
          { type: 'h3', text: 'Keep the JPG when:' },
          { type: 'ul', items: [
            '**Sending images by email** — most email clients do not render WebP; JPG remains the safe choice',
            '**Submitting to print services, stock photo platforms, or older CMS** — WebP support varies across these workflows',
            '**Sharing with clients who use older software** — Photoshop (pre-2020), Lightroom, and some Windows apps may not open WebP',
            '**You need a universal fallback** — always keep the original JPG as a backup alongside your WebP files',
          ]},
        ],
      },
      {
        heading: 'How JPG to WebP conversion works in your browser',
        blocks: [
          { type: 'p', text: 'This converter uses the HTML5 Canvas API to re-encode your JPG as WebP. The JPG is loaded into an HTMLImageElement, drawn onto an off-screen canvas, and exported via canvas.toBlob() with MIME type image/webp at quality 0.82.' },
          { type: 'p', text: 'WebP quality 0.82 is roughly equivalent to JPEG quality 92 in visual output — but the WebP encoder achieves 25–34% smaller file sizes due to its more efficient compression algorithm. The Blob is downloaded via URL.createObjectURL(). No data leaves the browser tab.' },
          { type: 'code', label: 'JavaScript', code: `// Simplified JPG to WebP conversion pipeline:
function convertJPGtoWebP(file, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      // Export as WebP — 25–34% smaller than JPG at equivalent quality
      canvas.toBlob(resolve, 'image/webp', quality);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert JPG to WebP online for free?', answer: 'Drop your JPG files onto the converter above, click "Convert all", then "Download all". Each file is converted to WebP in your browser — no upload, no signup, no software needed. The entire process takes seconds.' },
      { question: 'How much smaller will WebP be compared to JPG?', answer: 'On average 25–34% smaller at equivalent visual quality. A 500 KB JPG typically becomes a 330–375 KB WebP. For a product catalog of 500 images, that\'s a significant cumulative saving in bandwidth and storage costs.' },
      { question: 'Will my website visitors be able to see WebP images?', answer: 'Yes. WebP is supported in Chrome, Firefox, Safari 14+, and Edge — over 97% of browsers worldwide. For the remaining percentage, use the HTML <picture> element with a JPG fallback: <picture><source type="image/webp" srcset="image.webp"><img src="image.jpg" alt="..."></picture>.' },
      { question: 'Will WebP improve my Google PageSpeed score?', answer: 'Yes. WebP\'s smaller file sizes directly improve LCP (Largest Contentful Paint) — a Core Web Vitals metric Google uses as a ranking signal. Converting JPG to WebP also resolves the "Serve images in next-gen formats" warning in PageSpeed Insights and Lighthouse.' },
      { question: 'How do I use WebP images in WordPress?', answer: 'Upload the WebP files directly via Media Library — WordPress 5.8+ supports WebP natively. For automatic JPG-to-WebP conversion on upload, use a plugin like ShortPixel, Imagify, or Smush. You can also enable Cloudflare Polish to serve WebP at the CDN level.' },
      { question: 'How do I use WebP in React or Next.js?', answer: 'In Next.js, use the built-in <Image> component — it automatically serves WebP to supported browsers. In plain React or HTML, use the <picture> element: <picture><source type="image/webp" srcset="photo.webp"><img src="photo.jpg" alt="..."></picture>.' },
      { question: 'Do I need to keep the original JPG after converting to WebP?', answer: 'Yes — keep the JPG as a fallback for email clients, print services, and any workflows that require JPG. Use WebP for web delivery and keep the JPG as a backup alongside it.' },
      { question: 'Does this converter work offline?', answer: 'Yes. Once the page has loaded, conversion works without an internet connection. All processing uses your browser\'s Canvas API — there is no server involved at any step.' },
      { question: 'Does this JPG to WebP converter work on iPhone and Android?', answer: 'Yes. The converter works on Safari (iPhone/iPad), Chrome and Firefox (Android), and any modern mobile browser. Select JPG files from your Photos or Files app, convert, and download the WebP files directly to your device.' },
      { question: 'What quality setting does this JPG to WebP converter use?', answer: 'This converter outputs WebP at quality 0.82, which is visually equivalent to JPEG at quality 90–92. At this setting the WebP file is 25–34% smaller than the JPG while appearing identical at normal viewing sizes. Most professional WebP workflows target a quality range of 0.80–0.85.' },
      { question: 'Does WebP support transparency that JPG does not?', answer: 'Yes. WebP supports full alpha-channel transparency, while JPG has no transparency support. Converting JPG to WebP does not add transparency — the JPG source has no alpha data to carry over. If you need a transparent WebP, convert from PNG to WebP instead.' },
      { question: 'Is JPG to WebP conversion reversible?', answer: 'Not losslessly. The WebP was encoded from a JPEG, which already discarded some image data during JPEG compression. Converting the WebP back to JPG reapplies JPEG compression on top of that — always keep the original JPG as a master backup before deleting it.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-webp', 'jpg-to-png', 'webp-to-jpg'],
  },

  'jpeg-to-webp': {
    from: 'jpeg', to: 'webp',
    title: 'Free JPEG to WebP Converter Online | Abect',
    description: 'Convert JPEG to WebP online — free, instant. 25–34% smaller files, same quality. No uploads, no signup. Batch supported. Try it now.',
    h1: 'Free JPEG to WebP Converter Online — Better Compression, Same Quality',
    sub: 'Convert JPEG to WebP for faster page loads — 25–34% smaller files, no quality trade-off. No upload.',
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
        { type: 'h3', text: 'JPEG vs WebP — quick comparison' },
        { type: 'table', headers: ['', 'JPEG', 'WebP'], rows: [
          ['File size', 'Baseline', '25–34% smaller'],
          ['Transparency', 'No', 'Yes (alpha channel)'],
          ['Animation', 'No', 'Yes'],
          ['Browser support', '100%', '97%+'],
          ['Best for', 'Universal compatibility', 'Modern web delivery'],
        ]},
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
      { question: 'Is JPEG and JPG the same format?', answer: 'Yes — different names, identical format. JPEG is the full standard name; JPG is the 3-character Windows extension. Most systems accept both .jpg and .jpeg file extensions interchangeably.' },
      { question: 'How do I serve WebP on my website with a JPEG fallback?', answer: 'Use the <picture> element: <picture><source type="image/webp" srcset="image.webp"><img src="image.jpg" alt="..."></picture>. Browsers that support WebP load the WebP version; others automatically get the JPEG fallback.' },
      { question: 'Is it worth converting JPEG to WebP for a small website?', answer: 'Yes — even for a 5-page website with 20 images, switching from JPEG to WebP saves 25–34% of total image weight, which directly improves page load speed and Core Web Vitals scores. The conversion takes seconds and has no visual downside.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-webp', 'jpeg-to-png', 'png-to-webp'],
  },

  'gif-to-webp': {
    from: 'gif', to: 'webp',
    title: 'Free GIF to WebP Converter Online | Abect',
    description: 'Convert GIF to WebP online — free, instant, in your browser. Full color, smaller files. No uploads, no signup. Batch supported. Try it now.',
    h1: 'Free GIF to WebP Converter Online — 50–80% Smaller, Full Color',
    sub: 'Convert GIF to WebP — 50–80% smaller animated files with full color. No upload, no signup.',
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
        { type: 'h3', text: 'GIF vs WebP — quick comparison' },
        { type: 'table', headers: ['', 'GIF', 'WebP'], rows: [
          ['Color depth', '256 colors', '16.7 million colors'],
          ['File size', 'Baseline', '50–80% smaller'],
          ['Transparency', 'Single-color', 'Full alpha channel'],
          ['Animation', 'Yes', 'Yes (not in this converter)'],
          ['Browser support', '100%', '97%+'],
        ]},
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
      { question: 'Why is WebP better than GIF for static images?', answer: 'WebP supports 16.7 million colors vs GIF\'s 256 — eliminating color banding and dithering artifacts. WebP files are 50–80% smaller for most content. For any static image, WebP is strictly superior to GIF on both quality and file size.' },
      { question: 'How do I convert animated GIF to animated WebP?', answer: 'This converter handles the first frame only (static WebP). For animated WebP conversion, use FFmpeg: `ffmpeg -i animation.gif animation.webp`, or use an online tool like Ezgif.com\'s animated WebP converter.' },
      { question: 'Do modern browsers support WebP?', answer: 'Yes. Chrome, Firefox, Safari 14+, and Edge all support WebP — covering over 97% of global browser traffic. WebP is safe to use as the primary image format for all modern web projects.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-jpg', 'gif-to-png', 'png-to-webp'],
  },

  'bmp-to-webp': {
    from: 'bmp', to: 'webp',
    title: 'Free BMP to WebP Converter Online | Abect',
    description: 'Convert BMP to WebP online — free, instant, no uploads. Reduce 20 MB BMP files by 98%. Batch supported. Try it now.',
    h1: 'Free BMP to WebP Converter Online — 95–99% Size Reduction',
    sub: 'Turn raw BMP files into lightweight WebP — 95–99% size reduction, processed entirely in your browser.',
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
        { type: 'h3', text: 'BMP vs WebP — quick comparison' },
        { type: 'table', headers: ['', 'BMP', 'WebP'], rows: [
          ['Compression', 'None (raw pixels)', 'Highly efficient (lossy)'],
          ['File size', '~6 MB for 1920×1080', '100–400 KB for same image'],
          ['Transparency', 'No', 'Yes'],
          ['Browser support', 'No', '97%+'],
          ['Best for', 'Windows internal use', 'Web delivery'],
        ]},
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
      { question: 'How do I convert BMP to WebP for a website?', answer: 'Drop your BMP files onto the converter, click "Convert all", download the WebP files, and use them directly in HTML. WebP is supported in all modern browsers.' },
      { question: 'Can I convert BMP to WebP in bulk?', answer: 'Yes. Drop multiple BMP files at once, click "Convert all", then "Download all" to get all WebP files in a single ZIP archive.' },
      { question: 'Why is BMP such a large format?', answer: 'BMP stores raw uncompressed pixel data — no compression algorithm is applied. A 1920×1080 BMP at 24-bit color is ~6 MB. WebP applies advanced compression to reduce this by 95–99% while maintaining excellent visual quality.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-jpg', 'bmp-to-png', 'png-to-webp'],
  },

  'avif-to-webp': {
    from: 'avif', to: 'webp',
    title: 'Free AVIF to WebP Converter Online | Abect',
    description: 'Convert AVIF to WebP online — free, instant, in your browser. Better compatibility than AVIF, still smaller than JPG. No uploads. Try it now.',
    h1: 'Free AVIF to WebP Converter Online — Broader Compatibility',
    sub: 'Convert AVIF to widely-supported WebP — better browser compatibility, still 25–34% smaller than JPG.',
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
        { type: 'h3', text: 'AVIF vs WebP — quick comparison' },
        { type: 'table', headers: ['', 'AVIF', 'WebP'], rows: [
          ['Compression', 'Best (~20–50% better than WebP)', 'Excellent (25–34% vs JPG)'],
          ['Browser support', '~90%', '97%+'],
          ['App / tool support', 'Emerging', 'Widely supported'],
          ['Transparency', 'Yes', 'Yes'],
          ['Best for', 'Cutting-edge web delivery', 'Broad compatibility'],
        ]},
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
      { question: 'Is WebP or AVIF better for web images?', answer: 'AVIF has better compression (typically 20–50% smaller than WebP), but WebP has broader support (97% vs ~90% browser support). For most sites: WebP is the practical choice. For performance-critical pages targeting modern browsers: AVIF.' },
      { question: 'Which CDNs and image services support AVIF and WebP?', answer: 'Cloudflare, Cloudinary, Imgix, and Fastly all support both AVIF and WebP with automatic format negotiation. AWS CloudFront supports WebP natively; AVIF support varies by configuration. Most major CDNs now handle both formats.' },
      { question: 'Does AVIF to WebP preserve transparency?', answer: 'Yes. Both AVIF and WebP support full alpha-channel transparency. Transparent areas in the AVIF are preserved exactly in the WebP output.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-jpg', 'avif-to-png', 'png-to-webp'],
  },

  'tiff-to-webp': {
    from: 'tiff', to: 'webp',
    title: 'Free TIFF to WebP Converter Online | Abect',
    description: 'Convert TIFF to WebP online — free, instant, no uploads. Make large TIFF files web-ready. 96%+ smaller than source. Batch supported. Try it now.',
    h1: 'Free TIFF to WebP Converter Online — 96%+ Smaller for Web Delivery',
    sub: 'Convert print-quality TIFF to web-ready WebP — 96%+ smaller, processed locally, no upload needed.',
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
        { type: 'h3', text: 'TIFF vs WebP — quick comparison' },
        { type: 'table', headers: ['', 'TIFF', 'WebP'], rows: [
          ['Compression', 'Lossless or none', 'Lossy (quality 92)'],
          ['File size', '50–200 MB typical', '500 KB–2 MB for same content'],
          ['Browser support', 'None', '97%+'],
          ['Best for', 'Print, professional editing', 'Web delivery'],
          ['Keep for', 'Master files, re-editing', 'Distribution only'],
        ]},
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
      { question: 'How do I make TIFF files web-ready?', answer: 'Convert to WebP — the smallest modern format for web delivery. A 50 MB TIFF typically becomes 500 KB–2 MB WebP. Drop the file onto the converter and download the result. Browsers display WebP natively while they cannot display TIFF at all.' },
      { question: 'Should I use WebP or JPG when converting TIFF for web use?', answer: 'WebP is 25–34% smaller than JPG at equivalent quality and is now supported by 97%+ of browsers. Use WebP for modern web delivery; fall back to JPG for services or applications that don\'t support WebP yet.' },
      { question: 'Is there quality loss when converting TIFF to WebP?', answer: 'At quality 92 (the default), the visual difference between TIFF and WebP is minimal at normal screen viewing sizes. For completely lossless output with zero quality compromise, convert to PNG instead. For web delivery, WebP quality 92 is the optimal balance.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['tiff-to-jpg', 'tiff-to-png', 'png-to-webp'],
  },
}

// All 20 slugs — used in App.jsx routing and the "All image converters" section
export const ALL_SLUGS = Object.keys(CONVERSIONS)

export const FORMAT_CARD_DESC = {
  jpg:  'Smaller files, maximum compatibility',
  jpeg: 'Smaller files, maximum compatibility',
  png:  'Lossless quality, full transparency support',
  webp: '25–34% smaller than JPG — faster pages',
  gif:  'Animated output, first frame extracted',
  avif: 'Next-gen format, 40–50% smaller than JPG',
  bmp:  'Uncompressed bitmap, no quality loss',
  tiff: 'High-quality format for print and archives',
}
