import { readFile, rm, cp, rename } from 'fs/promises'; // Use native promises
import path from 'path';
import chokidar from 'chokidar';
import chalk from 'chalk';

// --- CONFIGURATION ---
const CWD = process.cwd();
const PAGES_DIR = path.join(CWD, 'src', 'pages');
const LOCALE_CONFIG_PATH = path.join(CWD, 'src', 'data', 'locale.json');
const COMMON_CONFIG_PATH = path.join(CWD, 'src', 'data', 'common.json');
const FIXED_SLUG_KEY = 'AUTHOR_LIST_SLUG';

// --- HELPER FUNCTIONS ---
async function readJsonFile(filePath) {
    try {
        const fileContent = await readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(chalk.red(`❌ Error reading or parsing ${path.basename(filePath)}:`), error);
        return null;
    }
}

function findCommonDataBySlug(slug, commonData) {
    return commonData.find(data => data.M_SLUG === slug) || null;
}

// --- CORE LOGIC ---
async function syncLocaleDirectories() {
    const startTime = Date.now();
    console.log(chalk.cyan('🔄 Syncing locales...'));

    const allLocales = await readJsonFile(LOCALE_CONFIG_PATH);
    const commonData = await readJsonFile(COMMON_CONFIG_PATH);

    if (!allLocales || !commonData) {
        console.error(chalk.red('❌ Cannot proceed without locale and common config files.'));
        return;
    }
    if (commonData.length === 0) {
        console.error(chalk.red('❌ common.json is empty. Cannot determine dynamic slug keys.'));
        return;
    }

    // Dynamic Slug Key Detection
    const firstCommonEntryKeys = Object.keys(commonData[0]);
    const dynamicCategorySlugs = firstCommonEntryKeys.filter(key =>
        key.startsWith('PAGE_CATEGORY_') && key.endsWith('_LISTING_SLUG')
    );
    const slugKeysToProcess = [FIXED_SLUG_KEY, ...dynamicCategorySlugs];
    
    let existingDirs = [];
    try {
        // Using native readdir from fs/promises
        const entries = await (await import('fs')).promises.readdir(PAGES_DIR, { withFileTypes: true });
        existingDirs = entries
            .filter(entry => entry.isDirectory() && entry.name.length === 2)
            .map(entry => entry.name);
    } catch (error) {
        console.error(chalk.red('❌ Could not read the pages directory:'), error);
        return;
    }
    
    const localesToPublish = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    const localesToUnpublish = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "0");
    
    let actionsTaken = 0;

    // Process Deletions
    for (const locale of localesToUnpublish) {
        const slug = locale.M_SLUG;
        if (existingDirs.includes(slug)) {
            const dirToDelete = path.join(PAGES_DIR, slug);
            try {
                // Use native rm for recursive delete
                await rm(dirToDelete, { recursive: true, force: true });
                console.log(chalk.yellow(`   - 🗑️  Deleted locale: ${slug}`));
                actionsTaken++;
            } catch (error) {
                console.error(chalk.red(`   - ❌ Failed to delete ${slug}:`), error);
            }
        }
    }

    // Process Creations
    const templateLocaleSlug = localesToPublish.map(l => l.M_SLUG).find(slug => existingDirs.includes(slug));

    for (const locale of localesToPublish) {
        const slug = locale.M_SLUG;
        if (!existingDirs.includes(slug)) {
            if (!templateLocaleSlug) {
                console.error(chalk.red(`   - ❌ Cannot create '${slug}', no published template locale found.`));
                continue;
            }

            console.log(chalk.green(`   - ✨ Creating locale: ${slug} (from ${templateLocaleSlug})`));
            actionsTaken++;
            const sourcePath = path.join(PAGES_DIR, templateLocaleSlug);
            const destPath = path.join(PAGES_DIR, slug);

            try {
                // Use native cp for recursive copy
                await cp(sourcePath, destPath, { recursive: true });
                await renameSubdirectories(slug, templateLocaleSlug, commonData, destPath, slugKeysToProcess);
            } catch (error) {
                console.error(chalk.red(`   - ❌ Failed to create locale ${slug}:`), error);
            }
        }
    }

    const duration = Date.now() - startTime;
    if (actionsTaken > 0) {
        console.log(chalk.cyan(`✅ Sync complete in ${duration}ms. Found ${slugKeysToProcess.length} slug keys to process.`));
    } else {
        console.log(chalk.gray(`✅ No changes needed. (${duration}ms)`));
    }
}

async function renameSubdirectories(newLocaleSlug, templateLocaleSlug, commonData, newLocalePath, slugKeysToProcess) {
    const templateCommon = findCommonDataBySlug(templateLocaleSlug, commonData);
    const newCommon = findCommonDataBySlug(newLocaleSlug, commonData);

    if (!templateCommon || !newCommon) {
        console.error(chalk.red(`   - Could not find common data for '${templateLocaleSlug}' or '${newLocaleSlug}'. Skipping rename.`));
        return;
    }
    
    const templateSlugMap = {};
    slugKeysToProcess.forEach(key => {
        if (templateCommon[key]) templateSlugMap[templateCommon[key]] = key;
    });

    // Using native readdir from fs/promises
    const subDirs = await (await import('fs')).promises.readdir(newLocalePath, { withFileTypes: true });

    for (const entry of subDirs) {
        if (entry.isDirectory()) {
            const oldDirName = entry.name;
            const genericSlugKey = templateSlugMap[oldDirName];

            if (genericSlugKey) {
                const newDirName = newCommon[genericSlugKey];
                if (newDirName && newDirName !== oldDirName) {
                    const oldPath = path.join(newLocalePath, oldDirName);
                    const newPath = path.join(newLocalePath, newDirName);
                    try {
                        // Use native rename
                        await rename(oldPath, newPath);
                    } catch (error) {
                       console.error(chalk.red(`   - Failed to rename '${oldDirName}' to '${newDirName}':`), error);
                    }
                }
            }
        }
    }
}

// --- FILE WATCHER INITIALIZATION ---
function startWatcher() {
    console.log(chalk.blue.bold(`🚀 Locale Manager started. Watching ${path.relative(CWD, LOCALE_CONFIG_PATH)}`));
    
    const watcher = chokidar.watch(LOCALE_CONFIG_PATH, { persistent: true, ignoreInitial: true });

    watcher
        .on('change', () => { console.log(chalk.magenta(`\n🔔 File changed. Re-syncing...`)); syncLocaleDirectories(); })
        .on('add', () => { console.log(chalk.magenta(`\n🔔 File (re)created. Re-syncing...`)); syncLocaleDirectories(); })
        .on('ready', () => { console.log(chalk.blue.bold('✅ Watcher is ready.')); })
        .on('error', (error) => console.error(chalk.red(`Watcher error: ${error}`)));
    
    syncLocaleDirectories();
}

startWatcher();