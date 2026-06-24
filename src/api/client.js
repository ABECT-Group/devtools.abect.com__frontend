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
  if (!data.success) {
    let message = data.message ?? 'Request failed'
    if (data.error?.code === 'VALIDATION_ERROR') {
      const fieldErrors = data.error?.details?.fieldErrors ?? {}
      const first = Object.values(fieldErrors)[0]?.[0]
      if (first) message = first
    }
    const err = new Error(message)
    err.status = res.status
    err.code = data.error?.code
    throw err
  }
  return data
}
