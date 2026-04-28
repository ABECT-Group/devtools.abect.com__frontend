import { PAGE_TITLE, PAGE_DESC, PAGE_URL } from './helmet'
import { HOW_TO_STEPS, FAQ } from './content'

export const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'Free WebP Converter Online',
  'url': PAGE_URL,
  'description': PAGE_DESC,
  'applicationCategory': 'UtilitiesApplication',
  'operatingSystem': 'Any',
  'browserRequirements': 'Requires JavaScript',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
  'featureList': [
    'Convert JPG to WebP',
    'Convert PNG to WebP',
    'Convert GIF to WebP',
    'Convert AVIF to WebP',
    'Convert BMP to WebP',
    'Batch conversion with quality slider',
    'No file upload — 100% private',
    'Free, instant, browser-based',
  ],
}

export const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to convert images to WebP online',
  'description': 'Convert JPG, PNG, GIF, AVIF or BMP files to WebP format in your browser — free and instant.',
  'step': HOW_TO_STEPS.map((text, i) => ({
    '@type': 'HowToStep',
    'position': i + 1,
    'text': text,
  })),
}

export const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
  })),
}
