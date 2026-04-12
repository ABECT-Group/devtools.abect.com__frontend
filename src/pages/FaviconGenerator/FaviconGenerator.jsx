import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import FaviconControls from './components/FaviconControls/FaviconControls'
import FaviconPreview from './components/FaviconPreview/FaviconPreview'
import { downloadBlob } from './utils/download'
import { generateFaviconAssets } from './utils/generateFaviconAssets'
import './FaviconGenerator.scss'

const PAGE_TITLE = 'Free Favicon Generator Online: Text, Emoji, Image | Abect'
const FAVICON_FAQ = [
  {
    question: 'What sizes does a favicon need?',
    answer: 'A modern favicon setup needs 16×16, 32×32, and 180×180 (Apple Touch Icon) PNG files, plus a favicon.ico for legacy browsers. This generator produces all required sizes automatically.',
  },
  {
    question: 'What is the difference between favicon.ico and PNG?',
    answer: 'favicon.ico is a legacy format supported by all browsers, including old Internet Explorer. PNG favicons support full color and transparency, and are required for Apple devices. Modern sites use both for full coverage.',
  },
  {
    question: 'Can I use an emoji as a favicon?',
    answer: 'Yes. Select Emoji mode, type or paste any emoji, and it will be rendered at all required favicon sizes. You can download the result as a PNG set or favicon.ico.',
  },
  {
    question: 'How do I add a favicon to my website?',
    answer: 'Place your favicon files in the site root, then add link tags to your HTML head pointing to the PNG files and apple-touch-icon. See the code snippet above for the exact markup.',
  },
  {
    question: 'Are my images uploaded anywhere?',
    answer: 'No. All processing happens directly in your browser using the Canvas API. Your images never leave your device — nothing is uploaded to any server.',
  },
]
const PAGE_DESCRIPTION = 'Generate favicon files from text, emoji, or image — free and instant. Download .ico or PNG set. No uploads, no signup. Try it now.'
const PAGE_URL = 'https://devtools.abect.com/favicon-generator'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

