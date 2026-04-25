import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import FaviconControls from './components/FaviconControls/FaviconControls'
import FaviconPreview from './components/FaviconPreview/FaviconPreview'
import { downloadBlob } from './utils/download'
import { generateFaviconAssets } from './utils/generateFaviconAssets'
import './FaviconGenerator.scss'

const PAGE_TITLE = 'Free Favicon Generator Online — From Text, Emoji or Image | Abect'
const PAGE_DESCRIPTION = 'Generate favicon files for any website — from text, emoji, or logo. Get all sizes: 16×16, 32×32, 180×180, 512×512. Free, instant, no uploads.'
const PAGE_URL = 'https://devtools.abect.com/favicon-generator'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/favicon-generator-og.jpg'

const HOW_TO_STEPS = [
  'Choose a source: Text / Emoji to type a letter, number, or any emoji — or Image to upload your own logo.',
  'Adjust colors, font size, border radius, or image fit. The preview updates live.',
  'Click Download favicon package to get a ZIP with all required sizes ready to use.',
  'Unzip and copy the files to your site root, then paste the link tags into your HTML head.',
  'Open site.webmanifest and set your app name and theme color.',
]

const FAVICON_FAQ = [
  {
    question: 'What favicon files does my website need?',
    answer: 'A complete modern favicon setup needs: favicon-16x16.png and favicon-32x32.png for browser tabs, apple-touch-icon.png at 180×180 for iOS, and android-chrome-192x192.png plus android-chrome-512x512.png for Android and PWA. Keep a favicon.ico in your site root as a legacy fallback. This generator produces all of them in one ZIP.',
  },
  {
    question: 'What is the difference between favicon.ico and PNG?',
    answer: 'favicon.ico is a legacy format supported by all browsers including old Internet Explorer — place it in your site root and browsers will find it automatically. PNG favicons support full color, transparency, and are required for Apple devices. SVG favicons (Chrome, Firefox, Edge) are the most modern option and support dark mode. Modern sites use all three: SVG or PNG declared in the HTML head, ICO as root fallback.',
  },
  {
    question: 'What is an SVG favicon and should I use one?',
    answer: 'An SVG favicon is a vector icon that scales perfectly to any size and can adapt to dark mode using a CSS media query inside the SVG file. Supported in Chrome, Firefox, and Edge (about 85% of browsers). If you want dark mode support or a single file for all resolutions, add an SVG favicon alongside your PNG set.',
  },
  {
    question: 'Can I use an emoji as a favicon?',
    answer: 'Yes. Select Emoji mode, type or paste any emoji, and it will be rendered at all required favicon sizes. You can download the result as a PNG set and favicon.ico. Emoji favicons are a quick, zero-design way to make a site feel branded.',
  },
  {
    question: 'How do I add a favicon in Next.js?',
    answer: 'In Next.js 13+ App Router: place favicon.ico directly in the app/ directory — Next.js picks it up automatically. For full control (PNG sizes, Apple Touch Icon), export a metadata.icons object from your root layout.js with paths to each PNG file placed in the public/ folder.',
  },
  {
    question: 'Why is my favicon not updating after I changed it?',
    answer: 'Browsers cache favicons aggressively, sometimes for days. To force a refresh: open the tab with your site, press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) for a hard reload. In Chrome DevTools you can also right-click the favicon in the tab and select "Reload favicon". Appending a version query string to the favicon URL (e.g. href="/favicon.png?v=2") forces all visitors to reload it.',
  },
  {
    question: 'What size should a favicon be?',
    answer: 'The minimum is 32×32 px for browser tabs. For full coverage you need 16×16, 32×32, 180×180 (Apple), 192×192, and 512×512 (Android/PWA). Anything above 512×512 is not used by any browser or OS. This generator produces all required sizes automatically.',
  },
  {
    question: 'Are my images uploaded anywhere?',
    answer: 'No. All processing happens directly in your browser using the Canvas API. Your images never leave your device — nothing is uploaded to any server. You can verify this by opening browser DevTools → Network tab while generating — you will see zero file transfers.',
  },
]

