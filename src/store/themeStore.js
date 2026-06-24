import { create } from 'zustand'

const THEME_KEY = 'theme'

// Apply synchronously on module load — prevents flash before React renders
;(function applyStoredTheme() {
  if (typeof window === 'undefined') return
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light') {
    document.documentElement.dataset.theme = 'light'
  } else {
    delete document.documentElement.dataset.theme
  }
})()

const getStored = () =>
  (typeof window !== 'undefined' && localStorage.getItem(THEME_KEY) === 'light')
    ? 'light'
    : 'dark'

const useThemeStore = create((set, get) => ({
  theme: getStored(),

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme)
    if (theme === 'light') {
      document.documentElement.dataset.theme = 'light'
    } else {
      delete document.documentElement.dataset.theme
    }
    set({ theme })
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },
}))

export default useThemeStore
