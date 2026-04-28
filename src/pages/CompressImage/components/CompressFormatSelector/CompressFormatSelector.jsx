import { useNavigate } from 'react-router-dom'
import { FORMAT_OPTIONS } from '../../data/formats'
import './CompressFormatSelector.scss'

export default function CompressFormatSelector({ format }) {
  const navigate = useNavigate()

  function handleFormatChange(event) {
    navigate(`/compress-${event.target.value}`)
  }

  return (
    <div className="CompressFormatSelector">
      <div className="CompressFormatSelector__group">
        <label className="CompressFormatSelector__label" htmlFor="fmt-output">
          Output format
        </label>
        <div className="CompressFormatSelector__select-wrap">
          <select
            id="fmt-output"
            className="CompressFormatSelector__select"
            value={format}
            onChange={handleFormatChange}
          >
            {FORMAT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg className="CompressFormatSelector__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
