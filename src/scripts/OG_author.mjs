import { readFileSync, existsSync } from 'fs'; // <-- Added existsSync
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import pLimit from 'p-limit';

// --- CONFIGURATION ---
const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'ogimages', 'ogauthor');
const CONCURRENCY = 10;

import { 
  AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, 
  CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, 
  ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, 
  HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, 
  LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, 
  OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, 
  SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA 
} from 'country-flag-icons/string/3x2';

const flagMap = { AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA };

// --- HELPER FUNCTIONS ---
const readJsonFile = (filePath) => JSON.parse(readFileSync(path.join(CWD, filePath), 'utf-8'));
const readImageAsBase64 = (filePath) => readFileSync(path.join(CWD, filePath), 'base64');

// --- HTML TEMPLATE GENERATOR (No changes needed here) ---
const generateAuthorHtmlTemplate = (data) => `
<!DOCTYPE html>
<html lang="${data.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Author Social Share</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { width: 1200px; height: 630px; margin: 0; font-family: 'Inter', system-ui, sans-serif; background-color: ${data.bodyBgColor}; color: ${data.bodyTextColor}; display: flex; position: relative; overflow: hidden; }
        .name-container { position: absolute; top: 3.5rem; left: 1.45rem; background-color: ${data.nameBgColor}; color: ${data.nameTextColor}; padding: 1.25rem 1.5rem; font-size: 4rem; font-weight: 700; line-height: 1.2; box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25); max-width: 60%; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .tagline { position: absolute; left: 3rem; top: 14rem; font-size: 4rem; font-weight: 600; color: ${data.taglineTextColor}; max-width: 55%; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.3; }
        .occupation { position: absolute; left: 3rem; top: 20rem; font-size: 3rem; font-weight: 500; color: ${data.taglineTextColor}; max-width: 55%; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.3; opacity: 0.9; }
        .right-section { position: absolute; top: 0; right: -5%; width: 50%; height: 100%; clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%); background-color: ${data.rightSectionBgColor}; display: flex; justify-content: center; align-items: center; }
        .right-section img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .logo { width: 450px; height: auto; position: absolute; bottom: 2rem; left: 3.5rem; }
        .flag-container { position: absolute; bottom: 2rem; right: 3rem; background: white; padding: 0.75rem; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 8rem; height: 5.5rem; display: flex; align-items: center; justify-content: center; }
        .flag-container img { width: 100%; height: 100%; object-fit: contain; }
    </style>
</head>
<body>
    <div class="right-section">
        <img src="data:image/webp;base64,${data.authorImageBase64}" alt="Author Image">
    </div>
    <div class="name-container">${data.authorName}</div>
    <div class="tagline">${data.tagline}</div>
    <div class="occupation">${data.occupation}</div>
    <img src="data:image/png;base64,${data.logoBase64}" alt="Logo" class="logo">
    <div class="flag-container">
        <img src="data:image/svg+xml;utf8,${encodeURIComponent(data.flagSvg)}" alt="Country flag">
    </div>
</body>
</html>`;

async function generateImageForAuthor(author, commonAssets, context) {
    const baseName = `${author.AUTHOR_ID}-${author.AUTHOR_IMAGE_NAME_ASCII}-open-graph`;
    const imageName = baseName.replace(/\.webp$/i, '') + '.webp';
    const { brandingData, logoBase64 } = commonAssets;

    const rawAuthorPath = author.AUTHOR_PROFILE_IMAGE_PATH;
    const cleanAuthorPath = rawAuthorPath.startsWith('/') ? rawAuthorPath.substring(1) : rawAuthorPath;
    const absoluteAuthorImagePath = path.join(PUBLIC_DIR, cleanAuthorPath);
    const authorImageBase64 = readFileSync(absoluteAuthorImagePath, 'base64');
    
    const dataForTemplate = {
        lang: author.M_LANGUAGE_ISO,
        authorName: author.WWW_AUTHOR,
        tagline: author.EEAT_NAME_20_SINGULAR,
        occupation: author.WWW_AUTHOR_OCCUPATION || '',
        flagSvg: flagMap[author.M_COUNTRY_CODE] || '',
        logoBase64: logoBase64,
        authorImageBase64: authorImageBase64,
        bodyBgColor: brandingData.PAGE_COLOR_BACKGROUND,
        bodyTextColor: brandingData.PAGE_COLOR_PRIMARY,
        nameBgColor: brandingData.PAGE_COLOR_PRIMARY,
        nameTextColor: brandingData.PAGE_COLOR_ACCENT,
        taglineTextColor: brandingData.PAGE_COLOR_PRIMARY,
        rightSectionBgColor: brandingData.PAGE_COLOR_BACKGROUND_ALT,
    };

    const htmlContent = generateAuthorHtmlTemplate(dataForTemplate);
    const page = await context.newPage();
    
    try {
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.setContent(htmlContent, { waitUntil: 'load' });
        const pngBuffer = await page.screenshot({ type: 'png' });
        const outputPath = path.join(OUTPUT_DIR, imageName);
        await sharp(pngBuffer).webp({ quality: 1 }).toFile(outputPath);
    } finally {
        await page.close();
    }
}

