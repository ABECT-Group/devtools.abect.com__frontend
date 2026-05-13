import { load } from 'js-yaml'

export function yamlToJson(input) {
  const parsed = load(input)
  if (parsed === undefined) throw new Error('Empty or invalid YAML input.')
  return JSON.stringify(parsed, null, 2)
}
