// /src/scripts/OG_product.mjs (Optimized Version)
// Generates Open Graph images for all published product pages.

import { readFileSync, existsSync } from 'fs';
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import pLimit from 'p-limit';
import { AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA } from 'country-flag-icons/string/3x2';

// --- CONFIGURATION ---
const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'ogimages', 'ogproduct');
const CONCURRENCY = 10;
const flagMap = { AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA };

// --- HELPERS ---
const readJsonFile = (fp) => JSON.parse(readFileSync(path.join(CWD, fp), 'utf-8'));
const readImageAsBase64 = (fp) => readFileSync(path.join(CWD, fp), 'base64');

// --- HTML TEMPLATE ---
const generateProductHtmlTemplate = (data) => `
<!DOCTYPE html>
<html lang="${data.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product OG Image</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { width: 1200px; height: 630px; margin: 0; font-family: 'Inter', system-ui, sans-serif; background-color: ${data.branding.PAGE_BODY_BACKGROUND_COLOR}; color: ${data.branding.PAGE_BODY_TEXT_COLOR}; display: flex; position: relative; overflow: hidden; }
        .left-section { width: 50%; padding: 2rem 2.5rem; display: flex; flex-direction: column; height: 100%; container-type: inline-size; z-index: 1; }
        .logo { width: 200px; height: auto; flex-shrink: 0; margin-bottom: 1.5rem; }
        .product-title { margin-bottom: 1.5rem; flex-shrink: 0; }
        .category { font-size: clamp(2.5rem, 4cqi, 3rem); font-weight: 600; color: ${data.branding.PAGE_SUBTITLE_TEXT_COLOR}; margin-bottom: 0.5rem; opacity: 0.8; }
        .product-name { font-size: clamp(3rem, 4.5cqi, 4rem); font-weight: 700; line-height: 1.2; color: ${data.branding.PAGE_SUBTITLE_TEXT_COLOR}; margin-bottom: 1.5rem; max-width: 90%; }
        .product-info { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-shrink: 0; }
        .price { font-size: clamp(1.8rem, 4.5cqi, 2.5rem); font-weight: 700; color: #22c55e; background-color: rgba(34, 197, 94, 0.1); padding: 0.5rem 1rem; border-radius: 8px; }
        .rating { display: flex; align-items: center; gap: 0.5rem; font-size: clamp(2.5rem, 3cqi, 2rem); color: #f59e0b; }
        .star-icon { width: clamp(2.2rem, 3cqi, 1.8rem); height: clamp(2.2rem, 3cqi, 1.8rem); fill: currentColor; }
        .features { list-style: none; display: flex; flex-direction: column; gap: 0.8rem; width: 100%; flex-shrink: 0; margin-top: auto; margin-bottom: 80px; }
        .feature { display: flex; align-items: center; gap: 0.75rem; height: 100%; width: 100%; container-type: inline-size; }
        .feature-text { font-size: clamp(1.8rem, 3.5cqi, 2rem); color: ${data.branding.PAGE_FEATURE_TEXT_COLOR}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: calc(100% - 2rem); padding-right: 0.3rem; }
        .feature-icon { width: clamp(1.2rem, 4cqi, 2rem); height: clamp(1.2rem, 4cqi, 2rem); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35px' height='35px' viewBox='0 0 56 56'%3E%3Cpath fill='${encodeURIComponent(data.branding.PAGE_CHECKMARK_ICON_COLOR)}' d='M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922c11.039 0 19.921 8.883 19.945 19.922c.023 11.063-8.883 19.922-19.922 19.922m-2.953-8.203c.773 0 1.406-.375 1.898-1.102l11.578-18.21c.282-.47.563-1.009.563-1.524c0-1.078-.938-1.735-1.922-1.735c-.633 0-1.219.352-1.64 1.055L24.93 35.148l-5.438-7.03c-.515-.704-1.078-.962-1.71-.962c-1.032 0-1.852.844-1.852 1.899c0 .515.21 1.008.539 1.453l6.562 8.11c.633.773 1.242 1.1 2.016 1.1'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-size: contain; flex-shrink: 0; }
        .right-section { position: absolute; top: 0; right: -5%; width: 55%; height: 100%; clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%); background-color: ${data.branding.PAGE_RIGHT_SECTION_BACKGROUND_COLOR}; display: flex; justify-content: center; align-items: center; overflow: hidden; }
        .product-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .product-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; color: ${data.branding.PAGE_BODY_TEXT_COLOR}; opacity: 0.6; text-align: center; padding: 2rem; }
        .placeholder-text { font-size: 2.5rem; font-weight: 600; text-align: center; padding: 2rem; word-wrap: break-word; max-width: 80%; line-height: 1.3; }
        .footer { position: absolute; bottom: 0; left: 0; right: 0; height: 70px; background-color: ${data.branding.PAGE_FOOTER_BACKGROUND_COLOR}; padding: 0 1rem; display: flex; justify-content: center; align-items: center; gap: 2rem; }
        .footer-item { display: flex; align-items: center; gap: 0.75rem; font-weight: 700; white-space: nowrap; color: ${data.branding.PAGE_FOOTER_TEXT_COLOR}; }
        .footer-icon { width: 4.25rem; height: 4.25rem; fill: currentColor; flex-shrink: 0; }
        .footer-text { font-size: clamp(1.45rem, 4cqi, 2.8rem); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 1rem); }
        .flag-container { position: absolute; top: 1rem; right: 1rem; background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 8rem; height: 5.5rem; display: flex; align-items: center; justify-content: center; }
        .flag-container img { width: 100%; height: 100%; object-fit: contain; }
    </style>
</head>
<body>
    <div class="flag-container"><img src="data:image/svg+xml;utf8,${encodeURIComponent(data.flagSvg)}" alt="Country flag"></div>
    <div class="left-section">
        <img src="data:image/png;base64,${data.logoBase64}" alt="Logo" class="logo">
        <div class="product-title">
            <div class="category">${data.category}</div>
            <div class="product-name">${data.productName}</div>
        </div>
        <div class="product-info">
            <div class="price">${data.price}</div>
            ${data.showRating ? `<div class="rating"><svg class="star-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span>${data.rating} (${data.reviewCount})</span></div>` : ''}
        </div>
        <ul class="features">
            <li class="feature"><span class="feature-icon"></span><div class="feature-text">${data.feature1}</div></li>
            <li class="feature"><span class="feature-icon"></span><div class="feature-text">${data.feature2}</div></li>
            <li class="feature"><span class="feature-icon"></span><div class="feature-text">${data.feature3}</div></li>
        </ul>
    </div>
    <div class="right-section">
        ${data.hasProductImage ? `<img src="data:image/webp;base64,${data.productImageBase64}" alt="Product Image" class="product-image">` : `<div class="product-placeholder"><div class="placeholder-text">${data.category}<br>${data.productName}</div></div>`}
    </div>
    <footer class="footer">
        <div class="footer-item"><svg class="footer-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg><span class="footer-text">${data.branding.PAGE_ORGANISATION_URL_NAME}</span></div>
        <div class="footer-item"><svg class="footer-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span class="footer-text">${data.branding.PAGE_INFO_EMAIL}</span></div>
    </footer>
