import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './Home.scss'

const PAGE_TITLE = 'Developer Tools: Free Browser-Based Web Tools | Abect'
const PAGE_DESCRIPTION = 'Free browser-based developer tools for SEO, images, JSON, HTML, CSS, and more. Private by default, with no uploads and no server processing.'
const PAGE_URL = 'https://devtools.abect.com/'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

const TOOLS = [
  { category: 'Images', name: 'WebP converter',  description: 'Convert any image to WebP format',              route: '/webp-converter',  ready: true },
  { category: 'Images', name: 'Favicon generator', description: 'Generate favicons from text, emoji, or image', route: '/favicon-generator', ready: true },
  { category: 'Images', name: 'Compress JPG',  description: 'Reduce JPEG file size with quality control',       route: '/compress-jpg',  ready: true },
  { category: 'Images', name: 'Compress PNG',  description: 'Lossless PNG compression, strip metadata',         route: '/compress-png',  ready: true },
  { category: 'Images', name: 'Compress WebP', description: 'Reduce WebP file size, adjustable quality',        route: '/compress-webp', ready: true },
  // Image Converter — 20 routes
  { category: 'Images', name: 'PNG to JPG',   description: 'Convert PNG images to JPG',          route: '/png-to-jpg',   ready: true },
  { category: 'Images', name: 'JPG to PNG',   description: 'Convert JPG images to PNG',          route: '/jpg-to-png',   ready: true },
  { category: 'Images', name: 'WebP to JPG',  description: 'Convert WebP images to JPG',         route: '/webp-to-jpg',  ready: true },
  { category: 'Images', name: 'WebP to PNG',  description: 'Convert WebP images to PNG',         route: '/webp-to-png',  ready: true },
  { category: 'Images', name: 'PNG to WebP',  description: 'Convert PNG images to WebP',         route: '/png-to-webp',  ready: true },
  { category: 'Images', name: 'JPG to WebP',  description: 'Convert JPG images to WebP',         route: '/jpg-to-webp',  ready: true },
  { category: 'Images', name: 'JPEG to PNG',  description: 'Convert JPEG images to PNG',         route: '/jpeg-to-png',  ready: true },
  { category: 'Images', name: 'JPEG to WebP', description: 'Convert JPEG images to WebP',        route: '/jpeg-to-webp', ready: true },
  { category: 'Images', name: 'GIF to JPG',   description: 'Convert GIF images to JPG',          route: '/gif-to-jpg',   ready: true },
  { category: 'Images', name: 'GIF to PNG',   description: 'Convert GIF images to PNG',          route: '/gif-to-png',   ready: true },
  { category: 'Images', name: 'GIF to WebP',  description: 'Convert GIF images to WebP',         route: '/gif-to-webp',  ready: true },
  { category: 'Images', name: 'BMP to JPG',   description: 'Convert BMP images to JPG',          route: '/bmp-to-jpg',   ready: true },
  { category: 'Images', name: 'BMP to PNG',   description: 'Convert BMP images to PNG',          route: '/bmp-to-png',   ready: true },
  { category: 'Images', name: 'BMP to WebP',  description: 'Convert BMP images to WebP',         route: '/bmp-to-webp',  ready: true },
  { category: 'Images', name: 'AVIF to JPG',  description: 'Convert AVIF images to JPG',         route: '/avif-to-jpg',  ready: true },
  { category: 'Images', name: 'AVIF to PNG',  description: 'Convert AVIF images to PNG',         route: '/avif-to-png',  ready: true },
  { category: 'Images', name: 'AVIF to WebP', description: 'Convert AVIF images to WebP',        route: '/avif-to-webp', ready: true },
  { category: 'Images', name: 'TIFF to JPG',  description: 'Convert TIFF images to JPG',         route: '/tiff-to-jpg',  ready: true },
  { category: 'Images', name: 'TIFF to PNG',  description: 'Convert TIFF images to PNG',         route: '/tiff-to-png',  ready: true },
  { category: 'Images', name: 'TIFF to WebP', description: 'Convert TIFF images to WebP',        route: '/tiff-to-webp', ready: true },
  { category: 'Images', name: 'OG image', description: 'Create Open Graph images', route: '/og-image', ready: false },
  { category: 'Images', name: 'SVG -> JSX', description: 'Convert SVG files to React components', route: '/svg-to-jsx', ready: false },
  { category: 'Converters', name: 'HTML <-> JSX / TSX', description: 'Convert HTML to JSX or TSX and back', route: '/html-to-jsx', ready: false },
  { category: 'Converters', name: 'CSS <-> Tailwind', description: 'Convert plain CSS to Tailwind classes', route: '/css-to-tailwind', ready: false },
  { category: 'Converters', name: 'JSON <-> TS types', description: 'Generate TypeScript types from JSON', route: '/json-to-ts', ready: false },
  { category: 'Converters', name: 'JSON <-> Zod schema', description: 'Generate Zod schemas from JSON', route: '/json-to-zod', ready: false },
  { category: 'Converters', name: 'JSON <-> Mongoose', description: 'Generate Mongoose schemas from JSON', route: '/json-to-mongoose', ready: false },
  { category: 'Converters', name: 'Markdown <-> HTML', description: 'Convert between Markdown and HTML', route: '/markdown-to-html', ready: false },
  { category: 'Converters', name: 'YAML <-> JSON', description: 'Convert between YAML and JSON', route: '/yaml-to-json', ready: false },
  { category: 'Converters', name: 'CSV <-> JSON', description: 'Convert between CSV and JSON', route: '/csv-to-json', ready: false },
  { category: 'SEO / Schema', name: 'JSON-LD generator', description: 'AI-powered structured data generator', route: '/json-ld', ready: false },
  { category: 'SEO / Schema', name: 'Meta tags', description: 'Generate meta tags for any page', route: '/meta-tags', ready: false },
  { category: 'SEO / Schema', name: 'OG preview', description: 'Preview Open Graph cards', route: '/og-preview', ready: false },
  { category: 'SEO / Schema', name: 'Sitemap', description: 'Generate and validate sitemaps', route: '/sitemap-generator', ready: false },
  { category: 'SEO / Schema', name: 'Hreflang', description: 'Generate hreflang tags for multilingual sites', route: '/hreflang', ready: false },
  { category: 'Utilities', name: 'JSON formatter', description: 'Format and validate JSON', route: '/json-formatter', ready: false },
  { category: 'Utilities', name: 'JWT decoder', description: 'Decode and inspect JWT tokens', route: '/jwt-decoder', ready: false },
  { category: 'Utilities', name: 'Regex tester', description: 'Test regular expressions with live feedback', route: '/regex-tester', ready: false },
  { category: 'Utilities', name: 'Base64', description: 'Encode and decode Base64 strings', route: '/base64', ready: false },
  { category: 'Utilities', name: 'Cron builder', description: 'Build cron expressions visually', route: '/cron-builder', ready: false },
  { category: 'Utilities', name: 'Color converter', description: 'Convert between HEX, RGB, HSL, oklch', route: '/color-converter', ready: false },
  { category: 'Utilities', name: 'UUID generator', description: 'Generate UUIDs v4 and v7', route: '/uuid-generator', ready: false },
  { category: 'Utilities', name: 'Diff viewer', description: 'Compare two blocks of text or code', route: '/diff-viewer', ready: false },
]

