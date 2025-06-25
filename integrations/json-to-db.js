import { createDatabaseFromJson } from '../src/scripts/json-to-db.mjs';

/**
 * An Astro integration that generates a SQLite database from JSON files.
 * This should be placed *after* the `jsonProcessor` integration in your config.
 */
export default function jsonToDb() {
  return {
    name: 'astro-json-to-db',
    hooks: {
      // This hook runs once at the beginning of `dev` and `build`,
      // after the config is resolved.
      'astro:config:setup': async ({ logger }) => {
        const dbLogger = logger.fork('[DB Generator]');
        await createDatabaseFromJson(dbLogger);
      },
    },
  };
}