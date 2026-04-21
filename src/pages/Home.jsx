import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { TOOLS } from '../config/tools'
import './Home.scss'

const PAGE_TITLE = 'Developer Tools: Free Browser-Based Web Tools | Abect'
const PAGE_DESCRIPTION = 'Free browser-based developer tools for SEO, images, JSON, HTML, CSS, and more. Private by default, with no uploads and no server processing.'
const PAGE_URL = 'https://devtools.abect.com/'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

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
          {TOOLS.map(tool => (
            <Link key={tool.route} to={tool.route} className="Home__tile">
              <div className="Home__tile-category">{tool.category}</div>
              <div className="Home__tile-name">{tool.name}</div>
              <div className="Home__tile-desc">{tool.description}</div>
            </Link>
          ))}
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
