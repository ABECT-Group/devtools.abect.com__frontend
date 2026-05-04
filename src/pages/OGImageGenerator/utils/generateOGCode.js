export const ASPECT_PRESETS = {
  og:     { label: 'OG / Facebook (1.91:1)', shortLabel: '1.91:1', width: 1200, height: 630  },
  square: { label: 'Square (1:1)',            shortLabel: '1:1',    width: 1080, height: 1080 },
}

function escAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function norm(str) {
  return (str || '').replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

function c(text, on) {
  return on ? `<!-- ${text} -->\n` : ''
}

function joinLines(items) {
  const out = []
  for (let i = 0; i < items.length; i++) {
    if (i > 0 && items[i].startsWith('<!--')) out.push('')
    out.push(items[i])
  }
  return out.join('\n')
}

export function generateOGCode({
  title, description, pageUrl, siteName, locale,
  imageWidth, imageHeight,
  addTwitter, twitterSite, twitterCreator, twitterCard,
  addComments,
}) {
  const sections = []

  const t    = norm(title)
  const desc = norm(description)
  const curl = norm(pageUrl)
  const site = norm(siteName)
  const loc  = norm(locale)
  const ts   = norm(twitterSite)
  const tc   = norm(twitterCreator)

  const imageType = 'image/jpeg'

  const og = []
  if (addComments) og.push('<!-- Open Graph / Facebook -->')
  og.push(`<meta property="og:type" content="website">`)
  if (curl) og.push(`${c('Canonical URL for this page', addComments)}<meta property="og:url" content="${escAttr(curl)}">`)
  if (t)    og.push(`${c('Title shown in link preview cards (≤ 60 chars recommended)', addComments)}<meta property="og:title" content="${escAttr(t)}">`)
  if (desc) og.push(`${c('Description shown in link preview cards (≤ 200 chars recommended)', addComments)}<meta property="og:description" content="${escAttr(desc)}">`)
  og.push(`${c('Upload og-image to your server and replace this placeholder', addComments)}<meta property="og:image" content="INSERT_IMAGE_URL_HERE">`)
  og.push(`<meta property="og:image:width" content="${imageWidth}">`)
  og.push(`<meta property="og:image:height" content="${imageHeight}">`)
  og.push(`<meta property="og:image:type" content="${imageType}">`)
  if (site) og.push(`${c('Brand name shown below the preview card', addComments)}<meta property="og:site_name" content="${escAttr(site)}">`)
  if (loc && loc !== 'en_US') og.push(`${c('Content language — format: language_TERRITORY', addComments)}<meta property="og:locale" content="${escAttr(loc)}">`)
  sections.push(joinLines(og))

  if (addTwitter) {
    const tw = []
    if (addComments) tw.push('<!-- Twitter / X -->')
    tw.push(`<meta name="twitter:card" content="${escAttr(twitterCard)}">`)
    if (ts) tw.push(`${c("Brand's Twitter handle", addComments)}<meta name="twitter:site" content="${escAttr(ts)}">`)
    if (tc) tw.push(`${c("Content author's Twitter handle", addComments)}<meta name="twitter:creator" content="${escAttr(tc)}">`)
    if (t)    tw.push(`<meta name="twitter:title" content="${escAttr(t)}">`)
    if (desc) tw.push(`<meta name="twitter:description" content="${escAttr(desc)}">`)
    tw.push(`<meta name="twitter:image" content="INSERT_IMAGE_URL_HERE">`)
    sections.push(joinLines(tw))
  }

  return sections.join('\n\n')
}