export default function Home() {
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
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://devtools.abect.com/?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        })}</script>
      </Helmet>
      <h1 className="Home__heading">Developer Tools</h1>
      <p className="Home__sub">Browser-based tools. No server, 100% private.</p>

      {/* Секція з основним інструментарієм */}
      <section className="Home__tools">
        <div className="Home__grid">
          {TOOLS.map(tool =>
            tool.ready ? (
              <Link key={tool.route} to={tool.route} className="Home__tile">
                <div className="Home__tile-category">{tool.category}</div>
                <div className="Home__tile-name">{tool.name}</div>
                <div className="Home__tile-desc">{tool.description}</div>
              </Link>
            ) : (
              <div key={tool.route} className="Home__tile Home__tile--disabled">
                <div className="Home__tile-category">{tool.category}</div>
                <div className="Home__tile-name">{tool.name}</div>
                <div className="Home__tile-desc">{tool.description}</div>
                <span className="Home__tile-badge">Coming soon</span>
              </div>
            )
          )}
        </div>
      </section>

      <section className="Home__why">
        <h2 className="Home__section-title">Why browser-based developer tools?</h2>
        <p className="Home__section-text">
          Every tool on this site runs entirely in your browser — no files are uploaded, no account is required, and nothing is stored on a server. Processing happens locally using browser APIs like Canvas and the File System, which means your data stays on your device. It also means the tools work instantly, without any round-trips to a backend.
        </p>
        <ul className="Home__why-list">
          <li><strong>Private by default</strong> — files never leave your device</li>
          <li><strong>No signup or account required</strong> — open the tool and use it</li>
          <li><strong>Works offline</strong> — no network required after the page loads</li>
          <li><strong>Fast</strong> — no server latency, processing happens locally</li>
        </ul>
      </section>

      <section className="Home__categories">
        <h2 className="Home__section-title">All tool categories</h2>
        <div className="Home__categories-grid">
          <div className="Home__category-card">
            <h3 className="Home__category-title">Image tools</h3>
            <p className="Home__category-desc">Convert, resize, and optimize images. Convert any image to WebP, generate favicons from text or emoji, create Open Graph images, and convert SVG files to React components.</p>
          </div>
          <div className="Home__category-card">
            <h3 className="Home__category-title">Converters</h3>
            <p className="Home__category-desc">Convert between formats used in web development. HTML to JSX, CSS to Tailwind, JSON to TypeScript types or Zod schemas, Markdown to HTML, YAML to JSON, and more.</p>
          </div>
          <div className="Home__category-card">
            <h3 className="Home__category-title">SEO &amp; Schema</h3>
            <p className="Home__category-desc">Tools for technical SEO. Generate JSON-LD structured data, preview and create meta tags, inspect Open Graph cards, generate sitemaps, and build hreflang tags for multilingual sites.</p>
          </div>
          <div className="Home__category-card">
            <h3 className="Home__category-title">Utilities</h3>
            <p className="Home__category-desc">Everyday developer utilities. Format and validate JSON, decode JWT tokens, test regular expressions, encode and decode Base64, generate UUIDs, build cron expressions, and compare text diffs.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
