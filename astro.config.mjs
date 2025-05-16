// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    (await import("@playform/compress")).default({
      // Enable all compression types
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      JSON: true,
      SVG: true,
      // Set logging level (0 = none, 1 = errors, 2 = all)
      Logger: 2,
      // Compress the default output directory
      Path: ["./dist"]
    })
  ],
  site: 'https://eusignal.com',
  image: {
    service: passthroughImageService(),
  },
});