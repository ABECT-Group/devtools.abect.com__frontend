export function buildJsonLdHowTo(config, fromLabel, toLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to convert ${fromLabel} to ${toLabel}`,
    'step': config.howTo.map((text, i) => ({
      '@type': 'HowToStep',
      'position': i + 1,
      'text': text,
    })),
  }
}

export function buildJsonLdApp(config, pageUrl, fromLabel, toLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': config.h1,
    'url': pageUrl,
    'description': config.description,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      `Convert ${fromLabel} to ${toLabel}`,
      'Batch conversion',
      'No file upload — 100% private',
      'Free, instant, browser-based',
    ],
  }
}

export function buildJsonLdFaq(config) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': config.faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }
}
