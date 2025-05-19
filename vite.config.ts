import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      protocol: 'wss',
      host: 'zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3-h3p2cmls--5173--4d9fd228.local-corp.webcontainer-api.io',
      clientPort: 443,
      overlay: false
    }
  }
});
