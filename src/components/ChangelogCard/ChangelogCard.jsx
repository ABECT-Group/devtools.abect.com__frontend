import { Link } from 'react-router-dom'
import { entryAnchor } from './anchor'
import './ChangelogCard.scss'

/**
 * One changelog entry. Used in two places with identical styling:
 *
 *  - Home            variant="preview" → short `summary` + "Show more →"
 *  - /changelog      variant="full"    → the full `body`, anchored by id
 *
 * The anchor id is the entry date as dd-mm-yyyy, which is why only one entry
 * per day is allowed — see docs/contribution.md.
 */
export default function ChangelogCard({ entry, variant = 'full' }) {
  const anchor = entryAnchor(entry.datetime)
  const isPreview = variant === 'preview'

  return (
    <article
      className="ChangelogCard"
      id={isPreview ? undefined : anchor}
    >
      <h3 className="ChangelogCard__title">{entry.title}</h3>

      <div className="ChangelogCard__body">
        {isPreview ? entry.summary : entry.body}
      </div>

      <div className="ChangelogCard__meta">
        <a
          href="https://github.com/forze-dev"
          className="ChangelogCard__author"
          target="_blank"
          rel="noopener noreferrer"
        >
          Roman Popovych
        </a>
        <time className="ChangelogCard__date" dateTime={entry.datetime}>{entry.date}</time>

        {isPreview && (
          <Link className="ChangelogCard__more" to={`/changelog#${anchor}`}>
            Show more →
          </Link>
        )}
      </div>
    </article>
  )
}
