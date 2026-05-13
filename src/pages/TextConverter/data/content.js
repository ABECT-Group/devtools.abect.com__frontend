import { htmlToMarkdown } from '../utils/htmlToMarkdown'
import { markdownToHtml } from '../utils/markdownToHtml'
import { htmlToJsx }      from '../utils/htmlToJsx'
import { jsxToHtml }      from '../utils/jsxToHtml'
import { jsonToCsv }      from '../utils/jsonToCsv'
import { csvToJson }      from '../utils/csvToJson'
import { xmlToJson }      from '../utils/xmlToJson'
import { jsonToXml }      from '../utils/jsonToXml'
import { yamlToJson }     from '../utils/yamlToJson'
import { jsonToYaml }     from '../utils/jsonToYaml'
import { base64Encode }   from '../utils/base64Encode'
import { base64Decode }   from '../utils/base64Decode'

// ─── Segmented option groups ──────────────────────────────────────────────────

const MARKDOWN_OPTIONS = [
  { value: 'html-to-markdown', label: 'HTML → Markdown' },
  { value: 'markdown-to-html', label: 'Markdown → HTML' },
]

const JSX_OPTIONS = [
  { value: 'html-to-jsx', label: 'HTML → JSX' },
  { value: 'jsx-to-html', label: 'JSX → HTML' },
]

const JSON_CSV_OPTIONS = [
  { value: 'json-to-csv', label: 'JSON → CSV' },
  { value: 'csv-to-json', label: 'CSV → JSON' },
]

const XML_JSON_OPTIONS = [
  { value: 'xml-to-json', label: 'XML → JSON' },
  { value: 'json-to-xml', label: 'JSON → XML' },
]

const YAML_JSON_OPTIONS = [
  { value: 'yaml-to-json', label: 'YAML → JSON' },
  { value: 'json-to-yaml', label: 'JSON → YAML' },
]

const BASE64_OPTIONS = [
  { value: 'base64-encode', label: 'Encode' },
  { value: 'base64-decode', label: 'Decode' },
]

// ─── Converters config ────────────────────────────────────────────────────────

export const CONVERTERS = {
  'html-to-markdown': {
    inputLabel: 'HTML',
    outputLabel: 'Markdown',
    outputExt: 'md',
    placeholder: '<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> and <em>italic</em> example.</p>\n<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>',
    convertFn: (input) => htmlToMarkdown(input),
    hasDelimiter: false,
    segmentedOptions: MARKDOWN_OPTIONS,
  },
  'markdown-to-html': {
    inputLabel: 'Markdown',
    outputLabel: 'HTML',
    outputExt: 'html',
    placeholder: '# Hello World\n\nThis is a **bold** and *italic* example.\n\n- Item one\n- Item two',
    convertFn: (input) => markdownToHtml(input),
    hasDelimiter: false,
    segmentedOptions: MARKDOWN_OPTIONS,
  },

  'html-to-jsx': {
    inputLabel: 'HTML',
    outputLabel: 'JSX',
    outputExt: 'jsx',
    placeholder: '<div class="container">\n  <label for="email">Email</label>\n  <input type="email" id="email" readonly tabindex="1">\n  <p style="color: red; font-size: 14px;">Error message</p>\n</div>',
    convertFn: (input) => htmlToJsx(input),
    hasDelimiter: false,
    segmentedOptions: JSX_OPTIONS,
  },
  'jsx-to-html': {
    inputLabel: 'JSX',
    outputLabel: 'HTML',
    outputExt: 'html',
    placeholder: '<div className="container">\n  <label htmlFor="email">Email</label>\n  <input type="email" id="email" readOnly tabIndex={1} />\n  <p style={{ color: \'red\', fontSize: \'14px\' }}>Error message</p>\n</div>',
    convertFn: (input) => jsxToHtml(input),
    hasDelimiter: false,
    segmentedOptions: JSX_OPTIONS,
  },

  'json-to-csv': {
    inputLabel: 'JSON',
    outputLabel: 'CSV',
    outputExt: 'csv',
    placeholder: '[\n  { "name": "Alice", "age": 30, "city": "Kyiv" },\n  { "name": "Bob",   "age": 25, "city": "Lviv" }\n]',
    convertFn: (input, delimiter) => jsonToCsv(input, delimiter),
    hasDelimiter: true,
    segmentedOptions: JSON_CSV_OPTIONS,
  },
  'csv-to-json': {
    inputLabel: 'CSV',
    outputLabel: 'JSON',
    outputExt: 'json',
    placeholder: 'name,age,city\nAlice,30,Kyiv\nBob,25,Lviv',
    convertFn: (input, delimiter) => csvToJson(input, delimiter),
    hasDelimiter: true,
    segmentedOptions: JSON_CSV_OPTIONS,
  },

  'xml-to-json': {
    inputLabel: 'XML',
    outputLabel: 'JSON',
    outputExt: 'json',
    placeholder: '<?xml version="1.0"?>\n<users>\n  <user id="1">\n    <name>Alice</name>\n    <city>Kyiv</city>\n  </user>\n  <user id="2">\n    <name>Bob</name>\n    <city>Lviv</city>\n  </user>\n</users>',
    convertFn: (input) => xmlToJson(input),
    hasDelimiter: false,
    segmentedOptions: XML_JSON_OPTIONS,
  },
  'json-to-xml': {
    inputLabel: 'JSON',
    outputLabel: 'XML',
    outputExt: 'xml',
    placeholder: '{\n  "users": {\n    "user": [\n      { "@attributes": { "id": "1" }, "name": "Alice", "city": "Kyiv" },\n      { "@attributes": { "id": "2" }, "name": "Bob",   "city": "Lviv" }\n    ]\n  }\n}',
    convertFn: (input) => jsonToXml(input),
    hasDelimiter: false,
    segmentedOptions: XML_JSON_OPTIONS,
  },

  'yaml-to-json': {
    inputLabel: 'YAML',
    outputLabel: 'JSON',
    outputExt: 'json',
    placeholder: 'name: Alice\nage: 30\naddress:\n  city: Kyiv\n  zip: "01001"\nhobbies:\n  - reading\n  - coding',
    convertFn: (input) => yamlToJson(input),
    hasDelimiter: false,
    segmentedOptions: YAML_JSON_OPTIONS,
  },
  'json-to-yaml': {
    inputLabel: 'JSON',
    outputLabel: 'YAML',
    outputExt: 'yaml',
    placeholder: '{\n  "name": "Alice",\n  "age": 30,\n  "address": {\n    "city": "Kyiv",\n    "zip": "01001"\n  },\n  "hobbies": ["reading", "coding"]\n}',
    convertFn: (input) => jsonToYaml(input),
    hasDelimiter: false,
    segmentedOptions: YAML_JSON_OPTIONS,
  },

  'base64-encode': {
    inputLabel: 'Plain text',
    outputLabel: 'Base64',
    outputExt: 'txt',
    placeholder: 'Hello, World!\nПривіт, світ! 🌍',
    convertFn: (input) => base64Encode(input),
    hasDelimiter: false,
    segmentedOptions: BASE64_OPTIONS,
  },
  'base64-decode': {
    inputLabel: 'Base64',
    outputLabel: 'Plain text',
    outputExt: 'txt',
    placeholder: 'SGVsbG8sIFdvcmxkIQ==',
    convertFn: (input) => base64Decode(input),
    hasDelimiter: false,
    segmentedOptions: BASE64_OPTIONS,
  },
}

// ─── SEO content ──────────────────────────────────────────────────────────────

