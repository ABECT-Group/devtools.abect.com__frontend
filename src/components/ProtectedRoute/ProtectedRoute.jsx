import { Helmet } from 'react-helmet-async'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../../store/authStore.js'

export default function ProtectedRoute() {
  const user    = useAuthStore(s => s.user)
  const loading = useAuthStore(s => s.loading)

  // Declared here rather than in the child pages: during prerender `loading` is
  // still true, so no child renders and their own noindex never reaches the
  // static HTML. Anything behind this route is private by definition.
  const robots = (
    <Helmet>
      <title>Account — Abect Dev Tools</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  )

  if (loading) return robots
  if (!user)   return <>{robots}<Navigate to="/login" replace /></>

  return <>{robots}<Outlet /></>
}
