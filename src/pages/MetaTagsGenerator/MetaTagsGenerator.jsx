import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import CodeOutput from './components/CodeOutput/CodeOutput'
import MetaInputs from './components/MetaInputs/MetaInputs'
import SnippetPreview from './components/SnippetPreview/SnippetPreview'
import { generateMetaTags } from './utils/generateMetaTags'
import './MetaTagsGenerator.scss'

const PAGE_TITLE = 'Free SEO Meta Tag Generator Online — Title, Description, OG Tags | Abect'
const PAGE_DESCRIPTION = 'Generate SEO meta tags instantly — title, description, canonical, robots, hreflang, Open Graph. Live Google preview and copy-ready HTML. Free, no signup.'
const PAGE_URL = 'https://devtools.abect.com/meta-tags-generator'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/meta-tags-generator-og.jpg'

const HOW_TO_STEPS = [
  'Enter your page Title (50–60 characters) and Description (120–160 characters) — the live Google snippet preview updates as you type.',
  'Paste your page URL into the Canonical URL field to prevent duplicate content penalties.',
  'Set the robots meta tag: leave as index, follow for all public pages. Use noindex for staging or private pages.',
  'Enable Multilingual if your site has multiple language versions and add each language-URL pair for hreflang tags.',
  'Click Copy code and paste the output into the head section of your HTML.',
]

const META_FAQ = [
  {
    question: 'What are HTML meta tags?',
    answer: 'Meta tags are HTML elements placed in the <head> section of a page. They are not visible to users but tell search engines, browsers, and social platforms how to index, describe, and display your page. The most important are the title tag, meta description, canonical URL, and robots directive.',
  },
  {
    question: 'How long should a meta title and description be?',
    answer: 'Title: 50–60 characters. Google truncates titles longer than ~60 characters in search results, cutting off your message. Meta description: 120–160 characters. On mobile, Google shows roughly 120 characters, so front-load the key information. This generator shows a live character count and preview for both.',
  },
  {
    question: 'What are Open Graph tags and do they affect SEO?',
    answer: 'Open Graph tags (og:title, og:description, og:image) control how your page looks when shared on Slack, Discord, LinkedIn, Facebook, and other platforms that show link previews. They are not a direct Google ranking factor, but a well-designed OG image and title improve click-through rates from social shares — which indirectly signals engagement to Google.',
  },
  {
    question: 'Does the keywords meta tag help with Google SEO?',
    answer: 'No. Google has ignored the meta keywords tag since 2009. It has zero effect on Google rankings. Some other search engines may still look at it. Only include it if a specific CMS or client workflow requires it.',
  },
  {
    question: 'What is a canonical URL and why does it matter?',
    answer: 'The canonical tag (rel="canonical") tells search engines which URL is the preferred version of a page when the same content is accessible at multiple URLs — for example, with or without a trailing slash, www vs non-www, or with UTM parameters. Without it, Google may split ranking signals across duplicate URLs and rank none of them well.',
  },
  {
    question: 'What does noindex mean in the robots meta tag?',
    answer: 'noindex tells search engines not to include this page in search results. Use it for admin dashboards, thank-you pages, internal search results, staging environments, or any page you do not want to appear in Google. Most public pages should stay on the default index, follow.',
  },
  {
    question: 'When do I need hreflang tags?',
    answer: 'Use hreflang tags when your site serves the same content in multiple languages or has region-specific versions (e.g., /en/, /fr/, /de/). They tell Google which language variant to show users in different countries. The x-default value specifies the fallback page when no variant matches the user\'s language.',
  },
  {
    question: 'How do I add meta tags in Next.js?',
    answer: 'In Next.js 13+ App Router: export a metadata object or generateMetadata function from your page.js file. Next.js renders the tags server-side automatically — no extra library needed. In older Next.js with Pages Router, use next/head. For Vite + React, use react-helmet-async.',
  },
  {
    question: 'What is the viewport meta tag and do I need it?',
    answer: 'The viewport tag tells mobile browsers to display the page at the device\'s actual width instead of zooming out to fit a desktop layout. It is required for any responsive website. Without it, Google may flag your site as not mobile-friendly, which negatively affects rankings on mobile searches.',
  },
]

