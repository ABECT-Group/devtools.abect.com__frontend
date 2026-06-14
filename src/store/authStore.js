import { create } from 'zustand'
import { authApi } from '../api/auth.js'
import { userApi } from '../api/user.js'

const HINT_KEY = 'auth_hint'
const getHint  = () => typeof window !== 'undefined' && localStorage.getItem(HINT_KEY) === '1'
const setHint  = () => localStorage.setItem(HINT_KEY, '1')
const clearHint = () => localStorage.removeItem(HINT_KEY)

const useAuthStore = create((set, get) => ({
  user:         null,
  accessToken:  null,
  loading:      true,
  hint:         getHint(),   // true = was logged in last time, show avatar skeleton while loading

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
        set({ user: data.data, accessToken: urlToken, loading: false, hint: true })
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
    } catch {
      clearHint()
      set({ user: null, accessToken: null, loading: false, hint: false })
    }
  },

  setAuth: (user, accessToken) => {
    setHint()
    set({ user, accessToken, hint: true })
  },

  clearAuth: async () => {
    const { accessToken } = get()
    try { await authApi.logout(accessToken) } catch {}
    clearHint()
    set({ user: null, accessToken: null, hint: false })
  },

  openAuthModal:  (pendingMessage = null) => set({ authModalOpen: true, authModalPendingMessage: pendingMessage }),
  closeAuthModal: ()                      => set({ authModalOpen: false, authModalPendingMessage: null }),
}))

export default useAuthStore
