import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import { TOOLS } from '../../config/tools'
import './Home.scss'

const PAGE_TITLE = 'Free Online Image Converter & Developer Tools | Abect'
const PAGE_DESCRIPTION = 'Convert and compress JPG, PNG, WebP, AVIF images, generate favicons and SEO meta tags — free, in your browser. No uploads, no account, no watermark.'
const PAGE_URL = 'https://devtools.abect.com/'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

const POPULAR_ROUTES = [
  '/png-to-jpg',
  '/jpg-to-webp',
  '/compress-jpg',
  '/webp-converter',
  '/favicon-generator',
  '/meta-tags-generator',
]

const TECH_STACK = [
  {
    name: 'Canvas API',
    desc: 'Draws every image onto an off-screen canvas element, then exports it to the target format via toBlob(). Used by all image converters, compressors, and the favicon renderer.',
  },
  {
    name: 'Blob URL API',
    desc: 'Creates in-memory object URLs (URL.createObjectURL) for instant file previews and downloads — no server round-trip, no upload, no temporary file storage.',
  },
  {
    name: 'File API',
    desc: 'Reads files dropped or selected by the user directly in the browser. File objects are passed to the Canvas pipeline without any network activity.',
  },
  {
    name: 'Web Crypto API',
    desc: 'Generates cryptographically unique IDs (crypto.randomUUID()) for each file entry in the processing queue to track state without collisions.',
  },
  {
    name: 'TypedArrays',
    desc: 'ArrayBuffer, DataView and Uint8Array are used to construct binary .ico files from scratch — writing the ICO header, directory entries and image data manually.',
  },
  {
    name: 'JSZip',
    desc: 'An in-browser library that assembles ZIP archives from Blob objects. Used for batch downloads — all converted or compressed files in a single .zip.',
  },
]

