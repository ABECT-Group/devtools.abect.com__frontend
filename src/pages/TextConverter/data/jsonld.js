import { buildHelmet } from './helmet'

const FEATURE_LISTS = {
  'html-to-markdown': [
    'Browser-based HTML parsing — no upload, 100% private',
    'Converts headings, lists, tables, code blocks, links, and images',
    'GitHub Flavored Markdown output — fenced code, pipe tables, strikethrough',
    'Copy to clipboard and download as .md file',
    'Free, instant, no signup required',
  ],
  'markdown-to-html': [
    'Browser-based Markdown parsing — no upload, 100% private',
    'CommonMark + GitHub Flavored Markdown (GFM) support',
    'Fenced code blocks, pipe tables, strikethrough, and auto-links',
    'Copy to clipboard and download as .html file',
    'Free, instant, no signup required',
  ],
  'html-to-jsx': [
    'Browser-based JSX conversion — no upload, 100% private',
    'Transforms class→className, for→htmlFor, tabindex→tabIndex',
    'Converts inline styles from CSS string to React object syntax',
    'Handles self-closing tags, boolean attributes, and event names',
    'Free, instant, no signup required',
  ],
  'jsx-to-html': [
    'Browser-based HTML conversion — no upload, 100% private',
    'Transforms className→class, htmlFor→for, camelCase events→lowercase',
    'Converts React style objects back to CSS inline style strings',
    'Handles self-closing void element normalization',
    'Free, instant, no signup required',
  ],
  'json-to-csv': [
    'Browser-based JSON parsing — no upload, 100% private',
    'Comma, semicolon, and tab delimiter options',
    'Auto-quotes values containing the delimiter, quotes, or newlines (RFC 4180)',
    'Column headers derived from JSON object keys',
    'Free, instant, no signup required',
  ],
  'csv-to-json': [
    'Browser-based CSV parsing — no upload, 100% private',
    'Comma, semicolon, and tab delimiter support',
    'RFC 4180 quoted fields, embedded commas, and multiline values handled',
    'First row used as JSON object keys automatically',
    'Free, instant, no signup required',
  ],
  'xml-to-json': [
    'Browser-based XML parsing — no upload, 100% private',
    'Preserves attributes (@attributes), text content, and nested elements',
    'Repeated sibling elements automatically converted to JSON arrays',
    'Copy to clipboard and download as .json file',
    'Free, instant, no signup required',
  ],
  'json-to-xml': [
    'Browser-based JSON-to-XML conversion — no upload, 100% private',
    'Supports @attributes convention for XML element attributes',
    'Handles nested objects, arrays, and mixed content',
    'Generates valid XML with declaration and proper indentation',
    'Free, instant, no signup required',
  ],
  'yaml-to-json': [
    'Browser-based YAML parsing with js-yaml — no upload, 100% private',
    'YAML 1.2 spec: anchors, aliases, merge keys, multi-line strings',
    'All YAML types coerced to JSON equivalents automatically',
    'Copy to clipboard and download as .json file',
    'Free, instant, no signup required',
  ],
  'json-to-yaml': [
    'Browser-based JSON-to-YAML conversion with js-yaml — no upload, 100% private',
    'Clean 2-space indented YAML output, special values auto-quoted',
    'Lossless conversion — every JSON type has a YAML equivalent',
    'Copy to clipboard and download as .yaml file',
    'Free, instant, no signup required',
  ],
  'base64-encode': [
    'Browser-based Base64 encoding with TextEncoder — no upload, 100% private',
    'Full Unicode support: emoji, CJK, Cyrillic, Arabic all encoded correctly',
    'Handles text that btoa() alone cannot process (non-ASCII characters)',
    'Copy to clipboard and download as .txt file',
    'Free, instant, no signup required',
  ],
  'base64-decode': [
    'Browser-based Base64 decoding with TextDecoder — no upload, 100% private',
    'Accepts standard Base64 and Base64URL (JWT, URL parameters)',
    'Auto-normalizes - and _ variants, strips whitespace, handles missing padding',
    'Copy to clipboard and download as .txt file',
    'Free, instant, no signup required',
  ],
}

const DEFAULT_FEATURES = [
  'Browser-based conversion — no upload, 100% private',
  'Copy to clipboard and download the output file',
  'Free, instant, no signup required',
]

export function buildJsonLdApp(slug) {
  const { title, description, url } = buildHelmet(slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title.split(' —')[0],
    'url': url,
    'description': description,
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': FEATURE_LISTS[slug] ?? DEFAULT_FEATURES,
  }
}

export function buildJsonLdHowTo(steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to convert text formats online',
    'step': steps.map((text, i) => ({
      '@type': 'HowToStep',
      'position': i + 1,
      'text': text,
    })),
  }
}

export function buildJsonLdFaq(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }
}
