import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import DropZone from './components/DropZone/DropZone'
import FileTable from './components/FileTable/FileTable'
import { convertToWebP } from './utils/convertWebp'
import { triggerDownload } from './utils/download'
import { buildZip } from './utils/buildZip'
import './WebPConverter.scss'

const PAGE_TITLE = 'Free WebP Converter Online: JPG, PNG, GIF to WebP | Abect'
const WEBP_FAQ = [
  {
    question: 'Is WebP supported in all browsers?',
    answer: 'Yes. WebP is supported in all modern browsers including Chrome, Firefox, Safari (since version 14), Edge, and Opera. It covers over 97% of global browser usage.',
  },
  {
    question: 'Does WebP support transparency?',
    answer: 'Yes. WebP supports alpha channel transparency, just like PNG. Converting a transparent PNG to WebP preserves the transparency fully.',
  },
  {
    question: 'What quality setting should I use?',
    answer: 'For photos, quality 80–90 gives an excellent balance between file size and visual quality. For images with sharp edges or text, use 90–100. For thumbnails, 60–75 works well.',
  },
  {
    question: 'Can I convert multiple files at once?',
    answer: 'Yes. Drop multiple files at once and use "Convert all" to process everything, then "Download all" to get a single ZIP archive with all converted files.',
  },
  {
    question: 'Are my files uploaded to a server?',
    answer: 'No. All conversion happens directly in your browser using the Canvas API. Your files never leave your device — no uploads, no server processing.',
  },
]
const PAGE_DESCRIPTION = 'Convert JPG, PNG, GIF, AVIF, BMP and TIFF to WebP — free, instant, right in your browser. No uploads, no server. Try it now.'
const PAGE_URL = 'https://devtools.abect.com/webp-converter'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/webp-converter-og.jpg'

export default function WebPConverter() {
  const [files, setFiles] = useState([])
  const filesRef = useRef(files)
  filesRef.current = files  // синхронне оновлення — завжди актуальне значення в хендлерах

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
    const fileEntry = filesRef.current.find(file => file.id === id)
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
    const pendingIds = filesRef.current
      .filter(file => file.status === 'ready' || file.status === 'error')
      .map(file => file.id)

    for (const id of pendingIds) {
      await handleConvert(id)
    }
  }

  function handleQualityChange(id, quality) {
    setFiles(prev => prev.map(file => {
      if (file.id !== id) return file
      // If already converted — reset to ready so user re-converts with new quality
      if (file.status === 'done') {
        return { ...file, quality, status: 'ready', resultBlob: null, resultSize: null }
      }
      return { ...file, quality }
    }))
  }

  function handleDownload(id) {
    const fileEntry = files.find(file => file.id === id)
    if (!fileEntry?.resultBlob) return

    const baseName = fileEntry.name.replace(/\.[^.]+$/, '')
    triggerDownload(fileEntry.resultBlob, `${baseName}.webp`)
  }

  async function handleDownloadAll() {
    try {
      await buildZip(files)
    } catch {
      // buildZip failed (e.g. out of memory) — silently ignore, nothing to show the user
    }
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Free WebP Converter',
          'url': PAGE_URL,
          'description': PAGE_DESCRIPTION,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'Any',
          'browserRequirements': 'Requires JavaScript',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
          'featureList': [
            'Convert JPG to WebP',
            'Convert PNG to WebP',
            'Convert GIF to WebP',
            'Convert AVIF to WebP',
            'Convert BMP to WebP',
            'Convert TIFF to WebP',
            'Batch conversion',
            'Adjustable quality',
            'No file upload — 100% private',
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Is WebP supported in all browsers?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. WebP is supported in all modern browsers including Chrome, Firefox, Safari (since version 14), Edge, and Opera. It covers over 97% of global browser usage.' },
            },
            {
              '@type': 'Question',
              'name': 'Does WebP support transparency?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. WebP supports alpha channel transparency, just like PNG. Converting a transparent PNG to WebP preserves the transparency.' },
            },
            {
              '@type': 'Question',
              'name': 'What quality setting should I use for WebP conversion?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'For photos, quality 80–90 gives an excellent balance between file size and visual quality. For images with sharp edges or text, use 90–100. For thumbnails where size matters most, 60–75 works well.' },
            },
            {
              '@type': 'Question',
              'name': 'Can I convert multiple files to WebP at once?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Drop multiple files at once and use "Convert all" to process them all, then "Download all" to get a single ZIP archive.' },
            },
            {
              '@type': 'Question',
              'name': 'Are my files uploaded to a server when converting to WebP?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'No. All conversion happens directly in your browser using the Canvas API. Your files never leave your device — there are no uploads and no server processing.' },
            },
          ],
        })}</script>
      </Helmet>
      <h1 className="WebPConverter__title">WebP converter</h1>
      <p className="WebPConverter__sub">Processed locally in browser — files never leave your device</p>

      {/* Секція з основним інструментарієм */}
      <section className="WebPConverter__tool">
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
      </section>

      <section className="WebPConverter__section">
        <h2 className="WebPConverter__section-title">How to convert images to WebP</h2>
        <ol className="WebPConverter__steps">
          <li>Drop your JPG, PNG, GIF, AVIF, BMP or TIFF files onto the converter above — or click to browse.</li>
          <li>Adjust the quality slider if needed. Default is 100 — lower values reduce file size further.</li>
          <li>Click <strong>Convert</strong> on a single file, or <strong>Convert all</strong> to process everything at once.</li>
          <li>Download each file individually or click <strong>Download all</strong> to get a ZIP archive.</li>
        </ol>
      </section>

      <section className="WebPConverter__section">
        <h2 className="WebPConverter__section-title">What is the WebP format?</h2>
        <p className="WebPConverter__text">
          WebP is a modern image format developed by Google, designed to produce smaller files than JPEG and PNG while maintaining comparable visual quality. It supports both lossy and lossless compression, transparency (like PNG), and animation (like GIF).
        </p>
        <h3 className="WebPConverter__subsection-title">WebP vs JPEG vs PNG — file size</h3>
        <p className="WebPConverter__text">
          On average, WebP images are <strong>25–34% smaller</strong> than equivalent JPEG files and up to <strong>26% smaller</strong> than PNG files. Smaller images mean faster page loads and better Core Web Vitals scores.
        </p>
        <h3 className="WebPConverter__subsection-title">Why convert to WebP?</h3>
        <ul className="WebPConverter__list">
          <li>Faster page load times — smaller files download quicker</li>
          <li>Improved LCP score (Core Web Vitals)</li>
          <li>Supported in all modern browsers: Chrome, Firefox, Safari, Edge</li>
          <li>Supports transparency — can replace both JPEG and PNG</li>
          <li>Supports animation — a lightweight alternative to GIF (note: this converter exports the first frame of animated GIFs as a static image)</li>
        </ul>
      </section>

      <FAQ items={WEBP_FAQ} />

      <nav className="WebPConverter__related">
        <h2 className="WebPConverter__section-title">Related tools</h2>
        <div className="WebPConverter__related-grid">
          <Link to="/favicon-generator" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">Favicon Generator</span>
            <span className="WebPConverter__related-desc">Generate favicons from text, emoji, or image</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
