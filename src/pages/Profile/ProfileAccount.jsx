import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../../api/user.js'
import { PrimaryButton } from '../../components/Buttons/Buttons.jsx'
import useAuthStore from '../../store/authStore.js'
import useThemeStore from '../../store/themeStore.js'
import './ProfileAccount.scss'

const formatDate = iso =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function ProfileAccount() {
  const navigate    = useNavigate()
  const user        = useAuthStore(s => s.user)
  const accessToken = useAuthStore(s => s.accessToken)
  const clearAuth   = useAuthStore(s => s.clearAuth)
  const theme       = useThemeStore(s => s.theme)
  const setTheme    = useThemeStore(s => s.setTheme)

  const [deleting, setDeleting]       = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  if (!user) return null

  const handleDelete = async () => {
    setDeleteError('')
    setDeleting(true)
    try {
      await userApi.deleteMe(accessToken)
      await clearAuth()
      navigate('/')
    } catch (err) {
      setDeleteError(err.message)
      setDeleting(false)
    }
  }

  return (
    <div className="ProfileAccount">
      <div className="ProfileSection">
        <h2 className="ProfileSection__title">Account info</h2>
        <div className="ProfileAccount__row">
          <span className="ProfileAccount__label">Email</span>
          <span className="ProfileAccount__value">{user.email}</span>
        </div>
        <div className="ProfileAccount__row">
          <span className="ProfileAccount__label">Auth method</span>
          <span className={`ProfileAccount__badge ProfileAccount__badge--${user.authProvider}`}>
            {user.authProvider === 'google' ? 'Google' : 'Email & Password'}
          </span>
        </div>
        <div className="ProfileAccount__row">
          <span className="ProfileAccount__label">Member since</span>
          <span className="ProfileAccount__value">{formatDate(user.createdAt)}</span>
        </div>
        {user.authProvider === 'local' && (
          <div className="ProfileAccount__row">
            <span className="ProfileAccount__label">Email verification</span>
            <span className={`ProfileAccount__badge ProfileAccount__badge--${user.isEmailVerified ? 'verified' : 'unverified'}`}>
              {user.isEmailVerified ? 'Verified' : 'Not verified'}
            </span>
          </div>
        )}
      </div>

      <div className="ProfileSection">
        <h2 className="ProfileSection__title">Appearance</h2>
        <div className="ProfileAccount__row">
          <span className="ProfileAccount__label">Color theme</span>
          <div className="ProfileAccount__theme-toggle">
            <button
              className={`ProfileAccount__theme-btn${theme === 'dark' ? ' ProfileAccount__theme-btn--active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
            <button
              className={`ProfileAccount__theme-btn${theme === 'light' ? ' ProfileAccount__theme-btn--active' : ''}`}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
          </div>
        </div>
      </div>

      <div className="ProfileSection ProfileSection--danger">
        <h2 className="ProfileSection__title">Danger zone</h2>
        <p className="ProfileAccount__delete-note">
          This will permanently delete your account, all token history, and cannot be undone.
        </p>
        {deleteError && <p className="ProfileAccount__error">{deleteError}</p>}
        {!deleteConfirm ? (
          <button
            className="ProfileAccount__delete-btn"
            onClick={() => setDeleteConfirm(true)}
          >
            Delete account
          </button>
        ) : (
          <div className="ProfileAccount__delete-confirm">
            <p className="ProfileAccount__delete-ask">Are you sure? This is irreversible.</p>
            <div className="ProfileAccount__delete-actions">
              <PrimaryButton loading={deleting} loadingText="Deleting…" onClick={handleDelete}>
                Yes, delete
              </PrimaryButton>
              <button
                className="ProfileAccount__cancel"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="Profile__logout-mobile">
        <button
          className="Profile__logout-mobile-btn"
          onClick={async () => { await clearAuth(); navigate('/') }}
        >
          Log out
        </button>
      </div>
    </div>
  )
}
