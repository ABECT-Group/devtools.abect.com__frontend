import TurndownService from 'turndown'

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

export function htmlToMarkdown(html) {
  if (!html.trim()) return ''
  return td.turndown(html)
}
