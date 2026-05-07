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

**27 tools available today:**

| Category | Tools |
|----------|-------|
| **Image Conversion** | PNG→JPG, JPG→PNG, JPG→WebP, PNG→WebP, WebP→JPG, WebP→PNG, GIF→JPG/PNG/WebP, BMP→JPG/PNG/WebP, AVIF→JPG/PNG/WebP, TIFF→JPG/PNG/WebP |
| **Image Compression** | Compress JPG, Compress PNG, Compress WebP |
| **Image Tools** | WebP Converter (with quality slider), Favicon Generator (from text, emoji, or image) |
| **SEO Tools** | Meta Tag Generator (title, description, OG, hreflang, canonical), OG Image Generator (crop to 1200×630, live preview) |

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
│   │   │   └── data/
│   │   │       ├── helmet.js         # SEO constants
│   │   │       ├── jsonld.js         # JSON-LD builders
│   │   │       ├── content.js        # Per-slug text: sections, FAQ, howTo
│   │   │       └── formats.js        # Mime types, quality values
│   │   ├── FaviconGenerator/
│   │   ├── Home/
│   │   ├── ImageConverter/     # Handles all 20 format conversion routes
│   │   │   └── data/
│   │   │       ├── helmet.js
│   │   │       ├── jsonld.js
│   │   │       ├── content.js        # CONVERSIONS dict — one entry per slug
│   │   │       └── formats.js
│   │   ├── MetaTagsGenerator/
│   │   ├── OGImageGenerator/
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

The sitemap is generated automatically during build. `lastmod` dates are **hardcoded per page** in `src/config/tools.js` — not derived from file modification time — so Vercel rebuilds don't reset all dates to the same value.

Full SEO audit: [`docs/SEO.md`](docs/SEO.md) — current score **77/100**.

---

## Contributing

This project is **open for contributions**. If you want to add a new tool, fix a bug, or improve content — pull requests are welcome.

### Adding a new tool

Each tool is a self-contained page. Full instructions are in [`docs/contribution.md`](docs/contribution.md). Short version:

**1. Create the page directory**

```
src/pages/YourTool/
├── data/
│   ├── helmet.js    # SLUG, PAGE_URL, OG_IMAGE, PAGE_TITLE, PAGE_DESC
│   ├── jsonld.js    # JSON-LD objects — never build these inside the component
│   └── content.js  # All user-visible text: howTo steps, sections, FAQ, related slugs
├── YourTool.jsx
└── YourTool.scss
```

**2. Register in four places**

| File | What to add |
|------|-------------|
| `src/config/tools.js` | `{ category, name, description, route, lastmod }` — auto-adds to prerender + sitemap |
| `src/App.jsx` | `<Route path="your-tool" element={<YourTool />} />` |
| `src/components/Sidebar/Sidebar.jsx` | Item in `NAV_SECTIONS` with `ready: true` |
| `src/pages/Home/Home.jsx` | Add to `POPULAR_ROUTES` if priority; add to `CHANGELOG` for big launches |

**3. Content requirements**

- `<title>` 50–60 chars, keyword first, ends with `| Abect`
- `<meta name="description">` 120–155 chars with a CTA
- `<link rel="canonical">` — exact URL, no trailing slash
- Full OG + Twitter Card tags + `WebApplication` + `FAQPage` JSON-LD
- At least **10 FAQ items**
- At least **~5 000 characters** of visible text across `<ContentSection>` blocks (use tables, lists, code examples — not padding)
- OG image: `public/seo/your-tool-og.jpg` — 1200×630 px JPEG

### Code style

- No comments unless the **why** is non-obvious
- Plain JSX — no TypeScript
- SASS scoped per component (`ComponentName.scss`)
- All processing logic in `utils/` as pure functions
- No backend calls, no external APIs, no file uploads — everything must run in the browser

### Pull request checklist

- [ ] Tool runs 100% in the browser (no uploads, no server calls)
- [ ] `data/helmet.js`, `data/jsonld.js`, `data/content.js` created
- [ ] Page has a complete `<Helmet>` block (title, description, canonical, OG, JSON-LD)
- [ ] OG image added to `public/seo/` — `your-tool-og.jpg`, 1200×630 px
- [ ] Tool registered in `src/config/tools.js` with hardcoded `lastmod`
- [ ] Route added in `src/App.jsx`
- [ ] Tool added to `Sidebar.jsx` nav
- [ ] Changelog entry added in `Home.jsx` (new tools only)
- [ ] Visible text content is ~5 000+ characters
- [ ] FAQ has at least 10 items
- [ ] `npm run build` completes without errors

---

## License

MIT

---

Built by [Roman Popovych](https://github.com/forze-dev) · [devtools.abect.com](https://devtools.abect.com)
