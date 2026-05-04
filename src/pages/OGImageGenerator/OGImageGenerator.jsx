import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHeader      from '../../components/PageHeader/PageHeader'
import ToolSection     from '../../components/ToolSection/ToolSection'
import ContentSection  from '../../components/ContentSection/ContentSection'
import Table           from '../../components/Table/Table'
import CodeBox         from '../../components/CodeBox/CodeBox'
import FAQ             from '../../components/FAQ/FAQ'
import RelatedTools    from '../../components/RelatedTools/RelatedTools'
import { PrimaryButton } from '../../components/Buttons/Buttons'
import OGCropEditor    from './components/OGCropEditor/OGCropEditor'
import OGCardPreview   from './components/OGCardPreview/OGCardPreview'
import OGMetaInputs    from './components/OGMetaInputs/OGMetaInputs'
import OGCodeOutput    from './components/OGCodeOutput/OGCodeOutput'
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import { generateOGCode, ASPECT_PRESETS } from './utils/generateOGCode'
import { loadImage, cropToBlob } from './utils/cropToBlob'
import { downloadBlob } from './utils/download'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdApp, jsonLdHowTo, jsonLdFaq } from './data/jsonld'
import { HOW_TO_STEPS, FAQ as FAQ_ITEMS, RELATED_TOOLS, HTML_CODE, REACT_CODE, NEXTJS_CODE, NUXT_CODE, OG_SIZE_TABLE } from './data/content'
import './OGImageGenerator.scss'

