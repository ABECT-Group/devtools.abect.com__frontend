import { PAGE_URL, PAGE_TITLE, PAGE_DESC } from './helmet'
import { HOW_TO_STEPS, FAQ } from './content'

export const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'OG Image Generator',
  'url': PAGE_URL,
  'description': PAGE_DESC,
  'applicationCategory': 'UtilitiesApplication',
  'operatingSystem': 'Any',
  'browserRequirements': 'Requires JavaScript',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
  'featureList': [
    'Crop and export OG images at 1200×630 px or 1080×1080 px',
    'Drag, zoom, and pinch-to-zoom canvas editor',
    'Real-time quality slider with live file size display',
    'Live social card preview (Slack, Discord, Facebook style)',
    'Copy-ready HTML meta tags for Open Graph and Twitter/X',
    'No file upload — 100% private, runs in your browser',
    'Supports JPG, PNG, WebP, AVIF, GIF source images',
    'Free, instant, no signup required',
  ],
}

export const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to create and export an OG image',
  'description': 'Upload an image, crop it to the correct Open Graph dimensions, adjust quality, and get copy-ready HTML meta tags.',
  'step': HOW_TO_STEPS.map((text, i) => ({
    '@type': 'HowToStep',
    'position': i + 1,
    'text': text,
  })),
}

export const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ.map(({ question, answer }) => ({
    '@type': 'Question',
    'name': question,
    'acceptedAnswer': { '@type': 'Answer', 'text': answer },
  })),
}
