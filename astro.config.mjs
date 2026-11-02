import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://racconrad.github.io',
  base: '/raccon-files/',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    optimizeDeps: { include: ['gsap'] },
    plugins: [tailwindcss()],
  },
});
