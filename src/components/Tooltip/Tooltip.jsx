import './Tooltip.scss'

export default function Tooltip({ children }) {
  return (
    <span className="Tooltip">
      <svg className="Tooltip__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
      </svg>
      <span className="Tooltip__popup" role="tooltip">{children}</span>
    </span>
  )
}
