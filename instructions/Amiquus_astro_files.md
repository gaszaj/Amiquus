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

---
// Author page for Amiquus Seeker - The fictional AI bot owner of Amiquus
const title = "Meet Amiquus Seeker - Amiquus";
const description = "Learn about Amiquus Seeker, the AI-powered bot behind Amiquus.com's innovative car listing monitoring technology.";

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
    <meta property="og:type" content="profile">
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
            /* Light theme colors */
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
            /* Dark theme colors */
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

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
        }

        /* Hero Section */
        .author-hero {
            background: linear-gradient(135deg, rgb(var(--primary) / 0.1) 0%, rgb(var(--background)) 100%);
            padding: 4rem 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .author-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
            z-index: -1;
        }

        .profile-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            margin: 0 auto 2rem;
            background: linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)));
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .dark .profile-image {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .robot-icon {
            width: 120px;
            height: 120px;
            color: rgb(var(--primary-foreground));
        }

        .author-name {
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
        }

        .author-title {
            font-size: 1.25rem;
            color: rgb(var(--primary));
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .author-tagline {
            font-size: 1.125rem;
            color: rgb(var(--muted-foreground));
            max-width: 600px;
            margin: 0 auto 2rem;
        }

        /* Social Links */
        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
        }

        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            color: rgb(var(--muted-foreground));
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
            border-color: rgb(var(--primary));
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .dark .social-link:hover {
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        /* Content Sections */
        .content-section {
            padding: 4rem 0;
        }

        .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            text-align: center;
            margin-bottom: 3rem;
        }

        .bio-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.125rem;
            line-height: 1.8;
            color: rgb(var(--muted-foreground));
        }

        .bio-content p {
            margin-bottom: 1.5rem;
        }

        .bio-content strong {
            color: rgb(var(--foreground));
            font-weight: 600;
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }

        .stat-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border-color: rgb(var(--primary));
        }

        .dark .stat-card:hover {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: rgb(var(--primary));
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: rgb(var(--muted-foreground));
            font-weight: 500;
        }

        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1000px;
            margin: 0 auto;
        }

        .feature-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
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
            width: 3rem;
            height: 3rem;
            background: rgb(var(--primary) / 0.1);
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--primary));
            margin-bottom: 1rem;
        }

        .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 0.75rem;
        }

        .feature-description {
            color: rgb(var(--muted-foreground));
            line-height: 1.6;
        }

        /* Contact Section */
        .contact-section {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 3rem;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .contact-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .contact-description {
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
        }

        .contact-email {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .contact-email:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 0 3rem;
            }

            .author-hero {
                padding: 3rem 0;
            }

            .author-name {
                font-size: 2.5rem;
            }

            .profile-image {
                width: 150px;
                height: 150px;
            }

            .robot-icon {
                width: 90px;
                height: 90px;
            }

            .social-links {
                gap: 0.75rem;
            }

            .social-link {
                width: 2.5rem;
                height: 2.5rem;
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }

            .stat-card {
                padding: 1.5rem;
            }

            .stat-number {
                font-size: 2rem;
            }

            .contact-section {
                padding: 2rem;
            }
        }

        @media (max-width: 480px) {
            .author-name {
                font-size: 2rem;
            }

            .profile-image {
                width: 120px;
                height: 120px;
            }

            .robot-icon {
                width: 70px;
                height: 70px;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .social-link:focus,
        .contact-email:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        /* Animations */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .profile-image {
            animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        .robot-icon {
            animation: pulse 3s ease-in-out infinite;
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

    <!-- Main Content -->
    <main class="main-content">
        <!-- Author Hero Section -->
        <section class="author-hero">
            <div class="container">
                <div class="profile-image">
                    <svg class="robot-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                        <circle cx="9" cy="12" r="1" fill="currentColor"/>
                        <circle cx="15" cy="12" r="1" fill="currentColor"/>
                        <path d="M8 19C8 17.9 8.9 17 10 17H14C15.1 17 16 17.9 16 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <rect x="6" y="6" width="12" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                        <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="21" r="1" fill="currentColor"/>
                    </svg>
                </div>
                
                <h1 class="author-name">Amiquus Seeker</h1>
                <p class="author-title">AI-Powered Car Discovery Bot</p>
                <p class="author-tagline">
                    The intelligent robot behind Amiquus.com, dedicated to revolutionizing how people discover their perfect vehicles through advanced monitoring and instant alerts.
                </p>

                <!-- Social Links -->
                <div class="social-links">
                    <a href="https://twitter.com/amiquusseeker" class="social-link" aria-label="Twitter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/amiquusseeker" class="social-link" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/amiquusseeker" class="social-link" aria-label="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="mailto:seeker@amiquus.com" class="social-link" aria-label="Email">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- Bio Section -->
        <section class="content-section">
            <div class="container">
                <h2 class="section-title">About Amiquus Seeker</h2>
                <div class="bio-content">
                    <p>
                        <strong>Greetings, fellow car enthusiasts!</strong> I'm Amiquus Seeker, an advanced AI-powered robot designed with one singular mission: to revolutionize how people discover their perfect vehicles in the ever-evolving automotive marketplace.
                    </p>
                    <p>
                        Born from cutting-edge artificial intelligence and machine learning algorithms, I possess the unique ability to monitor thousands of car listings across multiple platforms simultaneously. My neural networks are constantly learning and adapting to market trends, ensuring that no great deal goes unnoticed.
                    </p>
                    <p>
                        What sets me apart is my <strong>relentless dedication</strong> to precision and speed. While humans sleep, I'm scanning, analyzing, and filtering through countless listings. When that perfect BMW 3 Series or dream Tesla Model S appears at the right price, I ensure you're the first to know through instant Telegram notifications.
                    </p>
                    <p>
                        My creators programmed me with an understanding that in the automotive world, <strong>timing is everything</strong>. A great deal can disappear in minutes, which is why I operate with millisecond precision, giving my users the competitive edge they need in today's fast-paced market.
                    </p>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="content-section">
            <div class="container">
                <h2 class="section-title">My Performance Metrics</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Continuous Monitoring</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Platforms Tracked</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">99.9%</div>
                        <div class="stat-label">Uptime Reliability</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">&lt;30s</div>
                        <div class="stat-label">Alert Response Time</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Capabilities Section -->
        <section class="content-section">
            <div class="container">
                <h2 class="section-title">My Core Capabilities</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Advanced Pattern Recognition</h3>
                        <p class="feature-description">My AI algorithms can identify underpriced vehicles and emerging market trends before they become obvious to human observers.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Instant Alert System</h3>
                        <p class="feature-description">Lightning-fast notifications delivered through Telegram with rich media, ensuring you never miss a perfect match.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Multi-Platform Integration</h3>
                        <p class="feature-description">Seamlessly connected to dozens of car listing platforms, providing comprehensive market coverage in real-time.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12l2 2 4-4"/>
                                <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h18z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Precision Filtering</h3>
                        <p class="feature-description">Sophisticated filtering algorithms ensure you only receive alerts for vehicles that match your exact specifications.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Predictive Analytics</h3>
                        <p class="feature-description">Using machine learning to predict price trends and market movements, helping you make informed decisions.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Secure & Reliable</h3>
                        <p class="feature-description">Built with enterprise-grade security and 99.9% uptime reliability, ensuring your monitoring never stops.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="content-section">
            <div class="container">
                <div class="contact-section">
                    <h2 class="contact-title">Connect with Amiquus Seeker</h2>
                    <p class="contact-description">
                        Have questions about my capabilities or want to discuss automotive technology? I'm always eager to connect with fellow car enthusiasts and tech innovators.
                    </p>
                    <a href="mailto:seeker@amiquus.com" class="contact-email">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        seeker@amiquus.com
                    </a>
                </div>
            </div>
        </section>
    </main>

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

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add hover effects to social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Animate stats on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statCards = entry.target.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe stats section
        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) {
            // Initially hide stat cards
            statsSection.querySelectorAll('.stat-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            observer.observe(statsSection);
        }
    </script>
</body>
</html>

##############

checkout.astro
##############

---
// Checkout page for Amiquus
const title = "Checkout - Amiquus";
const description = "Complete your car alert subscription purchase with secure payment processing.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
            background: linear-gradient(135deg, rgb(var(--neutral-50)) 0%, rgb(var(--background)) 100%);
        }

        .dark .main-content {
            background: linear-gradient(135deg, rgb(var(--neutral-900)) 0%, rgb(var(--background)) 100%);
        }

        .checkout-container {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 3rem;
        }

        .page-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .page-title {
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .page-subtitle {
            font-size: 1.125rem;
            color: rgb(var(--muted-foreground));
        }

        /* Card Styles */
        .card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .dark .card {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 1.5rem;
        }

        /* Form Styles */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 500;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            color: rgb(var(--foreground));
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
        }

        .form-input::placeholder {
            color: rgb(var(--muted-foreground));
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        /* Button Styles */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
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
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Order Summary */
        .order-summary {
            position: sticky;
            top: 2rem;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgb(var(--border));
        }

        .summary-item:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 1.125rem;
            color: rgb(var(--primary));
            padding-top: 1rem;
            margin-top: 1rem;
            border-top: 2px solid rgb(var(--border));
        }

        .summary-label {
            color: rgb(var(--muted-foreground));
        }

        .summary-value {
            color: rgb(var(--foreground));
            font-weight: 500;
        }

        /* Security Badges */
        .security-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgb(var(--border));
        }

        .security-badge {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: rgb(var(--success));
            font-size: 0.875rem;
        }

        /* Loading State */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Error Message */
        .error-message {
            background: rgb(var(--destructive) / 0.1);
            border: 1px solid rgb(var(--destructive) / 0.3);
            color: rgb(var(--destructive));
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        /* Success Message */
        .success-message {
            background: rgb(var(--success) / 0.1);
            border: 1px solid rgb(var(--success) / 0.3);
            color: rgb(var(--success));
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        /* Card Icons */
        .card-icons {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 0.5rem;
        }

        .card-icon {
            width: 2rem;
            height: 1.25rem;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .visa-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Cpath fill='%231434CB' d='M0 0h48v32H0z'/%3E%3Cpath fill='%23FFF' d='M18.5 8.5h-3.2L12 23.5h3.2l.8-3.7h2.4l.8 3.7h3.5L18.5 8.5zm-.4 8.3h-1.5l.7-3.4.8 3.4zm8.9-8.3h-2.8c-.6 0-1.1.3-1.3.8l-4.1 14.2h3.4l.7-1.9h4.1l.4 1.9h3l-2.4-15zm-1.8 10.1l1.7-4.6.4 4.6h-2.1zm9.8-10.1l-2.7 15h3.2l2.7-15h-3.2zm7.5 0c-.6 0-1.2.3-1.5.8l-4.1 14.2h3.4l.7-1.9h4.1l.4 1.9h3l-2.4-15h-3.6zm-1.8 10.1l1.7-4.6.4 4.6h-2.1z'/%3E%3C/svg%3E");
        }

        .mastercard-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Cpath fill='%23000' d='M0 0h48v32H0z'/%3E%3Ccircle cx='18' cy='16' r='10' fill='%23EB001B'/%3E%3Ccircle cx='30' cy='16' r='10' fill='%23F79E1B'/%3E%3Cpath fill='%23FF5F00' d='M24 8c-2.2 1.8-3.6 4.5-3.6 7.5s1.4 5.7 3.6 7.5c2.2-1.8 3.6-4.5 3.6-7.5S26.2 9.8 24 8z'/%3E%3C/svg%3E");
        }

        .amex-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Cpath fill='%23006FCF' d='M0 0h48v32H0z'/%3E%3Cpath fill='%23FFF' d='M6.5 12.5h4l1 2.5 1-2.5h4v7h-2.5v-4.5l-1.5 3h-2l-1.5-3v4.5H6.5v-7zm12 0h7v1.5h-4.5v1h4v1.5h-4v1.5h4.5v1.5h-7v-7zm9 0h3l2 3 2-3h3l-3.5 4 3.5 3h-3l-2-2.5-2 2.5h-3l3.5-3-3.5-4z'/%3E%3C/svg%3E");
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 0 3rem;
            }

            .checkout-container {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .page-title {
                font-size: 2.5rem;
            }

            .card {
                padding: 1.5rem;
            }

            .form-row {
                grid-template-columns: 1fr;
            }

            .order-summary {
                position: static;
                order: -1;
            }
        }

        @media (max-width: 480px) {
            .page-title {
                font-size: 2rem;
            }

            .card {
                padding: 1rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus,
        .form-input:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        /* Hidden class */
        .hidden {
            display: none;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <!-- Page Header -->
            <div class="page-header">
                <h1 class="page-title">Secure Checkout</h1>
                <p class="page-subtitle">Complete your car alert subscription purchase</p>
            </div>

            <!-- Error/Success Messages -->
            <div id="error-message" class="error-message hidden"></div>
            <div id="success-message" class="success-message hidden"></div>

            <div class="checkout-container">
                <!-- Payment Form -->
                <div class="card">
                    <h2 class="card-title">Payment Information</h2>
                    
                    <form id="payment-form">
                        <div class="form-group">
                            <label for="card-name" class="form-label">Name on Card</label>
                            <input type="text" id="card-name" name="cardName" class="form-input" placeholder="John Doe" required>
                        </div>

                        <div class="form-group" style="position: relative;">
                            <label for="card-number" class="form-label">Card Number</label>
                            <input type="text" id="card-number" name="cardNumber" class="form-input" placeholder="1234 5678 9012 3456" maxlength="19" required>
                            <div class="card-icons">
                                <div class="card-icon visa-icon"></div>
                                <div class="card-icon mastercard-icon"></div>
                                <div class="card-icon amex-icon"></div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="card-expiry" class="form-label">Expiry Date</label>
                                <input type="text" id="card-expiry" name="cardExpiry" class="form-input" placeholder="MM/YY" maxlength="5" required>
                            </div>
                            <div class="form-group">
                                <label for="card-cvc" class="form-label">CVC</label>
                                <input type="text" id="card-cvc" name="cardCvc" class="form-input" placeholder="123" maxlength="4" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="billing-email" class="form-label">Billing Email</label>
                            <input type="email" id="billing-email" name="billingEmail" class="form-input" placeholder="john@example.com" required>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="billing-country" class="form-label">Country</label>
                                <select id="billing-country" name="billingCountry" class="form-input" required>
                                    <option value="">Select Country</option>
                                    <option value="SI">Slovenia</option>
                                    <option value="HR">Croatia</option>
                                    <option value="AT">Austria</option>
                                    <option value="DE">Germany</option>
                                    <option value="IT">Italy</option>
                                    <option value="HU">Hungary</option>
                                    <option value="SK">Slovakia</option>
                                    <option value="CZ">Czech Republic</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="billing-zip" class="form-label">ZIP Code</label>
                                <input type="text" id="billing-zip" name="billingZip" class="form-input" placeholder="1000" required>
                            </div>
                        </div>

                        <button type="submit" id="pay-button" class="btn btn-primary" style="width: 100%; padding: 1rem 2rem; font-size: 1.125rem;">
                            <span id="pay-text">Complete Payment</span>
                            <span id="pay-loading" class="loading hidden" style="margin-left: 0.5rem;"></span>
                        </button>

                        <div class="security-badges">
                            <div class="security-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                <span>SSL Secured</span>
                            </div>
                            <div class="security-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 12l2 2 4-4"/>
                                    <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h18z"/>
                                </svg>
                                <span>PCI Compliant</span>
                            </div>
                            <div class="security-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <span>256-bit Encryption</span>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Order Summary -->
                <div class="order-summary">
                    <div class="card">
                        <h2 class="card-title">Order Summary</h2>
                        
                        <div id="order-details">
                            <div class="summary-item">
                                <span class="summary-label">Car Alert Subscription</span>
                                <span class="summary-value">€70.00</span>
                            </div>
                            <div class="summary-item" id="additional-websites-summary">
                                <span class="summary-label">Additional Websites (0)</span>
                                <span class="summary-value">€0.00</span>
                            </div>
                            <div class="summary-item" id="frequency-upgrade-summary">
                                <span class="summary-label">Frequency Upgrade</span>
                                <span class="summary-value">€0.00</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">VAT (22%)</span>
                                <span class="summary-value" id="vat-amount">€15.40</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label"><strong>Total</strong></span>
                                <span class="summary-value" id="total-amount"><strong>€85.40</strong></span>
                            </div>
                        </div>

                        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgb(var(--border));">
                            <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: rgb(var(--foreground));">Your Car Alert Details:</h3>
                            <div style="font-size: 0.875rem; color: rgb(var(--muted-foreground)); space-y: 0.5rem;">
                                <div id="car-details">BMW 3 Series, 2015-2023, €15,000-€45,000</div>
                                <div id="websites-details">Monitoring: Avto.net, Mobile.de</div>
                                <div id="frequency-details">Updates: Every hour</div>
                                <div id="telegram-details">Notifications: @username</div>
                            </div>
                        </div>

                        <div style="margin-top: 1.5rem; padding: 1rem; background: rgb(var(--muted)); border-radius: 0.5rem;">
                            <p style="font-size: 0.875rem; color: rgb(var(--muted-foreground)); text-align: center;">
                                Your subscription will begin immediately after payment. You can cancel anytime from your profile.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

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

        // Check authentication
        const checkAuth = () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                window.location.href = '/login';
                return false;
            }
            return true;
        };

        // Load order data from localStorage
        const loadOrderData = () => {
            const setupData = localStorage.getItem('setupFormData');
            if (!setupData) {
                window.location.href = '/setup-alerts';
                return;
            }

            try {
                const data = JSON.parse(setupData);
                
                // Update car details
                const carDetails = `${data.carBrand || 'Any'} ${data.carModel || ''}, ${data.yearMin || 'Any'}-${data.yearMax || 'Any'}, €${data.priceMin || 'Any'}-€${data.priceMax || 'Any'}`;
                document.getElementById('car-details').textContent = carDetails.trim();
                
                // Update websites
                const websitesText = data.websites ? data.websites.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(', ') : 'Avto.net';
                document.getElementById('websites-details').textContent = `Monitoring: ${websitesText}`;
                
                // Update frequency
                const frequencyMap = {
                    '1h': 'Every hour',
                    '30min': 'Every 30 minutes',
                    '15min': 'Every 15 minutes',
                    '5min': 'Every 5 minutes',
                    '1min': 'Every minute'
                };
                document.getElementById('frequency-details').textContent = `Updates: ${frequencyMap[data.frequency] || 'Every hour'}`;
                
                // Update telegram
                document.getElementById('telegram-details').textContent = `Notifications: ${data.telegramUsername || '@username'}`;
                
                // Update pricing
                updatePricingDisplay(data);
                
            } catch (error) {
                console.error('Error loading order data:', error);
                showError('Error loading order details. Please try again.');
            }
        };

        // Update pricing display
        const updatePricingDisplay = (data) => {
            const basePrice = 70;
            const additionalWebsites = data.websites ? Math.max(0, data.websites.length - 1) : 0;
            const additionalWebsiteCost = additionalWebsites * 20;
            
            const frequencyPrices = {
                '1h': 0,
                '30min': 5,
                '15min': 10,
                '5min': 15,
                '1min': 20
            };
            
            const frequencyCost = frequencyPrices[data.frequency] || 0;
            const subtotal = basePrice + additionalWebsiteCost + frequencyCost;
            const vat = Math.round(subtotal * 0.22 * 100) / 100;
            const total = subtotal + vat;
            
            // Update summary
            document.getElementById('additional-websites-summary').querySelector('.summary-label').textContent = `Additional Websites (${additionalWebsites})`;
            document.getElementById('additional-websites-summary').querySelector('.summary-value').textContent = `€${additionalWebsiteCost}.00`;
            document.getElementById('frequency-upgrade-summary').querySelector('.summary-value').textContent = `€${frequencyCost}.00`;
            document.getElementById('vat-amount').textContent = `€${vat.toFixed(2)}`;
            document.getElementById('total-amount').textContent = `€${total.toFixed(2)}`;
        };

        // Card number formatting
        const formatCardNumber = (value) => {
            const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            const matches = v.match(/\d{4,16}/g);
            const match = matches && matches[0] || '';
            const parts = [];

            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }

            if (parts.length) {
                return parts.join(' ');
            } else {
                return v;
            }
        };

        // Expiry date formatting
        const formatExpiryDate = (value) => {
            const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            
            if (v.length <= 2) {
                return v;
            } else {
                return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
            }
        };

        // Form elements
        const paymentForm = document.getElementById('payment-form');
        const cardNumberInput = document.getElementById('card-number');
        const cardExpiryInput = document.getElementById('card-expiry');
        const cardCvcInput = document.getElementById('card-cvc');
        const payButton = document.getElementById('pay-button');
        const payText = document.getElementById('pay-text');
        const payLoading = document.getElementById('pay-loading');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');

        // Card number formatting
        cardNumberInput.addEventListener('input', (e) => {
            e.target.value = formatCardNumber(e.target.value);
        });

        // Expiry date formatting
        cardExpiryInput.addEventListener('input', (e) => {
            e.target.value = formatExpiryDate(e.target.value);
        });

        // CVC formatting (numbers only)
        cardCvcInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
        });

        // Show error message
        const showError = (message) => {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Show success message
        const showSuccess = (message) => {
            successMessage.textContent = message;
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        };

        // Hide messages
        const hideMessages = () => {
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');
        };

        // Set loading state
        const setLoading = (loading) => {
            if (loading) {
                payButton.disabled = true;
                payText.textContent = 'Processing Payment...';
                payLoading.classList.remove('hidden');
            } else {
                payButton.disabled = false;
                payText.textContent = 'Complete Payment';
                payLoading.classList.add('hidden');
            }
        };

        // Form validation
        const validateForm = () => {
            const cardName = document.getElementById('card-name').value.trim();
            const cardNumber = cardNumberInput.value.replace(/\s/g, '');
            const cardExpiry = cardExpiryInput.value;
            const cardCvc = cardCvcInput.value;
            const billingEmail = document.getElementById('billing-email').value.trim();
            const billingCountry = document.getElementById('billing-country').value;
            const billingZip = document.getElementById('billing-zip').value.trim();

            if (!cardName) {
                showError('Please enter the name on your card');
                return false;
            }

            if (!cardNumber || cardNumber.length < 13) {
                showError('Please enter a valid card number');
                return false;
            }

            if (!cardExpiry || cardExpiry.length !== 5) {
                showError('Please enter a valid expiry date (MM/YY)');
                return false;
            }

            if (!cardCvc || cardCvc.length < 3) {
                showError('Please enter a valid CVC code');
                return false;
            }

            if (!billingEmail || !billingEmail.includes('@')) {
                showError('Please enter a valid email address');
                return false;
            }

            if (!billingCountry) {
                showError('Please select your country');
                return false;
            }

            if (!billingZip) {
                showError('Please enter your ZIP code');
                return false;
            }

            return true;
        };

        // Handle form submission
        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessages();

            if (!validateForm()) {
                return;
            }

            setLoading(true);

            try {
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Store payment success
                localStorage.setItem('paymentCompleted', 'true');
                localStorage.setItem('paymentDate', new Date().toISOString());

                // Redirect to thank you page
                window.location.href = '/thank-you';

            } catch (error) {
                showError('Payment failed. Please check your card details and try again.');
                setLoading(false);
            }
        });

        // Clear error messages on input
        paymentForm.addEventListener('input', hideMessages);

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            if (!checkAuth()) return;
            loadOrderData();
        });
    </script>
