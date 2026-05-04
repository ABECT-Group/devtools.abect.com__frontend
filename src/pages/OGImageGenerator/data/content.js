export const HOW_TO_STEPS = [
  'Click or drag any JPG, PNG, WebP, AVIF, or GIF image onto the editor. The image loads instantly in your browser — nothing is uploaded to any server.',
  'Choose an aspect ratio: 1.91:1 (1200×630 px) for standard Facebook and Open Graph, or 1:1 (1080×1080 px) for Instagram-style square previews.',
  'Drag the image to reposition it inside the crop frame. Use the zoom slider or mouse wheel to zoom in and out. On mobile, use pinch-to-zoom.',
  'Use the quality slider to balance file size and sharpness. 80–90 % typically gives a crisp JPEG under 150 KB — the file size updates in real time.',
  'Switch to Preview to see a live social card mock-up of how your link will appear on Slack, Discord, Facebook, and other platforms.',
  'Click Download to save the cropped JPEG. Fill in the meta tag fields, copy the generated HTML, and paste it into your page\'s <head> section.',
]

export const FAQ = [
  {
    question: 'What is an OG image and why does every page need one?',
    answer: 'An Open Graph image (og:image) is the thumbnail shown when you share a link on Facebook, LinkedIn, Twitter/X, Slack, Discord, iMessage, or WhatsApp. It is defined by the og:image meta tag in your page\'s <head>. Without it, platforms either show no image or grab a random one from the page — often poorly cropped. A well-designed OG image significantly increases click-through rates on shared links. Studies show that links with large, relevant preview images receive 3× more clicks than links without images.',
  },
  {
    question: 'What are the correct OG image dimensions in 2025?',
    answer: 'The standard OG image size is 1200×630 px at a 1.91:1 aspect ratio — this is what Facebook, LinkedIn, Twitter/X large card, Slack, and Discord all use. For square previews (Instagram link stickers, some Twitter summary cards), use 1080×1080 px. Never go below 600×315 px: Facebook will fall back to a small thumbnail instead of the large preview card. Always add og:image:width and og:image:height so scrapers do not need to download the full image to read its dimensions.',
  },
  {
    question: 'Which file format should I use for OG images — JPG, PNG, or WebP?',
    answer: 'JPG is the recommended format for OG images. It has universal support across all link preview scrapers, email clients, and messaging apps. PNG works well for logos and images with transparency, but produces larger files for photographs. Avoid WebP for OG images — WhatsApp, older Slack clients, iMessage, and many email clients cannot render WebP previews. This tool exports JPEG directly, which is the safest and most widely compatible choice.',
  },
  {
    question: 'What is the ideal file size for an OG image?',
    answer: 'Keep OG images under 300 KB — ideally 80–150 KB. Facebook\'s hard limit is 8 MB, but large images slow down scraping and can fail on slow mobile networks. Twitter/X has a 5 MB limit. Use 80–90 % JPEG quality to hit a good size/quality trade-off. The quality slider in this tool shows the output file size in real time, so you can find the right balance without guessing.',
  },
  {
    question: 'Why does my OG image not update after I change it?',
    answer: 'Social platforms cache OG images aggressively — sometimes for days. After updating your og:image, you need to force a re-scrape: on Facebook use the Sharing Debugger at developers.facebook.com/tools/debug/, on LinkedIn use the Post Inspector at linkedin.com/post-inspector/. Twitter/X refreshes automatically within 7 days, or you can trigger an immediate rescrape by pasting the URL in a tweet. If the image still does not update, add a query string to the URL (e.g., ?v=2) to force platforms to treat it as a new URL.',
  },
  {
    question: 'Do OG images directly affect Google search rankings?',
    answer: 'Not directly — OG tags are not a Google ranking factor. However, a compelling OG image increases click-through rates on social shares, which drives more organic traffic to your page. Google Discover also displays rich image cards for pages with a high-quality image of at least 1200 px wide. Higher engagement (time on site, return visits) from social traffic can indirectly improve your search rankings over time.',
  },
  {
    question: 'What is the difference between og:image and twitter:image?',
    answer: 'og:image is the standard Open Graph tag used by Facebook, LinkedIn, Slack, Discord, and most other platforms. twitter:image is Twitter\'s/X\'s own tag — if not set, Twitter falls back to og:image automatically. In practice, always set both explicitly: use og:image for broad platform support, and twitter:image to be explicit with Twitter. The meta tag generator in this tool outputs both when you enable the Twitter / X section.',
  },
  {
    question: 'Why do I need og:image:width and og:image:height tags?',
    answer: 'Without width and height hints, Facebook\'s scraper must download and fully decode the image to determine its dimensions before deciding whether to show a large preview card. Adding og:image:width and og:image:height lets the scraper skip that step — resulting in faster preview rendering and avoiding the "image too small" fallback that shows a tiny thumbnail instead of a large card.',
  },
  {
    question: 'How do I add og:image meta tags in React, Next.js, or Nuxt?',
    answer: 'In React with Vite, use react-helmet-async — install the package, wrap your app in HelmetProvider, then add <Helmet> with the meta tags in each page component. In Next.js 13+ App Router, export a metadata object or generateMetadata() function from your page.js — Next.js renders all OG tags server-side automatically. In Nuxt 3, use the built-in useHead() composable. Code examples for all frameworks are shown below.',
  },
  {
    question: 'Does this tool upload my image to any server?',
    answer: 'No. All processing — image loading, cropping, quality adjustment, and JPEG export — happens entirely inside your browser using the Canvas API. Your image never leaves your device. There is no backend, no server upload, and no third-party API call. You can verify this by opening browser DevTools → Network tab while using the tool; no file transfer requests will appear. This means the tool also works offline after the page has loaded once.',
  },
]

