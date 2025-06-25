// src/scripts/generate-json-search.mjs

import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

// --- Configuration ---
const SITE_URL = 'https://eusignal.netlify.app';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// --- Helper function to read JSON files ---
const readJsonFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

// --- Main Exported Function ---
// This is the core logic, which is imported by the integration.
export async function generateSearchIndexes(logger) {
  logger.info('🚀 Generating JSON search indexes...');
  try {
    // Read data at the time of execution
    const localesData = readJsonFile('src/data/locale.json');
    const eeatData = readJsonFile('src/data/eeat.json');
    const authorData = readJsonFile('src/data/author.json');
    const articleData = readJsonFile('src/data/article.json');
    const productData = readJsonFile('src/data/product.json');

    const generateLocaleSearchIndex = (localeCode) => {
        const searchEntries = [];
        eeatData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: p.EEAT_NAME, EXCERPT: p.EEAT_META_SEO, HREF: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_SLUG}` }));
        authorData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: `${p.WWW_AUTHOR} — ${p.EEAT_NAME_20_SINGULAR}`, EXCERPT: p.AUTHOR_FULL_BIO, IMAGE: `${SITE_URL}${p.AUTHOR_PROFILE_IMAGE_PATH}`, HREF: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_URL_20}/${p.WWW_AUTHOR_SLUG}` }));
        articleData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: p.ARTICLE_NAME, EXCERPT: p.ARTICLE_META_SEO, HREF: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_2_LISTING_SLUG}/${p.ARTICLE_SLUG}` }));
        productData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: p.PRODUCT_NAME, EXCERPT: p.PRODUCT_META_SEO, IMAGE: `${SITE_URL}${p.PRODUCT_IMAGE_PATH_S}`, HREF: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_1_LISTING_SLUG}/${p.PRODUCT_ASCII_SLUG}` }));
        return searchEntries;
    };

    const publishedLocales = localesData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    for (const locale of publishedLocales) {
      const localeCode = locale.M_HREFLANG_CODE;
      const searchIndex = generateLocaleSearchIndex(localeCode);
      const fileName = `index-${localeCode}.json`;
      await writeFile(path.join(PUBLIC_DIR, fileName), JSON.stringify(searchIndex, null, 2));
      logger.info(`✅ Generated ${fileName}`);
    }

    logger.info('✨ JSON search index generation complete!');
  } catch (error) {
    logger.error('❌ Error generating JSON search indexes:', error);
    process.exit(1);
  }
}