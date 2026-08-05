import { lazy, Suspense } from 'react'

/**
 * react-markdown + remark-gfm are ~150 kB and are only ever needed once a
 * conversation has at least one message. The prerendered /ai page renders the
 * landing state with zero messages, so this boundary is never reached during
 * the SSG pass — which matters, because renderToString cannot render lazy
 * content and would emit the fallback into the static HTML instead.
 *
 * Do not use this pattern for anything that must appear in prerendered markup.
 */
const MarkdownImpl = lazy(() =>
  Promise.all([import('react-markdown'), import('remark-gfm')]).then((mods) => {
    const ReactMarkdown = mods[0].default
    const remarkGfm = mods[1].default

    return {
      default: ({ children, components }) => (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {children}
        </ReactMarkdown>
      ),
    }
  })
)

export default function Markdown({ children, components }) {
  return (
    <Suspense fallback={<p className="AiChat__markdown-fallback">{children}</p>}>
      <MarkdownImpl components={components}>{children}</MarkdownImpl>
    </Suspense>
  )
}
