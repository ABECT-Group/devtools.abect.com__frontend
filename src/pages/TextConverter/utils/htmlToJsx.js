const ATTR_RENAME = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  minlength: 'minLength',
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

const EVENT_REACT = {
  mouseenter: 'MouseEnter', mouseleave: 'MouseLeave', mouseover: 'MouseOver',
  mouseout: 'MouseOut', mousedown: 'MouseDown', mouseup: 'MouseUp', mousemove: 'MouseMove',
  keydown: 'KeyDown', keyup: 'KeyUp', keypress: 'KeyPress',
  dblclick: 'DoubleClick', contextmenu: 'ContextMenu',
  touchstart: 'TouchStart', touchend: 'TouchEnd', touchmove: 'TouchMove', touchcancel: 'TouchCancel',
  pointerdown: 'PointerDown', pointerup: 'PointerUp', pointermove: 'PointerMove',
  pointerenter: 'PointerEnter', pointerleave: 'PointerLeave',
  pointerover: 'PointerOver', pointerout: 'PointerOut', pointercancel: 'PointerCancel',
  gotpointercapture: 'GotPointerCapture', lostpointercapture: 'LostPointerCapture',
  dragstart: 'DragStart', dragend: 'DragEnd', dragover: 'DragOver',
  dragenter: 'DragEnter', dragleave: 'DragLeave',
  animationstart: 'AnimationStart', animationend: 'AnimationEnd', animationiteration: 'AnimationIteration',
  transitionend: 'TransitionEnd', transitionstart: 'TransitionStart',
  beforeinput: 'BeforeInput', beforeunload: 'BeforeUnload',
  compositionstart: 'CompositionStart', compositionend: 'CompositionEnd', compositionupdate: 'CompositionUpdate',
  canplay: 'CanPlay', canplaythrough: 'CanPlayThrough',
  timeupdate: 'TimeUpdate', volumechange: 'VolumeChange',
  ratechange: 'RateChange', loadeddata: 'LoadedData', loadedmetadata: 'LoadedMetadata', loadstart: 'LoadStart',
}

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

  // HTML comments → JSX comments
  result = result.replace(/<!--([\s\S]*?)-->/g, (_, text) => `{/*${text}*/}`)

  // Rename known attributes — handles both `name="val"` and bare boolean `name`
  for (const [from, to] of Object.entries(ATTR_RENAME)) {
    result = result.replace(new RegExp(`\\b${from}(?=[=\\s>/]|$)`, 'gi'), to)
  }

  // Camelcase event handlers: onclick → onClick, onmouseenter → onMouseEnter
  result = result.replace(/\bon([a-z]+)=/gi, (_, ev) => {
    const lower = ev.toLowerCase()
    const react = EVENT_REACT[lower] ?? (lower[0].toUpperCase() + lower.slice(1))
    return `on${react}=`
  })

  // Convert inline styles: style="color: red" → style={{ color: 'red' }}
  result = result.replace(/style="([^"]*)"/gi, (_, s) => `style=${convertInlineStyle(s)}`)

  // Self-close void elements: <br> → <br />, <img src="x"> → <img src="x" />
  for (const tag of VOID_TAGS) {
    result = result.replace(
      new RegExp(`<(${tag})(\\s[^>]*)?>(?!\\s*<\\/${tag}>)`, 'gi'),
      (_, t, attrs = '') => `<${t}${attrs.replace(/\s*\/\s*$/, '')} />`
    )
  }

  return result
}
