
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\vite.config.js

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })






import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://edu-app-backend.fly.dev',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})