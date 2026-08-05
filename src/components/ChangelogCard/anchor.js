/**
 * Anchor id for a changelog entry: '2026-08-05' → '05-08-2026'.
 *
 * Used by ChangelogCard (renders the id and the "Show more" link) and by the
 * /changelog ItemList schema, so both always agree. Because the date is the
 * identifier, only one entry per day is allowed — see docs/contribution.md.
 */
export function entryAnchor(datetime) {
  const [y, m, d] = datetime.split('-')
  return `${d}-${m}-${y}`
}
