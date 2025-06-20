import { generateSearchIndexes } from '../src/scripts/generate-json-search.mjs';

export default function searchIndexGenerator() {
  return {
    name: 'astro-search-index-generator',
    hooks: {
      // This hook runs during the build, after the locale manager has done its job.
      'astro:build:start': async ({ logger }) => {
        const searchLogger = logger.fork('[Search Index Generator]');
        await generateSearchIndexes(searchLogger);
      },
    },
  };
}