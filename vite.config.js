import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        './',
        'C:/Users/admin/.gemini/antigravity-ide/brain/70420369-0676-4040-9975-b911f767067a'
      ]
    }
  }
})
