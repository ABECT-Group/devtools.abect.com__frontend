import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the framework out of the app chunk. React barely changes between
        // deploys, so a returning visitor keeps it cached while the app chunk
        // (which changes on every content edit) re-downloads on its own.
        //
        // NOTE: route-level splitting is deliberately NOT done here. The SSG
        // pass uses renderToString, which cannot render React.lazy content —
        // lazy routes would put a loading fallback into the static HTML of all
        // 50+ pages instead of the indexable content. Heavy leaf dependencies
        // (jszip, marked, turndown, js-yaml, react-markdown, heic-to) are
        // dynamically imported at their call sites instead.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
          if (id.includes('react-router')) return 'router-vendor'
        },
      },
    },
  },
})
