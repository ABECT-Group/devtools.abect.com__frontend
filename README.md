# Abect Developer Tools

**Free online image converter, compressor, favicon generator & SEO tools — all in your browser.**

[![Live](https://img.shields.io/badge/Live-devtools.abect.com-blue?style=flat-square)](https://devtools.abect.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/ABECT-Group/devtools.abect.com__frontend/pulls)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## What is this?

[devtools.abect.com](https://devtools.abect.com) is an open-source collection of **browser-based developer tools** — no backend, no uploads, no account required. Every tool runs entirely in the browser using native APIs (Canvas API, File API, Blob URL API). Files never leave your device.

**26 tools available today:**

| Category | Tools |
|----------|-------|
| **Image Conversion** | PNG→JPG, JPG→PNG, JPG→WebP, PNG→WebP, WebP→JPG, WebP→PNG, GIF→JPG/PNG/WebP, BMP→JPG/PNG/WebP, AVIF→JPG/PNG/WebP, TIFF→JPG/PNG/WebP |
| **Image Compression** | Compress JPG, Compress PNG, Compress WebP |
| **Image Tools** | WebP Converter (with quality slider), Favicon Generator (from text, emoji, or image) |
| **SEO Tools** | Meta Tag Generator (title, description, OG, hreflang, canonical) |

---

## How it works

```
User drops a file
       ↓
File API reads it directly in the browser tab
       ↓
Canvas API converts / compresses it
       ↓
Blob URL API creates a download link
       ↓
User downloads the result
```

**Zero network activity.** Open DevTools → Network tab while using any tool — you will see no file transfers.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 |
| Bundler | Vite 8 |
| Routing | React Router 7 |
| SEO / Head | react-helmet-async |
| Styles | SASS (component-scoped) |
| Rendering | SSR pre-rendering (static HTML at build time) |
| Deployment | Vercel |
| Analytics | Google Tag Manager → GA4 + Microsoft Clarity (consent-gated) |
| Zip archives | JSZip |

All image processing is done via the **Canvas API** — no third-party image libraries, no WASM, no server.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Local development

```bash
git clone https://github.com/ABECT-Group/devtools.abect.com__frontend.git
cd devtools.abect.com__frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
```

This runs three steps:
1. `vite build` — builds the client bundle
2. `vite build --ssr` — builds the SSR entry
3. `node scripts/prerender.mjs` — renders all routes to static HTML, generates `sitemap.xml`

Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
├── public/
│   ├── seo/                    # OG images (1200×630 JPG, one per tool category)
│   ├── llms.txt                # AI crawler index (Anthropic, OpenAI, etc.)
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   └── prerender.mjs           # SSR prerender + sitemap.xml generation
├── src/
│   ├── components/
│   │   ├── FAQ/                # Reusable FAQ accordion (schema-ready)
│   │   ├── Header/
│   │   ├── Layout/
│   │   ├── Lightbox/
│   │   └── Sidebar/
│   ├── config/
│   │   └── tools.js            # Master list of all tools (name, route, category)
│   ├── pages/
│   │   ├── CompressImage/      # Handles compress-jpg, compress-png, compress-webp
│   │   │   └── config/
│   │   │       └── compressions.js   # Per-format SEO content, FAQ, howTo steps
│   │   ├── FaviconGenerator/
│   │   ├── Home/
│   │   ├── ImageConverter/     # Handles all 20 format conversion routes
│   │   │   └── config/
│   │   │       └── conversions.js    # Per-route SEO content, FAQ, howTo steps
│   │   ├── MetaTagsGenerator/
│   │   ├── NotFound/
│   │   ├── PrivacyPolicy/
│   │   └── WebPConverter/
│   ├── App.jsx                 # Route definitions
│   ├── entry-server.jsx        # SSR entry point
│   ├── main.jsx                # Client entry point
│   └── prerender-routes.js     # List of routes to prerender
├── docs/
│   └── SEO.md                  # Full SEO audit + action plan (score: 77/100)
├── vercel.json
└── index.html                  # HTML shell (charset first, then GTM)
```

---

## SEO Architecture

Every page is pre-rendered to static HTML at build time — Google crawls fully-populated pages without executing JavaScript.

Each page includes:
- Unique `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- Full Open Graph and Twitter Card tags
- Per-page OG image (1200×630 JPG)
- `WebApplication` + `FAQPage` JSON-LD structured data on tool pages
- `WebSite` + `FAQPage` JSON-LD on the homepage

The sitemap is generated automatically during build with per-page `lastmod` derived from source file modification time.

Full SEO audit: [`docs/SEO.md`](docs/SEO.md) — current score **77/100**.

---

## Contributing

This project is **open for contributions**. If you want to add a new tool, fix a bug, or improve content — pull requests are welcome.

### Adding a new tool

Each tool is a self-contained page with its own route, SEO config, and content. Here is the general pattern:

**1. Create the page component**

```
src/pages/YourTool/
├── YourTool.jsx       # Main component with <Helmet> SEO block
├── YourTool.scss
└── utils/             # Pure JS utility functions (no DOM, no uploads)
```

**2. Add the route in `App.jsx`**

```jsx
import YourTool from './pages/YourTool/YourTool'

// Inside <Routes>:
<Route path="your-tool" element={<YourTool />} />
```

**3. Register in `src/config/tools.js`**

```js
{ category: 'Category', name: 'Your Tool', description: 'One-line description', route: '/your-tool' }
```

The route is automatically added to the prerender list, sitemap, and sidebar navigation.

**4. SEO — required `<Helmet>` block**

```jsx
<Helmet>
  <title>Descriptive Tool Title | Abect</title>
  <meta name="description" content="Action-oriented description under 160 chars." />
  <link rel="canonical" href="https://devtools.abect.com/your-tool" />
  <meta property="og:title" content="Descriptive Tool Title | Abect" />
  <meta property="og:description" content="Action-oriented description under 160 chars." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://devtools.abect.com/your-tool" />
  <meta property="og:image" content="https://devtools.abect.com/seo/your-tool-og.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Descriptive Tool Title | Abect" />
  <meta name="twitter:description" content="Action-oriented description under 160 chars." />
  <meta name="twitter:image" content="https://devtools.abect.com/seo/your-tool-og.jpg" />
  <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
  <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
</Helmet>
```

Also add a 1200×630 OG image to `public/seo/your-tool-og.jpg`.

**5. Content requirements**

A good tool page includes:
- `<h1>` with the primary keyword (include "Free", "Online" where natural)
- "How to use" section with numbered steps (used for HowTo structured data)
- Explanatory content: what the tool does, when to use it, format comparisons with concrete numbers
- FAQ section — minimum 5 questions, use the `<FAQ items={faqArray} />` component
- Related tools section

### Code style

- No comments unless the **why** is non-obvious
- Plain JSX — no TypeScript
- SASS scoped per component (`ComponentName.scss`)
- All processing logic in `utils/` as pure functions
- No backend calls, no external APIs, no file uploads — everything must run in the browser

### Pull request checklist

- [ ] Tool runs 100% in the browser (no uploads, no server calls)
- [ ] Page has a complete `<Helmet>` block (title, description, canonical, OG, JSON-LD)
- [ ] OG image added to `public/seo/` — `your-tool-og.jpg`, 1200×630 px
- [ ] Tool registered in `src/config/tools.js`
- [ ] Route added in `App.jsx`
- [ ] `npm run build` completes without errors
- [ ] Tested in Chrome and Firefox

---

## License

MIT

---

Built by [Roman Popovych](https://github.com/forze-dev) · [devtools.abect.com](https://devtools.abect.com)
