import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { prerenderRoutes } from './src/prerender-routes.js'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    !isSsrBuild && sitemap({
      hostname: 'https://devtools.abect.com',
      routes: prerenderRoutes,
    }),
  ].filter(Boolean),
}))
