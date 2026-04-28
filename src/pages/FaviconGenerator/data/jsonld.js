import { PAGE_TITLE, PAGE_DESC, PAGE_URL } from './helmet'
import { HOW_TO_STEPS, FAQ } from './content'

export const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'Free Favicon Generator Online',
  'url': PAGE_URL,
  'description': PAGE_DESC,
  'applicationCategory': 'UtilitiesApplication',
  'operatingSystem': 'Any',
  'browserRequirements': 'Requires JavaScript',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
  'featureList': [
    'Generate favicon from text',
    'Generate favicon from emoji',
    'Generate favicon from image',
    'Download PNG favicon set (16×16, 32×32, 180×180, 192×192, 512×512)',
    'Download favicon.ico',
    'No file upload — 100% private',
    'Free, instant, browser-based',
  ],
}

export const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to generate a favicon for your website',
  'description': 'Create favicon files from text, emoji, or image — free and instant in your browser.',
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
