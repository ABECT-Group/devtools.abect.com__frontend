# Abect Developer Tools

**Free online image converters, compressors, text/code converters, favicon and SEO generators — all running in your browser.**

[![Live](https://img.shields.io/badge/Live-devtools.abect.com-blue?style=flat-square)](https://devtools.abect.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/ABECT-Group/devtools.abect.com__frontend/pulls)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## What is this?

[devtools.abect.com](https://devtools.abect.com) has two clearly separated layers.

**Layer 1 — 49 free browser tools.** No backend, no uploads, no account. Everything runs in the browser via native APIs (Canvas, File, Blob URL, TypedArrays). Files never leave the device.

| Category | Count | Tools |
|----------|-------|-------|
| **Images** | 27 | 22 format conversions (PNG/JPG/JPEG/WebP/GIF/BMP/AVIF/TIFF/HEIC pairs), 3 compressors (JPG, PNG, WebP), WebP Converter, Favicon Generator |
| **Text & Code** | 14 | HTML ↔ Markdown, HTML ↔ JSX, HTML ↔ TSX, JSON ↔ CSV, XML ↔ JSON, YAML ↔ JSON, Base64 encode/decode |
| **SEO** | 8 | Meta Tag Generator, OG Image Generator, and 6 JSON-LD schema generators (Product, Article, FAQ, Organization, Local Business, Breadcrumb) |

**Layer 2 — Lora, an AI assistant** at `/ai`. Unlike everything above, it runs server-side: it requires a free account and spends tokens from a monthly allowance, calling `devtools-api.abect.com` (a separate repository) which proxies DeepSeek. The free browser tools are unaffected by it and stay account-free.

The distinction matters throughout the codebase and the copy: the home page counts and describes **only** the 49 free tools.

---

## How the browser tools work

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

**Zero network activity.** Open DevTools → Network while using any of them — no file transfers. They keep working with the network disconnected.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 |
| Bundler | Vite 8 (rolldown) |
| Routing | React Router 7 — classic `<Routes>`, not the data router |
| State | Zustand (auth, conversations, theme) |
| Head tags | React 19 native metadata hoisting, via `react-helmet-async` |
| Styles | SCSS, BEM, one file per component, all colours through CSS custom properties |
| Rendering | SSG — every route prerendered to static HTML at build time |
| Deployment | Vercel |
| Analytics | GTM → GA4 + Microsoft Clarity (consent-gated), Vercel Web Analytics (cookieless) |

Lazy-loaded on demand only: `jszip`, `marked`, `turndown`, `js-yaml`, `react-markdown` + `remark-gfm`, and a WebAssembly build of `libheif` (`heic-to`) that loads only when a HEIC file is detected.

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

`VITE_API_URL` in `.env` points at the backend for the AI layer (`http://localhost:3001` in dev). The browser tools work without it.

### Production build

```bash
npm run build
```

Three steps:

1. `vite build` — client bundle
2. `vite build --ssr src/entry-server.jsx` — SSR entry
3. `node scripts/prerender.mjs` — renders every route to static HTML and generates `sitemap.xml`, `llms.txt` and `404.html`

```bash
npm run preview   # serve the production build
npm run lint
node tests/<name>.test.mjs   # plain Node assertions, no framework
```

---

## Project Structure

```
├── public/
│   ├── seo/                      # OG images, 1200×630 JPG (one per tool family)
│   ├── .well-known/
│   │   └── security.txt          # RFC 9116 — has a mandatory Expires field, renew yearly
│   ├── robots.txt
│   └── site.webmanifest
│                                 # NOTE: llms.txt is NOT here — it is generated at build time
├── scripts/
│   └── prerender.mjs             # SSG pass: HTML + sitemap.xml + llms.txt + 404.html
├── src/
│   ├── api/                      # fetch wrappers per domain (auth, user, ai, skills)
│   ├── store/                    # Zustand stores
│   ├── config/
│   │   ├── tools.js              # SINGLE SOURCE OF TRUTH — drives prerender, sitemap, llms.txt, home index
│   │   ├── site.js               # BASE_URL, buildPageUrl, buildOgImageUrl
│   │   ├── schema.js             # site-wide Organization + tool BreadcrumbList builder
│   │   └── llms.js               # prose for the generated llms.txt
│   ├── components/               # shared UI kit (see docs/contribution.md)
│   │   ├── JsonLd/               # declares structured data — see "SEO architecture"
│   │   ├── ChangelogCard/        # one card, used by both / and /changelog
│   │   └── …
│   ├── pages/
│   │   ├── Home/
│   │   ├── Changelog/
│   │   │   └── data/entries.jsx  # the changelog itself — one entry per calendar day
│   │   ├── ImageConverter/       # family page: 22 conversion routes
│   │   ├── CompressImage/        # family page: 3 compressor routes
│   │   ├── TextConverter/        # family page: 14 routes
│   │   ├── JsonLdGenerator/      # family page: 6 schema routes
│   │   ├── FaviconGenerator/  WebPConverter/  MetaTagsGenerator/  OGImageGenerator/
│   │   ├── AiPage/               # Lora — chat, SSE streaming, skills
│   │   ├── About/  Terms/  PrivacyPolicy/  NotFound/
│   │   └── Login/  Register/  ForgotPassword/  ResetPassword/  Profile/
│   ├── App.jsx                   # route definitions
│   ├── entry-server.jsx          # SSR entry — also injects collected JSON-LD into <head>
│   ├── main.jsx                  # client entry (hydration)
│   └── prerender-routes.js       # sitemapRoutes (indexable) + noindexRoutes (private)
├── docs/
│   ├── contribution.md           # how to add a tool — read this before contributing
│   └── technical_specification.md
├── tests/                        # plain Node assertion tests for the text converters
├── vercel.json
└── index.html                    # HTML shell
```

---

## SEO architecture

Every route is prerendered to static HTML at build time, so a crawler receives a fully populated page without executing JavaScript. There is no server rendering at request time.

### What every indexable page carries

- Unique `<title>` (≤ 65 chars) and `<meta name="description">` (≤ 155 chars)
- `<link rel="canonical">` — exact URL, no trailing slash
- Full Open Graph + Twitter Card tags
- `WebApplication` + `HowTo` + `FAQPage` JSON-LD on tool pages
- `BreadcrumbList` and the site-wide `Organization` entity, injected once from `Layout` for every route in `tools.js`
- ~5 000+ characters of visible text and at least 10 FAQ items

### Structured data — use the `JsonLd` component

React 19 hoists `<title>`, `<meta>` and `<link>` into `<head>` automatically, but **not** inline `<script>` tags. Rendering JSON-LD directly in a component leaves it in `<body>`.

So pages declare schemas with `<JsonLd data={…} />`, placed right after `</Helmet>`. The component renders `null` on both server and client; the prerender pass collects everything declared during SSR and serialises it into `<head>`, escaping every `<` as a `<` unicode sequence so schema text can never break out of the script tag.

```jsx
<Helmet>{/* title, description, canonical, OG, Twitter */}</Helmet>

<JsonLd data={jsonLdApp} />
<JsonLd data={jsonLdHowTo} />
<JsonLd data={jsonLdFaq} />
```

A `FAQPage` schema must always match the `<FAQ>` items actually rendered — build both from the same array.

### Indexable vs private routes

`src/prerender-routes.js` exports two lists:

- **`sitemapRoutes`** — prerendered *and* listed in `sitemap.xml`
- **`noindexRoutes`** — prerendered but kept out of the sitemap: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/profile/*`

Private pages are still prerendered on purpose: they must answer **HTTP 200**, not fall through to `404.html`. A password-reset link landing on a 404 status is both a UX and an indexing problem. Every route in `noindexRoutes` must render `<meta name="robots" content="noindex">`; for anything behind `ProtectedRoute` that directive is declared in the guard itself, because during prerender `loading` is still true and no child page renders.

`robots.txt` intentionally contains **no `Disallow` rules** — a crawler has to be able to fetch a page to read its `noindex`.

### Generated at build time

| File | Source |
|------|--------|
| `sitemap.xml` | `sitemapRoutes` — `lastmod` hardcoded per page, never derived from the build date |
| `llms.txt` | `tools.js` + prose in `src/config/llms.js`. **Never hand-edit it** — adding a tool to the registry updates it automatically, and a new category without a matching section fails the build loudly |
| `404.html` | rendered from the `/404` route; Vercel serves it with a real 404 status |

---

## Gotchas worth knowing before you touch the build

**1. `renderToString` cannot render `React.lazy`.** The SSG pass uses `renderToString`, which does not support Suspense — a lazy component emits its *fallback* into the static HTML instead of the content. Route-level code splitting would therefore replace the indexable content of all 50+ pages with a loading placeholder. Heavy dependencies are dynamically imported at their call sites instead (`await import('jszip')` inside the ZIP builder, and so on). `React.lazy` is only safe for UI that never renders during prerender — the chat's Markdown renderer is one such case, because the prerendered `/ai` page has zero messages.

**2. Never use a string replacement when injecting rendered markup.** In `String.prototype.replace`, a *string* replacement treats `$$`, `$&`, `` $` `` and `$'` as substitution patterns. Page copy containing a price range (`"$", "$$", "$$$"`), a regex or a shell snippet silently corrupts the output — `$&` literally injects the matched text back into the page. `scripts/prerender.mjs` uses replacer **functions** for exactly this reason. Do not "simplify" them back.

**3. `vercel.json` must not use the legacy `routes` property.** Mixing it with `cleanUrls` / `headers` / `rewrites` makes Vercel silently ignore the modern ones — which is how the security headers went missing in production for months. The current config uses `cleanUrls`, `trailingSlash`, `rewrites` and `headers` only.

---

## Contributing

Pull requests are welcome. Full instructions live in [`docs/contribution.md`](docs/contribution.md) — read it before starting. Short version:

### 1. Create the page directory

```
src/pages/YourTool/
├── data/
│   ├── helmet.js    # SLUG, PAGE_URL, OG_IMAGE, PAGE_TITLE, PAGE_DESC
│   ├── jsonld.js    # JSON-LD objects — never build these inside the component
│   └── content.js   # all user-visible text: howTo steps, sections, FAQ, related slugs
├── YourTool.jsx
└── YourTool.scss
```

### 2. Register it

| File | What to add |
|------|-------------|
| `src/config/tools.js` | `{ category, name, description, route, lastmod }` — this alone adds the page to the prerender pass, `sitemap.xml`, `llms.txt` and the home-page index |
| `src/App.jsx` | `<Route path="your-tool" element={<YourTool />} />` |
| `src/components/Sidebar/Sidebar.jsx` | entry in `NAV_SECTIONS` with `ready: true` |
| `src/pages/Home/Home.jsx` | add to `POPULAR_ROUTES` if it is a priority page |
| `src/pages/Changelog/data/entries.jsx` | changelog entry for a new tool or a significant update |

### 3. Changelog rules

One file feeds two pages: the home page shows the three newest entries as `summary` text with a "Show more →" link, `/changelog` shows every entry in full.

- **One entry per calendar day** — the anchor is derived from the date (`2026-08-05` → `#05-08-2026`), so two entries on one date would collide. Shipped several things at once? Merge them into one entry with a paragraph per topic.
- `summary` — plain text, **max 300 characters**, no JSX, no links.
- `body` — JSX; links use `className={L}` (the shared `ChangelogCard__link`).
- Newest first. Never rewrite a published entry's facts — correct it in a new one.

### 4. Content requirements

- `<title>` 50–60 chars, keyword first, ends with `| Abect`
- `<meta name="description">` 120–155 chars with a CTA
- `<link rel="canonical">` — exact URL, no trailing slash
- Full OG + Twitter tags, and `WebApplication` + `FAQPage` JSON-LD **via `<JsonLd>`**
- At least **10 FAQ items**, matching the `FAQPage` schema exactly
- At least **~5 000 characters** of visible text across `<ContentSection>` blocks — tables, lists and code examples, not padding
- OG image at `public/seo/your-tool-og.jpg`, 1200×630 JPEG (families may share one)

### Code style

- Comment the **why**, not the what
- Plain JSX — no TypeScript
- SCSS scoped per component, BEM naming, colours only through CSS custom properties
- Processing logic lives in `utils/` as pure functions
- Browser tools make no backend calls and never upload anything

### Pull request checklist

- [ ] Tool runs 100% in the browser (no uploads, no server calls)
- [ ] `data/helmet.js`, `data/jsonld.js`, `data/content.js` created
- [ ] Schemas rendered with `<JsonLd>` — no raw `<script type="application/ld+json">` in the component
- [ ] Complete `<Helmet>` block (title, description, canonical, OG, Twitter)
- [ ] OG image in `public/seo/`, 1200×630
- [ ] Registered in `src/config/tools.js` with a hardcoded `lastmod`
- [ ] Route added in `src/App.jsx`, entry added to `Sidebar.jsx`
- [ ] Changelog entry in `src/pages/Changelog/data/entries.jsx` (new tools and big updates only, one per day)
- [ ] Visible text ≥ 5 000 characters, FAQ ≥ 10 items
- [ ] `npm run lint` clean of new errors, text-converter tests pass
- [ ] `npm run build` completes without errors

---

## License

[MIT](LICENSE) — © 2026 Roman Popovych.

The licence covers the source code. The Abect name, branding and site copy are not
covered by it, as stated in the [Terms of Service](https://devtools.abect.com/terms).

---

Built by [Roman Popovych](https://github.com/forze-dev) · [devtools.abect.com](https://devtools.abect.com)