const CHANGELOG = [
  {
    title: 'SEO & Content Deep Dive — Image Converters (Phase 2, complete)',
    body: 'Full SEO and content overhaul of all remaining 16 image converter pages. Every page now uses a 5-section structure: browser-based privacy explanation with code snippet, real-world use cases, a 7-row format comparison table, a "when to use" cheat-sheet, and a Canvas API technical breakdown. Each page has 10–12 unique FAQ items and a unique title/description angle targeting a specific pain point. No server uploads — all conversion happens locally in the browser.',
    date: 'May 1, 2026', datetime: '2026-05-01',
  },
  {
    title: 'SEO & Content Deep Dive — Image Converters (Phase 1)',
    body: <>
      Major content and SEO overhaul for four key image conversion tools:
      <Link to="/png-to-jpg" className="Home__changelog-link"> PNG to JPG</Link>,
      <Link to="/jpg-to-webp" className="Home__changelog-link"> JPG to WebP</Link>,
      <Link to="/webp-to-png" className="Home__changelog-link"> WebP to PNG</Link>, and
      <Link to="/gif-to-jpg" className="Home__changelog-link"> GIF to JPG</Link>.
      Each page now features an expanded technical guide (6k+ characters), comprehensive FAQ (10+ questions), and detailed format comparison tables. Added deep technical explanations of the browser-based Canvas API rendering and localized privacy-first processing with copy-ready code examples.
    </>,
    date: 'Apr 30, 2026', datetime: '2026-04-30',
  },
  {
    title: 'Codebase refactor — Phase 1: shared UI Kit and data/ structure',
    body: 'Major internal refactor to standardize how tools are built across the codebase. Extracted duplicated per-page components into a shared UI Kit — DropZone, ImagePicker, Table, Buttons, CodeBox, ContentSection, PageHeader, ToolSection, RelatedTools, and Lightbox. Each tool page now follows a consistent data/ structure (helmet.js, jsonld.js, content.js, formats.js) that separates SEO metadata, structured data, and content from UI logic. Adds src/config/site.js as a single source for URL and OG image builders.',
    date: 'Apr 28, 2026', datetime: '2026-04-28',
  },
  {
    title: 'SEO overhaul — WebP Converter, Favicon Generator, Meta Tag Generator',
    body: <>Deep SEO overhaul of three core tool pages: <Link to="/webp-converter" className="Home__changelog-link">WebP Converter</Link>, <Link to="/favicon-generator" className="Home__changelog-link">Favicon Generator</Link>, and <Link to="/meta-tags-generator" className="Home__changelog-link">Meta Tag Generator</Link>. Each page received a stronger H1 targeting the primary keyword, an expanded FAQ (8–9 questions) as a single source for both content and FAQPage JSON-LD, a new HowTo JSON-LD schema, format and size comparison tables, and implementation guides with copy-ready code blocks for React, Next.js, Vue/Nuxt, and WordPress.</>,
    date: 'Apr 25, 2026', datetime: '2026-04-25',
  },
  {
    title: 'Home page — SEO restructure',
    body: 'Full SEO overhaul of the home page: added Popular tools, What\'s new, How it works, Why browser-based, and Tool categories sections. FAQ expanded to 8 questions covering formats, batch processing, watermarks, and pricing. Meta description shortened to fit SERP. JSON-LD fixed to render in <head>. Semantic HTML improved: aria-label on sections, <article> for changelog cards, <time datetime> for all dates.',
    date: 'Apr 22, 2026', datetime: '2026-04-22',
  },
  {
    title: 'Meta Tags Generator',
    body: <>Generate complete <Link to="/meta-tags-generator" className="Home__changelog-link">SEO meta tags</Link> — title, description, canonical URL, robots directives, Open Graph, Twitter Card, and hreflang — with a live Google search snippet preview. Supports advanced settings: multiple hreflang entries, custom robots rules, and OG image configuration. Output is copy-ready HTML you paste directly into your page head.</>,
    date: 'Apr 21, 2026', datetime: '2026-04-21',
  },
  {
    title: 'Routing — proper 404 page',
    body: 'Added a dedicated 404 page that handles unknown routes gracefully. The page is pre-rendered at build time and served by Vercel with a proper HTTP 404 status for unmatched paths, which prevents soft 404 errors in Google Search Console.',
    date: 'Apr 21, 2026', datetime: '2026-04-21',
  },
  {
    title: 'Analytics — Google Tag Manager',
    body: 'Integrated Google Tag Manager for flexible event tracking without touching the codebase. Allows adding analytics, conversion tracking, and custom events through the GTM interface without a new deployment.',
    date: 'Apr 20, 2026', datetime: '2026-04-20',
  },
  {
    title: 'Image Compressor — JPG, PNG, WebP',
    body: <>Three dedicated <Link to="/compress-jpg" className="Home__changelog-link">image compressors</Link> with per-file quality sliders, batch processing, and a fullscreen lightbox preview of the compressed result before downloading. PNG compression is lossless — the browser re-encodes and strips metadata. JPG and WebP compression is lossy with adjustable quality from 1–100. All output available as individual files or a single ZIP archive.</>,
    date: 'Apr 18, 2026', datetime: '2026-04-18',
  },
  {
    title: 'Image Converter — 20 format pairs',
    body: <>Twenty format <Link to="/png-to-jpg" className="Home__changelog-link">conversion pairs</Link> covering JPG, PNG, WebP, AVIF, GIF, BMP and TIFF. Each converter has a dedicated URL with unique content explaining when and why to use that specific conversion, a step-by-step how-to guide, related tool links, and a tailored FAQ. All conversion happens via the Canvas API with no uploads.</>,
    date: 'Apr 14, 2026', datetime: '2026-04-14',
  },
  {
    title: 'WebP Converter & Favicon Generator — batch + quality',
    body: <>Added batch processing to both tools: drop multiple files, process all at once, download as a ZIP archive. <Link to="/webp-converter" className="Home__changelog-link">WebP Converter</Link> gained an adjustable quality slider (1–100). Favicon Generator added a live canvas preview of the generated favicon so you can see the result before downloading the full package.</>,
    date: 'Apr 13, 2026', datetime: '2026-04-13',
  },
  {
    title: 'Favicon Generator',
    body: <>Generates a complete <Link to="/favicon-generator" className="Home__changelog-link">favicon package</Link> from text, emoji or an uploaded image: PNG files at 16, 32, 180, 192 and 512 px; a binary favicon.ico with embedded 16, 32 and 48 px frames; site.webmanifest; and a docs.txt installation guide. The ICO file is assembled manually using TypedArrays — no server processing required.</>,
    date: 'Apr 12, 2026', datetime: '2026-04-12',
  },
  {
    title: 'UI — layout and style updates',
    body: 'Updated layout, typography and spacing across all pages. Refined sidebar navigation and improved responsive behavior on smaller screens.',
    date: 'Apr 9, 2026', datetime: '2026-04-09',
  },
  {
    title: 'Privacy — GDPR cookie consent',
    body: 'Added a GDPR-compliant cookie consent banner that appears on first visit. Stores the user\'s choice in localStorage and blocks analytics scripts until consent is explicitly given.',
    date: 'Apr 9, 2026', datetime: '2026-04-09',
  },
  {
    title: 'Analytics — Microsoft Clarity',
    body: 'Integrated Microsoft Clarity for heatmap visualization and session recording. Helps identify how users interact with tool interfaces — drop zones, file tables, quality sliders — to guide UX improvements.',
    date: 'Apr 9, 2026', datetime: '2026-04-09',
  },
  {
    title: 'SEO — Google Search Console verification',
    body: 'Added Google Search Console domain verification. Enables monitoring of search performance, index coverage, Core Web Vitals field data, and crawl errors for devtools.abect.com.',
    date: 'Apr 9, 2026', datetime: '2026-04-09',
  },
  {
    title: 'Performance — SSR prerendering for all pages',
    body: 'Enabled server-side prerendering for all 26 tool pages at build time. Each page is rendered to static HTML with full meta tags, structured data and content — meaning Google receives a fully populated page on first crawl without executing JavaScript.',
    date: 'Apr 9, 2026', datetime: '2026-04-09',
  },
  {
    title: 'Launch — production domain',
    body: 'Moved to the production domain devtools.abect.com with Vercel deployment. Automatic builds on push to main, with prerendering and sitemap generation as part of the build pipeline.',
    date: 'Apr 8, 2026', datetime: '2026-04-08',
  },
]

