function parseNode(node) {
  const obj = {}

  if (node.attributes && node.attributes.length > 0) {
    obj['@attributes'] = {}
    for (const attr of node.attributes) {
      obj['@attributes'][attr.name] = attr.value
    }
  }

  for (const child of node.childNodes) {
    if (child.nodeType === 3 || child.nodeType === 4) { // TEXT_NODE or CDATA_SECTION_NODE
      const text = child.nodeType === 4 ? child.textContent : child.textContent.trim()
      if (text) obj['#text'] = text
    } else if (child.nodeType === 1) { // ELEMENT_NODE
      const childData = parseNode(child)
      const name = child.nodeName
      if (obj[name] !== undefined) {
        if (!Array.isArray(obj[name])) obj[name] = [obj[name]]
        obj[name].push(childData)
      } else {
        obj[name] = childData
      }
    }
  }

  return obj
}

export function xmlToJson(input) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(input.trim(), 'text/xml')
  const errorNode = doc.querySelector('parsererror')
  if (errorNode) throw new Error('Invalid XML: ' + errorNode.textContent.split('\n')[0])

  const root = doc.documentElement
  return JSON.stringify({ [root.nodeName]: parseNode(root) }, null, 2)
}
