// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Canonical links and the RSS feed build absolute URLs from this, so a wrong
  // value ships wrong links.
  site: 'https://alexajuno.com',

  markdown: {
    // Colour code from CSS variables rather than a baked-in theme, so code
    // takes the theme's code roles and follows dark mode. global.css maps them.
    shikiConfig: {
      theme: 'css-variables'
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});