import { request } from './client.js'

const BASE = import.meta.env.VITE_API_URL

export const aiApi = {

  // ── Conversation CRUD ─────────────────────────────────────────────────────
  createConversation: (skillSlug, token) =>
    request('POST', '/api/ai/conversations', { body: { skillSlug }, token }),

  getConversations: (token, page = 1) =>
    request('GET', `/api/ai/conversations?page=${page}&limit=30`, { token }),

  getConversation: (id, token) =>
    request('GET', `/api/ai/conversations/${id}`, { token }),

  deleteConversation: (id, token) =>
    request('DELETE', `/api/ai/conversations/${id}`, { token }),

  streamSummary: async (conversationId, token, { signal, onDelta, onDone, onError }) => {
    let response
    try {
      response = await fetch(`${BASE}/api/ai/conversations/${conversationId}/summary`, {
        method: 'POST',
        credentials: 'include',
        signal,
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    } catch (err) {
      if (err.name === 'AbortError') throw err
      onError(err.message || 'Network error')
      return
    }

    if (!response.ok) {
      let msg = 'Request failed'
      try { const d = await response.json(); msg = d.message || msg } catch {}
      onError(msg)
      return
    }

    const reader  = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer    = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (raw === '[DONE]') return
          let event
          try { event = JSON.parse(raw) } catch { continue }
          if (event.type === 'delta') onDelta(event.content)
          if (event.type === 'done')  onDone(event)
          if (event.type === 'error') onError(event.message)
        }
      }
    } finally {
      reader.releaseLock()
    }
  },

  // ── SSE Streaming ─────────────────────────────────────────────────────────
  /**
   * Starts an SSE stream for a conversation message.
   * Calls onDelta(string), onDone({ tokensUsed, balanceAfter, messagesCount, limit }), onError(string).
   * Rejects with AbortError when signal is aborted.
   *
   * @param {string}      conversationId
   * @param {string}      content
   * @param {string}      token
   * @param {{ signal?: AbortSignal, onDelta: fn, onDone: fn, onError: fn }} callbacks
   */
  streamMessage: async (conversationId, content, token, { signal, onDelta, onDone, onError }) => {
    let response
    try {
      response = await fetch(`${BASE}/api/ai/conversations/${conversationId}/messages/stream`, {
        method: 'POST',
        credentials: 'include',
        signal,
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })
    } catch (err) {
      if (err.name === 'AbortError') throw err
      onError(err.message || 'Network error')
      return
    }

    if (!response.ok) {
      let msg = 'Request failed'
      try {
        const data = await response.json()
        msg = data.message || msg
      } catch {}
      onError(msg)
      return
    }

    const reader  = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer    = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (raw === '[DONE]') return

          let event
          try { event = JSON.parse(raw) } catch { continue }

          if (event.type === 'delta') onDelta(event.content)
          if (event.type === 'done')  onDone(event)
          if (event.type === 'error') onError(event.message)
        }
      }
    } finally {
      reader.releaseLock()
    }
  },
}