export default function OGImageGenerator() {
  // ── Image ──────────────────────────────────────────────────
  const [imageFile, setImageFile]       = useState(null)
  const [origImg, setOrigImg]           = useState(null) // original decoded Image, kept for crop/export
  const [workingImage, setWorkingImage] = useState(null) // quality-adjusted Image, canvas display only

  // ── Crop state ─────────────────────────────────────────────
  const [offsetXFrac, setOffsetXFrac] = useState(0)
  const [offsetYFrac, setOffsetYFrac] = useState(0)
  const [relScale, setRelScale]       = useState(1)
  const [aspectKey, setAspectKey]     = useState('og')
  const [quality, setQuality]         = useState(100)

  // ── Metadata ───────────────────────────────────────────────
  const [title, setTitle]                   = useState('')
  const [description, setDescription]       = useState('')
  const [pageUrl, setPageUrl]               = useState('')
  const [siteName, setSiteName]             = useState('')
  const [locale, setLocale]                 = useState('en_US')
  const [addTwitter, setAddTwitter]         = useState(false)
  const [twitterSite, setTwitterSite]       = useState('')
  const [twitterCreator, setTwitterCreator] = useState('')
  const [twitterCard, setTwitterCard]       = useState('summary_large_image')
  const [addComments, setAddComments]       = useState(false)

  // ── UI ─────────────────────────────────────────────────────
  const [editorMode, setEditorMode]         = useState('edit')
  const [isDownloading, setIsDownloading]   = useState(false)
  const [errorMessage, setErrorMessage]     = useState('')
  const [previewBlobUrl, setPreviewBlobUrl] = useState(null)
  const [blobSizeKB, setBlobSizeKB]         = useState(null)
  const [isQualityLoading, setIsQualityLoading] = useState(false)

  const origImgRef            = useRef(null)
  const workingImgDebounceRef = useRef(null)
  const prevImageFileRef      = useRef(null)
  const prevQualityRef        = useRef(100)
  const previewDebounceRef    = useRef(null)
  const prevBlobUrlRef        = useRef(null)

  // ── Effect 1: workingImage — regenerated on imageFile or quality change ──
  useEffect(() => {
    if (!imageFile) {
      setOrigImg(null)
      origImgRef.current       = null
      setWorkingImage(null)
      setIsQualityLoading(false)
      prevImageFileRef.current = null
      prevQualityRef.current   = quality
      return
    }

    const imageFileChanged = imageFile !== prevImageFileRef.current
    const qualityChanged   = quality   !== prevQualityRef.current
    prevImageFileRef.current = imageFile
    prevQualityRef.current   = quality

    // Blur only when quality changes on the same image (not on new image load)
    if (qualityChanged && !imageFileChanged) setIsQualityLoading(true)

    clearTimeout(workingImgDebounceRef.current)
    const delay = (qualityChanged && !imageFileChanged) ? 400 : 0

    workingImgDebounceRef.current = setTimeout(async () => {
      try {
        const origImg = await loadImage(imageFile)
        origImgRef.current = origImg
        if (imageFileChanged) setOrigImg(origImg)

        if (quality >= 100) {
          setWorkingImage(origImg)
          setIsQualityLoading(false)
          return
        }

        // Re-encode original at selected quality to produce the working image
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width  = origImg.naturalWidth
        tempCanvas.height = origImg.naturalHeight
        tempCanvas.getContext('2d').drawImage(origImg, 0, 0)

        const blob = await new Promise(resolve =>
          tempCanvas.toBlob(resolve, 'image/jpeg', quality / 100)
        )
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.onload = () => {
          URL.revokeObjectURL(url)
          setWorkingImage(img)
          setIsQualityLoading(false)
        }
        img.onerror = () => { URL.revokeObjectURL(url); setIsQualityLoading(false) }
        img.src = url
      } catch { setIsQualityLoading(false) }
    }, delay)

    return () => clearTimeout(workingImgDebounceRef.current)
  }, [imageFile, quality]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Effect 2: previewBlobUrl — regenerated on crop params, origImg or quality change ──
  useEffect(() => {
    if (!origImg) {
      if (prevBlobUrlRef.current) {
        URL.revokeObjectURL(prevBlobUrlRef.current)
        prevBlobUrlRef.current = null
      }
      setPreviewBlobUrl(null)
      setBlobSizeKB(null)
      return
    }

    clearTimeout(previewDebounceRef.current)
    previewDebounceRef.current = setTimeout(async () => {
      try {
        const blob = await cropToBlob({ imageObj: origImg, offsetXFrac, offsetYFrac, relScale, aspectKey, quality })
        if (prevBlobUrlRef.current) URL.revokeObjectURL(prevBlobUrlRef.current)
        const url = URL.createObjectURL(blob)
        prevBlobUrlRef.current = url
        setPreviewBlobUrl(url)
        setBlobSizeKB(Math.round(blob.size / 1024))
      } catch {}
    }, 300)

    return () => clearTimeout(previewDebounceRef.current)
  }, [origImg, offsetXFrac, offsetYFrac, relScale, aspectKey, quality])

  useEffect(() => {
    return () => {
      clearTimeout(workingImgDebounceRef.current)
      clearTimeout(previewDebounceRef.current)
      if (prevBlobUrlRef.current) URL.revokeObjectURL(prevBlobUrlRef.current)
    }
  }, [])

  // ── Handlers ───────────────────────────────────────────────
  function handleImageSelect(file) {
    setErrorMessage('')
    setImageFile(file)
    setOffsetXFrac(0)
    setOffsetYFrac(0)
    setRelScale(1)
    setQuality(100)
    setPreviewBlobUrl(null)
    setBlobSizeKB(null)
  }

  function handleImageClear() {
    setImageFile(null)
    setOrigImg(null)
    origImgRef.current = null
    setWorkingImage(null)
    setOffsetXFrac(0)
    setOffsetYFrac(0)
    setRelScale(1)
    setQuality(100)
    setErrorMessage('')
  }

  function handleAspectChange(key) {
    setAspectKey(key)
    setOffsetXFrac(0)
    setOffsetYFrac(0)
    setRelScale(1)
  }

  function handleReset() {
    setOffsetXFrac(0)
    setOffsetYFrac(0)
    setRelScale(1)
  }

  async function handleDownload() {
    if (!origImgRef.current) {
      setErrorMessage('Upload an image first.')
      return
    }
    setIsDownloading(true)
    setErrorMessage('')
    try {
      const blob = await cropToBlob({ imageObj: origImgRef.current, offsetXFrac, offsetYFrac, relScale, aspectKey, quality })
      downloadBlob(blob, 'og-image.jpg')
    } catch {
      setErrorMessage('Export failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  // ── Generated code ─────────────────────────────────────────
  const { width: imageWidth, height: imageHeight } = ASPECT_PRESETS[aspectKey]
  const generatedCode = generateOGCode({
    title, description, pageUrl, siteName, locale,
    imageWidth, imageHeight,
    addTwitter, twitterSite, twitterCreator, twitterCard,
    addComments,
  })

  return (
    <main className="OGImageGenerator">
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
        title="Free OG Image Generator"
        subtitle="Crop any image to 1200&times;630&nbsp;px (1.91:1) or 1080&times;1080&nbsp;px (1:1), adjust quality, and get copy-ready Open Graph &amp; Twitter meta tags &mdash; free, private, runs in your browser."
      />

      <ToolSection>
        <div className="OGImageGenerator__cols">

          <div className="OGImageGenerator__left">
            <OGMetaInputs
              title={title}                     onTitleChange={setTitle}
              description={description}         onDescriptionChange={setDescription}
              pageUrl={pageUrl}                 onPageUrlChange={setPageUrl}
              siteName={siteName}               onSiteNameChange={setSiteName}
              locale={locale}                   onLocaleChange={setLocale}
              addTwitter={addTwitter}           onAddTwitterChange={setAddTwitter}
              twitterSite={twitterSite}         onTwitterSiteChange={setTwitterSite}
              twitterCreator={twitterCreator}   onTwitterCreatorChange={setTwitterCreator}
              twitterCard={twitterCard}         onTwitterCardChange={setTwitterCard}
              addComments={addComments}         onAddCommentsChange={setAddComments}
            />
          </div>

          <div className="OGImageGenerator__right">

            <SegmentedControl
              options={[
                { value: 'edit',    label: 'Edit' },
                { value: 'preview', label: 'Preview' },
              ]}
              value={editorMode}
              onChange={setEditorMode}
              fitContent
            />

            {editorMode === 'edit' ? (
              <OGCropEditor
                imageFile={imageFile}
                workingImage={workingImage}
                isQualityLoading={isQualityLoading}
                offsetXFrac={offsetXFrac}
                offsetYFrac={offsetYFrac}
                relScale={relScale}
                aspectKey={aspectKey}
                quality={quality}
                blobSizeKB={blobSizeKB}
                onImageSelect={handleImageSelect}
                onImageClear={handleImageClear}
                onOffsetChange={(x, y) => { setOffsetXFrac(x); setOffsetYFrac(y) }}
                onScaleChange={setRelScale}
                onAspectChange={handleAspectChange}
                onReset={handleReset}
                onQualityChange={setQuality}
              />
            ) : (
              <OGCardPreview
                title={title}
                description={description}
                siteName={siteName}
                pageUrl={pageUrl}
                imageObjectUrl={previewBlobUrl}
                aspectKey={aspectKey}
              />
            )}

            <OGCodeOutput code={generatedCode} />

            <PrimaryButton
              onClick={handleDownload}
              loading={isDownloading}
              loadingText="Exporting…"
              disabled={!imageFile}
              fullWidth
            >
              Download image
            </PrimaryButton>

            {errorMessage && (
              <p className="OGImageGenerator__error">{errorMessage}</p>
            )}
          </div>

        </div>
      </ToolSection>

      <ContentSection title="How to use this OG image generator">
        <ol className="ContentSection__steps">
          {HOW_TO_STEPS.map((step, i) => (
            <li key={i} className="ContentSection__step">{step}</li>
          ))}
        </ol>
        <p className="ContentSection__text">
          The tool runs entirely in your browser — no file is ever uploaded to a server. Cropping, quality adjustment, and JPEG export all happen locally via the Canvas API. This means your images stay private and the tool works even offline after the page has loaded.
        </p>
      </ContentSection>

      <ContentSection title="OG image size requirements by platform">
        <p className="ContentSection__text">
          Different platforms handle Open Graph images differently, but the <strong>1200×630 px JPEG at 1.91:1 ratio</strong> covers virtually every major platform. Use the 1:1 square format only when specifically targeting Instagram link stickers or Twitter summary cards.
        </p>
        <Table columns={OG_SIZE_TABLE.columns} note={OG_SIZE_TABLE.note}>
          {OG_SIZE_TABLE.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </Table>
        <h3 className="ContentSection__subsection-title">Minimum size and the "small image" fallback</h3>
        <p className="ContentSection__text">
          Facebook requires a minimum of <strong>600×315 px</strong> to show a large preview card. Below that, it falls back to a small thumbnail (≈ 158×158 px) in the corner of the link preview — a much weaker visual impression. Always use at least 1200×630 px to guarantee the large card layout.
        </p>
        <h3 className="ContentSection__subsection-title">Why JPG and not WebP for OG images?</h3>
        <p className="ContentSection__text">
          While WebP produces 25&ndash;34&nbsp;% smaller files than JPEG for the same visual quality, it is <strong>not universally supported by link preview scrapers</strong>. WhatsApp, iMessage, older Slack clients, and many email preview renderers cannot decode WebP. A broken or missing image in a link preview is far worse than a slightly larger JPEG. Stick with JPEG for maximum compatibility &mdash; aim for 80&ndash;90&nbsp;% quality to keep the file under 150&nbsp;KB.
        </p>
      </ContentSection>

      <ContentSection title="How to add og:image meta tags to your site">
        <p className="ContentSection__text">
          After downloading your cropped image, upload it to your web server or CDN and replace <code>INSERT_IMAGE_URL_HERE</code> in the generated code with the public URL. The URL must be absolute (starting with <code>https://</code>) &mdash; relative URLs are not supported by any link scraper.
        </p>

        <h3 className="ContentSection__subsection-title">Plain HTML</h3>
        <p className="ContentSection__text">Paste directly inside the <code>&lt;head&gt;</code> of your HTML file:</p>
        <CodeBox label="HTML" code={HTML_CODE} />

        <h3 className="ContentSection__subsection-title">React + Vite (react-helmet-async)</h3>
        <p className="ContentSection__text">
          Install <code>react-helmet-async</code>, wrap your app in <code>HelmetProvider</code>, then add <code>&lt;Helmet&gt;</code> to each page component:
        </p>
        <CodeBox label="JSX" code={REACT_CODE} />

        <h3 className="ContentSection__subsection-title">Next.js 13+ (App Router)</h3>
        <p className="ContentSection__text">
          Export a <code>metadata</code> object from your <code>page.js</code>. Next.js renders all OG tags server-side — no extra library needed:
        </p>
        <CodeBox label="JS" code={NEXTJS_CODE} />

        <h3 className="ContentSection__subsection-title">Vue 3 + Nuxt 3</h3>
        <p className="ContentSection__text">
          Use the built-in <code>useHead()</code> composable inside <code>&lt;script setup&gt;</code>:
        </p>
        <CodeBox label="JS" code={NUXT_CODE} />

        <h3 className="ContentSection__subsection-title">WordPress</h3>
        <p className="ContentSection__text">
          Install <strong>Yoast SEO</strong> or <strong>Rank Math</strong> — both add a meta box on every post and page where you set the OG title, description, and image. After uploading your 1200×630 JPG to the Media Library, select it as the social preview image. Both plugins output <code>og:image:width</code> and <code>og:image:height</code> automatically.
        </p>
      </ContentSection>

      <FAQ items={FAQ_ITEMS} />

      <RelatedTools items={RELATED_TOOLS} />
    </main>
  )
}
