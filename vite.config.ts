import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // ← ceci est suffisant sur StackBlitz
    // 🔴 Pas de config HMR ici
  }
});
