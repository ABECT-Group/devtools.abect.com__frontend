function c(text, on) {
  return on ? `<!-- ${text} -->\n` : ''
}

function norm(str) {
  return (str || '').replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

function escAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escText(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function generateMetaTags({
  title, description, canonicalUrl, keywords, author,
  robotsIndex, robotsFollow,
  isMultilang, hreflangEntries,
  themeColor, themeColorDark, enableThemeColorDark,
  charset, colorScheme, referrerPolicy,
  noTranslate, noScale, noPhoneDetection,
  addComments,
}) {
  const sep = addComments ? '\n\n' : '\n'
  const sections = []

  const t    = norm(title)
  const desc = norm(description)
  const kw   = norm(keywords)
  const auth = norm(author)
  const curl = norm(canonicalUrl)

  const basic = []
  if (t)    basic.push(`${c('Page title shown in browser tabs and Google search results (recommended: max 60 chars)', addComments)}<title>${escText(t)}</title>`)
  if (desc) basic.push(`${c('Page description shown in Google search snippets (recommended: max 160 chars)', addComments)}<meta name="description" content="${escAttr(desc)}">`)
  if (kw)   basic.push(`${c('Keyword hints — ignored by Google since 2009, still used by some other search engines', addComments)}<meta name="keywords" content="${escAttr(kw)}">`)
  if (auth) basic.push(`${c('Content author name or organization', addComments)}<meta name="author" content="${escAttr(auth)}">`)
  if (curl) basic.push(`${c('Canonical URL — prevents duplicate content when the same page is accessible at multiple URLs', addComments)}<link rel="canonical" href="${escAttr(curl)}">`)
  if (basic.length) sections.push(basic.join(sep))

  const themeColorTags = enableThemeColorDark
    ? [
        `${c('Browser UI accent color for light mode (Android Chrome/Edge)', addComments)}<meta name="theme-color" content="${escAttr(themeColor)}" media="(prefers-color-scheme: light)">`,
        `${c('Browser UI accent color for dark mode', addComments)}<meta name="theme-color" content="${escAttr(themeColorDark)}" media="(prefers-color-scheme: dark)">`,
      ].join(sep)
    : `${c('Browser UI accent color on Android Chrome/Edge and some desktop browsers', addComments)}<meta name="theme-color" content="${escAttr(themeColor)}">`

  const viewportContent = noScale
    ? 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    : 'width=device-width, initial-scale=1'
  const viewportComment = noScale
    ? 'Disables pinch-to-zoom on mobile — use with caution, affects accessibility'
    : 'Makes the page responsive on all screen sizes'

  const technical = [
    `${c('Controls how search engine crawlers index this page and follow its links', addComments)}<meta name="robots" content="${robotsIndex}, ${robotsFollow}">`,
    `${c('Character encoding — UTF-8 supports all languages and special characters', addComments)}<meta charset="${charset}">`,
    `${c(viewportComment, addComments)}<meta name="viewport" content="${viewportContent}">`,
    themeColorTags,
  ]
  sections.push(technical.join(sep))

  if (isMultilang) {
    const valid = hreflangEntries.filter(e => e.lang.trim() && e.url.trim())
    if (valid.length) {
      const lines = []
      if (addComments) lines.push('<!-- Language alternates — tells Google which URL to show users in each language/region -->')
      valid.forEach(e => lines.push(`<link rel="alternate" hreflang="${escAttr(norm(e.lang))}" href="${escAttr(norm(e.url))}">`))
      if (addComments) lines.push('\n<!-- Fallback URL for users whose language is not listed above -->')
      lines.push(`<link rel="alternate" hreflang="x-default" href="${escAttr(norm(valid[0].url))}">`)
      sections.push(lines.join('\n'))
    }
  }

  const advanced = []
  if (colorScheme)    advanced.push(`${c('Declares which color schemes the page supports — prevents white flash in dark mode', addComments)}<meta name="color-scheme" content="${escAttr(colorScheme)}">`)
  if (referrerPolicy) advanced.push(`${c('Controls how much referrer info is sent when users navigate away from this page', addComments)}<meta name="referrer" content="${escAttr(referrerPolicy)}">`)
  if (noTranslate)    advanced.push(`${c('Disables the automatic Google Translate prompt for this page', addComments)}<meta name="google" content="notranslate">`)
  if (noPhoneDetection) advanced.push(`${c('Prevents iOS Safari from converting phone numbers into clickable tel: links', addComments)}<meta name="format-detection" content="telephone=no">`)
  if (advanced.length)  sections.push(advanced.join(sep))

  return sections.join('\n\n')
}
