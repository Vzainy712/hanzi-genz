import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages phục vụ tại /hanzi-genz/ ; dev local vẫn chạy ở gốc /.
  base: command === 'build' ? '/hanzi-genz/' : '/',
  server: {
    port: 5173,
    open: true,
  },
}))
