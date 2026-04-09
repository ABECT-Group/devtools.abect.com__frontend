import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { renderToString } from 'react-dom/server'
import App from './App'
import './index.css'

const HEAD_PREFIX_PATTERN = /^(?:(?:<title[\s\S]*?<\/title>|<meta[^>]*\/?>|<link[^>]*\/?>)\s*)+/

export function render(url) {
  const markup = renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  const headTags = markup.match(HEAD_PREFIX_PATTERN)?.[0] ?? ''
  const appHtml = headTags ? markup.slice(headTags.length) : markup

  return { appHtml, headTags }
}
