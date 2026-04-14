import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.scss'

const CONSENT_KEY = 'toolsabect_cookie_consent'
const CLARITY_PROJECT_ID = 'w935ym1qlb'

function loadClarity() {
  if (typeof window === 'undefined') return
  if (window.clarity || document.getElementById('clarity-script')) return

  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments)
  }

  const script = document.createElement('script')
  script.id = 'clarity-script'
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
  document.head.appendChild(script)
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const storedStatus = window.localStorage.getItem(CONSENT_KEY)
    const frameId = window.requestAnimationFrame(() => {
      if (!storedStatus) setVisible(true)
    })

    if (storedStatus === 'accepted') {
      loadClarity()
    }

    function handleOpen() { setVisible(true) }
    window.addEventListener('open-cookie-consent', handleOpen)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('open-cookie-consent', handleOpen)
    }
  }, [])

  function handleAccept() {
    window.localStorage.setItem(CONSENT_KEY, 'accepted')
    loadClarity()
    setVisible(false)
  }

  function handleReject() {
    window.localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="CookieConsent" aria-label="Cookie consent">
      <button
        className="CookieConsent__close"
        type="button"
        onClick={handleReject}
        aria-label="Reject analytics cookies"
      >
        x
      </button>
      <div className="CookieConsent__title">Cookies</div>
      <p className="CookieConsent__text">
        We use Microsoft Clarity to collect anonymous usage analytics and improve this website.
        Clarity loads only if you accept.
      </p>
      <Link className="CookieConsent__link" to="/privacy-policy">
        Privacy Policy
      </Link>
      <div className="CookieConsent__actions">
        <button
          className="CookieConsent__btn CookieConsent__btn--reject"
          type="button"
          onClick={handleReject}
        >
          Reject
        </button>
        <button
          className="CookieConsent__btn CookieConsent__btn--accept"
          type="button"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </aside>
  )
}
