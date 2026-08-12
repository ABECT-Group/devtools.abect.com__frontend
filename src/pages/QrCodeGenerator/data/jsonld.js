import { buildHelmet } from './helmet'

export function buildJsonLdApp(slug) {
  const { title, url, description } = buildHelmet(slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title.split(' —')[0],
    'url': url,
    'description': description,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      'Live preview while you type',
      'Custom foreground and background colors',
      'Logo in the center with automatic error correction',
      'Square, rounded and dot module styles',
      'PNG export up to 2048 px',
      'Print-ready vector SVG export',
      'No file upload — 100% private',
      'Free, no signup required',
    ],
  }
}

export function buildJsonLdHowTo(name, steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'step': steps.map((text, i) => ({
      '@type': 'HowToStep',
      'position': i + 1,
      'text': text,
    })),
  }
}

export function buildJsonLdFaq(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }
}
