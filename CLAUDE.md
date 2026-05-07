# CLAUDE.md — Project context for Claude Code

This file is read automatically at the start of every session. It gives Claude the context needed to work correctly on this project without re-reading docs every time.

---

## What this project is

**Abect Dev Tools** — a static site with browser-based developer tools (image converters, compressors, SEO tools). No backend, no uploads, no server calls. Everything runs in the browser via Canvas API, File API, Blob URL API.

Live: https://devtools.abect.com  
Stack: React 19, React Router 7, Vite 8, SCSS, react-helmet-async  
Deploy: Vercel (auto-deploy on push to `main`)

---

## Key files to read before making changes

| Task | Read first |
|------|-----------|
| Adding a new tool | `docs/contribution.md` |
| Changing routes / prerender | `src/prerender-routes.js`, `src/config/tools.js`, `src/App.jsx` |
| Changing nav | `src/components/Sidebar/Sidebar.jsx` |
| Changing home page | `src/pages/Home/Home.jsx` |
| SEO / head tags | `src/config/site.js` |
| Build pipeline | `scripts/prerender.mjs`, `package.json` |

---

## How prerender + sitemap works

```
npm run build
  └─ vite build           →  dist/
  └─ vite build --ssr     →  dist/server/entry-server.js
  └─ node prerender.mjs   →  writes dist/[route]/index.html for each route
                          →  writes dist/sitemap.xml
                          →  writes dist/404.html
                          →  removes dist/server/
```

**`src/prerender-routes.js`** exports `prerenderRoutes`. It hard-codes home/about/privacy, then spreads `TOOLS` from `src/config/tools.js`. Adding a tool to `tools.js` automatically adds it to the prerender list and sitemap.

**`lastmod` must be hardcoded** in `tools.js` (e.g. `lastmod: '2026-05-06'`). Never use a dynamic date — Vercel rebuilds would reset all dates on every push.

---

## Adding a new tool — mandatory checklist

1. **`src/config/tools.js`** — add `{ category, name, description, route, lastmod }` (drives prerender + sitemap)
2. **`src/App.jsx`** — add `<Route>`
3. **`src/components/Sidebar/Sidebar.jsx`** — add to `NAV_SECTIONS` with `ready: true`
4. **`src/pages/Home/Home.jsx`** — add to `POPULAR_ROUTES` if priority
5. **`src/pages/Home/Home.jsx`** — add to `CHANGELOG` array (new tools + big updates only; skip for fixes)

Every tool page lives in `src/pages/ToolName/` and must have a `data/` subdirectory:
- `data/helmet.js` — SEO constants via `buildPageUrl` / `buildOgImageUrl` from `src/config/site.js`
- `data/jsonld.js` — JSON-LD objects, never constructed inside the component
- `data/content.js` — all user-visible text (sections, FAQ, howTo steps, related slugs)
- `data/formats.js` — optional, only for technical constants (mime types, extensions, quality values)

OG image: `public/seo/[slug]-og.jpg` — 1200×630 px JPEG.

---

## Two tool types

**Single tool** — one URL, static SEO constants in `helmet.js`.

**Family tool** — one component handles multiple slugs. The slug is read from `useLocation().pathname`. Each slug has its own config entry in `content.js`. Sidebar needs `customActive` to highlight the right nav item across all slugs.

---

## Content standards (SEO — enforced)

Every tool page must have:
- `<title>` 50–60 chars, keyword first, ends with `| Abect`
- `<meta name="description">` 120–155 chars with a CTA ("Try it now", "No signup")
- `<link rel="canonical">` — exact URL, no trailing slash
- Full OG + Twitter Card tags
- `WebApplication` JSON-LD + `FAQPage` JSON-LD (+ `HowTo` JSON-LD where applicable)
- **Minimum 10 FAQ items** (not 4–5)
- **Minimum ~5 000 characters** of visible text across `<ContentSection>` blocks

### Standard 5-section structure for image tool pages

1. **Privacy / how it works** — paragraph + code example showing Canvas API
2. **Real use cases** — who needs this, specific scenarios
3. **Format comparison** — table with 6–8 rows (`headers`, `rows`)
4. **When to use / when not to** — `h3` + `ul` pairs with `**bold**` highlights
5. **Technical deep-dive** — paragraph + detailed code example

---

## Block types in `content.js`

The component renders `config.sections` (array) falling back to `[config.whatIs]`. Use `sections` for new tools.

| type | renders as | fields |
|------|-----------|--------|
| `'p'` | `<p>` | `text` — supports `**bold**` |
| `'h3'` | `<h3>` | `text` |
| `'ul'` | `<ul>` | `items: string[]` — supports `**bold**` |
| `'table'` | `<Table>` | `headers: string[]`, `rows: string[][]` |
| `'code'` | `<CodeBox>` | `label: string`, `code: string` |

---

## Shared components (never rewrite from scratch)

All in `src/components/`:
`PageHeader`, `ToolSection`, `ContentSection`, `FAQ`, `RelatedTools`, `DropZone`, `ImagePicker`, `CodeBox`, `Lightbox`, `Table`, `SegmentedControl`, `Buttons` (DeleteButton, DownloadButton, ClearAllButton, PrimaryButton, SecondaryButton, AccentButton)

`Header`, `Sidebar`, `CookieConsent` — part of `Layout`, rendered automatically, never import them in page components.

---

## Changelog rule

`CHANGELOG` in `Home.jsx` — prepend a new entry when:
- A new tool is added
- A major SEO/content overhaul ships (5+ pages or significant structural change)

Skip for: CSS fixes, copy edits, minor bug fixes, refactors.

---

## What NOT to do

- No backend calls, no fetch to external APIs, no file uploads
- Never construct JSON-LD inside the component — put it in `data/jsonld.js`
- Never mix technical constants (mime types, quality values) into `content.js` — use `formats.js`
- Never use a dynamic date for `lastmod` in `tools.js`
- Never add `Header`, `Sidebar`, or `CookieConsent` to a page component
- Never use URLs not built via `buildPageUrl()` / `buildOgImageUrl()` from `src/config/site.js`
