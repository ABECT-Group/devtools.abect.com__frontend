/**
 * marked, turndown and js-yaml are only needed once the user presses Convert,
 * so they are imported dynamically instead of being bundled into the entry
 * chunk that every one of the 50+ prerendered pages downloads.
 *
 * The parser is cached after the first call, so repeated conversions do not
 * pay the import cost again.
 */
let markedPromise = null

function getMarked() {
  markedPromise ??= import('marked').then(m => m.marked)
  return markedPromise
}

export async function markdownToHtml(markdown) {
  if (!markdown.trim()) return ''
  const marked = await getMarked()
  // marked v18 uses ~~? which matches both ~ and ~~ as <del>.
  // Escape single tildes (not part of ~~) so only ~~ produces <del>.
  const processed = markdown.replace(/(?<!~)~(?!~)/g, '\\~')
  return marked(processed)
}
