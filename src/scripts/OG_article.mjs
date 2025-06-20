// Path: /src/scripts/OG_article.mjs
// Purpose: Generate Open Graph images for article pages
// Data: JSON dependencies (article.json, www.json)
// Dependencies: Playwright, Sharp, p-limit, country-flag-icons

import { readFileSync } from 'fs';
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import pLimit from 'p-limit';

// --- CONFIGURATION ---
const CWD = process.cwd();
const OUTPUT_DIR = path.join(CWD, 'public', 'ogimages', 'ogarticle');
const CONCURRENCY = 10;

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
const generateArticleHtmlTemplate = (data) => `
<!DOCTYPE html>
<html lang="${data.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article OG Image</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            width: 1200px; height: 630px; margin: 0; 
            font-family: 'Inter', system-ui, sans-serif; 
            background-color: ${data.bodyBgColor}; 
            color: ${data.bodyTextColor}; 
            display: flex; 
            flex-direction: column;
            position: relative; 
            overflow: hidden; 
            padding: 3rem;
            justify-content: flex-start;
            gap: 1rem; /* FIX: Add space between header and main content */
        }
        .header { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; }
        .logo { width: 300px; height: auto; }
        .content { padding: 0 0.5rem; max-width: 100%; }
        .title { 
            font-size: clamp(2.8rem, 4.75cqi, 3.75rem);
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
            font-size: clamp(1.8rem, 3.75cqi, 2.2rem);
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
        .footer-text { font-size: clamp(1.45rem, 4cqi, 2.8rem); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 1rem); }
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

// --- IMAGE GENERATION ---
async function generateImageForArticle(article, { brandingData, logoBase64 }, context) {
    const outputPath = path.join(OUTPUT_DIR, path.basename(article.ARTICLE_OG_IMAGE_PATH));
    
    const templateData = {
        lang: article.M_LANGUAGE_ISO,
        title: article.ARTICLE_H1,
        subtitle: article.ARTICLE_SUBTITLE,
        domain: brandingData.PAGE_ORGANISATION_URL_NAME,
        email: brandingData.PAGE_INFO_EMAIL,
        flagSvg: flagMap[article.M_COUNTRY_CODE] || '',
        logoBase64,
        bodyBgColor: brandingData.PAGE_COLOR_BACKGROUND,
        bodyTextColor: brandingData.PAGE_COLOR_PRIMARY,
        subtitleTextColor: brandingData.PAGE_COLOR_PRIMARY,
        footerBgColor: brandingData.PAGE_COLOR_PRIMARY,
        footerTextColor: brandingData.PAGE_COLOR_ACCENT,
    };

    const htmlContent = generateArticleHtmlTemplate(templateData);
    const page = await context.newPage();
    
    try {
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.setContent(htmlContent, { waitUntil: 'load' });
        const pngBuffer = await page.screenshot({ type: 'png' });
        await sharp(pngBuffer).webp({ quality: 1 }).toFile(outputPath);
    } finally {
        await page.close();
    }
}

// --- MAIN EXECUTION ---
async function main() {
    console.log('🚀 Starting Article OG image generation...');
    let browser;
    try {
        await rm(OUTPUT_DIR, { recursive: true, force: true });
        await mkdir(OUTPUT_DIR, { recursive: true });
        console.log(`✅ Cleaned output directory: ${OUTPUT_DIR}`);

        const articles = readJsonFile('src/data/article.json').filter(p => p.PUBLISH_Y_N === "1");
        if (!articles.length) {
            console.log("🟡 No published articles found to process. Exiting.");
            return;
        }
        
        const brandingData = readJsonFile('src/data/www.json')[0];
        const logoPath = brandingData.PAGE_LOGO_IMAGE_PATH_5;
        if (!logoPath) {
            throw new Error('Branding data or logo path not found in www.json.');
        }

        const commonAssets = { brandingData, logoBase64: readImageAsBase64(logoPath) };
        browser = await chromium.launch();
        const context = await browser.newContext();

        const limit = pLimit(CONCURRENCY);
        const tasks = articles.map(article => limit(() => generateImageForArticle(article, commonAssets, context)));
        const results = await Promise.allSettled(tasks);

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failedCount = articles.length - successful;

        console.log('\n✨ Generation complete!');
        console.log(`🟢 Successful: ${successful}/${articles.length}`);
        
        if (failedCount > 0) {
            console.error(`🔴 Failed: ${failedCount}/${articles.length}`);
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`  - Article (index ${index}): ${result.reason.message}`);
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