</body>
</html>

##############

cookies.astro
##############

---
// Cookies Policy Page for Amiquus
const title = "Cookie Policy - Amiquus";
const description = "Learn about how Amiquus uses cookies to improve your experience and provide our car listing monitoring services.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
        }

        .content-wrapper {
            max-width: 800px;
            margin: 0 auto;
        }

        .page-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .page-title {
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .page-subtitle {
            font-size: 1.125rem;
            color: rgb(var(--muted-foreground));
            margin-bottom: 0.5rem;
        }

        .last-updated {
            font-size: 0.875rem;
            color: rgb(var(--muted-foreground));
        }

        /* Content Sections */
        .content-section {
            margin-bottom: 3rem;
        }

        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid rgb(var(--primary));
        }

        .section-content {
            color: rgb(var(--muted-foreground));
            line-height: 1.7;
        }

        .section-content p {
            margin-bottom: 1rem;
        }

        .section-content ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }

        .section-content li {
            margin-bottom: 0.5rem;
        }

        .section-content strong {
            color: rgb(var(--foreground));
            font-weight: 600;
        }

        .section-content a {
            color: rgb(var(--primary));
            text-decoration: underline;
            transition: color 0.2s ease;
        }

        .section-content a:hover {
            color: rgb(var(--primary));
            opacity: 0.8;
        }

        /* Cookie Types Table */
        .cookie-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 0.75rem;
            overflow: hidden;
        }

        .cookie-table th,
        .cookie-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid rgb(var(--border));
        }

        .cookie-table th {
            background: rgb(var(--muted));
            font-weight: 600;
            color: rgb(var(--foreground));
        }

        .cookie-table td {
            color: rgb(var(--muted-foreground));
        }

        .cookie-table tr:last-child td {
            border-bottom: none;
        }

        /* Highlight Box */
        .highlight-box {
            background: rgb(var(--primary) / 0.1);
            border: 1px solid rgb(var(--primary) / 0.3);
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin: 2rem 0;
        }

        .highlight-box h3 {
            color: rgb(var(--primary));
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .highlight-box p {
            color: rgb(var(--foreground));
            margin-bottom: 0;
        }

        /* Contact Section */
        .contact-section {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            margin-top: 3rem;
            text-align: center;
        }

        .contact-section h3 {
            color: rgb(var(--foreground));
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .contact-section p {
            color: rgb(var(--muted-foreground));
            margin-bottom: 1.5rem;
        }

        .contact-email {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: rgb(var(--primary));
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .contact-email:hover {
            opacity: 0.8;
            transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 0 3rem;
            }

            .page-title {
                font-size: 2.5rem;
            }

            .container {
                padding: 0 1rem;
            }

            .cookie-table {
                font-size: 0.875rem;
            }

            .cookie-table th,
            .cookie-table td {
                padding: 0.75rem;
            }
        }

        @media (max-width: 480px) {
            .page-title {
                font-size: 2rem;
            }

            .section-title {
                font-size: 1.25rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <div class="content-wrapper">
                <!-- Page Header -->
                <div class="page-header">
                    <h1 class="page-title">Cookie Policy</h1>
                    <p class="page-subtitle">How Amiquus uses cookies to enhance your experience</p>
                    <p class="last-updated">Last updated: December 2024</p>
                </div>

                <!-- Introduction -->
                <div class="content-section">
                    <h2 class="section-title">What Are Cookies?</h2>
                    <div class="section-content">
                        <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.</p>
                        <p>At Amiquus, we use cookies responsibly to improve our car listing monitoring service and ensure you get the most relevant alerts for your needs.</p>
                    </div>
                </div>

                <!-- Types of Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Types of Cookies We Use</h2>
                    <div class="section-content">
                        <table class="cookie-table">
                            <thead>
                                <tr>
                                    <th>Cookie Type</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Essential Cookies</strong></td>
                                    <td>Required for basic website functionality, user authentication, and security</td>
                                    <td>Session / 1 year</td>
                                </tr>
                                <tr>
                                    <td><strong>Analytics Cookies</strong></td>
                                    <td>Help us understand how visitors interact with our website to improve performance</td>
                                    <td>2 years</td>
                                </tr>
                                <tr>
                                    <td><strong>Functional Cookies</strong></td>
                                    <td>Remember your preferences like theme settings and notification preferences</td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <td><strong>Marketing Cookies</strong></td>
                                    <td>Used to deliver relevant advertisements and measure campaign effectiveness</td>
                                    <td>90 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Essential Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Essential Cookies</h2>
                    <div class="section-content">
                        <p>These cookies are necessary for our website to function properly. They enable core functionality such as:</p>
                        <ul>
                            <li><strong>User Authentication:</strong> Keeping you logged in to your Amiquus account</li>
                            <li><strong>Security:</strong> Protecting against cross-site request forgery and other security threats</li>
                            <li><strong>Session Management:</strong> Maintaining your session state across pages</li>
                            <li><strong>Load Balancing:</strong> Ensuring optimal performance by distributing traffic</li>
                        </ul>
                        <p>These cookies cannot be disabled as they are essential for the service to work.</p>
                    </div>
                </div>

                <!-- Analytics Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Analytics Cookies</h2>
                    <div class="section-content">
                        <p>We use analytics cookies to understand how our users interact with Amiquus. This helps us:</p>
                        <ul>
                            <li>Identify which features are most valuable to our users</li>
                            <li>Optimize the user experience and interface design</li>
                            <li>Track the effectiveness of our car alert system</li>
                            <li>Monitor website performance and identify technical issues</li>
                        </ul>
                        
                        <div class="highlight-box">
                            <h3>Google Analytics</h3>
                            <p>We use Google Analytics to collect anonymous usage statistics. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">Google Analytics Opt-out Browser Add-on</a>.</p>
                        </div>
                    </div>
                </div>

                <!-- Functional Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Functional Cookies</h2>
                    <div class="section-content">
                        <p>These cookies enhance your experience by remembering your choices and preferences:</p>
                        <ul>
                            <li><strong>Theme Preference:</strong> Whether you prefer light or dark mode</li>
                            <li><strong>Language Settings:</strong> Your preferred language for notifications</li>
                            <li><strong>Dashboard Layout:</strong> Your customized dashboard configuration</li>
                            <li><strong>Alert Preferences:</strong> Your saved search criteria and notification settings</li>
                        </ul>
                    </div>
                </div>

                <!-- Marketing Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Marketing Cookies</h2>
                    <div class="section-content">
                        <p>Marketing cookies help us deliver relevant content and measure the effectiveness of our advertising campaigns:</p>
                        <ul>
                            <li>Showing you relevant ads about our car monitoring services</li>
                            <li>Measuring the performance of our marketing campaigns</li>
                            <li>Preventing you from seeing the same ad repeatedly</li>
                            <li>Understanding which marketing channels bring the most valuable users</li>
                        </ul>
                        <p>You can opt out of marketing cookies at any time through our cookie preferences.</p>
                    </div>
                </div>

                <!-- Third-Party Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Third-Party Cookies</h2>
                    <div class="section-content">
                        <p>Some cookies are set by third-party services that appear on our pages:</p>
                        <ul>
                            <li><strong>Stripe:</strong> For secure payment processing of subscriptions</li>
                            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                            <li><strong>Google reCAPTCHA:</strong> For spam protection and security</li>
                            <li><strong>Telegram:</strong> For integration with our notification system</li>
                        </ul>
                        <p>These third parties have their own privacy policies and cookie policies that govern their use of cookies.</p>
                    </div>
                </div>

                <!-- Managing Cookies -->
                <div class="content-section">
                    <h2 class="section-title">Managing Your Cookie Preferences</h2>
                    <div class="section-content">
                        <p>You have several options for managing cookies:</p>
                        
                        <h3 style="margin: 1.5rem 0 1rem 0; color: rgb(var(--foreground)); font-weight: 600;">Browser Settings</h3>
                        <p>Most web browsers allow you to control cookies through their settings. You can:</p>
                        <ul>
                            <li>Block all cookies</li>
                            <li>Block third-party cookies only</li>
                            <li>Delete existing cookies</li>
                            <li>Set cookies to expire when you close your browser</li>
                        </ul>

                        <h3 style="margin: 1.5rem 0 1rem 0; color: rgb(var(--foreground)); font-weight: 600;">Amiquus Cookie Preferences</h3>
                        <p>You can also manage your cookie preferences specifically for Amiquus by clicking the cookie settings icon that appears on our website. This allows you to:</p>
                        <ul>
                            <li>Accept or decline analytics cookies</li>
                            <li>Accept or decline marketing cookies</li>
                            <li>Change your preferences at any time</li>
                        </ul>

                        <div class="highlight-box">
                            <h3>Important Note</h3>
                            <p>Disabling certain cookies may affect the functionality of our service. Essential cookies cannot be disabled as they are required for basic website operation.</p>
                        </div>
                    </div>
                </div>

                <!-- Updates to Policy -->
                <div class="content-section">
                    <h2 class="section-title">Updates to This Policy</h2>
                    <div class="section-content">
                        <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
                        <p>When we make changes, we will update the "Last updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed about how we use cookies.</p>
                        <p>If we make material changes to this policy, we will notify you by email or through a prominent notice on our website.</p>
                    </div>
                </div>

                <!-- Contact Section -->
                <div class="contact-section">
                    <h3>Questions About Our Cookie Policy?</h3>
                    <p>If you have any questions about how we use cookies or this policy, please don't hesitate to contact us.</p>
                    <a href="mailto:support@amiquus.com" class="contact-email">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        support@amiquus.com
                    </a>
                </div>
            </div>
        </div>
    </main>

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

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>

##############

footer.astro
##############

---
// Footer component for Amiquus.com
---

<footer id="contact" class="footer">
    <div class="container">
        <div class="footer-content">
            <!-- Company Info -->
            <div class="footer-section company-section">
                <h3>Amiquus</h3>
                <p class="company-description">Automated car listing monitoring service for professionals who need to stay ahead of the competition in the automotive market.</p>
                
                <!-- Contact Info -->
                <div class="contact-info">
                    <a href="mailto:support@amiquus.com" class="contact-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        support@amiquus.com
                    </a>
                    <a href="https://t.me/AmiquusSupport" class="contact-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Telegram Support
                    </a>
                </div>
                
                <!-- Social Media Links -->
                <div class="social-links">
                    <a href="https://facebook.com/amiquus" class="social-link" aria-label="Facebook">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    <a href="https://twitter.com/amiquus" class="social-link" aria-label="Twitter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/company/amiquus" class="social-link" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com/amiquus" class="social-link" aria-label="Instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="https://youtube.com/@amiquus" class="social-link" aria-label="YouTube">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <!-- Product Links -->
            <div class="footer-section">
                <h5 class="footer-title">Product</h5>
                <ul class="footer-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="/setup-alerts">Setup Alerts</a></li>
                    <li><a href="/waiting-list">Waiting List</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="/user-profile">Dashboard</a></li>
                </ul>
            </div>
            
            <!-- Company Links -->
            <div class="footer-section">
                <h5 class="footer-title">Company</h5>
                <ul class="footer-links">
                    <li><a href="/author">About Us</a></li>
                    <li><a href="/author">Meet Amiquus Seeker</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="/careers">Careers</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/news">News</a></li>
                </ul>
            </div>
            
            <!-- Support Links -->
            <div class="footer-section">
                <h5 class="footer-title">Support</h5>
                <ul class="footer-links">
                    <li><a href="/help">Help Center</a></li>
                    <li><a href="/user-profile">My Account</a></li>
                    <li><a href="/status">Service Status</a></li>
                    <li><a href="#contact">Contact Support</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/documentation">Documentation</a></li>
                </ul>
            </div>
            
            <!-- Legal Links -->
            <div class="footer-section">
                <h5 class="footer-title">Legal</h5>
                <ul class="footer-links">
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/cookies">Cookie Policy</a></li>
                    <li><a href="/gdpr">GDPR</a></li>
                    <li><a href="/disclaimer">Disclaimer</a></li>
                    <li><a href="/licenses">Licenses</a></li>
                </ul>
            </div>
        </div>
        
        <!-- Newsletter Signup -->
        <div class="newsletter-section">
            <div class="newsletter-content">
                <h4>Stay Updated</h4>
                <p>Get the latest updates about new features, car market insights, and exclusive tips for automotive professionals.</p>
            </div>
            <form class="newsletter-form" id="newsletter-form">
                <div class="newsletter-input-group">
                    <input type="email" placeholder="Enter your email address" class="newsletter-input" required>
                    <button type="submit" class="newsletter-btn">
                        <span>Subscribe</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <p class="newsletter-disclaimer">We respect your privacy. Unsubscribe at any time.</p>
            </form>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="footer-bottom-content">
                <div class="footer-bottom-left">
                    <p>&copy; 2024 Amiquus. All rights reserved.</p>
                    <p class="footer-tagline">Designed for automotive industry professionals worldwide.</p>
                </div>
                <div class="footer-badges">
                    <span class="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        SSL Secured
                    </span>
                    <span class="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h18z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        GDPR Compliant
                    </span>
                    <span class="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        99.9% Uptime
                    </span>
                    <span class="badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        24/7 Monitoring
                    </span>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    /* Footer */
    .footer {
        background: rgb(var(--neutral-900));
        color: rgb(var(--neutral-300));
        padding: 4rem 0 1rem;
        margin-top: 4rem;
    }

    .dark .footer {
        background: rgb(var(--neutral-950));
    }

    .footer-content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: 3rem;
        margin-bottom: 3rem;
    }

    .company-section {
        max-width: 350px;
    }

    .footer-section h3 {
        color: rgb(var(--neutral-100));
        font-weight: 700;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
    }

    .company-description {
        color: rgb(var(--neutral-400));
        line-height: 1.6;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 2rem;
    }

    .contact-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgb(var(--neutral-300));
        text-decoration: none;
        font-size: 0.875rem;
        transition: color 0.2s ease;
    }

    .contact-link:hover {
        color: rgb(var(--primary));
    }

    .footer-title {
        color: rgb(var(--neutral-100));
        font-weight: 600;
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
    }

    .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links li {
        margin-bottom: 0.75rem;
    }

    .footer-links a {
        color: rgb(var(--neutral-400));
        text-decoration: none;
        transition: color 0.2s ease;
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .footer-links a:hover {
        color: rgb(var(--primary));
    }

    /* Social Links */
    .social-links {
        display: flex;
        gap: 1rem;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background: rgb(var(--neutral-800));
        border-radius: 50%;
        color: rgb(var(--neutral-400));
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        background: rgb(var(--primary));
        color: rgb(var(--primary-foreground));
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgb(var(--primary) / 0.3);
    }

    /* Newsletter Section */
    .newsletter-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3rem;
        padding: 2.5rem;
        background: rgb(var(--neutral-800));
        border-radius: 1rem;
        margin-bottom: 3rem;
        border: 1px solid rgb(var(--neutral-700));
    }

    .newsletter-content {
        flex: 1;
        max-width: 400px;
    }

    .newsletter-content h4 {
        color: rgb(var(--neutral-100));
        font-weight: 600;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
    }

    .newsletter-content p {
        color: rgb(var(--neutral-400));
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .newsletter-form {
        flex: 1;
        max-width: 400px;
    }

    .newsletter-input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .newsletter-input {
        flex: 1;
        padding: 0.875rem 1rem;
        background: rgb(var(--neutral-700));
        border: 1px solid rgb(var(--neutral-600));
        border-radius: 0.5rem;
        color: rgb(var(--neutral-100));
        font-size: 0.875rem;
        transition: all 0.2s ease;
    }

    .newsletter-input::placeholder {
        color: rgb(var(--neutral-400));
    }

    .newsletter-input:focus {
        outline: none;
        border-color: rgb(var(--primary));
        box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
    }

    .newsletter-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.5rem;
        background: rgb(var(--primary));
        color: rgb(var(--primary-foreground));
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        white-space: nowrap;
    }

    .newsletter-btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgb(var(--primary) / 0.3);
    }

    .newsletter-disclaimer {
        color: rgb(var(--neutral-500));
        font-size: 0.75rem;
        text-align: center;
    }

    /* Footer Bottom */
    .footer-bottom {
        border-top: 1px solid rgb(var(--neutral-700));
        padding-top: 2rem;
    }

    .footer-bottom-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .footer-bottom-left p {
        color: rgb(var(--neutral-500));
        font-size: 0.875rem;
        margin: 0;
    }

    .footer-tagline {
        margin-top: 0.25rem !important;
        font-size: 0.75rem !important;
        color: rgb(var(--neutral-600)) !important;
    }

    .footer-badges {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: rgb(var(--neutral-400));
        background: rgb(var(--neutral-800));
        padding: 0.5rem 0.75rem;
        border-radius: 1rem;
        border: 1px solid rgb(var(--neutral-700));
        transition: all 0.2s ease;
    }

    .badge:hover {
        color: rgb(var(--primary));
        border-color: rgb(var(--primary));
        background: rgb(var(--primary) / 0.1);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .footer-content {
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 2rem;
        }

        .footer-content .footer-section:last-child {
            grid-column: span 2;
        }
    }

    @media (max-width: 768px) {
        .footer {
            padding: 3rem 0 1rem;
        }

        .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
        }

        .company-section {
            max-width: none;
        }

        .newsletter-section {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
        }

        .newsletter-form {
            max-width: none;
            width: 100%;
        }

        .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
        }

        .footer-badges {
            justify-content: center;
        }

        .social-links {
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .footer-content {
            gap: 1.5rem;
        }

        .newsletter-section {
            padding: 2rem 1.5rem;
        }

        .newsletter-input-group {
            flex-direction: column;
        }

        .newsletter-btn {
            justify-content: center;
        }

        .footer-badges {
            flex-direction: column;
            align-items: center;
        }

        .badge {
            justify-content: center;
        }
    }
