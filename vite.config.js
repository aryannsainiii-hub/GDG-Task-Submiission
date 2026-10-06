import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' lets the build work on GitHub Pages, Netlify or Vercel without changes
export default defineConfig({ plugins: [react()], base: './' })
