import './HreflangSection.scss'

export default function HreflangSection({ entries, onAdd, onRemove, onChange }) {
  return (
    <div className="HreflangSection">
      {entries.map((entry, index) => (
        <div key={entry.id} className="HreflangSection__item">
          <div className="HreflangSection__row">
            <input
              type="text"
              className="HreflangSection__input HreflangSection__input--lang"
              value={entry.lang}
              onChange={e => onChange(entry.id, 'lang', e.target.value)}
              placeholder="en"
            />
            <input
              type="url"
              className="HreflangSection__input HreflangSection__input--url"
              value={entry.url}
              onChange={e => onChange(entry.id, 'url', e.target.value)}
              placeholder="https://example.com/en/"
            />
            {index > 0 && (
              <button
                type="button"
                className="HreflangSection__remove"
                onClick={() => onRemove(entry.id)}
                aria-label="Remove language"
              >
                ×
              </button>
            )}
          </div>
          {index === 0 && (
            <p className="HreflangSection__xdefault">
              First URL also becomes <code>hreflang="x-default"</code>
            </p>
          )}
        </div>
      ))}
      <button
        type="button"
        className="HreflangSection__add"
        onClick={onAdd}
      >
        + Add language
      </button>
    </div>
  )
}
