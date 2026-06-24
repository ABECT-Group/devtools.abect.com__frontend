import { create } from 'zustand'
import { authApi } from '../api/auth.js'
import { userApi } from '../api/user.js'

const HINT_KEY  = 'auth_hint'
const getHint   = () => typeof window !== 'undefined' && localStorage.getItem(HINT_KEY) === '1'
const setHint   = () => localStorage.setItem(HINT_KEY, '1')
const clearHint = () => localStorage.removeItem(HINT_KEY)

let _refreshTimer = null

// Decode JWT exp and schedule onRefresh ~1 min before expiry
function scheduleTokenRefresh(token, onRefresh) {
  clearTimeout(_refreshTimer)
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]))
    const delay = exp * 1000 - Date.now() - 60_000
    _refreshTimer = setTimeout(onRefresh, delay > 0 ? delay : 0)
  } catch {}
}

const useAuthStore = create((set, get) => ({
  user:         null,
  accessToken:  null,
  loading:      true,
  hint:         getHint(),

  authModalOpen:           false,
  authModalPendingMessage: null,

  init: async () => {
    const params   = new URLSearchParams(window.location.search)
    const urlToken = params.get('token')

    if (urlToken) {
      window.history.replaceState({}, '', window.location.pathname)
      try {
        const data = await userApi.getMe(urlToken)
        setHint()
        set({ user: data.data.user, accessToken: urlToken, loading: false, hint: true })
        scheduleTokenRefresh(urlToken, () => get()._silentRefresh())
        return
      } catch {
        clearHint()
        set({ loading: false, hint: false })
        return
      }
    }

    try {
      const data = await authApi.refresh()
      setHint()
      set({ user: data.data.user, accessToken: data.data.accessToken, loading: false, hint: true })
      scheduleTokenRefresh(data.data.accessToken, () => get()._silentRefresh())
    } catch {
      clearHint()
      set({ user: null, accessToken: null, loading: false, hint: false })
    }
  },

  // Silent background refresh — replaces expired token without affecting UX
  _silentRefresh: async () => {
    try {
      const data = await authApi.refresh()
      const { user, accessToken } = data.data
      set({ user, accessToken })
      scheduleTokenRefresh(accessToken, () => get()._silentRefresh())
    } catch {
      clearTimeout(_refreshTimer)
      clearHint()
      set({ user: null, accessToken: null })
    }
  },

  setAuth: (user, accessToken) => {
    setHint()
    set({ user, accessToken, hint: true })
    scheduleTokenRefresh(accessToken, () => get()._silentRefresh())
  },

  clearAuth: async () => {
    clearTimeout(_refreshTimer)
    const { accessToken } = get()
    try { await authApi.logout(accessToken) } catch {}
    clearHint()
    set({ user: null, accessToken: null, hint: false })
  },

  openAuthModal:  (pendingMessage = null) => set({ authModalOpen: true, authModalPendingMessage: pendingMessage }),
  closeAuthModal: ()                      => set({ authModalOpen: false, authModalPendingMessage: null }),

  updateTokenBalance: (balance) => set(state => ({
    user: state.user
      ? { ...state.user, tokenWallet: { ...state.user.tokenWallet, balance } }
      : state.user,
  })),
}))

export default useAuthStore
