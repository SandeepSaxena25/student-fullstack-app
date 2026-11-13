import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig({
  root: 'frontend',
  build: {
    outDir: '../dist', // बिल्ड फाइलें सीधे बाहर 'dist' फोल्डर में जाएंगी
    emptyOutDir: true,
  },
  plugins: [
    react(),
    cloudflare({
      configPath: '../wrangler.jsonc',
    }),
  ],
});
