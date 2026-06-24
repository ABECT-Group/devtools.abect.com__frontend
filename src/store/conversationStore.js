import { create } from 'zustand'
import { aiApi } from '../api/ai.js'

const SIDEBAR_MODE_KEY = 'sidebar_mode'

const getSavedMode = () => {
  if (typeof window === 'undefined') return 'tools'
  return localStorage.getItem(SIDEBAR_MODE_KEY) ?? 'tools'
}

const useConversationStore = create((set) => ({
  sidebarMode:          getSavedMode(),
  conversations:        [],
  conversationsLoading: false,

  setSidebarMode: (mode) => {
    localStorage.setItem(SIDEBAR_MODE_KEY, mode)
    set({ sidebarMode: mode })
  },

  fetchConversations: async (token) => {
    if (!token) return
    set({ conversationsLoading: true })
    try {
      const resp = await aiApi.getConversations(token)
      set({ conversations: resp.data.conversations ?? [] })
    } catch {}
    finally {
      set({ conversationsLoading: false })
    }
  },

  prependConversation: (conv) =>
    set(s => ({
      conversations: [conv, ...s.conversations.filter(c => String(c._id) !== String(conv._id))],
    })),

  removeConversation: (id) =>
    set(s => ({
      conversations: s.conversations.filter(c => String(c._id) !== String(id)),
    })),
}))

export default useConversationStore
