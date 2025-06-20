import { syncLocaleDirectories, startWatcher } from '../src/scripts/manage-locales.mjs';

export default function manageLocales() {
  return {
    name: 'astro-locale-manager',
    hooks: {
      'astro:config:setup': async ({ command, logger }) => {
        const syncLogger = logger.fork('[Locale Manager]');
        syncLogger.info('Integration loaded. Performing initial sync...');
        
        // This hook runs once, right at the beginning.
        // It's perfect for both `dev` and `build`.
        await syncLocaleDirectories(syncLogger);

        // If we are in 'dev' mode, we set up the watcher.
        // The watcher will run alongside the dev server.
        if (command === 'dev') {
          startWatcher(syncLogger);
        }
        
        // If the command is 'build', we don't start the watcher.
        // The one-time sync is all we need.
        if (command === 'build') {
          syncLogger.info('Build command detected. Sync complete, watcher will not be started.');
        }
      },
    },
  };
}