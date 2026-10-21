export const HOW_TO_STEPS = [
  'Drop your JPG, PNG, GIF, AVIF, BMP or WebP images onto the converter — or click "Choose files" to browse. You can add as many as you like.',
  'Set Pixel size from 1 to 10. Size 1 keeps the finest grid that still reads as pixel art; size 10 gives the biggest, chunkiest pixels.',
  'Set Quality to control the color palette. 100% keeps every color; lower values reduce the image to fewer colors for a classic retro look.',
  'Use the gear icon in a column header to apply one pixel size or quality to every file at once, then adjust single files if needed.',
  'Click Convert on one file or Convert all, preview the result, and download PNGs individually or all together as a ZIP.',
]

export const SECTIONS = [
  {
    heading: 'Your images stay on your device — 100% private',
    blocks: [
      { type: 'p', text: 'This pixel art converter runs entirely in your browser. Your photos are read with the File API, pixelated on an off-screen canvas, and handed back to you as a downloadable PNG. **Nothing is uploaded to a server**, there is no account, no watermark and no limit on how many images you convert.' },
      { type: 'p', text: 'That matters for personal photos, client artwork and unreleased game assets. You can confirm it yourself: open your browser DevTools, switch to the Network tab and convert an image — you will see no file transfers. Converting an image does not need a network connection once the page has loaded.' },
    ],
  },
  {
    heading: 'What is pixel art — and how this tool creates it',
    blocks: [
      { type: 'p', text: 'This free online pixelator — a photo to pixel art converter, or pixel art maker if you prefer — pixelates any image in seconds without drawing a single pixel by hand.' },
      { type: 'p', text: '**Pixel art** is digital art built from a visible grid of large square pixels, each one a single flat color. It comes from the screens of 8-bit and 16-bit consoles and early computers, where low resolution and a small color palette were hardware limits. Today it is a deliberate style used in indie games, avatars, emotes, album art and social media posts.' },
      { type: 'p', text: 'Turning a photo into pixel art takes two ideas working together: a **coarse pixel grid** and a **limited palette**. This converter exposes each as one slider, so you can dial in the look instead of guessing.' },
      { type: 'h3', text: 'The conversion in three steps' },
      { type: 'ul', items: [
        '**Downscale** — the image is shrunk to a small grid (for example 64 × 48 cells). Each cell takes the averaged color of the area it covers, so details merge into clean blocks.',
        '**Reduce colors** — optionally, the colors in that small grid are merged into a limited palette with the median-cut algorithm.',
        '**Upscale without smoothing** — the grid is enlarged by a whole-number factor with interpolation switched off, so every cell becomes a crisp square and the result stays close to the original size.',
      ] },
    ],
  },
  {
    heading: 'Pixel size 1–10 — how big should the pixels be?',
    blocks: [
      { type: 'p', text: 'Pixel size sets how many cells the **longer side** of your image is divided into. Because the grid follows the image, the same setting gives a consistent look on a phone photo, a wide banner or a square logo. The scale runs in geometric steps — each step is about 20% coarser than the last — because the eye judges "chunkiness" by ratio, not by absolute difference.' },
      { type: 'table', headers: ['Pixel size', 'Cells on the longer side', 'Look', 'Good for'], rows: [
        ['1', '128', 'Detailed, smooth pixel art', 'Portraits, landscapes, wallpapers'],
        ['2', '102', 'Fine pixels, details survive', 'Photos with faces'],
        ['3', '81', 'Clearly pixelated, still readable', 'Social posts, thumbnails'],
        ['4', '64', 'Classic 16-bit scene', 'Game backgrounds'],
        ['5', '51', 'Balanced retro look (default)', 'Avatars, profile pictures'],
        ['6', '40', 'Bold, chunky pixels', 'Stickers, emotes'],
        ['7', '32', 'Sprite-sized', 'Characters, items'],
        ['8', '25', 'Very coarse', 'Icons, small badges'],
        ['9', '20', 'Minimal detail', 'Tiny icons, tiles'],
        ['10', '16', 'Maximum chunk — 16 × 16 style', 'Favicons, 16-bit icons'],
      ] },
      { type: 'p', text: 'The tool never makes a grid larger than the image itself, so a very small source simply stays as detailed as it already is. Size 1 is deliberately capped at 128 cells: beyond that point the result looks like a slightly blurry low-resolution photo rather than pixel art.' },
    ],
  },
  {
    heading: 'Quality — the color palette slider',
    blocks: [
      { type: 'p', text: 'A PNG is lossless, so "quality" here does not mean compression artifacts — it controls **how many colors** the pixel art may use. This is what real pixel art is about: classic consoles worked with palettes of 4, 16 or 256 colors, and that restriction gives the style its flat, graphic character.' },
      { type: 'table', headers: ['Quality', 'Colors', 'Effect'], rows: [
        ['100%', 'All colors', 'Smooth gradients, closest to the photo. No palette reduction is applied.'],
        ['90%', '161', 'Almost indistinguishable from full color.'],
        ['70%', '64', 'Slight banding in skies and skin — a mild retro feel.'],
        ['50%', '25', 'Clearly limited palette, poster-like.'],
        ['30%', '10', 'Strong graphic style, flat regions of color.'],
        ['10%', '4', 'Four-color look, similar to early handheld screens.'],
      ] },
      { type: 'p', text: 'Colors are chosen with **median cut**: the pixels are repeatedly split along the color channel with the widest range, and each final group is replaced by its average color. The palette therefore adapts to your image — a sunset gets oranges and purples, a forest gets greens — instead of using a fixed generic set.' },
      { type: 'p', text: 'Lower quality also gives a smaller PNG, because large areas of identical color compress far better. If file size matters — for a website, an emote upload limit or a game build — reduce quality before reducing the pixel size.' },
    ],
  },
  {
    heading: 'What people use pixel art converters for',
    blocks: [
      { type: 'ul', items: [
        '**Game development** — turn reference photos into backgrounds and tiles, or prototype an art style before drawing by hand. Game jams love fast placeholder art.',
        '**Avatars and profile pictures** — a pixelated portrait stands out on Discord, GitHub, Twitch and forums.',
        '**Emotes and stickers** — use sizes 6–8 with a limited palette to keep emotes readable at 28 pixels.',
        '**Social media and posters** — the retro look is popular for music, gaming and tech content.',
        '**Privacy blurring with style** — high pixel sizes hide faces and license plates while looking intentional rather than like a censor bar. For anything truly sensitive — passwords, ID numbers, small text — cover it with a solid box instead: light pixelation can sometimes be partly reversed.',
        '**Icons and favicons** — size 9–10 with a small palette gives crisp 16 × 16 style icons.',
      ] },
    ],
  },
  {
    heading: 'Tips for better pixel art from a photo',
    blocks: [
      { type: 'h3', text: 'Start with a clear subject' },
      { type: 'p', text: 'Pixelation throws away fine detail, so images with one strong subject against a simple background survive best. Busy scenes turn into noise at coarse sizes. Crop tightly before converting — the grid is spread over the whole image, so every pixel spent on empty space is wasted.' },
      { type: 'h3', text: 'Boost contrast first' },
      { type: 'p', text: 'Flat, low-contrast photos produce muddy pixel art. A small contrast or saturation boost in any editor before conversion gives the palette distinct colors to work with.' },
      { type: 'h3', text: 'Match size and quality' },
      { type: 'ul', items: [
        'Coarse pixels (7–10) look best with a limited palette (quality 30–60%).',
        'Fine pixels (1–3) need more colors (quality 80–100%) or smooth areas get visible banding.',
        'For a "GameBoy" feel try pixel size 4–5 with quality 10–20%.',
      ] },
      { type: 'h3', text: 'Keep transparency' },
      { type: 'p', text: 'Transparent PNG and WebP files keep their transparency. When you lower the quality, edges become hard — a pixel is either solid or fully transparent, as in real sprite art — so there are no half-transparent halos.' },
    ],
  },
  {
    heading: 'How to show pixel art crisply on a website',
    blocks: [
      { type: 'p', text: 'Browsers smooth images when they scale them, which blurs pixel art. If you display a small pixel image larger than its natural size, tell the browser to use nearest-neighbor scaling with the CSS property below. The PNG files from this tool are already upscaled with sharp edges, so this is only needed when you resize them further.' },
      { type: 'code', label: 'CSS', code: `.pixel-art {
  image-rendering: crisp-edges;    /* fallback for older Firefox */
  image-rendering: pixelated;      /* Chrome, Edge, Safari, current Firefox */
}` },
    ],
  },
  {
    heading: 'How pixelation works in your browser',
    blocks: [
      { type: 'p', text: 'The converter uses only built-in browser APIs — no server and no external libraries for the conversion itself. The core of it is two canvas draws: one to shrink the image, one to enlarge it with smoothing switched off.' },
      { type: 'code', label: 'JavaScript', code: `// 1. Shrink to a small grid — smoothing averages each cell
small.getContext('2d').drawImage(bitmap, 0, 0, cellsX, cellsY)

// 2. Enlarge by a whole number, no interpolation → crisp square pixels
const ctx = output.getContext('2d')
ctx.imageSmoothingEnabled = false
ctx.drawImage(small, 0, 0, cellsX * scale, cellsY * scale)

// 3. Export a lossless PNG
output.toBlob(blob => download(blob), 'image/png')` },
      { type: 'p', text: 'Very large photos are halved repeatedly before the final shrink, which averages many source pixels into each cell instead of sampling sparsely and producing noisy results.' },
    ],
  },
]

