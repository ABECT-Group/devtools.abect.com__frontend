import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import Table from '../../components/Table/Table'
import CodeBox from '../../components/CodeBox/CodeBox'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import FaviconControls from './components/FaviconControls/FaviconControls'
import FaviconPreview from './components/FaviconPreview/FaviconPreview'
import { downloadBlob } from './utils/download'
import { generateFaviconAssets } from './utils/generateFaviconAssets'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdApp, jsonLdHowTo, jsonLdFaq } from './data/jsonld'
import { HOW_TO_STEPS, FAQ as FAQ_ITEMS, HTML_CODE, VITE_CODE, REACT_CRA_CODE, NEXTJS_CODE, RELATED_TOOLS } from './data/content'
import './FaviconGenerator.scss'

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
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    }
  }, [imagePreviewUrl])

  const hasRenderableInput = useMemo(() => {
    return mode === 'text' ? text.trim().length > 0 : Boolean(imageFile)
  }, [imageFile, mode, text])

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

  return (
    <main className="FaviconGenerator">
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
        title="Free Favicon Generator Online"
        subtitle="Create favicon files from text, emoji, or your logo — all sizes included, processed locally in your browser."
      />

      <ToolSection>
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
      </ToolSection>

      <ContentSection title="How to generate a favicon">
        <ol className="ContentSection__steps">
          {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </ContentSection>

      <ContentSection title="What favicon files does your website need?">
        <p className="ContentSection__text">
          A single favicon.ico is no longer enough. Modern browsers, iOS, Android, and PWAs each require a different size and format. Here is the complete set you need in 2026.
        </p>

        <h3 className="ContentSection__subsection-title">Required favicon sizes</h3>
        <Table columns={['Size', 'Format', 'Used for']} note="This generator produces all sizes above in a single ZIP.">
          <tr><td>16×16</td><td>PNG</td><td>Browser tab (small), bookmarks bar</td></tr>
          <tr><td>32×32</td><td>PNG</td><td>Browser tab (default), Windows taskbar, Retina displays</td></tr>
          <tr className="Table__row--highlight"><td>180×180</td><td>PNG</td><td>Apple Touch Icon — iOS/iPadOS home screen, iMessage link preview</td></tr>
          <tr><td>192×192</td><td>PNG</td><td>Android Chrome home screen, PWA icon</td></tr>
          <tr><td>512×512</td><td>PNG</td><td>PWA splash screen, high-DPI Android, app stores</td></tr>
          <tr><td>Any</td><td>ICO</td><td>Legacy fallback — place favicon.ico in site root, browsers find it automatically</td></tr>
        </Table>

        <h3 className="ContentSection__subsection-title">ICO vs PNG vs SVG — format comparison</h3>
        <Table columns={['Format', 'Browser support', 'Transparency', 'Dark mode', 'Best for']} note="Use PNG + ICO for maximum compatibility. Add SVG on top if you want dark mode support.">
          <tr><td><strong>ICO</strong></td><td>100%</td><td>✓</td><td>—</td><td>Root fallback (favicon.ico)</td></tr>
          <tr className="Table__row--highlight"><td><strong>PNG</strong></td><td>99%+</td><td>✓</td><td>—</td><td>Standard: all sizes, Apple, Android</td></tr>
          <tr><td><strong>SVG</strong></td><td>~85%</td><td>✓</td><td>✓</td><td>Modern browsers: scales infinitely, supports dark mode via CSS</td></tr>
        </Table>
      </ContentSection>

      <ContentSection title="How to add a favicon to your website">
        <p className="ContentSection__text">
          After downloading the ZIP, copy the files to your site root. Then add these tags to your HTML <code>&lt;head&gt;</code>. Pick the snippet that matches your stack.
        </p>

        <h3 className="ContentSection__subsection-title">Plain HTML</h3>
        <CodeBox label="HTML" code={HTML_CODE} />

        <h3 className="ContentSection__subsection-title">React (Vite) / Vue</h3>
        <p className="ContentSection__text">Place files in <code>public/</code>. Add to <code>index.html</code>:</p>
        <CodeBox label="HTML" code={VITE_CODE} />

        <h3 className="ContentSection__subsection-title">React (Create React App)</h3>
        <p className="ContentSection__text">Place files in <code>public/</code>. Edit <code>public/index.html</code> — use <code>%PUBLIC_URL%</code> prefix:</p>
        <CodeBox label="HTML" code={REACT_CRA_CODE} />

        <h3 className="ContentSection__subsection-title">Next.js 13+ (App Router)</h3>
        <p className="ContentSection__text">
          Quickest way: place <code>favicon.ico</code> directly in <code>app/</code> — Next.js picks it up automatically. For full control with PNG sizes and Apple Touch Icon, use the metadata API:
        </p>
        <CodeBox label="JS" code={NEXTJS_CODE} />

        <h3 className="ContentSection__subsection-title">WordPress</h3>
        <p className="ContentSection__text">
          Go to <strong>Appearance → Customize → Site Identity</strong> and upload your <strong>512×512 PNG</strong> — WordPress crops it to all required sizes automatically. The uploaded image becomes both the browser favicon and the app icon for home screen installs. If you need to declare a custom ICO path or Apple Touch Icon, add the link tags to your theme's <code>header.php</code> or use a header plugin.
        </p>
      </ContentSection>

      <FAQ items={FAQ_ITEMS} />

      <RelatedTools items={RELATED_TOOLS} />
    </main>
  )
}
