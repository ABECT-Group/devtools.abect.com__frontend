import { PAGE_URL } from './helmet'

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