const HTML_CODE = `<!-- Paste into <head> -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Title — Brand Name</title>
<meta name="description" content="120–160 char description with a clear benefit.">
<link rel="canonical" href="https://example.com/page">
<meta property="og:title" content="Page Title — Brand Name">
<meta property="og:description" content="120–160 char description with a clear benefit.">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">`

const REACT_CODE = `import { Helmet } from 'react-helmet-async'

export default function MyPage() {
  return (
    <>
      <Helmet>
        <title>Page Title — Brand Name</title>
        <meta name="description" content="120–160 char description." />
        <link rel="canonical" href="https://example.com/page" />
        <meta property="og:title" content="Page Title — Brand Name" />
        <meta property="og:description" content="120–160 char description." />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* page content */}
    </>
  )
}`

const NEXTJS_CODE = `// app/my-page/page.js  (Next.js 13+ App Router)
export const metadata = {
  title: 'Page Title — Brand Name',
  description: '120–160 char description.',
  alternates: { canonical: 'https://example.com/page' },
  openGraph: {
    title: 'Page Title — Brand Name',
    description: '120–160 char description.',
    url: 'https://example.com/page',
    type: 'website',
    images: [{ url: 'https://example.com/og-image.jpg', width: 1200, height: 630 }],
  },
}`

const NUXT_CODE = `// pages/my-page.vue  (inside <script setup>)
useHead({
  title: 'Page Title — Brand Name',
  meta: [
    { name: 'description', content: '120–160 char description.' },
    { property: 'og:title', content: 'Page Title — Brand Name' },
    { property: 'og:description', content: '120–160 char description.' },
    { property: 'og:image', content: 'https://example.com/og-image.jpg' },
    { property: 'og:url', content: 'https://example.com/page' },
  ],
  link: [{ rel: 'canonical', href: 'https://example.com/page' }],
})`

