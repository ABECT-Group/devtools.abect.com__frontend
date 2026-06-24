import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { aiApi } from '../../../../api/ai.js'
import useAuthStore from '../../../../store/authStore.js'
import useConversationStore from '../../../../store/conversationStore.js'
import CodeBox from '../../../../components/CodeBox/CodeBox.jsx'
import './AiChat.scss'

const AI_MAX_MESSAGES  = 100
const AI_WARN_MESSAGES = 80

// ── Frontend file-block parser (mirrors backend parseFileBlocks) ──────────────
// Детектить **filename.ext** перед code fence — природній MD що AI пише сам.
// Контент не трансформується: він і так валідний MD.
const FILE_FENCE_REGEX = /\*\*([^\s*][^*]*\.[a-zA-Z0-9]+)\*\*[ \t]*\n{1,2}```\w*[ \t]*\n([\s\S]*?)\n```/g

function parseFileBlocks(rawContent) {
  const files = []

  for (const match of rawContent.matchAll(FILE_FENCE_REGEX)) {
    const name   = match[1].trim()
    const body   = match[2].trim()
    const format = name.includes('.') ? name.split('.').pop().toLowerCase() : 'txt'
    if (!files.some(f => f.name === name)) {
      files.push({ name, format, content: body })
    }
  }

  return { files, cleanContent: rawContent.trim() }
}

// ── Markdown renderer for assistant messages ──────────────────────────────────
const mdComponents = {
  code({ className, children }) {
    const lang = /language-(\w+)/.exec(className || '')?.[1]
    if (!lang) return <code className="AiChat__inline-code">{children}</code>
    return <CodeBox label={lang.toUpperCase()} code={String(children).replace(/\n$/, '')} />
  },
}