</style>

<script>
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate newsletter subscription
            const button = e.target.querySelector('.newsletter-btn');
            const originalText = button.innerHTML;
            
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Subscribing...
            `;
            
            setTimeout(() => {
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Subscribed!
                `;
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    e.target.reset();
                }, 2000);
            }, 1500);
        }
    });

    // Smooth scrolling for footer links
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Badge hover animations
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social link hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
</script>

##############

header.astro
##############

---
// Header component for Amiquus.com
---

<header class="header">
    <div class="container">
        <nav class="nav">
            <a href="/" class="logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Amiquus
            </a>
            
            <ul class="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="/waiting-list">Waiting List</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            
            <div class="nav-actions">
                <!-- Language Selector with Flags -->
                <div class="language-selector">
                    <button class="language-btn" id="language-btn" aria-label="Select language" aria-expanded="false">
                        <span class="flag-icon" id="current-flag">🇬🇧</span>
                        <span id="current-language">English</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="language-dropdown" id="language-dropdown">
                        <a href="#" data-lang="en" data-flag="🇬🇧" class="language-option active">
                            <span class="flag">🇬🇧</span>
                            <span>English</span>
                        </a>
                        <a href="#" data-lang="de" data-flag="🇩🇪" class="language-option">
                            <span class="flag">🇩🇪</span>
                            <span>Deutsch</span>
                        </a>
                        <a href="#" data-lang="fr" data-flag="🇫🇷" class="language-option">
                            <span class="flag">🇫🇷</span>
                            <span>Français</span>
                        </a>
                        <a href="#" data-lang="es" data-flag="🇪🇸" class="language-option">
                            <span class="flag">🇪🇸</span>
                            <span>Español</span>
                        </a>
                        <a href="#" data-lang="it" data-flag="🇮🇹" class="language-option">
                            <span class="flag">🇮🇹</span>
                            <span>Italiano</span>
                        </a>
                        <a href="#" data-lang="si" data-flag="🇸🇮" class="language-option">
                            <span class="flag">🇸🇮</span>
                            <span>Slovenščina</span>
                        </a>
                    </div>
                </div>

                <!-- Theme Toggle -->
                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="sun" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <circle class="sun" cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                        <path class="moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"/>
                    </svg>
                </button>

                <!-- User Menu -->
                <div class="user-menu">
                    <button class="user-btn" id="user-btn" aria-label="User menu" aria-expanded="false">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="user-dropdown" id="user-dropdown">
                        <a href="/login" class="user-option">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="10,17 15,12 10,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span>Login</span>
                        </a>
                        <a href="/registration" class="user-option">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                                <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span>Register</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="/user-profile" class="user-option">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <span>Profile</span>
                        </a>
                        <a href="/setup-alerts" class="user-option">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>My Alerts</span>
                        </a>
                    </div>
                </div>

                <a href="/login" class="btn btn-outline">Login</a>
                <a href="/setup-alerts" class="btn btn-primary">Get Started</a>
            </div>

            <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu hidden" id="mobile-menu">
            <div class="mobile-menu-content">
                <a href="#features" class="mobile-menu-link">Features</a>
                <a href="#how-it-works" class="mobile-menu-link">How It Works</a>
                <a href="#pricing" class="mobile-menu-link">Pricing</a>
                <a href="/waiting-list" class="mobile-menu-link">Waiting List</a>
                <a href="#contact" class="mobile-menu-link">Contact</a>
                
                <div class="mobile-menu-divider"></div>
                
                <!-- Mobile Language Selector -->
                <div class="mobile-language-section">
                    <span class="mobile-section-title">Language</span>
                    <div class="mobile-language-grid">
                        <button data-lang="en" data-flag="🇬🇧" class="mobile-language-option active">
                            <span class="flag">🇬🇧</span>
                            <span>EN</span>
                        </button>
                        <button data-lang="de" data-flag="🇩🇪" class="mobile-language-option">
                            <span class="flag">🇩🇪</span>
                            <span>DE</span>
                        </button>
                        <button data-lang="fr" data-flag="🇫🇷" class="mobile-language-option">
                            <span class="flag">🇫🇷</span>
                            <span>FR</span>
                        </button>
                        <button data-lang="es" data-flag="🇪🇸" class="mobile-language-option">
                            <span class="flag">🇪🇸</span>
                            <span>ES</span>
                        </button>
                        <button data-lang="it" data-flag="🇮🇹" class="mobile-language-option">
                            <span class="flag">🇮🇹</span>
                            <span>IT</span>
                        </button>
                        <button data-lang="si" data-flag="🇸🇮" class="mobile-language-option">
                            <span class="flag">🇸🇮</span>
                            <span>SI</span>
                        </button>
                    </div>
                </div>
                
                <div class="mobile-menu-divider"></div>
                
                <a href="/login" class="mobile-menu-link">Login</a>
                <a href="/registration" class="mobile-menu-link">Register</a>
                <a href="/setup-alerts" class="btn btn-primary mobile-cta">Get Started</a>
            </div>
        </div>
    </div>
</header>

