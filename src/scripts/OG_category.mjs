// Path: /src/scripts/OG_category.mjs
// Purpose: Generate Open Graph images for category listing pages
// Data: JSON dependencies (common.json, locale.json, www.json)
// Dependencies: Playwright, Sharp, p-limit, country-flag-icons

import { readFileSync } from 'fs';
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import pLimit from 'p-limit';

// --- CONFIGURATION ---
const CWD = process.cwd();
const OUTPUT_DIR = path.join(CWD, 'public', 'ogimages', 'ogcategory');
const CONCURRENCY = 10;

// --- FONT CONFIGURATION ---
// Maps language ISO codes to their specific Google Font URL and font-family stack.
const FONT_MAP = {
    ar: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap', family: "'Noto Sans Arabic', 'Tahoma', sans-serif" },
    he: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap', family: "'Noto Sans Hebrew', 'Arial Hebrew', sans-serif" },
    hi: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap', family: "'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif" },
    ja: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap', family: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif" },
    ko: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap', family: "'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" },
    ru: { url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', family: "'Roboto', 'Arial', sans-serif" },
    be: { url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', family: "'Roboto', 'Arial', sans-serif" },
    bg: { url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', family: "'Roboto', 'Arial', sans-serif" },
    el: { url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', family: "'Roboto', 'Arial', sans-serif" },
    th: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap', family: "'Noto Sans Thai', 'Thonburi', 'Tahoma', sans-serif" },
    bn: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap', family: "'Noto Sans Bengali', 'Arial Unicode MS', sans-serif" },
    hy: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400;700&display=swap', family: "'Noto Sans Armenian', 'Arial Unicode MS', sans-serif" },
    ka: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;700&display=swap', family: "'Noto Sans Georgian', 'Arial Unicode MS', sans-serif" },
    my: { url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;700&display=swap', family: "'Noto Sans Myanmar', 'Arial Unicode MS', sans-serif" },
    // Default font for Latin scripts and others not specified
    default: { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap', family: "'Inter', system-ui, sans-serif" }
};

// --- ASSETS ---
// Import country flag icons for visual localization
import { 
  AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, 
  CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, 
  ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, 
  HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, 
  LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, 
  OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, 
  SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA 
} from 'country-flag-icons/string/3x2';

// Create flag mapping object for easy lookup
const flagMap = { AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA };

// --- HELPERS ---
const readJsonFile = (filePath) => JSON.parse(readFileSync(path.join(CWD, filePath), 'utf-8'));
const readImageAsBase64 = (filePath) => readFileSync(path.join(CWD, filePath), 'base64');

// --- HTML TEMPLATE ---
const generateCategoryHtmlTemplate = (data) => `
<!DOCTYPE html>
<html lang="${data.lang}" dir="${data.orientation}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category OG Image</title>
    <style>
        @import url('${data.fontUrl}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            width: 1200px; height: 630px; margin: 0; 
            font-family: ${data.fontFamily}; 
            background-color: ${data.bodyBgColor}; 
            color: ${data.bodyTextColor}; 
            display: flex; 
            flex-direction: column;
            position: relative; 
            overflow: hidden; 
            padding: 3rem;
            justify-content: flex-start;
            gap: 1rem;
        }
        .header { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; }
        .logo { width: 300px; height: auto; }
        .content { padding: 0 0.5rem; max-width: 100%; }
        .title { 
            font-size: clamp(3.22rem, 5.46cqi, 4.31rem);
            font-weight: 700; 
            line-height: 1.1; 
            color: ${data.bodyTextColor};
            display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; 
            overflow: hidden; text-overflow: ellipsis; 
            margin-bottom: 0.75rem;
        }
        .title span {
            background-color: ${data.footerTextColor};
            padding: 0.1em 0.4em;
            -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
            line-height: 1.5;
        }
        .subtitle {
            font-size: clamp(2.07rem, 4.31cqi, 2.53rem);
            font-weight: 400; line-height: 1.4; color: ${data.subtitleTextColor}; opacity: 0.9;
            display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; 
            overflow: hidden; text-overflow: ellipsis; 
        }
        .footer { 
            position: absolute; bottom: 0; left: 0; right: 0; height: 70px; 
            background-color: ${data.footerBgColor}; padding: 0 1rem; 
            display: flex; justify-content: center; align-items: center; gap: 2rem; 
        }
        .footer-item { display: flex; align-items: center; gap: 0.75rem; font-weight: 700; white-space: nowrap; color: ${data.footerTextColor}; }
        .footer-icon { width: 4.25rem; height: 4.25rem; fill: currentColor; flex-shrink: 0; }
        .footer-text { font-size: clamp(1.67rem, 4.6cqi, 3.22rem); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 1rem); }
        .flag-container { background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 8rem; height: 5.5rem; display: flex; align-items: center; justify-content: center; }
        .flag-container img { width: 100%; height: 100%; object-fit: contain; }
    </style>
</head>
<body>
    <header class="header">
        <img src="data:image/png;base64,${data.logoBase64}" alt="Logo" class="logo">
        <div class="flag-container">
            <img src="data:image/svg+xml;utf8,${encodeURIComponent(data.flagSvg)}" alt="Country flag">
        </div>
    </header>
    <main class="content">
        <h1 class="title"><span>${data.title}</span></h1>
        <p class="subtitle">${data.subtitle}</p>
    </main>
    <footer class="footer">
        <div class="footer-item">
            <svg class="footer-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span class="footer-text">${data.domain}</span>
        </div>
        <div class="footer-item">
            <svg class="footer-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span class="footer-text">${data.email}</span>
        </div>
    </footer>
</body>
</html>`;

// --- CATEGORY DETECTION (No changes needed, logic is specific and correct) ---
function detectCategories(commonData) {
    const categories = new Set();
    commonData.forEach(locale => {
        Object.keys(locale).forEach(key => {
            const match = key.match(/^PAGE_CATEGORY_(\d+)_LISTING_TITLE$/);
            if (match) {
                categories.add(parseInt(match[1], 10));
            }
        });
    });
    return Array.from(categories).sort((a, b) => a - b);
}

// --- IMAGE GENERATION ---
async function generateImageForCategory(locale, categoryNumber, commonAssets, context) {
    const { brandingData, logoBase64 } = commonAssets;
    
    // Determine font and orientation based on locale
    const langIso = locale.M_LANGUAGE_ISO || 'en'; // Fallback for safety
    const fontDetails = FONT_MAP[langIso] || FONT_MAP.default;
    const orientation = locale.M_CONTENT_ORIENTATION || 'ltr';
    
    // Get category-specific text from the locale data
    const title = locale[`PAGE_CATEGORY_${categoryNumber}_LISTING_TITLE`] || `Category ${categoryNumber}`;
    const description = locale[`PAGE_CATEGORY_${categoryNumber}_LISTING_DESCRIPTION`] || `Browse all items in category ${categoryNumber}`;
    const imagePath = locale[`PAGE_CATEGORY_${categoryNumber}_LISTING_OG_IMAGE_PATH`];
    
    // Determine output filename
    const imageName = imagePath 
        ? `${path.basename(imagePath, path.extname(imagePath))}.webp`
        : `category-${categoryNumber}-${locale.M_LANGUAGE_ISO}-${locale.M_COUNTRY_CODE}.webp`;

    // Data for the HTML template, now using correct branding info
    const templateData = {
        lang: langIso,
        orientation: orientation,
        fontUrl: fontDetails.url,
        fontFamily: fontDetails.family,
        title: title,
        subtitle: description,
        domain: brandingData.PAGE_ORGANISATION_URL_NAME,
        email: brandingData.PAGE_INFO_EMAIL,
        flagSvg: flagMap[locale.M_COUNTRY_CODE] || '',
        logoBase64,
        bodyBgColor: brandingData.PAGE_COLOR_BACKGROUND,
        bodyTextColor: brandingData.PAGE_COLOR_PRIMARY,
        subtitleTextColor: brandingData.PAGE_COLOR_PRIMARY,
        footerBgColor: brandingData.PAGE_COLOR_PRIMARY,
        footerTextColor: brandingData.PAGE_COLOR_ACCENT,
    };

    const htmlContent = generateCategoryHtmlTemplate(templateData);
    const page = await context.newPage();
    
    try {
        await page.setViewportSize({ width: 1200, height: 630 });
        // Use 'networkidle' to ensure web fonts from Google are loaded before screenshotting
        await page.setContent(htmlContent, { waitUntil: 'networkidle' });
        const pngBuffer = await page.screenshot({ type: 'png' });
        const outputPath = path.join(OUTPUT_DIR, imageName);
        await sharp(pngBuffer).webp({ quality: 1 }).toFile(outputPath);
    } finally {
        await page.close();
    }
}

// --- MAIN EXECUTION (Corrected to use www.json for branding) ---
async function main() {
    console.log('🚀 Starting Category OG image generation...');
    let browser;
    try {
        await rm(OUTPUT_DIR, { recursive: true, force: true });
        await mkdir(OUTPUT_DIR, { recursive: true });
        console.log(`✅ Cleaned output directory: ${OUTPUT_DIR}`);

        // Load all required data
        const commonData = readJsonFile('src/data/common.json');
        const localeData = readJsonFile('src/data/locale.json');
        // FIX: Load site-wide branding data from www.json, not common.json
        const brandingData = readJsonFile('src/data/www.json')[0];
        
        const publishedLocales = localeData.filter(locale => locale.M_LOCALE_PUBLISH_Y_N === "1");
        if (publishedLocales.length === 0) {
            console.log("🟡 No published locales found. Exiting.");
            return;
        }
        
        const categories = detectCategories(commonData);
        console.log(`📊 Detected ${categories.length} categories: ${categories.join(', ')}`);
        if (categories.length === 0) {
            console.log("🟡 No categories found in common.json. Exiting.");
            return;
        }
        
        // FIX: Get logo path from the correct branding data object
        const logoPath = brandingData.PAGE_LOGO_IMAGE_PATH_5;
        if (!logoPath) {
            throw new Error('Branding data or PAGE_LOGO_IMAGE_PATH_5 not found in www.json.');
        }

        // Prepare common assets using the correct branding information
        const commonAssets = { brandingData, logoBase64: readImageAsBase64(logoPath) };
        
        browser = await chromium.launch();
        const context = await browser.newContext();

        const limit = pLimit(CONCURRENCY);
        const tasks = [];
        
        // Generate tasks for each published locale and category combination
        for (const locale of publishedLocales) {
            const matchingCommon = commonData.find(common => 
                common.M_LANGUAGE_ISO === locale.M_LANGUAGE_ISO && 
                common.M_COUNTRY_CODE === locale.M_COUNTRY_CODE
            );
            
            if (!matchingCommon) {
                console.warn(`⚠️  No matching common data found for locale ${locale.M_LANGUAGE_ISO}-${locale.M_COUNTRY_CODE}`);
                continue;
            }
            
            for (const categoryNumber of categories) {
                tasks.push(
                    limit(() => generateImageForCategory(matchingCommon, categoryNumber, commonAssets, context))
                );
            }
        }
        
        const results = await Promise.allSettled(tasks);
        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failedCount = tasks.length - successful;

        console.log('\n✨ Category OG image generation complete!');
        console.log(`🟢 Successful: ${successful}/${tasks.length}`);
        console.log(`📊 Generated for ${publishedLocales.length} locales × ${categories.length} categories`);
        
        if (failedCount > 0) {
            console.error(`🔴 Failed: ${failedCount}/${tasks.length}`);
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`  - Task ${index + 1}: ${result.reason.message}`);
                }
            });
            process.exitCode = 1;
        }
    } catch (error) {
        console.error('❌ A critical error occurred:', error.message);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
}

main();