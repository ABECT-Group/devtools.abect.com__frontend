import { useState } from 'react'
import './OGCodeOutput.scss'

export default function OGCodeOutput({ code }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="OGCodeOutput">
      <div className="OGCodeOutput__header">
        <span className="OGCodeOutput__label">Generated HTML</span>
        <button
          type="button"
          className={`OGCodeOutput__copy${copied ? ' OGCodeOutput__copy--done' : ''}`}
          onClick={handleCopy}
          disabled={!code}
        >
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="OGCodeOutput__pre">
        <code className="OGCodeOutput__code">
          {code
            ? code.split('\n').map((line, i) => (
                <span
                  key={i}
                  className={line.trimStart().startsWith('<!--') ? 'OGCodeOutput__comment' : undefined}
                >
                  {line}
                  {'\n'}
                </span>
              ))
            : '<!-- Fill in the fields on the left to generate code -->'}
        </code>
      </pre>
    </div>
  )
}
