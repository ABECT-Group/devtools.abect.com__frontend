import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import Lightbox from '../../components/Lightbox/Lightbox'
import DropZone from './components/DropZone/DropZone'
import FileTable from './components/FileTable/FileTable'
import { convertToWebP } from './utils/convertWebp'
import { triggerDownload } from './utils/download'
import { buildZip } from './utils/buildZip'
import './WebPConverter.scss'

const PAGE_TITLE = 'Free WebP Converter Online: JPG, PNG, GIF, AVIF to WebP | Abect'
const PAGE_DESCRIPTION = 'Convert JPG, PNG, GIF, AVIF and BMP to WebP free — 25–34% smaller files, instant, in your browser. No uploads, no signup. Try it now.'
const PAGE_URL = 'https://devtools.abect.com/webp-converter'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/webp-converter-og.jpg'

const HOW_TO_STEPS = [
  'Drop your JPG, PNG, GIF, AVIF or BMP files onto the converter — or click "Choose files" to browse.',
  'Adjust the quality slider per file. Quality 80–90 is the sweet spot for web images — significantly smaller file, near-identical look.',
  'Click Convert on a single file, or Convert all to process everything at once.',
  'Download files individually or click Download all to get a single ZIP archive.',
]

const WEBP_FAQ = [
  {
    question: 'Is WebP supported in all browsers?',
    answer: 'WebP is supported in all modern browsers — Chrome, Firefox, Safari (since version 14), Edge, and Opera. Global coverage is 97%. The remaining 3% are legacy environments. For full coverage, wrap images in a <picture> element with a JPG fallback so older browsers receive the JPG automatically.',
  },
  {
    question: 'What is the difference between lossy and lossless WebP?',
    answer: 'Lossy WebP (the default in this converter) removes some image data to reduce file size — similar to how JPG works, but 25–34% more efficient at the same visual quality. Lossless WebP keeps every pixel intact, like PNG, and still produces files about 26% smaller than equivalent PNG. Use lossy for photos and web content; lossless for logos, icons, or source files you plan to edit further.',
  },
  {
    question: 'What quality setting should I use for WebP?',
    answer: 'For web photos and editorial images: quality 80–90. For images with sharp edges or text overlays: 90–95. For thumbnails where size matters most: 60–75. Quality 100 disables most lossy compression — use it only when maximum fidelity is required.',
  },
  {
    question: 'Is WebP better than AVIF?',
    answer: 'AVIF achieves 40–50% smaller files than JPG, beating WebP\'s 25–34% reduction. However, WebP has 97% browser support versus AVIF\'s ~93%, and WebP encodes significantly faster. For most websites in 2026, WebP is the practical choice: excellent compression, near-universal support, and instant in-browser conversion.',
  },
  {
    question: 'Does WebP support transparency?',
    answer: 'Yes. WebP supports full alpha-channel transparency, exactly like PNG. Converting a transparent PNG to WebP preserves the transparency completely, making WebP a direct drop-in replacement for PNG in most web contexts.',
  },
  {
    question: 'Can I convert multiple files to WebP at once?',
    answer: 'Yes. Drop multiple files at once and click "Convert all" to process them in one go, then "Download all" to get a ZIP archive with all converted WebP files.',
  },
  {
    question: 'Can I convert WebP back to JPG or PNG?',
    answer: 'Yes — use the dedicated WebP to JPG or WebP to PNG converters on this site. Both run entirely in your browser with no uploads.',
  },
  {
    question: 'Are my files uploaded to a server?',
    answer: 'No. All conversion happens directly in your browser using the Canvas API. Your files never leave your device. You can verify this by opening browser DevTools → Network tab while converting — you will see zero file transfers.',
  },
]

const DEFAULT_QUALITY = 85

const PICTURE_CODE = `<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description of the image">
</picture>`

