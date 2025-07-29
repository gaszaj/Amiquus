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


Here are the astro files as produced by Bolt.new:

1. index.astro

##############

---
// Amiquus.com Homepage
const title = "Amiquus - Automated Car Listing Alerts";
const description = "Get real-time notifications for new car listings that match your criteria. Monitor multiple platforms automatically with instant Telegram alerts.";

// Import header and footer
import Header from './header.astro';
import Footer from './footer.astro';
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content={description}>
    <meta property="og:title" content={title}>
    <meta property="og:description" content={description}>
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors - matching your original design */
            --background: 255 255 255;
            --foreground: 23 23 23;
            --muted: 245 245 245;
            --muted-foreground: 115 115 115;
            --popover: 255 255 255;
            --popover-foreground: 23 23 23;
            --card: 255 255 255;
            --card-foreground: 23 23 23;
            --border: 229 229 229;
            --input: 229 229 229;
            
            /* Primary - Blue for light mode */
            --primary: 59 130 246;
            --primary-foreground: 255 255 255;
            
            /* Secondary */
            --secondary: 245 245 245;
            --secondary-foreground: 23 23 23;
            
            /* Accent - Blue for light mode */
            --accent: 59 130 246;
            --accent-foreground: 255 255 255;
            
            /* Destructive */
            --destructive: 239 68 68;
            --destructive-foreground: 255 255 255;
            
            /* Success */
            --success: 34 197 94;
            --success-foreground: 255 255 255;
            
            /* Neutral shades */
            --neutral-50: 250 250 250;
            --neutral-100: 245 245 245;
            --neutral-200: 229 229 229;
            --neutral-300: 212 212 212;
            --neutral-400: 163 163 163;
            --neutral-500: 115 115 115;
            --neutral-600: 82 82 82;
            --neutral-700: 64 64 64;
            --neutral-800: 38 38 38;
            --neutral-900: 23 23 23;
        }

        .dark {
            /* Dark theme colors - matching your original design */
            --background: 23 23 23;
            --foreground: 250 250 250;
            --muted: 38 38 38;
            --muted-foreground: 163 163 163;
            --popover: 38 38 38;
            --popover-foreground: 250 250 250;
            --card: 38 38 38;
            --card-foreground: 250 250 250;
            --border: 64 64 64;
            --input: 64 64 64;
            
            /* Primary - Yellow for dark mode (#ff0) */
            --primary: 255 255 0;
            --primary-foreground: 23 23 23;
            
            /* Secondary */
            --secondary: 38 38 38;
            --secondary-foreground: 250 250 250;
            
            /* Accent - Yellow for dark mode */
            --accent: 255 255 0;
            --accent-foreground: 23 23 23;
            
            /* Destructive */
            --destructive: 239 68 68;
            --destructive-foreground: 250 250 250;
            
            /* Success */
            --success: 34 197 94;
            --success-foreground: 255 255 255;
        }

        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: rgb(var(--foreground));
            background-color: rgb(var(--background));
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }

        .btn-primary {
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(var(--primary), 0.3);
        }

        .btn-outline {
            background: transparent;
            color: rgb(var(--foreground));
            border: 2px solid rgb(var(--border));
        }

        .btn-outline:hover {
            background: rgb(var(--muted));
            border-color: rgb(var(--primary));
        }

        .btn-accent {
            background: rgb(var(--accent));
            color: rgb(var(--accent-foreground));
        }

        .btn-accent:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(var(--accent), 0.3);
        }

        /* Hero Section */
        .hero {
            padding: 8rem 0 4rem;
            background: rgb(var(--background));
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgb(var(--neutral-50)) 0%, rgb(var(--background)) 100%);
            z-index: -1;
        }

        .dark .hero::before {
            background: linear-gradient(135deg, rgb(var(--neutral-900)) 0%, rgb(var(--background)) 100%);
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .hero-text h1 {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: rgb(var(--foreground));
        }

        .hero-text p {
            font-size: 1.25rem;
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .hero-cta {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .hero-visual {
            position: relative;
        }

        .notification-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
            animation: slideIn 0.6s ease-out;
        }

        .dark .notification-card {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .notification-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .notification-icon {
            width: 2.5rem;
            height: 2.5rem;
            background: rgb(var(--primary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--primary-foreground));
        }

        .car-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, rgb(var(--neutral-200)), rgb(var(--neutral-300)));
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        .dark .car-image {
            background: linear-gradient(45deg, rgb(var(--neutral-700)), rgb(var(--neutral-600)));
        }

        /* Features Section */
        .features {
            padding: 5rem 0;
            background: rgb(var(--background));
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: rgb(var(--foreground));
        }

        .section-header p {
            font-size: 1.125rem;
            color: rgb(var(--muted-foreground));
            max-width: 600px;
            margin: 0 auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border-color: rgb(var(--primary));
        }

        .dark .feature-card:hover {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
            width: 4rem;
            height: 4rem;
            background: rgb(var(--primary) / 0.1);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: rgb(var(--primary));
        }

        .feature-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: rgb(var(--foreground));
        }

        .feature-card p {
            color: rgb(var(--muted-foreground));
        }

        /* How It Works Section */
        .how-it-works {
            padding: 5rem 0;
            background: rgb(var(--neutral-50));
        }

        .dark .how-it-works {
            background: rgb(var(--neutral-900));
        }

        .steps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .step-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            position: relative;
        }

        .step-number {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 2rem;
            height: 2rem;
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .step-card h3 {
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .step-card p {
            color: rgb(var(--muted-foreground));
        }

        /* Pricing Section */
        .pricing {
            padding: 5rem 0;
            background: rgb(var(--background));
        }

        .pricing-card {
            background: rgb(var(--card));
            border: 2px solid rgb(var(--primary));
            border-radius: 1rem;
            padding: 2.5rem;
            text-align: center;
            max-width: 400px;
            margin: 0 auto;
            position: relative;
            transform: scale(1.05);
        }

        .pricing-badge {
            position: absolute;
            top: -0.75rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            font-weight: 600;
        }

        .price {
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin: 1rem 0;
        }

        .price-note {
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
            margin-bottom: 2rem;
        }

        .features-list {
            list-style: none;
            margin-bottom: 2rem;
            text-align: left;
        }

        .features-list li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            color: rgb(var(--foreground));
        }

        .check-icon {
            color: rgb(var(--success));
            font-weight: 600;
        }

        /* Limited Availability Section */
        .limited-availability {
            padding: 3rem 0;
            background: rgb(var(--card));
            border-top: 1px solid rgb(var(--border));
            border-bottom: 1px solid rgb(var(--border));
        }

        .availability-card {
            background: linear-gradient(135deg, rgb(var(--destructive) / 0.1), rgb(var(--primary) / 0.1));
            border: 2px solid rgb(var(--destructive));
            border-radius: 1rem;
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        .availability-title {
            color: rgb(var(--destructive));
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .progress-bar {
            width: 100%;
            height: 0.5rem;
            background: rgb(var(--neutral-200));
            border-radius: 0.25rem;
            overflow: hidden;
            margin: 1rem 0;
        }

        .dark .progress-bar {
            background: rgb(var(--neutral-700));
        }

        .progress-fill {
            height: 100%;
            background: rgb(var(--destructive));
            width: 85%;
            transition: width 0.3s ease;
        }

        /* CTA Section */
        .cta {
            padding: 5rem 0;
            background: linear-gradient(135deg, rgb(var(--primary)), rgb(var(--primary) / 0.8));
            color: rgb(var(--primary-foreground));
            text-align: center;
        }

        .cta h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .cta p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        /* Footer */
        .footer {
            background: rgb(var(--neutral-900));
            color: rgb(var(--neutral-300));
            padding: 3rem 0 1rem;
        }

        .dark .footer {
            background: rgb(var(--neutral-950));
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h3 {
            color: rgb(var(--neutral-100));
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
            color: rgb(var(--neutral-400));
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .footer-section ul li a:hover {
            color: rgb(var(--neutral-100));
        }

        .footer-bottom {
            border-top: 1px solid rgb(var(--neutral-700));
            padding-top: 1rem;
            text-align: center;
            color: rgb(var(--neutral-500));
        }

        /* Animations */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) { 
            .hero-content {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }

            .hero-text h1 {
                font-size: 2.5rem;
            }

            .hero-cta {
                justify-content: center;
            }

            .section-header h2 {
                font-size: 2rem;
            }

            .pricing-card {
                transform: none;
                margin: 0 1rem;
            }

            .cta h2 {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .hero {
                padding: 6rem 0 3rem;
            }

            .hero-text h1 {
                font-size: 2rem;
            }

            .hero-text p {
                font-size: 1rem;
            }

            .btn {
                padding: 0.625rem 1.25rem;
                font-size: 0.875rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .btn:focus,
        .nav-links a:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        .dark .hero-text h1 {
            color: rgb(var(--foreground));
        }

        .dark .notification-card {
            background: rgb(var(--card));
            border-color: rgb(var(--border));
        }

        .dark .availability-card {
            background: linear-gradient(135deg, rgb(var(--destructive) / 0.2), rgb(var(--primary) / 0.2));
        }
    </style>
</head>

<body>
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="sun" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle class="sun" cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <path class="moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"/>
        </svg>
    </button>

    <!-- Header Component -->
    <Header />

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Never Miss Your Perfect Car Deal Again</h1>
                    <p>Amiquus monitors multiple car listing platforms 24/7 and sends instant Telegram notifications when vehicles matching your criteria become available. Stay ahead of the competition with real-time alerts.</p>
                    
                    <div class="hero-cta">
                        <a href="/setup-alerts" class="btn btn-primary">Start Monitoring Now</a>
                        <a href="#how-it-works" class="btn btn-outline">See How It Works</a>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="notification-card">
                        <div class="notification-header">
                            <div class="notification-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <strong>🚗 New Car Alert!</strong>
                                <div style="font-size: 0.875rem; color: rgb(var(--muted-foreground));">Just now</div>
                            </div>
                        </div>
                        
                        <div class="car-image">
                            BMW 3 Series Image
                        </div>
                        
                        <div style="text-align: left;">
                            <h3 style="margin-bottom: 0.5rem; color: rgb(var(--foreground));">BMW 3 Series 2019</h3>
                            <p style="color: rgb(var(--success)); font-weight: 600; margin-bottom: 0.5rem;">€32,500</p>
                            <p style="color: rgb(var(--muted-foreground)); font-size: 0.875rem; margin-bottom: 0.25rem;">📍 Munich, Germany</p>
                            <p style="color: rgb(var(--muted-foreground)); font-size: 0.875rem; margin-bottom: 1rem;">🛣️ 45,000 km</p>
                            <a href="#" class="btn btn-primary" style="width: 100%; font-size: 0.875rem;">View Listing</a>
                        </div>
                    </div>
                    
                    <div class="notification-card" style="animation-delay: 0.3s;">
                        <div class="notification-header">
                            <div class="notification-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <strong>💰 Price Drop Alert!</strong>
                                <div style="font-size: 0.875rem; color: rgb(var(--muted-foreground));">2 minutes ago</div>
                            </div>
                        </div>
                        
                        <div style="text-align: left;">
                            <h3 style="margin-bottom: 0.5rem; color: rgb(var(--foreground));">Audi A4 2020</h3>
                            <p style="color: rgb(var(--success)); font-weight: 600; margin-bottom: 0.5rem;">
                                <span style="text-decoration: line-through; color: rgb(var(--muted-foreground));">€28,900</span> 
                                €26,500
                            </p>
                            <p style="color: rgb(var(--muted-foreground)); font-size: 0.875rem;">💰 Price reduced by €2,400</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Limited Availability Section -->
    <section class="limited-availability">
        <div class="container">
            <div class="availability-card">
                <h3 class="availability-title">⚠️ Limited Slots Available</h3>
                <p style="color: rgb(var(--foreground)); margin-bottom: 1rem;">
                    Only <strong>4 slots remaining</strong> out of 30 total. We intentionally limit capacity to maintain competitive advantage for our users.
                </p>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <p style="color: rgb(var(--muted-foreground)); font-size: 0.875rem;">
                    26 active subscribers • 4 spots available
                </p>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="container">
            <div class="section-header">
                <h2>Why Choose Amiquus?</h2>
                <p>Powerful features designed to give you the competitive edge in finding the perfect vehicles</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card fade-in-up">
                    <div class="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Multi-Platform Monitoring</h3>
                    <p>Monitor leading car listing platforms simultaneously. We continuously add new platforms to expand your reach and opportunities.</p>
                </div>
                
                <div class="feature-card fade-in-up" style="animation-delay: 0.1s;">
                    <div class="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Instant Telegram Alerts</h3>
                    <p>Receive immediate notifications with vehicle photos, pricing, location, and contact details. Be the first to respond to great deals.</p>
                </div>
                
                <div class="feature-card fade-in-up" style="animation-delay: 0.2s;">
                    <div class="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18l-2 13H5L3 6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 6L2.25 4H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="9" cy="20" r="1" stroke="currentColor" stroke-width="2"/>
                            <circle cx="20" cy="20" r="1" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3>Advanced Filtering</h3>
                    <p>Set detailed criteria including make, model, year, price range, mileage, fuel type, and location to find exactly what you need.</p>
                </div>
                
                <div class="feature-card fade-in-up" style="animation-delay: 0.3s;">
                    <div class="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>24/7 Monitoring</h3>
                    <p>Our system works around the clock, checking for new listings and price changes so you never miss an opportunity.</p>
                </div>
                
                <div class="feature-card fade-in-up" style="animation-delay: 0.4s;">
                    <div class="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Competitive Advantage</h3>
                    <p>Limited slots ensure you stay ahead of the competition. Perfect for dealers where being first means the difference between profit and loss.</p>
                </div>
                
                <div class="feature-card fade-in-up" style="animation-delay: 0.5s;">
                    <div class="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h18z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 12v7c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Flexible Management</h3>
                    <p>Pause or cancel your subscription anytime. Modify your search criteria as your needs change. Complete control at your fingertips.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2>How Amiquus Works</h2>
                <p>Get started in minutes and begin receiving alerts for your perfect vehicles</p>
            </div>
            
            <div class="steps-grid">
                <div class="step-card fade-in-up">
                    <div class="step-number">1</div>
                    <h3>Set Your Criteria</h3>
                    <p>Define your search parameters including vehicle type, price range, location, and other specific requirements.</p>
                </div>
                
                <div class="step-card fade-in-up" style="animation-delay: 0.1s;">
                    <div class="step-number">2</div>
                    <h3>Connect Telegram</h3>
                    <p>Link your Telegram account to receive instant notifications. Setup takes less than 2 minutes with our guided process.</p>
                </div>
                
                <div class="step-card fade-in-up" style="animation-delay: 0.2s;">
                    <div class="step-number">3</div>
                    <h3>Choose Monitoring Frequency</h3>
                    <p>Select how often we check for new listings. Higher frequencies give you faster alerts and better competitive advantage.</p>
                </div>
                
                <div class="step-card fade-in-up" style="animation-delay: 0.3s;">
                    <div class="step-number">4</div>
                    <h3>Receive Instant Alerts</h3>
                    <p>Get immediate notifications with vehicle photos, key details, and direct links. Be the first to contact sellers.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing">
        <div class="container">
            <div class="section-header">
                <h2>Simple, Transparent Pricing</h2>
                <p>Choose the monitoring frequency that gives you the competitive edge you need</p>
            </div>
            
            <div class="pricing-card">
                <div class="pricing-badge">Most Popular</div>
                <h3>Professional Monitoring</h3>
                <div class="price">$99<span style="font-size: 1rem; font-weight: 400; color: rgb(var(--muted-foreground));">/month</span></div>
                <div class="price-note">Starting price - final cost depends on platforms and frequency</div>
                
                <ul class="features-list">
                    <li><span class="check-icon">✓</span> Monitor multiple car listing platforms</li>
                    <li><span class="check-icon">✓</span> Instant Telegram notifications</li>
                    <li><span class="check-icon">✓</span> Advanced filtering options</li>
                    <li><span class="check-icon">✓</span> Vehicle photos and details</li>
                    <li><span class="check-icon">✓</span> Price change alerts</li>
                    <li><span class="check-icon">✓</span> Contact information included</li>
                    <li><span class="check-icon">✓</span> Pause/cancel anytime</li>
                    <li><span class="check-icon">✓</span> Limited slots for exclusivity</li>
                </ul>
                
                <a href="/setup-alerts" class="btn btn-primary" style="width: 100%;">Start Monitoring</a>
                
                <div style="margin-top: 1rem; font-size: 0.875rem; color: rgb(var(--muted-foreground));">
                    <p><strong>Additional costs:</strong></p>
                    <p>• Extra platforms: $20/month each</p>
                    <p>• Higher frequency monitoring available</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <h2>Ready to Find Your Perfect Vehicles?</h2>
            <p>Join successful dealers who use Amiquus to stay ahead of the competition. Limited slots available.</p>
            <a href="/setup-alerts" class="btn btn-accent" style="font-size: 1.125rem; padding: 1rem 2rem;">Get Started Now</a>
        </div>
    </section>

    <!-- Footer Component -->
    <Footer />

    <script>
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const sunIcon = themeToggle.querySelector('.sun');
        const moonIcon = themeToggle.querySelector('.moon');

        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        if (currentTheme === 'dark') {
            html.classList.add('dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in-up elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Mobile menu toggle (basic implementation)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }
        // Animate progress bar on scroll
        const progressBar = document.querySelector('.progress-fill');
        const availabilitySection = document.querySelector('.limited-availability');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.width = '85%';
                }
            });
        }, { threshold: 0.5 });
        
        progressObserver.observe(availabilitySection);
    </script>
</body>
</html>

##############

2. author.astro
##############



##############