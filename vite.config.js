import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_FORCE_DEV_FALSE=1 to run dev server with import.meta.env.DEV === false
const forceDevFalse = process.env.VITE_FORCE_DEV_FALSE === '1'

/** GitHub Pages serves `404.html` for unknown paths; it must match the built SPA entry. */
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const dist = join(process.cwd(), 'dist')
      copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio-interact/',
  define: forceDevFalse ? { 'import.meta.env.DEV': 'false' } : {},
  plugins: [react(), copyIndexTo404()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-d3': ['d3-geo', 'd3-transition', 'topojson-client'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})