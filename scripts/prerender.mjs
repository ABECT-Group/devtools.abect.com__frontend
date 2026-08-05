import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { prerenderRoutes, sitemapRoutes } from '../src/prerender-routes.js'
import { TOOLS } from '../src/config/tools.js'
import {
  LLMS_TITLE, LLMS_SUMMARY, LLMS_SECTIONS, LLMS_AI_SECTION, LLMS_PAGES, LLMS_OUTRO,
} from '../src/config/llms.js'

const SITE_ORIGIN = 'https://devtools.abect.com'
const currentFile = fileURLToPath(import.meta.url)
const rootDir = path.resolve(path.dirname(currentFile), '..')
const distDir = path.join(rootDir, 'dist')
const templatePath = path.join(distDir, 'index.html')
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js')

const rawTemplate = await readFile(templatePath, 'utf8')
// Strip crossorigin from same-origin stylesheet links (Vite adds it for module scripts; unnecessary for same-origin assets)
const template = rawTemplate.replace(/<link rel="stylesheet" crossorigin /g, '<link rel="stylesheet" ')
const { render } = await import(pathToFileURL(serverEntryPath).href)

function buildPage(route) {
  const { appHtml, headTags } = render(route)
  // Replacer FUNCTIONS, not strings: with a string replacement, `$$`, `$&`,
  // "$`" and `$'` inside the rendered markup are treated as substitution
  // patterns. Page copy containing a price range ("$", "$$", "$$$"), a regex or
  // a shell snippet would silently corrupt the output — `$&` literally injects
  // the matched <div id="root"></div> back into the page text.
  return template
    .replace('<!--app-head-->', () => headTags)
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
}

for (const route of prerenderRoutes) {
  const outputPath = route === '/'
    ? templatePath
    : path.join(distDir, route.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, buildPage(route))
}

// ── sitemap.xml — indexable routes only ──────────────────────────────────────
const sitemapEntries = sitemapRoutes.map(({ route, lastmod, priority, changefreq }) => [
  '  <url>',
  `    <loc>${new URL(route, SITE_ORIGIN).href}</loc>`,
  `    <lastmod>${lastmod}</lastmod>`,
  `    <changefreq>${changefreq}</changefreq>`,
  `    <priority>${priority}</priority>`,
  '  </url>',
].join('\n'))
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  '</urlset>',
].join('\n')

await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml)

// ── llms.txt — generated from the tool registry so it cannot go stale ────────
const toolLine = ({ name, route, description }) =>
  `- [${name}](${new URL(route, SITE_ORIGIN).href}): ${description}`

const listedCategories = new Set([...LLMS_SECTIONS, LLMS_AI_SECTION].map(s => s.category))
const unlisted = TOOLS.filter(tool => !listedCategories.has(tool.category))
if (unlisted.length > 0) {
  throw new Error(
    `llms.txt: no section defined for categor${unlisted.length > 1 ? 'ies' : 'y'} ` +
    `${[...new Set(unlisted.map(t => t.category))].map(c => `"${c}"`).join(', ')}. ` +
    'Add it to LLMS_SECTIONS in src/config/llms.js.'
  )
}

const renderSection = ({ category, heading, note }) => {
  const tools = TOOLS.filter(tool => tool.category === category)
  if (tools.length === 0) return null
  return [
    `### ${heading} (${tools.length} ${tools.length === 1 ? 'tool' : 'tools'})`,
    '',
    note,
    '',
    ...tools.map(toolLine),
    '',
  ].join('\n')
}

const llmsTxt = [
  `# ${LLMS_TITLE}`,
  '',
  `> ${LLMS_SUMMARY}`,
  '',
  '## Free browser tools',
  '',
  'No account, no upload, no watermark, no usage limit. All processing happens in the browser via the Canvas API, File API and Blob URL API.',
  '',
  ...LLMS_SECTIONS.map(renderSection).filter(Boolean),
  `## ${LLMS_AI_SECTION.heading}`,
  '',
  LLMS_AI_SECTION.note,
  '',
  ...TOOLS.filter(tool => tool.category === LLMS_AI_SECTION.category).map(toolLine),
  '',
  '## Site pages',
  '',
  ...LLMS_PAGES.map(toolLine),
  '',
  LLMS_OUTRO,
  '',
].join('\n')

await writeFile(path.join(distDir, 'llms.txt'), llmsTxt)

// Render 404.html — the host serves it with HTTP 404 for unknown routes
await writeFile(path.join(distDir, '404.html'), buildPage('/404'))

await rm(path.join(distDir, 'server'), { recursive: true, force: true })
