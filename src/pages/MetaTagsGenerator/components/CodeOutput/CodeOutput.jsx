import { useState } from 'react'
import './CodeOutput.scss'

export default function CodeOutput({ code }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="CodeOutput">
      <div className="CodeOutput__header">
        <span className="CodeOutput__label">Generated HTML</span>
        <button
          type="button"
          className={`CodeOutput__copy${copied ? ' CodeOutput__copy--done' : ''}`}
          onClick={handleCopy}
          disabled={!code}
        >
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="CodeOutput__pre">
        <code className="CodeOutput__code">
          {code
            ? code.split('\n').map((line, i) => (
                <span key={i} className={line.trimStart().startsWith('<!--') ? 'CodeOutput__comment' : undefined}>
                  {line}
                  {'\n'}
                </span>
              ))
            : '<!-- Fill in the fields on the left -->'}
        </code>
      </pre>
    </div>
  )
}
