import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.scss'

const CONSENT_KEY = 'toolsabect_cookie_consent'
const GTM_ID = 'GTM-N5MK5G5Z'

function injectGTM() {
  if (document.querySelector('[data-gtm-injected]')) return
  const script = document.createElement('script')
  script.setAttribute('data-gtm-injected', '1')
  script.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
  document.head.appendChild(script)
}

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
      injectGTM()
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
    injectGTM()
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
