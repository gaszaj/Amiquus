// src/scripts/OG_home.mjs

import { readFileSync, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import path from 'path';
import playwright from 'playwright';

// Import all country flag SVG strings
import * as allFlags from 'country-flag-icons/string/3x2';

// --- Configuration ---
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'ogimages', 'oghome');
const LOGO_PATH = path.join(PUBLIC_DIR, 'logos', 'EUSIGNAL-PNGFile_Horizontal-Light-4500-659.png');

// --- Helper Functions ---

// Helper to read JSON files robustly
const readJsonFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }
  const fileContent = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Helper to convert an image to a Base64 data URI for embedding in HTML
const inlineImage = (imagePath) => {
  if (!existsSync(imagePath)) {
    console.warn(`⚠️ Warning: Image for inlining not found at ${imagePath}.`);
    return '';
  }
  const imageBuffer = readFileSync(imagePath);
  const mimeType = path.extname(imagePath) === '.svg' ? 'image/svg+xml' : `image/${path.extname(imagePath).slice(1)}`;
  return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
};

// --- HTML Template Generator ---
// This function replaces the old home.html and Jinja2 templating
const generateHtml = (data) => {
  const {
    slogan, feature1, feature2, feature3, domain, email, flagSvg, logoBase64,
    bodyBgColor, footerBgColor, bodyTextColor, subtitleTextColor, featureTextColor
  } = data;

  // The 'right-section' for a product image from the original HTML has been removed
  // as this data point ('ProductImage') is not available in the new JSON files.
  // The layout is adjusted to use the full width.
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OG Image</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                width: 1200px;
                height: 630px;
                margin: 0;
                font-family: 'Inter', system-ui, sans-serif;
                background-color: ${bodyBgColor};
                color: ${bodyTextColor};
                display: flex;
                position: relative;
                overflow: hidden;
            }
            .content-section {
                width: 100%;
                padding: 1.05rem 3rem;
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
                container-type: inline-size;
            }
            .logo { width: 300px; height: auto; }
            .text-container {
                height: 180px;
                margin-bottom: 4rem;
                width: 100%;
                display: flex;
                align-items: flex-start;
            }
            .subtitle {
                font-size: clamp(24px, 8cqi, 64px);
                font-weight: 600;
                line-height: 1.1;
                color: ${subtitleTextColor};
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                width: 100%;
            }
            .features { list-style: none; display: flex; flex-direction: column; gap: 1rem; width: 100%; }
            .feature { display: flex; align-items: center; gap: 0.45rem; height: 100%; width: 100%; container-type: inline-size; }
            .feature-text { font-size: clamp(1.2rem, 5cqi, 2.5rem); color: ${featureTextColor}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }
            .feature-icon {
                width: clamp(1.3rem, 5cqi, 2.75rem);
                height: clamp(1.3rem, 5cqi, 2.75rem);
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35px' height='35px' viewBox='0 0 56 56'%3E%3Cpath fill='%2300ce9c' d='M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922c11.039 0 19.921 8.883 19.945 19.922c.023 11.063-8.883 19.922-19.922 19.922m-2.953-8.203c.773 0 1.406-.375 1.898-1.102l11.578-18.21c.282-.47.563-1.009.563-1.524c0-1.078-.938-1.735-1.922-1.735c-.633 0-1.219.352-1.64 1.055L24.93 35.148l-5.438-7.03c-.515-.704-1.078-.962-1.71-.962c-1.032 0-1.852.844-1.852 1.899c0 .515.21 1.008.539 1.453l6.562 8.11c.633.773 1.242 1.1 2.016 1.1'/%3E%3C/svg%3E");
                background-repeat: no-repeat; background-size: contain; flex-shrink: 0;
            }
            .footer {
                position: absolute; bottom: 0; left: 0; right: 0;
                background-color: ${footerBgColor}; padding: 0.2rem 2.25rem;
                display: flex; justify-content: center; align-items: center; color: white; gap: 2rem;
            }
            .footer-item { display: flex; align-items: center; gap: 0.75rem; font-weight: 700; white-space: nowrap; }
            .footer-icon { width: 4.25rem; height: 4.25rem; fill: currentColor; flex-shrink: 0; }
            .footer-text { font-size: clamp(1.45rem, 4cqi, 2.8rem); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(100% - 1rem); }
            .flag-container {
                position: absolute; top: 1rem; right: 1rem; background: white; padding: 0.5rem;
                border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                width: 6rem; height: 4rem; display: flex; align-items: center; justify-content: center;
            }
            .flag-container img { width: 100%; height: 100%; object-fit: contain; }
        </style>
    </head>
    <body>
        <div class="flag-container">
            <img src="data:image/svg+xml,${encodeURIComponent(flagSvg)}" alt="Country flag">
        </div>
        <div class="content-section">
            <img src="${logoBase64}" alt="Logo" class="logo">
            <div class="text-container">
                <div class="subtitle">${slogan}</div>
            </div>
            <ul class="features">
                <li class="feature"><span class="feature-icon"></span><div class="feature-text">${feature1}</div></li>
                <li class="feature"><span class="feature-icon"></span><div class="feature-text">${feature2}</div></li>
                <li class="feature"><span class="feature-icon"></span><div class="feature-text">${feature3}</div></li>
            </ul>
        </div>
        <footer class="footer">
            <div class="footer-item">
                <svg class="footer-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <span class="footer-text">${domain}</span>
            </div>
            <div class="footer-item">
                <svg class="footer-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span class="footer-text">${email}</span>
            </div>
        </footer>
    </body>
    </html>`;
};

// --- Main Execution Logic ---
async function main() {
  console.log('🚀 Starting OG Image Generation for Homepages...');

  try {
    // 1. Ensure output directory exists
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Output directory ready: ${OUTPUT_DIR}`);

    // 2. Load all necessary data
    const homeData = readJsonFile('src/data/home.json');
    const wwwData = readJsonFile('src/data/www.json');
    const commonData = readJsonFile('src/data/common.json');
    const logoBase64 = inlineImage(LOGO_PATH);

    // 3. Setup Playwright
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1200, height: 630 }
    });
    const page = await context.newPage();

    // 4. Loop through each homepage and generate an image
    for (const homePage of homeData) {
      const locale = homePage.PAGE_LOCALE;
      console.log(`\nProcessing locale: ${locale}`);

      const wwwInfo = wwwData.find(w => w.PAGE_LOCALE === locale);
      const commonInfo = commonData.find(c => c.PAGE_LOCALE === locale);
      if (!wwwInfo || !commonInfo) {
        console.warn(`⚠️ Skipping ${locale}: Missing data in www.json or common.json.`);
        continue;
      }
      
      const countryCode = homePage.M_COUNTRY_CODE;
      const flagSvg = allFlags[countryCode];
      if (!flagSvg) {
        console.warn(`⚠️ Skipping ${locale}: No flag found for country code "${countryCode}".`);
        continue;
      }

      // 5. Prepare data for the HTML template
      const templateData = {
        slogan: commonInfo.PAGE_SLOGAN,
        feature1: homePage.PAGE_SOCIAL_SHARING_FEATURE_1,
        feature2: homePage.PAGE_SOCIAL_SHARING_FEATURE_2,
        feature3: homePage.PAGE_SOCIAL_SHARING_FEATURE_3,
        domain: wwwInfo.PAGE_ORGANISATION_URL_NAME,
        email: wwwInfo.PAGE_INFO_EMAIL,
        flagSvg: flagSvg,
        logoBase64: logoBase64,
        bodyBgColor: wwwInfo.PAGE_BODY_BACKGROUND_COLOR,
        footerBgColor: wwwInfo.PAGE_FOOTER_BACKGROUND_COLOR,
        bodyTextColor: wwwInfo.PAGE_BODY_TEXT_COLOR,
        subtitleTextColor: wwwInfo.PAGE_SUBTITLE_TEXT_COLOR,
        featureTextColor: wwwInfo.PAGE_FEATURE_TEXT_COLOR,
      };

      // 6. Generate HTML and render the image
      const htmlContent = generateHtml(templateData);
      const imageName = homePage.HOME_OG_IMAGE_NAME_ASCII; // e.g., home001-...-open-graph.webp
      const outputPath = path.join(OUTPUT_DIR, imageName);

      await page.setContent(htmlContent, { waitUntil: 'networkidle' });
      
      // 7. Save screenshot directly. Astro will handle optimization.
      // We save as JPEG for good quality at a reasonable file size. 
      // Astro can convert this to WebP during the build if configured to.
      await page.screenshot({
          path: outputPath,
          type: 'jpeg',
          quality: 90 // High quality, let Astro compress it later
      });
      
      console.log(`✅ Generated: ${imageName}`);
    }

    // 8. Cleanup
    await browser.close();
    console.log('\n✨ Homepage OG Image generation complete!');

  } catch (error) {
    console.error('\n❌ An error occurred during image generation:', error);
    process.exit(1);
  }
}

// Run the script
main();