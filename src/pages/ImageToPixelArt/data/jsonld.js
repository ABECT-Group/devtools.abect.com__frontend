import { PAGE_DESC, PAGE_URL } from './helmet'
import { HOW_TO_STEPS, FAQ } from './content'

export const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'Free Image to Pixel Art Converter Online',
  'url': PAGE_URL,
  'description': PAGE_DESC,
  'applicationCategory': 'UtilitiesApplication',
  'operatingSystem': 'Any',
  'browserRequirements': 'Requires JavaScript',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
  'featureList': [
    'Convert JPG, PNG, GIF, AVIF, BMP and WebP to pixel art',
    'Adjustable pixel size from 1 to 10',
    'Color palette control with the Quality slider',
    'Transparency preserved',
    'Batch conversion with ZIP download',
    'No file upload — 100% private',
    'Free, instant, browser-based',
  ],
}

export const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to convert an image to pixel art online',
  'description': 'Turn a photo into pixel art in your browser — choose a pixel size and color palette, then download the PNG.',
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
