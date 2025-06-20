// integrations/search-index-generator.js
import { generateSearchIndexes } from '../src/scripts/generate-json-search.mjs';

export default function searchIndexGenerator() {
  return {
    name: 'astro-search-index-generator',
    hooks: {
      // Use the same hook as the sitemap generator to ensure it runs during the build
      'astro:build:start': async ({ logger }) => {
        const searchLogger = logger.fork('[Search Index Generator]');
        await generateSearchIndexes(searchLogger);
      },
    },
  };
}