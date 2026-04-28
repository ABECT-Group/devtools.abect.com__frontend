import { PAGE_TITLE, PAGE_DESC, PAGE_URL } from './helmet'
import { HOW_TO_STEPS, FAQ } from './content'

export const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'Free SEO Meta Tag Generator',
  'url': PAGE_URL,
  'description': PAGE_DESC,
  'applicationCategory': 'UtilitiesApplication',
  'operatingSystem': 'Any',
  'browserRequirements': 'Requires JavaScript',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
  'featureList': [
    'Generate SEO title and meta description tags',
    'Live Google search snippet preview',
    'Canonical URL tag',
    'Robots meta tag (noindex, nofollow, noarchive)',
    'Open Graph tags (og:title, og:description, og:image)',
    'Hreflang multilingual tags',
    'Theme color with dark mode variant',
    'Copy-ready HTML output',
  ],
}

export const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to generate SEO meta tags',
  'description': 'Create optimized meta tags for your web page — title, description, canonical, OG tags — and copy the ready HTML code.',
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
