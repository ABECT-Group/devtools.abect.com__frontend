import { buildPageUrl, buildOgImageUrl } from '../../../config/site'

export const OG_IMAGE = buildOgImageUrl('jsonld-schema-generator')

const SEO = {
  'product-schema-generator': {
    title: 'Product Schema Markup Generator — Free JSON-LD | Abect',
    description: 'Generate Product JSON-LD schema markup with price, ratings and availability. Enables Rich Results in Google Search. Copy-ready output. Free, no signup.',
    subtitle: 'Add price, star ratings, availability and shipping to Google Search — generate valid Product schema markup in seconds.',
    url: buildPageUrl('product-schema-generator'),
  },
  'article-schema-generator': {
    title: 'Article Schema Markup Generator — Free JSON-LD | Abect',
    description: 'Generate Article JSON-LD schema markup with author, publisher and dates. Boost visibility in Google News and Discover. Live preview, copy-ready output. Free.',
    subtitle: 'Help Google show your author, publication date and image in News and Discover — generate valid Article schema markup instantly.',
    url: buildPageUrl('article-schema-generator'),
  },
  'faq-schema-generator': {
    title: 'FAQ Schema Markup Generator — Free JSON-LD | Abect',
    description: 'Generate FAQ JSON-LD schema markup to show expandable Q&A answers in Google Search. Live preview, validation, copy-ready output. Free, no signup required.',
    subtitle: 'Show expandable Q&A answers directly in Google Search results — generate valid FAQPage schema markup in seconds.',
    url: buildPageUrl('faq-schema-generator'),
  },
  'organization-schema-generator': {
    title: 'Organization Schema Markup Generator — JSON-LD | Abect',
    description: 'Generate Organization JSON-LD schema markup for Google Knowledge Panel and E-E-A-T signals. Live preview, validation, copy-ready output. Free, no signup.',
    subtitle: 'Strengthen your Google Knowledge Panel and E-E-A-T signals — generate valid Organization schema markup instantly.',
    url: buildPageUrl('organization-schema-generator'),
  },
  'local-business-schema-generator': {
    title: 'Local Business Schema Markup Generator — JSON-LD | Abect',
    description: 'Generate Local Business JSON-LD schema markup for map cards and business hours in Google Search. Live preview, validation, copy-ready output. Free, no signup.',
    subtitle: 'Show map cards, opening hours and phone number in Google Search — generate valid LocalBusiness schema markup in seconds.',
    url: buildPageUrl('local-business-schema-generator'),
  },
  'breadcrumb-schema-generator': {
    title: 'Breadcrumb Schema Markup Generator — Free JSON-LD | Abect',
    description: 'Generate Breadcrumb JSON-LD schema markup to show site path trails in Google SERP snippets. Live preview, copy-ready output. Free, no signup required.',
    subtitle: 'Show Home > Category > Page paths in Google SERP snippets — generate valid BreadcrumbList schema markup in seconds.',
    url: buildPageUrl('breadcrumb-schema-generator'),
  },
}

export const SLUG_TO_TYPE = {
  'product-schema-generator':        'product',
  'article-schema-generator':        'article',
  'faq-schema-generator':            'faq',
  'organization-schema-generator':   'organization',
  'local-business-schema-generator': 'local-business',
  'breadcrumb-schema-generator':     'breadcrumb',
}

export const TYPE_TO_SLUG = {
  'product':        'product-schema-generator',
  'article':        'article-schema-generator',
  'faq':            'faq-schema-generator',
  'organization':   'organization-schema-generator',
  'local-business': 'local-business-schema-generator',
  'breadcrumb':     'breadcrumb-schema-generator',
}

export function buildHelmet(slug) {
  return SEO[slug] ?? SEO['product-schema-generator']
}
