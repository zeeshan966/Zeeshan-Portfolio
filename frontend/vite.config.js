import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 1. Isse import karein
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),       // 2. React plugin zaroori hai JSX ke liye
    tailwindcss(), // 3. Tailwind plugin styling ke liye
  ],
})