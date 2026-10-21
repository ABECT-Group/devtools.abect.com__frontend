import { useEffect, useRef, useState } from 'react'
import './SettingPopover.scss'

export default function SettingPopover({ label, value, onChange, min, max, suffix = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = event => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = event => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <span className="SettingPopover" ref={rootRef}>
      <button
        type="button"
        className={`SettingPopover__btn${open ? ' SettingPopover__btn--open' : ''}`}
        onClick={() => setOpen(prev => !prev)}
        aria-label={label}
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="SettingPopover__popup" role="dialog" aria-label={label}>
          <div className="SettingPopover__title">{label}</div>
          <div className="SettingPopover__control">
            <input
              type="range"
              className="SettingPopover__slider"
              min={min}
              max={max}
              value={value}
              onChange={event => onChange(Number(event.target.value))}
            />
            <span className="SettingPopover__value">{value}{suffix}</span>
          </div>
        </div>
      )}
    </span>
  )
}
