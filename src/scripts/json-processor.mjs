import { readdir, readFile, writeFile, mkdir, rm } from 'fs/promises';
import path from 'path';

// --- Configuration ---
const SRC_DIR = path.join(process.cwd(), 'src/json');
const DEST_DIR = path.join(process.cwd(), 'src/data');
const LOCALE_FILE = 'locale.json';

// List of files to minify without any content filtering.
const FILES_TO_MINIFY_ONLY = new Set(['www.json', 'site.webmanifest.json']);

// List of files that have a `PUBLISH_Y_N` key and should be filtered by it.
const FILES_WITH_PUBLISH_FLAG = new Set(['article.json', 'author.json', 'eeat.json', 'product.json']);


// --- Helper Functions ---

/**
 * Normalizes a locale code to a consistent format (e.g., "language-country")
 * by splitting, sorting, and rejoining. This makes "sl-SI" and "SI-sl" identical.
 * @param {string} code - The locale code to normalize.
 * @returns {string} The normalized locale code.
 */
const normalizeLocaleCode = (code) => {
  if (!code || !code.includes('-')) return code;
  return code.split('-').map(part => part.toLowerCase()).sort().join('-');
};

/**
 * NEW: Creates a new object, omitting any keys that are empty strings.
 * This cleans up data entry errors like `"": ""`.
 * @param {object} obj The object to clean.
 * @returns {object} The cleaned object.
 */
const removeEmptyKeys = (obj) => {
  // Return non-objects or arrays as-is
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  const newObj = {};
  for (const key in obj) {
    // Only include the key if it's not an empty string
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "") {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};


/**
 * Reads, cleans, and minifies JSON files from a source directory to a destination directory.
 * @param {import('astro').AstroLogger} logger - The Astro logger instance.
 */
export async function processJsonFiles(logger) {
  logger.info('🚀 Starting JSON processing...');

  try {
    // 1. Delete destination directory to ensure a clean start
    logger.info(`Cleaning destination directory: ${DEST_DIR}`);
    await rm(DEST_DIR, { recursive: true, force: true });
    await mkdir(DEST_DIR, { recursive: true });

    // 2. Determine published locales
    const localeSourcePath = path.join(SRC_DIR, LOCALE_FILE);
    const localeFileContent = await readFile(localeSourcePath, 'utf-8');
    const allLocales = JSON.parse(localeFileContent);

    const publishedLocales = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    const publishedLocaleCodes = new Set(
      publishedLocales.map(l => normalizeLocaleCode(l.M_HREFLANG_CODE))
    );
    
    logger.info(`Found ${publishedLocaleCodes.size} published locales.`);

    // 3. Get all JSON files from the source directory
    const files = await readdir(SRC_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    // 4. Process each JSON file
    for (const fileName of jsonFiles) {
      const sourcePath = path.join(SRC_DIR, fileName);
      const destPath = path.join(DEST_DIR, fileName);

      const fileContent = await readFile(sourcePath, 'utf-8');
      let data = JSON.parse(fileContent);
      const originalCount = Array.isArray(data) ? data.length : 1;

      // --- Step 1: Apply Filtering Logic ---
      if (fileName === LOCALE_FILE) {
        data = publishedLocales;
      } 
      else if (FILES_TO_MINIFY_ONLY.has(fileName)) {
        // No filtering needed.
      }
      else if (Array.isArray(data)) {
        data = data.filter(obj => {
          if (obj.PAGE_LOCALE && !publishedLocaleCodes.has(normalizeLocaleCode(obj.PAGE_LOCALE))) {
            return false;
          }
          if (FILES_WITH_PUBLISH_FLAG.has(fileName)) {
            if (fileName === 'eeat.json' && obj.EEAT_FILTERING === "01") {
              return true;
            }
            if (obj.PUBLISH_Y_N !== undefined && obj.PUBLISH_Y_N !== "1") {
              return false;
            }
          }
          return true;
        });
      }
      
      // --- Step 2: NEW - Clean Empty Keys from the data ---
      if (Array.isArray(data)) {
        // If it's an array of objects, clean each one
        data = data.map(removeEmptyKeys);
      } else {
        // If it's a single object (like site.webmanifest), clean it
        data = removeEmptyKeys(data);
      }

      // --- Step 3: Write Minified File ---
      const processedCount = Array.isArray(data) ? data.length : 1;
      await writeFile(destPath, JSON.stringify(data));

      if (originalCount !== processedCount) {
        logger.info(`✅ Processed ${fileName}: ${processedCount} of ${originalCount} objects kept.`);
      } else {
        logger.info(`✅ Processed ${fileName} (minified).`);
      }
    }

    logger.info('✨ JSON processing complete! All files are cleaned and minified in src/data/.');

  } catch (error) {
    logger.error('❌ Error during JSON processing:', error);
    process.exit(1);
  }
}