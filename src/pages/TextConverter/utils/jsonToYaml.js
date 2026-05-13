import { dump } from 'js-yaml'

export function jsonToYaml(input) {
  const parsed = JSON.parse(input)
  return dump(parsed, { indent: 2, lineWidth: -1 })
}
