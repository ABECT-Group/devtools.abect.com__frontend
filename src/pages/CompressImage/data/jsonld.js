export function buildJsonLdApp(config, pageUrl, toLabel) {
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
      `Compress images to ${toLabel}`,
      'Per-file quality control',
      'Live fullscreen preview of compressed result',
      'Batch compression',
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
