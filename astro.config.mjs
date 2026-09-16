// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Canonical links and the RSS feed build absolute URLs from this, so a wrong
  // value ships wrong links. Update this when a custom domain is attached.
  site: 'https://alexajuno.pages.dev',

  markdown: {
    // Emit both themes as CSS variables rather than baking one in as inline
    // styles, so code blocks follow the site's dark/light toggle. global.css
    // picks which variable applies.
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      defaultColor: false
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});