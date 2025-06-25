In my Astro.js project my src folder looks like this:
src/
├─ actions/
│  └─ index.ts
├─ components/
│  ├─ Cookie.astro
│  ├─ Footer.astro
│  ├─ Header.astro
│  └─ Schema.astro
├─ data/
│  ├─ article.json
│  ├─ author.json
│  ├─ common.json
│  ├─ eeat.json
│  ├─ headerfooter.json
│  ├─ home.json
│  ├─ locale.json
│  ├─ product.json
│  ├─ site.webmanifest.json
│  └─ www.json
├─ json/
│  ├─ article.json
│  ├─ author.json
│  ├─ common.json
│  ├─ eeat.json
│  ├─ headerfooter.json
│  ├─ home.json
│  ├─ locale.json
│  ├─ product.json
│  ├─ site.webmanifest.json
│  └─ www.json
├─ layouts/
│  └─ BaseLayout.astro
├─ pages/
│  ├─ es/
│  │  ├─ articulos/
│  │  │  ├─ [articleSlug].astro
│  │  │  └─ index.astro
│  │  ├─ autores-y-editores/
│  │  │  └─ [authorSlug].astro
│  │  ├─ piramide-de-senalizacion/
│  │  │  ├─ [productSlug].astro
│  │  │  └─ index.astro
│  │  ├─ _uspeh.astro
│  │  ├─ [EEATslug].astro
│  │  └─ index.astro
│  ├─ hr/
│  │  ├─ autori-i-urednici/
│  │  │  └─ [authorSlug].astro
│  │  ├─ clanci/
│  │  │  ├─ [articleSlug].astro
│  │  │  └─ index.astro
│  │  ├─ piramida-upozorenja/
│  │  │  ├─ [productSlug].astro
│  │  │  └─ index.astro
│  │  ├─ _uspeh.astro
│  │  ├─ [EEATslug].astro
│  │  └─ index.astro
│  ├─ si/
│  │  ├─ avtorji-in-uredniki/
│  │  │  └─ [authorSlug].astro
│  │  ├─ clanki/
│  │  │  ├─ [articleSlug].astro
│  │  │  └─ index.astro
│  │  ├─ opozorilna-piramida/
│  │  │  ├─ [productSlug].astro
│  │  │  └─ index.astro
│  │  ├─ _uspeh.astro
│  │  ├─ [EEATslug].astro
│  │  └─ index.astro
│  ├─ 404.astro
│  └─ index.astro
├─ scripts/
│  ├─ generate-json-search.mjs
│  ├─ generate-llms-txt.mjs
│  ├─ generate-sitemaps.mjs
│  ├─ json-processor.mjs
│  ├─ manage-locales.mjs
│  ├─ OG_ALL.mjs
│  ├─ OG_article.mjs
│  ├─ OG_author.mjs
│  ├─ OG_category.mjs
│  ├─ OG_eeat.mjs
│  ├─ OG_home.mjs
│  ├─ OG_product.mjs
│  ├─ product-image-processor.mjs
│  └─ run-scripts.md
└─ styles/
   └─ fonts.css


In src\actions\index.ts I have a form handling script. In src\json I have raw and unprocessed data that i store in bunch of .json files. I then clean, optimize and minify these files with this script src\scripts\json-processor.mjs. This script then places optimized data in src/data and keep the same names. You Will notice that all .astro files use a very dynamic approach where 100% of the data comes from .json files in src/data - nothing is hardcoded, even aria labels are defined in .json files. 

Here's my src\components\Cookie.astro file:
###
---
import commonData from '../data/common.json';

// --- No changes to the script setup ---
const locale = Astro.url.pathname.split('/')[1] || 'si';
const currentLocaleData = commonData.find(item => item.M_SLUG === locale) || commonData[0];
const title = currentLocaleData.COOKIE_TITLE || 'We value your privacy';
const description = currentLocaleData.COOKIE_DESCRIPTION || 'We use cookies...';
const linkText = currentLocaleData.COOKIE_LINK_TEXT || 'Read our Cookie Policy';
const policyUrl = `/${locale}/${currentLocaleData.EEAT_SLUG_COOKIE_POLICY || 'cookie-policy'}`;
const buttonAcceptAll = currentLocaleData.COOKIE_BUTTON_ACCEPT_ALL || 'Accept All';
const buttonCustomize = currentLocaleData.COOKIE_BUTTON_CUSTOMIZE || 'Customize';
const buttonDecline = currentLocaleData.COOKIE_BUTTON_DECLINE || 'Decline';
const ariaClose = currentLocaleData.COOKIE_ARIA_CLOSE || 'Close cookie settings';
const ariaOpenSettings = currentLocaleData.COOKIE_ARIA_OPEN_SETTINGS || 'Open cookie settings';
const customizeTitle = currentLocaleData.COOKIE_CUSTOMIZE_TITLE || 'Customize Consent Preferences';
const customizeDescription = currentLocaleData.COOKIE_CUSTOMIZE_DESCRIPTION || 'We use cookies...';
const buttonSave = currentLocaleData.COOKIE_BUTTON_SAVE || 'Save Preferences';
const essentialTitle = currentLocaleData.COOKIE_CATEGORY_ESSENTIAL_TITLE || 'Strictly Necessary';
const essentialDesc = currentLocaleData.COOKIE_CATEGORY_ESSENTIAL_DESC || 'Necessary cookies...';
const analyticsTitle = currentLocaleData.COOKIE_CATEGORY_ANALYTICS_TITLE || 'Analytics';
const analyticsDesc = currentLocaleData.COOKIE_CATEGORY_ANALYTICS_DESC || 'Analytical cookies...';
const marketingTitle = currentLocaleData.COOKIE_CATEGORY_MARKETING_TITLE || 'Marketing';
const marketingDesc = currentLocaleData.COOKIE_CATEGORY_MARKETING_DESC || 'Advertisement cookies...';
const alwaysActiveLabel = currentLocaleData.COOKIE_ALWAYS_ACTIVE_LABEL || 'Always Active';
---

<!-- CHANGE 1: Replaced `left-4` with logical property `start-4` for RTL support. -->
<div id="cookie-container" class="fixed bottom-4 start-4 z-50">
  <button id="cookie-settings-trigger" class="hidden h-10 w-10 bg-signal-dark rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-signal-green focus:ring-offset-2 focus:ring-offset-signal-light" aria-label={ariaOpenSettings}><div class="w-8 h-8"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><g fill="#BCEF2F" fill-opacity="0" stroke="#BCEF2F" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="56" stroke-dashoffset="56" d="M12 4c-4.42 0 -8 3.58 -8 8c0 4.42 3.58 8 8 8c4.42 0 8 -3.58 8 -8v-1h-2c-0.55 0 -1 -0.45 -1 -1v-1h-2c-0.55 0 -1 -0.45 -1 -1v-1h-1c-0.55 0 -1 -0.45 -1 -1Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.84s" dur="0.18s" values="0;0.25"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="56;0"/></path><g stroke="none"><circle cx="9.5" cy="7.5" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.08s" dur="0.24s" values="0;1"/></circle><circle cx="11" cy="17.5" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.24s" values="0;1"/></circle><circle cx="6.5" cy="11.5" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.32s" dur="0.24s" values="0;1"/></circle><circle cx="16.5" cy="14.5" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.44s" dur="0.24s" values="0;1"/></circle><circle cx="11.5" cy="12.5" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.56s" dur="0.24s" values="0;1"/></circle></g></g></svg></div></button>
  <div id="cookie-consent-banner" class="fixed bottom-0 inset-x-0 p-4 bg-signal-dark text-signal-light shadow-[0_-5px_15px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-in-out transform translate-y-full" role="dialog" aria-live="polite" aria-label={title} aria-describedby="cookie-description">
    <div id="cookie-initial-view" class=""><div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div class="text-sm md:flex-grow"><h2 class="font-bold text-lg mb-1 text-signal-green">{title}</h2><p id="cookie-description" class="text-gray-300">{description} <a href={policyUrl} class="underline hover:text-white transition-colors">{linkText}</a>.</p></div><div class="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-2 mt-4 md:mt-0"><button id="cookie-accept-btn" class="w-full sm:w-auto px-6 py-2 bg-signal-green text-black font-bold border border-signal-green hover:bg-opacity-90 transition-all rounded-md">{buttonAcceptAll}</button><button id="cookie-customize-btn" class="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white font-bold border border-gray-600 hover:bg-gray-600 transition-all rounded-md">{buttonCustomize}</button><button id="cookie-decline-btn" class="w-full sm:w-auto px-6 py-2 bg-transparent text-gray-300 font-bold border border-gray-600 hover:bg-gray-800 transition-all rounded-md">{buttonDecline}</button></div></div></div>
    <div id="cookie-details-view" class="hidden"><div class="container mx-auto max-h-[80vh] overflow-y-auto"><div class="flex justify-between items-start mb-4"><div><h2 class="font-bold text-lg text-signal-green">{customizeTitle}</h2><p class="text-sm text-gray-300 max-w-3xl">{customizeDescription}</p></div><button id="cookie-close-details-btn" class="p-1 text-gray-400 hover:text-white" aria-label={ariaClose}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="space-y-4 border-t border-b border-gray-700 py-4 my-4"><div class="flex justify-between items-start gap-4 py-2"><div><h3 class="font-semibold text-white">{essentialTitle}</h3><p class="text-sm text-gray-400">{essentialDesc}</p></div>
    <!-- CHANGE 2: Replaced `ml-4` with logical property `ms-4`. -->
    <div class="flex-shrink-0 ms-4 pt-1"><span class="inline-block px-3 py-1 text-xs font-medium text-signal-green bg-gray-900 rounded-full">{alwaysActiveLabel}</span></div></div><div class="border-t border-gray-700/50 flex justify-between items-start gap-4 py-3"><div><h3 class="font-semibold text-white">{analyticsTitle}</h3><p class="text-sm text-gray-400">{analyticsDesc}</p></div>
    <!-- CHANGE 2 & 3: Replaced `ml-4` with `ms-4` and updated toggle switch classes for RTL support. -->
    <div class="flex-shrink-0 ms-4 pt-1"><label for="cookie-analytics" class="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="cookie-analytics" class="sr-only peer" checked>
    <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-signal-green/50 peer-checked:bg-signal-green peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] rtl:after:right-[2px] rtl:after:left-auto after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div></div><div class="border-t border-gray-700/50 flex justify-between items-start gap-4 py-3"><div><h3 class="font-semibold text-white">{marketingTitle}</h3><p class="text-sm text-gray-400">{marketingDesc}</p></div>
    <!-- CHANGE 2 & 3: Replaced `ml-4` with `ms-4` and updated toggle switch classes for RTL support. -->
    <div class="flex-shrink-0 ms-4 pt-1"><label for="cookie-marketing" class="relative inline-flex items-center cursor-pointer"><input type="checkbox" id="cookie-marketing" class="sr-only peer" checked>
    <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-signal-green/50 peer-checked:bg-signal-green peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] rtl:after:right-[2px] rtl:after:left-auto after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div></div></div><div class="flex flex-col sm:flex-row gap-2"><button id="cookie-save-prefs-btn" class="px-6 py-2 bg-signal-green text-black font-bold border border-signal-green hover:bg-opacity-90 transition-all rounded-md">{buttonSave}</button><button id="cookie-accept-all-details-btn" class="px-6 py-2 bg-gray-700 text-white font-bold border border-gray-600 hover:bg-gray-600 transition-all rounded-md">{buttonAcceptAll}</button></div></div></div>
  </div>
</div>

<script is:inline>
// --- No changes to the script logic ---
document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const settingsTrigger = document.getElementById('cookie-settings-trigger');
    const banner = document.getElementById('cookie-consent-banner');
    const initialView = document.getElementById('cookie-initial-view');
    const detailsView = document.getElementById('cookie-details-view');

    // --- Buttons ---
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const customizeBtn = document.getElementById('cookie-customize-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');
    const closeDetailsBtn = document.getElementById('cookie-close-details-btn');
    const savePrefsBtn = document.getElementById('cookie-save-prefs-btn');
    const acceptAllDetailsBtn = document.getElementById('cookie-accept-all-details-btn');
    
    // --- Checkboxes ---
    const analyticsCheckbox = document.getElementById('cookie-analytics');
    const marketingCheckbox = document.getElementById('cookie-marketing');

    // --- State & Config ---
    const CONSENT_GIVEN_KEY = 'cookie_consent_given';
    const PREFS_KEY = 'cookie_consent_prefs';
    let isBannerOpen = false;

    // --- Core Functions ---
    const showBanner = () => {
        if (!banner || isBannerOpen) return;
        isBannerOpen = true;
        if (settingsTrigger) settingsTrigger.classList.remove('hidden'); 
        banner.style.transform = 'translateY(0)';
        if (settingsTrigger) setTimeout(() => settingsTrigger.style.transform = 'scale(0)', 10);
    };

    const hideBanner = () => {
        if (!banner || !isBannerOpen) return;
        isBannerOpen = false;
        banner.style.transform = 'translateY(100%)';
        if (settingsTrigger) {
            settingsTrigger.classList.remove('hidden');
            settingsTrigger.style.transform = 'scale(1)';
        }
    };

    /**
     * Records the user's consent choice and preferences to localStorage.
     */
    const recordConsent = (consentType, preferences) => {
        console.log(`Consent given: ${consentType}`, preferences);
        localStorage.setItem(CONSENT_GIVEN_KEY, 'true'); 
        localStorage.setItem(PREFS_KEY, JSON.stringify(preferences)); 
        hideBanner();
    };

    // --- Event Handlers for Making Choices ---
    const handleAcceptAll = () => {
        const prefs = { analytics: true, marketing: true };
        analyticsCheckbox.checked = true;
        marketingCheckbox.checked = true;
        recordConsent('all', prefs);
    };
    
    const handleDecline = () => {
        const prefs = { analytics: false, marketing: false };
        analyticsCheckbox.checked = false;
        marketingCheckbox.checked = false;
        recordConsent('declined', prefs);
    };

    const handleSavePrefs = () => {
        const prefs = {
            analytics: analyticsCheckbox.checked,
            marketing: marketingCheckbox.checked,
        };
        recordConsent('custom', prefs);
    };

    // --- UI State Changers ---
    const showDetails = () => {
        if (detailsView) detailsView.classList.remove('hidden');
        if (initialView) initialView.classList.add('hidden');
    };
    
    const showInitial = () => {
        if (detailsView) detailsView.classList.add('hidden');
        if (initialView) initialView.classList.remove('hidden');
    };
    
    /**
     * Reads preferences from localStorage and updates the checkboxes.
     */
    const applyStoredPreferences = () => {
        const prefsString = localStorage.getItem(PREFS_KEY);
        if (!prefsString) return;

        try {
            const prefs = JSON.parse(prefsString);
            if (prefs && typeof prefs.analytics === 'boolean' && typeof prefs.marketing === 'boolean') {
                analyticsCheckbox.checked = prefs.analytics;
                marketingCheckbox.checked = prefs.marketing;
            }
        } catch (e) {
            console.error("Could not parse cookie preferences from localStorage", e);
            localStorage.removeItem(PREFS_KEY); // Clean up corrupted data
        }
    };

    // --- INITIALIZATION LOGIC ---
    // 1. Apply any stored preferences to the UI first.
    applyStoredPreferences();

    // 2. Decide whether to show the banner or just the icon.
    const consentGiven = localStorage.getItem(CONSENT_GIVEN_KEY) === 'true';

    if (consentGiven) {
        // User has already made a choice. Show only the trigger icon.
        if (settingsTrigger) settingsTrigger.classList.remove('hidden');
    } else {
        // This is a first-time visit.
        if (window.innerWidth >= 768) { // Desktop
            setTimeout(showBanner, 1000);
        } else { // Mobile
            if (settingsTrigger) settingsTrigger.classList.remove('hidden');
        }
    }
    
    // --- EVENT LISTENERS ---
    if(settingsTrigger) settingsTrigger.addEventListener('click', showBanner);
    
    if(acceptBtn) acceptBtn.addEventListener('click', handleAcceptAll);
    if(declineBtn) declineBtn.addEventListener('click', handleDecline);
    if(savePrefsBtn) savePrefsBtn.addEventListener('click', handleSavePrefs);
    if(acceptAllDetailsBtn) acceptAllDetailsBtn.addEventListener('click', handleAcceptAll); // Also use accept all logic here
    
    if(customizeBtn) customizeBtn.addEventListener('click', showDetails);
    if(closeDetailsBtn) closeDetailsBtn.addEventListener('click', showInitial);
});
</script>
###

Here's my src\components\Footer.astro file:
####
---
// Import JSON data
import headerFooterData from '../data/headerfooter.json';
import commonData from '../data/common.json';
import eeatData from '../data/eeat.json';
import products from '../data/product.json';
import wwwData from '../data/www.json';
import * as flags from 'country-flag-icons/string/3x2';

const currentYear = new Date().getFullYear();

// Get current locale from URL path
const currentPath = Astro.url.pathname;
const localeMatch = currentPath.match(/^\/([a-z]{2}(?:-[a-z]{2})?)/);
const currentLocale = localeMatch ? localeMatch[1] : 'si';

// Get country code from locale (handle cases like 'de-ch' -> 'ch')
const getCountryCode = (locale: string) => {
  const parts = locale.split('-');
  return parts.length > 1 ? parts[1].toUpperCase() : locale.toUpperCase();
};

// Find matching data for current locale
const headerFooter = headerFooterData.find(data => data.M_SLUG === currentLocale) || headerFooterData[0];
const common = commonData.find(data => data.M_SLUG === currentLocale) || commonData[0];
const www = wwwData[0];

// Get current country flag
const currentCountryCode = getCountryCode(currentLocale);
const currentCountryFlag = flags[currentCountryCode as keyof typeof flags];

// Helper function to get EEAT pages by filtering number
const getEeatPages = (filteringNumbers: string[]) => {
  return eeatData
    .filter(page => 
      // First filter by current locale
      page.M_SLUG === currentLocale &&
      // Then filter by the provided filtering numbers
      filteringNumbers.includes(page.EEAT_FILTERING)
    )
    .map(page => ({
      text: page.EEAT_NAME,
      href: `/${currentLocale}/${page.EEAT_SLUG}`
    }));
};

// Helper function to get product by ID
const getProductById = (productId: string) => {
  return products.find(product => 
    product.PRODUCT_ID === productId && 
    product.M_SLUG === currentLocale
  );
};

// Filter and sort bestsellers based on criteria for specific locale
const bestSellers = products
  .filter(product => 
    product.PUBLISH_Y_N === "1" && 
    product.PRODUCT_IS_BESTSELLER === "1" &&
    product.M_SLUG === currentLocale
  )
  .sort((a, b) => {
    // First sort by importance rank (descending)
    const rankDiff = parseInt(b.PRODUCT_IMPORTANCE_RANK) - parseInt(a.PRODUCT_IMPORTANCE_RANK);
    if (rankDiff !== 0) return rankDiff;
    // If ranks are equal, randomize
    return Math.random() - 0.5;
  })
  .slice(0, 6) // Get top 6 bestsellers for footer
  .map(product => ({
    text: product.PRODUCT_NAME,
    href: `/${product.M_SLUG}/${product.PAGE_COLLECTION_1_LISTING_SLUG}/${product.PRODUCT_ASCII_SLUG}`
  }));

// Define footer navigation groups with exact EEAT page mapping
const footerNavGroups = [
  {
    title: headerFooter.FOOTER_EEAT_GROUP_1, // Podjetje
    links: getEeatPages(['18', '21', '14', '22', '20', '19'])
  },
  {
    title: headerFooter.FOOTER_EEAT_GROUP_2, // Podpora
    links: getEeatPages(['16', '15', '17', '26', '11', '08'])
  },
  {
    title: headerFooter.FOOTER_EEAT_GROUP_3, // Sodelovanja
    links: getEeatPages(['24', '25', '23', '09', '10'])
  },
  {
    title: headerFooter.FOOTER_EEAT_GROUP_4, // Pravilniki
    links: getEeatPages(['03', '04', '05', '06', '07', '12', '13', '28', '27'])
  }
];

// Social media links (now includes TikTok, YouTube, Pinterest, Bluesky)
const socialLinks = [
  { name: 'LinkedIn', url: common.PAGE_LINKEDIN_URL, icon: 'linkedin' },
  { name: 'Facebook', url: common.PAGE_FACEBOOK_URL, icon: 'facebook' },
  { name: 'Twitter', url: common.PAGE_TWITTER_URL, icon: 'twitter' },
  { name: 'Instagram', url: common.PAGE_INSTAGRAM_URL, icon: 'instagram' },
  { name: 'TikTok', url: common.PAGE_TIKTOK_URL, icon: 'tiktok' },
  { name: 'YouTube', url: common.PAGE_YOUTUBE_URL, icon: 'youtube' },
  { name: 'Pinterest', url: common.PAGE_PINTEREST_URL, icon: 'pinterest' },
  { name: 'Bluesky', url: common.PAGE_BLUESKY_URL, icon: 'bluesky' }
];

// Bundles
const bundles = [
  { text: headerFooter.FOOTER_BUNDLES_NAME_1, href: headerFooter.FOOTER_BUNDLES_PATH_1 },
  { text: headerFooter.FOOTER_BUNDLES_NAME_2, href: headerFooter.FOOTER_BUNDLES_PATH_2 },
  { text: headerFooter.FOOTER_BUNDLES_NAME_3, href: headerFooter.FOOTER_BUNDLES_PATH_3 },
  { text: headerFooter.FOOTER_BUNDLES_NAME_4, href: headerFooter.FOOTER_BUNDLES_PATH_4 },
  { text: headerFooter.FOOTER_BUNDLES_NAME_5, href: headerFooter.FOOTER_BUNDLES_PATH_5 },
  { text: headerFooter.FOOTER_BUNDLES_NAME_6, href: headerFooter.FOOTER_BUNDLES_PATH_6 }
];
---

<footer class="bg-black text-white pt-12 pb-6">
  <div class="container mx-auto px-4">
    <!-- Top Footer Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <!-- Company Info -->
      <div class="lg:col-span-2">
        <img 
        src={www.PAGE_LOGO_IMAGE_PATH_1.replace('public', '')} 
        alt={headerFooter.HEADER_LOGO_ALT}
        class="h-6 w-auto"
        style="max-height: 50px; height: auto; width: auto;"
        width="939"
        height="161"
        loading="lazy"
      />
        <p class="mb-4 text-signal-green">{common.PAGE_SLOGAN}</p>
        <!-- Social Links -->
        <!-- CHANGE 1: Replaced `space-x-4` with direction-agnostic `gap-4` for RTL support. -->
        <div class="flex gap-4 mt-6">
          {socialLinks.map(social => (
            <a href={social.url} target="_blank" rel="noopener" class="text-gray-300 hover:text-signal-green transition-colors" aria-label={social.name}>
  {social.icon === 'linkedin' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )}
  {social.icon === 'facebook' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  )}
  {social.icon === 'twitter' && ( // X icon
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z">
        <animate fill="freeze" attributeName="d" dur="0.96s" keyTimes="0;0.3;0.5;1" values="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M1 2h2.5L18.5 22h-2.5zM5.5 2h2.5L23 22h-2.5zM3 2h5v2h-5zM16 20h5v2h-5zM18.5 2h3.5L5 22h-3.5z"/>
      </path>
    </svg>
  )}
  {social.icon === 'instagram' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <circle cx="17" cy="7" r="1.5" fill="currentColor" fill-opacity="0">
        <animate fill="freeze" attributeName="fill-opacity" begin="1.56s" dur="0.18s" values="0;1"/>
      </circle>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path stroke-dasharray="72" stroke-dashoffset="72" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="72;0"/>
        </path>
        <path stroke-dasharray="28" stroke-dashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.84s" dur="0.72s" values="28;0"/>
        </path>
      </g>
    </svg>
  )}
  {social.icon === 'tiktok' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <mask id="lineMdTiktok0">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path fill="currentColor" stroke="none" d="M16.6 5.82c-0.68 -0.78 -1.06 -1.78 -1.06 -2.82h-3.09v12.4c-0.02 0.67 -0.31 1.31 -0.79 1.77c-0.48 0.47 -1.13 0.73 -1.8 0.73c-1.42 0 -2.6 -1.16 -2.6 -2.6c0 -1.72 1.66 -3.01 3.37 -2.48v-3.16c-3.45 -0.46 -6.47 2.22 -6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69 -2.55 5.69 -5.7v-6.29c1.25 0.9 2.76 1.38 4.3 1.38v-3.09c0 0 -1.88 0.09 -3.24 -1.48Z"/>
          <path stroke="#000" stroke-dasharray="36" stroke-dashoffset="72" stroke-width="4" d="M11 11h-1c-2.21 0 -4.5 1.79 -4.5 4c0 2.21 1.5 4.5 4.5 4.5c2.21 0 4 -2.29 4 -4.5v-12.5">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="72;36"/>
          </path>
          <path stroke="#000" stroke-dasharray="10" stroke-dashoffset="20" stroke-width="4" d="M18 2.5v8">
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.12s" values="20;10"/>
          </path>
        </g>
      </mask>
      <rect width="24" height="24" fill="currentColor" mask="url(#lineMdTiktok0)"/>
    </svg>
  )}
  {social.icon === 'youtube' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <mask id="lineMdYoutubeFilled0">
        <g fill="none" fill-opacity="0" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path fill="currentColor" stroke-dasharray="64" stroke-dashoffset="64" d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z">
            <animate fill="freeze" attributeName="fill-opacity" begin="0.72s" dur="0.6s" values="0;1"/>
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="64;0"/>
          </path>
          <path fill="#000" stroke="none" d="M12 11L12 12L12 13z">
            <animate fill="freeze" attributeName="d" begin="1.32s" dur="0.24s" values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"/>
            <set fill="freeze" attributeName="fill-opacity" begin="1.32s" to="1"/>
          </path>
        </g>
      </mask>
      <rect width="24" height="24" fill="currentColor" mask="url(#lineMdYoutubeFilled0)"/>
    </svg>
  )}
  {social.icon === 'pinterest' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2A10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34c-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41c.86 0 1.26.63 1.26 1.44c0 .86-.57 2.09-.86 3.27c-.17.98.52 1.84 1.52 1.84c1.78 0 3.16-1.9 3.16-4.58c0-2.4-1.72-4.04-4.19-4.04c-2.82 0-4.48 2.1-4.48 4.31c0 .86.28 1.73.74 2.3c.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11c-1.28-.56-2.02-2.38-2.02-3.85c0-3.16 2.24-6.03 6.56-6.03c3.44 0 6.12 2.47 6.12 5.75c0 3.44-2.13 6.2-5.18 6.2c-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7z"/>
    </svg>
  )}
  {social.icon === 'bluesky' && (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 11.388c-.906-1.761-3.372-5.044-5.665-6.662c-2.197-1.55-3.034-1.283-3.583-1.033C2.116 3.978 2 4.955 2 5.528c0 .575.315 4.709.52 5.4c.68 2.28 3.094 3.05 5.32 2.803c-3.26.483-6.157 1.67-2.36 5.898c4.178 4.325 5.726-.927 6.52-3.59c.794 2.663 1.708 7.726 6.444 3.59c3.556-3.59.977-5.415-2.283-5.898c2.225.247 4.64-.523 5.319-2.803c.205-.69.52-4.825.52-5.399c0-.575-.116-1.55-.752-1.838c-.549-.248-1.386-.517-3.583 1.033c-2.293 1.621-4.76 4.904-5.665 6.664"/>
    </svg>
  )}
