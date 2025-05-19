import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'local-corp.webcontainer-api.io',
    hmr: {
      overlay: false,
      protocol: 'ws',
      host: 'local-corp.webcontainer-api.io'
    }
  }
});