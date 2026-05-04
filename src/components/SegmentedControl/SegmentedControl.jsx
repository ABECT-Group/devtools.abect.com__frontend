import './SegmentedControl.scss'

export default function SegmentedControl({ options, value, onChange, fitContent }) {
  return (
    <div className={`SegmentedControl${fitContent ? ' SegmentedControl--fit' : ''}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`SegmentedControl__btn${value === opt.value ? ' SegmentedControl__btn--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
