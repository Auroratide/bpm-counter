import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Set base to repository name for GitHub Pages deployment
  base: '/bpm-counter/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
})