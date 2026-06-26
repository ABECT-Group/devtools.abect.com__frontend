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

function convertHtmlToJsx(html) {
  let result = html

  result = result.replace(/<\?[\s\S]*?\?>\s*/g, '')
  result = result.replace(/<!--([\s\S]*?)-->/g, (_, text) => `{/*${text}*/}`)
  result = result.replace(/\s+xmlns:xlink="[^"]*"/gi, '')
  result = result.replace(/\bxml:space=/gi, 'xmlSpace=')
  result = result.replace(/\bxml:lang=/gi, 'xmlLang=')
  result = result.replace(/\bxlink:href=/gi, 'href=')
  result = result.replace(/\bxlink:title=/gi, 'xlinkTitle=')

  for (const [from, to] of Object.entries(ATTR_RENAME)) {
    result = result.replace(new RegExp(`\\b${from}(?=[=\\s>/]|$)`, 'gi'), to)
  }

  result = result.replace(
    /\b(?!data-|aria-)([a-z][a-z0-9]*(?:-[a-z0-9]+)+)(?==)/g,
    attr => attr.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
  )

  result = result.replace(/\bon([a-z]+)=/gi, (_, ev) => {
    const lower = ev.toLowerCase()
    const react = EVENT_REACT[lower] ?? (lower[0].toUpperCase() + lower.slice(1))
    return `on${react}=`
  })

  result = result.replace(/style="([^"]*)"/gi, (_, s) => `style=${convertInlineStyle(s)}`)

  for (const tag of VOID_TAGS) {
    result = result.replace(
      new RegExp(`<(${tag})(\\s[^>]*)?>(?!\\s*<\\/${tag}>)`, 'gi'),
      (_, t, attrs = '') => `<${t}${attrs.replace(/\s*\/\s*$/, '')} />`
    )
  }

  return result
}

export function htmlToTsx(html) {
  const jsx = convertHtmlToJsx(html)
  const indented = jsx.trim().split('\n').map(l => '    ' + l).join('\n')

  return `import React from 'react'

interface Props {}

const Component: React.FC<Props> = () => {
  return (
${indented}
  )
}

export default Component`
}
