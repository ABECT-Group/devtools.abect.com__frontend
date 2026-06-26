const VOID_HTML = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i

const ATTR_REVERSE = {
  className: 'class',
  htmlFor: 'for',
  tabIndex: 'tabindex',
  readOnly: 'readonly',
  maxLength: 'maxlength',
  minLength: 'minlength',
  cellPadding: 'cellpadding',
  cellSpacing: 'cellspacing',
  rowSpan: 'rowspan',
  colSpan: 'colspan',
  useMap: 'usemap',
  frameBorder: 'frameborder',
  contentEditable: 'contenteditable',
  crossOrigin: 'crossorigin',
  encType: 'enctype',
  accessKey: 'accesskey',
  autoFocus: 'autofocus',
  autoComplete: 'autocomplete',
  noValidate: 'novalidate',
  spellCheck: 'spellcheck',
  srcSet: 'srcset',
  srcDoc: 'srcdoc',
  xmlSpace: 'xml:space',
  xmlLang: 'xml:lang',
  xlinkTitle: 'xlink:title',
}

const SVG_ATTR_REVERSE = {
  enableBackground: 'enable-background',
  fillRule: 'fill-rule',
  fillOpacity: 'fill-opacity',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeOpacity: 'stroke-opacity',
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorRendering: 'color-rendering',
  dominantBaseline: 'dominant-baseline',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  imageRendering: 'image-rendering',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  paintOrder: 'paint-order',
  shapeRendering: 'shape-rendering',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  unicodeBidi: 'unicode-bidi',
  vectorEffect: 'vector-effect',
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
  colorProfile: 'color-profile',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
}

function convertJsxStyle(jsxStyleStr) {
  const result = []
  const re = /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|([^,}]*))/g
  let match
  while ((match = re.exec(jsxStyleStr)) !== null) {
    const key = match[1]
    const val = (match[2] ?? match[3] ?? match[4] ?? '').trim()
    if (!key || val === '') continue
    const kebabKey = key.replace(/([A-Z])/g, c => `-${c.toLowerCase()}`)
    result.push(`${kebabKey}: ${val}`)
  }
  return `"${result.join('; ')}"`
}

function extractBalancedParens(code, openIdx) {
  let depth = 0
  for (let i = openIdx; i < code.length; i++) {
    if (code[i] === '(') depth++
    else if (code[i] === ')') {
      depth--
      if (depth === 0) return code.slice(openIdx + 1, i).trim()
    }
  }
  return null
}

function extractReturnBody(code) {
  const returnIdx = code.search(/\breturn\s*\(/)
  if (returnIdx !== -1) {
    const parenOpen = code.indexOf('(', returnIdx)
    const body = extractBalancedParens(code, parenOpen)
    if (body) return body
  }

  // Concise arrow body: const X = () => (...)
  const arrowIdx = code.search(/=>\s*\(/)
  if (arrowIdx !== -1) {
    const parenOpen = code.indexOf('(', arrowIdx)
    const body = extractBalancedParens(code, parenOpen)
    if (body) return body
  }

  return null
}

function stripTypeScript(code) {
  let result = code

  // Strip import statements
  result = result.replace(/^import\s[^\n]*\n?/gm, '')

  // Strip interface declarations (handles one level of nesting)
  result = result.replace(/\binterface\s+\w[\w<>., ]*\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '')

  // Strip type alias declarations — object form and simple form
  result = result.replace(/\btype\s+\w[\w<>., ]*\s*=\s*\{(?:[^{}]|\{[^{}]*\})*\}\s*;?/g, '')
  result = result.replace(/\btype\s+\w[\w<>., ]*\s*=[^;\n{]+[;\n]/g, '')

  // Try to extract the JSX return body from a full component
  const body = extractReturnBody(result)
  if (body) result = body

  // Strip `as TypeAnnotation` inside JSX expression blocks: {value as Type}
  // Matches PascalCase types and lowercase TS primitives (string, number, boolean…)
  result = result.replace(
    /\{([^{}]*?)\s+as\s+(?:[A-Z]\w*(?:<[^<>]*>)?|string|number|boolean|any|never|void|unknown)(?:\s*\|[^{}]*)?\}/g,
    (_, inner) => `{${inner.trim()}}`
  )

  // Clean up excess blank lines left by stripped declarations
  result = result.replace(/\n{3,}/g, '\n\n').trim()

  return result
}

function convertJsxToHtml(jsx) {
  let result = jsx

  result = result.replace(/\{\/\*([\s\S]*?)\*\/\}/g, (_, text) => `<!--${text}-->`)
  result = result.replace(/<React\.Fragment[^>]*>([\s\S]*?)<\/React\.Fragment>/g, '$1')
  result = result.replace(/<>([\s\S]*?)<\/>/g, '$1')

  for (const [from, to] of Object.entries(ATTR_REVERSE)) {
    result = result.replace(new RegExp(`\\b${from}(?=[=\\s>/]|$)`, 'g'), to)
  }

  result = result.replace(/\bon([A-Z][a-zA-Z]*)=/g, (_, ev) => `on${ev.toLowerCase()}=`)

  for (const [from, to] of Object.entries(SVG_ATTR_REVERSE)) {
    result = result.replace(new RegExp(`\\b${from}(?==)`, 'g'), to)
  }

  result = result.replace(/style=\{\{([^}]*)\}\}/g, (_, s) => `style=${convertJsxStyle(s)}`)

  result = result.replace(/\b([\w-]+)=\{(?!\{)true\}/g, '$1')
  // Remove false/null/undefined attrs, consuming leading whitespace only (lookahead preserves space after)
  result = result.replace(/\s+([\w-]+)=\{(?!\{)(?:false|null|undefined)\}(?=[\s>/])/g, '')
  result = result.replace(/\b([\w-]+)=\{(?!\{)([^}]+)\}/g, (_, attr, val) => {
    const v = val.trim().replace(/^['"]|['"]$/g, '')
    return `${attr}="${v}"`
  })

  result = result.replace(
    /<([a-z][a-z0-9-]*)((?:[^{}>]|\{(?:[^{}]|\{[^{}]*\})*\})*)\s?\/>/g,
    (_, tag, attrs) => {
      const a = attrs.trimEnd()
      return VOID_HTML.test(tag) ? `<${tag}${a}>` : `<${tag}${a}></${tag}>`
    }
  )

  return result
}

export function tsxToHtml(tsx) {
  const stripped = stripTypeScript(tsx)
  return convertJsxToHtml(stripped)
}
