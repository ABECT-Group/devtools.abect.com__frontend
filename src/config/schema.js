import { BASE_URL } from './site.js'
import { TOOLS } from './tools.js'

/**
 * Site-wide structured data, rendered once from Layout so every page carries it.
 *
 * The Organization node has a stable @id — other schemas reference it with
 * { '@id': ORGANIZATION_ID } instead of repeating the whole entity, which is
 * what lets search engines merge them into one publisher.
 */
export const ORGANIZATION_ID = `${BASE_URL}/#organization`

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  'name': 'Abect Dev Tools',
  'url': BASE_URL,
  'logo': `${BASE_URL}/android-chrome-512x512.png`,
  'email': 'support@abect.com',
  'founder': {
    '@type': 'Person',
    'name': 'Roman Popovych',
    'url': `${BASE_URL}/about`,
  },
  'sameAs': [
    'https://github.com/ABECT-Group',
    'https://github.com/forze-dev',
    'https://www.linkedin.com/in/forze-dev/',
  ],
}

const TOOL_BY_ROUTE = new Map(TOOLS.map(tool => [tool.route, tool]))

/**
 * Two-level breadcrumb (Home › Tool) for any route registered in tools.js.
 * Returns null for routes that are not tools — pages like /about and /terms
 * declare their own trail.
 */
export function buildToolBreadcrumb(pathname) {
  const tool = TOOL_BY_ROUTE.get(pathname)
  if (!tool) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
      { '@type': 'ListItem', 'position': 2, 'name': tool.name, 'item': `${BASE_URL}${tool.route}` },
    ],
  }
}
