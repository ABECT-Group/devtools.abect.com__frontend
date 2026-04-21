import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FAQ from '../../components/FAQ/FAQ'
import CodeOutput from './components/CodeOutput/CodeOutput'
import MetaInputs from './components/MetaInputs/MetaInputs'
import SnippetPreview from './components/SnippetPreview/SnippetPreview'
import { generateMetaTags } from './utils/generateMetaTags'
import './MetaTagsGenerator.scss'

const PAGE_TITLE = 'Free Meta Tag Generator: SEO Tags, Canonical, Hreflang | Abect'
const PAGE_DESCRIPTION = 'Generate SEO meta tags instantly — title, description, canonical, robots, hreflang. Live Google preview and copy-ready HTML. Free, no signup. Try it now.'
const PAGE_URL = 'https://devtools.abect.com/meta-tags-generator'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/meta-tags-generator-og.jpg'

const META_FAQ = [
  {
    question: 'What are HTML meta tags?',
    answer: 'Meta tags are HTML elements placed in the <head> section of a page that provide metadata to browsers and search engines. They are not visible to users but control how your page is indexed, how it appears in search results, and how it is shared on social media.',
  },
  {
    question: 'Does the keywords meta tag help with Google SEO?',
    answer: 'No. Google has ignored the meta keywords tag since 2009. It has no effect on Google rankings. Other search engines like Yandex may still use it. Include it only if clients or CMS platforms specifically require it.',
  },
  {
    question: 'What is a canonical URL and why does it matter?',
    answer: 'The canonical tag (rel="canonical") tells search engines which URL is the preferred version of a page when the same or similar content exists on multiple URLs. It prevents duplicate content issues and consolidates ranking signals to the correct URL.',
  },
  {
    question: 'What does noindex mean in the robots meta tag?',
    answer: 'Adding "noindex" instructs search engines not to include that page in their index. Use it for thank-you pages, internal dashboards, staging environments, or any page you do not want to appear in search results.',
  },
  {
    question: 'When do I need hreflang tags?',
    answer: 'Use hreflang tags when your site serves the same content in multiple languages or has region-specific versions (e.g., /en/ and /fr/). They tell Google which language variant to show users in different countries. The x-default value specifies the fallback page for users whose language is not listed.',
  },
  {
    question: 'What is the viewport meta tag and do I need it?',
    answer: 'The viewport tag (<meta name="viewport" content="width=device-width, initial-scale=1">) tells mobile browsers to display the page at the device\'s actual width rather than zooming out to fit a desktop layout. It is essential for any responsive website and is automatically included in the generated code.',
  },
]

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
  const [themeColor, setThemeColor]                 = useState('#ffffff')
  const [themeColorDark, setThemeColorDark]         = useState('#000000')
  const [enableThemeColorDark, setEnableThemeColorDark] = useState(false)
  const [charset, setCharset]                       = useState('UTF-8')
  const [colorScheme, setColorScheme]               = useState('')
  const [referrerPolicy, setReferrerPolicy]         = useState('')
  const [noTranslate, setNoTranslate]               = useState(false)
  const [noScale, setNoScale]                       = useState(false)
  const [noPhoneDetection, setNoPhoneDetection]     = useState(false)
  const [addComments, setAddComments]               = useState(false)

  function handleHreflangAdd() {
    setHreflangEntries(prev => [...prev, { id: crypto.randomUUID(), lang: '', url: '' }])
  }

  function handleHreflangRemove(id) {
    setHreflangEntries(prev => prev.filter(e => e.id !== id))
  }

  function handleHreflangChange(id, key, value) {
    setHreflangEntries(prev => prev.map(e => e.id === id ? { ...e, [key]: value } : e))
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Free Meta Tag Generator',
          'url': PAGE_URL,
          'description': PAGE_DESCRIPTION,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'Any',
          'browserRequirements': 'Requires JavaScript',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'featureList': [
            'Generate SEO meta tags',
            'Live Google search preview',
            'Canonical URL tag',
            'Robots meta tag (noindex, nofollow)',
            'Hreflang multilingual tags',
            'Theme color with dark mode variant',
            'Color scheme declaration',
            'Referrer policy',
            'Copy-ready HTML output with optional comments',
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': META_FAQ.map(item => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
          })),
        })}</script>
      </Helmet>

      <h1 className="MetaTagsGenerator__title">Meta tag generator</h1>
      <p className="MetaTagsGenerator__sub">
        Fill in the fields — the code updates live. Nothing is uploaded or stored.
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
          <li>Enter your page <strong>Title</strong> (up to 60 characters) and <strong>Description</strong> (up to 160 characters) — the Google preview on the right updates as you type.</li>
          <li>Paste your page URL into the <strong>Canonical URL</strong> field to tell search engines which URL is the authoritative version.</li>
          <li>Adjust <strong>Page indexing</strong> and <strong>Link following</strong> if needed — leave both as default for most public pages.</li>
          <li>Enable <strong>Multilingual</strong> if your site has multiple language versions and add each language code and URL pair.</li>
          <li>Click <strong>Copy code</strong> and paste the output into the <code>&lt;head&gt;</code> section of your HTML.</li>
        </ol>
      </section>

      <section className="MetaTagsGenerator__section">
        <h2 className="MetaTagsGenerator__section-title">What are HTML meta tags?</h2>
        <p className="MetaTagsGenerator__text">
          Meta tags are HTML elements placed inside the <code>&lt;head&gt;</code> section of a web page. They are not rendered in the browser but provide important metadata to search engines, social media platforms, and browsers — controlling how your page is indexed, described, and shared.
        </p>

        <h3 className="MetaTagsGenerator__subsection-title">Title tag</h3>
        <p className="MetaTagsGenerator__text">
          The <code>&lt;title&gt;</code> tag defines the page title shown in browser tabs and as the clickable blue link in Google search results. Keep it under <strong>60 characters</strong> and place your primary keyword near the beginning. It is the single most important on-page SEO element.
        </p>

        <h3 className="MetaTagsGenerator__subsection-title">Meta description</h3>
        <p className="MetaTagsGenerator__text">
          The description is shown as the snippet text below the title in search results. It does not directly affect rankings but significantly impacts click-through rate. Aim for <strong>120–160 characters</strong>, include a clear benefit, and end with a call to action.
        </p>

        <h3 className="MetaTagsGenerator__subsection-title">Canonical URL</h3>
        <p className="MetaTagsGenerator__text">
          When the same content is accessible at multiple URLs (e.g., with/without trailing slash, www vs non-www, UTM parameters), the canonical tag tells Google which version to index. Without it, search engines may split ranking signals across duplicate pages.
        </p>

        <h3 className="MetaTagsGenerator__subsection-title">Robots meta tag</h3>
        <p className="MetaTagsGenerator__text">
          Controls crawler behavior for this specific page. <strong>noindex</strong> prevents the page from appearing in search results. <strong>nofollow</strong> prevents crawlers from following outbound links. Use sparingly — most pages should stay on the default <code>index, follow</code>.
        </p>

        <h3 className="MetaTagsGenerator__subsection-title">Hreflang for multilingual sites</h3>
        <p className="MetaTagsGenerator__text">
          If your site has multiple language versions, hreflang tags tell Google which URL to show users based on their language and country. The <code>x-default</code> tag specifies the fallback URL when no language variant matches. Without hreflang, Google may show the wrong language version in search results.
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
            <span className="MetaTagsGenerator__related-desc">Convert images to WebP for faster page loads</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
