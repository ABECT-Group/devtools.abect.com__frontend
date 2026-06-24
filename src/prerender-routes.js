import { TOOLS } from './config/tools.js'

export const prerenderRoutes = [
  { route: '/',               lastmod: '2026-06-24', priority: '1.0', changefreq: 'weekly'  },
  { route: '/privacy-policy', lastmod: '2026-06-20', priority: '0.3', changefreq: 'yearly'  },
  { route: '/about',          lastmod: '2026-05-04', priority: '0.6', changefreq: 'yearly'  },
  ...TOOLS.map(({ route, lastmod, priority }) => ({ route, lastmod, priority: priority ?? '0.8', changefreq: 'monthly' })),
]
