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
    title: 'WebP Won\'t Open? Convert to JPG Free — No Upload | Abect',
    description: 'WebP files won\'t open in Photoshop, Lightroom, Outlook, or print shops. Convert to JPG instantly — universal compatibility, processed in your browser. Try now.',
    h1: 'WebP to JPG Converter — Opens Everywhere, No Upload',
    sub: 'Fix WebP compatibility in seconds — convert to JPG that opens in every app, email client, print shop, and CMS.',
    howTo: [
      'Drop your WebP files onto the converter above — or click to browse your device.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download each JPG individually or click Download all to receive a ZIP archive.',
      'Note: transparent areas in WebP files are filled with white in the JPG output — JPG has no alpha channel.',
    ],
    sections: [
      {
        heading: 'Your files stay on your device — no upload, no exposure',
        blocks: [
          { type: 'p', text: 'Every WebP file is decoded and re-encoded as JPG entirely inside your browser. No file ever travels to a server — your device does all the work, invisible to any third party.' },
          { type: 'p', text: 'A folder of 50 WebP product images typically converts in under 10 seconds on any modern device — no upload wait, no queue. Speed depends only on your CPU, not your network connection.' },
          { type: 'code', label: 'WebP → JPG via Canvas API', code: `// White fill required — JPG has no transparency support\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\nconst ctx = canvas.getContext('2d')\nctx.fillStyle = '#ffffff'\nctx.fillRect(0, 0, canvas.width, canvas.height)\nctx.drawImage(img, 0, 0)\ncanvas.toBlob(cb, 'image/jpeg', 0.92)` },
        ],
      },
      {
        heading: 'Who needs to convert WebP to JPG',
        blocks: [
          { type: 'p', text: 'Designers who download WebP assets from Figma exports or web scraping and need to open them in older Photoshop or Lightroom. Versions before Adobe CC 2015 don\'t recognize WebP natively — a batch conversion unlocks the files immediately.' },
          { type: 'p', text: 'E-commerce sellers uploading product photos to Amazon, eBay, or Etsy. These platforms still reject WebP in certain upload fields — converting to JPG gets images accepted without going through support.' },
          { type: 'p', text: 'Office workflows: embedding images in Word, PowerPoint, or printed PDFs. Microsoft Office before 2019 doesn\'t handle WebP — JPG embeds cleanly in every Office version and renders correctly in exported PDFs.' },
        ],
      },
      {
        heading: 'WebP vs JPG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'WebP', 'JPG'], rows: [
            ['Compression', '25–34% smaller than JPG', 'Universal baseline'],
            ['Transparency', 'Full alpha channel', 'None — white fill applied'],
            ['Animation', 'Yes', 'No'],
            ['File size after conversion', 'Source is smaller', 'Output is larger'],
            ['Metadata', 'EXIF, XMP, ICC', 'EXIF, XMP, ICC'],
            ['Browser support', '97%+', '100%'],
            ['Best for', 'Web delivery', 'Universal compatibility'],
          ]},
        ],
      },
      {
        heading: 'When to convert to JPG vs keep WebP',
        blocks: [
          { type: 'h3', text: 'Convert to JPG when:' },
          { type: 'ul', items: [
            '**Photoshop / Lightroom pre-2015** — older Adobe versions don\'t open WebP natively',
            '**Outlook and email clients** — WebP is not supported in most email rendering engines',
            '**Print shops and kiosks** — professional print services typically require JPG or TIFF',
            '**Amazon / eBay / Etsy** — marketplace upload fields often reject WebP',
            '**Word and PowerPoint** — Office 2016 and earlier cannot embed WebP images',
            '**Stock photo platforms** — Shutterstock, Getty, and similar sites require JPG submissions',
          ]},
          { type: 'h3', text: 'Keep WebP when:' },
          { type: 'ul', items: [
            '**Modern web pages** — WebP is 25–34% smaller; keep it where browsers support it',
            '**Next.js / Nuxt image components** — these serve WebP automatically and fall back to JPG',
            '**Shopify / WordPress storefronts** — modern CMS platforms handle WebP natively',
            '**Performance-critical landing pages** — every kilobyte saved improves Core Web Vitals',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser loads the WebP into a hidden HTMLImageElement. On the load event, the image is painted onto an HTML5 Canvas — transparent areas are filled with white since JPG has no alpha channel. The canvas exports the result as JPG via toBlob().' },
          { type: 'p', text: 'The default quality of 0.92 preserves fine detail and produces output visually indistinguishable from the original WebP at normal viewing sizes. The JPG will be larger than the WebP source — this is unavoidable, as JPG compresses less efficiently.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    const ctx = canvas.getContext('2d')\n    ctx.fillStyle = '#ffffff'  // white bg for transparency\n    ctx.fillRect(0, 0, img.width, img.height)\n    ctx.drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/jpeg', 0.92)\n  }\n  img.src = URL.createObjectURL(webpFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert WebP to JPG online?', answer: 'Drop your WebP files onto the converter, click "Convert all", then download. Everything runs in your browser — no upload, no signup, no file size limit from a server.' },
      { question: 'Why can\'t I open WebP files on my computer?', answer: 'Older applications don\'t support WebP. Windows Photo Viewer (pre-Windows 10), Photoshop before CC 2015, and many other apps require JPG or PNG. Converting WebP to JPG solves this immediately — JPG opens in every application ever made.' },
      { question: 'Will the JPG be larger than the original WebP?', answer: 'Yes. WebP is 25–34% more efficient than JPG. Converting WebP to JPG always produces a larger file. Only convert when compatibility requires it — keep WebP on the web where it is fully supported.' },
      { question: 'What happens to WebP transparency when converting to JPG?', answer: 'Transparent areas in WebP files are filled with white in the JPG output — JPG has no alpha channel support. If you need to preserve transparency, convert WebP to PNG instead.' },
      { question: 'Can I convert WebP to JPG without losing quality?', answer: 'At quality 0.92, the visual difference is undetectable at normal viewing sizes. However, any lossy re-encoding introduces a small quality loss. For pixel-perfect lossless output, use a command-line tool like cwebp or ImageMagick.' },
      { question: 'How do I open WebP files in Photoshop?', answer: 'Photoshop CC 2015 and later natively supports WebP. For older versions, convert the WebP to JPG using this tool — it\'s faster than installing a plugin. The resulting JPG opens in every version of Photoshop.' },
      { question: 'Can I convert WebP to JPG on iPhone or Android?', answer: 'Yes. The converter runs in any mobile browser — Safari on iPhone and Chrome on Android both support the Canvas API and JPG encoding. Tap "click to browse" to select files from your camera roll, then download the JPG directly.' },
      { question: 'Why do print shops reject WebP files?', answer: 'Professional print services use RIP software and prepress workflows built around JPG and TIFF. WebP is a web format — it was designed for screen delivery, not print. Converting to JPG gets files accepted by any print shop or photo kiosk.' },
      { question: 'Does WebP to JPG work offline?', answer: 'Yes. Once the page has loaded in your browser, the conversion runs entirely on your device. You can disconnect from the internet and it will continue to work — all processing is done by the Canvas API locally.' },
      { question: 'Can I embed the JPG in Word or PowerPoint?', answer: 'Yes. JPG is natively supported by every version of Microsoft Office. The converted JPG inserts via Insert → Pictures in Word, PowerPoint, or Excel and displays correctly in both screen and print layouts.' },
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
    title: '20 MB BMP to Under 500 KB JPG — Free Converter | Abect',
    description: 'BMP stores every pixel raw — a 1920×1080 screenshot is 6 MB, a photo can hit 50 MB. Convert to JPG and shrink it by 95% with no visible quality loss. Try now.',
    h1: 'BMP to JPG Converter — From 20 MB to Under 500 KB',
    sub: 'Shrink massive BMP files to shareable JPG — 90–98% size reduction, no upload, runs entirely in your browser.',
    howTo: [
      'Drop your BMP files onto the converter above — or click to browse and select multiple files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: BMP has no transparency — no quality difference to worry about. The JPG output is direct and visually identical at quality 0.92.',
    ],
    sections: [
      {
        heading: 'No upload — huge BMP files converted instantly in your browser',
        blocks: [
          { type: 'p', text: 'BMP files can be 6–100 MB each — the kind of size that makes server-based converters timeout or reject uploads entirely. This converter runs in your browser — no upload, no queue, no file size cap imposed by a server.' },
          { type: 'p', text: 'Processing is done by the Canvas API on your own CPU. Even a 50 MB BMP converts in seconds. Once the page loads, the tool works offline — useful for screenshots from internal systems or confidential documents.' },
          { type: 'code', label: 'BMP → JPG via Canvas API', code: `// BMP has no transparency — no white fill needed\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// 90–98% smaller than BMP at quality 0.92\ncanvas.toBlob(cb, 'image/jpeg', 0.92)` },
        ],
      },
      {
        heading: 'Who converts BMP to JPG',
        blocks: [
          { type: 'p', text: 'Windows users taking screenshots with Snipping Tool or Paint who end up with oversized BMP files. Paint saves as BMP by default — a single screenshot can be 3–6 MB. Converting to JPG makes them instantly shareable via email or messaging apps.' },
          { type: 'p', text: 'IT administrators capturing system states, error dialogs, or configuration screens. BMP screenshots from remote desktop sessions (RDP) are often the default output — converting to JPG compresses them for helpdesk tickets and documentation.' },
          { type: 'p', text: 'Architects and CAD users exporting floor plans from older design software that outputs BMP. Converting to JPG makes the files small enough to attach to client proposals and project documentation without hitting email size limits.' },
        ],
      },
      {
        heading: 'BMP vs JPG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'BMP', 'JPG'], rows: [
            ['Compression', 'None — raw pixels', 'Lossy — quality 0.92 default'],
            ['File size (1920×1080)', '~6 MB', '300–800 KB'],
            ['File size (4K photo)', '~25 MB', '1–3 MB'],
            ['Transparency', 'No', 'No'],
            ['Web browser support', 'No', '100%'],
            ['Email / sharing', 'Too large — rejected', 'Universal'],
            ['Best for', 'Windows internal use', 'Web, email, sharing'],
          ]},
        ],
      },
      {
        heading: 'When to convert to JPG vs PNG',
        blocks: [
          { type: 'h3', text: 'Convert BMP to JPG when:' },
          { type: 'ul', items: [
            '**Email attachments** — JPG compresses a 20 MB BMP to under 1 MB, accepted by every mail service',
            '**Web upload** — browsers don\'t display BMP; JPG is the universal web image format',
            '**Social media** — Twitter, Facebook, Instagram all require JPG or PNG, not BMP',
            '**Client deliverables** — send photographic screenshots as JPG; they open on every device',
            '**Photographic BMP content** — photos and complex images compress well as JPG with no visible loss',
          ]},
          { type: 'h3', text: 'Convert BMP to PNG instead when:' },
          { type: 'ul', items: [
            '**Screenshots with text or UI** — PNG is lossless; JPG blurs sharp text and UI edges',
            '**Diagrams and charts** — flat-color areas and sharp lines look better in PNG',
            '**Lossless quality required** — PNG preserves every pixel exactly; JPG introduces minimal artifacts',
            '**Design workflow** — PNG is the correct format for design tools like Photoshop or Figma',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser draws the BMP file onto an HTML5 Canvas via the Canvas API. BMP has no transparency, so no white fill is needed — pixel values are captured exactly. The Canvas re-encodes the data as JPG via toBlob() at quality 0.92.' },
          { type: 'p', text: 'Quality 0.92 achieves 90–98% size reduction compared to BMP. The exact ratio depends on image content — photos with fine detail achieve ~95% reduction; flat-color screenshots or diagrams can reach 97–99%.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    // BMP: ~6 MB → JPG: ~400 KB at 0.92 quality\n    canvas.toBlob(resolve, 'image/jpeg', 0.92)\n  }\n  img.src = URL.createObjectURL(bmpFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert BMP to JPG online for free?', answer: 'Drop your BMP files onto the converter, click "Convert all", then download. Conversion happens in your browser — no software, no upload, no file size cap. Large BMP files are handled locally without any server timeout.' },
      { question: 'How much smaller will the JPG be compared to BMP?', answer: 'Typically 90–98% smaller. A 20 MB BMP photo becomes 200–600 KB as JPG at quality 0.92. A 6 MB 1920×1080 screenshot typically compresses to 300–800 KB. The exact ratio depends on image complexity.' },
      { question: 'Is there any quality loss when converting BMP to JPG?', answer: 'At quality 0.92 (the default), the difference is nearly imperceptible for photographs. You\'d need to zoom in significantly to see any compression artifacts. For screenshots with text or sharp UI elements, convert to PNG instead — it\'s lossless.' },
      { question: 'Why are BMP files so large?', answer: 'BMP stores every pixel as raw data with no compression. A 1920×1080 image at 24-bit color is approximately 6 MB of raw pixel data. JPEG compresses the same image to 300–800 KB using a perceptual compression algorithm that discards imperceptible detail.' },
      { question: 'Can I send a BMP file by email?', answer: 'Most email clients reject attachments over 10–25 MB, and a typical BMP easily exceeds this. Converting to JPG first shrinks a 20 MB BMP to under 1 MB — accepted by every email service and viewable on every device without special software.' },
      { question: 'Should I convert BMP to JPG or PNG?', answer: 'Use JPG for photographs — it achieves the smallest file sizes. Use PNG for screenshots, UI captures, and images with text — PNG is lossless and keeps sharp edges perfectly. BMP to JPG is the right choice when the content is photographic and file size is the priority.' },
      { question: 'Why does Windows Paint save files as BMP?', answer: 'BMP is the native Windows bitmap format, dating back to early Windows. Paint uses it as its default because it requires no compression algorithm — images are saved instantly at the cost of a very large file. You can also save as PNG or JPEG directly from Paint\'s Save As dialog.' },
      { question: 'Can I convert BMP to JPG on Windows without installing software?', answer: 'Yes — use this browser-based converter in Chrome, Firefox, or Edge. Drop the BMP file, click Convert, download the JPG. Alternatively, Windows 10/11 Paint allows you to open a BMP and Save As JPEG directly.' },
      { question: 'Does BMP have transparency?', answer: 'Standard 24-bit BMP has no transparency. Some 32-bit BMP files can contain an alpha channel, but it is rarely used. When converting BMP to JPG, no white fill is applied — JPG also has no alpha channel, so the conversion is direct.' },
      { question: 'Can I convert multiple BMP files at once?', answer: 'Yes. Drop all BMP files onto the converter, click "Convert all", then "Download all" to get a ZIP archive with all converted JPGs. Batch conversion is fully supported with no per-file cap.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-png', 'bmp-to-webp', 'png-to-jpg'],
  },

  'avif-to-jpg': {
    from: 'avif', to: 'jpg',
    title: 'AVIF to JPG — Open in Any App, No Software Update | Abect',
    description: 'AVIF won\'t open in older Photoshop, Lightroom, or email clients. Convert to JPG instantly — 100% browser-based, no upload, universal compatibility. Try now.',
    h1: 'AVIF to JPG Converter — Universal App Compatibility',
    sub: 'Convert AVIF to JPG when your photo editor, email client, or upload form won\'t accept it. No upload needed.',
    howTo: [
      'Drop AVIF files onto the converter above — or click to browse your files.',
      'Click Convert to process a single file, or Convert all for batch AVIF to JPG conversion.',
      'Download your JPG files individually, or click Download all to save everything as a ZIP.',
      'Note: AVIF supports transparency — transparent areas convert to white in the JPG output. Use AVIF to PNG to preserve transparency.',
    ],
    sections: [
      {
        heading: 'AVIF files converted locally — nothing leaves your browser',
        blocks: [
          { type: 'p', text: 'AVIF is a compressed, next-gen format delivered by modern websites and CDNs. When you download an AVIF and try to open it locally, you hit the compatibility wall: older Photoshop, Lightroom Classic, most email clients, and upload forms simply reject it.' },
          { type: 'p', text: 'This converter runs entirely in your browser. The AVIF decodes on your own CPU — no data is transmitted, no account needed, no file size limits set by a remote server. Works offline once the page has loaded.' },
          { type: 'code', label: 'AVIF decoded locally — never uploaded', code: `// AVIF decoded by the browser's built-in decoder\nconst img = new Image()\nimg.src = URL.createObjectURL(avifFile)\n// Canvas re-encodes to JPG at quality 0.92\ncanvas.toBlob(cb, 'image/jpeg', 0.92)` },
        ],
      },
      {
        heading: 'When you actually need to convert AVIF to JPG',
        blocks: [
          { type: 'p', text: 'You downloaded an image from a modern website — a stock photo, product image, or shared photo — and it arrived as AVIF. Chrome displayed it fine, but now Photoshop CS6 returns "Could not complete the Open command. The file format module could not parse the file."' },
          { type: 'p', text: 'Lightroom Classic users encounter this with AVIF imports from phone backups or cloud sync. Lightroom added AVIF support only in 2023; installs running Lightroom 9 or earlier still error. A JPG exported here drops straight into any catalog without touching Lightroom settings.' },
          { type: 'p', text: 'Stock agencies (Getty, Shutterstock, iStock), print labs, Etsy product listings, eBay item photos, and most CMS media libraries accept JPG — not AVIF. Converting before uploading bypasses every compatibility gate without touching the original file.' },
        ],
      },
      {
        heading: 'AVIF vs JPG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'AVIF', 'JPG'], rows: [
            ['Compression type', 'Lossy or lossless', 'Lossy only'],
            ['File size', '~50% smaller than JPG', 'Baseline (larger)'],
            ['Browser support', '~90% (Chrome, Firefox, Safari 16+)', '100%'],
            ['Desktop app support', 'Photoshop 2021+, Lightroom 2023+', 'Universal — every app'],
            ['Transparency (alpha)', 'Yes', 'No (white fill)'],
            ['Re-save degradation', 'Lossless mode: none; Lossy: yes', 'Yes — each save degrades'],
            ['Metadata (EXIF)', 'Supported', 'Widely supported'],
          ]},
        ],
      },
      {
        heading: 'When to use JPG vs AVIF',
        blocks: [
          { type: 'h3', text: 'Use JPG when:' },
          { type: 'ul', items: [
            'Opening in **Photoshop CS6 or older** (or Lightroom Classic pre-2023)',
            'Sending by **email** — Gmail, Outlook, and most clients inline-preview JPG, not AVIF',
            'Uploading to **stock agencies, print labs, Etsy, eBay**, or any form showing "unsupported format"',
            'Sharing a file that must open on **any device without software updates**',
            'Sending to **print** — virtually all print services require JPG or TIFF',
          ]},
          { type: 'h3', text: 'Keep AVIF when:' },
          { type: 'ul', items: [
            'Delivering images via **modern CDN** (Cloudflare, Cloudinary) with auto-format negotiation',
            'Building a **Next.js / Nuxt / Astro site** using Image components with format selection',
            'File size matters — **AVIF is 50% smaller than JPG** at the same perceptual quality',
            'Your audience uses **Chrome, Firefox, or Safari 16+** — ~90% of current browser traffic',
          ]},
        ],
      },
      {
        heading: 'How AVIF to JPG conversion works in your browser',
        blocks: [
          { type: 'p', text: 'Modern browsers have built-in AVIF decoders — the same pipeline used to display AVIF on web pages. When you drop an AVIF file, the browser decodes it to a raw pixel buffer via an HTMLImageElement drawn onto an HTML5 Canvas.' },
          { type: 'p', text: 'The Canvas API re-encodes the pixel data as JPG at quality 0.92 using toBlob(). The result is a Blob URL — a temporary in-memory file that never touches a server. AVIF transparency is composited onto a white background, since JPG has no alpha channel.' },
          { type: 'code', label: 'Full AVIF → JPG pipeline', code: `const canvas = document.createElement('canvas')\nconst ctx = canvas.getContext('2d')\n// White fill replaces AVIF alpha channel\nctx.fillStyle = '#ffffff'\nctx.fillRect(0, 0, canvas.width, canvas.height)\nctx.drawImage(img, 0, 0)\ncanvas.toBlob(cb, 'image/jpeg', 0.92)` },
        ],
      },
    ],
    faq: [
      { question: 'Why won\'t my AVIF file open in Photoshop?', answer: 'Photoshop added AVIF support in version 23.2 (2021). Older installs — including CS3 through CS6, and any CC version before 2021 — don\'t recognise the format. Converting to JPG gives you a file that opens in every version of Photoshop without plugins or updates.' },
      { question: 'Why is the JPG larger than the original AVIF?', answer: 'AVIF achieves roughly 50% better compression than JPEG at the same visual quality. Converting always produces a larger file. Keep AVIF for web delivery; convert to JPG only when you need to open it in software that doesn\'t support AVIF.' },
      { question: 'Does AVIF support transparency?', answer: 'Yes. AVIF has full alpha-channel support. When converting to JPG (which has no transparency), transparent pixels are filled with white. To preserve transparency, convert AVIF to PNG or WebP instead.' },
      { question: 'Why do websites serve AVIF if desktop apps don\'t support it?', answer: 'Web servers detect your browser\'s Accept header and serve AVIF only to browsers that support it. Your browser handles AVIF seamlessly — but once you save the file locally and open it in a non-browser app, you hit the compatibility wall. Converting to JPG is the fix.' },
      { question: 'Which apps support AVIF natively?', answer: 'Chrome 85+, Firefox 93+, Safari 16+, and Edge 121+ support AVIF. Photoshop 23.2+ (2021) and Lightroom Classic 13+ (2023) support it in desktop apps. Older versions of these apps, Affinity Photo pre-2.0, and most CMS media libraries still require JPG or PNG.' },
      { question: 'Is AVIF to JPG conversion lossless?', answer: 'No. The conversion decodes AVIF to raw pixels and re-encodes as JPG at quality 0.92 — high quality but not bit-for-bit identical. If you need pixel-perfect preservation, convert AVIF to PNG (lossless) instead.' },
      { question: 'Is AVIF better than WebP?', answer: 'AVIF achieves 20–50% better compression than WebP at the same quality, making it the most efficient common format. However, WebP has broader compatibility — 97% browser support vs ~90% for AVIF, and wider support in design tools. For maximum compression: AVIF. For broadest compatibility: WebP.' },
      { question: 'Can I convert AVIF to JPG on iPhone or Android?', answer: 'Yes. This converter works in any modern mobile browser — Safari on iPhone, Chrome on Android. No app install required. Tap the file picker, select your AVIF files, convert, and download.' },
      { question: 'What quality does the JPG output use?', answer: 'The converter uses quality 0.92 (92%), producing high-quality output visually indistinguishable from the original for most images. File size will be larger than the AVIF source but smaller than an uncompressed TIFF or PNG.' },
      { question: 'Does the converter work without an internet connection?', answer: 'Yes. Once the page has loaded, the converter runs entirely in your browser. Disconnect from the internet and it continues converting files. Your AVIF images are never transmitted anywhere.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-png', 'png-to-jpg', 'webp-to-jpg'],
  },

  'tiff-to-jpg': {
    from: 'tiff', to: 'jpg',
    title: 'TIFF Master to JPG — Client-Ready in Seconds, Free | Abect',
    description: 'TIFF master files can be 50–200 MB — too large to email or upload to galleries. Convert to JPG for client delivery in seconds. No upload needed. Try now.',
    h1: 'TIFF to JPG Converter — From 50 MB Master File to 2 MB Delivery',
    sub: 'Convert TIFF master files to deliverable JPG — 94–98% smaller, no upload, your originals stay private.',
    howTo: [
      'Drop your TIFF files onto the converter above — or click to browse and select files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: keep your original TIFF — it\'s the master file. The JPG is for delivery, email, and web. Never re-edit from JPG.',
    ],
    sections: [
      {
        heading: 'Your TIFF masters stay private — no upload, no server',
        blocks: [
          { type: 'p', text: 'TIFF master files — containing your best work at full resolution — are processed entirely in your browser. No file is uploaded to any server, no third party sees your originals. Professional photo archives stay private.' },
          { type: 'p', text: 'Even large TIFF files (50–200 MB) convert in seconds once the browser has loaded them into memory. The Canvas API processes them without any network dependency — works on slow Wi-Fi or completely offline.' },
          { type: 'code', label: 'TIFF → JPG via Canvas API', code: `// Transparent TIFF → white fill for JPG\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\nconst ctx = canvas.getContext('2d')\nctx.fillStyle = '#ffffff'\nctx.fillRect(0, 0, canvas.width, canvas.height)\nctx.drawImage(img, 0, 0)\ncanvas.toBlob(cb, 'image/jpeg', 0.92)` },
        ],
      },
      {
        heading: 'Who converts TIFF to JPG',
        blocks: [
          { type: 'p', text: 'Photographers delivering client galleries from Lightroom or Capture One. TIFF is the master — 50–200 MB per image. Converting to JPG creates a 1–3 MB file that uploads to SmugMug, Pic-Time, or Google Drive in seconds rather than minutes.' },
          { type: 'p', text: 'Print studios sharing high-resolution proofs with clients via email. A 100 MB TIFF proof becomes a 2 MB JPG preview — small enough for any email attachment limit and viewable on every device without specialist software.' },
          { type: 'p', text: 'Archivists digitizing old photo albums with flatbed scanners that output TIFF. Converting scans to JPG creates a shareable album that family members can open on phones and tablets without any special applications.' },
        ],
      },
      {
        heading: 'TIFF vs JPG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'TIFF', 'JPG'], rows: [
            ['Compression', 'Lossless or none', 'Lossy — quality 0.92 default'],
            ['Typical file size', '50–200 MB', '1–5 MB for same content'],
            ['Browser support', 'None — not displayable', '100%'],
            ['Re-save quality', 'No loss', 'Degrades each time'],
            ['Layers / channels', 'Multi-layer support', 'Flat single layer'],
            ['Metadata', 'EXIF, XMP, IPTC, layers', 'EXIF, XMP'],
            ['Best for', 'Master files, print, archiving', 'Delivery, web, email'],
          ]},
        ],
      },
      {
        heading: 'When to use JPG vs keep TIFF',
        blocks: [
          { type: 'h3', text: 'Convert TIFF to JPG when:' },
          { type: 'ul', items: [
            '**Client gallery delivery** — Pic-Time, SmugMug, Google Drive uploads are fast as JPG',
            '**Email proofing** — a 2 MB JPG attaches to any email; a 100 MB TIFF does not',
            '**Social media** — Instagram, Facebook, and X all require JPG or PNG, not TIFF',
            '**Website embedding** — browsers cannot display TIFF; JPG is required for any web use',
            '**Print lab submission** — many print services accept JPG for standard orders',
          ]},
          { type: 'h3', text: 'Always keep the original TIFF:' },
          { type: 'ul', items: [
            '**Future editing** — TIFF is the master; re-editing from JPG accumulates artifacts with each save',
            '**Fine art prints** — large-format printing requires full TIFF resolution and bit depth',
            '**Color grading** — TIFF preserves 16-bit color depth; JPG is 8-bit only',
            '**Archive copies** — TIFF is the archival standard for photography and document scanning',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser loads the TIFF into a hidden HTMLImageElement. On the load event, the image is painted onto an HTML5 Canvas. If the TIFF has a transparent layer, it is filled with white — JPG has no alpha channel. The canvas encodes as JPG via toBlob().' },
          { type: 'p', text: 'Quality 0.92 produces output visually indistinguishable from the TIFF at normal delivery sizes. Always keep the original TIFF — JPG is for delivery and distribution only. Re-editing from JPG accumulates compression artifacts with each save.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    const ctx = canvas.getContext('2d')\n    ctx.fillStyle = '#ffffff'  // white bg for any TIFF transparency\n    ctx.fillRect(0, 0, img.width, img.height)\n    ctx.drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/jpeg', 0.92)\n  }\n  img.src = URL.createObjectURL(tiffFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert TIFF to JPG online?', answer: 'Drop your TIFF files onto the converter, click "Convert all", then download. Large TIFF files may take a moment to load into your browser\'s memory — conversion itself is instant. No upload, no software required.' },
      { question: 'How much smaller will the JPG be compared to TIFF?', answer: 'Dramatically smaller. A 50 MB TIFF typically becomes 1–3 MB as JPG at quality 0.92 — a 94–98% reduction. A 200 MB high-res scan becomes 4–10 MB. The ratio depends on image content complexity.' },
      { question: 'Should I delete the TIFF after converting to JPG?', answer: 'No — always keep the original TIFF as your master file. TIFF has no generational quality loss; JPG degrades every time it is re-saved. Use JPG only for delivery. When you need to re-edit, always work from the TIFF master.' },
      { question: 'Why can\'t browsers display TIFF files?', answer: 'TIFF is not part of the web image standard. Chrome, Firefox, and Edge do not render TIFF natively (macOS Safari is the only exception). Converting to JPG makes your images viewable in any browser on any device without plugins.' },
      { question: 'How do I make a TIFF small enough to email?', answer: 'Convert to JPG — a 50 MB TIFF becomes 1–3 MB as JPG. Drop the file onto the converter, click Convert, then download. Most email services accept files up to 25 MB; the converted JPG will be well within that limit.' },
      { question: 'Does TIFF support transparency? What happens when I convert to JPG?', answer: 'TIFF can support alpha-channel transparency. When converting to JPG, transparent areas are filled with white — JPG has no alpha channel. If you need to preserve transparency, convert to PNG instead.' },
      { question: 'What is TIFF used for?', answer: 'TIFF is the professional standard for image storage in photography, print, and document scanning. It supports lossless compression, 16-bit color, multiple layers, and extensive metadata. It is never used for web delivery — only for archiving and editing masters.' },
      { question: 'Can I upload TIFF to Instagram or Facebook?', answer: 'No. Social media platforms require JPG or PNG. Convert your TIFF to JPG first, then upload. The converted JPG will look identical to the TIFF source at the compression Instagram and Facebook apply anyway.' },
      { question: 'Does converting TIFF to JPG lose quality?', answer: 'Minimally. At quality 0.92, the visual difference is imperceptible at screen sizes and standard delivery resolutions. For pixel-perfect lossless output, convert to PNG instead. For print proofing and client galleries, quality 0.92 JPG is indistinguishable from the TIFF source.' },
      { question: 'Can I convert multi-page TIFF files?', answer: 'This converter processes the first page of multi-page TIFFs only. The Canvas API renders one image at a time. For batch page extraction from multi-page TIFFs, use a tool like ImageMagick: `convert input.tiff page_%d.jpg`.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['tiff-to-png', 'tiff-to-webp', 'png-to-jpg'],
  },

  // ─── TO PNG ───────────────────────────────────────────────────────────────

  'jpg-to-png': {
    from: 'jpg', to: 'png',
    title: 'Stop JPG Quality Loss — Convert to PNG Free | Abect',
    description: 'Every JPG re-save degrades quality. Convert to PNG for lossless editing — no more compression artifacts on save. Runs entirely in your browser. Try now.',
    h1: 'JPG to PNG Converter — Lossless Output, Stop Re-Save Degradation',
    sub: 'Convert JPG to lossless PNG — stop quality decay on every re-save. No upload, runs entirely in your browser.',
    howTo: [
      'Drop your JPG files onto the converter above — or click to browse. Multiple files are supported.',
      'Click Convert on any file, or Convert all to process your entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: PNG captures the JPG at its current state — existing artifacts are preserved, not recovered. Use PNG to prevent future degradation.',
    ],
    sections: [
      {
        heading: 'Local conversion — no upload, no quality risk',
        blocks: [
          { type: 'p', text: 'All conversion runs in your browser. JPG files — even high-res DSLR shots at 20+ MB — are processed locally via the Canvas API. No file is sent to any server; no cloud storage is touched.' },
          { type: 'p', text: 'Speed is limited only by your CPU. Converting a batch of 30 high-resolution photos typically takes under 5 seconds — no upload wait, no processing queue, no server bottleneck.' },
          { type: 'code', label: 'JPG → PNG via Canvas API', code: `// JPG has no transparency — no white fill needed\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// PNG is lossless — pixel values are preserved exactly\ncanvas.toBlob(cb, 'image/png')` },
        ],
      },
      {
        heading: 'Who converts JPG to PNG',
        blocks: [
          { type: 'p', text: 'Photographers exporting from Lightroom or Capture One who then need further edits — overlays, watermarks, or retouching. Converting to PNG first stops the quality spiral of re-saving as JPG multiple times.' },
          { type: 'p', text: 'Graphic designers compositing product photos in Photoshop or Affinity Photo. Working in PNG ensures every layer merge and adjustment lands in a lossless container — no generation loss between steps.' },
          { type: 'p', text: 'Web developers preparing UI screenshots for documentation or marketing sites. PNG preserves sharp text and interface elements that look blocky and blurry when re-saved as JPG repeatedly.' },
        ],
      },
      {
        heading: 'JPG vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'JPG', 'PNG'], rows: [
            ['Compression', 'Lossy — quality lost on save', 'Lossless — no quality loss ever'],
            ['Transparency', 'None', 'Full alpha channel'],
            ['Animation', 'No', 'No (use WebP or GIF)'],
            ['File size', 'Smaller for photos', '3–8× larger than JPG'],
            ['Re-save quality', 'Degrades each time', 'Unchanged forever'],
            ['Browser support', '100%', '100%'],
            ['Best for', 'Photos, web delivery', 'Editing, logos, UI graphics'],
          ]},
        ],
      },
      {
        heading: 'When to convert to PNG vs keep JPG',
        blocks: [
          { type: 'h3', text: 'Convert JPG to PNG when:' },
          { type: 'ul', items: [
            '**Multi-step editing** — every re-save as JPG degrades quality; PNG stops the cycle',
            '**Photoshop / GIMP / Affinity workflows** — work in PNG, export as JPG only for final delivery',
            '**Adding transparency** — convert to PNG first, then remove background in your editor',
            '**Logos and icons** — PNG preserves sharp edges and solid colors that JPG blurs',
            '**Presentations and documents** — PNG text and UI elements stay crisp at any zoom level',
          ]},
          { type: 'h3', text: 'Keep JPG when:' },
          { type: 'ul', items: [
            '**Final web delivery** — JPG is 3–8× smaller; use it for the published version',
            '**Email and social media** — platforms recompress images anyway; JPG is the right source',
            '**Photography archives** — original camera JPGs lose nothing extra by staying JPG',
            '**Storage is limited** — PNG files for photos can be enormous; JPG is practical for bulk storage',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser draws the JPG onto an HTML5 Canvas, then encodes the pixel data as PNG via toBlob(). Since JPG has no transparency, no white fill is needed — pixel colors are captured exactly as they appear in the source.' },
          { type: 'p', text: 'Important: PNG captures the JPG at its current state. Compression artifacts already in the JPG — blurry edges, blocky areas, color noise — are preserved in the output. PNG stops future degradation but cannot undo past compression.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    // No quality param for PNG — lossless by spec\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/png')\n  }\n  img.src = URL.createObjectURL(jpgFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert JPG to PNG online for free?', answer: 'Drop your JPG files onto the converter, click "Convert all", then download. Everything runs in your browser — no account, no software, no upload needed.' },
      { question: 'Will converting JPG to PNG improve image quality?', answer: 'No. The conversion captures the JPG at its current quality in a lossless PNG container. Any JPEG compression artifacts in the original will remain in the PNG. What you gain: no further quality loss on future re-saves.' },
      { question: 'Why is the PNG so much larger than the JPG?', answer: 'PNG is lossless — it stores every pixel value without compression shortcuts. For photographs, PNG files are typically 3–8× larger than the equivalent JPG. The trade-off is larger file size in exchange for no quality loss on editing.' },
      { question: 'How do I get a transparent background from a JPG?', answer: 'Converting JPG to PNG does not automatically add transparency — it changes the container format only. To make a background transparent, open the PNG in Photoshop, GIMP, or an online tool like remove.bg and remove the background layer.' },
      { question: 'Does converting JPG to PNG make the image sharper?', answer: 'No. Existing JPEG compression artifacts — blockiness, color noise, blurry edges — are captured in the PNG and preserved exactly. What changes is that the PNG will not accumulate any additional degradation on future saves.' },
      { question: 'How do I convert JPG to PNG without installing software?', answer: 'Use this browser-based converter — no installation required. Drop your files, click Convert, download the result. Works on Windows, Mac, Linux, iOS, and Android without any plugins.' },
      { question: 'Can I convert JPG to PNG on iPhone or Android?', answer: 'Yes. The converter runs in any modern mobile browser — Safari on iPhone, Chrome on Android. Tap the upload area to pick files from your camera roll or file storage, then download the PNG directly to your device.' },
      { question: 'Does JPG to PNG preserve EXIF metadata?', answer: 'Browser-based Canvas conversion does not preserve EXIF metadata — the Canvas API reads pixel data only. If you need to retain camera data (GPS, date, lens info), use a tool like ExifTool or ImageMagick after conversion.' },
      { question: 'Is the PNG output lossless?', answer: 'Yes. PNG is a lossless format by specification — no quality parameter is applied. The pixel data written to the PNG is bit-for-bit identical to what the Canvas rendered from the JPG source.' },
      { question: 'When should I use JPG vs PNG for a website?', answer: 'Use JPG for photographs — it is 3–8× smaller and browsers render it with no visible quality loss at typical compression settings. Use PNG for logos, icons, screenshots, and UI graphics where sharp edges and exact colors matter.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['png-to-jpg', 'jpg-to-webp', 'webp-to-png'],
  },

  'jpeg-to-png': {
    from: 'jpeg', to: 'png',
    title: 'JPEG Files from Camera? Convert to PNG for Editing | Abect',
    description: 'JPEG files from your camera or iPhone lose quality each re-save. Convert to PNG for a lossless editing base — no upload, processed in your browser. Try now.',
    h1: 'JPEG to PNG Converter — Lossless Base for Camera Photo Editing',
    sub: 'Turn camera JPEG files into lossless PNG — protect quality through every editing round, no upload, runs in your browser.',
    howTo: [
      'Drop your JPEG files onto the converter above — or click to browse. Camera files with .jpeg extension are fully supported.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a single ZIP archive.',
      'Tip: PNG captures the JPEG at its current state — convert before editing to protect quality through every future round of adjustments.',
    ],
    sections: [
      {
        heading: 'Camera JPEG files processed locally — no upload, no cap',
        blocks: [
          { type: 'p', text: 'JPEG files from modern cameras range from 8 to 25 MB each. This converter loads them directly into your browser\'s RAM via the Canvas API — no upload bottleneck, no server-imposed file size cap.' },
          { type: 'p', text: 'Conversion runs offline once the page has loaded. Drop an entire camera shoot, convert all, and download the ZIP on a flight or train — no internet connection needed after the initial page load.' },
          { type: 'code', label: 'JPEG → PNG via Canvas API', code: `// JPEG has no transparency — no white fill needed\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// No quality param — PNG is lossless by spec\ncanvas.toBlob(cb, 'image/png')` },
        ],
      },
      {
        heading: 'Who converts JPEG to PNG',
        blocks: [
          { type: 'p', text: 'Photographers shooting JPEG with Canon, Nikon, or Sony cameras who edit in Lightroom, Capture One, or GIMP. Converting the whole shoot to PNG before editing preserves pixel quality through every round of adjustments.' },
          { type: 'p', text: 'iPhone and Android users editing photos on a Mac or PC in apps that re-save as JPEG. A single JPEG → PNG conversion protects originals from accumulating artifacts across multiple editing sessions.' },
          { type: 'p', text: 'Print designers using camera JPEG files as source material for Illustrator or InDesign layouts. Working in PNG for composition avoids compounding JPEG compression in the final print-ready PDF.' },
        ],
      },
      {
        heading: 'JPEG vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'JPEG', 'PNG'], rows: [
            ['Compression', 'Lossy — quality lost on save', 'Lossless — no quality loss ever'],
            ['Transparency', 'None', 'Full alpha channel'],
            ['Animation', 'No', 'No (use WebP or GIF)'],
            ['File size', 'Smaller for photos', '3–8× larger than JPEG'],
            ['Re-save quality', 'Degrades each time', 'Unchanged forever'],
            ['Browser support', '100%', '100%'],
            ['Best for', 'Photos, final delivery', 'Editing, logos, print prep'],
          ]},
        ],
      },
      {
        heading: 'When to use PNG vs keep JPEG',
        blocks: [
          { type: 'h3', text: 'Convert JPEG to PNG when:' },
          { type: 'ul', items: [
            '**Multi-step photo editing** — PNG stops compression artifacts from accumulating across editing rounds',
            '**Lightroom / Capture One exports** — convert to PNG before compositing or further retouching',
            '**Adding transparency** — convert to PNG first, then remove background in your editor',
            '**Illustrator / InDesign layouts** — embed PNG to avoid JPEG re-compression in print PDFs',
            '**Logos and icons from photo sources** — PNG preserves sharp edges that JPEG softens',
          ]},
          { type: 'h3', text: 'Keep JPEG when:' },
          { type: 'ul', items: [
            '**Final web delivery** — JPEG is 3–8× smaller; use it for the published image',
            '**Social media uploads** — platforms recompress everything; JPEG is the right source format',
            '**Camera archives** — original JPEG shoots lose nothing extra by remaining JPEG',
            '**Email attachments** — JPEG keeps file sizes manageable for mail clients',
          ]},
        ],
      },
      {
        heading: 'JPEG, JPG, and how the conversion works',
        blocks: [
          { type: 'p', text: 'JPEG and JPG are the same format — Joint Photographic Experts Group. JPEG is the full extension; JPG is the 3-character version that became default on Windows. Every tool, browser, and this converter treats them identically.' },
          { type: 'p', text: 'Conversion draws the JPEG onto an HTML5 Canvas, then encodes the pixels as PNG via toBlob(). No quality parameter is needed — PNG is lossless by specification. Existing JPEG artifacts are captured but no new ones are introduced.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    // PNG: lossless — no quality argument\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/png')\n  }\n  img.src = URL.createObjectURL(jpegFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'What is the difference between JPEG and JPG?', answer: 'No technical difference. JPEG is the full format name; JPG is the 3-character extension that became default on Windows (older systems limited extensions to 3 chars). The format, compression algorithm, and quality are completely identical — every tool treats them the same.' },
      { question: 'How do I convert JPEG to PNG online?', answer: 'Drop your JPEG files onto the converter, click "Convert all", then download. Everything runs in your browser — no upload, no account. Batch conversion is supported, and the output is a lossless PNG.' },
      { question: 'Does converting JPEG to PNG improve quality?', answer: 'No. The PNG captures the JPEG at its current quality — it does not restore detail lost during JPEG compression. What you gain is that the PNG will not accumulate any additional degradation on future re-saves.' },
      { question: 'Why is the PNG so much larger than the JPEG?', answer: 'PNG is lossless — it stores every pixel value without discarding any data. For photographs, PNG files are typically 3–8× larger than the equivalent JPEG. The trade-off is larger file size in exchange for no quality loss on editing.' },
      { question: 'How do I convert JPEG to PNG on Mac for free?', answer: 'Use this browser-based converter — no software required. Open in Safari, Chrome, or Firefox on any Mac, drop your JPEG files, click Convert, and download the PNG. No installation, no account.' },
      { question: 'Can I convert camera photos (Canon, Nikon, Sony) from JPEG to PNG?', answer: 'Yes. Drop the JPEG files from your camera card directly onto the converter. Files with both .jpg and .jpeg extensions are accepted. The resulting PNGs are lossless and ready for editing in Lightroom, Capture One, Photoshop, or GIMP.' },
      { question: 'Does JPEG to PNG conversion preserve EXIF metadata?', answer: 'No. The Canvas API reads pixel data only — EXIF data (camera model, GPS, date, lens info) is not transferred to the PNG output. If you need to retain EXIF, use a tool like ExifTool to copy the metadata after conversion.' },
      { question: 'How do I get a transparent background from a JPEG?', answer: 'Converting JPEG to PNG does not automatically add transparency — JPEGs have no alpha channel to begin with. Convert to PNG first, then open the PNG in an editor like Photoshop, GIMP, or remove.bg to remove the background.' },
      { question: 'Can I convert JPEG to PNG on iPhone or Android?', answer: 'Yes. The converter runs in any modern mobile browser — Safari on iOS, Chrome on Android. Tap the upload area to pick files from your camera roll, convert, and download the PNG directly to your device.' },
      { question: 'Is the PNG output truly lossless?', answer: 'Yes. PNG is lossless by format specification — no quality parameter is applied during encoding. The pixel data written to the PNG file is identical to what the Canvas rendered from the JPEG. No additional quality loss is introduced by the conversion itself.' },
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
    title: 'GIF to PNG — Edit Without 256-Color Limits, Free | Abect',
    description: 'GIF\'s 256-color limit makes editing painful in Photoshop or GIMP. Convert to PNG — full color, lossless, transparency preserved, in your browser. Try now.',
    h1: 'GIF to PNG Converter — Full Color, Editor-Ready, Transparency Kept',
    sub: 'Convert GIF to full-color PNG — break the 256-color limit, preserve transparency, get an editor-ready file. No upload.',
    howTo: [
      'Drop your GIF files onto the converter above — or click to browse and select files.',
      'Click Convert on any file, or Convert all to process your entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Note: only the first frame of animated GIFs is exported as PNG — PNG does not support animation.',
    ],
    sections: [
      {
        heading: 'Processed locally — no upload, works offline',
        blocks: [
          { type: 'p', text: 'GIF files are processed entirely in your browser — the Canvas API renders the first frame without uploading anything to a remote server. Animated GIFs can be large, but conversion is instant and stays entirely on your device.' },
          { type: 'p', text: 'Once the page loads, conversion works offline. Useful for extracting reference frames from confidential or unreleased GIF animations without exposing them to any third-party service.' },
          { type: 'code', label: 'GIF → PNG (first frame via Canvas)', code: `// Canvas renders first GIF frame, encodes as lossless PNG\nconst img = new Image()\nimg.src = URL.createObjectURL(gifFile)\nconst ctx = canvas.getContext('2d')\nctx.drawImage(img, 0, 0)  // first frame only\n// No quality param — PNG is lossless by spec\ncanvas.toBlob(cb, 'image/png')` },
        ],
      },
      {
        heading: 'Who converts GIF to PNG',
        blocks: [
          { type: 'p', text: 'Designers extracting frames from legacy animated GIF assets to use as static images in Figma, Photoshop, or Illustrator. The PNG output has full color depth and transparency support — unlike the GIF source, it\'s a proper editing asset.' },
          { type: 'p', text: 'Developers converting old GIF icon libraries to PNG for modern design systems. Many early 2000s icons were distributed as GIF — PNG conversion restores the full color palette and makes them compatible with current tooling.' },
          { type: 'p', text: 'Documentation authors extracting the first frame of animated tutorial GIFs as a static PNG thumbnail. The PNG serves as a preview on platforms that don\'t auto-play GIFs, or as a fallback in email templates.' },
        ],
      },
      {
        heading: 'GIF vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'GIF', 'PNG'], rows: [
            ['Color depth', '256 colors', '16.7 million colors'],
            ['Compression', 'LZW lossless', 'Deflate lossless'],
            ['Transparency', '1-bit on/off only', 'Full alpha channel'],
            ['Animation', 'Yes', 'No (first frame exported)'],
            ['File size', 'Often larger than PNG', 'Usually smaller'],
            ['Browser support', '100%', '100%'],
            ['Best for', 'Animation, legacy apps', 'Static graphics, editing'],
          ]},
        ],
      },
      {
        heading: 'When to convert to PNG vs keep GIF',
        blocks: [
          { type: 'h3', text: 'Convert GIF to PNG when:' },
          { type: 'ul', items: [
            '**Photoshop / GIMP / Affinity** — open the PNG for editing without 256-color constraints',
            '**Figma / Sketch imports** — PNG is the standard lossless import format for vector tools',
            '**Icon libraries** — PNG icons render crisply on retina displays; GIF icons show dithering',
            '**Documentation thumbnails** — extract a clean first-frame PNG from animated GIFs for static previews',
            '**Transparency upgrade** — PNG supports full semi-transparent edges; GIF transparency is binary',
          ]},
          { type: 'h3', text: 'Keep GIF when:' },
          { type: 'ul', items: [
            '**Animation is required** — PNG is a static format; animated GIFs must stay as GIF or convert to WebP',
            '**Email clients** — GIF animation renders in Outlook, Apple Mail, and mobile clients; PNG is always static',
            '**Legacy platforms** — some old CMS or forum platforms display GIF inline but not PNG',
            '**Meme and reaction images** — the cultural format for these is GIF; converting loses the animation',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser loads the GIF into a hidden HTMLImageElement. On the load event, it renders the first frame onto an HTML5 Canvas — animated GIFs pause at frame one automatically. The Canvas encodes the pixel data as lossless PNG via toBlob().' },
          { type: 'p', text: 'GIF\'s 1-bit transparency (fully on or off) is upgraded to PNG\'s full alpha channel in the output. The transparent pixels carry over exactly — and the PNG is now capable of supporting semi-transparent edges if you edit it further.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    // First frame rendered; GIF alpha preserved as PNG alpha\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/png')\n  }\n  img.src = URL.createObjectURL(gifFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert GIF to PNG online?', answer: 'Drop your GIF files onto the converter, click "Convert all", then download. The first frame of each GIF is exported as a full-color lossless PNG. No upload, no software, no signup required.' },
      { question: 'Does GIF to PNG preserve animation?', answer: 'No. PNG is a static format — only the first frame of each animated GIF is exported. If you need to preserve animation, convert to WebP using this tool\'s GIF to WebP converter, or use FFmpeg for animated WebP output.' },
      { question: 'Does GIF to PNG preserve transparency?', answer: 'Yes. GIF\'s binary transparency (on/off) is carried over to the PNG as full alpha-channel transparency. The result is actually an upgrade — PNG supports semi-transparent edges that GIF cannot represent.' },
      { question: 'Will PNG be smaller than the original GIF?', answer: 'Usually yes. PNG\'s Deflate compression outperforms GIF\'s LZW for most image content, especially images with more than 256 colors. For very simple 2-color line art, GIF may occasionally be smaller — but for typical web graphics, PNG wins on both size and quality.' },
      { question: 'Will PNG look better quality than the GIF?', answer: 'Yes, significantly. GIF is capped at 256 colors; PNG supports 16.7 million. Any GIF with gradients, photographs, or rich illustration will look noticeably sharper as PNG — no color banding, no dithering artifacts.' },
      { question: 'Can I use the PNG output in Photoshop or GIMP?', answer: 'Yes. PNG is natively supported by Photoshop, GIMP, Affinity Photo, and every other image editor. The full-color lossless PNG is a proper editing asset — unlike GIF, which forces you to work with a 256-color palette.' },
      { question: 'I need all frames from an animated GIF — can I export them as PNG?', answer: 'This converter exports only the first frame. For frame-by-frame extraction, use Ezgif.com\'s GIF frame extractor, which exports every frame as a separate PNG. FFmpeg can also do this: `ffmpeg -i animation.gif frame_%03d.png`.' },
      { question: 'Can I open a GIF in Figma after converting to PNG?', answer: 'Yes. Figma accepts PNG files natively — drag and drop the converted PNG directly onto the canvas. PNG preserves full color and transparency, making it suitable for use as a component or background asset in Figma projects.' },
      { question: 'Can I convert GIF to PNG on mobile?', answer: 'Yes. The converter runs in any modern mobile browser — Safari on iPhone, Chrome on Android. Tap the upload area to select a GIF from your photos or files, convert, and download the PNG directly to your device.' },
      { question: 'Why is my PNG larger than the GIF?', answer: 'For very simple GIFs — small pixel art or 2-color icons — GIF\'s LZW compression may be more efficient than PNG for that specific content type. This is rare. For most images, especially those with gradients or photographs, PNG will be smaller and look better.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-jpg', 'gif-to-webp', 'jpg-to-png'],
  },

  'bmp-to-png': {
    from: 'bmp', to: 'png',
    title: 'BMP Screenshots to PNG — Lossless, Sharp Text | Abect',
    description: 'BMP screenshots with text or UI blur when saved as JPG. Convert to PNG instead — lossless, 70–95% smaller than BMP, perfectly sharp. No upload. Try now.',
    h1: 'BMP to PNG Converter — Lossless, Sharp Text, 70–95% Smaller',
    sub: 'Convert BMP screenshots to lossless PNG — sharp text, zero quality loss, 70–95% smaller. No upload.',
    howTo: [
      'Drop your BMP files onto the converter above — or click to browse and select multiple files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: BMP to PNG is perfectly lossless — every pixel preserved exactly. Use PNG for screenshots and UI; use JPG for photographs.',
    ],
    sections: [
      {
        heading: 'Screenshots stay on your device — no upload, no exposure',
        blocks: [
          { type: 'p', text: 'BMP files from IT environments can be 6–20 MB each — too large for most server-based converters. This tool processes everything in your browser — screenshots from internal systems stay on your device, never sent to any server.' },
          { type: 'p', text: 'Once the page loads, the tool works offline. Useful when converting screenshots from an RDP session or air-gapped machine — export the BMP, convert locally, send the PNG without any internet required.' },
          { type: 'code', label: 'BMP → PNG — lossless via Canvas API', code: `// BMP has no transparency — direct lossless encode\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// No quality param — PNG is lossless by spec\ncanvas.toBlob(cb, 'image/png')` },
        ],
      },
      {
        heading: 'Who converts BMP to PNG',
        blocks: [
          { type: 'p', text: 'IT support staff and sysadmins documenting error dialogs, configuration states, and terminal output. BMP is the default capture format in many Windows environments — converting to PNG keeps text and UI elements razor-sharp without the blurring that JPG introduces.' },
          { type: 'p', text: 'Software developers capturing code editor screenshots, debug output, and build logs for documentation or bug reports. PNG preserves monospace fonts and syntax highlighting colors exactly — JPG compression visibly degrades both.' },
          { type: 'p', text: 'Architects and engineers exporting technical diagrams from older CAD tools that output BMP. Converting to PNG preserves dimension lines, annotations, and technical notation that JPG compression softens.' },
        ],
      },
      {
        heading: 'BMP vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'BMP', 'PNG'], rows: [
            ['Compression', 'None — raw pixels', 'Lossless Deflate'],
            ['File size (1920×1080)', '~6 MB', '200–600 KB'],
            ['Quality loss on save', 'None', 'None — lossless forever'],
            ['Transparency', 'No', 'Full alpha channel'],
            ['Text / UI sharpness', 'Max (uncompressed)', 'Preserved perfectly'],
            ['Browser support', 'No', '100%'],
            ['Best for', 'Windows internal use', 'Screenshots, editing, web'],
          ]},
        ],
      },
      {
        heading: 'When to use PNG vs JPG for BMP conversion',
        blocks: [
          { type: 'h3', text: 'Convert BMP to PNG when:' },
          { type: 'ul', items: [
            '**Screenshots with text** — PNG keeps fonts, UI labels, and dialog text perfectly sharp',
            '**Code and terminal captures** — monospace text and syntax colors are preserved exactly',
            '**Technical diagrams** — CAD output, flowcharts, schematics need lossless precision',
            '**Design tool import** — Photoshop, Figma, and Sketch all prefer PNG for editing',
            '**Lossless quality required** — PNG guarantees zero pixel degradation on every save',
          ]},
          { type: 'h3', text: 'Convert BMP to JPG instead when:' },
          { type: 'ul', items: [
            '**Photographs** — JPG achieves even smaller files with minimal visible quality loss for photo content',
            '**Smallest file size needed** — JPG is 3–4× smaller than PNG for the same photographic image',
            '**No text or sharp edges** — photographic BMP content compresses well as JPG without artifacts',
            '**Email with photo attachments** — JPG gives the best size-to-quality ratio for photographic sharing',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser draws the BMP onto an HTML5 Canvas via the Canvas API, then encodes the pixel data as PNG using toBlob(). No quality parameter is passed — PNG is lossless by format specification, so every pixel is preserved exactly.' },
          { type: 'p', text: 'A 6 MB 1920×1080 BMP screenshot typically becomes 200–600 KB as PNG — 70–95% smaller depending on image complexity. Simple UI screenshots with large solid-color areas compress more than complex photographic content.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    // Lossless — 6 MB BMP → ~400 KB PNG\n    canvas.toBlob(resolve, 'image/png')\n  }\n  img.src = URL.createObjectURL(bmpFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert BMP to PNG online for free?', answer: 'Drop your BMP files onto the converter, click "Convert all", then download. The conversion is completely lossless — every pixel preserved. No upload, no software, no file size cap.' },
      { question: 'Is there any quality loss when converting BMP to PNG?', answer: 'No. Both BMP and PNG store image data losslessly. Converting BMP to PNG is a perfectly lossless operation — every single pixel is preserved exactly as in the original BMP, with no compression artifacts.' },
      { question: 'How much smaller will the PNG be than the BMP?', answer: 'Typically 70–95% smaller. A 6 MB 1920×1080 screenshot BMP becomes 200–600 KB as PNG. Simple images (solid-color UI, desktops) compress more aggressively than complex photographic detail.' },
      { question: 'Why should I use PNG instead of JPG for BMP screenshots?', answer: 'JPG uses lossy compression that blurs sharp edges, text, and fine UI details — exactly the content that appears in screenshots. PNG is lossless and preserves every pixel exactly. For screenshots, PNG is always the correct choice over JPG.' },
      { question: 'How do I reduce the file size of a BMP screenshot?', answer: 'Convert to PNG — most screenshots shrink by 70–90% with absolutely zero quality loss. Drop the BMP onto the converter and download the PNG output instantly. No upload or software installation needed.' },
      { question: 'Can I use BMP to PNG for code or terminal screenshots?', answer: 'Yes — and it\'s the ideal use case. PNG preserves monospace fonts, syntax highlighting colors, and hard-edged text exactly. JPG would introduce visible blurring and color noise around characters, making code screenshots look degraded.' },
      { question: 'Does BMP have transparency? Will PNG add it?', answer: 'Standard 24-bit BMP files have no transparency. The PNG output will also have no transparency — it simply represents the same opaque pixels in a compressed lossless container. PNG\'s alpha channel support is available if you edit the file after conversion.' },
      { question: 'Can I convert BMP to PNG on Windows without software?', answer: 'Yes — use this browser-based converter in Chrome, Firefox, or Edge. Alternatively, Windows 10/11 Paint can open a BMP and save as PNG directly via File > Save As > PNG. Both methods produce a lossless, identical result.' },
      { question: 'Is BMP to PNG conversion safe for sensitive screenshots?', answer: 'Yes. All conversion happens in your browser — no file is ever uploaded to a server. Screenshots containing passwords, internal systems, or confidential data are processed entirely on your device.' },
      { question: 'Can I batch convert BMP screenshots to PNG?', answer: 'Yes. Drop multiple BMP files at once, click "Convert all", then "Download all" to receive a ZIP archive with all converted PNGs. There is no per-file cap or limit on the number of files.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-jpg', 'bmp-to-webp', 'jpg-to-png'],
  },

  'avif-to-png': {
    from: 'avif', to: 'png',
    title: 'AVIF to PNG — Keep Transparency, Edit in Any Tool | Abect',
    description: 'AVIF with a transparent background? Only PNG preserves alpha for lossless editing in Photoshop, Figma, Sketch, or Canva. No upload, no quality loss. Try now.',
    h1: 'AVIF to PNG Converter — Lossless and Transparency-Aware',
    sub: 'Convert AVIF to editable, lossless PNG — preserves transparency, compatible with Photoshop, Figma, and every design tool. No upload.',
    howTo: [
      'Drop AVIF files onto the converter — or click to select files from your device.',
      'Click Convert to process one file, or Convert all for batch AVIF to PNG conversion.',
      'Download your lossless PNG files individually, or use Download all for a ZIP.',
      'Tip: transparent AVIF backgrounds are fully preserved in the PNG output — alpha channel intact.',
    ],
    sections: [
      {
        heading: 'AVIF decoded in your browser — your files stay private',
        blocks: [
          { type: 'p', text: 'AVIF icons, logos, and design assets downloaded from web apps often contain transparent backgrounds. When you need to edit them in Photoshop or Figma, you need a format the tool supports — and PNG preserves every transparent pixel without uploading your files anywhere.' },
          { type: 'p', text: 'All conversion happens in your browser using the built-in AVIF decoder. Nothing is transmitted to a server. Once the page loads you can go offline — the converter continues to work. Your design assets and cutout images remain entirely on your device.' },
          { type: 'code', label: 'AVIF alpha channel preserved through PNG conversion', code: `// AVIF decoded by the browser's native decoder\nconst img = new Image()\nimg.src = URL.createObjectURL(avifFile)\n// No white fill — PNG keeps the alpha channel intact\ncanvas.toBlob(cb, 'image/png')  // lossless, transparency preserved` },
        ],
      },
      {
        heading: 'Why designers and developers convert AVIF to PNG',
        blocks: [
          { type: 'p', text: 'Design systems and component libraries increasingly ship assets as AVIF — icons, illustrations, UI elements with transparent cutouts. When you download one to edit locally, Photoshop CS6, Illustrator, or older Affinity Photo returns "format not recognised".' },
          { type: 'p', text: 'Frontend developers encounter AVIF from automated image pipelines — Next.js image optimization, Webpack loaders, or Cloudinary auto-format. When you need to inspect or edit a specific asset, PNG is the editable, lossless format that re-imports cleanly into every tool.' },
          { type: 'p', text: 'AVIF with transparency cannot convert to JPG without losing the alpha channel. If the image contains a transparent background — a logo cutout, product shot, or sticker — PNG is the only common format that keeps transparency and works in every design application.' },
        ],
      },
      {
        heading: 'AVIF vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'AVIF', 'PNG'], rows: [
            ['Compression type', 'Lossy or lossless', 'Lossless only'],
            ['File size', '~50% smaller than PNG', 'Larger (lossless)'],
            ['Transparency (alpha)', 'Yes', 'Yes — full alpha channel'],
            ['Browser support', '~90% (Chrome, Firefox, Safari 16+)', '100%'],
            ['Desktop app support', 'Photoshop 2021+, Figma 2022+', 'Universal — every app'],
            ['Re-save degradation', 'Lossless mode: none; Lossy: yes', 'None — lossless always'],
            ['Metadata', 'EXIF supported', 'Limited (tEXt chunks)'],
          ]},
        ],
      },
      {
        heading: 'When to choose PNG vs AVIF',
        blocks: [
          { type: 'h3', text: 'Convert AVIF to PNG when:' },
          { type: 'ul', items: [
            'Opening in **Photoshop, Illustrator, Affinity Photo** versions that don\'t support AVIF',
            'The image has a **transparent background** — PNG preserves the alpha channel, JPG does not',
            'You need a **lossless editable** version for compositing or design work',
            'Uploading to **Figma, Canva, Sketch** — PNG imports cleanly, AVIF may require a plugin',
            'Archiving or distributing **design assets** that must open in any tool, any year',
          ]},
          { type: 'h3', text: 'Keep AVIF when:' },
          { type: 'ul', items: [
            'Delivering images on a **modern web project** — AVIF gives 50% smaller files than PNG',
            'Your pipeline handles **format negotiation** (Cloudflare Images, Cloudinary, Imgix)',
            'You don\'t need to edit the image — AVIF is perfect for **read-only web delivery**',
            'The image is a **photograph without transparency** — AVIF lossy beats PNG on compression',
          ]},
        ],
      },
      {
        heading: 'How AVIF to PNG conversion works in your browser',
        blocks: [
          { type: 'p', text: 'Browsers have native AVIF decoders — Chrome, Firefox, and Safari decode AVIF to display web pages. This converter taps into that decoder: it loads your AVIF file as an HTMLImageElement, then draws it onto an HTML5 Canvas at full resolution.' },
          { type: 'p', text: 'Unlike JPG conversion, no white fill is applied — the Canvas preserves the alpha channel from the AVIF. The toBlob() call encodes the canvas as PNG without a quality parameter, producing lossless output. Every pixel, including semi-transparent edges, is preserved exactly.' },
          { type: 'code', label: 'Full AVIF → PNG pipeline', code: `const canvas = document.createElement('canvas')\nconst ctx = canvas.getContext('2d')\ncanvas.width = img.width\ncanvas.height = img.height\n// No white fill — AVIF alpha channel is preserved\nctx.drawImage(img, 0, 0)\n// Lossless PNG — transparency intact\ncanvas.toBlob(cb, 'image/png')` },
        ],
      },
    ],
    faq: [
      { question: 'Does AVIF to PNG preserve transparency?', answer: 'Yes. Both AVIF and PNG support full alpha-channel transparency. The conversion draws the AVIF onto a Canvas without any white fill, then encodes as PNG — preserving every semi-transparent pixel, including smooth cutout edges, exactly.' },
      { question: 'Why is the PNG so much larger than the AVIF?', answer: 'AVIF achieves roughly 50% better compression than PNG at the same visual quality. Converting expands the image back to full lossless representation. A 100 KB AVIF icon might become 400 KB as PNG. This is expected — PNG is lossless, AVIF is not.' },
      { question: 'Is there any quality loss when converting AVIF to PNG?', answer: 'The PNG captures the image at the quality it was encoded at in the AVIF — no additional loss is introduced. PNG is lossless by definition. If the AVIF was encoded at high quality, the PNG output will match it exactly.' },
      { question: 'How do I open AVIF files in Photoshop or Illustrator?', answer: 'Convert to PNG first using this tool. PNG is universally supported in all versions of Photoshop and Illustrator without plugins, updates, or extensions.' },
      { question: 'When should I convert AVIF to PNG instead of JPG?', answer: 'Convert to PNG when the image has a transparent background (logo, icon, cutout) or when you need lossless quality for further editing. Convert to JPG only when you need a smaller file and transparency is not required.' },
      { question: 'Why is AVIF not supported in my design software?', answer: 'AVIF was standardised in 2019 and widespread support in design tools arrived after 2021. Photoshop added AVIF support in version 23.2 (2021); Lightroom in 2023. Older versions, Affinity Photo pre-2.0, and Figma without plugins all require conversion to PNG or JPG.' },
      { question: 'Can I convert AVIF icons or logos without losing the transparent background?', answer: 'Yes. This converter fully preserves AVIF transparency in the PNG output. Logos, icons, and cutout images with transparent backgrounds convert with the alpha channel completely intact.' },
      { question: 'What\'s the difference between AVIF to PNG and AVIF to JPG?', answer: 'PNG output is lossless and preserves transparency — the right choice for logos, icons, and design work. JPG output is smaller but loses transparency (transparent areas become white) — the right choice for photos and compatibility with older apps.' },
      { question: 'Can I convert AVIF to PNG on iPhone or Android?', answer: 'Yes. This converter works in Safari on iPhone and Chrome on Android. No app install required. Tap the file picker, select your AVIF files, convert, and download.' },
      { question: 'Does the converter work without an internet connection?', answer: 'Yes. Once the page has loaded, the converter runs entirely in your browser. Go offline and it continues converting. Your files are never uploaded to a server.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-jpg', 'jpg-to-png', 'webp-to-png'],
  },

  'tiff-to-png': {
    from: 'tiff', to: 'png',
    title: 'TIFF to PNG — Open Pro Photos in Any Design Tool | Abect',
    description: 'TIFF won\'t open in Canva, Google Slides, or most web tools. Convert to lossless PNG — no quality loss, no upload, compatible with every design app. Try now.',
    h1: 'TIFF to PNG Converter — Lossless, Compatible Everywhere',
    sub: 'Convert TIFF to PNG for universal compatibility — zero quality loss, works in Canva, Figma, Keynote, and every browser.',
    howTo: [
      'Drop your TIFF files onto the converter above — or click to browse and select files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: TIFF to PNG is completely lossless — every pixel is preserved exactly. The PNG will be significantly smaller than the TIFF despite identical quality.',
    ],
    sections: [
      {
        heading: 'Professional TIFF assets converted locally — nothing uploaded',
        blocks: [
          { type: 'p', text: 'TIFF files from photo shoots, scans, or print production are processed entirely in your browser. Professional assets — brand photography, product images, and print masters — never leave your device during conversion.' },
          { type: 'p', text: 'Large TIFF files (up to 200 MB) convert in seconds once loaded into browser memory. The conversion is lossless — every bit of data is preserved. Works offline once the page has loaded.' },
          { type: 'code', label: 'TIFF → PNG — lossless via Canvas API', code: `// Both TIFF and PNG are lossless — zero quality loss\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// No quality param — PNG is lossless by spec\ncanvas.toBlob(cb, 'image/png')` },
        ],
      },
      {
        heading: 'Who converts TIFF to PNG',
        blocks: [
          { type: 'p', text: 'Marketing and design teams who receive TIFF deliverables from photographers or print studios and need to import them into Canva, PowerPoint, Keynote, or Google Slides — none of which support TIFF. Converting to PNG creates an import-ready file with zero quality loss.' },
          { type: 'p', text: 'Web designers extracting assets from print-production TIFF files. Brand logos, product photos, and illustrations delivered as TIFF for print need to be in PNG format for Figma, Sketch, or Adobe XD workflows.' },
          { type: 'p', text: 'Social media managers repurposing professional print photography for digital channels. Instagram, Facebook, and LinkedIn all accept PNG but not TIFF — batch converting takes seconds and preserves full resolution.' },
        ],
      },
      {
        heading: 'TIFF vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'TIFF', 'PNG'], rows: [
            ['Compression', 'Lossless or none', 'Lossless Deflate'],
            ['Typical file size', '50–200 MB', '2–15 MB for same content'],
            ['Browser support', 'None — not displayable', '100%'],
            ['Design tool support', 'Photoshop, Affinity mainly', 'Universal — Canva, Figma, all'],
            ['Multi-layer support', 'Yes (flattened on export)', 'No — single layer'],
            ['Bit depth', 'Up to 32-bit', 'Up to 16-bit'],
            ['Best for', 'Print, archiving, editing', 'Web, design tools, presentations'],
          ]},
        ],
      },
      {
        heading: 'When to convert to PNG vs keep TIFF',
        blocks: [
          { type: 'h3', text: 'Convert TIFF to PNG when:' },
          { type: 'ul', items: [
            '**Canva / PowerPoint / Keynote** — none of these support TIFF; PNG imports instantly',
            '**Google Slides / Docs** — Google Workspace only accepts web-compatible formats',
            '**Figma / Sketch / XD** — design tools use PNG as the standard lossless import format',
            '**Web publishing** — browsers don\'t display TIFF; PNG works everywhere',
            '**Lossless quality required** — PNG is lossless, so you lose nothing vs the TIFF source',
          ]},
          { type: 'h3', text: 'Keep TIFF when:' },
          { type: 'ul', items: [
            '**Print production** — TIFF is the standard for press-ready files and large-format printing',
            '**Multi-layer Photoshop editing** — TIFF preserves layers, channels, and smart objects',
            '**16/32-bit color archiving** — TIFF supports higher bit depths than PNG for HDR masters',
            '**Long-term archiving** — TIFF is the archival standard for professional photography and scanning',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser draws the TIFF onto an HTML5 Canvas via the Canvas API, then encodes the pixels as PNG via toBlob(). No quality parameter is needed — PNG is lossless by specification. Every pixel value from the TIFF is preserved exactly in the output.' },
          { type: 'p', text: 'The PNG file will be significantly smaller than the TIFF despite being lossless — PNG\'s Deflate algorithm is more efficient than uncompressed TIFF storage. A 50 MB TIFF typically becomes a 2–10 MB PNG.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    // Lossless: TIFF pixels → PNG pixels, no loss\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/png')\n  }\n  img.src = URL.createObjectURL(tiffFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert TIFF to PNG online?', answer: 'Drop your TIFF files onto the converter, click "Convert all", then download. Large TIFF files may take a moment to load into browser memory — conversion itself is instant. No upload or software required.' },
      { question: 'Is there any quality loss when converting TIFF to PNG?', answer: 'No. Both TIFF and PNG are lossless formats. Every pixel from the TIFF is preserved exactly in the PNG output — no detail is discarded, no compression artifacts are introduced. The visual result is identical.' },
      { question: 'How much smaller will the PNG be compared to TIFF?', answer: 'Substantially smaller. A 50 MB uncompressed TIFF typically becomes 2–10 MB as PNG. PNG\'s Deflate compression is more efficient than uncompressed TIFF, so you get a much smaller file with identical visual quality.' },
      { question: 'Why doesn\'t TIFF open in Canva or Google Slides?', answer: 'Canva, Google Slides, PowerPoint, and Keynote only accept web-compatible image formats — JPG, PNG, WebP, or GIF. TIFF is a print and archiving format not supported by web-based tools. Converting to PNG gives you a file that imports into every design app.' },
      { question: 'Can I use the PNG in Figma or Sketch after converting?', answer: 'Yes. PNG is the standard lossless import format for Figma, Sketch, and Adobe XD. Drag and drop the converted PNG directly onto the canvas — transparency is preserved and the image is available for component use at any scale.' },
      { question: 'Does TIFF to PNG preserve transparency?', answer: 'Yes. If the TIFF has a transparent layer (uncommon but possible), the Canvas API preserves it in the PNG output. PNG supports full alpha-channel transparency.' },
      { question: 'How do I display a TIFF image on a website?', answer: 'Convert to PNG or WebP first — browsers don\'t render TIFF (except macOS Safari). PNG displays natively in Chrome, Firefox, Edge, and Safari on all platforms. For the smallest file size, use WebP instead.' },
      { question: 'What is the difference between TIFF and PNG for editing?', answer: 'TIFF is the master format — it supports multiple layers, 16/32-bit color, and extensive metadata. PNG is a single-layer, 8/16-bit lossless format designed for web and distribution. Convert TIFF to PNG for sharing; keep TIFF for editing.' },
      { question: 'Can I convert TIFF to PNG on Mac or Windows without software?', answer: 'Yes — this browser-based converter works on any OS in Chrome, Firefox, or Edge. On Mac, Preview can also export TIFF as PNG via File > Export. On Windows, use this tool for the fastest workflow.' },
      { question: 'Can I batch convert TIFF to PNG?', answer: 'Yes. Drop multiple TIFF files at once, click "Convert all", then "Download all" to get a ZIP archive with all converted PNGs. Each file is processed individually in your browser — no per-file limit.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['tiff-to-jpg', 'tiff-to-webp', 'jpg-to-png'],
  },

  // ─── TO WEBP ──────────────────────────────────────────────────────────────

  'png-to-webp': {
    from: 'png', to: 'webp',
    title: 'PNG to WebP — Keep Transparency, Cut File Size Free | Abect',
    description: 'PNG logos and UI assets keep full transparency when converted to WebP — with files 26–80% smaller. No upload, no signup, runs entirely in your browser. Try now.',
    h1: 'PNG to WebP Converter — Full Transparency, 26–80% Smaller',
    sub: 'Convert PNG logos and UI assets to WebP — full transparency preserved, 26–80% smaller files, processed entirely in your browser.',
    howTo: [
      'Drop your PNG files onto the converter above — or click to browse and select multiple files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: transparent PNG backgrounds are fully preserved in the WebP output — both formats support the full alpha channel.',
    ],
    sections: [
      {
        heading: 'Design assets processed locally — no upload, no exposure',
        blocks: [
          { type: 'p', text: 'PNG logos and brand assets are converted entirely in your browser — no file leaves your device. This matters for confidential design work: brand identity files, pre-launch renders, and client assets processed without exposure to any third party.' },
          { type: 'p', text: 'WebP encoding via the Canvas API is fast — a batch of 50 PNG icons or UI assets typically converts in under 3 seconds. Once the page loads, the tool works offline, making it safe to use on public Wi-Fi.' },
          { type: 'code', label: 'PNG → WebP — alpha channel fully preserved', code: `// PNG alpha channel is preserved automatically by Canvas\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\n// No white fill — PNG transparency passes through intact\ncanvas.getContext('2d').drawImage(img, 0, 0)\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
      {
        heading: 'Who converts PNG to WebP',
        blocks: [
          { type: 'p', text: 'Front-end developers exporting design assets from Figma, Sketch, or Adobe XD as PNG — the standard export format for UI components. Converting the batch to WebP cuts icon library weight by 26–80% without losing the transparency that makes them usable on colored backgrounds.' },
          { type: 'p', text: 'WordPress and Shopify theme builders converting PNG logo files for header and footer use. A transparent PNG logo can be 80–200 KB; the WebP equivalent is often 15–40 KB — a 5–7× reduction with no visible difference at any display size.' },
          { type: 'p', text: 'Game and app developers optimizing UI sprite sheets exported as PNG. WebP lossless achieves 26% smaller files than PNG while preserving exact pixel values — critical for sharp UI across all device DPI settings.' },
        ],
      },
      {
        heading: 'PNG vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'PNG', 'WebP'], rows: [
            ['Compression', 'Lossless only', 'Lossy and lossless'],
            ['File size (lossless)', 'Baseline', '~26% smaller'],
            ['File size (lossy)', '—', '50–80% smaller than PNG'],
            ['Transparency', 'Full alpha channel', 'Full alpha channel'],
            ['Animation', 'No', 'Yes'],
            ['Browser support', '100%', '97%+'],
            ['Best for', 'Editing, print, design tools', 'Web delivery, icons, UI'],
          ]},
        ],
      },
      {
        heading: 'When to convert to WebP vs keep PNG',
        blocks: [
          { type: 'h3', text: 'Convert PNG to WebP when:' },
          { type: 'ul', items: [
            '**Figma / Sketch / XD exports** — convert the design asset batch to WebP before deploying to production',
            '**WordPress / Shopify logos** — transparent WebP logos load 5–7× faster than PNG equivalents',
            '**Next.js / Nuxt / Astro** — image components serve WebP automatically from any PNG source',
            '**Icon libraries** — WebP cuts icon file size by 26–80%, improving page load for icon-heavy UIs',
            '**CDN and bandwidth costs** — serving WebP instead of PNG reduces storage and transfer costs',
          ]},
          { type: 'h3', text: 'Keep PNG when:' },
          { type: 'ul', items: [
            '**Design tool workflows** — Photoshop, Illustrator, Canva, and Affinity don\'t support WebP natively as an edit format',
            '**Print and prepress** — print workflows require PNG or TIFF; WebP is a web-only format',
            '**Sending to clients** — clients using standard design apps may not be able to open WebP files',
            '**Pixel-perfect lossless** — if exact pixel values must be preserved, PNG lossless is the safest choice',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser loads the PNG into a hidden HTMLImageElement. On the load event, the image — including its full alpha channel — is painted onto an HTML5 Canvas. The canvas encodes the pixel data as WebP via toBlob() at quality 0.92.' },
          { type: 'p', text: 'Quality 0.92 produces near-lossless output for logos and graphics. For photographic PNG content, lower quality settings (0.75–0.85) show no visible degradation while achieving 50–80% size reduction compared to the PNG source.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    // Alpha channel preserved — no white fill applied\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/webp', 0.92)\n  }\n  img.src = URL.createObjectURL(pngFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert PNG to WebP online for free?', answer: 'Drop your PNG files onto the converter, click "Convert all", then download. Conversion happens instantly in your browser — no upload, no account, no software needed. Batch conversion and ZIP download are both supported.' },
      { question: 'Does PNG to WebP preserve transparency?', answer: 'Yes. WebP supports full alpha-channel transparency, just like PNG. Transparent areas — whether fully transparent or semi-transparent — are preserved exactly in the WebP output. No white fill is applied.' },
      { question: 'How much smaller will the WebP be compared to PNG?', answer: 'For logos and graphics: 26–40% smaller using near-lossless quality. For photographic PNG content: 50–80% smaller. A transparent PNG logo that is 150 KB typically becomes 20–40 KB as WebP with no visible quality difference.' },
      { question: 'Is WebP supported in all browsers?', answer: 'Chrome, Firefox, Edge, and Safari 14+ all support WebP — covering 97%+ of global browser traffic. For the remaining 3%, use the HTML <picture> element to serve WebP with a PNG fallback automatically.' },
      { question: 'How do I use WebP images in HTML with a PNG fallback?', answer: 'Use the <picture> element: <picture><source type="image/webp" srcset="image.webp"><img src="image.png" alt="..."></picture>. Modern browsers load the WebP; older browsers get the PNG automatically without JavaScript.' },
      { question: 'How do I use PNG to WebP in Next.js or Nuxt?', answer: 'Next.js: use the built-in <Image> component — it automatically serves WebP to supported browsers from any PNG source. Nuxt: use <NuxtImg> which does the same. Both frameworks handle format negotiation and fallbacks automatically.' },
      { question: 'Can I convert Figma exports from PNG to WebP?', answer: 'Yes. Export your assets from Figma as PNG, then drop them onto the converter. Transparency is fully preserved, and the WebP output is production-ready for web use. The batch download as ZIP makes it easy to replace the PNG folder in your project.' },
      { question: 'Can I convert PNG to WebP on iPhone or Android?', answer: 'Yes. The converter runs in any modern mobile browser — Safari on iPhone, Chrome on Android. Tap the upload area to select files from your device, convert, and download the WebP directly to your file storage.' },
      { question: 'Does the WebP output support semi-transparent pixels?', answer: 'Yes. WebP supports full 8-bit alpha channel — the same as PNG. Semi-transparent pixels (partial opacity, drop shadows, soft edges) are preserved exactly. There is no dithering or rounding of alpha values.' },
      { question: 'What quality setting does this converter use?', answer: 'The default quality is 0.92 (92%). For logos, icons, and UI graphics, this is visually indistinguishable from lossless. For photographic PNG content you can accept lower quality — 0.80 typically produces no visible difference with even smaller output.' },
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
    title: 'JPEG to WebP — Fix LCP, Cut Image Weight Free | Abect',
    description: 'Heavy JPEG images hurt your Google LCP score. Convert to WebP — 25–34% smaller files, same visual quality, browser-based with no upload required. Try now.',
    h1: 'JPEG to WebP Converter — Improve LCP and Cut Image Weight',
    sub: 'Convert JPEG to WebP and improve Core Web Vitals — 25–34% smaller product photos, processed entirely in your browser.',
    howTo: [
      'Drop your JPEG files onto the converter above — files with .jpeg or .jpg extension are both accepted.',
      'Click Convert on any individual file, or Convert all to process your entire batch at once.',
      'Download individually or click Download all for a single ZIP archive.',
      'Tip: keep the original JPEG as a fallback — use the HTML <picture> element to serve WebP to modern browsers and JPEG to older ones.',
    ],
    sections: [
      {
        heading: 'Local conversion — no upload, no file size cap',
        blocks: [
          { type: 'p', text: 'All JPEG files are converted locally in your browser. No upload means no file size cap and no wait time — convert a 500-image product catalog without sending a single file to an external server.' },
          { type: 'p', text: 'Once the page loads, conversion runs fully offline. Process a photo shoot on a laptop without reliable Wi-Fi — disconnect after page load and the converter continues working without interruption.' },
          { type: 'code', label: 'JPEG → WebP via Canvas API', code: `// JPEG has no transparency — direct encode to WebP\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// 0.92 quality: visually identical, 25–34% smaller\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
      {
        heading: 'Who converts JPEG to WebP',
        blocks: [
          { type: 'p', text: 'Shopify and WooCommerce store owners converting product photography to WebP for faster storefronts. Product images are often the Largest Contentful Paint (LCP) element — reducing their weight by 25–34% directly improves Google\'s Core Web Vitals score.' },
          { type: 'p', text: 'Photographers delivering client galleries who offer a web-optimized download option. Converting a JPEG gallery to WebP before upload reduces storage costs and client download times by 25–34%.' },
          { type: 'p', text: 'Blog and content teams converting post images for WordPress or Ghost. Smaller WebP images mean lower CDN costs, faster Time to First Byte, and better scores in PageSpeed Insights and Lighthouse.' },
        ],
      },
      {
        heading: 'JPEG vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'JPEG', 'WebP'], rows: [
            ['Compression', 'Lossy — 1992 algorithm', 'Lossy/lossless — 2010 algorithm'],
            ['File size', 'Baseline', '25–34% smaller'],
            ['Transparency', 'None', 'Full alpha channel'],
            ['Animation', 'No', 'Yes'],
            ['Metadata', 'EXIF, XMP, ICC', 'EXIF, XMP, ICC'],
            ['Browser support', '100%', '97%+'],
            ['Best for', 'Universal compatibility', 'Modern web delivery'],
          ]},
        ],
      },
      {
        heading: 'When to switch to WebP vs keep JPEG',
        blocks: [
          { type: 'h3', text: 'Convert JPEG to WebP when:' },
          { type: 'ul', items: [
            '**Shopify / WooCommerce** — product images are the LCP element; WebP reduces load time directly',
            '**WordPress 5.8+** — natively supports WebP uploads; your theme serves them automatically',
            '**Next.js / Nuxt / Gatsby** — image components auto-serve WebP with JPEG fallback',
            '**CDN delivery** — WebP files consume 25–34% less bandwidth and storage cost',
            '**Core Web Vitals** — LCP improvement from smaller images contributes to better Google ranking',
          ]},
          { type: 'h3', text: 'Keep JPEG when:' },
          { type: 'ul', items: [
            '**Email campaigns** — Outlook and most email clients don\'t render WebP',
            '**Print and photography** — JPEG is the standard for print delivery and stock photo submissions',
            '**Legacy CMS platforms** — older systems may not accept WebP in media libraries',
            '**Maximum compatibility needed** — JPEG works in 100% of browsers, apps, and viewers',
          ]},
        ],
      },
      {
        heading: 'How the conversion works — and how to serve WebP safely',
        blocks: [
          { type: 'p', text: 'Your browser loads the JPEG into a hidden HTMLImageElement. On the load event, the image is painted onto an HTML5 Canvas, then encoded as WebP via toBlob() at quality 0.92 — equivalent perceptual quality to the source, 25–34% smaller.' },
          { type: 'p', text: 'To serve WebP with a JPEG fallback for older browsers, use the HTML <picture> element. Browsers that support WebP load it automatically; others fall back to the JPEG without any JavaScript.' },
          { type: 'code', label: 'Serving WebP with JPEG fallback', code: `<picture>\n  <source type="image/webp" srcset="photo.webp">\n  <img src="photo.jpg" alt="Product photo" width="800" height="600">\n</picture>\n\n<!-- Next.js handles this automatically: -->\n<Image src="/photo.jpg" alt="Product" width={800} height={600} />` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert JPEG to WebP online?', answer: 'Drop your JPEG files onto the converter, click "Convert all", then download. Both .jpg and .jpeg extensions are accepted. Everything runs in your browser — no upload, no signup, no file size cap.' },
      { question: 'Is JPEG the same as JPG?', answer: 'Yes. JPEG is the full format name (Joint Photographic Experts Group); JPG is the 3-character extension that became default on Windows. Both refer to the identical format — same algorithm, same quality, processed identically by every tool and browser.' },
      { question: 'How much smaller will WebP be than JPEG?', answer: 'Typically 25–34% smaller at equivalent visual quality. A 1 MB JPEG becomes roughly 660–750 KB as WebP. For a Shopify store with 500 product images, this saves hundreds of megabytes of total image weight.' },
      { question: 'Does converting JPEG to WebP affect quality?', answer: 'At quality 0.92, the visual difference is undetectable at normal viewing sizes. WebP\'s compression algorithm is more efficient than JPEG\'s — it achieves smaller files without the blockiness or color noise that JPEG shows at equivalent compression ratios.' },
      { question: 'How do I serve WebP on my website with a JPEG fallback?', answer: 'Use the HTML <picture> element: <picture><source type="image/webp" srcset="photo.webp"><img src="photo.jpg" alt="..."></picture>. Modern browsers (97%+) load the WebP; others fall back to JPEG automatically.' },
      { question: 'Does JPEG to WebP improve Google PageSpeed / Core Web Vitals?', answer: 'Yes. Product images are typically the Largest Contentful Paint (LCP) element on e-commerce pages. Reducing their weight by 25–34% via WebP conversion lowers LCP time, which directly improves Google\'s Core Web Vitals score and can improve search ranking.' },
      { question: 'Does WebP support transparency unlike JPEG?', answer: 'Yes. WebP supports full alpha-channel transparency; JPEG has none. If you later need a transparent version of the image, WebP supports it — JPEG would require a separate conversion to PNG.' },
      { question: 'How do I add WebP to WordPress?', answer: 'WordPress 5.8+ natively accepts WebP file uploads — go to Media > Add New and upload the .webp file directly. Your theme and image blocks serve it automatically. For older WordPress versions, use the WebP Express or Imagify plugin.' },
      { question: 'Can I convert JPEG to WebP on iPhone or Android?', answer: 'Yes. The converter runs in any modern mobile browser — Safari on iPhone, Chrome on Android. Select files from your camera roll or file storage, convert, and download the WebP directly to your device.' },
      { question: 'Does JPEG to WebP preserve EXIF metadata?', answer: 'No. The Canvas API reads pixel data only — EXIF data (camera model, GPS, date) is not transferred to the WebP output. If you need to retain metadata, use a command-line tool like cwebp with the -metadata all flag.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['jpg-to-webp', 'jpeg-to-png', 'png-to-webp'],
  },

  'gif-to-webp': {
    from: 'gif', to: 'webp',
    title: 'Fix GIF Color Banding — Convert to WebP Free | Abect',
    description: 'GIF\'s 256-color limit causes visible banding on photos and gradients. Convert to WebP — 16M colors, 50–80% smaller, processed entirely in your browser. Try now.',
    h1: 'GIF to WebP Converter — Full Color, 50–80% Smaller',
    sub: 'Convert GIF to WebP and escape 256-color banding — 50–80% smaller files, full alpha transparency, processed entirely in your browser.',
    howTo: [
      'Drop your GIF files onto the converter above — or click to browse.',
      'Click Convert on any file, or Convert all to process your entire batch at once.',
      'Download each WebP individually or click Download all for a ZIP archive.',
      'Note: only the first frame is exported as static WebP. For animated WebP, use FFmpeg or Ezgif.',
    ],
    sections: [
      {
        heading: 'Private and instant — no upload needed',
        blocks: [
          { type: 'p', text: 'Every GIF you drop is converted entirely inside your browser. No file ever reaches a server — processing happens on your device through the Canvas API, invisible to any third party.' },
          { type: 'p', text: 'Conversions are instant even without fast internet. Once the page has loaded, the tool works fully offline — useful when converting sensitive graphics or working on a slow connection.' },
          { type: 'code', label: 'GIF → WebP (first frame only)', code: `// Canvas API renders first GIF frame, then encodes as WebP\nconst img = new Image()\nimg.src = URL.createObjectURL(gifFile)\nconst ctx = canvas.getContext('2d')\nctx.drawImage(img, 0, 0)  // captures first frame\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
      {
        heading: 'Who uses GIF to WebP conversion',
        blocks: [
          { type: 'p', text: 'Web designers migrating legacy icon sets and UI sprites from early 2000s tools. Many older design systems shipped GIF-only assets — converting to WebP eliminates color banding and cuts the icon folder size by 60–80%.' },
          { type: 'p', text: 'Marketing teams updating product graphics for Shopify or WooCommerce stores. Banner images exported as GIF look noticeably sharper as WebP, especially on high-DPI retina displays.' },
          { type: 'p', text: 'Developers cleaning up legacy repos where GIF banners still appear in public/ or assets/ folders. Converting the first frame to WebP creates a sharp static placeholder while animated content loads lazily.' },
        ],
      },
      {
        heading: 'GIF vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'GIF', 'WebP'], rows: [
            ['Compression', 'LZW — low efficiency', 'Advanced — lossy & lossless'],
            ['Transparency', '1-bit on/off only', 'Full alpha channel'],
            ['Animation', 'Yes (email + browser)', 'Yes (browser only)'],
            ['File size', 'Baseline', '50–80% smaller'],
            ['Metadata', 'XMP only', 'EXIF, XMP, ICC profiles'],
            ['Browser support', '100%', '97%+'],
            ['Best for', 'Email, legacy tools', 'Web, modern browsers'],
          ]},
        ],
      },
      {
        heading: 'When to use WebP vs keep GIF',
        blocks: [
          { type: 'h3', text: 'Convert to WebP when:' },
          { type: 'ul', items: [
            '**Web pages** — WebP loads faster and looks sharper on all screen densities',
            '**Shopify / WooCommerce** — product and category images benefit from full color and smaller size',
            '**WordPress** — WordPress 5.8+ serves WebP natively; themes use it automatically',
            '**Static images** — any non-animated GIF is strictly worse than its WebP equivalent',
            '**Retina displays** — WebP\'s full color palette eliminates dithering artifacts on high-DPI screens',
          ]},
          { type: 'h3', text: 'Keep GIF when:' },
          { type: 'ul', items: [
            '**Email newsletters** — Outlook and most mobile email clients do not support WebP',
            '**Animation is required** — this tool exports only the first frame; use FFmpeg for animated WebP',
            '**Legacy CMS platforms** — some older systems may not accept WebP uploads',
            '**100% compatibility** — GIF works in every browser, email client, and image viewer ever made',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser loads the GIF into a hidden HTMLImageElement. When it fires its load event, the browser renders the first frame onto an HTML5 Canvas. The canvas then encodes the pixel data as WebP via the toBlob() API.' },
          { type: 'p', text: 'The default quality of 0.92 gives near-lossless visual output with significant compression over GIF. For icons and simple graphics, reducing quality to 0.80 produces no visible difference and even smaller files.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    canvas.toBlob(resolve, 'image/webp', 0.92)\n  }\n  img.src = URL.createObjectURL(gifFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert GIF to WebP online?', answer: 'Drop your GIF files onto the converter, click "Convert all", then download. Every file is processed in your browser — no upload required, no signup, no file size limits from a server.' },
      { question: 'Does converting GIF to WebP preserve animation?', answer: 'No — this converter exports only the first frame as a static WebP image. WebP does support animation and is far more efficient than GIF for it, but animated conversion requires a dedicated tool like FFmpeg or Ezgif.com.' },
      { question: 'How much smaller will the WebP be?', answer: 'For static GIFs, expect 50–80% smaller files with noticeably better color accuracy. WebP supports 16.7 million colors versus GIF\'s 256, and its compression algorithm consistently outperforms GIF\'s LZW for both photographic and illustrated content.' },
      { question: 'Does GIF to WebP preserve transparency?', answer: 'Yes. GIF\'s 1-bit transparency (fully on or off) is preserved in the WebP output as full alpha-channel transparency — which is actually superior, allowing smooth semi-transparent edges in the converted file.' },
      { question: 'Why do my GIF images have color banding?', answer: 'GIF is limited to a 256-color palette, so the encoder uses dithering and color approximation on photos and gradients. WebP supports 16.7 million colors and eliminates this entirely — the converted file will look noticeably sharper.' },
      { question: 'How do I convert animated GIF to animated WebP?', answer: 'This tool converts only the first frame. For animated WebP use FFmpeg: `ffmpeg -i input.gif output.webp`. Ezgif.com also offers a browser-based animated GIF to WebP converter.' },
      { question: 'Do all browsers support WebP?', answer: 'Chrome, Firefox, Edge, and Safari 14+ all support WebP — covering 97%+ of global traffic. The main exception is email clients: Outlook and many mobile email apps do not render WebP. For web use, WebP is fully safe.' },
      { question: 'Can I convert GIF to WebP on iPhone or Android?', answer: 'Yes. The converter runs entirely in the browser — Chrome and Safari on iOS and Android both support the Canvas API and WebP encoding. No app installation needed.' },
      { question: 'Is the conversion lossless?', answer: 'The default quality is 0.92 — near-lossless and visually identical to the original for icons and simple graphics. For pixel-perfect lossless output, use a command-line tool like cwebp with the -lossless flag.' },
      { question: 'What is the maximum file size I can convert?', answer: 'There is no server-side limit. The practical limit is your device\'s available RAM — typically 50–100 MB per file on a modern device. For very large GIFs, closing other browser tabs frees up memory.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['gif-to-jpg', 'gif-to-png', 'png-to-webp'],
  },

  'bmp-to-webp': {
    from: 'bmp', to: 'webp',
    title: 'Turn a 20 MB BMP into a 200 KB WebP — Free | Abect',
    description: 'BMP is completely uncompressed — a 20 MB file that does nothing for the web. Convert to WebP: 95–99% smaller, no upload, no visible quality loss. Try now.',
    h1: 'BMP to WebP Converter — 95–99% Smaller, Web-Ready Instantly',
    sub: 'Convert raw BMP files to lightweight WebP — 95–99% size reduction, processed entirely in your browser. No upload.',
    howTo: [
      'Drop your BMP files onto the converter above — or click to browse and select files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: BMP is uncompressed — a 20 MB BMP commonly becomes 100–400 KB as WebP. Expect dramatic reduction.',
    ],
    sections: [
      {
        heading: 'Large BMP files converted locally — no upload, no timeout',
        blocks: [
          { type: 'p', text: 'BMP files are some of the largest image files you\'ll encounter — 6 MB for a standard screenshot, 25+ MB for a 4K photo. Server-based converters struggle with them. This tool processes BMP files locally — no upload, no timeout, no file size limit from the network.' },
          { type: 'p', text: 'WebP encoding via the Canvas API is CPU-bound — a 20 MB BMP converts in under 2 seconds on most modern devices. The tool continues to work offline after the page has loaded.' },
          { type: 'code', label: 'BMP → WebP via Canvas API', code: `// BMP has no transparency — direct encode to WebP\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\ncanvas.getContext('2d').drawImage(img, 0, 0)\n// 20 MB BMP → ~200 KB WebP at quality 0.92\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
      {
        heading: 'Who converts BMP to WebP',
        blocks: [
          { type: 'p', text: 'Organizations migrating legacy media libraries from Windows file servers or old intranet systems. Converting bulk BMP archives to WebP makes them web-ready and cuts storage requirements by 95–99% — without re-engineering the original capture pipeline.' },
          { type: 'p', text: 'Windows administrators publishing BMP screenshots from monitoring dashboards or legacy reporting tools to web-based documentation. Batch converting to WebP makes them deployable without changing the original capture workflow.' },
          { type: 'p', text: 'Game developers converting BMP texture exports from older art tools like 3ds Max or Maya. Many legacy pipelines output BMP — converting to WebP for web previews and documentation cuts asset package sizes dramatically.' },
        ],
      },
      {
        heading: 'BMP vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'BMP', 'WebP'], rows: [
            ['Compression', 'None — raw pixels', 'Advanced lossy / lossless'],
            ['File size (1920×1080)', '~6 MB', '60–200 KB'],
            ['File size (4K photo)', '~25 MB', '250–800 KB'],
            ['Transparency', 'No', 'Full alpha channel'],
            ['Web browser support', 'No', '97%+'],
            ['Storage efficiency', 'Worst — uncompressed', 'Excellent'],
            ['Best for', 'Windows internal use', 'Web delivery'],
          ]},
        ],
      },
      {
        heading: 'When to convert to WebP vs PNG or JPG',
        blocks: [
          { type: 'h3', text: 'Convert BMP to WebP when:' },
          { type: 'ul', items: [
            '**Web publishing** — WebP is the most efficient format for modern web delivery',
            '**CDN and storage** — 95–99% reduction slashes bandwidth and storage costs for image libraries',
            '**WordPress / Shopify** — upload WebP directly; both platforms natively support it',
            '**Next.js / Nuxt** — image components serve WebP automatically for best performance',
            '**Legacy archive migration** — convert thousands of BMP files to web-ready WebP in one batch',
          ]},
          { type: 'h3', text: 'Convert BMP to PNG instead when:' },
          { type: 'ul', items: [
            '**Lossless editing needed** — PNG preserves every pixel exactly for design workflows',
            '**Screenshots with text or UI** — PNG keeps sharp edges; WebP at quality 0.92 may soften them slightly',
            '**Photoshop / Figma workflow** — design tools prefer PNG for editing; use WebP only for final web export',
            '**100% browser compatibility** — PNG is supported everywhere including older systems',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser draws the BMP onto an HTML5 Canvas, then encodes the pixels as WebP via toBlob() at quality 0.92. BMP has no transparency, so no white fill is applied — pixel values are captured directly and re-encoded with WebP\'s advanced compression.' },
          { type: 'p', text: 'Quality 0.92 produces near-lossless output — the visual difference from the uncompressed BMP is imperceptible at normal viewing sizes. For photographic BMP content, even lower settings (0.80–0.85) show no visible degradation.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    canvas.getContext('2d').drawImage(img, 0, 0)\n    // 20 MB BMP → ~200 KB WebP at q=0.92\n    canvas.toBlob(resolve, 'image/webp', 0.92)\n  }\n  img.src = URL.createObjectURL(bmpFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert BMP to WebP online?', answer: 'Drop your BMP files onto the converter, click "Convert all", then download. Large BMP files are processed locally in your browser — no upload, no timeout, no server file size limit.' },
      { question: 'How much smaller will the WebP be compared to BMP?', answer: 'Typically 95–99% smaller. A 20 MB BMP photo usually becomes 200–400 KB as WebP at quality 0.92. BMP is completely uncompressed, so any compressed format delivers dramatic savings — WebP delivers the best ratio.' },
      { question: 'Is there visible quality loss when converting BMP to WebP?', answer: 'At quality 0.92, the visual difference is imperceptible for photographs at normal viewing sizes. For pixel-perfect lossless output, convert to PNG instead. WebP at 0.92 is the right choice when file size matters more than absolute pixel fidelity.' },
      { question: 'Can I use the converted WebP files on a website?', answer: 'Yes. WebP is supported in Chrome, Firefox, Edge, and Safari 14+ — covering 97%+ of browsers. The converted files are ready to use directly in HTML or upload to WordPress, Shopify, or any modern CMS.' },
      { question: 'Why is BMP so much larger than WebP?', answer: 'BMP stores raw uncompressed pixel data — a 1920×1080 image at 24-bit color is approximately 6 MB of raw bytes. WebP applies an advanced compression algorithm that discards imperceptible detail, reducing the same image to 60–200 KB.' },
      { question: 'Should I use BMP to WebP or BMP to PNG?', answer: 'WebP for web delivery — it gives the smallest files (95–99% smaller than BMP) while maintaining excellent quality. PNG for editing and lossless workflows — it is pixel-perfect but larger than WebP. For screenshots with text, PNG is better; for photographs going to the web, WebP wins.' },
      { question: 'Can I batch convert a whole folder of BMP files to WebP?', answer: 'Yes. Drop all BMP files at once, click "Convert all", then "Download all" to get a ZIP archive with every WebP file. There is no file count limit — process hundreds of BMP files in one session.' },
      { question: 'Does BMP to WebP preserve transparency?', answer: 'Standard 24-bit BMP files have no transparency, so none is lost. The WebP output is fully opaque — both formats agree on this. If you later need transparency in the WebP, you would need to add it manually in an editor.' },
      { question: 'Can I convert BMP to WebP on Windows without installing software?', answer: 'Yes. This browser-based converter works in Chrome, Firefox, or Edge on Windows — no installation, no admin rights required. Drop the BMP, convert, download the WebP in seconds.' },
      { question: 'How do I use WebP images in HTML?', answer: 'Use the <picture> element for maximum compatibility: <picture><source type="image/webp" srcset="image.webp"><img src="image.jpg" alt="..."></picture>. Or upload the WebP directly to WordPress, Shopify, or Next.js — all handle WebP natively.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['bmp-to-jpg', 'bmp-to-png', 'png-to-webp'],
  },

  'avif-to-webp': {
    from: 'avif', to: 'webp',
    title: 'AVIF to WebP — When Your CMS Won\'t Accept AVIF Yet | Abect',
    description: 'Optimized to AVIF but your CMS, image plugin, or CDN rejects it? Convert to WebP — 97% browser support, still 25–34% smaller than JPG. No upload. Try now.',
    h1: 'AVIF to WebP Converter — When Your Pipeline Needs Broader Support',
    sub: 'Convert AVIF to WebP for 97% browser coverage when your CMS, CDN, or image pipeline doesn\'t handle AVIF yet. No upload.',
    howTo: [
      'Drop AVIF files onto the converter above — or click to browse and select files.',
      'Click Convert on any individual file, or Convert all to process the entire batch.',
      'Download your WebP files individually, or click Download all for a ZIP archive.',
      'Tip: both AVIF and WebP support transparency — the alpha channel is preserved in the WebP output.',
    ],
    sections: [
      {
        heading: 'AVIF converted to WebP locally — no upload, no pipeline dependency',
        blocks: [
          { type: 'p', text: 'AVIF images from your CDN, image optimizer, or design tool never leave your device. All conversion happens in your browser via the built-in AVIF decoder and Canvas API — no server, no file size limit, no account required.' },
          { type: 'p', text: 'Even large AVIF files convert in under a second. The tool works offline after the page loads — useful when debugging pipeline issues without internet access, or when processing images from internal test environments.' },
          { type: 'code', label: 'AVIF decoded locally — no pipeline dependency', code: `// AVIF decoded by the browser's native decoder\nconst img = new Image()\nimg.src = URL.createObjectURL(avifFile)\n// Re-encode as WebP at quality 0.92\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
      {
        heading: 'Why you\'d convert AVIF to WebP in production',
        blocks: [
          { type: 'p', text: 'WordPress image optimization plugins — Smush, ShortPixel, Imagify — added AVIF support at different times. If your auto-optimizer produces AVIF but your media library or CDN config doesn\'t serve it correctly, converting to WebP gives you a fallback every plugin version handles.' },
          { type: 'p', text: 'Shopify, Squarespace, and Webflow media uploaders have inconsistent AVIF handling. WebP uploads cleanly and is fully supported across all Shopify tiers and CDN configurations — no edge cases, no broken previews.' },
          { type: 'p', text: 'Legacy browser segments still matter for some audiences. iOS devices on iOS 15 or earlier don\'t display AVIF. If your analytics show significant traffic from these users, WebP\'s 97% support covers the gap while still delivering images 25–34% smaller than JPG.' },
        ],
      },
      {
        heading: 'AVIF vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'AVIF', 'WebP'], rows: [
            ['Compression efficiency', 'Best — ~50% smaller than JPG', 'Excellent — 25–34% smaller than JPG'],
            ['Browser support', '~90% (Chrome, Firefox, Safari 16+)', '97%+'],
            ['CMS / plugin support', 'Emerging (2021+)', 'Widely supported'],
            ['Transparency (alpha)', 'Yes', 'Yes'],
            ['Animation', 'Yes', 'Yes (animated WebP)'],
            ['CDN auto-format', 'Most major CDNs (2022+)', 'All major CDNs'],
            ['Re-save degradation', 'Lossless: none; Lossy: yes', 'Lossless: none; Lossy: yes'],
          ]},
        ],
      },
      {
        heading: 'When to choose WebP vs AVIF for web delivery',
        blocks: [
          { type: 'h3', text: 'Convert AVIF to WebP when:' },
          { type: 'ul', items: [
            'Your **WordPress plugin** (Smush, ShortPixel, Imagify) doesn\'t serve AVIF correctly yet',
            'Uploading to **Shopify, Squarespace, or Webflow** — WebP gets full platform CDN support',
            'Serving users on **iOS 15 or older** or Android WebView environments without AVIF support',
            'Your **image CDN config** processes WebP but hasn\'t added AVIF yet',
            'You need a **WebP fallback in `<picture>`** srcset for browsers that don\'t support AVIF',
          ]},
          { type: 'h3', text: 'Keep AVIF when:' },
          { type: 'ul', items: [
            'Your **CDN** (Cloudflare, Cloudinary, Imgix) handles format negotiation automatically',
            'Targeting **modern browsers exclusively** — Chrome, Firefox, Safari 16+',
            'Maximum compression matters — **AVIF is 20–50% smaller than WebP** at the same quality',
            'Your pipeline already **generates AVIF and WebP fallbacks** via srcset/picture elements',
          ]},
        ],
      },
      {
        heading: 'How AVIF to WebP conversion works in your browser',
        blocks: [
          { type: 'p', text: 'The browser\'s native AVIF decoder — the same engine that renders AVIF images on web pages — decodes your file to a raw pixel buffer. This tool captures that buffer by drawing the decoded image onto an HTML5 Canvas element.' },
          { type: 'p', text: 'The Canvas then re-encodes the pixels as WebP at quality 0.92 via toBlob(). Both AVIF and WebP support transparency — the alpha channel is preserved through the conversion without any white fill.' },
          { type: 'code', label: 'Full AVIF → WebP pipeline', code: `const canvas = document.createElement('canvas')\nconst ctx = canvas.getContext('2d')\ncanvas.width = img.width\ncanvas.height = img.height\n// Alpha channel preserved — WebP supports transparency\nctx.drawImage(img, 0, 0)\n// quality 0.92 — still 25–34% smaller than JPG\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
    ],
    faq: [
      { question: 'Is WebP or AVIF the better format?', answer: 'AVIF achieves better compression — typically 20–50% smaller than WebP at the same quality. But WebP has broader compatibility: 97% browser support vs ~90% for AVIF, and better CMS and CDN support. For cutting-edge performance: AVIF. For reliable production compatibility: WebP.' },
      { question: 'Will the WebP be larger than the original AVIF?', answer: 'Yes. AVIF has superior compression. Converting to WebP produces a larger file — but still 25–34% smaller than an equivalent JPG. The trade-off is broader compatibility for a modest size increase.' },
      { question: 'Does AVIF to WebP preserve transparency?', answer: 'Yes. Both AVIF and WebP support full alpha-channel transparency. The alpha channel is preserved through conversion — no white fill is applied. Logos, icons, and cutouts remain fully transparent in the WebP output.' },
      { question: 'Why does Safari on older iPhones not display AVIF?', answer: 'Safari added AVIF support in iOS 16 (2022). Devices on iOS 15 or earlier don\'t support AVIF. WebP is supported from iOS 14. If your analytics show significant iOS 15 traffic, WebP is the safer delivery format.' },
      { question: 'Can WordPress serve AVIF images?', answer: 'WordPress has supported AVIF since version 6.5, but server MIME type configuration is required. Apache and Nginx need explicit AVIF support. Converting to WebP avoids this entirely — every major hosting provider and CDN handles WebP reliably without configuration.' },
      { question: 'Does my Shopify store support AVIF?', answer: 'Shopify\'s CDN can serve AVIF to capable browsers, but direct AVIF uploads may process inconsistently depending on your plan and theme. WebP uploads are fully supported across all Shopify tiers and CDN configurations without issues.' },
      { question: 'What\'s the quality difference between AVIF and WebP at quality 0.92?', answer: 'At high quality settings, AVIF and WebP are visually very similar. The main difference is file size: AVIF at the same perceived quality produces a 20–50% smaller file. For high-quality product photography, both look excellent.' },
      { question: 'Can I use a WebP as fallback in a srcset next to AVIF?', answer: 'Yes. Convert your AVIF to WebP to generate the fallback, then use a `<picture>` element with AVIF in the first `<source>` and WebP in the second. Browsers that support AVIF use it; others fall back to WebP automatically.' },
      { question: 'Is AVIF to WebP conversion lossless?', answer: 'No. The conversion decodes AVIF to raw pixels and re-encodes as WebP at quality 0.92 — high quality but not bit-for-bit identical. If you need lossless output, convert AVIF to PNG instead.' },
      { question: 'Does the converter work without an internet connection?', answer: 'Yes. Once the page has loaded, all conversion happens in your browser. Disconnect from the internet and it continues converting. Your AVIF files are never uploaded to any server.' },
      FAQ_BATCH,
      FAQ_UPLOAD,
    ],
    relatedSlugs: ['avif-to-jpg', 'avif-to-png', 'png-to-webp'],
  },

  'tiff-to-webp': {
    from: 'tiff', to: 'webp',
    title: 'TIFF to WebP — 50 MB Print File to 1 MB Web Image | Abect',
    description: 'Print-quality TIFF files don\'t belong on the web — they\'re 50–200 MB. Convert to WebP for 96–99% reduction and instant browser display. No upload. Try now.',
    h1: 'TIFF to WebP Converter — Print Quality to Web-Ready in One Step',
    sub: 'Convert print-quality TIFF to web-ready WebP — 96–99% smaller, processed locally, your masters stay private.',
    howTo: [
      'Drop your TIFF files onto the converter above — or click to browse and select files.',
      'Click Convert on any individual file, or Convert all to process the entire batch at once.',
      'Download individually or click Download all for a ZIP archive.',
      'Tip: always keep the original TIFF as your master. Use the WebP for web delivery only — never re-edit from it.',
    ],
    sections: [
      {
        heading: 'TIFF masters processed locally — no upload, no exposure',
        blocks: [
          { type: 'p', text: 'TIFF master files — often 50–200 MB of print-quality image data — are converted entirely in your browser. Whether they contain confidential product photography or unreleased print designs, no file is ever sent to a server.' },
          { type: 'p', text: 'Despite their size, TIFF files process in seconds once loaded into browser memory. The Canvas API handles the heavy lifting locally — no upload, no server queue, and the tool continues working offline.' },
          { type: 'code', label: 'TIFF → WebP via Canvas API', code: `// Transparent TIFF layers filled white — WebP lossy mode\nconst canvas = document.createElement('canvas')\ncanvas.width = img.width\ncanvas.height = img.height\nconst ctx = canvas.getContext('2d')\nctx.fillStyle = '#ffffff'\nctx.fillRect(0, 0, canvas.width, canvas.height)\nctx.drawImage(img, 0, 0)\ncanvas.toBlob(cb, 'image/webp', 0.92)` },
        ],
      },
      {
        heading: 'Who converts TIFF to WebP',
        blocks: [
          { type: 'p', text: 'Real estate photographers converting HDR-processed TIFFs for property listing websites. A 120 MB TIFF composite becomes 600–900 KB WebP — fast enough for mobile while preserving the detail that sells properties.' },
          { type: 'p', text: 'Print design agencies repurposing catalog and brochure photography for client websites. TIFF files used for magazine-quality print can be batch-converted to WebP and dropped into a CMS or Next.js project.' },
          { type: 'p', text: 'E-commerce brands receiving high-resolution TIFF product images from studio photographers for web storefronts. Converting to WebP cuts product image weight by 96–99% while maintaining quality indistinguishable from the source at any screen resolution.' },
        ],
      },
      {
        heading: 'TIFF vs WebP — format comparison',
        blocks: [
          { type: 'table', headers: ['Feature', 'TIFF', 'WebP'], rows: [
            ['Compression', 'Lossless or none', 'Lossy / lossless'],
            ['Typical file size', '50–200 MB', '500 KB–2 MB'],
            ['Browser support', 'None — not displayable', '97%+'],
            ['Quality at delivery', 'Max (uncompressed)', 'Near-lossless at q=0.92'],
            ['CDN / storage cost', 'Very high', 'Minimal'],
            ['Re-editing suitability', 'Master file — no loss', 'Delivery only'],
            ['Best for', 'Print, archiving', 'Web, CMS, e-commerce'],
          ]},
        ],
      },
      {
        heading: 'When to use WebP vs other formats for TIFF conversion',
        blocks: [
          { type: 'h3', text: 'Convert TIFF to WebP when:' },
          { type: 'ul', items: [
            '**Website publishing** — WebP is the smallest format supported natively by all modern browsers',
            '**Real estate listings** — MLS and property portals accept WebP; large TIFFs do not upload',
            '**E-commerce product pages** — smaller WebP images improve page speed and conversion rates',
            '**CDN delivery** — WebP reduces bandwidth and storage costs by 96–99% vs TIFF',
            '**Next.js / Nuxt / Shopify** — these platforms serve WebP automatically for best performance',
          ]},
          { type: 'h3', text: 'Keep TIFF for:' },
          { type: 'ul', items: [
            '**Print reprints** — TIFF preserves full resolution and color depth for any future print job',
            '**Re-editing** — always re-export WebP from TIFF; never re-edit the WebP itself',
            '**Large-format output** — fine art prints and exhibition-sized output require TIFF masters',
            '**Color grading** — TIFF supports 16/32-bit color depth; WebP is 8-bit only',
          ]},
        ],
      },
      {
        heading: 'How the conversion works',
        blocks: [
          { type: 'p', text: 'Your browser loads the TIFF into a hidden HTMLImageElement. On load, it is painted onto an HTML5 Canvas. Transparent TIFF layers are filled with white — WebP at quality 0.92 is lossy. The canvas then encodes as WebP via toBlob().' },
          { type: 'p', text: 'Quality 0.92 produces near-lossless output — visually indistinguishable from the TIFF source at any screen resolution. Always keep the original TIFF; the WebP is for web delivery only.' },
          { type: 'code', label: 'Simplified conversion pipeline', code: `const blob = await new Promise(resolve => {\n  const img = new Image()\n  img.onload = () => {\n    const canvas = Object.assign(\n      document.createElement('canvas'),\n      { width: img.width, height: img.height }\n    )\n    const ctx = canvas.getContext('2d')\n    ctx.fillStyle = '#ffffff'\n    ctx.fillRect(0, 0, img.width, img.height)\n    ctx.drawImage(img, 0, 0)\n    // 50 MB TIFF → ~1 MB WebP at q=0.92\n    canvas.toBlob(resolve, 'image/webp', 0.92)\n  }\n  img.src = URL.createObjectURL(tiffFile)\n})` },
        ],
      },
    ],
    faq: [
      { question: 'How do I convert TIFF to WebP online?', answer: 'Drop your TIFF files onto the converter, click "Convert all", then download. Large TIFF files may take a moment to load into browser memory — the conversion itself is instant. No upload or software required.' },
      { question: 'How much smaller will the WebP be than the TIFF?', answer: 'Typically 96–99% smaller. A 50 MB TIFF photo usually becomes 500 KB–2 MB as WebP at quality 0.92. TIFF is often stored uncompressed, so the compression ratio going to WebP is extreme.' },
      { question: 'Is there visible quality loss when converting TIFF to WebP?', answer: 'At quality 0.92, the visual difference is imperceptible at normal screen viewing sizes and standard display resolutions. For absolutely lossless output with zero quality compromise, convert to PNG instead.' },
      { question: 'Should I use WebP or JPG when converting TIFF for the web?', answer: 'WebP is 25–34% smaller than JPG at equivalent quality and is now supported by 97%+ of browsers. WebP is the better choice for modern web delivery. Use JPG only for platforms or services that don\'t support WebP yet.' },
      { question: 'Will the converted WebP work on my website?', answer: 'Yes. WebP is supported in Chrome, Firefox, Safari 14+, and Edge — covering 97%+ of global browser traffic. For older browsers, use the <picture> element to serve WebP with a JPG or PNG fallback.' },
      { question: 'Should I delete the TIFF after converting to WebP?', answer: 'No — always keep the original TIFF as your master file. The WebP is for web delivery only. If you need to re-edit, always work from the TIFF. Re-editing from WebP accumulates quality loss with each round.' },
      { question: 'Can I convert TIFF photos from a camera or scanner to WebP?', answer: 'Yes. TIFF files from Canon, Nikon, or Sony cameras (RAW-to-TIFF exports), as well as scanned TIFFs from flatbed scanners, are all supported. Drop the files onto the converter and download the web-ready WebP files.' },
      { question: 'What happens to TIFF transparency when converting to WebP?', answer: 'Transparent TIFF layers are filled with white in the WebP output when using lossy mode (quality 0.92). WebP does support transparency in lossless mode, but the Canvas API uses lossy encoding by default.' },
      { question: 'Can I use the WebP in WordPress or Shopify?', answer: 'Yes. WordPress 5.8+ and Shopify both natively support WebP uploads. Upload the converted WebP directly through the media library — no plugins or configuration needed for either platform.' },
      { question: 'How do I batch convert a folder of TIFF files to WebP?', answer: 'Drop all TIFF files onto the converter at once, click "Convert all", then "Download all" to get a ZIP archive with all converted WebP files. There is no limit on the number of files per session.' },
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
