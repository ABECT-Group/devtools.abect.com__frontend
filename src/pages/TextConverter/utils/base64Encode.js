export function base64Encode(input) {
  if (!input) return ''
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  bytes.forEach(b => { binary += String.fromCharCode(b) })
  return btoa(binary)
}
