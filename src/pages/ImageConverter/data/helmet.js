import { buildOgImageUrl, buildPageUrl } from '../../../config/site'

export const OG_IMAGE   = buildOgImageUrl('image-converter')
export const buildHelmet = (slug) => buildPageUrl(slug)