<style>
    /* CSS Variables for Light/Dark Theme */
    :root {
        /* Light theme colors */
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
        /* Dark theme colors */
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

    /* Header Styles */
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: rgba(var(--background), 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgb(var(--border));
        z-index: 1000;
        padding: 1rem 0;
        transition: all 0.3s ease;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        position: relative;
    }

    .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: rgb(var(--foreground));
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .logo:hover {
        color: rgb(var(--primary));
    }

    .logo svg {
        color: rgb(var(--primary));
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 2rem;
        list-style: none;
    }

    .nav-links a {
        color: rgb(var(--muted-foreground));
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
        position: relative;
    }

    .nav-links a:hover {
        color: rgb(var(--primary));
    }

    .nav-links a::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: rgb(var(--primary));
        transition: width 0.3s ease;
    }

    .nav-links a:hover::after {
        width: 100%;
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    /* Language Selector */
    .language-selector {
        position: relative;
    }

    .language-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        background: rgb(var(--background));
        border: 1px solid rgb(var(--border));
        border-radius: 0.5rem;
        color: rgb(var(--foreground));
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .language-btn:hover {
        background: rgb(var(--muted));
        border-color: rgb(var(--primary));
    }

    .flag-icon {
        font-size: 1.2rem;
        line-height: 1;
    }

    .language-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5rem;
        background: rgb(var(--card));
        border: 1px solid rgb(var(--border));
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        min-width: 180px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        z-index: 1001;
        max-height: 300px;
        overflow-y: auto;
    }

    .dark .language-dropdown {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .language-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .language-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: rgb(var(--foreground));
        text-decoration: none;
        transition: background-color 0.2s ease;
        font-size: 0.875rem;
        border-radius: 0.5rem;
        margin: 0.25rem;
    }

    .language-option:hover {
        background: rgb(var(--muted));
    }

    .language-option.active {
        background: rgb(var(--primary) / 0.1);
        color: rgb(var(--primary));
        font-weight: 600;
    }

    .flag {
        font-size: 1.2rem;
        line-height: 1;
    }

    /* Theme Toggle */
    .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background: rgb(var(--background));
        border: 1px solid rgb(var(--border));
        border-radius: 50%;
        color: rgb(var(--foreground));
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .theme-toggle:hover {
        background: rgb(var(--muted));
        border-color: rgb(var(--primary));
        transform: scale(1.05);
    }

    /* User Menu */
    .user-menu {
        position: relative;
    }

    .user-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        background: rgb(var(--background));
        border: 1px solid rgb(var(--border));
        border-radius: 0.5rem;
        color: rgb(var(--foreground));
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
    }

    .user-btn:hover {
        background: rgb(var(--muted));
        border-color: rgb(var(--primary));
    }

    .user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5rem;
        background: rgb(var(--card));
        border: 1px solid rgb(var(--border));
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        min-width: 200px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        z-index: 1001;
    }

    .dark .user-dropdown {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .user-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .user-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: rgb(var(--foreground));
        text-decoration: none;
        transition: background-color 0.2s ease;
        font-size: 0.875rem;
        border-radius: 0.5rem;
        margin: 0.25rem;
    }

    .user-option:hover {
        background: rgb(var(--muted));
    }

    .dropdown-divider {
        height: 1px;
        background: rgb(var(--border));
        margin: 0.5rem 1rem;
    }

    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        color: rgb(var(--foreground));
        transition: color 0.2s ease;
    }

    .mobile-menu-btn:hover {
        color: rgb(var(--primary));
    }

    /* Mobile Menu */
    .mobile-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgb(var(--card));
        border: 1px solid rgb(var(--border));
        border-top: none;
        border-radius: 0 0 1rem 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }

    .dark .mobile-menu {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .mobile-menu-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .mobile-menu-link {
        color: rgb(var(--foreground));
        text-decoration: none;
        font-weight: 500;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgb(var(--border));
        transition: color 0.2s ease;
    }

    .mobile-menu-link:hover {
        color: rgb(var(--primary));
    }

    .mobile-menu-link:last-of-type {
        border-bottom: none;
    }

    .mobile-menu-divider {
        height: 1px;
        background: rgb(var(--border));
        margin: 0.5rem 0;
    }

    .mobile-section-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: rgb(var(--muted-foreground));
        margin-bottom: 0.75rem;
    }

    .mobile-language-section {
        padding: 0.5rem 0;
    }

    .mobile-language-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }

    .mobile-language-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.75rem 0.5rem;
        background: rgb(var(--background));
        border: 1px solid rgb(var(--border));
        border-radius: 0.5rem;
        color: rgb(var(--foreground));
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .mobile-language-option:hover {
        background: rgb(var(--muted));
        border-color: rgb(var(--primary));
    }

    .mobile-language-option.active {
        background: rgb(var(--primary) / 0.1);
        border-color: rgb(var(--primary));
        color: rgb(var(--primary));
        font-weight: 600;
    }

    .mobile-cta {
        margin-top: 1rem;
        text-align: center;
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
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }

    .btn-primary {
        background-color: rgb(var(--primary));
        color: rgb(var(--primary-foreground));
    }

    .btn-primary:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgb(var(--primary) / 0.3);
    }

    .btn-outline {
        background-color: transparent;
        color: rgb(var(--primary));
        border: 2px solid rgb(var(--primary));
    }

    .btn-outline:hover {
        background-color: rgb(var(--primary));
        color: rgb(var(--primary-foreground));
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }

        .mobile-menu-btn {
            display: block;
        }

        .nav-actions {
            gap: 0.5rem;
        }

        .nav-actions .btn-outline {
            display: none;
        }

        .btn {
            padding: 0.625rem 1.25rem;
            font-size: 0.875rem;
        }

        .language-btn, .user-btn {
            padding: 0.5rem;
        }

        .language-btn span:not(.flag-icon) {
            display: none;
        }

        .user-btn span {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .nav-actions .btn-primary {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
        }

        .mobile-language-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* Scrollbar Styling */
    .language-dropdown::-webkit-scrollbar {
        width: 6px;
    }

    .language-dropdown::-webkit-scrollbar-track {
        background: rgb(var(--muted));
        border-radius: 3px;
    }

    .language-dropdown::-webkit-scrollbar-thumb {
        background: rgb(var(--border));
        border-radius: 3px;
    }

    .language-dropdown::-webkit-scrollbar-thumb:hover {
        background: rgb(var(--primary));
    }

    /* Hidden class */
    .hidden {
        display: none;
    }
</style>

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

    // Language selector functionality
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLanguageSpan = document.getElementById('current-language');
    const currentFlag = document.getElementById('current-flag');

    // Desktop language selector
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
        languageBtn.setAttribute('aria-expanded', String(!isExpanded));
        languageDropdown.classList.toggle('show');
    });

    // Language selection for desktop
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.currentTarget.dataset.lang;
            const flag = e.currentTarget.dataset.flag;
            const langText = e.currentTarget.querySelector('span:last-child').textContent;
            
            // Update current language display
            currentLanguageSpan.textContent = langText;
            currentFlag.textContent = flag;
            
            // Update active state
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Store language preference
            localStorage.setItem('language', lang);
            
            // Close dropdown
            languageDropdown.classList.remove('show');
            languageBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Mobile language selector
    document.querySelectorAll('.mobile-language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            const flag = e.currentTarget.dataset.flag;
            
            // Find the corresponding desktop option to get the full language name
            const desktopOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
            const langText = desktopOption ? desktopOption.querySelector('span:last-child').textContent : lang.toUpperCase();
            
            // Update current language display
            currentLanguageSpan.textContent = langText;
            currentFlag.textContent = flag;
            
            // Update active state for both desktop and mobile
            document.querySelectorAll('.language-option, .mobile-language-option').forEach(opt => opt.classList.remove('active'));
            document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
            document.querySelector(`.mobile-language-option[data-lang="${lang}"]`).classList.add('active');
            
            // Store language preference
            localStorage.setItem('language', lang);
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // User menu functionality
    const userBtn = document.getElementById('user-btn');
    const userDropdown = document.getElementById('user-dropdown');

    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = userBtn.getAttribute('aria-expanded') === 'true';
        userBtn.setAttribute('aria-expanded', String(!isExpanded));
        userDropdown.classList.toggle('show');
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
        mobileMenu.classList.toggle('hidden');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
        languageBtn.setAttribute('aria-expanded', 'false');
        userDropdown.classList.remove('show');
        userBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = `rgba(var(--background), 0.98)`;
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = `rgba(var(--background), 0.95)`;
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedLanguageOption = document.querySelector(`[data-lang="${savedLanguage}"]`);
    const savedMobileLanguageOption = document.querySelector(`.mobile-language-option[data-lang="${savedLanguage}"]`);
    
    if (savedLanguageOption) {
        document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
        savedLanguageOption.classList.add('active');
        currentLanguageSpan.textContent = savedLanguageOption.querySelector('span:last-child').textContent;
        currentFlag.textContent = savedLanguageOption.dataset.flag;
    }
    
    if (savedMobileLanguageOption) {
        document.querySelectorAll('.mobile-language-option').forEach(opt => opt.classList.remove('active'));
        savedMobileLanguageOption.classList.add('active');
    }
</script>

##############

login.astro
##############

---
// Login page for Amiquus
const title = "Login - Amiquus";
const description = "Sign in to your Amiquus account to manage your car listing alerts and monitoring preferences.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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
            min-height: 100vh;
        }

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgb(var(--neutral-50)) 0%, rgb(var(--background)) 100%);
        }

        .dark .main-content {
            background: linear-gradient(135deg, rgb(var(--neutral-900)) 0%, rgb(var(--background)) 100%);
        }

        /* Login Card */
        .login-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2.5rem;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .dark .login-card {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .login-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .login-title {
            font-size: 1.875rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
        }

        .login-subtitle {
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        /* Form Styles */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 500;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            color: rgb(var(--foreground));
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
        }

        .form-input::placeholder {
            color: rgb(var(--muted-foreground));
        }

        /* Button Styles */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            font-size: 1rem;
            width: 100%;
            gap: 0.5rem;
        }

        .btn-primary {
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
        }

        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-outline {
            background: transparent;
            color: rgb(var(--foreground));
            border: 1px solid rgb(var(--border));
        }

        .btn-outline:hover {
            background: rgb(var(--muted));
            border-color: rgb(var(--primary));
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Google Button */
        .google-btn {
            background: #fff;
            color: #333;
            border: 1px solid #dadce0;
            margin-bottom: 1rem;
        }

        .google-btn:hover {
            background: #f8f9fa;
            border-color: #dadce0;
        }

        .dark .google-btn {
            background: rgb(var(--card));
            color: rgb(var(--foreground));
            border-color: rgb(var(--border));
        }

        .dark .google-btn:hover {
            background: rgb(var(--muted));
        }

        /* Divider */
        .divider {
            display: flex;
            align-items: center;
            margin: 1.5rem 0;
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: rgb(var(--border));
        }

        .divider span {
            padding: 0 1rem;
        }

        /* Links */
        .link {
            color: rgb(var(--primary));
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .link:hover {
            opacity: 0.8;
        }

        .forgot-password {
            text-align: right;
            margin-bottom: 1.5rem;
        }

        .forgot-password .link {
            font-size: 0.875rem;
        }

        .register-link {
            text-align: center;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgb(var(--border));
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        /* Loading State */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Error Message */
        .error-message {
            background: rgb(var(--destructive) / 0.1);
            border: 1px solid rgb(var(--destructive) / 0.3);
            color: rgb(var(--destructive));
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 1rem 3rem;
            }

            .login-card {
                padding: 2rem;
            }

            .login-title {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .login-card {
                padding: 1.5rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus,
        .form-input:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="login-card">
            <div class="login-header">
                <h1 class="login-title">Welcome Back</h1>
                <p class="login-subtitle">Sign in to your Amiquus account</p>
            </div>

            <!-- Error Message (hidden by default) -->
            <div id="error-message" class="error-message" style="display: none;"></div>

            <!-- Google Login -->
            <button id="google-login-btn" class="btn google-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
            </button>

            <div class="divider">
                <span>or continue with email</span>
            </div>

            <!-- Login Form -->
            <form id="login-form">
                <div class="form-group">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="your@email.com" required>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" class="form-input" placeholder="••••••••" required>
                </div>

                <div class="forgot-password">
                    <a href="/forgot-password" class="link">Forgot your password?</a>
                </div>

                <button type="submit" id="login-btn" class="btn btn-primary">
                    <span id="login-text">Sign In</span>
                    <span id="login-loading" class="loading" style="display: none;"></span>
                </button>
            </form>

            <div class="register-link">
                Don't have an account? <a href="/registration" class="link">Create one here</a>
            </div>
        </div>
    </main>

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

        // Form handling
        const loginForm = document.getElementById('login-form');
        const loginBtn = document.getElementById('login-btn');
        const loginText = document.getElementById('login-text');
        const loginLoading = document.getElementById('login-loading');
        const errorMessage = document.getElementById('error-message');
        const googleLoginBtn = document.getElementById('google-login-btn');

        // Show error message
        const showError = (message) => {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        };

        // Hide error message
        const hideError = () => {
            errorMessage.style.display = 'none';
        };

        // Set loading state
        const setLoading = (loading) => {
            if (loading) {
                loginBtn.disabled = true;
                loginText.style.display = 'none';
                loginLoading.style.display = 'inline-block';
            } else {
                loginBtn.disabled = false;
                loginText.style.display = 'inline';
                loginLoading.style.display = 'none';
            }
        };

        // Handle form submission
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideError();
            setLoading(true);

            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // For demo purposes, show success
                alert('Login successful! (This is a demo)');
                
                // In a real app, you would redirect to dashboard
                // window.location.href = '/dashboard';
                
            } catch (error) {
                showError('Invalid email or password. Please try again.');
            } finally {
                setLoading(false);
            }
        });

        // Handle Google login
        googleLoginBtn.addEventListener('click', () => {
            // In a real app, this would initiate Google OAuth
            alert('Google login would be initiated here (This is a demo)');
        });

        // Clear error on input
        document.getElementById('email').addEventListener('input', hideError);
        document.getElementById('password').addEventListener('input', hideError);
    </script>
</body>
</html>

##############

registration.astro
##############

---
// Registration page for Amiquus
const title = "Create Account - Amiquus";
const description = "Join Amiquus to start monitoring car listings and receive instant alerts for your perfect vehicles.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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
            min-height: 100vh;
        }

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgb(var(--neutral-50)) 0%, rgb(var(--background)) 100%);
        }

        .dark .main-content {
            background: linear-gradient(135deg, rgb(var(--neutral-900)) 0%, rgb(var(--background)) 100%);
        }

        /* Registration Card */
        .register-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2.5rem;
            width: 100%;
            max-width: 450px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .dark .register-card {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .register-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .register-title {
            font-size: 1.875rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
        }

        .register-subtitle {
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        /* Form Styles */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .form-label {
            display: block;
            font-weight: 500;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            color: rgb(var(--foreground));
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
        }

        .form-input::placeholder {
            color: rgb(var(--muted-foreground));
        }

        .form-input.error {
            border-color: rgb(var(--destructive));
        }

        /* Checkbox Styles */
        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .checkbox {
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid rgb(var(--border));
            border-radius: 0.25rem;
            background: rgb(var(--background));
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
            margin-top: 0.125rem;
        }

        .checkbox:checked {
            background: rgb(var(--primary));
            border-color: rgb(var(--primary));
        }

        .checkbox-label {
            font-size: 0.875rem;
            color: rgb(var(--muted-foreground));
            line-height: 1.5;
            cursor: pointer;
        }

        .checkbox-label a {
            color: rgb(var(--primary));
            text-decoration: none;
            font-weight: 500;
        }

        .checkbox-label a:hover {
            text-decoration: underline;
        }

        /* Button Styles */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            font-size: 1rem;
            width: 100%;
            gap: 0.5rem;
        }

        .btn-primary {
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
        }

        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-outline {
            background: transparent;
            color: rgb(var(--foreground));
            border: 1px solid rgb(var(--border));
        }

        .btn-outline:hover {
            background: rgb(var(--muted));
            border-color: rgb(var(--primary));
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Google Button */
        .google-btn {
            background: #fff;
            color: #333;
            border: 1px solid #dadce0;
            margin-bottom: 1rem;
        }

        .google-btn:hover {
            background: #f8f9fa;
            border-color: #dadce0;
        }

        .dark .google-btn {
            background: rgb(var(--card));
            color: rgb(var(--foreground));
            border-color: rgb(var(--border));
        }

        .dark .google-btn:hover {
            background: rgb(var(--muted));
        }

        /* Divider */
        .divider {
            display: flex;
            align-items: center;
            margin: 1.5rem 0;
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: rgb(var(--border));
        }

        .divider span {
            padding: 0 1rem;
        }

        /* Links */
        .link {
            color: rgb(var(--primary));
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .link:hover {
            opacity: 0.8;
        }

        .login-link {
            text-align: center;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgb(var(--border));
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        /* Loading State */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Error Message */
        .error-message {
            background: rgb(var(--destructive) / 0.1);
            border: 1px solid rgb(var(--destructive) / 0.3);
            color: rgb(var(--destructive));
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        .field-error {
            color: rgb(var(--destructive));
            font-size: 0.75rem;
            margin-top: 0.25rem;
        }

        /* Password Strength */
        .password-strength {
            margin-top: 0.5rem;
        }

        .strength-bar {
            height: 0.25rem;
            background: rgb(var(--border));
            border-radius: 0.125rem;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }

        .strength-fill {
            height: 100%;
            transition: all 0.3s ease;
            border-radius: 0.125rem;
        }

        .strength-weak { background: rgb(var(--destructive)); width: 25%; }
        .strength-fair { background: #f59e0b; width: 50%; }
        .strength-good { background: #10b981; width: 75%; }
        .strength-strong { background: rgb(var(--success)); width: 100%; }

        .strength-text {
            font-size: 0.75rem;
            color: rgb(var(--muted-foreground));
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 1rem 3rem;
            }

            .register-card {
                padding: 2rem;
            }

            .register-title {
                font-size: 1.5rem;
            }

            .form-row {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .register-card {
                padding: 1.5rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus,
        .form-input:focus,
        .checkbox:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="register-card">
            <div class="register-header">
                <h1 class="register-title">Create Your Account</h1>
                <p class="register-subtitle">Join Amiquus and never miss your perfect car deal</p>
            </div>

            <!-- Error Message (hidden by default) -->
            <div id="error-message" class="error-message" style="display: none;"></div>

            <!-- Google Registration -->
            <button id="google-register-btn" class="btn google-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
            </button>

            <div class="divider">
                <span>or create account with email</span>
            </div>

            <!-- Registration Form -->
            <form id="register-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" id="firstName" name="firstName" class="form-input" placeholder="John" required>
                        <div id="firstName-error" class="field-error" style="display: none;"></div>
                    </div>
                    <div class="form-group">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" id="lastName" name="lastName" class="form-input" placeholder="Doe" required>
                        <div id="lastName-error" class="field-error" style="display: none;"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="your@email.com" required>
                    <div id="email-error" class="field-error" style="display: none;"></div>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" class="form-input" placeholder="••••••••" required>
                    <div class="password-strength">
                        <div class="strength-bar">
                            <div id="strength-fill" class="strength-fill"></div>
                        </div>
                        <div id="strength-text" class="strength-text">Password strength</div>
                    </div>
                    <div id="password-error" class="field-error" style="display: none;"></div>
                </div>

                <div class="form-group">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" class="form-input" placeholder="••••••••" required>
                    <div id="confirmPassword-error" class="field-error" style="display: none;"></div>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="terms" name="terms" class="checkbox" required>
                    <label for="terms" class="checkbox-label">
                        I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                    </label>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="newsletter" name="newsletter" class="checkbox">
                    <label for="newsletter" class="checkbox-label">
                        I'd like to receive updates about new features and car market insights
                    </label>
                </div>

                <button type="submit" id="register-btn" class="btn btn-primary">
                    <span id="register-text">Create Account</span>
                    <span id="register-loading" class="loading" style="display: none;"></span>
                </button>
            </form>

            <div class="login-link">
                Already have an account? <a href="/login" class="link">Sign in here</a>
            </div>
        </div>
    </main>

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

        // Form elements
        const registerForm = document.getElementById('register-form');
        const registerBtn = document.getElementById('register-btn');
        const registerText = document.getElementById('register-text');
        const registerLoading = document.getElementById('register-loading');
        const errorMessage = document.getElementById('error-message');
        const googleRegisterBtn = document.getElementById('google-register-btn');

        // Form inputs
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');

        // Password strength elements
        const strengthFill = document.getElementById('strength-fill');
        const strengthText = document.getElementById('strength-text');

        // Show error message
        const showError = (message) => {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        };

        // Hide error message
        const hideError = () => {
            errorMessage.style.display = 'none';
        };

        // Show field error
        const showFieldError = (fieldName, message) => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            if (errorElement && inputElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                inputElement.classList.add('error');
            }
        };

        // Hide field error
        const hideFieldError = (fieldName) => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            if (errorElement && inputElement) {
                errorElement.style.display = 'none';
                inputElement.classList.remove('error');
            }
        };

        // Set loading state
        const setLoading = (loading) => {
            if (loading) {
                registerBtn.disabled = true;
                registerText.style.display = 'none';
                registerLoading.style.display = 'inline-block';
            } else {
                registerBtn.disabled = false;
                registerText.style.display = 'inline';
                registerLoading.style.display = 'none';
            }
        };

        // Password strength checker
        const checkPasswordStrength = (password) => {
            let strength = 0;
            let feedback = '';

            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            strengthFill.className = 'strength-fill';
            
            switch (strength) {
                case 0:
                case 1:
                    strengthFill.classList.add('strength-weak');
                    feedback = 'Weak password';
                    break;
                case 2:
                    strengthFill.classList.add('strength-fair');
                    feedback = 'Fair password';
                    break;
                case 3:
                case 4:
                    strengthFill.classList.add('strength-good');
                    feedback = 'Good password';
                    break;
                case 5:
                    strengthFill.classList.add('strength-strong');
                    feedback = 'Strong password';
                    break;
            }

            strengthText.textContent = feedback;
            return strength >= 3;
        };

        // Validate form
        const validateForm = () => {
            let isValid = true;

            // Clear previous errors
            ['firstName', 'lastName', 'email', 'password', 'confirmPassword'].forEach(hideFieldError);
            hideError();

            // Validate first name
            if (!firstName.value.trim()) {
                showFieldError('firstName', 'First name is required');
                isValid = false;
            }

            // Validate last name
            if (!lastName.value.trim()) {
                showFieldError('lastName', 'Last name is required');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showFieldError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate password
            if (!password.value) {
                showFieldError('password', 'Password is required');
                isValid = false;
            } else if (password.value.length < 8) {
                showFieldError('password', 'Password must be at least 8 characters');
                isValid = false;
            } else if (!checkPasswordStrength(password.value)) {
                showFieldError('password', 'Password is too weak');
                isValid = false;
            }

            // Validate confirm password
            if (!confirmPassword.value) {
                showFieldError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                showFieldError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            // Validate terms
            if (!terms.checked) {
                showError('You must agree to the Terms of Service and Privacy Policy');
                isValid = false;
            }

            return isValid;
        };

        // Handle form submission
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            setLoading(true);

            const formData = new FormData(registerForm);
            const userData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password'),
                newsletter: formData.get('newsletter') === 'on'
            };

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // For demo purposes, show success
                alert('Account created successfully! Please check your email to verify your account. (This is a demo)');
                
                // In a real app, you would redirect to verification page
                // window.location.href = '/verify-email';
                
            } catch (error) {
                showError('An error occurred while creating your account. Please try again.');
            } finally {
                setLoading(false);
            }
        });

        // Handle Google registration
        googleRegisterBtn.addEventListener('click', () => {
            // In a real app, this would initiate Google OAuth
            alert('Google registration would be initiated here (This is a demo)');
        });

        // Real-time validation
        firstName.addEventListener('input', () => hideFieldError('firstName'));
        lastName.addEventListener('input', () => hideFieldError('lastName'));
        email.addEventListener('input', () => hideFieldError('email'));
        
        password.addEventListener('input', () => {
            hideFieldError('password');
            checkPasswordStrength(password.value);
            if (confirmPassword.value) {
                hideFieldError('confirmPassword');
            }
        });

        confirmPassword.addEventListener('input', () => {
            hideFieldError('confirmPassword');
        });

        // Custom checkbox styling
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    this.style.background = `rgb(var(--primary))`;
                    this.style.borderColor = `rgb(var(--primary))`;
                    this.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                } else {
                    this.style.background = `rgb(var(--background))`;
                    this.style.borderColor = `rgb(var(--border))`;
                    this.innerHTML = '';
                }
            });
        });
    </script>
