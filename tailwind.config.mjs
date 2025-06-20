/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'signal-yellow': '#FFD700',
        'signal-red': '#FF4136',
        'signal-green': '#BCEF2F',
        'signal-dark': '#111827',
        'signal-light': '#F9FAFB',
        'signal-gray': '#6B7280',
      },
      fontFamily: {
        // Defines the `font-sans` utility. Other fonts are handled in a global CSS file.
        sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'marquee': 'marquee 25s linear infinite',
        'marquee2': 'marquee2 25s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideIn: { '0%': { transform: 'translateX(-20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } },
        marquee2: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0%)' } },
      },
    },
  },
  plugins: [
    // The custom font plugin is no longer needed.
  ],
};