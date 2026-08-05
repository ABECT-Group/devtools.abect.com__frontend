import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import JsonLd from '../../components/JsonLd/JsonLd'
import ChangelogCard from '../../components/ChangelogCard/ChangelogCard'
import { CHANGELOG, CHANGELOG_PREVIEW } from '../Changelog/data/entries'
import { ORGANIZATION_ID } from '../../config/schema'
import { TOOLS } from '../../config/tools'
import './Home.scss'

// The home page speaks only for the free, browser-only tools. The AI assistant
// is a separate, account-based product and is not counted or described here.
const FREE_TOOLS = TOOLS.filter(tool => tool.category !== 'AI')

// The home page targets broad navigational intent ("free online developer
// tools", "browser based file tools"). Transactional "X to Y" queries belong to
// the individual tool pages — do not put them in this title or H1, or the home
// page competes with its own converters for the same SERP.
const PAGE_TITLE = 'Free Online Developer Tools — No Upload, No Signup | Abect'
const PAGE_DESCRIPTION = `${FREE_TOOLS.length} free developer tools that run in your browser — image, text and code converters, compressors, favicon and SEO generators. No uploads, no account.`
const PAGE_URL = 'https://devtools.abect.com/'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

const POPULAR_ROUTES = [
  '/jsx-to-html',
  '/webp-converter',
  '/jpg-to-webp',
  '/compress-jpg',
  '/favicon-generator',
  '/article-schema-generator',
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

const HOME_FAQ = [
  {
    question: 'Are online developer tools safe to use for private files?',
    answer: 'Yes — every tool listed on this page processes files entirely within your browser using the Canvas API and File API. No files are uploaded to any server, no data is transmitted over the network, and nothing is stored anywhere. You can verify this by opening browser DevTools and checking the Network panel while using any tool — you will see no outgoing file transfers.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'The tools support JPG, PNG, WebP, AVIF, GIF, BMP, TIFF and HEIC. You can convert between 22 format pairs — for example JPG to WebP, PNG to JPG, HEIC to JPG, AVIF to WebP, and more. Compression is available for JPG, PNG and WebP. All formats are processed entirely in the browser using the Canvas API.',
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
    answer: 'Yes, completely free. Every tool on this page runs entirely inside your browser, so there is no server infrastructure to meter or restrict: no file size cap, no daily limit, no feature gating, and no watermark. You do not need an account to use any of them, and that is not going to change.',
  },
  {
    question: 'Is there a file size limit for image conversion and compression?',
    answer: 'There is no hard limit imposed by the tools. The practical limit depends on the available memory in your browser tab. Most modern devices handle images up to 50–100 MB without issues. Very large files (300 MB+) may exhaust browser tab memory — splitting a batch into smaller groups resolves this.',
  },
  {
    question: 'Do these tools work on mobile and tablet devices?',
    answer: 'Yes. Every tool on this page runs in any modern browser — Chrome, Firefox, Safari, Edge — on desktop, laptop, tablet and mobile. Image conversion and compression work on iOS and Android. Drag-and-drop may have limited support on some mobile browsers, but tap-to-browse file selection works on all devices.',
  },
  {
    question: 'Which image format should I use for a website?',
    answer: 'WebP for almost everything — it is 25–35% smaller than JPG at the same visual quality, supports transparency like PNG, and works in every modern browser. Keep JPG for photographs that have to open in desktop software or go to a print shop, and PNG for screenshots, logos and anything with sharp edges you plan to keep editing. AVIF compresses even better than WebP but has weaker tool support outside the browser.',
  },
  {
    question: 'How do I convert HEIC photos from my iPhone without installing anything?',
    answer: 'Use the HEIC to JPG or HEIC to WebP converter — drop the files straight from your phone or Photos export and they are decoded in the browser. Safari uses the operating system\'s own HEIC decoder at no extra cost; Chrome and Firefox load a WebAssembly decoder on demand, only when a HEIC file is actually detected, so no other page pays for it. Nothing is uploaded, which matters because HEIC files from a phone carry GPS coordinates in their metadata.',
  },
  {
    question: 'Will compressing images improve my Core Web Vitals score?',
    answer: 'Usually more than any other single change. Images are typically the heaviest resource on a page and the Largest Contentful Paint element is very often an image, so cutting a 900 KB hero image to 300 KB shortens LCP directly. Combine it with explicit width and height attributes to avoid layout shift, and do not lazy-load the image above the fold — that delays the exact element LCP measures.',
  },
  {
    question: 'Do I need to install any software or browser extensions?',
    answer: 'No installation required. Every tool on this page runs directly in the browser — open the page and start using the tool immediately. No extensions, plugins, or desktop applications are needed. The tools also work offline after the page has loaded once.',
  },
]

// Browsable index of every free tool, grouped by the `category` field in
// tools.js. Adding a tool to the registry puts it here automatically.
const CATEGORIES = [
  {
    category: 'Images',
    heading: 'Image tools',
    desc: 'Convert between image format pairs — JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, HEIC. Compress JPG, PNG and WebP with a per-file quality slider. Generate favicons from text, emoji or an image. All processing happens locally — no uploads.',
  },
  {
    category: 'SEO',
    heading: 'SEO & Schema',
    desc: 'Generate complete SEO meta tags — title, description, canonical URL, robots directives, Open Graph, Twitter Card and hreflang — plus JSON-LD schema markup for Product, Article, FAQ, Organization, Local Business and Breadcrumb. Live preview of every result.',
  },
  {
    category: 'Text & Code',
    heading: 'Text & Code',
    desc: 'Convert between text and code formats — HTML to Markdown, HTML to JSX and TSX, JSON to CSV, XML to JSON, YAML to JSON, and Base64 encode/decode. All conversion runs entirely in the browser — no server calls, no uploads.',
  },
].map(group => ({ ...group, tools: FREE_TOOLS.filter(t => t.category === group.category) }))

export default function Home() {
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
  const popularTools = POPULAR_ROUTES.map(route => FREE_TOOLS.find(t => t.route === route)).filter(Boolean)
  const latestEntries = CHANGELOG.slice(0, CHANGELOG_PREVIEW)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': HOME_FAQ.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }

  // Describes the tool index that is actually rendered below — one ListItem per
  // link on the page, in the order they appear.
  const toolListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': `All ${FREE_TOOLS.length} free browser tools`,
    'numberOfItems': FREE_TOOLS.length,
    'itemListElement': CATEGORIES.flatMap(group => group.tools).map((tool, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': tool.name,
      'url': `https://devtools.abect.com${tool.route}`,
    })),
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Abect Developer Tools',
    'url': 'https://devtools.abect.com',
    'description': PAGE_DESCRIPTION,
    'inLanguage': 'en',
    'publisher': { '@id': ORGANIZATION_ID },
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
        <meta property="og:site_name" content="Abect Dev Tools" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <JsonLd data={webSiteSchema} />
      <JsonLd data={toolListSchema} />
      <JsonLd data={faqSchema} />

      <h1 className="Home__heading">Free Online Developer Tools</h1>
      <p className="Home__sub">{FREE_TOOLS.length} browser-based tools for images, text, code and SEO. Everything runs on your own device — no uploads, no account, no watermark, no limits.</p>

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

      {CATEGORIES.map(group => (
        <section className="Home__category" key={group.category} aria-label={`${group.heading} — all tools`}>
          <h2 className="Home__section-title">{group.heading}</h2>
          <p className="Home__category-desc">{group.desc}</p>
          <div className="Home__chips">
            {group.tools.map(tool => (
              <Link key={tool.route} to={tool.route} className="Home__chip">{tool.name}</Link>
            ))}
          </div>
        </section>
      ))}

      <section className="Home__changelog" aria-label="What's new">
        <h2 className="Home__section-title">What's new</h2>
        <div className="Home__changelog-list">
          {latestEntries.map(entry => (
            <ChangelogCard key={entry.datetime} entry={entry} variant="preview" />
          ))}
        </div>
        <Link className="Home__changelog-more" to="/changelog">
          Show all updates
        </Link>
      </section>

      <section className="Home__technical" aria-label="How it works — no uploads, no server">
        <h2 className="Home__section-title">How it works — no uploads, no server</h2>
        <p className="Home__section-text">
          Every tool on this page is built exclusively on native browser APIs and one lightweight library. These tools have no backend, no cloud function, and no third-party processing service. Here is exactly what runs inside your browser tab when you use one.
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
          Every tool on this page runs entirely in your browser — no files are uploaded, no account is required, and nothing is stored on a server. Processing happens locally using browser APIs like Canvas and the File System, which means your data stays on your device. It also means the tools work instantly, without any round-trips to a backend.
        </p>

        <h3 className="Home__why-heading">Privacy you can verify</h3>
        <p className="Home__section-text">
          Most online tools upload your files to a remote server for processing — your images, documents, and data pass through infrastructure you don't control. Browser-based tools work differently: the processing logic runs inside your own browser tab. You can open DevTools, check the Network panel, and confirm that no files are being sent anywhere. For sensitive files — client assets, internal screenshots, private documents — this matters.
        </p>

        <h3 className="Home__why-heading">No account, no friction</h3>
        <p className="Home__section-text">
          There is no registration, no email confirmation, no free tier with a file size cap, and no watermarks. Open the tool, use it, and leave. Every tool on this page works the same way on your first visit and on every visit after — being signed in changes nothing about them, because none of them ever sends your files anywhere.
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
          <li><strong>Free to use</strong> — every browser tool is free, with no signup required</li>
        </ul>
      </section>

      <FAQ items={HOME_FAQ} />
    </main>
  )
}
