import { TOOLS } from './config/tools.js'

/**
 * Indexable pages: prerendered to static HTML AND listed in sitemap.xml.
 * `lastmod` is always hardcoded — never derive it from the build date.
 */
export const sitemapRoutes = [
  { route: '/',               lastmod: '2026-08-14', priority: '1.0', changefreq: 'weekly'  },
  { route: '/privacy-policy', lastmod: '2026-08-05', priority: '0.3', changefreq: 'yearly'  },
  { route: '/terms',          lastmod: '2026-08-05', priority: '0.3', changefreq: 'yearly'  },
  { route: '/about',          lastmod: '2026-05-04', priority: '0.6', changefreq: 'yearly'  },
  { route: '/changelog',      lastmod: '2026-08-14', priority: '0.5', changefreq: 'weekly'  },
  ...TOOLS.map(({ route, lastmod, priority }) => ({ route, lastmod, priority: priority ?? '0.8', changefreq: 'monthly' })),
]

/**
 * Non-indexable app pages. They are still prerendered so the host answers 200
 * with real markup instead of falling through to 404.html — a password-reset
 * link must not land on a 404 status, and the client must not hydrate over
 * mismatched "page not found" markup.
 *
 * Every page listed here MUST render <meta name="robots" content="noindex" />.
 * They are deliberately absent from sitemapRoutes.
 */
export const noindexRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/profile',
  '/profile/usage',
  '/profile/billing',
]

/** Everything the prerender pass writes to disk. */
export const prerenderRoutes = [
  ...sitemapRoutes.map(({ route }) => route),
  ...noindexRoutes,
]
