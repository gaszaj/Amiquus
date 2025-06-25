// Path: /src/scripts/product-image-processor.mjs
// Purpose: Process unprocessed product images by resizing them to multiple sizes and renaming them based on product data.
//          Refactored for condensed logging with a progress bar and summary.

import { readdir, readFile, mkdir, rm } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import pLimit from 'p-limit';

// --- CONFIGURATION (Unchanged) ---
const CWD = process.cwd();
const UNPROCESSED_DIR = path.join(CWD, 'public', 'productimg', 'unprocessed');
const OUTPUT_DIRS = {
    l: path.join(CWD, 'public', 'productimg', 'l'),
    m: path.join(CWD, 'public', 'productimg', 'm'),
    s: path.join(CWD, 'public', 'productimg', 's'),
    xs: path.join(CWD, 'public', 'productimg', 'xs')
};
const SIZES = {
    l: 350,
    m: 225,
    s: 150,
    xs: 75
};
const CONCURRENCY = 15;

// --- HELPER FUNCTIONS ---

const readProductData = async () => {
    const productDataPath = path.join(CWD, 'src', 'data', 'product.json');
    const productDataContent = await readFile(productDataPath, 'utf-8');
    return JSON.parse(productDataContent);
};

const createProductMapping = (products) => {
    const mapping = {};
    products.forEach(product => {
        const numericId = product.PRODUCT_ID.replace(/^p/, '');
        mapping[numericId] = product;
    });
    return mapping;
};

const extractNumericId = (filename) => {
    return path.parse(filename).name;
};

/**
 * Renders a single-line progress bar in the console.
 * @param {number} current - The current number of items processed.
 * @param {number} total - The total number of items.
 */
const updateProgressBar = (current, total) => {
    const percentage = Math.floor((current / total) * 100);
    const barLength = 30;
    const filledLength = Math.round((barLength * current) / total);
    const bar = '█'.repeat(filledLength) + '-'.repeat(barLength - filledLength);
    process.stdout.write(`  Processing Images: [${bar}] ${percentage}% (${current}/${total})\r`);
};

/**
 * Processes a single image without logging. Throws an error on failure.
 * @param {string} imagePath - Path to the source image
 * @param {Object} product - The corresponding product data object.
 * @returns {Promise<void>}
 */
const processImage = async (imagePath, product) => {
    const properFilename = product.PRODUCT_IMAGE_NAME_ASCII + '.webp';
    const image = sharp(imagePath);

    const processingPromises = Object.entries(SIZES).map(async ([sizeKey, size]) => {
        const outputPath = path.join(OUTPUT_DIRS[sizeKey], properFilename);
        await image
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .webp({ quality: 90 })
            .toFile(outputPath);
    });

    await Promise.all(processingPromises);
};

/**
 * Main exported function to be called by the Astro integration.
 * @param {Object} logger - The Astro logger instance.
 */
export async function processProductImages(logger) {
    logger.info('🚀 Starting product image processing...');
    const startTime = Date.now();

    try {
        // 1. Read product data
        const products = await readProductData();
        const productMapping = createProductMapping(products);
        logger.info(`📖 Found ${products.length} products in database.`);

        // 2. Clean output directories
        await Promise.all(Object.values(OUTPUT_DIRS).map(async (dir) => {
            await rm(dir, { recursive: true, force: true });
            await mkdir(dir, { recursive: true });
        }));

        // 3. Get list of unprocessed images
        let imageFiles;
        try {
            const files = await readdir(UNPROCESSED_DIR);
            imageFiles = files.filter(file =>
                /\.(webp|jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
            );
        } catch (error) {
            if (error.code === 'ENOENT') {
                logger.warn(`ℹ️ Unprocessed directory not found. Skipping processing.`);
                return;
            }
            throw error;
        }

        if (imageFiles.length === 0) {
            logger.info('✅ No new images found. Nothing to do.');
            return;
        }
        logger.info(`🖼️ Found ${imageFiles.length} images to process.`);

        // 4. Process images with concurrency limit and progress tracking
        const limit = pLimit(CONCURRENCY);
        const totalImages = imageFiles.length;
        let processedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;
        const skippedFiles = [];
        const errorFiles = [];
        
        // Start progress bar
        updateProgressBar(0, totalImages);

        const tasks = imageFiles.map((filename) =>
            limit(async () => {
                const numericId = extractNumericId(filename);
                const product = productMapping[numericId];

                if (!product) {
                    skippedCount++;
                    skippedFiles.push(filename);
                } else {
                    const imagePath = path.join(UNPROCESSED_DIR, filename);
                    try {
                        await processImage(imagePath, product);
                        processedCount++;
                    } catch (error) {
                        errorCount++;
                        errorFiles.push({ file: filename, reason: error.message });
                    }
                }
                // Update progress bar after each attempt
                updateProgressBar(processedCount + skippedCount + errorCount, totalImages);
            })
        );

        await Promise.all(tasks);

        // Clear the progress bar line and move to the next line
        process.stdout.write(' '.repeat(80) + '\r'); 

        // 5. Final, intelligent summary
        const duration = (Date.now() - startTime) / 1000;
        logger.info(`✨ Processing complete in ${duration.toFixed(2)}s.`);
        
        let summary = `  Summary: 🟢 ${processedCount} processed`;
        if (skippedCount > 0) summary += `, 🟡 ${skippedCount} skipped`;
        if (errorCount > 0) summary += `, 🔴 ${errorCount} failed`;
        logger.info(summary);

        if (skippedCount > 0) {
            logger.warn(`  Skipped files (no product data): ${skippedFiles.slice(0, 5).join(', ')}${skippedCount > 5 ? ` and ${skippedCount - 5} more...` : ''}`);
        }
        if (errorCount > 0) {
            logger.error('  Failed files:');
            errorFiles.slice(0, 5).forEach(e => logger.error(`    - ${e.file}: ${e.reason}`));
            if (errorCount > 5) logger.error(`    ... and ${errorCount - 5} more errors.`);
            throw new Error(`${errorCount} image(s) failed to process. Check logs for details.`);
        }

    } catch (error) {
        logger.error('❌ Critical error during image processing. Halting operation.');
        throw error;
    }
}