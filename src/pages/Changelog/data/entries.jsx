import { Link } from 'react-router-dom'

/**
 * Single source of truth for the changelog. Rendered in two places:
 *
 *   /            → the three most recent entries, `summary` only
 *   /changelog   → every entry, full `body`
 *
 * Rules (enforced by convention, see docs/contribution.md):
 *   - ONE entry per calendar day. The date is the anchor (#dd-mm-yyyy), so two
 *     entries sharing a date would collide. Ship several things on one day?
 *     Merge them into one entry with several paragraphs.
 *   - `summary` is plain text, max 300 characters — it is what the home page
 *     shows. No JSX, no links.
 *   - `body` is the full entry. Links use className="ChangelogCard__link".
 *   - Newest first.
 */

const L = 'ChangelogCard__link'

export const CHANGELOG = [
  {
    title: 'FAQ Schema Generator updated — Google retired the FAQ rich result on May 7, 2026',
    summary: 'Google removed the FAQ accordion from Search results in May 2026. We rewrote the FAQ Schema Generator page to explain what changed, what still works (AI Overviews, semantic understanding), and what does not — instead of describing a feature that no longer exists.',
    date: 'August 14, 2026',
    datetime: '2026-08-14',
    body: (
      <>
        <p>
          Google retired the FAQ rich result — the expandable Q&A accordion that used to appear beneath a
          search snippet — on May 7, 2026, and removed its documentation entirely in June. The{' '}
          <Link to="/faq-schema-generator" className={L}>FAQ Schema Generator</Link> page previously described
          that accordion as an active feature, so we rewrote it top to bottom: a new section explains exactly
          what changed and how to verify it yourself, the FAQ accordion on the page itself now answers the
          questions people are actually asking in 2026 ("does FAQ schema still work?", "is it still worth
          adding?"), and every claim about what the schema does or does not unlock has been checked against
          Google's current documentation rather than left as-is.
        </p>
        <p>
          <strong>What still holds.</strong> FAQPage schema remains valid structured data — it does not break
          anything, and Google has said unused structured data causes no harm. It may still help AI Overviews
          and AI Mode parse and cite page content. What it no longer does is generate any visual rich result in
          the SERP, for anyone, regardless of implementation quality.
        </p>
        <p>
          <strong>Site-wide fix.</strong> While auditing the page we also found that inline links generated
          from page content had no defined color anywhere in the stylesheet — they fell back to the browser
          default instead of the site's accent color, and external links opened in the same tab without{' '}
          <code>rel="noopener noreferrer"</code>. Both are fixed for every tool page that renders inline links
          from its content data, not just this one.
        </p>
      </>
    ),
  },
  {
    title: 'QR code generator — links, text, WiFi and contact cards, with logos and SVG export',
    summary: 'Four new tools generate QR codes for a link, plain text, a WiFi network or a contact card. Pick your own colors and module shape, drop a logo in the center, and export as PNG or print-ready vector SVG. Every code is static — nothing expires, nothing is tracked.',
    date: 'August 12, 2026',
    datetime: '2026-08-12',
    body: (
      <>
        <p>
          A new Utilities section opens with four QR generators:{' '}
          <Link to="/qr-code-generator" className={L}>links</Link>,{' '}
          <Link to="/text-to-qr-code-generator" className={L}>plain text</Link>,{' '}
          <Link to="/wifi-qr-code-generator" className={L}>WiFi networks</Link>, and{' '}
          <Link to="/vcard-qr-code-generator" className={L}>vCard contact cards</Link>. Like every other
          free tool here, they run entirely in the browser — the URL, the network password and the contact
          details are never transmitted anywhere.
        </p>
        <p>
          <strong>Text codes work with no network at all.</strong> A link code stores an address the phone
          still has to fetch; a text code stores the message itself, so it displays instantly on a machine in
          a basement plant room or a sign on a hiking trail. The generator is offline in the same sense —
          load the page, disconnect, keep generating.
        </p>
        <p>
          <strong>Static, not dynamic.</strong> The destination is encoded directly into the pattern. There is
          no redirect service in the middle, so a printed code cannot stop working because a subscription
          lapsed or a company shut down. The trade-off is honest and stated on every page: static codes
          cannot count scans.
        </p>
        <p>
          <strong>Escaping done properly.</strong> The WiFi format reserves five characters —{' '}
          <code>\</code> <code>;</code> <code>,</code> <code>:</code> and <code>"</code> — and most free
          generators pass them through unescaped, which silently truncates the password at the first one. The
          encoder here escapes all five in both the network name and the password. vCard output uses CRLF line
          endings and escapes commas and semicolons, so a job title like "Head of Sales, EMEA" imports
          intact instead of being split across fields.
        </p>
        <p>
          <strong>Styling.</strong> Foreground and background colors, quiet-zone width, square, rounded or dot
          modules, and a logo in the center. Adding a logo raises error correction to level H automatically and
          punches the covered modules out rather than painting over them. The three corner finder patterns stay
          square in every style, because those are what a scanner locks onto first.
        </p>
        <p>
          <strong>PNG and SVG.</strong> The renderer draws from the raw module matrix, which makes vector output
          free — the same geometry becomes an SVG that prints crisply at any size, from a business card to a
          banner. The live preview reports the QR version and byte usage, and warns before the payload grows
          dense enough to fail at print size.
        </p>
      </>
    ),
  },
  {
    title: 'Changelog page, category browsing on the home page, and lighter bundles',
    summary: 'Every update now lives on a dedicated changelog page. The home page gained a browsable index of all 49 tools by category, heavy libraries load only when a tool needs them, and every tool page emits breadcrumb structured data.',
    date: 'August 5, 2026',
    datetime: '2026-08-05',
    body: (
      <>
        <p>
          The full history now lives on a dedicated <Link to="/changelog" className={L}>changelog page</Link> instead
          of being hidden behind a "show all" button — previously those entries existed only after a click, so none of
          it was readable without JavaScript. The home page keeps the three most recent entries as short summaries.
        </p>
        <p>
          The home page was restructured around browsing rather than converting: the Popular section stays, and below
          it every one of the 49 free tools is now listed under its category — Images, SEO &amp; Schema, and Text
          &amp; Code — so any tool is one click from the front page.
        </p>
        <p>
          <strong>Performance.</strong> Heavy libraries — the ZIP builder, the Markdown and YAML parsers, the chat
          renderer — now load only when a tool actually needs them, cutting roughly 20% off what every page downloads
          up front. React was split into its own chunk so it stays cached across deploys.
        </p>
        <p>
          <strong>Structured data.</strong> Every schema — <code>WebApplication</code>, <code>HowTo</code>,{' '}
          <code>FAQPage</code>, <code>BreadcrumbList</code>, <code>Organization</code> — now renders inside{' '}
          <code>&lt;head&gt;</code> instead of the page body, and each one is escaped so its own text can never break
          out of the script tag. All 50 tool pages now carry a breadcrumb trail and the site publisher entity.
        </p>
        <p>
          <strong>Routing and indexing.</strong> Sign-in and account pages answer with HTTP 200 and{' '}
          <code>noindex</code> instead of a 404 status — a password-reset link no longer lands on an error page.
          Private AI conversation URLs are excluded from crawling while the public{' '}
          <Link to="/ai" className={L}>AI assistant page</Link> stays indexable. <code>llms.txt</code> is generated
          from the tool registry at build time, so the machine-readable tool list can no longer drift out of sync.
        </p>
        <p>
          <strong>Documentation.</strong> Added <Link to="/terms" className={L}>Terms of Service</Link>, updated
          the <Link to="/privacy-policy" className={L}>Privacy Policy</Link> to describe exactly what the AI assistant
          stores and where data is sent, and published a security contact at{' '}
          <a href="/.well-known/security.txt" className={L}>security.txt</a>. The browser tools are unchanged — they
          still collect nothing.
        </p>
        <p>
          <strong>Content.</strong> The three image compressor pages
          (<Link to="/compress-jpg" className={L}>JPG</Link>, <Link to="/compress-png" className={L}>PNG</Link>,{' '}
          <Link to="/compress-webp" className={L}>WebP</Link>) were rewritten with quality-setting tables,
          generation-loss explanations and the actual Canvas pipeline — roughly double the previous depth.
        </p>
      </>
    ),
  },
  {
    title: 'HTML ↔ TSX — convert HTML to TypeScript React components and back',
    summary: 'Two new tools: HTML to TSX builds a complete React.FC<Props> TypeScript component from any HTML snippet, and TSX to HTML strips the TypeScript declarations back out. Browser-based, no upload, no signup.',
    date: 'June 26, 2026',
    datetime: '2026-06-26',
    body: (
      <p>
        New tools: <Link to="/html-to-tsx" className={L}>HTML to TSX</Link> and{' '}
        <Link to="/tsx-to-html" className={L}>TSX to HTML</Link>. HTML→TSX converts any HTML snippet to a complete{' '}
        <code>React.FC&lt;Props&gt;</code> TypeScript component — renames attributes (class→className, for→htmlFor),
        converts inline styles to React style objects, and wraps the output in an <code>interface Props {'{}'}</code>{' '}
        scaffold. TSX→HTML strips TypeScript declarations (interfaces, type aliases, import statements,
        as-assertions) and extracts the JSX return body from a full component before applying the full JSX→HTML
        reverse transformation. Browser-based, no upload, no signup required.
      </p>
    ),
  },
  {
    title: 'Lora — AI assistant for JSON-LD schema markup and SEO, powered by DeepSeek',
    summary: 'Generate Product, Article, FAQ and BreadcrumbList structured data from plain English. Multi-turn chat with skills — pick a task or just ask. Free plan: 100K tokens per month, no credit card required.',
    date: 'June 24, 2026',
    datetime: '2026-06-24',
    body: (
      <p>
        Generate valid <Link to="/ai?skillSlug=product-schema-markup-generator" className={L}>Product JSON-LD schema
        markup</Link>, Article, FAQ, BreadcrumbList and more structured data from plain English descriptions.
        Multi-turn AI chat with skills — select a task or ask anything. Free plan: 100K tokens/month. No credit card
        required.
      </p>
    ),
  },
  {
    title: 'HTML→JSX & JSX→HTML — SVG fixes; JSON→XML root validation',
    summary: 'SVG files from Figma and SVG Repo now convert correctly in both directions — XML declarations stripped, xlink attributes handled, 25+ hyphenated presentation attributes camelCased. JSON→XML now rejects multi-key roots with a clear error.',
    date: 'June 11, 2026',
    datetime: '2026-06-11',
    body: (
      <p>
        <Link to="/html-to-jsx" className={L}>HTML→JSX</Link>: SVG files from Figma or SVG Repo now convert
        correctly — <code>{'<?xml...?>'}</code> declaration stripped, <code>xmlns:xlink</code> removed,{' '}
        <code>xml:space</code>→<code>xmlSpace</code>, <code>xlink:href</code>→<code>href</code>, and all hyphenated
        SVG presentation attrs (<code>fill-rule</code>, <code>stroke-width</code>, <code>clip-path</code>,{' '}
        <code>enable-background</code> and 25 more) converted to camelCase.{' '}
        <Link to="/jsx-to-html" className={L}>JSX→HTML</Link>: full reverse — camelCase SVG attrs restored to their
        hyphenated forms; <code>{'<clipPath>'}</code> element tag correctly preserved while <code>clipPath=</code>{' '}
        attribute is converted. <Link to="/json-to-xml" className={L}>JSON→XML</Link>: multi-key top-level objects now
        throw a clear error with a fix suggestion instead of silently producing invalid XML.
      </p>
    ),
  },
  {
    title: 'Text converter bug fixes across 7 tools; HEIC support in the WebP converter',
    summary: 'Conversion fixes in seven text tools — attribute casing, JSX expression values, strikethrough, CDATA, RFC-4180 quoted fields, XML attribute conventions. The WebP converter now also accepts HEIC and HEIF photos from iPhone.',
    date: 'May 28, 2026',
    datetime: '2026-05-28',
    body: (
      <>
        <p>
          Fixed conversion bugs across seven text tools.{' '}
          <Link to="/html-to-jsx" className={L}>HTML→JSX</Link>: <code>minlength</code>→<code>minLength</code>,{' '}
          <code>ondblclick</code>→<code>onDoubleClick</code>, self-closing void tags no longer get a doubled slash.{' '}
          <Link to="/jsx-to-html" className={L}>JSX→HTML</Link>: JSX expression values now resolve
          (<code>{'{0}'}</code>→<code>"0"</code>, <code>{'{false}'}</code>→removed, <code>{'{true}'}</code>→bare
          attribute), <code>minLength</code>→<code>minlength</code>.{' '}
          <Link to="/html-to-markdown" className={L}>HTML→Markdown</Link>: <code>{'<s>'}</code> and{' '}
          <code>{'<del>'}</code> now convert to <code>~~strikethrough~~</code>.{' '}
          <Link to="/markdown-to-html" className={L}>Markdown→HTML</Link>: single <code>~tilde~</code> no longer
          produces <code>{'<del>'}</code>. <Link to="/xml-to-json" className={L}>XML→JSON</Link>: CDATA sections
          parsed as text instead of empty objects. <Link to="/csv-to-json" className={L}>CSV→JSON</Link>: RFC-4180
          multi-line quoted fields now handled correctly.{' '}
          <Link to="/json-to-xml" className={L}>JSON→XML</Link>: supports both <code>@key</code> and{' '}
          <code>@attributes</code> conventions for XML attributes.
        </p>
        <p>
          <Link to="/webp-converter" className={L}>WebP Converter</Link> now accepts HEIC and HEIF files (iPhone
          photos). Safari decodes HEIC natively with zero library overhead; Chrome and Firefox lazy-load a
          WebAssembly build of libheif only when a HEIC file is detected. The quality slider applies to HEIC
          conversion, and batch processing with ZIP download works the same as for all other formats.
        </p>
      </>
    ),
  },
  {
    title: 'JSX ↔ HTML Converter — accuracy improvements',
    summary: 'JSX→HTML now unwraps fragments, converts JSX comments, and survives CSS values containing commas. HTML→JSX produces correct camelCase for 30+ multi-word React event names that were previously only capitalising the first letter.',
    date: 'May 26, 2026',
    datetime: '2026-05-26',
    body: (
      <p>
        Improved conversion accuracy in <Link to="/jsx-to-html" className={L}>JSX to HTML</Link> and{' '}
        <Link to="/html-to-jsx" className={L}>HTML to JSX</Link>. JSX→HTML now correctly unwraps <code>{'<>'}</code>{' '}
        and <code>{'<React.Fragment>'}</code> shorthand, converts <code>{'{/* */}'}</code> JSX comments to HTML
        comments, and handles CSS values with commas (e.g. <code>rgba()</code>, <code>linear-gradient()</code>) in
        inline style objects without breaking. HTML→JSX now produces correct camelCase for all multi-word React event
        names — <code>onMouseEnter</code>, <code>onKeyDown</code>, <code>onTouchStart</code>, and 30+ others that were
        previously only capitalizing the first letter.
      </p>
    ),
  },
  {
    title: 'HEIC Converter — iPhone photos to JPG and WebP',
    summary: 'Convert iPhone HEIC photos in the browser with no upload. Safari uses the OS decoder at zero library cost; Chrome and Firefox load a WebAssembly build of libheif only when a HEIC file is actually detected.',
    date: 'May 18, 2026',
    datetime: '2026-05-18',
    body: (
      <p>
        New tools: <Link to="/heic-to-jpg" className={L}>HEIC to JPG</Link> and{' '}
        <Link to="/heic-to-webp" className={L}>HEIC to WebP</Link> — convert iPhone photos directly in the browser
        with no upload. Safari uses the native OS HEIC decoder (zero library cost); Chrome and Firefox lazy-load a
        WebAssembly build of libheif only when a HEIC file is detected, leaving all other pages unaffected. Batch
        conversion and ZIP download supported.
      </p>
    ),
  },
  {
    title: 'Text & Code Converters — HTML, Markdown, JSX, JSON, CSV, XML, YAML, Base64',
    summary: '12 new browser-based text converters covering HTML ↔ Markdown, HTML ↔ JSX, JSON ↔ CSV, XML ↔ JSON, YAML ↔ JSON and Base64. Every page ships HowTo steps, comparison tables, 12 FAQ items and three JSON-LD schemas.',
    date: 'May 13, 2026',
    datetime: '2026-05-13',
    body: (
      <p>
        12 new browser-based text converters: <Link to="/html-to-markdown" className={L}>HTML ↔ Markdown</Link>,{' '}
        <Link to="/html-to-jsx" className={L}>HTML ↔ JSX</Link>,{' '}
        <Link to="/json-to-csv" className={L}>JSON ↔ CSV</Link>,{' '}
        <Link to="/xml-to-json" className={L}>XML ↔ JSON</Link>,{' '}
        <Link to="/yaml-to-json" className={L}>YAML ↔ JSON</Link>, and{' '}
        <Link to="/base64-encode" className={L}>Base64 Encode/Decode</Link>. All tools run entirely in the browser —
        no uploads, no server calls. Each page includes full SEO content: HowTo steps, format comparison tables,
        12 FAQ items, and three JSON-LD schemas (WebApplication, HowTo, FAQPage).
      </p>
    ),
  },
  {
    title: 'Schema Markup Generator — Product, Article, FAQ, Organization, Local Business, Breadcrumb',
    summary: 'Six schema generators with live JSON-LD preview, Google Rich Results eligibility validation, missing-field warnings and a direct "Test in Google" link. Fields based on the official Google documentation. No signup.',
    date: 'May 7, 2026',
    datetime: '2026-05-07',
    body: (
      <p>
        New tools: <Link to="/product-schema-generator" className={L}>Product</Link>,{' '}
        <Link to="/article-schema-generator" className={L}>Article</Link>,{' '}
        <Link to="/faq-schema-generator" className={L}>FAQ</Link>,{' '}
        <Link to="/organization-schema-generator" className={L}>Organization</Link>,{' '}
        <Link to="/local-business-schema-generator" className={L}>Local Business</Link>, and{' '}
        <Link to="/breadcrumb-schema-generator" className={L}>Breadcrumb</Link> schema generators — each with live
        JSON-LD preview, Google Rich Results eligibility validation, missing field warnings, and a direct "Test in
        Google" link. Fields based on official Google documentation. No signup required.
      </p>
    ),
  },
  {
    title: 'About page — author profile, EEAT signals, and navigation update',
    summary: 'New About page with the author profile, product principles and contact details, plus Person and WebSite structured data. Sitemap lastmod dates are now hardcoded per page so rebuilds stop resetting them all to the same value.',
    date: 'May 4, 2026',
    datetime: '2026-05-04',
    body: (
      <p>
        New <Link to="/about" className={L}>About page</Link> with full author profile, product principles, and
        contact section. Includes Person + WebSite JSON-LD structured data linking the creator's LinkedIn and GitHub
        profiles for EEAT signals. Desktop header now has Home and About navigation links; sidebar is now
        tool-focused only with a mobile accordion for the Tools section. Sitemap <code>lastmod</code> dates are now
        hardcoded per page so Vercel rebuilds don't reset all dates to the same value.
      </p>
    ),
  },
  {
    title: 'OG Image Generator — full SEO content launch',
    summary: 'Crop any image to 1200×630 or 1:1, tune JPEG quality with a live file-size readout, and get copy-ready Open Graph and Twitter meta tags — with a live social card preview and a drag/zoom/pinch canvas editor.',
    date: 'May 3, 2026',
    datetime: '2026-05-03',
    body: (
      <p>
        New tool: <Link to="/og-image-generator" className={L}>OG Image Generator</Link> — upload any image, crop it
        to 1200×630 px or 1:1, adjust JPEG quality with a live file-size preview, and get copy-ready Open Graph +
        Twitter/X meta tags in one place. Includes a live social card preview, drag/zoom/pinch canvas editor, and
        full SEO content: platform size comparison table, framework code examples for HTML, React, Next.js, Nuxt, and
        WordPress, 10 FAQ items, and HowTo + FAQPage JSON-LD schemas.
      </p>
    ),
  },
  {
    title: 'SEO & Content Deep Dive — Image Converters (Phase 2, complete)',
    summary: 'Full content overhaul of the remaining 16 image converter pages. Each now follows a five-section structure with a privacy explainer, real use cases, a 7-row format comparison table, a when-to-use cheat sheet and a Canvas API breakdown.',
    date: 'May 1, 2026',
    datetime: '2026-05-01',
    body: (
      <p>
        Full SEO and content overhaul of all remaining 16 image converter pages. Every page now uses a 5-section
        structure: browser-based privacy explanation with code snippet, real-world use cases, a 7-row format
        comparison table, a "when to use" cheat-sheet, and a Canvas API technical breakdown. Each page has 10–12
        unique FAQ items and a unique title/description angle targeting a specific pain point. No server uploads —
        all conversion happens locally in the browser.
      </p>
    ),
  },
  {
    title: 'SEO & Content Deep Dive — Image Converters (Phase 1)',
    summary: 'Four key conversion pages rewritten with 6k+ character technical guides, 10+ FAQ items and format comparison tables, including deep explanations of the browser Canvas rendering pipeline with copy-ready code.',
    date: 'April 30, 2026',
    datetime: '2026-04-30',
    body: (
      <p>
        Major content and SEO overhaul for four key image conversion tools:{' '}
        <Link to="/png-to-jpg" className={L}>PNG to JPG</Link>,{' '}
        <Link to="/jpg-to-webp" className={L}>JPG to WebP</Link>,{' '}
        <Link to="/webp-to-png" className={L}>WebP to PNG</Link>, and{' '}
        <Link to="/gif-to-jpg" className={L}>GIF to JPG</Link>. Each page now features an expanded technical guide
        (6k+ characters), comprehensive FAQ (10+ questions), and detailed format comparison tables. Added deep
        technical explanations of the browser-based Canvas API rendering and localized privacy-first processing with
        copy-ready code examples.
      </p>
    ),
  },
  {
    title: 'Codebase refactor — Phase 1: shared UI Kit and data/ structure',
    summary: 'Extracted duplicated per-page components into a shared UI Kit and moved every tool to a consistent data/ structure that separates SEO metadata, structured data and content from UI logic.',
    date: 'April 28, 2026',
    datetime: '2026-04-28',
    body: (
      <p>
        Major internal refactor to standardize how tools are built across the codebase. Extracted duplicated
        per-page components into a shared UI Kit — DropZone, ImagePicker, Table, Buttons, CodeBox, ContentSection,
        PageHeader, ToolSection, RelatedTools, and Lightbox. Each tool page now follows a consistent data/ structure
        (helmet.js, jsonld.js, content.js, formats.js) that separates SEO metadata, structured data, and content from
        UI logic. Adds src/config/site.js as a single source for URL and OG image builders.
      </p>
    ),
  },
  {
    title: 'SEO overhaul — WebP Converter, Favicon Generator, Meta Tag Generator',
    summary: 'Three core tool pages rebuilt: stronger H1s, expanded FAQs feeding both the page and its FAQPage schema, new HowTo structured data, comparison tables and implementation guides for React, Next.js, Vue/Nuxt and WordPress.',
    date: 'April 25, 2026',
    datetime: '2026-04-25',
    body: (
      <p>
        Deep SEO overhaul of three core tool pages: <Link to="/webp-converter" className={L}>WebP Converter</Link>,{' '}
        <Link to="/favicon-generator" className={L}>Favicon Generator</Link>, and{' '}
        <Link to="/meta-tags-generator" className={L}>Meta Tag Generator</Link>. Each page received a stronger H1
        targeting the primary keyword, an expanded FAQ as a single source for both content and FAQPage JSON-LD, a new
        HowTo JSON-LD schema, format and size comparison tables, and implementation guides with copy-ready code
        blocks for React, Next.js, Vue/Nuxt, and WordPress.
      </p>
    ),
  },
  {
    title: 'Home page — SEO restructure',
    summary: 'Added Popular tools, What\'s new, How it works, Why browser-based and Tool categories sections. FAQ expanded to 8 questions, meta description shortened for SERP, and semantic HTML improved throughout.',
    date: 'April 22, 2026',
    datetime: '2026-04-22',
    body: (
      <p>
        Full SEO overhaul of the home page: added Popular tools, What's new, How it works, Why browser-based, and
        Tool categories sections. FAQ expanded to 8 questions covering formats, batch processing, watermarks, and
        pricing. Meta description shortened to fit SERP. JSON-LD fixed to render in the document head. Semantic HTML
        improved: aria-label on sections, article elements for changelog cards, time elements with datetime for all
        dates.
      </p>
    ),
  },
  {
    title: 'Meta Tags Generator, and a proper 404 page',
    summary: 'Generate title, description, canonical, robots, Open Graph, Twitter Card and hreflang tags with a live Google snippet preview. Unknown routes now return a prerendered 404 page with a real HTTP 404 status.',
    date: 'April 21, 2026',
    datetime: '2026-04-21',
    body: (
      <>
        <p>
          Generate complete <Link to="/meta-tags-generator" className={L}>SEO meta tags</Link> — title, description,
          canonical URL, robots directives, Open Graph, Twitter Card, and hreflang — with a live Google search snippet
          preview. Supports advanced settings: multiple hreflang entries, custom robots rules, and OG image
          configuration. Output is copy-ready HTML you paste directly into your page head.
        </p>
        <p>
          Added a dedicated 404 page that handles unknown routes gracefully. The page is pre-rendered at build time
          and served with a proper HTTP 404 status for unmatched paths, which prevents soft 404 errors in Google
          Search Console.
        </p>
      </>
    ),
  },
  {
    title: 'Analytics — Google Tag Manager',
    summary: 'Integrated Google Tag Manager so analytics, conversion tracking and custom events can be added through the GTM interface without touching the codebase or shipping a new deployment.',
    date: 'April 20, 2026',
    datetime: '2026-04-20',
    body: (
      <p>
        Integrated Google Tag Manager for flexible event tracking without touching the codebase. Allows adding
        analytics, conversion tracking, and custom events through the GTM interface without a new deployment.
      </p>
    ),
  },
  {
    title: 'Image Compressor — JPG, PNG, WebP',
    summary: 'Three dedicated compressors with per-file quality sliders, batch processing and a fullscreen preview of the result before downloading. PNG compression is lossless; JPG and WebP are adjustable from 1–100.',
    date: 'April 18, 2026',
    datetime: '2026-04-18',
    body: (
      <p>
        Three dedicated <Link to="/compress-jpg" className={L}>image compressors</Link> with per-file quality
        sliders, batch processing, and a fullscreen lightbox preview of the compressed result before downloading.
        PNG compression is lossless — the browser re-encodes and strips metadata. JPG and WebP compression is lossy
        with adjustable quality from 1–100. All output available as individual files or a single ZIP archive.
      </p>
    ),
  },
  {
    title: 'Image Converter — 20 format pairs',
    summary: 'Twenty conversion pairs across JPG, PNG, WebP, AVIF, GIF, BMP and TIFF. Each pair has its own URL and content explaining when and why to use that specific conversion, with a how-to guide and a tailored FAQ.',
    date: 'April 14, 2026',
    datetime: '2026-04-14',
    body: (
      <p>
        Twenty format <Link to="/png-to-jpg" className={L}>conversion pairs</Link> covering JPG, PNG, WebP, AVIF,
        GIF, BMP and TIFF. Each converter has a dedicated URL with unique content explaining when and why to use that
        specific conversion, a step-by-step how-to guide, related tool links, and a tailored FAQ. All conversion
        happens via the Canvas API with no uploads.
      </p>
    ),
  },
  {
    title: 'WebP Converter & Favicon Generator — batch + quality',
    summary: 'Both tools gained batch processing with ZIP download. The WebP converter added an adjustable 1–100 quality slider; the favicon generator added a live canvas preview of the result before downloading.',
    date: 'April 13, 2026',
    datetime: '2026-04-13',
    body: (
      <p>
        Added batch processing to both tools: drop multiple files, process all at once, download as a ZIP archive.{' '}
        <Link to="/webp-converter" className={L}>WebP Converter</Link> gained an adjustable quality slider (1–100).
        Favicon Generator added a live canvas preview of the generated favicon so you can see the result before
        downloading the full package.
      </p>
    ),
  },
  {
    title: 'Favicon Generator',
    summary: 'Generates a complete favicon package from text, emoji or an image: PNGs at 16, 32, 180, 192 and 512 px, a binary favicon.ico assembled with TypedArrays, site.webmanifest, and an installation guide.',
    date: 'April 12, 2026',
    datetime: '2026-04-12',
    body: (
      <p>
        Generates a complete <Link to="/favicon-generator" className={L}>favicon package</Link> from text, emoji or
        an uploaded image: PNG files at 16, 32, 180, 192 and 512 px; a binary favicon.ico with embedded 16, 32 and
        48 px frames; site.webmanifest; and a docs.txt installation guide. The ICO file is assembled manually using
        TypedArrays — no server processing required.
      </p>
    ),
  },
  {
    title: 'Analytics, cookie consent, Search Console, prerendering and a UI pass',
    summary: 'GDPR cookie consent gating all analytics, Microsoft Clarity for heatmaps, Google Search Console verification, build-time prerendering of every tool page to static HTML, and a layout and typography refresh.',
    date: 'April 9, 2026',
    datetime: '2026-04-09',
    body: (
      <>
        <p>
          <strong>Prerendering.</strong> Enabled server-side prerendering for all tool pages at build time. Each page
          is rendered to static HTML with full meta tags, structured data and content — meaning Google receives a
          fully populated page on first crawl without executing JavaScript.
        </p>
        <p>
          <strong>Privacy.</strong> Added a GDPR-compliant cookie consent banner that appears on first visit. It
          stores your choice in localStorage and blocks analytics scripts until consent is explicitly given.
        </p>
        <p>
          <strong>Analytics.</strong> Integrated Microsoft Clarity for heatmap visualization and session recording,
          to identify how users interact with tool interfaces — drop zones, file tables, quality sliders — and guide
          UX improvements.
        </p>
        <p>
          <strong>Search Console.</strong> Added Google Search Console domain verification, enabling monitoring of
          search performance, index coverage, Core Web Vitals field data, and crawl errors.
        </p>
        <p>
          <strong>UI.</strong> Updated layout, typography and spacing across all pages. Refined sidebar navigation
          and improved responsive behaviour on smaller screens.
        </p>
      </>
    ),
  },
  {
    title: 'Launch — production domain',
    summary: 'Moved to the production domain devtools.abect.com with automatic builds on push to main, including prerendering and sitemap generation as part of the build pipeline.',
    date: 'April 8, 2026',
    datetime: '2026-04-08',
    body: (
      <p>
        Moved to the production domain devtools.abect.com with Vercel deployment. Automatic builds on push to main,
        with prerendering and sitemap generation as part of the build pipeline.
      </p>
    ),
  },
]

export const CHANGELOG_PREVIEW = 3
