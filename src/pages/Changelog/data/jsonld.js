import { BASE_URL } from '../../../config/site'
import { ORGANIZATION_ID } from '../../../config/schema'
import { entryAnchor } from '../../../components/ChangelogCard/anchor'
import { PAGE_URL, PAGE_TITLE, PAGE_DESC } from './helmet'

export const jsonLdCollection = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': 'Abect Dev Tools Changelog',
  'headline': PAGE_TITLE,
  'url': PAGE_URL,
  'description': PAGE_DESC,
  'inLanguage': 'en',
  'isPartOf': { '@type': 'WebSite', 'url': BASE_URL, 'name': 'Abect Dev Tools' },
  'publisher': { '@id': ORGANIZATION_ID },
}

export const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
    { '@type': 'ListItem', 'position': 2, 'name': 'Changelog', 'item': PAGE_URL },
  ],
}

/**
 * Describes the list that is actually on the page — one entry per release date.
 * Not BlogPosting: these are sections of one page, not standalone articles.
 */
export function buildJsonLdItemList(entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Abect Dev Tools release history',
    'itemListOrder': 'https://schema.org/ItemListOrderDescending',
    'numberOfItems': entries.length,
    'itemListElement': entries.map((entry, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': entry.title,
      'url': `${PAGE_URL}#${entryAnchor(entry.datetime)}`,
    })),
  }
}
