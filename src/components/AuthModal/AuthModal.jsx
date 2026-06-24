import { useEffect, useRef, useState } from 'react'
import useAuthStore from '../../store/authStore.js'
import SegmentedControl from '../SegmentedControl/SegmentedControl.jsx'
import LoginForm from '../AuthForms/LoginForm.jsx'
import RegisterForm from '../AuthForms/RegisterForm.jsx'
import './AuthModal.scss'

const TAB_OPTIONS = [
  { value: 'login',    label: 'Log in' },
  { value: 'register', label: 'Register' },
]

export default function AuthModal() {
  const authModalOpen  = useAuthStore(s => s.authModalOpen)
  const closeAuthModal = useAuthStore(s => s.closeAuthModal)

  const [tab,        setTab]        = useState('login')
  const [sessionKey, setSessionKey] = useState(0)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (authModalOpen) {
      setTab('login')
      setSessionKey(k => k + 1)
    }
  }, [authModalOpen])

  useEffect(() => {
    if (!authModalOpen) return
    const onKey = e => { if (e.key === 'Escape') closeAuthModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [authModalOpen, closeAuthModal])

  if (!authModalOpen) return null

  const handleOverlayClick = e => {
    if (e.target === overlayRef.current) closeAuthModal()
  }

  return (
    <div className="AuthModal" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="AuthModal__card">
        <button className="AuthModal__close" onClick={closeAuthModal} aria-label="Close">✕</button>

        <div className="AuthModal__tabs">
          <SegmentedControl
            options={TAB_OPTIONS}
            value={tab}
            onChange={setTab}
          />
        </div>

        <div key={sessionKey}>
          {tab === 'login' ? (
            <LoginForm
              showHeading={false}
              onSuccess={closeAuthModal}
              footer={
                <p className="AuthForm__switch">
                  No account?{' '}
                  <button type="button" onClick={() => setTab('register')}>Create one</button>
                </p>
              }
            />
          ) : (
            <RegisterForm
              showHeading={false}
              onSuccess={closeAuthModal}
              footer={
                <p className="AuthForm__switch">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setTab('login')}>Log in</button>
                </p>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
