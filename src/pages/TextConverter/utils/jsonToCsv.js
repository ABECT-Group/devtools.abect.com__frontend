function escapeCell(val, delimiter) {
  const str = val === null || val === undefined ? '' : String(val)
  if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function jsonToCsv(input, delimiter = ',') {
  const data = JSON.parse(input)
  if (!Array.isArray(data)) throw new Error('Input must be a JSON array of objects.')
  if (data.length === 0) return ''

  const headers = [...new Set(data.flatMap(row => Object.keys(row)))]
  const rows = [
    headers.map(h => escapeCell(h, delimiter)).join(delimiter),
    ...data.map(row => headers.map(h => escapeCell(row[h], delimiter)).join(delimiter)),
  ]

  return rows.join('\n')
}
