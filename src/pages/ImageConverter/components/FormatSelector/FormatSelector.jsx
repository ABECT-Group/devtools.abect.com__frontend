import { useNavigate } from 'react-router-dom'
import { CONVERSIONS, FROM_OPTIONS, TO_OPTIONS } from '../../config/conversions'
import './FormatSelector.scss'

export default function FormatSelector({ from, to }) {
  const navigate = useNavigate()

  function handleFromChange(event) {
    const newFrom = event.target.value
    // keep current TO if valid, otherwise pick first valid TO
    let newTo = to
    if (newFrom === newTo) {
      newTo = TO_OPTIONS.find(opt => opt.value !== newFrom)?.value || 'jpg'
    }
    const newSlug = `${newFrom}-to-${newTo}`
    if (CONVERSIONS[newSlug]) {
      navigate(`/${newSlug}`)
    } else {
      // fallback: find any valid TO for this FROM
      const fallback = TO_OPTIONS
        .filter(opt => opt.value !== newFrom)
        .map(opt => `${newFrom}-to-${opt.value}`)
        .find(slug => CONVERSIONS[slug])
      if (fallback) navigate(`/${fallback}`)
    }
  }

  function handleToChange(event) {
    const newTo = event.target.value
    if (newTo === from) return
    const newSlug = `${from}-to-${newTo}`
    if (CONVERSIONS[newSlug]) navigate(`/${newSlug}`)
  }

  // TO options filtered: hide same format as FROM (e.g. png→png)
  const availableTo = TO_OPTIONS.filter(opt => opt.value !== from)

  return (
    <div className="FormatSelector">
      <div className="FormatSelector__group">
        <label className="FormatSelector__label" htmlFor="fmt-from">From</label>
        <div className="FormatSelector__select-wrap">
          <select
            id="fmt-from"
            className="FormatSelector__select"
            value={from}
            onChange={handleFromChange}
          >
            {FROM_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg className="FormatSelector__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="FormatSelector__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="FormatSelector__group">
        <label className="FormatSelector__label" htmlFor="fmt-to">To</label>
        <div className="FormatSelector__select-wrap">
          <select
            id="fmt-to"
            className="FormatSelector__select"
            value={to}
            onChange={handleToChange}
          >
            {availableTo.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg className="FormatSelector__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
