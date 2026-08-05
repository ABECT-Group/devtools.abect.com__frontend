// js-yaml is loaded on first use — see the note in markdownToHtml.js
export async function yamlToJson(input) {
  const { load } = await import('js-yaml')
  const parsed = load(input)
  if (parsed === undefined) throw new Error('Empty or invalid YAML input.')
  return JSON.stringify(parsed, null, 2)
}
