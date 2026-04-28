export const HOW_TO_STEPS = [
  'Choose a source: Text / Emoji to type a letter, number, or any emoji — or Image to upload your own logo.',
  'Adjust colors, font size, border radius, or image fit. The preview updates live.',
  'Click Download favicon package to get a ZIP with all required sizes ready to use.',
  'Unzip and copy the files to your site root, then paste the link tags into your HTML head.',
  'Open site.webmanifest and set your app name and theme color.',
]

export const FAQ = [
  {
    question: 'What favicon files does my website need?',
    answer: 'A complete modern favicon setup needs: favicon-16x16.png and favicon-32x32.png for browser tabs, apple-touch-icon.png at 180×180 for iOS, and android-chrome-192x192.png plus android-chrome-512x512.png for Android and PWA. Keep a favicon.ico in your site root as a legacy fallback. This generator produces all of them in one ZIP.',
  },
  {
    question: 'What is the difference between favicon.ico and PNG?',
    answer: 'favicon.ico is a legacy format supported by all browsers including old Internet Explorer — place it in your site root and browsers will find it automatically. PNG favicons support full color, transparency, and are required for Apple devices. SVG favicons (Chrome, Firefox, Edge) are the most modern option and support dark mode. Modern sites use all three: SVG or PNG declared in the HTML head, ICO as root fallback.',
  },
  {
    question: 'What is an SVG favicon and should I use one?',
    answer: 'An SVG favicon is a vector icon that scales perfectly to any size and can adapt to dark mode using a CSS media query inside the SVG file. Supported in Chrome, Firefox, and Edge (about 85% of browsers). If you want dark mode support or a single file for all resolutions, add an SVG favicon alongside your PNG set.',
  },
  {
    question: 'Can I use an emoji as a favicon?',
    answer: 'Yes. Select Emoji mode, type or paste any emoji, and it will be rendered at all required favicon sizes. You can download the result as a PNG set and favicon.ico. Emoji favicons are a quick, zero-design way to make a site feel branded.',
  },
  {
    question: 'How do I add a favicon in Next.js?',
    answer: 'In Next.js 13+ App Router: place favicon.ico directly in the app/ directory — Next.js picks it up automatically. For full control (PNG sizes, Apple Touch Icon), export a metadata.icons object from your root layout.js with paths to each PNG file placed in the public/ folder.',
  },
  {
    question: 'Why is my favicon not updating after I changed it?',
    answer: 'Browsers cache favicons aggressively, sometimes for days. To force a refresh: open the tab with your site, press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) for a hard reload. In Chrome DevTools you can also right-click the favicon in the tab and select "Reload favicon". Appending a version query string to the favicon URL (e.g. href="/favicon.png?v=2") forces all visitors to reload it.',
  },
  {
    question: 'What size should a favicon be?',
    answer: 'The minimum is 32×32 px for browser tabs. For full coverage you need 16×16, 32×32, 180×180 (Apple), 192×192, and 512×512 (Android/PWA). Anything above 512×512 is not used by any browser or OS. This generator produces all required sizes automatically.',
  },
  {
    question: 'Are my images uploaded anywhere?',
    answer: 'No. All processing happens directly in your browser using the Canvas API. Your images never leave your device — nothing is uploaded to any server. You can verify this by opening browser DevTools → Network tab while generating — you will see zero file transfers.',
  },
]

export const HTML_CODE = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`

export const VITE_CODE = `<!-- index.html (Vite + React or Vue) -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`

export const REACT_CRA_CODE = `<!-- public/index.html -->
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png">
<link rel="manifest" href="%PUBLIC_URL%/site.webmanifest">`

export const NEXTJS_CODE = `// app/layout.js (Next.js 13+ App Router)
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}`

export const RELATED_TOOLS = [
  { to: '/meta-tags-generator', name: 'Meta Tags Generator', desc: 'Generate SEO meta tags with Open Graph preview' },
  { to: '/png-to-webp',         name: 'PNG to WebP',         desc: 'Convert PNG images to WebP — up to 26% smaller files' },
  { to: '/compress-png',        name: 'Compress PNG',        desc: 'Reduce PNG file size — lossless compression, no quality loss' },
  { to: '/webp-converter',      name: 'WebP Converter',      desc: 'Convert JPG, PNG, GIF and more to WebP format' },
]
