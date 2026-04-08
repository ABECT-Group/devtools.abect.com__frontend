import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import DropZone from './components/DropZone/DropZone'
import FileTable from './components/FileTable/FileTable'
import { convertToWebP } from './utils/convertWebp'
import { triggerDownload } from './utils/download'
import { buildZip } from './utils/buildZip'
import './WebPConverter.scss'

export default function WebPConverter() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    return () => files.forEach(f => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl)
    })
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
    const fileEntry = files.find(f => f.id === id)
    if (!fileEntry || fileEntry.status === 'converting') return

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'converting' } : f))

    try {
      const blob = await convertToWebP(fileEntry.file, fileEntry.quality)
      setFiles(prev => prev.map(f =>
        f.id === id ? { ...f, status: 'done', resultBlob: blob, resultSize: blob.size } : f
      ))
    } catch {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error' } : f))
    }
  }

  async function handleConvertAll() {
    const readyIds = files.filter(f => f.status === 'ready').map(f => f.id)
    for (const id of readyIds) {
      await handleConvert(id)
    }
  }

  function handleQualityChange(id, quality) {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, quality } : f))
  }

  function handleDownload(id) {
    const fileEntry = files.find(f => f.id === id)
    if (!fileEntry?.resultBlob) return
    const baseName = fileEntry.name.replace(/\.[^.]+$/, '')
    triggerDownload(fileEntry.resultBlob, `${baseName}.webp`)
  }

  async function handleDownloadAll() {
    await buildZip(files)
  }

  return (
    <div className="WebPConverter">
      <Helmet>
        <title>WebP Converter — devtools.abect.com</title>
        <meta name="description" content="Convert JPG, PNG, AVIF, GIF and other images to WebP format directly in your browser. No upload, no server, 100% private." />
        <link rel="canonical" href="https://devtools.abect.com/webp-converter" />
      </Helmet>
      <h1 className="WebPConverter__title">WebP converter</h1>
      <p className="WebPConverter__sub">Processed locally in browser — files never leave your device</p>
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
    </div>
  )
}
