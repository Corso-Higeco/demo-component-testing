import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,            // ascolta su tutte le interfacce
    allowedHosts: true     // autorizza qualunque host (utile col tunnel ngrok)
  }
})
