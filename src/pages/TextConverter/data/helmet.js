import { buildPageUrl, buildOgImageUrl } from '../../../config/site'

export const OG_IMAGE = buildOgImageUrl('text-converter')

const SEO = {
  'html-to-markdown': {
    title: 'HTML to Markdown Converter — Free Browser Tool | Abect',
    description: 'Convert HTML to clean Markdown instantly in your browser. Paste any HTML, get formatted Markdown output. Free, no upload, no signup required.',
    subtitle: 'Paste HTML — get clean Markdown output instantly. Nothing leaves your browser.',
    url: buildPageUrl('html-to-markdown'),
  },
  'markdown-to-html': {
    title: 'Markdown to HTML Converter — Free Browser Tool | Abect',
    description: 'Convert Markdown to valid HTML instantly in your browser. Paste any Markdown, get rendered HTML output. Free, no upload, no signup required.',
    subtitle: 'Paste Markdown — get valid HTML output instantly. Nothing leaves your browser.',
    url: buildPageUrl('markdown-to-html'),
  },
  'html-to-jsx': {
    title: 'HTML to JSX Converter — Free React Online Tool | Abect',
    description: 'Convert HTML to JSX instantly in your browser. Transforms class→className, for→htmlFor, inline styles and event handlers. Free, no upload.',
    subtitle: 'Paste HTML — get React-ready JSX output instantly. Nothing leaves your browser.',
    url: buildPageUrl('html-to-jsx'),
  },
  'jsx-to-html': {
    title: 'JSX to HTML Converter — Free React Online Tool | Abect',
    description: 'Convert JSX to standard HTML instantly in your browser. Transforms className→class, htmlFor→for, JSX styles to inline CSS. Free, no upload.',
    subtitle: 'Paste JSX — get standard HTML output instantly. Nothing leaves your browser.',
    url: buildPageUrl('jsx-to-html'),
  },
  'html-to-tsx': {
    title: 'HTML to TSX Converter — Free React TypeScript Tool | Abect',
    description: 'Convert HTML to TSX in your browser. Transforms class→className, inline styles, generates React.FC<Props> component scaffold. Free, no upload.',
    subtitle: 'Paste HTML — get a ready-to-use TypeScript React component. Nothing leaves your browser.',
    url: buildPageUrl('html-to-tsx'),
  },
  'tsx-to-html': {
    title: 'TSX to HTML Converter — Free React TypeScript Tool | Abect',
    description: 'Convert TSX to standard HTML in your browser. Strips TypeScript interfaces and type aliases, extracts JSX from component body. Free, no upload.',
    subtitle: 'Paste TSX — get standard HTML output instantly. Nothing leaves your browser.',
    url: buildPageUrl('tsx-to-html'),
  },
  'json-to-csv': {
    title: 'JSON to CSV Converter — Free Online Data Tool | Abect',
    description: 'Convert JSON arrays to CSV instantly in your browser. Choose delimiter: comma, semicolon or tab. Free, no upload, no signup required.',
    subtitle: 'Paste a JSON array — get CSV output instantly. Choose your delimiter below.',
    url: buildPageUrl('json-to-csv'),
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter — Free Online Data Tool | Abect',
    description: 'Convert CSV to JSON array instantly in your browser. Supports comma, semicolon and tab delimiters. Free, no upload, no signup required.',
    subtitle: 'Paste CSV data — get a JSON array instantly. Choose your delimiter below.',
    url: buildPageUrl('csv-to-json'),
  },
  'xml-to-json': {
    title: 'XML to JSON Converter — Free Online Data Tool | Abect',
    description: 'Convert XML to JSON instantly in your browser. Preserves attributes and nested elements. Free, no upload, no signup required.',
    subtitle: 'Paste XML — get formatted JSON output instantly. Nothing leaves your browser.',
    url: buildPageUrl('xml-to-json'),
  },
  'json-to-xml': {
    title: 'JSON to XML Converter — Free Online Data Tool | Abect',
    description: 'Convert JSON to XML instantly in your browser. Generates a valid XML document from any JSON object. Free, no upload, no signup required.',
    subtitle: 'Paste JSON — get valid XML output instantly. Nothing leaves your browser.',
    url: buildPageUrl('json-to-xml'),
  },
  'yaml-to-json': {
    title: 'YAML to JSON Converter — Free Online Data Tool | Abect',
    description: 'Convert YAML to JSON instantly in your browser. Supports all YAML types — objects, arrays, anchors. Free, no upload, no signup required.',
    subtitle: 'Paste YAML — get formatted JSON output instantly. Nothing leaves your browser.',
    url: buildPageUrl('yaml-to-json'),
  },
  'json-to-yaml': {
    title: 'JSON to YAML Converter — Free Online Data Tool | Abect',
    description: 'Convert JSON to YAML instantly in your browser. Produces clean, readable YAML output. Free, no upload, no signup required.',
    subtitle: 'Paste JSON — get clean YAML output instantly. Nothing leaves your browser.',
    url: buildPageUrl('json-to-yaml'),
  },
  'base64-encode': {
    title: 'Base64 Encoder — Encode Text to Base64 Online | Abect',
    description: 'Encode any text to Base64 instantly in your browser. Supports full Unicode via TextEncoder. Free, no upload, no signup required.',
    subtitle: 'Paste text — get Base64 encoded output instantly. Nothing leaves your browser.',
    url: buildPageUrl('base64-encode'),
  },
  'base64-decode': {
    title: 'Base64 Decoder — Decode Base64 to Text Online | Abect',
    description: 'Decode Base64 to plain text instantly in your browser. Supports Unicode output via TextDecoder. Free, no upload, no signup required.',
    subtitle: 'Paste Base64 — get decoded text output instantly. Nothing leaves your browser.',
    url: buildPageUrl('base64-decode'),
  },
}

export function buildHelmet(slug) {
  return SEO[slug] ?? SEO['html-to-markdown']
}
