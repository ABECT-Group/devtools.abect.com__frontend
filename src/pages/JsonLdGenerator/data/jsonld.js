import { buildHelmet } from './helmet'

export function buildJsonLdApp(slug) {
  const { title, url, description } = buildHelmet(slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title.split(' —')[0],
    'url': url,
    'description': description,
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      'Live JSON-LD preview with instant output',
      'Required fields validation',
      'Google Rich Results eligibility check',
      'One-click copy as <script> tag',
      'No file upload — 100% private',
      'Free, no signup required',
    ],
  }
}

export function buildJsonLdHowTo(steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to generate JSON-LD structured data',
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
