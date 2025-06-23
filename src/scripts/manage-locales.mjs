// src/scripts/manage-locales.mjs

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

// --- HELPER FUNCTIONS ---
async function readJsonFile(filePath) {
    try {
        const fileContent = await readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        // Log this specific error directly, as the logger isn't available here
        console.error(chalk.red(`❌ Error reading or parsing ${path.basename(filePath)}:`), error);
        return null;
    }
}

function findCommonDataBySlug(slug, commonData) {
    return commonData.find(data => data.M_SLUG === slug) || null;
}

async function renameSubdirectories(newLocaleSlug, templateLocaleSlug, commonData, newLocalePath, slugKeysToProcess, logger) {
    const templateCommon = findCommonDataBySlug(templateLocaleSlug, commonData);
    const newCommon = findCommonDataBySlug(newLocaleSlug, commonData);

    if (!templateCommon || !newCommon) {
        logger.error(chalk.red(`   - Could not find common data for '${templateLocaleSlug}' or '${newLocaleSlug}'. Skipping rename.`));
        return;
    }

    const templateSlugMap = {};
    slugKeysToProcess.forEach(key => {
        if (templateCommon[key]) templateSlugMap[templateCommon[key]] = key;
    });

    const subDirs = await readdir(newLocalePath, { withFileTypes: true });

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
                        // Check if the target directory already exists
                        const targetExists = await readdir(newLocalePath, { withFileTypes: true })
                            .then(entries => entries.some(e => e.isDirectory() && e.name === newDirName))
                            .catch(() => false);
                        
                        if (targetExists) {
                            // If target exists, we need to merge the contents
                            logger.info(chalk.yellow(`   - ⚠️  Target directory '${newDirName}' already exists. Merging contents...`));
                            
                            // Copy contents from old directory to new directory
                            const oldDirPath = path.join(newLocalePath, oldDirName);
                            const newDirPath = path.join(newLocalePath, newDirName);
                            
                            // Recursively copy contents
                            await cp(oldDirPath, newDirPath, { recursive: true });
                            
                            // Remove the old directory
                            await rm(oldDirPath, { recursive: true, force: true });
                            
                            logger.info(chalk.green(`   - ✅ Merged '${oldDirName}' into '${newDirName}'`));
                        } else {
                            // Normal rename operation
                            await rename(oldPath, newPath);
                            logger.info(chalk.green(`   - ✅ Renamed '${oldDirName}' to '${newDirName}'`));
                        }
                    } catch (error) {
                        logger.error(chalk.red(`   - ❌ Failed to rename '${oldDirName}' to '${newDirName}':`), error);
                    }
                }
            }
        }
    }
}

