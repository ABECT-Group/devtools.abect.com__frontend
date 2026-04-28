import './Buttons.scss'

// ─── Icon buttons ─────────────────────────────────────────────────────────────

export function DeleteButton({ onClick }) {
  return (
    <button type="button" className="DeleteButton" onClick={onClick} aria-label="Remove">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
      </svg>
    </button>
  )
}

export function DownloadButton({ onClick, visible }) {
  return (
    <button
      type="button"
      className={`DownloadButton${visible ? ' DownloadButton--visible' : ''}`}
      onClick={onClick}
      aria-label="Download"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  )
}

export function ClearAllButton({ onClick }) {
  return (
    <button type="button" className="ClearAllButton" onClick={onClick} aria-label="Clear all">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <line x1="8.5" y1="15.5" x2="15.5" y2="8.5" />
      </svg>
    </button>
  )
}

// ─── Text buttons ─────────────────────────────────────────────────────────────

export function PrimaryButton({ onClick, disabled, loading, loadingText = 'Loading…', fullWidth, children }) {
  return (
    <button
      type="button"
      className={`PrimaryButton${fullWidth ? ' PrimaryButton--full' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="PrimaryButton__spinner" aria-hidden="true" />
          {loadingText}
        </>
      ) : children}
    </button>
  )
}

export function SecondaryButton({ onClick, disabled, fullWidth, children }) {
  return (
    <button
      type="button"
      className={`SecondaryButton${fullWidth ? ' SecondaryButton--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function AccentButton({ onClick, disabled, fullWidth, children }) {
  return (
    <button
      type="button"
      className={`AccentButton${fullWidth ? ' AccentButton--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
