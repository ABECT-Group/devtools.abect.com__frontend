// Turndown is loaded on first conversion, not on page load — see the note in
// markdownToHtml.js for why these four converters are async.
let tdPromise = null

function getTurndown() {
  tdPromise ??= import('turndown').then(({ default: TurndownService }) => {
    const td = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
    })

    td.addRule('strikethrough', {
      filter: ['del', 's', 'strike'],
      replacement: (content) => `~~${content}~~`,
    })

    return td
  })
  return tdPromise
}

export async function htmlToMarkdown(html) {
  if (!html.trim()) return ''
  const td = await getTurndown()
  return td.turndown(html)
}
