import { readFileSync } from 'fs';
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import pLimit from 'p-limit';

// --- CONFIGURATION ---
const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'ogimages', 'oghome');
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

// --- HTML TEMPLATE GENERATOR ---
const generateHtmlTemplate = (data) => `
<!DOCTYPE html>
<html lang="${data.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage OG Image</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { width: 1200px; height: 630px; margin: 0; font-family: 'Inter', system-ui, sans-serif; background-color: ${data.bodyBgColor}; color: ${data.bodyTextColor}; display: flex; position: relative; overflow: hidden; padding-bottom: 110px; }
        .left-section { width: 77%; padding: 1.25rem 2.5rem; display: flex; flex-direction: column; height: 100%; container-type: inline-size; }
        .logo { width: 300px; height: auto; flex-shrink: 0; }
        .text-container { margin-top: 1.25rem; flex-shrink: 0; }
        .subtitle { font-size: clamp(32px, 7cqi, 60px); font-weight: 700; line-height: 1.15; color: ${data.subtitleTextColor}; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
        .features { list-style: none; display: flex; flex-direction: column; gap: 1.25rem; width: 100%; flex-shrink: 0; margin-top: auto; }
        .feature { display: flex; align-items: center; gap: 0.75rem; height: 100%; width: 100%; container-type: inline-size; }
        .feature-text { font-size: clamp(1.5rem, 4.5cqi, 2.5rem); color: ${data.featureTextColor}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }
        .feature-icon { width: clamp(1.5rem, 5cqi, 2.75rem); height: clamp(1.5rem, 5cqi, 2.75rem); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35px' height='35px' viewBox='0 0 56 56'%3E%3Cpath fill='${encodeURIComponent(data.iconColor)}' d='M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922c11.039 0 19.921 8.883 19.945 19.922c.023 11.063-8.883 19.922-19.922 19.922m-2.953-8.203c.773 0 1.406-.375 1.898-1.102l11.578-18.21c.282-.47.563-1.009.563-1.524c0-1.078-.938-1.735-1.922-1.735c-.633 0-1.219.352-1.64 1.055L24.93 35.148l-5.438-7.03c-.515-.704-1.078-.962-1.71-.962c-1.032 0-1.852.844-1.852 1.899c0 .515.21 1.008.539 1.453l6.562 8.11c.633.773 1.242 1.1 2.016 1.1'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-size: contain; flex-shrink: 0; }
        .footer { position: absolute; bottom: 0; left: 0; right: 0; height: 70px; background-color: ${data.footerBgColor}; padding: 0 1rem; display: flex; justify-content: center; align-items: center; gap: 2rem; }
        .footer-item { display: flex; align-items: center; gap: 0.75rem; font-weight: 700; white-space: nowrap; color: ${data.footerTextColor}; }
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
        <div class="text-container"><div class="subtitle">${data.subtitle}</div></div>
        <ul class="features">
            <li class="feature"><span class="feature-icon"></span><div class="feature-text">${data.feature1}</div></li>
            <li class="feature"><span class="feature-icon"></span><div class="feature-text">${data.feature2}</div></li>
            <li class="feature"><span class="feature-icon"></span><div class="feature-text">${data.feature3}</div></li>
        </ul>
    </div>
    <footer class="footer">
        <div class="footer-item"><svg class="footer-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg><span class="footer-text">${data.domain}</span></div>
        <div class="footer-item"><svg class="footer-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span class="footer-text">${data.email}</span></div>
    </footer>
</body>
</html>`;

async function generateImageForHome(home, commonAssets, context) {
    const imageName = home.HOME_OG_IMAGE_NAME_ASCII;
    const { brandingData, logoBase64 } = commonAssets;

    const dataForTemplate = {
        lang: home.M_LANGUAGE_ISO,
        subtitle: home.HOME_H1,
        feature1: home.PAGE_SOCIAL_SHARING_FEATURE_1,
        feature2: home.PAGE_SOCIAL_SHARING_FEATURE_2,
        feature3: home.PAGE_SOCIAL_SHARING_FEATURE_3,
        domain: brandingData.PAGE_ORGANISATION_URL_NAME,
        email: brandingData.PAGE_INFO_EMAIL,
        flagSvg: flagMap[home.M_COUNTRY_CODE] || '',
        logoBase64: logoBase64,
        bodyBgColor: brandingData.PAGE_COLOR_BACKGROUND,
        bodyTextColor: brandingData.PAGE_COLOR_PRIMARY,
        subtitleTextColor: brandingData.PAGE_COLOR_PRIMARY,
        featureTextColor: brandingData.PAGE_COLOR_PRIMARY,
        footerBgColor: brandingData.PAGE_COLOR_PRIMARY,
        footerTextColor: brandingData.PAGE_COLOR_ACCENT,
        iconColor: brandingData.PAGE_COLOR_ACCENT_BRIGHT,
    };

    const htmlContent = generateHtmlTemplate(dataForTemplate);
    const page = await context.newPage();
    
    try {
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.setContent(htmlContent, { waitUntil: 'load' });
        const pngBuffer = await page.screenshot({ type: 'png' });
        const outputPath = path.join(OUTPUT_DIR, imageName);
        await sharp(pngBuffer).webp({ quality: 85 }).toFile(outputPath);
    } finally {
        await page.close();
    }
}

async function main() {
    console.log('🚀 Starting homepage OG image generation...');
    let browser;
    try {
        console.log(`🧹 Clearing destination directory: ${OUTPUT_DIR}`);
        await rm(OUTPUT_DIR, { recursive: true, force: true });
        await mkdir(OUTPUT_DIR, { recursive: true });

        const homeData = readJsonFile('src/data/home.json');
        const wwwData = readJsonFile('src/data/www.json');
        
        const brandingData = wwwData[0];
        const logoPath = brandingData.PAGE_LOGO_IMAGE_PATH_5;

        if (!brandingData || !logoPath) {
            throw new Error('Could not find required branding or logo data in JSON files.');
        }

        const commonAssets = {
            brandingData,
            logoBase64: readImageAsBase64(logoPath)
        };

        browser = await chromium.launch();
        const context = await browser.newContext();

        const limit = pLimit(CONCURRENCY);
        const totalItems = homeData.length;
        
        const tasks = homeData.map((home) => 
            limit(() => generateImageForHome(home, commonAssets, context))
        );
        const results = await Promise.allSettled(tasks);

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected');

        console.log('\n✨ Homepage OG image generation complete!');
        console.log(`🟢 Success: ${successful}/${totalItems}`);
        if (failed.length > 0) {
            console.error(`🔴 Failed: ${failed.length}/${totalItems}`);
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