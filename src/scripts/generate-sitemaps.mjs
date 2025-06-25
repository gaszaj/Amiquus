// src/scripts/generate-sitemaps.mjs

import { writeFile } from 'fs/promises';
import path from 'path';
import Database from 'better-sqlite3';

// --- Configuration ---
const SITE_URL = 'https://eusignal.netlify.app';
const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');
const DB_PATH = path.join(CWD, 'src/data/data.db');

// --- Helper to format date ---
const formatLastMod = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) {
    // Return a consistent recent timestamp if data is missing
    return new Date().toISOString();
  }
  // Ensure time string is in HH:MM:SS format
  const formattedTime = timeStr.length === 5 ? `${timeStr}:00` : timeStr;
  return new Date(`${dateStr}T${formattedTime}`).toISOString();
};

// --- Main Exported Function ---
export async function generateSitemaps(logger) {
  logger.info('🚀 Generating sitemaps...');
  let db;
  try {
    // --- Database Connection and Data Fetching ---
    db = new Database(DB_PATH, { readonly: true });

    // Fetch all necessary data from the database in a single transaction for performance.
    const { 
        locales, 
        homeData, 
        eeatData, 
        authorData, 
        articleData, 
        productData 
    } = db.transaction(() => {
        const locales = db.prepare("SELECT M_HREFLANG_CODE FROM locale WHERE M_LOCALE_PUBLISH_Y_N = '1'").all();
        
        // Select only the columns needed for sitemaps to reduce memory usage.
        const home = db.prepare('SELECT PAGE_LOCALE, M_SLUG, HOME_DATE_UPDATED, HOME_HOUR_UPDATED FROM home').all();
        const eeat = db.prepare("SELECT PAGE_LOCALE, M_SLUG, EEAT_SLUG, EEAT_DATE_UPDATED, EEAT_HOUR_UPDATED FROM eeat WHERE PUBLISH_Y_N = '1'").all();
        const author = db.prepare("SELECT PAGE_LOCALE, M_SLUG, EEAT_URL_20, WWW_AUTHOR_SLUG, AUTHOR_DATE_UPDATED, AUTHOR_HOUR_UPDATED FROM author WHERE PUBLISH_Y_N = '1'").all();
        const article = db.prepare("SELECT PAGE_LOCALE, M_SLUG, PAGE_COLLECTION_2_LISTING_SLUG, ARTICLE_SLUG, ARTICLE_UPDATE_DATE, ARTICLE_HOUR_UPDATED FROM article WHERE PUBLISH_Y_N = '1'").all();
        const product = db.prepare("SELECT PAGE_LOCALE, M_SLUG, PAGE_COLLECTION_1_LISTING_SLUG, PRODUCT_ASCII_SLUG, PRODUCT_DATE_UPDATED, PRODUCT_HOUR_UPDATED FROM product WHERE PUBLISH_Y_N = '1'").all();

        return { locales, homeData: home, eeatData: eeat, authorData: author, articleData: article, productData: product };
    })();
    
    // --- Sitemap Generation Logic ---
    const generateSitemapIndex = () => {
      const sitemapLinks = locales
        .map(locale => `<sitemap><loc>${SITE_URL}/sitemap-${locale.M_HREFLANG_CODE}.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`)
        .join('');
      return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapLinks}</sitemapindex>`;
    };
    
    const generateLocaleSitemap = (localeCode) => {
      const urlEntries = [];

      // Filter data for the current locale
      const localeHome = homeData.filter(p => p.PAGE_LOCALE === localeCode);
      const localeEeat = eeatData.filter(p => p.PAGE_LOCALE === localeCode);
      const localeAuthors = authorData.filter(p => p.PAGE_LOCALE === localeCode);
      const localeArticles = articleData.filter(p => p.PAGE_LOCALE === localeCode);
      const localeProducts = productData.filter(p => p.PAGE_LOCALE === localeCode);
      
      // Home page
      localeHome.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}`, lastmod: formatLastMod(p.HOME_DATE_UPDATED, p.HOME_HOUR_UPDATED), changefreq: 'weekly', priority: 1.0 }));
      
      // EEAT pages
      localeEeat.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_SLUG}`, lastmod: formatLastMod(p.EEAT_DATE_UPDATED, p.EEAT_HOUR_UPDATED), changefreq: 'yearly', priority: 0.4 }));
      
      // Author pages
      localeAuthors.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.EEAT_URL_20}/${p.WWW_AUTHOR_SLUG}`, lastmod: formatLastMod(p.AUTHOR_DATE_UPDATED, p.AUTHOR_HOUR_UPDATED), changefreq: 'monthly', priority: 0.6 }));
      
      // Article pages and listing
      if (localeArticles.length > 0) {
        localeArticles.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_2_LISTING_SLUG}/${p.ARTICLE_SLUG}`, lastmod: formatLastMod(p.ARTICLE_UPDATE_DATE, p.ARTICLE_HOUR_UPDATED), changefreq: 'monthly', priority: 0.8 }));
        const mostRecentArticle = [...localeArticles].sort((a, b) => new Date(formatLastMod(b.ARTICLE_UPDATE_DATE, b.ARTICLE_HOUR_UPDATED)).getTime() - new Date(formatLastMod(a.ARTICLE_UPDATE_DATE, a.ARTICLE_HOUR_UPDATED)).getTime())[0];
        urlEntries.push({ loc: `${SITE_URL}/${localeArticles[0].M_SLUG}/${localeArticles[0].PAGE_COLLECTION_2_LISTING_SLUG}`, lastmod: formatLastMod(mostRecentArticle.ARTICLE_UPDATE_DATE, mostRecentArticle.ARTICLE_HOUR_UPDATED), changefreq: 'weekly', priority: 0.9 });
      }

      // Product pages and listing
      if (localeProducts.length > 0) {
        localeProducts.forEach(p => urlEntries.push({ loc: `${SITE_URL}/${p.M_SLUG}/${p.PAGE_COLLECTION_1_LISTING_SLUG}/${p.PRODUCT_ASCII_SLUG}`, lastmod: formatLastMod(p.PRODUCT_DATE_UPDATED, p.PRODUCT_HOUR_UPDATED), changefreq: 'monthly', priority: 0.9 }));
        const mostRecentProduct = [...localeProducts].sort((a, b) => new Date(formatLastMod(b.PRODUCT_DATE_UPDATED, b.PRODUCT_HOUR_UPDATED)).getTime() - new Date(formatLastMod(a.PRODUCT_DATE_UPDATED, a.PRODUCT_HOUR_UPDATED)).getTime())[0];
        urlEntries.push({ loc: `${SITE_URL}/${localeProducts[0].M_SLUG}/${localeProducts[0].PAGE_COLLECTION_1_LISTING_SLUG}`, lastmod: formatLastMod(mostRecentProduct.PRODUCT_DATE_UPDATED, mostRecentProduct.PRODUCT_HOUR_UPDATED), changefreq: 'monthly', priority: 0.9 });
      }

      const urlset = urlEntries.map(entry => `<url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority.toFixed(1)}</priority></url>`).join('');
      return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`;
    };

    // --- Execution Logic ---
    const sitemapIndexXml = generateSitemapIndex();
    await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndexXml);
    logger.info('✅ Generated sitemap.xml');

    for (const locale of locales) {
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
  } finally {
    // Ensure the database connection is always closed.
    if (db) {
      db.close();
    }
  }
}