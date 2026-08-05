import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { renderToString } from 'react-dom/server'
import App from './App'
import { JsonLdSink } from './components/JsonLd/JsonLdSink'
import './index.css'

const HEAD_PREFIX_PATTERN = /^(?:(?:<title[\s\S]*?<\/title>|<meta[^>]*\/?>|<link[^>]*\/?>)\s*)+/

// "<" is escaped so a "</script>" inside any schema string cannot terminate the
// tag early. < is valid JSON, so parsers still read the original character.
const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

export function render(url) {
  const jsonLd = []

  const markup = renderToString(
    <JsonLdSink.Provider value={jsonLd}>
      <HelmetProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </JsonLdSink.Provider>
  )

  const hoistedHead = markup.match(HEAD_PREFIX_PATTERN)?.[0] ?? ''
  const appHtml = hoistedHead ? markup.slice(hoistedHead.length) : markup

  const jsonLdTags = jsonLd
    .map(data => `<script type="application/ld+json">${serializeJsonLd(data)}</script>`)
    .join('')

  return { appHtml, headTags: hoistedHead + jsonLdTags }
}
