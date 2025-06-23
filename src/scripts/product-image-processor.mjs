// Path: /src/scripts/product-image-processor.mjs
// Purpose: Process unprocessed product images by resizing them to multiple sizes and renaming them based on product data
// Data: JSON dependencies from src/data/product.json
// Dependencies: sharp, fs/promises, path

import { readdir, readFile, writeFile, mkdir, rm } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import pLimit from 'p-limit';

// --- CONFIGURATION ---
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
const CONCURRENCY = 15; // Limit concurrent image processing to avoid memory issues

// --- HELPER FUNCTIONS ---

/**
 * Reads and parses the product.json file to get product mapping data
 * @returns {Array} Array of product objects
 */
const readProductData = async () => {
    const productDataPath = path.join(CWD, 'src', 'data', 'product.json');
    const productDataContent = await readFile(productDataPath, 'utf-8');
    return JSON.parse(productDataContent);
};

/**
 * Creates a mapping from numeric ID to product data for efficient lookup
 * @param {Array} products - Array of product objects
 * @returns {Object} Mapping object with numeric IDs as keys
 */
const createProductMapping = (products) => {
    const mapping = {};
    products.forEach(product => {
        // Extract numeric part from PRODUCT_ID (e.g., "p001001" -> "001001")
        const numericId = product.PRODUCT_ID.replace(/^p/, '');
        mapping[numericId] = product;
    });
    return mapping;
};

/**
 * Extracts numeric ID from image filename (e.g., "001001.webp" -> "001001")
 * @param {string} filename - The image filename
 * @returns {string} The numeric ID
 */
const extractNumericId = (filename) => {
    // Remove file extension and extract the numeric part
    const nameWithoutExt = path.parse(filename).name;
    return nameWithoutExt;
};

/**
 * Processes a single image by resizing it to all required sizes and saving with proper names
 * @param {string} imagePath - Path to the source image
 * @param {string} filename - Original filename
 * @param {Object} productMapping - Mapping of numeric IDs to product data
 * @param {Object} logger - Console logger for progress tracking
 */
const processImage = async (imagePath, filename, productMapping, logger) => {
    try {
        // Extract numeric ID from filename
        const numericId = extractNumericId(filename);
        
        // Find corresponding product data
        const product = productMapping[numericId];
        if (!product) {
            logger.warn(`⚠️  No product found for image ${filename} (ID: ${numericId})`);
            return;
        }

        // Get the proper filename from product data
        const properFilename = product.PRODUCT_IMAGE_NAME_ASCII + '.webp';
        
        // Load the image with sharp
        const image = sharp(imagePath);
        
        // Process image for each size
        const processingPromises = Object.entries(SIZES).map(async ([sizeKey, size]) => {
            const outputPath = path.join(OUTPUT_DIRS[sizeKey], properFilename);
            
            // Resize image with center fit mode (maintains aspect ratio, centers image)
            await image
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
                })
                .webp({ quality: 90 })
                .toFile(outputPath);
                
            logger.info(`✅ Processed ${filename} -> ${sizeKey} (${size}x${size})`);
        });
        
        await Promise.all(processingPromises);
        
    } catch (error) {
        logger.error(`❌ Error processing ${filename}:`, error.message);
        throw error;
    }
};

/**
 * Main function to process all unprocessed product images
 */
async function main() {
    console.log('🚀 Starting product image processing...');
    
    try {
        // 1. Read product data and create mapping (NO FILTERING - process all products)
        console.log('📖 Reading product data...');
        const products = await readProductData();
        const productMapping = createProductMapping(products);
        console.log(`📊 Found ${products.length} products in database (processing ALL products)`);
        
        // 2. Clean and recreate output directories
        console.log('🧹 Cleaning output directories...');
        for (const [sizeKey, outputDir] of Object.entries(OUTPUT_DIRS)) {
            // Remove directory if it exists
            await rm(outputDir, { recursive: true, force: true });
            // Create fresh directory
            await mkdir(outputDir, { recursive: true });
            console.log(`✅ Cleaned and recreated directory: ${outputDir}`);
        }
        
        // 3. Get list of unprocessed images
        console.log('🔍 Scanning for unprocessed images...');
        const files = await readdir(UNPROCESSED_DIR);
        const imageFiles = files.filter(file => 
            /\.(webp|jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
        );
        
        if (imageFiles.length === 0) {
            console.log('ℹ️  No image files found in unprocessed directory');
            return;
        }
        
        console.log(`🖼️  Found ${imageFiles.length} images to process`);
        
        // 4. Process images with concurrency limit
        const limit = pLimit(CONCURRENCY);
        const totalImages = imageFiles.length;
        let processedCount = 0;
        let errorCount = 0;
        
        const tasks = imageFiles.map(filename => 
            limit(async () => {
                const imagePath = path.join(UNPROCESSED_DIR, filename);
                try {
                    await processImage(imagePath, filename, productMapping, {
                        info: (msg) => console.log(`[${++processedCount}/${totalImages}] ${msg}`),
                        warn: (msg) => console.warn(`[${processedCount}/${totalImages}] ${msg}`),
                        error: (msg) => console.error(`[${processedCount}/${totalImages}] ${msg}`)
                    });
                } catch (error) {
                    errorCount++;
                    console.error(`❌ Failed to process ${filename}:`, error.message);
                }
            })
        );
        
        await Promise.allSettled(tasks);
        
        // 5. Summary
        console.log('\n✨ Product image processing complete!');
        console.log(`🟢 Successfully processed: ${processedCount - errorCount}/${totalImages}`);
        if (errorCount > 0) {
            console.error(`🔴 Errors: ${errorCount}/${totalImages}`);
            process.exitCode = 1;
        }
        
        // 6. Show output locations
        console.log('\n📂 Processed images saved to:');
        Object.entries(OUTPUT_DIRS).forEach(([sizeKey, outputDir]) => {
            console.log(`   ${sizeKey.toUpperCase()}: ${outputDir}`);
        });
        
    } catch (error) {
        console.error('❌ Critical error during processing:', error);
        process.exit(1);
    }
}

// Call main function directly
main();