export default function WebPConverter() {
  const [files, setFiles] = useState([])
  const [lightboxUrl, setLightboxUrl] = useState(null)
  const [pictureCopied, setPictureCopied] = useState(false)
  const filesRef = useRef(files)
  filesRef.current = files

  async function handleCopyPicture() {
    await navigator.clipboard.writeText(PICTURE_CODE)
    setPictureCopied(true)
    setTimeout(() => setPictureCopied(false), 2000)
  }

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
      // buildZip failed — silently ignore
    }
  }

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Free WebP Converter Online',
    'url': PAGE_URL,
    'description': PAGE_DESCRIPTION,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      'Convert JPG to WebP',
      'Convert PNG to WebP',
      'Convert GIF to WebP',
      'Convert AVIF to WebP',
      'Convert BMP to WebP',
      'Batch conversion with quality slider',
      'No file upload — 100% private',
      'Free, instant, browser-based',
    ],
  }

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to convert images to WebP online',
    'description': 'Convert JPG, PNG, GIF, AVIF or BMP files to WebP format in your browser — free and instant.',
    'step': HOW_TO_STEPS.map((text, i) => ({
      '@type': 'HowToStep',
      'position': i + 1,
      'text': text,
    })),
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': WEBP_FAQ.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }

  return (
    <>
    {lightboxUrl && <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}
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
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdHowTo)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <h1 className="WebPConverter__title">Free WebP Converter Online</h1>
      <p className="WebPConverter__sub">Convert JPG, PNG, GIF, AVIF and BMP to WebP — processed locally in your browser, files never leave your device.</p>

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
            onPreviewClick={setLightboxUrl}
          />
        )}
      </section>

      <section className="WebPConverter__section">
        <h2 className="WebPConverter__section-title">How to convert images to WebP</h2>
        <ol className="WebPConverter__steps">
          {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>

      <section className="WebPConverter__section">
        <h2 className="WebPConverter__section-title">Why WebP is the best image format for websites</h2>
        <p className="WebPConverter__text">
          WebP is a modern image format developed by Google in 2010, built to replace both JPEG and PNG on the web. It delivers <strong>smaller file sizes without visible quality loss</strong> — which means faster page loads, lower bandwidth costs, and better rankings in Google Search.
        </p>

        <h3 className="WebPConverter__subsection-title">WebP vs JPG vs PNG vs AVIF — format comparison</h3>
        <div className="WebPConverter__table-wrap">
          <table className="WebPConverter__table">
            <thead>
              <tr>
                <th>Format</th>
                <th>Compression</th>
                <th>File size vs JPG</th>
                <th>Transparency</th>
                <th>Animation</th>
                <th>Browser support</th>
              </tr>
            </thead>
            <tbody>
              <tr className="WebPConverter__table-highlight">
                <td><strong>WebP</strong></td>
                <td>Lossy + Lossless</td>
                <td><strong>25–34% smaller</strong></td>
                <td>✓</td>
                <td>✓</td>
                <td>97%</td>
              </tr>
              <tr>
                <td>AVIF</td>
                <td>Lossy + Lossless</td>
                <td>40–50% smaller</td>
                <td>✓</td>
                <td>✓</td>
                <td>93%</td>
              </tr>
              <tr>
                <td>JPG</td>
                <td>Lossy only</td>
                <td>baseline</td>
                <td>—</td>
                <td>—</td>
                <td>100%</td>
              </tr>
              <tr>
                <td>PNG</td>
                <td>Lossless only</td>
                <td>40–60% larger*</td>
                <td>✓</td>
                <td>—</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="WebPConverter__table-note">* For photographic content. PNG can be smaller than JPG for graphics with flat colors.</p>
        <p className="WebPConverter__text">
          A real-world example: a typical 500 KB JPG product photo becomes <strong>approximately 330 KB as WebP</strong> at quality 85 — a 34% reduction with no visible difference at normal viewing sizes. At the same quality, PNG would be around 800 KB.
        </p>

        <h3 className="WebPConverter__subsection-title">Lossy vs lossless WebP — which to use</h3>
        <p className="WebPConverter__text">
          WebP supports two compression modes in a single format. <strong>Lossy WebP</strong> — the default here — works like JPG: it discards some image data to achieve much smaller files. At quality 85, the result is visually identical to the original for photographs, but 25–34% smaller. <strong>Lossless WebP</strong> keeps every pixel intact, like PNG, and still compresses about 26% better. Use lossless for logos, icons, screenshots, and any image you plan to edit further.
        </p>

        <h3 className="WebPConverter__subsection-title">How WebP improves SEO and Core Web Vitals</h3>
        <p className="WebPConverter__text">
          Page speed is a direct Google ranking factor. Images are typically the largest assets on any web page — and the format you choose determines how fast they load. WebP directly improves <strong>LCP (Largest Contentful Paint)</strong>, one of the three Core Web Vitals scores Google uses to evaluate page experience. According to Google's own data, the probability of a user bouncing increases by 32% when page load time goes from 1 to 3 seconds.
        </p>
        <p className="WebPConverter__text">
          By switching your images from JPG to WebP, you reduce the total page weight by 25–34% without any design changes. For image-heavy pages — product galleries, blog posts, portfolios — this can cut several seconds off load time on mobile networks.
        </p>

        <h3 className="WebPConverter__subsection-title">How to add WebP images to your website</h3>
        <p className="WebPConverter__text">
          The safest way to serve WebP is using the HTML <code>&lt;picture&gt;</code> element with a JPG fallback. Browsers that support WebP load the WebP version; older browsers automatically fall back to the JPG:
        </p>
        <div className="WebPConverter__code-block">
          <div className="WebPConverter__code-header">
            <span className="WebPConverter__code-label">HTML</span>
            <button
              type="button"
              className={`WebPConverter__code-copy${pictureCopied ? ' WebPConverter__code-copy--done' : ''}`}
              onClick={handleCopyPicture}
            >
              {pictureCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="WebPConverter__code">{PICTURE_CODE}</pre>
        </div>
        <p className="WebPConverter__text">
          If you use <strong>Next.js</strong>, the built-in <code>&lt;Image&gt;</code> component serves WebP automatically with no extra configuration. In <strong>WordPress</strong>, plugins like ShortPixel or Imagify convert and serve WebP on the fly. On servers with direct config access, enable WebP via an <code>.htaccess</code> rewrite rule to serve <code>.webp</code> files whenever a browser supports the format.
        </p>

        <h3 className="WebPConverter__subsection-title">When to keep JPG or PNG instead of WebP</h3>
        <ul className="WebPConverter__list">
          <li>You need to support very old browsers (Internet Explorer, Safari before version 14) without adding a <code>&lt;picture&gt;</code> fallback</li>
          <li>The file will be uploaded to a platform that doesn't yet accept WebP (some print services, older stock photo sites, certain email clients)</li>
          <li>You're exporting a source file for further editing in software that doesn't support WebP — in that case, keep the PNG or high-quality JPG as your master file and convert to WebP for web delivery only</li>
        </ul>
      </section>

      <FAQ items={WEBP_FAQ} />

      <nav className="WebPConverter__related">
        <h2 className="WebPConverter__section-title">Related tools</h2>
        <div className="WebPConverter__related-grid">
          <Link to="/png-to-webp" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">PNG to WebP</span>
            <span className="WebPConverter__related-desc">Convert PNG images to WebP — up to 26% smaller</span>
          </Link>
          <Link to="/jpg-to-webp" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">JPG to WebP</span>
            <span className="WebPConverter__related-desc">Convert JPG images to WebP — 25–34% smaller files</span>
          </Link>
          <Link to="/webp-to-jpg" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">WebP to JPG</span>
            <span className="WebPConverter__related-desc">Convert WebP to JPG for maximum compatibility</span>
          </Link>
          <Link to="/webp-to-png" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">WebP to PNG</span>
            <span className="WebPConverter__related-desc">Convert WebP to PNG — preserves transparency</span>
          </Link>
          <Link to="/compress-webp" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">Compress WebP</span>
            <span className="WebPConverter__related-desc">Reduce WebP file size with adjustable quality</span>
          </Link>
          <Link to="/favicon-generator" className="WebPConverter__related-card">
            <span className="WebPConverter__related-name">Favicon Generator</span>
            <span className="WebPConverter__related-desc">Generate favicons from text, emoji, or image</span>
          </Link>
        </div>
      </nav>
    </main>
    </>
  )
}
