import { readFileSync, readdirSync, statSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import wwwData from '../data/www.json' assert { type: 'json' };

const www = wwwData[0];

const SITE_URL = www.PAGE_FULL_PERMALINK;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const PAGES_DIR = path.join(process.cwd(), 'src/pages');

// --- Helper function to read JSON files robustly ---
const readJsonFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

// --- Import your JSON data using the robust method ---
const localesData = readJsonFile('src/data/locale.json');
const homeData = readJsonFile('src/data/home.json');
const eeatData = readJsonFile('src/data/eeat.json');
const authorData = readJsonFile('src/data/author.json');
const articleData = readJsonFile('src/data/article.json');
const productData = readJsonFile('src/data/product.json');

// --- Helper Functions ---

const formatLastMod = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) {
    return new Date().toISOString();
  }
  return new Date(`${dateStr}T${timeStr}`).toISOString();
};

const generateSitemapIndex = (finalLocales) => {
  const sitemapLinks = finalLocales
    .map(locale => {
      const lastmod = new Date().toISOString();
      return `
    <sitemap>
      <loc>${SITE_URL}/sitemap-${locale.M_HREFLANG_CODE}.xml</loc>
      <lastmod>${lastmod}</lastmod>
    </sitemap>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapLinks}
</sitemapindex>`;
};

const generateLocaleSitemap = (localeCode) => {
  const urlEntries = [];

  // 1. Home Pages
  homeData
    .filter(page => page.PAGE_LOCALE === localeCode)
    .forEach(page => {
      urlEntries.push({
        loc: `${SITE_URL}/${page.M_SLUG}`,
        lastmod: formatLastMod(page.DATE_UPDATED, page.HOME_HOUR_UPDATED),
        changefreq: 'daily',
        priority: 1.0,
      });
    });

  // 2. EEAT Pages
  eeatData
    .filter(page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1")
    .forEach(page => {
      urlEntries.push({
        loc: `${SITE_URL}/${page.M_SLUG}/${page.EEAT_SLUG}`,
        lastmod: formatLastMod(page.EEAT_DATE_UPDATED, page.EEAT_HOUR_UPDATED),
        changefreq: 'yearly',
        priority: 0.4,
      });
    });

  // 3. Author Pages
  authorData
    .filter(page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1")
    .forEach(page => {
      urlEntries.push({
        loc: `${SITE_URL}/${page.M_SLUG}/${page.EEAT_URL_20}/${page.WWW_AUTHOR_SLUG}`,
        lastmod: formatLastMod(page.AUTHOR_DATE_UPDATED, page.AUTHOR_HOUR_UPDATED),
        changefreq: 'monthly',
        priority: 0.6,
      });
    });

  // 4. Article Pages and Category Page
  const publishedArticles = articleData.filter(
    page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1"
  );
  if (publishedArticles.length > 0) {
    publishedArticles.forEach(page => {
      urlEntries.push({
        loc: `${SITE_URL}/${page.M_SLUG}/${page.ARTICLE_LIST_SLUG}/${page.ARTICLE_SLUG}`,
        lastmod: formatLastMod(page.ARTICLE_UPDATE_DATE, page.ARTICLE_HOUR_UPDATED),
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
    const firstArticle = publishedArticles[0];
    const mostRecentArticle = publishedArticles.sort((a, b) => new Date(formatLastMod(b.ARTICLE_UPDATE_DATE, b.ARTICLE_HOUR_UPDATED)).getTime() - new Date(formatLastMod(a.ARTICLE_UPDATE_DATE, a.ARTICLE_HOUR_UPDATED)).getTime())[0];
    urlEntries.push({
      loc: `${SITE_URL}/${firstArticle.M_SLUG}/${firstArticle.ARTICLE_LIST_SLUG}`,
      lastmod: formatLastMod(mostRecentArticle.ARTICLE_UPDATE_DATE, mostRecentArticle.ARTICLE_HOUR_UPDATED),
      changefreq: 'weekly',
      priority: 0.9,
    });
  }

  // 5. Product Pages and Category Page
  const publishedProducts = productData.filter(
    page => page.PAGE_LOCALE === localeCode && page.PUBLISH_Y_N === "1"
  );
  if (publishedProducts.length > 0) {
    publishedProducts.forEach(page => {
      urlEntries.push({
        loc: `${SITE_URL}/${page.M_SLUG}/${page.PRODUCT_CATEGORY_1_SLUG}/${page.PRODUCT_ASCII_SLUG}`,
        lastmod: formatLastMod(page.PRODUCT_DATE_UPDATED, page.PRODUCT_HOUR_UPDATED),
        changefreq: 'weekly',
        priority: 0.9,
      });
    });
    const firstProduct = publishedProducts[0];
    const mostRecentProduct = publishedProducts.sort((a, b) => new Date(formatLastMod(b.PRODUCT_DATE_UPDATED, b.PRODUCT_HOUR_UPDATED)).getTime() - new Date(formatLastMod(a.PRODUCT_DATE_UPDATED, a.PRODUCT_HOUR_UPDATED)).getTime())[0];
    urlEntries.push({
      loc: `${SITE_URL}/${firstProduct.M_SLUG}/${firstProduct.PRODUCT_CATEGORY_1_SLUG}`,
      lastmod: formatLastMod(mostRecentProduct.PRODUCT_DATE_UPDATED, mostRecentProduct.PRODUCT_HOUR_UPDATED),
      changefreq: 'weekly',
      priority: 0.9,
    });
  }

  const urlset = urlEntries
    .map(entry => `
    <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>${entry.changefreq}</changefreq>
        <priority>${entry.priority.toFixed(1)}</priority>
    </url>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}
</urlset>`;
};

// --- Main Execution Logic ---

async function main() {
  console.log('🚀 Generating sitemaps...');

  // Scan `src/pages` for existing locale directories
  const existingLocaleDirs = readdirSync(PAGES_DIR).filter(file => {
    try {
      return statSync(path.join(PAGES_DIR, file)).isDirectory();
    } catch (e) {
      return false;
    }
  });
  console.log(`🔎 Found existing page directories: [${existingLocaleDirs.join(', ')}]`);

  // Filter locales based on BOTH conditions
  const finalLocalesToBuild = localesData.filter(locale => {
    const isPublished = locale.M_LOCALE_PUBLISH_Y_N === "1";
    const directoryExists = existingLocaleDirs.includes(locale.M_SLUG);
    
    if (isPublished && !directoryExists) {
        console.warn(`⚠️  Skipping locale '${locale.M_HREFLANG_CODE}': It's marked for publishing, but the directory 'src/pages/${locale.M_SLUG}/' does not exist.`);
    }
    
    return isPublished && directoryExists;
  });

  if (finalLocalesToBuild.length === 0) {
    console.warn('No locales to build sitemaps for. Please check your `locale.json` and `src/pages` directories.');
    return;
  }
  
  console.log(`✅ Identified locales to build sitemaps for: [${finalLocalesToBuild.map(l => l.M_HREFLANG_CODE).join(', ')}]`);

  try {
    // Generate and write the main sitemap index using the filtered list
    const sitemapIndexXml = generateSitemapIndex(finalLocalesToBuild);
    await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndexXml);
    console.log('✅ Generated sitemap.xml');

    // Generate a sitemap for each of the FINAL, validated locales
    for (const locale of finalLocalesToBuild) {
      const localeCode = locale.M_HREFLANG_CODE;
      const localeSitemapXml = generateLocaleSitemap(localeCode);
      const fileName = `sitemap-${localeCode}.xml`;
      await writeFile(path.join(PUBLIC_DIR, fileName), localeSitemapXml);
      console.log(`✅ Generated ${fileName}`);
    }

    console.log('✨ Sitemap generation complete!');
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

main();