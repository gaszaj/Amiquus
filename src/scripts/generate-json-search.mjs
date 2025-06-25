// src/scripts/generate-json-search.mjs

import { writeFile } from 'fs/promises';
import path from 'path';
import Database from 'better-sqlite3';

// --- Configuration ---
const SITE_URL = 'https://eusignal.netlify.app';
const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');
const DB_PATH = path.join(CWD, 'src/data/data.db');

// --- Main Exported Function ---
// This is the core logic, which is imported by the integration.
export async function generateSearchIndexes(logger) {
  logger.info('🚀 Generating JSON search indexes...');
  let db;
  
  try {
    // --- Database Connection and Data Fetching ---
    db = new Database(DB_PATH, { readonly: true });

    // Fetch all necessary data from the database in a single transaction for performance
    const { 
        publishedLocales, 
        eeatData, 
        authorData, 
        articleData, 
        productData 
    } = db.transaction(() => {
        // Get published locales
        const locales = db.prepare("SELECT * FROM locale WHERE M_LOCALE_PUBLISH_Y_N = '1'").all();
        
        // Get published EEAT pages
        const eeat = db.prepare("SELECT * FROM eeat WHERE PUBLISH_Y_N = '1'").all();
        
        // Get published authors
        const author = db.prepare("SELECT * FROM author WHERE PUBLISH_Y_N = '1'").all();
        
        // Get published articles
        const article = db.prepare("SELECT * FROM article WHERE PUBLISH_Y_N = '1'").all();
        
        // Get published products
        const product = db.prepare("SELECT * FROM product WHERE PUBLISH_Y_N = '1'").all();

        return { 
            publishedLocales: locales, 
            eeatData: eeat, 
            authorData: author, 
            articleData: article, 
            productData: product 
        };
    })();

    const generateLocaleSearchIndex = (localeCode) => {
        const searchEntries = [];
        eeatData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: p.EEAT_NAME, EXCERPT: p.EEAT_META_SEO, HREF: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_SLUG}` }));
        authorData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: `${p.WWW_AUTHOR} — ${p.EEAT_NAME_20_SINGULAR}`, EXCERPT: p.AUTHOR_FULL_BIO, IMAGE: `${SITE_URL}${p.AUTHOR_PROFILE_IMAGE_PATH}`, HREF: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_URL_20}/${p.WWW_AUTHOR_SLUG}` }));
        articleData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: p.ARTICLE_NAME, EXCERPT: p.ARTICLE_META_SEO, HREF: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_2_LISTING_SLUG}/${p.ARTICLE_SLUG}` }));
        productData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => searchEntries.push({ TITLE: p.PRODUCT_NAME, EXCERPT: p.PRODUCT_META_SEO, IMAGE: `${SITE_URL}${p.PRODUCT_IMAGE_PATH_S}`, HREF: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_1_LISTING_SLUG}/${p.PRODUCT_ASCII_SLUG}` }));
        return searchEntries;
    };

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
  } finally {
    // Ensure the database connection is always closed
    if (db) {
      db.close();
    }
  }
}