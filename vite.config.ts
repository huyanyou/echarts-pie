import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // proxy:{}
    port: 9999,
    host: '0.0.0.0',
    open: true
  }
})
