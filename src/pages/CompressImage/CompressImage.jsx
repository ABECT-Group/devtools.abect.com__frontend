import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import Lightbox from '../../components/Lightbox/Lightbox'
import DropZone from '../../components/DropZone/DropZone'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import CompressFileTable from './components/CompressFileTable/CompressFileTable'
import CompressFormatSelector from './components/CompressFormatSelector/CompressFormatSelector'
import { COMPRESSIONS, COMPRESS_CARD_DESC, CONVERT_CARD_DESC } from './data/content'
import { FORMAT_CONFIG, DEFAULT_QUALITY } from './data/formats'
import { OG_IMAGE, buildHelmet } from './data/helmet'
import { buildJsonLdApp, buildJsonLdFaq } from './data/jsonld'
import { CONVERSIONS } from '../ImageConverter/data/content'
import { FORMAT_LABELS } from '../ImageConverter/data/formats'
import { buildZip } from './utils/buildZip'
import { compressImage } from './utils/compressImage'
import { triggerDownload } from './utils/download'
import './CompressImage.scss'


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
  const pageUrl = buildHelmet(slug)

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

  const jsonLdApp = buildJsonLdApp(config, pageUrl, toLabel)
  const jsonLdFaq = buildJsonLdFaq(config)

  const relatedItems = config.relatedSlugs
    .map(relSlug => {
      const compRel = COMPRESSIONS[relSlug]
      if (compRel) return { to: `/${relSlug}`, name: compRel.h1, desc: COMPRESS_CARD_DESC[compRel.format] ?? `Compress ${compRel.format.toUpperCase()} images` }
      const convRel = CONVERSIONS[relSlug]
      if (convRel) return { to: `/${relSlug}`, name: convRel.h1, desc: CONVERT_CARD_DESC[convRel.to] ?? `${FORMAT_LABELS[convRel.from]} to ${FORMAT_LABELS[convRel.to]}` }
      return null
    })
    .filter(Boolean)

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
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <PageHeader title={config.h1} subtitle={config.sub} />

      <ToolSection>
        <CompressFormatSelector format={formatKey} />
        <DropZone onFilesAdded={addFiles} />
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
      </ToolSection>

      <ContentSection title={`How to compress ${toLabel} images`}>
        <ol className="ContentSection__steps">
          {config.howTo.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </ContentSection>

      <ContentSection title={config.whatIs.heading}>
        {config.whatIs.blocks.map((block, i) => {
          if (block.type === 'p') {
            return <p key={i} className="ContentSection__text">{block.text}</p>
          }
          if (block.type === 'h3') {
            return <h3 key={i} className="ContentSection__subsection-title">{block.text}</h3>
          }
          if (block.type === 'ul') {
            return (
              <ul key={i} className="ContentSection__list">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )
          }
          return null
        })}
      </ContentSection>

      <FAQ items={config.faq} />

      <RelatedTools items={relatedItems} />
    </main>
    </>
  )
}
