import { buildPageUrl, buildOgImageUrl } from '../../../config/site'

// One image for the whole family, same as the schema generators.
export const OG_IMAGE = buildOgImageUrl('qr-code-generator')

const SEO = {
  'qr-code-generator': {
    title: 'QR Code Generator Online — Free, With Logo & Colors | Abect',
    description: 'Create QR codes online with your own colors and logo — no signup needed. Codes never expire, scans are unlimited, commercial use is free. PNG or SVG.',
    subtitle: 'Create a QR code for any link — pick your colors, drop in a logo, export as PNG or vector SVG.',
    url: buildPageUrl('qr-code-generator'),
  },
  'text-to-qr-code-generator': {
    title: 'Text to QR Code Generator Online — Works Offline | Abect',
    description: 'Turn plain text into a QR code that displays instantly — no link, no internet, no signup. Never expires, unlimited scans, free for commercial use.',
    subtitle: 'The code carries the message, not a link — it displays on scan, with no network needed.',
    url: buildPageUrl('text-to-qr-code-generator'),
  },
  'wifi-qr-code-generator': {
    title: 'WiFi QR Code Generator Online — Free, No Signup | Abect',
    description: 'Create a WiFi QR code guests scan to join instantly. Handles WPA3, hidden networks and special characters. Never expires, no signup, free forever.',
    subtitle: 'Let guests join your network by scanning — no password typing, no app, nothing uploaded.',
    url: buildPageUrl('wifi-qr-code-generator'),
  },
  'vcard-qr-code-generator': {
    title: 'vCard QR Code Generator Online — Contact QR Code | Abect',
    description: 'Generate a vCard QR code that saves name, phone, email and company to any phone. Print-ready SVG for business cards. Never expires, no signup.',
    subtitle: 'Put your whole contact card on a business card — one scan saves it to the phone address book.',
    url: buildPageUrl('vcard-qr-code-generator'),
  },
}

export const SLUG_TO_TYPE = {
  'qr-code-generator': 'url',
  'text-to-qr-code-generator': 'text',
  'wifi-qr-code-generator': 'wifi',
  'vcard-qr-code-generator': 'vcard',
}

export const TYPE_TO_SLUG = {
  'url': 'qr-code-generator',
  'text': 'text-to-qr-code-generator',
  'wifi': 'wifi-qr-code-generator',
  'vcard': 'vcard-qr-code-generator',
}

export function buildHelmet(slug) {
  return SEO[slug] ?? SEO['qr-code-generator']
}
