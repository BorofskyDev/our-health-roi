
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: { '@styles': './src/styles' },
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