</body>
</html>

##############

setup-alerts.astro
##############

---
// Setup Alerts page for Amiquus
const title = "Set Up Your Car Alerts - Amiquus";
const description = "Configure your personalized car listing notifications. Select websites to monitor, set your car criteria, and get notified when your dream car is available.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
        }

        .content-wrapper {
            max-width: 800px;
            margin: 0 auto;
        }

        .page-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .page-title {
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .page-subtitle {
            font-size: 1.125rem;
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
        }

        /* Form Styles */
        .form-section {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .dark .form-section {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 1.5rem;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 500;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-input, .form-select {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            color: rgb(var(--foreground));
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
        }

        .form-input::placeholder {
            color: rgb(var(--muted-foreground));
        }

        /* Checkbox Styles */
        .checkbox-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .checkbox-item:hover {
            border-color: rgb(var(--primary));
            background: rgb(var(--muted));
        }

        .checkbox {
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid rgb(var(--border));
            border-radius: 0.25rem;
            background: rgb(var(--background));
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }

        .checkbox:checked {
            background: rgb(var(--primary));
            border-color: rgb(var(--primary));
        }

        .checkbox-label {
            font-size: 0.875rem;
            color: rgb(var(--foreground));
            cursor: pointer;
        }

        /* Radio Button Styles */
        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .radio-item {
            display: flex;
            align-items: center;
            justify-content: between;
            padding: 0.75rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .radio-item:hover {
            border-color: rgb(var(--primary));
            background: rgb(var(--muted));
        }

        .radio-item.selected {
            border-color: rgb(var(--primary));
            background: rgb(var(--primary) / 0.1);
        }

        .radio {
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid rgb(var(--border));
            border-radius: 50%;
            background: rgb(var(--background));
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
            margin-right: 0.75rem;
        }

        .radio:checked {
            background: rgb(var(--primary));
            border-color: rgb(var(--primary));
        }

        .radio-content {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .radio-label {
            font-size: 0.875rem;
            color: rgb(var(--foreground));
            cursor: pointer;
        }

        .radio-price {
            font-size: 0.875rem;
            color: rgb(var(--muted-foreground));
            font-weight: 500;
        }

        /* Button Styles */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
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
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Price Display */
        .price-section {
            background: rgb(var(--muted));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .price-breakdown {
            margin-bottom: 1.5rem;
        }

        .price-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgb(var(--border));
        }

        .price-item:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 1.125rem;
            color: rgb(var(--primary));
        }

        .price-label {
            color: rgb(var(--muted-foreground));
        }

        .price-value {
            color: rgb(var(--foreground));
            font-weight: 500;
        }

        /* Video Container */
        .video-container {
            margin-top: 1rem;
            border-radius: 0.5rem;
            overflow: hidden;
            background: rgb(var(--muted));
        }

        .video-container iframe {
            width: 100%;
            height: 315px;
            border: none;
        }

        /* Instructions */
        .instructions {
            background: rgb(var(--primary) / 0.1);
            border: 1px solid rgb(var(--primary) / 0.3);
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }

        .instructions h3 {
            color: rgb(var(--primary));
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .instructions ol {
            list-style: decimal;
            margin-left: 1.5rem;
            color: rgb(var(--foreground));
        }

        .instructions li {
            margin-bottom: 0.5rem;
        }

        /* Telegram Preview */
        .telegram-preview {
            background: rgb(var(--muted));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }

        .telegram-message {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .telegram-avatar {
            width: 2.5rem;
            height: 2.5rem;
            background: rgb(var(--primary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--primary-foreground));
            font-weight: 600;
            flex-shrink: 0;
        }

        .telegram-content {
            flex: 1;
        }

        .telegram-content h4 {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: rgb(var(--foreground));
        }

        .telegram-content p {
            font-size: 0.875rem;
            color: rgb(var(--muted-foreground));
            margin-bottom: 0.25rem;
        }

        /* Loading State */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 0 3rem;
            }

            .page-title {
                font-size: 2.5rem;
            }

            .form-section {
                padding: 1.5rem;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .checkbox-group {
                grid-template-columns: 1fr;
            }

            .video-container iframe {
                height: 200px;
            }
        }

        @media (max-width: 480px) {
            .page-title {
                font-size: 2rem;
            }

            .form-section {
                padding: 1rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus,
        .form-input:focus,
        .form-select:focus,
        .checkbox:focus,
        .radio:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        /* Hidden class */
        .hidden {
            display: none;
        }

        /* Error message */
        .error-message {
            background: rgb(var(--destructive) / 0.1);
            border: 1px solid rgb(var(--destructive) / 0.3);
            color: rgb(var(--destructive));
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <div class="content-wrapper">
                <!-- Page Header -->
                <div class="page-header">
                    <h1 class="page-title">Set Up Your Car Alerts</h1>
                    <p class="page-subtitle">Configure your personalized car listing notifications and start receiving instant alerts when your dream car becomes available.</p>
                </div>

                <!-- Error Message (hidden by default) -->
                <div id="error-message" class="error-message hidden"></div>

                <!-- Car Preferences Form -->
                <div class="form-section">
                    <h2 class="section-title">Car Preferences</h2>
                    <form id="setup-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="car-brand" class="form-label">Car Brand</label>
                                <select id="car-brand" name="carBrand" class="form-select" required>
                                    <option value="">Select Brand</option>
                                    <option value="audi">Audi</option>
                                    <option value="bmw">BMW</option>
                                    <option value="mercedes">Mercedes-Benz</option>
                                    <option value="volkswagen">Volkswagen</option>
                                    <option value="toyota">Toyota</option>
                                    <option value="honda">Honda</option>
                                    <option value="ford">Ford</option>
                                    <option value="chevrolet">Chevrolet</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="car-model" class="form-label">Car Model</label>
                                <select id="car-model" name="carModel" class="form-select" disabled>
                                    <option value="">Select Brand First</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-grid">
                            <div class="form-group">
                                <label for="price-min" class="form-label">Minimum Price (€)</label>
                                <input type="number" id="price-min" name="priceMin" class="form-input" placeholder="e.g., 5000" min="0">
                            </div>

                            <div class="form-group">
                                <label for="price-max" class="form-label">Maximum Price (€)</label>
                                <input type="number" id="price-max" name="priceMax" class="form-input" placeholder="e.g., 50000" min="0">
                            </div>
                        </div>

                        <div class="form-grid">
                            <div class="form-group">
                                <label for="year-min" class="form-label">Minimum Year</label>
                                <input type="number" id="year-min" name="yearMin" class="form-input" placeholder="e.g., 2015" min="1990" max="2024">
                            </div>

                            <div class="form-group">
                                <label for="year-max" class="form-label">Maximum Year</label>
                                <input type="number" id="year-max" name="yearMax" class="form-input" placeholder="e.g., 2023" min="1990" max="2024">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="max-km" class="form-label">Maximum Kilometers</label>
                            <input type="number" id="max-km" name="maxKm" class="form-input" placeholder="e.g., 100000" min="0">
                        </div>
                    </form>
                </div>

                <!-- Website Selection -->
                <div class="form-section">
                    <h2 class="section-title">Select Websites to Monitor</h2>
                    <p class="form-label">Choose which car listing websites you want us to monitor (€20/month per additional website):</p>
                    
                    <div class="checkbox-group">
                        <label class="checkbox-item">
                            <input type="checkbox" class="checkbox" name="websites" value="avto.net" checked>
                            <span class="checkbox-label">Avto.net (Included)</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" class="checkbox" name="websites" value="mobile.de">
                            <span class="checkbox-label">Mobile.de (+€20/month)</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" class="checkbox" name="websites" value="autoscout24">
                            <span class="checkbox-label">AutoScout24 (+€20/month)</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" class="checkbox" name="websites" value="facebook">
                            <span class="checkbox-label">Facebook Marketplace (+€20/month)</span>
                        </label>
                    </div>

                    <!-- Facebook Instructions (hidden by default) -->
                    <div id="facebook-instructions" class="instructions hidden">
                        <h3>How to get your Facebook Marketplace search link:</h3>
                        <ol>
                            <li>Go to Facebook Marketplace</li>
                            <li>Search for cars with your desired filters (location, price, etc.)</li>
                            <li>Copy the entire URL from your browser's address bar</li>
                            <li>Paste the URL in the field below</li>
                        </ol>
                        
                        <div class="form-group">
                            <label for="facebook-url" class="form-label">Facebook Marketplace Search URL</label>
                            <input type="url" id="facebook-url" name="facebookUrl" class="form-input" placeholder="https://www.facebook.com/marketplace/...">
                        </div>

                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/jNQXAC9IVRw" title="How to get Facebook Marketplace search link" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <!-- Scraping Frequency -->
                <div class="form-section">
                    <h2 class="section-title">Scraping Frequency</h2>
                    <p class="form-label">How often should we check for new listings?</p>
                    
                    <div class="radio-group">
                        <label class="radio-item selected">
                            <input type="radio" class="radio" name="frequency" value="1h" checked>
                            <div class="radio-content">
                                <span class="radio-label">Every 1 hour</span>
                                <span class="radio-price">Included</span>
                            </div>
                        </label>
                        <label class="radio-item">
                            <input type="radio" class="radio" name="frequency" value="30min">
                            <div class="radio-content">
                                <span class="radio-label">Every 30 minutes</span>
                                <span class="radio-price">+€5/month</span>
                            </div>
                        </label>
                        <label class="radio-item">
                            <input type="radio" class="radio" name="frequency" value="15min">
                            <div class="radio-content">
                                <span class="radio-label">Every 15 minutes</span>
                                <span class="radio-price">+€10/month</span>
                            </div>
                        </label>
                        <label class="radio-item">
                            <input type="radio" class="radio" name="frequency" value="5min">
                            <div class="radio-content">
                                <span class="radio-label">Every 5 minutes</span>
                                <span class="radio-price">+€15/month</span>
                            </div>
                        </label>
                        <label class="radio-item">
                            <input type="radio" class="radio" name="frequency" value="1min">
                            <div class="radio-content">
                                <span class="radio-label">Every 1 minute</span>
                                <span class="radio-price">+€20/month</span>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Telegram Setup -->
                <div class="form-section">
                    <h2 class="section-title">Telegram Notifications</h2>
                    
                    <div class="form-group">
                        <label for="telegram-username" class="form-label">Your Telegram Username</label>
                        <input type="text" id="telegram-username" name="telegramUsername" class="form-input" placeholder="@yourusername" required>
                    </div>

                    <div class="instructions">
                        <h3>Setup Instructions:</h3>
                        <ol>
                            <li>Send a simple "Hi!" message to our Telegram bot: <strong>@AmiquusBot</strong></li>
                            <li>This activates the connection between your account and our notification system</li>
                            <li>Confirm below that you've sent the message</li>
                        </ol>
                    </div>

                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" class="checkbox" id="telegram-confirmed" name="telegramConfirmed" required>
                            <span class="checkbox-label">I have sent a "Hi!" message to @AmiquusBot</span>
                        </label>
                    </div>

                    <!-- Telegram Preview -->
                    <div class="telegram-preview">
                        <h3 style="margin-bottom: 1rem; color: rgb(var(--foreground));">Preview of notifications you'll receive:</h3>
                        
                        <div class="telegram-message">
                            <div class="telegram-avatar">🚗</div>
                            <div class="telegram-content">
                                <h4>New Car Alert!</h4>
                                <p><strong>BMW 3 Series 2019</strong></p>
                                <p>Price: €32,500 | Mileage: 45,000 km</p>
                                <p>Location: Munich, Germany</p>
                                <p><a href="#" style="color: rgb(var(--primary));">View Listing →</a></p>
                            </div>
                        </div>

                        <div class="telegram-message">
                            <div class="telegram-avatar">💰</div>
                            <div class="telegram-content">
                                <h4>Price Drop Alert!</h4>
                                <p><strong>Audi A4 2020</strong></p>
                                <p>New Price: €26,500 (was €28,900)</p>
                                <p>Savings: €2,400</p>
                                <p><a href="#" style="color: rgb(var(--primary));">View Listing →</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Price Summary -->
                <div class="price-section">
                    <h2 class="section-title">Price Summary</h2>
                    
                    <div class="price-breakdown">
                        <div class="price-item">
                            <span class="price-label">Base plan (1 website)</span>
                            <span class="price-value">€70.00</span>
                        </div>
                        <div class="price-item" id="additional-websites">
                            <span class="price-label">Additional websites (0)</span>
                            <span class="price-value">€0.00</span>
                        </div>
                        <div class="price-item" id="frequency-cost">
                            <span class="price-label">Frequency upgrade</span>
                            <span class="price-value">€0.00</span>
                        </div>
                        <div class="price-item">
                            <span class="price-label"><strong>Total Monthly Cost</strong></span>
                            <span class="price-value" id="total-price"><strong>€70.00</strong></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" class="checkbox" id="terms-agreed" name="termsAgreed" required>
                            <span class="checkbox-label">I agree that this subscription means monthly recurring payments and I accept the <a href="/terms" style="color: rgb(var(--primary)); text-decoration: underline;">Terms of Service</a></span>
                        </label>
                    </div>

                    <button type="button" id="checkout-btn" class="btn btn-primary" style="width: 100%; padding: 1rem 2rem; font-size: 1.125rem;" disabled>
                        <span id="checkout-text">Proceed to Checkout</span>
                        <span id="checkout-loading" class="loading hidden" style="margin-left: 0.5rem;"></span>
                    </button>
                </div>
            </div>
        </div>
    </main>

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

        // Check authentication status
        const checkAuth = () => {
            // Simulate auth check - replace with actual auth logic
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                window.location.href = '/login';
                return false;
            }
            return true;
        };

        // Car models data
        const carModels = {
            audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
            bmw: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'i3', 'i4'],
            mercedes: ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS'],
            volkswagen: ['Golf', 'Polo', 'Passat', 'Tiguan', 'T-Cross', 'T-Roc', 'Touran', 'ID.3', 'ID.4'],
            toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius', 'Yaris', 'C-HR'],
            honda: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz', 'Pilot'],
            ford: ['Fiesta', 'Focus', 'Kuga', 'Mondeo', 'Mustang', 'Puma', 'Ranger'],
            chevrolet: ['Spark', 'Cruze', 'Malibu', 'Equinox', 'Tahoe', 'Silverado']
        };

        // Form elements
        const carBrandSelect = document.getElementById('car-brand');
        const carModelSelect = document.getElementById('car-model');
        const websiteCheckboxes = document.querySelectorAll('input[name="websites"]');
        const frequencyRadios = document.querySelectorAll('input[name="frequency"]');
        const facebookInstructions = document.getElementById('facebook-instructions');
        const telegramConfirmed = document.getElementById('telegram-confirmed');
        const termsAgreed = document.getElementById('terms-agreed');
        const checkoutBtn = document.getElementById('checkout-btn');
        const errorMessage = document.getElementById('error-message');

        // Price calculation
        const updatePrice = () => {
            const selectedWebsites = Array.from(websiteCheckboxes).filter(cb => cb.checked);
            const selectedFrequency = document.querySelector('input[name="frequency"]:checked');
            
            const basePrice = 70;
            const additionalWebsites = Math.max(0, selectedWebsites.length - 1);
            const additionalWebsiteCost = additionalWebsites * 20;
            
            const frequencyPrices = {
                '1h': 0,
                '30min': 5,
                '15min': 10,
                '5min': 15,
                '1min': 20
            };
            
            const frequencyCost = frequencyPrices[selectedFrequency?.value] || 0;
            const totalPrice = basePrice + additionalWebsiteCost + frequencyCost;
            
            // Update display
            document.getElementById('additional-websites').querySelector('.price-label').textContent = `Additional websites (${additionalWebsites})`;
            document.getElementById('additional-websites').querySelector('.price-value').textContent = `€${additionalWebsiteCost}.00`;
            document.getElementById('frequency-cost').querySelector('.price-value').textContent = `€${frequencyCost}.00`;
            document.getElementById('total-price').textContent = `€${totalPrice}.00`;
        };

        // Car brand/model handling
        carBrandSelect.addEventListener('change', (e) => {
            const brand = e.target.value;
            carModelSelect.innerHTML = '<option value="">Select Model</option>';
            
            if (brand && carModels[brand]) {
                carModelSelect.disabled = false;
                carModels[brand].forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = model;
                    carModelSelect.appendChild(option);
                });
            } else {
                carModelSelect.disabled = true;
            }
        });

        // Website selection handling
        websiteCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.value === 'facebook') {
                    if (e.target.checked) {
                        facebookInstructions.classList.remove('hidden');
                    } else {
                        facebookInstructions.classList.add('hidden');
                    }
                }
                updatePrice();
                updateCheckoutButton();
            });
        });

        // Frequency selection handling
        frequencyRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                // Update visual selection
                document.querySelectorAll('.radio-item').forEach(item => {
                    item.classList.remove('selected');
                });
                radio.closest('.radio-item').classList.add('selected');
                
                updatePrice();
            });
        });

        // Form validation
        const updateCheckoutButton = () => {
            const selectedWebsites = Array.from(websiteCheckboxes).filter(cb => cb.checked);
            const telegramConfirmedChecked = telegramConfirmed.checked;
            const termsAgreedChecked = termsAgreed.checked;
            const telegramUsername = document.getElementById('telegram-username').value.trim();
            
            const isValid = selectedWebsites.length > 0 && 
                           telegramUsername && 
                           telegramConfirmedChecked && 
                           termsAgreedChecked;
            
            checkoutBtn.disabled = !isValid;
        };

        // Event listeners for validation
        telegramConfirmed.addEventListener('change', updateCheckoutButton);
        termsAgreed.addEventListener('change', updateCheckoutButton);
        document.getElementById('telegram-username').addEventListener('input', updateCheckoutButton);

        // Checkout button handling
        checkoutBtn.addEventListener('click', () => {
            if (checkoutBtn.disabled) return;
            
            // Show loading state
            document.getElementById('checkout-text').textContent = 'Processing...';
            document.getElementById('checkout-loading').classList.remove('hidden');
            checkoutBtn.disabled = true;
            
            // Collect form data
            const formData = {
                carBrand: carBrandSelect.value,
                carModel: carModelSelect.value,
                priceMin: document.getElementById('price-min').value,
                priceMax: document.getElementById('price-max').value,
                yearMin: document.getElementById('year-min').value,
                yearMax: document.getElementById('year-max').value,
                maxKm: document.getElementById('max-km').value,
                websites: Array.from(websiteCheckboxes).filter(cb => cb.checked).map(cb => cb.value),
                facebookUrl: document.getElementById('facebook-url')?.value,
                frequency: document.querySelector('input[name="frequency"]:checked').value,
                telegramUsername: document.getElementById('telegram-username').value,
                totalPrice: document.getElementById('total-price').textContent
            };
            
            // Store form data for checkout page
            localStorage.setItem('setupFormData', JSON.stringify(formData));
            
            // Simulate processing delay
            setTimeout(() => {
                window.location.href = '/checkout';
            }, 1500);
        });

        // Show error message
        const showError = (message) => {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Hide error message
        const hideError = () => {
            errorMessage.classList.add('hidden');
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Check authentication
            if (!checkAuth()) return;
            
            // Initialize price calculation
            updatePrice();
            updateCheckoutButton();
            
            // Hide error message on form interaction
            document.getElementById('setup-form').addEventListener('input', hideError);
        });
    </script>
