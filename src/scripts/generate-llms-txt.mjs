// src/scripts/generate-llms-txt.mjs

import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

// --- Configuration ---
const SITE_URL = 'https://eusignal.netlify.app';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'llms.txt');

// --- Helper function to read JSON files ---
const readJsonFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  try {
    const fileContent = readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`, error);
    return null;
  }
};

// --- Main Exported Function ---
export async function generateLlmsTxt(logger) {
  logger.info('🚀 Generating llms.txt...');

  try {
    // 1. Load all data sources
    const wwwData = readJsonFile('src/data/www.json');
    const localeData = readJsonFile('src/data/locale.json');
    const commonData = readJsonFile('src/data/common.json');
    const eeatData = readJsonFile('src/data/eeat.json');

    if (!wwwData || !localeData || !commonData || !eeatData) {
      logger.error('❌ Missing one or more required JSON data files. Aborting.');
      return;
    }

    const globalData = wwwData[0];
    const publishedLocales = localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    const publishedLocaleCount = publishedLocales.length;
    
    const content = [];

    // --- General Info (with dynamic location count) ---
    content.push(`# ${globalData.PAGE_ORGANISATION_FULL_NAME} is ${globalData.PAGE_SLOGAN_GLOBAL}`);
    content.push('');
    content.push(globalData.PAGE_DESCRIPTION_GLOBAL_SHORT);
    content.push('');
    content.push(globalData.PAGE_DESCRIPTION_GLOBAL_LONG.replace('{X}', publishedLocaleCount));
    content.push('');

    // --- Social Links ---
    content.push('## Social Links');
    content.push('');
    if(globalData.PAGE_INSTAGRAM_URL) content.push(`- [Instagram](${globalData.PAGE_INSTAGRAM_URL})`);
    if(globalData.PAGE_FACEBOOK_URL) content.push(`- [Facebook](${globalData.PAGE_FACEBOOK_URL})`);
    if(globalData.PAGE_TWITTER_URL) content.push(`- [X (formerly Twitter)](${globalData.PAGE_TWITTER_URL})`);
    if(globalData.PAGE_LINKEDIN_URL) content.push(`- [LinkedIn](${globalData.PAGE_LINKEDIN_URL})`);
    if(globalData.PAGE_TIKTOK_URL) content.push(`- [TikTok](${globalData.PAGE_TIKTOK_URL})`);
    if(globalData.PAGE_YOUTUBE_URL) content.push(`- [YouTube](${globalData.PAGE_YOUTUBE_URL})`);
    if(globalData.PAGE_PINTEREST_URL) content.push(`- [Pinterest](${globalData.PAGE_PINTEREST_URL})`);
    if(globalData.PAGE_BLUESKY_URL) content.push(`- [Bluesky](${globalData.PAGE_BLUESKY_URL})`);
    content.push('');

    // --- Company Info ---
    content.push('## Company info');
    content.push('');
    content.push(globalData.PAGE_ORIGIN_GLOBAL);
    content.push(globalData.PAGE_COMPANY_NAME_GLOBAL);
    content.push(globalData.PAGE_STREET_ADDRESS_GLOBAL);
    content.push(globalData.PAGE_POSTAL_CITY_GLOBAL);
    content.push(globalData.PAGE_COUNTRY_GLOBAL);
    content.push('');

    // --- Operating Markets ---
    content.push('## Operating Markets');
    content.push('');
    content.push(globalData.PAGE_OPERATIONS_GLOBAL.replace('{X}', publishedLocaleCount));
    content.push('');
    publishedLocales.forEach(locale => {
      // FIX: Consistently use locale.M_COUNTRY
      content.push(`- ${locale.M_COUNTRY} - ${locale.M_COUNTRY_NATIVE}`);
    });
    content.push('');

    // --- Homepages by Locale ---
    content.push('## Homepages by Locale');
    content.push('');
    content.push('Find our homepage for each operating market and navigate from there:');
    content.push('');
    publishedLocales.forEach(locale => {
        // FIX: Consistently use locale.M_COUNTRY
        content.push(`- [${locale.M_COUNTRY}](${SITE_URL}/${locale.M_SLUG})`);
    });
    content.push('');

    // --- Sitemap Links ---
    content.push('## Find sitemap by locale');
    content.push('');
    content.push('Find our master sitemap and localized sitemap files for easier navigation:');
    content.push('');
    content.push(`- [Master Sitemap](${SITE_URL}/sitemap.xml)`);
    publishedLocales.forEach(locale => {
      // FIX: Consistently use locale.M_COUNTRY
      content.push(`- [${locale.M_COUNTRY}](${SITE_URL}/sitemap-${locale.M_HREFLANG_CODE}.xml)`);
    });
    content.push('');

    // --- Dynamic Category & Author Pages ---
    const firstCommonEntryKeys = Object.keys(commonData[0]);
    const dynamicCategoryKeys = firstCommonEntryKeys.filter(key => key.startsWith('PAGE_CATEGORY_') && key.endsWith('_LISTING_SLUG'));
    const slugKeysToProcess = [...dynamicCategoryKeys, 'AUTHOR_LIST_SLUG'];

    for (const key of slugKeysToProcess) {
      const titleKey = key.replace('_SLUG', '_TITLE');
      const title = key.replace(/_/g, ' ').replace('PAGE ', '').replace('SLUG', '').trim();
      content.push(`## ${title} pages by Locale`);
      content.push('');
      
      publishedLocales.forEach(locale => {
        const common = commonData.find(c => c.M_SLUG === locale.M_SLUG);
        // Ensure that the slug and the title both exist before creating the line
        if (common && common[key] && common[titleKey]) {
          // FIX: Consistently use locale.M_COUNTRY
          const linkText = `${locale.M_COUNTRY} - ${common[titleKey]}`;
          content.push(`- [${linkText}](${SITE_URL}/${locale.M_SLUG}/${common[key]})`);
        }
      });
      content.push('');
    }

    // --- EEAT Pages (FAQ, About Us, Contact) ---
    const eeatSections = [
        { filter: "16", title: "Read common questions about our products and shipping informations in our FAQ" },
        { filter: "18", title: "Read who we are, why we do what we do and how we do it (About Us)" },
        { filter: "19", title: "Get in touch with us (Contact)" }
    ];

    eeatSections.forEach(section => {
        content.push(`## ${section.title}`);
        content.push('');
        publishedLocales.forEach(locale => {
            const eeatPage = eeatData.find(page => 
                page.EEAT_FILTERING === section.filter &&
                page.PAGE_LOCALE === locale.M_HREFLANG_CODE &&
                page.PUBLISH_Y_N === "1"
            );
            if (eeatPage) {
                // FIX: Consistently use locale.M_COUNTRY
                const linkText = `${locale.M_COUNTRY} - ${eeatPage.EEAT_NAME}`;
                content.push(`- [${linkText}](${SITE_URL}/${eeatPage.M_SLUG}/${eeatPage.EEAT_SLUG})`);
            }
        });
        content.push('');
    });

    // Write the final file
    await writeFile(OUTPUT_FILE, content.join('\n'));
    logger.info(`✅ Generated ${path.basename(OUTPUT_FILE)} with ${publishedLocaleCount} published locales.`);

  } catch (error) {
    logger.error('❌ Error generating llms.txt:', error);
    process.exit(1);
  }
}