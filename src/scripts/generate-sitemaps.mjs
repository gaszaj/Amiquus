// src/scripts/generate-sitemaps.mjs

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

// --- Helper to format date ---
const formatLastMod = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) {
    return new Date().toISOString();
  }
  return new Date(`${dateStr}T${timeStr}`).toISOString();
};

// --- Main Exported Function ---
// This function will be called by our Astro integration.
export async function generateSitemaps(logger) {
  logger.info('🚀 Generating sitemaps...');
  try {
    // Read data at the time of execution
    const localesData = readJsonFile('src/data/locale.json');
    const homeData = readJsonFile('src/data/home.json');
    const eeatData = readJsonFile('src/data/eeat.json');
    const authorData = readJsonFile('src/data/author.json');
    const articleData = readJsonFile('src/data/article.json');
    const productData = readJsonFile('src/data/product.json');
    
    // --- Sitemap Generation Logic ---
    // FIX: The duplicate, empty declarations have been removed.
    
    const generateSitemapIndex = () => {
      const publishedLocales = localesData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
      const sitemapLinks = publishedLocales
        .map(locale => `<sitemap><loc>${SITE_URL}/sitemap-${locale.M_HREFLANG_CODE}.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`)
        .join('');
      return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapLinks}</sitemapindex>`;
    };
    
    const generateLocaleSitemap = (localeCode) => {
      const urlEntries = [];
      homeData.filter(p => p.PAGE_LOCALE === localeCode).forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}`, lastmod: formatLastMod(p.DATE_UPDATED, p.HOME_HOUR_UPDATED), changefreq: 'weekly', priority: 1.0 }));
      eeatData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_SLUG}`, lastmod: formatLastMod(p.EEAT_DATE_UPDATED, p.EEAT_HOUR_UPDATED), changefreq: 'yearly', priority: 0.4 }));
      authorData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1").forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_URL_20}/${p.WWW_AUTHOR_SLUG}`, lastmod: formatLastMod(p.AUTHOR_DATE_UPDATED, p.AUTHOR_HOUR_UPDATED), changefreq: 'monthly', priority: 0.6 }));
      
      const publishedArticles = articleData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1");
      if (publishedArticles.length > 0) {
        publishedArticles.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_2_LISTING_SLUG}/${p.ARTICLE_SLUG}`, lastmod: formatLastMod(p.ARTICLE_UPDATE_DATE, p.ARTICLE_HOUR_UPDATED), changefreq: 'monthly', priority: 0.8 }));
        const mostRecentArticle = publishedArticles.sort((a, b) => new Date(formatLastMod(b.ARTICLE_UPDATE_DATE, b.ARTICLE_HOUR_UPDATED)).getTime() - new Date(formatLastMod(a.ARTICLE_UPDATE_DATE, a.ARTICLE_HOUR_UPDATED)).getTime())[0];
        urlEntries.push({ loc: `${SITE_URL}/${publishedArticles[0].M_SLUG}/${publishedArticles[0].PAGE_COLLECTION_2_LISTING_SLUG}`, lastmod: formatLastMod(mostRecentArticle.ARTICLE_UPDATE_DATE, mostRecentArticle.ARTICLE_HOUR_UPDATED), changefreq: 'weekly', priority: 0.9 });
      }

      const publishedProducts = productData.filter(p => p.PAGE_LOCALE === localeCode && p.PUBLISH_Y_N === "1");
      if (publishedProducts.length > 0) {
        publishedProducts.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_1_LISTING_SLUG}/${p.PRODUCT_ASCII_SLUG}`, lastmod: formatLastMod(p.PRODUCT_DATE_UPDATED, p.PRODUCT_HOUR_UPDATED), changefreq: 'monthly', priority: 0.9 }));
        const mostRecentProduct = publishedProducts.sort((a, b) => new Date(formatLastMod(b.PRODUCT_DATE_UPDATED, b.PRODUCT_HOUR_UPDATED)).getTime() - new Date(formatLastMod(a.PRODUCT_DATE_UPDATED, a.PRODUCT_HOUR_UPDATED)).getTime())[0];
        urlEntries.push({ loc: `${SITE_URL}/${publishedProducts[0].M_SLUG}/${publishedProducts[0].PAGE_COLLECTION_1_LISTING_SLUG}`, lastmod: formatLastMod(mostRecentProduct.PRODUCT_DATE_UPDATED, mostRecentProduct.PRODUCT_HOUR_UPDATED), changefreq: 'monthly', priority: 0.9 });
      }

      const urlset = urlEntries.map(entry => `<url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`).join('');
      return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`;
    };

    // --- Execution Logic ---
    const sitemapIndexXml = generateSitemapIndex();
    await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndexXml);
    logger.info('✅ Generated sitemap.xml');

    const publishedLocales = localesData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    for (const locale of publishedLocales) {
      const localeCode = locale.M_HREFLANG_CODE;
      const localeSitemapXml = generateLocaleSitemap(localeCode);
      const fileName = `sitemap-${localeCode}.xml`;
      await writeFile(path.join(PUBLIC_DIR, fileName), localeSitemapXml);
      logger.info(`✅ Generated ${fileName}`);
    }

    logger.info('✨ Sitemap generation complete!');
  } catch (error) {
    logger.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}