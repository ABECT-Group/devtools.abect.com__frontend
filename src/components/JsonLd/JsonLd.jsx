import { useContext } from 'react'
import { JsonLdSink } from './JsonLdSink'

/**
 * Declares structured data for the current page.
 *
 * React 19 hoists <title>, <meta> and <link> into <head> automatically, but it
 * does NOT hoist inline <script> tags — rendering JSON-LD inside a component
 * leaves it in <body>. So instead of putting the script in the tree, pages
 * declare their schemas here and the prerender pass collects them and
 * serialises them into <head> (see entry-server.jsx).
 *
 * Renders null on both server and client, so hydration always matches and no
 * JSON-LD is re-serialised into the DOM at runtime.
 *
 *   <JsonLd data={jsonLdApp} />
 *
 * A null/undefined `data` is ignored, so optional schemas need no guard.
 */
export default function JsonLd({ data }) {
  const sink = useContext(JsonLdSink)
  if (sink && data) sink.push(data)
  return null
}
