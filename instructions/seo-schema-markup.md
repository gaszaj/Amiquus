<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- SEO -->
<title>{title}</title>
<meta name="description" content={description} />
<meta name="robots" content="index, follow" />
<meta name="author" content={WWW_INFO.PAGE_ORGANISATION_FULL_NAME} />
<meta name="keywords" content={WWW_INFO.PAGE_PRODUCTS_AND_SERVICES} />

<!-- OG Tags -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{ogImage && <meta property="og:image" content={ogImage} />}
{ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
<meta property="og:locale" content={formattedLocale} />
<meta property="og:type" content="website" />
{canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{ogImage && <meta name="twitter:image" content={ogImage} />}
{ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
{twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

<!-- Canonical URL and Hreflang Tags -->
{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
{hreflangTags && <Fragment set:html={hreflangTags} />}

<!-- Mobile/Web App Metadata -->
<meta name="application-name" content={WWW_INFO.PAGE_ORGANISATION_FULL_NAME} />
<meta name="apple-mobile-web-app-title" content={WWW_INFO.PAGE_ORGANISATION_FULL_NAME} />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="format-detection" content="telephone=no" />

<!-- Favicon and Icons -->
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>

<!-- Assets -->
<link rel="stylesheet" href="/assets/css/style.css" />
<script src="/assets/js/main.js" defer></script>

<!-- Google Tag Manager -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C226712T4V"></script>
<script>
  // @ts-nocheck
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-C226712T4V');
</script>

<!-- Microsoft Clarity -->
<script type="text/javascript">
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
  })(window, document, 'clarity', 'script', 'n485m4sf6f');
</script>

<!-- Bing Webmasters Tools -->
<meta name="msvalidate.01" content="DDD4F3AAE215AEED9F6A9752BA1FA679" />

<!-- Yandex Webmasters Tools -->
<meta name="yandex-verification" content="bcc0015e53551a45" />

<link href="/pagefind/pagefind-ui.css" rel="stylesheet" />