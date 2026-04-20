import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.scss'

const CONSENT_KEY = 'toolsabect_cookie_consent'

function pushConsentGranted() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'consent_accepted' })
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const storedStatus = window.localStorage.getItem(CONSENT_KEY)
    const frameId = window.requestAnimationFrame(() => {
      if (!storedStatus) setVisible(true)
    })

    if (storedStatus === 'accepted') {
      pushConsentGranted()
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
    pushConsentGranted()
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
        We use Google Analytics and Microsoft Clarity to collect anonymous usage data and improve this website.
        Analytics tools load only if you accept.
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
