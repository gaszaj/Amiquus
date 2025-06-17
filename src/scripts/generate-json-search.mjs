// Path: src/scripts/generate-json-search.mjs
// Purpose: Generate JSON search index files for each locale containing searchable content
// Data: JSON dependencies from data directory
// Dependencies: fs, path

import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

// --- Configuration ---
const SITE_URL = 'https://eusignal.netlify.app';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// --- Helper function to read JSON files robustly ---
const readJsonFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

// --- Import JSON data ---
const localesData = readJsonFile('src/data/locale.json');
const eeatData = readJsonFile('src/data/eeat.json');
const authorData = readJsonFile('src/data/author.json');
const articleData = readJsonFile('src/data/article.json');
const productData = readJsonFile('src/data/product.json');

// --- Helper function to generate search index for a locale ---
const generateLocaleSearchIndex = (localeCode) => {
  const searchEntries = [];

  // 1. EEAT Pages
  eeatData
    .filter(page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1")
    .forEach(page => {
      searchEntries.push({
        TITLE: page.EEAT_NAME,
        EXCERPT: page.EEAT_META_SEO,
        HREF: `${SITE_URL}/${page.M_SLUG}/${page.EEAT_SLUG}`
      });
    });

  // 2. Author Pages
  authorData
    .filter(page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1")
    .forEach(page => {
      searchEntries.push({
        TITLE: `${page.WWW_AUTHOR} — ${page.EEAT_NAME_20_SINGULAR}`,
        EXCERPT: page.AUTHOR_FULL_BIO,
        IMAGE: `${SITE_URL}${page.AUTHOR_PROFILE_IMAGE_PATH}`,
        HREF: `${SITE_URL}/${page.M_SLUG}/${page.EEAT_URL_20}/${page.WWW_AUTHOR_SLUG}`
      });
    });

  // 3. Article Pages
  const publishedArticles = articleData.filter(
    page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1"
  );
  if (publishedArticles.length > 0) {
    publishedArticles.forEach(page => {
      searchEntries.push({
        TITLE: page.ARTICLE_NAME,
        EXCERPT: page.ARTICLE_META_SEO,
        HREF: `${SITE_URL}/${page.M_SLUG}/${page.ARTICLE_LIST_SLUG}/${page.ARTICLE_SLUG}`
      });
    });
  }

  // 4. Product Pages
  const publishedProducts = productData.filter(
    page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1"
  );
  if (publishedProducts.length > 0) {
    publishedProducts.forEach(page => {
      searchEntries.push({
        TITLE: page.PRODUCT_NAME,
        EXCERPT: page.PRODUCT_META_SEO,
        IMAGE: `${SITE_URL}${page.PRODUCT_IMAGE_PATH_S}`,
        HREF: `${SITE_URL}/${page.M_SLUG}/${page.PRODUCT_CATEGORY_1_SLUG}/${page.PRODUCT_ASCII_SLUG}`
      });
    });
  }

  return searchEntries;
};

// --- Main Execution Logic ---
async function main() {
  console.log('🚀 Generating JSON search indexes...');
  try {
    // Find all published locales and generate a search index for each
    const publishedLocales = localesData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    
    for (const locale of publishedLocales) {
      const localeCode = locale.M_HREFLANG_CODE;
      const searchIndex = generateLocaleSearchIndex(localeCode);
      const fileName = `index-${localeCode}.json`;
      
      // Write the search index to a JSON file
      await writeFile(
        path.join(PUBLIC_DIR, fileName),
        JSON.stringify(searchIndex, null, 2)
      );
      console.log(`✅ Generated ${fileName}`);
    }

    console.log('✨ JSON search index generation complete!');
  } catch (error) {
    console.error('❌ Error generating JSON search indexes:', error);
    process.exit(1);
  }
}

// Run the script
main();