</body>
</html>`;

// --- IMAGE GENERATION ---
async function generateImageForProduct(product, commonAssets, context) {
    const imageName = `${product.PRODUCT_IMAGE_NAME_ASCII}`.replace(/\.webp$/i, '') + '.webp';
    const { brandingData, logoBase64 } = commonAssets;

    const rawProductPath = product.PRODUCT_IMAGE_PATH_L;
    const cleanProductPath = rawProductPath.startsWith('/') ? rawProductPath.substring(1) : rawProductPath;
    const absoluteProductImagePath = path.join(PUBLIC_DIR, cleanProductPath);
    const hasProductImage = existsSync(absoluteProductImagePath);
    
    const dataForTemplate = {
        branding: brandingData,
        logoBase64,
        lang: product.M_LANGUAGE_ISO,
        category: product.PRODUCT_CATEGORY_1,
        productName: product.PRODUCT_NAME,
        price: product.M_PRODUCT_PRICE,
        rating: product.PRODUCT_RATING_VALUE,
        reviewCount: product.PRODUCT_REVIEW_COUNT,
        showRating: product.PRODUCT_RATING_VALUE && product.PRODUCT_REVIEW_COUNT && parseFloat(product.PRODUCT_RATING_VALUE) > 0 && parseInt(product.PRODUCT_REVIEW_COUNT) > 0,
        feature1: product.PRODUCT_USE_CASE_1 || product.PRODUCT_KEYWORD_1,
        feature2: product.PRODUCT_USE_CASE_2 || product.PRODUCT_KEYWORD_2,
        feature3: product.PRODUCT_USE_CASE_3 || product.PRODUCT_KEYWORD_3,
        flagSvg: flagMap[product.M_COUNTRY_CODE] || '',
        hasProductImage,
        productImageBase64: hasProductImage ? readFileSync(absoluteProductImagePath, 'base64') : '',
    };

    const htmlContent = generateProductHtmlTemplate(dataForTemplate);
    const page = await context.newPage();
    try {
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.setContent(htmlContent, { waitUntil: 'load' });
        const pngBuffer = await page.screenshot({ type: 'png' });
        await sharp(pngBuffer).webp({ quality: 85 }).toFile(path.join(OUTPUT_DIR, imageName));
    } finally {
        await page.close();
    }
}

// --- MAIN EXECUTION ---
async function main() {
    console.log('🚀 Starting Product page OG image generation...');
    let browser;
    try {
        console.log(`🧹 Clearing destination directory: ${OUTPUT_DIR}`);
        await rm(OUTPUT_DIR, { recursive: true, force: true });
        await mkdir(OUTPUT_DIR, { recursive: true });

        const allPublishedProducts = readJsonFile('src/data/product.json').filter(p => p.PUBLISH_Y_N === "1");
        if (allPublishedProducts.length === 0) {
            console.log("\nNo published products found. Exiting.");
            return;
        }

        const missingImagePaths = new Set();
        allPublishedProducts.forEach(p => {
            const cleanPath = p.PRODUCT_IMAGE_PATH_L.startsWith('/') ? p.PRODUCT_IMAGE_PATH_L.substring(1) : p.PRODUCT_IMAGE_PATH_L;
            if (!existsSync(path.join(PUBLIC_DIR, cleanPath))) {
                missingImagePaths.add(cleanPath);
            }
        });

        if (missingImagePaths.size > 0) {
            console.warn(`\n🟡 WARNING: ${missingImagePaths.size} product images missing. Placeholders will be used.`);
            missingImagePaths.forEach(p => console.warn(`  - public\\${p.replace(/\//g, '\\')}`));
        }

        const brandingData = readJsonFile('src/data/www.json')[0];
        const logoPath = brandingData?.PAGE_LOGO_IMAGE_PATH_5;
        if (!logoPath) throw new Error('PAGE_LOGO_IMAGE_PATH_5 not found in www.json.');
        
        const commonAssets = { brandingData, logoBase64: readImageAsBase64(logoPath) };

        browser = await chromium.launch();
        const context = await browser.newContext();
        const limit = pLimit(CONCURRENCY);
        
        const tasks = allPublishedProducts.map(p => limit(() => generateImageForProduct(p, commonAssets, context)));
        const results = await Promise.allSettled(tasks);

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        console.log('\n✨ Product OG image generation complete!');
        console.log(`🟢 Success: ${successful}/${allPublishedProducts.length}`);
        if (missingImagePaths.size > 0) console.log(`🟡 Products without images: ${missingImagePaths.size}`);
        if (failed > 0) {
            console.error(`🔴 Failed during processing: ${failed}`);
            results.filter(r => r.status === 'rejected').forEach((f, i) => console.error(`  - Failure ${i + 1}:`, f.reason.message));
            process.exitCode = 1;
        }
    } catch (error) {
        console.error('❌ A critical error occurred:', error);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
}

main();