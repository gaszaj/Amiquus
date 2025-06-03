// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    imageCDN: false,
  }),
  integrations: [
    tailwind(),
    (await import("@playform/compress")).default({
      // Enable all compression types
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      JSON: true,
      SVG: true,
      // Set logging level (0 = none, 1 = errors, 2 = all)
      Logger: 2,
      // Compress the default output directory
      Path: ["./dist"]
    }),
    sitemap()
  ],
  site: 'https://eusignal.netlify.app',
  image: {
    service: passthroughImageService(),
    domains: ['cdn.dorik.com'],
  },
  actions: true
});