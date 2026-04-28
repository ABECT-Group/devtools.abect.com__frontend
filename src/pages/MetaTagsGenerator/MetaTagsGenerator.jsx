import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../components/FAQ/FAQ'
import PageHeader from '../../components/PageHeader/PageHeader'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import Table from '../../components/Table/Table'
import CodeBox from '../../components/CodeBox/CodeBox'
import ToolSection from '../../components/ToolSection/ToolSection'
import ContentSection from '../../components/ContentSection/ContentSection'
import CodeOutput from './components/CodeOutput/CodeOutput'
import MetaInputs from './components/MetaInputs/MetaInputs'
import SnippetPreview from './components/SnippetPreview/SnippetPreview'
import { generateMetaTags } from './utils/generateMetaTags'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdApp, jsonLdHowTo, jsonLdFaq } from './data/jsonld'
import { HOW_TO_STEPS, FAQ as FAQ_ITEMS, HTML_CODE, REACT_CODE, NEXTJS_CODE, NUXT_CODE, RELATED_TOOLS } from './data/content'
import './MetaTagsGenerator.scss'

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
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Abect Dev Tools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdHowTo)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <PageHeader
        title="Free SEO Meta Tag Generator"
        subtitle="Generate title, description, canonical, robots, hreflang and Open Graph tags — live preview included, copy-ready HTML output."
      />

      <ToolSection>
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
      </ToolSection>

      <ContentSection title="How to generate meta tags">
        <ol className="ContentSection__steps">
          {HOW_TO_STEPS.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </ContentSection>

      <ContentSection title="Essential SEO meta tags — what each one does">
        <p className="ContentSection__text">
          Not all meta tags are equal. Some directly affect rankings, others influence click-through rate, and some are purely technical. Here is the complete list with impact levels.
        </p>

        <Table columns={['Tag', 'Purpose', 'Max length', 'SEO impact']}>
          <tr className="Table__row--highlight"><td><code>&lt;title&gt;</code></td><td>Clickable headline in Google search results and browser tab</td><td>60 chars</td><td>Very high</td></tr>
          <tr className="Table__row--highlight"><td><code>meta description</code></td><td>Snippet text shown below the title in search results</td><td>160 chars</td><td>CTR (not ranking)</td></tr>
          <tr><td><code>rel="canonical"</code></td><td>Signals preferred URL — prevents duplicate content issues</td><td>—</td><td>High</td></tr>
          <tr><td><code>meta robots</code></td><td>Index/noindex and follow/nofollow crawler instructions</td><td>—</td><td>High (when set)</td></tr>
          <tr><td><code>meta viewport</code></td><td>Mobile browser rendering — required for responsive sites</td><td>—</td><td>Required</td></tr>
          <tr><td><code>meta charset</code></td><td>Character encoding declaration (always UTF-8)</td><td>—</td><td>Required</td></tr>
          <tr><td><code>meta author</code></td><td>Page author — minor E-E-A-T signal</td><td>—</td><td>Low</td></tr>
          <tr><td><code>meta keywords</code></td><td>Keywords — ignored by Google since 2009</td><td>—</td><td>None</td></tr>
        </Table>

        <h3 className="ContentSection__subsection-title">Open Graph tags — social and messaging previews</h3>
        <p className="ContentSection__text">
          Open Graph tags control the link preview shown when your page is shared on Slack, Discord, LinkedIn, Facebook, Telegram, and iMessage. Without them, these platforms guess the title and image — usually poorly.
        </p>
        <Table columns={['Property', 'What it controls', 'Recommendation']}>
          <tr className="Table__row--highlight"><td><code>og:title</code></td><td>Title shown in link preview cards</td><td>≤ 60 chars, can differ from &lt;title&gt;</td></tr>
          <tr className="Table__row--highlight"><td><code>og:description</code></td><td>Description shown in link preview cards</td><td>≤ 200 chars</td></tr>
          <tr className="Table__row--highlight"><td><code>og:image</code></td><td>Preview image — the single biggest visual impact</td><td>1200×630 px JPG or PNG</td></tr>
          <tr><td><code>og:url</code></td><td>Canonical URL for the shared link</td><td>Full absolute URL</td></tr>
          <tr><td><code>og:type</code></td><td>Content type</td><td>website for most pages, article for blog posts</td></tr>
          <tr><td><code>og:site_name</code></td><td>Brand name shown below the preview</td><td>Your site or product name</td></tr>
        </Table>

        <h3 className="ContentSection__subsection-title">Robots meta tag — all directives</h3>
        <p className="ContentSection__text">
          The robots meta tag controls crawler behavior per page. Most pages need no customization — the defaults are <code>index, follow</code>.
        </p>
        <Table columns={['Directive', 'What it does', 'When to use']}>
          <tr><td><code>index</code> (default)</td><td>Allow page to appear in search results</td><td>All public pages</td></tr>
          <tr><td><code>noindex</code></td><td>Remove page from search results</td><td>Admin, thank-you, staging, duplicate pages</td></tr>
          <tr><td><code>follow</code> (default)</td><td>Crawlers follow links on this page</td><td>All pages</td></tr>
          <tr><td><code>nofollow</code></td><td>Crawlers ignore links on this page</td><td>Affiliate or heavily sponsored link pages</td></tr>
          <tr><td><code>noarchive</code></td><td>Google won't show a cached version</td><td>Privacy-sensitive or frequently updated pages</td></tr>
          <tr><td><code>nosnippet</code></td><td>No description snippet in search results</td><td>Paywalled or sensitive content</td></tr>
        </Table>
      </ContentSection>

      <ContentSection title="How to add meta tags in your framework">
        <p className="ContentSection__text">
          After generating your tags above, here is how to paste them into the most common web stacks.
        </p>

        <h3 className="ContentSection__subsection-title">Plain HTML</h3>
        <p className="ContentSection__text">Paste directly inside <code>&lt;head&gt;</code> in your HTML file:</p>
        <CodeBox label="HTML" code={HTML_CODE} />

        <h3 className="ContentSection__subsection-title">React (Vite) — react-helmet-async</h3>
        <p className="ContentSection__text">
          Install <code>react-helmet-async</code>, wrap your app in <code>HelmetProvider</code>, then use <code>&lt;Helmet&gt;</code> in each page component:
        </p>
        <CodeBox label="JSX" code={REACT_CODE} />

        <h3 className="ContentSection__subsection-title">Next.js 13+ (App Router)</h3>
        <p className="ContentSection__text">
          Export a <code>metadata</code> object from your <code>page.js</code>. Next.js renders all tags server-side — no extra library needed:
        </p>
        <CodeBox label="JS" code={NEXTJS_CODE} />

        <h3 className="ContentSection__subsection-title">Vue 3 + Nuxt 3</h3>
        <p className="ContentSection__text">
          Use the built-in <code>useHead()</code> composable inside <code>&lt;script setup&gt;</code>:
        </p>
        <CodeBox label="JS" code={NUXT_CODE} />

        <h3 className="ContentSection__subsection-title">WordPress</h3>
        <p className="ContentSection__text">
          Install <strong>Yoast SEO</strong> or <strong>Rank Math</strong> — both add a meta box below every post and page where you enter the SEO title, description, and Open Graph data. They handle canonical URLs, robots tags, and hreflang automatically. For finer control, add tags directly in your theme's <code>header.php</code> or use a header insertion plugin.
        </p>
      </ContentSection>

      <FAQ items={FAQ_ITEMS} />

      <RelatedTools items={RELATED_TOOLS} />
    </main>
  )
}
