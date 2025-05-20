I want you to restructure the header.astro file a bit to load the content from the headerfooter.json. As you can see I will load data for the entire site from a few .json files that I will place in src/data. Please rewrite header.astro accordingly to load the data from the headerfooter.json. Sometimes .json data will be an overkill, that's why you can ignore all other languages and only keep the ones that are currently in the header.astro. Also note that for the logo, I want you to remove the current logo text with this image:
public/EUSIGNAL-SVG File_Horizontal-Light.svg and apply this alt text string:       "HEADER_LOGO_ALT": "EUSIGNAL Logotip",

i think it's a bit more complicated than that... Shouldn't we define my json files as Astro Content Collections? Read astro-content-collections.md for reference. My data in json files will be fixed (will not change dynamically, unless I upload a new revised json file or make changes inside .json file myself manually). That's why I don't need fancy validation rules - as simple as it could get.

so just to check if you understand clearly - every text that is seen by the user or by the search engine (meta descriptions, alt image textxt, etc.) has to be taken from my .json files. Each of these .json files is used for content somewhere. author.json will be used to build author pages, headerfooter.json data will be used for header and footer data, etc. Sometimes, a certain layout type (for example Homepage) will need several .json files at the same time, calling some data from home.json, some from common.json, some from products.json... Each of these json files will always be a simple array of object json file.
│  ├─ data/
│  │  ├─ author.json
│  │  ├─ AuthorList.json
│  │  ├─ common.json
│  │  ├─ eeat.json
│  │  ├─ headerfooter.json
│  │  ├─ home.json
│  │  └─ WWW_info.json
(note that the full lsit of data is not there, some datasets are missing (articles.json, product.json, etc.) and I need to add them!
</a>