export default function MetaTagsGenerator() {
  const [title, setTitle]               = useState('')
  const [description, setDescription]   = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [keywords, setKeywords]         = useState('')
  const [author, setAuthor]             = useState('')
  const [robotsIndex, setRobotsIndex]   = useState('index')
  const [robotsFollow, setRobotsFollow] = useState('follow')
  const [isMultilang, setIsMultilang]   = useState(false)
  const [hreflangEntries, setHreflangEntries] = useState([
    { id: crypto.randomUUID(), lang: '', url: '' },
  ])
  const [themeColor, setThemeColor]                     = useState('#ffffff')
  const [themeColorDark, setThemeColorDark]             = useState('#000000')
  const [enableThemeColorDark, setEnableThemeColorDark] = useState(false)
  const [charset, setCharset]                           = useState('UTF-8')
  const [colorScheme, setColorScheme]                   = useState('')
  const [referrerPolicy, setReferrerPolicy]             = useState('')
  const [noTranslate, setNoTranslate]                   = useState(false)
  const [noScale, setNoScale]                           = useState(false)
  const [noPhoneDetection, setNoPhoneDetection]         = useState(false)
  const [addComments, setAddComments]                   = useState(false)
  const [copiedKey, setCopiedKey]                       = useState(null)

  function handleHreflangAdd() {
    setHreflangEntries(prev => [...prev, { id: crypto.randomUUID(), lang: '', url: '' }])
  }
  function handleHreflangRemove(id) {
    setHreflangEntries(prev => prev.filter(e => e.id !== id))
  }
  function handleHreflangChange(id, key, value) {
    setHreflangEntries(prev => prev.map(e => e.id === id ? { ...e, [key]: value } : e))
  }

  async function handleCopy(key, code) {
    await navigator.clipboard.writeText(code)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const generatedCode = generateMetaTags({
    title, description, canonicalUrl, keywords, author,
    robotsIndex, robotsFollow,
    isMultilang, hreflangEntries,
    themeColor, themeColorDark, enableThemeColorDark,
    charset, colorScheme, referrerPolicy,
    noTranslate, noScale, noPhoneDetection,
    addComments,
  })

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Free SEO Meta Tag Generator',
    'url': PAGE_URL,
    'description': PAGE_DESCRIPTION,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'featureList': [
      'Generate SEO title and meta description tags',
      'Live Google search snippet preview',
      'Canonical URL tag',
      'Robots meta tag (noindex, nofollow, noarchive)',
      'Open Graph tags (og:title, og:description, og:image)',
      'Hreflang multilingual tags',
      'Theme color with dark mode variant',
      'Copy-ready HTML output',
    ],
  }

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to generate SEO meta tags',
    'description': 'Create optimized meta tags for your web page — title, description, canonical, OG tags — and copy the ready HTML code.',
    'step': HOW_TO_STEPS.map((text, i) => ({
      '@type': 'HowToStep',
      'position': i + 1,
      'text': text,
    })),
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': META_FAQ.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }

  return (
    <main className="MetaTagsGenerator">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Abect Dev Tools" />
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdHowTo)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <h1 className="MetaTagsGenerator__title">Free SEO Meta Tag Generator</h1>
      <p className="MetaTagsGenerator__sub">
        Generate title, description, canonical, robots, hreflang and Open Graph tags — live preview included, copy-ready HTML output.
      </p>

      <section className="MetaTagsGenerator__tool">
        <div className="MetaTagsGenerator__cols">
          <div className="MetaTagsGenerator__inputs-col">
            <MetaInputs
              title={title}                   onTitleChange={setTitle}
              description={description}       onDescriptionChange={setDescription}
              canonicalUrl={canonicalUrl}     onCanonicalUrlChange={setCanonicalUrl}
              keywords={keywords}             onKeywordsChange={setKeywords}
              author={author}                 onAuthorChange={setAuthor}
              robotsIndex={robotsIndex}       onRobotsIndexChange={setRobotsIndex}
              robotsFollow={robotsFollow}     onRobotsFollowChange={setRobotsFollow}
              isMultilang={isMultilang}       onIsMultilangChange={setIsMultilang}
              hreflangEntries={hreflangEntries}
              onHreflangAdd={handleHreflangAdd}
              onHreflangRemove={handleHreflangRemove}
              onHreflangChange={handleHreflangChange}
              themeColor={themeColor}                 onThemeColorChange={setThemeColor}
              themeColorDark={themeColorDark}         onThemeColorDarkChange={setThemeColorDark}
              enableThemeColorDark={enableThemeColorDark} onEnableThemeColorDarkChange={setEnableThemeColorDark}
              charset={charset}                       onCharsetChange={setCharset}
              colorScheme={colorScheme}               onColorSchemeChange={setColorScheme}
              referrerPolicy={referrerPolicy}         onReferrerPolicyChange={setReferrerPolicy}
              noTranslate={noTranslate}               onNoTranslateChange={setNoTranslate}
              noScale={noScale}                       onNoScaleChange={setNoScale}
              noPhoneDetection={noPhoneDetection}     onNoPhoneDetectionChange={setNoPhoneDetection}
              addComments={addComments}               onAddCommentsChange={setAddComments}
            />
          </div>
          <div className="MetaTagsGenerator__outputs-col">
            <SnippetPreview
              title={title}
              description={description}
              canonicalUrl={canonicalUrl}
            />
            <CodeOutput code={generatedCode} />
          </div>
        </div>
      </section>

      <section className="MetaTagsGenerator__section">
        <h2 className="MetaTagsGenerator__section-title">How to generate meta tags</h2>
        <ol className="MetaTagsGenerator__steps">
          {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>

      <section className="MetaTagsGenerator__section">
        <h2 className="MetaTagsGenerator__section-title">Essential SEO meta tags — what each one does</h2>
        <p className="MetaTagsGenerator__text">
          Not all meta tags are equal. Some directly affect rankings, others influence click-through rate, and some are purely technical. Here is the complete list with impact levels.
        </p>

        <div className="MetaTagsGenerator__table-wrap">
          <table className="MetaTagsGenerator__table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Purpose</th>
                <th>Max length</th>
                <th>SEO impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="MetaTagsGenerator__table-highlight">
                <td><code>&lt;title&gt;</code></td>
                <td>Clickable headline in Google search results and browser tab</td>
                <td>60 chars</td>
                <td>Very high</td>
              </tr>
              <tr className="MetaTagsGenerator__table-highlight">
                <td><code>meta description</code></td>
                <td>Snippet text shown below the title in search results</td>
                <td>160 chars</td>
                <td>CTR (not ranking)</td>
              </tr>
              <tr>
                <td><code>rel="canonical"</code></td>
                <td>Signals preferred URL — prevents duplicate content issues</td>
                <td>—</td>
                <td>High</td>
              </tr>
              <tr>
                <td><code>meta robots</code></td>
                <td>Index/noindex and follow/nofollow crawler instructions</td>
                <td>—</td>
                <td>High (when set)</td>
              </tr>
              <tr>
                <td><code>meta viewport</code></td>
                <td>Mobile browser rendering — required for responsive sites</td>
                <td>—</td>
                <td>Required</td>
              </tr>
              <tr>
                <td><code>meta charset</code></td>
                <td>Character encoding declaration (always UTF-8)</td>
                <td>—</td>
                <td>Required</td>
              </tr>
              <tr>
                <td><code>meta author</code></td>
                <td>Page author — minor E-E-A-T signal</td>
                <td>—</td>
                <td>Low</td>
              </tr>
              <tr>
                <td><code>meta keywords</code></td>
                <td>Keywords — ignored by Google since 2009</td>
                <td>—</td>
                <td>None</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="MetaTagsGenerator__subsection-title">Open Graph tags — social and messaging previews</h3>
        <p className="MetaTagsGenerator__text">
          Open Graph tags control the link preview shown when your page is shared on Slack, Discord, LinkedIn, Facebook, Telegram, and iMessage. Without them, these platforms guess the title and image — usually poorly.
        </p>
        <div className="MetaTagsGenerator__table-wrap">
          <table className="MetaTagsGenerator__table">
            <thead>
              <tr>
                <th>Property</th>
                <th>What it controls</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="MetaTagsGenerator__table-highlight">
                <td><code>og:title</code></td>
                <td>Title shown in link preview cards</td>
                <td>≤ 60 chars, can differ from &lt;title&gt;</td>
              </tr>
              <tr className="MetaTagsGenerator__table-highlight">
                <td><code>og:description</code></td>
                <td>Description shown in link preview cards</td>
                <td>≤ 200 chars</td>
              </tr>
              <tr className="MetaTagsGenerator__table-highlight">
                <td><code>og:image</code></td>
                <td>Preview image — the single biggest visual impact</td>
                <td>1200×630 px JPG or PNG</td>
              </tr>
              <tr>
                <td><code>og:url</code></td>
                <td>Canonical URL for the shared link</td>
                <td>Full absolute URL</td>
              </tr>
              <tr>
                <td><code>og:type</code></td>
                <td>Content type</td>
                <td>website for most pages, article for blog posts</td>
              </tr>
              <tr>
                <td><code>og:site_name</code></td>
                <td>Brand name shown below the preview</td>
                <td>Your site or product name</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="MetaTagsGenerator__subsection-title">Robots meta tag — all directives</h3>
        <p className="MetaTagsGenerator__text">
          The robots meta tag controls crawler behavior per page. Most pages need no customization — the defaults are <code>index, follow</code>.
        </p>
        <div className="MetaTagsGenerator__table-wrap">
          <table className="MetaTagsGenerator__table">
            <thead>
              <tr>
                <th>Directive</th>
                <th>What it does</th>
                <th>When to use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>index</code> (default)</td>
                <td>Allow page to appear in search results</td>
                <td>All public pages</td>
              </tr>
              <tr>
                <td><code>noindex</code></td>
                <td>Remove page from search results</td>
                <td>Admin, thank-you, staging, duplicate pages</td>
              </tr>
              <tr>
                <td><code>follow</code> (default)</td>
                <td>Crawlers follow links on this page</td>
                <td>All pages</td>
              </tr>
              <tr>
                <td><code>nofollow</code></td>
                <td>Crawlers ignore links on this page</td>
                <td>Affiliate or heavily sponsored link pages</td>
              </tr>
              <tr>
                <td><code>noarchive</code></td>
                <td>Google won't show a cached version</td>
                <td>Privacy-sensitive or frequently updated pages</td>
              </tr>
              <tr>
                <td><code>nosnippet</code></td>
                <td>No description snippet in search results</td>
                <td>Paywalled or sensitive content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="MetaTagsGenerator__section">
        <h2 className="MetaTagsGenerator__section-title">How to add meta tags in your framework</h2>
        <p className="MetaTagsGenerator__text">
          After generating your tags above, here is how to paste them into the most common web stacks.
        </p>

        <h3 className="MetaTagsGenerator__subsection-title">Plain HTML</h3>
        <p className="MetaTagsGenerator__text">Paste directly inside <code>&lt;head&gt;</code> in your HTML file:</p>
        <div className="MetaTagsGenerator__code-block">
          <div className="MetaTagsGenerator__code-header">
            <span className="MetaTagsGenerator__code-label">HTML</span>
            <button
              type="button"
              className={`MetaTagsGenerator__code-copy${copiedKey === 'html' ? ' MetaTagsGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('html', HTML_CODE)}
            >
              {copiedKey === 'html' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="MetaTagsGenerator__code">{HTML_CODE}</pre>
        </div>

        <h3 className="MetaTagsGenerator__subsection-title">React (Vite) — react-helmet-async</h3>
        <p className="MetaTagsGenerator__text">
          Install <code>react-helmet-async</code>, wrap your app in <code>HelmetProvider</code>, then use <code>&lt;Helmet&gt;</code> in each page component:
        </p>
        <div className="MetaTagsGenerator__code-block">
          <div className="MetaTagsGenerator__code-header">
            <span className="MetaTagsGenerator__code-label">JSX</span>
            <button
              type="button"
              className={`MetaTagsGenerator__code-copy${copiedKey === 'react' ? ' MetaTagsGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('react', REACT_CODE)}
            >
              {copiedKey === 'react' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="MetaTagsGenerator__code">{REACT_CODE}</pre>
        </div>

        <h3 className="MetaTagsGenerator__subsection-title">Next.js 13+ (App Router)</h3>
        <p className="MetaTagsGenerator__text">
          Export a <code>metadata</code> object from your <code>page.js</code>. Next.js renders all tags server-side — no extra library needed:
        </p>
        <div className="MetaTagsGenerator__code-block">
          <div className="MetaTagsGenerator__code-header">
            <span className="MetaTagsGenerator__code-label">JS</span>
            <button
              type="button"
              className={`MetaTagsGenerator__code-copy${copiedKey === 'nextjs' ? ' MetaTagsGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('nextjs', NEXTJS_CODE)}
            >
              {copiedKey === 'nextjs' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="MetaTagsGenerator__code">{NEXTJS_CODE}</pre>
        </div>

        <h3 className="MetaTagsGenerator__subsection-title">Vue 3 + Nuxt 3</h3>
        <p className="MetaTagsGenerator__text">
          Use the built-in <code>useHead()</code> composable inside <code>&lt;script setup&gt;</code>:
        </p>
        <div className="MetaTagsGenerator__code-block">
          <div className="MetaTagsGenerator__code-header">
            <span className="MetaTagsGenerator__code-label">JS</span>
            <button
              type="button"
              className={`MetaTagsGenerator__code-copy${copiedKey === 'nuxt' ? ' MetaTagsGenerator__code-copy--done' : ''}`}
              onClick={() => handleCopy('nuxt', NUXT_CODE)}
            >
              {copiedKey === 'nuxt' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="MetaTagsGenerator__code">{NUXT_CODE}</pre>
        </div>

        <h3 className="MetaTagsGenerator__subsection-title">WordPress</h3>
        <p className="MetaTagsGenerator__text">
          Install <strong>Yoast SEO</strong> or <strong>Rank Math</strong> — both add a meta box below every post and page where you enter the SEO title, description, and Open Graph data. They handle canonical URLs, robots tags, and hreflang automatically. For finer control, add tags directly in your theme's <code>header.php</code> or use a header insertion plugin.
        </p>
      </section>

      <FAQ items={META_FAQ} />

      <nav className="MetaTagsGenerator__related">
        <h2 className="MetaTagsGenerator__section-title">Related tools</h2>
        <div className="MetaTagsGenerator__related-grid">
          <Link to="/favicon-generator" className="MetaTagsGenerator__related-card">
            <span className="MetaTagsGenerator__related-name">Favicon Generator</span>
            <span className="MetaTagsGenerator__related-desc">Generate favicon files from text, emoji, or image</span>
          </Link>
          <Link to="/webp-converter" className="MetaTagsGenerator__related-card">
            <span className="MetaTagsGenerator__related-name">WebP Converter</span>
            <span className="MetaTagsGenerator__related-desc">Convert images to WebP — 25–34% smaller files for faster pages</span>
          </Link>
          <Link to="/compress-png" className="MetaTagsGenerator__related-card">
            <span className="MetaTagsGenerator__related-name">Compress PNG</span>
            <span className="MetaTagsGenerator__related-desc">Reduce PNG file size — lossless compression</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
