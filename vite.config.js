import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_FORCE_DEV_FALSE=1 to run dev server with import.meta.env.DEV === false
const forceDevFalse = process.env.VITE_FORCE_DEV_FALSE === '1'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio-interact/',
  define: forceDevFalse ? { 'import.meta.env.DEV': 'false' } : {},
  plugins: [react()],
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