const HTML_TO_MARKDOWN = {
  howToTitle: 'How to convert HTML to Markdown',
  howToSteps: [
    'Paste any HTML fragment — a blog post, a div block, or a full document body — into the input field on the left.',
    'Click "Convert" — the clean Markdown output appears instantly in the right panel.',
    'Switch to "Markdown → HTML" using the toggle above the fields if you need the reverse direction.',
    'Click "Copy" to copy the output to your clipboard, or "Download .md" to save the file locally.',
    'Paste the Markdown directly into your static site generator, documentation tool, or GitHub README.',
  ],
  sections: [
    {
      heading: 'How the HTML to Markdown converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter runs entirely in your browser using Turndown, a JavaScript library that traverses the parsed HTML DOM tree and maps each element to its Markdown equivalent. When you click Convert, the input string is parsed into a document fragment, then each node — headings, paragraphs, lists, code blocks, links, images — is walked recursively and replaced with the corresponding Markdown syntax. The result is written directly to the output field without any network request. **Your content never leaves your machine.**',
        },
        {
          type: 'p',
          text: 'Turndown follows a ruleset system: each HTML element has a filter that matches it and a replacement function that produces Markdown. For elements outside the supported set — div, span, custom attributes, inline styles — the default rule strips the tag and keeps only the text content. This produces clean, portable Markdown without residual HTML noise.',
        },
        {
          type: 'code',
          label: 'How Turndown converts HTML to Markdown',
          code: `// Turndown runs this logic in your browser — no server involved:
import TurndownService from 'turndown'

const td = new TurndownService({
  headingStyle: 'atx',       // # H1, ## H2  (not underline style)
  bulletListMarker: '-',     // - item        (not * or +)
  codeBlockStyle: 'fenced',  // \`\`\`code\`\`\`  (not indented)
})

const html = '<h1>Hello</h1><p>A <strong>bold</strong> word.</p>'
const markdown = td.turndown(html)
// Output:
// # Hello
//
// A **bold** word.`,
        },
      ],
    },
    {
      heading: 'Who uses HTML to Markdown conversion',
      blocks: [
        {
          type: 'p',
          text: 'Markdown is the native input format for static site generators (Hugo, Jekyll, Astro, Eleventy), documentation platforms (Docusaurus, MkDocs, GitBook), and developer collaboration tools (GitHub, GitLab, Notion). If your content currently lives as HTML — in a CMS, a legacy site, an email template, or a scraped web page — converting it to Markdown is the fastest route to reuse.',
        },
        {
          type: 'ul',
          items: [
            '**Static site migration** — converting WordPress or Drupal post bodies to Markdown for Hugo, Astro, or Jekyll.',
            '**Documentation rebuild** — transforming Confluence or legacy HTML docs into MkDocs or Docusaurus source files.',
            '**README and wiki creation** — cleaning up copied web content into a readable GitHub README.',
            '**Email to documentation** — converting HTML email templates into plain, editable Markdown records.',
            '**CMS export cleanup** — post-processing HTML exports from headless CMS platforms into portable Markdown.',
            '**Developer tooling** — preprocessing HTML scraped from web pages before feeding it to Markdown-first editors or LLMs.',
          ],
        },
      ],
    },
    {
      heading: 'HTML elements and their Markdown output',
      blocks: [
        {
          type: 'p',
          text: 'Markdown covers the most common block and inline elements. The table below shows exactly what the converter produces for each HTML tag. Elements not in this set — div, span, section, article, aside, data attributes, inline styles — are stripped to their text content only.',
        },
        {
          type: 'table',
          headers: ['HTML tag', 'Markdown output', 'Notes'],
          rows: [
            ['<h1>–<h6>', '# through ######', 'ATX-style headings'],
            ['<p>', 'Blank-line-separated blocks', 'Standard paragraph separation'],
            ['<strong>, <b>', '**text**', 'Bold emphasis'],
            ['<em>, <i>', '*text*', 'Italic emphasis'],
            ['<a href="url">text</a>', '[text](url)', 'Inline link; href preserved'],
            ['<img src="…" alt="…">', '![alt](src)', 'Alt text and src preserved'],
            ['<ul><li>', '- item', 'Unordered list'],
            ['<ol><li>', '1. item', 'Ordered list; numbers preserved'],
            ['<code>', '`code`', 'Inline code'],
            ['<pre><code>', '```\\ncode\\n```', 'Fenced code block'],
            ['<blockquote>', '> text', 'Block quote'],
            ['<hr>', '---', 'Horizontal rule'],
            ['<del>, <s>', '~~text~~', 'Strikethrough (GFM)'],
            ['<table>', 'Pipe table', 'GitHub Flavored Markdown format'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert to Markdown — and when not to',
      blocks: [
        {
          type: 'h3',
          text: 'Convert to Markdown when:',
        },
        {
          type: 'ul',
          items: [
            '**Target platform is Markdown-native** — static site generators, GitHub READMEs, Notion, Obsidian, Bear, Typora.',
            '**Version control matters** — Markdown diffs cleanly in git; HTML tags create visual noise in pull request reviews.',
            '**Non-developer editors** — writers find Markdown syntax easier to read and write than raw HTML tags.',
            '**Content portability** — Markdown is a long-lived plain-text format with no vendor lock-in.',
            '**Documentation pipelines** — tools like Docusaurus, MkDocs, and VitePress use Markdown as their primary source format.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep HTML when:',
        },
        {
          type: 'ul',
          items: [
            '**Precise layout is required** — multi-column grids, absolute positioning, complex CSS class structures.',
            '**Interactive elements are embedded** — forms, custom widgets, iframes, JavaScript components inside the content.',
            '**The target renders HTML directly** — email clients, legacy CMS systems, platforms that do not process Markdown.',
            '**Complex nested tables** — Markdown tables have no merged cells, rowspan, or colspan support.',
            '**Custom attributes matter** — data-*, aria-*, and class values are stripped during conversion.',
          ],
        },
      ],
    },
    {
      heading: 'Conversion edge cases and what to expect',
      blocks: [
        {
          type: 'p',
          text: 'HTML is a superset of what Markdown can express, so some information is always lost in conversion. Understanding these edge cases helps you decide when post-processing is needed and prevents surprises in the output.',
        },
        {
          type: 'ul',
          items: [
            '**Inline styles are stripped** — <p style="color:red"> becomes a plain paragraph. CSS formatting has no Markdown equivalent.',
            '**Class and id attributes are dropped** — <div class="highlight"> loses its class. If you rely on these for client-side JavaScript, conversion is not appropriate.',
            '**Nested block elements** — a <div> wrapping a <p> is unwrapped; the paragraph text is preserved, the div discarded.',
            '**Image dimensions** — <img width="800"> loses its size attributes. Only src and alt are preserved in the output.',
            '**Script and style tags** — completely stripped including all their content. Run conversion on content HTML only, not full pages.',
          ],
        },
        {
          type: 'code',
          label: 'Round-trip example: HTML → Markdown',
          code: `// Input HTML (with class, style, and wrapper div):
<div class="post" style="padding: 20px">
  <h2 id="title">Developer Guide</h2>
  <p>A <strong>bold</strong> and <em>italic</em> sentence.</p>
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
</div>

// After HTML → Markdown conversion:
// ## Developer Guide
//
// A **bold** and *italic* sentence.
//
// - First item
// - Second item
//
// Note: class, id, inline style, and <div> wrapper are removed.
// Text content and semantic structure are fully preserved.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What HTML elements does the converter support?',
      answer: 'Headings (h1–h6), paragraphs, bold and italic text (strong, b, em, i), links (a), images (img), ordered and unordered lists, inline code and code blocks (code, pre), blockquotes, horizontal rules, strikethrough (del, s), and tables. Elements outside this set — div, span, section, article, custom elements — are stripped to their inner text content.',
    },
    {
      question: 'Will inline styles be preserved in the Markdown output?',
      answer: 'No. Markdown has no mechanism for inline CSS, so all style attributes are dropped during conversion. If you need colour, font size, or other visual formatting preserved, Markdown is not the right output format — keep the HTML instead or post-process the result by hand.',
    },
    {
      question: 'How does the converter handle images?',
      answer: 'Each <img> tag is converted to the Markdown image syntax: ![alt text](src). The src and alt attributes are preserved exactly. Width, height, class, style, loading, and any other attributes are discarded. If the alt attribute is empty or absent, the output is ![](src).',
    },
    {
      question: 'What happens to links with relative URLs?',
      answer: 'Relative URLs are preserved as-is. A link like <a href="/about">About</a> becomes [About](/about) — the path is not resolved to an absolute URL. If you are moving content to a different domain, you will need to update relative links after conversion.',
    },
    {
      question: 'Does the converter support nested lists?',
      answer: 'Yes. Nested <ul> and <ol> elements are converted to indented Markdown lists. Each level of nesting is indented by two spaces, which is the standard for GitHub Flavored Markdown and most static site generators.',
    },
    {
      question: 'Can I convert a full HTML page including the <head> section?',
      answer: 'Technically yes, but the result will be messy. The <head>, <style>, and <script> tags are stripped — only their text content (if any) passes through. For best results, copy only the content portion of the page — the main body, article, or post — not the full HTML document.',
    },
    {
      question: 'How are HTML tables converted?',
      answer: 'Tables are converted to GitHub Flavored Markdown (GFM) pipe table syntax. A two-column table with a header row becomes: | Header 1 | Header 2 | / |---|---| / | Cell 1 | Cell 2 |. Merged cells (colspan, rowspan) are not supported in GFM and will be flattened — the cell content is preserved but the merge is lost.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion happens inside your browser using a JavaScript library. No data is transmitted over the network. There are no file size limits, no rate limits, and no privacy concerns — the content of your HTML is never visible to any server.',
    },
    {
      question: 'What is GitHub Flavored Markdown and does this converter produce it?',
      answer: 'GitHub Flavored Markdown (GFM) is a superset of standard Markdown that adds tables, fenced code blocks, and strikethrough. This converter outputs GFM-compatible Markdown — fenced code blocks, pipe tables, and ~~strikethrough~~ are all supported, which is also the format used by Hugo, Gatsby, Docusaurus, and most modern static site generators.',
    },
    {
      question: 'Why does some HTML not convert cleanly to Markdown?',
      answer: 'Markdown is intentionally limited in scope — it was designed for readable plain text, not full document layout. HTML elements that have no Markdown counterpart (div, span, section, custom elements, CSS classes) are stripped. If your HTML relies heavily on class-based styling or complex layout structure, the Markdown output will be plainer than the original.',
    },
    {
      question: 'Can I convert HTML from a webpage by pasting the source?',
      answer: 'Yes. Paste the raw HTML markup (not the rendered text) into the input field. If you want to convert the visible content of a page, use "View Page Source" in the browser, copy the relevant portion (typically the <main> or <article> content), then paste it here.',
    },
    {
      question: 'Does the downloaded file use the correct encoding?',
      answer: 'Yes. The downloaded .md file is encoded as UTF-8, which is the standard encoding for Markdown files. All Unicode characters — accented letters, CJK characters, emoji — are preserved correctly in the output.',
    },
  ],
  relatedTools: [
    { to: '/markdown-to-html', name: 'Markdown to HTML', desc: 'Convert Markdown back to valid HTML — the reverse direction' },
    { to: '/html-to-jsx',      name: 'HTML to JSX',      desc: 'Convert HTML to React JSX — transforms class, for, and inline styles' },
    { to: '/json-to-csv',      name: 'JSON to CSV',      desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/xml-to-json',      name: 'XML to JSON',      desc: 'Parse XML documents into formatted JSON — browser-based' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const MARKDOWN_TO_HTML = {
  howToTitle: 'How to convert Markdown to HTML',
  howToSteps: [
    'Paste your Markdown text into the input field — a .md file, a GitHub README fragment, or any Markdown snippet.',
    'Click "Convert" — the HTML output appears instantly in the right panel.',
    'Switch to "HTML → Markdown" using the toggle above the fields if you need the reverse direction.',
    'Click "Copy" to copy the HTML to clipboard, or "Download .html" to save the file locally.',
    'Embed the output HTML in your web page, CMS template, or pass it to a rendering pipeline.',
  ],
  sections: [
    {
      heading: 'How the Markdown to HTML converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter runs entirely in your browser using marked.js, a fast, spec-compliant Markdown parser. When you click Convert, the input Markdown string is tokenised by the lexer, then each token — heading, paragraph, code fence, list, table, link — is rendered to its HTML equivalent by the renderer. The output is valid, semantic HTML that can be embedded directly in any web page. **No data leaves your browser** — the conversion is purely local.',
        },
        {
          type: 'p',
          text: 'marked.js implements the CommonMark specification with GitHub Flavored Markdown (GFM) extensions enabled by default. This means fenced code blocks, pipe tables, and ~~strikethrough~~ are all supported in addition to standard Markdown syntax.',
        },
        {
          type: 'code',
          label: 'How marked.js converts Markdown to HTML',
          code: `// marked.js runs this logic in your browser — no server involved:
import { marked } from 'marked'

marked.setOptions({
  gfm: true,     // GitHub Flavored Markdown: tables, ~~strikethrough~~
  breaks: false, // false = standard paragraph separation
})

const md = '# Hello\\n\\nA **bold** and *italic* sentence.'
const html = marked.parse(md)
// Output:
// <h1>Hello</h1>
// <p>A <strong>bold</strong> and <em>italic</em> sentence.</p>`,
        },
      ],
    },
    {
      heading: 'Markdown syntax and the HTML it generates',
      blocks: [
        {
          type: 'p',
          text: 'Each Markdown syntax element maps to a specific HTML element. The table below shows the full set of supported syntax and the corresponding HTML output. Knowing this mapping helps you predict the result and write Markdown that produces the exact HTML structure you need.',
        },
        {
          type: 'table',
          headers: ['Markdown syntax', 'HTML output', 'Notes'],
          rows: [
            ['# Heading', '<h1>Heading</h1>', 'h1–h6 for # through ######'],
            ['**bold**', '<strong>bold</strong>', 'Double asterisk or double underscore'],
            ['*italic*', '<em>italic</em>', 'Single asterisk or single underscore'],
            ['[text](url)', '<a href="url">text</a>', 'Inline link'],
            ['![alt](src)', '<img src="src" alt="alt">', 'Inline image'],
            ['- item', '<ul><li>item</li></ul>', 'Unordered list (also + and *)'],
            ['1. item', '<ol><li>item</li></ol>', 'Ordered list'],
            ['`code`', '<code>code</code>', 'Inline code'],
            ['```\\ncode\\n```', '<pre><code>code</code></pre>', 'Fenced code block'],
            ['> quote', '<blockquote>quote</blockquote>', 'Block quote'],
            ['---', '<hr>', 'Horizontal rule (also *** and ___)'],
            ['~~text~~', '<del>text</del>', 'Strikethrough (GFM)'],
            ['| a | b |\\n|---|---|', '<table>…</table>', 'Pipe table (GFM)'],
          ],
        },
      ],
    },
    {
      heading: 'When to use Markdown as your content source',
      blocks: [
        {
          type: 'h3',
          text: 'Markdown as source works well when:',
        },
        {
          type: 'ul',
          items: [
            '**Writers edit the content** — Markdown is faster to type and easier to read than raw HTML for non-developers.',
            '**Git version control is used** — Markdown diffs cleanly; HTML tag noise obscures actual content changes in pull requests.',
            '**Static site generators are involved** — Hugo, Astro, Jekyll, Eleventy, and Gatsby all accept Markdown as first-class input.',
            '**Documentation platforms** — Docusaurus, MkDocs, GitBook, and VitePress are all Markdown-native.',
            '**Multi-platform publishing** — the same Markdown source can render to HTML, PDF, and EPUB without editing.',
          ],
        },
        {
          type: 'h3',
          text: 'Write HTML directly when:',
        },
        {
          type: 'ul',
          items: [
            '**Layout control is needed** — grids, absolute positioning, responsive breakpoints have no Markdown equivalent.',
            '**Custom attributes are required** — data-*, aria-*, CSS classes, and id values must be in raw HTML.',
            '**Interactive elements are embedded** — forms, iframes, custom web components, JavaScript event handlers.',
            '**Email templates** — email clients render HTML; most do not support Markdown or its converted output reliably.',
            '**Complex tables** — merged cells (colspan, rowspan) are not possible in Markdown pipe table syntax.',
          ],
        },
      ],
    },
    {
      heading: 'GitHub Flavored Markdown extensions supported',
      blocks: [
        {
          type: 'p',
          text: 'Beyond standard CommonMark, this converter enables the GitHub Flavored Markdown (GFM) extensions used by GitHub, GitLab, and most modern static site generators. These extensions add commonly needed features that standard Markdown omits:',
        },
        {
          type: 'ul',
          items: [
            '**Fenced code blocks** — triple backtick (```) delimiters with an optional language identifier. The language is preserved as a CSS class on the <code> element for syntax highlighting libraries.',
            '**Pipe tables** — | col1 | col2 | syntax produces a full <table> with <thead> and <tbody> elements.',
            '**Strikethrough** — ~~text~~ produces <del>text</del>.',
            '**Automatic URL linking** — bare https:// URLs in text are converted to clickable <a> tags.',
            '**Hard line breaks** — two trailing spaces followed by a newline produce a <br> tag.',
          ],
        },
        {
          type: 'code',
          label: 'GFM pipe table syntax and its HTML output',
          code: `// Markdown input:
| Name   | Language | Stars |
|--------|----------|-------|
| React  | JS       | 230k  |
| Vue    | JS       | 210k  |
| Svelte | JS       | 80k   |

// HTML output:
<table>
  <thead>
    <tr><th>Name</th><th>Language</th><th>Stars</th></tr>
  </thead>
  <tbody>
    <tr><td>React</td><td>JS</td><td>230k</td></tr>
    <tr><td>Vue</td><td>JS</td><td>210k</td></tr>
    <tr><td>Svelte</td><td>JS</td><td>80k</td></tr>
  </tbody>
</table>`,
        },
      ],
    },
    {
      heading: 'Security: raw HTML output and XSS',
      blocks: [
        {
          type: 'p',
          text: 'The converter outputs raw HTML without sanitization. This is intentional — sanitizing would silently strip valid HTML that you might deliberately embed inside Markdown using pass-through syntax. If you plan to insert the output into a page that displays content from untrusted users, **always sanitize the HTML with a library like DOMPurify** before inserting it into the DOM. For content you authored yourself, the raw output is safe to use directly.',
        },
        {
          type: 'code',
          label: 'How to sanitize the output before inserting into the DOM',
          code: `// If using the converted HTML with user-supplied content:
import DOMPurify from 'dompurify'

const rawHtml  = marked.parse(userMarkdown)
const safeHtml = DOMPurify.sanitize(rawHtml)

document.getElementById('content').innerHTML = safeHtml

// DOMPurify removes <script>, on* event handlers, and
// dangerous href/src values while keeping all valid markup.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does the converter support GitHub Flavored Markdown (GFM)?',
      answer: 'Yes. GFM extensions are enabled by default: fenced code blocks, pipe tables, ~~strikethrough~~, and automatic URL hyperlinking. This matches the rendering used by GitHub, GitLab, Bitbucket, and most modern static site generators.',
    },
    {
      question: 'How are fenced code blocks converted to HTML?',
      answer: 'Fenced code blocks (``` language) are converted to <pre><code class="language-xxx">code</code></pre>. The language identifier is preserved as a class attribute for use with syntax highlighting libraries like Prism.js or highlight.js. Indented code blocks (4-space indent) produce the same <pre><code> output without a language class.',
    },
    {
      question: 'Does the output include a full HTML document or just a fragment?',
      answer: 'Fragment only — just the HTML elements for the content, without a <html>, <head>, or <body> wrapper. This is intentional: in most use cases you embed the converted HTML inside an existing page template. If you need a full document, wrap the output in your own boilerplate.',
    },
    {
      question: 'Can I use raw HTML tags inside my Markdown?',
      answer: 'Yes — marked.js passes raw HTML through to the output unchanged. You can embed <div class="alert">, <iframe>, or any HTML tag directly in your Markdown source. The HTML will appear verbatim in the output. This is standard CommonMark behaviour supported by most Markdown parsers.',
    },
    {
      question: 'How are images handled in the conversion?',
      answer: '![alt text](src url) is converted to <img src="src url" alt="alt text">. The output does not add width, height, loading="lazy", or any other attributes. If you need responsive images or lazy loading, add those attributes manually after conversion.',
    },
    {
      question: 'Is the HTML output safe to insert directly into a web page?',
      answer: 'If you authored the Markdown yourself, yes. If the Markdown comes from user input or third-party sources, sanitize the HTML output first using a library like DOMPurify. Markdown allows raw HTML pass-through, which means a crafted Markdown file can produce XSS-vulnerable output.',
    },
    {
      question: 'What happens to front matter (YAML or TOML blocks at the top)?',
      answer: 'Front matter is not stripped automatically. The --- delimiters may be interpreted as an <hr> tag or a heading underline depending on their context. If your Markdown file contains front matter, remove it before converting — otherwise the meta block will appear as content in the HTML output.',
    },
    {
      question: 'What happens to empty lines between paragraphs?',
      answer: 'A single blank line between paragraphs creates a <p> tag boundary — the standard Markdown paragraph rule. Multiple blank lines are treated as a single blank line; they do not produce extra <p> tags or <br> elements. Inside code blocks, empty lines are preserved exactly.',
    },
    {
      question: 'What encoding is used for the downloaded HTML file?',
      answer: 'The downloaded file is encoded as UTF-8. All Unicode characters — accented letters, CJK characters, mathematical symbols, emoji — are preserved correctly.',
    },
    {
      question: 'Can I convert a GitHub README.md to HTML with this tool?',
      answer: 'Yes. Paste the README content and click Convert. The output will closely match what GitHub renders, since this converter uses the same GFM extensions (tables, code fences, strikethrough). Styling will differ — GitHub applies its own CSS on top of the HTML.',
    },
    {
      question: 'Is there a file size limit for the conversion?',
      answer: 'No server-side limit exists because the conversion runs entirely in your browser. Practical limits are set by your browser\'s memory and JavaScript engine. Files up to several megabytes convert without issue on modern devices.',
    },
    {
      question: 'Can I round-trip: Markdown → HTML → Markdown?',
      answer: 'Yes — use this tool first, then use the HTML to Markdown converter. However, the round-trip is not lossless. Heading underline style may change, list marker characters may change, and any raw HTML you embedded in Markdown will be converted to its Markdown equivalent (if one exists) or stripped.',
    },
  ],
  relatedTools: [
    { to: '/html-to-markdown', name: 'HTML to Markdown', desc: 'Convert HTML back to clean Markdown — the reverse direction' },
    { to: '/html-to-jsx',      name: 'HTML to JSX',      desc: 'Convert HTML to React JSX — transforms class, for, and inline styles' },
    { to: '/json-to-csv',      name: 'JSON to CSV',      desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/meta-tags-generator', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags with live preview — OG, Twitter Card' },
  ],
}

// ─── html-to-jsx ─────────────────────────────────────────────────────────────

const HTML_TO_JSX = {
  howToTitle: 'How to convert HTML to JSX',
  howToSteps: [
    'Paste your HTML markup into the input field — a component template, a design prototype export, or a snippet from an existing page.',
    'Click "Convert" — the JSX output appears instantly with all attributes renamed: class→className, for→htmlFor, tabindex→tabIndex.',
    'Switch to "JSX → HTML" using the toggle above if you need the reverse direction.',
    'Click "Copy" to copy the JSX and paste it directly into your React component\'s return block.',
    'Review the output — complex inline styles or non-standard attributes may need a quick manual adjustment.',
  ],
  sections: [
    {
      heading: 'How the HTML to JSX converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter parses the HTML string and applies a series of rule-based transformations to produce valid JSX. It handles attribute renaming (class → className, for → htmlFor), camelCase event names (onclick → onClick), self-closing void elements (<br />, <img />, <input />), inline style string-to-object conversion, and boolean attribute normalization. The conversion runs entirely in your browser — **no data is sent to any server.**',
        },
        {
          type: 'p',
          text: 'JSX is not HTML — it is a JavaScript syntax extension that React uses to describe UI components. The differences are intentional: JSX compiles to React.createElement() calls, and JavaScript has reserved words (class, for) and naming conventions (camelCase) that differ from HTML attribute names. The converter maps every systematic difference automatically, but complex template logic and framework-specific syntax may still require a manual review pass.',
        },
        {
          type: 'code',
          label: 'Key transformations applied during HTML → JSX conversion',
          code: `// Input HTML:
<div class="card" onclick="handleClick()">
  <label for="email">Email</label>
  <input type="email" id="email" readonly tabindex="1"
         style="border: 1px solid red; font-size: 14px">
  <br>
  <img src="avatar.png" alt="User">
</div>

// Output JSX:
<div className="card" onClick={handleClick}>
  <label htmlFor="email">Email</label>
  <input type="email" id="email" readOnly tabIndex={1}
         style={{ border: '1px solid red', fontSize: '14px' }} />
  <br />
  <img src="avatar.png" alt="User" />
</div>`,
        },
      ],
    },
    {
      heading: 'Why HTML attributes change names in JSX',
      blocks: [
        {
          type: 'p',
          text: 'JSX looks like HTML but uses JavaScript attribute names, not HTML attribute names. Because JSX compiles directly to JavaScript function calls, it must avoid JavaScript reserved words and follow JavaScript naming conventions. Understanding why the names change helps you remember the rules without a lookup table.',
        },
        {
          type: 'ul',
          items: [
            '**class → className** — class is a reserved word in JavaScript used for ES6 class declarations. React uses className to avoid the conflict while applying CSS classes in exactly the same way.',
            '**for → htmlFor** — for is also reserved in JavaScript (for loops, for...of statements). The label element\'s for attribute becomes htmlFor in JSX.',
            '**onclick → onClick** — HTML event attributes are lowercase; JSX uses camelCase following JavaScript naming conventions. All on* events become camelCase: onchange → onChange, onmouseenter → onMouseEnter, onkeydown → onKeyDown.',
            '**readonly → readOnly** — Multi-syllable boolean attributes become camelCase: readonly → readOnly, tabindex → tabIndex, maxlength → maxLength, contenteditable → contentEditable.',
            '**style="color: red" → style={{ color: \'red\' }}** — HTML inline styles are CSS strings; JSX style must be a JavaScript object with camelCased property names. The outer braces denote a JavaScript expression; the inner braces create the object literal.',
            '**<!-- comment --> → {/* comment */}** — HTML comments are not valid inside JSX. They become JavaScript block comments wrapped in JSX expression braces.',
          ],
        },
      ],
    },
    {
      heading: 'HTML to JSX transformation reference',
      blocks: [
        {
          type: 'p',
          text: 'The table below covers the complete set of transformations applied during conversion. Self-closing tags and style conversion are the two areas most likely to produce output that needs a review.',
        },
        {
          type: 'table',
          headers: ['HTML', 'JSX equivalent', 'Reason'],
          rows: [
            ['class="…"',          'className="…"',             'class is a JS reserved word'],
            ['for="…"',            'htmlFor="…"',               'for is a JS reserved word'],
            ['onclick="fn()"',     'onClick={fn}',              'camelCase event; pass function reference'],
            ['onchange="fn()"',    'onChange={fn}',             'all on* events → camelCase'],
            ['tabindex="1"',       'tabIndex={1}',              'camelCase; numeric value as JS expression'],
            ['readonly',           'readOnly',                  'camelCase boolean attribute'],
            ['maxlength="10"',     'maxLength={10}',            'camelCase; numeric value as JS expression'],
            ['style="color:red"',  'style={{ color: \'red\' }}', 'CSS string → JS object'],
            ['font-size: 14px',    'fontSize: \'14px\'',         'kebab-case → camelCase CSS property'],
            ['<br>',               '<br />',                    'void elements must self-close in JSX'],
            ['<img src="…">',      '<img src="…" />',           'void elements must self-close in JSX'],
            ['<!-- text -->',      '{/* text */}',              'HTML comments → JSX expression comments'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert HTML to JSX — and when not to',
      blocks: [
        {
          type: 'h3',
          text: 'Convert HTML to JSX when:',
        },
        {
          type: 'ul',
          items: [
            '**Building React components from design exports** — designers often deliver HTML/CSS files; converting to JSX is the first step to turning them into components.',
            '**Migrating static HTML templates to React** — existing HTML pages or email templates that need to become React-rendered UI.',
            '**Prototyping with AI tools** — AI code generators often output standard HTML; converting to JSX lets you paste results directly into components.',
            '**Incorporating third-party HTML snippets** — UI libraries, widget embeds, and documentation examples are usually in HTML syntax.',
            '**Learning JSX syntax** — converting known HTML is an effective way to understand which attributes and patterns change in JSX.',
          ],
        },
        {
          type: 'h3',
          text: 'Write JSX directly when:',
        },
        {
          type: 'ul',
          items: [
            '**The component has dynamic data** — JSX\'s {expression} syntax for binding props, state, and event handlers cannot come from static HTML conversion.',
            '**You need conditional rendering** — {condition && <Element />} and ternary expressions must be written in JSX directly.',
            '**The structure maps to reusable components** — once converted, replace repeated markup blocks with component references.',
            '**Custom hooks or context are involved** — any React-specific logic must be added by hand after the structural conversion.',
          ],
        },
      ],
    },
    {
      heading: 'Inline styles: from CSS string to React style object',
      blocks: [
        {
          type: 'p',
          text: 'Inline style conversion is the most complex transformation. In HTML, style is a string of CSS declarations. In JSX, style must be a JavaScript object where each CSS property name is camelCased and the value is a string (or number for unitless properties). The converter handles both the camelCasing and the string-to-object restructuring automatically.',
        },
        {
          type: 'code',
          label: 'Inline style conversion: CSS string → React object',
          code: `// HTML inline style (CSS string):
style="color: #333; font-size: 16px; margin-top: 8px; z-index: 10"

// JSX style object (camelCased properties):
style={{ color: '#333', fontSize: '16px', marginTop: '8px', zIndex: 10 }}

// Unitless numeric CSS properties (zIndex, opacity, fontWeight, lineHeight)
// are passed as numbers, not strings — React handles the unit automatically.

// CSS vendor prefixes become PascalCase in JSX:
// -webkit-transform → WebkitTransform
// -moz-animation    → MozAnimation`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Why does class become className in JSX?',
      answer: 'class is a reserved keyword in JavaScript — it is used to declare ES6 classes. Since JSX compiles to JavaScript, using class as an attribute name would cause a syntax conflict. React uses className as the equivalent, which maps to the DOM\'s className property and applies CSS classes to elements in exactly the same way.',
    },
    {
      question: 'Why does for become htmlFor in JSX?',
      answer: 'for is also a reserved keyword in JavaScript (used in for loops and for...of statements). The label element\'s for attribute, which links a label to a form control by id, becomes htmlFor in JSX. The browser behaviour is identical — only the attribute name in the source code changes.',
    },
    {
      question: 'Why are inline styles a JavaScript object in JSX instead of a CSS string?',
      answer: 'In JSX, the style prop expects a JavaScript object because JSX compiles to JavaScript function calls. Using an object lets React apply styles directly to the DOM\'s style property (which is itself an object), avoids CSS string parsing overhead, and enables dynamic style values via JavaScript expressions. CSS property names are camelCased (background-color → backgroundColor) to match the DOM style property names.',
    },
    {
      question: 'What happens to HTML event handlers like onclick="myFunction()"?',
      answer: 'Event handler attributes are renamed to camelCase (onclick → onClick) and the inline string value is converted to a function reference placeholder. Because JSX event handlers expect a JavaScript function reference — not a string — you will need to replace the placeholder with your actual handler function. The converter produces onClick={myFunction}, which you then wire to the correct function in your component.',
    },
    {
      question: 'Does the converter add the React import statement?',
      answer: 'No. The converter outputs only the JSX markup. In React 17+ with the new JSX transform, you no longer need to import React at the top of every file — the transform is handled automatically by the build tool. If you are using an older React setup, add import React from \'react\' manually.',
    },
    {
      question: 'How are void elements like <br>, <hr>, <img>, and <input> handled?',
      answer: 'Void elements must be self-closed in JSX — they cannot have a closing tag. The converter adds the required trailing slash: <br> becomes <br />, <img src="…"> becomes <img src="…" />. This is a JSX requirement; HTML allows omitting the slash but JSX does not.',
    },
    {
      question: 'What happens to HTML comments?',
      answer: 'HTML comments (<!-- text -->) are not valid inside JSX. The converter transforms them into JSX expression comments: {/* text */}. These render as nothing in the browser but are visible in the source code.',
    },
    {
      question: 'Does the converter handle SVG attributes like viewBox and stroke-width?',
      answer: 'SVG attribute names in JSX follow the same camelCase convention as HTML. stroke-width becomes strokeWidth, fill-opacity becomes fillOpacity, and viewBox is kept as-is (it is already camelCase in the SVG spec). The converter applies these transformations to inline SVG markup.',
    },
    {
      question: 'Is the converted JSX ready to paste into a component?',
      answer: 'The structure and attributes are ready, but the logic is not. The converter handles the mechanical transformations — attribute names, style objects, self-closing tags. You still need to: replace string event handlers with real function references, add dynamic data bindings ({variable} syntax), split repeated structures into components, and add key props to list items.',
    },
    {
      question: 'What about data-* and aria-* attributes?',
      answer: 'Custom data attributes (data-id, data-value) and ARIA accessibility attributes (aria-label, aria-expanded) are kept as-is in JSX — they do not need to be renamed. These attributes use the same syntax in both HTML and JSX.',
    },
    {
      question: 'Can I convert a full HTML page to a React component?',
      answer: 'You can convert the body or a section of the page, but a full document including <html>, <head>, and <body> tags is not a valid React component structure. Extract the meaningful content section, convert it to JSX, then wrap it in a React function component: export default function Page() { return ( <div>converted JSX here</div> ) }',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using JavaScript string processing. No data is transmitted over the network — there are no file size limits, no rate limits, and no privacy concerns.',
    },
  ],
  relatedTools: [
    { to: '/jsx-to-html',      name: 'JSX to HTML',      desc: 'Convert React JSX back to standard HTML — the reverse direction' },
    { to: '/html-to-markdown', name: 'HTML to Markdown', desc: 'Convert HTML to clean Markdown for docs and READMEs' },
    { to: '/meta-tags-generator', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags with live preview — OG, Twitter Card' },
    { to: '/json-to-csv',      name: 'JSON to CSV',      desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
  ],
}

// ─── jsx-to-html ──────────────────────────────────────────────────────────────

const JSX_TO_HTML = {
  howToTitle: 'How to convert JSX to HTML',
  howToSteps: [
    'Paste your JSX markup into the input field — a React component\'s return block, a JSX snippet, or output from a React-based generator.',
    'Click "Convert" — the standard HTML output appears instantly with className→class, htmlFor→for, and style objects converted to CSS strings.',
    'Switch to "HTML → JSX" using the toggle above if you need the reverse direction.',
    'Click "Copy" to copy the HTML to clipboard, or "Download .html" to save the file locally.',
    'Use the output in a static HTML page, email template, or any non-React HTML context.',
  ],
  sections: [
    {
      heading: 'How the JSX to HTML converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter applies the reverse of the JSX transformation rules: className is renamed back to class, htmlFor becomes for, camelCase event names are lowercased (onClick → onclick), self-closing JSX tags on void elements are normalized for HTML, and React style objects are serialized back to CSS strings. The conversion runs entirely in your browser — **no data is sent to any server.**',
        },
        {
          type: 'p',
          text: 'Not all JSX is directly convertible to HTML — JSX is a superset that includes JavaScript expressions, component references, and dynamic logic that have no HTML equivalent. The converter handles the structural and attribute-level differences and leaves JavaScript expression placeholders intact so you can see exactly what needs manual replacement.',
        },
        {
          type: 'code',
          label: 'Key transformations applied during JSX → HTML conversion',
          code: `// Input JSX:
<div className="card" onClick={handleClick}>
  <label htmlFor="email">Email</label>
  <input type="email" id="email" readOnly tabIndex={1}
         style={{ border: '1px solid red', fontSize: '14px' }} />
  <br />
  <img src="avatar.png" alt="User" />
</div>

// Output HTML:
<div class="card" onclick="handleClick">
  <label for="email">Email</label>
  <input type="email" id="email" readonly tabindex="1"
         style="border: 1px solid red; font-size: 14px">
  <br>
  <img src="avatar.png" alt="User">
</div>`,
        },
      ],
    },
    {
      heading: 'JSX attributes and their HTML equivalents',
      blocks: [
        {
          type: 'p',
          text: 'Each JSX-specific attribute name maps back to its original HTML counterpart. Custom data attributes (data-*) and ARIA attributes (aria-*) are kept unchanged — they are identical in both JSX and HTML.',
        },
        {
          type: 'table',
          headers: ['JSX attribute', 'HTML equivalent', 'Notes'],
          rows: [
            ['className="…"',          'class="…"',              'Reserved word conflict removed'],
            ['htmlFor="…"',            'for="…"',                'Reserved word conflict removed'],
            ['onClick={fn}',           'onclick="fn"',           'camelCase → lowercase; reference becomes string'],
            ['onChange={fn}',          'onchange="fn"',          'All on* events lowercased'],
            ['tabIndex={1}',           'tabindex="1"',           'camelCase → lowercase; value stringified'],
            ['readOnly',               'readonly',               'camelCase → lowercase boolean'],
            ['maxLength={10}',         'maxlength="10"',         'camelCase → lowercase; value stringified'],
            ['style={{ color: \'red\' }}', 'style="color: red"', 'JS object → CSS string'],
            ['style={{ fontSize: \'14px\' }}', 'style="font-size: 14px"', 'camelCase property → kebab-case'],
            ['<br />',                 '<br>',                   'Self-closing slash removed for void elements'],
            ['<img … />',              '<img …>',                'Self-closing slash removed'],
            ['{/* comment */}',        '<!-- comment -->',       'JSX expression comment → HTML comment'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert JSX to HTML',
      blocks: [
        {
          type: 'h3',
          text: 'Convert JSX to HTML when:',
        },
        {
          type: 'ul',
          items: [
            '**Sharing with non-React developers** — designers or backend engineers who need the HTML structure without a React context.',
            '**Building email templates** — email clients do not support React; JSX components need to be rendered to plain HTML first.',
            '**Generating static HTML output** — extracting the HTML structure from a React component for static site generation preview.',
            '**Documentation examples** — showing HTML usage for a component in docs, README files, or design system documentation.',
            '**Integrating with non-React systems** — WordPress, legacy CMS platforms, or jQuery-based codebases that need standard HTML.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep JSX when:',
        },
        {
          type: 'ul',
          items: [
            '**Dynamic data is bound** — {props.name}, {state.count}, and conditional rendering expressions must stay in JSX.',
            '**React events are needed** — properly typed synthetic events and React\'s controlled component pattern require JSX.',
            '**Component composition is used** — <Button variant="primary"> and other component references are not valid HTML.',
            '**The output will be rendered by React** — if React renders the output anyway, converting to HTML and back is unnecessary.',
          ],
        },
      ],
    },
    {
      heading: 'Style objects: from React object back to CSS string',
      blocks: [
        {
          type: 'p',
          text: 'React style objects use camelCased property names and JavaScript values. Converting back to an HTML style string means reversing both transformations: camelCase property names become kebab-case CSS property names, and JavaScript values are serialized to strings. Unitless numeric values (zIndex: 10) become their string equivalents without units.',
        },
        {
          type: 'code',
          label: 'Style object to CSS string conversion',
          code: `// React JSX style object:
style={{
  backgroundColor: '#fff',
  fontSize: '16px',
  marginTop: '8px',
  zIndex: 100,
  WebkitTransform: 'translateX(10px)',
}}

// Converted HTML inline style:
style="background-color: #fff; font-size: 16px; margin-top: 8px; z-index: 100; -webkit-transform: translateX(10px)"

// Rule: camelCase → kebab-case for all property names.
// PascalCase vendor prefixes (WebkitTransform) → -webkit-transform.`,
        },
      ],
    },
    {
      heading: 'Limitations: what JSX to HTML cannot convert',
      blocks: [
        {
          type: 'p',
          text: 'JSX is a superset of HTML and includes JavaScript-specific constructs that have no HTML equivalent. The converter handles the attribute-level and structural differences, but the following patterns require manual handling after conversion:',
        },
        {
          type: 'ul',
          items: [
            '**JavaScript expressions** — {variable}, {condition ? a : b}, {array.map(...)} are left as-is in the output. They need to be replaced with actual static values.',
            '**Component references** — <Button />, <Header title="…" />, and other React component tags are not valid HTML. Replace them with the rendered HTML output of those components.',
            '**React-specific props** — key, ref, and dangerouslySetInnerHTML are dropped or left as attributes; they have no HTML equivalent.',
            '**Fragments** — <></> and <React.Fragment> have no HTML equivalent. The converter unwraps them, keeping only the children.',
            '**Conditional rendering** — {isLoggedIn && <UserPanel />} expressions must be resolved to either the element or nothing by hand.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is the difference between JSX and HTML?',
      answer: 'JSX (JavaScript XML) is a syntax extension for JavaScript used by React to describe UI structure. It looks like HTML but uses JavaScript naming conventions: camelCase attribute names (className, htmlFor, onClick), JavaScript objects for inline styles, and self-closing tags for all void elements. HTML uses lowercase attribute names (class, for, onclick), CSS strings for styles, and does not require self-closing tags on void elements. JSX compiles to JavaScript function calls; HTML is parsed directly by the browser.',
    },
    {
      question: 'Can I use the converted HTML directly in a browser?',
      answer: 'Yes — the converted HTML is standard HTML5 that any browser renders. However, event handlers (onclick="handleClick") are converted as attribute strings, not as proper JavaScript function bindings. For interactive elements, you will need to wire up the JavaScript handlers after embedding the HTML.',
    },
    {
      question: 'What happens to React-specific props like key and ref?',
      answer: 'key and ref are React-internal props that do not appear as HTML attributes — React processes them before rendering and they never reach the DOM. The converter drops them from the output. dangerouslySetInnerHTML is also dropped; if you need its inner HTML, extract the __html value and add it to the element content manually.',
    },
    {
      question: 'How are JSX expressions like {variable} handled?',
      answer: 'JSX expressions are left in the output as-is with their curly brace syntax. They do not translate to HTML because they represent JavaScript values that are only resolved at runtime by React. You need to replace each {expression} with the actual rendered value by hand.',
    },
    {
      question: 'What happens to React component references like <Header /> or <Button>?',
      answer: 'React component references are not valid HTML. They are left in the output unchanged — the converter has no way to know what HTML a component renders. You need to replace each component reference with its actual rendered HTML output. For programmatic conversion of full component trees, use React\'s ReactDOMServer.renderToStaticMarkup().',
    },
    {
      question: 'How are React style objects converted back to CSS?',
      answer: 'camelCased property names are converted to kebab-case CSS property names (backgroundColor → background-color, marginTop → margin-top). JavaScript values are serialized to strings. Unitless numeric values (zIndex: 100) become their string equivalents (z-index: 100). PascalCase vendor prefixes (WebkitTransform) become hyphenated (-webkit-transform).',
    },
    {
      question: 'Does the converted HTML work in email clients?',
      answer: 'The structural conversion is correct for email use — class, for, and standard HTML attributes are restored. However, React components, dynamic expressions, and JavaScript event handlers still need manual replacement. For fully email-ready HTML, also replace any style object syntax with inline CSS and remove all React-specific constructs.',
    },
    {
      question: 'What happens to self-closing JSX tags like <br /> and <img />?',
      answer: 'Void elements (<br />, <hr />, <img />, <input />, <link />, <meta />) have the trailing slash removed: <br /> becomes <br>. Non-void elements that are self-closed in JSX (<div />) are expanded to open/close tag pairs: <div></div>.',
    },
    {
      question: 'Can I convert JSX fragments (<> </>) to HTML?',
      answer: 'Yes. JSX fragments — both <> </> and <React.Fragment> </React.Fragment> — are transparent wrappers with no DOM output. The converter unwraps them, keeping only the children in the output. The fragment tags themselves are removed.',
    },
    {
      question: 'Is there a way to convert a full React component tree to HTML?',
      answer: 'This converter handles markup-level JSX conversion — it processes the syntax, not the runtime rendering. To convert a full React component tree (including all nested components and dynamic data) to HTML, use React\'s server-side API: ReactDOMServer.renderToStaticMarkup() in Node.js, or renderToString() for hydration-ready output.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using JavaScript string processing. No data is transmitted over the network — there are no file size limits, no rate limits, and no privacy concerns.',
    },
  ],
  relatedTools: [
    { to: '/html-to-jsx',      name: 'HTML to JSX',      desc: 'Convert HTML to React JSX — transforms class, for, and inline styles' },
    { to: '/html-to-markdown', name: 'HTML to Markdown', desc: 'Convert HTML to clean Markdown for docs and READMEs' },
    { to: '/meta-tags-generator', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags with live preview — OG, Twitter Card' },
    { to: '/json-to-csv',      name: 'JSON to CSV',      desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
  ],
}

// ─── json-to-csv ─────────────────────────────────────────────────────────────

const JSON_TO_CSV = {
  howToTitle: 'How to convert JSON to CSV',
  howToSteps: [
    'Paste your JSON array into the input field — each object in the array becomes one row in the CSV output.',
    'Choose your delimiter: comma (,) for standard CSV, semicolon (;) for European locales, or tab (⇥) for Excel TSV files.',
    'Click "Convert" — the CSV output appears instantly with column headers derived from the JSON object keys.',
    'Switch to "CSV → JSON" using the toggle above if you need the reverse direction.',
    'Click "Copy" or "Download .csv" to use the output in Excel, Google Sheets, a database import, or a data pipeline.',
  ],
  sections: [
    {
      heading: 'How JSON to CSV conversion works',
      blocks: [
        {
          type: 'p',
          text: 'The converter expects a JSON array of objects — each object becomes one row, and the keys of the first object become the column headers. It runs entirely in your browser: the JSON string is parsed into an array, headers are extracted from the first element\'s keys, and each object is mapped to a delimited row. **No data leaves your machine.** Values that contain the delimiter, double quotes, or newlines are automatically wrapped in double quotes and escaped per the RFC 4180 standard.',
        },
        {
          type: 'p',
          text: 'The delimiter choice determines which applications open the file correctly. Comma is the universal default, but European locales often use semicolon because comma is the decimal separator there. Tab-separated files (TSV) are used when values regularly contain commas — common for address data, product descriptions, and financial records.',
        },
        {
          type: 'code',
          label: 'JSON array → CSV conversion',
          code: `// Input JSON array:
[
  { "name": "Alice", "age": 30, "city": "Kyiv"  },
  { "name": "Bob",   "age": 25, "city": "Lviv"  },
  { "name": "Carol", "age": 35, "city": "Odesa" }
]

// Output CSV (comma delimiter):
name,age,city
Alice,30,Kyiv
Bob,25,Lviv
Carol,35,Odesa

// Output CSV (semicolon — European format):
name;age;city
Alice;30;Kyiv
Bob;25;Lviv
Carol;35;Odesa`,
        },
      ],
    },
    {
      heading: 'Who uses JSON to CSV conversion',
      blocks: [
        {
          type: 'p',
          text: 'JSON is the standard format for APIs and web applications. CSV is the standard format for spreadsheets, databases, and data analysis tools. Converting between them is a daily task for anyone bridging these two worlds.',
        },
        {
          type: 'ul',
          items: [
            '**Backend developers** — exporting API response data to CSV for QA review, client reporting, or onboarding imports.',
            '**Data analysts** — loading JSON exports from web apps (analytics tools, CRMs, e-commerce platforms) into Excel or Google Sheets for analysis.',
            '**Database administrators** — preparing data for bulk import into SQL databases, which typically accept CSV as the import format.',
            '**Product managers** — converting structured data exports into spreadsheets for stakeholder reports and planning.',
            '**ETL pipelines** — transforming JSON payloads from REST APIs into CSV for loading into data warehouses (BigQuery, Redshift, Snowflake).',
            '**QA engineers** — exporting test data sets from JSON fixtures to CSV for comparison, diff analysis, and test case documentation.',
          ],
        },
      ],
    },
    {
      heading: 'Delimiter options: comma, semicolon, and tab',
      blocks: [
        {
          type: 'p',
          text: 'The choice of delimiter determines which applications can open the resulting file without manual configuration. Comma is the most universally supported, but the correct choice depends on your target application and the content of your data.',
        },
        {
          type: 'table',
          headers: ['Delimiter', 'Character', 'Best for'],
          rows: [
            ['Comma',     ',', 'Standard CSV; default for most tools, APIs, and libraries worldwide'],
            ['Semicolon', ';', 'European locale users where comma is the decimal separator (France, Germany, Spain, Italy)'],
            ['Tab',       '⇥', 'TSV files; data that regularly contains commas (addresses, descriptions, financial figures)'],
          ],
        },
        {
          type: 'p',
          text: 'Values that contain the chosen delimiter are automatically wrapped in double quotes in the output — this is the RFC 4180 quoting rule. A value like New York, USA becomes "New York, USA" when the delimiter is comma. You do not need to pre-process your data to avoid conflicts.',
        },
      ],
    },
    {
      heading: 'When to use CSV — and when to keep JSON',
      blocks: [
        {
          type: 'h3',
          text: 'Use CSV when:',
        },
        {
          type: 'ul',
          items: [
            '**Opening in Excel or Google Sheets** — spreadsheet tools natively open and edit CSV; JSON requires a plugin or an import script.',
            '**Database bulk import** — SQL databases (PostgreSQL, MySQL, SQLite) have efficient COPY and LOAD commands that accept CSV directly.',
            '**Sharing flat tabular data** — when the recipient is a non-developer who needs to filter, sort, and inspect rows without coding.',
            '**Smaller file size** — CSV stores each value once; JSON repeats the key name on every row, making it 2–5× larger for wide datasets.',
            '**ETL and data warehouse ingestion** — BigQuery, Redshift, and Snowflake all accept CSV as a first-class import format.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep JSON when:',
        },
        {
          type: 'ul',
          items: [
            '**Data has nested objects or arrays** — CSV cannot represent hierarchy; nested data is flattened or lost during conversion.',
            '**Data types matter** — CSV stores everything as strings. JSON preserves numbers, booleans, and null values with their correct types.',
            '**The target is an API or web application** — REST APIs and JavaScript applications natively consume JSON without an extra parsing step.',
            '**Schema flexibility is needed** — JSON arrays can contain objects with different keys; CSV requires all rows to share the same columns.',
          ],
        },
      ],
    },
    {
      heading: 'Handling nested objects and arrays in JSON',
      blocks: [
        {
          type: 'p',
          text: 'CSV is a flat, two-dimensional format — it has rows and columns, but no nesting. If your JSON objects contain nested objects or arrays as values, the converter serializes them to their JSON string representation inside the CSV cell. This preserves the data but means the nested content appears as a string rather than being expanded into separate columns.',
        },
        {
          type: 'code',
          label: 'Nested JSON in CSV output',
          code: `// Input JSON with nested object and array:
[
  {
    "name": "Alice",
    "address": { "city": "Kyiv", "zip": "01001" },
    "tags": ["admin", "user"]
  }
]

// Output CSV (nested values serialized as JSON strings):
name,address,tags
Alice,"{""city"":""Kyiv"",""zip"":""01001""}","[""admin"",""user""]"

// To get flat columns, pre-process the JSON first:
// { "name": "Alice", "address_city": "Kyiv", "address_zip": "01001", "tags_0": "admin" }
// This converter handles flat arrays of objects best.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What JSON structure does the converter expect?',
      answer: 'The converter expects a JSON array of flat objects: [{ "key": "value", ... }, ...]. Each object becomes one CSV row. The keys of the first object are used as column headers. If subsequent objects have different keys, missing values are output as empty strings and extra keys are omitted.',
    },
    {
      question: 'What happens to nested objects or arrays inside the JSON?',
      answer: 'Nested objects and arrays are serialized as JSON strings inside the CSV cell. For example, { "address": { "city": "Kyiv" } } becomes a cell containing {"city":"Kyiv"}. CSV cannot represent hierarchy, so pre-flatten your JSON if you need separate columns for nested properties.',
    },
    {
      question: 'Which delimiter should I choose?',
      answer: 'Use comma for most tools and APIs worldwide. Use semicolon if your target is Excel on a European locale (where comma is the decimal separator — Excel automatically interprets semicolon-delimited files as CSV in those settings). Use tab when your data values commonly contain commas, such as addresses or product descriptions.',
    },
    {
      question: 'What happens if objects in the array have different keys?',
      answer: 'Headers are derived from the first object only. If later objects have extra keys, those columns are silently omitted. If later objects are missing keys that the first object had, those cells output as empty strings. Pre-normalize your JSON to ensure all objects share the same keys for reliable output.',
    },
    {
      question: 'How are null and undefined values handled?',
      answer: 'null values are output as empty strings in the CSV. undefined values are also output as empty strings. If you need to distinguish null from empty string in downstream systems, pre-process the JSON before conversion.',
    },
    {
      question: 'How are values that contain the delimiter or quotes handled?',
      answer: 'Values containing the delimiter character, double quotes, or newlines are automatically wrapped in double quotes following the RFC 4180 standard. Double quotes inside the value are escaped by doubling them. A value of say "hello" becomes """say ""hello"""" in the CSV. You do not need to pre-process your data.',
    },
    {
      question: 'Does the converter support Unicode and non-ASCII characters?',
      answer: 'Yes. The conversion is fully Unicode-aware — accented letters, CJK characters, Arabic, Cyrillic, and emoji are all preserved correctly. The downloaded .csv file is encoded as UTF-8. When opening in Excel, use "Data → From Text/CSV" and select UTF-8 encoding to display non-ASCII characters correctly.',
    },
    {
      question: 'Can I convert a single JSON object instead of an array?',
      answer: 'The converter expects a JSON array. Wrap a single object in an array: [{ "key": "value" }] to get a one-row CSV. To transpose a single object into a two-column key–value CSV, pre-process the JSON first: Object.entries(obj).map(([k,v]) => ({ key: k, value: v })).',
    },
    {
      question: 'How does Excel open the CSV output from this converter?',
      answer: 'In English locales, double-clicking a .csv file opens it with comma as the delimiter automatically. In European locales, Excel may default to semicolon. If the columns appear merged, use "Data → From Text/CSV" in Excel and manually specify the delimiter and UTF-8 encoding.',
    },
    {
      question: 'What is the maximum file size the converter handles?',
      answer: 'There is no server-side limit — the conversion runs entirely in your browser. Practical limits are set by your browser\'s memory. JSON files up to several megabytes (thousands of rows) convert without issue on modern devices.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using JavaScript. No data is transmitted over the network — there are no privacy concerns, no server-side file size limits, and no rate limits.',
    },
    {
      question: 'Can I convert the CSV back to JSON?',
      answer: 'Yes — switch to "CSV → JSON" using the toggle above the tool. Note that the round-trip is not lossless: all values become strings in the JSON output because CSV does not store type information. Numbers that were integers in the original JSON will be strings after the round-trip.',
    },
  ],
  relatedTools: [
    { to: '/csv-to-json', name: 'CSV to JSON',  desc: 'Parse CSV back to a JSON array — the reverse direction' },
    { to: '/json-to-xml', name: 'JSON to XML',  desc: 'Convert JSON to a valid XML document — browser-based' },
    { to: '/yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML to formatted JSON — browser-based' },
    { to: '/xml-to-json', name: 'XML to JSON',  desc: 'Parse XML documents into formatted JSON — browser-based' },
  ],
}

// ─── csv-to-json ──────────────────────────────────────────────────────────────

const CSV_TO_JSON = {
  howToTitle: 'How to convert CSV to JSON',
  howToSteps: [
    'Paste your CSV data into the input field — the first row must contain the column headers (field names).',
    'Choose the delimiter that matches your CSV file: comma (,), semicolon (;), or tab (⇥).',
    'Click "Convert" — the JSON array output appears instantly with each row mapped to an object.',
    'Switch to "JSON → CSV" using the toggle above if you need the reverse direction.',
    'Click "Copy" or "Download .json" to use the output in your application, API, or data pipeline.',
  ],
  sections: [
    {
      heading: 'How CSV to JSON conversion works',
      blocks: [
        {
          type: 'p',
          text: 'The converter splits the CSV input into lines, uses the first line as the header row (column names), and maps each subsequent line to a JSON object using the headers as keys and the row values as values. The output is a JSON array where each element corresponds to one CSV row. The conversion runs entirely in your browser — **no data is sent to any server.**',
        },
        {
          type: 'p',
          text: 'RFC 4180-compliant quoted fields are handled correctly: values wrapped in double quotes are unquoted, escaped double quotes ("" inside a quoted field) are unescaped to a single quote, and newlines inside quoted fields are preserved. All output values are strings — CSV does not store data type information, so numeric coercion is not applied automatically.',
        },
        {
          type: 'code',
          label: 'CSV → JSON array conversion',
          code: `// Input CSV (comma delimiter):
name,age,city
Alice,30,Kyiv
Bob,25,Lviv
Carol,35,Odesa

// Output JSON array:
[
  { "name": "Alice", "age": "30", "city": "Kyiv"  },
  { "name": "Bob",   "age": "25", "city": "Lviv"  },
  { "name": "Carol", "age": "35", "city": "Odesa" }
]

// Note: all values are strings. To convert numeric fields:
// data.forEach(row => { row.age = Number(row.age) })`,
        },
      ],
    },
    {
      heading: 'Who uses CSV to JSON conversion',
      blocks: [
        {
          type: 'p',
          text: 'CSV is the universal export format for spreadsheets, databases, and reporting tools. JSON is the universal import format for web applications and APIs. Converting CSV to JSON is the bridge between these two worlds.',
        },
        {
          type: 'ul',
          items: [
            '**Frontend developers** — loading data from a spreadsheet export (Excel, Google Sheets) into a JavaScript application or chart library.',
            '**Backend developers** — importing database exports or legacy CSV files into JSON-based APIs or document stores.',
            '**Data engineers** — transforming CSV exports from CRMs, ERPs, and analytics tools into JSON for ingestion into NoSQL databases or event streams.',
            '**Content managers** — converting spreadsheet content into JSON data files for static site generators (Hugo, Astro, Eleventy).',
            '**QA engineers** — converting test data from spreadsheets into JSON fixtures for automated test suites.',
            '**Business analysts** — preparing Excel or Google Sheets data for use in JavaScript-based reporting and visualization tools.',
          ],
        },
      ],
    },
    {
      heading: 'CSV input requirements and delimiter guide',
      blocks: [
        {
          type: 'p',
          text: 'The converter follows the RFC 4180 CSV standard. To get reliable output, ensure your CSV meets these requirements before converting:',
        },
        {
          type: 'ul',
          items: [
            '**First row must be headers** — the column names in the first row become the JSON object keys. If your CSV has no header row, add one before converting — otherwise the first data row is treated as headers and lost.',
            '**Consistent delimiter** — all rows must use the same delimiter. Select the matching option in the converter before clicking Convert.',
            '**Quoted fields for special characters** — values containing the delimiter, double quotes, or newlines must be wrapped in double quotes. The converter handles these correctly when they are properly quoted.',
            '**UTF-8 encoding** — the converter processes the text as UTF-8. Files exported from Excel may be in Windows-1252 encoding — resave as UTF-8 first if you see garbled characters.',
          ],
        },
        {
          type: 'table',
          headers: ['Delimiter', 'When to select it'],
          rows: [
            ['Comma (,)',     'Default for most tools and APIs; standard in English-locale Excel, Google Sheets, PostgreSQL COPY'],
            ['Semicolon (;)', 'European-locale Excel exports; Google Sheets downloads in French, German, Spanish locales'],
            ['Tab (⇥)',       'TSV files (.tsv); data containing many commas (addresses, text fields); some database exports'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert to JSON — and when to keep CSV',
      blocks: [
        {
          type: 'h3',
          text: 'Convert to JSON when:',
        },
        {
          type: 'ul',
          items: [
            '**Target is a web application or API** — JavaScript natively parses JSON; CSV requires a separate parsing library or manual import step.',
            '**Loading into a NoSQL database** — MongoDB, Firestore, DynamoDB, and similar stores use JSON-like documents as their native format.',
            '**Static site generator data files** — Hugo, Astro, Eleventy, and 11ty all support JSON data files for template rendering.',
            '**JavaScript chart libraries** — Chart.js, D3, Recharts, and similar libraries accept JSON arrays as their data source directly.',
            '**Feeding an API or webhook** — REST and GraphQL endpoints expect JSON-encoded request bodies.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep CSV when:',
        },
        {
          type: 'ul',
          items: [
            '**Recipients use Excel or Google Sheets** — spreadsheet users are more comfortable filtering and editing CSV than JSON files.',
            '**Bulk database imports** — SQL databases use COPY and LOAD INFILE commands that accept CSV natively and efficiently.',
            '**Logs and large flat datasets** — CSV is more compact and can stream line-by-line without loading the full file into memory.',
            '**Data interchange with non-developer teams** — CSV is universally editable in any spreadsheet tool without special tooling.',
          ],
        },
      ],
    },
    {
      heading: 'Edge cases: quoted fields, numbers, and special characters',
      blocks: [
        {
          type: 'p',
          text: 'CSV appears simple but has several edge cases that trip up basic parsers. This converter handles all of them correctly by following the RFC 4180 specification:',
        },
        {
          type: 'ul',
          items: [
            '**Commas inside values** — "New York, USA" is a single quoted field containing a comma. The converter treats it as one value, not two columns.',
            '**Double quotes inside quoted fields** — RFC 4180 escapes an embedded quote by doubling it: "say ""hello""" contains say "hello". The converter unescapes these correctly.',
            '**Newlines inside quoted fields** — a multiline value inside double quotes is treated as a single field. The embedded newline is preserved in the JSON string.',
            '**Leading/trailing whitespace** — whitespace inside quoted fields is preserved. Unquoted values are trimmed of leading and trailing spaces.',
          ],
        },
        {
          type: 'code',
          label: 'Quoted fields and special characters in CSV',
          code: `// CSV input with quoted fields:
name,bio,score
Alice,"Software engineer, Kyiv",95
Bob,"Says ""hello"" often",87
Carol,"Line one
Line two",91

// JSON output:
[
  { "name": "Alice", "bio": "Software engineer, Kyiv", "score": "95" },
  { "name": "Bob",   "bio": "Says \\"hello\\" often",   "score": "87" },
  { "name": "Carol", "bio": "Line one\\nLine two",        "score": "91" }
]`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does the first row of the CSV need to be the headers?',
      answer: 'Yes. The converter uses the first row as the source of JSON object keys (column names). If your CSV does not have a header row, add one manually before converting — otherwise the first data row will be treated as headers and lost from the output.',
    },
    {
      question: 'How do I choose the right delimiter?',
      answer: 'Open the file in a plain text editor to inspect it. If columns are separated by commas, choose comma. If separated by semicolons (common in European Excel exports), choose semicolon. If separated by tabs (common in TSV files or certain database exports), choose tab. Choosing the wrong delimiter produces a JSON output with a single field containing the entire unsplit row.',
    },
    {
      question: 'What happens to empty cells in the CSV?',
      answer: 'Empty cells produce empty strings ("") in the JSON output. A CSV row like Alice,,Kyiv produces { "name": "Alice", "age": "", "city": "Kyiv" }. If you need null instead of empty string for downstream processing, replace empty strings after conversion.',
    },
    {
      question: 'Are numbers in CSV converted to numbers in JSON?',
      answer: 'No — all values are output as strings regardless of content. CSV does not store type information, so 30 in the CSV becomes "30" (a string) in the JSON. To convert numeric fields after parsing: data.forEach(row => { row.age = Number(row.age) }). This avoids silent type coercion errors on non-numeric fields.',
    },
    {
      question: 'How are quoted fields handled?',
      answer: 'Fields wrapped in double quotes are unquoted in the output. A field like "New York, USA" becomes the string New York, USA. Embedded double quotes escaped with doubling (say ""hello"") become single double quotes in the output (say "hello"). This follows the RFC 4180 standard.',
    },
    {
      question: 'What about newlines inside quoted CSV fields?',
      answer: 'The converter handles multiline values inside quoted fields correctly. A field containing an actual newline character (not a backslash-n) is parsed as a single value and output as a JSON string with an escaped newline (\\n).',
    },
    {
      question: 'Does the converter support Unicode and non-ASCII characters?',
      answer: 'Yes. The converter is fully Unicode-aware — accented letters, CJK characters, Cyrillic, Arabic, and emoji are all handled correctly. If you paste from a file saved in a non-UTF-8 encoding (such as Windows-1252 from Excel), re-save the file as UTF-8 first to avoid garbled characters.',
    },
    {
      question: 'What if some rows have fewer columns than the header row?',
      answer: 'Short rows produce JSON objects with missing keys omitted entirely — the missing fields do not appear as empty strings. If you need consistent keys across all objects, pre-pad short rows with empty cells (e.g., trailing commas) before converting.',
    },
    {
      question: 'Can I convert a CSV file without headers?',
      answer: 'Not directly — the first row is always treated as column names. To work around this, add a synthetic header row (col1,col2,col3) before the data, then rename the keys in the JSON output after conversion.',
    },
    {
      question: 'What is the output JSON structure?',
      answer: 'The output is a JSON array of objects. Each row becomes one object; each column header becomes a key; each cell value becomes the corresponding string value. The array is formatted with 2-space indentation for readability.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using JavaScript. No data is transmitted over the network — there are no privacy concerns, no server-side file size limits, and no rate limits.',
    },
    {
      question: 'Can I convert the JSON back to CSV?',
      answer: 'Yes — switch to "JSON → CSV" using the toggle above the tool. Note that the round-trip is not lossless: all values are now strings in the CSV. Converting back to JSON produces strings, not the original numbers or booleans.',
    },
  ],
  relatedTools: [
    { to: '/json-to-csv',  name: 'JSON to CSV',  desc: 'Convert JSON arrays back to CSV — the reverse direction' },
    { to: '/xml-to-json',  name: 'XML to JSON',  desc: 'Parse XML documents into formatted JSON — browser-based' },
    { to: '/yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML to formatted JSON — browser-based' },
    { to: '/json-to-xml',  name: 'JSON to XML',  desc: 'Convert JSON to a valid XML document — browser-based' },
  ],
}

// ─── xml-to-json ─────────────────────────────────────────────────────────────

const XML_TO_JSON = {
  howToTitle: 'How to convert XML to JSON',
  howToSteps: [
    'Paste your XML document or fragment into the input field — a full document with declaration, or just a root element.',
    'Click "Convert" — the formatted JSON output appears instantly with nested elements, attributes, and text content preserved.',
    'Switch to "JSON → XML" using the toggle above if you need the reverse direction.',
    'Click "Copy" or "Download .json" to use the output in your application, API, or data pipeline.',
    'If the output uses @attributes or #text keys, see the mapping guide below to understand the convention.',
  ],
  sections: [
    {
      heading: 'How the XML to JSON converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter parses the XML string using a DOM-based parser, then traverses the element tree and maps each node to its JSON equivalent. Element names become JSON object keys. Child elements become nested objects. Repeated sibling elements with the same tag name are collected into a JSON array. XML attributes are grouped under an **@attributes** key. Text content inside elements that also have attributes is stored under a **#text** key. The conversion runs entirely in your browser — no data leaves your machine.',
        },
        {
          type: 'p',
          text: 'This @attributes / #text convention is the standard approach for lossless XML-to-JSON mapping — it ensures every piece of information in the XML (including attributes) can be recovered when converting back to XML. Simple elements with only text content and no attributes are mapped to plain string values without the wrapper object.',
        },
        {
          type: 'code',
          label: 'XML → JSON conversion with attributes',
          code: `// Input XML:
<?xml version="1.0"?>
<users>
  <user id="1">
    <name>Alice</name>
    <city>Kyiv</city>
  </user>
  <user id="2">
    <name>Bob</name>
    <city>Lviv</city>
  </user>
</users>

// Output JSON:
{
  "users": {
    "user": [
      { "@attributes": { "id": "1" }, "name": "Alice", "city": "Kyiv" },
      { "@attributes": { "id": "2" }, "name": "Bob",   "city": "Lviv" }
    ]
  }
}`,
        },
      ],
    },
    {
      heading: 'Who uses XML to JSON conversion',
      blocks: [
        {
          type: 'p',
          text: 'XML remains the dominant format in enterprise systems, legacy APIs, and configuration files. JSON is the dominant format in modern web applications and REST APIs. Converting XML to JSON is the standard integration step between these two generations of technology.',
        },
        {
          type: 'ul',
          items: [
            '**SOAP API integration** — consuming responses from legacy SOAP or XML-RPC web services in a JavaScript or Node.js application.',
            '**RSS and Atom feeds** — parsing news feeds, podcast directories, or blog syndication feeds into JSON for frontend rendering.',
            '**Configuration file migration** — converting Maven pom.xml, Spring applicationContext.xml, or Android strings.xml to JSON-based config.',
            '**Data migration** — transforming XML exports from ERP, CRM, or legacy database systems into JSON for import into modern document stores.',
            '**Sitemap processing** — parsing XML sitemaps to extract URLs for crawling, analysis, or SEO audit tools.',
            '**Office document data** — extracting structured data from OOXML formats (Excel, Word) that use XML as their underlying storage format.',
          ],
        },
      ],
    },
    {
      heading: 'How XML structures map to JSON',
      blocks: [
        {
          type: 'p',
          text: 'XML and JSON represent hierarchical data differently. The table below shows exactly how each XML construct is represented in the JSON output, following the @attributes convention used by this converter.',
        },
        {
          type: 'table',
          headers: ['XML construct', 'JSON representation', 'Notes'],
          rows: [
            ['<tag>text</tag>',                  '"tag": "text"',                          'Simple text element → string value'],
            ['<tag attr="v">text</tag>',          '"tag": { "@attributes": {"attr":"v"}, "#text": "text" }', 'Element with attribute and text'],
            ['<parent><child>v</child></parent>', '"parent": { "child": "v" }',             'Nested element → nested object'],
            ['Two or more <item> siblings',       '"item": ["val1", "val2"]',               'Repeated tags → JSON array'],
            ['<tag attr="v"/>',                   '"tag": { "@attributes": {"attr":"v"} }', 'Self-closing element with attribute'],
            ['<tag/>',                            '"tag": ""',                              'Empty self-closing element'],
            ['<?xml version="1.0"?>',             '(dropped)',                              'XML declaration is not included in output'],
            ['<!-- comment -->',                  '(dropped)',                              'XML comments are stripped'],
            ['<![CDATA[text]]>',                  '"tag": "text"',                          'CDATA content extracted as string'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert XML to JSON — and when to keep XML',
      blocks: [
        {
          type: 'h3',
          text: 'Convert to JSON when:',
        },
        {
          type: 'ul',
          items: [
            '**Target is a JavaScript or Node.js application** — JSON.parse() is native; XML requires a separate DOM parser or library.',
            '**Feeding a REST API or NoSQL database** — modern APIs and document stores (MongoDB, Firestore) expect JSON, not XML.',
            '**Reducing payload size** — JSON is typically 20–40% smaller than equivalent XML due to the absence of closing tags and verbose element syntax.',
            '**Simplifying data processing** — iterating over a JSON array is simpler than traversing an XML node list in most languages.',
            '**Dashboard or chart data** — frontend visualization libraries (Chart.js, D3, Recharts) accept JSON arrays directly.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep XML when:',
        },
        {
          type: 'ul',
          items: [
            '**Target system requires XML** — SOAP services, enterprise message buses (MQ, ESB), and some legacy APIs only accept XML.',
            '**Document markup is needed** — XML supports mixed content (text interleaved with elements) that JSON cannot represent.',
            '**Namespaces and schemas matter** — XML namespaces and XSD validation have no JSON equivalent.',
            '**Transformation pipelines use XSLT** — XSLT processing requires XML input; JSON cannot be processed by XSLT directly.',
            '**Comments and processing instructions must be preserved** — XML comments and processing instructions are dropped during JSON conversion.',
          ],
        },
      ],
    },
    {
      heading: 'Edge cases: namespaces, mixed content, and CDATA',
      blocks: [
        {
          type: 'p',
          text: 'XML has several features that do not map cleanly to JSON. Understanding how the converter handles them prevents surprises in the output:',
        },
        {
          type: 'ul',
          items: [
            '**XML namespaces** — namespace prefixes (ns:element) are preserved as-is in the JSON key name. The xmlns declarations are included as @attributes. Namespace-aware processing is not performed — the prefix is treated as part of the key string.',
            '**CDATA sections** — <![CDATA[raw text]]> content is extracted and treated as plain text. The CDATA delimiters are stripped; the content becomes a regular JSON string value.',
            '**Mixed content** — elements containing both text nodes and child elements (common in HTML-like markup) are handled by combining the text into #text and child elements as sibling keys. Complex mixed content may not round-trip perfectly.',
            '**Processing instructions** — <?php ... ?>, <?xml-stylesheet ?>, and other processing instructions are dropped from the JSON output.',
            '**XML comments** — <!-- ... --> comments are stripped and do not appear in the JSON output.',
          ],
        },
        {
          type: 'code',
          label: 'Namespace handling in JSON output',
          code: `// Input XML with namespace:
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUser xmlns="http://example.com/api">
      <UserId>42</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>

// Output JSON (namespaces preserved as key prefixes):
{
  "soap:Envelope": {
    "@attributes": { "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/" },
    "soap:Body": {
      "GetUser": {
        "@attributes": { "xmlns": "http://example.com/api" },
        "UserId": "42"
      }
    }
  }
}`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What does @attributes mean in the JSON output?',
      answer: '@attributes is the key used to group XML element attributes in the JSON representation. For example, <user id="1" role="admin"> becomes { "@attributes": { "id": "1", "role": "admin" }, ... }. This convention is standard for lossless XML-to-JSON mapping and allows round-tripping back to XML.',
    },
    {
      question: 'What does #text mean in the JSON output?',
      answer: '#text is the key used for the text content of an XML element that also has attributes. For example, <price currency="USD">9.99</price> becomes { "@attributes": { "currency": "USD" }, "#text": "9.99" }. When an element has only text content and no attributes, the text is mapped directly as a string value without the #text wrapper.',
    },
    {
      question: 'Why are some XML elements converted to arrays?',
      answer: 'When two or more sibling elements share the same tag name, the converter groups them into a JSON array. For example, three <item> elements under <list> become "item": ["val1", "val2", "val3"]. This is the standard behavior — XML allows repeated siblings but JSON objects cannot have duplicate keys.',
    },
    {
      question: 'What happens to the XML declaration (<?xml version="1.0"?>)?',
      answer: 'The XML declaration is dropped from the JSON output. It is metadata about the XML document format (version and encoding) and has no meaningful JSON equivalent.',
    },
    {
      question: 'Are XML comments preserved in the JSON output?',
      answer: 'No. XML comments (<!-- ... -->) are stripped during conversion. If you need to preserve comments, keep the original XML file alongside the JSON output.',
    },
    {
      question: 'How are CDATA sections handled?',
      answer: 'CDATA sections (<![CDATA[raw text]]>) are treated as plain text. The CDATA delimiters are stripped and the content is output as a regular JSON string value.',
    },
    {
      question: 'Are XML namespaces supported?',
      answer: 'Namespace prefixes are preserved as-is in JSON key names (ns:element becomes "ns:element"). The xmlns declarations are included as @attributes entries. Full namespace-aware processing (resolving prefix URIs) is not performed — the prefix is treated as part of the key string.',
    },
    {
      question: 'Can I convert an XML fragment without a root element?',
      answer: 'No. XML requires exactly one root element. If you paste a fragment with multiple root-level elements, the parser will throw an error. Wrap the fragment in a temporary root element: <root>...your content...</root> before converting.',
    },
    {
      question: 'Are all values in the JSON output strings?',
      answer: 'Yes — XML element content and attribute values are always text, so all values in the JSON output are strings. Numbers, booleans, and null are not inferred. If you need typed values, post-process the JSON after conversion.',
    },
    {
      question: 'What is the maximum XML file size the converter handles?',
      answer: 'There is no server-side limit — the conversion runs entirely in your browser. Practical limits are set by your browser\'s memory and the DOM parser\'s capacity. XML files up to several megabytes convert without issue on modern devices.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using the built-in DOMParser API and JavaScript. No data is transmitted over the network — there are no privacy concerns and no file size limits.',
    },
    {
      question: 'Can I convert the JSON back to XML?',
      answer: 'Yes — switch to "JSON → XML" using the toggle above the tool. The round-trip works correctly if the JSON follows the @attributes and #text conventions produced by this converter.',
    },
  ],
  relatedTools: [
    { to: '/json-to-xml',  name: 'JSON to XML',  desc: 'Convert JSON back to a valid XML document — the reverse direction' },
    { to: '/json-to-csv',  name: 'JSON to CSV',  desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML to formatted JSON — browser-based' },
    { to: '/csv-to-json',  name: 'CSV to JSON',  desc: 'Parse CSV data into a JSON array — browser-based' },
  ],
}

// ─── json-to-xml ─────────────────────────────────────────────────────────────

const JSON_TO_XML = {
  howToTitle: 'How to convert JSON to XML',
  howToSteps: [
    'Paste your JSON object into the input field — a single root object whose keys become XML element names.',
    'Click "Convert" — the formatted XML output appears instantly with proper indentation and an XML declaration.',
    'Switch to "XML → JSON" using the toggle above if you need the reverse direction.',
    'Click "Copy" or "Download .xml" to use the output in your system, API, or configuration file.',
    'Use @attributes in your JSON to produce XML element attributes — see the mapping reference below.',
  ],
  sections: [
    {
      heading: 'How the JSON to XML converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter traverses the JSON object recursively and maps each key-value pair to an XML element. String and number values become element text content. Nested objects become child elements. Arrays are expanded into repeated sibling elements with the parent key as the tag name. The special key **@attributes** produces XML attributes on the parent element; the special key **#text** produces mixed text content alongside attributes. The output includes an XML declaration and is indented for readability.',
        },
        {
          type: 'p',
          text: 'The @attributes convention makes the conversion reversible — JSON produced by the XML to JSON converter can be converted back to XML and produce the same structure. The conversion runs entirely in your browser — no data leaves your machine.',
        },
        {
          type: 'code',
          label: 'JSON object → XML document conversion',
          code: `// Input JSON:
{
  "users": {
    "user": [
      { "@attributes": { "id": "1" }, "name": "Alice", "city": "Kyiv" },
      { "@attributes": { "id": "2" }, "name": "Bob",   "city": "Lviv" }
    ]
  }
}

// Output XML:
<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="1">
    <name>Alice</name>
    <city>Kyiv</city>
  </user>
  <user id="2">
    <name>Bob</name>
    <city>Lviv</city>
  </user>
</users>`,
        },
      ],
    },
    {
      heading: 'Who uses JSON to XML conversion',
      blocks: [
        {
          type: 'p',
          text: 'JSON is the primary data format for modern web APIs. XML is the required format for enterprise integrations, legacy systems, and certain configuration tools. Converting JSON to XML bridges these two generations of technology.',
        },
        {
          type: 'ul',
          items: [
            '**SOAP API integration** — building request payloads for SOAP or XML-RPC web services from JSON data in a JavaScript or Node.js application.',
            '**Enterprise message bus** — formatting messages for systems that use XML-based message formats (JMS, MQ, ESB, EDI).',
            '**Configuration file generation** — creating XML config files (Maven pom.xml, Spring beans, Android resources) from JSON-based build data.',
            '**Data export to legacy systems** — converting modern API responses to XML for import into ERP, CRM, or accounting systems that require XML.',
            '**Sitemap generation** — building XML sitemaps from a JSON list of URLs and metadata.',
            '**Office document creation** — generating OOXML fragments (Excel, Word) from structured JSON data for reporting pipelines.',
          ],
        },
      ],
    },
    {
      heading: 'JSON to XML mapping conventions',
      blocks: [
        {
          type: 'p',
          text: 'The converter follows a set of mapping conventions for the JSON-to-XML direction. Understanding these conventions lets you structure your JSON input to produce exactly the XML output you need.',
        },
        {
          type: 'table',
          headers: ['JSON input', 'XML output', 'Notes'],
          rows: [
            ['"tag": "text"',                        '<tag>text</tag>',                     'String value → text content'],
            ['"tag": 42',                             '<tag>42</tag>',                       'Number value → text content (stringified)'],
            ['"tag": true',                           '<tag>true</tag>',                     'Boolean value → text content'],
            ['"tag": null',                           '<tag/>',                              'null → self-closing empty element'],
            ['"tag": { "child": "v" }',               '<tag><child>v</child></tag>',         'Object → child elements'],
            ['"tag": ["a", "b"]',                    '<tag>a</tag><tag>b</tag>',            'Array → repeated sibling elements'],
            ['"@attributes": { "id": "1" }',         'id="1" on parent element',            '@attributes → XML attributes'],
            ['"#text": "content"',                   'text content alongside attributes',   '#text → mixed element text content'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert JSON to XML — and when to keep JSON',
      blocks: [
        {
          type: 'h3',
          text: 'Convert to XML when:',
        },
        {
          type: 'ul',
          items: [
            '**Target system requires XML** — SOAP services, enterprise message buses, and legacy APIs that only accept XML-encoded payloads.',
            '**Document markup is needed** — XML supports mixed content (text interleaved with elements) used in document formats like DocBook, TEI, and OOXML.',
            '**Configuration files must be XML** — Maven, Spring, Android resources, and many Java ecosystem tools use XML as their config format.',
            '**XSLT transformation pipeline** — XSLT processing requires XML input; the JSON needs to become XML before it can be transformed.',
            '**Schema validation is required** — XML Schema (XSD) and RelaxNG provide strict structural validation that JSON Schema does not match in all enterprise contexts.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep JSON when:',
        },
        {
          type: 'ul',
          items: [
            '**Target is a REST API or JavaScript application** — JSON.parse() is native; XML adds unnecessary parsing overhead.',
            '**Payload size matters** — JSON is typically 20–40% smaller than equivalent XML due to the absence of closing tags.',
            '**Data has arrays of uniform objects** — JSON arrays are cleaner than repeated XML elements with no semantic distinction.',
            '**NoSQL databases are the destination** — MongoDB, Firestore, and DynamoDB store JSON-like documents natively.',
          ],
        },
      ],
    },
    {
      heading: 'Building valid XML: element names and special characters',
      blocks: [
        {
          type: 'p',
          text: 'XML has stricter naming and encoding rules than JSON. When structuring the JSON input for conversion, keep these XML constraints in mind to avoid invalid output:',
        },
        {
          type: 'ul',
          items: [
            '**Element names must start with a letter or underscore** — JSON keys that start with a digit (like "1item") produce invalid XML. Rename such keys before converting.',
            '**No spaces in element names** — JSON keys with spaces ("first name") cannot become valid XML tags. Use camelCase or underscore-separated keys instead.',
            '**Special characters in text content are escaped** — the converter automatically escapes &, <, >, ", and \' in text values to &amp;, &lt;, &gt;, &quot;, and &apos;.',
            '**The JSON root must be a single object** — JSON arrays at the root level are not valid because XML requires exactly one root element. Wrap arrays in an object: { "items": [...] }.',
            '**Attribute values are strings** — the @attributes object should contain only string or number values; nested objects inside @attributes are not valid.',
          ],
        },
        {
          type: 'code',
          label: 'Using @attributes and #text in JSON input',
          code: `// JSON with @attributes for element attributes
// and #text for mixed content:
{
  "product": {
    "@attributes": { "id": "P001", "currency": "USD" },
    "name": "Wireless Headphones",
    "price": {
      "@attributes": { "sale": "true" },
      "#text": "49.99"
    },
    "tags": ["audio", "wireless", "bluetooth"]
  }
}

// Output XML:
<?xml version="1.0" encoding="UTF-8"?>
<product id="P001" currency="USD">
  <name>Wireless Headphones</name>
  <price sale="true">49.99</price>
  <tags>audio</tags>
  <tags>wireless</tags>
  <tags>bluetooth</tags>
</product>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What JSON structure does the converter expect?',
      answer: 'The converter expects a single JSON object at the root level — the top-level key becomes the XML root element name. Arrays at the root are not supported because XML requires exactly one root element. Wrap an array in a root object: { "items": [ ... ] }.',
    },
    {
      question: 'How do I add attributes to XML elements?',
      answer: 'Add a key named @attributes to the JSON object at the level of the element you want to add attributes to. Its value must be an object of attribute name–value pairs: { "@attributes": { "id": "1", "class": "active" } }. The converter converts these to XML attributes on the parent element.',
    },
    {
      question: 'How do I produce an element with both attributes and text content?',
      answer: 'Use both @attributes and #text in the same object: { "@attributes": { "currency": "USD" }, "#text": "9.99" }. This produces <price currency="USD">9.99</price>. Without @attributes, a string value is sufficient: "price": "9.99" produces <price>9.99</price>.',
    },
    {
      question: 'How are JSON arrays converted to XML?',
      answer: 'A JSON array value produces repeated sibling elements with the same tag name — the parent key becomes the element name for each item. { "tag": ["a", "b", "c"] } produces <tag>a</tag><tag>b</tag><tag>c</tag>. An array of objects produces sibling elements with the same structure for each item.',
    },
    {
      question: 'What happens to null values in JSON?',
      answer: 'null values produce self-closing empty elements. "description": null becomes <description/>. If you want an element to be omitted entirely, remove the key from the JSON object before converting.',
    },
    {
      question: 'Are special characters in values automatically escaped?',
      answer: 'Yes. The converter automatically escapes the five XML reserved characters in text content and attribute values: & → &amp;, < → &lt;, > → &gt;, " → &quot;, \' → &apos;. You do not need to pre-escape your JSON values.',
    },
    {
      question: 'My JSON keys start with numbers or contain spaces — will the XML be valid?',
      answer: 'No. XML element names must start with a letter or underscore, and cannot contain spaces. JSON keys that violate these rules will produce invalid XML tag names. Rename such keys before converting: "1item" → "item1", "first name" → "firstName".',
    },
    {
      question: 'Does the output include an XML declaration?',
      answer: 'Yes. The converter adds <?xml version="1.0" encoding="UTF-8"?> as the first line of the output. This is standard practice for standalone XML documents and is expected by most XML parsers and validators.',
    },
    {
      question: 'Can I produce XML with namespaces?',
      answer: 'Yes. Add namespace declarations as @attributes entries and use prefixed key names. For example: { "@attributes": { "xmlns:ns": "http://example.com" }, "ns:item": "value" } produces <root xmlns:ns="http://example.com"><ns:item>value</ns:item></root>.',
    },
    {
      question: 'What is the maximum JSON file size the converter handles?',
      answer: 'There is no server-side limit — the conversion runs entirely in your browser. Practical limits are set by your browser\'s memory. JSON files up to several megabytes convert without issue on modern devices.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using JavaScript. No data is transmitted over the network — there are no privacy concerns and no file size limits.',
    },
    {
      question: 'Can I convert the XML back to JSON?',
      answer: 'Yes — switch to "XML → JSON" using the toggle above the tool. If your JSON follows the @attributes and #text conventions, the round-trip is lossless for most structures.',
    },
  ],
  relatedTools: [
    { to: '/xml-to-json',  name: 'XML to JSON',  desc: 'Parse XML documents back into formatted JSON — the reverse direction' },
    { to: '/json-to-csv',  name: 'JSON to CSV',  desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML to formatted JSON — browser-based' },
    { to: '/csv-to-json',  name: 'CSV to JSON',  desc: 'Parse CSV data into a JSON array — browser-based' },
  ],
}

// ─── yaml-to-json ────────────────────────────────────────────────────────────

const YAML_TO_JSON = {
  howToTitle: 'How to convert YAML to JSON',
  howToSteps: [
    'Paste your YAML document into the input field — a config file, Kubernetes manifest, GitHub Actions workflow, or any YAML snippet.',
    'Click "Convert" — the formatted JSON output appears instantly with all types, nested structures, and aliases resolved.',
    'Switch to "JSON → YAML" using the toggle above if you need the reverse direction.',
    'Click "Copy" or "Download .json" to use the output in your application, API, or data pipeline.',
    'Note: YAML comments and anchor names are not preserved in the JSON output — only their resolved values carry over.',
  ],
  sections: [
    {
      heading: 'How the YAML to JSON converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter uses js-yaml, a full-featured YAML parser for JavaScript, running entirely in your browser. When you click Convert, js-yaml parses the YAML document into a JavaScript object — resolving anchors and aliases, applying type coercions, and handling all YAML 1.2 spec features. The result is then serialized to indented JSON using JSON.stringify(). **No data leaves your machine** — the conversion is purely local.',
        },
        {
          type: 'p',
          text: 'YAML is a superset of JSON, meaning every valid JSON document is also valid YAML. The reverse is not true: YAML has features (comments, anchors, multi-line strings, multiple documents, custom tags) that have no JSON equivalent. These features are resolved or dropped during conversion.',
        },
        {
          type: 'code',
          label: 'YAML → JSON conversion',
          code: `# Input YAML (Kubernetes-style config):
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
    env: production
spec:
  replicas: 3
  containers:
    - name: app
      image: my-app:latest
      ports:
        - containerPort: 8080

// Output JSON:
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "my-app",
    "labels": { "app": "my-app", "env": "production" }
  },
  "spec": {
    "replicas": 3,
    "containers": [
      { "name": "app", "image": "my-app:latest", "ports": [{ "containerPort": 8080 }] }
    ]
  }
}`,
        },
      ],
    },
    {
      heading: 'Who uses YAML to JSON conversion',
      blocks: [
        {
          type: 'p',
          text: 'YAML is the dominant format for configuration files — Kubernetes, Docker Compose, GitHub Actions, Ansible, and most CI/CD tools use it. JSON is the dominant format for APIs and data interchange. Converting between them is a daily task for DevOps engineers, backend developers, and anyone working across configuration and runtime boundaries.',
        },
        {
          type: 'ul',
          items: [
            '**DevOps and SRE teams** — converting Kubernetes manifests or Helm chart values to JSON for programmatic processing or API submission.',
            '**CI/CD pipeline authors** — extracting structured data from GitHub Actions, GitLab CI, or CircleCI YAML files into JSON for analysis.',
            '**Backend developers** — consuming YAML config files in applications that use JSON for their internal data model.',
            '**Infrastructure as Code** — converting Ansible playbooks or Pulumi YAML configs to JSON for integration with Terraform or API-driven tools.',
            '**API developers** — testing API payloads by quickly converting YAML-formatted examples into JSON for use in curl, Postman, or Insomnia.',
            '**Config migration** — moving between YAML-based tools (docker-compose.yaml) and JSON-based alternatives (devcontainer.json).',
          ],
        },
      ],
    },
    {
      heading: 'YAML syntax and its JSON equivalent',
      blocks: [
        {
          type: 'p',
          text: 'YAML supports all JSON data types plus several YAML-specific features. The table below shows how the most common YAML constructs map to JSON. Features with no JSON equivalent are resolved to their closest equivalent or dropped during conversion.',
        },
        {
          type: 'table',
          headers: ['YAML syntax', 'JSON equivalent', 'Notes'],
          rows: [
            ['key: value',          '"key": "value"',             'Unquoted string'],
            ['key: 42',             '"key": 42',                  'Integer'],
            ['key: 3.14',           '"key": 3.14',                'Float'],
            ['key: true',           '"key": true',                'Boolean (true/false only in YAML 1.2)'],
            ['key: null or key: ~', '"key": null',                'Null value'],
            ['- item1\n- item2',    '["item1", "item2"]',         'Sequence → JSON array'],
            ['nested:\n  key: val', '{"nested":{"key":"val"}}',   'Mapping → JSON object'],
            ['| literal block',     '"literal\\nblock\\n"',       'Literal block → string with newlines'],
            ['> folded block',      '"folded block"',             'Folded block → single-line string'],
            ['&anchor / *alias',    '(value inlined)',            'Anchors resolved; names dropped'],
            ['# comment',           '(dropped)',                  'Comments have no JSON equivalent'],
          ],
        },
      ],
    },
    {
      heading: 'When to convert YAML to JSON — and when to keep YAML',
      blocks: [
        {
          type: 'h3',
          text: 'Convert to JSON when:',
        },
        {
          type: 'ul',
          items: [
            '**Target is an API or web service** — REST APIs and most web frameworks expect JSON-encoded payloads, not YAML.',
            '**Programmatic processing in JavaScript** — JSON.parse() is native; YAML requires a separate library like js-yaml.',
            '**NoSQL database import** — MongoDB, Firestore, and DynamoDB ingest JSON-like documents natively.',
            '**Debugging or type inspection** — JSON\'s strict quoting makes it easier to detect type errors; unquoted YAML values can be ambiguous.',
            '**Tool compatibility** — many data pipelines, ETL tools, and SaaS platforms accept only JSON for their import APIs.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep YAML when:',
        },
        {
          type: 'ul',
          items: [
            '**Human readability matters** — YAML is less noisy than JSON; no quotes around string keys, no commas between entries.',
            '**Comments are required** — YAML supports # comments; JSON does not. Config files with inline documentation must stay as YAML.',
            '**Anchors and aliases are used** — DRY config files using &anchor / *alias for repeated values must stay as YAML.',
            '**Multi-document files are needed** — YAML supports multiple documents in one file (separated by ---); JSON requires separate files.',
            '**Target tools are YAML-native** — Kubernetes, Ansible, Helm, GitHub Actions, and Docker Compose all use YAML as their primary format.',
          ],
        },
      ],
    },
    {
      heading: 'YAML features that don\'t survive JSON conversion',
      blocks: [
        {
          type: 'p',
          text: 'YAML is a richer format than JSON. When converting to JSON, some information is always lost because JSON has no equivalent constructs. Understanding what is dropped helps you decide whether conversion is appropriate for your use case.',
        },
        {
          type: 'ul',
          items: [
            '**Comments** — all # comment lines are stripped. If your YAML config relies on comments for documentation, store the original YAML file alongside the JSON.',
            '**Anchor names** — &anchor declarations are resolved and their values inlined at each *alias reference point. The anchor name itself is dropped from the JSON.',
            '**YAML tags** — explicit type tags (!!str, !!int) are applied by the parser but the tag names are not included in the JSON output.',
            '**Multi-document files** — YAML files with multiple --- separated documents are not directly supported. Convert each document separately.',
            '**Block style distinctions** — the choice between literal (|) and folded (>) block scalars affects whitespace, but both become regular strings in JSON.',
          ],
        },
        {
          type: 'code',
          label: 'Anchors and aliases resolved during conversion',
          code: `# YAML with anchors, aliases, and merge keys:
defaults: &defaults
  timeout: 30
  retries: 3

production:
  <<: *defaults
  host: prod.example.com

staging:
  <<: *defaults
  host: staging.example.com

// Output JSON (anchors resolved, merge keys expanded):
{
  "defaults":   { "timeout": 30, "retries": 3 },
  "production": { "timeout": 30, "retries": 3, "host": "prod.example.com" },
  "staging":    { "timeout": 30, "retries": 3, "host": "staging.example.com" }
}`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Which YAML version does the converter support?',
      answer: 'The converter uses js-yaml which implements the YAML 1.2 specification. YAML 1.2 fixes the Norway problem (NO was a boolean in YAML 1.1) and aligns boolean values with JSON (only true/false). Most modern tools — Kubernetes, Ansible, GitHub Actions — produce YAML that is compatible with 1.2.',
    },
    {
      question: 'What is the Norway problem in YAML?',
      answer: 'In YAML 1.1, the bare value NO was parsed as the boolean false — which caused the ISO country code "NO" (Norway) to become false when used as a map value. YAML 1.2 fixed this by accepting only true/false as booleans. This converter uses js-yaml in YAML 1.2 mode, so NO, YES, ON, OFF are treated as strings, not booleans.',
    },
    {
      question: 'Are YAML anchors and aliases supported?',
      answer: 'Yes. Anchors (&name) and aliases (*name) are fully resolved during conversion. Each alias is replaced with the value of its anchor. Merge keys (<<: *anchor) are also expanded. The anchor names themselves are not preserved in the JSON output — only the resolved values.',
    },
    {
      question: 'Are YAML comments preserved in the JSON output?',
      answer: 'No. YAML comments (lines starting with #) have no equivalent in JSON and are stripped during parsing. Store the original YAML file alongside the JSON if the comments are important for documentation.',
    },
    {
      question: 'How are YAML multi-line strings converted?',
      answer: 'Literal block scalars (|) preserve newlines: each line becomes a \\n in the JSON string. Folded block scalars (>) replace single newlines with spaces and preserve double newlines as single newlines — producing a more compact string. Both are output as regular JSON strings.',
    },
    {
      question: 'What happens to YAML null values?',
      answer: 'YAML null can be written as null, ~, or as an empty value (key: with nothing after). All three are converted to JSON null.',
    },
    {
      question: 'What happens to YAML booleans written as yes/no or on/off?',
      answer: 'In YAML 1.2 mode (used by this converter), yes, no, on, and off are treated as plain strings, not booleans. Only true and false are booleans. If your YAML was written for an older 1.1 parser that uses yes/no, replace those values with true/false before converting.',
    },
    {
      question: 'Does the converter support multi-document YAML files (separated by ---)?',
      answer: 'Only the first document is converted. YAML allows multiple documents in one file separated by --- or ..., but JSON has no equivalent. To convert all documents, split the YAML file at each --- separator and convert each section separately.',
    },
    {
      question: 'Are values in the JSON output the correct types?',
      answer: 'Yes. js-yaml applies YAML type coercions automatically: unquoted integers become JSON numbers, unquoted true/false become JSON booleans, null/~ become JSON null. Quoted values always become strings. If you see a number where you expected a string, quote the value in the YAML source: "42" instead of 42.',
    },
    {
      question: 'Can I convert a Kubernetes YAML manifest to JSON?',
      answer: 'Yes. Kubernetes manifests are standard YAML and convert cleanly to JSON. The JSON output can be used directly with the Kubernetes API, kubectl (which accepts both formats), or with tools like kustomize.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using the js-yaml library. No data is transmitted over the network — there are no privacy concerns and no file size limits.',
    },
    {
      question: 'Can I convert the JSON back to YAML?',
      answer: 'Yes — switch to "JSON → YAML" using the toggle above the tool. Note that YAML-specific features (comments, anchors, multi-line string style) cannot be recovered from JSON — the round-trip preserves structure and values but not YAML formatting choices.',
    },
  ],
  relatedTools: [
    { to: '/json-to-yaml', name: 'JSON to YAML', desc: 'Convert JSON back to clean YAML — the reverse direction' },
    { to: '/json-to-csv',  name: 'JSON to CSV',  desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/xml-to-json',  name: 'XML to JSON',  desc: 'Parse XML documents into formatted JSON — browser-based' },
    { to: '/json-to-xml',  name: 'JSON to XML',  desc: 'Convert JSON to a valid XML document — browser-based' },
  ],
}

// ─── json-to-yaml ─────────────────────────────────────────────────────────────

const JSON_TO_YAML = {
  howToTitle: 'How to convert JSON to YAML',
  howToSteps: [
    'Paste your JSON object or array into the input field.',
    'Click "Convert" — the clean, indented YAML output appears instantly.',
    'Switch to "YAML → JSON" using the toggle above if you need the reverse direction.',
    'Click "Copy" or "Download .yaml" to use the output in your config file, CI/CD pipeline, or Kubernetes manifest.',
    'Add YAML comments and anchors manually after conversion if needed — they cannot be inferred from JSON.',
  ],
  sections: [
    {
      heading: 'How the JSON to YAML converter works',
      blocks: [
        {
          type: 'p',
          text: 'The converter uses js-yaml, running entirely in your browser. When you click Convert, the JSON string is parsed into a JavaScript object with JSON.parse(), then js-yaml\'s dump() function serializes it to YAML with 2-space indentation. String values that contain special YAML characters or look like other data types are automatically quoted to prevent misinterpretation. **No data leaves your machine** — the conversion is purely local.',
        },
        {
          type: 'p',
          text: 'JSON is a strict subset of YAML, so every JSON value has a direct YAML equivalent. The conversion is always lossless in the JSON → YAML direction — all types, values, and structures are preserved exactly. Going back from YAML to JSON may lose YAML-specific features you add manually (comments, anchors, multi-line string style).',
        },
        {
          type: 'code',
          label: 'JSON object → YAML document conversion',
          code: `// Input JSON:
{
  "name": "my-app",
  "version": "1.0.0",
  "replicas": 3,
  "enabled": true,
  "config": {
    "host": "localhost",
    "port": 8080,
    "tags": ["api", "production"]
  }
}

# Output YAML:
name: my-app
version: 1.0.0
replicas: 3
enabled: true
config:
  host: localhost
  port: 8080
  tags:
    - api
    - production`,
        },
      ],
    },
    {
      heading: 'Who uses JSON to YAML conversion',
      blocks: [
        {
          type: 'p',
          text: 'JSON is common in APIs, package managers, and programmatic code generation. YAML is preferred for configuration files that humans read and edit. Converting JSON to YAML is the standard step when taking API output or generated config into a YAML-native tool.',
        },
        {
          type: 'ul',
          items: [
            '**DevOps and SRE teams** — converting JSON-formatted Kubernetes API responses or Terraform output into YAML manifests for source control.',
            '**CI/CD pipeline authors** — transforming JSON-based build configurations into GitHub Actions, GitLab CI, or CircleCI YAML.',
            '**Config file migration** — moving a project from JSON config (.eslintrc.json, prettier.json) to YAML (.eslintrc.yaml) for better readability.',
            '**Helm chart development** — converting JSON data into YAML values files for Kubernetes Helm charts.',
            '**API documentation** — transforming OpenAPI/Swagger JSON specs into YAML format for readability and version control.',
            '**Infrastructure as Code** — converting Pulumi or CDK JSON output to YAML for tools that prefer YAML input.',
          ],
        },
      ],
    },
    {
      heading: 'JSON types and their YAML representation',
      blocks: [
        {
          type: 'p',
          text: 'Every JSON type maps directly to a YAML type. The converter uses js-yaml\'s default serialization, which outputs clean unquoted values where possible and automatically adds quotes when a value could be misinterpreted by a YAML parser.',
        },
        {
          type: 'table',
          headers: ['JSON value', 'YAML output', 'Notes'],
          rows: [
            ['"string"',          'string',           'Unquoted when safe; quoted when special chars present'],
            ['"true" (string)',   '"true"',            'Quoted to avoid being parsed as boolean'],
            ['42 (number)',       '42',               'Unquoted integer'],
            ['3.14 (float)',      '3.14',             'Unquoted float'],
            ['true (boolean)',    'true',             'Unquoted boolean'],
            ['false (boolean)',   'false',            'Unquoted boolean'],
            ['null',              'null',             'Explicit null keyword'],
            ['[1, 2, 3]',        '- 1\\n- 2\\n- 3',   'Array → YAML block sequence'],
            ['{ "k": "v" }',     'k: v',             'Object → YAML block mapping'],
            ['"2023-01-01"',     '"2023-01-01"',     'Date-like strings are quoted to stay strings'],
          ],
        },
      ],
    },
    {
      heading: 'When to use YAML — and when to keep JSON',
      blocks: [
        {
          type: 'h3',
          text: 'Use YAML when:',
        },
        {
          type: 'ul',
          items: [
            '**Human readability is a priority** — YAML eliminates curly braces, square brackets, and double-quoted keys that make JSON hard to scan at a glance.',
            '**Comments are needed** — YAML supports # inline comments for documenting config options. JSON has no comment syntax.',
            '**Target tool is YAML-native** — Kubernetes, Ansible, Docker Compose, GitHub Actions, and Helm all use YAML as their primary format.',
            '**Repeated values can be extracted** — YAML anchors and aliases allow DRY config files where a shared block is defined once and referenced multiple times.',
            '**Multi-line strings appear in the config** — YAML\'s literal (|) and folded (>) block scalars are cleaner than JSON\'s escaped \\n sequences.',
          ],
        },
        {
          type: 'h3',
          text: 'Keep JSON when:',
        },
        {
          type: 'ul',
          items: [
            '**Programmatic generation** — code that builds configs at runtime produces JSON more reliably; YAML\'s indentation-based syntax is fragile to generate via string concatenation.',
            '**API payloads** — REST and GraphQL endpoints expect JSON; YAML is not a standard HTTP body format.',
            '**Strict type checking** — JSON\'s quoted strings prevent the ambiguous type coercions that YAML 1.1 introduces for values like NO, ON, and date-like strings.',
            '**Tooling expects JSON** — package managers (npm), bundlers (webpack, vite), and many IDE config systems use JSON exclusively.',
          ],
        },
      ],
    },
    {
      heading: 'YAML gotchas: special values and the Norway problem',
      blocks: [
        {
          type: 'p',
          text: 'YAML has several edge cases where an unquoted value is interpreted differently than you might expect. js-yaml handles these automatically when converting JSON to YAML — values that could be misread are quoted in the output. Understanding the rules helps when manually editing the resulting YAML.',
        },
        {
          type: 'ul',
          items: [
            '**The Norway problem** — in YAML 1.1, the bare value NO was parsed as false. This caused the country code "NO" to silently become a boolean. js-yaml uses YAML 1.2 but quotes ambiguous values for compatibility with older parsers.',
            '**Date-like strings** — the value 2023-01-01 is parsed as a Date object by some YAML parsers. js-yaml quotes date-like strings in the output to keep them as strings.',
            '**Octal numbers** — YAML 1.1 treated values starting with 0 as octal (010 was 8, not 10). YAML 1.2 treats these as integers; js-yaml preserves the correct value.',
            '**Empty values** — a YAML key: with no value becomes null in JSON. To produce an empty string, write key: "" in YAML.',
            '**Significant whitespace** — indentation is syntactically significant in YAML. The converter always outputs 2-space indentation; mixing tabs and spaces causes a parse error.',
          ],
        },
        {
          type: 'code',
          label: 'String values that js-yaml quotes automatically in YAML output',
          code: `// These JSON string values are automatically quoted in the YAML output:
{ "flag":  "true"       }  →  flag:  "true"       // bool without quotes
{ "code":  "NO"         }  →  code:  "NO"         // bool in YAML 1.1 without quotes
{ "date":  "2024-01-15" }  →  date:  "2024-01-15" // Date in some parsers without quotes
{ "num":   "42"         }  →  num:   "42"         // integer without quotes
{ "empty": ""           }  →  empty: ''           // empty string needs quotes

// Unquoted examples (safe values):
{ "name":   "Alice" }  →  name:   Alice
{ "count":  5       }  →  count:  5
{ "active": true    }  →  active: true`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is the JSON to YAML conversion lossless?',
      answer: 'Yes. Every JSON value has a direct YAML equivalent, so no information is lost when converting from JSON to YAML. The reverse is not true — YAML features like comments, anchors, and multi-line string style cannot be encoded in JSON and are lost when converting back.',
    },
    {
      question: 'Why are some string values quoted in the YAML output?',
      answer: 'js-yaml automatically quotes string values that could be misinterpreted as a different YAML type — for example, "true", "null", "42", "2024-01-01", and "NO" are quoted to prevent them from being parsed as boolean, null, integer, date, or boolean respectively. This is the correct behavior for safe round-tripping.',
    },
    {
      question: 'How are JSON arrays represented in YAML?',
      answer: 'JSON arrays become YAML block sequences. Each element is on its own line preceded by "- ". Nested arrays produce nested indented sequences. An empty array [] stays as [] in YAML (flow sequence style).',
    },
    {
      question: 'How are JSON objects represented in YAML?',
      answer: 'JSON objects become YAML block mappings. Each key-value pair is on its own line as key: value. Nested objects produce indented sub-mappings. An empty object {} stays as {} in YAML (flow mapping style).',
    },
    {
      question: 'Can I add YAML comments after conversion?',
      answer: 'Yes — open the downloaded .yaml file in any text editor and add # comments freely. YAML comments are ignored by parsers so they do not affect the data. Comments cannot be inferred from JSON because JSON has no comment syntax.',
    },
    {
      question: 'Can I add YAML anchors and aliases after conversion?',
      answer: 'Yes — manually edit the YAML output to add &anchor and *alias references for repeated values. The converter outputs flat YAML without anchors because JSON has no equivalent. Adding anchors is a manual optimization step for DRY config files.',
    },
    {
      question: 'What indentation style does the output use?',
      answer: 'The converter outputs 2-space indentation, which is the most common convention for YAML config files (Kubernetes, Ansible, and GitHub Actions all use 2 spaces). YAML is flexible about indentation size but 2 spaces is the recommended standard.',
    },
    {
      question: 'How is JSON null represented in YAML?',
      answer: 'JSON null is output as the YAML keyword null. YAML also accepts ~ as a shorthand for null, but this converter uses the explicit null spelling for clarity.',
    },
    {
      question: 'Does the converter support JSON arrays at the root level?',
      answer: 'Yes. A root-level JSON array converts to a YAML document starting with a sequence — each element on its own line preceded by "- ". This is valid YAML and supported by most parsers including those used in Kubernetes and Ansible.',
    },
    {
      question: 'Will the YAML output work with Kubernetes?',
      answer: 'Yes, provided the JSON input follows the Kubernetes API object structure (apiVersion, kind, metadata, spec). The output YAML is valid for use with kubectl apply, Helm, and kustomize. Kubernetes supports both JSON and YAML for all API objects.',
    },
    {
      question: 'Is any data sent to a server during conversion?',
      answer: 'No. The entire conversion runs in your browser using the js-yaml library. No data is transmitted over the network — there are no privacy concerns and no file size limits.',
    },
    {
      question: 'Can I convert the YAML back to JSON?',
      answer: 'Yes — switch to "YAML → JSON" using the toggle above the tool. The round-trip is lossless for structure and values. Any YAML comments or anchors you added manually after the initial conversion will not be preserved in the JSON.',
    },
  ],
  relatedTools: [
    { to: '/yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML back to formatted JSON — the reverse direction' },
    { to: '/json-to-csv',  name: 'JSON to CSV',  desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/xml-to-json',  name: 'XML to JSON',  desc: 'Parse XML documents into formatted JSON — browser-based' },
    { to: '/json-to-xml',  name: 'JSON to XML',  desc: 'Convert JSON to a valid XML document — browser-based' },
  ],
}

// ─── base64-encode ────────────────────────────────────────────────────────────

const BASE64_ENCODE = {
  howToTitle: 'How to encode text to Base64',
  howToSteps: [
    'Paste any text into the input field — plain text, JSON, XML, credentials, or any Unicode content including emoji.',
    'Click "Convert" — the Base64-encoded string appears instantly in the output panel.',
    'Switch to "Decode" using the toggle above if you need to decode Base64 back to text.',
    'Click "Copy" to copy the encoded string, or "Download .txt" to save the file.',
    'Use the output in a URL, HTTP header, data URI, JWT token, or any context that requires ASCII-safe encoding.',
  ],
  sections: [
    {
      heading: 'How Base64 encoding works',
      blocks: [
        {
          type: 'p',
          text: 'Base64 encoding converts arbitrary binary data into a string of 64 printable ASCII characters. The encoder reads input 3 bytes at a time, splits each group into four 6-bit values, and maps each value to a character from the Base64 alphabet (A–Z, a–z, 0–9, +, /). If the input length is not divisible by 3, one or two = padding characters are appended to make the output length a multiple of 4.',
        },
        {
          type: 'p',
          text: 'This converter uses the browser\'s **TextEncoder API** to handle full Unicode input — including emoji, CJK characters, Arabic, and Cyrillic — by encoding the text to UTF-8 bytes first, then encoding those bytes to Base64. This is the correct approach for multilingual text; using btoa() directly on Unicode strings throws an error for any character with a code point above 127.',
        },
        {
          type: 'code',
          label: 'How the converter encodes Unicode text to Base64',
          code: `// The converter uses TextEncoder for proper Unicode support:
function base64Encode(text) {
  const bytes  = new TextEncoder().encode(text)
  const binary = Array.from(bytes, b => String.fromCharCode(b)).join('')
  return btoa(binary)  // standard Base64
}

base64Encode('Hello, World!')  // → 'SGVsbG8sIFdvcmxkIQ=='
base64Encode('Привіт, світ!') // → correctly encoded (TextEncoder handles UTF-8)
base64Encode('Hello 🌍')       // → 'SGVsbG8g8J+MjQ=='

// btoa() alone throws for non-ASCII input:
btoa('Привіт')  // ❌ InvalidCharacterError`,
        },
      ],
    },
    {
      heading: 'Who uses Base64 encoding',
      blocks: [
        {
          type: 'p',
          text: 'Base64 is used whenever binary or arbitrary text data needs to be transmitted or stored in a context that only supports ASCII-safe characters — URLs, HTTP headers, email bodies, HTML attributes, and configuration files.',
        },
        {
          type: 'ul',
          items: [
            '**API authentication** — HTTP Basic Auth encodes credentials as Base64: Authorization: Basic base64(username:password). Every API using Basic Auth generates and decodes these strings.',
            '**JWT tokens** — the header and payload sections of a JSON Web Token are Base64URL-encoded. Inspecting the claims inside a JWT requires decoding these sections.',
            '**Data URIs** — embedding images, fonts, or SVGs directly in HTML or CSS as data:image/png;base64,... avoids additional HTTP requests.',
            '**Environment variables** — storing binary config (TLS certificates, private keys) in environment variables that only accept text strings.',
            '**Email attachments** — MIME encoding uses Base64 to transmit binary file attachments through email protocols that only support 7-bit ASCII.',
            '**Webhook payloads** — some platforms encode event data in Base64 before including it in a JSON payload to ensure safe transmission.',
          ],
        },
      ],
    },
    {
      heading: 'Base64 alphabet, output size, and variants',
      blocks: [
        {
          type: 'p',
          text: 'The standard Base64 alphabet uses 65 characters: 64 data characters plus = for padding. Base64URL (used in JWTs and URL parameters) replaces + with - and / with _ to avoid conflicts with URL-reserved characters.',
        },
        {
          type: 'table',
          headers: ['Value range', 'Characters', 'Count'],
          rows: [
            ['0–25',  'A–Z',                    '26'],
            ['26–51', 'a–z',                    '26'],
            ['52–61', '0–9',                    '10'],
            ['62',    '+ (or - in Base64URL)',   '1'],
            ['63',    '/ (or _ in Base64URL)',   '1'],
            ['pad',   '= (padding)',             '1 or 2'],
          ],
        },
        {
          type: 'p',
          text: 'Output size: every 3 bytes of input produce 4 Base64 characters. The encoded output is always 4/3 × the input byte length, rounded up to the nearest multiple of 4. "Hello" (5 bytes) encodes to "SGVsbG8=" (8 characters — a 60% size increase). **Base64 encoding always makes data larger, never smaller.**',
        },
      ],
    },
    {
      heading: 'When to use Base64 — and when not to',
      blocks: [
        {
          type: 'h3',
          text: 'Use Base64 encoding when:',
        },
        {
          type: 'ul',
          items: [
            '**The transport channel is ASCII-only** — email (SMTP), HTTP headers, URL query parameters, and some older protocols only support 7-bit ASCII characters.',
            '**Embedding binary data in text formats** — including images or fonts in CSS/HTML as data URIs, or embedding file contents in JSON or XML payloads.',
            '**Storing binary data in text fields** — database columns, environment variables, or config files that cannot hold raw binary bytes.',
            '**Protocol requirements specify it** — HTTP Basic Auth, JWT, and MIME email attachments all require Base64 encoding by specification.',
          ],
        },
        {
          type: 'h3',
          text: 'Do NOT use Base64 when:',
        },
        {
          type: 'ul',
          items: [
            '**You think it provides security** — Base64 is not encryption. Anyone can decode it instantly. Sensitive data encoded in Base64 is just as exposed as plain text.',
            '**You want to compress data** — Base64 expands output by ~33%. Use gzip or Brotli if you want smaller output.',
            '**The transport already handles binary** — modern HTTP APIs, WebSockets, and multipart form uploads do not require Base64 for binary payloads.',
            '**You\'re hiding passwords or tokens** — encoding a secret in Base64 and committing it to source code is not more secure than plain text. Use a secrets manager.',
          ],
        },
      ],
    },
    {
      heading: 'Common Base64 patterns you\'ll encounter',
      blocks: [
        {
          type: 'p',
          text: 'Once you recognize the Base64 pattern — blocks of letters, digits, + and /, ending with 0–2 = signs — you\'ll start noticing it in many places. The examples below show where Base64 appears in everyday web development.',
        },
        {
          type: 'code',
          label: 'Base64 in HTTP Basic Auth, JWT, and data URIs',
          code: `// HTTP Basic Auth header (username:password encoded):
Authorization: Basic dXNlcjpwYXNzd29yZA==
// Decoded: user:password

// JWT token (three Base64URL sections separated by dots):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← header (Base64URL)
.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFsaWNlIn0  ← payload (Base64URL)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← signature (binary)

// CSS data URI (SVG image embedded directly):
background-image: url(data:image/svg+xml;base64,PHN2Zy4uLj4=)

// HTML img tag with Base64 encoded image:
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is Base64 encoding used for?',
      answer: 'Base64 encoding converts binary data (including text) into a string of printable ASCII characters. It is used when data needs to be transmitted through channels that only support ASCII — HTTP Basic Auth headers, JWT tokens, data URIs in HTML/CSS, MIME email attachments, and environment variables storing binary secrets.',
    },
    {
      question: 'Is Base64 a form of encryption?',
      answer: 'No. Base64 is encoding, not encryption. It is a reversible transformation with no key — anyone can decode a Base64 string instantly. Do not use Base64 to protect sensitive data. Use proper encryption (AES, RSA) or a secrets management system for anything that needs to remain confidential.',
    },
    {
      question: 'Does Base64 encoding compress data?',
      answer: 'No — it makes data larger. Every 3 bytes of input produce 4 Base64 characters, so the output is approximately 33% larger than the input. If you want to reduce size, use a compression algorithm like gzip or Brotli before or instead of Base64.',
    },
    {
      question: 'Why does the output sometimes end with = or ==?',
      answer: 'Base64 encodes data in groups of 3 bytes. If the input length is not a multiple of 3, padding characters (=) are added to make the output length a multiple of 4. One = means the input had a remainder of 2 bytes; == means a remainder of 1 byte. This is standard and expected.',
    },
    {
      question: 'What is the difference between standard Base64 and Base64URL?',
      answer: 'Standard Base64 uses + and / as the 62nd and 63rd characters. Base64URL replaces + with - and / with _ to produce URL-safe strings that do not need percent-encoding in URLs. Base64URL is used in JWT tokens, URL query parameters, and file names. The = padding may also be omitted in Base64URL.',
    },
    {
      question: 'Does the converter support Unicode and emoji?',
      answer: 'Yes. The converter uses the browser\'s TextEncoder API to convert input to UTF-8 bytes before encoding. This correctly handles all Unicode — accented letters, CJK characters, Arabic, Cyrillic, and emoji. Using btoa() directly on non-ASCII text throws an InvalidCharacterError; the TextEncoder approach avoids this.',
    },
    {
      question: 'How do I decode a Base64 string I received?',
      answer: 'Switch to "Decode" using the toggle above the tool, paste the Base64 string, and click Convert. The decoded plain text appears instantly. This is useful for inspecting JWT payload claims, HTTP Basic Auth credentials, or any Base64-encoded data you receive.',
    },
    {
      question: 'Can I encode binary files (images, PDFs) with this tool?',
      answer: 'This converter is designed for text input — it treats the input as a UTF-8 string. For encoding binary files as Base64 data URIs, use a file encoder that reads raw bytes directly. This tool correctly encodes any Unicode text, including JSON, XML, HTML, and code snippets.',
    },
    {
      question: 'What is a data URI and how does Base64 relate to it?',
      answer: 'A data URI embeds file content directly in a URL: data:[mediatype];base64,[encoded content]. For example, data:image/png;base64,iVBORw0K... embeds a PNG image inline in HTML or CSS. The file bytes are Base64-encoded to produce the ASCII-safe string after the comma.',
    },
    {
      question: 'How large is the Base64 output compared to the input?',
      answer: 'The output is approximately 33% larger than the input. Every 3 input bytes produce 4 Base64 characters. A 3 KB text file becomes a ~4 KB Base64 string. This overhead is the standard trade-off for ASCII-safe encoding.',
    },
    {
      question: 'Is any data sent to a server during encoding?',
      answer: 'No. The entire encoding runs in your browser using the built-in TextEncoder and btoa() APIs. No data is transmitted over the network — there are no privacy concerns, no file size limits, and no rate limits.',
    },
    {
      question: 'What characters appear in a valid Base64 string?',
      answer: 'Standard Base64 uses only A–Z, a–z, 0–9, +, /, and = (padding). If you see - and _ instead of + and /, the string is Base64URL-encoded (used in JWTs and URL parameters). If you see other characters, the string may be corrupted or URL-encoded.',
    },
  ],
  relatedTools: [
    { to: '/base64-decode',    name: 'Base64 Decode',    desc: 'Decode Base64 strings back to plain text — the reverse direction' },
    { to: '/html-to-markdown', name: 'HTML to Markdown', desc: 'Convert HTML to clean Markdown for docs and READMEs' },
    { to: '/json-to-csv',      name: 'JSON to CSV',      desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/yaml-to-json',     name: 'YAML to JSON',     desc: 'Convert YAML to formatted JSON — browser-based' },
  ],
}

// ─── base64-decode ────────────────────────────────────────────────────────────

const BASE64_DECODE = {
  howToTitle: 'How to decode Base64 to plain text',
  howToSteps: [
    'Paste the Base64-encoded string into the input field — a JWT payload, HTTP auth header, data URI content, or any Base64 string.',
    'Click "Convert" — the decoded plain text output appears instantly.',
    'Switch to "Encode" using the toggle above if you need to encode text to Base64.',
    'Click "Copy" to copy the decoded text, or "Download .txt" to save the file.',
    'Inspect the decoded content — API keys, JWT claims, config values, or any text that was encoded for safe transmission.',
  ],
  sections: [
    {
      heading: 'How Base64 decoding works',
      blocks: [
        {
          type: 'p',
          text: 'Base64 decoding reverses the encoding: the input string of Base64 characters is read 4 characters at a time, each group is mapped back to three bytes using the 6-bit values from the Base64 alphabet, and the resulting byte sequence is interpreted as UTF-8 text. This converter uses the browser\'s **TextDecoder API** to correctly handle the full Unicode range — including multibyte characters like emoji, CJK, and accented letters. **No data leaves your machine** — the conversion runs entirely in your browser.',
        },
        {
          type: 'p',
          text: 'The decoder accepts both standard Base64 (using + and /) and Base64URL (using - and _). It handles optional = padding and strips leading/trailing whitespace automatically, making it practical for decoding strings copied from JWT tokens, HTTP headers, and logs where extra whitespace is common.',
        },
        {
          type: 'code',
          label: 'How the converter decodes Base64 to Unicode text',
          code: `// The converter uses TextDecoder for proper Unicode support:
function base64Decode(encoded) {
  const normalized = encoded.trim()
    .replace(/-/g, '+').replace(/_/g, '/')  // Base64URL → standard
  const binary = atob(normalized)
  const bytes  = Uint8Array.from(binary, c => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)    // UTF-8 bytes → Unicode string
}

base64Decode('SGVsbG8sIFdvcmxkIQ==')   // → 'Hello, World!'
base64Decode('eyJuYW1lIjoiQWxpY2UifQ') // → '{"name":"Alice"}' (JWT payload)
base64Decode('SGVsbG8g8J+MjQ==')        // → 'Hello 🌍'`,
        },
      ],
    },
    {
      heading: 'Common Base64 data you might decode',
      blocks: [
        {
          type: 'p',
          text: 'Base64-encoded strings appear in many places in web development and system administration. Knowing the source helps you understand what to expect from the decoded output.',
        },
        {
          type: 'ul',
          items: [
            '**JWT tokens** — JSON Web Tokens have three Base64URL sections separated by dots. Decoding the second section (payload) reveals the claims: user ID, expiration time, roles, and other metadata. The third section (signature) is binary and will produce unreadable output.',
            '**HTTP Basic Auth** — the Authorization: Basic ... header contains Base64(username:password). Decoding it reveals the credentials in plaintext, which is why HTTPS is required for Basic Auth.',
            '**Data URIs** — data:image/png;base64,... or data:application/json;base64,... strings can be decoded to reveal embedded file content or JSON payloads.',
            '**API keys in config files** — some platforms store API keys, certificates, or secrets as Base64 in environment variables or YAML config files.',
            '**Email MIME headers** — encoded subject lines and attachment filenames use Base64: =?UTF-8?B?...?=',
            '**Debug logs** — some systems log payloads as Base64 to avoid special character issues in log files.',
          ],
        },
      ],
    },
    {
      heading: 'Base64 variants: standard, URL-safe, and MIME',
      blocks: [
        {
          type: 'p',
          text: 'There are several Base64 variants that differ in their alphabet and line handling. This converter handles the two most common variants automatically:',
        },
        {
          type: 'table',
          headers: ['Variant', 'Characters 62/63', 'Padding', 'Used in'],
          rows: [
            ['Standard Base64', '+ and /', '= required',  'MIME email, data URIs, HTTP Basic Auth'],
            ['Base64URL',       '- and _', '= optional',  'JWT tokens, URL parameters, filenames'],
            ['MIME Base64',     '+ and /', '= required',  'Email attachments (76-char line breaks)'],
          ],
        },
        {
          type: 'p',
          text: 'The decoder automatically normalizes Base64URL input (- → +, _ → /) before decoding, so you can paste JWT payload sections or URL parameters directly without manually converting them to standard Base64 first.',
        },
      ],
    },
    {
      heading: 'When Base64 decoding fails and why',
      blocks: [
        {
          type: 'h3',
          text: 'Common reasons decoding fails:',
        },
        {
          type: 'ul',
          items: [
            '**Invalid characters** — standard Base64 only uses A–Z, a–z, 0–9, +, /, and =. Characters like spaces, commas, or line breaks outside the alphabet cause a decode error. Strip or clean extra characters first.',
            '**Incorrect length** — Base64 strings must have a length that is a multiple of 4 (with padding). Missing = characters cause a length error. Try adding one or two = at the end.',
            '**URL-encoded characters** — Base64 strings in URLs may have + replaced with %2B and = replaced with %3D. URL-decode the string first before pasting.',
            '**Partial strings** — copying only part of a Base64 string (from a truncated log line) produces invalid input. Make sure the complete encoded string is pasted.',
            '**Non-UTF-8 binary output** — if the decoded bytes are binary file data rather than UTF-8 text, the output will appear garbled. This decoder is designed for text input and output.',
          ],
        },
        {
          type: 'code',
          label: 'Decoding a JWT payload section',
          code: `// A JWT has three dot-separated sections:
// header.payload.signature

// To inspect claims, copy only the second section:
// eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNjE2MjM5MDIyfQ

// Decoded output:
// {"sub":"1234","name":"Alice","iat":1616239022}

// ⚠️ The third section (signature) is cryptographic binary.
// Decoding it produces unreadable characters — this is expected.
// Only decode the header (first section) and payload (second section).`,
        },
      ],
    },
    {
      heading: 'Security: what Base64 decoding reveals',
      blocks: [
        {
          type: 'p',
          text: 'Base64 encoding provides no security — it is a public, standardized encoding with no key. Anything encoded in Base64 can be decoded by anyone instantly. This has important implications for web security:',
        },
        {
          type: 'ul',
          items: [
            '**JWT payloads are public** — the header and payload of a JWT are Base64URL-encoded with no encryption. Anyone with the token can decode the payload and read all claims. The signature verifies authenticity but does not hide the content.',
            '**HTTP Basic Auth is plaintext exposure** — the Authorization: Basic header transmits username and password Base64-encoded, which is equivalent to plaintext. Always use HTTPS with Basic Auth; without TLS, credentials are trivially extractable.',
            '**"Obfuscated" configs are not secure** — storing secrets as Base64 in source code or config files does not protect them. Use a proper secrets manager (Vault, AWS Secrets Manager, GitHub Secrets) for sensitive values.',
            '**Data URIs can contain executable content** — data:text/html;base64,... and data:application/javascript;base64,... can embed HTML or JavaScript. Modern browsers restrict these in certain contexts as a security measure.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is Base64 and why is it used?',
      answer: 'Base64 is an encoding scheme that converts binary data into a string of 64 printable ASCII characters. It is used when data needs to be safely transmitted through systems that only support ASCII — such as HTTP headers, email bodies, URLs, and configuration files.',
    },
    {
      question: 'Can this tool decode Base64URL (used in JWT tokens)?',
      answer: 'Yes. The decoder automatically normalizes Base64URL encoding (- → +, _ → /) before decoding. You can paste a JWT payload section directly — the Base64URL variant is handled transparently without any manual conversion.',
    },
    {
      question: 'How do I decode a JWT token payload?',
      answer: 'A JWT has three sections separated by dots: header.payload.signature. Copy only the second section (the payload — the middle part). Paste it into the decoder and click Convert. The output is the JSON object containing the token\'s claims (user ID, expiration, roles, etc.). Do not try to decode the third section (signature) — it is binary and produces unreadable output.',
    },
    {
      question: 'What does "invalid Base64 input" mean?',
      answer: 'The input contains characters not in the Base64 alphabet, has an incorrect length, or has missing padding. Common causes: extra spaces or newlines in the pasted string, URL-encoded + as %2B, or copying only part of a Base64 string. Strip whitespace, URL-decode if needed, and make sure the full string is pasted.',
    },
    {
      question: 'Does the decoder support Unicode output (emoji, CJK, accented letters)?',
      answer: 'Yes. The converter uses the browser\'s TextDecoder API to interpret the decoded bytes as UTF-8. Any text that was encoded as UTF-8 — including all Unicode characters — will be correctly decoded to its original form.',
    },
    {
      question: 'Can I decode a data URI with this tool?',
      answer: 'Yes — copy the Base64 portion after the comma: data:...;base64,COPY_THIS_PART. If the data URI encodes text (JSON, SVG, HTML, XML), the decoded output is readable text. If it encodes a binary file (PNG, PDF, font), the decoded bytes will appear as garbled symbols — this tool is designed for text-based data.',
    },
    {
      question: 'Is Base64 the same as encryption?',
      answer: 'No. Base64 is encoding, not encryption. It has no key, no secret, and no security guarantee. Anyone who has a Base64-encoded string can decode it instantly. Never rely on Base64 to protect sensitive information.',
    },
    {
      question: 'Why does the decoded output look garbled or contain symbols?',
      answer: 'This happens when the Base64-encoded source is binary data (an image, a PDF, a compiled binary) rather than UTF-8 text. The decoded bytes are not valid UTF-8, so the TextDecoder produces replacement characters. This decoder is designed for text inputs; binary file content will not decode to readable text.',
    },
    {
      question: 'Does the decoder handle missing = padding?',
      answer: 'Yes. The decoder adds missing = padding automatically before passing the string to atob(). Base64URL encoding often omits = characters, so this normalization is needed for JWT tokens and URL parameters.',
    },
    {
      question: 'What is the difference between decoding and decrypting?',
      answer: 'Decoding reverses an encoding transformation — it is deterministic and requires no key. Base64 decoding always produces the same output for the same input. Decrypting reverses encryption — it requires a secret key and produces gibberish without the correct key. Base64 is encoding; AES and RSA are encryption.',
    },
    {
      question: 'Is any data sent to a server during decoding?',
      answer: 'No. The entire decoding runs in your browser using the built-in atob() and TextDecoder APIs. No data is transmitted over the network — there are no privacy concerns and no file size limits.',
    },
    {
      question: 'Can I decode multiple Base64 strings at once?',
      answer: 'The decoder processes one string at a time. For bulk decoding in code, the equivalent call is: new TextDecoder().decode(Uint8Array.from(atob(str), c => c.charCodeAt(0))). This handles the same Unicode normalization as this converter.',
    },
  ],
  relatedTools: [
    { to: '/base64-encode',    name: 'Base64 Encode',    desc: 'Encode plain text to Base64 — the reverse direction' },
    { to: '/html-to-markdown', name: 'HTML to Markdown', desc: 'Convert HTML to clean Markdown for docs and READMEs' },
    { to: '/json-to-csv',      name: 'JSON to CSV',      desc: 'Export JSON arrays to CSV — choose delimiter, download instantly' },
    { to: '/yaml-to-json',     name: 'YAML to JSON',     desc: 'Convert YAML to formatted JSON — browser-based' },
  ],
}

// ─── Content map ──────────────────────────────────────────────────────────────

const CONTENT_BY_SLUG = {
  'html-to-markdown': HTML_TO_MARKDOWN,
  'markdown-to-html': MARKDOWN_TO_HTML,
  'html-to-jsx':      HTML_TO_JSX,
  'jsx-to-html':      JSX_TO_HTML,
  'json-to-csv':      JSON_TO_CSV,
  'csv-to-json':      CSV_TO_JSON,
  'xml-to-json':      XML_TO_JSON,
  'json-to-xml':      JSON_TO_XML,
  'yaml-to-json':     YAML_TO_JSON,
  'json-to-yaml':     JSON_TO_YAML,
  'base64-encode':    BASE64_ENCODE,
  'base64-decode':    BASE64_DECODE,
}

export function buildContent(slug) {
  return CONTENT_BY_SLUG[slug] ?? null
}
