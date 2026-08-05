// js-yaml is loaded on first use — see the note in markdownToHtml.js
export async function jsonToYaml(input) {
  const parsed = JSON.parse(input)
  const { dump } = await import('js-yaml')
  return dump(parsed, { indent: 2, lineWidth: -1 })
}