const HOME_FAQ = [
  {
    question: 'Are online developer tools safe to use for private files?',
    answer: 'Yes — all tools on this site process files entirely within your browser using the Canvas API and File API. No files are uploaded to any server, no data is transmitted over the network, and nothing is stored anywhere. You can verify this by opening browser DevTools and checking the Network panel while using any tool — you will see no outgoing file transfers.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'The tools support JPG, PNG, WebP, AVIF, GIF, BMP and TIFF. You can convert between 20 format pairs — for example JPG to WebP, PNG to JPG, WebP to PNG, AVIF to JPG, and more. Compression is available for JPG, PNG and WebP. All formats are processed entirely in the browser using the Canvas API.',
  },
  {
    question: 'Can I convert or compress multiple images at once?',
    answer: 'Yes — all tools support batch processing. Drop multiple files at once or click to select a batch. Each file is processed individually with its own settings, and all results can be downloaded at once as a single ZIP archive.',
  },
  {
    question: 'Is there a watermark on converted or compressed images?',
    answer: 'No. Converted and compressed files contain no watermarks, no added branding, and no overlays of any kind. The output is a clean file — identical to what a desktop application would produce.',
  },
  {
    question: 'Are these tools actually free? Are there hidden limits?',
    answer: 'Yes, completely free. There is no free tier, no paid plan, no file size cap, no daily limit, and no feature gating. The tools run in your browser — there is no server infrastructure to meter or restrict usage.',
  },
  {
    question: 'Is there a file size limit for image conversion and compression?',
    answer: 'There is no hard limit imposed by the tools. The practical limit depends on the available memory in your browser tab. Most modern devices handle images up to 50–100 MB without issues. Very large files (300 MB+) may exhaust browser tab memory — splitting a batch into smaller groups resolves this.',
  },
  {
    question: 'Do these tools work on mobile and tablet devices?',
    answer: 'Yes. All tools run in any modern browser — Chrome, Firefox, Safari, Edge — on desktop, laptop, tablet and mobile. Image conversion and compression work on iOS and Android. Drag-and-drop may have limited support on some mobile browsers, but tap-to-browse file selection works on all devices.',
  },
  {
    question: 'Do I need to install any software or browser extensions?',
    answer: 'No installation required. All tools run directly in the browser — open the page and start using the tool immediately. No extensions, plugins, or desktop applications are needed. The tools also work offline after the page has loaded once.',
  },
]

