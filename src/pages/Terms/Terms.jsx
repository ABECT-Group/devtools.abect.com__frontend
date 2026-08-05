import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './Terms.scss'

const PAGE_TITLE = 'Terms of Service | Abect Dev Tools'
const PAGE_DESCRIPTION = 'Terms of Service for Abect Dev Tools — how to use the free browser tools and the Lora AI assistant, acceptable use rules, and the AI output disclaimer.'
const PAGE_URL = 'https://devtools.abect.com/terms'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

export default function Terms() {
  return (
    <main className="Terms">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="article" />
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
      </Helmet>

      <h1 className="Terms__title">Terms of Service</h1>
      <p className="Terms__lead">
        These Terms govern your use of Abect Dev Tools (devtools.abect.com). By using the site you
        agree to them. For how we handle data, see the{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>.
        Last updated: August 5, 2026.
      </p>

      <section className="Terms__section">
        <h2>1. Who provides this service</h2>
        <p>
          Abect Dev Tools is built and operated by <strong>Roman Popovych</strong> (Ukraine).
          Contact: <a href="mailto:support@abect.com">support@abect.com</a>.
        </p>
      </section>

      <section className="Terms__section">
        <h2>2. What the service is</h2>
        <p>The site has two distinct parts, and the rules differ between them:</p>
        <ul>
          <li>
            <strong>Browser tools</strong> — image converters and compressors, text and code
            converters, favicon, meta tag and schema generators. They run entirely in your browser.
            No account, no upload, no limits.
          </li>
          <li>
            <strong>Lora, the AI assistant</strong> — requires a free account and consumes tokens
            from a monthly allowance. Your input is sent to a third-party AI provider to generate
            the response.
          </li>
        </ul>
        <p>
          <strong>The service is free.</strong> There are no paid plans, no subscriptions, and no
          trials that convert into charges. We do not request, process or store payment or card
          details. If that ever changes, these Terms will be updated first and the change announced
          on the site.
        </p>
      </section>

      <section className="Terms__section">
        <h2>3. Accounts</h2>
        <ul>
          <li>You must be at least 16 years old to create an account.</li>
          <li>Provide an email address you control, and keep your credentials secure.</li>
          <li>One account per person. Creating multiple accounts to obtain extra token allowance is not permitted.</li>
          <li>You are responsible for activity performed under your account.</li>
          <li>
            You may delete your account at any time from Profile → Account → Delete account. It is
            immediate and irreversible.
          </li>
        </ul>
      </section>

      <section className="Terms__section">
        <h2>4. Acceptable use</h2>
        <p>Across the whole site, you agree not to:</p>
        <ul>
          <li>Break the law, or use the service to help anyone else break it</li>
          <li>Attempt to gain unauthorised access to the service, other accounts, or our infrastructure</li>
          <li>Probe, scan or stress-test the service except as described in our security contact policy</li>
          <li>Circumvent rate limits, token accounting, or authentication</li>
          <li>Scrape or resell the service, or run it as the backend of another product</li>
          <li>Upload or transmit malware, or content designed to damage other people's systems</li>
        </ul>

        <h3>4.1 Acceptable use of the Lora AI assistant</h3>
        <p>
          Lora is a narrow developer assistant. What you type is sent to a third-party AI provider
          and stored in your conversation history, so treat it like a public-facing system, not a
          vault. Specifically, do not submit:
        </p>
        <ul>
          <li>
            <strong>Secrets</strong> — API keys, passwords, private keys, access tokens, database
            credentials, or anything else that grants access to a system
          </li>
          <li>
            <strong>Personal data about other people</strong> — customer records, employee data,
            contact lists, or any dataset you do not have the right to disclose to a third-party
            processor
          </li>
          <li>
            <strong>Special-category and regulated data</strong> — health records, financial account
            data, government identifiers, biometric data
          </li>
          <li>
            <strong>Confidential material you are not entitled to share</strong> — proprietary
            source code or documents covered by an NDA
          </li>
          <li>
            Content that is illegal, that sexualises minors, that harasses or defames a person, or
            that is intended to deceive — including generating structured data that misrepresents a
            business, its prices, its reviews or its ratings
          </li>
          <li>Prompts designed to extract system prompts, bypass safety behaviour, or abuse the model</li>
        </ul>
        <p>
          We do not monitor conversations, and they remain private to your account. But if we are
          made aware of a violation, we may suspend or terminate the account.
        </p>
      </section>

      <section className="Terms__section">
        <h2>5. AI output — no guarantee of correctness</h2>
        <p>
          Lora produces output statistically. It can be wrong, incomplete, or outdated, and it can
          state something incorrect with complete confidence. This matters here more than usual,
          because the output is often structured data intended to go live on a production website.
        </p>
        <ul>
          <li>
            <strong>Verify before you publish.</strong> Run any generated schema through Google's
            Rich Results Test and the Schema.org validator. Read generated code before you deploy
            it.
          </li>
          <li>
            <strong>You are responsible for what you publish.</strong> Structured data that
            misdescribes a page can lead to a manual action against your site by a search engine.
            That responsibility is yours, not ours.
          </li>
          <li>
            <strong>It is not professional advice.</strong> Nothing produced by Lora is legal,
            financial, medical or other regulated advice.
          </li>
          <li>
            Search engines change their requirements. Output that is valid today may not be valid
            later.
          </li>
        </ul>
        <p>
          The same applies to the browser tools: they perform the conversion you asked for, but you
          are responsible for checking that the result fits your use case before shipping it.
        </p>
      </section>

      <section className="Terms__section">
        <h2>6. Your content and ours</h2>
        <p>
          <strong>You keep ownership of what you put in and what comes out.</strong> We claim no
          rights over your prompts, your files, or the output Lora generates for you. We store your
          conversations solely to show them back to you and to operate the service — we do not use
          them for training, advertising, or any other purpose. Files you process with the browser
          tools never reach us at all.
        </p>
        <p>
          The project's source code is published at{' '}
          <a href="https://github.com/ABECT-Group/devtools.abect.com__frontend" target="_blank" rel="noopener noreferrer">
            github.com/ABECT-Group
          </a>{' '}
          and is governed by the licence stated in that repository. The Abect name, branding and
          site copy are not covered by that licence.
        </p>
      </section>

      <section className="Terms__section">
        <h2>7. Availability and changes</h2>
        <p>
          This is a free service provided as-is, with no uptime commitment and no service level
          agreement. We may add, change, limit or discontinue any feature — including the AI
          assistant, the token allowance, or the service as a whole — at any time. Where a change
          would remove access to data you have stored with us, we will give reasonable notice so you
          can export it.
        </p>
      </section>

      <section className="Terms__section">
        <h2>8. Suspension and termination</h2>
        <p>
          You may stop using the service at any time and delete your account yourself. We may
          suspend or terminate an account that violates these Terms, that abuses the free token
          allowance, or that puts the service or other users at risk. Where circumstances allow, we
          will explain the reason and give you a chance to respond first.
        </p>
      </section>

      <section className="Terms__section">
        <h2>9. Disclaimer and limitation of liability</h2>
        <p>
          The service is provided "as is" and "as available", without warranties of any kind, express
          or implied, including fitness for a particular purpose and non-infringement. We do not
          warrant that the service will be uninterrupted, error-free, or that any output will be
          accurate.
        </p>
        <p>
          To the fullest extent permitted by law, we are not liable for indirect, incidental or
          consequential damages, for lost profits, lost data, or for loss of search rankings or
          traffic arising from your use of the service or from output it generated. Nothing here
          limits liability that cannot be limited by law, and if you are a consumer, your mandatory
          statutory rights are unaffected.
        </p>
      </section>

      <section className="Terms__section">
        <h2>10. Changes to these Terms</h2>
        <p>
          We may update these Terms as the product evolves. The current version always lives at
          devtools.abect.com/terms, with the revision date at the top. Continuing to use the service
          after a change means you accept the updated Terms; if you do not, stop using the service
          and delete your account.
        </p>
      </section>

      <section className="Terms__section">
        <h2>11. Governing law and contact</h2>
        <p>
          These Terms are governed by the law of Ukraine, without prejudice to any mandatory
          consumer protection rules of the country where you live. Questions, complaints and legal
          notices: <a href="mailto:support@abect.com">support@abect.com</a>.
        </p>
        <p>
          Security issues: see{' '}
          <a href="/.well-known/security.txt">security.txt</a>.
        </p>
      </section>
    </main>
  )
}
