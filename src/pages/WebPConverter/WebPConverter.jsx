import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone from './components/DropZone/DropZone'
import FileTable from './components/FileTable/FileTable'
import { convertToWebP } from './utils/convertWebp'
import { triggerDownload } from './utils/download'
import { buildZip } from './utils/buildZip'
import './WebPConverter.scss'

const PAGE_TITLE = 'Free WebP Converter Online: JPG, PNG, GIF to WebP | Abect'
const PAGE_DESCRIPTION = 'Convert JPG, PNG, GIF, AVIF, BMP, and TIFF to WebP online in your browser. No uploads, no server processing, and fully private.'
const PAGE_URL = 'https://devtools.abect.com/webp-converter'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/webp-converter-og.jpg'

export default function WebPConverter() {
  const [files, setFiles] = useState([])
  const filesRef = useRef(files)

  useEffect(() => {
    filesRef.current = files
  }, [files])

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
      quality: 100,
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
      prev.forEach(file => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl)
      })
      return []
    })
  }

  async function handleConvert(id) {
    const fileEntry = files.find(file => file.id === id)
    if (!fileEntry || fileEntry.status === 'converting') return

    setFiles(prev => prev.map(file => (
      file.id === id ? { ...file, status: 'converting' } : file
    )))

    try {
      const blob = await convertToWebP(fileEntry.file, fileEntry.quality)
      setFiles(prev => prev.map(file => (
        file.id === id ? { ...file, status: 'done', resultBlob: blob, resultSize: blob.size } : file
      )))
    } catch {
      setFiles(prev => prev.map(file => (
        file.id === id ? { ...file, status: 'error' } : file
      )))
    }
  }

  async function handleConvertAll() {
    const readyIds = files
      .filter(file => file.status === 'ready')
      .map(file => file.id)

    for (const id of readyIds) {
      await handleConvert(id)
    }
  }

  function handleQualityChange(id, quality) {
    setFiles(prev => prev.map(file => (
      file.id === id ? { ...file, quality } : file
    )))
  }

  function handleDownload(id) {
    const fileEntry = files.find(file => file.id === id)
    if (!fileEntry?.resultBlob) return

    const baseName = fileEntry.name.replace(/\.[^.]+$/, '')
    triggerDownload(fileEntry.resultBlob, `${baseName}.webp`)
  }

  async function handleDownloadAll() {
    await buildZip(files)
  }

  return (
    <main className="WebPConverter">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>
      <h1 className="WebPConverter__title">WebP converter</h1>
      <p className="WebPConverter__sub">Processed locally in browser - files never leave your device</p>
      <DropZone onFilesAdded={addFiles} />
      {files.length > 0 && (
        <FileTable
          files={files}
          onQualityChange={handleQualityChange}
          onConvert={handleConvert}
          onConvertAll={handleConvertAll}
          onDownload={handleDownload}
          onDownloadAll={handleDownloadAll}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      )}
    </main>
  )
}
