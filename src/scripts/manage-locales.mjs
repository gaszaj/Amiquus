import { readFile, rm, cp, rename, readdir } from 'fs/promises';
import path from 'path';
import chokidar from 'chokidar';
import chalk from 'chalk';

// --- CONFIGURATION ---
const CWD = process.cwd();
const PAGES_DIR = path.join(CWD, 'src', 'pages');
const LOCALE_CONFIG_PATH = path.join(CWD, 'src', 'data', 'locale.json');
const COMMON_CONFIG_PATH = path.join(CWD, 'src', 'data', 'common.json');
const FIXED_SLUG_KEY = 'AUTHOR_LIST_SLUG';

// --- CORE LOGIC ---
// Make logger an optional parameter with a fallback to console
export async function syncLocaleDirectories(logger = console) {
    const startTime = Date.now();
    logger.info(chalk.cyan('🔄 Syncing locales...'));

    const allLocales = await readJsonFile(LOCALE_CONFIG_PATH);
    const commonData = await readJsonFile(COMMON_CONFIG_PATH);

    if (!allLocales || !commonData) {
        logger.error(chalk.red('❌ Cannot proceed without locale and common config files.'));
        return;
    }

}

// --- FILE WATCHER INITIALIZATION ---
// This function will now be called only in 'dev' mode by our integration
export function startWatcher(logger = console) {
    logger.info(chalk.blue.bold(`🚀 Watching for locale config changes...`));
    
    const watcher = chokidar.watch(LOCALE_CONFIG_PATH, { persistent: true, ignoreInitial: true });

    watcher
        .on('change', () => { 
            logger.info(chalk.magenta(`\n🔔 File changed. Re-syncing...`)); 
            syncLocaleDirectories(logger); 
        })
        .on('add', () => { 
            logger.info(chalk.magenta(`\n🔔 File (re)created. Re-syncing...`)); 
            syncLocaleDirectories(logger); 
        })
        .on('ready', () => { 
            logger.info(chalk.blue.bold('✅ Watcher is ready.')); 
        })
        .on('error', (error) => logger.error(chalk.red(`Watcher error: ${error}`)));
}