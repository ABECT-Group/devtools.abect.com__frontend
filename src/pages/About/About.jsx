import { Helmet } from 'react-helmet-async'
import ContentSection from '../../components/ContentSection/ContentSection'
import FAQ            from '../../components/FAQ/FAQ'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdPerson, jsonLdWebSite, jsonLdBreadcrumb } from './data/jsonld'
import { PRINCIPLES, CREATOR_TAGS, PROFILES, FAQ as FAQ_ITEMS } from './data/content'
import './About.scss'

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <line x1="8" y1="11" x2="8" y2="16" />
      <line x1="8" y1="8" x2="8" y2="8.5" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 0 0-4 0" />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export default function About() {
  return (
    <main className="About">
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
        <script type="application/ld+json">{JSON.stringify(jsonLdPerson)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdWebSite)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="About__hero">
        <img
          className="About__banner"
          src="/image/about-land.webp"
          alt="Roman Popovych — Full-Stack Software Engineer, creator of Abect Dev Tools"
          width="1000"
          height="400"
        />
        <h1 className="About__title">About Abect Dev Tools</h1>
        <p className="About__subtitle">
          A privacy-first collection of browser-based developer tools — built by an engineer, for engineers.
          No accounts, no uploads, no surprises.
        </p>
      </div>

      {/* ── Why ─────────────────────────────────────────────── */}
      <ContentSection title="Why This Project Exists">
        <p className="ContentSection__text">
          While working on a client project for a sock e-commerce brand, I needed to convert dozens of product
          photos to WebP. The first converter I found was buried in contextual ads — and after downloading,
          every filename had been renamed to that site's own domain. The next tool had a 5-file free tier limit.
          That afternoon I started building this.
        </p>
        <p className="ContentSection__text">
          The core problem is not any single tool — it is the pattern: mandatory uploads to unknown servers,
          watermarks on output, aggressive paywalls at exactly the moment you need to get work done, and no
          way to know what happens to client assets after upload. For anyone handling client files,
          that is not acceptable.
        </p>
        <p className="ContentSection__text">
          The goal was not to build another SaaS. It was to build a set of tools that work instantly, locally,
          and predictably — without relying on external services for anything the browser can already do.
        </p>
      </ContentSection>

      {/* ── How it works ────────────────────────────────────── */}
      <ContentSection title="How It Works — All Processing Stays in Your Browser">
        <p className="ContentSection__text">
          Every tool runs entirely client-side. When you drop a file, it is read by the <strong>File API</strong> directly
          in the browser tab — no network request is made. The <strong>Canvas API</strong> handles all image transformations:
          format conversion, compression, cropping, and quality adjustment. The result is exported via the <strong>Blob URL
          API</strong> as an in-memory download — again, no upload, no server round-trip.
        </p>
        <p className="ContentSection__text">
          You can verify this yourself: open <strong>DevTools → Network tab</strong>, drop a file into any tool, and
          watch. No file transfer requests will appear. The tools also work offline once the page has loaded.
        </p>
        <p className="ContentSection__text">
          Other APIs in use: <strong>Web Crypto API</strong> for collision-free file IDs, <strong>TypedArrays</strong> for
          binary ICO construction in the favicon generator, and <strong>JSZip</strong> for in-browser batch ZIP archives.
        </p>
      </ContentSection>

      {/* ── Creator ─────────────────────────────────────────── */}
      <section className="About__creator-section">
        <h2 className="About__section-title">About the Creator</h2>
        <div className="About__creator">
          <img
            className="About__avatar"
            src="/image/about-avatar.webp"
            alt="Roman Popovych"
            width="96"
            height="96"
          />
          <div className="About__creator-body">
            <div className="About__creator-name">Roman Popovych</div>
            <div className="About__creator-role">Full-Stack Software Engineer · Ukraine</div>
            <p className="About__creator-bio">
              3+ years building production-grade fintech systems where correctness and security are
              non-negotiable. I have shipped P2P lending platforms, KYC pipelines with biometric
              verification, banking API integrations (OAuth&nbsp;2.0, PKCE), and hardened multi-instance
              infrastructure. Abect Dev Tools started in April 2026 as a practical fix to a frustrating
              afternoon — and turned into a project I keep building.
            </p>
            <div className="About__creator-tags">
              {CREATOR_TAGS.map(tag => (
                <span key={tag} className="About__tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ──────────────────────────────────────── */}
      <ContentSection title="Product Principles">
        <div className="About__principles">
          {PRINCIPLES.map(({ title, desc }) => (
            <div key={title} className="About__principle">
              <div className="About__principle-title">{title}</div>
              <div className="About__principle-desc">{desc}</div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* ── Open Source ─────────────────────────────────────── */}
      <ContentSection title="Open Source">
        <p className="ContentSection__text">
          The full source code is publicly available on GitHub. Anyone can read the implementation,
          verify that no data is transmitted, and submit new tools. Contributions follow the project's
          core principles: prefer client-side execution, avoid unnecessary data transfer, keep
          implementations focused on a single task.
        </p>
        <p className="ContentSection__text">
          <a
            className="About__text-link"
            href="https://github.com/ABECT-Group/devtools.abect.com__frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            View project source on GitHub →
          </a>
        </p>
      </ContentSection>

      {/* ── Contact & Profiles ──────────────────────────────── */}
      <section className="About__contact-section">
        <h2 className="About__section-title">Contact & Profiles</h2>
        <p className="About__contact-row">
          Email:{' '}
          <a className="About__contact-email" href="mailto:support@abect.com">
            support@abect.com
          </a>
        </p>
        <div className="About__profiles">
          {PROFILES.map(({ label, href, icon }) => (
            <a
              key={href}
              className="About__profile-link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon === 'linkedin' ? <IconLinkedIn /> : <IconGitHub />}
              {label}
            </a>
          ))}
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </main>
  )
}
