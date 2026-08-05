import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ChangelogCard from '../../components/ChangelogCard/ChangelogCard'
import JsonLd from '../../components/JsonLd/JsonLd'
import { CHANGELOG } from './data/entries'
import { PAGE_TITLE, PAGE_DESC, PAGE_URL, OG_IMAGE } from './data/helmet'
import { jsonLdCollection, jsonLdBreadcrumb, buildJsonLdItemList } from './data/jsonld'
import './Changelog.scss'

const jsonLdItemList = buildJsonLdItemList(CHANGELOG)

// Entries are already newest-first; group them by year for the timeline headings.
const YEARS = CHANGELOG.reduce((acc, entry) => {
  const year = entry.datetime.slice(0, 4)
  const last = acc[acc.length - 1]
  if (last && last.year === year) last.entries.push(entry)
  else acc.push({ year, entries: [entry] })
  return acc
}, [])

export default function Changelog() {
  const latest = CHANGELOG[0]

  return (
    <main className="Changelog">
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
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <JsonLd data={jsonLdCollection} />
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdItemList} />

      <h1 className="Changelog__title">Changelog</h1>
      <p className="Changelog__lead">
        Every change to <Link to="/">Abect Dev Tools</Link> since launch — new tools, conversion
        bug fixes, SEO and performance work. Written by the person who shipped it, dated, and never
        edited after the fact. Last update: <strong>{latest.date}</strong>.
      </p>

      <p className="Changelog__meta">
        {CHANGELOG.length} releases · first entry {CHANGELOG[CHANGELOG.length - 1].date}
      </p>

      {YEARS.map(({ year, entries }) => (
        <section className="Changelog__year" key={year} aria-label={`Updates in ${year}`}>
          <h2 className="Changelog__year-title">{year}</h2>
          <div className="Changelog__list">
            {entries.map(entry => (
              <ChangelogCard key={entry.datetime} entry={entry} variant="full" />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
