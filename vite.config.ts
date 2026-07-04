import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works at any GitHub Pages sub-path
// (https://<user>.github.io/<repo>/) without hard-coding the repo name.
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    fs: { strict: false },
  },
})
