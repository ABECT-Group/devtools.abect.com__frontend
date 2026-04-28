export const HOW_TO_STEPS = [
  'Enter your page Title (50–60 characters) and Description (120–160 characters) — the live Google snippet preview updates as you type.',
  'Paste your page URL into the Canonical URL field to prevent duplicate content penalties.',
  'Set the robots meta tag: leave as index, follow for all public pages. Use noindex for staging or private pages.',
  'Enable Multilingual if your site has multiple language versions and add each language-URL pair for hreflang tags.',
  'Click Copy code and paste the output into the head section of your HTML.',
]

export const FAQ = [
  {
    question: 'What are HTML meta tags?',
    answer: 'Meta tags are HTML elements placed in the <head> section of a page. They are not visible to users but tell search engines, browsers, and social platforms how to index, describe, and display your page. The most important are the title tag, meta description, canonical URL, and robots directive.',
  },
  {
    question: 'How long should a meta title and description be?',
    answer: 'Title: 50–60 characters. Google truncates titles longer than ~60 characters in search results, cutting off your message. Meta description: 120–160 characters. On mobile, Google shows roughly 120 characters, so front-load the key information. This generator shows a live character count and preview for both.',
  },
  {
    question: 'What are Open Graph tags and do they affect SEO?',
    answer: 'Open Graph tags (og:title, og:description, og:image) control how your page looks when shared on Slack, Discord, LinkedIn, Facebook, and other platforms that show link previews. They are not a direct Google ranking factor, but a well-designed OG image and title improve click-through rates from social shares — which indirectly signals engagement to Google.',
  },
  {
    question: 'Does the keywords meta tag help with Google SEO?',
    answer: 'No. Google has ignored the meta keywords tag since 2009. It has zero effect on Google rankings. Some other search engines may still look at it. Only include it if a specific CMS or client workflow requires it.',
  },
  {
    question: 'What is a canonical URL and why does it matter?',
    answer: 'The canonical tag (rel="canonical") tells search engines which URL is the preferred version of a page when the same content is accessible at multiple URLs — for example, with or without a trailing slash, www vs non-www, or with UTM parameters. Without it, Google may split ranking signals across duplicate URLs and rank none of them well.',
  },
  {
    question: 'What does noindex mean in the robots meta tag?',
    answer: 'noindex tells search engines not to include this page in search results. Use it for admin dashboards, thank-you pages, internal search results, staging environments, or any page you do not want to appear in Google. Most public pages should stay on the default index, follow.',
  },
  {
    question: 'When do I need hreflang tags?',
    answer: 'Use hreflang tags when your site serves the same content in multiple languages or has region-specific versions (e.g., /en/, /fr/, /de/). They tell Google which language variant to show users in different countries. The x-default value specifies the fallback page when no variant matches the user\'s language.',
  },
  {
    question: 'How do I add meta tags in Next.js?',
    answer: 'In Next.js 13+ App Router: export a metadata object or generateMetadata function from your page.js file. Next.js renders the tags server-side automatically — no extra library needed. In older Next.js with Pages Router, use next/head. For Vite + React, use react-helmet-async.',
  },
  {
    question: 'What is the viewport meta tag and do I need it?',
    answer: 'The viewport tag tells mobile browsers to display the page at the device\'s actual width instead of zooming out to fit a desktop layout. It is required for any responsive website. Without it, Google may flag your site as not mobile-friendly, which negatively affects rankings on mobile searches.',
  },
]

export const HTML_CODE = `<!-- Paste into <head> -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Title — Brand Name</title>
<meta name="description" content="120–160 char description with a clear benefit.">
<link rel="canonical" href="https://example.com/page">
<meta property="og:title" content="Page Title — Brand Name">
<meta property="og:description" content="120–160 char description with a clear benefit.">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">`

export const REACT_CODE = `import { Helmet } from 'react-helmet-async'

export default function MyPage() {
  return (
    <>
      <Helmet>
        <title>Page Title — Brand Name</title>
        <meta name="description" content="120–160 char description." />
        <link rel="canonical" href="https://example.com/page" />
        <meta property="og:title" content="Page Title — Brand Name" />
        <meta property="og:description" content="120–160 char description." />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* page content */}
    </>
  )
}`

export const NEXTJS_CODE = `// app/my-page/page.js  (Next.js 13+ App Router)
export const metadata = {
  title: 'Page Title — Brand Name',
  description: '120–160 char description.',
  alternates: { canonical: 'https://example.com/page' },
  openGraph: {
    title: 'Page Title — Brand Name',
    description: '120–160 char description.',
    url: 'https://example.com/page',
    type: 'website',
    images: [{ url: 'https://example.com/og-image.jpg', width: 1200, height: 630 }],
  },
}`

export const NUXT_CODE = `// pages/my-page.vue  (inside <script setup>)
useHead({
  title: 'Page Title — Brand Name',
  meta: [
    { name: 'description', content: '120–160 char description.' },
    { property: 'og:title', content: 'Page Title — Brand Name' },
    { property: 'og:description', content: '120–160 char description.' },
    { property: 'og:image', content: 'https://example.com/og-image.jpg' },
    { property: 'og:url', content: 'https://example.com/page' },
  ],
  link: [{ rel: 'canonical', href: 'https://example.com/page' }],
})`

export const RELATED_TOOLS = [
  { to: '/favicon-generator', name: 'Favicon Generator', desc: 'Generate favicon files from text, emoji, or image' },
  { to: '/webp-converter',    name: 'WebP Converter',    desc: 'Convert images to WebP — 25–34% smaller files for faster pages' },
  { to: '/compress-png',      name: 'Compress PNG',      desc: 'Reduce PNG file size — lossless compression' },
]
