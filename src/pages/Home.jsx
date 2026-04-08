import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './Home.scss'

const TOOLS = [
  { category: 'Images', name: 'WebP converter', description: 'Convert any image to WebP format', route: '/webp-converter', ready: true },
  { category: 'Images', name: 'Favicon generator', description: 'Generate favicons from text or image', route: '/favicon-generator', ready: false },
  { category: 'Images', name: 'OG image', description: 'Create Open Graph images', route: '/og-image', ready: false },
  { category: 'Images', name: 'SVG → JSX', description: 'Convert SVG files to React components', route: '/svg-to-jsx', ready: false },
  { category: 'Converters', name: 'HTML ↔ JSX / TSX', description: 'Convert HTML to JSX or TSX and back', route: '/html-to-jsx', ready: false },
  { category: 'Converters', name: 'CSS ↔ Tailwind', description: 'Convert plain CSS to Tailwind classes', route: '/css-to-tailwind', ready: false },
  { category: 'Converters', name: 'JSON ↔ TS types', description: 'Generate TypeScript types from JSON', route: '/json-to-ts', ready: false },
  { category: 'Converters', name: 'JSON ↔ Zod schema', description: 'Generate Zod schemas from JSON', route: '/json-to-zod', ready: false },
  { category: 'Converters', name: 'JSON ↔ Mongoose', description: 'Generate Mongoose schemas from JSON', route: '/json-to-mongoose', ready: false },
  { category: 'Converters', name: 'Markdown ↔ HTML', description: 'Convert between Markdown and HTML', route: '/markdown-to-html', ready: false },
  { category: 'Converters', name: 'YAML ↔ JSON', description: 'Convert between YAML and JSON', route: '/yaml-to-json', ready: false },
  { category: 'Converters', name: 'CSV ↔ JSON', description: 'Convert between CSV and JSON', route: '/csv-to-json', ready: false },
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
        <title>Developer Tools — devtools.abect.com</title>
        <meta name="description" content="Free browser-based tools for developers. WebP converter, JSON-LD generator, HTML to JSX converter and more. No server, 100% private." />
        <link rel="canonical" href="https://devtools.abect.com/" />
      </Helmet>
      <h1 className="Home__heading">Developer Tools</h1>
      <p className="Home__sub">Browser-based tools. No server, 100% private.</p>
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
    </main>
  )
}
