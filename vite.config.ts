import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig({
  root: 'frontend', // Frontend की फाइलें 'frontend' फोल्डर में हैं
  plugins: [
    react(),
    cloudflare({
      configPath: '../wrangler.jsonc', // Cloudflare की सेटिंग बाहर रखी है
    }),
  ],
});
