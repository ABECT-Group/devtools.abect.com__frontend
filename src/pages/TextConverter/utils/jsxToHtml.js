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

export function jsxToHtml(jsx) {
  let result = jsx

  // JSX comments → HTML comments
  result = result.replace(/\{\/\*([\s\S]*?)\*\/\}/g, (_, text) => `<!--${text}-->`)

  // Unwrap fragments
  result = result.replace(/<React\.Fragment[^>]*>([\s\S]*?)<\/React\.Fragment>/g, '$1')
  result = result.replace(/<>([\s\S]*?)<\/>/g, '$1')

  // Reverse attribute names — handles both `name="val"` and bare boolean `name`
  for (const [from, to] of Object.entries(ATTR_REVERSE)) {
    result = result.replace(new RegExp(`\\b${from}(?=[=\\s>/]|$)`, 'g'), to)
  }

  // Reverse event handlers: onClick → onclick
  result = result.replace(/\bon([A-Z][a-zA-Z]*)=/g, (_, ev) => `on${ev.toLowerCase()}=`)

  // Convert JSX style objects: style={{ color: 'red' }} → style="color: red"
  result = result.replace(/style=\{\{([^}]*)\}\}/g, (_, s) => `style=${convertJsxStyle(s)}`)

  // Resolve JSX expression attribute values: {true} → bare, {false/null/undefined} → removed, {x} → "x"
  result = result.replace(/\b([\w-]+)=\{(?!\{)true\}/g, '$1')
  result = result.replace(/\n[ \t]*([\w-]+)=\{(?!\{)(?:false|null|undefined)\}/g, '')
  result = result.replace(/[ \t]*([\w-]+)=\{(?!\{)(?:false|null|undefined)\}[ \t]*/g, '')
  result = result.replace(/\b([\w-]+)=\{(?!\{)([^}]+)\}/g, (_, attr, val) => {
    const v = val.trim().replace(/^['"]|['"]$/g, '')
    return `${attr}="${v}"`
  })

  // Convert self-closing lowercase HTML tags.
  // Attr pattern handles > inside JSX {expressions} (e.g. arrow functions: e => x).
  // void (<input />) → <input>; non-void (<textarea />) → <textarea></textarea>
  result = result.replace(
    /<([a-z][a-z0-9-]*)((?:[^{}>]|\{(?:[^{}]|\{[^{}]*\})*\})*)\s?\/>/g,
    (_, tag, attrs) => {
      const a = attrs.trimEnd()
      return VOID_HTML.test(tag) ? `<${tag}${a}>` : `<${tag}${a}></${tag}>`
    }
  )

  return result
}
