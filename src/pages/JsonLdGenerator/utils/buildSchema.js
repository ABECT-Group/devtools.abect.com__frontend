// Pure function — no side effects. Empty/undefined values are omitted from output.

function f(value) {
  if (value === '' || value === undefined || value === null) return undefined
  return value
}

function compactObj(obj) {
  const result = {}
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') result[k] = v
  })
  return Object.keys(result).length > 1 ? result : undefined
}

function toIsoDateTime(dateStr) {
  if (!dateStr) return undefined
  if (dateStr.includes('T')) return dateStr
  const offset = -new Date().getTimezoneOffset()
  const sign = offset >= 0 ? '+' : '-'
  const hh = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0')
  const mm = String(Math.abs(offset) % 60).padStart(2, '0')
  return `${dateStr}T00:00:00${sign}${hh}:${mm}`
}

// ─── Builders ──────────────────────────────────────────────────────────────────

function buildShippingDetails(v) {
  if (v.shippingCost === '' || v.shippingCost === undefined || v.shippingCost === null) return undefined
  const dest = v.shippingCountry
    ? { '@type': 'DefinedRegion', 'addressCountry': v.shippingCountry }
    : undefined
  const hasTransit  = f(v.deliveryMin)  !== undefined || f(v.deliveryMax)  !== undefined
  const hasHandling = f(v.handlingMin) !== undefined || f(v.handlingMax) !== undefined
  const deliveryTime = (hasTransit || hasHandling)
    ? {
        '@type': 'ShippingDeliveryTime',
        ...(hasTransit && {
          'transitTime': {
            '@type':    'QuantitativeValue',
            'unitCode': 'DAY',
            ...(f(v.deliveryMin)  !== undefined && { 'minValue': Number(v.deliveryMin) }),
            ...(f(v.deliveryMax)  !== undefined && { 'maxValue': Number(v.deliveryMax) }),
          },
        }),
        ...(hasHandling && {
          'handlingTime': {
            '@type':    'QuantitativeValue',
            'unitCode': 'DAY',
            ...(f(v.handlingMin) !== undefined && { 'minValue': Number(v.handlingMin) }),
            ...(f(v.handlingMax) !== undefined && { 'maxValue': Number(v.handlingMax) }),
          },
        }),
      }
    : undefined
  return {
    '@type': 'OfferShippingDetails',
    'shippingRate': {
      '@type':    'MonetaryAmount',
      'value':    v.shippingCost,
      'currency': f(v.shippingCurrency) || f(v.priceCurrency) || 'USD',
    },
    ...(dest && { 'shippingDestination': dest }),
    ...(deliveryTime && { 'deliveryTime': deliveryTime }),
  }
}

function buildReturnPolicy(v) {
  const category = f(v.returnPolicyCategory)
  if (!category) return undefined
  const policy = {
    '@type':               'MerchantReturnPolicy',
    'applicableCountry':   f(v.returnCountry),
    'returnPolicyCategory': `https://schema.org/${category}`,
  }
  if (f(v.returnDays))    policy.merchantReturnDays = Number(v.returnDays)
  if (f(v.returnMethod))  policy.returnMethod = `https://schema.org/${v.returnMethod}`
  if (f(v.returnFees))    policy.returnFees   = `https://schema.org/${v.returnFees}`
  return policy
}

function buildProduct(base, v) {
  const brand = v.brand
    ? { '@type': 'Brand', 'name': v.brand }
    : undefined

  const offers = compactObj({
    '@type':                  'Offer',
    'price':                  f(v.price),
    'priceCurrency':          f(v.priceCurrency) || 'USD',
    'availability':           v.availability ? `https://schema.org/${v.availability}` : undefined,
    'itemCondition':          v.itemCondition ? `https://schema.org/${v.itemCondition}` : undefined,
    'url':                    f(v.offerUrl),
    'priceValidUntil':        f(v.priceValidUntil),
    'shippingDetails':        buildShippingDetails(v),
    'hasMerchantReturnPolicy': buildReturnPolicy(v),
  })

  const aggregateRating = v.ratingValue
    ? compactObj({
        '@type':       'AggregateRating',
        'ratingValue': f(v.ratingValue),
        'reviewCount': f(v.reviewCount) || 1,
        'bestRating':  f(v.bestRating),
        'worstRating': f(v.worstRating),
      })
    : undefined

  return compactObj({
    ...base,
    '@type':           'Product',
    'name':            f(v.name),
    'description':     f(v.description),
    'image':           f(v.image),
    'sku':             f(v.sku),
    'gtin':            f(v.gtin),
    'mpn':             f(v.mpn),
    'brand':           brand,
    'offers':          offers,
    'aggregateRating': aggregateRating,
  })
}

