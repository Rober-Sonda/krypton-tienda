import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      // Amplio rango: Android Chrome 60+, iOS Safari 12+, Samsung Browser, Firefox 60+
      targets: [
        'chrome >= 60',
        'firefox >= 60',
        'safari >= 12',
        'ios_saf >= 12',
        'android >= 6',
        'samsung >= 8',
        'edge >= 79',
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    })
  ],
  build: {
    // Reduce chunk size para conexiones lentas en móvil
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/firebase')) {
            return 'firebase';
          }
        }
      }
    }
  }
})
