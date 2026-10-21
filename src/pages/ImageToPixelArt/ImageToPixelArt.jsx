import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import Table from '../../components/Table/Table'
import CodeBox from '../../components/CodeBox/CodeBox'
import JsonLd from '../../components/JsonLd/JsonLd'
import ContentSection from '../../components/ContentSection/ContentSection'
import DropZone from '../../components/DropZone/DropZone'
import ToolSection from '../../components/ToolSection/ToolSection'
import Lightbox from '../../components/Lightbox/Lightbox'
import PixelFileTable from './components/PixelFileTable/PixelFileTable'
import { pixelate, DEFAULT_PIXEL_SIZE, DEFAULT_QUALITY } from './utils/pixelate'
import { triggerDownload } from './utils/download'
import { buildZip } from './utils/buildZip'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdApp, jsonLdHowTo, jsonLdFaq } from './data/jsonld'
import { HOW_TO_STEPS, SECTIONS, FAQ as FAQ_ITEMS, RELATED_TOOLS } from './data/content'
import './ImageToPixelArt.scss'

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  )
}

// A finished result belongs to the settings it was rendered with, so changing a
// slider sends the file back to "ready" instead of leaving a stale blob.
function withSetting(file, key, value) {
  if (file[key] === value) return file
  if (file.status === 'done') return { ...file, [key]: value, status: 'ready', resultBlob: null, resultSize: null }
  return { ...file, [key]: value }
}

