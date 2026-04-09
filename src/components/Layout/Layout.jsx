import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import CookieConsent from '../CookieConsent/CookieConsent'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.scss'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!sidebarOpen) {
      return undefined
    }

    const scrollY = window.scrollY
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      touchAction: document.body.style.touchAction,
    }

    const previousHtmlOverflow = document.documentElement.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.touchAction = 'none'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyStyles.overflow
      document.body.style.position = previousBodyStyles.position
      document.body.style.top = previousBodyStyles.top
      document.body.style.left = previousBodyStyles.left
      document.body.style.right = previousBodyStyles.right
      document.body.style.width = previousBodyStyles.width
      document.body.style.touchAction = previousBodyStyles.touchAction
      window.scrollTo(0, scrollY)
    }
  }, [sidebarOpen])

  return (
    <div className="Layout">
      <Header
        isSidebarOpen={sidebarOpen}
        onMenuToggle={() => setSidebarOpen(prev => !prev)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="Layout__content">
        <Outlet />
      </div>
      <CookieConsent />
    </div>
  )
}
