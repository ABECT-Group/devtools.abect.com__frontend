import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FAQ from '../../components/FAQ/FAQ'
import RelatedTools from '../../components/RelatedTools/RelatedTools'
import ContentSection from '../../components/ContentSection/ContentSection'
import Table from '../../components/Table/Table'
import AiChat from './components/AiChat/AiChat'
import { skillsApi } from '../../api/skills.js'
import useAuthStore from '../../store/authStore.js'
import { buildHelmet, OG_IMAGE } from './data/helmet'
import { buildContent } from './data/content'
import { buildJsonLdApp, buildJsonLdBreadcrumb, buildJsonLdFaq } from './data/jsonld'
import './AiPage.scss'

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  )
}

// Static page data — computed once at module load, not on every render
const { title, description, url, subtitle } = buildHelmet()
const HERO_TITLE = 'Lora, your AI assistant'
const { howToSteps, sections, faq, relatedTools } = buildContent()
const jsonLdApp        = buildJsonLdApp()
const jsonLdBreadcrumb = buildJsonLdBreadcrumb()
const jsonLdFaq        = buildJsonLdFaq(faq)

export default function AiPage() {
  const { '*': conversationPath } = useParams()
  const urlConversationId = conversationPath || undefined
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [skills,           setSkills]           = useState([])
  const [skillsLoading,    setSkillsLoading]    = useState(true)
  const [messageCount,     setMessageCount]     = useState(0)
  const [skillSwitchModal, setSkillSwitchModal] = useState(null)
  const [resolvedSkillSlug, setResolvedSkillSlug] = useState(null)

  const authLoading = useAuthStore(s => s.loading)
  const accessToken = useAuthStore(s => s.accessToken)

  const chatRef    = useRef(null)
  const isChatting = messageCount > 0 || !!urlConversationId

  // Redirect unauthenticated users away from private conversation URLs
  useEffect(() => {
    if (urlConversationId && !authLoading && !accessToken) {
      navigate('/ai', { replace: true })
    }
  }, [urlConversationId, authLoading, accessToken, navigate])

  useEffect(() => {
    skillsApi.getSkills()
      .then(resp => {
        const raw = resp.data?.skills ?? resp.data
        setSkills(Array.isArray(raw) ? raw : [])
      })
      .catch(() => {})
      .finally(() => setSkillsLoading(false))
  }, [])

  useLayoutEffect(() => {
    document.body.classList.toggle('ai-chatting', isChatting)
    return () => document.body.classList.remove('ai-chatting')
  }, [isChatting])

  useEffect(() => {
    setResolvedSkillSlug(null)
  }, [urlConversationId])

  const handleMessagesChange = useCallback((count) => setMessageCount(count), [])

  // skillSlug source of truth:
  // - /ai/:id        → resolved from loaded conversation via onSkillResolved
  // - /ai?skillSlug= → new conversation with pre-selected skill
  // - /ai            → default (general)
  const paramSkillSlug   = searchParams.get('skillSlug') || 'default'
  const currentSkillSlug = urlConversationId ? (resolvedSkillSlug || 'default') : paramSkillSlug
  const activeSkill      = skills.find(s => s.slug === currentSkillSlug) ?? null

  const handleSkillClick = useCallback((skill) => {
    if (isChatting) {
      if (currentSkillSlug !== skill.slug) setSkillSwitchModal({ pendingSkill: skill })
      return
    }
    if (currentSkillSlug === skill.slug) {
      navigate('/ai', { replace: true })
    } else {
      navigate(`/ai?skillSlug=${skill.slug}`, { replace: true })
    }
  }, [isChatting, currentSkillSlug, navigate])

  const handleNewChatWithSkill = useCallback((skill) => {
    chatRef.current?.newChat()
    setSkillSwitchModal(null)
    if (!skill || skill.slug === 'default') {
      navigate('/ai', { replace: true })
    } else {
      navigate(`/ai?skillSlug=${skill.slug}`, { replace: true })
    }
  }, [navigate])

  if (urlConversationId && authLoading) return null

  return (
    <main className={`AiPage${isChatting ? ' AiPage--chatting' : ''}`}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        {urlConversationId && <meta name="robots" content="noindex, nofollow" />}
        <script type="application/ld+json">{JSON.stringify(jsonLdApp)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
      </Helmet>

      <AiChat
        ref={chatRef}
        conversationId={urlConversationId}
        skillSlug={currentSkillSlug}
        activeSkill={activeSkill}
        skills={skills}
        skillsLoading={skillsLoading}
        onMessagesChange={handleMessagesChange}
        onSkillClick={handleSkillClick}
        onSkillResolved={setResolvedSkillSlug}
        heroTitle={HERO_TITLE}
        heroSub={subtitle}
      />

      {!isChatting && (
        <>
          <ContentSection title="How it works">
            <ol className="ContentSection__steps">
              {howToSteps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </ContentSection>

          {sections.map((section, si) => (
            <ContentSection key={si} title={section.heading}>
              {section.blocks.map((block, i) => {
                if (block.type === 'p')  return <p key={i} className="ContentSection__text">{renderText(block.text)}</p>
                if (block.type === 'ul') return (
                  <ul key={i} className="ContentSection__list">
                    {block.items.map((item, j) => <li key={j}>{renderText(item)}</li>)}
                  </ul>
                )
                if (block.type === 'table') return (
                  <Table key={i} columns={block.columns} note={block.note}>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={row.highlight ? 'Table__row--highlight' : ''}>
                        <th scope="row">{row.cells[0]}</th>
                        {row.cells.slice(1).map((cell, k) => <td key={k}>{cell}</td>)}
                      </tr>
                    ))}
                  </Table>
                )
                return null
              })}
            </ContentSection>
          ))}

          <FAQ items={faq} />
          <RelatedTools items={relatedTools} />
        </>
      )}

      {skillSwitchModal && (
        <div className="AiPage__modal-overlay" onClick={() => setSkillSwitchModal(null)}>
          <div className="AiPage__modal" onClick={e => e.stopPropagation()}>
            <p className="AiPage__modal-text">
              To use <strong>{skillSwitchModal.pendingSkill.label}</strong>, you need to start a new conversation.
              Your current conversation will remain saved in the sidebar.
            </p>
            <div className="AiPage__modal-actions">
              <button
                type="button"
                className="AiPage__modal-btn AiPage__modal-btn--cancel"
                onClick={() => setSkillSwitchModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="AiPage__modal-btn AiPage__modal-btn--confirm"
                onClick={() => handleNewChatWithSkill(skillSwitchModal.pendingSkill)}
              >
                New Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
