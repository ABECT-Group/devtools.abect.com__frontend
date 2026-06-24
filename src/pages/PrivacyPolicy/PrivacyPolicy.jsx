import { Helmet } from 'react-helmet-async'
import './PrivacyPolicy.scss'

const PAGE_TITLE = 'Privacy Policy | Abect Dev Tools'
const PAGE_DESCRIPTION = 'Privacy Policy for devtools.abect.com — what data we collect, how authentication works, how Lora AI processes your messages, and your rights to delete your account and data.'
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <h1 className="PrivacyPolicy__title">Privacy Policy</h1>
      <p className="PrivacyPolicy__lead">
        This Privacy Policy explains what data we collect when you use Abect Dev Tools
        (devtools.abect.com), how we use it, and what rights you have over your data.
        Last updated: June 20, 2026.
      </p>

      <section className="PrivacyPolicy__section">
        <h2>Browser-based tools</h2>
        <p>
          Image converters, image compressors, text converters, and form-based schema generators
          run entirely in your browser. Files you upload or paste are processed locally using the
          Canvas API and File API — they are never sent to our servers. No file data leaves your device.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>User accounts</h2>
        <p>
          Creating an account is required only for the Lora AI assistant. If you register, we collect:
        </p>
        <ul>
          <li>Your email address — used for login and transactional emails (verification, password reset)</li>
          <li>A bcrypt-hashed password — your actual password is never stored in plain text</li>
          <li>Display name and profile photo — only when you sign in via Google OAuth</li>
          <li>Authentication provider — whether you use email/password or Google</li>
          <li>Account creation date</li>
        </ul>
        <p>
          All other tools on the website (image, text, and schema tools) work without an account.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Authentication and sessions</h2>
        <p>
          When you sign in, we issue two tokens:
        </p>
        <ul>
          <li>
            <strong>Access token</strong> — a short-lived JWT (15 minutes), stored in memory only.
            It is never written to localStorage or cookies.
          </li>
          <li>
            <strong>Refresh token</strong> — a 30-day session identifier stored as a secure,
            httpOnly cookie (<code>refreshToken</code>). It is not accessible to JavaScript.
            The token is stored in our database as a random UUID — not as a decodable JWT.
          </li>
        </ul>
        <p>
          Each time you open the site, the refresh token is used to silently restore your session.
          Logging out immediately invalidates the token and removes the cookie.
          Refresh tokens are automatically deleted from the database after 30 days.
          A daily cleanup job removes any remaining expired tokens.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Lora AI assistant</h2>
        <p>
          When you send a message to Lora, your input and the conversation history are transmitted
          to the <strong>DeepSeek API</strong> to generate a response. We store your conversation
          history — messages, selected skill, and token usage per message — in our database,
          linked to your account.
        </p>
        <p>
          We do not use your messages for advertising, model training, or any purpose other than
          generating the AI response. Conversations are private by default and are only visible to you.
          You can delete individual conversations from the sidebar or delete all data by deleting
          your account.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Token system</h2>
        <p>
          Each AI request deducts tokens from your monthly balance. We maintain a transaction log
          of charges, refills, and bonuses linked to your account. This log is used to display
          your usage history in Profile → Usage and to maintain balance accuracy.
          The transaction log is permanently deleted when you delete your account.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Analytics</h2>
        <p>
          If you accept analytics cookies, we use Google Analytics 4 and Microsoft Clarity to
          understand how visitors use this website — page views, clicks, scrolling behavior,
          device type, and general usage patterns. We use this data to improve the website and
          identify usability issues.
        </p>
        <p>
          Neither service loads until you explicitly accept analytics cookies via the consent banner.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Cookies</h2>
        <ul>
          <li>
            <strong>refreshToken</strong> — set when you sign in. Secure, httpOnly, SameSite=Strict.
            Expires after 30 days. Used to maintain your session.
          </li>
          <li>
            <strong>Analytics cookies</strong> — Google Analytics 4 and Microsoft Clarity.
            Loaded only after you accept analytics cookies through the consent banner.
          </li>
          <li>
            <strong>Preference storage</strong> — your cookie consent choice, color theme, and
            sidebar mode are stored in <code>localStorage</code> in your browser. This data
            never leaves your device.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Third-party services</h2>
        <ul>
          <li>
            <strong>DeepSeek</strong> — processes Lora AI requests. Your messages are sent to
            the DeepSeek API for inference. See{' '}
            <a href="https://www.deepseek.com/en/privacy_policy" target="_blank" rel="noopener noreferrer">
              DeepSeek's privacy policy
            </a>.
          </li>
          <li>
            <strong>Brevo</strong> — sends transactional emails (email verification codes,
            password reset codes). Your email address is shared with Brevo only to deliver
            these messages.
          </li>
          <li>
            <strong>Google</strong> — handles Google OAuth sign-in. If you use "Continue with
            Google", Google shares your name, email, and profile photo with us. See{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's privacy policy
            </a>.
          </li>
          <li>
            <strong>Google Analytics 4</strong> — analytics, consent-gated.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> — session analytics, consent-gated.
          </li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Data retention</h2>
        <ul>
          <li>Account data, conversations, and transaction history — retained until you delete your account</li>
          <li>Refresh tokens — automatically expire after 30 days; expired tokens are purged daily</li>
          <li>Analytics data — retained according to Google Analytics and Microsoft Clarity policies</li>
        </ul>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Your rights</h2>
        <p>
          You can permanently delete your account at any time from{' '}
          <strong>Profile → Account → Delete account</strong>. This action is immediate and
          irreversible — it deletes your account, all stored conversations, all token transaction
          history, and invalidates all active sessions. We retain no personal data after deletion.
        </p>
        <p>
          If you have questions about your data, contact us at{' '}
          <a href="mailto:support@abect.com">support@abect.com</a>.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Your cookie choice</h2>
        <p>
          You can accept or reject analytics cookies when the consent banner appears.
          To change your choice later, use the Cookie Settings link in the sidebar footer.
          Rejecting analytics cookies does not affect the core functionality of the website
          or the Lora AI assistant.
        </p>
      </section>

      <section className="PrivacyPolicy__section">
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the product evolves. The current version is always
          available at devtools.abect.com/privacy-policy.
        </p>
      </section>
    </main>
  )
}
