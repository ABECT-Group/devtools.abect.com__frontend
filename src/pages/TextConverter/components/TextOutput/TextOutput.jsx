import { useState } from 'react'
import './TextOutput.scss'

export default function TextOutput({ label, value, fileExt }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!value) return
    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `output.${fileExt ?? 'txt'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="TextOutput">
      <div className="TextOutput__header">
        <span className="TextOutput__label">{label}</span>
        <div className="TextOutput__actions">
          <button
            type="button"
            className={`TextOutput__btn${copied ? ' TextOutput__btn--copied' : ''}`}
            onClick={handleCopy}
            disabled={!value}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            type="button"
            className="TextOutput__btn TextOutput__btn--download"
            onClick={handleDownload}
            disabled={!value}
          >
            Download
          </button>
        </div>
      </div>
      <textarea
        className="TextOutput__area"
        readOnly
        value={value}
        placeholder="Output will appear here…"
      />
    </div>
  )
}
