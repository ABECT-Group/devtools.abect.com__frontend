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
import SchemaForm from './components/SchemaForm/SchemaForm'
import SchemaOutput from './components/SchemaOutput/SchemaOutput'
import { SCHEMA_CONFIGS, SCHEMA_TYPE_KEYS } from './data/schemas'
import { buildHelmet, SLUG_TO_TYPE, TYPE_TO_SLUG, OG_IMAGE } from './data/helmet'
import { buildJsonLdApp, buildJsonLdHowTo, buildJsonLdFaq } from './data/jsonld'
import { buildContent } from './data/content'
import { buildSchema } from './utils/buildSchema'
import { validateSchema } from './utils/validateSchema'
import { formatScriptTag } from './utils/formatOutput'
import JsonLd from '../../components/JsonLd/JsonLd'
import './JsonLdGenerator.scss'

const TYPE_TABS = SCHEMA_TYPE_KEYS.map(key => ({
  key,
  label: SCHEMA_CONFIGS[key].label,
  to: `/${TYPE_TO_SLUG[key]}`,
}))

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) return <a key={i} href={m[2]}>{m[1]}</a>
    return part
  })
}

export default function JsonLdGenerator() {
  const { pathname } = useLocation()
  const slug = pathname.slice(1)
  const activeType = SLUG_TO_TYPE[slug] ?? 'product'

  const [values, setValues] = useState({})

  useEffect(() => { setValues({}) }, [activeType])

  function handleChange(key, value) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  function handleReset() {
    setValues({})
  }

  const config     = SCHEMA_CONFIGS[activeType]
  const jsonLd     = buildSchema(activeType, values)
  const scriptTag  = formatScriptTag(jsonLd)
  const validation = validateSchema(activeType, values)

  const { title, description, url, subtitle } = buildHelmet(slug)
  const { howToTitle, howToSteps, sections, faq, relatedTools } = buildContent(activeType)
  const jsonLdApp   = buildJsonLdApp(slug)
  const jsonLdHowTo = buildJsonLdHowTo(howToSteps)
  const jsonLdFaq   = buildJsonLdFaq(faq)

  return (
    <main className="JsonLdGenerator">
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

      <PageHeader
        title={title.split(' —')[0]}
        subtitle={subtitle}
      />

      <ToolSection>
        <TypeTabs items={TYPE_TABS} activeKey={activeType} description={config.description} />
        <div className="JsonLdGenerator__cols">
          <div className="JsonLdGenerator__form-col">
            <SchemaForm config={config} values={values} onChange={handleChange} />
          </div>
          <div className="JsonLdGenerator__output-col">
            <SchemaOutput
              scriptTag={scriptTag}
              onReset={handleReset}
              validation={validation}
              aiHint={activeType === 'product'}
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
            if (block.type === 'p')     return <p key={i} className="ContentSection__text">{renderText(block.text)}</p>
            if (block.type === 'h3')    return <h3 key={i} className="ContentSection__subsection-title">{block.text}</h3>
            if (block.type === 'ul')    return <ul key={i} className="ContentSection__list">{block.items.map((item, j) => <li key={j}>{renderText(item)}</li>)}</ul>
            if (block.type === 'table') return <Table key={i} columns={block.headers}>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</Table>
            if (block.type === 'code')  return <CodeBox key={i} label={block.label} code={block.code} />
            return null
          })}
        </ContentSection>
      ))}

      <FAQ items={faq} />
      <RelatedTools items={relatedTools} />
    </main>
  )
}
