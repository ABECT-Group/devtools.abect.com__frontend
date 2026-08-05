import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore.js'
import './Profile.scss'

export default function Profile() {
  const user      = useAuthStore(s => s.user)
  const clearAuth = useAuthStore(s => s.clearAuth)
  const navigate  = useNavigate()

  const handleLogout = async () => {
    await clearAuth()
    navigate('/')
  }

  return (
    <>
      {/* title + noindex are declared once in ProtectedRoute — see the note there */}
      <div className="Profile">
        <aside className="Profile__sidebar">
          {user && (
            <div className="Profile__user">
              <div className="Profile__avatar">
                {user.photoUrl
                  ? <img src={user.photoUrl} alt="" className="Profile__avatar-img" referrerPolicy="no-referrer" />
                  : <span className="Profile__avatar-initials">{user.email?.[0]?.toUpperCase() ?? '?'}</span>
                }
              </div>
              <div className="Profile__user-info">
                <span className="Profile__name">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <span className="Profile__email">{user.email}</span>
              </div>
            </div>
          )}

          <div className="Profile__divider" />

          <nav className="Profile__nav">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `Profile__nav-item${isActive ? ' Profile__nav-item--active' : ''}`
              }
            >
              Account
            </NavLink>
            <NavLink
              to="/profile/usage"
              className={({ isActive }) =>
                `Profile__nav-item${isActive ? ' Profile__nav-item--active' : ''}`
              }
            >
              Usage
            </NavLink>
            <NavLink
              to="/profile/billing"
              className={({ isActive }) =>
                `Profile__nav-item${isActive ? ' Profile__nav-item--active' : ''}`
              }
            >
              Billing
            </NavLink>
          </nav>

          <div className="Profile__sidebar-footer">
            <button className="Profile__logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </aside>
        <div className="Profile__content">
          <Outlet />
        </div>
      </div>
    </>
  )
}