// Regex for detecting the START of a file block (no closing fence required — for streaming)
const FILE_OPEN_REGEX = /\*\*([^\s*][^*]*\.[a-zA-Z0-9]+)\*\*[ \t]*\n{1,2}```\w*[ \t]*\n/

function parseContentSegments(content) {
  const segments = []
  let lastIndex  = 0

  for (const match of content.matchAll(FILE_FENCE_REGEX)) {
    const before = content.slice(lastIndex, match.index).trim()
    if (before) segments.push({ type: 'text', content: before })
    segments.push({
      type:    'file',
      name:    match[1].trim(),
      format:  match[1].includes('.') ? match[1].split('.').pop().toLowerCase() : 'txt',
      content: match[2].trim(),
    })
    lastIndex = match.index + match[0].length
  }

  const tail = content.slice(lastIndex).trim()
  if (tail) segments.push({ type: 'text', content: tail })

  return segments
}

// Same but also detects the last open (unfinished) file block during streaming
function parseStreamingSegments(content) {
  const segments = []
  let lastIndex  = 0

  for (const match of content.matchAll(FILE_FENCE_REGEX)) {
    const before = content.slice(lastIndex, match.index).trim()
    if (before) segments.push({ type: 'text', content: before })
    segments.push({
      type:      'file',
      name:      match[1].trim(),
      format:    match[1].includes('.') ? match[1].split('.').pop().toLowerCase() : 'txt',
      content:   match[2].trim(),
      streaming: false,
    })
    lastIndex = match.index + match[0].length
  }

  const remaining  = content.slice(lastIndex)
  const openMatch  = FILE_OPEN_REGEX.exec(remaining)

  if (openMatch) {
    const beforeOpen = remaining.slice(0, openMatch.index).trim()
    if (beforeOpen) segments.push({ type: 'text', content: beforeOpen })
    segments.push({
      type:      'file',
      name:      openMatch[1].trim(),
      format:    openMatch[1].includes('.') ? openMatch[1].split('.').pop().toLowerCase() : 'txt',
      content:   '',
      streaming: true,
    })
  } else {
    const tail = remaining.trim()
    if (tail) segments.push({ type: 'text', content: tail })
  }

  return segments
}

function FileCard({ file, isStreaming, onView }) {
  const allLines   = file.content.split('\n')
  const firstLine  = allLines.filter(l => l.trim())[0] ?? ''
  const preview    = firstLine.length > 5 ? firstLine.slice(0, -5) + '...' : firstLine

  const handleDownload = (e) => {
    e.stopPropagation()
    const blob = new Blob([file.content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`AiFileCard${isStreaming ? ' AiFileCard--streaming' : ''}`}
      onClick={isStreaming ? undefined : onView}
      role={isStreaming ? undefined : 'button'}
      tabIndex={isStreaming ? undefined : 0}
      onKeyDown={isStreaming ? undefined : e => e.key === 'Enter' && onView()}
    >
      <div className="AiFileCard__icon">
        {isStreaming
          ? <svg width="72" height="64" viewBox="0 0 24 24" fill="currentColor" className="AiFileCard__spinner" aria-hidden="true">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
            </svg>
          : <>
              <svg width="72" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="AiFileCard__icon-label">{file.format.toUpperCase()}</span>
            </>
        }
      </div>
      <div className="AiFileCard__info">
        <span className="AiFileCard__name">{file.name}</span>
        {isStreaming
          ? <span className="AiFileCard__generating">Generating...</span>
          : <code className="AiFileCard__preview">{preview}</code>
        }
      </div>
      {!isStreaming && (
        <div className="AiFileCard__actions">
          <button type="button" className="AiFileCard__btn" onClick={e => { e.stopPropagation(); onView() }} title="View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button type="button" className="AiFileCard__btn" onClick={handleDownload} title="Download">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

function MarkdownContent({ content, streaming, onFileClick }) {
  if (streaming) {
    const segments = parseStreamingSegments(content)
    const hasFiles = segments.some(s => s.type === 'file')

    if (!hasFiles) {
      return (
        <div className="AiChat__markdown AiChat__markdown--streaming">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{content}</ReactMarkdown>
        </div>
      )
    }

    return (
      <div className="AiChat__markdown">
        {segments.map((seg, i) =>
          seg.type === 'file'
            ? <FileCard key={i} file={seg} isStreaming={seg.streaming} onView={() => onFileClick?.(seg)} />
            : seg.content && <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={mdComponents}>{seg.content}</ReactMarkdown>
        )}
      </div>
    )
  }

  const segments = parseContentSegments(content)
  const hasFiles = segments.some(s => s.type === 'file')

  if (!hasFiles) {
    return (
      <div className="AiChat__markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{content}</ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="AiChat__markdown">
      {segments.map((seg, i) =>
        seg.type === 'file'
          ? <FileCard key={i} file={seg} isStreaming={false} onView={() => onFileClick?.(seg)} />
          : <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={mdComponents}>{seg.content}</ReactMarkdown>
      )}
    </div>
  )
}

// ── Files panel (desktop only, fixed top-right) ────────────────────────────────
const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

function FilesPanel({ files, onFileClick }) {
  if (!files.length) return null
  return (
    <div className="AiFiles">
      <div className="AiFiles__header">
        <FileIcon />
        <span>Files</span>
        <span className="AiFiles__count">{files.length}</span>
      </div>
      <div className="AiFiles__list">
        {files.map((file, i) => (
          <button key={i} type="button" className="AiFiles__item" onClick={() => onFileClick(file)}>
            <FileIcon />
            <span className="AiFiles__name">{file.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function FileModal({ file, onClose }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(file.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([file.content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="AiFileModal__overlay" onClick={onClose}>
      <div className="AiFileModal__card" onClick={e => e.stopPropagation()}>
        <div className="AiFileModal__header">
          <FileIcon />
          <span className="AiFileModal__name">{file.name}</span>
          <div className="AiFileModal__actions">
            <button
              type="button"
              className={`AiFileModal__btn${copied ? ' AiFileModal__btn--done' : ''}`}
              onClick={handleCopy}
              title={copied ? 'Copied!' : 'Copy'}
            >
              {copied
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              }
            </button>
            <button type="button" className="AiFileModal__btn" onClick={handleDownload} title="Download">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button type="button" className="AiFileModal__btn" onClick={onClose} title="Close" aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="AiFileModal__body">
          <CodeBox label={file.format.toUpperCase()} code={file.content} />
        </div>
      </div>
    </div>
  )
}

// ── Document message: CodeBox + hover icons (copy + download) ────────────────
function DocumentMessage({ content, documentContent, documentFormat, streaming }) {
  const [copied, setCopied] = useState(false)

  const ext = documentFormat === 'json' ? 'json' : documentFormat === 'markdown' ? 'md' : 'txt'
  const label = documentFormat === 'json' ? 'JSON' : documentFormat === 'markdown' ? 'Markdown' : 'Text'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(documentContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([documentContent], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `document.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const idx    = content.indexOf(documentContent)
  const before = idx >= 0 ? content.slice(0, idx).trim() : ''
  const after  = idx >= 0 ? content.slice(idx + documentContent.length).trim() : ''

  return (
    <>
      {before && <span className="AiChat__msg-text">{before}</span>}
      <div className="AiChat__doc-wrap">
        <CodeBox label={`${label} document`} code={documentContent} />
        <div className="AiChat__doc-hover">
          <button
            type="button"
            className={`AiChat__doc-icon${copied ? ' AiChat__doc-icon--done' : ''}`}
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy'}
          >
            {copied
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            }
          </button>
          <button
            type="button"
            className="AiChat__doc-icon"
            onClick={handleDownload}
            title="Download"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </div>
      {after && <span className="AiChat__msg-text">{after}</span>}
      {streaming && <span className="AiChat__cursor" aria-hidden="true" />}
    </>
  )
}

