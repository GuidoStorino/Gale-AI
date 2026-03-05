import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gale-ai/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',   // nombre fijo, sin hash
        chunkFileNames: 'assets/index.js',
        assetFileNames: 'assets/index.[ext]', // index.css siempre
      }
    }
  }
})