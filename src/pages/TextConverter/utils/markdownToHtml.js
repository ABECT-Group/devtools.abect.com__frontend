import { marked } from 'marked'

export function markdownToHtml(markdown) {
  if (!markdown.trim()) return ''
  // marked v18 uses ~~? which matches both ~ and ~~ as <del>.
  // Escape single tildes (not part of ~~) so only ~~ produces <del>.
  const processed = markdown.replace(/(?<!~)~(?!~)/g, '\\~')
  return marked(processed)
}
