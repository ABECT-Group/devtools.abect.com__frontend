import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHeader from '../../components/PageHeader/PageHeader'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import FAQ from '../../components/FAQ/FAQ'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import Table from '../../components/Table/Table'
import CodeBox from '../../components/CodeBox/CodeBox'
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import { PrimaryButton } from '../../components/Buttons/Buttons'
import TextInput from './components/TextInput/TextInput'
import TextOutput from './components/TextOutput/TextOutput'
import { buildHelmet, OG_IMAGE } from './data/helmet'
import { buildJsonLdApp, buildJsonLdHowTo, buildJsonLdFaq } from './data/jsonld'
import JsonLd from '../../components/JsonLd/JsonLd'
import { CONVERTERS, buildContent } from './data/content'
import './TextConverter.scss'

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

const DELIMITER_OPTIONS = [
  { value: ',',  label: ',' },
  { value: ';',  label: ';' },
  { value: '\t', label: '⇥' },
]

export default function TextConverter() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const slug = pathname.slice(1)

  const config = CONVERTERS[slug] ?? CONVERTERS['html-to-markdown']
  const { title, description, url, subtitle } = buildHelmet(slug)
  const contentData = buildContent(slug)
  const jsonLdApp   = buildJsonLdApp(slug)
  const jsonLdHowTo = contentData ? buildJsonLdHowTo(contentData.howToSteps) : null
  const jsonLdFaq   = contentData ? buildJsonLdFaq(contentData.faq) : null

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)
  const [delimiter, setDelimiter] = useState(',')

  useEffect(() => {
    setInput('')
    setOutput('')
    setError(null)
  }, [slug])

  // Awaited because some converters (Markdown, YAML) load their parser on
  // first use. Synchronous converters resolve immediately — await is a no-op.
  async function handleConvert() {
    if (!input.trim()) return
    try {
      const result = await config.convertFn(input, delimiter)
      setOutput(result)
      setError(null)
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <main className="TextConverter">
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
        <SegmentedControl
          options={config.segmentedOptions}
          value={slug}
          onChange={val => navigate(`/${val}`)}
          fitContent
        />

        <div className="TextConverter__fields">
          <TextInput
            label={config.inputLabel}
            value={input}
            onChange={setInput}
            placeholder={config.placeholder}
          />

          <div className="TextConverter__controls">
            <div className="TextConverter__controls-left">
              {config.hasDelimiter && (
                <>
                  <span className="TextConverter__delimiter-label">Delimiter</span>
                  <SegmentedControl
                    options={DELIMITER_OPTIONS}
                    value={delimiter}
                    onChange={setDelimiter}
                    fitContent
                  />
                </>
              )}
              {error && <span className="TextConverter__error">{error}</span>}
            </div>
            <PrimaryButton onClick={handleConvert} disabled={!input.trim()}>
              Convert
            </PrimaryButton>
          </div>

          <TextOutput
            label={config.outputLabel}
            value={output}
            fileExt={config.outputExt}
          />
          {(slug === 'jsx-to-html' || slug === 'html-to-jsx' || slug === 'tsx-to-html' || slug === 'html-to-tsx') && (
            <a href="/ai" className="TextConverter__ai-hint">
              Need AI-powered conversion? <span className="TextConverter__ai-hint-cta">Try Lora →</span>
            </a>
          )}
        </div>
      </ToolSection>

      {contentData && (
        <>
          <ContentSection title={contentData.howToTitle}>
            <ol className="ContentSection__steps">
              {contentData.howToSteps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </ContentSection>

          {contentData.sections.map((section, si) => (
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

          <FAQ items={contentData.faq} />
          <RelatedTools items={contentData.relatedTools} />
        </>
      )}
    </main>
  )
}
