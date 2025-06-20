import { generateLlmsTxt } from '../src/scripts/generate-llms-txt.mjs';

export default function llmsTxtGenerator() {
  return {
    name: 'astro-llms-txt-generator',
    hooks: {
      // Run this during the build, after locales are managed.
      'astro:build:start': async ({ logger }) => {
        const llmsLogger = logger.fork('[LLMS.txt Generator]');
        await generateLlmsTxt(llmsLogger);
      },
    },
  };
}