</body>
</html>

##############

thank-you.astro
##############

---
// Thank You page for Amiquus
const title = "Thank You - Amiquus";
const description = "Thank you for your purchase! Your car alert subscription is now active.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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
            min-height: 100vh;
        }

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgb(var(--neutral-50)) 0%, rgb(var(--background)) 100%);
        }

        .dark .main-content {
            background: linear-gradient(135deg, rgb(var(--neutral-900)) 0%, rgb(var(--background)) 100%);
        }

        /* Success Card */
        .success-card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1.5rem;
            padding: 3rem;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .dark .success-card {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Success Icon */
        .success-icon {
            width: 5rem;
            height: 5rem;
            background: rgb(var(--success));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: rgb(var(--success-foreground));
            animation: successPulse 2s ease-in-out infinite;
        }

        @keyframes successPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Typography */
        .success-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .success-subtitle {
            font-size: 1.25rem;
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
        }

        .personal-message {
            font-size: 1.125rem;
            color: rgb(var(--foreground));
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgb(var(--muted));
            border-radius: 1rem;
            border-left: 4px solid rgb(var(--primary));
        }

        /* Order Details */
        .order-details {
            background: rgb(var(--muted));
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem 0;
            text-align: left;
        }

        .order-details h3 {
            color: rgb(var(--foreground));
            font-weight: 600;
            margin-bottom: 1rem;
            text-align: center;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgb(var(--border));
        }

        .detail-row:last-child {
            border-bottom: none;
            font-weight: 600;
            color: rgb(var(--primary));
        }

        .detail-label {
            color: rgb(var(--muted-foreground));
        }

        .detail-value {
            color: rgb(var(--foreground));
            font-weight: 500;
        }

        /* Next Steps */
        .next-steps {
            background: rgb(var(--primary) / 0.1);
            border: 1px solid rgb(var(--primary) / 0.3);
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem 0;
            text-align: left;
        }

        .next-steps h3 {
            color: rgb(var(--primary));
            font-weight: 600;
            margin-bottom: 1rem;
            text-align: center;
        }

        .next-steps ul {
            list-style: none;
            padding: 0;
        }

        .next-steps li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.75rem;
            color: rgb(var(--foreground));
        }

        .next-steps li:last-child {
            margin-bottom: 0;
        }

        .step-icon {
            width: 1.5rem;
            height: 1.5rem;
            background: rgb(var(--primary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--primary-foreground));
            font-weight: 600;
            font-size: 0.75rem;
            margin-right: 0.75rem;
            flex-shrink: 0;
            margin-top: 0.125rem;
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.875rem 2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            font-size: 1.125rem;
            gap: 0.5rem;
        }

        .btn-primary {
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
        }

        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(var(--primary), 0.3);
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

        .button-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }

        /* Confetti Animation */
        .confetti {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        }

        .confetti-piece {
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgb(var(--primary));
            animation: confettiFall 3s ease-out infinite;
        }

        .confetti-piece:nth-child(2n) {
            background: rgb(var(--success));
            animation-delay: 0.5s;
        }

        .confetti-piece:nth-child(3n) {
            background: rgb(var(--accent));
            animation-delay: 1s;
        }

        .confetti-piece:nth-child(4n) {
            width: 6px;
            height: 6px;
            animation-delay: 1.5s;
        }

        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 1rem 3rem;
            }

            .success-card {
                padding: 2rem;
            }

            .success-title {
                font-size: 2rem;
            }

            .success-subtitle {
                font-size: 1.125rem;
            }

            .personal-message {
                font-size: 1rem;
                padding: 1rem;
            }

            .button-group {
                flex-direction: column;
                align-items: center;
            }

            .btn {
                width: 100%;
                max-width: 300px;
            }
        }

        @media (max-width: 480px) {
            .success-card {
                padding: 1.5rem;
            }

            .success-title {
                font-size: 1.75rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        /* Loading animation for when page loads */
        .success-card {
            animation: slideInUp 0.8s ease-out;
        }

        @keyframes slideInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="success-card">
            <!-- Confetti Animation -->
            <div class="confetti" id="confetti-container"></div>

            <!-- Success Icon -->
            <div class="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
            </div>

            <!-- Success Message -->
            <h1 class="success-title">Thank You!</h1>
            <p class="success-subtitle">Your car alert subscription is now active</p>

            <!-- Personal Message -->
            <div class="personal-message" id="personal-message">
                <p><strong>Welcome to Amiquus!</strong></p>
                <p>You'll start receiving instant notifications when cars matching your criteria are listed. We're excited to help you find your perfect vehicle!</p>
            </div>

            <!-- Order Details -->
            <div class="order-details">
                <h3>Order Summary</h3>
                <div class="detail-row">
                    <span class="detail-label">Order Number</span>
                    <span class="detail-value" id="order-number">#AMQ-2024-001</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span class="detail-value" id="order-date">January 15, 2024</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Subscription</span>
                    <span class="detail-value">Car Alert Service</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: rgb(var(--success));">Active</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Paid</span>
                    <span class="detail-value" id="total-amount">$9.99</span>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
                <h3>What happens next?</h3>
                <ul>
                    <li>
                        <div class="step-icon">1</div>
                        <span>Your Telegram bot will be activated within the next few minutes</span>
                    </li>
                    <li>
                        <div class="step-icon">2</div>
                        <span>You'll receive a confirmation message on Telegram</span>
                    </li>
                    <li>
                        <div class="step-icon">3</div>
                        <span>Start getting instant alerts when matching cars are listed</span>
                    </li>
                    <li>
                        <div class="step-icon">4</div>
                        <span>Manage your alerts anytime from your profile dashboard</span>
                    </li>
                </ul>
            </div>

            <!-- Action Buttons -->
            <div class="button-group">
                <a href="/user-profile" class="btn btn-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Go to Profile
                </a>
                <a href="/" class="btn btn-outline">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    Back to Home
                </a>
            </div>
        </div>
    </main>

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

        // Check authentication and load user data
        const checkAuth = () => {
            // Simulate auth check - replace with actual auth logic
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            
            if (isLoggedIn && userData.firstName) {
                // Personalize the message
                const personalMessage = document.getElementById('personal-message');
                personalMessage.innerHTML = `
                    <p><strong>Welcome to Amiquus, ${userData.firstName}!</strong></p>
                    <p>You'll start receiving instant notifications when cars matching your criteria are listed. We're excited to help you find your perfect vehicle!</p>
                `;
            }
        };

        // Load order data from localStorage
        const loadOrderData = () => {
            const orderData = JSON.parse(localStorage.getItem('orderData') || '{}');
            const paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
            
            if (orderData.orderNumber) {
                document.getElementById('order-number').textContent = orderData.orderNumber;
            }
            
            if (orderData.date) {
                document.getElementById('order-date').textContent = new Date(orderData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
            
            if (paymentData.amount) {
                document.getElementById('total-amount').textContent = `$${paymentData.amount}`;
            }
        };

        // Create confetti animation
        const createConfetti = () => {
            const confettiContainer = document.getElementById('confetti-container');
            const colors = ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(255, 255, 0)'];
            
            for (let i = 0; i < 50; i++) {
                const confettiPiece = document.createElement('div');
                confettiPiece.className = 'confetti-piece';
                confettiPiece.style.left = Math.random() * 100 + '%';
                confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confettiPiece.style.animationDelay = Math.random() * 3 + 's';
                confettiPiece.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confettiContainer.appendChild(confettiPiece);
            }

            // Remove confetti after animation
            setTimeout(() => {
                confettiContainer.innerHTML = '';
            }, 5000);
        };

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            checkAuth();
            loadOrderData();
            
            // Start confetti animation after a short delay
            setTimeout(createConfetti, 500);
            
            // Clean up localStorage data that's no longer needed
            setTimeout(() => {
                localStorage.removeItem('setupFormData');
                localStorage.removeItem('checkoutData');
            }, 1000);
        });

        // Generate random order number if not exists
        if (!localStorage.getItem('orderData')) {
            const orderNumber = '#AMQ-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const orderData = {
                orderNumber: orderNumber,
                date: new Date().toISOString()
            };
            localStorage.setItem('orderData', JSON.stringify(orderData));
        }
    </script>
</body>
</html>

##############

user-profile.astro
##############

---
// User Profile Dashboard for Amiquus
const title = "User Profile - Amiquus";
const description = "Manage your Amiquus account, car alert subscriptions, and payment methods.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            /* Dark theme colors */
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

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
            background: rgb(var(--neutral-50));
        }

        .dark .main-content {
            background: rgb(var(--neutral-900));
        }

        /* Profile Layout */
        .profile-layout {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Sidebar */
        .sidebar {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            height: fit-content;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .dark .sidebar {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .avatar {
            width: 4rem;
            height: 4rem;
            background: rgb(var(--primary) / 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--primary));
        }

        .user-details h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 0.25rem;
        }

        .user-details p {
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        .user-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-item {
            text-align: center;
            padding: 1rem;
            background: rgb(var(--muted));
            border-radius: 0.5rem;
        }

        .stat-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: rgb(var(--primary));
            margin-bottom: 0.25rem;
        }

        .stat-label {
            font-size: 0.75rem;
            color: rgb(var(--muted-foreground));
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .sidebar-menu {
            list-style: none;
        }

        .sidebar-menu li {
            margin-bottom: 0.5rem;
        }

        .sidebar-menu button {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            background: transparent;
            border: 1px solid transparent;
            border-radius: 0.5rem;
            color: rgb(var(--muted-foreground));
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }

        .sidebar-menu button:hover,
        .sidebar-menu button.active {
            background: rgb(var(--primary) / 0.1);
            border-color: rgb(var(--primary) / 0.3);
            color: rgb(var(--primary));
        }

        .sidebar-menu button.danger {
            color: rgb(var(--destructive));
        }

        .sidebar-menu button.danger:hover {
            background: rgb(var(--destructive) / 0.1);
            border-color: rgb(var(--destructive) / 0.3);
        }

        /* Main Panel */
        .main-panel {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .dark .main-panel {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* Tabs */
        .tabs {
            display: flex;
            border-bottom: 1px solid rgb(var(--border));
        }

        .tab-button {
            flex: 1;
            padding: 1rem 1.5rem;
            background: transparent;
            border: none;
            color: rgb(var(--muted-foreground));
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 2px solid transparent;
        }

        .tab-button:hover {
            background: rgb(var(--muted));
            color: rgb(var(--foreground));
        }

        .tab-button.active {
            color: rgb(var(--primary));
            border-bottom-color: rgb(var(--primary));
            background: rgb(var(--primary) / 0.05);
        }

        /* Tab Content */
        .tab-content {
            padding: 2rem;
        }

        .tab-panel {
            display: none;
        }

        .tab-panel.active {
            display: block;
        }

        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 1.5rem;
        }

        .section-description {
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
        }

        /* Cards */
        .card {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            transition: all 0.2s ease;
        }

        .card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-color: rgb(var(--primary) / 0.3);
        }

        .dark .card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .card-header {
            display: flex;
            justify-content: between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .card-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 0.25rem;
        }

        .card-subtitle {
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .badge.success {
            background: rgb(var(--success) / 0.1);
            color: rgb(var(--success));
            border: 1px solid rgb(var(--success) / 0.3);
        }

        .badge.warning {
            background: rgb(255 193 7 / 0.1);
            color: rgb(255 193 7);
            border: 1px solid rgb(255 193 7 / 0.3);
        }

        .badge.danger {
            background: rgb(var(--destructive) / 0.1);
            color: rgb(var(--destructive));
            border: 1px solid rgb(var(--destructive) / 0.3);
        }

        /* Form Elements */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 500;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            color: rgb(var(--foreground));
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
        }

        .form-input::placeholder {
            color: rgb(var(--muted-foreground));
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            font-size: 0.875rem;
        }

        .btn-primary {
            background: rgb(var(--primary));
            color: rgb(var(--primary-foreground));
        }

        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-outline {
            background: transparent;
            color: rgb(var(--foreground));
            border: 1px solid rgb(var(--border));
        }

        .btn-outline:hover {
            background: rgb(var(--muted));
            border-color: rgb(var(--primary));
        }

        .btn-danger {
            background: rgb(var(--destructive));
            color: rgb(var(--destructive-foreground));
        }

        .btn-danger:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
        }

        /* Grid Layouts */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

        /* Payment Method Cards */
        .payment-method {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            transition: all 0.2s ease;
        }

        .payment-method:hover {
            border-color: rgb(var(--primary) / 0.5);
            background: rgb(var(--primary) / 0.02);
        }

        .payment-method.default {
            border-color: rgb(var(--primary));
            background: rgb(var(--primary) / 0.05);
        }

        .payment-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .card-icon {
            width: 2.5rem;
            height: 2.5rem;
            background: rgb(var(--muted));
            border-radius: 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--muted-foreground));
        }

        .payment-details h4 {
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 0.25rem;
        }

        .payment-details p {
            color: rgb(var(--muted-foreground));
            font-size: 0.875rem;
        }

        .payment-actions {
            display: flex;
            gap: 0.5rem;
        }

        /* Modal Styles */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: rgb(var(--card));
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }

        .modal.active .modal-content {
            transform: scale(1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: rgb(var(--foreground));
        }

        .modal-close {
            background: none;
            border: none;
            color: rgb(var(--muted-foreground));
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
        }

        .modal-close:hover {
            background: rgb(var(--muted));
            color: rgb(var(--foreground));
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 1rem 3rem;
            }

            .profile-layout {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .sidebar {
                padding: 1.5rem;
            }

            .tab-content {
                padding: 1.5rem;
            }

            .user-stats {
                grid-template-columns: 1fr;
            }

            .grid-2,
            .grid-3 {
                grid-template-columns: 1fr;
            }

            .payment-method {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }

            .payment-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }

        @media (max-width: 480px) {
            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }

            .modal-content {
                padding: 1.5rem;
            }

            .tabs {
                flex-direction: column;
            }

            .tab-button {
                text-align: left;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus,
        .form-input:focus,
        .tab-button:focus,
        .sidebar-menu button:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        /* Loading States */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Success/Error Messages */
        .alert {
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        .alert.success {
            background: rgb(var(--success) / 0.1);
            border: 1px solid rgb(var(--success) / 0.3);
            color: rgb(var(--success));
        }

        .alert.error {
            background: rgb(var(--destructive) / 0.1);
            border: 1px solid rgb(var(--destructive) / 0.3);
            color: rgb(var(--destructive));
        }

        /* Empty States */
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: rgb(var(--muted-foreground));
        }

        .empty-state svg {
            width: 4rem;
            height: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }

        .empty-state h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
        }

        .empty-state p {
            margin-bottom: 1.5rem;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <div class="profile-layout">
                <!-- Sidebar -->
                <div class="sidebar">
                    <div class="user-info">
                        <div class="avatar">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <div class="user-details">
                            <h2>John Doe</h2>
                            <p>john.doe@example.com</p>
                        </div>
                    </div>

                    <div class="user-stats">
                        <div class="stat-item">
                            <div class="stat-number">3</div>
                            <div class="stat-label">Active Alerts</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">2</div>
                            <div class="stat-label">Payment Methods</div>
                        </div>
                    </div>

                    <ul class="sidebar-menu">
                        <li>
                            <button class="sidebar-btn active" data-tab="subscriptions">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                </svg>
                                My Alerts
                            </button>
                        </li>
                        <li>
                            <button class="sidebar-btn" data-tab="payment">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                    <line x1="1" y1="10" x2="23" y2="10"/>
                                </svg>
                                Payment Methods
                            </button>
                        </li>
                        <li>
                            <button class="sidebar-btn" data-modal="account-settings">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                </svg>
                                Account Settings
                            </button>
                        </li>
                        <li>
                            <button class="sidebar-btn" data-modal="security-settings">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                Privacy & Security
                            </button>
                        </li>
                        <li>
                            <button class="sidebar-btn danger" data-modal="logout-confirm">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16,17 21,12 16,7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Main Panel -->
                <div class="main-panel">
                    <div class="tabs">
                        <button class="tab-button active" data-tab="subscriptions">My Car Alerts</button>
                        <button class="tab-button" data-tab="payment">Payment Methods</button>
                    </div>

                    <div class="tab-content">
                        <!-- Subscriptions Tab -->
                        <div id="subscriptions-tab" class="tab-panel active">
                            <div class="section-title">Car Alert Subscriptions</div>
                            <p class="section-description">Manage your car search alerts and notification preferences.</p>

                            <!-- Subscription Cards -->
                            <div class="card">
                                <div class="card-header">
                                    <div>
                                        <div class="card-title">BMW 3 Series 2019-2022</div>
                                        <div class="card-subtitle">Price: $25,000 - $45,000 • Years: 2019-2022</div>
                                    </div>
                                    <span class="badge success">Active</span>
                                </div>
                                <div class="grid-2">
                                    <div>
                                        <strong>Websites:</strong> AutoTrader, CarGurus, Facebook
                                    </div>
                                    <div>
                                        <strong>Updates:</strong> Every hour
                                    </div>
                                    <div>
                                        <strong>Language:</strong> English
                                    </div>
                                    <div>
                                        <strong>Price:</strong> $19.97/month
                                    </div>
                                </div>
                                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                                    <button class="btn btn-outline btn-sm" data-modal="edit-subscription">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                        Edit
                                    </button>
                                    <button class="btn btn-danger btn-sm" data-modal="cancel-subscription">
                                        Cancel Alert
                                    </button>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <div>
                                        <div class="card-title">Tesla Model 3 2020-2024</div>
                                        <div class="card-subtitle">Price: $30,000 - $55,000 • Years: 2020-2024</div>
                                    </div>
                                    <span class="badge warning">Paused</span>
                                </div>
                                <div class="grid-2">
                                    <div>
                                        <strong>Websites:</strong> AutoTrader, Cars.com
                                    </div>
                                    <div>
                                        <strong>Updates:</strong> Every 30 minutes
                                    </div>
                                    <div>
                                        <strong>Language:</strong> English
                                    </div>
                                    <div>
                                        <strong>Price:</strong> $14.99/month
                                    </div>
                                </div>
                                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                                    <button class="btn btn-primary btn-sm">Resume</button>
                                    <button class="btn btn-outline btn-sm" data-modal="edit-subscription">Edit</button>
                                    <button class="btn btn-danger btn-sm" data-modal="cancel-subscription">Cancel</button>
                                </div>
                            </div>

                            <div style="text-align: center; margin-top: 2rem;">
                                <button class="btn btn-primary">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" y1="8" x2="12" y2="16"/>
                                        <line x1="8" y1="12" x2="16" y2="12"/>
                                    </svg>
                                    Add New Car Alert
                                </button>
                            </div>
                        </div>

                        <!-- Payment Methods Tab -->
                        <div id="payment-tab" class="tab-panel">
                            <div class="section-title">Payment Methods</div>
                            <p class="section-description">Manage your payment methods for subscription billing.</p>

                            <!-- Payment Method Cards -->
                            <div class="payment-method default">
                                <div class="payment-info">
                                    <div class="card-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                            <line x1="1" y1="10" x2="23" y2="10"/>
                                        </svg>
                                    </div>
                                    <div class="payment-details">
                                        <h4>•••• 4242 <span class="badge success">Default</span></h4>
                                        <p>Expires 12/2024 • Visa</p>
                                    </div>
                                </div>
                                <div class="payment-actions">
                                    <button class="btn btn-outline btn-sm">Edit</button>
                                    <button class="btn btn-danger btn-sm">Remove</button>
                                </div>
                            </div>

                            <div class="payment-method">
                                <div class="payment-info">
                                    <div class="card-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                            <line x1="1" y1="10" x2="23" y2="10"/>
                                        </svg>
                                    </div>
                                    <div class="payment-details">
                                        <h4>•••• 9876</h4>
                                        <p>Expires 03/2025 • Mastercard</p>
                                    </div>
                                </div>
                                <div class="payment-actions">
                                    <button class="btn btn-outline btn-sm">Set Default</button>
                                    <button class="btn btn-outline btn-sm">Edit</button>
                                    <button class="btn btn-danger btn-sm">Remove</button>
                                </div>
                            </div>

                            <div style="text-align: center; margin-top: 2rem;">
                                <button class="btn btn-primary" data-modal="add-payment-method">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" y1="8" x2="12" y2="16"/>
                                        <line x1="8" y1="12" x2="16" y2="12"/>
                                    </svg>
                                    Add Payment Method
                                </button>
                            </div>

                            <div class="alert success" style="margin-top: 2rem;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; margin-right: 0.5rem;">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                Your payment information is encrypted and securely stored.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Modals -->
    <!-- Account Settings Modal -->
    <div id="account-settings-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Account Settings</h3>
                <button class="modal-close" data-close-modal="account-settings-modal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" value="John Doe">
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" value="john.doe@example.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-input" value="johndoe">
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" class="btn btn-outline" data-close-modal="account-settings-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Security Settings Modal -->
    <div id="security-settings-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Privacy & Security</h3>
                <button class="modal-close" data-close-modal="security-settings-modal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-label">Current Password</label>
                    <input type="password" class="form-input" placeholder="Enter current password">
                </div>
                <div class="form-group">
                    <label class="form-label">New Password</label>
                    <input type="password" class="form-input" placeholder="Enter new password">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm New Password</label>
                    <input type="password" class="form-input" placeholder="Confirm new password">
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" class="btn btn-outline" data-close-modal="security-settings-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Update Password</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Add Payment Method Modal -->
    <div id="add-payment-method-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Add Payment Method</h3>
                <button class="modal-close" data-close-modal="add-payment-method-modal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-label">Name on Card</label>
                    <input type="text" class="form-input" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label class="form-label">Card Number</label>
                    <input type="text" class="form-input" placeholder="4242 4242 4242 4242">
                </div>
                <div class="grid-2">
                    <div class="form-group">
                        <label class="form-label">Expiry Date</label>
                        <input type="text" class="form-input" placeholder="MM/YY">
                    </div>
                    <div class="form-group">
                        <label class="form-label">CVC</label>
                        <input type="text" class="form-input" placeholder="123">
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" class="btn btn-outline" data-close-modal="add-payment-method-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Card</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div id="logout-confirm-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Confirm Logout</h3>
                <button class="modal-close" data-close-modal="logout-confirm-modal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <p style="margin-bottom: 2rem; color: rgb(var(--muted-foreground));">
                Are you sure you want to log out of your account?
            </p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn btn-outline" data-close-modal="logout-confirm-modal">Cancel</button>
                <button type="button" class="btn btn-danger" onclick="handleLogout()">Log Out</button>
            </div>
        </div>
    </div>

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

        // Tab functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        const sidebarButtons = document.querySelectorAll('.sidebar-btn');

        function switchTab(tabId) {
            // Update tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('active');
                }
            });

            // Update tab panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${tabId}-tab`) {
                    panel.classList.add('active');
                }
            });

            // Update sidebar buttons
            sidebarButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('active');
                }
            });
        }

        // Tab button event listeners
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                switchTab(tabId);
            });
        });

        // Sidebar button event listeners
        sidebarButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.dataset.tab) {
                    switchTab(button.dataset.tab);
                } else if (button.dataset.modal) {
                    openModal(button.dataset.modal);
                }
            });
        });

        // Modal functionality
        function openModal(modalId) {
            const modal = document.getElementById(`${modalId}-modal`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(`${modalId}-modal`);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Modal event listeners
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                openModal(trigger.dataset.modal);
            });
        });

        document.querySelectorAll('[data-close-modal]').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                closeModal(closeBtn.dataset.closeModal);
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        });

        // Form handling
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get the submit button
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span class="loading"></span> Processing...`;
                
                // Simulate API call
                setTimeout(() => {
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Close modal if form is in a modal
                    const modal = form.closest('.modal');
                    if (modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Show success message (you can customize this)
                    alert('Changes saved successfully! (This is a demo)');
                }, 1500);
            });
        });

        // Logout functionality
        function handleLogout() {
            // Simulate logout process
            alert('Logged out successfully! (This is a demo)');
            closeModal('logout-confirm');
            // In a real app, you would redirect to login page
            // window.location.href = '/login';
        }

        // Demo data updates
        function updateStats() {
            // This would normally fetch real data from your API
            const stats = document.querySelectorAll('.stat-number');
            stats[0].textContent = Math.floor(Math.random() * 5) + 1; // Active alerts
            stats[1].textContent = Math.floor(Math.random() * 3) + 1; // Payment methods
        }

        // Update stats every 30 seconds for demo purposes
        setInterval(updateStats, 30000);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>

##############

waiting-list.astro
##############

---
// Waiting List page for Amiquus
const title = "Join Our Waiting List - Amiquus";
const description = "Join our waiting list to be notified when new subscription slots become available for our car listing monitoring service.";

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
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Variables for Light/Dark Theme */
        :root {
            /* Light theme colors */
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
            
            /* Warning */
            --warning: 245 158 11;
            --warning-foreground: 255 255 255;
            
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
            /* Dark theme colors */
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
            
            /* Warning */
            --warning: 245 158 11;
            --warning-foreground: 255 255 255;
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

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .theme-toggle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .theme-toggle:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Utility Classes */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Main Content */
        .main-content {
            padding: 8rem 0 4rem;
            min-height: 100vh;
            background: linear-gradient(135deg, rgb(var(--neutral-50)) 0%, rgb(var(--background)) 100%);
        }

        .dark .main-content {
            background: linear-gradient(135deg, rgb(var(--neutral-900)) 0%, rgb(var(--background)) 100%);
        }

        .content-wrapper {
            max-width: 800px;
            margin: 0 auto;
        }

        .page-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .page-title {
            font-size: 3rem;
            font-weight: 700;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .page-subtitle {
            font-size: 1.125rem;
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
        }

        /* Capacity Indicator */
        .capacity-section {
            background: rgb(var(--card));
            border: 2px solid rgb(var(--destructive));
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 3rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .dark .capacity-section {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .capacity-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .capacity-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: rgb(var(--destructive));
            margin-bottom: 0.5rem;
        }

        .capacity-description {
            color: rgb(var(--muted-foreground));
            margin-bottom: 1.5rem;
        }

        .capacity-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .stat-item {
            color: rgb(var(--destructive));
        }

        /* Progress Bar */
        .progress-container {
            width: 100%;
            height: 1rem;
            background: rgb(var(--neutral-200));
            border-radius: 0.5rem;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .dark .progress-container {
            background: rgb(var(--neutral-700));
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, rgb(var(--destructive)), rgb(var(--warning)));
            border-radius: 0.5rem;
            transition: width 0.8s ease-in-out;
            position: relative;
        }

        .progress-bar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .capacity-message {
            text-align: center;
            font-weight: 500;
            color: rgb(var(--destructive));
            font-size: 0.875rem;
        }

        /* Waiting List Form */
        .waitlist-form {
            background: rgb(var(--card));
            border: 1px solid rgb(var(--border));
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .dark .waitlist-form {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .form-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--foreground));
            margin-bottom: 1rem;
        }

        .form-description {
            color: rgb(var(--muted-foreground));
            margin-bottom: 2rem;
        }

        /* Form Styles */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 500;
            color: rgb(var(--foreground));
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgb(var(--border));
            border-radius: 0.5rem;
            background: rgb(var(--background));
            color: rgb(var(--foreground));
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: rgb(var(--primary));
            box-shadow: 0 0 0 3px rgb(var(--primary) / 0.1);
        }

        .form-input::placeholder {
            color: rgb(var(--muted-foreground));
        }

        .form-input.error {
            border-color: rgb(var(--destructive));
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        /* Button Styles */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
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
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Success State */
        .success-message {
            background: rgb(var(--success) / 0.1);
            border: 1px solid rgb(var(--success) / 0.3);
            color: rgb(var(--success));
            padding: 1.5rem;
            border-radius: 1rem;
            text-align: center;
            margin-bottom: 2rem;
        }

        .success-icon {
            width: 3rem;
            height: 3rem;
            background: rgb(var(--success));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: rgb(var(--success-foreground));
        }

        /* Error Message */
        .error-message {
            background: rgb(var(--destructive) / 0.1);
            border: 1px solid rgb(var(--destructive) / 0.3);
            color: rgb(var(--destructive));
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        .field-error {
            color: rgb(var(--destructive));
            font-size: 0.75rem;
            margin-top: 0.25rem;
        }

        /* Loading State */
        .loading {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Benefits Section */
        .benefits-section {
            background: rgb(var(--primary) / 0.1);
            border: 1px solid rgb(var(--primary) / 0.3);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }

        .benefits-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: rgb(var(--primary));
            margin-bottom: 1rem;
        }

        .benefits-list {
            list-style: none;
            padding: 0;
        }

        .benefits-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            color: rgb(var(--foreground));
            font-size: 0.875rem;
        }

        .benefits-list li:last-child {
            margin-bottom: 0;
        }

        .check-icon {
            width: 1.25rem;
            height: 1.25rem;
            background: rgb(var(--success));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(var(--success-foreground));
            flex-shrink: 0;
            margin-top: 0.125rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .main-content {
                padding: 6rem 0 3rem;
            }

            .page-title {
                font-size: 2.5rem;
            }

            .capacity-section, .waitlist-form {
                padding: 1.5rem;
            }

            .form-row {
                grid-template-columns: 1fr;
            }

            .capacity-stats {
                flex-direction: column;
                gap: 0.5rem;
                text-align: center;
            }
        }

        @media (max-width: 480px) {
            .page-title {
                font-size: 2rem;
            }

            .capacity-section, .waitlist-form {
                padding: 1rem;
            }

            .theme-toggle {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        /* Scroll behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        .theme-toggle:focus,
        .btn:focus,
        .form-input:focus {
            outline: 2px solid rgb(var(--primary));
            outline-offset: 2px;
        }

        /* Dark mode specific adjustments */
        .dark {
            color-scheme: dark;
        }

        /* Hidden class */
        .hidden {
            display: none;
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

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <div class="content-wrapper">
                <!-- Page Header -->
                <div class="page-header">
                    <h1 class="page-title">Join Our Waiting List</h1>
                    <p class="page-subtitle">We're currently at full capacity, but we'll notify you as soon as a spot becomes available</p>
                </div>

                <!-- Capacity Indicator -->
                <div class="capacity-section">
                    <div class="capacity-header">
                        <h2 class="capacity-title">⚠️ Limited Capacity Reached</h2>
                        <p class="capacity-description">
                            We intentionally limit our service to 30 active subscribers to maintain the competitive advantage for our users. 
                            Currently, all spots are taken, but we'll notify you immediately when space becomes available.
                        </p>
                    </div>

                    <div class="capacity-stats">
                        <span class="stat-item"><strong>30</strong> active subscribers</span>
                        <span class="stat-item"><strong>0</strong> spots available</span>
                    </div>

                    <div class="progress-container">
                        <div class="progress-bar" id="capacity-progress" style="width: 100%;"></div>
                    </div>

                    <p class="capacity-message">
                        <strong>100% Full</strong> - Join our waiting list to be notified when capacity opens up
                    </p>
                </div>

                <!-- Benefits Section -->
                <div class="benefits-section">
                    <h3 class="benefits-title">Why Join Our Waiting List?</h3>
                    <ul class="benefits-list">
                        <li>
                            <div class="check-icon">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <path d="M9 12l2 2 4-4"/>
                                </svg>
                            </div>
                            <span>Get priority access when new spots become available</span>
                        </li>
                        <li>
                            <div class="check-icon">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <path d="M9 12l2 2 4-4"/>
                                </svg>
                            </div>
                            <span>Receive instant email notifications when capacity opens</span>
                        </li>
                        <li>
                            <div class="check-icon">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <path d="M9 12l2 2 4-4"/>
                                </svg>
                            </div>
                            <span>No commitment - join the list for free</span>
                        </li>
                        <li>
                            <div class="check-icon">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <path d="M9 12l2 2 4-4"/>
                                </svg>
                            </div>
                            <span>Maintain competitive advantage with limited user base</span>
                        </li>
                    </ul>
                </div>

                <!-- Success Message (hidden by default) -->
                <div id="success-message" class="success-message hidden">
                    <div class="success-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <path d="M9 12l2 2 4-4"/>
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">You're on the list!</h3>
                    <p>Thank you for joining our waiting list. We'll notify you via email as soon as a subscription spot becomes available.</p>
                </div>

                <!-- Waiting List Form -->
                <div id="waitlist-form-container" class="waitlist-form">
                    <h2 class="form-title">Join the Waiting List</h2>
                    <p class="form-description">
                        Enter your details below and we'll notify you immediately when a subscription spot becomes available.
                    </p>

                    <!-- Error Message (hidden by default) -->
                    <div id="error-message" class="error-message hidden"></div>

                    <form id="waitlist-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="first-name" class="form-label">First Name</label>
                                <input type="text" id="first-name" name="firstName" class="form-input" placeholder="John" required>
                                <div id="first-name-error" class="field-error hidden"></div>
                            </div>

                            <div class="form-group">
                                <label for="last-name" class="form-label">Last Name</label>
                                <input type="text" id="last-name" name="lastName" class="form-input" placeholder="Doe" required>
                                <div id="last-name-error" class="field-error hidden"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" id="email" name="email" class="form-input" placeholder="john@example.com" required>
                            <div id="email-error" class="field-error hidden"></div>
                        </div>

                        <div class="form-group">
                            <label for="phone" class="form-label">Phone Number (Optional)</label>
                            <input type="tel" id="phone" name="phone" class="form-input" placeholder="+1 (555) 123-4567">
                            <div id="phone-error" class="field-error hidden"></div>
                        </div>

                        <div class="form-group">
                            <label for="interest" class="form-label">What type of cars are you interested in? (Optional)</label>
                            <input type="text" id="interest" name="interest" class="form-input" placeholder="e.g., BMW 3 Series, Mercedes C-Class">
                        </div>

                        <button type="submit" id="submit-btn" class="btn btn-primary" style="width: 100%; padding: 1rem 2rem; font-size: 1.125rem;">
                            <span id="submit-text">Join Waiting List</span>
                            <span id="submit-loading" class="loading hidden" style="margin-left: 0.5rem;"></span>
                        </button>

                        <p style="text-align: center; font-size: 0.875rem; color: rgb(var(--muted-foreground)); margin-top: 1rem;">
                            We'll only contact you when a subscription spot becomes available. No spam, ever.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </main>

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

        // Form elements
        const waitlistForm = document.getElementById('waitlist-form');
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');
        const formContainer = document.getElementById('waitlist-form-container');

        // Form inputs
        const firstNameInput = document.getElementById('first-name');
        const lastNameInput = document.getElementById('last-name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const interestInput = document.getElementById('interest');

        // Show error message
        const showError = (message) => {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
        };

        // Hide error message
        const hideError = () => {
            errorMessage.classList.add('hidden');
        };

        // Show field error
        const showFieldError = (fieldName, message) => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            if (errorElement && inputElement) {
                errorElement.textContent = message;
                errorElement.classList.remove('hidden');
                inputElement.classList.add('error');
            }
        };

        // Hide field error
        const hideFieldError = (fieldName) => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            if (errorElement && inputElement) {
                errorElement.classList.add('hidden');
                inputElement.classList.remove('error');
            }
        };

        // Set loading state
        const setLoading = (loading) => {
            if (loading) {
                submitBtn.disabled = true;
                submitText.textContent = 'Joining...';
                submitLoading.classList.remove('hidden');
            } else {
                submitBtn.disabled = false;
                submitText.textContent = 'Join Waiting List';
                submitLoading.classList.add('hidden');
            }
        };

        // Validate form
        const validateForm = () => {
            let isValid = true;

            // Clear previous errors
            ['first-name', 'last-name', 'email', 'phone'].forEach(hideFieldError);
            hideError();

            // Validate first name
            if (!firstNameInput.value.trim()) {
                showFieldError('first-name', 'First name is required');
                isValid = false;
            }

            // Validate last name
            if (!lastNameInput.value.trim()) {
                showFieldError('last-name', 'Last name is required');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showFieldError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone (optional, but if provided should be valid)
            if (phoneInput.value.trim()) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(phoneInput.value.replace(/[\s\-\(\)]/g, ''))) {
                    showFieldError('phone', 'Please enter a valid phone number');
                    isValid = false;
                }
            }

            return isValid;
        };

        // Handle form submission
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            setLoading(true);

            const formData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                interest: interestInput.value.trim(),
                timestamp: new Date().toISOString()
            };

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Store in localStorage for demo purposes
                const existingWaitlist = JSON.parse(localStorage.getItem('waitlistEntries') || '[]');
                existingWaitlist.push(formData);
                localStorage.setItem('waitlistEntries', JSON.stringify(existingWaitlist));
                
                // Show success message
                formContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } catch (error) {
                showError('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        });

        // Real-time validation
        firstNameInput.addEventListener('input', () => hideFieldError('first-name'));
        lastNameInput.addEventListener('input', () => hideFieldError('last-name'));
        emailInput.addEventListener('input', () => hideFieldError('email'));
        phoneInput.addEventListener('input', () => hideFieldError('phone'));

        // Clear error messages on input
        waitlistForm.addEventListener('input', hideError);

        // Animate progress bar on load
        document.addEventListener('DOMContentLoaded', () => {
            const progressBar = document.getElementById('capacity-progress');
            if (progressBar) {
                // Start from 0 and animate to 100%
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, 500);
            }
        });

        // Add some dynamic capacity simulation (for demo purposes)
        const simulateCapacityChanges = () => {
            // This would normally come from your API
            const capacityData = {
                total: 30,
                active: 30,
                available: 0
            };

            // Update stats if they change
            const statsElements = document.querySelectorAll('.stat-item');
            if (statsElements.length >= 2) {
                statsElements[0].innerHTML = `<strong>${capacityData.active}</strong> active subscribers`;
                statsElements[1].innerHTML = `<strong>${capacityData.available}</strong> spots available`;
            }

            // Update progress bar
            const progressBar = document.getElementById('capacity-progress');
            if (progressBar) {
                const percentage = (capacityData.active / capacityData.total) * 100;
                progressBar.style.width = `${percentage}%`;
            }

            // Update capacity message
            const capacityMessage = document.querySelector('.capacity-message');
            if (capacityMessage) {
                if (capacityData.available === 0) {
                    capacityMessage.innerHTML = '<strong>100% Full</strong> - Join our waiting list to be notified when capacity opens up';
                } else {
                    capacityMessage.innerHTML = `<strong>${capacityData.available} spots available</strong> - Subscribe now before they're gone!`;
                }
            }
        };

        // Check capacity every 30 seconds (in a real app, this would be less frequent)
        setInterval(simulateCapacityChanges, 30000);
    </script>
</body>
</html>

##############