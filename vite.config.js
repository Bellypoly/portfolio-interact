import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `VITE_FORCE_DEV_FALSE=1 npm run dev` runs the dev server with `import.meta.env.DEV === false`
// so we can preview prod-only branches (`if (import.meta.env.DEV) ...` debug overlays etc.).
const forceDevFalse = process.env.VITE_FORCE_DEV_FALSE === '1'

// GitHub Pages serves `404.html` for unknown paths; clone the SPA entry so deep links boot the app.
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const dist = join(process.cwd(), 'dist')
      copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
    },
  }
}

export default defineConfig({
  base: '/',
  define: forceDevFalse ? { 'import.meta.env.DEV': 'false' } : {},
  plugins: [react(), copyIndexTo404()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Long-lived vendor chunks: stable hashes between deploys → better browser caching.
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-d3': ['d3-geo', 'd3-transition', 'topojson-client'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
