import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    },
  },
  plugins: [react()],
})
