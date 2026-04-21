import { TOOLS } from './config/tools.js'

export const prerenderRoutes = [
  '/',
  '/privacy-policy',
  ...TOOLS.map(t => t.route),
]