const HTML_CODE = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`

const REACT_CRA_CODE = `<!-- public/index.html -->
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png">
<link rel="manifest" href="%PUBLIC_URL%/site.webmanifest">`

const NEXTJS_CODE = `// app/layout.js (Next.js 13+ App Router)
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}`

const VITE_CODE = `<!-- index.html (Vite + React or Vue) -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`

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
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    }
  }, [imagePreviewUrl])

  const hasRenderableInput = useMemo(() => {
    return mode === 'text' ? text.trim().length > 0 : Boolean(imageFile)
  }, [imageFile, mode, text])

  async function handleCopy(key, code) {
    await navigator.clipboard.writeText(code)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  async function handleImageSelect(file) {
    setErrorMessage('')
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
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
      const assets = await generateFaviconAssets({ mode, text, imageFile, backgroundColor, foregroundColor, fontScale, borderRadius, fitMode })
      downloadBlob(assets.zipBlob, 'favicon-package.zip')
    } catch {
      setErrorMessage('Could not generate favicon files. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Free Favicon Generator Online',
    'url': PAGE_URL,
    'description': PAGE_DESCRIPTION,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      'Generate favicon from text',
      'Generate favicon from emoji',
      'Generate favicon from image',
      'Download PNG favicon set (16×16, 32×32, 180×180, 192×192, 512×512)',
      'Download favicon.ico',
      'No file upload — 100% private',
      'Free, instant, browser-based',
    ],
  }

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to generate a favicon for your website',
    'description': 'Create favicon files from text, emoji, or image — free and instant in your browser.',
    'step': HOW_TO_STEPS.map((text, i) => ({
      '@type': 'HowToStep',
      'position': i + 1,
      'text': text,
    })),
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAVICON_FAQ.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
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
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdHowTo)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <h1 className="FaviconGenerator__title">Free Favicon Generator Online</h1>
      <p className="FaviconGenerator__sub">
        Create favicon files from text, emoji, or your logo — all sizes included, processed locally in your browser.
      </p>

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
          {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>

      <section className="FaviconGenerator__section">
        <h2 className="FaviconGenerator__section-title">What favicon files does your website need?</h2>
        <p className="FaviconGenerator__text">
          A single favicon.ico is no longer enough. Modern browsers, iOS, Android, and PWAs each require a different size and format. Here is the complete set you need in 2026.
        </p>

        <h3 className="FaviconGenerator__subsection-title">Required favicon sizes</h3>
        <div className="FaviconGenerator__table-wrap">
          <table className="FaviconGenerator__table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Format</th>
                <th>Used for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>16×16</td>
                <td>PNG</td>
                <td>Browser tab (small), bookmarks bar</td>
              </tr>
              <tr>
                <td>32×32</td>
                <td>PNG</td>
                <td>Browser tab (default), Windows taskbar, Retina displays</td>
              </tr>
              <tr className="FaviconGenerator__table-highlight">
                <td>180×180</td>
                <td>PNG</td>
                <td>Apple Touch Icon — iOS/iPadOS home screen, iMessage link preview</td>
              </tr>
              <tr>
                <td>192×192</td>
                <td>PNG</td>
                <td>Android Chrome home screen, PWA icon</td>
              </tr>
              <tr>
                <td>512×512</td>
                <td>PNG</td>
                <td>PWA splash screen, high-DPI Android, app stores</td>
              </tr>
              <tr>
                <td>Any</td>
                <td>ICO</td>
                <td>Legacy fallback — place favicon.ico in site root, browsers find it automatically</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="FaviconGenerator__table-note">This generator produces all sizes above in a single ZIP.</p>

        <h3 className="FaviconGenerator__subsection-title">ICO vs PNG vs SVG — format comparison</h3>
        <div className="FaviconGenerator__table-wrap">
          <table className="FaviconGenerator__table">
            <thead>
              <tr>
                <th>Format</th>
                <th>Browser support</th>
                <th>Transparency</th>
                <th>Dark mode</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ICO</strong></td>
                <td>100%</td>
                <td>✓</td>
                <td>—</td>
                <td>Root fallback (favicon.ico)</td>
              </tr>
              <tr className="FaviconGenerator__table-highlight">
                <td><strong>PNG</strong></td>
                <td>99%+</td>
                <td>✓</td>
                <td>—</td>
                <td>Standard: all sizes, Apple, Android</td>
              </tr>
              <tr>
                <td><strong>SVG</strong></td>
                <td>~85%</td>
                <td>✓</td>
                <td>✓</td>
                <td>Modern browsers: scales infinitely, supports dark mode via CSS</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="FaviconGenerator__table-note">Use PNG + ICO for maximum compatibility. Add SVG on top if you want dark mode support.</p>
      </section>

      <section className="FaviconGenerator__section">
        <h2 className="FaviconGenerator__section-title">How to add a favicon to your website</h2>
        <p className="FaviconGenerator__text">
          After downloading the ZIP, copy the files to your site root. Then add these tags to your HTML <code>&lt;head&gt;</code>. Pick the snippet that matches your stack.
        </p>

        <h3 className="FaviconGenerator__subsection-title">Plain HTML</h3>
        <div className="FaviconGenerator__code-block">
          <div className="FaviconGenerator__code-header">
            <span className="FaviconGenerator__code-label">HTML</span>
            <button
              type="button"
              className={`FaviconGenerator__code-copy${copiedKey === 'html' ? ' FaviconGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('html', HTML_CODE)}
            >
              {copiedKey === 'html' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="FaviconGenerator__code">{HTML_CODE}</pre>
        </div>

        <h3 className="FaviconGenerator__subsection-title">React (Vite) / Vue</h3>
        <p className="FaviconGenerator__text">Place files in <code>public/</code>. Add to <code>index.html</code>:</p>
        <div className="FaviconGenerator__code-block">
          <div className="FaviconGenerator__code-header">
            <span className="FaviconGenerator__code-label">HTML</span>
            <button
              type="button"
              className={`FaviconGenerator__code-copy${copiedKey === 'vite' ? ' FaviconGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('vite', VITE_CODE)}
            >
              {copiedKey === 'vite' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="FaviconGenerator__code">{VITE_CODE}</pre>
        </div>

        <h3 className="FaviconGenerator__subsection-title">React (Create React App)</h3>
        <p className="FaviconGenerator__text">Place files in <code>public/</code>. Edit <code>public/index.html</code> — use <code>%PUBLIC_URL%</code> prefix:</p>
        <div className="FaviconGenerator__code-block">
          <div className="FaviconGenerator__code-header">
            <span className="FaviconGenerator__code-label">HTML</span>
            <button
              type="button"
              className={`FaviconGenerator__code-copy${copiedKey === 'cra' ? ' FaviconGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('cra', REACT_CRA_CODE)}
            >
              {copiedKey === 'cra' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="FaviconGenerator__code">{REACT_CRA_CODE}</pre>
        </div>

        <h3 className="FaviconGenerator__subsection-title">Next.js 13+ (App Router)</h3>
        <p className="FaviconGenerator__text">
          Quickest way: place <code>favicon.ico</code> directly in <code>app/</code> — Next.js picks it up automatically. For full control with PNG sizes and Apple Touch Icon, use the metadata API:
        </p>
        <div className="FaviconGenerator__code-block">
          <div className="FaviconGenerator__code-header">
            <span className="FaviconGenerator__code-label">JS</span>
            <button
              type="button"
              className={`FaviconGenerator__code-copy${copiedKey === 'nextjs' ? ' FaviconGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('nextjs', NEXTJS_CODE)}
            >
              {copiedKey === 'nextjs' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="FaviconGenerator__code">{NEXTJS_CODE}</pre>
        </div>

        <h3 className="FaviconGenerator__subsection-title">WordPress</h3>
        <p className="FaviconGenerator__text">
          Go to <strong>Appearance → Customize → Site Identity</strong> and upload your <strong>512×512 PNG</strong> — WordPress crops it to all required sizes automatically. The uploaded image becomes both the browser favicon and the app icon for home screen installs. If you need to declare a custom ICO path or Apple Touch Icon, add the link tags to your theme's <code>header.php</code> or use a header plugin.
        </p>
      </section>

      <FAQ items={FAVICON_FAQ} />

      <nav className="FaviconGenerator__related">
        <h2 className="FaviconGenerator__section-title">Related tools</h2>
        <div className="FaviconGenerator__related-grid">
          <Link to="/meta-tags-generator" className="FaviconGenerator__related-card">
            <span className="FaviconGenerator__related-name">Meta Tags Generator</span>
            <span className="FaviconGenerator__related-desc">Generate SEO meta tags with Open Graph preview</span>
          </Link>
          <Link to="/png-to-webp" className="FaviconGenerator__related-card">
            <span className="FaviconGenerator__related-name">PNG to WebP</span>
            <span className="FaviconGenerator__related-desc">Convert PNG images to WebP — up to 26% smaller files</span>
          </Link>
          <Link to="/compress-png" className="FaviconGenerator__related-card">
            <span className="FaviconGenerator__related-name">Compress PNG</span>
            <span className="FaviconGenerator__related-desc">Reduce PNG file size — lossless compression, no quality loss</span>
          </Link>
          <Link to="/webp-converter" className="FaviconGenerator__related-card">
            <span className="FaviconGenerator__related-name">WebP Converter</span>
            <span className="FaviconGenerator__related-desc">Convert JPG, PNG, GIF and more to WebP format</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
