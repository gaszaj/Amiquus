Master folders in /pages directory so narejeni samodejno ob npm run build. Pogoj, da so narejeni je, da obstaja locale.json vrednost:
"M_LOCALE_PUBLISH_Y_N": "1",
Prav tako morajo biti v common.json ustrezni prevodi za PAGE_CATEGORY_1, PAGE_CATEGORY_2, etc.

To run scripts, run these commands in the terminal:
node src/scripts/OG_ALL.mjs (for ALL OG images)
node src/scripts/OG_home.mjs (for homepage OG images)
node src/scripts/OG_eeat.mjs (for EEAT OG images)
node src/scripts/OG_article.mjs (for article OG images)
node src/scripts/OG_author.mjs (for author OG images)
node src/scripts/OG_product.mjs (for product OG images)
node src/scripts/OG_category.mjs (for category OG images)
