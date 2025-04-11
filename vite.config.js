// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
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
