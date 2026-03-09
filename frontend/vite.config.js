import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This tells Vite to look one directory level up for your .env files
  envDir: '../',
})
