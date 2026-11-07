import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE=/repo-name/ when building for GitHub Pages project sites.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
