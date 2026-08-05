const FAQ_UPLOAD = {
  question: 'Are my files uploaded to a server?',
  answer: 'No. All compression happens directly in your browser using the Canvas API. Your files never leave your device — no uploads, no server processing, 100% private.',
}

const FAQ_BATCH = {
  question: 'Can I compress multiple files at once?',
  answer: 'Yes. Drop as many files as you need and click "Compress all" to process everything at once. Click "Download all" to get a single ZIP archive with all compressed files.',
}

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
    sections: [
      {
        heading: 'Your photos stay on your device — 100% private',
        blocks: [
          { type: 'p', text: 'Most online image compressors upload your file to a server, compress it there, and hand back a download link. Your photo sits on infrastructure you do not control, for a retention period you were never told. This tool does none of that: **compression runs inside your browser tab**, using the same Canvas API that every browser already ships.' },
          { type: 'p', text: 'That has one consequence worth stating plainly — there is no upload progress bar because there is no upload. Open DevTools, switch to the Network panel, and compress a file: you will see zero outgoing requests carrying image data. Once the page has loaded you can even disconnect from the network and the compressor keeps working.' },
          { type: 'code', label: 'JavaScript', code: `// This is the entire pipeline — it never touches a server
const img = new Image()
img.src = URL.createObjectURL(file)   // read the local file
// …
canvas.getContext('2d').drawImage(img, 0, 0)
canvas.toBlob(blob => download(blob), 'image/jpeg', 0.82)` },
          { type: 'p', text: 'For client work this matters. Product shots under embargo, internal screenshots, photos of documents — none of it should be passing through a stranger\'s server just to lose a few hundred kilobytes.' },
        ],
      },
      {
        heading: 'What is JPG compression and when should you use it?',
        blocks: [
          { type: 'p', text: 'JPG (or JPEG) uses **lossy** compression — it discards image data that the human eye is least likely to notice in order to achieve smaller files. The quality slider controls how aggressively that happens: higher quality keeps more data and produces larger files, lower quality throws more away and produces smaller files with visible artifacts.' },
          { type: 'p', text: 'Technically, the encoder converts the image to a colour space that separates brightness from colour, subsamples the colour channels (your eye is far more sensitive to brightness than to hue), splits the image into 8×8 pixel blocks, and rounds off the fine detail in each block. The quality value decides how much rounding happens. That is why JPG artifacts look like blocky squares and haloes around sharp edges — you are seeing those 8×8 blocks.' },
          { type: 'h3', text: 'When JPG compression saves you the most' },
          { type: 'ul', items: [
            '**Photographs** and complex images with many colours and soft gradients — this is exactly what JPG was designed for',
            '**Web pages that need to load fast** — images are usually the heaviest thing on a page, so this is the quickest Core Web Vitals win available',
            '**Email attachments** — most corporate mail servers reject anything over 10–25 MB',
            '**Social media uploads** — platforms re-compress whatever you upload, so uploading a pre-compressed file gives you control over how it looks instead of leaving it to their encoder',
          ]},
          { type: 'h3', text: 'When JPG is the wrong tool' },
          { type: 'ul', items: [
            '**Anything with transparency** — JPG has no alpha channel, transparent pixels become solid white',
            '**Logos, icons, screenshots, text** — sharp edges get haloes; use PNG or WebP instead',
            '**Master files you will keep editing** — every save is another generation of loss',
          ]},
        ],
      },
      {
        heading: 'JPG quality settings — what each level actually costs',
        blocks: [
          { type: 'p', text: 'Percentages in the slider are not a linear scale of "how good it looks". Below is what each band realistically produces for a typical 12-megapixel photograph.' },
          { type: 'table', headers: ['Quality', 'Typical size cut', 'What you see', 'Use it for'], rows: [
            ['95–100%', '10–25%', 'Visually identical to the original; files stay large', 'Archival copies, print masters'],
            ['85–90%', '40–60%', 'No visible difference at 100% zoom on a photo', 'Portfolio images, product photography, hero images'],
            ['75–85%', '50–70%', 'Artifacts visible only when pixel-peeping', 'The default for almost all web use'],
            ['60–75%', '70–80%', 'Soft haloes around edges, slight gradient banding', 'Blog body images, backgrounds, gallery grids'],
            ['40–60%', '80–90%', 'Clearly visible blocking in flat areas', 'Thumbnails, previews, placeholders'],
            ['Below 40%', '90%+', 'Obvious 8×8 blocks, colour smearing', 'Only when size matters more than looks'],
          ]},
          { type: 'p', text: 'If you are unsure, start at 80%, compress, and click the preview thumbnail to inspect the result full-screen before you download. Adjust and re-compress — nothing is committed until you download.' },
        ],
      },
      {
        heading: 'Generation loss — why you should always compress from the original',
        blocks: [
          { type: 'p', text: 'JPG compression is not idempotent. Compressing an already-compressed JPG does not simply "keep the current quality" — the encoder starts from the artifacts left by the previous pass and adds its own on top. Do this a few times and flat areas turn muddy, edges pick up haloes, and colours drift. This is called **generation loss**, and it cannot be undone.' },
          { type: 'ul', items: [
            'Always compress from the **original camera file or export**, not from a copy someone sent you over a messenger',
            'Keep the original somewhere — this tool never modifies your source file, but it also cannot recover one you have overwritten',
            'If you need to edit later, edit the original and compress at the end, not the other way round',
            'Screenshots pasted from a chat app have usually been compressed at least once already',
          ]},
        ],
      },
      {
        heading: 'How browser-based JPG compression works under the hood',
        blocks: [
          { type: 'p', text: 'Every step below happens inside the browser tab, in memory. No file is written to disk until you click download, and nothing is sent anywhere.' },
          { type: 'code', label: 'JavaScript', code: `// 1. Read the file the user dropped — a local Blob URL, no network
const img = new Image()
const url = URL.createObjectURL(file)

img.onload = () => {
  // 2. Draw it onto an off-screen canvas at its native resolution
  const canvas  = document.createElement('canvas')
  canvas.width  = img.naturalWidth
  canvas.height = img.naturalHeight
  canvas.getContext('2d').drawImage(img, 0, 0)

  // 3. Re-encode. The browser's own JPEG encoder does the work.
  //    quality is 0–1 — the slider value divided by 100.
  canvas.toBlob(
    (blob) => {
      URL.revokeObjectURL(url)   // 4. free the memory immediately
      resolve(blob)              // 5. hand back an in-memory Blob
    },
    'image/jpeg',
    0.82,
  )
}

img.src = url` },
          { type: 'p', text: 'Two side effects are worth knowing about. First, drawing to a canvas **strips all metadata** — EXIF, GPS coordinates, camera model, embedded colour profile and thumbnails are gone from the output. That is usually a privacy bonus, but if you need to keep copyright or orientation tags, note that they will not survive. Second, because the source is decoded to raw pixels first, **any input format works** — drop a PNG, WebP, AVIF, TIFF or BMP and you get a compressed JPG out of it.' },
          { type: 'p', text: 'Batch downloads are assembled the same way: each compressed Blob is added to a ZIP archive built in memory by JSZip, then handed to the browser as a single download.' },
        ],
      },
    ],
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
      {
        question: 'Does compressing remove EXIF data and GPS location from my photos?',
        answer: 'Yes. The image is redrawn onto a canvas before re-encoding, which discards all metadata — EXIF, GPS coordinates, camera model, timestamps, embedded thumbnails and colour profiles. This is a privacy benefit when sharing photos publicly, but if you need to keep copyright tags or orientation data, compress a copy and archive the original.',
      },
      {
        question: 'Is there a file size or file count limit?',
        answer: 'There is no limit imposed by the tool — no daily quota, no maximum file size, no cap on how many files you drop in. The practical ceiling is your browser tab\'s memory: images are decoded to raw pixels, so a 50-megapixel photo needs roughly 200 MB of RAM while it is being processed. If a very large batch stalls, split it into smaller groups.',
      },
      {
        question: 'Why is my compressed file larger than the original?',
        answer: 'This happens when the original was already compressed harder than your current quality setting, or when the source was a PNG screenshot of flat colours — a format JPG handles poorly. Lower the quality slider, or use the PNG or WebP compressor instead, which suit flat graphics much better.',
      },
      {
        question: 'Does compression change the image dimensions?',
        answer: 'No. The output keeps the exact pixel dimensions of the original — compression reduces file size by re-encoding, not by resizing. If you also need smaller dimensions, resize the image first in an editor, then compress the result here.',
      },
    ],
    relatedSlugs: ['compress-png', 'compress-webp', 'jpg-to-webp', 'jpg-to-png'],
  },

  'compress-png': {
    format: 'png',
    title: 'Compress PNG Online — Reduce PNG File Size Free | Abect',
    description: 'Compress PNG images online — free, instant, lossless. Strip metadata, re-encode PNGs to reduce file size without quality loss. No uploads, no signup.',
    h1: 'PNG Image Compressor',
    sub: 'Reduce PNG file size in your browser — lossless compression, files never leave your device.',
    howTo: [
      'Drop your PNG or other image files onto the compressor above — or click to browse.',
      'Click Compress on a single file or Compress all to process everything in one go.',
      'Download files individually or click Download all for a ZIP archive of all compressed PNGs.',
      'Tip: if you need even smaller files, try the WebP compressor — WebP achieves 25–35% smaller sizes than PNG with the same visual quality.',
    ],
    sections: [
      {
        heading: 'Your files stay on your device — 100% private',
        blocks: [
          { type: 'p', text: 'PNG is the format people use for screenshots, and screenshots are the single most sensitive kind of image a developer handles — dashboards, internal tools, client admin panels, error pages with real customer data in them. Uploading those to an unknown compression service to save a few hundred kilobytes is a bad trade.' },
          { type: 'p', text: '**This compressor never uploads anything.** The file is read locally, re-encoded by the browser\'s own PNG encoder, and handed back as an in-memory download. Open DevTools → Network while you compress: no request carries your image. Disconnect from the network afterwards and it still works.' },
          { type: 'code', label: 'JavaScript', code: `// No quality argument for PNG — the encoding is always lossless
canvas.getContext('2d').drawImage(img, 0, 0)
canvas.toBlob(blob => download(blob), 'image/png')` },
        ],
      },
      {
        heading: 'What is PNG compression and how does it work?',
        blocks: [
          { type: 'p', text: 'PNG uses **lossless** compression — every pixel comes out exactly as it went in. Nothing is approximated and nothing is discarded, which is the opposite of how JPG works. That is what makes PNG right for graphics, logos, screenshots, and anything with sharp edges or transparency.' },
          { type: 'p', text: 'Under the hood, PNG works in two stages. First it **filters** each row of pixels, storing the difference from the row above or the pixel to the left instead of the raw value — long runs of identical colour become long runs of zeros. Then it runs DEFLATE (the same algorithm as ZIP) over the filtered data. This is why a flat UI screenshot compresses brilliantly and a photograph barely compresses at all: photographs have no repeating patterns for the filter stage to exploit.' },
          { type: 'h3', text: 'What this tool actually removes' },
          { type: 'p', text: 'Because the image is redrawn onto a canvas before re-encoding, everything that is not pixel data is dropped: **EXIF blocks, embedded colour profiles, XMP metadata, text chunks, editor histories and embedded thumbnails**. Files exported from Figma, Sketch, Photoshop or a phone screenshot tool often carry a surprising amount of this — which is where the savings come from. The pixels themselves are bit-for-bit identical.' },
          { type: 'h3', text: 'When PNG is the right format' },
          { type: 'ul', items: [
            '**Logos and icons** — sharp edges stay crisp, with none of the haloes JPG produces',
            '**Screenshots and UI mockups** — small text stays readable instead of smearing',
            '**Images with transparency** — PNG has a full alpha channel, JPG has none',
            '**Master files you will keep editing** — lossless means re-saving never degrades anything',
          ]},
        ],
      },
      {
        heading: 'PNG vs JPG vs WebP — which one should this image be?',
        blocks: [
          { type: 'table', headers: ['', 'PNG', 'JPG', 'WebP'], rows: [
            ['Compression', 'Lossless', 'Lossy', 'Both'],
            ['Transparency', 'Yes, full alpha', 'No — fills white', 'Yes, full alpha'],
            ['Photographs', 'Poor — huge files', 'Excellent', 'Excellent'],
            ['Flat graphics, text, UI', 'Excellent', 'Poor — haloes', 'Excellent'],
            ['Typical size vs PNG', 'baseline', '5–20% of PNG (photos)', '~26% smaller than PNG'],
            ['Browser support', 'Universal', 'Universal', 'All modern browsers'],
            ['Animation', 'APNG, rarely used', 'No', 'Yes'],
          ]},
          { type: 'p', text: 'The short version: if the image is a **photograph**, PNG is the wrong container and no amount of compression will fix that — convert it to JPG or WebP instead. If it is a **screenshot, logo or UI element**, PNG is correct, and WebP is the same thing but around a quarter smaller.' },
        ],
      },
      {
        heading: 'Why your PNG sometimes will not get any smaller',
        blocks: [
          { type: 'p', text: 'Lossless means there is a hard floor. Once the metadata is gone and DEFLATE has done its work, there is nothing left to remove without changing pixels. If you compress a PNG and get back a file of roughly the same size, that is the tool telling you the file was already close to optimal.' },
          { type: 'h3', text: 'Cases where you should expect little or no reduction' },
          { type: 'ul', items: [
            'PNGs that already went through an optimiser such as pngquant, OxiPNG or ImageOptim',
            'Photographs saved as PNG — the pixel data is inherently noisy and incompressible',
            'Small icons where metadata was never large in the first place',
            'Files exported by a build pipeline that already strips metadata',
          ]},
          { type: 'h3', text: 'What to do instead' },
          { type: 'ul', items: [
            '**Switch to WebP** — roughly 26% smaller than PNG at identical quality, with transparency intact',
            '**Switch to JPG** if the image is a photograph and does not need transparency',
            '**Reduce the colour palette** in your design tool before export — a 32-colour PNG-8 is dramatically smaller than a 16-million-colour PNG-24',
            '**Resize** — an image displayed at 400 px wide does not need to be 3000 px wide',
          ]},
        ],
      },
      {
        heading: 'How browser-based PNG compression works under the hood',
        blocks: [
          { type: 'p', text: 'The whole pipeline is a handful of native browser calls. There is no library doing the encoding — the browser ships a PNG encoder and this tool just drives it.' },
          { type: 'code', label: 'JavaScript', code: `// 1. Read the dropped file as a local object URL — no network involved
const img = new Image()
const url = URL.createObjectURL(file)

img.onload = () => {
  // 2. Draw at native resolution onto an off-screen canvas.
  //    This step is what discards EXIF, colour profiles and text chunks.
  const canvas  = document.createElement('canvas')
  canvas.width  = img.naturalWidth
  canvas.height = img.naturalHeight
  canvas.getContext('2d').drawImage(img, 0, 0)

  // 3. Re-encode as PNG. Note: no quality argument —
  //    PNG encoding is lossless, so there is nothing to tune.
  canvas.toBlob((blob) => {
    URL.revokeObjectURL(url)
    resolve(blob)
  }, 'image/png')
}

img.src = url` },
          { type: 'p', text: 'Because the source is decoded to raw pixels first, **any input format works** — drop a JPG, WebP, AVIF, TIFF, GIF or BMP and you get a lossless PNG back. Transparency in the source is preserved through the canvas, so a transparent WebP becomes a transparent PNG. Going the other way, a JPG has no transparency to preserve, so the result is simply an opaque PNG that is usually larger than the JPG you started with — expected, not a bug.' },
        ],
      },
    ],
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
      {
        question: 'Does this remove metadata from my screenshots?',
        answer: 'Yes. Redrawing the image onto a canvas discards every non-pixel chunk: EXIF, GPS data, embedded colour profiles, XMP metadata, editor history and embedded thumbnails. For screenshots and exported design assets this is usually where most of the size reduction comes from, and it is a privacy win when you are about to publish the image.',
      },
      {
        question: 'Why is my compressed PNG larger than the JPG I started with?',
        answer: 'Because PNG is lossless and JPG is not. A photograph stored as PNG has to record every pixel exactly, which typically takes 5–20× more space than the JPG version. If your source is a photograph, PNG is the wrong target format — use the JPG or WebP compressor instead.',
      },
      {
        question: 'Is there a file size or batch limit?',
        answer: 'No limit is imposed by the tool — no daily quota, no maximum file size, no signup. The real constraint is your browser tab\'s memory, since images are decoded to raw pixels during processing. Very large batches of high-resolution files are best split into smaller groups.',
      },
    ],
    relatedSlugs: ['compress-jpg', 'compress-webp', 'png-to-webp', 'png-to-jpg'],
  },

  'compress-webp': {
    format: 'webp',
    title: 'Compress WebP Online — Reduce WebP File Size Free | Abect',
    description: 'Compress WebP images online — free, instant, browser-based. Adjust quality slider, reduce WebP file size by 50–80%. No uploads, batch supported.',
    h1: 'WebP Image Compressor',
    sub: 'Reduce WebP file size in your browser — your files never leave your device.',
    howTo: [
      'Drop your images onto the compressor above — any format works: JPG, PNG, WebP, GIF, BMP, AVIF, TIFF.',
      'Adjust the quality slider to control compression. 75–85% is the sweet spot for most use cases.',
      'Click Compress on a single file or Compress all to process everything at once.',
      'Download individually or click Download all to get a ZIP of all compressed WebP files.',
    ],
    sections: [
      {
        heading: 'Your images stay on your device — 100% private',
        blocks: [
          { type: 'p', text: 'Compressing images for a website usually means handing client assets to a third-party service — product shots before launch, unreleased marketing images, screenshots of internal tooling. **This compressor never uploads anything.** Your file is read locally, re-encoded by the browser\'s own WebP encoder, and returned as an in-memory download.' },
          { type: 'p', text: 'You can confirm it rather than take our word for it: open DevTools → Network, compress a batch, and watch for outgoing requests carrying image data. There are none. After the page has loaded, the tool keeps working with the network disconnected entirely.' },
          { type: 'code', label: 'JavaScript', code: `// The browser's own WebP encoder does the work — nothing leaves the tab
canvas.getContext('2d').drawImage(img, 0, 0)
canvas.toBlob(blob => download(blob), 'image/webp', 0.82)` },
        ],
      },
      {
        heading: 'Why use WebP compression?',
        blocks: [
          { type: 'p', text: 'WebP is a modern image format from Google that reaches noticeably smaller file sizes than both JPG and PNG at comparable visual quality. It supports lossy compression, lossless compression, animation and a full alpha channel — which means it can replace JPG, PNG and animated GIF with a single format.' },
          { type: 'p', text: 'The gain over JPG comes from a better encoder: WebP predicts each block from its already-encoded neighbours before compressing the difference, so smooth areas cost almost nothing to store. Against PNG, lossless WebP simply uses stronger entropy coding and a larger set of prediction filters than PNG\'s DEFLATE.' },
          { type: 'h3', text: 'Best use cases for WebP' },
          { type: 'ul', items: [
            '**Website images** — the single biggest Core Web Vitals win most sites have available',
            '**E-commerce product photos** — a catalogue page with 40 images benefits enormously',
            '**Blog images** — same visual result at a third of the bandwidth',
            '**Replacing transparent PNGs** — WebP keeps the alpha channel and is around 26% smaller',
          ]},
        ],
      },
      {
        heading: 'WebP vs JPG vs PNG — format comparison',
        blocks: [
          { type: 'table', headers: ['', 'WebP', 'JPG', 'PNG'], rows: [
            ['Lossy compression', 'Yes', 'Yes', 'No'],
            ['Lossless compression', 'Yes', 'No', 'Yes'],
            ['Transparency', 'Yes, full alpha', 'No — fills white', 'Yes, full alpha'],
            ['Animation', 'Yes', 'No', 'APNG only'],
            ['Size vs JPG (photos)', '25–35% smaller', 'baseline', '5–20× larger'],
            ['Size vs PNG (graphics)', '~26% smaller', 'n/a — artifacts', 'baseline'],
            ['Browser support', 'Chrome, Firefox, Edge, Safari 14+', 'Universal', 'Universal'],
            ['Desktop app support', 'Patchy — Photoshop needs a plugin', 'Universal', 'Universal'],
          ]},
          { type: 'p', text: 'The one place WebP still loses is **outside the browser**. Older versions of Photoshop, Lightroom, many print shops and some email clients will not open a .webp file. Use WebP for anything served on the web; keep a JPG or PNG master for anything that has to be opened in desktop software or sent to a client.' },
        ],
      },
      {
        heading: 'WebP quality settings — what each level actually costs',
        blocks: [
          { type: 'p', text: 'WebP holds up better at low quality than JPG does, so the usable range extends further down. For a typical photograph:' },
          { type: 'table', headers: ['Quality', 'Typical size vs original JPG', 'What you see', 'Use it for'], rows: [
            ['90–100%', '60–80%', 'Indistinguishable from the source', 'Portfolio, photography, print previews'],
            ['80–90%', '30–50%', 'No visible difference at normal viewing size', 'Hero images, product photography'],
            ['75–85%', '20–35%', 'Artifacts only visible when pixel-peeping', 'The default for almost all web use'],
            ['60–75%', '15–25%', 'Slight softening in fine detail', 'Blog body images, gallery grids'],
            ['Below 60%', '10–15%', 'Visible smoothing and colour flattening', 'Thumbnails, blurred placeholders'],
          ]},
          { type: 'p', text: 'Set quality to 100% and the encoder still runs in lossy mode — it just discards very little. Compress, then click the preview thumbnail to inspect the result full-screen before downloading; if it is too soft, raise the slider and re-compress.' },
        ],
      },
      {
        heading: 'Serving WebP safely with a fallback',
        blocks: [
          { type: 'p', text: 'Every browser released in the last several years supports WebP, but if you need to cover older Safari or an unusual email client, the `<picture>` element lets the browser choose. Browsers that understand WebP take the first source; everything else falls back to the `<img>` tag.' },
          { type: 'code', label: 'HTML', code: `<picture>
  <source srcset="/img/hero.webp" type="image/webp">
  <img src="/img/hero.jpg" alt="Product hero shot"
       width="1200" height="630" loading="lazy" decoding="async">
</picture>` },
          { type: 'p', text: 'Two details that matter for Core Web Vitals: always set **width and height** so the browser can reserve space and avoid layout shift (CLS), and use `loading="lazy"` on everything **except** the largest image above the fold — lazy-loading your LCP element makes the score worse, not better.' },
          { type: 'p', text: 'One more note on the pipeline here: because the source is decoded to raw pixels before re-encoding, any input format works — JPG, PNG, GIF, BMP, AVIF or TIFF all come out as WebP. Transparency survives the round trip, and all metadata (EXIF, GPS, colour profiles) is stripped.' },
        ],
      },
    ],
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
      {
        question: 'Will WebP improve my Core Web Vitals score?',
        answer: 'Usually yes, and often more than any other single change. Images are typically the heaviest resource on a page, and Largest Contentful Paint is frequently an image. Cutting a 900 KB hero JPG to 300 KB directly shortens LCP. Pair the format change with explicit width and height attributes to avoid layout shift, and do not lazy-load the above-the-fold image — that delays the very element LCP measures.',
      },
      {
        question: 'Can I open WebP files in Photoshop or send them to a client?',
        answer: 'Browser support is universal, but desktop support is not. Photoshop 23+ opens WebP natively while older versions need a plugin; some print shops and email clients reject it outright. Use WebP for anything served on the web, and keep a JPG or PNG master for files that have to be opened in desktop software or handed to a client.',
      },
      {
        question: 'Does compressing to WebP strip EXIF and GPS data?',
        answer: 'Yes. The image is redrawn onto a canvas before encoding, which discards all metadata — EXIF, GPS coordinates, camera details, colour profiles and embedded thumbnails. For images going onto a public website this is generally what you want, but archive the original if you need to keep copyright or orientation tags.',
      },
      {
        question: 'Is there a limit on file size or number of files?',
        answer: 'No limit is imposed by the tool — no quota, no maximum size, no account required. The practical ceiling is browser tab memory, because images are decoded to raw pixels while being processed. If a large batch of high-resolution files stalls, split it into smaller groups.',
      },
    ],
    relatedSlugs: ['compress-jpg', 'compress-png', 'webp-to-jpg', 'webp-to-png'],
  },
}

export const COMPRESS_CARD_DESC = {
  jpg:  'Reduce JPEG size with adjustable quality',
  png:  'Lossless compression, no quality loss',
  webp: 'Reduce WebP size with adjustable quality',
}

export const CONVERT_CARD_DESC = {
  jpg:  'Smaller files, maximum compatibility',
  jpeg: 'Smaller files, maximum compatibility',
  png:  'Lossless quality, full transparency support',
  webp: '25–34% smaller than JPG — faster pages',
}
