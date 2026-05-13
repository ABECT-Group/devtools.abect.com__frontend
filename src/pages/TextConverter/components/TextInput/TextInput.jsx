import './TextInput.scss'

export default function TextInput({ label, value, onChange, placeholder }) {
  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch {
      // clipboard access denied — user pastes manually
    }
  }

  return (
    <div className="TextInput">
      <div className="TextInput__header">
        <span className="TextInput__label">{label}</span>
        <div className="TextInput__actions">
          <button type="button" className="TextInput__btn" onClick={handlePaste}>
            Paste
          </button>
          <button
            type="button"
            className="TextInput__btn"
            onClick={() => onChange('')}
            disabled={!value}
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        className="TextInput__area"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  )
}
