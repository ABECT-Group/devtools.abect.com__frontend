// Pure function — no side effects, no DOM. Turns form values into the exact
// string that gets encoded into the QR matrix.
//
// Every format below is a real spec that scanners parse literally, so the
// escaping rules are not cosmetic: an unescaped ";" in a Wi-Fi password
// silently truncates the credentials, and LF instead of CRLF makes some
// iOS contact importers reject the whole vCard.

function f(value) {
  if (value === '' || value === undefined || value === null) return undefined
  return String(value)
}

/**
 * Wi-Fi (WIFI:) and MECARD-style formats reserve these five characters.
 * They must be backslash-escaped inside SSID and password values.
 */
function escapeWifi(value) {
  return value.replace(/([\\;,:"])/g, '\\$1')
}

/**
 * vCard / iCalendar (RFC 6350 §3.4, RFC 5545 §3.3.11) escaping.
 * Backslash first — otherwise the backslashes we add below get double-escaped.
 */
function escapeVcard(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** Phone numbers travel as digits only — wa.me rejects +, spaces and dashes. */
function digitsOnly(value) {
  return value.replace(/\D/g, '')
}

/** Joins non-empty vCard/iCal lines with CRLF, as both specs require. */
function joinLines(lines) {
  return lines.filter(Boolean).join('\r\n')
}

/**
 * Local date + time → iCalendar UTC stamp (YYYYMMDDTHHMMSSZ).
 * Returns undefined for an unparseable pair so the property is dropped
 * rather than emitted as "Invalid Date".
 */
function toIcalUtc(dateStr, timeStr) {
  if (!dateStr) return undefined
  const date = new Date(`${dateStr}T${timeStr || '00:00'}`)
  if (Number.isNaN(date.getTime())) return undefined
  return `${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
}

/** All-day events use a DATE value, not a DATE-TIME. */
function toIcalDate(dateStr) {
  if (!dateStr) return undefined
  return dateStr.replace(/-/g, '')
}

/** Builds a query string from defined values only; returns '' when all empty. */
function buildQuery(params) {
  const parts = Object.entries(params)
    .filter(([, v]) => f(v) !== undefined)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
  return parts.length ? `?${parts.join('&')}` : ''
}

// ─── Encoders ─────────────────────────────────────────────────────────────────

/** URL, plain text, PDF link and app-store link are all raw strings. */
function encodeRaw(v) {
  return f(v.content) ?? ''
}

function encodeWifi(v) {
  const encryption = f(v.encryption) || 'WPA'
  const ssid = f(v.ssid)
  if (!ssid) return ''

  const parts = [`T:${encryption}`, `S:${escapeWifi(ssid)}`]

  // An open network carries no password field at all — an empty P: makes
  // some Android builds prompt for a key that does not exist.
  if (encryption !== 'nopass') {
    const password = f(v.password)
    if (password) parts.push(`P:${escapeWifi(password)}`)
  }

  if (v.hidden) parts.push('H:true')

  return `WIFI:${parts.join(';')};;`
}

function encodeVcard(v) {
  const first = f(v.firstName) ?? ''
  const last = f(v.lastName) ?? ''
  const fullName = [first, last].filter(Boolean).join(' ')
  if (!fullName) return ''

  const address = [
    f(v.street), f(v.city), f(v.region), f(v.zip), f(v.country),
  ].some(Boolean)
    ? `ADR;TYPE=WORK:;;${escapeVcard(f(v.street) ?? '')};${escapeVcard(f(v.city) ?? '')};${escapeVcard(f(v.region) ?? '')};${escapeVcard(f(v.zip) ?? '')};${escapeVcard(f(v.country) ?? '')}`
    : undefined

  return joinLines([
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVcard(last)};${escapeVcard(first)};;;`,
    `FN:${escapeVcard(fullName)}`,
    f(v.organization) && `ORG:${escapeVcard(v.organization)}`,
    f(v.jobTitle) && `TITLE:${escapeVcard(v.jobTitle)}`,
    f(v.mobile) && `TEL;TYPE=CELL:${escapeVcard(v.mobile)}`,
    f(v.phone) && `TEL;TYPE=WORK:${escapeVcard(v.phone)}`,
    f(v.email) && `EMAIL:${escapeVcard(v.email)}`,
    f(v.website) && `URL:${escapeVcard(v.website)}`,
    address,
    f(v.note) && `NOTE:${escapeVcard(v.note)}`,
    'END:VCARD',
  ])
}

function encodeEmail(v) {
  const address = f(v.email)
  if (!address) return ''
  return `mailto:${address}${buildQuery({ subject: v.subject, body: v.body })}`
}

function encodePhone(v) {
  const number = f(v.phone)
  return number ? `tel:${number}` : ''
}

function encodeSms(v) {
  const number = f(v.phone)
  if (!number) return ''
  const message = f(v.message)
  return message ? `SMSTO:${number}:${message}` : `SMSTO:${number}:`
}

function encodeWhatsapp(v) {
  const raw = f(v.phone)
  if (!raw) return ''
  const number = digitsOnly(raw)
  if (!number) return ''
  return `https://wa.me/${number}${buildQuery({ text: v.message })}`
}

function encodeLocation(v) {
  const lat = f(v.latitude)
  const lng = f(v.longitude)
  if (!lat || !lng) return ''

  // geo: opens the OS default map app; the Maps URL always opens Google Maps.
  // The page content explains why that difference matters.
  if (v.linkType === 'maps') {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`
  }
  return `geo:${lat},${lng}`
}

function encodeEvent(v) {
  const title = f(v.title)
  if (!title) return ''

  const isAllDay = Boolean(v.allDay)
  const start = isAllDay
    ? toIcalDate(f(v.startDate))
    : toIcalUtc(f(v.startDate), f(v.startTime))
  const end = isAllDay
    ? toIcalDate(f(v.endDate))
    : toIcalUtc(f(v.endDate), f(v.endTime))

  const startLine = start && (isAllDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`)
  const endLine = end && (isAllDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`)

  return joinLines([
    'BEGIN:VEVENT',
    `SUMMARY:${escapeVcard(title)}`,
    startLine,
    endLine,
    f(v.location) && `LOCATION:${escapeVcard(v.location)}`,
    f(v.description) && `DESCRIPTION:${escapeVcard(v.description)}`,
    'END:VEVENT',
  ])
}

// BIP-21 and EIP-681 style URIs. Bitcoin-derived coins use `amount`,
// Ethereum uses `value`.
const CRYPTO_SCHEMES = {
  bitcoin: { scheme: 'bitcoin', amountKey: 'amount' },
  ethereum: { scheme: 'ethereum', amountKey: 'value' },
  litecoin: { scheme: 'litecoin', amountKey: 'amount' },
  dogecoin: { scheme: 'dogecoin', amountKey: 'amount' },
}

function encodeCrypto(v) {
  const address = f(v.address)
  if (!address) return ''
  const coin = CRYPTO_SCHEMES[f(v.coin) ?? 'bitcoin'] ?? CRYPTO_SCHEMES.bitcoin
  return `${coin.scheme}:${address}${buildQuery({
    [coin.amountKey]: v.amount,
    label: v.label,
    message: v.message,
  })}`
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function encodePayload(type, values) {
  const v = values ?? {}
  switch (type) {
    case 'url':
    case 'text':
    case 'pdf':
    case 'app': return encodeRaw(v)
    case 'wifi': return encodeWifi(v)
    case 'vcard': return encodeVcard(v)
    case 'email': return encodeEmail(v)
    case 'phone': return encodePhone(v)
    case 'sms': return encodeSms(v)
    case 'whatsapp': return encodeWhatsapp(v)
    case 'location': return encodeLocation(v)
    case 'event': return encodeEvent(v)
    case 'crypto': return encodeCrypto(v)
    default: return ''
  }
}