export default function FaviconGenerator() {
  const [mode, setMode] = useState('text')
  const [text, setText] = useState('A')
  const [backgroundColor, setBackgroundColor] = useState('#1d4ed8')
  const [foregroundColor, setForegroundColor] = useState('#ffffff')
  const [fontScale, setFontScale] = useState(72)
  const [borderRadius, setBorderRadius] = useState(0)
  const [fitMode, setFitMode] = useState('cover')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  const hasRenderableInput = useMemo(() => {
    return mode === 'text' ? text.trim().length > 0 : Boolean(imageFile)
  }, [imageFile, mode, text])

  async function handleImageSelect(file) {
    setErrorMessage('')

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl)
    }

    if (!file) {
      setImageFile(null)
      setImagePreviewUrl('')
      return
    }

    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  function handleModeChange(nextMode) {
    setMode(nextMode)
    setErrorMessage('')
  }

  async function handleDownload() {
    if (!hasRenderableInput) {
      setErrorMessage('Add text, emoji, or one image first.')
      return
    }

    setIsGenerating(true)
    setErrorMessage('')

    try {
      const assets = await generateFaviconAssets({
        mode,
        text,
        imageFile,
        backgroundColor,
        foregroundColor,
        fontScale,
        borderRadius,
        fitMode,
      })

      downloadBlob(assets.zipBlob, 'favicon-package.zip')
    } catch {
      setErrorMessage('Could not generate favicon files. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="FaviconGenerator">
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
          'name': 'Free Favicon Generator',
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
            'Generate favicon from text',
            'Generate favicon from emoji',
            'Generate favicon from image',
            'Download PNG favicon set',
            'Download favicon.ico',
            'No file upload — 100% private',
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What sizes does a favicon need?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'A modern favicon setup needs 16×16, 32×32, and 180×180 (Apple Touch Icon) PNG files, plus a favicon.ico file for legacy browsers. This generator produces all required sizes automatically.' },
            },
            {
              '@type': 'Question',
              'name': 'What is the difference between favicon.ico and PNG favicon?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'favicon.ico is a legacy format supported by all browsers, including old Internet Explorer. PNG favicons are more flexible — they support full color and transparency, and are required for Apple devices (apple-touch-icon). Modern sites use both: favicon.ico for compatibility and PNG files for quality.' },
            },
            {
              '@type': 'Question',
              'name': 'Can I use an emoji as a favicon?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. This tool lets you select any emoji as your favicon source. The emoji is rendered at all required sizes and exported as PNG files and favicon.ico.' },
            },
            {
              '@type': 'Question',
              'name': 'How do I add a favicon to my website?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'After downloading your favicon files, place them in your website root. Then add these tags in your HTML <head>: <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"> and <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">.' },
            },
            {
              '@type': 'Question',
              'name': 'Are my images uploaded anywhere?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'No. All processing happens directly in your browser using the Canvas API. Your images never leave your device — nothing is uploaded to any server.' },
            },
          ],
        })}</script>
      </Helmet>

      <h1 className="FaviconGenerator__title">Favicon generator</h1>
      <p className="FaviconGenerator__sub">
        Generate favicon files locally from text, emoji, or an image. Nothing is uploaded.
      </p>

      {/* Секція з основним інструментарієм */}
      <section className="FaviconGenerator__tool">
        <div className="FaviconGenerator__grid">
          <div className="FaviconGenerator__controls-col">
            <FaviconControls
              mode={mode}
              text={text}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
              fontScale={fontScale}
              borderRadius={borderRadius}
              fitMode={fitMode}
              imagePreviewUrl={imagePreviewUrl}
              isGenerating={isGenerating}
              errorMessage={errorMessage}
              onModeChange={handleModeChange}
              onTextChange={setText}
              onBackgroundColorChange={setBackgroundColor}
              onForegroundColorChange={setForegroundColor}
              onFontScaleChange={setFontScale}
              onBorderRadiusChange={setBorderRadius}
              onFitModeChange={setFitMode}
              onImageSelect={handleImageSelect}
              onImageClear={() => handleImageSelect(null)}
              onDownload={handleDownload}
            />
          </div>
          <div className="FaviconGenerator__preview-col">
            <FaviconPreview
              mode={mode}
              text={text}
              imageFile={imageFile}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
              fontScale={fontScale}
              borderRadius={borderRadius}
              fitMode={fitMode}
              isEmpty={!hasRenderableInput}
            />
          </div>
        </div>
      </section>

      <section className="FaviconGenerator__section">
        <h2 className="FaviconGenerator__section-title">How to generate a favicon</h2>
        <ol className="FaviconGenerator__steps">
          <li>Choose a source: <strong>Text / Emoji</strong> to type a letter, number, or any emoji; or <strong>Image</strong> to upload your own logo.</li>
          <li>Adjust colors, font size, or image fit — the preview updates live on the right.</li>
          <li>Click <strong>Download favicon package</strong> to get a ZIP with all files ready to use.</li>
          <li>Unzip and copy the files to your site root, then paste the <code>&lt;link&gt;</code> tags shown below the button into your HTML <code>&lt;head&gt;</code>.</li>
          <li>Open <code>site.webmanifest</code> and fill in your app name and theme color.</li>
        </ol>
      </section>

      <section className="FaviconGenerator__section">
        <h2 className="FaviconGenerator__section-title">What sizes does a favicon need?</h2>
        <p className="FaviconGenerator__text">
          A complete modern favicon setup requires multiple sizes to look sharp across all browsers and devices. This generator produces all of them automatically.
        </p>
        <ul className="FaviconGenerator__list">
          <li><strong>16×16 px</strong> — browser tab, bookmarks bar</li>
          <li><strong>32×32 px</strong> — Windows taskbar, most browser tabs</li>
          <li><strong>180×180 px</strong> — Apple Touch Icon (iOS home screen)</li>
          <li><strong>192×192 px</strong> — Android Chrome home screen</li>
          <li><strong>512×512 px</strong> — PWA splash screen</li>
          <li><strong>favicon.ico</strong> — legacy support for old browsers</li>
        </ul>
        <h3 className="FaviconGenerator__subsection-title">favicon.ico vs PNG — what to use?</h3>
        <p className="FaviconGenerator__text">
          Use both. <strong>favicon.ico</strong> is a legacy format supported by all browsers including old Internet Explorer — place it in your site root and browsers will find it automatically. <strong>PNG favicons</strong> support full color and transparency and are required for Apple devices. Modern sites declare PNG files in the HTML <code>&lt;head&gt;</code> and keep favicon.ico as a fallback.
        </p>
        <h3 className="FaviconGenerator__subsection-title">How to add a favicon to your website</h3>
        <p className="FaviconGenerator__text">Place your favicon files in the site root, then add these tags to your HTML <code>&lt;head&gt;</code>:</p>
        <pre className="FaviconGenerator__code"><code>{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}</code></pre>
      </section>

      <FAQ items={FAVICON_FAQ} />

      <nav className="FaviconGenerator__related">
        <h2 className="FaviconGenerator__section-title">Related tools</h2>
        <div className="FaviconGenerator__related-grid">
          <Link to="/webp-converter" className="FaviconGenerator__related-card">
            <span className="FaviconGenerator__related-name">WebP Converter</span>
            <span className="FaviconGenerator__related-desc">Convert JPG, PNG, GIF and more to WebP</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
