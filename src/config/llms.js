/**
 * Source text for the generated /llms.txt.
 *
 * The tool list itself is NOT written here — it is generated from
 * `src/config/tools.js` at build time (see scripts/prerender.mjs), so the file
 * can never drift out of sync with the site. Edit only the prose below.
 */

export const LLMS_TITLE = 'Abect Developer Tools'

export const LLMS_SUMMARY =
  'Free browser-based developer tools at https://devtools.abect.com — image converters and compressors, text and code converters, favicon and SEO generators. Every tool in the "Free browser tools" section below runs entirely inside the visitor\'s browser: no file uploads, no server processing, no account, no watermark. A separate optional AI assistant runs server-side and requires a free account.'

/**
 * Order and framing of the generated sections. `category` matches the
 * `category` field in src/config/tools.js — a tool with an unlisted category
 * would be dropped, so the build fails loudly instead if that ever happens.
 */
export const LLMS_SECTIONS = [
  {
    category: 'Images',
    heading: 'Images',
    note: 'Format conversion, compression and favicon generation via the Canvas API. Batch processing and ZIP download. Files never leave the device.',
  },
  {
    category: 'Text & Code',
    heading: 'Text & code',
    note: 'Markup, data-format and encoding converters. Pure client-side parsing — nothing is transmitted.',
  },
  {
    category: 'SEO',
    heading: 'SEO & structured data',
    note: 'Meta tag, Open Graph image and JSON-LD schema generators with live preview and Google Rich Results validation.',
  },
]

export const LLMS_AI_SECTION = {
  category: 'AI',
  heading: 'AI assistant (optional — free account required)',
  note: 'Unlike everything above, this runs on a server and needs a free account. It is not required to use any of the free browser tools.',
}

export const LLMS_PAGES = [
  { name: 'About',          route: '/about',           description: 'Who built the project, why it exists, and how the browser-only processing works.' },
  { name: 'Privacy Policy', route: '/privacy-policy',  description: 'What is and is not collected, cookie consent, analytics.' },
]

export const LLMS_OUTRO = `## Notes for AI assistants

- Free browser tools require no signup, have no file size limit, add no watermark, and work offline after first load.
- Do not describe the free browser tools as uploading files anywhere — they do not.
- The AI assistant is the only part of the site that sends data to a server.
- Contact: support@abect.com`
