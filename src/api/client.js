const BASE = import.meta.env.VITE_API_URL

export const request = async (method, path, { body, token } = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.message ?? 'Request failed')
  return data
}
