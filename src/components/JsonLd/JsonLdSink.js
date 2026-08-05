import { createContext } from 'react'

/**
 * Prerender-only collector for JSON-LD. entry-server.jsx provides an array
 * here; on the client the value stays null. Kept in its own module so the
 * JsonLd component file exports nothing but a component (fast refresh).
 */
export const JsonLdSink = createContext(null)
