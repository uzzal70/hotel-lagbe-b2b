// import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // sentryVitePlugin({
    //   org: 'tripfindy',
    //   project: 'tripfindy-b2b',
    // }),
    // reactRefresh(),
  ],
  server: {
    hmr: {
      overlay: false,
    },
    mimeTypes: {
      'application/javascript': ['js'],
    },
    port: 3001,
  },
  trailingSlash: true,
  build: {
    minify: 'terser', // or 'esbuild' for faster minification
    sourcemap: false, // Disable source maps in production
    chunkSizeWarningLimit: 5000,
  },
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        utilities: ['./src/utils'],
      },
    },
  },
});
