function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildXml(data, tag, indent = 0) {
  const pad = '  '.repeat(indent)

  if (Array.isArray(data)) {
    return data.map(item => buildXml(item, tag, indent)).join('\n')
  }

  if (data === null || typeof data !== 'object') {
    return `${pad}<${tag}>${escapeXml(data)}</${tag}>`
  }

  // Support both @attributes wrapper and direct @key convention
  const attrPairs = []
  if (data['@attributes']) {
    Object.entries(data['@attributes']).forEach(([k, v]) => attrPairs.push(`${k}="${escapeXml(v)}"`))
  }
  Object.entries(data).forEach(([k, v]) => {
    if (k.startsWith('@') && k !== '@attributes') attrPairs.push(`${k.slice(1)}="${escapeXml(v)}"`)
  })
  const attrs = attrPairs.length ? ' ' + attrPairs.join(' ') : ''

  const children = Object.entries(data)
    .filter(([k]) => k !== '@attributes' && k !== '#text' && !k.startsWith('@'))
    .map(([k, v]) => buildXml(v, k, indent + 1))
    .join('\n')

  const text = data['#text'] ? escapeXml(data['#text']) : ''

  if (!children && !text) return `${pad}<${tag}${attrs} />`
  if (!children) return `${pad}<${tag}${attrs}>${text}</${tag}>`
  if (!text) return `${pad}<${tag}${attrs}>\n${children}\n${pad}</${tag}>`
  return `${pad}<${tag}${attrs}>${text}\n${children}\n${pad}</${tag}>`
}

export function jsonToXml(input) {
  const data = JSON.parse(input)
  if (typeof data !== 'object' || Array.isArray(data) || data === null) {
    throw new Error('Input must be a JSON object (not an array or primitive).')
  }

  const keys = Object.keys(data)
  if (keys.length !== 1) {
    const detail = keys.length === 0 ? 'no keys found' : `${keys.length} keys: ${keys.join(', ')}`
    throw new Error(`XML requires exactly one root element (got ${detail}). Wrap your content in a single root key, e.g. { "root": { ... } }.`)
  }

  const lines = ['<?xml version="1.0" encoding="UTF-8"?>']
  for (const [key, value] of Object.entries(data)) {
    lines.push(buildXml(value, key, 0))
  }
  return lines.join('\n')
}
