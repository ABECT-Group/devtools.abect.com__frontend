import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useLocation } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import Lightbox from '../../components/Lightbox/Lightbox'
import CompressDropZone from './components/CompressDropZone/CompressDropZone'
import CompressFileTable from './components/CompressFileTable/CompressFileTable'
import CompressFormatSelector from './components/CompressFormatSelector/CompressFormatSelector'
import {
  COMPRESS_SLUGS,
  COMPRESSIONS,
  FORMAT_CONFIG,
} from './config/compressions'
import { buildZip } from './utils/buildZip'
import { compressImage } from './utils/compressImage'
import { triggerDownload } from './utils/download'
import './CompressImage.scss'

const BASE_URL = 'https://devtools.abect.com'
const OG_IMAGE_URL = `${BASE_URL}/seo/image-converter-og.jpg`

const DEFAULT_QUALITY = 82

export default function CompressImage() {
  const { pathname } = useLocation()
  const slug = pathname.slice(1)
  const config = COMPRESSIONS[slug]
  const formatKey = config?.format
  const formatConfig = FORMAT_CONFIG[formatKey] ?? FORMAT_CONFIG.jpg

  const [files, setFiles] = useState([])
  const [lightboxUrl, setLightboxUrl] = useState(null)
  const filesRef = useRef(files)
  filesRef.current = files

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

  useEffect(() => {
    return () => {
      filesRef.current.forEach(f => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl)
      })
    }
  }, [])

  if (!config) return <Navigate to="/compress-jpg" replace />

  const { mime, ext, hasQuality } = formatConfig
  const toLabel = formatKey?.toUpperCase() ?? 'JPG'
  const pageUrl = `${BASE_URL}/${slug}`

  // ── File handlers ──────────────────────────────────────────────────────────

  function addFiles(newFiles) {
    const entries = Array.from(newFiles).map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
      originalSize: file.size,
      quality: DEFAULT_QUALITY,
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

  function handleQualityChange(id, quality) {
    setFiles(prev => prev.map(f => {
      if (f.id !== id) return f
      // Reset to ready if already compressed — user must re-compress with new quality
      if (f.status === 'done') {
        return { ...f, quality, status: 'ready', resultBlob: null, resultSize: null }
      }
      return { ...f, quality }
    }))
  }

  async function handleCompress(id) {
    const entry = filesRef.current.find(f => f.id === id)
    if (!entry || entry.status === 'converting') return

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'converting' } : f))

    try {
      const quality = hasQuality ? entry.quality / 100 : undefined
      const blob = await compressImage(entry.file, mime, quality)
      setFiles(prev => prev.map(f =>
        f.id === id ? { ...f, status: 'done', resultBlob: blob, resultSize: blob.size } : f
      ))
    } catch {
      setFiles(prev => prev.map(f =>
        f.id === id ? { ...f, status: 'error' } : f
      ))
    }
  }

  async function handleCompressAll() {
    const ids = filesRef.current
      .filter(f => f.status === 'ready' || f.status === 'error')
      .map(f => f.id)
    for (const id of ids) {
      await handleCompress(id)
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
      `Compress images to ${toLabel}`,
      'Per-file quality control',
      'Live fullscreen preview of compressed result',
      'Batch compression',
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
    <>
    {lightboxUrl && <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}
    <main className="CompressImage">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <h1 className="CompressImage__title">{config.h1}</h1>
      <p className="CompressImage__sub">{config.sub}</p>

      <section className="CompressImage__tool">
        <CompressFormatSelector format={formatKey} />
        <CompressDropZone onFilesAdded={addFiles} />
        {files.length > 0 && (
          <CompressFileTable
            files={files}
            toLabel={toLabel}
            hasQuality={hasQuality}
            onCompress={handleCompress}
            onCompressAll={handleCompressAll}
            onQualityChange={handleQualityChange}
            onPreviewClick={setLightboxUrl}
            onDownload={handleDownload}
            onDownloadAll={handleDownloadAll}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
          />
        )}
      </section>

      <section className="CompressImage__section">
        <h2 className="CompressImage__section-title">How to compress {toLabel} images</h2>
        <ol className="CompressImage__steps">
          {config.howTo.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>

      <section className="CompressImage__section">
        <h2 className="CompressImage__section-title">{config.whatIs.heading}</h2>
        {config.whatIs.blocks.map((block, i) => {
          if (block.type === 'p') {
            return <p key={i} className="CompressImage__text">{block.text}</p>
          }
          if (block.type === 'h3') {
            return <h3 key={i} className="CompressImage__subsection-title">{block.text}</h3>
          }
          if (block.type === 'ul') {
            return (
              <ul key={i} className="CompressImage__list">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )
          }
          return null
        })}
      </section>

      <FAQ items={config.faq} />

      <nav className="CompressImage__related">
        <h2 className="CompressImage__section-title">Related compressors</h2>
        <div className="CompressImage__related-grid">
          {config.relatedSlugs.map(relSlug => {
            const rel = COMPRESSIONS[relSlug]
            if (!rel) return null
            return (
              <Link key={relSlug} to={`/${relSlug}`} className="CompressImage__related-card">
                <span className="CompressImage__related-name">{rel.h1}</span>
                <span className="CompressImage__related-desc">
                  Compress images to {FORMAT_CONFIG[rel.format]?.ext?.toUpperCase()} online, free
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

    </main>
    </>
  )
}
