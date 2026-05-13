const ATTR_REVERSE = {
  className: 'class',
  htmlFor: 'for',
  tabIndex: 'tabindex',
  readOnly: 'readonly',
  maxLength: 'maxlength',
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
}

function convertJsxStyle(jsxStyleStr) {
  const props = jsxStyleStr.split(',').map(s => s.trim()).filter(Boolean)
  const cssProps = props.map(prop => {
    const colon = prop.indexOf(':')
    if (colon === -1) return null
    const key = prop.slice(0, colon).trim()
    const val = prop.slice(colon + 1).trim().replace(/^['"`]|['"`]$/g, '')
    const kebabKey = key.replace(/([A-Z])/g, c => `-${c.toLowerCase()}`)
    return `${kebabKey}: ${val}`
  }).filter(Boolean)
  return `"${cssProps.join('; ')}"`
}

export function jsxToHtml(jsx) {
  let result = jsx

  // Reverse attribute names
  for (const [from, to] of Object.entries(ATTR_REVERSE)) {
    result = result.replace(new RegExp(`\\b${from}=`, 'g'), `${to}=`)
  }

  // Reverse event handlers: onClick → onclick
  result = result.replace(/\bon([A-Z][a-zA-Z]*)=/g, (_, ev) => `on${ev.toLowerCase()}=`)

  // Convert JSX style objects: style={{ color: 'red' }} → style="color: red"
  result = result.replace(/style=\{\{([^}]*)\}\}/g, (_, s) => `style=${convertJsxStyle(s)}`)

  // Remove self-closing slash from void elements where it was added: <br /> → <br>
  result = result.replace(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(\s[^>]*)?\s\/>/gi,
    (_, tag, attrs = '') => `<${tag}${attrs}>`)

  return result
}
