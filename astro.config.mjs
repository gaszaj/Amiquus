// astro.config.mjs

// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import manageLocales from './integrations/locale-manager.js';
import sitemapGenerator from './integrations/sitemap-generator.js';
import searchIndexGenerator from './integrations/search-index-generator.js';

const compressIntegration = (await import("@playform/compress")).default;

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    imageCDN: false,
  }),
  integrations: [
    // 1. This runs FIRST, setting up the correct src/pages/ structure.
    manageLocales(), 
    
    // 2. These run AFTER manageLocales, during the build phase.
    sitemapGenerator(),
    searchIndexGenerator(),

    // Your other integrations
    tailwind(),
    compressIntegration({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      JSON: true,
      SVG: true,
      Logger: 2,
      Path: ["./dist"]
    }),
  ],
  site: 'https://eusignal.netlify.app',
  image: {
    service: passthroughImageService(),
    domains: ['cdn.dorik.com'],
  },
  actions: true
});