// ── Summary confirmation modal ────────────────────────────────────────────────
function SummaryConfirmModal({ onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="AiChat__modal-overlay" onClick={onCancel}>
      <div className="AiChat__modal-card" onClick={e => e.stopPropagation()}>
        <button className="AiChat__modal-close" onClick={onCancel} aria-label="Close">✕</button>
        <h2 className="AiChat__modal-title">Generate conversation summary?</h2>
        <p className="AiChat__modal-text">
          Lora will summarize this entire conversation into a structured Markdown document sent right here in the chat.
        </p>
        <p className="AiChat__modal-note">This can only be done once per chat.</p>
        <div className="AiChat__modal-actions">
          <button type="button" className="AiChat__modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="AiChat__modal-confirm" onClick={onConfirm}>
            Generate summary
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
const AiChat = forwardRef(function AiChat(
  { conversationId: urlConversationId, skillSlug, activeSkill, skills, skillsLoading, onMessagesChange, onSkillClick, onSkillResolved, heroTitle, heroSub },
  ref,
) {
  const navigate            = useNavigate()
  const accessToken         = useAuthStore(s => s.accessToken)
  const user                = useAuthStore(s => s.user)
  const openAuthModal       = useAuthStore(s => s.openAuthModal)
  const updateTokenBalance  = useAuthStore(s => s.updateTokenBalance)
  const prependConversation = useConversationStore(s => s.prependConversation)

  const [messages,         setMessages]         = useState([])
  const [convFiles,        setConvFiles]        = useState([])
  const [openFile,         setOpenFile]         = useState(null)
  const [input,            setInput]            = useState('')
  const [streaming,        setStreaming]        = useState(false)
  const [activeConvId,     setActiveConvId]     = useState(null)
  const [initLoading,      setInitLoading]      = useState(false)
  const [messagesCount,    setMessagesCount]    = useState(0)
  const [hasSummary,       setHasSummary]       = useState(false)
  const [streamingSummary, setStreamingSummary] = useState(false)
  const [summaryConfirm,   setSummaryConfirm]   = useState(false)

  const messagesEndRef      = useRef(null)
  const abortRef            = useRef(null)
  const restoreRequestRef   = useRef(0)
  const pendingSendRef      = useRef(false)
  const textareaRef         = useRef(null)
  const justCreatedRef      = useRef(false)
  const sendingRef          = useRef(false)
  const streamingContentRef = useRef('')
  const accessTokenRef      = useRef(accessToken)
  const userScrolledUpRef   = useRef(false)
  useLayoutEffect(() => { accessTokenRef.current = accessToken }, [accessToken])

  const handleNewChat = useCallback(() => {
    abortRef.current?.abort()
    streamingContentRef.current = ''
    userScrolledUpRef.current   = false
    setMessages([])
    setConvFiles([])
    setOpenFile(null)
    setActiveConvId(null)
    setInput('')
    setStreaming(false)
    setMessagesCount(0)
    setHasSummary(false)
    window.scrollTo({ top: 0 })
  }, [])

  useImperativeHandle(ref, () => ({ newChat: handleNewChat }), [handleNewChat])

  // Load conversation from URL param, or reset to fresh state.
  // Skip if justCreatedRef is set — we already have the messages in state.
  // Skip if sendingRef is set with no urlConversationId — StrictMode double-invoke
  // would clear messages while handleSend is awaiting conversation creation.
  useEffect(() => {
    if (justCreatedRef.current) {
      justCreatedRef.current = false
      return
    }
    if (!urlConversationId && sendingRef.current) return

    abortRef.current?.abort()
    streamingContentRef.current = ''
    setMessages([])
    setConvFiles([])
    setOpenFile(null)
    setActiveConvId(null)
    setStreaming(false)
    setInitLoading(false)
    setMessagesCount(0)
    setHasSummary(false)

    if (!urlConversationId) return

    const requestId = ++restoreRequestRef.current
    setInitLoading(true)
    aiApi.getConversation(urlConversationId, accessTokenRef.current)
      .then(resp => {
        if (requestId !== restoreRequestRef.current) return
        const conv = resp.data
        setActiveConvId(String(conv._id))
        const loaded = conv.messages.map(m => ({
          role:            m.role,
          content:         m.content,
          // Keep legacy fields for old messages stored before the FILE system
          type:            m.type            ?? 'text',
          documentFormat:  m.documentFormat  ?? null,
          documentContent: m.documentContent ?? null,
        }))
        if (conv.summary) {
          loaded.push({ role: 'assistant', content: conv.summary, isSummary: true })
        }
        setMessages(loaded)
        const files = [...(conv.files ?? [])]
        if (conv.summary) files.push({ name: 'Summary.md', format: 'md', content: conv.summary })
        setConvFiles(files)
        setMessagesCount(conv.messages.length)
        setHasSummary(conv.summary !== null)
        if (conv.skillSlug) onSkillResolved?.(conv.skillSlug)
      })
      .catch(err => {
        if (requestId !== restoreRequestRef.current) return
        if (err.status === 404 || err.status === 403) {
          navigate('/ai', { replace: true })
        }
      })
      .finally(() => {
        if (requestId !== restoreRequestRef.current) return
        setInitLoading(false)
      })
  }, [urlConversationId]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    onMessagesChange?.(messages.length)
  }, [messages.length, onMessagesChange])

  // Pause auto-scroll when user scrolls up during streaming; resume when back at bottom
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 120
      if (nearBottom) {
        userScrolledUpRef.current = false
      } else if (streaming || streamingSummary) {
        userScrolledUpRef.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [streaming, streamingSummary])

  useEffect(() => {
    if (messages.length > 0 && !userScrolledUpRef.current) {
      const isStreaming = streaming || streamingSummary
      messagesEndRef.current?.scrollIntoView({ behavior: isStreaming ? 'instant' : 'smooth' })
    }
  }, [messages, streaming, streamingSummary])

  useEffect(() => () => abortRef.current?.abort(), [])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 290) + 'px'
  }, [input])

  useEffect(() => {
    if (!user || streaming) return

    // In-memory pending (same component instance — covers normal modal auth flow)
    if (pendingSendRef.current && input.trim()) {
      pendingSendRef.current = false
      sessionStorage.removeItem('ai:pending')
      handleSend()
      return
    }

    // sessionStorage fallback (component remounted or page was reloaded after auth)
    const stored = sessionStorage.getItem('ai:pending')
    if (stored) {
      try {
        const { prompt } = JSON.parse(stored)
        if (prompt) {
          sessionStorage.removeItem('ai:pending')
          handleSend(prompt)
        }
      } catch {}
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSend(directPrompt) {
    const trimmed = typeof directPrompt === 'string' ? directPrompt.trim() : input.trim()
    if (!trimmed || streaming) return

    if (!user) {
      pendingSendRef.current = true
      sessionStorage.setItem('ai:pending', JSON.stringify({ prompt: trimmed }))
      openAuthModal()
      return
    }

    pendingSendRef.current    = false
    sendingRef.current        = true
    userScrolledUpRef.current = false
    setInput('')
    setStreaming(true)

    setMessages(prev => [
      ...prev,
      { role: 'user',      content: trimmed },
      { role: 'assistant', content: '', streaming: true },
    ])

    try {
      let convId = activeConvId
      if (!convId) {
        const resp = await aiApi.createConversation(skillSlug || 'default', accessTokenRef.current)
        convId = String(resp.data.conversationId)
        setActiveConvId(convId)
        justCreatedRef.current = true
        navigate(`/ai/${convId}`, { replace: true })
        prependConversation({
          _id:       convId,
          skillSlug: skillSlug || 'default',
          title:     trimmed.slice(0, 60).trim(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }

      abortRef.current = new AbortController()

      await aiApi.streamMessage(convId, trimmed, accessTokenRef.current, {
        signal: abortRef.current.signal,

        onDelta: (delta) => {
          streamingContentRef.current += delta
          setMessages(prev => {
            const last = { ...prev[prev.length - 1], content: prev[prev.length - 1].content + delta }
            return [...prev.slice(0, -1), last]
          })
        },

        onDone: ({ balanceAfter, messagesCount: count }) => {
          const { files: newFiles, cleanContent } = parseFileBlocks(streamingContentRef.current)
          streamingContentRef.current = ''
          setMessages(prev => {
            const last = prev[prev.length - 1]
            return [...prev.slice(0, -1), { ...last, streaming: false, content: cleanContent }]
          })
          if (newFiles.length > 0) setConvFiles(prev => [...prev, ...newFiles])
          if (typeof balanceAfter === 'number') updateTokenBalance(balanceAfter)
          if (typeof count === 'number')        setMessagesCount(count)
          setStreaming(false)
        },

        onError: (message) => {
          streamingContentRef.current = ''
          setMessages(prev => {
            const last = { ...prev[prev.length - 1], streaming: false, error: true, content: message || 'Something went wrong. Please try again.' }
            return [...prev.slice(0, -1), last]
          })
          setStreaming(false)
        },
      })

      // Safety fallback: settle last bubble if stream ended without onDone/onError
      setStreaming(false)
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last.streaming) {
          return [...prev.slice(0, -1), { ...last, streaming: false }]
        }
        return prev
      })
    } catch (err) {
      streamingContentRef.current = ''
      if (err.name === 'AbortError') {
        setStreaming(false)
        setMessages(prev => {
          const last = prev[prev.length - 1]
          if (last?.role === 'assistant') {
            return [...prev.slice(0, -1), { ...last, streaming: false }]
          }
          return prev
        })
        return
      }
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant') {
          return [...prev.slice(0, -1), { ...last, streaming: false, error: true, content: err.message || 'Something went wrong.' }]
        }
        return prev
      })
      setStreaming(false)
    } finally {
      sendingRef.current = false
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  async function handleSummary() {
    if (!activeConvId || streaming || streamingSummary || hasSummary) return

    setSummaryConfirm(false)
    setStreamingSummary(true)
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: '', streaming: true, isSummary: true },
    ])

    abortRef.current = new AbortController()

    let summaryContent = ''

    try {
      await aiApi.streamSummary(activeConvId, accessTokenRef.current, {
        signal: abortRef.current.signal,

        onDelta: (delta) => {
          summaryContent += delta
          setMessages(prev => {
            const last = { ...prev[prev.length - 1], content: prev[prev.length - 1].content + delta }
            return [...prev.slice(0, -1), last]
          })
        },

        onDone: ({ balanceAfter }) => {
          setMessages(prev => {
            const last = { ...prev[prev.length - 1], streaming: false }
            return [...prev.slice(0, -1), last]
          })
          setConvFiles(prev => [...prev, { name: 'Summary.md', format: 'md', content: summaryContent }])
          if (typeof balanceAfter === 'number') updateTokenBalance(balanceAfter)
          setHasSummary(true)
          setStreamingSummary(false)
        },

        onError: (message) => {
          setMessages(prev => {
            const last = { ...prev[prev.length - 1], streaming: false, error: true, content: message || 'Failed to generate summary.' }
            return [...prev.slice(0, -1), last]
          })
          setStreamingSummary(false)
        },
      })
    } catch (err) {
      if (err.name === 'AbortError') {
        setStreamingSummary(false)
        setMessages(prev => {
          const last = prev[prev.length - 1]
          if (last?.role === 'assistant') return [...prev.slice(0, -1), { ...last, streaming: false }]
          return prev
        })
        return
      }
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant') {
          return [...prev.slice(0, -1), { ...last, streaming: false, error: true, content: err.message || 'Something went wrong.' }]
        }
        return prev
      })
      setStreamingSummary(false)
    }
  }

  const isEmpty            = messages.length === 0 && !initLoading
  const isChatting         = !isEmpty
  const visibleSkills      = (skills ?? []).filter(s => s.slug !== 'default')
  const isApproachingLimit = messagesCount >= AI_WARN_MESSAGES
  const showSummaryBtn     = !!activeConvId && messages.length > 0 && !hasSummary

  return (
    <div className={`AiChat${isChatting ? ' AiChat--chatting' : ''}`}>

      <FilesPanel files={convFiles} onFileClick={setOpenFile} />

      {isEmpty && heroTitle && (
        <div className="AiChat__hero">
          <h1 className="AiChat__hero-title">{heroTitle}</h1>
          {heroSub && <p className="AiChat__hero-sub">{heroSub}</p>}
        </div>
      )}

      {isChatting && (
        <div className="AiChat__messages">
          {messages.map((msg, i) => {
            if (msg.role === 'user') {
              return (
                <div key={i} className="AiChat__message AiChat__message--user">
                  <div className="AiChat__bubble">
                    <span className="AiChat__msg-text">{msg.content}</span>
                  </div>
                </div>
              )
            }

            if (msg.streaming && !msg.content) {
              return (
                <div key={i} className="AiChat__message AiChat__message--assistant">
                  <div className="AiChat__thinking">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                    </svg>
                    <span>Generating answer</span>
                    <span className="AiChat__thinking-dots" aria-hidden="true" />
                  </div>
                </div>
              )
            }

            if (msg.isSummary) {
              return (
                <div key={i} className="AiChat__message AiChat__message--assistant">
                  {msg.error
                    ? <div className="AiChat__bubble AiChat__bubble--error"><span className="AiChat__msg-text">{msg.content}</span></div>
                    : <DocumentMessage content={msg.content} documentContent={msg.content} documentFormat="markdown" streaming={!!msg.streaming} />
                  }
                </div>
              )
            }

            if (msg.type === 'document' && msg.documentContent) {
              return (
                <div key={i} className="AiChat__message AiChat__message--assistant">
                  <div className="AiChat__bubble AiChat__bubble--code">
                    <DocumentMessage
                      content={msg.content}
                      documentContent={msg.documentContent}
                      documentFormat={msg.documentFormat}
                      streaming={!!msg.streaming}
                    />
                  </div>
                </div>
              )
            }

            return (
              <div key={i} className="AiChat__message AiChat__message--assistant">
                {msg.error
                  ? <div className="AiChat__bubble AiChat__bubble--error"><span className="AiChat__msg-text">{msg.content}</span></div>
                  : <MarkdownContent content={msg.content} streaming={!!msg.streaming} onFileClick={setOpenFile} />
                }
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="AiChat__input-area">

        {isApproachingLimit && (
          <div className="AiChat__limit-bar">
            <span className="AiChat__limit-text">
              Approaching limit — {messagesCount}/{AI_MAX_MESSAGES}
            </span>
            <div className="AiChat__limit-actions">
              <button type="button" className="AiChat__limit-btn" onClick={handleNewChat}>
                New chat
              </button>
              {!hasSummary && (
                <button
                  type="button"
                  className="AiChat__limit-btn AiChat__limit-btn--accent"
                  onClick={() => setSummaryConfirm(true)}
                  disabled={streaming || streamingSummary}
                >
                  Summary
                </button>
              )}
            </div>
          </div>
        )}

        <div className="AiChat__input-wrapper">
          <div className="AiChat__input-inner">
            {activeSkill && activeSkill.slug !== 'default' && (
              <span className="AiChat__skill-label">{activeSkill.label}</span>
            )}
            <textarea
              ref={textareaRef}
              className="AiChat__textarea"
              placeholder={isEmpty ? 'Ask Lora anything, or select a skill below…' : 'Reply to Lora…'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={4000}
              disabled={streaming || messagesCount >= AI_MAX_MESSAGES}
            />
          </div>
          <button
            type="button"
            className="AiChat__send"
            onClick={handleSend}
            disabled={!input.trim() || streaming || messagesCount >= AI_MAX_MESSAGES}
            aria-label="Send"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 20V4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 11L12 4L19 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="AiChat__bottom-row">
          {skillsLoading ? (
            <div className="AiChat__skills">
              <div className="AiChat__skill-skeleton AiChat__skill-skeleton--w96" />
              <div className="AiChat__skill-skeleton AiChat__skill-skeleton--w116" />
              <div className="AiChat__skill-skeleton AiChat__skill-skeleton--w80" />
            </div>
          ) : visibleSkills.length > 0 ? (
            <div className="AiChat__skills">
              {visibleSkills.map(skill => (
                <button
                  key={skill.slug}
                  type="button"
                  className={`AiChat__skill-chip${activeSkill?.slug === skill.slug ? ' AiChat__skill-chip--active' : ''}`}
                  onClick={() => onSkillClick?.(skill)}
                >
                  {skill.label}
                </button>
              ))}
            </div>
          ) : <div className="AiChat__skills" />}

          {showSummaryBtn && !isApproachingLimit && (
            <button
              type="button"
              className="AiChat__summary-btn"
              onClick={() => setSummaryConfirm(true)}
              disabled={streaming || streamingSummary}
            >
              Summary
            </button>
          )}
        </div>

      </div>

      {openFile && (
        <FileModal file={openFile} onClose={() => setOpenFile(null)} />
      )}

      {summaryConfirm && (
        <SummaryConfirmModal
          onConfirm={handleSummary}
          onCancel={() => setSummaryConfirm(false)}
        />
      )}

    </div>
  )
})

export default AiChat
