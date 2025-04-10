
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // anything starting with /nih → NIH RePORTER
      '/nih': {
        target: 'https://api.reporter.nih.gov',
        changeOrigin: true, // rewrites the Host header
        secure: true,
        rewrite: (p) => p.replace(/^\/nih/, ''),
      },
    },
  },
})
