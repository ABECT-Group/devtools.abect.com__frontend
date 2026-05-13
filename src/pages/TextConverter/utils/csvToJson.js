function parseRow(line, delimiter) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === delimiter && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

export function csvToJson(input, delimiter = ',') {
  const lines = input.trim().split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row.')

  const headers = parseRow(lines[0], delimiter)
  const rows = lines.slice(1).map(line => {
    const values = parseRow(line, delimiter)
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
  })

  return JSON.stringify(rows, null, 2)
}
