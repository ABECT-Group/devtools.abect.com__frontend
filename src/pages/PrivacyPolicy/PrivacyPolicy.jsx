import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './PrivacyPolicy.scss'

const PAGE_TITLE = 'Privacy Policy | Abect Dev Tools'
const PAGE_DESCRIPTION = 'Privacy Policy for Abect Dev Tools — what we collect, how sessions work, how Lora AI handles your messages, and your right to access and delete your data.'
const PAGE_URL = 'https://devtools.abect.com/privacy-policy'
const OG_IMAGE_URL = 'https://devtools.abect.com/seo/og.jpg'

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

      <h1 className="PrivacyPolicy__title">Privacy Policy</h1>
      <p className="PrivacyPolicy__lead">
        This Privacy Policy explains what data we collect when you use Abect Dev Tools
        (devtools.abect.com), why we collect it, who it is shared with, and what rights you have
        over it. See also our <Link to="/terms">Terms of Service</Link>.
        Last updated: August 5, 2026.
      </p>

      <section className="PrivacyPolicy__section">
        <h2>Who is responsible for your data</h2>
        <p>
          Abect Dev Tools is built and operated by <strong>Roman Popovych</strong> (Ukraine), who
          acts as the data controller for the purposes of the GDPR. For any privacy question,
          data request, or complaint, write to{' '}
          <a href="mailto:support@abect.com">support@abect.com</a> — this is the fastest route and
          we answer every message.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Short version</h2>
        <ul>
          <li>
            The 49 browser tools — image converters, compressors, text converters, form-based
            schema generators — collect <strong>nothing</strong>. They need no account and your
            files never leave your device.
          </li>
          <li>
            An account is required only for the Lora AI assistant. Then we store your email,
            your conversations, and your token usage.
          </li>
          <li>
            Messages you send to Lora are transmitted to <strong>DeepSeek</strong>, an AI provider
            in China, to generate the reply.
          </li>
          <li>
            The service is free. There are no paid plans and we never ask for payment details.
          </li>
          <li>
            You can delete your account and everything in it at any time, in one click.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Browser-based tools — no data collected</h2>
        <p>
          Image converters, image compressors, text and code converters, and the form-based schema
          generators run entirely in your browser. Files you drop in or text you paste are processed
          locally using the Canvas API and File API — they are never sent to our servers, and we
          never see them. No file data leaves your device.
        </p>
        <p>
          You can verify this: open DevTools → Network, use any of these tools, and observe that no
          file is transferred. These tools also keep working with the network disconnected.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>User accounts</h2>
        <p>
          Creating an account is required only for the Lora AI assistant. If you register, we store:
        </p>
        <ul>
          <li>Your email address — used for login and transactional emails (verification, password reset)</li>
          <li>A bcrypt-hashed password — your actual password is never stored in plain text</li>
          <li>Display name, profile photo and Google account identifier — only when you sign in via Google</li>
          <li>Authentication provider — whether you use email/password or Google</li>
          <li>Whether your email address has been verified</li>
          <li>
            Email verification and password reset codes — six digits, valid for 15 minutes.
            They are stored on our servers until they are used or expire, then cleared.
          </li>
          <li>Your token balance and the date it next resets</li>
          <li>
            Tools you mark as favourites — the tool name and route, so the list can be shown
            back to you
          </li>
          <li>Account creation and last update dates</li>
        </ul>
        <p>
          Your account record also contains an inactive subscription field that is fixed to the free
          plan. The service is free, we operate no paid tier, and we hold no payment or card data
          of any kind.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Authentication and sessions</h2>
        <p>When you sign in, we issue two tokens:</p>
        <ul>
          <li>
            <strong>Access token</strong> — a short-lived JWT (15 minutes), stored in memory only.
            It is never written to localStorage or cookies.
          </li>
          <li>
            <strong>Refresh token</strong> — a 30-day session identifier stored as a secure,
            httpOnly, SameSite=Strict cookie (<code>refreshToken</code>). It is not accessible to
            JavaScript. In our database it is a random UUID, not a decodable JWT.
          </li>
        </ul>
        <p>
          Each time you open the site, the refresh token silently restores your session. Logging out
          immediately invalidates the token and removes the cookie. Refresh tokens are deleted from
          the database automatically 30 days after issue, enforced by a database-level expiry rule.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Lora AI assistant</h2>
        <p>
          When you send a message to Lora, your message and the earlier messages of that
          conversation are transmitted to the <strong>DeepSeek API</strong> to generate a response.
          This is the only feature on the site that sends your input to a server.
        </p>
        <p>We store, linked to your account:</p>
        <ul>
          <li>Every message in the conversation — both yours and Lora's — and the tokens each one cost</li>
          <li>A conversation title, generated from your first message</li>
          <li>Which skill the conversation uses</li>
          <li>
            <strong>Files produced by Lora.</strong> When a reply contains a complete file — a code
            snippet with a filename, a schema, a config — we extract and store that file's name and
            full contents so it can be shown in the conversation's file panel. These are files the
            assistant generated, not files you uploaded; the chat has no file upload.
          </li>
          <li>An optional summary of the conversation, if you generate one</li>
        </ul>
        <p>
          <strong>Conversations are private.</strong> Every conversation is readable only by the
          account that created it; the server refuses any other request. There is currently no
          feature that makes a conversation public or shareable.
        </p>
        <p>
          We do not use your messages for advertising, for training any model, or for anything other
          than producing the response you asked for. You can delete individual conversations from
          the sidebar, or remove everything by deleting your account.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Token system</h2>
        <p>
          Each AI request deducts tokens from your monthly balance. We keep a transaction log of
          charges, refills and bonuses linked to your account — the amount, the type, a short
          description and the timestamp. It exists to display your usage history in
          Profile → Usage and to keep the balance accurate. It is deleted permanently when you
          delete your account.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Technical data and server logs</h2>
        <ul>
          <li>
            <strong>Infrastructure logs.</strong> Delivering any website requires processing
            connection metadata — IP address, user agent, requested URL, timestamp. Our hosting
            provider and API server process this to serve responses and to detect abuse.
          </li>
          <li>
            <strong>Rate limiting.</strong> To block brute-force and abuse, the API counts requests
            per IP address in server memory (for example, 10 sign-in attempts per 10 minutes).
            These counters are transient and are not written to the database.
          </li>
          <li>
            <strong>Application logs.</strong> The API writes operational logs — errors and
            warnings, which may include the internal account identifier of the affected user, but
            not your conversation content. Log files rotate daily and are deleted after
            <strong> 30 days</strong>.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Analytics</h2>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> and <strong>Microsoft Clarity</strong> — page views,
            clicks, scrolling, device type and general usage patterns, used to find usability
            problems. Neither one loads until you explicitly accept analytics cookies in the consent
            banner.
          </li>
          <li>
            <strong>Vercel Web Analytics</strong> — a privacy-preserving, aggregate page-view
            counter provided by our host. It sets no cookies and builds no cross-site profile, so it
            runs without a consent prompt.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Cookies and local storage</h2>
        <ul>
          <li>
            <strong>refreshToken</strong> — set when you sign in. Secure, httpOnly,
            SameSite=Strict, expires after 30 days. Strictly necessary to keep you signed in.
          </li>
          <li>
            <strong>Analytics cookies</strong> — Google Analytics 4 and Microsoft Clarity. Loaded
            only after you accept them in the consent banner.
          </li>
          <li>
            <strong>Local storage</strong> — your cookie choice, colour theme, sidebar mode, and a
            flag noting that you were signed in (so the header does not flicker on load). This data
            stays in your browser and is never transmitted.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Who we share data with</h2>
        <ul>
          <li>
            <strong>DeepSeek</strong> (China) — receives your Lora messages and conversation history
            to generate replies. See{' '}
            <a href="https://www.deepseek.com/en/privacy_policy" target="_blank" rel="noopener noreferrer">
              DeepSeek's privacy policy
            </a>.
          </li>
          <li>
            <strong>Brevo</strong> (France, EU) — delivers transactional emails. Receives your email
            address and the verification or reset code.
          </li>
          <li>
            <strong>Google</strong> (USA) — Google OAuth sign-in and Google Analytics 4. With
            "Continue with Google", Google shares your name, email and profile photo with us. See{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's privacy policy
            </a>.
          </li>
          <li><strong>Microsoft</strong> (USA) — Clarity session analytics, consent-gated.</li>
          <li><strong>Vercel</strong> (USA) — hosts the website and provides aggregate analytics.</li>
        </ul>
        <p>
          We do not sell your data, we do not share it with advertisers, and we do not use it to
          build advertising profiles.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>International data transfers</h2>
        <p>
          If you are in the European Economic Area or the United Kingdom, note that using the Lora
          AI assistant transfers your messages to <strong>DeepSeek in China</strong>, a country
          without an EU adequacy decision. Analytics and hosting providers listed above process
          data in the <strong>United States</strong>. Our own API server is operated from Ukraine,
          which the European Commission has not issued an adequacy decision for.
        </p>
        <p>
          If you do not want your text leaving this jurisdiction set, do not use the AI assistant —
          every other tool on the site runs entirely on your own device and transfers nothing.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Why we are allowed to process this (legal basis)</h2>
        <ul>
          <li>
            <strong>Performance of a contract</strong> — account data, sessions, conversations and
            token accounting. Without them the AI assistant cannot work.
          </li>
          <li>
            <strong>Your consent</strong> — Google Analytics 4 and Microsoft Clarity. You may
            withdraw it at any time via Cookie Settings, with no effect on anything else.
          </li>
          <li>
            <strong>Legitimate interest</strong> — rate limiting, abuse prevention and error logs,
            in order to keep a free service available and secure.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>How long we keep it</h2>
        <ul>
          <li>Account data, conversations, generated files and transaction history — until you delete your account</li>
          <li>Refresh tokens — 30 days from issue, then removed automatically</li>
          <li>Email verification and password reset codes — 15 minutes</li>
          <li>Application logs — 30 days</li>
          <li>Rate-limit counters — minutes, in memory only</li>
          <li>Analytics data — per Google's and Microsoft's own retention policies</li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Your rights</h2>
        <p>
          Under the GDPR and comparable laws you have the right to access your data, to correct it,
          to erase it, to restrict or object to its processing, to receive a copy in a portable
          format, and to withdraw consent at any time.
        </p>
        <ul>
          <li>
            <strong>Erasure</strong> — immediate and self-service:
            Profile → Account → Delete account. It permanently removes your account, every stored
            conversation and generated file, your full token transaction history, and all active
            sessions. Nothing personal is kept afterwards.
          </li>
          <li>
            <strong>Access, correction, portability, restriction, objection</strong> — email{' '}
            <a href="mailto:support@abect.com">support@abect.com</a> and we will respond within
            30 days.
          </li>
          <li>
            <strong>Withdrawing analytics consent</strong> — Cookie Settings, in the sidebar footer.
          </li>
        </ul>
        <p>
          If you are in the EEA or UK and believe we have handled your data improperly, you also
          have the right to lodge a complaint with your national data protection authority.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Children</h2>
        <p>
          Accounts are not intended for anyone under 16. We do not knowingly collect data from
          children. If you believe a child has created an account, write to{' '}
          <a href="mailto:support@abect.com">support@abect.com</a> and we will delete it. The
          browser tools collect no data at all and can be used by anyone.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Security</h2>
        <p>
          Passwords are hashed with bcrypt. Sessions use httpOnly, SameSite=Strict cookies over
          HTTPS only. The database is not reachable from the public internet. To report a security
          issue, see our{' '}
          <a href="/.well-known/security.txt">security.txt</a> or write to{' '}
          <a href="mailto:support@abect.com">support@abect.com</a>.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Changes to this policy</h2>
        <p>
          We update this policy as the product changes. The current version always lives at
          devtools.abect.com/privacy-policy, with the revision date at the top. If a change
          materially affects how we handle your data, we will make it visible on the site rather
          than changing the text quietly.
        </p>
      </section>
    </main>
  )
}