const CHANGELOG_PREVIEW = 3

export default function Home() {
  const [changelogExpanded, setChangelogExpanded] = useState(false)
  const [bookmarkHint, setBookmarkHint] = useState(null)

  useEffect(() => {
    if (bookmarkHint === null) return
    const t = setTimeout(() => setBookmarkHint(null), 2500)
    return () => clearTimeout(t)
  }, [bookmarkHint])

  async function handleBookmark() {
    const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent)
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: 'Abect — Free Online Developer Tools',
          text: 'Free browser-based image tools and developer utilities — no uploads, no account.',
          url: window.location.href,
        })
        return
      } catch {
        // user cancelled or share failed — fall through to hint
      }
    }
    const isMac = /Mac/.test(navigator.platform || navigator.userAgent)
    setBookmarkHint(isMac ? '⌘D' : 'Ctrl+D')
  }
  const popularTools = POPULAR_ROUTES.map(route => TOOLS.find(t => t.route === route)).filter(Boolean)
  const visibleChangelog = changelogExpanded ? CHANGELOG : CHANGELOG.slice(0, CHANGELOG_PREVIEW)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': HOME_FAQ.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }

  return (
    <main className="Home">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'Abect Developer Tools',
          'url': 'https://devtools.abect.com',
          'description': PAGE_DESCRIPTION,
        })}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <h1 className="Home__heading">Free Online Image Converter & Developer Tools</h1>
      <p className="Home__sub">{TOOLS.length} free tools — image converters, compressors, favicon generator, SEO meta tags. All run in your browser. No uploads, no account, no watermark.</p>

      <div className="Home__bookmark-wrap">
        <button className="Home__bookmark-btn" onClick={handleBookmark} aria-label="Bookmark this page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2H5z" />
          </svg>
          <span>Save to bookmarks</span>
        </button>
        {bookmarkHint && (
          <span className="Home__bookmark-hint">Press <strong>{bookmarkHint}</strong></span>
        )}
      </div>

      <section className="Home__popular" aria-label="Popular free online tools">
        <h2 className="Home__section-title">Popular free online tools</h2>
        <div className="Home__grid">
          {popularTools.map(tool => (
            <Link key={tool.route} to={tool.route} className="Home__tile">
              <div className="Home__tile-category">{tool.category}</div>
              <div className="Home__tile-name">{tool.name}</div>
              <div className="Home__tile-desc">{tool.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="Home__changelog" aria-label="What's new">
        <h2 className="Home__section-title">What's new</h2>
        <div className="Home__changelog-list">
          {visibleChangelog.map((entry, i) => (
            <article key={i} className="Home__changelog-card">
              <h3 className="Home__changelog-title">{entry.title}</h3>
              <p className="Home__changelog-body">{entry.body}</p>
              <div className="Home__changelog-meta">
                <a
                  href="https://github.com/forze-dev"
                  className="Home__changelog-author"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Roman Popovych
                </a>
                <time className="Home__changelog-date" dateTime={entry.datetime}>{entry.date}</time>
              </div>
            </article>
          ))}
        </div>
        {!changelogExpanded && (
          <button className="Home__changelog-more" onClick={() => setChangelogExpanded(true)}>
            Show all updates
          </button>
        )}
      </section>

      <section className="Home__technical" aria-label="How it works — no uploads, no server">
        <h2 className="Home__section-title">How it works — no uploads, no server</h2>
        <p className="Home__section-text">
          Every tool on this site is built exclusively on native browser APIs and one lightweight library. There is no backend, no cloud function, and no third-party processing service. Here is exactly what runs inside your browser tab when you use a tool.
        </p>
        <div className="Home__tech-grid">
          {TECH_STACK.map(item => (
            <div key={item.name} className="Home__tech-card">
              <h3 className="Home__tech-name">{item.name}</h3>
              <p className="Home__tech-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="Home__why" aria-label="Why browser-based developer tools">
        <h2 className="Home__section-title">Why browser-based developer tools?</h2>
        <p className="Home__section-text">
          Every tool on this site runs entirely in your browser — no files are uploaded, no account is required, and nothing is stored on a server. Processing happens locally using browser APIs like Canvas and the File System, which means your data stays on your device. It also means the tools work instantly, without any round-trips to a backend.
        </p>

        <h3 className="Home__why-heading">Privacy you can verify</h3>
        <p className="Home__section-text">
          Most online tools upload your files to a remote server for processing — your images, documents, and data pass through infrastructure you don't control. Browser-based tools work differently: the processing logic runs inside your own browser tab. You can open DevTools, check the Network panel, and confirm that no files are being sent anywhere. For sensitive files — client assets, internal screenshots, private documents — this matters.
        </p>

        <h3 className="Home__why-heading">No account, no friction</h3>
        <p className="Home__section-text">
          There is no registration, no email confirmation, no free tier with a file size cap, and no watermarks. Open the tool, use it, and leave. Every tool on this site works the same way from the first visit — nothing changes if you come back without an account, because there is no account system.
        </p>

        <h3 className="Home__why-heading">Works offline after first load</h3>
        <p className="Home__section-text">
          Once a page has loaded, the tool keeps working without a network connection. There is no API to call and no server to reach. This makes the tools reliable on unstable connections, in transit, or in air-gapped environments where uploading files to an external service is not an option.
        </p>

        <ul className="Home__why-list">
          <li><strong>Private by default</strong> — files never leave your device, verifiable in DevTools</li>
          <li><strong>No signup or account required</strong> — open the tool and use it immediately</li>
          <li><strong>Works offline</strong> — no network required after the page loads</li>
          <li><strong>No file size limits</strong> — processing happens in your browser, not on a metered server</li>
          <li><strong>No watermarks</strong> — output files contain no added branding or overlays</li>
          <li><strong>Fast</strong> — no upload wait time, no server queue, results are instant</li>
          <li><strong>Free to use</strong> — all browser-based tools are free, no signup required</li>
        </ul>
      </section>

      <section className="Home__categories" aria-label="Tool categories">
        <h2 className="Home__section-title">Tool categories</h2>
        <div className="Home__categories-grid">
          <div className="Home__category-card">
            <h3 className="Home__category-title">Image tools</h3>
            <p className="Home__category-desc">Convert between 20+ image format pairs — JPG, PNG, WebP, AVIF, GIF, BMP, TIFF. Compress JPG, PNG and WebP files with a per-file quality slider. Generate favicons from text, emoji, or image. All processing happens locally — no uploads.</p>
          </div>
          <div className="Home__category-card">
            <h3 className="Home__category-title">SEO &amp; Schema</h3>
            <p className="Home__category-desc">Generate complete SEO meta tags — title, description, canonical URL, robots directives, Open Graph, Twitter Card, and hreflang. Live Google search preview shows exactly how your page will appear in search results.</p>
          </div>
          <div className="Home__category-card Home__category-card--soon">
            <h3 className="Home__category-title">More tools <span className="Home__coming-soon">Coming soon</span></h3>
            <p className="Home__category-desc">New developer utilities are released approximately once a week — converters, formatters, validators, and other browser-based tools for everyday dev workflows.</p>
          </div>
        </div>
      </section>

      <FAQ items={HOME_FAQ} />
    </main>
  )
}