function buildArticle(base, v) {
  const author = compactObj({
    '@type': f(v.authorType) || 'Person',
    'name':  f(v.authorName),
    'url':   f(v.authorUrl),
  })

  const publisher = compactObj({
    '@type': 'Organization',
    'name':  f(v.publisherName),
    'logo':  v.publisherLogo ? { '@type': 'ImageObject', 'url': v.publisherLogo } : undefined,
  })

  return compactObj({
    ...base,
    '@type':         'Article',
    'headline':      f(v.headline),
    'description':   f(v.description),
    'image':         f(v.image),
    'url':           f(v.articleUrl),
    'datePublished': toIsoDateTime(f(v.datePublished)),
    'dateModified':  toIsoDateTime(f(v.dateModified)),
    'author':        author,
    'publisher':     publisher,
  })
}

function buildFaq(base, v) {
  const items = (v.faqItems || []).filter(i => i.question?.trim() && i.answer?.trim())
  return {
    ...base,
    '@type': 'FAQPage',
    'mainEntity': items.map(i => ({
      '@type': 'Question',
      'name':  i.question.trim(),
      'acceptedAnswer': {
        '@type': 'Answer',
        'text':  i.answer.trim(),
      },
    })),
  }
}

function buildOrganization(base, v) {
  const address = compactObj({
    '@type':           'PostalAddress',
    'streetAddress':   f(v.streetAddress),
    'addressLocality': f(v.addressLocality),
    'addressRegion':   f(v.addressRegion),
    'postalCode':      f(v.postalCode),
    'addressCountry':  f(v.addressCountry),
  })

  const logo = v.logo
    ? { '@type': 'ImageObject', 'url': v.logo }
    : undefined

  const sameAs = v.sameAs?.filter(Boolean)
  const hasSameAs = sameAs?.length ? sameAs : undefined

  return compactObj({
    ...base,
    '@type':         'Organization',
    'name':          f(v.name),
    'legalName':     f(v.legalName),
    'alternateName': f(v.alternateName),
    'url':           f(v.url),
    'logo':          logo,
    'image':         f(v.image),
    'description':   f(v.description),
    'foundingDate':  f(v.foundingDate),
    'email':         f(v.email),
    'telephone':     f(v.telephone),
    'address':       address,
    'sameAs':        hasSameAs,
  })
}

function buildLocalBusiness(base, v) {
  const type = f(v.businessType) || 'LocalBusiness'

  const address = compactObj({
    '@type':           'PostalAddress',
    'streetAddress':   f(v.streetAddress),
    'addressLocality': f(v.addressLocality),
    'addressRegion':   f(v.addressRegion),
    'postalCode':      f(v.postalCode),
    'addressCountry':  f(v.addressCountry),
  })

  const geo = (v.latitude && v.longitude)
    ? { '@type': 'GeoCoordinates', 'latitude': v.latitude, 'longitude': v.longitude }
    : undefined

  const openingHours = v.openingHours?.filter(Boolean)
  const hasOpeningHours = openingHours?.length ? openingHours : undefined

  return compactObj({
    ...base,
    '@type':              type,
    'name':               f(v.name),
    'description':        f(v.description),
    'url':                f(v.url),
    'telephone':          f(v.telephone),
    'image':              f(v.image),
    'priceRange':         f(v.priceRange),
    'servesCuisine':      f(v.servesCuisine),
    'currenciesAccepted': f(v.currenciesAccepted),
    'paymentAccepted':    f(v.paymentAccepted),
    'address':            address,
    'geo':                geo,
    'openingHours':       hasOpeningHours,
  })
}

function buildBreadcrumb(base, v) {
  const items = (v.breadcrumbItems || []).filter(i => i.name?.trim())
  return {
    ...base,
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, i) => ({
      '@type':    'ListItem',
      'position': i + 1,
      'name':     item.name.trim(),
      ...(item.url?.trim() && { 'item': item.url.trim() }),
    })),
  }
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function buildSchema(type, values) {
  const base = { '@context': 'https://schema.org' }
  switch (type) {
    case 'product':        return buildProduct(base, values)
    case 'article':        return buildArticle(base, values)
    case 'faq':            return buildFaq(base, values)
    case 'organization':   return buildOrganization(base, values)
    case 'local-business': return buildLocalBusiness(base, values)
    case 'breadcrumb':     return buildBreadcrumb(base, values)
    default:               return base
  }
}
