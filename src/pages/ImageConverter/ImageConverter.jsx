import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import DropZone from '../../components/DropZone/DropZone'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import ConvertFileTable from './components/ConvertFileTable/ConvertFileTable'
import FormatSelector from './components/FormatSelector/FormatSelector'
import { CONVERSIONS, FORMAT_CARD_DESC } from './data/content'
import { FORMAT_LABELS, OUTPUT_EXT, OUTPUT_MIME, OUTPUT_QUALITY } from './data/formats'
import { OG_IMAGE, buildHelmet } from './data/helmet'
import { buildJsonLdApp, buildJsonLdFaq } from './data/jsonld'
import { buildZip } from './utils/buildZip'
import { convertImage } from './utils/convertImage'
import { triggerDownload } from './utils/download'
import './ImageConverter.scss'

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

  const pageUrl = buildHelmet(slug)

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

  const jsonLdApp = buildJsonLdApp(config, pageUrl, fromLabel, toLabel)
  const jsonLdFaq = buildJsonLdFaq(config)

  const relatedItems = config.relatedSlugs
    .map(relSlug => {
      const rel = CONVERSIONS[relSlug]
      if (!rel) return null
      return { to: `/${relSlug}`, name: rel.h1, desc: FORMAT_CARD_DESC[rel.to] ?? `${FORMAT_LABELS[rel.from]} to ${FORMAT_LABELS[rel.to]}` }
    })
    .filter(Boolean)

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
        <FormatSelector from={config.from} to={config.to} />
        <DropZone
          onFilesAdded={addFiles}
          title={`Drop ${fromLabel} files here or click to select`}
        />
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
      </ToolSection>

      <ContentSection title={`How to convert ${fromLabel} to ${toLabel}`}>
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
  )
}