export const FAQ = [
  {
    question: 'How do I convert an image to pixel art?',
    answer: 'Drop your image onto the converter, choose a Pixel size from 1 to 10, optionally lower the Quality slider to reduce the number of colors, click Convert and download the PNG. Everything happens in your browser.',
  },
  {
    question: 'What does Pixel size mean?',
    answer: 'Pixel size sets how coarse the pixel grid is. At size 1 the longer side of your image is divided into 128 cells — the finest grid that still looks like pixel art. At size 10 it is divided into only 16 cells, giving very large blocky pixels. The scale is relative to the image, so it behaves the same on small and large files.',
  },
  {
    question: 'What does the Quality slider do for a PNG?',
    answer: 'PNG is lossless, so Quality controls the color palette rather than compression. 100% keeps all colors; lower values merge colors into a smaller palette using median cut — down to just 4 colors at 10%. Fewer colors give a more authentic retro look and a smaller file.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer: 'No. The conversion runs entirely in your browser using the Canvas API. Your files never leave your device, and you can verify it in DevTools → Network while converting: there are no file transfers.',
  },
  {
    question: 'What is the best pixel size for a profile picture?',
    answer: 'Sizes 4–6 usually work best for avatars: the face stays recognizable while the pixels are clearly visible. Combine them with quality 50–80% for a clean, slightly retro palette.',
  },
  {
    question: 'Can I make the pixel art look like an old Game Boy or NES game?',
    answer: 'For a handheld look use pixel size 4–5 with quality 10–20%, which leaves a palette of only 4–6 colors. For an NES or 16-bit console style use pixel size 4–6 with quality 50–70%. The tool picks colors from your image rather than a fixed console palette, so results vary by picture.',
  },
  {
    question: 'Does the converter keep transparency?',
    answer: 'Yes. Transparent areas of PNG and WebP images stay transparent in the output. When you reduce quality, semi-transparent pixels snap to fully solid or fully clear, as in traditional sprite art.',
  },
  {
    question: 'Which image formats can I use?',
    answer: 'You can upload JPG, PNG, GIF, AVIF, BMP and WebP files. The result is always a lossless PNG. Animated GIFs are converted from their first frame only.',
  },
  {
    question: 'Can I convert many images at once?',
    answer: 'Yes. Add as many files as you like, use the gear icons in the Pixel size and Quality column headers to apply one setting to all of them, then click Convert all and Download all to get a single ZIP archive.',
  },
  {
    question: 'Why does my pixel art look blurry on my website?',
    answer: 'Browsers smooth images when they scale them. Add the CSS rule image-rendering: pixelated to the image so the browser uses nearest-neighbor scaling and keeps every pixel sharp. The PNG downloaded from this tool is already sharp at its native size.',
  },
  {
    question: 'Is this an AI pixel art generator?',
    answer: 'No. AI generators invent a new picture from a text prompt. This tool pixelates your own image with a fixed, predictable algorithm — the result is always your photo, reduced to a pixel grid and a limited palette, and the same settings always give the same output. Nothing is sent to an AI model.',
  },
  {
    question: 'Can I use the pixel art commercially?',
    answer: 'The tool adds no watermark and claims no rights over your output. Whether you may use the result commercially depends on the source image — convert only photos and artwork you own or have a license to use. Pixelating another person’s image does not change who owns it.',
  },
  {
    question: 'Is there a limit on file size or number of conversions?',
    answer: 'No limits and no signup. The only practical limit is your device memory — very large photos take a little longer to process. Everything is free.',
  },
]

export const RELATED_TOOLS = [
  { to: '/compress-png',       name: 'Compress PNG',       desc: 'Shrink the pixel art PNG further without losing quality' },
  { to: '/png-to-webp',        name: 'PNG to WebP',        desc: 'Convert pixel art to WebP — smaller files for websites' },
  { to: '/webp-converter',     name: 'WebP Converter',     desc: 'Batch convert JPG, PNG, GIF and HEIC to WebP' },
  { to: '/favicon-generator',  name: 'Favicon Generator',  desc: 'Turn your pixel icon into a full favicon set' },
  { to: '/jpg-to-png',         name: 'JPG to PNG',         desc: 'Convert photos to lossless PNG before pixelating' },
  { to: '/og-image-generator', name: 'OG Image Generator', desc: 'Crop pixel art to a 1200×630 social preview' },
]
