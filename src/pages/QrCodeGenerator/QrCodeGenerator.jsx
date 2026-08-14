import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import Table from '../../components/Table/Table'
import CodeBox from '../../components/CodeBox/CodeBox'
import TypeTabs from '../../components/TypeTabs/TypeTabs'
import JsonLd from '../../components/JsonLd/JsonLd'
import QrForm from './components/QrForm/QrForm'
import QrStyleControls from './components/QrStyleControls/QrStyleControls'
import QrPreview from './components/QrPreview/QrPreview'
import { QR_TYPES, QR_TYPE_KEYS, DEFAULT_STYLE, LOGO_RATIO } from './data/types'
import { buildHelmet, SLUG_TO_TYPE, TYPE_TO_SLUG, OG_IMAGE } from './data/helmet'
import { buildJsonLdApp, buildJsonLdHowTo, buildJsonLdFaq } from './data/jsonld'
import { buildContent } from './data/content'
import { encodePayload } from './utils/encodePayload'
import { validateQr } from './utils/validateQr'
import './QrCodeGenerator.scss'

const TYPE_TABS = QR_TYPE_KEYS.map(key => ({
  key,
  label: QR_TYPES[key].label,
  to: `/${TYPE_TO_SLUG[key]}`,
}))

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) {
      // External links open in a new tab with noopener/noreferrer; internal
      // links stay in the same tab and get neither attribute.
      const isExternal = /^https?:\/\//.test(m[2])
      return (
        <a
          key={i}
          href={m[2]}
          className="ContentSection__link"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {m[1]}
        </a>
      )
    }
    return part
  })
}

export default function QrCodeGenerator() {
  const { pathname } = useLocation()
  const slug = pathname.slice(1)
  const activeType = SLUG_TO_TYPE[slug] ?? 'url'

  const [values, setValues] = useState({})
  const [style, setStyle] = useState(DEFAULT_STYLE)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreviewUrl, setLogoPreviewUrl] = useState('')

  // Only the payload resets when the type changes. React Router keeps this
  // component mounted across sibling routes, so the chosen colors and logo
  // survive — someone branding a set of codes picks the look once.
  //
  // Adjusted during render rather than in an effect: React re-runs this
  // component immediately without committing the stale values, so there is no
  // frame where the new type is shown with the previous type's data.
  const [prevType, setPrevType] = useState(activeType)
  if (prevType !== activeType) {
    setPrevType(activeType)
    setValues({})
  }

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl)
    }
  }, [logoPreviewUrl])

  function handleChange(key, value) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  function handleStyleChange(key, value) {
    setStyle(prev => ({ ...prev, [key]: value }))
  }

  function handleLogoSelect(file) {
    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl)
    if (!file) {
      setLogoFile(null)
      setLogoPreviewUrl('')
      setStyle(prev => ({ ...prev, logoRatio: 0, ecc: DEFAULT_STYLE.ecc }))
      return
    }
    setLogoFile(file)
    setLogoPreviewUrl(URL.createObjectURL(file))
    // A center logo destroys the modules it covers; only level H reliably
    // recovers that much of the pattern.
    setStyle(prev => ({ ...prev, logoRatio: LOGO_RATIO, ecc: 'H' }))
  }

  const config = QR_TYPES[activeType]
  const payload = encodePayload(activeType, values)
  const validation = validateQr(activeType, values, payload, style.ecc)

  const { title, description, url, subtitle } = buildHelmet(slug)
  const { howToTitle, howToSteps, sections, faq, relatedTools } = buildContent(activeType)
  const jsonLdApp = buildJsonLdApp(slug)
  const jsonLdHowTo = buildJsonLdHowTo(howToTitle, howToSteps)
  const jsonLdFaq = buildJsonLdFaq(faq)

  return (
    <main className="QrCodeGenerator">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <JsonLd data={jsonLdApp} />
      <JsonLd data={jsonLdHowTo} />
      <JsonLd data={jsonLdFaq} />

      <PageHeader title={title.split(' —')[0]} subtitle={subtitle} />

      <ToolSection>
        <TypeTabs items={TYPE_TABS} activeKey={activeType} description={config.description} />
        <div className="QrCodeGenerator__cols">
          <div className="QrCodeGenerator__form-col">
            <QrForm config={config} values={values} onChange={handleChange} />
            <QrStyleControls
              style={style}
              logoPreviewUrl={logoPreviewUrl}
              onStyleChange={handleStyleChange}
              onLogoSelect={handleLogoSelect}
              onLogoClear={() => handleLogoSelect(null)}
            />
          </div>
          <div className="QrCodeGenerator__preview-col">
            <QrPreview
              payload={payload}
              style={style}
              logoFile={logoFile}
              logoPreviewUrl={logoPreviewUrl}
              validation={validation}
              filename={slug}
            />
          </div>
        </div>
      </ToolSection>

      <ContentSection title={howToTitle}>
        <ol className="ContentSection__steps">
          {howToSteps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </ContentSection>

      {sections.map((section, si) => (
        <ContentSection key={si} title={section.heading}>
          {section.blocks.map((block, i) => {
            if (block.type === 'p') return <p key={i} className="ContentSection__text">{renderText(block.text)}</p>
            if (block.type === 'h3') return <h3 key={i} className="ContentSection__subsection-title">{block.text}</h3>
            if (block.type === 'ul') return <ul key={i} className="ContentSection__list">{block.items.map((item, j) => <li key={j}>{renderText(item)}</li>)}</ul>
            if (block.type === 'table') return <Table key={i} columns={block.headers}>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</Table>
            if (block.type === 'code') return <CodeBox key={i} label={block.label} code={block.code} />
            return null
          })}
        </ContentSection>
      ))}

      <FAQ items={faq} />
      <RelatedTools items={relatedTools} />
    </main>
  )
}