</a>
          ))}
        </div>
      </div>

      <!-- Bestsellers -->
      <div>
        <h4 class="text-lg font-medium mb-4 text-signal-green">{headerFooter.FOOTER_BESTSELLERS_GROUP}</h4>
        <ul class="space-y-2">
          {bestSellers.map(link => (
            <li>
              <a 
                href={link.href} 
                class="text-gray-300 hover:text-signal-green transition-colors"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Bundles -->
      <div>
        <h4 class="text-lg font-medium mb-4 text-signal-green">{headerFooter.FOOTER_BUNDLES_GROUP}</h4>
        <ul class="space-y-2">
          {bundles.map(link => (
            <li>
              <a 
                href={link.href} 
                class="text-gray-300 hover:text-signal-green transition-colors"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-800 my-8"></div>

    <!-- Bottom Footer Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Navigation Groups -->
      {footerNavGroups.map(group => (
        <div>
          <h4 class="text-lg font-medium mb-4 text-signal-green">{group.title}</h4>
          <ul class="space-y-2">
            {group.links.map(link => (
              <li>
                <a 
                  href={link.href} 
                  class="text-gray-300 hover:text-signal-green transition-colors"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <!-- Contact Info -->
    <div class="border-t border-gray-800 mt-8 pt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-start">
          <!-- CHANGE 2: Replaced `mr-3` with logical property `me-3` for RTL support. -->
          <div class="flex-shrink-0 me-3 text-signal-green">
            <!-- Map Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="9" r="2.5" fill="currentColor" fill-opacity="0">
                <animate fill="freeze" attributeName="fill-opacity" begin="0.84s" dur="0.18s" values="0;1"/>
              </circle>
              <path fill="none" stroke="currentColor" stroke-dasharray="48" stroke-dashoffset="48" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20.5c0 0 -6 -7 -6 -11.5c0 -3.31 2.69 -6 6 -6c3.31 0 6 2.69 6 6c0 4.5 -6 11.5 -6 11.5Z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="48;0"/>
                <animateTransform attributeName="transform" dur="3.6s" keyTimes="0;0.3;0.4;0.54;0.6;0.68;0.7;1" repeatCount="indefinite" type="rotate" values="0 12 20.5;0 12 20.5;-8 12 20.5;0 12 20.5;5 12 20.5;-2 12 20.5;0 12 20.5;0 12 20.5"/>
              </path>
            </svg>
          </div>
          <div>
            <h5 class="font-medium mb-1">{common.M_ADDRESS}</h5>
            <address class="text-gray-300 not-italic">
              {www.PAGE_COMPANY_NAME_GLOBAL}<br>
              {www.PAGE_STREET_ADDRESS_GLOBAL}<br>
              {www.PAGE_POSTAL_CITY_GLOBAL}, {www.PAGE_COUNTRY_GLOBAL}
            </address>
          </div>
        </div>

        <div class="flex items-start">
          <!-- CHANGE 2: Replaced `mr-3` with logical property `me-3` for RTL support. -->
          <div class="flex-shrink-0 me-3 text-signal-green">
            <!-- Email Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path stroke-dasharray="64" stroke-dashoffset="64" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="64;0"/>
              </path>
              <path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.72s" dur="0.24s" values="24;0"/>
              </path>
            </svg>
          </div>
          <div>
            <h5 class="font-medium mb-1">{common.M_EMAIL_ADDRESS_LABEL}</h5>
            <p class="text-gray-300">
              <a href={`mailto:${common.PAGE_INFO_EMAIL}`} class="hover:text-signal-green transition-colors">
                {common.PAGE_INFO_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- DMCA Badge -->
    <div class="flex justify-center mt-8 mb-4">
      <a href="//www.dmca.com/Protection/Status.aspx?id=d16a2101-9f06-4e74-8c8d-df2cc670a14d" title="DMCA.com Protection Status" class="dmca-badge">
        <img 
          src="//images.dmca.com/Badges/dmca-badge-w150-5x1-01.png?ID=ffc6513c-d641-46db-a978-452d6279c143" 
          alt="DMCA.com Protection Status"
          width="150"  
          height="30"
          loading="lazy" 
        />
      </a>
      <script is:inline src="//images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
    </div>

    <!-- Copyright -->
    <div class="border-t border-gray-800 mt-8 pt-6">
      <div class="flex flex-col items-center text-center">
        <p class="text-gray-400 text-sm">
          <span class="block md:inline">© {currentYear} <span class="text-signal-green">{common.PAGE_ORGANISATION_FULL_NAME} {common.M_BRAND_LABEL}</span></span>
          <span class="hidden md:inline mx-2">|</span>
          <span class="block md:inline mt-2 md:mt-0">{common.M_COPYRIGHT}</span>
        </p>
        
        <!-- New row for country flags with proper mobile breakpoint -->
        <div class="text-gray-400 text-sm mt-4">
          <p class="block md:inline">
            {common.PAGE_PROUD_1}
            <!-- CHANGE 3: Replaced `ml-2` with logical property `ms-2` for RTL support. -->
            <span class="inline-block ms-2 w-6 h-4" set:html={flags.SI}></span>
          </p>
          <p class="block md:inline mt-2 md:mt-0">
            {common.PAGE_PROUD_2}
            <!-- CHANGE 3: Replaced `ml-2` with logical property `ms-2` for RTL support. -->
            <span class="inline-block ms-2 w-6 h-4" set:html={currentCountryFlag}></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
####

Here's my src\components\Header.astro file:
#####
---
// Import JSON data
import headerFooterData from '../data/headerfooter.json';
import { 
  AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, 
  CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, 
  ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, 
  HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, 
  LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, 
  OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, 
  SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA 
} from 'country-flag-icons/string/3x2';
import commonData from '../data/common.json';
import localeData from '../data/locale.json';
import wwwData from '../data/www.json';

export interface Props {
  alternativeLinks?: Array<{
    code: string;
    country: string;
    name: string;
    languageIso: string;
    hreflang: string;
    href: string;
  }>;
  languageLinksMap?: Record<string, string>;
    locale?: string;
}

const { alternativeLinks, languageLinksMap = {}, locale: propLocale } = Astro.props;

// Get the locale from the URL path (e.g., 'si' from /si/...)
const locale = propLocale || Astro.url.pathname.split('/')[1] || 'si'; 

// Find the matching headerFooter and common data objects based on M_SLUG
const headerFooter = headerFooterData.find(item => item.M_SLUG === locale) || headerFooterData[0];
const common = commonData.find(item => item.M_SLUG === locale) || commonData[0];
const www = wwwData[0];

// Define default English texts for aria-labels (these will be used if common.json doesn't provide specific translations)
let ariaLabelSearch1 = "Open mobile menu";
let ariaLabelSearch2 = "Search";
let ariaLabelSearch3 = "Close search";

// If a matching locale object is found, use its translations, otherwise stick to English defaults
if (common) {
  ariaLabelSearch1 = common.PAGE_SEARCH_ARIA_LABEL_SEARCH_1 || ariaLabelSearch1;
  ariaLabelSearch2 = common.PAGE_SEARCH_ARIA_LABEL_SEARCH_2 || ariaLabelSearch2;
  ariaLabelSearch3 = common.PAGE_SEARCH_ARIA_LABEL_SEARCH_3 || ariaLabelSearch3;
}

// Header component for the EU Signal website
const navigation = [
  { name: common.M_HOME_NAME, href: `/${locale}` },
  { name: headerFooter.HEADER_LINK_NAME_1, href: `/${locale}${headerFooter.HEADER_LINK_PATH_1}` },
  { name: headerFooter.HEADER_LINK_NAME_2, href: `/${locale}${headerFooter.HEADER_LINK_PATH_2}` },
  { name: headerFooter.HEADER_LINK_NAME_3, href: `/${locale}${headerFooter.HEADER_LINK_PATH_3}` },
];

// Find the hreflang code for the current locale to fetch the correct search index
const currentLocaleData = localeData.find(l => l.M_SLUG === locale);
// Use the HREFLANG_CODE which matches your JSON file names (e.g., 'sl-si')
const hreflangCode = currentLocaleData ? currentLocaleData.M_HREFLANG_CODE : 'sl-si'; // Provide a sensible fallback

// --- Language Switcher Logic ---
const supportedLocales = localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");

// Map country codes to their corresponding flag components
const flagMap = {
  AE, AL, AM, AO, AR, AT, AU, AZ, BA, BD, BE, BG, BH, BJ, BO, BR, BS, BW, BY, BZ, 
  CA, CG, CH, CI, CL, CM, CO, CR, CU, CW, CY, CZ, DE, DJ, DK, DO, DZ, EC, EE, EG, 
  ES, FI, FJ, FR, GA, GB, GE, GH, GI, GM, GN, GP, GR, GT, GU, GY, HK, HN, HR, HT, 
  HU, ID, IE, IL, IN, IS, IT, JM, JO, JP, KE, KR, KW, KY, LB, LI, LS, LT, LU, LV, 
  LY, MA, MC, MD, ME, MK, MM, MN, MR, MU, MW, MX, MY, MZ, NG, NI, NL, NO, NP, NZ, 
  OM, PA, PE, PH, PK, PL, PR, PT, PY, QA, RO, RS, RU, SA, SB, SE, SG, SI, SK, SL, 
  SM, SN, SR, SV, SZ, TD, TH, TN, TR, TT, UA, UG, US, UY, VE, VN, YT, ZA
};

// Create the final supported languages array with flags
const languageLinks = supportedLocales.map(langLocale => ({
  code: langLocale.M_SLUG,
  name: langLocale.M_LANGUAGE_NATIVE,
  flag: flagMap[langLocale.M_COUNTRY_CODE as keyof typeof flagMap],
  href: languageLinksMap[langLocale.M_SLUG] || `/${langLocale.M_SLUG}`,
  isActive: langLocale.M_SLUG === locale
}));

const currentLanguageObject = languageLinks.find(lang => lang.code === locale) ||
                            languageLinks.find(lang => lang.code === 'si') || // Fallback to 'si'
                            languageLinks[0]; // Final fallback
---

<header class="header-transparent">
  <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a
      href={`/${locale}`}
      class="flex items-center"
      id="header-logo-link"
    >
      <img
        src={www.PAGE_LOGO_IMAGE_PATH_1.replace('public', '')}
        alt={headerFooter.HEADER_LOGO_ALT}
        class="h-6 w-auto"
        style="max-height: 25px; height: auto; width: auto;"
        fetchpriority="high"
        width="939"
        height="161"
      />
      <span class="sr-only">{common.M_HOME_NAME}</span>
    </a>

    <!-- Desktop Navigation & Language Switcher -->
    <!-- CHANGE 1: Replaced `space-x-8` with `gap-x-8` for better flexbox spacing. -->
    <div class="hidden md:flex items-center gap-x-8">
      {navigation.map(item => (
        <a
          href={item.href}
          class="text-gray-300 hover:text-white transition-colors"
        >
          {item.name}
        </a>
      ))}
      
      <!-- Desktop Search Button -->
      <button 
        type="button" 
        id="desktop-search-button" 
        class="search-icon-btn" 
        aria-label={common.PAGE_SEARCH_SEARCH_LABEL}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path stroke-dasharray="40" stroke-dashoffset="40" d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="40;0"/>
            </path>
            <path stroke-dasharray="12" stroke-dashoffset="12" d="M10.5 13.5l-7.5 7.5">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.24s" values="12;0"/>
            </path>
          </g>
        </svg>
      </button>

      <a
        href={`/${locale}${headerFooter.HEADER_NAME_CTA_PATH}`}
        class="bg-black text-signal-green border border-signal-green px-6 py-2 hover:bg-signal-green hover:text-black transition-all duration-200"
      >
        {headerFooter.HEADER_NAME_CTA}
      </a>

      <!-- Desktop Language Dropdown Switcher -->
      <!-- CHANGE 2: Used logical properties `ms-6 ps-6 border-s` for RTL support. -->
      <div class="relative ms-6 ps-6 border-s border-gray-600" id="desktop-lang-switcher-container">
        <button
          type="button"
          id="desktop-lang-button"
          class="flex items-center text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <!-- CHANGE 3: Used logical margin `me-1` -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 me-1" viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="38" d="M48 112h288M192 64v48m80 336l96-224l96 224m-162.5-64h133M281.3 112S257 206 199 277S80 384 80 384"/>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="38" d="M256 336s-35-27-72-75s-56-85-56-85"/>
          </svg>
          <span class="flex items-center">
            <!-- CHANGE 3: Used logical margin `me-1` -->
            {currentLanguageObject.flag && <span class="me-1 w-6 h-4" set:html={currentLanguageObject.flag} />}
            <span>{currentLanguageObject.name}</span>
          </span>
          <!-- CHANGE 3: Used logical margins `ms-1 -me-1` -->
          <svg class="ms-1 -me-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
        <!-- CHANGE 4: Used `end-0 origin-top-end` for RTL dropdown alignment. -->
        <div
          id="desktop-lang-dropdown"
          class="absolute end-0 mt-2 w-48 origin-top-end rounded-md shadow-lg bg-gray-800/80 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none hidden z-20"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="desktop-lang-button"
        >
          <div class="py-1 max-h-60 overflow-y-auto" role="none">
            {languageLinks.map(lang => (
              <a
                href={lang.href}
                class:list={[
                  "block px-4 py-2 text-sm transition-colors",
                  lang.isActive
                    ? "bg-gray-700 text-white font-semibold cursor-default"
                    : "text-gray-300 hover:bg-gray-600 hover:text-white"
                ]}
                role="menuitem"
                title={lang.name}
              >
                <span class="flex items-center">
                  <!-- CHANGE 3: Used logical margin `me-2` -->
                  {lang.flag && <span class="me-2 w-6 h-4" set:html={lang.flag} />} {lang.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Controls -->
    <div class="flex items-center md:hidden">
        <!-- CHANGE 5: Used logical margin `me-4` -->
        <button 
            type="button" 
            id="mobile-search-button" 
            class="search-icon-btn me-4" 
            aria-label={common.PAGE_SEARCH_SEARCH_LABEL}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="40" stroke-dashoffset="40" d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="40;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M10.5 13.5l-7.5 7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.24s" values="12;0"/></path></g></svg>
        </button>
        <button
            type="button"
            class="text-gray-300 hover:text-white"
            aria-label={ariaLabelSearch1}
            id="mobile-menu-button"
        >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
    </div>
  </nav>

  <!-- Mobile Navigation -->
  <div class="md:hidden hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <!-- Mobile Search Form -->
      <div class="px-1 py-2">
        <div class="relative">
          <input 
            type="search" 
            id="mobile-menu-search-input"
            name="q-mobile" 
            placeholder={common.PAGE_SEARCH_PLACEHOLDER}
            class="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 text-base rounded-md py-2 ps-4 pe-10 focus:ring-signal-green focus:border-signal-green transition"
          >
          <!-- CHANGE 7: Used logical positioning `inset-y-0 end-0 ... pe-3` -->
          <div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
          </div>
        </div>
      </div>

      {navigation.map(item => (
        <a
          href={item.href}
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {item.name}
        </a>
      ))}

      <!-- Mobile Language Dropdown Switcher -->
      <div class="pt-4 pb-2 border-t border-gray-700 mt-2">
        <button
          type="button"
          id="mobile-lang-button"
          class="flex justify-between items-center w-full px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          aria-expanded="false"
          aria-controls="mobile-lang-dropdown-list"
        >
          <span class="flex items-center">
            <!-- CHANGE 3: Used logical margin `me-1` -->
            {currentLanguageObject.flag && <span class="me-1 w-6 h-4" set:html={currentLanguageObject.flag} />}
            {currentLanguageObject.name}
          </span>
          <!-- CHANGE 3: Used logical margin `ms-1` -->
          <svg class="ms-1 h-5 w-5 transform transition-transform duration-150" id="mobile-lang-chevron" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
        </button>
        <!-- CHANGE 8: Used logical padding `ps-3` -->
        <div id="mobile-lang-dropdown-list" class="mt-1 space-y-1 ps-3 hidden max-h-52 overflow-y-auto">
          {languageLinks.map(lang => (
            <a
              href={lang.href}
              class:list={[
                "block ps-3 pe-4 py-2 border-s-4 text-base font-medium transition-colors rounded-e-md",
                lang.isActive
                  ? "bg-gray-600 border-signal-green text-white cursor-default"
                  : "border-transparent text-gray-400 hover:bg-gray-700 hover:border-gray-500 hover:text-white"
              ]}
              role="menuitem"
              title={lang.name}
            >
              <span class="flex items-center">
                <!-- CHANGE 3: Used logical margin `me-2` -->
                {lang.flag && <span class="me-2 w-6 h-4" set:html={lang.flag} />} {lang.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <a
        href={headerFooter.HEADER_NAME_CTA_PATH}
        class="block mt-4 mx-1 px-3 py-2 bg-black text-signal-green border border-signal-green hover:bg-signal-green hover:text-black transition-all duration-200 text-center rounded-md"
      >
        {headerFooter.HEADER_NAME_CTA}
      </a>
    </div>
  </div>
</header>

<!-- Search Overlay -->
<div 
  id="search-overlay" 
  class="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm z-40 hidden items-start justify-center pt-20 md:pt-32" 
  aria-hidden="true" 
  data-zero-results={common.PAGE_SEARCH_ZERO_RESULTS}
  data-one-result={common.PAGE_SEARCH_ONE_RESULT}
  data-many-results={common.PAGE_SEARCH_MANY_RESULTS}
  data-searching={common.PAGE_SEARCH_SEARCHING}
  data-load-more={common.PAGE_SEARCH_LOAD_MORE}
  data-load-all={common.PAGE_SEARCH_LOAD_ALL}
>
  <div class="relative w-full max-w-2xl px-4">
    <form class="relative" role="search" onsubmit="event.preventDefault();">
      <label for="search-input" class="sr-only">{common.PAGE_SEARCH_SEARCH_LABEL}</label>
      <input
        type="search"
        id="search-input"
        name="q"
        placeholder={common.PAGE_SEARCH_PLACEHOLDER}
        class="w-full bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-400 text-xl rounded-lg py-4 ps-6 pe-28 focus:ring-signal-green focus:border-signal-green transition-colors duration-200"
        autocomplete="off"
      />
      <!-- CHANGE 11: Used logical positioning `end-[68px]` -->
      <button 
        type="button" 
        id="clear-search-button" 
        class="absolute inset-y-0 end-[68px] hidden items-center text-gray-500 hover:text-red-500 transition-colors" 
        aria-label={common.PAGE_SEARCH_CLEAR_SEARCH}
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <!-- CHANGE 12: Used logical positioning `end-0 ... pe-5` -->
      <button
        type="submit"
        class="absolute inset-y-0 end-0 flex items-center pe-5 text-gray-400 hover:text-signal-green transition-colors"
        aria-label={ariaLabelSearch2}
      >
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
        </svg>
      </button>
    </form>

    <!-- Search Results & Status Area -->
    <div id="search-results-area" class="relative mt-2 bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hidden">
      <div id="search-status" class="px-4 py-2 text-sm text-gray-400 border-b border-gray-700"></div>
      <div id="search-results" class="max-h-[50vh] overflow-y-auto">
        <!-- Results will be injected here by JS -->
      </div>
      <div id="search-footer" class="hidden border-t border-gray-700 text-center">
        <!-- "View all" link will be injected here -->
      </div>
    </div>

    <!-- CHANGE 13: Used logical positioning `-end-0 md:-end-12` -->
    <button 
      id="search-overlay-close-button" 
      class="absolute -top-12 -end-0 md:-end-12 text-gray-400 hover:text-white" 
      aria-label={ariaLabelSearch3}
    >
      <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</div>

<script define:vars={{ hreflangCode }} is:inline>
  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // --- Desktop Language Dropdown ---
  const desktopLangButton = document.getElementById('desktop-lang-button');
  const desktopLangDropdown = document.getElementById('desktop-lang-dropdown');
  const desktopLangSwitcherContainer = document.getElementById('desktop-lang-switcher-container');

  if (desktopLangButton && desktopLangDropdown && desktopLangSwitcherContainer) {
    desktopLangButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isExpanded = desktopLangButton.getAttribute('aria-expanded') === 'true';
      desktopLangButton.setAttribute('aria-expanded', String(!isExpanded));
      desktopLangDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!desktopLangSwitcherContainer.contains(event.target) && desktopLangButton.getAttribute('aria-expanded') === 'true') {
        desktopLangButton.setAttribute('aria-expanded', 'false');
        desktopLangDropdown.classList.add('hidden');
      }
    });
  }

  // --- Mobile Language Dropdown ---
  const mobileLangButton = document.getElementById('mobile-lang-button');
  const mobileLangDropdownList = document.getElementById('mobile-lang-dropdown-list');
  const mobileLangChevron = document.getElementById('mobile-lang-chevron');

  if (mobileLangButton && mobileLangDropdownList && mobileLangChevron) {
    mobileLangButton.addEventListener('click', () => {
      const isExpanded = mobileLangButton.getAttribute('aria-expanded') === 'true';
      mobileLangButton.setAttribute('aria-expanded', String(!isExpanded));
      mobileLangDropdownList.classList.toggle('hidden');
      mobileLangChevron.classList.toggle('rotate-180');
    });
  }

  // --- Scroll Handler for Header Background ---
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-transparent');

    const updateHeaderBackground = () => {
      if (window.scrollY > 0) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', updateHeaderBackground);
    updateHeaderBackground(); // Initial check
  });

  // --- SEARCH COMPONENT LOGIC ---

  // Helper function to truncate text to a specific length and add ellipsis
  const truncateText = (text, maxLength) => {
    if (!text || typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Cache for our search index. It starts empty.
  let searchIndex = []; 
  // A promise to prevent multiple fetches if the user clicks fast.
  let searchIndexPromise = null; 

  async function loadSearchIndex() {
    // If the index is already loaded, do nothing.
    if (searchIndex.length > 0) return;
    
    // If we are already fetching, wait for the existing fetch to complete.
    if (searchIndexPromise) return searchIndexPromise;

    // Start fetching the data.
    searchIndexPromise = (async () => {
      try {
        // Construct the path to the correct localized JSON file.
        const response = await fetch(`/index-${hreflangCode}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Map the fetched data to a consistent, lowercase-key format for the script.
        searchIndex = data.map(item => ({
          title: item.TITLE,
          excerpt: item.EXCERPT,
          href: item.HREF,
          image: item.IMAGE 
        }));
        
      } catch (error) {
        console.error("Failed to load or parse search index:", error);
        // Handle the error by showing a message to the user.
        searchStatus.innerHTML = "Iskalnega indeksa ni bilo mogoče naložiti. Poskusite znova.";
        searchIndex = []; // Ensure it's empty on failure.
      }
    })();
    
    return searchIndexPromise;
  }

  const desktopSearchButton = document.getElementById('desktop-search-button');
  const mobileSearchButton = document.getElementById('mobile-search-button');
  const mobileMenuSearchInput = document.getElementById('mobile-menu-search-input');
  const searchOverlay = document.getElementById('search-overlay');
  const searchOverlayCloseButton = document.getElementById('search-overlay-close-button');
  const searchInput = document.getElementById('search-input');
  const clearSearchButton = document.getElementById('clear-search-button');
  const searchResultsArea = document.getElementById('search-results-area');
  const searchStatus = document.getElementById('search-status');
  const searchResults = document.getElementById('search-results');
  const searchFooter = document.getElementById('search-footer');
  let searchTimeout;

  if (searchOverlay) {
    const openSearch = async (prefillQuery = '') => {
      searchOverlay.classList.remove('hidden');
      searchOverlay.classList.add('flex');
      searchOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if(mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }

      // Trigger the lazy-loading of the search index on demand.
      await loadSearchIndex();

      if (prefillQuery) {
        searchInput.value = prefillQuery;
        // Only perform search if the index is loaded
        if (searchIndex.length > 0) performSearch(prefillQuery);
        clearSearchButton.classList.remove('hidden');
        clearSearchButton.classList.add('flex');
      }
      setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
      searchOverlay.classList.add('hidden');
      searchOverlay.classList.remove('flex');
      searchOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (mobileMenuSearchInput) {
        mobileMenuSearchInput.value = '';
      }
    };

    const clearSearch = () => {
      searchInput.value = '';
      clearSearchButton.classList.add('hidden');
      searchResultsArea.classList.add('hidden');
      searchResults.innerHTML = '';
      searchStatus.innerHTML = '';
      searchFooter.innerHTML = '';
      searchFooter.classList.add('hidden');
      searchInput.focus();
    };

    const performSearch = (query) => {
      // If index isn't loaded for some reason, inform the user and retry.
      if (searchIndex.length === 0 && query) {
         searchStatus.innerHTML = common.PAGE_SEARCH_INDEX_PROGRESS;
         loadSearchIndex().then(() => performSearch(query));
         return;
      }

      clearTimeout(searchTimeout);

      searchResultsArea.classList.remove('hidden');
      const searchingText = searchOverlay.dataset.searching.replace('[SEARCH_TERM]', `<em>${query}</em>`);
      searchStatus.innerHTML = searchingText;
      searchResults.innerHTML = '';
      searchFooter.classList.add('hidden');

      searchTimeout = setTimeout(() => {
        const results = searchIndex.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase())
        );

        let statusText = '';
        if (results.length === 0) {
          statusText = searchOverlay.dataset.zeroResults.replace('[SEARCH_TERM]', `<strong>${query}</strong>`);
        } else if (results.length === 1) {
          statusText = searchOverlay.dataset.oneResult.replace('[COUNT]', '1').replace('[SEARCH_TERM]', `<strong>${query}</strong>`);
        } else {
          statusText = searchOverlay.dataset.manyResults.replace('[COUNT]', results.length).replace('[SEARCH_TERM]', `<strong>${query}</strong>`);
        }
        searchStatus.innerHTML = statusText;

        const regex = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        const highlight = (text) => text.replace(
          regex,
          (match) => `<mark class="bg-signal-green text-black font-semibold px-1 py-0.5 rounded">${match}</mark>`
        );

        let resultsShown = 7;
        const showResults = (count) => {
          const resultsToShow = results.slice(0, count);
          // CHANGE 14: Use logical padding `ps-3` in the generated HTML for RTL support.
          searchResults.innerHTML = resultsToShow.map((item, idx) => `
            <a href="${item.href}" class="search-result-item group border-b border-white/20${idx === resultsToShow.length - 1 ? ' border-b-0' : ''} flex items-center py-2">
              <div class="search-result-image-container flex-shrink-0 w-9 h-9">
                ${item.image ? `<img src="${item.image}" alt="" class="search-result-image w-9 h-9" width="36" height="36" loading="lazy">` : '<div class="search-result-image-placeholder w-9 h-9"></div>'}
              </div>
              <div class="search-result-content flex flex-col justify-center ps-3 min-w-0">
                <div class="search-result-title text-white font-semibold leading-tight">${highlight(truncateText(item.title, 65))}</div>
                <div class="search-result-excerpt text-signal-green leading-snug">${highlight(truncateText(item.excerpt, 160))}</div>
              </div>
            </a>
          `).join('');
        };
        showResults(resultsShown);

        if (results.length > resultsShown) {
          searchFooter.innerHTML = `<button id="load-more-results" class="block w-full py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors">${searchOverlay.dataset.loadMore}</button>`;
          searchFooter.classList.remove('hidden');
          const loadMoreButton = document.getElementById('load-more-results');
          loadMoreButton.onclick = () => {
             resultsShown += 7;
             showResults(resultsShown);
             if (results.length <= resultsShown) {
                loadMoreButton.outerHTML = `<div class="block w-full py-3 text-sm text-gray-400">${searchOverlay.dataset.loadAll}</div>`;
             }
          };
        } else if (results.length > 0) {
          searchFooter.innerHTML = `<div class="block w-full py-3 text-sm text-gray-400">${searchOverlay.dataset.loadAll}</div>`;
          searchFooter.classList.remove('hidden');
        } else {
          searchFooter.innerHTML = '';
          searchFooter.classList.add('hidden');
        }
      }, 250);
    };

    desktopSearchButton?.addEventListener('click', () => openSearch());
    mobileSearchButton?.addEventListener('click', () => openSearch());
    searchOverlayCloseButton?.addEventListener('click', closeSearch);
    clearSearchButton?.addEventListener('click', clearSearch);

    mobileMenuSearchInput?.addEventListener('input', () => {
      const query = mobileMenuSearchInput.value.trim();
      if (query) {
        openSearch(query);
      }
    });

    searchInput?.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (query) {
        clearSearchButton.classList.remove('hidden');
        clearSearchButton.classList.add('flex');
        performSearch(query);
      } else {
        clearSearch();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
        closeSearch();
      }
    });

    searchOverlay.addEventListener('click', (event) => {
      if (event.target === searchOverlay) {
        closeSearch();
      }
    });
  }
</script>

<style>
  .header-transparent {
    position: sticky;
    top: 0;
    z-index: 30; /* Reduced to be below search overlay */
    background: rgb(0, 0, 0);
    transition: background-color 0.3s ease;
  }

  .header-scrolled {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .rotate-180 {
    transform: rotate(180deg);
  }

  /* Styling for scrollbars in dropdowns if content overflows */
  .max-h-60::-webkit-scrollbar,
  .max-h-52::-webkit-scrollbar {
    width: 8px;
  }

  .max-h-60::-webkit-scrollbar-track,
  .max-h-52::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .max-h-60::-webkit-scrollbar-thumb,
  .max-h-52::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  .max-h-60::-webkit-scrollbar-thumb:hover,
  .max-h-52::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  /* --- Search Component Styles --- */
  .search-icon-btn {
    color: #e5e7eb;
    transition: color 0.2s ease-in-out;
  }
  .search-icon-btn:hover {
    color: #BCEF2F;
  }
  .search-icon-btn:hover svg g {
    stroke: #BCEF2F;
  }

  /* Search result item with proper text colors */
  .search-result-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
    color: inherit;
  }
  .search-result-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  /* Image container for better alignment */
  .search-result-image-container {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    /* CHANGE 15: Used logical property `margin-inline-end` */
    margin-inline-end: 0.75rem;
  }

  .search-result-image {
    width: 40px;
    height: 40px;
    border-radius: 0.375rem;
    object-fit: cover;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .search-result-image-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 0.375rem;
    background-color: rgba(255, 255, 255, 0.05);
  }

  .search-result-content {
    flex-grow: 1;
    min-width: 0;
  }

  /* Ensure text colors are properly applied */
  .search-result-title {
    color: #f3f4f6 !important;
    font-weight: 500;
    font-size: 0.9375rem;
    line-height: 1.25rem;
    margin-bottom: 0.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-result-excerpt {
    color: #d1d5db !important;
    font-size: 0.875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-result-arrow {
    color: #6b7280;
    /* CHANGE 15: Used logical property `margin-inline-start` */
    margin-inline-start: 1rem;
    font-size: 1.125rem;
    transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  /* Hover state for arrow */
  .search-result-item:hover .search-result-arrow {
    color: #BCEF2F;
    transform: translateX(4px);
  }

  /* CHANGE 16: Added RTL rule for arrow transform */
  [dir="rtl"] .search-result-item:hover .search-result-arrow {
    transform: translateX(-4px);
  }

  /* Highlighting for search term */
  .search-highlight {
    background-color: #BCEF2F;
    color: #000;
    font-weight: 600;
    padding: 1px 2px;
    border-radius: 2px;
    font-style: normal;
  }

  /* Status text styling */
  #search-status em, 
  #search-status strong {
    font-style: normal;
    color: #fff;
    font-weight: 600;
  }

  /* Custom scrollbar for search results */
  #search-results::-webkit-scrollbar {
    width: 8px;
  }

  #search-results::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  #search-results::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  #search-results::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Hide default search input clear button */
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }
</style>
#####

Here's my src\components\Schema.astro file:
######
---
// Do NOT touch this file, leave it as it is.

interface Props {
  schema: object;
}

const { schema } = Astro.props;
---

<script type="application/ld+json" set:html={JSON.stringify(schema, null, 2)}></script>
######

Here's my src\layouts\BaseLayout.astro file:
#######
---
// Import JSON data
import wwwData from '../data/www.json';
const www = wwwData[0]; // Get the first (and only) object from wwwData array

import manifestData from '../data/site.webmanifest.json';
import allLocaleData from '../data/common.json'; // common.json is an array of locale objects

import '@fontsource-variable/inter';
import '../styles/fonts.css';
import Cookie from '../components/Cookie.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Schema from '../components/Schema.astro';

export interface Props {
  languageIso: string;
  countryCode: string;
  contentOrientation: string;
  title: string;
  description?: string;
  ogImage?: string;
  keywords?: string;
  locale?: string;
  schema?: object | null;
  alternativeLinks?: Array<{
    code: string;
    country: string;
    name: string;
    languageIso: string;
    hreflang: string;
    href: string;
  }>;
  languageLinksMap: Record<string, string>;
  currentSlug?: string;
}

const {
  languageIso,
  countryCode,
  contentOrientation,
  title,
  description,
  ogImage,
  keywords,
  locale = "sl-SI", // Default locale // This prop seems to be 'locale' not 'fullLocale'
  schema = null,
  alternativeLinks = null,
  languageLinksMap,
  currentSlug
} = Astro.props;

// Define default English texts (these will be used if common.json doesn't provide specific translations)
let socialSharingTitle = "Send this link to a friend";
let socialSharingCopyLabel = "Copy URL";
let socialSharingCopySuccess = "Copied!";
let socialSharingCopyFailure = "Error!";
let socialSharingCopyLoading = "Loading URL...";
let socialSharingAlternative = "Or share here:";

// Define default aria-labels (these will be used if common.json doesn't provide specific translations)
let ariaLabelFacebook = "Share on Facebook Messenger";
let ariaLabelWhatsapp = "Share on WhatsApp";
let ariaLabelTelegram = "Share on Telegram";
let ariaLabelEmail = "Share via Email";
let ariaLabelMoveToTop = "Move to top";

// Find the matching locale object from the imported array
const currentLocaleData = allLocaleData.find(locData => 
  locData.M_LANGUAGE_ISO === languageIso && 
  locData.M_COUNTRY_CODE === countryCode
);

if (currentLocaleData) {
  const currentSlug = currentLocaleData.M_SLUG;
  
  // Set a cookie with the user's last-known language slug.
  // This will be available on subsequent requests, including to the 404 page.
  Astro.cookies.set('last_lang', currentSlug, {
    path: '/', // Make the cookie available on the entire site
    maxAge: 60 * 60 * 24 * 365, // Store it for one year
  });
}

// If a matching locale object is found, use its translations, otherwise stick to English defaults
if (currentLocaleData) {
  socialSharingTitle = currentLocaleData.M_SOCIAL_SHARING_COMPONENT_TITLE || socialSharingTitle;
  socialSharingCopyLabel = currentLocaleData.M_SOCIAL_SHARING_COMPONENT_COPY_LABEL || socialSharingCopyLabel;
  socialSharingCopySuccess = currentLocaleData.M_SOCIAL_SHARING_COMPONENT_COPY_SUCCESS || socialSharingCopySuccess;
  socialSharingCopyFailure = currentLocaleData.M_SOCIAL_SHARING_COMPONENT_COPY_FAILURE || socialSharingCopyFailure;
  socialSharingCopyLoading = currentLocaleData.M_SOCIAL_SHARING_COMPONENT_COPY_LOADING || socialSharingCopyLoading;
  socialSharingAlternative = currentLocaleData.M_SOCIAL_SHARING_COMPONENT_ALTERNATIVE || socialSharingAlternative;
  
  // Set aria-labels from currentLocaleData
  ariaLabelFacebook = currentLocaleData.PAGE_ARIA_LABEL_FACEBOOK || ariaLabelFacebook;
  ariaLabelWhatsapp = currentLocaleData.PAGE_ARIA_LABEL_WHATSAPP || ariaLabelWhatsapp;
  ariaLabelTelegram = currentLocaleData.PAGE_ARIA_LABEL_TELEGRAM || ariaLabelTelegram;
  ariaLabelEmail = currentLocaleData.PAGE_ARIA_LABEL_EMAIL || ariaLabelEmail;
  ariaLabelMoveToTop = currentLocaleData.M_MOVE_TO_TOP || ariaLabelMoveToTop;
}

// Create the full locale string from language and country code for meta tags
const fullLocale = `${languageIso}-${countryCode}`;

// 2. REFACTOR getFontLoadingStrategy INTO A SIMPLE MAP
const localeFontMap = {
  ar: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap' },
  he: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap' },
  hi: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap' },
  ja: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap' },
  ko: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap' },
  ru: { fontLink: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
  be: { fontLink: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
  bg: { fontLink: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
  el: { fontLink: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
  th: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap' },
  bn: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap' },
  hy: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400;700&display=swap' },
  ka: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;700&display=swap' },
  my: { fontLink: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;700&display=swap' },
  // All other languages use the self-hosted 'Inter Variable' and don't need a link.
};

// Use the language ISO code (e.g., 'ar') to find the font link
const fontStrategy = localeFontMap[languageIso] || { fontLink: null };

// Helper to ensure icon paths are relative to the public directory root
const publicPath = (src: string) => `/${src.startsWith('/') ? src.substring(1) : src}`;

// Helper to create absolute URL for OG images
const getAbsoluteOgImageUrl = (imagePath: string) => {
  return `${Astro.url.origin}${imagePath}`;
};
---

<!DOCTYPE html>
<html lang={languageIso} dir={contentOrientation}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href={new URL('/logos/eusignal-favicon.ico', Astro.url)} type="image/x-icon" sizes="any" />
    <link rel="icon" href={new URL('/logos/EUSIGNAL-SVG_Logo_File_Horizontal_Light.svg', Astro.url)} type="image/svg+xml" />
    <link href={new URL('/logos/eusignal-favicon.ico', Astro.url)} type="image/x-icon" sizes="any" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{title} | {www.PAGE_ORGANISATION_FULL_NAME}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />

    <!-- Canonical URL -->
    <link rel="canonical" href={Astro.url.href} />

    <!-- Alternate Language Links -->
    {languageLinksMap && Object.entries(languageLinksMap).map(([localeCode, url]) => {
      if (!url) return null;
      const normalizedUrl = url.replace(/\/$/, '');
      if (normalizedUrl === Astro.url.pathname.replace(/\/$/, '')) return null;

      // Find the locale data for this locale
      const localeData = allLocaleData.find(l => l.M_SLUG === localeCode);

      // Always use 4-letter code: try M_HREFLANG_CODE, else build from M_LANGUAGE_ISO and M_COUNTRY_CODE
      let hreflang = localeData?.M_HREFLANG_CODE;
      if (!hreflang || !/^[a-z]{2}-[A-Z]{2}$/.test(hreflang)) {
        // fallback: build from language and country code
        const lang = localeData?.M_LANGUAGE_ISO || localeCode;
        const country = localeData?.M_COUNTRY_CODE || localeCode.toUpperCase();
        hreflang = `${lang}-${country}`;
      }

      // Generate absolute URL
      const absoluteUrl = new URL(url, Astro.url.origin).toString();

      return (
        <link rel="alternate" hrefLang={hreflang} href={absoluteUrl} />
      );
    })}
    {(() => {
      // You can set your default locale here
      const defaultLocale = "si";
      const defaultUrl = languageLinksMap?.[defaultLocale] 
        ? new URL(languageLinksMap[defaultLocale], Astro.url.origin).toString()
        : new URL(`/${defaultLocale}`, Astro.url.origin).toString();
      return <link rel="alternate" hrefLang="x-default" href={defaultUrl} />;
    })()}

    <!-- Robots Meta Tag -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={`${title} | ${www.PAGE_ORGANISATION_FULL_NAME}`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={getAbsoluteOgImageUrl(ogImage)} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content={www.PAGE_ORGANISATION_SHORT_NAME || www.PAGE_ORGANISATION_FULL_NAME} /> 
    <meta property="og:locale" content={fullLocale} />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={Astro.url} />
    <meta name="twitter:title" content={`${title} | ${www.PAGE_ORGANISATION_FULL_NAME}`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={getAbsoluteOgImageUrl(ogImage)} />
    <meta name="twitter:creator" content={www.PAGE_TWITTER_USERNAME} />

    <!-- Mobile/Web App Metadata -->
    <meta name="application-name" content={www.PAGE_ORGANISATION_FULL_NAME} />
    <meta name="apple-mobile-web-app-title" content={www.PAGE_ORGANISATION_FULL_NAME} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />
    {manifestData.theme_color && <meta name="theme-color" content={manifestData.theme_color} />}
    <meta name="msapplication-TileColor" content={manifestData.theme_color} />

    <!-- Favicon and Icons from imported Manifest Data -->
    {manifestData.icons && manifestData.icons.map(icon => {
      const href = new URL(publicPath(icon.src), Astro.url);
      if (icon.src.includes('apple-touch-icon')) {
        return <link rel="apple-touch-icon" sizes={icon.sizes} href={href.pathname} type={icon.type} />;
      }
      return <link rel="icon" type={icon.type} sizes={icon.sizes} href={href.pathname} />;
    })}
    <link rel="manifest" href={new URL('/site.webmanifest', Astro.url).pathname} crossorigin="anonymous" />
    <link rel="mask-icon" href={new URL('/logos/EUSIGNAL-SVG_Logo_File_Horizontal_Light.svg', Astro.url).pathname} color={manifestData.theme_color} />

    <!-- Preconnect (only if needed) -->
    {fontStrategy.fontLink && (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </>
    )}
    
    <!-- Dynamically Load Google Font (if needed) -->
    {fontStrategy.fontLink && (
      <link href={fontStrategy.fontLink} rel="stylesheet" />
    )}

    <meta name="referrer" content="strict-origin-when-cross-origin" />

    <!-- Google Tag Manager -->
    {www.PAGE_GOOGLE_ANALYTICS_ID && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${www.PAGE_GOOGLE_ANALYTICS_ID}`}></script>
        <script is:inline define:vars={{ gtagId: www.PAGE_GOOGLE_ANALYTICS_ID }}>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', gtagId);
        </script>
      </>
    )}

    <!-- Microsoft Clarity -->
    {www.PAGE_MICROSOFT_CLARITY && (
      <script is:inline define:vars={{ clarityId: www.PAGE_MICROSOFT_CLARITY }}>
        (function (c, l, a, r, i, t, y) {
          c[a] =
            c[a] ||
            function () {
              (c[a].q = c[a].q || []).push(arguments);
            };
          t = l.createElement(r);
          t.async = 1;
          t.src = 'https://www.clarity.ms/tag/' + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', clarityId);
      </script>
    )}

    <!-- Bing Webmasters Tools -->
    {www.PAGE_BING_VALIDATE && (
      <meta name="msvalidate.01" content={www.PAGE_BING_VALIDATE} />
    )}

    <!-- Yandex Webmasters Tools -->
    {www.PAGE_YANDEX_VALIDATE && (
      <meta name="yandex-verification" content={www.PAGE_YANDEX_VALIDATE} />
    )}
    
    <!-- Pinterest Verify-->
    <meta name="p:domain_verify" content="e0ada8b9b555717ad94989fbaec7a340"/>
    
    {schema && <Schema schema={schema} />}
  </head>
  <body class="min-h-screen bg-signal-light flex flex-col">
    <Header alternativeLinks={alternativeLinks} languageLinksMap={languageLinksMap} locale={currentSlug} />
    <main class="flex-grow">
      <slot />
    </main>    
    <!-- Social Sharing Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-xl mx-auto">
          <h2 class="text-2xl font-bold text-black mb-6 text-center">{socialSharingTitle}</h2>
          
          <!-- Copy URL Section -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
            <div 
              id="copy-url-button"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group"
            >
              <span 
                id="copy-url-text" 
                class="px-2 py-1 bg-black text-signal-green rounded text-xs font-medium"
              >
                {socialSharingCopyLabel}
              </span>
              <span id="current-url-display" class="flex-1 text-xs text-gray-600 truncate">
                {socialSharingCopyLoading}
              </span>
              {/* CHANGE 1: Added `rtl:scale-x-[-1]` to flip the copy icon in RTL mode. */}
              <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </div>
          </div>

          <!-- Social Share Links -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 class="text-base font-semibold text-black mb-4 text-center">{socialSharingAlternative}</h3>
            <div class="flex justify-center gap-3">
              <a
                id="facebook-share-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-[#0084ff] hover:bg-[#0070e6] transition-colors"
                aria-label={ariaLabelFacebook}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#fff" d="M11.772 2.013A9.7 9.7 0 0 0 4.774 4.89a9.62 9.62 0 0 0-2.77 7.019a9.38 9.38 0 0 0 3.12 6.96a.84.84 0 0 1 .291.65v1.45c0 .487.21 1.032.827 1.032a.9.9 0 0 0 .384-.104l1.863-.824a.9.9 0 0 1 .652 0c5.204 1.415 11.049-1.31 12.469-6.67a9.65 9.65 0 0 0-1.708-8.726a9.7 9.7 0 0 0-3.618-2.816a9.75 9.75 0 0 0-4.512-.847m4.494 9.187c-2.55 4.49-2.561 3.48-5.763 1.346c-.373 0-.559.278-1.805 1.16s-1.455 1.253-1.828.858c-.372-.394.78-1.705 2.329-4.234c1.35-2.227 3.213.859 4.4 1.044a11.3 11.3 0 0 0 2.096-1.508c.816-.626 1.048-.87 1.374-.614c.326.255.047.614-.803 1.948"/>
                </svg>
              </a>
              <a
                id="whatsapp-share-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-[#128C7E] hover:bg-[#0e7a6e] transition-colors"
                aria-label={ariaLabelWhatsapp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#fff" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/>
                </svg>
              </a>
              <a
                id="telegram-share-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-[#24A1DE] hover:bg-[#1e91c7] transition-colors"
                aria-label={ariaLabelTelegram}
              >
                {/* CHANGE 2.1: Added `rtl:scale-x-[-1]` to the SVG to flip the directional paper plane icon. */}
                <svg class="rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38"/>
                </svg>
              </a>
              <a
                id="mail-share-link"
                href="#"
                class="p-3 rounded-lg bg-[#BCEF2F] hover:bg-[#a5d429] transition-colors"
                aria-label={ariaLabelEmail}
              >
                {/* CHANGE 2.2: Added `rtl:scale-x-[-1]` to the SVG to flip the directional 'send' part of the icon. */}
                <svg class="rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <mask id="emailIcon">
                    <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path stroke-dasharray="64" stroke-dashoffset="64" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="64;0"/>
                      </path>
                      <path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.72s" dur="0.24s" values="24;0"/>
                      </path>
                      <path fill="#fff" fill-opacity="0" stroke="none" d="M12 11l-8 -5h16l-8 5Z">
                        <animate fill="freeze" attributeName="fill-opacity" begin="1.44s" dur="0.6s" values="0;1"/>
                      </path>
                      <path fill="#000" fill-opacity="0" stroke="none" d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z">
                        <set fill="freeze" attributeName="fill-opacity" begin="0.96s" to="1"/>
                      </path>
                      <path stroke-dasharray="6" stroke-dashoffset="6" d="M16 19h5">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.96s" dur="0.24s" values="6;0"/>
                      </path>
                      <path stroke-dasharray="4" stroke-dashoffset="4" d="M21 19l-2 2M21 19l-2 -2">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.24s" values="4;0"/>
                      </path>
                    </g>
                  </mask>
                  <rect width="24" height="24" fill="#000" mask="url(#emailIcon)"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
    <Cookie />

    <!-- Move to Top Button -->
    {/* CHANGE 3: Replaced `right-[25px]` with the logical property `end-[25px]`. 
        This will be `right` in LTR and `left` in RTL automatically. */}
    <button
      id="moveToTop"
      class="fixed bottom-[25px] end-[25px] w-10 h-10 bg-[#BCEF2F] rounded-lg shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:bg-[#a5d429] focus:outline-none focus:ring-2 focus:ring-[#BCEF2F] focus:ring-opacity-50"
      aria-label={ariaLabelMoveToTop}
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke-dasharray="20" stroke-dashoffset="20" d="M12 21l0 -17.5">
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.24s" values="20;0"/>
      </path>
      <path stroke-dasharray="12" stroke-dashoffset="12" d="M12 3l7 7M12 3l-7 7">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.24s" dur="0.24s" values="12;0"/>
      </path>
    </svg>
    </button>
  </body>
</html>

<style is:global>
  :root {
    --font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
    --font-size-lg: clamp(1.2rem, 0.7vw + 1.2rem, 1.5rem); 
    --font-size-xl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
    --line-height-body: 1.5;
    --line-height-heading: 1.2;
  }

  html {
    font-family: 'Inter Variable', system-ui, sans-serif;
    scroll-behavior: smooth;
  }

  body {
    font-size: var(--font-size-base);
    line-height: var(--line-height-body);
    color: #111827;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: var(--line-height-heading);
    font-weight: 700;
  }

  h1 {
    font-size: var(--font-size-xl);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-size-lg);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<script define:vars={{ 
  textCopySuccess: socialSharingCopySuccess,
  textCopyFailure: socialSharingCopyFailure,
  textCopyDefaultLabel: socialSharingCopyLabel
}}>
  // Animation observer for scroll animations
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    // Move to Top Button functionality
    const moveToTopButton = document.getElementById('moveToTop');
    
    if (moveToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.scrollY > 750) {
          moveToTopButton.classList.remove('opacity-0', 'invisible');
          moveToTopButton.classList.add('opacity-100', 'visible');
        } else {
          moveToTopButton.classList.add('opacity-0', 'invisible');
          moveToTopButton.classList.remove('opacity-100', 'visible');
        }
      });

      // Scroll to top when clicked
      moveToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Social Sharing functionality
    function initSocialSharing() {
      const currentUrlDisplay = document.getElementById('current-url-display');
      const copyUrlButton = document.getElementById('copy-url-button');
      const copyUrlText = document.getElementById('copy-url-text');
      
      const facebookLink = document.getElementById('facebook-share-link');
      const whatsappLink = document.getElementById('whatsapp-share-link');
      const telegramLink = document.getElementById('telegram-share-link');
      const mailLink = document.getElementById('mail-share-link');

      if (!currentUrlDisplay || !copyUrlButton || !copyUrlText) return;

      let pageUrl = '';

      function updateContent() {
        if (typeof window === 'undefined') return;
        
        const currentLoc = window.location;
        pageUrl = currentLoc.href;

        // Construct URL for display: domain.com/path?query#hash
        let displayableUrl = currentLoc.hostname + currentLoc.pathname;
        if (currentLoc.search) {
          displayableUrl += currentLoc.search;
        }
        if (currentLoc.hash) {
          displayableUrl += currentLoc.hash;
        }
        currentUrlDisplay.textContent = displayableUrl;
        currentUrlDisplay.title = displayableUrl;
        
        const encodedUrl = encodeURIComponent(pageUrl);
        const encodedTitle = encodeURIComponent(document.title);

        if (facebookLink) {
          facebookLink.href = `https://m.me/?link=${encodedUrl}`;
        }
        if (whatsappLink) {
          whatsappLink.href = `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`;
        }
        if (telegramLink) {
          telegramLink.href = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        }
        if (mailLink) {
          mailLink.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
        }
      }
      
      async function copyUrl() {
        if (!pageUrl || !navigator.clipboard) return;

        try {
          await navigator.clipboard.writeText(pageUrl);
          copyUrlText.textContent = textCopySuccess; 
          copyUrlText.className = 'px-2 py-1 bg-signal-green text-black rounded text-xs font-medium';
          
          setTimeout(() => {
            copyUrlText.textContent = textCopyDefaultLabel; 
            copyUrlText.className = 'px-2 py-1 bg-black text-signal-green rounded text-xs font-medium';
          }, 2000);
        } catch (err) {
          console.error('Copy failed:', err);
          copyUrlText.textContent = textCopyFailure; 
          setTimeout(() => {
            copyUrlText.textContent = textCopyDefaultLabel; 
            copyUrlText.className = 'px-2 py-1 bg-black text-signal-green rounded text-xs font-medium';
          }, 2000);
        }
      }

      copyUrlButton.addEventListener('click', copyUrl);
      updateContent(); 
      
      // Handle Astro view transitions for SPA-like navigations
      document.addEventListener('astro:page-load', updateContent);
    }

    // Initialize social sharing
    initSocialSharing();
  });
</script>
#######

You can quickly notice that I try to minimize the number of components as I rather write everything in a single file. Now, let's move furthe to my src\pages directory. Here you can see that I have speified 3 locales currently. You can see that each locale has exactly the same .astro files, except the collections pages are renamed. And by collections I mean 3 sub-folders in each country's folder, so in src\pages\si we have these 3 collection pages:
src\pages\si\avtorji-in-uredniki
src\pages\si\clanki
src\pages\si\opozorilna-piramida

I have built a custom script, that manages that automatically. Here's the script src\scripts\manage-locales.mjs and here's the logic:
########
// src/scripts/manage-locales.mjs

import { readFile, rm, cp, rename, readdir } from 'fs/promises';
import path from 'path';
import chokidar from 'chokidar';
import chalk from 'chalk';

// --- CONFIGURATION ---
const CWD = process.cwd();
const PAGES_DIR = path.join(CWD, 'src', 'pages');
const LOCALE_CONFIG_PATH = path.join(CWD, 'src', 'data', 'locale.json');
const COMMON_CONFIG_PATH = path.join(CWD, 'src', 'data', 'common.json');
const FIXED_SLUG_KEY = 'AUTHOR_LIST_SLUG';

// --- HELPER FUNCTIONS ---
async function readJsonFile(filePath) {
    try {
        const fileContent = await readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        // Log this specific error directly, as the logger isn't available here
        console.error(chalk.red(`❌ Error reading or parsing ${path.basename(filePath)}:`), error);
        return null;
    }
}

function findCommonDataBySlug(slug, commonData) {
    return commonData.find(data => data.M_SLUG === slug) || null;
}

async function renameSubdirectories(newLocaleSlug, templateLocaleSlug, commonData, newLocalePath, slugKeysToProcess, logger) {
    const templateCommon = findCommonDataBySlug(templateLocaleSlug, commonData);
    const newCommon = findCommonDataBySlug(newLocaleSlug, commonData);

    if (!templateCommon || !newCommon) {
        logger.error(chalk.red(`   - Could not find common data for '${templateLocaleSlug}' or '${newLocaleSlug}'. Skipping rename.`));
        return;
    }

    const templateSlugMap = {};
    slugKeysToProcess.forEach(key => {
        if (templateCommon[key]) templateSlugMap[templateCommon[key]] = key;
    });

    const subDirs = await readdir(newLocalePath, { withFileTypes: true });

    for (const entry of subDirs) {
        if (entry.isDirectory()) {
            const oldDirName = entry.name;
            const genericSlugKey = templateSlugMap[oldDirName];

            if (genericSlugKey) {
                const newDirName = newCommon[genericSlugKey];
                if (newDirName && newDirName !== oldDirName) {
                    const oldPath = path.join(newLocalePath, oldDirName);
                    const newPath = path.join(newLocalePath, newDirName);
                    
                    try {
                        // Check if the target directory already exists
                        const targetExists = await readdir(newLocalePath, { withFileTypes: true })
                            .then(entries => entries.some(e => e.isDirectory() && e.name === newDirName))
                            .catch(() => false);
                        
                        if (targetExists) {
                            // If target exists, we need to merge the contents
                            logger.info(chalk.yellow(`   - ⚠️  Target directory '${newDirName}' already exists. Merging contents...`));
                            
                            // Copy contents from old directory to new directory
                            const oldDirPath = path.join(newLocalePath, oldDirName);
                            const newDirPath = path.join(newLocalePath, newDirName);
                            
                            // Recursively copy contents
                            await cp(oldDirPath, newDirPath, { recursive: true });
                            
                            // Remove the old directory
                            await rm(oldDirPath, { recursive: true, force: true });
                            
                            logger.info(chalk.green(`   - ✅ Merged '${oldDirName}' into '${newDirName}'`));
                        } else {
                            // Normal rename operation
                            await rename(oldPath, newPath);
                            logger.info(chalk.green(`   - ✅ Renamed '${oldDirName}' to '${newDirName}'`));
                        }
                    } catch (error) {
                        logger.error(chalk.red(`   - ❌ Failed to rename '${oldDirName}' to '${newDirName}':`), error);
                    }
                }
            }
        }
    }
}

// --- CORE LOGIC ---
export async function syncLocaleDirectories(logger = console) {
    const startTime = Date.now();
    logger.info(chalk.cyan('🔄 Syncing locales...'));

    // FIX: The `readJsonFile` function is now defined above, resolving the error.
    const allLocales = await readJsonFile(LOCALE_CONFIG_PATH);
    const commonData = await readJsonFile(COMMON_CONFIG_PATH);

    if (!allLocales || !commonData) {
        logger.error(chalk.red('❌ Cannot proceed without locale and common config files.'));
        return;
    }
    if (commonData.length === 0) {
        logger.error(chalk.red('❌ common.json is empty. Cannot determine dynamic slug keys.'));
        return;
    }

    // Dynamic Slug Key Detection
    const firstCommonEntryKeys = Object.keys(commonData[0]);
    const dynamicCategorySlugs = firstCommonEntryKeys.filter(key =>
        key.startsWith('PAGE_COLLECTION_') && key.endsWith('_LISTING_SLUG')
    );
    const slugKeysToProcess = [FIXED_SLUG_KEY, ...dynamicCategorySlugs];

    let existingDirs = [];
    try {
        const entries = await readdir(PAGES_DIR, { withFileTypes: true });
        // Updated filter to include all locale directories (2-char and special cases like ch-fr, be-nl, etc.)
        existingDirs = entries
            .filter(entry => entry.isDirectory() && 
                   (entry.name.length === 2 || 
                    entry.name.includes('-') || 
                    entry.name.length > 2))
            .map(entry => entry.name);
    } catch (error) {
        logger.error(chalk.red('❌ Could not read the pages directory:'), error);
        return;
    }

    const localesToPublish = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1");
    const localesToUnpublish = allLocales.filter(l => l.M_LOCALE_PUBLISH_Y_N === "0");
    
    // Get all locale slugs from the config (both published and unpublished)
    const allLocaleSlugs = allLocales.map(l => l.M_SLUG);

    let actionsTaken = 0;

    // Process Deletions - Delete directories that should not exist
    for (const existingDir of existingDirs) {
        // Check if this directory should be deleted
        const shouldDelete = !allLocaleSlugs.includes(existingDir) || 
                           localesToUnpublish.some(l => l.M_SLUG === existingDir);
        
        if (shouldDelete) {
            const dirToDelete = path.join(PAGES_DIR, existingDir);
            try {
                await rm(dirToDelete, { recursive: true, force: true });
                logger.info(chalk.yellow(`   - 🗑️  Deleted locale: ${existingDir}`));
                actionsTaken++;
            } catch (error) {
                logger.error(chalk.red(`   - ❌ Failed to delete ${existingDir}:`), error);
            }
        }
    }

    // Find the primary template locale (first published locale that exists, or first published locale)
    let templateLocaleSlug = localesToPublish.find(l => existingDirs.includes(l.M_SLUG))?.M_SLUG;
    
    // If no existing published locale found, use the first published locale as template
    if (!templateLocaleSlug && localesToPublish.length > 0) {
        templateLocaleSlug = localesToPublish[0].M_SLUG;
        logger.info(chalk.blue(`   - 📋 Using '${templateLocaleSlug}' as template (no existing published locales found)`));
    }

    if (!templateLocaleSlug) {
        logger.error(chalk.red('❌ No published locales found to use as template.'));
        return;
    }

    // ALWAYS REFRESH ALL PUBLISHED LOCALES
    // This ensures any changes made to the template locale are propagated to all other published locales
    for (const locale of localesToPublish) {
        const slug = locale.M_SLUG;
        
        // Skip if this is the template locale itself
        if (slug === templateLocaleSlug) {
            continue;
        }

        const destPath = path.join(PAGES_DIR, slug);
        const sourcePath = path.join(PAGES_DIR, templateLocaleSlug);

        try {
            // Remove existing directory if it exists
            try {
                await rm(destPath, { recursive: true, force: true });
            } catch (error) {
                // Directory might not exist, which is fine
            }

            // Copy fresh template to this locale
            await cp(sourcePath, destPath, { recursive: true });
            logger.info(chalk.green(`   - 🔄 Refreshed locale: ${slug} (from ${templateLocaleSlug})`));
            actionsTaken++;

            // Rename subdirectories according to locale-specific slugs
            await renameSubdirectories(slug, templateLocaleSlug, commonData, destPath, slugKeysToProcess, logger);
        } catch (error) {
            logger.error(chalk.red(`   - ❌ Failed to refresh locale ${slug}:`), error);
        }
    }

    // Process Creations for any new locales that don't exist yet
    for (const locale of localesToPublish) {
        const slug = locale.M_SLUG;
        if (!existingDirs.includes(slug)) {
            logger.info(chalk.green(`   - ✨ Creating new locale: ${slug} (from ${templateLocaleSlug})`));
            actionsTaken++;
            const sourcePath = path.join(PAGES_DIR, templateLocaleSlug);
            const destPath = path.join(PAGES_DIR, slug);

            try {
                await cp(sourcePath, destPath, { recursive: true });
                // Pass the logger to the subdirectory function
                await renameSubdirectories(slug, templateLocaleSlug, commonData, destPath, slugKeysToProcess, logger);
            } catch (error) {
                logger.error(chalk.red(`   - ❌ Failed to create locale ${slug}:`), error);
            }
        }
    }

    const duration = Date.now() - startTime;
    if (actionsTaken > 0) {
        logger.info(chalk.cyan(`✅ Sync complete in ${duration}ms. Found ${slugKeysToProcess.length} slug keys to process.`));
        logger.info(chalk.blue(`📝 All published locales have been refreshed from template '${templateLocaleSlug}'`));
    } else {
        logger.info(chalk.gray(`✅ No changes needed. (${duration}ms)`));
    }
}

// --- FILE WATCHER INITIALIZATION ---
export function startWatcher(logger = console) {
    logger.info(chalk.blue.bold(`🚀 Watching for locale config changes...`));

    const watcher = chokidar.watch(LOCALE_CONFIG_PATH, { persistent: true, ignoreInitial: true });

    watcher
        .on('change', () => {
            logger.info(chalk.magenta(`\n🔔 File changed. Re-syncing...`));
            syncLocaleDirectories(logger);
        })
        .on('add', () => {
            logger.info(chalk.magenta(`\n🔔 File (re)created. Re-syncing...`));
            syncLocaleDirectories(logger);
        })
        .on('ready', () => {
            logger.info(chalk.blue.bold('✅ Watcher is ready.'));
        })
        .on('error', (error) => logger.error(chalk.red(`Watcher error: ${error}`)));
}
########

As you can see the script is written so that it copies si directory and creates new directories based on the locales that are defined in locale.json. I also have an integration that manages that and syncs before every build (located: integrations\locale-manager.js):
#########
import { syncLocaleDirectories, startWatcher } from '../src/scripts/manage-locales.mjs';

export default function manageLocales() {
  return {
    name: 'astro-locale-manager',
    hooks: {
      'astro:config:setup': async ({ command, logger }) => {
        const syncLogger = logger.fork('[Locale Manager]');
        syncLogger.info('Integration loaded. Performing initial sync...');
        
        // This hook runs once, right at the beginning.
        // It's perfect for both `dev` and `build`.
        await syncLocaleDirectories(syncLogger);

        // If we are in 'dev' mode, we set up the watcher.
        // The watcher will run alongside the dev server.
        if (command === 'dev') {
          startWatcher(syncLogger);
        }
        
        // If the command is 'build', we don't start the watcher.
        // The one-time sync is all we need.
        if (command === 'build') {
          syncLogger.info('Build command detected. Sync complete, watcher will not be started.');
        }
      },
    },
  };
}
#########

So, as you may guess, each .astro file in src\pages\si or src\pages\hr or src\pages\es or any other country folder; is written so dynamically, that it can easily be copied over for a new locale. I am going to show you the structure of these .astro files. So here's src\pages\si\avtorji-in-uredniki\[authorSlug].astro:
##########
---
// Path: /src/pages/si/avtorji-in-uredniki/[authorSlug].astro
// Purpose: Author profile page with dynamic RTL support
// Data: JSON dependencies for author data, common data, and locale data
// Dependencies: BaseLayout, country-flag-icons

import BaseLayout from '../../../layouts/BaseLayout.astro';
import authorDataJson from '../../../data/author.json';
import wwwData from '../../../data/www.json';
import commonData from '../../../data/common.json';
import localeData from '../../../data/locale.json';

// Type Definitions (from original author.astro)
export interface SocialLinksInfo {
  linkedin?: string;
  facebook?: string;
  github?: string;
  twitter?: string;
  website?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  quora?: string;
  tiktok?: string;
  bluesky?: string;
  mastodon?: string;
  telegram?: string;
  discord?: string;
  snapchat?: string;
}

export interface LanguageInfo {
  name: string;
  flag: string;
}

export interface LayoutStrings {
  baseLayoutDescriptionPrefix: string;
  socialLinkLabelLinkedIn: string;
  socialLinkLabelFacebook: string;
  socialLinkLabelGithub: string;
  socialLinkLabelTwitter: string;
  socialLinkLabelWebsite: string;
  socialLinkLabelEmail: string;
  socialLinkLabelInstagram: string;
  socialLinkLabelYoutube: string;
  socialLinkLabelQuora: string;
  socialLinkLabelTikTok: string;
  socialLinkLabelBluesky: string;
  socialLinkLabelMastodon: string;
  socialLinkLabelTelegram: string;
  socialLinkLabelDiscord: string;
  socialLinkLabelSnapchat: string;
  jobTitleAtCompanySeparator: string;
  languagesSectionTitle: string;
  languagesSectionIcon: string;
  footerLinkAllAuthorsText: string;
  footerLinkAllAuthorsUrl: string;
  footerLinkEditorialPolicyText: string;
  footerLinkEditorialPolicyUrl: string;
}

interface AuthorDataEntry {
  PAGE_ID: string;
  WWW_AUTHOR: string;
  PUBLISH_Y_N: string;
  WWW_AUTHOR_ASCII: string;
  WWW_AUTHOR_SLUG: string;
  WWW_AUTHOR_NUMBER: string;
  M_COUNTRY_NUMBER: string;
  AUTHOR_ID: string;
  PAGE_IDENTIFIER: string;
  PAGE_LOCALE: string;
  M_COUNTRY_CODE: string;
  M_LANGUAGE_ISO: string;
  M_SLUG: string;
  EEAT_NAME_20: string;
  EEAT_NAME_20_SINGULAR: string;
  EEAT_SLUG_20: string;
  WWW_AUTHOR_NATIONALITY: string;
  WWW_AUTHOR_OCCUPATION: string;
  WWW_AUTHOR_BIO: string;
  WWW_AUTHOR_LANGUAGE1: string;
  WWW_AUTHOR_LANGUAGE2: string;
  WWW_AUTHOR_LANGUAGE3: string;
  WWW_AUTHOR_LANGUAGE4: string;
  WWW_AUTHOR_LANGUAGE5: string;
  WWW_AUTHOR_LANGUAGE6: string;
  WWW_AUTHOR_LANGUAGE1_COUNTRY_CODE: string;
  WWW_AUTHOR_LANGUAGE2_COUNTRY_CODE: string;
  WWW_AUTHOR_LANGUAGE3_COUNTRY_CODE: string;
  WWW_AUTHOR_LANGUAGE4_COUNTRY_CODE: string;
  WWW_AUTHOR_LANGUAGE5_COUNTRY_CODE: string;
  WWW_AUTHOR_LANGUAGE6_COUNTRY_CODE: string;
  WWW_AUTHOR_WEBSITE: string;
  WWW_AUTHOR_LINKEDIN: string;
  WWW_AUTHOR_FACEBOOK: string;
  WWW_AUTHOR_GITHUB: string;
  WWW_AUTHOR_X: string;
  WWW_AUTHOR_INSTAGRAM: string;
  WWW_AUTHOR_YOUTUBE: string;
  WWW_AUTHOR_QUORA: string;
  WWW_AUTHOR_TIKTOK: string;
  WWW_AUTHOR_BLUESKY: string;
  WWW_AUTHOR_MASTODON: string;
  WWW_AUTHOR_TELEGRAM: string;
  WWW_AUTHOR_DISCORD: string;
  WWW_AUTHOR_SNAPCHAT: string;
  WWW_AUTHOR_EMAIL: string;
  AUTHOR_WORKS_FOR: string;
  AUTHOR_IMAGE_NAME: string;
  AUTHOR_IMAGE_NAME_ASCII: string;
  AUTHOR_OG_IMAGE_PATH: string;
  AUTHOR_PROFILE_IMAGE_PATH: string;
  AUTHOR_IMAGE_ALT: string;
  AUTHOR_HOUR_PUBLISHED: string;
  AUTHOR_HOUR_UPDATED: string;
  AUTHOR_DATE_PUBLISHED: string;
  AUTHOR_DATE_UPDATED: string;
  AUTHOR_META_SEO: string;
  EEAT_SLUG_13: string;
  AUTHOR_FULL_BIO: string;
  EEAT_URL_20: string;
}

export const prerender = false; // Enable SSR

const { authorSlug } = Astro.params;

// Get the locale from the URL path (e.g., 'si' from /si/avtorji-in-uredniki/...)
const locale = Astro.url.pathname.split('/')[1];

// Find the matching common data object based on M_SLUG
const common = commonData.find(item => item.M_SLUG === locale) || commonData[0];

// Filter authorData to only include entries matching the current locale
const localeAuthorData = authorDataJson.filter(entry => entry.M_SLUG === locale);

// Find the matching author entry from the filtered data
const author = localeAuthorData.find(entry => entry.WWW_AUTHOR_SLUG === authorSlug);

// Check if author exists and is published
if (!author || author.PUBLISH_Y_N !== "1") {
  return Astro.redirect('/404');
}

const www = wwwData[0];

// Helper function for absolute URLs with locale
const getAbsoluteUrl = (path: string): string => {
  return new URL(`/${locale}${path}`, Astro.url.origin).toString();
};

// Helper function for base-level URLs (without locale)
const getBaseUrl = (path: string): string => {
  return new URL(path, Astro.url.origin).toString();
};

// Get language data
const languageIso = author.M_LANGUAGE_ISO;
const countryCode = author.M_COUNTRY_CODE;

// Find matching content orientation from common.json
const contentOrientation = common.M_CONTENT_ORIENTATION || 'ltr';

const authorProfileData = {
  name: author.WWW_AUTHOR,
  seoTitle: `${author.WWW_AUTHOR} — ${author.EEAT_NAME_20_SINGULAR}`,
  description: author.AUTHOR_FULL_BIO,
  image: getBaseUrl(author.AUTHOR_PROFILE_IMAGE_PATH),
  ogImage: (author.AUTHOR_OG_IMAGE_PATH),
  imageAltText: `${author.WWW_AUTHOR} — ${author.EEAT_NAME_20_SINGULAR} | ${www.PAGE_ORGANISATION_FULL_NAME}`,
  socialLinks: {
    linkedin: author.WWW_AUTHOR_LINKEDIN,
    facebook: author.WWW_AUTHOR_FACEBOOK,
    github: author.WWW_AUTHOR_GITHUB,
    twitter: author.WWW_AUTHOR_X,
    website: author.WWW_AUTHOR_WEBSITE,
    instagram: author.WWW_AUTHOR_INSTAGRAM,
    youtube: author.WWW_AUTHOR_YOUTUBE,
    quora: author.WWW_AUTHOR_QUORA,
    tiktok: author.WWW_AUTHOR_TIKTOK,
    bluesky: author.WWW_AUTHOR_BLUESKY,
    mastodon: author.WWW_AUTHOR_MASTODON,
    telegram: author.WWW_AUTHOR_TELEGRAM,
    discord: author.WWW_AUTHOR_DISCORD,
    snapchat: author.WWW_AUTHOR_SNAPCHAT,
    email: author.WWW_AUTHOR_EMAIL,
  } as SocialLinksInfo,
  jobTitle: author.WWW_AUTHOR_OCCUPATION,
  company: author.AUTHOR_WORKS_FOR,
};

const countryCodesForFlags = [
  author.WWW_AUTHOR_LANGUAGE1_COUNTRY_CODE,
  author.WWW_AUTHOR_LANGUAGE2_COUNTRY_CODE,
  author.WWW_AUTHOR_LANGUAGE3_COUNTRY_CODE,
  author.WWW_AUTHOR_LANGUAGE4_COUNTRY_CODE,
  author.WWW_AUTHOR_LANGUAGE5_COUNTRY_CODE,
  author.WWW_AUTHOR_LANGUAGE6_COUNTRY_CODE,
].filter(code => code && code.trim());

const flagModule = await import('country-flag-icons/string/3x2');
const countryCodeToFlag = Object.fromEntries(
  countryCodesForFlags.map(code => [code, (flagModule as any)[code.toUpperCase()]])
);

const languagesData: LanguageInfo[] = [
  { name: author.WWW_AUTHOR_LANGUAGE1, flag: countryCodeToFlag[author.WWW_AUTHOR_LANGUAGE1_COUNTRY_CODE?.toUpperCase()] },
  { name: author.WWW_AUTHOR_LANGUAGE2, flag: countryCodeToFlag[author.WWW_AUTHOR_LANGUAGE2_COUNTRY_CODE?.toUpperCase()] },
  { name: author.WWW_AUTHOR_LANGUAGE3, flag: countryCodeToFlag[author.WWW_AUTHOR_LANGUAGE3_COUNTRY_CODE?.toUpperCase()] },
  { name: author.WWW_AUTHOR_LANGUAGE4, flag: countryCodeToFlag[author.WWW_AUTHOR_LANGUAGE4_COUNTRY_CODE?.toUpperCase()] },
  { name: author.WWW_AUTHOR_LANGUAGE5, flag: countryCodeToFlag[author.WWW_AUTHOR_LANGUAGE5_COUNTRY_CODE?.toUpperCase()] },
  { name: author.WWW_AUTHOR_LANGUAGE6, flag: countryCodeToFlag[author.WWW_AUTHOR_LANGUAGE6_COUNTRY_CODE?.toUpperCase()] },
].filter(lang => lang.name && lang.name.trim() && lang.flag);

const pageKeywords = [
  author.WWW_AUTHOR,
  author.EEAT_NAME_20,
  author.WWW_AUTHOR_OCCUPATION,
  author.WWW_AUTHOR_NATIONALITY,
  common.M_COUNTRY_NATIVE,
  www.PAGE_ORGANISATION_FULL_NAME,
].join(', ');

const layoutStringsData: LayoutStrings = {
  baseLayoutDescriptionPrefix: author.AUTHOR_META_SEO,
  socialLinkLabelLinkedIn: common.AUTHOR_LINKEDIN_LABEL,
  socialLinkLabelFacebook: common.AUTHOR_FACEBOOK_LABEL,
  socialLinkLabelGithub: common.AUTHOR_GITHUB_LABEL,
  socialLinkLabelTwitter: common.AUTHOR_TWITTER_LABEL,
  socialLinkLabelWebsite: common.AUTHOR_WEBSITE_LABEL,
  socialLinkLabelEmail: common.M_EMAIL_ADDRESS_LABEL,
  socialLinkLabelInstagram: common.AUTHOR_INSTAGRAM_LABEL,
  socialLinkLabelYoutube: common.AUTHOR_YOUTUBE_LABEL,
  socialLinkLabelQuora: common.AUTHOR_QUORA_LABEL,
  socialLinkLabelTikTok: common.AUTHOR_TIKTOK_LABEL,
  socialLinkLabelBluesky: common.AUTHOR_BLUESKY_LABEL,
  socialLinkLabelMastodon: common.AUTHOR_MASTODON_LABEL,
  socialLinkLabelTelegram: common.AUTHOR_TELEGRAM_LABEL,
  socialLinkLabelDiscord: common.AUTHOR_DISCORD_LABEL,
  socialLinkLabelSnapchat: common.AUTHOR_SNAPCHAT_LABEL,
  jobTitleAtCompanySeparator: " — ",
  languagesSectionTitle: common.AUTHOR_LANGUAGE_LABEL,
  languagesSectionIcon: "🌍",
  footerLinkAllAuthorsText: common.AUTHOR_OTHER_AUTHORS,
  footerLinkAllAuthorsUrl: getAbsoluteUrl(`/${common.AUTHOR_LIST_SLUG}`),
  footerLinkEditorialPolicyText: common.AUTHOR_READ_MORE,
  footerLinkEditorialPolicyUrl: getAbsoluteUrl(`/${common.AUTHOR_EDITORIAL_SLUG}`),
};

const pageLocale = `${author.M_LANGUAGE_ISO}-${author.M_COUNTRY_CODE}`;
const authorListUrl = getAbsoluteUrl(`/${common.AUTHOR_LIST_SLUG}`);

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": author.WWW_AUTHOR,
  "url": Astro.url.href,
  "description": author.AUTHOR_META_SEO,
  "inLanguage": pageLocale,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": common.M_HOME_NAME,
        "item": getBaseUrl('/')
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": author.EEAT_NAME_20,
        "item": authorListUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": author.WWW_AUTHOR,
        "item": Astro.url.href
      }
    ]
  },
  "mainEntity": {
    "@type": "Article",
    "headline": author.WWW_AUTHOR,
    "description": author.AUTHOR_META_SEO,
    "image": getBaseUrl(author.AUTHOR_OG_IMAGE_PATH),
    "author": {
      "@type": "Organization",
      "name": www.PAGE_ORGANISATION_FULL_NAME
    },
    "publisher": {
        "@type": "Organization",
        "name": www.PAGE_ORGANISATION_FULL_NAME,
        "logo": {
            "@type": "ImageObject",
            "url": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1)
        }
    },
    "datePublished": `${author.AUTHOR_DATE_PUBLISHED}T${author.AUTHOR_HOUR_PUBLISHED || '00:00'}:00+02:00`,
    "dateModified": `${author.AUTHOR_DATE_UPDATED}T${author.AUTHOR_HOUR_UPDATED || '00:00'}:00+02:00`,
    "inLanguage": pageLocale
  }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": author.WWW_AUTHOR,
  "url": Astro.url.href,
  "description": author.AUTHOR_META_SEO,
  "sameAs": [
    author.WWW_AUTHOR_WEBSITE,
    author.WWW_AUTHOR_LINKEDIN,
    author.WWW_AUTHOR_FACEBOOK,
    author.WWW_AUTHOR_GITHUB,
    author.WWW_AUTHOR_X,
    author.WWW_AUTHOR_INSTAGRAM,
    author.WWW_AUTHOR_YOUTUBE,
    author.WWW_AUTHOR_QUORA,
    author.WWW_AUTHOR_TIKTOK,
    author.WWW_AUTHOR_BLUESKY,
    author.WWW_AUTHOR_MASTODON,
    author.WWW_AUTHOR_TELEGRAM,
    author.WWW_AUTHOR_DISCORD,
    author.WWW_AUTHOR_SNAPCHAT,
    author.WWW_AUTHOR_EMAIL ? `mailto:${author.WWW_AUTHOR_EMAIL}` : undefined
  ].filter(Boolean),
  "email": author.WWW_AUTHOR_EMAIL || undefined,
  "jobTitle": author.WWW_AUTHOR_OCCUPATION,
  "worksFor": {
    "@type": "Organization",
    "name": www.PAGE_ORGANISATION_FULL_NAME,
    "url": getBaseUrl(www.PAGE_FULL_PERMALINK || "/")
  },
  "image": getBaseUrl(author.AUTHOR_PROFILE_IMAGE_PATH),
  "nationality": {
    "@type": "Country",
    "name": author.WWW_AUTHOR_NATIONALITY
  },
  "knowsLanguage": [
    author.WWW_AUTHOR_LANGUAGE1,
    author.WWW_AUTHOR_LANGUAGE2,
    author.WWW_AUTHOR_LANGUAGE3,
    author.WWW_AUTHOR_LANGUAGE4,
    author.WWW_AUTHOR_LANGUAGE5,
    author.WWW_AUTHOR_LANGUAGE6,
  ].filter(lang => lang && lang.trim()).map(langName => ({ "@type": "Language", "name": langName })),
  "disambiguatingDescription": author.AUTHOR_FULL_BIO
};

// Organization Schema 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "keywords": [
    www.PAGE_ORGANISATION_FULL_NAME,
    common.M_COUNTRY_NATIVE,
    common.PAGE_KEYWORD_1,
    common.PAGE_KEYWORD_2,
    common.PAGE_KEYWORD_3,
    common.PAGE_KEYWORD_4,
    common.PAGE_KEYWORD_5,
    common.PAGE_KEYWORD_6
  ].filter(Boolean),
  "description": common.PAGE_SLOGAN,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "9"
  },
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [
    www.PAGE_INSTAGRAM_URL,
    www.PAGE_FACEBOOK_URL,
    www.PAGE_TWITTER_URL,
    www.PAGE_LINKEDIN_URL,
    www.PAGE_YOUTUBE_URL,
    www.PAGE_PINTEREST_URL,
    www.PAGE_BLUESKY_URL
  ].filter(Boolean),
  "areaServed": {
    "@type": "Country",
    "name": common.M_COUNTRY,
    "identifier": common.M_COUNTRY_CODE
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/sitemap.xml')
    },
    {
      "@type": "ViewAction",
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`)
    },
    {
      "@type": "ViewAction",
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/llms.txt'),
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ],
  "mainEntityOfPage": [
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/sitemap.xml'),
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a structured list of pages available on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`),
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a full and structured list of localized pages for ${languageIso} (${languageIso}-${countryCode}) locale on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/llms.txt'),
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ]
};

const combinedSchema = [webpageSchema, personSchema, organizationSchema];

// Build the language link map for the language picker
const languageLinksMap: Record<string, string> = {};
for (const localeObj of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  // Find alternate author entry for this locale by WWW_AUTHOR_NUMBER
  const altAuthor = authorDataJson.find(a =>
    a.WWW_AUTHOR_NUMBER === author.WWW_AUTHOR_NUMBER &&
    a.M_SLUG === localeObj.M_SLUG &&
    a.PUBLISH_Y_N === "1"
  );
  if (altAuthor) {
    languageLinksMap[localeObj.M_SLUG] = `/${altAuthor.M_SLUG}/${altAuthor.EEAT_URL_20}/${altAuthor.WWW_AUTHOR_SLUG}`;
  } else {
    languageLinksMap[localeObj.M_SLUG] = `/${localeObj.M_SLUG}`;
  }
}
---

<BaseLayout
  languageIso={languageIso}
  countryCode={countryCode}
  contentOrientation={contentOrientation}
  title={authorProfileData.seoTitle}
  description={layoutStringsData.baseLayoutDescriptionPrefix}
  ogImage={authorProfileData.ogImage}
  keywords={pageKeywords}
  schema={combinedSchema}
  languageLinksMap={languageLinksMap}
>
  <!-- Dark Hero Section -->
  <div class="bg-black text-white py-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row rtl:md:flex-row-reverse items-center gap-8">
        <!-- Author Image -->
        <div class="md:w-1/3 flex-shrink-0">
          <div class="relative">
            <div class="absolute inset-0 bg-signal-green/20 rounded-full blur-2xl"></div>
            <img
              src={authorProfileData.image}
              alt={authorProfileData.imageAltText}
              class="relative w-48 h-48 object-cover rounded-full border-4 border-signal-green shadow-xl"
              width={200}
              height={200}
              fetchpriority="high"
            />
          </div>
        </div>

        <!-- Author Info -->
        <div class="md:w-2/3">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{authorProfileData.name}</h1>
          {authorProfileData.jobTitle && (
            <p class="text-xl text-signal-green mb-6">
              {authorProfileData.jobTitle}
              {authorProfileData.company && `${layoutStringsData.jobTitleAtCompanySeparator}${authorProfileData.company}`}
            </p>
          )}

          <!-- Social Links -->
          <div class="flex flex-wrap items-center gap-4 mb-6">
            {authorProfileData.socialLinks.linkedin && (
              <a href={authorProfileData.socialLinks.linkedin} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelLinkedIn}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            )}
            {authorProfileData.socialLinks.github && (
              <a href={authorProfileData.socialLinks.github} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelGithub}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15 4.5c-0.39 -0.1 -1.33 -0.5 -3 -0.5c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5v4h6v-4c0 -0.63 0.15 -1.96 -0.5 -2.5c1.39 -0.13 2.48 -0.58 3.5 -1.5c1.02 -0.92 1.5 -2.31 1.5 -4.5c0 -1.5 -0.25 -2.5 -1 -3.5c0.29 -0.78 0.34 -2 0 -3c-1.56 0 -2.97 1.07 -3.5 1.5Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.96s" dur="0.18s" values="0;0.25"/></path><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="32" stroke-dashoffset="32" d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.84s" values="32;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.96s" dur="0.24s" values="10;0"/></path></g></svg>
              </a>
            )}
            {authorProfileData.socialLinks.twitter && (
              <a href={authorProfileData.socialLinks.twitter} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener">
                <span class="sr-only">{layoutStringsData.socialLinkLabelTwitter}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><g fill="currentColor"><path d="M1 2h2.5L3.5 2h-2.5zM5.5 2h2.5L7.2 2h-2.5z"><animate fill="freeze" attributeName="d" dur="0.48s" values="M1 2h2.5L3.5 2h-2.5zM5.5 2h2.5L7.2 2h-2.5z;M1 2h2.5L18.5 22h-2.5zM5.5 2h2.5L23 22h-2.5z"/></path><path d="M3 2h5v0h-5zM16 22h5v0h-5z"><animate fill="freeze" attributeName="d" begin="0.48s" dur="0.48s" values="M3 2h5v0h-5zM16 22h5v0h-5z;M3 2h5v2h-5zM16 22h5v-2h-5z"/></path><path d="M18.5 2h3.5L22 2h-3.5z"><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.48s" values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"/></path></g></svg>
              </a>
            )}
            {authorProfileData.socialLinks.website && (
              <a href={authorProfileData.socialLinks.website} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelWebsite}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>
              </a>
            )}
            {authorProfileData.socialLinks.email && (
              <a href={`mailto:${authorProfileData.socialLinks.email}`} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelEmail}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><mask id="lineMdEmailArrowUpTwotone0"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M4 5h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur=".72s" values="64;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9-5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin=".72s" dur=".24s" values="24;0"/></path><path fill="#fff" fill-opacity="0" stroke="none" d="M12 11l-8-5h16l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.44s" dur=".18s" values="0;.25"/></path><path fill="#000" fill-opacity="0" stroke="none" d="M19 13c3.31 0 6 2.69 6 6c0 3.31-2.69 6-6 6c-3.31 0-6-2.69-6-6c0-3.31 2.69-6 6-6Z"><set fill="freeze" attributeName="fill-opacity" begin=".96s" to="1"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M19 21v-5"><animate fill="freeze" attributeName="stroke-dashoffset" begin=".96s" dur=".24s" values="6;0"/></path><path stroke-dasharray="4" stroke-dashoffset="4" d="M19 16l2 2M19 16l-2 2"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur=".24s" values="4;0"/></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#lineMdEmailArrowUpTwotone0)"/></svg>
              </a>
            )}
            {authorProfileData.socialLinks.instagram && (
              <a href={authorProfileData.socialLinks.instagram} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelInstagram}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="17" cy="7" r="1.5" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1.56s" dur="0.18s" values="0;1"/></circle>
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path stroke-dasharray="72" stroke-dashoffset="72" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="72;0"/></path>
                    <path stroke-dasharray="28" stroke-dashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.84s" dur="0.72s" values="28;0"/></path>
                  </g>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.youtube && (
              <a href={authorProfileData.socialLinks.youtube} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelYoutube}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <mask id="lineMdYoutubeFilled0"><g fill-opacity="0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" stroke="#fff" stroke-dasharray="64" stroke-dashoffset="64" d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.72s" dur="0.6s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="64;0"/></path><path fill="#000" stroke="none" d="M12 11L12 12L12 13z"><animate fill="freeze" attributeName="d" begin="1.32s" dur="0.24s" values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"/><set fill="freeze" attributeName="fill-opacity" begin="1.32s" to="1"/></path></g></mask>
                  <rect width="24" height="24" fill="currentColor" mask="url(#lineMdYoutubeFilled0)"/>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.quora && (
              <a href={authorProfileData.socialLinks.quora} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelQuora}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.94 17.46h-1.11c-.06.52-.4 1.17-1.25 1.17c-.78 0-1.34-.54-1.88-1.36a7.23 7.23 0 0 0 2.84-5.81C19.54 7 15.86 4 12.01 4C8.21 4 4.5 7.03 4.5 11.47c0 4.4 3.71 7.43 7.51 7.43c.66 0 1.32-.09 1.95-.26c.74 1.27 1.73 2.36 3.6 2.36c3.1 0 3.45-2.86 3.38-3.54m-5.45-2.18c-.73-1.11-1.66-1.98-3.46-1.98c-1.16 0-2.06.38-2.62.86l.46.92c.24-.11.49-.15.75-.15c1.35 0 2.04 1.17 2.63 2.33c-.38.11-.79.16-1.24.16c-2.85 0-4.08-2.01-4.08-5.95c0-3.96 1.23-5.99 4.08-5.99c2.89 0 4.13 2.03 4.13 5.99c-.01 1.58-.21 2.86-.65 3.81"/>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.tiktok && (
              <a href={authorProfileData.socialLinks.tiktok} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelTikTok}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <mask id="lineMdTiktok0"><g stroke-linecap="round" stroke-linejoin="round"><path fill="#fff" stroke="none" stroke-width="2" d="M16.6 5.82c-0.68 -0.78 -1.06 -1.78 -1.06 -2.82h-3.09v12.4c-0.02 0.67 -0.31 1.31 -0.79 1.77c-0.48 0.47 -1.13 0.73 -1.8 0.73c-1.42 0 -2.6 -1.16 -2.6 -2.6c0 -1.72 1.66 -3.01 3.37 -2.48v-3.16c-3.45 -0.46 -6.47 2.22 -6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69 -2.55 5.69 -5.7v-6.29c1.25 0.9 2.76 1.38 4.3 1.38v-3.09c0 0 -1.88 0.09 -3.24 -1.48Z"/><path stroke="#000" fill="none" stroke-dasharray="36" stroke-dashoffset="72" stroke-width="4" d="M11 11h-1c-2.21 0 -4.5 1.79 -4.5 4c0 2.21 1.5 4.5 4.5 4.5c2.21 0 4 -2.29 4 -4.5v-12.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="72;36"/></path><path stroke="#000" fill="none" stroke-dasharray="10" stroke-dashoffset="20" stroke-width="4" d="M18 2.5v8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.12s" values="20;10"/></path></g></mask>
                  <rect width="24" height="24" fill="currentColor" mask="url(#lineMdTiktok0)"/>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.bluesky && (
              <a href={authorProfileData.socialLinks.bluesky} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelBluesky}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path fill="none" stroke="currentColor" stroke-dasharray="80" stroke-dashoffset="80" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.47 5.94c1.83 1.37 3.81 4.14 4.53 5.63c0.72 -1.49 2.7 -4.26 4.53 -5.63c1.33 -0.99 3.47 -1.75 3.47 0.68c0 0.49 -0.28 4.08 -0.45 4.66c-0.57 2.03 -2.65 2.55 -4.5 2.23c3.24 0.55 4.06 2.36 2.28 4.17c-3.38 3.44 -4.85 -0.87 -5.23 -1.97c-0.07 -0.2 -0.1 -0.3 -0.1 -0.22c-0 -0.08 -0.03 0.02 -0.1 0.22c-0.38 1.1 -1.86 5.41 -5.23 1.97c-1.78 -1.81 -0.96 -3.63 2.28 -4.17c-1.85 0.31 -3.93 -0.21 -4.5 -2.23c-0.17 -0.58 -0.45 -4.18 -0.45 -4.66c0 -2.43 2.14 -1.67 3.47 -0.68Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="80;0"/></path>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.mastodon && (
              <a href={authorProfileData.socialLinks.mastodon} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelMastodon}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path stroke-dasharray="88" stroke-dashoffset="88" d="M15.5 21.5c-10.5 2.5 -12.5 -2.5 -12.5 -8.5v-3c0 -6 2.5 -7 7 -7h4c4.5 0 7 1.5 7 5.5v4c0 6.5 -10 4 -13.5 4c-1 0 -1.5 7 8 5Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="88;0"/></path>
                    <path stroke-dasharray="32" stroke-dashoffset="32" d="M7 13.5l0 -5.5c0 0 0.5 -2 2.5 -2c2 0 2.5 2 2.5 2l0 2.5l0 -2.5c0 0 0.5 -2 2.5 -2c2 0 2.5 2 2.5 2l0 5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.84s" dur="0.84s" values="32;0"/></path>
                  </g>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.telegram && (
              <a href={authorProfileData.socialLinks.telegram} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelTelegram}</span>
                <svg class="rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path stroke-dasharray="20" stroke-dashoffset="20" d="M21 5l-2.5 15M21 5l-12 8.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.48s" values="20;0"/></path>
                    <path stroke-dasharray="24" stroke-dashoffset="24" d="M21 5l-19 7.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.48s" values="24;0"/></path>
                    <path stroke-dasharray="14" stroke-dashoffset="14" d="M18.5 20l-9.5 -6.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.48s" dur="0.36s" values="14;0"/></path>
                    <path stroke-dasharray="10" stroke-dashoffset="10" d="M2 12.5l7 1"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.48s" dur="0.36s" values="10;0"/></path>
                    <path stroke-dasharray="8" stroke-dashoffset="8" d="M12 16l-3 3M9 13.5l0 5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.84s" dur="0.36s" values="8;0"/></path>
                  </g>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.discord && (
              <a href={authorProfileData.socialLinks.discord} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelDiscord}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <g fill="currentColor" fill-opacity="0"><circle cx="9" cy="12" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.56s" dur="0.18s" values="0;1"/></circle><circle cx="15" cy="12" r="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="1.74s" dur="0.18s" values="0;1"/></circle><path d="M5 5l7 0.2l7 -0.2l3 10l-3 3.4h-14l-3.5 -3.4l3.5 -10Z"><animate fill="freeze" attributeName="fill-opacity" begin="2.04s" dur="0.18s" values="0;0.25"/></path></g>
                  <g fill="none" stroke="currentColor" stroke-dasharray="32" stroke-dashoffset="32" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 6h2l1 -2c0 0 2.5 0.5 4 1.5c3.53 2.35 3 9.5 3 10.5c-1.33 2.17 -5.5 3.5 -5.5 3.5l-1 -2M12 6h-2l-0.97 -2c0 0 -2.5 0.5 -4 1.5c-3.53 2.35 -3 9.5 -3 10.5c1.33 2.17 5.5 3.5 5.5 3.5l1 -2"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.84s" values="32;0"/></path><path stroke-dasharray="16" stroke-dashoffset="16" d="M5.5 16c5 2.5 8 2.5 13 0"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.96s" dur="0.48s" values="16;0"/></path></g>
                </svg>
              </a>
            )}
            {authorProfileData.socialLinks.snapchat && (
              <a href={authorProfileData.socialLinks.snapchat} class="text-gray-400 hover:text-signal-green transition-colors" target="_blank" rel="noopener noreferrer">
                <span class="sr-only">{layoutStringsData.socialLinkLabelSnapchat}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <g fill-rule="evenodd">
                    <path fill="none" d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                    <path fill="currentColor" d="M12 2a6 6 0 0 0-6 6v1.875L5.1 9.2a1 1 0 1 0-1.2 1.6l1.866 1.4c-.444 1.168-1.527 2.39-3.28 3.443a1.01 1.01 0 0 0-.318 1.412C3.286 18.732 5.06 20 7 20c1.784 0 3.007 2 5 2c2.011 0 3.209-2 5-2c1.94 0 3.714-1.268 4.832-2.945a1.01 1.01 0 0 0-.318-1.412c-1.753-1.053-2.836-2.275-3.28-3.443l1.866-1.4a1 1 0 0 0-1.2-1.6l-.9.675V8a6 6 0 0 0-6-6"/>
                  </g>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Section -->
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Description Card (Author's Bio) -->
      <div class="bg-black text-white p-8 rounded-xl mb-12 relative overflow-hidden prose-invert">
        <div class="absolute top-0 end-0 w-64 h-64 bg-signal-green/10 rounded-full blur-3xl"></div>
        <div class="relative z-10">
          <Fragment set:html={author.AUTHOR_FULL_BIO} />
        </div>
      </div>

      <!-- Languages Section -->
      {languagesData && languagesData.length > 0 && (
        <div class="bg-black rounded-xl p-8 shadow-lg relative overflow-hidden mb-12">
          <div class="absolute inset-0 bg-gradient-to-br from-signal-green/10 to-transparent"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-semibold mb-8 flex items-center text-white">
              <span class="text-signal-green me-3">{layoutStringsData.languagesSectionIcon}</span>
              {layoutStringsData.languagesSectionTitle}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languagesData.map((language) => (
                <div class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800 hover:border-signal-green transition-all duration-300 group flex items-center">
                  {language.flag && <span class="w-8 h-6 me-3" set:html={language.flag}></span>}
                  <h3 class="text-white font-semibold text-lg">{language.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <!-- Footer Links -->
      <div class="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-700 pt-8">
        <a href={layoutStringsData.footerLinkAllAuthorsUrl} class="text-gray-400 hover:text-signal-green transition-colors">
          {layoutStringsData.footerLinkAllAuthorsText}
        </a>
        <a href={layoutStringsData.footerLinkEditorialPolicyUrl} class="text-gray-400 hover:text-signal-green transition-colors">
          {layoutStringsData.footerLinkEditorialPolicyText}
        </a>
      </div>
    </div>
  </div>
</BaseLayout>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .container {
    animation: fadeIn 0.5s ease-out;
  }
  .prose-invert :global(p) {
    color: #D1D5DB;
  }
  .prose-invert :global(a) {
    color: #A7F3D0;
    text-decoration-color: #34D399;
  }
   .prose-invert :global(a:hover) {
    color: #6EE7B7;
    text-decoration-color: #A7F3D0;
  }
  .bg-black .relative.z-10 :global(p) {
     color: #D1D5DB;
     line-height: 1.75;
     margin-bottom: 1rem;
  }
  .bg-black .relative.z-10 :global(p:last-child) {
      margin-bottom: 0;
  }

  /* CHANGE 1: Added RTL-specific styles for better text rendering */
  [dir="rtl"] h1,
  [dir="rtl"] h2,
  [dir="rtl"] h3,
  [dir="rtl"] h4,
  [dir="rtl"] h5,
  [dir="rtl"] h6,
  [dir="rtl"] p,
  [dir="rtl"] span,
  [dir="rtl"] label {
    letter-spacing: 0;
  }

  /* CHANGE 2: Ensure proper text alignment in RTL */
  [dir="rtl"] .text-center {
    text-align: center;
  }
</style>
##########

These two files: src\pages\hr\autori-i-urednici\[authorSlug].astro and src\pages\es\autores-y-editores\[authorSlug].astro are CARBON COPIES of slovenian version, becasue the code is written so dynamically. And same is the case in other src\pages\si, src\pages\hr, src\pages\es or any other language, .astro files!

Here's the src\pages\si\clanki\[articleSlug].astro:
###########
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import articleDataJson from '../../../data/article.json';
import wwwData from '../../../data/www.json';
import commonData from '../../../data/common.json';
import authorDataJson from '../../../data/author.json';
import products from '../../../data/product.json';
import localeData from '../../../data/locale.json';

// --- Type Definitions for Props (originally from ArticleLayout.astro) ---
export interface AuthorInfo {
  name: string;
  profileUrl: string;
  image: string;
}

export interface HeadingInfo {
  depth: number;
  slug: string;
  text: string;
}

export interface RelatedArticleInfo { 
  title: string;
  url: string;
  date: string;
}

// --- Content Props for Sections (originally from ArticleLayout.astro) ---
export interface TocContent {
  title: string;
}

export interface EditorialPolicyContent {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface DisclaimerContent {
  text: string;
}

export interface RelatedArticlesContent { 
  title: string;
  articles: RelatedArticleInfo[];
}

export interface HelpBoxContent {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface BasicSign {
  name: string;
  image: string;
  url: string;
}

export interface AdditionalSign {
  image: string;
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

export const prerender = false;

const { articleSlug } = Astro.params;

// Get the locale from the URL path (e.g., 'si' from /si/clanki/...)
const locale = Astro.url.pathname.split('/')[1];

// Find the matching common data object based on M_SLUG
const common = commonData.find(item => item.M_SLUG === locale) || commonData[0];

// Filter articleData to only include entries matching the current locale
const localeArticleData = articleDataJson.filter(entry => entry.M_SLUG === locale);

// Find the matching article entry from the filtered data
const article = localeArticleData.find(entry => entry.ARTICLE_SLUG === articleSlug);

if (!article || article.PUBLISH_Y_N !== "1") {
  return Astro.redirect('/404');
}

const www = wwwData[0];

// Find the author data from author.json based on matching AUTHOR_ID with PAGE_ID
const authorData = authorDataJson.find(
  (author) => author.PAGE_ID === article.AUTHOR_ID
);

if (!authorData) {
  return Astro.redirect('/404');
}

// Helper function for absolute URLs with locale
const getAbsoluteUrl = (path: string): string => {
    const locale = Astro.url.pathname.split('/')[1];
    return new URL(`/${locale}${path}`, Astro.url.origin).toString();
};

// Helper function for base-level URLs (without locale)
const getBaseUrl = (path: string): string => {
    return new URL(path, Astro.url.origin).toString();
};

// Add this new helper function after the existing getAbsoluteUrl function
const getEditorialPolicyUrl = (slug: string): string => {
    const locale = Astro.url.pathname.split('/')[1];
    return new URL(`/${locale}/${slug}`, Astro.url.origin).toString();
};

// Get language data
const languageIso = article.M_LANGUAGE_ISO;
const countryCode = article.M_COUNTRY_CODE;

// Find matching content orientation from common.json
const contentOrientation = commonData.find(item =>
  item.M_LANGUAGE_ISO === languageIso &&
  item.M_COUNTRY_CODE === countryCode
)?.M_CONTENT_ORIENTATION; // Default to 'ltr' if no match found

// --- Article Specific Metadata ---
const articleMetadata = {
  seoTitle: article.ARTICLE_PAGE_TITLE,
  h1: article.ARTICLE_H1,
  description: article.ARTICLE_META_SEO,
  ogImage: article.ARTICLE_OG_IMAGE_PATH,
  publishDate: article.ARTICLE_PUBLISH_DATE,
  updateDate: article.ARTICLE_UPDATE_DATE,
  author: {
    name: authorData.WWW_AUTHOR,
    profileUrl: `/${authorData.M_SLUG}/${authorData.EEAT_URL_20}/${authorData.WWW_AUTHOR_SLUG}`,
    image: authorData.AUTHOR_PROFILE_IMAGE_PATH
  } as AuthorInfo,
  headings: [
    { depth: 2, slug: common.ARTICLE_H2_1_ID, text: article.ARTICLE_H2_1 },
    { depth: 3, slug: common.ARTICLE_H2_2_ID, text: article.ARTICLE_H2_2 },
    { depth: 2, slug: common.ARTICLE_H2_3_ID, text: article.ARTICLE_H2_3 },
    { depth: 3, slug: common.ARTICLE_H2_4_ID, text: article.ARTICLE_H2_4 },
    { depth: 2, slug: common.ARTICLE_H2_5_ID, text: article.ARTICLE_H2_5 },
    { depth: 2, slug: common.ARTICLE_H2_6_ID, text: article.ARTICLE_H2_6 },
    { depth: 2, slug: common.ARTICLE_H2_7_ID, text: article.ARTICLE_H2_7 }
  ] as HeadingInfo[]
};

// --- Content for Layout Sections & UI Text ---
const layoutContent = { // This data was previously passed as props to ArticleLayout
  authorLabelText: common.ARTICLE_AUTHOR_LABEL,
  publishedLabelText: common.ARTICLE_PUBLISHED_LABEL,
  updatedLabelText: common.ARTICLE_UPDATED_LABEL,
  mainDateLocale: `${article.M_LANGUAGE_ISO}-${article.M_COUNTRY_CODE}`,
  mainDateFormatOptions: { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions,
  relatedDateLocale: `${article.M_LANGUAGE_ISO}-${article.M_COUNTRY_CODE}`,
  relatedDateFormatOptions: { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions,
  tocContent: {
    title: common.ARTICLE_TOC_TITLE
  } as TocContent,
  editorialPolicyContent: {
    title: common.ARTICLE_EDITORIAL_POLICY_TITLE,
    description: common.ARTICLE_EDITORIAL_POLICY_DESC,
    ctaText: common.ARTICLE_EDITORIAL_POLICY_CTA,
    ctaLink: getEditorialPolicyUrl(common.AUTHOR_EDITORIAL_SLUG)
  } as EditorialPolicyContent,
  disclaimerContent: {
    text: common.ARTICLE_DISCLAIMER
  } as DisclaimerContent,
  helpBoxContent: {
    title: common.ARTICLE_HELP_BOX_TITLE,
    description: common.ARTICLE_HELP_BOX_DESC,
    ctaText: common.ARTICLE_HELP_BOX_CTA,
    ctaLink: `mailto:${www.PAGE_INFO_EMAIL}`
  } as HelpBoxContent
};

// Define keywords for the page
const pageKeywords = [
  article.ARTICLE_H1,
  article.ARTICLE_H2_1,
  common.M_COUNTRY_NATIVE,
  www.PAGE_ORGANISATION_FULL_NAME
].join(', ');


// --- Related Articles Data and Logic ---
// Helper function to find article by ID
const findArticleById = (articleId: string) => {
  return articleDataJson.find(entry => entry.PAGE_ID === articleId && entry.PUBLISH_Y_N === "1");
};

// Get related articles from the current article's data
const relatedArticleIds = [
  article.ARTICLE_RELATED_A1,
  article.ARTICLE_RELATED_A2,
  article.ARTICLE_RELATED_A3,
  article.ARTICLE_RELATED_A4,
  article.ARTICLE_RELATED_A5,
  article.ARTICLE_RELATED_A6,
  article.ARTICLE_RELATED_A7,
  article.ARTICLE_RELATED_A8,
  article.ARTICLE_RELATED_A9
].filter(Boolean); // Remove any undefined/null values

// Map related articles to the required format
const allDomainArticles: RelatedArticleInfo[] = relatedArticleIds
  .map(id => {
    const relatedArticle = findArticleById(id);
    if (!relatedArticle) return null;
    
    return {
      title: relatedArticle.ARTICLE_H1,
      url: `/${relatedArticle.M_SLUG}/${relatedArticle.PAGE_COLLECTION_2_LISTING_SLUG}/${relatedArticle.ARTICLE_SLUG}`,
      date: relatedArticle.ARTICLE_PUBLISH_DATE
    };
  })
  .filter(Boolean) as RelatedArticleInfo[]; // Remove any null values and type assert

const relatedArticlesForPage: RelatedArticlesContent = {
  title: common.ARTICLE_RELATED_ARTICLES,
  articles: allDomainArticles
    .filter(articleItem => articleItem.title !== articleMetadata.h1) // Exclude current article
    .slice(0, 9) // Limit to 9 articles
};

// --- Product Data (specific to this article's content) ---
// Helper function to find product by ID
const findProductById = (productId: string) => {
  // Remove 'p' prefix if it exists
  const cleanId = productId.replace('p', '');
  return products.find(p => p.PRODUCT_ID === cleanId && p.PUBLISH_Y_N === "1");
};

// Get basic signs (first 3 products)
const basicSigns: BasicSign[] = [
  article.ARTICLE_P_ID_1,
  article.ARTICLE_P_ID_2,
  article.ARTICLE_P_ID_3
].map(id => {
  const product = findProductById(id);
  if (!product) return null;
  return {
    name: `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} — ${product.PRODUCT_NAME}`,
    image: getBaseUrl(product.PRODUCT_IMAGE_PATH_S),
    url: getBaseUrl(`/${product.M_SLUG}/${product.PAGE_COLLECTION_1_LISTING_SLUG}/${product.PRODUCT_ASCII_SLUG}`)
  };
}).filter(Boolean) as BasicSign[];

// Get additional signs (products 4-8)
const additionalSigns: AdditionalSign[] = [
  article.ARTICLE_P_ID_4,
  article.ARTICLE_P_ID_5,
  article.ARTICLE_P_ID_6,
  article.ARTICLE_P_ID_7,
  article.ARTICLE_P_ID_8
].map(id => {
  const product = findProductById(id);
  if (!product) return null;
  return {
    name: `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} — ${product.PRODUCT_NAME}`,
    image: getBaseUrl(product.PRODUCT_IMAGE_PATH_S),
    url: getBaseUrl(`/${product.M_SLUG}/${product.PAGE_COLLECTION_1_LISTING_SLUG}/${product.PRODUCT_ASCII_SLUG}`)
  };
}).filter(Boolean) as AdditionalSign[];

// --- FAQ Data Structure ---
const faqSection: FaqSection = {
  title: article.ARTICLE_H2_6,
  items: [
    {
      question: article.ARTICLE_FAQ_Q1,
      answer: article.ARTICLE_FAQ_A1
    },
    {
      question: article.ARTICLE_FAQ_Q2,
      answer: article.ARTICLE_FAQ_A2
    },
    {
      question: article.ARTICLE_FAQ_Q3,
      answer: article.ARTICLE_FAQ_A3
    }
  ]
};

const productButtonText = common.ARTICLE_PRODUCT_BUTTON;
const tableLinkText = common.ARTICLE_TABLE_LINK;

// --- Article Schema ---
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": articleMetadata.seoTitle,
  "url": Astro.url.href,
  "description": articleMetadata.description,
  "inLanguage": `${article.M_LANGUAGE_ISO}-${article.M_COUNTRY_CODE}`,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": common.M_HOME_NAME,
        "item": getAbsoluteUrl('/')
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": common.PAGE_COLLECTION_2_LISTING_TITLE,
        "item": getAbsoluteUrl(`/${common.PAGE_COLLECTION_2_LISTING_SLUG}`)
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": articleMetadata.seoTitle,
        "item": Astro.url.href
      }
    ]
  },
  "mainEntity": {
    "@type": "Article",
    "headline": articleMetadata.h1,
    "description": articleMetadata.description,
    "image": getBaseUrl(articleMetadata.ogImage),
    "author": {
      "@type": "Person",
      "name": authorData.WWW_AUTHOR,
      "image": getBaseUrl(authorData.AUTHOR_PROFILE_IMAGE_PATH),
      "url": getAbsoluteUrl(`/${authorData.EEAT_URL_20}/${authorData.WWW_AUTHOR_SLUG}`)
    },
    "datePublished": articleMetadata.publishDate,
    "dateModified": articleMetadata.updateDate,
    "inLanguage": `${article.M_LANGUAGE_ISO}-${article.M_COUNTRY_CODE}`
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqSection.items.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

// Organization Schema 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "keywords": [
    www.PAGE_ORGANISATION_FULL_NAME,
    common.M_COUNTRY_NATIVE,
    common.PAGE_KEYWORD_1,
    common.PAGE_KEYWORD_2,
    common.PAGE_KEYWORD_3,
    common.PAGE_KEYWORD_4,
    common.PAGE_KEYWORD_5,
    common.PAGE_KEYWORD_6
  ].filter(Boolean),
  "description": common.PAGE_DESCRIPTION,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "9"
  },
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [
    www.PAGE_INSTAGRAM_URL,
    www.PAGE_FACEBOOK_URL,
    www.PAGE_TWITTER_URL,
    www.PAGE_LINKEDIN_URL,
    www.PAGE_YOUTUBE_URL,
    www.PAGE_PINTEREST_URL,
    www.PAGE_BLUESKY_URL
  ].filter(Boolean),
  "areaServed": {
    "@type": "Country",
    "name": common.M_COUNTRY,
    "identifier": common.M_COUNTRY_CODE
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/sitemap.xml')
    },
    {
      "@type": "ViewAction",
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`)
    },
    {
      "@type": "ViewAction",
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/llms.txt'),
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ],
  "mainEntityOfPage": [
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/sitemap.xml'),
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a structured list of pages available on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`),
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a full and structured list of localized pages for ${languageIso} (${languageIso}-${countryCode}) locale on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/llms.txt'),
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ]
};

// Combine all schemas
const combinedSchema = [articleSchema, faqSchema, organizationSchema];

const mainContent = { // Content for the main article body
  h1: {
    text: article.ARTICLE_H1,
    content: article.ARTICLE_MAIN_CONTENT_1
  },
  h2_1: {
    text: article.ARTICLE_H2_1,
    content: article.ARTICLE_MAIN_CONTENT_2,
    conclusion: article.ARTICLE_MAIN_CONTENT_3
  },
  h2_2: {
    text: article.ARTICLE_H2_2,
    content: article.ARTICLE_MAIN_CONTENT_4
  },
  h2_3: {
    text: article.ARTICLE_H2_3,
    content: article.ARTICLE_MAIN_CONTENT_5
  },
  h2_4: {
    text: article.ARTICLE_H2_4,
    content: article.ARTICLE_MAIN_CONTENT_6
  },
  // h2_5 content is handled by faqSection structure
  h2_6: {
    text: article.ARTICLE_H2_6,
    content: article.ARTICLE_MAIN_CONTENT_7
  }
};

// Table headers
const tableHeaders = {
    image: common.ARTICLE_TABLE_HEADER_IMAGE,
    name: common.ARTICLE_TABLE_HEADER_NAME,
    link: common.ARTICLE_TABLE_HEADER_LINK
};


// Generic Date Formatter
const formatDate = (dateString: string, locale: string, options: Intl.DateTimeFormatOptions) => {
  return new Date(dateString).toLocaleDateString(locale, options);
};

// Filter headings for TOC
const tocHeadings = articleMetadata.headings.filter(heading => heading.depth >= 2 && heading.depth <= 3);

// Build the language link map
const languageLinksMap = {};
for (const locale of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  // Find alternate article for this locale
  const altArticle = articleDataJson.find(a =>
    a.ARTICLE_NUMBER === article.ARTICLE_NUMBER &&
    a.M_SLUG === locale.M_SLUG &&
    a.PUBLISH_Y_N === "1"
  );
  if (altArticle) {
    languageLinksMap[locale.M_SLUG] = `/${altArticle.M_SLUG}/${altArticle.PAGE_COLLECTION_2_LISTING_SLUG}/${altArticle.ARTICLE_SLUG}`;
  } else {
    languageLinksMap[locale.M_SLUG] = `/${locale.M_SLUG}`;
  }
}

// Get alternative language links for the current article
const getAlternativeLanguageLinks = (currentArticle, localeData, articleDataJson) => {
  const languageLinksMap = {};
  for (const locale of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
    // Find alternate article for this locale
    const altArticle = articleDataJson.find(a =>
      a.ARTICLE_NUMBER === currentArticle.ARTICLE_NUMBER &&
      a.M_SLUG === locale.M_SLUG &&
      a.PUBLISH_Y_N === "1"
    );
    if (altArticle) {
      languageLinksMap[locale.M_SLUG] = `/${altArticle.M_SLUG}/${altArticle.PAGE_COLLECTION_2_LISTING_SLUG}/${altArticle.ARTICLE_SLUG}`;
    } else {
      languageLinksMap[locale.M_SLUG] = `/${locale.M_SLUG}`;
    }
  }
  return languageLinksMap;
};

// Usage:
const alternativeLinks = getAlternativeLanguageLinks(article, localeData, articleDataJson);
---

<BaseLayout
  languageIso={languageIso}
  countryCode={countryCode}
  contentOrientation={contentOrientation}
  title={articleMetadata.seoTitle}
  description={articleMetadata.description}
  ogImage={articleMetadata.ogImage}
  keywords={pageKeywords}
  schema={combinedSchema}
  alternativeLinks={alternativeLinks}
  languageLinksMap={languageLinksMap}
>
  <!-- Hero Section with Dark Background -->
  <header class="bg-black text-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{articleMetadata.h1}</h1>

        {article.ARTICLE_SUBTITLE && (
          <p class="text-xl text-gray-300 mb-6">{article.ARTICLE_SUBTITLE}</p>
        )}

        <div class="flex flex-col sm:flex-row flex-wrap gap-2 sm:items-center">
          <div class="flex items-center">
            <span class="text-gray-300 me-2">{layoutContent.authorLabelText}</span>
            <a href={articleMetadata.author.profileUrl} class="flex items-center group">
              <img
                src={articleMetadata.author.image}
                alt={articleMetadata.author.name}
                class="w-10 h-10 rounded-full me-3"
                width={200}
                height={200}
                fetchpriority="high"
              />
              <span class="text-white group-hover:text-signal-green transition-colors">
                {articleMetadata.author.name}
              </span>
            </a>
          </div>
          <div class="flex items-center">
            <span class="hidden sm:inline mx-2 text-gray-300">•</span>
            <span class="text-gray-300">{layoutContent.publishedLabelText} {formatDate(articleMetadata.publishDate, layoutContent.mainDateLocale, layoutContent.mainDateFormatOptions)}</span>
          </div>
          {articleMetadata.updateDate && layoutContent.updatedLabelText && (
            <div class="flex items-center">
              <span class="hidden sm:inline mx-2 text-gray-300">•</span>
              <span class="text-gray-300">
                {layoutContent.updatedLabelText} {formatDate(articleMetadata.updateDate, layoutContent.mainDateLocale, layoutContent.mainDateFormatOptions)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>

  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Sidebar - Table of Contents -->
      <aside class="lg:w-1/5">
        <div class="sticky top-24">
          {tocHeadings.length > 0 && (
            <nav class="bg-white rounded-lg shadow-sm p-4 border border-gray-100" aria-labelledby="toc-heading">
              <h2 id="toc-heading" class="text-lg font-semibold text-signal-dark mb-2 pb-2 border-b">{layoutContent.tocContent.title}</h2>
              <ul class="space-y-1">
                {tocHeadings.map(heading => (
                  <li class={`${heading.depth === 2 ? 'mt-2 first:mt-0' : 'ml-3'}`}>
                    <a
                      href={`#${heading.slug}`}
                      class={`toc-link block py-1.5 px-2 rounded transition-colors text-sm
                        ${heading.depth === 2
                          ? 'text-signal-dark font-medium hover:bg-gray-50 border-l-2 border-transparent'
                          : 'text-signal-gray hover:text-signal-green'}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </aside>

      <!-- Main article content container -->
      <article class="lg:w-3/5">
        <div class="prose prose-lg max-w-none">

            <h2>{article.ARTICLE_H2_1}</h2>
            <p>{mainContent.h1.content}</p>
            <div class="fear-banner">
              {article.ARTICLE_FEAR_BANNER}
            </div>
          </section>

          <section id={common.ARTICLE_H2_2_ID}>
            <h3>{article.ARTICLE_H2_2}</h3>
            <p>{mainContent.h2_1.content}</p>
            <div class="basic-signs-grid">
              {basicSigns.map(sign => (
                <div class="product-card">
                  <img
                    src={sign.image}
                    alt={sign.name}
                    class="w-full h-48 object-contain p-4"
                  />
                  <div class="p-4 text-center product-card-content">
                    <h4 class="font-medium text-signal-dark mb-4 product-title">{sign.name}</h4>
                    <a
                      href={sign.url}
                      class="block w-full bg-black text-signal-green border border-signal-green font-medium py-2 ps-4 pe-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center"
                    >
                      {productButtonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {mainContent.h2_1.conclusion && <p>{mainContent.h2_1.conclusion}</p>}
          </section>

          {/* Section for H2_2 (actual H2 tag in HTML) */}
          <section id={common.ARTICLE_H2_3_ID}>
            <h2>{article.ARTICLE_H2_3}</h2>
            <p>{mainContent.h2_2.content}</p>
          </section>

          {/* Section for H2_3 (actual H3 tag in HTML) */}
          <section id={common.ARTICLE_H2_4_ID}>
            <h3>{article.ARTICLE_H2_4}</h3>
            <div class="overflow-x-auto my-8">
              <table class="w-full bg-white rounded-lg shadow-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="p-4 text-left">{tableHeaders.image}</th>
                    <th class="p-4 text-left">{tableHeaders.name}</th>
                    <th class="p-4 text-left">{tableHeaders.link}</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalSigns.map((sign, index) => (
                    <tr class={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td class="p-4">
                        <img
                          src={sign.image}
                          alt={sign.name}
                          class="w-20 h-20 object-contain"
                        />
                      </td>
                      <td class="p-4 font-medium text-signal-dark">{sign.name}</td>
                      <td class="p-4">
                        <a
                          href={sign.url}
                          class="text-black underline decoration-signal-green hover:text-signal-green hover:decoration-black transition-colors"
                        >
                          {tableLinkText}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{mainContent.h2_3.content}</p>
            {mainContent.h2_3.conclusion && <p>{mainContent.h2_3.conclusion}</p>}
          </section>

          {/* Section for H2_4 (actual H2 tag in HTML) */}
          <section id={common.ARTICLE_H2_5_ID}>
            <h2>{article.ARTICLE_H2_5}</h2>
            <p>{mainContent.h2_4.content}</p>
            <div class="helpful-banner">
              {article.ARTICLE_HELPFUL_BANNER}
            </div>
          </section>

          {/* FAQ Section */}
          <section id={common.ARTICLE_H2_6_ID} class="py-16 bg-white">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold text-black mb-4 text-center">{faqSection.title}</h2>
              <div class="max-w-3xl mx-auto space-y-4">
                {faqSection.items.map(item => (
                  <details class="bg-gray-50 rounded-lg group">
                    <summary class="p-4 cursor-pointer font-medium flex items-center justify-between">
                      <span>{item.question}</span>
                      <svg 
                        class="w-5 h-5 transform transition-transform group-open:rotate-180 faq-chevron rtl:scale-x-[-1]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </summary>
                    <div class="p-4 pt-0 text-gray-600">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Section for H2_6 (actual H3 tag in HTML) */}
          <section id={common.ARTICLE_H2_7_ID}>
            <h3>{article.ARTICLE_H2_7}</h3>
            <p>{mainContent.h2_6.content}</p>
            <div class="basic-signs-grid">
              {[...basicSigns, ...additionalSigns.slice(0, 3)].map(sign => (
                <div class="product-card">
                  <img
                    src={sign.image}
                    alt={sign.name}
                    class="w-full h-48 object-contain p-4"
                    width={225}
                    height={225}
                  />
                  <div class="p-4 text-center product-card-content">
                    <h4 class="font-medium text-signal-dark mb-4 product-title">{sign.name}</h4>
                    <a
                      href={sign.url}
                      class="block w-full bg-black text-signal-green border border-signal-green font-medium py-2 ps-4 pe-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center"
                    >
                      {productButtonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Editorial Policy Section */}
        <section class="bg-black text-white rounded-xl p-8 my-12" aria-labelledby="editorial-policy-heading">
          <h3 id="editorial-policy-heading" class="text-2xl font-bold mb-4">{layoutContent.editorialPolicyContent.title}</h3>
          <p class="text-gray-300 mb-6">
            {layoutContent.editorialPolicyContent.description}
          </p>
          <a
            href={layoutContent.editorialPolicyContent.ctaLink}
            class="inline-block bg-signal-green text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#a5d429] transition-colors"
          >
            {layoutContent.editorialPolicyContent.ctaText}
          </a>
        </section>

        {/* Disclaimer Section */}
        <aside class="bg-red-50 border border-red-100 rounded-xl p-6 mt-6">
          <p class="text-red-800 text-sm">
            {layoutContent.disclaimerContent.text}
          </p>
        </aside>

        {/* Related Articles Section */}
        {relatedArticlesForPage.articles && relatedArticlesForPage.articles.length > 0 && (
           <section class="border-t border-gray-200 pt-12 mt-12" aria-labelledby="related-articles-heading">
            <h2 id="related-articles-heading" class="text-2xl font-bold mb-8">{relatedArticlesForPage.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticlesForPage.articles.map(relatedArticle => (
                <article class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 class="font-semibold text-lg mb-2">
                    <a href={relatedArticle.url} class="text-signal-dark hover:text-signal-green transition-colors">
                      {relatedArticle.title}
                    </a>
                  </h3>
                  <p class="text-signal-gray text-sm">
                    {formatDate(relatedArticle.date, layoutContent.relatedDateLocale, layoutContent.relatedDateFormatOptions)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>

      <!-- Right Sidebar -->
      <aside class="lg:w-1/5">
        <div class="sticky top-24 space-y-6">
          <!-- Need Help Box -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 class="text-xl font-semibold text-signal-dark mb-3">{layoutContent.helpBoxContent.title}</h3>
            <p class="text-signal-gray mb-4">
              {layoutContent.helpBoxContent.description}
            </p>
            <a
              href={layoutContent.helpBoxContent.ctaLink}
              class="block bg-black text-signal-green border border-signal-green text-center font-medium py-3 px-4 rounded-lg hover:bg-signal-green hover:text-black transition-all"
            >
              {layoutContent.helpBoxContent.ctaText}
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</BaseLayout>

<style>
  .toc-link.active {
    color: var(--signal-green);
    background-color: #f0f9ff;
    font-weight: 600;
  }

  .toc-link.active:where([class*="border-l-4"]) {
    border-left-color: var(--signal-green);
  }
  .toc-link.active:where([class*="border-l-2"]) {
    border-left-color: var(--signal-green);
  }


  /* Custom styles for banners */
  :global(.fear-banner) {
    @apply bg-red-50 border border-red-100 rounded-xl p-6 my-8 flex items-center;
  }

  :global(.fear-banner::before) {
    content: "⚠️";
    @apply text-2xl mr-4;
  }

  :global(.helpful-banner) {
    @apply bg-green-50 border border-green-100 rounded-xl p-6 my-8 flex items-center;
  }

  :global(.helpful-banner::before) {
    content: "💡";
    @apply text-2xl mr-4;
  }

  /* FAQ section styles */
  :global(.faq-section) { /* This class is on the <section id={common.ARTICLE_H2_5_ID}> */
    @apply bg-gray-50 rounded-xl p-6 my-8;
  }

  :global(.faq-section h2) { /* This targets the <h2 id="faq-section-title-for-aria"> */
    @apply text-2xl font-bold mb-6;
  }

  :global(.faq-item) {
    @apply mb-4;
  }

  :global(.faq-question) {
    @apply font-semibold text-lg mb-2;
  }

  :global(.faq-answer) {
    @apply text-signal-gray;
  }

  /* Product grid styles */
  :global(.product-grid) {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8;
  }

  :global(.product-card) {
    @apply bg-white rounded-lg shadow-md overflow-hidden border border-gray-200;
  }

  :global(.product-card img) {
    @apply w-full h-48 object-contain p-4;
  }

  :global(.product-card-content) {
    @apply p-4;
  }

  :global(.product-title) {
    @apply font-medium text-lg mb-4;
  }

  :global(.product-button) {
    @apply inline-block w-full bg-black text-signal-green border border-signal-green font-medium py-2 px-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center;
  }

  /* Basic Signs Grid */
  :global(.basic-signs-grid) {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6 my-8;
  }

  :global(.basic-signs-grid .product-card) {
    @apply bg-white rounded-lg shadow-md overflow-hidden border border-gray-200;
  }

  :global(.basic-signs-grid a) {
    @apply block w-full bg-black text-signal-green border border-signal-green font-medium py-2 px-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center;
  }

  /* Flag icon styles */
  .flag-icon {
    width: 1.5em;
    height: 1em;
    object-fit: cover;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  /* FAQ accordion styles */
  details > summary {
    list-style: none;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }

  /* Specific style for FAQ chevron to override global SVG styles */
  .faq-chevron {
    width: 1.25rem !important; /* 20px */
    height: 1.25rem !important; /* 20px */
    flex-shrink: 0;
  }

  /* CHANGE 1: Added RTL-specific styles for better text rendering */
  [dir="rtl"] h1,
  [dir="rtl"] h2,
  [dir="rtl"] h3,
  [dir="rtl"] h4,
  [dir="rtl"] h5,
  [dir="rtl"] h6,
  [dir="rtl"] p,
  [dir="rtl"] span,
  [dir="rtl"] label {
    letter-spacing: 0;
  }

  /* CHANGE 2: Ensure proper text alignment in RTL */
  [dir="rtl"] .text-center {
    text-align: center;
  }
</style>

<script>
  // Highlight TOC items when scrolling to section
  document.addEventListener('DOMContentLoaded', () => {
    const headings = Array.from(document.querySelectorAll('h2[id], h3[id], h4[id]'));
    const tocLinks = Array.from(document.querySelectorAll('.toc-link'));

    if (headings.length > 0 && tocLinks.length > 0) {
      const observerOptions = {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      };

      const headingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

          if (tocLink) {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              tocLinks.forEach(link => link.classList.remove('active'));
              tocLink.classList.add('active');
            }
          }
        });
      }, observerOptions);

      headings.forEach(heading => {
        if (heading.id) {
            headingObserver.observe(heading);
        }
      });
    }
  });
</script>
###########

Here's the src\pages\si\clanki\index.astro:
############
---
// Path: /src/pages/si/clanki/index.astro
// Purpose: Articles listing page with dynamic RTL support
// Data: JSON dependencies for articles, authors, and locale data
// Dependencies: BaseLayout, infinite scroll, filtering

import BaseLayout from '../../../layouts/BaseLayout.astro';
import articleData from '../../../data/article.json';
import authorData from '../../../data/author.json';
import wwwData from '../../../data/www.json';
import commonData from '../../../data/common.json';
import localeData from '../../../data/locale.json';

// --- DATA FETCHING & INITIAL FILTERING ---

const parentSlug = Astro.url.pathname.split('/')[1];
const currentFolder = Astro.url.pathname.split('/')[2];
const common = commonData.find(item => item.M_SLUG === parentSlug) || commonData[0];
const www = wwwData[0];

// Filter articles for the current locale and published status
const filteredArticles = articleData
    .filter(article => article.M_SLUG === parentSlug && article.PUBLISH_Y_N === "1")
    .sort((a, b) => new Date(b.ARTICLE_PUBLISH_DATE).getTime() - new Date(a.ARTICLE_PUBLISH_DATE).getTime());

// --- NEW: DYNAMIC AUTHOR FILTER (ENHANCED) ---

// 1. Create an efficient lookup map for authors by their ID
const authorMap = new Map(authorData.map(author => [author.AUTHOR_ID, author]));

// 2. Get a unique list of author IDs from the filtered articles
const uniqueAuthorIds = [...new Set(filteredArticles.map(article => article.AUTHOR_ID))];

// 3. Create a list of author objects with their ID and resolved name, then sort it
const uniqueAuthors = uniqueAuthorIds.map(id => {
    const authorDetails = authorMap.get(id);
    return {
        id: id,
        name: authorDetails?.WWW_AUTHOR_ASCII || id, // Use name, fallback to ID
    };
}).sort((a, b) => a.name.localeCompare(b.name));


// --- BATCHING FOR INITIAL LOAD ---
const BATCH_SIZE = 9;
const initialArticles = filteredArticles.slice(0, BATCH_SIZE);

// --- METADATA AND SEO ---

const languageIso = filteredArticles[0]?.M_LANGUAGE_ISO || 'sl';
const countryCode = filteredArticles[0]?.M_COUNTRY_CODE || 'SI';
const contentOrientation = commonData.find(item =>
    item.M_LANGUAGE_ISO === languageIso &&
    item.M_COUNTRY_CODE === countryCode
)?.M_CONTENT_ORIENTATION || 'ltr';

const pageTitle = common.PAGE_COLLECTION_2_LISTING_TITLE;
const pageDescription = common.PAGE_COLLECTION_2_LISTING_DESCRIPTION;
const pageOgImage = common.PAGE_COLLECTION_2_LISTING_OG_IMAGE_PATH;
const pageKeywords = [
    common.PAGE_COLLECTION_2_LISTING_TITLE,
    common.M_COUNTRY_NATIVE,
    www.PAGE_ORGANISATION_FULL_NAME
].join(', ');

const getBaseUrl = (path: string) => new URL(path, Astro.url.origin).toString();

// --- SCHEMA.ORG (UNCHANGED LOGIC: USES FULL LIST FOR SEO) ---

// Organization Schema 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "keywords": [
    www.PAGE_ORGANISATION_FULL_NAME,
    common.M_COUNTRY_NATIVE,
    common.PAGE_KEYWORD_1,
    common.PAGE_KEYWORD_2,
    common.PAGE_KEYWORD_3,
    common.PAGE_KEYWORD_4,
    common.PAGE_KEYWORD_5,
    common.PAGE_KEYWORD_6
  ].filter(Boolean),
  "description": common.PAGE_SLOGAN,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "9"
  },
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [
    www.PAGE_INSTAGRAM_URL,
    www.PAGE_FACEBOOK_URL,
    www.PAGE_TWITTER_URL,
    www.PAGE_LINKEDIN_URL,
    www.PAGE_YOUTUBE_URL,
    www.PAGE_PINTEREST_URL,
    www.PAGE_BLUESKY_URL
  ].filter(Boolean),
  "areaServed": {
    "@type": "Country",
    "name": common.M_COUNTRY,
    "identifier": common.M_COUNTRY_CODE
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/sitemap.xml')
    },
    {
      "@type": "ViewAction",
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`)
    },
    {
      "@type": "ViewAction",
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/llms.txt'),
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ],
  "mainEntityOfPage": [
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/sitemap.xml'),
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a structured list of pages available on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`),
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a full and structured list of localized pages for ${languageIso} (${languageIso}-${countryCode}) locale on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/llms.txt'),
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ]
};

const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": Astro.url.href,
    "name": common.PAGE_COLLECTION_2_LISTING_TITLE,
    "description": common.PAGE_COLLECTION_2_LISTING_DESCRIPTION,
    "url": Astro.url.href,
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": filteredArticles.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Article",
                "@id": `${Astro.url.origin}/${parentSlug}/${currentFolder}/${article.ARTICLE_SLUG}`,
                "name": article.ARTICLE_NAME,
                "url": `${Astro.url.origin}/${parentSlug}/${currentFolder}/${article.ARTICLE_SLUG}`,
                "image": `${Astro.url.origin}${article.ARTICLE_OG_IMAGE_PATH}`,
                "description": article.ARTICLE_SUBTITLE,
                "author": {
                    "@type": "Person",
                    "name": authorMap.get(article.AUTHOR_ID)?.WWW_AUTHOR_ASCII || authorMap.get(article.AUTHOR_ID)?.AUTHOR_ID
                }
            }
        }))
    }
};

const schema = [collectionPageSchema, organizationSchema];

// --- LANGUAGE LINKS ---
const languageLinksMap: Record<string, string> = {};
for (const localeObj of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  const articleForLocale = articleData.find(a =>
    a.M_SLUG === localeObj.M_SLUG && a.PUBLISH_Y_N === "1" && a.PAGE_COLLECTION_2_LISTING_SLUG?.trim()
  );
  if (articleForLocale) {
    languageLinksMap[localeObj.M_SLUG] = `/${localeObj.M_SLUG}/${articleForLocale.PAGE_COLLECTION_2_LISTING_SLUG}`;
  } else {
    languageLinksMap[localeObj.M_SLUG] = `/${localeObj.M_SLUG}`;
  }
}
---

<BaseLayout
    languageIso={languageIso}
    countryCode={countryCode}
    contentOrientation={contentOrientation}
    title={pageTitle}
    description={pageDescription}
    ogImage={pageOgImage}
    keywords={pageKeywords}
    schema={schema}
    languageLinksMap={languageLinksMap}
>
    <!-- Dark Header Section -->
    <div class="bg-black text-white py-16">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                    {common.PAGE_COLLECTION_2_LISTING_TITLE}
                </h1>
            </div>
        </div>
    </div>

    <!-- Articles Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <!-- Controls Bar -->
            <div class="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-200">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <!-- Filters & Sorters -->
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
                        <!-- Sort Dropdown -->
                        <div>
                            <label for="sort-select" class="block text-sm font-medium text-gray-700 mb-1">{common.UI_SORT_BY}</label>
                            <select id="sort-select" class="rounded-md border-gray-300 shadow-sm focus:border-signal-green focus:ring focus:ring-signal-green focus:ring-opacity-50">
                                <option value="newest">{common.UI_SORT_NEWEST}</option>
                                <option value="oldest">{common.UI_SORT_OLDEST}</option>
                                <option value="updated">{common.UI_SORT_UPDATED}</option>
                                <option value="az">{common.UI_SORT_AZ}</option>
                                <option value="za">{common.UI_SORT_ZA}</option>
                            </select>
                        </div>
                        <!-- Author Filter Dropdown -->
                        <div>
                             <label for="author-filter" class="block text-sm font-medium text-gray-700 mb-1">{common.UI_FILTER_BY_AUTHOR}</label>
                            <select id="author-filter" class="rounded-md border-gray-300 shadow-sm focus:border-signal-green focus:ring focus:ring-signal-green focus:ring-opacity-50">
                                <option value="all">{common.UI_FILTER_ALL_AUTHORS}</option>
                                <!-- NEW: Loop over author objects to show names -->
                                {uniqueAuthors.map(author => (
                                    <option value={author.id}>{author.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                     <!-- Info & Clear Button -->
                    <div class="flex items-center gap-4">
                        <span id="article-count" class="text-sm text-gray-600"></span>
                        <button id="clear-filters-btn" class="text-sm font-medium text-signal-green hover:underline">{common.UI_BUTTON_CLEAR_FILTERS}</button>
                    </div>
                </div>
            </div>

            <!-- Articles Grid -->
            <div id="articles-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Initial articles are server-rendered -->
                {initialArticles.map((article) => {
                    const articleUrl = `/${parentSlug}/${currentFolder}/${article.ARTICLE_SLUG}`;
                    return (
                        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <a href={articleUrl} class="block">
                                <img src={article.ARTICLE_OG_IMAGE_PATH} alt={article.ARTICLE_OG_IMAGE_ALT} class="w-full h-48 object-cover" width="1200" height="630" loading="lazy" decoding="async"/>
                                <div class="p-5">
                                    <h3 class="font-bold text-lg text-black group-hover:text-signal-green transition-colors mb-2 line-clamp-2">{article.ARTICLE_H2_1}</h3>
                                    <p class="text-gray-600 text-sm mb-3 line-clamp-3">{article.ARTICLE_SUBTITLE}</p>
                                    <p class="text-gray-500 text-xs mb-4">{common.ARTICLE_UPDATED_LABEL}: {article.ARTICLE_UPDATE_DATE}</p>
                                    <span class="block w-full bg-black text-signal-green border border-signal-green py-2 ps-4 pe-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center font-semibold">{common.ARTICLE_READ_MORE}</span>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
             <!-- Sentinel and Messages -->
             <div id="grid-footer" class="text-center mt-12">
                <div id="no-results" class="hidden text-gray-500">{common.UI_NO_ARTICLES_FOUND}</div>
                <div id="infinite-scroll-trigger" class="h-10 text-gray-500 font-semibold">{common.UI_LOADING_MORE}</div>
             </div>
        </div>
    </section>
</BaseLayout>

<style>
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* CHANGE 1: Added RTL-specific styles for better text rendering */
    [dir="rtl"] h1,
    [dir="rtl"] h2,
    [dir="rtl"] h3,
    [dir="rtl"] h4,
    [dir="rtl"] h5,
    [dir="rtl"] h6,
    [dir="rtl"] p,
    [dir="rtl"] span,
    [dir="rtl"] label {
      letter-spacing: 0;
    }

    /* CHANGE 2: Ensure proper text alignment in RTL */
    [dir="rtl"] .text-center {
      text-align: center;
    }
</style>

<script define:vars={{ allArticles: filteredArticles, parentSlug, currentFolder, common, BATCH_SIZE }}>
    // --- DOM ELEMENTS ---
    const grid = document.getElementById('articles-grid');
    const trigger = document.getElementById('infinite-scroll-trigger');
    const noResultsMsg = document.getElementById('no-results');
    const articleCountSpan = document.getElementById('article-count');
    const sortSelect = document.getElementById('sort-select');
    const authorFilter = document.getElementById('author-filter');
    const clearBtn = document.getElementById('clear-filters-btn');

    // --- STATE MANAGEMENT ---
    let articlesToDisplay = [...allArticles];
    let currentPage = 1;
    let observer;

    // --- HELPER FUNCTIONS ---
    const getSlovenianPluralString = (count) => {
        if (count % 100 === 1) return common.UI_ARTICLE_COUNT_SINGLE;
        if (count % 100 === 2) return common.UI_ARTICLE_COUNT_DUAL;
        if (count % 100 === 3 || count % 100 === 4) return common.UI_ARTICLE_COUNT_FEW;
        return common.UI_ARTICLE_COUNT_PLURAL;
    };
    
    const updateArticleCount = (count) => {
        if (common.M_LANGUAGE_ISO === 'sl') {
            articleCountSpan.textContent = getSlovenianPluralString(count).replace('{count}', count);
        } else {
            const template = count === 1 ? common.UI_ARTICLE_COUNT_SINGLE : common.UI_ARTICLE_COUNT_PLURAL;
            articleCountSpan.textContent = template.replace('{count}', count);
        }
    };
    
    const createArticleCardHTML = (article) => {
        const articleUrl = `/${parentSlug}/${currentFolder}/${article.ARTICLE_SLUG}`;
        return `
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in">
                <a href="${articleUrl}" class="block">
                    <img src="${article.ARTICLE_OG_IMAGE_PATH}" alt="${article.ARTICLE_OG_IMAGE_ALT}" class="w-full h-48 object-cover" width="1200" height="630" loading="lazy" decoding="async"/>
                    <div class="p-5">
                        <h3 class="font-bold text-lg text-black group-hover:text-signal-green transition-colors mb-2 line-clamp-2">${article.ARTICLE_H2_1}</h3>
                        <p class="text-gray-600 text-sm mb-3 line-clamp-3">${article.ARTICLE_SUBTITLE}</p>
                        <p class="text-gray-500 text-xs mb-4">${common.ARTICLE_UPDATED_LABEL}: ${article.ARTICLE_UPDATE_DATE}</p>
                        <span class="block w-full bg-black text-signal-green border border-signal-green py-2 ps-4 pe-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center font-semibold">${common.ARTICLE_READ_MORE}</span>
                    </div>
                </a>
            </div>
        `;
    };

    // --- CORE LOGIC ---
    const applyFiltersAndSort = () => {
        let processedArticles = [...allArticles];
        const selectedAuthor = authorFilter.value;
        if (selectedAuthor !== 'all') {
            processedArticles = processedArticles.filter(a => a.AUTHOR_ID === selectedAuthor);
        }

        const sortBy = sortSelect.value;
        processedArticles.sort((a, b) => {
            switch (sortBy) {
                case 'oldest': return new Date(a.ARTICLE_PUBLISH_DATE).getTime() - new Date(b.ARTICLE_PUBLISH_DATE).getTime();
                case 'updated': return new Date(b.ARTICLE_UPDATE_DATE).getTime() - new Date(a.ARTICLE_UPDATE_DATE).getTime();
                case 'az': return a.ARTICLE_NAME.localeCompare(b.ARTICLE_NAME);
                case 'za': return b.ARTICLE_NAME.localeCompare(a.ARTICLE_NAME);
                case 'newest': default: return new Date(b.ARTICLE_PUBLISH_DATE).getTime() - new Date(a.ARTICLE_PUBLISH_DATE).getTime();
            }
        });
        
        return processedArticles;
    };

    const renderGrid = (articles, append = false) => {
        if (!append) grid.innerHTML = '';
        const batchHtml = articles.map(createArticleCardHTML).join('');
        grid.insertAdjacentHTML('beforeend', batchHtml);
    };

    const updateDisplay = () => {
        articlesToDisplay = applyFiltersAndSort();
        currentPage = 1;
        const initialBatch = articlesToDisplay.slice(0, BATCH_SIZE);
        renderGrid(initialBatch);
        updateArticleCount(articlesToDisplay.length);
        noResultsMsg.style.display = articlesToDisplay.length === 0 ? 'block' : 'none';
        trigger.style.display = articlesToDisplay.length > BATCH_SIZE ? 'block' : 'none';
        setupObserver();
    };
    
    const loadMoreArticles = () => {
        currentPage++;
        const startIndex = (currentPage - 1) * BATCH_SIZE;
        const endIndex = startIndex + BATCH_SIZE;
        const nextBatch = articlesToDisplay.slice(startIndex, endIndex);

        if (nextBatch.length > 0) renderGrid(nextBatch, true);
        if (endIndex >= articlesToDisplay.length) {
            trigger.style.display = 'none';
            if(observer) observer.disconnect();
        }
    };
    
    const setupObserver = () => {
        if(observer) observer.disconnect();
        if(articlesToDisplay.length <= BATCH_SIZE) return;
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) loadMoreArticles();
        }, { rootMargin: '400px' });
        observer.observe(trigger);
    };

    // --- EVENT LISTENERS & INITIALIZATION ---
    sortSelect.addEventListener('change', updateDisplay);
    authorFilter.addEventListener('change', updateDisplay);
    clearBtn.addEventListener('click', () => {
        sortSelect.value = 'newest';
        authorFilter.value = 'all';
        updateDisplay();
    });
    document.addEventListener('DOMContentLoaded', () => {
        updateArticleCount(allArticles.length);
        setupObserver();
    });
</script>
############

Here's the src\pages\si\opozorilna-piramida\[productSlug].astro:
#############
---
// Path: /src/pages/si/opozorilna-piramida/[productSlug].astro
// Purpose: Product detail page with dynamic RTL support
// Data: JSON dependencies for product data, common data, and locale data
// Dependencies: BaseLayout, form actions, validation

import productData from '../../../data/product.json';
import wwwData from '../../../data/www.json';
import commonData from '../../../data/common.json';
import articleDataJson from '../../../data/article.json';
import localeData from '../../../data/locale.json';

import BaseLayout from '../../../layouts/BaseLayout.astro';
import { actions, isInputError } from 'astro:actions';

// --- DATA FETCHING & PROCESSING ---
const { productSlug } = Astro.params;
const locale = Astro.url.pathname.split('/')[1];

const product = productData.find(
  (entry) => 
    entry.PRODUCT_ASCII_SLUG === productSlug && 
    entry.M_SLUG === locale &&
    entry.PUBLISH_Y_N === "1"
);

if (!product) {
  return Astro.redirect('/404');
}

// Find the matching common data object based on M_SLUG. This is our single source of truth for UI strings.
const common = commonData.find(item => item.M_SLUG === locale) || commonData[0];
const www = wwwData[0];

const languageIso = product.M_LANGUAGE_ISO;
const countryCode = product.M_COUNTRY_CODE;
const contentOrientation = common.M_CONTENT_ORIENTATION || 'ltr';

// Helper functions for URLs
const getAbsoluteUrl = (path: string): string => new URL(`/${locale}${path}`, Astro.url.origin).toString();
const getBaseUrl = (path: string): string => new URL(path, Astro.url.origin).toString();

// Interfaces (can be moved to a types.ts file if shared)
export interface FaqItemData { 
  question: string; answer: string;
}
export interface RelatedProductInfo { 
  id: string; title: string; image: string; category: string; url: string;
}
export interface RelatedArticleInfo { 
  title: string; url: string; date: string;
}

const productCoreData = {
  h1: product.PRODUCT_H1,
  seoTitle: `${product.PRODUCT_NAME} — ${product.PRODUCT_KEYWORD_1}`,
  subtitle: product.PRODUCT_SUBTITLE,
  description: product.PRODUCT_META_SEO,
  price: product.M_PRODUCT_PRICE,
  ogImage: product.PRODUCT_OG_IMAGE_PATH,
  image: product.PRODUCT_IMAGE_PATH_L,
  specifications: {
    dimensions: common.PRODUCT_SPECIFICATIONS_VALUE_1,
    material: common.PRODUCT_SPECIFICATIONS_VALUE_2,
    weight: common.PRODUCT_SPECIFICATIONS_VALUE_3,
    visibility: common.PRODUCT_SPECIFICATIONS_VALUE_4,
    windResistance: common.PRODUCT_SPECIFICATIONS_VALUE_5,
    setupTime: common.PRODUCT_SPECIFICATIONS_VALUE_6
  },
  category: product.PAGE_COLLECTION_1_LISTING_SLUG,
  productId: product.PRODUCT_ID
};

const productFaqItems: FaqItemData[] = [
  { question: product.PRODUCT_Q1, answer: product.PRODUCT_A1 },
  { question: product.PRODUCT_Q2, answer: product.PRODUCT_A2 },
  { question: product.PRODUCT_Q3, answer: product.PRODUCT_A3 },
  { question: product.PRODUCT_Q4, answer: product.PRODUCT_A4 },
  { question: product.PRODUCT_Q5, answer: product.PRODUCT_A5 },
  { question: product.PRODUCT_Q6, answer: product.PRODUCT_A6 },
  { question: product.PRODUCT_Q7, answer: product.PRODUCT_A7 },
  { question: product.PRODUCT_Q8, answer: product.PRODUCT_A8 },
  { question: product.PRODUCT_Q9, answer: product.PRODUCT_A9 },
  { question: product.PRODUCT_Q10, answer: product.PRODUCT_A10 },
  { question: product.PRODUCT_Q11, answer: product.PRODUCT_A11 },
  { question: product.PRODUCT_Q12, answer: product.PRODUCT_A12 },
  { question: product.PRODUCT_Q13, answer: product.PRODUCT_A13 }
].filter(item => item.question && item.answer);

// Helper functions for finding related content
const findProductById = (id: string) => productData.find(p => p.PRODUCT_ID === id && p.PUBLISH_Y_N === "1");
const findArticleById = (id: string) => articleDataJson.find(a => a.PAGE_ID === id && a.PUBLISH_Y_N === "1");

// Get related products
const filteredRelatedProducts: RelatedProductInfo[] = [
  product.PRODUCT_RELATED_P1, product.PRODUCT_RELATED_P2, product.PRODUCT_RELATED_P3, product.PRODUCT_RELATED_P4, product.PRODUCT_RELATED_P5, product.PRODUCT_RELATED_P6
].map(id => {
  const p = findProductById(id);
  if (!p) return null;
  return {
    id: p.PRODUCT_ID,
    title: `${p.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} — ${p.PRODUCT_NAME}`,
    image: getBaseUrl(p.PRODUCT_IMAGE_PATH_L),
    category: p.PAGE_COLLECTION_1_LISTING_SLUG,
    url: getBaseUrl(`/${p.M_SLUG}/${p.PAGE_COLLECTION_1_LISTING_SLUG}/${p.PRODUCT_ASCII_SLUG}`)
  };
}).filter(Boolean).filter(p => p!.id !== product.PRODUCT_ID).slice(0, 3) as RelatedProductInfo[];

// Get related articles
const relatedArticles: RelatedArticleInfo[] = [
  product.PRODUCT_RELATED_A1, product.PRODUCT_RELATED_A2, product.PRODUCT_RELATED_A3, product.PRODUCT_RELATED_A4, product.PRODUCT_RELATED_A5, product.PRODUCT_RELATED_A6, product.PRODUCT_RELATED_A7
].map(id => {
    const a = findArticleById(id);
    if (!a) return null;
    return {
      title: a.ARTICLE_H1,
      url: `/${a.M_SLUG}/${a.PAGE_COLLECTION_2_LISTING_SLUG}/${a.ARTICLE_SLUG}`,
      date: a.ARTICLE_PUBLISH_DATE
    };
  }).filter(Boolean) as RelatedArticleInfo[];

const pageKeywords = [
  product.PRODUCT_NAME,
  product.PRODUCT_KEYWORD_1,
  product.PRODUCT_KEYWORD_2,
  product.PRODUCT_KEYWORD_3,
  product.PRODUCT_KEYWORD_4,
  product.PRODUCT_KEYWORD_5,
  product.PRODUCT_KEYWORD_6,
  product.PRODUCT_KEYWORD_7,
  common.M_COUNTRY_NATIVE,
  www.PAGE_ORGANISATION_FULL_NAME
].join(', ');

const productQuantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 30];

// --- SCHEMA.ORG & METADATA ---
const combinedSchema = [{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.PRODUCT_H1,
  "image": getBaseUrl(product.PRODUCT_IMAGE_PATH_L),
  "mpn": product.PRODUCT_MPN,
  "category": product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER,
  "weight": {
    "@type": "QuantitativeValue",
    "value": common.PRODUCT_SPECIFICATIONS_VALUE_3.replace(/[^0-9.]/g, ''),
    "unitCode": "KGM"
  },
  "keywords": [
    product.PRODUCT_NAME,
    common.M_LANGUAGE_NATIVE,
    product.PRODUCT_KEYWORD_1,
    product.PRODUCT_KEYWORD_2,
    product.PRODUCT_KEYWORD_3,
    product.PRODUCT_KEYWORD_4,
    product.PRODUCT_KEYWORD_5,
    product.PRODUCT_KEYWORD_6,
    product.PRODUCT_KEYWORD_7
  ],
  "description": product.PRODUCT_META_SEO,
  "brand": {
    "@type": "Brand",
    "name": www.PAGE_ORGANISATION_URL_NAME
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": product.PRODUCT_RATING_VALUE,
      "bestRating": 5
    },
    "author": {
      "@type": "Person",
      "name": product.PRODUCT_TESTIMONIAL_PERSON_1
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": product.PRODUCT_RATING_VALUE,
    "reviewCount": product.PRODUCT_REVIEW_COUNT
  },
  "offers": {
    "@type": "Offer",
    "url": Astro.url.href,
    "priceCurrency": product.M_CURRENCY_CODE,
    "price": product.M_PRODUCT_PRICE_RECALC,
    "priceValidUntil": product.PRODUCT_EXPIRATION_DATE,
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  }
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": productFaqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
}, {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "keywords": [
    www.PAGE_ORGANISATION_FULL_NAME,
    common.M_COUNTRY_NATIVE,
    common.PAGE_KEYWORD_1,
    common.PAGE_KEYWORD_2,
    common.PAGE_KEYWORD_3,
    common.PAGE_KEYWORD_4,
    common.PAGE_KEYWORD_5,
    common.PAGE_KEYWORD_6
  ].filter(Boolean),
  "description": common.PAGE_DESCRIPTION,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "9"
  },
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [
    www.PAGE_INSTAGRAM_URL,
    www.PAGE_FACEBOOK_URL,
    www.PAGE_TWITTER_URL,
    www.PAGE_LINKEDIN_URL,
    www.PAGE_YOUTUBE_URL,
    www.PAGE_PINTEREST_URL,
    www.PAGE_BLUESKY_URL
  ].filter(Boolean),
  "areaServed": {
    "@type": "Country",
    "name": common.M_COUNTRY,
    "identifier": common.M_COUNTRY_CODE
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/sitemap.xml')
    },
    {
      "@type": "ViewAction",
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`)
    },
    {
      "@type": "ViewAction",
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/llms.txt'),
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ],
  "mainEntityOfPage": [
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/sitemap.xml'),
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a structured list of pages available on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`),
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a full and structured list of localized pages for ${languageIso} (${languageIso}-${countryCode}) locale on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/llms.txt'),
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ]
}];

// --- FORM HANDLING ---
const submissionResult = await Astro.getActionResult(actions.submitOrder);
const formErrors: Record<string, string[] | undefined> = {};
let genericError: string | undefined = undefined;
let successMessage: string | undefined = undefined;

if (submissionResult) {
  if (submissionResult.error) {
    if (isInputError(submissionResult.error)) {
      Object.assign(formErrors, submissionResult.error.fields);
    } else {
      genericError = submissionResult.error.message;
    }
  } else if (submissionResult.data?.success) {
    // The success message now comes directly from the server action, already translated.
    successMessage = submissionResult.data.message;
  }
}

const getFieldError = (fieldName: string): string | undefined => formErrors[fieldName]?.[0];

// Language switcher data
const languageLinksMap: Record<string, string> = {};
for (const localeObj of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  const productForLocale = productData.find(p => p.M_SLUG === localeObj.M_SLUG && p.PUBLISH_Y_N === "1" && p.PAGE_COLLECTION_1_LISTING_SLUG);
  languageLinksMap[localeObj.M_SLUG] = productForLocale ? `/${localeObj.M_SLUG}/${productForLocale.PAGE_COLLECTION_1_LISTING_SLUG}` : `/${localeObj.M_SLUG}`;
}

---

<BaseLayout
  languageIso={languageIso}
  countryCode={countryCode}
  contentOrientation={contentOrientation}
  title={productCoreData.seoTitle}
  description={productCoreData.description}
  ogImage={productCoreData.ogImage}
  keywords={pageKeywords}
  schema={combinedSchema}
  languageLinksMap={languageLinksMap}
>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row rtl:lg:flex-row-reverse gap-8">
      <div class="lg:w-2/3">
        <h1 class="text-3xl font-bold text-signal-dark mb-6">{productCoreData.h1}</h1>
        <div class="product-gallery mb-8">
          <div class="border-2 border-signal-green rounded-lg p-2">
            <img
            src={productCoreData.image}
            alt={productCoreData.h1}
            class="w-full h-[350px] object-contain animate-fade-in"
            width="350"
            height="350"
            fetchpriority="high"
            />
          </div>
        </div>
        <p class="text-lg text-gray-600 mb-6">{productCoreData.subtitle}</p>

        <div class="lg:hidden mb-8">
          <div class="bg-black text-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4 text-white">{common.PRODUCT_SPECIFICATIONS_TITLE}</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 5h11m-2 2l2-2l-2-2M5 3L3 5l2 2m14 3v11m-2-2l2 2l2-2m0-7l-2-2l-2 2M3 12a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_1}</span><span class="text-sm text-gray-300">{productCoreData.specifications.dimensions}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_2}</span><span class="text-sm text-gray-300">{productCoreData.specifications.material}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m2.825 0h1.75q.75 0 1.3.5t.675 1.225l1.425 10q.125.9-.462 1.588T18 21H6q-.925 0-1.513-.687t-.462-1.588l1.425-10Q5.575 8 6.125 7.5t1.3-.5h1.75q-.075-.25-.125-.487T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .275-.05.513T14.825 7"/></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_3}</span><span class="text-sm text-gray-300">{productCoreData.specifications.weight}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_4}</span><span class="text-sm text-gray-300">{productCoreData.specifications.visibility}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 512 512" aria-hidden="true">
                    <defs>
                      <symbol id="meteoconsWind_mobile" viewBox="0 0 342 234">
                        <path fill="none" stroke="currentColor" stroke-dasharray="148" stroke-linecap="round" stroke-miterlimit="10" stroke-width="18" d="M264.2 21.3A40 40 0 1 1 293 89H9">
                          <animate attributeName="stroke-dashoffset" dur="7.2s" repeatCount="indefinite" values="0; 2960"/>
                        </path>
                        <path fill="none" stroke="currentColor" stroke-dasharray="110" stroke-linecap="round" stroke-miterlimit="10" stroke-width="18" d="M148.2 212.7A40 40 0 1 0 177 145H9">
                          <animate attributeName="stroke-dashoffset" dur="7.2s" repeatCount="indefinite" values="0; 1540"/>
                        </path>
                      </symbol>
                    </defs>
                    <use width="342" height="234" href="#meteoconsWind_mobile" transform="translate(85 139)"/>
                  </svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_5}</span><span class="text-sm text-gray-300">{productCoreData.specifications.windResistance}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/>
                    <rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1">
                      <animateTransform attributeName="transform" dur="10.8s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </rect>
                    <rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1">
                      <animateTransform attributeName="transform" dur="0.9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </rect>
                  </svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_6}</span><span class="text-sm text-gray-300">{productCoreData.specifications.setupTime}</span></div>
              </li>
            </ul>
          </div>
        </div>

        <div class="product-details">
          <p class="text-2xl text-black font-semibold pl-4 pr-4 underline decoration-signal-green mb-4">{productCoreData.price}</p>
          <a href="#narocilnica" class="inline-block bg-black text-signal-green border border-signal-green font-semibold py-3 px-6 rounded-lg hover:bg-signal-green hover:text-black transition-colors mb-8">
            <span class="flex items-center">{common.FORM_BUTTON_TO_ORDER}<svg class="w-5 h-5 ms-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></span>
          </a>
          
          <!-- Content  -->
          <div class="prose max-w-none mb-8">
            <div class="product-description space-y-6">
              <section aria-labelledby="peer-pressure-heading" class="bg-signal-green/5 p-6 rounded-lg border-l-4 border-signal-green mb-8">
                <div class="flex items-center gap-4">
                  <svg class="w-12 h-12 text-signal-green" viewBox="0 0 16 16" aria-hidden="true">
                    <g fill="#000">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7m1.679-4.493l-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548l1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/>
                      <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                    </g>
                  </svg>
                  <h2 id="peer-pressure-heading" class="text-xl font-semibold">{product.PRODUCT_PEER_PRESSURE_1}</h2>
                </div>
              </section>

              <section aria-labelledby="authority-proof-heading" class="bg-gray-50 p-6 rounded-lg">
                <h2 id="authority-proof-heading" class="text-xl font-semibold mb-4">{product.PRODUCT_AUTHORITY_PROOF_H2}</h2>
                <ul class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <li class="flex items-center gap-4">
                    <svg class="w-10 h-10 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    <span class="text-lg">{product.PRODUCT_AUTHORITY_PROOF_1}</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <svg class="w-10 h-10 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    <span class="text-lg">{product.PRODUCT_AUTHORITY_PROOF_2}</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <svg class="w-10 h-10 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    <span class="text-lg">{product.PRODUCT_AUTHORITY_PROOF_3}</span>
                  </li>
                </ul>
              </section>
              
              <section aria-labelledby="fear-trigger-heading" class="bg-yellow-50 p-6 rounded-lg">
                <div class="flex flex-col space-y-4">
                  <div class="flex items-center gap-4">
                    <svg class="w-12 h-12 text-yellow-700" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 11a1 1 0 1 1 0 2a1 1 0 0 1 0-2m0-9a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1"/></svg>
                    <h2 id="fear-trigger-heading" class="text-xl font-semibold text-yellow-800">{product.PRODUCT_FEAR_TRIGGER_1}</h2>
                  </div>
                  <p class="text-yellow-700 ms-16">
                    {product.PRODUCT_FEAR_TRIGGER_2}
                  </p>
                </div>
              </section>

              <div class="space-y-4">
                <p>{product.PRODUCT_USE_CASES_COMPILED}</p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>{product.PRODUCT_USE_CASE_1}</li>
                  <li>{product.PRODUCT_USE_CASE_2}</li>
                  <li>{product.PRODUCT_USE_CASE_3}</li>
                </ul>
              </div>

              <section aria-labelledby="push-trigger-heading" class="bg-signal-green/10 p-6 rounded-lg border-l-4 border-signal-green">
                <h2 id="push-trigger-heading" class="text-xl font-semibold">{product.PRODUCT_PUSH_TRIGGER_1}</h2>
              </section>
            </div>
          </div>

          <section id="narocilnica" class="scroll-mt-24 mb-8">
            <div class="bg-white rounded-lg shadow-sm p-8 border-2 border-signal-green">
              <h2 class="text-2xl font-bold mb-6 text-black">{common.FORM_INQUIRY_TITLE}</h2>
              <p class="text-signal-gray mb-6">{common.FORM_ORDER_SUBTITLE_BASE} {productCoreData.h1}.</p>

              {successMessage && !submissionResult?.error && (
                <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                  {successMessage}
                </div>
              )}

              {genericError && (
                <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  {genericError}
                </div>
              )}

              <form id="productOrderForm" method="POST" action={actions.submitOrder.safe} class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="hidden" name="productTitle" value={productCoreData.h1} />
                <input type="hidden" name="pageUrl" value={Astro.url.href} />
                <input type="hidden" name="locale" value={locale} />

                <div>
                  <label for="form-name" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_NAME}</label>
                  <input id="form-name" type="text" name="Name" placeholder={common.FORM_PLACEHOLDER_NAME} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Name') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('Name') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_NAME_REQUIRED}</p>}
                </div>
                <div>
                  <label for="form-surname" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_SURNAME}</label>
                  <input id="form-surname" type="text" name="Last Name" placeholder={common.FORM_PLACEHOLDER_SURNAME} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Last Name') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('Last Name') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_SURNAME_REQUIRED}</p>}
                </div>
                <div>
                  <label for="form-company" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_COMPANY}</label>
                  <input id="form-company" type="text" name="Company" placeholder={common.FORM_PLACEHOLDER_COMPANY} class="w-full ps-3 pe-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label for="form-vatid" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_VAT_ID}</label>
                  <input id="form-vatid" type="text" name="VAT ID" placeholder={common.FORM_PLACEHOLDER_VAT_ID} class="w-full ps-3 pe-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label for="form-street" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_STREET}</label>
                  <input id="form-street" type="text" name="Street" placeholder={common.FORM_PLACEHOLDER_STREET} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Street') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('Street') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_STREET_REQUIRED}</p>}
                </div>
                <div>
                  <label for="form-city" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_CITY}</label>
                  <input id="form-city" type="text" name="Location" placeholder={common.FORM_PLACEHOLDER_CITY} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Location') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('Location') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_CITY_REQUIRED}</p>}
                </div>
                <div>
                  <label for="form-zip" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_ZIP}</label>
                  <input id="form-zip" type="text" name="Postal Code" placeholder={common.FORM_PLACEHOLDER_ZIP} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Postal Code') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('Postal Code') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_ZIP_REQUIRED}</p>}
                </div>
                <div>
                  <label for="form-email" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_EMAIL}</label>
                  <input id="form-email" type="email" name="email" placeholder={common.FORM_PLACEHOLDER_EMAIL} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('email') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('email') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_EMAIL_INVALID}</p>}
                </div>
                <div>
                  <label for="form-phone" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_PHONE}</label>
                  <input id="form-phone" type="tel" name="Telephone Number" placeholder={common.FORM_PLACEHOLDER_PHONE} class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Telephone Number') ? 'border-red-500' : 'border-gray-300']} required />
                  {getFieldError('Telephone Number') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_PHONE_REQUIRED}</p>}
                </div>
                <div>
                  <label for="form-quantity" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_QUANTITY}</label>
                  <select id="form-quantity" name="Quantity" class:list={["w-full ps-3 pe-3 py-2 border rounded-md", getFieldError('Quantity') ? 'border-red-500' : 'border-gray-300']} required>
                    <option value="">{common.FORM_OPTION_QUANTITY_DEFAULT}</option>
                    {productQuantityOptions.map(qty => <option value={String(qty)}>{qty}</option>)}
                  </select>
                  {getFieldError('Quantity') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_QUANTITY_REQUIRED}</p>}
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_PAYMENT} ({productCoreData.price} + {common.M_VAT_NAME_LABEL})*</label>
                  <div role="radiogroup">
                    <label class="flex items-center"><input type="radio" name="Payment" value="Cash on Delivery" class="me-2" required /><span>{common.FORM_OPTION_PAYMENT_COD}</span></label>
                    <label class="flex items-center"><input type="radio" name="Payment" value="Proforma Invoice" class="me-2" required /><span>{common.FORM_OPTION_PAYMENT_PREINVOICE}</span></label>
                    {getFieldError('Payment') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_PAYMENT_REQUIRED}</p>}
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label for="form-message" class="block text-sm font-medium text-signal-gray mb-1">{common.FORM_LABEL_MESSAGE}</label>
                  <textarea id="form-message" name="Message" rows="4" placeholder={common.FORM_PLACEHOLDER_MESSAGE_ORDER} class="w-full ps-3 pe-3 py-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="flex items-center">
                    <input id="form-terms" type="checkbox" name="Conditions" class:list={["mr-2", getFieldError('Conditions') ? 'border-red-500' : '']} required />
                    <span class="text-sm">{common.FORM_LABEL_TERMS}</span>
                  </label>
                  {getFieldError('Conditions') && <p class="text-red-500 text-sm mt-1">{common.FORM_VALIDATION_TERMS_REQUIRED}</p>}
                </div>

                <div class="md:col-span-2">
                  <button type="submit" class="w-full bg-black text-signal-green border border-signal-green font-semibold py-3 px-6 rounded-lg hover:bg-signal-green hover:text-black transition-colors flex items-center justify-center relative overflow-hidden">
                    <span class="relative z-10">{common.FORM_BUTTON_SUBMIT_ORDER}</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_2s_infinite]" aria-hidden="true"></div>
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section class="bg-signal-green rounded-xl p-8 mt-12">
            <h2 class="text-2xl font-bold mb-6 text-black">{common.FORM_FAQ_TITLE}</h2>
            <div class="space-y-4">
              {productFaqItems.map((item) => (
                <details class="bg-signal-green rounded-lg group">
                  <summary class="p-4 cursor-pointer font-medium text-black hover:bg-[#a5d429] flex items-center justify-between rounded-t-lg border border-black group-open:rounded-b-none">
                    {item.question}
                    <svg class="w-6 h-6 transform transition-transform group-open:rotate-180 rtl:scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div class="p-4 text-white bg-black rounded-b-lg">{item.answer}</div>
                </details>
              ))}
            </div>
            <div class="text-center mt-8">
              <a href="#narocilnica" class="inline-flex items-center bg-white text-black border border-black font-medium py-3 ps-6 pe-6 rounded-lg hover:bg-black hover:text-white transition-colors">
                <svg class="w-5 h-5 me-2 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" /></svg>
                {common.FORM_BUTTON_BACK_TO_ORDER}
              </a>
            </div>
          </section>
        </div>

        {filteredRelatedProducts.length > 0 && (
          <section aria-labelledby="related-products-heading" class="mt-16">
            <h2 id="related-products-heading" class="text-2xl font-bold mb-6">{common.PRODUCT_PAGE_RELATED_PRODUCTS_TITLE}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRelatedProducts.map(relatedP => (
                <div class="product-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <a href={relatedP.url} class="block relative overflow-hidden pb-[75%]">
                    <img
                      src={relatedP.image}
                      alt={relatedP.title}
                      loading="lazy"
                      class="absolute inset-0 w-full h-full object-cover object-center"
                      width="350"
                      height="350"
                      />
                  </a>
                  <div class="p-4">
                    <h3 class="font-medium text-lg mb-4"><a href={relatedP.url} class="text-signal-dark hover:text-signal-green transition-colors">{relatedP.title}</a></h3>
                    <a href={relatedP.url} class="inline-block bg-white border border-signal-gray hover:border-signal-green text-signal-dark font-medium py-2 ps-4 pe-4 rounded-md transition-colors w-full text-center">{common.PRODUCT_PAGE_RELATED_PRODUCT_VIEW_BUTTON_TEXT}</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="related-articles-heading" class="mt-16">
            <h2 id="related-articles-heading" class="text-2xl font-bold mb-6">{common.ARTICLE_RELATED_ARTICLES}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(article => (
                <article class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 class="font-semibold text-lg mb-2">
                    <a href={article.url} class="text-signal-dark hover:text-signal-green transition-colors">
                      {article.title}
                    </a>
                  </h3>
                  <p class="text-signal-gray text-sm">
                    {new Date(article.date).toLocaleDateString(`${languageIso}-${countryCode}`, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <div class="hidden lg:block lg:w-1/3">
        <aside class="bg-black text-white rounded-lg shadow-sm p-6 sticky top-20">
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4 text-white">{common.PRODUCT_SPECIFICATIONS_TITLE}</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 5h11m-2 2l2-2l-2-2M5 3L3 5l2 2m14 3v11m-2-2l2 2l2-2m0-7l-2-2l-2 2M3 12a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_1}</span><span class="text-sm text-gray-300">{productCoreData.specifications.dimensions}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_2}</span><span class="text-sm text-gray-300">{productCoreData.specifications.material}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m2.825 0h1.75q.75 0 1.3.5t.675 1.225l1.425 10q.125.9-.462 1.588T18 21H6q-.925 0-1.513-.687t-.462-1.588l1.425-10Q5.575 8 6.125 7.5t1.3-.5h1.75q-.075-.25-.125-.487T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .275-.05.513T14.825 7"/></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_3}</span><span class="text-sm text-gray-300">{productCoreData.specifications.weight}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_4}</span><span class="text-sm text-gray-300">{productCoreData.specifications.visibility}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 512 512" aria-hidden="true">
                    <defs>
                      <symbol id="meteoconsWind_desktop" viewBox="0 0 342 234">
                        <path fill="none" stroke="currentColor" stroke-dasharray="148" stroke-linecap="round" stroke-miterlimit="10" stroke-width="18" d="M264.2 21.3A40 40 0 1 1 293 89H9">
                          <animate attributeName="stroke-dashoffset" dur="7.2s" repeatCount="indefinite" values="0; 2960"/>
                        </path>
                        <path fill="none" stroke="currentColor" stroke-dasharray="110" stroke-linecap="round" stroke-miterlimit="10" stroke-width="18" d="M148.2 212.7A40 40 0 1 0 177 145H9">
                          <animate attributeName="stroke-dashoffset" dur="7.2s" repeatCount="indefinite" values="0; 1540"/>
                        </path>
                      </symbol>
                    </defs>
                    <use width="342" height="234" href="#meteoconsWind_desktop" transform="translate(85 139)"/>
                  </svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_5}</span><span class="text-sm text-gray-300">{productCoreData.specifications.windResistance}</span></div>
              </li>
              <li class="flex items-start">
                <span class="text-signal-green me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/>
                    <rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1">
                      <animateTransform attributeName="transform" dur="10.8s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </rect>
                    <rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1">
                      <animateTransform attributeName="transform" dur="0.9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </rect>
                  </svg>
                </span>
                <div><span class="block font-medium text-white">{common.PRODUCT_SPECIFICATIONS_LABEL_6}</span><span class="text-sm text-gray-300">{productCoreData.specifications.setupTime}</span></div>
              </li>
            </ul>
          </div>
          <div class="mb-6 border-t border-gray-700 pt-6">
            <h3 class="text-lg font-semibold mb-4 text-white">{common.M_CUSTOMER_SUPPORT}</h3>
            <div class="flex items-center">
              <span class="text-signal-green me-3"><svg class="rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true"><mask id="lineMdEmailArrowRightFilled_customerSupport"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.72s" values="64;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.72s" dur="0.24s" values="24;0"/></path><path fill="#fff" fill-opacity="0" stroke="none" d="M12 11l-8 -5h16l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.44s" dur="0.6s" values="0;1"/></path><path fill="#000" fill-opacity="0" stroke="none" d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z"><set fill="freeze" attributeName="fill-opacity" begin="0.96s" to="1"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M16 19h5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.96s" dur="0.24s" values="6;0"/></path><path stroke-dasharray="4" stroke-dashoffset="4" d="M21 19l-2 2M21 19l-2 -2"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.24s" values="4;0"/></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#lineMdEmailArrowRightFilled_customerSupport)"/></svg></span>
              <a href={`mailto:${www.PAGE_INFO_EMAIL}`} class="text-signal-green hover:underline">{www.PAGE_INFO_EMAIL}</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</BaseLayout>

<style>
  @keyframes shine { 100% { transform: translateX(100%); } }
  .animate-\[shine\_2s\_infinite\] { animation: shine 2s infinite; }
  details > summary { list-style: none; }
  details > summary::-webkit-details-marker { display: none; }
  /* Client side validation styles for modern browsers */
  :where(input, select, textarea):user-invalid {
      border-color: #ef4444; /* red-500 */
  }

  /* CHANGE 1: Added RTL-specific styles for better text rendering */
  [dir="rtl"] h1,
  [dir="rtl"] h2,
  [dir="rtl"] h3,
  [dir="rtl"] h4,
  [dir="rtl"] h5,
  [dir="rtl"] h6,
  [dir="rtl"] p,
  [dir="rtl"] span,
  [dir="rtl"] label {
    letter-spacing: 0;
  }

  /* CHANGE 2: Ensure proper text alignment in RTL */
  [dir="rtl"] .text-center {
    text-align: center;
  }
</style>

<script>
  document.addEventListener('astro:page-load', () => {
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(detail => {
      detail.addEventListener('toggle', () => {
        const summary = detail.querySelector('summary');
        if (summary) {
        }
      });
    });
  });
</script>
#############

Here's the src\pages\si\opozorilna-piramida\index.astro:
##############
---
// Path: /src/pages/si/opozorilna-piramida/index.astro
// Purpose: Products listing page with dynamic RTL support
// Data: JSON dependencies for products, common data, and locale data
// Dependencies: BaseLayout, infinite scroll, filtering

import BaseLayout from '../../../layouts/BaseLayout.astro';
import productData from '../../../data/product.json';
import wwwData from '../../../data/www.json';
import commonData from '../../../data/common.json';
import localeData from '../../../data/locale.json';

// --- DATA FETCHING & INITIAL FILTERING ---

const parentSlug = Astro.url.pathname.split('/')[1];
const currentFolder = Astro.url.pathname.split('/')[2];
const common = commonData.find(item => item.M_SLUG === parentSlug) || commonData[0];
const www = wwwData[0];

// Filter products for the current locale, published status, and apply a default sort.
// Default Sort: By Importance Rank (desc), then by Product Name (A-Z).
const filteredProducts = productData
    .filter(product => product.M_SLUG === parentSlug && product.PUBLISH_Y_N === "1")
    .sort((a, b) => {
        const rankA = parseInt(a.PRODUCT_IMPORTANCE_RANK, 10) || 0;
        const rankB = parseInt(b.PRODUCT_IMPORTANCE_RANK, 10) || 0;
        if (rankB !== rankA) {
            return rankB - rankA; // Higher rank first
        }
        return a.PRODUCT_NAME.localeCompare(b.PRODUCT_NAME); // Then A-Z
    });

// --- BATCHING FOR INITIAL LOAD ---
const BATCH_SIZE = 12;
const initialProducts = filteredProducts.slice(0, BATCH_SIZE);

// --- METADATA AND SEO ---

const languageIso = filteredProducts[0]?.M_LANGUAGE_ISO || 'sl';
const countryCode = filteredProducts[0]?.M_COUNTRY_CODE || 'SI';
const contentOrientation = commonData.find(item =>
    item.M_LANGUAGE_ISO === languageIso &&
    item.M_COUNTRY_CODE === countryCode
)?.M_CONTENT_ORIENTATION || 'ltr';

const pageTitle = common.PAGE_COLLECTION_1_LISTING_TITLE;
const pageDescription = common.PAGE_COLLECTION_1_LISTING_DESCRIPTION;
const pageOgImage = common.PAGE_COLLECTION_1_LISTING_OG_IMAGE_PATH;
const pageKeywords = [
    common.PAGE_COLLECTION_1_LISTING_TITLE,
    common.M_COUNTRY_NATIVE,
    www.PAGE_ORGANISATION_FULL_NAME
].join(', ');

const getBaseUrl = (path: string) => new URL(path, Astro.url.origin).toString();

// --- SCHEMA.ORG (UNCHANGED LOGIC: USES FULL LIST FOR SEO) ---

// Organization Schema 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "description": common.PAGE_DESCRIPTION,
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [ www.PAGE_INSTAGRAM_URL, www.PAGE_FACEBOOK_URL, www.PAGE_TWITTER_URL, www.PAGE_LINKEDIN_URL, www.PAGE_YOUTUBE_URL, www.PAGE_PINTEREST_URL, www.PAGE_BLUESKY_URL ].filter(Boolean),
  "areaServed": { "@type": "Country", "name": common.M_COUNTRY, "identifier": common.M_COUNTRY_CODE }
};

const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": Astro.url.href,
    "name": common.PAGE_COLLECTION_1_LISTING_TITLE,
    "description": common.PAGE_COLLECTION_1_LISTING_DESCRIPTION,
    "url": Astro.url.href,
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": filteredProducts.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "@id": `${Astro.url.origin}/${parentSlug}/${currentFolder}/${product.PRODUCT_ASCII_SLUG}`,
                "name": product.PRODUCT_NAME,
                "url": `${Astro.url.origin}/${parentSlug}/${currentFolder}/${product.PRODUCT_ASCII_SLUG}`,
                "image": `${Astro.url.origin}${product.PRODUCT_OG_IMAGE_PATH}`,
                "description": product.PRODUCT_META_SEO,
                "sku": product.PRODUCT_MPN,
                "mpn": product.PRODUCT_MPN,
                "offers": {
                    "@type": "Offer",
                    "price": product.M_PRODUCT_PRICE_NATIVE.split(' ')[0],
                    "priceCurrency": product.M_CURRENCY_CODE,
                    "availability": "https://schema.org/InStock"
                },
                "brand": { "@type": "Brand", "name": www.PAGE_ORGANISATION_FULL_NAME },
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": product.PRODUCT_RATING_VALUE, "reviewCount": product.PRODUCT_REVIEW_COUNT }
            }
        }))
    }
};

const schema = [collectionPageSchema, organizationSchema];

// --- LANGUAGE LINKS ---
const languageLinksMap: Record<string, string> = {};
for (const localeObj of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  const productForLocale = productData.find(p =>
    p.M_SLUG === localeObj.M_SLUG && p.PUBLISH_Y_N === "1" && p.PAGE_COLLECTION_1_LISTING_SLUG?.trim()
  );
  if (productForLocale) {
    languageLinksMap[localeObj.M_SLUG] = `/${localeObj.M_SLUG}/${productForLocale.PAGE_COLLECTION_1_LISTING_SLUG}`;
  } else {
    languageLinksMap[localeObj.M_SLUG] = `/${localeObj.M_SLUG}`;
  }
}
---

<BaseLayout
    languageIso={languageIso}
    countryCode={countryCode}
    contentOrientation={contentOrientation}
    title={pageTitle}
    description={pageDescription}
    ogImage={pageOgImage}
    keywords={pageKeywords}
    schema={schema}
    languageLinksMap={languageLinksMap}
>
    <!-- Dark Header Section -->
    <div class="bg-black text-white py-16">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                    {filteredProducts[0]?.PAGE_COLLECTION_1_LISTING_SLUG_HELPER || 'Products'}
                </h1>
            </div>
        </div>
    </div>

    <!-- Products Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <!-- Controls Bar -->
            <div class="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-200">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <!-- Filters & Sorters -->
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
                        <!-- Sort Dropdown -->
                        <div>
                            <label for="sort-select" class="block text-sm font-medium text-gray-700 mb-1">{common.UI_SORT_BY}</label>
                            <select id="sort-select" class="rounded-md border-gray-300 shadow-sm focus:border-signal-green focus:ring focus:ring-signal-green focus:ring-opacity-50">
                                <option value="importance">{common.UI_SORT_IMPORTANCE}</option>
                                <option value="newest">{common.UI_SORT_NEWEST}</option>
                                <option value="price-asc">{common.UI_SORT_PRICE_ASC}</option>
                                <option value="price-desc">{common.UI_SORT_PRICE_DESC}</option>
                                <option value="rating">{common.UI_SORT_RATING}</option>
                                <option value="az">{common.UI_SORT_AZ}</option>
                                <option value="za">{common.UI_SORT_ZA}</option>
                            </select>
                        </div>
                        <!-- Feature Filter Dropdown -->
                        <div>
                             <label for="feature-filter" class="block text-sm font-medium text-gray-700 mb-1">{common.UI_FILTER_BY}</label>
                            <select id="feature-filter" class="rounded-md border-gray-300 shadow-sm focus:border-signal-green focus:ring focus:ring-signal-green focus:ring-opacity-50">
                                <option value="all">{common.UI_FILTER_ALL_PRODUCTS}</option>
                                <option value="bestsellers">{common.UI_FILTER_BESTSELLERS}</option>
                            </select>
                        </div>
                    </div>
                     <!-- Info & Clear Button -->
                    <div class="flex items-center gap-4">
                        <span id="product-count" class="text-sm text-gray-600"></span>
                        <button id="clear-filters-btn" class="text-sm font-medium text-signal-green hover:underline">{common.UI_BUTTON_CLEAR_FILTERS}</button>
                    </div>
                </div>
            </div>

            <!-- Products Grid -->
            <div id="products-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- Initial products are server-rendered -->
                {initialProducts.map((product) => {
                    const productUrl = `/${parentSlug}/${currentFolder}/${product.PRODUCT_ASCII_SLUG}`;
                    const fullProductName = `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} ${product.PRODUCT_NAME}`;
                    return (
                        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <a href={productUrl} class="block">
                                <img src={product.PRODUCT_IMAGE_PATH_L} alt={product.PRODUCT_IMAGE_NAME} class="w-full h-56 object-contain p-4" width="225" height="225" loading="lazy" decoding="async"/>
                                <div class="p-4 border-t border-gray-100">
                                    <h3 class="font-medium text-black group-hover:text-signal-green transition-colors mb-2 h-12 line-clamp-2">{fullProductName}</h3>
                                    <div class="text-xl font-bold text-black mb-4">{product.M_PRODUCT_PRICE}</div>
                                    <span class="block w-full bg-black text-signal-green border border-signal-green py-2 ps-4 pe-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center font-semibold">{common.PRODUCT_PAGE_RELATED_PRODUCT_VIEW_BUTTON_TEXT}</span>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
             <!-- Sentinel and Messages -->
             <div id="grid-footer" class="text-center mt-12">
                <div id="no-results" class="hidden text-gray-500">{common.UI_NO_PRODUCTS_FOUND}</div>
                <div id="infinite-scroll-trigger" class="h-10 text-gray-500 font-semibold">{common.UI_LOADING_MORE}</div>
             </div>
        </div>
    </section>
</BaseLayout>

<style>
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* CHANGE 1: Added RTL-specific styles for better text rendering */
    [dir="rtl"] h1,
    [dir="rtl"] h2,
    [dir="rtl"] h3,
    [dir="rtl"] h4,
    [dir="rtl"] h5,
    [dir="rtl"] h6,
    [dir="rtl"] p,
    [dir="rtl"] span,
    [dir="rtl"] label {
      letter-spacing: 0;
    }

    /* CHANGE 2: Ensure proper text alignment in RTL */
    [dir="rtl"] .text-center {
      text-align: center;
    }
</style>

<script define:vars={{ allProducts: filteredProducts, parentSlug, currentFolder, common, BATCH_SIZE }}>
    // --- DOM ELEMENTS ---
    const grid = document.getElementById('products-grid');
    const trigger = document.getElementById('infinite-scroll-trigger');
    const noResultsMsg = document.getElementById('no-results');
    const productCountSpan = document.getElementById('product-count');
    const sortSelect = document.getElementById('sort-select');
    const featureFilter = document.getElementById('feature-filter');
    const clearBtn = document.getElementById('clear-filters-btn');

    // --- STATE MANAGEMENT ---
    let productsToDisplay = [...allProducts];
    let currentPage = 1;
    let observer;

    // --- HELPER FUNCTIONS ---
    const getSlovenianPluralString = (count) => {
        if (count % 100 === 1) return common.UI_PRODUCT_COUNT_SINGLE;
        if (count % 100 === 2) return common.UI_PRODUCT_COUNT_DUAL;
        if (count % 100 === 3 || count % 100 === 4) return common.UI_PRODUCT_COUNT_FEW;
        return common.UI_PRODUCT_COUNT_PLURAL;
    };
    
    const updateProductCount = (count) => {
        if (common.M_LANGUAGE_ISO === 'sl') {
            productCountSpan.textContent = getSlovenianPluralString(count).replace('{count}', count);
        } else {
            const template = count === 1 ? common.UI_PRODUCT_COUNT_SINGLE : common.UI_PRODUCT_COUNT_PLURAL;
            productCountSpan.textContent = template.replace('{count}', count);
        }
    };
    
    const createProductCardHTML = (product) => {
        const productUrl = `/${parentSlug}/${currentFolder}/${product.PRODUCT_ASCII_SLUG}`;
        const fullProductName = `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} ${product.PRODUCT_NAME}`;
        return `
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in">
                <a href="${productUrl}" class="block">
                    <img src="${product.PRODUCT_IMAGE_PATH_L}" alt="${product.PRODUCT_IMAGE_NAME}" class="w-full h-56 object-contain p-4" width="225" height="225" loading="lazy" decoding="async"/>
                    <div class="p-4 border-t border-gray-100">
                        <h3 class="font-medium text-black group-hover:text-signal-green transition-colors mb-2 h-12 line-clamp-2">${fullProductName}</h3>
                        <div class="text-xl font-bold text-black mb-4">${product.M_PRODUCT_PRICE}</div>
                        <span class="block w-full bg-black text-signal-green border border-signal-green py-2 ps-4 pe-4 rounded-md hover:bg-signal-green hover:text-black transition-all text-center font-semibold">${common.PRODUCT_PAGE_RELATED_PRODUCT_VIEW_BUTTON_TEXT}</span>
                    </div>
                </a>
            </div>
        `;
    };

    // --- CORE LOGIC ---
    const applyFiltersAndSort = () => {
        let processedProducts = [...allProducts];

        // Apply feature filter
        const selectedFeature = featureFilter.value;
        if (selectedFeature === 'bestsellers') {
            processedProducts = processedProducts.filter(p => p.PRODUCT_IS_BESTSELLER === "1");
        }

        // Apply sorting
        const sortBy = sortSelect.value;
        processedProducts.sort((a, b) => {
            switch (sortBy) {
                case 'newest': return new Date(b.PRODUCT_DATE_PUBLISHED).getTime() - new Date(a.PRODUCT_DATE_PUBLISHED).getTime();
                case 'price-asc': return parseFloat(a.M_PRODUCT_PRICE_NATIVE) - parseFloat(b.M_PRODUCT_PRICE_NATIVE);
                case 'price-desc': return parseFloat(b.M_PRODUCT_PRICE_NATIVE) - parseFloat(a.M_PRODUCT_PRICE_NATIVE);
                case 'rating': return (parseFloat(b.PRODUCT_RATING_VALUE) || 0) - (parseFloat(a.PRODUCT_RATING_VALUE) || 0);
                case 'az': return a.PRODUCT_NAME.localeCompare(b.PRODUCT_NAME);
                case 'za': return b.PRODUCT_NAME.localeCompare(a.PRODUCT_NAME);
                case 'importance': default: 
                    const rankA = parseInt(a.PRODUCT_IMPORTANCE_RANK, 10) || 0;
                    const rankB = parseInt(b.PRODUCT_IMPORTANCE_RANK, 10) || 0;
                    if (rankB !== rankA) return rankB - rankA;
                    return a.PRODUCT_NAME.localeCompare(b.PRODUCT_NAME);
            }
        });
        
        return processedProducts;
    };

    const renderGrid = (products, append = false) => {
        if (!append) grid.innerHTML = '';
        const batchHtml = products.map(createProductCardHTML).join('');
        grid.insertAdjacentHTML('beforeend', batchHtml);
    };

    const updateDisplay = () => {
        productsToDisplay = applyFiltersAndSort();
        currentPage = 1;
        const initialBatch = productsToDisplay.slice(0, BATCH_SIZE);
        renderGrid(initialBatch);
        updateProductCount(productsToDisplay.length);
        noResultsMsg.style.display = productsToDisplay.length === 0 ? 'block' : 'none';
        trigger.style.display = productsToDisplay.length > BATCH_SIZE ? 'block' : 'none';
        setupObserver();
    };
    
    const loadMoreProducts = () => {
        currentPage++;
        const startIndex = (currentPage - 1) * BATCH_SIZE;
        const endIndex = startIndex + BATCH_SIZE;
        const nextBatch = productsToDisplay.slice(startIndex, endIndex);

        if (nextBatch.length > 0) renderGrid(nextBatch, true);
        if (endIndex >= productsToDisplay.length) {
            trigger.style.display = 'none';
            if(observer) observer.disconnect();
        }
    };
    
    const setupObserver = () => {
        if(observer) observer.disconnect();
        if(productsToDisplay.length <= BATCH_SIZE) return;
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) loadMoreProducts();
        }, { rootMargin: '400px' });
        observer.observe(trigger);
    };

    // --- EVENT LISTENERS & INITIALIZATION ---
    sortSelect.addEventListener('change', updateDisplay);
    featureFilter.addEventListener('change', updateDisplay);
    clearBtn.addEventListener('click', () => {
        sortSelect.value = 'importance';
        featureFilter.value = 'all';
        updateDisplay();
    });
    document.addEventListener('DOMContentLoaded', () => {
        updateProductCount(allProducts.length);
        setupObserver();
    });
</script>
##############

Here's the src\pages\si\[EEATslug].astro:
###############
---
// import { getEntry } from 'astro:content'; // Removed as it's not used; data comes from JSON
import { actions, isInputError } from 'astro:actions';
import BaseLayout from '../../layouts/BaseLayout.astro';
import wwwData from '../../data/www.json';
import commonData from '../../data/common.json';
import eeatData from '../../data/eeat.json';
import authorData from '../../data/author.json';
import localeData from '../../data/locale.json';

export const prerender = false;

// Get the locale from the URL path (e.g., 'si' from /si/)
const locale = Astro.url.pathname.split('/')[1];

// Get the slug from the URL
const { EEATslug } = Astro.params;  

// Filter eeatData to only include entries matching the current locale
const localeEeatData = eeatData.filter(entry => entry.M_SLUG === locale);

// Find the matching EEAT entry from the filtered data
const eeatEntry = localeEeatData.find(entry => entry.EEAT_SLUG === EEATslug);

// Check if entry exists
if (!eeatEntry) {
  return Astro.redirect('/404');
}

const filteringNumber = parseInt(eeatEntry.EEAT_FILTERING);

// Get authors for the current locale when EEAT_FILTERING is 20 or 13
const authors = (filteringNumber === 20 || filteringNumber === 13)
  ? authorData.filter(author => author.M_SLUG === locale && author.PUBLISH_Y_N === "1")
  : [];

// Check if entry is published and has a valid filtering number (1-28)
const isValidPage = eeatEntry.PUBLISH_Y_N === "1" &&
  filteringNumber >= 1 && filteringNumber <= 28;

if (!isValidPage) {
  return Astro.redirect('/404');
}

// Determine if the page should display a contact form
const isContactPage = filteringNumber === 24 || filteringNumber === 25;

const eeat = eeatEntry;

// Get the first object from www data (keeping as is)
const www = wwwData[0];

// Find the matching common data object based on M_SLUG
const common = commonData.find(item => item.M_SLUG === locale) || commonData[0];

// Helper function for absolute URLs with locale
const getAbsoluteUrl = (path: string) => {
    // Get the locale from the URL path (e.g., 'si' from '/si/')
    const locale = Astro.url.pathname.split('/')[1];
    return new URL(`/${locale}${path}`, Astro.url.origin).toString();
};

// Helper function for base-level URLs (without locale)
const getBaseUrl = (path: string) => {
    return new URL(path, Astro.url.origin).toString();
};

// Get language data
const languageIso = eeat.M_LANGUAGE_ISO;
const countryCode = eeat.M_COUNTRY_CODE;

// Find matching content orientation from commonData (already refined above)
const contentOrientation = common.M_CONTENT_ORIENTATION || 'ltr';

// Define content for the page
const seoTitle = eeat.EEAT_NAME;
const headline = eeat.EEAT_H1;
const pageDescription = eeat.EEAT_META_SEO;
const pageContent = eeat.EEAT_CONTENT;
const pageContent2 = eeat.EEAT_CONTENT_2;
const pageogImage = eeat.EEAT_OG_IMAGE_PATH;
const articlePublishDate = eeat.EEAT_DATE_PUBLISHED;
const articleUpdateDate = eeat.EEAT_DATE_UPDATED;
const publishedTextLabel = common.M_PUBLISHED;
const updatedTextLabel = common.M_UPDATED;
const articleDateLocale = `${eeat.M_LANGUAGE_ISO}-${eeat.M_COUNTRY_CODE}`;

// Define keywords for the page
const pageKeywords = [
  eeat.EEAT_NAME,
  eeat.M_COUNTRY_NATIVE,
  www.PAGE_ORGANISATION_FULL_NAME
].join(', ');

// --- FORM HANDLING ---
const submissionResult = await Astro.getActionResult(actions.submitContactForm);
const formErrors: Record<string, string[] | undefined> = {};
let genericError: string | undefined = undefined;
let successMessage: string | undefined = undefined;

if (submissionResult) {
  if (submissionResult.error) {
    if (isInputError(submissionResult.error)) {
      Object.assign(formErrors, submissionResult.error.fields);
  } else {
      genericError = submissionResult.error.message;
    }
  } else if (submissionResult.data?.success) {
    // The success message now comes directly from the server action, already translated.
    successMessage = submissionResult.data.message;
  }
}

const getFieldError = (fieldName: string): string | undefined => formErrors[fieldName]?.[0];

// Build the language link map for the language picker
const languageLinksMap: Record<string, string> = {};
for (const locale of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  // Find alternate EEAT entry for this locale by EEAT_FILTERING
  const altEeat = eeatData.find(e =>
    e.EEAT_FILTERING === eeatEntry.EEAT_FILTERING &&
    e.M_SLUG === locale.M_SLUG &&
    e.PUBLISH_Y_N === "1"
  );
  if (altEeat) {
    languageLinksMap[locale.M_SLUG] = `/${altEeat.M_SLUG}/${altEeat.EEAT_SLUG}`;
  } else {
    languageLinksMap[locale.M_SLUG] = `/${locale.M_SLUG}`;
  }
}

// WebPage and Article Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": eeat.EEAT_H1,
  "url": Astro.url.href,
  "description": pageDescription,
  "inLanguage": articleDateLocale,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": common.M_HOME_NAME,
        "item": getAbsoluteUrl("/")
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": seoTitle,
        "item": Astro.url.href
      }
    ]
  },
  "mainEntity": {
    "@type": "Article",
    "headline": headline,
    "description": pageDescription,
    "image": getBaseUrl(pageogImage),
    "author": {
      "@type": "Organization",
      "name": www.PAGE_ORGANISATION_FULL_NAME
    },
    // Assuming EEAT_HOUR_PUBLISHED and _UPDATED are in HH:MM format
    "datePublished": `${articlePublishDate}T${eeat.EEAT_HOUR_PUBLISHED || '00:00'}:00+02:00`, // Added :00 for seconds, ensure format
    "dateModified": `${articleUpdateDate}T${eeat.EEAT_HOUR_UPDATED || '00:00'}:00+02:00`,   // Added :00 for seconds
    "inLanguage": articleDateLocale
  }
};

// Organization Schema 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "keywords": [
    www.PAGE_ORGANISATION_FULL_NAME,
    common.M_COUNTRY_NATIVE,
    common.PAGE_KEYWORD_1,
    common.PAGE_KEYWORD_2,
    common.PAGE_KEYWORD_3,
    common.PAGE_KEYWORD_4,
    common.PAGE_KEYWORD_5,
    common.PAGE_KEYWORD_6
  ].filter(Boolean),
  "description": common.PAGE_DESCRIPTION || common.PAGE_SLOGAN,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "9"
  },
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [
    www.PAGE_INSTAGRAM_URL,
    www.PAGE_FACEBOOK_URL,
    www.PAGE_TWITTER_URL,
    www.PAGE_LINKEDIN_URL,
    www.PAGE_YOUTUBE_URL,
    www.PAGE_PINTEREST_URL,
    www.PAGE_BLUESKY_URL
  ].filter(Boolean),
  "areaServed": {
    "@type": "Country",
    "name": common.M_COUNTRY,
    "identifier": common.M_COUNTRY_CODE
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/sitemap.xml')
    },
    {
      "@type": "ViewAction",
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`)
    },
    {
      "@type": "ViewAction",
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/llms.txt'),
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ],
  "mainEntityOfPage": [
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/sitemap.xml'),
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a structured list of pages available on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`),
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a full and structured list of localized pages for ${languageIso} (${languageIso}-${countryCode}) locale on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/llms.txt'),
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ]
};

// Combine schemas into an array
const combinedSchema = [webpageSchema, organizationSchema];

// Format dates
const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
---

<BaseLayout
  languageIso={languageIso}
  countryCode={countryCode}
  contentOrientation={contentOrientation}
  title={seoTitle}
  description={pageDescription}
  ogImage={pageogImage}
  keywords={pageKeywords}
  schema={combinedSchema}
  languageLinksMap={languageLinksMap}
>
  <!-- Dark Header Section -->
  <div class="bg-black text-white py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{headline}</h1>
        <div class="flex flex-wrap items-center gap-2 text-lg animate-slide-up">
          <span class="text-signal-green">{publishedTextLabel} {formatDate(articlePublishDate, articleDateLocale)}</span>
          {articleUpdateDate && updatedTextLabel && (
            <>
              <span class="text-gray-400">•</span>
              <span class="text-signal-green">{updatedTextLabel} {formatDate(articleUpdateDate, articleDateLocale)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Part 1 (eeat.EEAT_CONTENT) -->
  <div class={`container mx-auto px-4 ${isContactPage ? 'pt-12' : 'py-12'}`}>
    <div class="prose prose-lg max-w-4xl mx-auto">
      <Fragment set:html={pageContent} />
      
      <!-- Add Author Grid when EEAT_FILTERING is 20 or 13 -->
      {(filteringNumber === 20 || filteringNumber === 13) && authors.length > 0 && (
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8 text-center">
              {common.ARTICLE_AUTHORS_TITLE}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <a 
                  href={getAbsoluteUrl(`/${author.EEAT_URL_20}/${author.WWW_AUTHOR_SLUG}`)}
                  class="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div class="aspect-w-1 aspect-h-1">
                    <img 
                      src={author.AUTHOR_PROFILE_IMAGE_PATH} 
                      alt={author.AUTHOR_IMAGE_ALT}
                      class="w-full h-64 object-cover object-center"
                    />
                  </div>
                  <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2 group-hover:text-signal-green transition-colors duration-300">
                      {author.WWW_AUTHOR}
                    </h3>
                    <p class="text-gray-600 text-sm mb-2">{author.WWW_AUTHOR_OCCUPATION}</p>
                    <p class="text-gray-500 text-sm line-clamp-3">{author.AUTHOR_FULL_BIO}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <!-- If NOT a contact page, and pageContent2 exists, render it here -->
      {!isContactPage && pageContent2 && (
        <Fragment set:html={pageContent2} />
      )}
    </div>
  </div>

  <!-- If Contact Page: Form + Main Content Part 2 (eeat.EEAT_CONTENT_2) -->
  {isContactPage && (
    <>
      <!-- Contact Form Section -->
      <section class="pt-3 pb-8 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto">
            {/* Display Success/Error Messages */}
            {successMessage && !submissionResult?.error && (
              <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                {successMessage}
              </div>
            )}
            {genericError && (
              <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {genericError}
              </div>
            )}

            <form method="POST" action={actions.submitContactForm} class="space-y-4">
              <input type="hidden" name="pageUrl" value={Astro.url.href} />
              <input type="hidden" name="pageTitle" value={seoTitle} />
              <input type="hidden" name="locale" value={locale} />

              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-600 mb-1">{common.FORM_LABEL_FULLNAME}</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder={common.FORM_PLACEHOLDER_FULLNAME}
                  class:list={[
                    "w-full ps-4 pe-4 py-2 rounded-lg border focus:ring-1 focus:ring-signal-green",
                    getFieldError('fullName') ? "border-red-500" : "border-gray-300 focus:border-signal-green"
                  ]}
                  required
                />
                {getFieldError('fullName') && <p class="text-red-500 text-xs mt-1">{common.FORM_VALIDATION_FULLNAME_REQUIRED}</p>}
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-600 mb-1">{common.FORM_LABEL_EMAIL}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={common.FORM_PLACEHOLDER_EMAIL}
                  class:list={[
                    "w-full ps-4 pe-4 py-2 rounded-lg border focus:ring-1 focus:ring-signal-green",
                    getFieldError('email') ? "border-red-500" : "border-gray-300 focus:border-signal-green"
                  ]}
                  required
                />
                {getFieldError('email') && <p class="text-red-500 text-xs mt-1">{common.FORM_VALIDATION_EMAIL_INVALID}</p>}
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-600 mb-1">{common.FORM_LABEL_MESSAGE}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder={common.FORM_PLACEHOLDER_MESSAGE_ORDER}
                  class:list={[
                    "w-full ps-4 pe-4 py-2 rounded-lg border focus:ring-1 focus:ring-signal-green",
                    getFieldError('message') ? "border-red-500" : "border-gray-300 focus:border-signal-green"
                  ]}
                  required
                ></textarea>
                {getFieldError('message') && <p class="text-red-500 text-xs mt-1">{common.FORM_VALIDATION_MESSAGE_REQUIRED}</p>}
              </div>
              <div class="flex items-center gap-2">
                <input type="checkbox" id="terms" name="terms" required 
                  class:list={[getFieldError('terms') ? "border-red-500" : ""]}/>
                <label for="terms" class="text-sm text-gray-600">
                  {common.FORM_LABEL_TERMS}
                </label>
              </div>
              {getFieldError('terms') && <p class="text-red-500 text-xs mt-1">{common.FORM_VALIDATION_TERMS_REQUIRED}</p>}
              <button
                type="submit"
                class="w-full bg-black text-signal-green border border-signal-green py-3 rounded-lg hover:bg-signal-green hover:text-black transition-all"
              >
                {common.FORM_BUTTON_SUBMIT_CONTACT}
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Main Content Part 2 (eeat.EEAT_CONTENT_2) for contact pages -->
      {pageContent2 && (
        <div class="container mx-auto px-4 py-12">
          <div class="prose prose-lg max-w-4xl mx-auto">
            <div class="space-y-6">
              <Fragment set:html={pageContent2} />
            </div>
          </div>
        </div>
      )}
    </>
  )}
</BaseLayout>

<style>
  /* Base prose container */
  .prose {
    max-width: 65ch;
    margin-left: auto;
    margin-right: auto;
  }

  /* Headings */
  .prose :global(h2) {
    color: black;
    font-size: 1.875rem; /* 30px */
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .prose :global(h3) {
    color: black;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem; /* 24px */
    font-weight: 600;
  }

  /* Paragraphs */
  .prose :global(p) {
    color: #374151; /* Tailwind gray-700 */
    margin-bottom: 1.25rem;
    line-height: 1.75;
  }

  /* Links */
  .prose :global(a) {
    color: black;
    text-decoration: underline;
    text-decoration-color: #BCEF2F; /* signal-green */
    text-underline-offset: 2px;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
  }

  .prose :global(a:hover) {
    color: #BCEF2F; /* signal-green */
    text-decoration-color: black;
  }

  /* Lists */
  .prose :global(ul) {
    list-style-type: none;
    margin-inline-start: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .prose :global(ol) { 
    margin-inline-start: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .prose :global(li) {
    position: relative;
    padding-inline-start: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.75;
  }

  .prose :global(ul li::before) {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    top: 0.75rem; /* Adjusted for line-height */
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #BCEF2F; /* signal-green */
    border: 2px solid black;
  }
  
  /* Underline */
  .prose :global(u) {
    text-decoration: none;
    position: relative;
  }

  .prose :global(u::after) {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: repeating-linear-gradient(
      45deg,
      #BCEF2F,
      #BCEF2F 2px,
      transparent 2px,
      transparent 4px
    );
  }

  /* Bold text */
  .prose :global(b) {
    font-weight: 700;
  }

  /* List items with links */
  .prose :global(li a) {
    display: inline-block;
  }

  /* Spacing between sections */
  .prose :global(h2 + p) {
    margin-top: 1rem;
  }

  .prose :global(p + ul) {
    margin-top: 0.5rem;
  }
  
  /* FAQ Section styling */
  .prose :global(.faq-section) {
    margin-top: 2rem;
  }

  .prose :global(.faq-section p) {
    margin-bottom: 1.5rem;
  }

  /* Animations */
  :global(.animate-fade-in) {
    animation: fadeIn 0.5s ease-in-out;
  }

  :global(.animate-slide-up) {
    animation: slideUp 0.5s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Add these new styles for author cards */
  .prose :global(.author-card) {
    text-decoration: none;
  }

  .prose :global(.author-card:hover) {
    text-decoration: none;
  }

  .prose :global(.author-card h3) {
    text-decoration: none;
  }

  .prose :global(.author-card:hover h3) {
    text-decoration: none;
  }

  /* Ensure images maintain aspect ratio during hover */
  .prose :global(.author-card img) {
    backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
  }

  /* Client side validation styles for modern browsers */
  :where(input, select, textarea):user-invalid {
      border-color: #ef4444; /* red-500 */
  }

  /* RTL-specific styles for better text rendering */
  [dir="rtl"] .prose :global(p) {
    letter-spacing: 0;
  }

  [dir="rtl"] .prose :global(h1),
  [dir="rtl"] .prose :global(h2),
  [dir="rtl"] .prose :global(h3),
  [dir="rtl"] .prose :global(h4),
  [dir="rtl"] .prose :global(h5),
  [dir="rtl"] .prose :global(h6) {
    letter-spacing: 0;
  }

  /* Ensure proper text truncation in RTL */
  [dir="rtl"] .prose :global(.line-clamp-3) {
    text-align: start;
  }
</style>
###############

Here's the src\pages\si\index.astro:
################
---
// Path: /src/pages/si/index.astro
// Purpose: Homepage with dynamic RTL support
// Data: JSON dependencies for home content, products, and locale data
// Dependencies: BaseLayout, form validation

import BaseLayout from '../../layouts/BaseLayout.astro';
import homeData from '../../data/home.json';
import wwwData from '../../data/www.json';
import commonData from '../../data/common.json';
import products from '../../data/product.json';
import localeData from '../../data/locale.json';

// --- Interface Definitions  ---
interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
  socialProof: {
    text: string;
    rating: number; 
    userPhotos: string[];
  };
  ogImage?: string;
}

interface Product {
  title: string;
  image: string;
  url: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface MarqueeItem {
  url: string;
  image: string;
  alt: string;
}

interface FormAlerts {
  invalidEmail: string;
  termsNotAccepted: string;
  submissionSuccess: string;
  submissionError: string;
}

// Get the locale from the URL path (e.g., 'si' from /si/)
const locale = Astro.url.pathname.split('/')[1];

// Find the matching data objects based on M_SLUG, with fallbacks
const common = commonData.find(item => item.M_SLUG === locale) || commonData[0];
const home = homeData.find(item => item.M_SLUG === locale) || homeData[0];
const product = products.find(item => item.M_SLUG === locale) || products[0];

// If we're using fallback data, make sure it matches our locale
if (common.M_SLUG !== locale || home.M_SLUG !== locale || product.M_SLUG !== locale) {
  return Astro.redirect('/404');
}

const www = wwwData[0];

// Helper function for absolute URLs with locale
const getAbsoluteUrl = (path: string) => {
    return new URL(`/${locale}${path}`, Astro.url.origin).toString();
};

// Helper function for base-level URLs (without locale)
const getBaseUrl = (path: string) => {
    return new URL(path, Astro.url.origin).toString();
};

// Get language data
const languageIso: string = home.M_LANGUAGE_ISO;
const countryCode: string = home.M_COUNTRY_CODE;

// Find matching content orientation from common.json
const contentOrientation: string = common.M_CONTENT_ORIENTATION || 'ltr';

// --- Data for the Homepage ---

// Helper function to randomly shuffle and pick n items from an array
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Define all available social proof images
const allSocialProofImages = [
  '/socialproof/sp1.webp',
  '/socialproof/sp2.webp',
  '/socialproof/sp3.webp',
  '/socialproof/sp4.webp',
  '/socialproof/sp5.webp',
  '/socialproof/sp6.webp',
  '/socialproof/sp7.webp',
  '/socialproof/sp8.webp',
  '/socialproof/sp9.webp',
  '/socialproof/sp10.webp',
  '/socialproof/sp11.webp',
  '/socialproof/sp12.webp',
  '/socialproof/sp13.webp',
  '/socialproof/sp14.webp',
  '/socialproof/sp15.webp',
  '/socialproof/sp16.webp',
  '/socialproof/sp17.webp',
  '/socialproof/sp18.webp',
  '/socialproof/sp19.webp',
  '/socialproof/sp20.webp',
  '/socialproof/sp21.webp',
  '/socialproof/sp22.webp',
  '/socialproof/sp23.webp',
  '/socialproof/sp24.webp'
];

// Hero section data
const heroData: HeroData = {
  title: home.HOME_H1,
  subtitle: home.HOME_SUBTITLE,
  ogImage: home.HOME_OG_IMAGE_PATH,
  ctaText: home.HOME_HERO_BUTTON,
  ctaLink: "#best-sellers",
  features: [
    home.HOME_HERO_BENEFIT_1,
    home.HOME_HERO_BENEFIT_2,
    home.HOME_HERO_BENEFIT_3
  ],
  socialProof: {
    text: home.HOME_HERO_SOCIAL_PROOF,
    rating: 5,
    userPhotos: getRandomItems(allSocialProofImages, 5)
  }
};

// Define keywords for the page
const pageKeywords: string = [
  home.M_HOME_NAME,
  common.M_COUNTRY_NATIVE,
  www.PAGE_ORGANISATION_FULL_NAME
].join(', ');

// Filter and sort bestsellers based on criteria for specific locale
const bestsellers = products
  .filter(product => 
    product.PUBLISH_Y_N === "1" && 
    product.PRODUCT_IS_BESTSELLER === "1" &&
    product.M_SLUG === locale
  )
  .sort((a, b) => {
    // First sort by importance rank (descending)
    const rankDiff = parseInt(b.PRODUCT_IMPORTANCE_RANK) - parseInt(a.PRODUCT_IMPORTANCE_RANK);
    if (rankDiff !== 0) return rankDiff;
    // If ranks are equal, randomize
    return Math.random() - 0.5;
  });

// Get top 5 products for marquee
const marqueeItems = bestsellers
  .slice(0, 5)
  .map(product => ({
    url: getBaseUrl(`/${product.M_SLUG}/${product.PAGE_COLLECTION_1_LISTING_SLUG}/${product.PRODUCT_ASCII_SLUG}`),
    image: getBaseUrl(product.PRODUCT_IMAGE_PATH_L),
    alt: `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} — ${product.PRODUCT_NAME} | ${www.PAGE_ORGANISATION_FULL_NAME}`
  }));

// Get top 9 products for bestsellers section
const bestsellersSection = {
  title: home.HOME_H2_1,
  productCtaText: home.HOME_HERO_BUTTON,
  products: bestsellers
    .slice(0, 9)
    .map(product => ({
      title: `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} — ${product.PRODUCT_NAME}`,
      image: getBaseUrl(product.PRODUCT_IMAGE_PATH_L),
      alt: `${product.PAGE_COLLECTION_1_LISTING_SLUG_HELPER} — ${product.PRODUCT_NAME} | ${www.PAGE_ORGANISATION_FULL_NAME}`,
      url: getBaseUrl(`/${product.M_SLUG}/${product.PAGE_COLLECTION_1_LISTING_SLUG}/${product.PRODUCT_ASCII_SLUG}`)
    }))
};

// Features section data
const featuresSection = {
  title: home.HOME_H2_2,
  items: [
    {
      icon: "⚡",
      title: home.HOME_FEATURE_NAME_1,
      description: home.HOME_FEATURE_LABEL_1
    },
    {
      icon: "🔄",
      title: home.HOME_FEATURE_NAME_2,
      description: home.HOME_FEATURE_LABEL_2
    },
    {
      icon: "📦",
      title: home.HOME_FEATURE_NAME_3,
      description: home.HOME_FEATURE_LABEL_3
    }
  ] as FeatureItem[] 
};

// Institutions section data
const institutionsSection = {
  title: home.HOME_H2_4,
  items: [
    home.INSTITUTION_1,
    home.INSTITUTION_2,
    home.INSTITUTION_3,
    home.INSTITUTION_4,
    home.INSTITUTION_5,
    home.INSTITUTION_6
  ]
};

// FAQ section data
const faqSection = {
  title: home.HOME_H2_5,
  subtitle: home.HOME_FAQ_TEXT,
  items: [
    { question: home.HOME_Q1, answer: home.HOME_A1 },
    { question: home.HOME_Q2, answer: home.HOME_A2 },
    { question: home.HOME_Q3, answer: home.HOME_A3 },
    { question: home.HOME_Q4, answer: home.HOME_A4 },
    { question: home.HOME_Q5, answer: home.HOME_A5 },
    { question: home.HOME_Q6, answer: home.HOME_A6 },
    { question: home.HOME_Q7, answer: home.HOME_A7 },
    { question: home.HOME_Q8, answer: home.HOME_A8 },
    { question: home.HOME_Q9, answer: home.HOME_A9 },
    { question: home.HOME_Q10, answer: home.HOME_A10 },
    { question: home.HOME_Q11, answer: home.HOME_A11 },
    { question: home.HOME_Q12, answer: home.HOME_A12 },
    { question: home.HOME_Q13, answer: home.HOME_A13 },
    { question: home.HOME_Q14, answer: home.HOME_A14 },
    { question: home.HOME_Q15, answer: home.HOME_A15 }
  ] as FaqItem[] // Type assertion
};

// Contact section data
const contactSection = { // Type assertion can be added
  title: home.HOME_H2_6,
  subtitle: home.HOME_CONTACT_SUBTITLE,
  formLabels: {
    fullName: common.M_FULLNAME_PLACEHOLDER,
    fullNamePlaceholder: common.M_FULLNAME_PLACEHOLDER,
    email: common.M_EMAIL_ADDRESS_LABEL,
    emailPlaceholder: common.M_EMAIL_PLACEHOLDER,
    message: common.M_MESSAGE_LABEL,
    messagePlaceholder: common.M_PARTNERSHIP_MESSAGE_PLACEHOLDER,
    terms: common.M_TERMS_REQUIRED,
    submitButton: common.M_SEND_BUTTON
  }
};

// Form alert messages for client-side script
const formAlertMessages: FormAlerts = { // Type assertion
  invalidEmail: common.M_EMAIL_INVALID,
  termsNotAccepted: common.M_TERMS_REQUIRED,
  submissionSuccess: common.M_CONFIRMATION_TEXT,
  submissionError: common.M_FORM_ERROR
};

// --- Schema Definition ---
// WebPage and Article Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": home.HOME_H1,
  "url": Astro.url.href,
  "description": home.HOME_META_SEO,
  "inLanguage": `${home.M_LANGUAGE_ISO}-${home.M_COUNTRY_CODE}`,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": home.M_HOME_NAME,
        "item": Astro.url.href
      }
    ]
  },
  "mainEntity": {
    "@type": "Article",
    "headline": home.HOME_H1,
    "description": home.HOME_META_SEO,
    "image": getBaseUrl(home.HOME_OG_IMAGE_PATH),
    "author": {
      "@type": "Organization",
      "name": www.PAGE_ORGANISATION_FULL_NAME
    },
    "datePublished": `${home.HOME_DATE_PUBLISHED}T${home.HOME_HOUR_PUBLISHED}+02:00`,
    "dateModified": `${home.HOME_DATE_UPDATED}T${home.HOME_HOUR_UPDATED}+02:00`,
    "inLanguage": `${home.M_LANGUAGE_ISO}-${home.M_COUNTRY_CODE}`
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqSection.items.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

// Organization Schema 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": www.PAGE_ORGANISATION_FULL_NAME,
  "url": getBaseUrl('/'),
  "foundingDate": www.PAGE_FOUNDING_DATE,
  "logo": getBaseUrl(www.PAGE_LOGO_IMAGE_PATH_1),
  "keywords": [
    www.PAGE_ORGANISATION_FULL_NAME,
    common.M_COUNTRY_NATIVE,
    common.PAGE_KEYWORD_1,
    common.PAGE_KEYWORD_2,
    common.PAGE_KEYWORD_3,
    common.PAGE_KEYWORD_4,
    common.PAGE_KEYWORD_5,
    common.PAGE_KEYWORD_6
  ].filter(Boolean),
  "description": common.PAGE_SLOGAN,
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "1",
    "maxValue": "9"
  },
  "slogan": common.PAGE_SLOGAN,
  "contactPoint": {
    "@type": "ContactPoint",
    "email": www.PAGE_INFO_EMAIL,
    "contactType": common.M_CUSTOMER_SUPPORT
  },
  "sameAs": [
    www.PAGE_INSTAGRAM_URL,
    www.PAGE_FACEBOOK_URL,
    www.PAGE_TWITTER_URL,
    www.PAGE_LINKEDIN_URL,
    www.PAGE_YOUTUBE_URL,
    www.PAGE_PINTEREST_URL,
    www.PAGE_BLUESKY_URL
  ].filter(Boolean),
  "areaServed": {
    "@type": "Country",
    "name": common.M_COUNTRY,
    "identifier": common.M_COUNTRY_CODE
  },
  "potentialAction": [
    {
      "@type": "ViewAction",
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/sitemap.xml')
    },
    {
      "@type": "ViewAction",
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`)
    },
    {
      "@type": "ViewAction",
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "target": getBaseUrl('/llms.txt'),
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ],
  "mainEntityOfPage": [
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/sitemap.xml'),
      "name": `XML Sitemap for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a structured list of pages available on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl(`/sitemap-${languageIso}-${countryCode}.xml`),
      "name": `Localized XML Sitemap (${languageIso}-${countryCode}) for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `Provides a full and structured list of localized pages for ${languageIso} (${languageIso}-${countryCode}) locale on ${www.PAGE_ORGANISATION_FULL_NAME} for crawlers and AI agents.`
    },
    {
      "@type": "WebPage",
      "@id": getBaseUrl('/llms.txt'),
      "name": `LLM Guidance for ${www.PAGE_ORGANISATION_FULL_NAME}`,
      "description": `A text resource outlining key information about ${www.PAGE_ORGANISATION_FULL_NAME} offerings, company, products, services, and more for AI agents and AI crawlers.`
    }
  ]
};

// Combine all schemas
const schema: object[] | null = [webpageSchema, faqSchema, organizationSchema];

// --- Props for BaseLayout (to be used directly in the template below) ---
const pageTitle: string = home.HOME_H1;
const pageDescription: string | undefined = home.HOME_META_SEO;
const pageOgImage: string | undefined = home.HOME_OG_IMAGE_PATH;

// Build the language link map for the language picker
const languageLinksMap: Record<string, string> = {};
for (const locale of localeData.filter(l => l.M_LOCALE_PUBLISH_Y_N === "1")) {
  // For homepage, we just use the locale slug as the URL
  languageLinksMap[locale.M_SLUG] = `/${locale.M_SLUG}`;
}
---

<BaseLayout 
  languageIso={languageIso} 
  countryCode={countryCode} 
  contentOrientation={contentOrientation} 
  title={pageTitle} 
  description={pageDescription} 
  ogImage={pageOgImage} 
  keywords={pageKeywords} 
  schema={schema}
  languageLinksMap={languageLinksMap}
>
  <!-- Hero Section -->
  <section class="bg-black text-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          {heroData.title}
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
          {heroData.subtitle}
        </p>
        
        <ul class="space-y-2 mb-6">
          {heroData.features.map(feature => (
            <li class="flex items-center gap-2">
              <span class="text-signal-green">✓</span>
              <span class="text-lg">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-8">
          <div class="flex -space-x-3 rtl:space-x-reverse mb-2 sm:mb-0">
            {heroData.socialProof.userPhotos.map(photo => (
              <img 
                src={photo} 
                alt="User Testimonial" 
                class="w-10 h-10 rounded-full border-2 border-black"
                width="50"
                height="50"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <p class="text-lg text-signal-green">{heroData.socialProof.text}</p>
        </div>
        
        <a 
          href={heroData.ctaLink} 
          class="inline-block bg-signal-green text-black font-semibold ps-8 pe-8 py-3 hover:bg-signal-green hover:text-black transition-colors"
        >
          {heroData.ctaText}
        </a>
      </div>
    </div>

    <!-- Marquee Section -->
    <div class="overflow-x-hidden width-100 relative mt-12">
      <div class="pseo-marquee-container">
        <div class="pseo-marquee">
          <div class="pseo-marquee__group">
            {[...Array(2)].map(() => (
              <div class="flex gap-4">
                {marqueeItems.map(item => (
                  <a href={item.url}>
                    <img 
                      src={item.image} 
                      alt={item.alt} 
                      width="50" 
                      height="50" 
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div aria-hidden="true" class="pseo-marquee__group">
            {[...Array(2)].map(() => (
              <div class="flex gap-4">
                {marqueeItems.map(item => (
                  <a href={item.url}>
                    <img 
                      src={item.image} 
                      alt={item.alt}
                      width="50" 
                      height="50" 
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bestsellers Section -->
  <section id="best-sellers" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-12 text-center">{bestsellersSection.title}</h2>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {bestsellersSection.products.map(product => (
          <div class="bg-white border border-gray-100 overflow-hidden group">
            <a href={product.url} class="block">
              <img 
                src={product.image} 
                alt={product.alt}
                class="w-full h-56 object-contain p-4"
                width="225"
                height="225"
                loading="lazy"
                decoding="async"
              />
              <div class="p-4 border-t border-gray-100">
                <h3 class="font-medium text-black group-hover:text-signal-green transition-colors mb-4">
                  {product.title}
                </h3>
                <span class="block w-full bg-black text-signal-green border border-signal-green py-2 ps-4 pe-4 hover:bg-signal-green hover:text-black transition-all text-center">
                  {bestsellersSection.productCtaText}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-12 text-center">{featuresSection.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresSection.items.map(feature => (
          <div class="text-center p-6 bg-white rounded-lg shadow-sm">
            <div class="text-4xl mb-4">{feature.icon}</div>
            <h3 class="text-xl font-semibold mb-2">{feature.title}</h3>
            <p class="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Institutions Section -->
  <section class="py-16 bg-black">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-white mb-12 text-center">
        {institutionsSection.title}
      </h2>
      <div class="flex flex-wrap justify-center items-center gap-12">
        {institutionsSection.items.map(institution => (
          <div class="text-xl font-medium text-signal-green">
            {institution}
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-4 text-center">{faqSection.title}</h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{faqSection.subtitle}</p>
      <div class="max-w-3xl mx-auto space-y-4">
        {faqSection.items.map(item => (
          <details class="bg-gray-50 rounded-lg group">
            <summary class="p-4 cursor-pointer font-medium flex items-center justify-between">
              <span>{item.question}</span>
              <svg 
                class="w-5 h-5 transform transition-transform group-open:rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="p-4 pt-0 text-gray-600">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-black mb-4 text-center">{contactSection.title}</h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        {contactSection.subtitle}
      </p>

      <div class="max-w-2xl mx-auto">
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">{contactSection.formLabels.fullName}</label>
            <input 
              type="text" 
              placeholder={contactSection.formLabels.fullNamePlaceholder}
              class="w-full ps-4 pe-4 py-2 rounded-lg border border-gray-300 focus:border-signal-green focus:ring-1 focus:ring-signal-green" 
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">{contactSection.formLabels.email}</label>
            <input 
              type="email" 
              placeholder={contactSection.formLabels.emailPlaceholder}
              class="w-full ps-4 pe-4 py-2 rounded-lg border border-gray-300 focus:border-signal-green focus:ring-1 focus:ring-signal-green" 
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">{contactSection.formLabels.message}</label>
            <textarea 
              rows="4" 
              placeholder={contactSection.formLabels.messagePlaceholder}
              class="w-full ps-4 pe-4 py-2 rounded-lg border border-gray-300 focus:border-signal-green focus:ring-1 focus:ring-signal-green"
              required
            ></textarea>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="terms" required />
            <label for="terms" class="text-sm text-gray-600">
              {contactSection.formLabels.terms}
            </label>
          </div>
          <button 
            type="submit" 
            class="w-full bg-black text-signal-green border border-signal-green py-3 rounded-lg hover:bg-signal-green hover:text-black transition-all"
          >
            {contactSection.formLabels.submitButton}
          </button>
        </form>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
.pseo-marquee-container {
  --space: clamp(1rem, 2vw, 2rem);
  --gap: var(--space);
  --duration: 25s;
  position: relative;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 20px 0;
  box-sizing: border-box;
}

.pseo-marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  width: 100%;
  margin: 0;
  padding: 0;
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
  -webkit-mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
}

.pseo-marquee-container:hover .pseo-marquee__group {
  animation-play-state: paused;
}

.pseo-marquee__group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
  animation: pseo-scroll var(--duration) linear infinite;
  will-change: transform;
  animation-play-state: running;
}

.pseo-marquee__group img {
  max-width: clamp(8rem, 20vw, 20rem);
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  width: 100%;
  height: auto;
  flex-shrink: 0;
}

@keyframes pseo-scroll {
  0%{
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .pseo-marquee__group {
    animation-play-state: paused;
  }
}

details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}

/* CHANGE 16: Added RTL-specific styles for better text rendering */
[dir="rtl"] h1,
[dir="rtl"] h2,
[dir="rtl"] h3,
[dir="rtl"] h4,
[dir="rtl"] h5,
[dir="rtl"] h6,
[dir="rtl"] p,
[dir="rtl"] span,
[dir="rtl"] label {
  letter-spacing: 0;
}

/* CHANGE 17: Fix marquee animation direction for RTL */
[dir="rtl"] .pseo-marquee {
  mask-image: linear-gradient(
    to left,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
  -webkit-mask-image: linear-gradient(
    to left,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
}

[dir="rtl"] @keyframes pseo-scroll {
  0%{
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100% + var(--gap)));
  }
}
</style>

<script define:vars={{ alerts: formAlertMessages }}>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('section.py-16.bg-gray-50 form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      // Basic check, consider more robust validation
      if (emailInput && (!emailInput.value || !emailInput.value.includes('@'))) { 
        alert(alerts.invalidEmail); 
        return;
      }

      const termsCheckbox = form.querySelector('#terms');
      if (termsCheckbox && !termsCheckbox.checked) {
        alert(alerts.termsNotAccepted);
        return;
      }

      try {
        // Form submission logic here (e.g., send data to a server)
        // For now, we just show the success message
        console.log('Form data would be submitted here.');
        alert(alerts.submissionSuccess);
        form.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        alert(alerts.submissionError);
      }
    });
  }
});
</script>
################

As you can see ALL .ASTRO files are written EXTREMELY DYNAMICALLY, sourcing from src/data json files. Because of their EXTREMELY dynamic structure all .astro files can be copied to other language folders easily and still work (under a condition that I have my json data files done right, which I almost always do, because I store them in a single huge excel, then convert each table to json).
