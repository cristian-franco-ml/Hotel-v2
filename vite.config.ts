import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/run-all-scrapings': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/run-scrape-hotels': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/run-scrapeo-geo': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/run-scrape-hotel-propio': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/get-scraping-period': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/set-scraping-period': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/hoteles-tijuana-json': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/amadeus-hotels': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
