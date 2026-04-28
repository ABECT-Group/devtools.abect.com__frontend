import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { prerenderRoutes } from '../src/prerender-routes.js'

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

for (const route of prerenderRoutes) {
  const { appHtml, headTags } = render(route)
  const pageHtml = template
    .replace('<!--app-head-->', headTags)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outputPath = route === '/'
    ? templatePath
    : path.join(distDir, route.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, pageHtml)
}

// Source file map — used to derive lastmod from actual file modification time
const ROUTE_SOURCE = {
  '/':                    'src/pages/Home/Home.jsx',
  '/meta-tags-generator': 'src/pages/MetaTagsGenerator/MetaTagsGenerator.jsx',
  '/webp-converter':      'src/pages/WebPConverter/WebPConverter.jsx',
  '/favicon-generator':   'src/pages/FaviconGenerator/FaviconGenerator.jsx',
  '/privacy-policy':      'src/pages/PrivacyPolicy/PrivacyPolicy.jsx',
}
const COMPRESS_SOURCE   = 'src/pages/CompressImage/data/content.js'
const CONVERTER_SOURCE  = 'src/pages/ImageConverter/data/content.js'

async function getLastmod(route) {
  const rel = ROUTE_SOURCE[route]
    ?? (route.startsWith('/compress') ? COMPRESS_SOURCE : CONVERTER_SOURCE)
  try {
    const { mtime } = await stat(path.join(rootDir, rel))
    return mtime.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

// Priority map — based on search volume and page importance
const ROUTE_CONFIG = {
  '/':                  { priority: '1.0', changefreq: 'weekly'  },
  '/webp-converter':    { priority: '0.9', changefreq: 'monthly' },
  '/favicon-generator': { priority: '0.9', changefreq: 'monthly' },
  '/png-to-jpg':        { priority: '0.8', changefreq: 'monthly' },
  '/jpg-to-png':        { priority: '0.8', changefreq: 'monthly' },
  '/webp-to-jpg':       { priority: '0.8', changefreq: 'monthly' },
  '/webp-to-png':       { priority: '0.8', changefreq: 'monthly' },
  '/png-to-webp':       { priority: '0.8', changefreq: 'monthly' },
  '/jpg-to-webp':       { priority: '0.8', changefreq: 'monthly' },
  '/meta-tags-generator': { priority: '0.8', changefreq: 'monthly' },
  '/compress-jpg':        { priority: '0.8', changefreq: 'monthly' },
  '/compress-png':        { priority: '0.8', changefreq: 'monthly' },
  '/compress-webp':       { priority: '0.8', changefreq: 'monthly' },
  '/privacy-policy':      { priority: '0.3', changefreq: 'yearly'  },
}
const DEFAULT_ROUTE_CONFIG = { priority: '0.7', changefreq: 'monthly' }

const sitemapEntries = await Promise.all(
  prerenderRoutes.map(async route => {
    const cfg = ROUTE_CONFIG[route] ?? DEFAULT_ROUTE_CONFIG
    const lastmod = await getLastmod(route)
    return [
      '  <url>',
      `    <loc>${new URL(route, SITE_ORIGIN).href}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${cfg.changefreq}</changefreq>`,
      `    <priority>${cfg.priority}</priority>`,
      '  </url>',
    ].join('\n')
  })
)
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  '</urlset>',
].join('\n')

await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml)

// Render 404.html — Vercel serves it with HTTP 404 for unknown routes
const { appHtml: notFoundHtml, headTags: notFoundHead } = render('/404')
const notFoundPage = template
  .replace('<!--app-head-->', notFoundHead)
  .replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`)
await writeFile(path.join(distDir, '404.html'), notFoundPage)

await rm(path.join(distDir, 'server'), { recursive: true, force: true })
