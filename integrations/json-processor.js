import { processJsonFiles } from '../src/scripts/json-processor.mjs';

export default function jsonProcessor() {
  return {
    name: 'astro-json-processor',
    hooks: {
      // This hook runs once at the very beginning of `dev` and `build`.
      // It's the perfect place to prepare data before any other integration or
      // page rendering logic needs it.
      'astro:config:setup': async ({ logger }) => {
        const jsonLogger = logger.fork('[JSON Processor]');
        await processJsonFiles(jsonLogger);
      },
    },
  };
}