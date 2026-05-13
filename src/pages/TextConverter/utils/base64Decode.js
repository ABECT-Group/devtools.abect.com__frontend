export function base64Decode(input) {
  const clean = input.trim()
  if (!clean) return ''
  try {
    const binary = atob(clean)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return new TextDecoder().decode(bytes)
  } catch {
    throw new Error('Invalid Base64 string. Make sure the input is properly encoded.')
  }
}
