import { useState } from 'react'
import './CodeBox.scss'

export default function CodeBox({ label, code }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="CodeBox">
      <div className="CodeBox__header">
        <span className="CodeBox__label">{label}</span>
        <button
          type="button"
          className={`CodeBox__copy${copied ? ' CodeBox__copy--done' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="CodeBox__code">{code}</pre>
    </div>
  )
}
