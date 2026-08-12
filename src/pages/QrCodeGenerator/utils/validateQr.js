import { QR_TYPES } from '../data/types'

// Version 40 at ECC level L holds 2 953 bytes; higher correction levels hold
// far less. A vCard with a long address or an event with a description can
// realistically exceed the limit, and the user deserves a clear message
// instead of a thrown exception.
const CAPACITY = {
  L: 2953,
  M: 2331,
  Q: 1663,
  H: 1273,
}

export function validateQr(type, values, payload, ecc) {
  const config = QR_TYPES[type]
  if (!config) return { missing: [], warnings: [], isValid: false }

  const missing = []
  const warnings = []

  config.fields.filter(field => field.required).forEach(field => {
    const value = values[field.key]
    if (value === undefined || value === null || value === '') {
      missing.push(field.label)
    }
  })

  // Byte length, not string length — non-Latin text costs more than one byte
  // per character and is exactly where capacity surprises come from.
  const byteLength = new TextEncoder().encode(payload).length
  const limit = CAPACITY[ecc] ?? CAPACITY.M

  if (byteLength > limit) {
    missing.push(`Content is too long — ${byteLength} bytes, limit is ${limit} at level ${ecc}`)
  } else if (byteLength > limit * 0.8) {
    warnings.push(`Approaching the capacity limit — ${byteLength} of ${limit} bytes`)
  }

  config.fields.filter(field => field.maxLength).forEach(field => {
    const length = values[field.key]?.length ?? 0
    if (length > field.maxLength) {
      warnings.push(`${field.label}: ${length} / ${field.maxLength} characters`)
    }
  })

  return {
    missing,
    warnings,
    isValid: missing.length === 0 && payload.length > 0,
    byteLength,
    capacity: limit,
  }
}