// --- CORE LOGIC ---
export async function syncLocaleDirectories(logger = console) {
    const startTime = Date.now();
    logger.info(chalk.cyan('🔄 Syncing locales...'));

    // FIX: The `readJsonFile` function is now defined above, resolving the error.
    const allLocales = await readJsonFile(LOCALE_CONFIG_PATH);
    const commonData = await readJsonFile(COMMON_CONFIG_PATH);

    if (!allLocales || !commonData) {
        logger.error(chalk.red('❌ Cannot proceed without locale and common config files.'));
        return;
    }
    if (commonData.length === 0) {
        logger.error(chalk.red('❌ common.json is empty. Cannot determine dynamic slug keys.'));
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
        const entries = await readdir(PAGES_DIR, { withFileTypes: true });
        // Updated filter to include all locale directories (2-char and special cases like ch-fr, be-nl, etc.)
        existingDirs = entries
            .filter(entry => entry.isDirectory() && 
                   (entry.name.length === 2 || 
                    entry.name.includes('-') || 
                    entry.name.length > 2))
            .map(entry => entry.name);
    } catch (error) {
        logger.error(chalk.red('❌ Could not read the pages directory:'), error);
        return;
    }

    const localesToPublish = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    const localesToUnpublish = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "0");
    
    // Get all locale slugs from the config (both published and unpublished)
    const allLocaleSlugs = allLocales.map(l => l.M_SLUG);

    let actionsTaken = 0;

    // Process Deletions - Delete directories that should not exist
    for (const existingDir of existingDirs) {
        // Check if this directory should be deleted
        const shouldDelete = !allLocaleSlugs.includes(existingDir) || 
                           localesToUnpublish.some(l => l.M_SLUG === existingDir);
        
        if (shouldDelete) {
            const dirToDelete = path.join(PAGES_DIR, existingDir);
            try {
                await rm(dirToDelete, { recursive: true, force: true });
                logger.info(chalk.yellow(`   - 🗑️  Deleted locale: ${existingDir}`));
                actionsTaken++;
            } catch (error) {
                logger.error(chalk.red(`   - ❌ Failed to delete ${existingDir}:`), error);
            }
        }
    }

    // Find the primary template locale (first published locale that exists, or first published locale)
    let templateLocaleSlug = localesToPublish.find(l => existingDirs.includes(l.M_SLUG))?.M_SLUG;
    
    // If no existing published locale found, use the first published locale as template
    if (!templateLocaleSlug && localesToPublish.length > 0) {
        templateLocaleSlug = localesToPublish[0].M_SLUG;
        logger.info(chalk.blue(`   - 📋 Using '${templateLocaleSlug}' as template (no existing published locales found)`));
    }

    if (!templateLocaleSlug) {
        logger.error(chalk.red('❌ No published locales found to use as template.'));
        return;
    }

    // ALWAYS REFRESH ALL PUBLISHED LOCALES
    // This ensures any changes made to the template locale are propagated to all other published locales
    for (const locale of localesToPublish) {
        const slug = locale.M_SLUG;
        
        // Skip if this is the template locale itself
        if (slug === templateLocaleSlug) {
            continue;
        }

        const destPath = path.join(PAGES_DIR, slug);
        const sourcePath = path.join(PAGES_DIR, templateLocaleSlug);

        try {
            // Remove existing directory if it exists
            try {
                await rm(destPath, { recursive: true, force: true });
            } catch (error) {
                // Directory might not exist, which is fine
            }

            // Copy fresh template to this locale
            await cp(sourcePath, destPath, { recursive: true });
            logger.info(chalk.green(`   - 🔄 Refreshed locale: ${slug} (from ${templateLocaleSlug})`));
            actionsTaken++;

            // Rename subdirectories according to locale-specific slugs
            await renameSubdirectories(slug, templateLocaleSlug, commonData, destPath, slugKeysToProcess, logger);
        } catch (error) {
            logger.error(chalk.red(`   - ❌ Failed to refresh locale ${slug}:`), error);
        }
    }

    // Process Creations for any new locales that don't exist yet
    for (const locale of localesToPublish) {
        const slug = locale.M_SLUG;
        if (!existingDirs.includes(slug)) {
            logger.info(chalk.green(`   - ✨ Creating new locale: ${slug} (from ${templateLocaleSlug})`));
            actionsTaken++;
            const sourcePath = path.join(PAGES_DIR, templateLocaleSlug);
            const destPath = path.join(PAGES_DIR, slug);

            try {
                await cp(sourcePath, destPath, { recursive: true });
                // Pass the logger to the subdirectory function
                await renameSubdirectories(slug, templateLocaleSlug, commonData, destPath, slugKeysToProcess, logger);
            } catch (error) {
                logger.error(chalk.red(`   - ❌ Failed to create locale ${slug}:`), error);
            }
        }
    }

    const duration = Date.now() - startTime;
    if (actionsTaken > 0) {
        logger.info(chalk.cyan(`✅ Sync complete in ${duration}ms. Found ${slugKeysToProcess.length} slug keys to process.`));
        logger.info(chalk.blue(`📝 All published locales have been refreshed from template '${templateLocaleSlug}'`));
    } else {
        logger.info(chalk.gray(`✅ No changes needed. (${duration}ms)`));
    }
}

// --- FILE WATCHER INITIALIZATION ---
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
