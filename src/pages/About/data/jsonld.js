import { PAGE_URL } from './helmet'
import { FAQ } from './content'

export const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Roman Popovych',
  'jobTitle': 'Full-Stack Software Engineer',
  'url': PAGE_URL,
  'sameAs': [
    'https://www.linkedin.com/in/forze-dev/',
    'https://github.com/forze-dev',
  ],
  'knowsAbout': [
    'Full-Stack Web Development',
    'Fintech Systems',
    'P2P Lending Platforms',
    'KYC and Biometric Verification',
    'Node.js',
    'MongoDB',
    'Redis',
    'Banking API Integration',
    'OAuth 2.0',
    'Security Engineering',
    'Zero Trust Architecture',
    'Browser APIs',
    'Canvas API',
  ],
}

export const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Abect Dev Tools',
  'url': 'https://devtools.abect.com',
  'description': 'A privacy-first collection of browser-based developer tools — image converters, favicon generator, meta tag generator, OG image generator and more. No uploads, no account required.',
  'author': {
    '@type': 'Person',
    'name': 'Roman Popovych',
    'sameAs': [
      'https://www.linkedin.com/in/forze-dev/',
      'https://github.com/forze-dev',
    ],
  },
}

// Must stay in sync with the <FAQ> block rendered on the page — same source array.
export const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
  })),
}

export const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://devtools.abect.com/',
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'About',
      'item': PAGE_URL,
    },
  ],
}