export default function ImageToPixelArt() {
  const [files, setFiles] = useState([])
  const [lightboxUrl, setLightboxUrl] = useState(null)
  // Seeds every newly added file; per-file sliders can still override it.
  const [globalSize, setGlobalSize] = useState(DEFAULT_PIXEL_SIZE)
  const [globalQuality, setGlobalQuality] = useState(DEFAULT_QUALITY)
  const filesRef = useRef(files)
  // Synced after commit, not during render: async handlers read the latest list from here.
  useEffect(() => { filesRef.current = files })

  useEffect(() => {
    return () => {
      filesRef.current.forEach(file => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl)
      })
    }
  }, [])

  function addFiles(newFiles) {
    const entries = Array.from(newFiles).map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
      originalSize: file.size,
      pixelSize: globalSize,
      quality: globalQuality,
      status: 'ready',
      resultBlob: null,
      resultSize: null,
      previewUrl: URL.createObjectURL(file),
    }))
    setFiles(prev => [...prev, ...entries])
  }

  function handleDelete(id) {
    setFiles(prev => {
      const target = prev.find(file => file.id === id)
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)
      return prev.filter(file => file.id !== id)
    })
  }

  function handleClearAll() {
    setFiles(prev => {
      prev.forEach(file => { if (file.previewUrl) URL.revokeObjectURL(file.previewUrl) })
      return []
    })
  }

  async function handleConvert(id) {
    const fileEntry = filesRef.current.find(file => file.id === id)
    if (!fileEntry || fileEntry.status === 'converting') return

    setFiles(prev => prev.map(file =>
      file.id === id ? { ...file, status: 'converting' } : file
    ))

    try {
      const blob = await pixelate(fileEntry.file, fileEntry.pixelSize, fileEntry.quality)
      setFiles(prev => prev.map(file =>
        file.id === id ? { ...file, status: 'done', resultBlob: blob, resultSize: blob.size } : file
      ))
    } catch {
      setFiles(prev => prev.map(file =>
        file.id === id ? { ...file, status: 'error' } : file
      ))
    }
  }

  async function handleConvertAll() {
    const pendingIds = filesRef.current
      .filter(file => file.status === 'ready' || file.status === 'error')
      .map(file => file.id)
    for (const id of pendingIds) await handleConvert(id)
  }

  function handleSizeChange(id, pixelSize) {
    setFiles(prev => prev.map(file => file.id === id ? withSetting(file, 'pixelSize', pixelSize) : file))
  }

  function handleQualityChange(id, quality) {
    setFiles(prev => prev.map(file => file.id === id ? withSetting(file, 'quality', quality) : file))
  }

  // Files mid-conversion keep the settings they started with; the rest follow.
  function handleGlobalSizeChange(pixelSize) {
    setGlobalSize(pixelSize)
    setFiles(prev => prev.map(file => file.status === 'converting' ? file : withSetting(file, 'pixelSize', pixelSize)))
  }

  function handleGlobalQualityChange(quality) {
    setGlobalQuality(quality)
    setFiles(prev => prev.map(file => file.status === 'converting' ? file : withSetting(file, 'quality', quality)))
  }

  function handleDownload(id) {
    const fileEntry = files.find(file => file.id === id)
    if (!fileEntry?.resultBlob) return
    triggerDownload(fileEntry.resultBlob, `${fileEntry.name.replace(/\.[^.]+$/, '')}-pixel-art.png`)
  }

  async function handleDownloadAll() {
    try { await buildZip(files) } catch { /* silently ignore */ }
  }

  return (
    <>
      {lightboxUrl && <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}
      <main className="ImageToPixelArt">
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={PAGE_DESC} />
          <link rel="canonical" href={PAGE_URL} />
          <meta property="og:title" content={PAGE_TITLE} />
          <meta property="og:description" content={PAGE_DESC} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={PAGE_URL} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={PAGE_TITLE} />
          <meta name="twitter:description" content={PAGE_DESC} />
          <meta name="twitter:image" content={OG_IMAGE} />
        </Helmet>

        <JsonLd data={jsonLdApp} />
        <JsonLd data={jsonLdHowTo} />
        <JsonLd data={jsonLdFaq} />

        <PageHeader
          title="Free Image to Pixel Art Converter Online"
          subtitle="Turn JPG, PNG, GIF, AVIF, BMP and WebP images into pixel art — processed locally in your browser, files never leave your device."
        />

        <ToolSection>
          <DropZone
            onFilesAdded={addFiles}
            accept="image/jpeg,image/png,image/gif,image/avif,image/bmp,image/webp"
            subtitle="JPG, PNG, GIF, AVIF, BMP, WebP — multiple files supported"
          />
          {files.length > 0 && (
            <PixelFileTable
              files={files}
              globalSize={globalSize}
              onGlobalSizeChange={handleGlobalSizeChange}
              globalQuality={globalQuality}
              onGlobalQualityChange={handleGlobalQualityChange}
              onSizeChange={handleSizeChange}
              onQualityChange={handleQualityChange}
              onConvert={handleConvert}
              onConvertAll={handleConvertAll}
              onDownload={handleDownload}
              onDownloadAll={handleDownloadAll}
              onDelete={handleDelete}
              onClearAll={handleClearAll}
              onPreviewClick={setLightboxUrl}
            />
          )}
        </ToolSection>

        <ContentSection title="How to convert an image to pixel art">
          <ol className="ContentSection__steps">
            {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </ContentSection>

        {SECTIONS.map((section, si) => (
          <ContentSection key={si} title={section.heading}>
            {section.blocks.map((block, i) => {
              if (block.type === 'p') {
                return <p key={i} className="ContentSection__text">{renderText(block.text)}</p>
              }
              if (block.type === 'h3') {
                return <h3 key={i} className="ContentSection__subsection-title">{block.text}</h3>
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="ContentSection__list">
                    {block.items.map((item, j) => <li key={j}>{renderText(item)}</li>)}
                  </ul>
                )
              }
              if (block.type === 'table') {
                return (
                  <Table key={i} columns={block.headers}>
                    {block.rows.map((row, j) => (
                      <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                    ))}
                  </Table>
                )
              }
              if (block.type === 'code') {
                return <CodeBox key={i} label={block.label} code={block.code} />
              }
              return null
            })}
          </ContentSection>
        ))}

        <FAQ items={FAQ_ITEMS} />

        <RelatedTools items={RELATED_TOOLS} />
      </main>
    </>
  )
}