export const HTML_CODE = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="Page Title — Brand Name">
<meta property="og:description" content="Page description — 120–160 characters recommended.">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:site_name" content="Brand Name">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title — Brand Name">
<meta name="twitter:description" content="Page description — 120–160 characters recommended.">
<meta name="twitter:image" content="https://example.com/og-image.jpg">`

export const REACT_CODE = `import { Helmet } from 'react-helmet-async'

export default function MyPage() {
  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:title" content="Page Title — Brand Name" />
        <meta property="og:description" content="Page description." />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://example.com/og-image.jpg" />
      </Helmet>
      {/* page content */}
    </>
  )
}`

export const NEXTJS_CODE = `// app/my-page/page.js  (Next.js 13+ App Router)
export const metadata = {
  title: 'Page Title — Brand Name',
  description: 'Page description.',
  openGraph: {
    type: 'website',
    url: 'https://example.com/page',
    title: 'Page Title — Brand Name',
    description: 'Page description.',
    siteName: 'Brand Name',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title — Brand Name',
    description: 'Page description.',
    images: ['https://example.com/og-image.jpg'],
  },
}`

export const NUXT_CODE = `// pages/my-page.vue  (inside <script setup>)
useHead({
  meta: [
    { property: 'og:type',         content: 'website' },
    { property: 'og:url',          content: 'https://example.com/page' },
    { property: 'og:title',        content: 'Page Title — Brand Name' },
    { property: 'og:description',  content: 'Page description.' },
    { property: 'og:image',        content: 'https://example.com/og-image.jpg' },
    { property: 'og:image:width',  content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type',   content: 'image/jpeg' },
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:image',       content: 'https://example.com/og-image.jpg' },
  ],
})`

export const OG_SIZE_TABLE = {
  columns: ['Platform', 'Recommended size', 'Aspect ratio', 'Max file size'],
  rows: [
    ['Facebook / Open Graph', '1200×630 px', '1.91:1', '8 MB'],
    ['Twitter / X (large card)', '1200×628 px', '~1.91:1', '5 MB'],
    ['Twitter / X (square)', '1080×1080 px', '1:1', '5 MB'],
    ['LinkedIn', '1200×628 px', '1.91:1', '5 MB'],
    ['Slack & Discord', '1200×630 px', '1.91:1', '—'],
    ['WhatsApp', '1200×630 px', '1.91:1', '—'],
    ['iMessage / Apple', '1200×630 px', '1.91:1', '—'],
    ['Google Discover', '1200×630 px', '≥ 1.2:1', '—'],
  ],
  note: 'All platforms fall back to og:image if a platform-specific tag is not set. For most sites, one 1200×630 px JPEG covers all platforms.',
}

export const RELATED_TOOLS = [
  { to: '/meta-tags-generator', name: 'Meta Tags Generator',  desc: 'Generate complete SEO meta tags — title, description, canonical, robots, hreflang, Open Graph' },
  { to: '/favicon-generator',   name: 'Favicon Generator',    desc: 'Generate a complete favicon package from text, emoji, or image' },
  { to: '/compress-jpg',        name: 'Compress JPG',         desc: 'Reduce JPEG file size with an adjustable quality slider' },
  { to: '/webp-converter',      name: 'WebP Converter',       desc: 'Convert JPG, PNG, AVIF, or GIF to WebP — 25–34 % smaller files' },
]
