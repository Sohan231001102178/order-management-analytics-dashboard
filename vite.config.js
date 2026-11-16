import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function liveServerCompatPlugin() {
  return {
    name: 'live-server-compat',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Automatically swap compiled bundle for source main.jsx when Vite dev or build runs
        return html.replace(
          '<script type="module" crossorigin src="./assets/index.js"></script>',
          '<script type="module" src="/src/main.jsx"></script>'
        );
      }
    }
  };
}

export default defineConfig({
  plugins: [liveServerCompatPlugin(), react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    open: false
  }
});
