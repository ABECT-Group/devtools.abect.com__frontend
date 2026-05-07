import { useState } from 'react'
import './SchemaOutput.scss'

export default function SchemaOutput({ scriptTag, onReset, validation }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!scriptTag) return
    await navigator.clipboard.writeText(scriptTag)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const { missing, warnings, isEligible } = validation

  return (
    <div className="SchemaOutput">
      {/* Code box */}
      <div className="SchemaOutput__box">
        <div className="SchemaOutput__header">
          <span className="SchemaOutput__label">JSON-LD output</span>
          <button
            type="button"
            className={`SchemaOutput__copy${copied ? ' SchemaOutput__copy--done' : ''}`}
            onClick={handleCopy}
            disabled={!scriptTag}
          >
            {copied ? 'Copied!' : 'Copy JSON-LD'}
          </button>
        </div>
        <pre className="SchemaOutput__pre">
          <code className="SchemaOutput__code">
            {scriptTag || '<!-- Fill in the fields on the left -->'}
          </code>
        </pre>
      </div>

      {/* Validation status */}
      <div className="SchemaOutput__validation">
        {isEligible ? (
          <div className="SchemaOutput__status SchemaOutput__status--ok">
            <svg className="SchemaOutput__status-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Google Rich Results eligible
          </div>
        ) : (
          <div className="SchemaOutput__status SchemaOutput__status--error">
            <svg className="SchemaOutput__status-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="currentColor" />
            </svg>
            Missing required fields
          </div>
        )}

        {missing.length > 0 && (
          <ul className="SchemaOutput__missing">
            {missing.map((label, i) => (
              <li key={i}>{label}</li>
            ))}
          </ul>
        )}

        {warnings.length > 0 && (
          <ul className="SchemaOutput__warnings">
            {warnings.map((w, i) => (
              <li key={i}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M8 6v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="8" cy="11" r="0.6" fill="currentColor" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="SchemaOutput__actions">
        <a
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noopener noreferrer"
          className="SchemaOutput__test-link"
        >
          Test in Google
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button
          type="button"
          className="SchemaOutput__reset"
          onClick={onReset}
        >
          Reset form
        </button>
      </div>
    </div>
  )
}
