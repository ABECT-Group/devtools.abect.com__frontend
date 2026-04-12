import { Helmet } from 'react-helmet-async'
import './PrivacyPolicy.scss'

const PAGE_TITLE = 'Privacy Policy | Abect'
const PAGE_DESCRIPTION = 'Privacy Policy for devtools.abect.com, including analytics, cookies, Microsoft Clarity usage, and data handling.'
const PAGE_URL = 'https://devtools.abect.com/privacy-policy'

export default function PrivacyPolicy() {
  return (
    <main className="PrivacyPolicy">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
      </Helmet>

      <h1 className="PrivacyPolicy__title">Privacy Policy</h1>
      <p className="PrivacyPolicy__lead">
        This Privacy Policy explains what data we collect, how we use it, and how analytics
        cookies work on this website.
      </p>

      <section className="PrivacyPolicy__section">
        <h2>Website Data</h2>
        <p>
          This website is designed to work directly in your browser. Files processed by tools on
          this website are not uploaded to our servers.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Analytics</h2>
        <p>
          If you accept analytics cookies, we may use Microsoft Clarity to understand how visitors
          use this website, including page views, clicks, scrolling behavior, device information,
          and general usage patterns.
        </p>
        <p>
          We use this information to improve the website, identify usability issues, and make our
          tools easier to use.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Cookies</h2>
        <p>
          Microsoft Clarity loads only after you explicitly accept analytics cookies through the
          consent banner. If you reject analytics cookies, Clarity does not load.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Third-Party Service</h2>
        <p>
          Analytics data may be processed by Microsoft Clarity. You can read more in Microsoft
          privacy and Microsoft Clarity documentation.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Your Choice</h2>
        <p>
          You can accept or reject analytics cookies when the consent banner appears. Your choice
          is stored locally in your browser.
        </p>
      </section>
    </main>
  )
}
