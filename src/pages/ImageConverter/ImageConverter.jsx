import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useLocation } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import ConvertDropZone from './components/ConvertDropZone/ConvertDropZone'
import ConvertFileTable from './components/ConvertFileTable/ConvertFileTable'
import FormatSelector from './components/FormatSelector/FormatSelector'
import {
  ALL_SLUGS,
  CONVERSIONS,
  FORMAT_LABELS,
  OUTPUT_EXT,
  OUTPUT_MIME,
  OUTPUT_QUALITY,
} from './config/conversions'
import { buildZip } from './utils/buildZip'
import { convertImage } from './utils/convertImage'
import { triggerDownload } from './utils/download'
import './ImageConverter.scss'

const BASE_URL = 'https://devtools.abect.com'
const OG_IMAGE_URL = `${BASE_URL}/seo/image-converter-og.jpg`

export default function ImageConverter() {
  const { pathname } = useLocation()
  const slug = pathname.slice(1)           // '/png-to-jpg' → 'png-to-jpg'
  const config = CONVERSIONS[slug]

  const [files, setFiles] = useState([])
  const filesRef = useRef(files)
  filesRef.current = files

  // Reset files when slug changes (user switches format)
  const prevSlugRef = useRef(slug)
  useEffect(() => {
    if (prevSlugRef.current !== slug) {
      filesRef.current.forEach(f => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl)
      })
      setFiles([])
      prevSlugRef.current = slug
    }
  }, [slug])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      filesRef.current.forEach(f => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl)
      })
    }
  }, [])

  if (!config) return <Navigate to="/png-to-jpg" replace />

  const mimeType = OUTPUT_MIME[config.to]
  const ext      = OUTPUT_EXT[config.to]
  const quality  = OUTPUT_QUALITY[config.to]
  const fromLabel = FORMAT_LABELS[config.from]
  const toLabel   = FORMAT_LABELS[config.to]

  const pageUrl    = `${BASE_URL}/${slug}`
  const ogImageUrl = OG_IMAGE_URL  // generic fallback — per-slug OG images to be created later

  // ── File handlers ──────────────────────────────────────────────────────────

  function addFiles(newFiles) {
    const entries = Array.from(newFiles).map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
      originalSize: file.size,
      status: 'ready',
      resultBlob: null,
      resultSize: null,
      previewUrl: URL.createObjectURL(file),
    }))
    setFiles(prev => [...prev, ...entries])
  }

  function handleDelete(id) {
    setFiles(prev => {
      const target = prev.find(f => f.id === id)
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)
      return prev.filter(f => f.id !== id)
    })
  }

  function handleClearAll() {
    setFiles(prev => {
      prev.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl) })
      return []
    })
  }

  async function handleConvert(id) {
    const entry = filesRef.current.find(f => f.id === id)
    if (!entry || entry.status === 'converting') return

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'converting' } : f))

    try {
      const blob = await convertImage(entry.file, mimeType, quality)
      setFiles(prev => prev.map(f =>
        f.id === id ? { ...f, status: 'done', resultBlob: blob, resultSize: blob.size } : f
      ))
    } catch {
      setFiles(prev => prev.map(f =>
        f.id === id ? { ...f, status: 'error' } : f
      ))
    }
  }

  async function handleConvertAll() {
    const ids = filesRef.current
      .filter(f => f.status === 'ready' || f.status === 'error')
      .map(f => f.id)
    for (const id of ids) {
      await handleConvert(id)
    }
  }

  function handleDownload(id) {
    const entry = files.find(f => f.id === id)
    if (!entry?.resultBlob) return
    const baseName = entry.name.replace(/\.[^.]+$/, '')
    triggerDownload(entry.resultBlob, `${baseName}.${ext}`)
  }

  async function handleDownloadAll() {
    try {
      await buildZip(files, ext)
    } catch {
      // silently ignore zip errors
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': config.h1,
    'url': pageUrl,
    'description': config.description,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      `Convert ${fromLabel} to ${toLabel}`,
      'Batch conversion',
      'No file upload — 100% private',
      'Free, instant, browser-based',
    ],
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': config.faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }

  return (
    <main className="ImageConverter">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <h1 className="ImageConverter__title">{config.h1}</h1>
      <p className="ImageConverter__sub">{config.sub}</p>

      <section className="ImageConverter__tool">
        <FormatSelector from={config.from} to={config.to} />
        <ConvertDropZone fromLabel={fromLabel} onFilesAdded={addFiles} />
        {files.length > 0 && (
          <ConvertFileTable
            files={files}
            toLabel={toLabel}
            onConvert={handleConvert}
            onConvertAll={handleConvertAll}
            onDownload={handleDownload}
            onDownloadAll={handleDownloadAll}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
          />
        )}
      </section>

      <section className="ImageConverter__section">
        <h2 className="ImageConverter__section-title">How to convert {fromLabel} to {toLabel}</h2>
        <ol className="ImageConverter__steps">
          {config.howTo.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>

      <section className="ImageConverter__section">
        <h2 className="ImageConverter__section-title">{config.whatIs.heading}</h2>
        {config.whatIs.blocks.map((block, i) => {
          if (block.type === 'p') {
            return <p key={i} className="ImageConverter__text">{block.text}</p>
          }
          if (block.type === 'h3') {
            return <h3 key={i} className="ImageConverter__subsection-title">{block.text}</h3>
          }
          if (block.type === 'ul') {
            return (
              <ul key={i} className="ImageConverter__list">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )
          }
          return null
        })}
      </section>

      <FAQ items={config.faq} />

      <nav className="ImageConverter__related">
        <h2 className="ImageConverter__section-title">Related tools</h2>
        <div className="ImageConverter__related-grid">
          {config.relatedSlugs.map(relSlug => {
            const rel = CONVERSIONS[relSlug]
            if (!rel) return null
            return (
              <Link key={relSlug} to={`/${relSlug}`} className="ImageConverter__related-card">
                <span className="ImageConverter__related-name">{rel.h1}</span>
                <span className="ImageConverter__related-desc">
                  Convert {FORMAT_LABELS[rel.from]} to {FORMAT_LABELS[rel.to]} online, free
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      <nav className="ImageConverter__all-converters">
        <h2 className="ImageConverter__section-title">All image converters</h2>
        <div className="ImageConverter__all-grid">
          {ALL_SLUGS.filter(s => s !== slug).map(s => {
            const c = CONVERSIONS[s]
            return (
              <Link key={s} to={`/${s}`} className="ImageConverter__all-link">
                {FORMAT_LABELS[c.from]} → {FORMAT_LABELS[c.to]}
              </Link>
            )
          })}
        </div>
      </nav>
    </main>
  )
}
