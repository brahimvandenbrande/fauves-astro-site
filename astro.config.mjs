// @ts-check
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/consts.ts';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});