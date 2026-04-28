import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import Table from '../../components/Table/Table'
import CodeBox from '../../components/CodeBox/CodeBox'
import DropZone from '../../components/DropZone/DropZone'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import Lightbox from '../../components/Lightbox/Lightbox'
import FileTable from './components/FileTable/FileTable'
import { convertToWebP } from './utils/convertWebp'
import { triggerDownload } from './utils/download'
import { buildZip } from './utils/buildZip'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdApp, jsonLdHowTo, jsonLdFaq } from './data/jsonld'
import { HOW_TO_STEPS, FAQ as FAQ_ITEMS, PICTURE_CODE, RELATED_TOOLS } from './data/content'
import './WebPConverter.scss'

const DEFAULT_QUALITY = 85

export default function WebPConverter() {
  const [files, setFiles] = useState([])
  const [lightboxUrl, setLightboxUrl] = useState(null)
  const filesRef = useRef(files)
  filesRef.current = files

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
      const blob = await convertToWebP(fileEntry.file, fileEntry.quality)
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

  function handleQualityChange(id, quality) {
    setFiles(prev => prev.map(file => {
      if (file.id !== id) return file
      if (file.status === 'done') return { ...file, quality, status: 'ready', resultBlob: null, resultSize: null }
      return { ...file, quality }
    }))
  }

  function handleDownload(id) {
    const fileEntry = files.find(file => file.id === id)
    if (!fileEntry?.resultBlob) return
    triggerDownload(fileEntry.resultBlob, `${fileEntry.name.replace(/\.[^.]+$/, '')}.webp`)
  }

  async function handleDownloadAll() {
    try { await buildZip(files) } catch { /* silently ignore */ }
  }

  return (
    <>
      {lightboxUrl && <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}
      <main className="WebPConverter">
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
          <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
          <script type="application/ld+json">{JSON.stringify(jsonLdHowTo)}</script>
          <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
        </Helmet>

        <PageHeader
          title="Free WebP Converter Online"
          subtitle="Convert JPG, PNG, GIF, AVIF and BMP to WebP — processed locally in your browser, files never leave your device."
        />

        <ToolSection>
          <DropZone
            onFilesAdded={addFiles}
            accept="image/jpeg,image/png,image/gif,image/avif,image/bmp,image/webp"
            subtitle="JPG, PNG, GIF, AVIF, BMP — multiple files supported"
          />
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
              onPreviewClick={setLightboxUrl}
            />
          )}
        </ToolSection>

        <ContentSection title="How to convert images to WebP">
          <ol className="ContentSection__steps">
            {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </ContentSection>

        <ContentSection title="Why WebP is the best image format for websites">
          <p className="ContentSection__text">
            WebP is a modern image format developed by Google in 2010, built to replace both JPEG and PNG on the web. It delivers <strong>smaller file sizes without visible quality loss</strong> — which means faster page loads, lower bandwidth costs, and better rankings in Google Search.
          </p>

          <h3 className="ContentSection__subsection-title">WebP vs JPG vs PNG vs AVIF — format comparison</h3>
          <Table
            columns={['Format', 'Compression', 'File size vs JPG', 'Transparency', 'Animation', 'Browser support']}
            note="* For photographic content. PNG can be smaller than JPG for graphics with flat colors."
          >
            <tr className="Table__row--highlight"><td><strong>WebP</strong></td><td>Lossy + Lossless</td><td><strong>25–34% smaller</strong></td><td>✓</td><td>✓</td><td>97%</td></tr>
            <tr><td>AVIF</td><td>Lossy + Lossless</td><td>40–50% smaller</td><td>✓</td><td>✓</td><td>93%</td></tr>
            <tr><td>JPG</td><td>Lossy only</td><td>baseline</td><td>—</td><td>—</td><td>100%</td></tr>
            <tr><td>PNG</td><td>Lossless only</td><td>40–60% larger*</td><td>✓</td><td>—</td><td>100%</td></tr>
          </Table>
          <p className="ContentSection__text">
            A real-world example: a typical 500 KB JPG product photo becomes <strong>approximately 330 KB as WebP</strong> at quality 85 — a 34% reduction with no visible difference at normal viewing sizes. At the same quality, PNG would be around 800 KB.
          </p>

          <h3 className="ContentSection__subsection-title">Lossy vs lossless WebP — which to use</h3>
          <p className="ContentSection__text">
            WebP supports two compression modes in a single format. <strong>Lossy WebP</strong> — the default here — works like JPG: it discards some image data to achieve much smaller files. At quality 85, the result is visually identical to the original for photographs, but 25–34% smaller. <strong>Lossless WebP</strong> keeps every pixel intact, like PNG, and still compresses about 26% better. Use lossless for logos, icons, screenshots, and any image you plan to edit further.
          </p>

          <h3 className="ContentSection__subsection-title">How WebP improves SEO and Core Web Vitals</h3>
          <p className="ContentSection__text">
            Page speed is a direct Google ranking factor. Images are typically the largest assets on any web page — and the format you choose determines how fast they load. WebP directly improves <strong>LCP (Largest Contentful Paint)</strong>, one of the three Core Web Vitals scores Google uses to evaluate page experience. According to Google's own data, the probability of a user bouncing increases by 32% when page load time goes from 1 to 3 seconds.
          </p>
          <p className="ContentSection__text">
            By switching your images from JPG to WebP, you reduce the total page weight by 25–34% without any design changes. For image-heavy pages — product galleries, blog posts, portfolios — this can cut several seconds off load time on mobile networks.
          </p>

          <h3 className="ContentSection__subsection-title">How to add WebP images to your website</h3>
          <p className="ContentSection__text">
            The safest way to serve WebP is using the HTML <code>&lt;picture&gt;</code> element with a JPG fallback. Browsers that support WebP load the WebP version; older browsers automatically fall back to the JPG:
          </p>
          <CodeBox label="HTML" code={PICTURE_CODE} />
          <p className="ContentSection__text">
            If you use <strong>Next.js</strong>, the built-in <code>&lt;Image&gt;</code> component serves WebP automatically with no extra configuration. In <strong>WordPress</strong>, plugins like ShortPixel or Imagify convert and serve WebP on the fly. On servers with direct config access, enable WebP via an <code>.htaccess</code> rewrite rule to serve <code>.webp</code> files whenever a browser supports the format.
          </p>

          <h3 className="ContentSection__subsection-title">When to keep JPG or PNG instead of WebP</h3>
          <ul className="ContentSection__list">
            <li>You need to support very old browsers (Internet Explorer, Safari before version 14) without adding a <code>&lt;picture&gt;</code> fallback</li>
            <li>The file will be uploaded to a platform that doesn't yet accept WebP (some print services, older stock photo sites, certain email clients)</li>
            <li>You're exporting a source file for further editing in software that doesn't support WebP — in that case, keep the PNG or high-quality JPG as your master file and convert to WebP for web delivery only</li>
          </ul>
        </ContentSection>

        <FAQ items={FAQ_ITEMS} />

        <RelatedTools items={RELATED_TOOLS} />
      </main>
    </>
  )
}
