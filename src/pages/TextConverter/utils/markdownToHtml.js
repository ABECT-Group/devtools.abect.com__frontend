import { marked } from 'marked'

export function markdownToHtml(markdown) {
  if (!markdown.trim()) return ''
  return marked(markdown)
}
