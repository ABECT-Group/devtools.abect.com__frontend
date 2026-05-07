export function formatOutput(jsonLd) {
  return JSON.stringify(jsonLd, null, 2)
}

export function formatScriptTag(jsonLd) {
  const isEmpty = !jsonLd || Object.keys(jsonLd).length <= 1
  if (isEmpty) return ''
  return `<script type="application/ld+json">\n${formatOutput(jsonLd)}\n</script>`
}
