const ATTR_RENAME = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  rowspan: 'rowSpan',
  colspan: 'colSpan',
  usemap: 'useMap',
  frameborder: 'frameBorder',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  enctype: 'encType',
  accesskey: 'accessKey',
  autofocus: 'autoFocus',
  autocomplete: 'autoComplete',
  novalidate: 'noValidate',
  spellcheck: 'spellCheck',
  srcset: 'srcSet',
  srcdoc: 'srcDoc',
}

const VOID_TAGS = new Set([
  'area','base','br','col','embed','hr','img','input',
  'link','meta','param','source','track','wbr',
])

function convertInlineStyle(styleStr) {
  const props = styleStr.split(';').map(s => s.trim()).filter(Boolean)
  const jsxProps = props.map(prop => {
    const colon = prop.indexOf(':')
    if (colon === -1) return null
    const key = prop.slice(0, colon).trim()
    const val = prop.slice(colon + 1).trim()
    const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    return `${camelKey}: '${val}'`
  }).filter(Boolean)
  return `{{ ${jsxProps.join(', ')} }}`
}

export function htmlToJsx(html) {
  let result = html

  // Rename known attributes (case-insensitive match)
  for (const [from, to] of Object.entries(ATTR_RENAME)) {
    result = result.replace(new RegExp(`\\b${from}=`, 'gi'), `${to}=`)
  }

  // Camelcase event handlers: onclick → onClick, onchange → onChange
  result = result.replace(/\bon([a-z]+)=/gi, (_, ev) => `on${ev[0].toUpperCase()}${ev.slice(1)}=`)

  // Convert inline styles: style="color: red" → style={{ color: 'red' }}
  result = result.replace(/style="([^"]*)"/gi, (_, s) => `style=${convertInlineStyle(s)}`)

  // Self-close void elements: <br> → <br />, <img src="x"> → <img src="x" />
  for (const tag of VOID_TAGS) {
    result = result.replace(
      new RegExp(`<(${tag})(\\s[^>]*)?>(?!\\s*<\\/${tag}>)`, 'gi'),
      (_, t, attrs = '') => `<${t}${attrs} />`
    )
  }

  return result
}
