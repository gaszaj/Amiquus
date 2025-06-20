// integrations/sitemap-generator.js
import { generateSitemaps } from '../src/scripts/generate-sitemaps.mjs';

export default function sitemapGenerator() {
  return {
    name: 'astro-sitemap-generator',
    hooks: {
      // This hook runs just before the build starts, after config is set up.
      // It's perfect for generating files that need to be part of the final build output.
      'astro:build:start': async ({ logger }) => {
        // We only want this to run during a `build`, not `dev`.
        // The `astro:build:start` hook ensures this automatically.
        const sitemapLogger = logger.fork('[Sitemap Generator]');
        await generateSitemaps(sitemapLogger);
      },
    },
  };
}