async function main() {
    console.log('🚀 Starting Author page OG image generation...');
    let browser;
    try {
        console.log(`🧹 Clearing destination directory: ${OUTPUT_DIR}`);
        await rm(OUTPUT_DIR, { recursive: true, force: true });
        await mkdir(OUTPUT_DIR, { recursive: true });

        const allPublishedAuthors = readJsonFile('src/data/author.json').filter(p => p.PUBLISH_Y_N === "1");
        
        // --- NEW: Pre-process authors to check for images ---
        const authorsToProcess = [];
        const skippedAuthorPaths = new Set(); // Use a Set to store unique missing paths

        for (const author of allPublishedAuthors) {
            const rawAuthorPath = author.AUTHOR_PROFILE_IMAGE_PATH;
            const cleanAuthorPath = rawAuthorPath.startsWith('/') ? rawAuthorPath.substring(1) : rawAuthorPath;
            const absoluteAuthorImagePath = path.join(PUBLIC_DIR, cleanAuthorPath);

            if (existsSync(absoluteAuthorImagePath)) {
                authorsToProcess.push(author);
            } else {
                skippedAuthorPaths.add(cleanAuthorPath);
            }
        }
        
        // --- NEW: Log missing images cleanly ---
        if (skippedAuthorPaths.size > 0) {
            console.warn(`\n🟡 WARNING: Skipped authors due to missing profile pictures. Please add these files:`);
            for (const missingPath of skippedAuthorPaths) {
                console.warn(`  - public\\${missingPath.replace(/\//g, '\\')}`);
            }
        }

        if (authorsToProcess.length === 0) {
            console.log("\nNo authors with existing profile pictures to process. Exiting.");
            return;
        }

        const wwwData = readJsonFile('src/data/www.json');
        const brandingData = wwwData[0];
        const logoPath = brandingData.PAGE_LOGO_IMAGE_PATH_5;
        if (!brandingData || !logoPath) throw new Error('Could not find required branding or logo data.');

        const commonAssets = {
            brandingData,
            logoBase64: readImageAsBase64(logoPath)
        };

        browser = await chromium.launch();
        const context = await browser.newContext();

        const limit = pLimit(CONCURRENCY);
        const totalToProcess = authorsToProcess.length;
        
        const tasks = authorsToProcess.map((author) => 
            limit(() => generateImageForAuthor(author, commonAssets, context))
        );
        const results = await Promise.allSettled(tasks);

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected');

        console.log('\n✨ Author OG image generation complete!');
        console.log(`🟢 Success: ${successful}/${totalToProcess}`);
        console.log(`🟡 Skipped: ${skippedAuthorPaths.size > 0 ? allPublishedAuthors.length - totalToProcess : 0}`);
        
        if (failed.length > 0) {
            console.error(`🔴 Failed during processing: ${failed.length}/${totalToProcess}`);
            failed.forEach((fail, index) => {
                console.error(`  - Failure ${index + 1}:`, fail.reason.message);
            });
            process.exitCode = 1;
        }
    } catch (error) {
        console.error('❌ A critical error occurred during the process:', error);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
}

main();