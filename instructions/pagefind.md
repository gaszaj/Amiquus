Title: Pagefind | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/

Markdown Content:
Pagefind is a fully static search library that aims to perform well on large sites, while using as little of your users’ bandwidth as possible, and without hosting any infrastructure.

Pagefind runs after Hugo, Eleventy, Jekyll, Next, Astro, SvelteKit, or **any other website framework**. The installation process is always the same: Pagefind only requires a folder containing the built static files of your website, so in most cases no configuration is needed to get started.

After indexing, Pagefind adds a static search bundle to your built files, which exposes a JavaScript search API that can be used anywhere on your site. Pagefind also provides a prebuilt UI that can be used with no configuration. (You can see the prebuilt UI at the top of this page.)

The goal of Pagefind is that websites with tens of thousands of pages should be searchable by someone in their browser, while consuming as little bandwidth as possible. Pagefind’s search index is split into chunks, so that searching in the browser only ever needs to load a small subset of the search index. Pagefind can run a full-text search on a 10,000 page site with a total network payload under 300kB, including the Pagefind library itself. For most sites, this will be closer to 100kB.

[#](https://pagefind.app/#features "Link to Features")Features
--------------------------------------------------------------

*   Zero-config support for multilingual websites
*   Rich filtering engine for knowledge bases
*   Custom sort attributes
*   Custom metadata tracking
*   Custom content weighting
*   Return results for sections of a page
*   Search across multiple domains
*   Index **anything** (e.g. PDFs, JSON files, or subtitles) with the NodeJS indexing library
*   All features available with the same low-bandwidth footprint

Title: Getting Started with Pagefind | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs

Markdown Content:
Pagefind runs after your static generator, and outputs a static search bundle to your generated site. With Pagefind, you don’t need to build a search index by hand —the index is generated for you from your generated site.

Since Pagefind indexes your site _after_ it builds, we’ll do things slightly out of order and add a search UI first — so that it already exists on our built site when we go to index it.

Pagefind provides a prebuilt search UI out of the box. Add the following snippet to a page of your choice:

```
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({ element: "#search", showSubResults: true });
    });
</script>
```

> The `/pagefind/pagefind-ui.css` and `/pagefind/pagefind-ui.js` assets will be created by Pagefind when we index the site.

Now build your site to an output directory — this guide assumes that you’re running `hugo` and that your site is output to the `public/` directory. Pagefind works with any set of static HTML files, so adjust these configurations as needed.

> If you’re running a development server (i.e. `hugo serve`) you won’t see anything yet, as Pagefind needs to index the _output_ of your build. Let’s do that now.

[#](https://pagefind.app/docs#indexing-your-site "Link to Indexing your site")Indexing your site
------------------------------------------------------------------------------------------------

The easiest way to run Pagefind is through one of the official wrapper packages. If you don’t have Node or Python installed, or want to install Pagefind another way, see the [Installing Pagefind](https://pagefind.app/docs/installation/) guide.

To use the Node wrapper, run the following command from your terminal, where `--site` points to the output directory of your static site generator. We’ll also add `--serve` so that we can view our final site right away.

```
npx -y pagefind --site public --serve
```

Using the Python wrapper is similar, but requires an initial install:

```
python3 -m pip install 'pagefind[extended]'
python3 -m pagefind --site public --serve
```

Regardless of the command you choose, after Pagefind has downloaded you should see some output along the lines of:

```
Indexed 2496 pages
Indexed 22852 words
Indexed 0 filters
Created 27 index chunks
Finished in 2.357 seconds
```

We can see that a bunch of content was indexed, and Pagefind will be running a preview server (likely on [:1414](http://localhost:1414/)).

> Note that Pagefind itself does not have any server component — the search integration is fully baked into your static site. The `--serve` flag here is a shortcut for running Pagefind, followed by serving your output site through any static web server.

Loading this in your browser, you should see a search input on your page. Try searching for some content and you will see results appear from your site.

The last required step is to run Pagefind after building your site on your CMS or hosting platform. If you’re a CloudCannon user, add a [`.cloudcannon/postbuild`](https://cloudcannon.com/documentation/articles/extending-your-build-process-with-hooks/) file containing the npx command above (minus the `--serve` flag). For other platforms, set up an equivalent command to run after your site build — the end goal is that Pagefind will run after every build of your site before it is deployed.

For many use cases, you can stop here and mark it as complete. Or, you can dive deeper into Pagefind and configure it to your liking — check out [Configuring the index](https://pagefind.app/docs/indexing/) for some next steps.

[#](https://pagefind.app/docs#notes "Link to Notes")Notes
---------------------------------------------------------

> For optimal performance, ensure the `lang` attribute is set on your `html` element. See [Multilingual Search](https://pagefind.app/docs/multilingual) for more details.


Title: Running Pagefind | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/running-pagefind/

Markdown Content:
Running Pagefind | Pagefind — Static low-bandwidth search at scale
===============

✨ Pagefind is now 1.0! Read the [release notes](https://github.com/CloudCannon/pagefind/releases/tag/v1.0.0), and view the [migration guide](https://pagefind.app/docs/v1-migration/).

Close

[![Image 1: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind.svg?_cchid=212a0a2f35c4372e7a6772034c8fc101)![Image 2: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind-dark.svg?_cchid=ae54989551225001de6aea546b7bc090)](https://pagefind.app/)[**✎**Edit Navigation](cloudcannon:collections/data/nav.yml)

*   [v1.3.0 ![Image 3: Pagefind — Static low-bandwidth search at scale on GitHub](https://pagefind.app/github.svg?_cchid=07883e93734b98cae0f7b9c55d287250)](https://github.com/cloudcannon/pagefind)

Docs Menu

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

 Docs Expand all

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

Running Pagefind
================

Pagefind usually runs after your static site generator, ingesting your static HTML files and creating a static search index.

[#](https://pagefind.app/docs/running-pagefind/#running-the-pagefind-cli "Link to Running the Pagefind CLI")Running the Pagefind CLI
------------------------------------------------------------------------------------------------------------------------------------

Most use-cases are covered by using the Pagefind CLI, either directly or through Pagefind’s npx wrapper library.

For help installing the Pagefind CLI, see [Installing Pagefind](https://pagefind.app/docs/installation/). These docs assume you’re running via npx — if that isn’t the case, just replace `npx pagefind` with the path to your binary.

The minimal command for Pagefind to index a site is:

```bash
npx pagefind --site public
```

The `--site` flag here should point to a directory of static HTML files. For example, the static site generator Hugo builds files into a `public` directory by default, so that should be Pagefind’s `site` directory.

After running this command, you will see that Pagefind has added a directory at `public/pagefind`. This is your search bundle, and contains Pagefind’s browser dependencies as well as the index files required to search your site.

Next steps:

*   Most of Pagefind’s indexing configuration happens inline in your HTML, [Configuring your index](https://pagefind.app/docs/indexing/) covers the important tags.
*   If you prefer using config files or environment variables over CLI flags, this is possible too. See the [configuration sources](https://pagefind.app/docs/config-sources/) reference for more.
*   To see all available options when running the CLI, see the [configuration options](https://pagefind.app/docs/config-options/) reference.

[#](https://pagefind.app/docs/running-pagefind/#running-the-nodejs-indexing-api "Link to Running the NodeJS indexing API")Running the NodeJS indexing API
---------------------------------------------------------------------------------------------------------------------------------------------------------

Pagefind also exposes a NodeJS interface that can be used to programmatically build an index. Using this, you can index non-static websites, or even non-HTML content altogether. The NodeJS library can also be used to integrate Pagefind into developer tooling for static websites.

You can find all of the details for this library on the [Indexing content using the NodeJS API](https://pagefind.app/docs/node-api/) page.

[**✎**Edit Footer](cloudcannon:collections/data/footer.yml)[![Image 4: cloudcannon](https://pagefind.app/cloudcannon.svg?_cchid=fc604f8624ad01b53363910976c1c525)](https://cloudcannon.com/)


https://pagefind.app/docs/indexing/

Title: Configuring what content is indexed | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/indexing/

Markdown Content:
You can control what content on your site is indexed via `data-pagefind-*` tags on your HTML elements.

[#](https://pagefind.app/docs/indexing/#limiting-what-sections-of-a-page-are-indexed "Link to Limiting what sections of a page are indexed")Limiting what sections of a page are indexed
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

By default, Pagefind starts indexing from your `<body>` element.

To narrow this down, you can tag your main content area with `data-pagefind-body`:

```
<body>
    <main data-pagefind-body>
        <h1>Condimentum Nullam</h1>
        <p>Nullam id dolor id nibh ultricies.</p>
    </main>
    <aside>
        This content will not be indexed.
    </aside>
</body>
```

If `data-pagefind-body` is found anywhere on your site, any pages without this attribute will not be indexed. This means that if you tag your blog post layout with `data-pagefind-body`, other pages like your homepage will no longer appear in search results. This is usually what you want —if not, just add `data-pagefind-body` there as well.

Multiple `data-pagefind-body` elements may exist on a page, and their content will be combined.

> Note that metadata and filters that are set outside of this element will still be used. If this is not what you want, see the [root selector](https://pagefind.app/docs/config-options/#root-selector) CLI configuration option.

[#](https://pagefind.app/docs/indexing/#removing-pages-from-pagefinds-index "Link to Removing pages from Pagefind’s index")Removing pages from Pagefind’s index
---------------------------------------------------------------------------------------------------------------------------------------------------------------

Once a `data-pagefind-body` attribute exists on any page of your site, any pages without this attribute will not be indexed. As such, the best way to remove pages is by adding `data-pagefind-body` to the pages you **would** like to index.

If this isn’t possible, see the [Pagefind CLI’s glob option](https://pagefind.app/docs/config-options/#glob) to limit the files that Pagefind reads.

[#](https://pagefind.app/docs/indexing/#removing-individual-elements-from-the-index "Link to Removing individual elements from the index")Removing individual elements from the index
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Pagefind has built-in elements that are not indexed. These are organizational elements such as `<nav>` and `<footer>`, or more programmatic elements such as `<script>` and `<form>`. These elements will be skipped over automatically.

If you have further elements that you don’t want to include in your search index, you can tag them with `data-pagefind-ignore`:

```
<main data-pagefind-body>
    <h1>This content will be in your search index.</h1>
    <aside data-pagefind-ignore>
        This content will not be indexed.
    </aside>
    <p>This content will also be in your search index.</p>
</main>
```

The `data-pagefind-ignore` attribute can optionally take a value of `index` or `all`. The default is `index`, which will exclude the element and all children from the search index while still processing filters and metadata within the element, and will still try to detect a default title or image found within this element.

Specifying `all` will exclude the element and its children from all processing.

```
<aside data-pagefind-ignore>
    <h1>This might still be detected as the page title</h1>
    <p data-pagefind-meta="a">This metadata will still appear in search results.</p>
</aside>

<aside data-pagefind-ignore="all">
    <h1>This cannot be detected as the page title</h1>
    <p data-pagefind-meta="b">This metadata will not be picked up.</p>
</aside>
```

> To remove elements without changing your templating, see the [Pagefind CLI’s exclude selectors option](https://pagefind.app/docs/config-options/#exclude-selectors).

[#](https://pagefind.app/docs/indexing/#adding-html-attributes-to-the-index "Link to Adding HTML attributes to the index")Adding HTML attributes to the index
-------------------------------------------------------------------------------------------------------------------------------------------------------------

Attributes of HTML elements can be added to the search index with the `data-pagefind-index-attrs` attribute:

```
<h1>Condimentum Nullam</h1>
<img src="/hero.png"
     title="Image Title"
     alt="Image Alt"
     data-pagefind-index-attrs="title,alt" />
<p>Nullam id dolor id nibh ultricies.</p>
```

This attribute takes a comma-separated list of other attributes to include inline with the indexed content.

 The above example will be indexed as: `Condimentum Nullam. Image Title. Image Alt. Nullam id dolor id nibh ultricies.`

Title: Weighting sections of the page higher or lower | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/weighting/

Markdown Content:
Weighting sections of the page higher or lower | Pagefind — Static low-bandwidth search at scale
===============

✨ Pagefind is now 1.0! Read the [release notes](https://github.com/CloudCannon/pagefind/releases/tag/v1.0.0), and view the [migration guide](https://pagefind.app/docs/v1-migration/).

Close

[![Image 1: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind.svg?_cchid=212a0a2f35c4372e7a6772034c8fc101)![Image 2: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind-dark.svg?_cchid=ae54989551225001de6aea546b7bc090)](https://pagefind.app/)[**✎**Edit Navigation](cloudcannon:collections/data/nav.yml)

*   [v1.3.0 ![Image 3: Pagefind — Static low-bandwidth search at scale on GitHub](https://pagefind.app/github.svg?_cchid=07883e93734b98cae0f7b9c55d287250)](https://github.com/cloudcannon/pagefind)

Docs Menu

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

 Docs Expand all

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

Weighting sections of the page higher or lower
==============================================

Content in Pagefind’s index can be ranked higher or lower. These weights will be taken into account when Pagefind ranks your search results, and will also be used when generating excerpts of your content to preview.

[#](https://pagefind.app/docs/weighting/#default-rankings "Link to Default rankings")Default rankings
-----------------------------------------------------------------------------------------------------

Pagefind will boost the `h1` through `h6` tags above any other content on the page. By default, content is ranked as:

| Element | Ranking |
| --- | --- |
| `h1` | 7.0 |
| `h2` | 6.0 |
| `h3` | 5.0 |
| `h4` | 4.0 |
| `h5` | 3.0 |
| `h6` | 2.0 |
| All other elements | 1.0 |

[#](https://pagefind.app/docs/weighting/#ranking-content-higher-or-lower "Link to Ranking content higher or lower")Ranking content higher or lower
--------------------------------------------------------------------------------------------------------------------------------------------------

You can specify your own ranking via the `data-pagefind-weight` attribute:

```html
<body>
    <p data-pagefind-weight="2">
        The main description text of the page.
        If the search term matches this section,
        this page will be boosted higher in the
        result ranking.
    </p>
    <p>
        Other, less important text.
        This defaults to a weight of 1.
    </p>
    <p data-pagefind-weight="0.5">
        Very unimportant text.
        Matching words in this block are only worth half a normal word.
    </p>
</body>
```

Custom weights can be set to any number between `0.0` and `10.0`.

Weightings are ranked using a quadratic scale, so a ranking of `2.0` will have roughly 4 times the impact of standard text, and a weighting of `10.0` will have roughly 100 times the impact.

[**✎**Edit Footer](cloudcannon:collections/data/footer.yml)[![Image 4: cloudcannon](https://pagefind.app/cloudcannon.svg?_cchid=fc604f8624ad01b53363910976c1c525)](https://cloudcannon.com/)


Title: Using the Default UI | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/ui-usage/

Markdown Content:
Pagefind provides a Default UI component that supports searching, basic filtering, sub results, and metadata out of the box.

[#](https://pagefind.app/docs/ui-usage/#adding-the-pagefind-ui-to-a-page "Link to Adding the Pagefind UI to a page")Adding the Pagefind UI to a page
----------------------------------------------------------------------------------------------------------------------------------------------------

Pagefind UI can be added to any page with the following snippet. The `/pagefind/` directory and containing files will be created for you when running the Pagefind CLI.

```
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>

<div id="search"></div>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({ element: "#search", showSubResults: true });
    });
</script>
```

This snippet is combined here for brevity, but feel free to move the JS & CSS assets alongside your existing assets, and place the `new PagefindUI` initialization script inside an existing JS file.

[#](https://pagefind.app/docs/ui-usage/#customising-the-styles "Link to Customising the styles")Customising the styles
----------------------------------------------------------------------------------------------------------------------

The Pagefind UI is styled using CSS custom properties which can be overridden. To tweak the existing stylesheet, set any of the following variables on your site:

```
--pagefind-ui-scale: 1;
--pagefind-ui-primary: #034ad8;
--pagefind-ui-text: #393939;
--pagefind-ui-background: #ffffff;
--pagefind-ui-border: #eeeeee;
--pagefind-ui-tag: #eeeeee;
--pagefind-ui-border-width: 2px;
--pagefind-ui-border-radius: 8px;
--pagefind-ui-image-border-radius: 8px;
--pagefind-ui-image-box-ratio: 3 / 2;
--pagefind-ui-font: sans-serif;
```

If your website features a dark/light toggle using a classname, a good idea is to set the colour variables alongside that class. For example, the following snippet will swap Pagefind to a darker theme when the page body contains a `dark` class:

```
body.dark {
  --pagefind-ui-primary: #eeeeee;
  --pagefind-ui-text: #eeeeee;
  --pagefind-ui-background: #152028;
  --pagefind-ui-border: #152028;
  --pagefind-ui-tag: #152028;
}
```

[#](https://pagefind.app/docs/ui-usage/#styling-pagefind-ui-yourself "Link to Styling Pagefind UI yourself")Styling Pagefind UI yourself
----------------------------------------------------------------------------------------------------------------------------------------

Pagefind UI can be styled manually by omitting the `/pagefind/pagefind-ui.css` stylesheet. In this case it will function as a pure HTML component.

The classnames within Pagefind UI that begin with `pagefind-ui` should be targeted. These may change, so if you are styling them yourself make sure to test new releases of Pagefind with your stylesheet. Any significant changes to this markup will be noted in a changelog.

[#](https://pagefind.app/docs/ui-usage/#using-custom-pagefind-ui-strings "Link to Using custom Pagefind UI strings")Using custom Pagefind UI strings
----------------------------------------------------------------------------------------------------------------------------------------------------

Pagefind UI will attempt to use translated text based on the language tag of the active page. If built in translations are not found, the UI will fall back to English text. Custom text can instead be supplied using the [translations](https://pagefind.app/docs/ui/#translations) option.

Languages with built in translations are listed in the [language support table](https://pagefind.app/docs/multilingual/#language-support).

[#](https://pagefind.app/docs/ui-usage/#overriding-the-url-of-a-result "Link to Overriding the URL of a result")Overriding the URL of a result
----------------------------------------------------------------------------------------------------------------------------------------------

The Pagefind UI will look for a value under the metadata key `url`, and use that for result links if present. This allows you to override the URL of a single page by tagging metadata on that page, for example:

```
<link 
    data-pagefind-meta="url[href]"
    rel="canonical" 
    href="https://example.com/other-url">
```

[#](https://pagefind.app/docs/ui-usage/#overriding-the-title-or-image-of-a-result "Link to Overriding the title or image of a result")Overriding the title or image of a result
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The Pagefind UI will look for values under the metadata keys `title`, `image`, and `image_alt`. This allows you to override these details by tagging metadata on that page, for example:

```
<h1
    data-pagefind-meta="title">
    Hello World
</h1>
<img 
    data-pagefind-meta="image[src], image_alt[alt]"
    src="/hero.png"
    alt="Hero Alt Text" />
```

[#](https://pagefind.app/docs/ui-usage/#re-initializing-the-pagefind-ui "Link to Re-initializing the Pagefind UI")Re-initializing the Pagefind UI
-------------------------------------------------------------------------------------------------------------------------------------------------

In some cases you might need to re-initialize Pagefind. For example, if you dynamically change the language of the page without reloading, Pagefind will need to be re-initialized to reflect this langauge change.

Pagefind UI can be destroyed by running `.destroy()` on the returned object. Doing so will also tear down the initialized Pagefind instance:

```
let search = new PagefindUI({ element: "#search", showSubResults: true });
search.destroy();
search = new PagefindUI({ element: "#search", /* new options */ });
```

After being destroyed, initializing the Pagefind UI will look again at the active language, and use any new options you might pass in.

[#](https://pagefind.app/docs/ui-usage/#programmatically-controlling-the-pagefind-ui "Link to Programmatically controlling the Pagefind UI")Programmatically controlling the Pagefind UI
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Both searching and filtering can be triggered from JavaScript. A common use case is initializing the Pagefind UI based on query parameters.

```
let search = new PagefindUI({ element: "#search", showSubResults: true });

search.triggerFilters({ "Category": [ "Documentation", "Marketing" ] });

search.triggerSearch("preloaded search term");
```

Filter names and values supplied to `triggerFilters` are case-sensitive.

[#](https://pagefind.app/docs/ui-usage/#further-customization "Link to Further customization")Further customization
-------------------------------------------------------------------------------------------------------------------

See the [Pagefind UI Configuration Reference](https://pagefind.app/docs/ui/) for all available options.


Title: Using the Pagefind search API | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/api/

Markdown Content:
Pagefind can be accessed as an API directly from the JavaScript on your site. This allows you to build custom search interfaces, or integrate with existing systems and components.

[#](https://pagefind.app/docs/api/#initializing-pagefind "Link to Initializing Pagefind")Initializing Pagefind
--------------------------------------------------------------------------------------------------------------

Anywhere on your site, import and initialize Pagefind with:

```
const pagefind = await import("/pagefind/pagefind.js");

pagefind.init();
```

If your site is on a subpath, or you have otherwise customized your bundle path, this should be included — e.g. in the CloudCannon documentation, we load `/documentation/pagefind/pagefind.js`.

The call to `pagefind.init()` will load the Pagefind dependencies and the metadata about the site. Calling this method is optional, and if it is omitted initialization will happen when the first searching or filtering function is called.

Calling `pagefind.init()` when your search interface gains focus will help the core dependencies load by the time a user types in their search query.

[#](https://pagefind.app/docs/api/#configuring-the-search-api "Link to Configuring the search API")Configuring the search API
-----------------------------------------------------------------------------------------------------------------------------

Pagefind options can be set before running `pagefind.init()`:

```
const pagefind = await import("/pagefind/pagefind.js");

await pagefind.options({
    bundlePath: "/custom-pagefind-directory/"
});

pagefind.init();
```

Calls to `pagefind.options` may also be made after initialization, however passing in settings such as `bundlePath` after initialization will have no impact.

See all available options in [Configuring the Pagefind search in the browser](https://pagefind.app/docs/search-config/).

[#](https://pagefind.app/docs/api/#searching "Link to Searching")Searching
--------------------------------------------------------------------------

To perform a search, await `pagefind.search`:

```
const pagefind = await import("/pagefind/pagefind.js");
const search = await pagefind.search("static");
```

This will return an object with the following structure:

```
{ 
    results: [
        {
            id: "en_6fceec9",
            data: async function data()
        }
    ]
}
```

At this point you will have access to the number of search results, and a unique ID for each result. Also see [Debounced search](https://pagefind.app/docs/api/#debounced-search) below for an alternative API.

> Note that the prefix `en` in `en_6fceec9` matches the `lang` attribute of your `html` element. If `lang` is not set, the prefix defaults to `unknown`. See [Multilingual Search](https://pagefind.app/docs/multilingual) for more details.

[#](https://pagefind.app/docs/api/#loading-a-result "Link to Loading a result")Loading a result
-----------------------------------------------------------------------------------------------

To reduce bandwidth usage, the data for each result (e.g. URL & title) must be loaded independently.

To load the data for a result, await the data function:

```
const pagefind = await import("/pagefind/pagefind.js");
const search = await pagefind.search("static");
const oneResult = await search.results[0].data();
```

Which will return an object with the following structure:

```
{
  /* ... other result keys ... */
  "url": "/url-of-the-page/",
  "excerpt": "A small snippet of the <mark>static</mark> content, with the search term(s) highlighted in &lt;mark&gt; elements.",
  "meta": {
    "title": "The title from the first h1 element on the page",
    "image": "/weka.png"
  },
  "sub_results": [
    {
        /* ... other sub_result keys ... */
        "title": "The title from the first h1 element on the page",
        "url": "/url-of-the-page/",
        "excerpt": "A small snippet of the <mark>static</mark> content, with the search term(s) highlighted in &lt;mark&gt; elements",
    },
    {
        /* ... other sub_result keys ... */
        "title": "Inner text of some heading",
        "url": "/url-of-the-page/#id-of-the-h2",
        "excerpt": "A snippet of the <mark>static</mark> content, scoped between this anchor and the next one",
    }
  ]
}
```

> Note that `excerpt` will have HTML entities encoded before adding `<mark>` elements, so is safe to use as innerHTML. The `content` and `meta` keys are raw and unprocessed, so will need to be escaped by the user if necessary.

Pagefind returns all matching results from the search call. To load a “page” of results, you can run something like the following, to slice the first five result objects and load their data:

```
const pagefind = await import("/pagefind/pagefind.js");
const search = await pagefind.search("static");
const fiveResults = await Promise.all(search.results.slice(0, 5).map(r => r.data()));
```

[#](https://pagefind.app/docs/api/#debounced-search "Link to Debounced search")Debounced search
-----------------------------------------------------------------------------------------------

The helper function `pagefind.debouncedSearch` is available and can be used in place of `pagefind.search`:

```
const pagefind = await import("/pagefind/pagefind.js");
const search = await pagefind.debouncedSearch("static");
```

A custom debounce timeout (default: `300`) can optionally be specified as the third argument:

```
const pagefind = await import("/pagefind/pagefind.js");
const search = await pagefind.debouncedSearch("static", {/* options */}, 300);
```

This function waits for the specified duration, and then either performs the search, or returns null if a subsequent call to `pagefind.debouncedSearch` has been made. This helps with resource usage when processing large searches, and can help with flickering when rendering results in a UI.

```
const search = await pagefind.debouncedSearch("static");
if (search === null) {
  // a more recent search call has been made, nothing to do
} else {
  process(search.results);
}
```

[#](https://pagefind.app/docs/api/#preloading-search-terms "Link to Preloading search terms")Preloading search terms
--------------------------------------------------------------------------------------------------------------------

If you have your own debounced search input, Pagefind won’t start loading indexes until you run your search query. To speed up your search query when it runs, you can use the `pagefind.preload` function as the user is typing. Note that the [Debounced search](https://pagefind.app/docs/api/#debounced-search) helper provided by Pagefind implements this for you under the hood.

```
const pagefind = await import("/pagefind/pagefind.js");
pagefind.preload("s");

// later...
await pagefind.search("static");
```

This function takes the same arguments as the `search` function and downloads the required indexes, stopping short of running the search query. Since indexes are chunked alphabetically, running `pagefind.preload("s")` will likely load the index required to search for `static` by the time the user has finished typing. Multiple calls to `preload` will not cause redundant network requests.

In vanilla javascript, this might look like the following:

```
const search = (term) => { /* your main search code */ };
const debouncedSearch = _.debounce(search, 300);

inputElement.addEventListener('input', (e) => {
    pagefind.preload(e.target.value);
    debouncedSearch(e.target.value);
})
```

The `preload` function can also be passed the same filtering options as the `search` function, and will preload any necessary filter indexes.

[#](https://pagefind.app/docs/api/#filtering "Link to Filtering")Filtering
--------------------------------------------------------------------------

To load the available filters, you can run:

```
const filters = await pagefind.filters();
```

This will return an object of the following structure, showing the number of search results available under the given `filter: value` combination.

```
{
    "misc": {
        "value_one": 4,
        "value_two": 12,
        "value_three": 3
    },
    "color": {
        "Orange": 6,
        "Red": 2
    }
}
```

To filter results alongside searching, pass an options object to the search function. Filter values can be passed as strings or arrays.

```
const search = await pagefind.search("static", {
    filters: {
        color: "Orange",
        misc: ["value_one", "value_three"],
    }
});
```

See [Filtering using the Pagefind JavaScript API](https://pagefind.app/docs/js-api-filtering/) for more details and functionality.

[#](https://pagefind.app/docs/api/#sorting-results "Link to Sorting results")Sorting results
--------------------------------------------------------------------------------------------

If pages on your site have been tagged with [sort attributes](https://pagefind.app/docs/sorts/), a `sort` object can be provided to Pagefind when searching:

```
const search = await pagefind.search("static", {
    sort: {
        date: "asc"
    }
});
```

See [Sorting using the Pagefind JavaScript API](https://pagefind.app/docs/js-api-sorting/) for more details and functionality.

[#](https://pagefind.app/docs/api/#re-initializing-the-search-api "Link to Re-initializing the search API")Re-initializing the search API
-----------------------------------------------------------------------------------------------------------------------------------------

In some cases you might need to re-initialize Pagefind. For example, if you dynamically change the language of the page without reloading, Pagefind will need to be re-initialized to reflect this langauge change.

The currently loaded Pagefind can be destroyed by running `pagefind.destroy()`:

```
const pagefind = await import("/pagefind/pagefind.js");

await pagefind.init();
await pagefind.search( /* ... */ );

/**
 * Some action that changes the language of the page, for example
 **/

await pagefind.destroy();
await pagefind.init();

await pagefind.search( /* ... */ );
```

Calling `pagefind.destroy()` will unload the active Pagefind, and also forget anything that was passed through `pagefind.options()`, resetting to the blank state after the script was first imported.

After being destroyed, initializing Pagefind will look again at the active language, and use any new options you might pass in.


Title: Showing multiple results per page | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/sub-results/

Markdown Content:
Pagefind is able to provide context on which sections of a page match a search term, based on the HTML `id` attributes found on the page.

No configuration is needed when indexing your site. When searching the index, you can choose whether or not to split each page into multiple results.

[#](https://pagefind.app/docs/sub-results/#showing-sub-results-with-the-default-ui "Link to Showing sub results with the Default UI")Showing sub results with the Default UI
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If you are using the Default UI package, set the `showSubResults` option to `true`:

```
new PagefindUI({
    element: "#search",
    showSubResults: true // Defaults to false
});
```

This will split the page on headings (`h1` → `h6`) that have `id` attributes that can be linked to. A maximum of three sub results will be show per page, and sections with the most hits will be given priority if more than three exist.

[#](https://pagefind.app/docs/sub-results/#retrieving-sub-results-using-the-javascript-api "Link to Retrieving sub results using the JavaScript API")Retrieving sub results using the JavaScript API
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If you are using the search API directly, Pagefind will provide calculated sub results within the data for each result:

```
const pagefind = await import("/pagefind/pagefind.js");
const search = await pagefind.search("static");
const oneResult = await search.results[0].data();
```

Which will return an object with the following structure:

```
{
  /* ... other result keys ... */
  "url": "/url-of-the-page/",
  "excerpt": "A small snippet of the <mark>static</mark> content, with the search term(s) highlighted in &lt;mark&gt; elements.",
  "sub_results": [
    {
        /* ... other result keys ... */
        "title": "The title from the first h1 element on the page",
        "url": "/url-of-the-page/",
        "excerpt": "A small snippet of the <mark>static</mark> content, with the search term(s) highlighted in &lt;mark&gt; elements"
    },
    {
        /* ... other result keys ... */
        "title": "Inner text of some heading",
        "url": "/url-of-the-page/#id-of-the-h2",
        "excerpt": "A snippet of the <mark>static</mark> content, scoped between this anchor and the next one",
        "anchor": { /* ... anchor details ... */ }
    }
  ]
}
```

These results are split on headings (`h1` → `h6`) that have `id` attributes that can be linked to.

If there are matches for the search term on the page _before_ the first heading with an ID, the first sub result in this list will be the URL and title of the page itself, and will not contain an `anchor` key. All other sub results will have a URL linking directly to that heading, and will have an `anchor` key with details about the element.

This means that all page results are guaranteed to have at least one sub result for either:

*   The page itself,
*   One or more headings,
*   Or, the page itself **and** one or more headings.

[#](https://pagefind.app/docs/sub-results/#calculating-custom-sub-results-using-the-javascript-api "Link to Calculating custom sub results using the JavaScript API")Calculating custom sub results using the JavaScript API
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Pagefind’s precalculated sub results are derived when data is loaded in the browser, and this data is also exposed so that consumers of the JavaScript API can calculate sub results that suit their data set better.

Within the data for a page result, the `anchors`, `locations`, and `content` keys provide the data required to construct sub results:

```
{
  /* ... other result keys ... */
  "url": "/url-of-the-page/",
  "excerpt": "A small snippet of the <mark>static</mark> content, with the search term(s) highlighted in &lt;mark&gt; elements.",
  "content": "The processed text content of this page ...",
  "locations": [ 4, 18, 70 ],
  "weighted_locations": [
    {
        "weight": 1,
        "balanced_score": 10.5,
        "location": 4
    },
    {
        "weight": 1,
        "balanced_score": 25.6,
        "location": 18
    },
    {
        "weight": 2,
        "balanced_score": 60.7,
        "location": 70
    }
  ],
  "anchors": [
    {
        "element": "h2",
        "id": "id-of-the-h2",
        "text": "Inner text of some heading",
        "location": 14
    },
    {
        "element": "div",
        "id": "id-of-the-div",
        "location": 56
    }
  ]
}
```

The `anchors` key contains a list of elements on the page that have IDs, and the relative position of that element in the page content. This lists **all** elements, regardless of the search term.

The `locations` key can be cross referenced with the list of `anchors` to determine sub results. In the above example, we know that there are matching words at locations `4`, `18`, and `70`. Looking at our list of anchors, we can see that this reflects a hit before any element IDs, a hit after our `h2#id-of-the-h2`, and a final hit after our `div#id-of-the-div`.

The `content` key can be split on whitespace, and the `locations` will index into this content at the correct positions. This allows you to slice the content for each region of the page if you choose, and to generate a highlighted excerpt using that sliced content.

Also available is the `weighted_locations` list, which can be used to further prioritise sections of the page if they contain higher value words.

Title: Highlighting search terms | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/highlighting/

Markdown Content:
Highlighting search terms | Pagefind — Static low-bandwidth search at scale
===============

✨ Pagefind is now 1.0! Read the [release notes](https://github.com/CloudCannon/pagefind/releases/tag/v1.0.0), and view the [migration guide](https://pagefind.app/docs/v1-migration/).

Close

[![Image 1: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind.svg?_cchid=212a0a2f35c4372e7a6772034c8fc101)![Image 2: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind-dark.svg?_cchid=ae54989551225001de6aea546b7bc090)](https://pagefind.app/)[**✎**Edit Navigation](cloudcannon:collections/data/nav.yml)

*   [v1.3.0 ![Image 3: Pagefind — Static low-bandwidth search at scale on GitHub](https://pagefind.app/github.svg?_cchid=07883e93734b98cae0f7b9c55d287250)](https://github.com/cloudcannon/pagefind)

Docs Menu

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

 Docs Expand all

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

Highlighting search terms
=========================

Pagefind includes the ability to highlight search terms on the result page.

To enable this feature, first configure Pagefind to insert a query parameter on search results.

[#](https://pagefind.app/docs/highlighting/#configuring-highlighting-via-the-default-ui "Link to Configuring highlighting via the Default UI")Configuring highlighting via the Default UI
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```javascript
new PagefindUI({
    element: "#search",
    highlightParam: "highlight"
});
```

[#](https://pagefind.app/docs/highlighting/#configuring-highlighting-via-the-javascript-api "Link to Configuring highlighting via the JavaScript API")Configuring highlighting via the JavaScript API
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```javascript
const pagefind = await import("/pagefind/pagefind.js");
await pagefind.options({
    highlightParam: "highlight"
});
const search = await pagefind.search("static");
```

[#](https://pagefind.app/docs/highlighting/#enabling-highlights-on-result-pages "Link to Enabling highlights on result pages")Enabling highlights on result pages
-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Once Pagefind is configured to insert query parameters, pages on your site will need to opt-in to highlighting. This is something you can implement for your own site by looking at the query parameter, but Pagefind provides a highlighting script for convenience.

To opt-in, import `/pagefind/pagefind-highlight.js` on all pages of your site and create a new `PagefindHighlight` object.

```html
<script type="module">
    await import('/pagefind/pagefind-highlight.js');
    new PagefindHighlight({ highlightParam: "highlight" });
</script>
```

Ensure that the `highlightParam` configured here matches the `highlightParam` given to Pagefind when searching.

To see all options available to PagefindHighlight, see [Highlight Config](https://pagefind.app/docs/highlight-config).

[**✎**Edit Footer](cloudcannon:collections/data/footer.yml)[![Image 4: cloudcannon](https://pagefind.app/cloudcannon.svg?_cchid=fc604f8624ad01b53363910976c1c525)](https://cloudcannon.com/)

Title: Customize Pagefind's result ranking | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/ranking/

Markdown Content:
Pagefind’s default search algorithm is a great choice for most circumstances, but some datasets might be improved by changing the way results are ranked.

A good example is sites with a mix of long and short pages, where the long pages tend to be the preferred result. In this case, tweaking the `pageLength` and/or `termFrequency` parameters can improve the search relevance for the specific content.

Ranking parameters are configured within the `ranking` option passed to Pagefind, which can optionally contain any or all of the available parameters.

[#](https://pagefind.app/docs/ranking/#configuring-ranking-parameters "Link to Configuring ranking parameters")Configuring ranking parameters
---------------------------------------------------------------------------------------------------------------------------------------------

Ranking parameters can be passed to the JavaScript API via `pagefind.options()`:

```
const pagefind = await import("/pagefind/pagefind.js");
await pagefind.options({
    ranking: {
        // optional parameters, e.g:
        termFrequency: 1.0,
    }
});
```

Ranking parameters can be passed to the Default UI during initialization:

```
new PagefindUI({
    element: "#search",
    ranking: {
        // optional parameters, e.g:
        pageLength: 0.75
    }
});
```

[#](https://pagefind.app/docs/ranking/#configuring-term-frequency "Link to Configuring Term Frequency")Configuring Term Frequency
---------------------------------------------------------------------------------------------------------------------------------

```
await pagefind.options({
    ranking: {
        termFrequency: 1.0 // default value
    }
});
```

`termFrequency` changes the ranking balance between frequency of the term relative to document length, versus weighted term count.

As an example, if we were querying `search` in the sentence **“Pagefind is a search tool that can search websites”**, the term frequency of `search` is 0.22 (2 / 9 words), while the weighted term count of `search` is 2. This latter number would also include any [content with custom weights](https://pagefind.app/docs/weighting/).

*   The maximum value is `1.0`, where term frequency fully applies and is the main ranking factor.
*   The minimum value is `0.0`, where term frequency does not apply, and pages are ranked based on the raw sum of words and weights.
*   Values between `0.0` and `1.0` will interpolate between the two ranking methods.

Reducing the `termFrequency` parameter is a good way to boost longer documents in your search results, as they no longer get penalized for having a low term frequency, and instead get promoted for having many instances of the search term.

[#](https://pagefind.app/docs/ranking/#configuring-term-similarity "Link to Configuring Term Similarity")Configuring Term Similarity
------------------------------------------------------------------------------------------------------------------------------------

```
await pagefind.options({
    ranking: {
        termSimilarity: 1.0 // default value
    }
});
```

`termSimilarity` changes the ranking based on similarity of terms to the search query. Currently this only takes the length of the term into account.

Increasing this number means pages rank higher when they contain words very close to the query, e.g. if searching for `part`, a result of `party` will boost a page higher than one containing `partition`.

The minimum value is `0.0`, where `party` and `partition` would be viewed equally.

Increasing the `termSimilarity` parameter is a good way to suppress pages that are ranking well for long extensions of search terms.

[#](https://pagefind.app/docs/ranking/#configuring-page-length "Link to Configuring Page Length")Configuring Page Length
------------------------------------------------------------------------------------------------------------------------

```
await pagefind.options({
    ranking: {
        pageLength: 0.75 // default value
    }
});
```

`pageLength` changes the way ranking compares page lengths with the average page lengths on your site.

*   The maximum value is `1.0`, where ranking will strongly favour pages that are shorter than the average page on the site, even if longer documents exist with a higher term frequency.
*   The minimum value is `0.0`, where ranking will exclusively look at term frequency, regardless of how long a document is.

Decreasing the `pageLength` parameter is a good way to suppress very short pages that are undesirably ranking higher than longer pages.

[#](https://pagefind.app/docs/ranking/#configuring-term-saturation "Link to Configuring Term Saturation")Configuring Term Saturation
------------------------------------------------------------------------------------------------------------------------------------

```
await pagefind.options({
    ranking: {
        termSaturation: 1.4 // default value
    }
});
```

`termSaturation` controls how quickly a term “saturates” on a page. Once a term has appeared on a page many times, further appearances have a reduced impact on the page rank.

*   The maximum value is `2.0`, where pages will take a long time to saturate, giving pages with very high term frequencies a boost in ranking.
*   As this value trends to 0, it does not take many terms to saturate and allow other paramaters to influence the ranking.
*   The minimum value is `0.0`, where terms will saturate immediately and results will not distinguish between one term and many.

Decreasing the `termSaturation` parameter is a good way to suppress pages that are ranking well due to an extremely high number of search terms existing in their content.


Title: Setting up metadata | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/metadata/

Markdown Content:
Setting up metadata | Pagefind — Static low-bandwidth search at scale
===============

✨ Pagefind is now 1.0! Read the [release notes](https://github.com/CloudCannon/pagefind/releases/tag/v1.0.0), and view the [migration guide](https://pagefind.app/docs/v1-migration/).

Close

[![Image 1: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind.svg?_cchid=212a0a2f35c4372e7a6772034c8fc101)![Image 2: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind-dark.svg?_cchid=ae54989551225001de6aea546b7bc090)](https://pagefind.app/)[**✎**Edit Navigation](cloudcannon:collections/data/nav.yml)

*   [v1.3.0 ![Image 3: Pagefind — Static low-bandwidth search at scale on GitHub](https://pagefind.app/github.svg?_cchid=07883e93734b98cae0f7b9c55d287250)](https://github.com/cloudcannon/pagefind)

Docs Menu

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

 Docs Expand all

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

Setting up metadata
===================

Pagefind supports returning custom metadata alongside search results with the `data-pagefind-meta` attribute.

[#](https://pagefind.app/docs/metadata/#automatic-metadata "Link to Automatic metadata")Automatic metadata
----------------------------------------------------------------------------------------------------------

Pagefind will return some automatic metadata about each page:

*   `title` will contain the contents of the first `h1` on the page
*   `image` will contain the `src` of the first `img` that follows the `h1`
*   `image_alt` will contain the `alt` of the first `img` that follows the `h1`

All of these can be overridden by tagging metadata with the same keys.

[#](https://pagefind.app/docs/metadata/#capturing-metadata-from-an-element "Link to Capturing metadata from an element")Capturing metadata from an element
----------------------------------------------------------------------------------------------------------------------------------------------------------

```html
<h1 data-pagefind-meta="title">Hello World</h1>
```

An element tagged with `data-pagefind-meta` will store the contents of that element and return it alongside the search results.

Each metadata key can only have one value per page.

In the above example, the page would be given the metadata `title: "Hello World"`.

[#](https://pagefind.app/docs/metadata/#capturing-metadata-from-an-attribute "Link to Capturing metadata from an attribute")Capturing metadata from an attribute
----------------------------------------------------------------------------------------------------------------------------------------------------------------

If your metadata exists as an attribute, you can use the syntax `key[html_attribute]`

```html
<img data-pagefind-meta="image[src]" src="/hero.png" />
```

You can comma separate multiple meta attributes:

```html
<img data-pagefind-meta="image[src], image_alt[alt]" src="/hero.png" alt="Hero Alt Text" />
```

This will produce the metadata for the page:

```json
{
    "image": "/hero.png",
    "image_alt": "Hero Alt Text"
}
```

[#](https://pagefind.app/docs/metadata/#specifying-metadata-inline "Link to Specifying metadata inline")Specifying metadata inline
----------------------------------------------------------------------------------------------------------------------------------

If your metadata doesn’t already exist on the page, you can use the syntax `key:value`

```html
<h1 data-pagefind-meta="date:2022-06-01">Hello World</h1>
```

This will give this page the metadata `date: "2022-06-01"`. The element this is set on does not matter, meaning this attribute can be located anywhere that is convenient in your site templating.

[#](https://pagefind.app/docs/metadata/#defining-multiple-metadata-keys-on-a-single-element "Link to Defining multiple metadata keys on a single element")Defining multiple metadata keys on a single element
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Metadata captures may be comma separated and all will apply. The exception is specifying metadata inline, which may only be the last item in a list.

Usage:

```html
<a href="/" 
   title="Homepage"
   data-pagefind-meta="link_text, link_title[title], other:Freeform text, captured to the end">

   Hello World
</a>
```

This will generate the metadata:

```json
{
    "link_text": "Hello World",
    "link_title": "Homepage",
    "other": "Freeform text, captured to the end"
}
```

[#](https://pagefind.app/docs/metadata/#defining-default-metadata "Link to Defining default metadata")Defining default metadata
-------------------------------------------------------------------------------------------------------------------------------

All of the above tags can also be supplied as a `data-pagefind-default-meta` attribute. All logic is the same, except that automatic metadata and any `data-pagefind-meta` attributes will take priority.

For example, to fall back to a social image if no image is found on the page:

```html
<head>
    <meta data-pagefind-default-meta="image[content]" content="/social.png" property="og:image">
</head>
```

[#](https://pagefind.app/docs/metadata/#notes "Link to Notes")Notes
-------------------------------------------------------------------

> The `data-pagefind-meta` attribute does not need to be within the `<body>`, or the `data-pagefind-body` tag. This includes automatic metadata, which will be found even if outside the `data-pagefind-body` tag.

> The `data-pagefind-meta` attribute will still apply if set on or within a `data-pagefind-ignore` element.

> `image_alt` will not be automatically set if you define your own `image` metadata key. If defining your own metadata on an `img` element, `data-pagefind-meta="image[src], image_alt[alt]"` will retrieve both values.

[**✎**Edit Footer](cloudcannon:collections/data/footer.yml)[![Image 4: cloudcannon](https://pagefind.app/cloudcannon.svg?_cchid=fc604f8624ad01b53363910976c1c525)](https://cloudcannon.com/)


Title: Setting up filters | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/filtering/

Markdown Content:
To configure filters in Pagefind, pages are associated to filter keys and values using data attributes.

[#](https://pagefind.app/docs/filtering/#capturing-a-filter-value-from-an-element "Link to Capturing a filter value from an element")Capturing a filter value from an element
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
<h1>My Blog Post</h1>
<p>
    Author:
    <span data-pagefind-filter="author">CloudCannon</span>
</p>
```

An element tagged with `data-pagefind-filter` will associate that page with the filter name, and capture the contents of the element as the filter value. In the above example, the page would be tagged as `author: ["CloudCannon"]`.

Filters can have multiple values per page, so the following is also valid:

```
<h1>Hello World</h1>
<p>
    Authors:
    <span data-pagefind-filter="author">CloudCannon</span>
    and
    <span data-pagefind-filter="author">Liam Bigelow</span>
</p>
```

Which produces: `author: ["CloudCannon", "Liam Bigelow"]`.

[#](https://pagefind.app/docs/filtering/#capturing-a-filter-value-from-an-attribute "Link to Capturing a filter value from an attribute")Capturing a filter value from an attribute
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If the data you want to filter on exists as an attribute, you can use the syntax `filter_name[html_attribute]`

```
<head>
    <meta 
        data-pagefind-filter="author[content]"
        content="Pagefind"
        property="og:site_name">
</head>
```

This will capture the filter value from the attribute specified, in this case producing `author: ["Pagefind"]`.

[#](https://pagefind.app/docs/filtering/#specifying-a-filter-inline "Link to Specifying a filter inline")Specifying a filter inline
-----------------------------------------------------------------------------------------------------------------------------------

If your value doesn’t already exist on the page, you can use the syntax `filter_name:value`:

```
<h1 data-pagefind-filter="author:CloudCannon">Hello World</h1>
```

This will tag this page as `author: ["CloudCannon"]`. The element this is set on does not matter, meaning this attribute can be located anywhere that is convenient in your site templating.

[#](https://pagefind.app/docs/filtering/#specifying-multiple-filters-on-a-single-element "Link to Specifying multiple filters on a single element")Specifying multiple filters on a single element
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Filter captures may be comma separated and all will apply. The exception is specifying a filter inline, which may only be the last item in a list.

For example:

```
<h1
    data-section="Documentation"
    data-category="Article"
    data-pagefind-filter="heading, tag[data-section], tag[data-category], author:Freeform text, captured to the end">
        Hello World
</h1>
```

This will produce the filter values for the page:

```
{
    "heading": ["Hello World"],
    "tag": ["Documentation", "Article"],
    "author": ["Freeform text, captured to the end"]
}
```

[#](https://pagefind.app/docs/filtering/#notes "Link to Notes")Notes
--------------------------------------------------------------------

> The `data-pagefind-filter` attribute does not need to be within the `<body>`, or the `data-pagefind-body` tag.

> The `data-pagefind-filter` attribute will still apply if set on or within a `data-pagefind-ignore` element.

> The keys `any`, `all`, `none`, and `not` are reserved and can’t be used as filter keys.


Title: Setting up sorting | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/sorts/

Markdown Content:
Pagefind supports sorting results by tagged attributes instead of page relevancy. For a sort to be available in the browser, pages must be tagged with the `data-pagefind-sort` attribute.

[#](https://pagefind.app/docs/sorts/#capturing-a-sort-value-from-an-element "Link to Capturing a sort value from an element")Capturing a sort value from an element
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
<p data-pagefind-sort="date">2022-10-20</p>
```

An element tagged with `data-pagefind-sort` will capture the contents of that element and provide the given key as a sort option to the Pagefind JS API. In the above example, the page would be tagged as `date: "2022-10-20"`.

[#](https://pagefind.app/docs/sorts/#capturing-a-sort-value-from-an-attribute "Link to Capturing a sort value from an attribute")Capturing a sort value from an attribute
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If the data you want to sort by exists as an attribute, you can use the syntax `sort_key[html_attribute]`

```
<h1 data-pagefind-sort="weight[data-weight]" data-weight="10">Hello World</h1>
```

This will capture the filter value from the attribute specified, in this case producing `weight: "10"`.

> See the [Notes](https://pagefind.app/docs/sorts/#notes) section at the bottom of this page for details on how number-like values are sorted.

[#](https://pagefind.app/docs/sorts/#specifying-a-sort-inline "Link to Specifying a sort inline")Specifying a sort inline
-------------------------------------------------------------------------------------------------------------------------

If your value doesn’t already exist on the page, you can use the syntax `sort_key:value`:

```
<h1 data-pagefind-sort="date:2022-06-01">Hello World</h1>
```

This will tag this page as `date: 2022-06-01`. The element this is set on does not matter, meaning this attribute can be located anywhere that is convenient in your site templating.

[#](https://pagefind.app/docs/sorts/#specifying-multiple-sorts-on-a-single-element "Link to Specifying multiple sorts on a single element")Specifying multiple sorts on a single element
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Sort captures may be comma separated and all will apply. The exception is specifying a sort value inline, which may only be the last item in a list.

For example:

```
<h1
    data-weight="10"
    data-date="2022-06-01"
    data-pagefind-sort="heading, weight[data-weight], date[data-weight], author:Freeform text, captured to the end">
        Hello World
</h1>
```

This will produce the sort tags for the page:

```
{
    "heading": "Hello World",
    "weight": "10",
    "date": "2022-06-01",
    "author": "Freeform text, captured to the end"
}
```

[#](https://pagefind.app/docs/sorts/#notes "Link to Notes")Notes
----------------------------------------------------------------

> If all values tagged by a given sort key can be parsed as numbers (integers or floats) then Pagefind will sort them numerically. If any values are not parsable, all values will be sorted alphabetically.

> Pages that omit a `data-pagefind-sort` tag for a given sorting key will be omitted from search results if that sort is applied. i.e. if a site has four pages, and three are tagged `data-pagefind-sort="date"`, sorting your search results by `date` will return three total results.

> Sort orders are precomputed while indexing the site. Due to this, if you are using the [Multisite feature](https://pagefind.app/docs/multisite/) sorting will not be fully correct. Searching across multiple indexes with a sort applied will first sort each index, and then zip them together, providing interlaced results from each index.

Title: Multilingual search | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/multilingual/

Markdown Content:
Pagefind supports multilingual sites out of the box, with zero configuration.

When indexing, Pagefind will look for a [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) on your `html` element. Indexing will then run independently for each detected language. When Pagefind initializes in the browser it will check the same `lang` attribute and load the appropriate index.

If you load Pagefind search on a page tagged as `<html lang="pt-br">`, you will automatically search only the pages on the site with the same language. Pagefind will also adapt any stemming algorithms to the target language if supported. This applies to both the Pagefind JS API and the Pagefind UI.

The Pagefind UI itself is translated into a range of languages, and will adapt automatically to the page language if possible.

[#](https://pagefind.app/docs/multilingual/#opting-out-of-multilingual-search "Link to Opting out of multilingual search")Opting out of multilingual search
-----------------------------------------------------------------------------------------------------------------------------------------------------------

Setting the [force language](https://pagefind.app/docs/config-options/#force-language) option when indexing will opt out of this feature and create one index for the site as a whole.

[#](https://pagefind.app/docs/multilingual/#language-support "Link to Language support")Language support
--------------------------------------------------------------------------------------------------------

Pagefind will work automatically for any language. Explicit language support improves the quality of search results and the Pagefind UI.

If word stemming is unsupported, search results won’t match across root words. If UI translations are unsupported, the Pagefind UI will be shown in English.

| Language | UI Translations | Word Stemming |
| --- | --- | --- |
| Afrikaans — `af` | ✅ | ❌ |
| Arabic — `ar` | ❌ | ✅ |
| Armenian — `hy` | ❌ | ✅ |
| Basque — `eu` | ❌ | ✅ |
| Bengali — `bn` | ✅ | ❌ |
| Catalan — `ca` | ✅ | ✅ |
| Chinese — `zh` | ✅ | See below |
| Croatian — `hr` | ✅ | ❌ |
| Czech — `cs` | ✅ | ❌ |
| Danish — `da` | ✅ | ✅ |
| Dutch — `nl` | ✅ | ✅ |
| English — `en` | ✅ | ✅ |
| Finnish — `fi` | ✅ | ✅ |
| French — `fr` | ✅ | ✅ |
| Galician — `gl` | ✅ | ❌ |
| German — `de` | ✅ | ✅ |
| Greek — `el` | ❌ | ✅ |
| Hindi — `hi` | ✅ | ✅ |
| Hungarian — `hu` | ✅ | ✅ |
| Indonesian — `id` | ✅ | ✅ |
| Irish — `ga` | ❌ | ✅ |
| Italian — `it` | ✅ | ✅ |
| Japanese — `ja` | ✅ | See below |
| Korean — `ko` | ✅ | ❌ |
| Lithuanian — `lt` | ❌ | ✅ |
| Māori — `mi` | ✅ | ❌ |
| Nepali — `ne` | ❌ | ✅ |
| Norwegian — `no` | ✅ | ✅ |
| Polish — `pl` | ✅ | ❌ |
| Portuguese — `pt` | ✅ | ✅ |
| Romanian — `ro` | ❌ | ✅ |
| Russian — `ru` | ✅ | ✅ |
| Serbian — `sr` | ✅ | ✅ |
| Spanish — `es` | ✅ | ✅ |
| Swedish — `sv` | ✅ | ✅ |
| Tamil — `ta` | ✅ | ✅ |
| Turkish — `tr` | ✅ | ✅ |
| Vietnamese — `vi` | ✅ | ❌ |
| Yiddish — `yi` | ❌ | ✅ |

> Feel free to [open an issue](https://github.com/CloudCannon/pagefind/issues/new) if there’s a language you would like better support for, or [contribute a translation](https://github.com/CloudCannon/pagefind/tree/main/pagefind_ui/translations) for Pagefind UI in your language.

[#](https://pagefind.app/docs/multilingual/#specialized-languages "Link to Specialized languages")Specialized languages
-----------------------------------------------------------------------------------------------------------------------

> This section currently applies to Chinese and Japanese languages. Specialized languages are only supported in Pagefind’s extended release, which is the default when running `npx pagefind`.

Currently when indexing, Pagefind does not support stemming for specialized languages, but does support segmentation for words not separated by whitespace.

Pagefind does not _yet_ support segmentation of the search query, so searching in the browser requires that words in the search query are separated by whitespace.

In practice, this means that on a page tagged as a `zh-` language, `每個月都` will be indexed as the words `每個`, `月`, and `都`.

When searching in the browser, searching for `每個`, `月`, or `都` individually will work. Additionally, searching `每個 月 都` will return results containing each word in any order, and searching `"每個 月 都"` in quotes will match `每個月都` exactly.

Searching for `每個月都` will return zero results, as Pagefind is not able to segment it into words in the browser. Work to improve this is underway and will hopefully remove this limitation in the future.

Title: Installing and running Pagefind | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/installation/

Markdown Content:
Pagefind is a static binary with no dynamic dependencies, so in most cases will be simple to install and run. Pagefind is currently supported on Windows, macOS, and Linux distributions.

[#](https://pagefind.app/docs/installation/#running-via-npx "Link to Running via npx")Running via npx
-----------------------------------------------------------------------------------------------------

For users with a NodeJS toolchain already installed, Pagefind publishes a [wrapper package through npm](https://www.npmjs.com/package/pagefind):

```
npx pagefind --site "public"
```

This package includes the correct [binary of the relevant release](https://github.com/CloudCannon/pagefind/releases) as a dependency for your platform.

Specific versions can be run by passing a version tag:

```
npx pagefind@latest --site "public"

npx pagefind@v1.1.1 --site "public"
```

Running Pagefind via npx will always download the `pagefind_extended` release, which includes specialized support for indexing Chinese and Japanese pages.

> Pagefind’s npm package can also be imported and controlled from a script. See the [Node API documentation](https://pagefind.app/docs/node-api/) for details.

[#](https://pagefind.app/docs/installation/#running-via-python "Link to Running via Python")Running via Python
--------------------------------------------------------------------------------------------------------------

For users with a Python toolchain already installed, Pagefind publishes a [wrapper package through pypi](https://pypi.org/project/pagefind/):

```
python3 -m pip install 'pagefind[extended]'
python3 -m pagefind --site "public"
```

This package includes the correct [binary of the relevant release](https://github.com/CloudCannon/pagefind/releases) as a dependency for your platform.

Specific versions can be installed by passing a version:

```
python3 -m pip install 'pagefind[extended]==1.1.1'
```

The above example shows installing the `pagefind_extended` release, which includes specialized support for indexing Chinese and Japanese pages. To install the smaller standard release, run:

```
python3 -m pip install 'pagefind[bin]'
```

> Pagefind’s Python package can also be imported and controlled from a script. See the [Python API documentation](https://pagefind.app/docs/py-api/) for details.

[#](https://pagefind.app/docs/installation/#downloading-a-precompiled-binary "Link to Downloading a precompiled binary")Downloading a precompiled binary
--------------------------------------------------------------------------------------------------------------------------------------------------------

If you prefer to install Pagefind yourself, you can download a [precompiled release from GitHub](https://github.com/CloudCannon/pagefind/releases) and run the binary directly:

```
./pagefind --site "public"
# or
./pagefind_extended --site "public"
```

Pagefind publishes two releases, `pagefind` and `pagefind_extended`. The extended release is a larger binary, but includes specialized support for indexing Chinese and Japanese pages.

[#](https://pagefind.app/docs/installation/#building-from-source "Link to Building from source")Building from source
--------------------------------------------------------------------------------------------------------------------

If you have [Rust and Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) installed, you can run `cargo install pagefind` to build from source.

```
cargo install pagefind
pagefind --site "public"
```

To build and install the extended version of Pagefind:

```
cargo install pagefind --features extended
pagefind --site "public"
```

Title: Pagefind CLI configuration sources | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/config-sources/

Markdown Content:
Pagefind CLI configuration sources | Pagefind — Static low-bandwidth search at scale
===============

✨ Pagefind is now 1.0! Read the [release notes](https://github.com/CloudCannon/pagefind/releases/tag/v1.0.0), and view the [migration guide](https://pagefind.app/docs/v1-migration/).

Close

[![Image 1: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind.svg?_cchid=212a0a2f35c4372e7a6772034c8fc101)![Image 2: Pagefind — Static low-bandwidth search at scale Logo](https://pagefind.app/pagefind-dark.svg?_cchid=ae54989551225001de6aea546b7bc090)](https://pagefind.app/)[**✎**Edit Navigation](cloudcannon:collections/data/nav.yml)

*   [v1.3.0 ![Image 3: Pagefind — Static low-bandwidth search at scale on GitHub](https://pagefind.app/github.svg?_cchid=07883e93734b98cae0f7b9c55d287250)](https://github.com/cloudcannon/pagefind)

Docs Menu

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

 Docs Expand all

1.   [Home](https://pagefind.app/)
2.   [Quick Start](https://pagefind.app/docs/)
3.   
Indexing
    1.   [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
    2.   [Configuring the index](https://pagefind.app/docs/indexing/)
    3.   [Weighting content](https://pagefind.app/docs/weighting/)

4.   
Searching
    1.   [Using the Default UI](https://pagefind.app/docs/ui-usage/)
    2.   [Using the search API](https://pagefind.app/docs/api/)
    3.   [Multiple results per page](https://pagefind.app/docs/sub-results/)
    4.   [Highlighting search terms](https://pagefind.app/docs/highlighting/)
    5.   [Searching multiple sites](https://pagefind.app/docs/multisite/)
    6.   [Customize ranking](https://pagefind.app/docs/ranking/)

5.   
Metadata
    1.   [Setting up metadata](https://pagefind.app/docs/metadata/)
    2.   [Metadata in the Default UI](https://pagefind.app/docs/default-ui-metadata/)
    3.   [Metadata in the JS API](https://pagefind.app/docs/js-api-metadata/)

6.   
Filtering
    1.   [Setting up filters](https://pagefind.app/docs/filtering/)
    2.   [Filtering with the Default UI](https://pagefind.app/docs/default-ui-filtering/)
    3.   [Filtering with the JS API](https://pagefind.app/docs/js-api-filtering/)

7.   
Sorting
    1.   [Setting up sorting](https://pagefind.app/docs/sorts/)
    2.   [Sorting with the JS API](https://pagefind.app/docs/js-api-sorting/)

8.   
Multilingual
    1.   [Multilingual search](https://pagefind.app/docs/multilingual/)

9.   
References
    1.   [Installing the CLI](https://pagefind.app/docs/installation/)
    2.   [CLI config sources](https://pagefind.app/docs/config-sources/)
    3.   [CLI config options](https://pagefind.app/docs/config-options/)
    4.   [Using the Python API](https://pagefind.app/docs/py-api/)
    5.   [Using the NodeJS API](https://pagefind.app/docs/node-api/)
    6.   [Search API config](https://pagefind.app/docs/search-config/)
    7.   [Default UI config](https://pagefind.app/docs/ui/)
    8.   [Highlight API Config](https://pagefind.app/docs/highlight-config/)
    9.   [Search API Reference](https://pagefind.app/docs/api-reference/)

10.   
Resources
    1.   [Migrating to Pagefind 1.0](https://pagefind.app/docs/v1-migration/)
    2.   [Troubleshoot Hosting](https://pagefind.app/docs/hosting/)
    3.   [Community Resources](https://pagefind.app/docs/resources/)
    4.   [Implementation service for Pagefind](https://pagefind.app/docs/implementation-service/)

Pagefind CLI configuration sources
==================================

Pagefind can be configured through CLI flags, environment variables, or configuration files. Values will be merged from all sources, with CLI flags overriding environment variables, and environment variables overriding configuration files.

[#](https://pagefind.app/docs/config-sources/#config-files "Link to Config files")Config files
----------------------------------------------------------------------------------------------

Pagefind will look for a `pagefind.toml`, `pagefind.yml`, `pagefind.yaml`, or `pagefind.json` file in the directory that you have run the command in.

```yaml
# pagefind.yml
site: public
output_subdir: pagefind
```

```bash
npx pagefind
```

[#](https://pagefind.app/docs/config-sources/#environment-variables "Link to Environment variables")Environment variables
-------------------------------------------------------------------------------------------------------------------------

Pagefind will load any values via a `PAGEFIND_*` environment variable.

```bash
export PAGEFIND_OUTPUT_SUBDIR="pagefind"
PAGEFIND_SITE="public" npx pagefind
```

[#](https://pagefind.app/docs/config-sources/#cli-flags "Link to CLI flags")CLI flags
-------------------------------------------------------------------------------------

Pagefind can be passed CLI flags directly.

```bash
npx pagefind --site public --output-subdir pagefind
```

[**✎**Edit Footer](cloudcannon:collections/data/footer.yml)[![Image 4: cloudcannon](https://pagefind.app/cloudcannon.svg?_cchid=fc604f8624ad01b53363910976c1c525)](https://cloudcannon.com/)

Title: Pagefind CLI configuration options | Pagefind — Static low-bandwidth search at scale

URL Source: https://pagefind.app/docs/config-options/

Markdown Content:
The Pagefind CLI has the following options. These can be set via any [configuration source](https://pagefind.app/docs/config-sources/).

> These configuration options only apply when running the Pagefind indexing tool on your site. For configuring Pagefind search in the browser, see [Pagefind Search Config](https://pagefind.app/docs/search-config/). For configuring the Pagefind Default UI, see [Pagefind UI](https://pagefind.app/docs/ui/).

[#](https://pagefind.app/docs/config-options/#required-arguments "Link to Required arguments")Required arguments
----------------------------------------------------------------------------------------------------------------

### [#](https://pagefind.app/docs/config-options/#site "Link to Site")Site

The location of your built static site.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--site <PATH>` | `PAGEFIND_SITE` | `site` |

[#](https://pagefind.app/docs/config-options/#optional-arguments "Link to Optional arguments")Optional arguments
----------------------------------------------------------------------------------------------------------------

### [#](https://pagefind.app/docs/config-options/#serve "Link to Serve")Serve

Serve the site directory after creating the search index. Useful for testing search on a local build of your site without having to serve the site directory manually.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--serve` | `PAGEFIND_SERVE` | `serve` |

### [#](https://pagefind.app/docs/config-options/#output-subdirectory "Link to Output subdirectory")Output subdirectory

The folder to output the search bundle into, relative to the processed site. Defaults to `pagefind`.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--output-subdir <DIR>` | `PAGEFIND_OUTPUT_SUBDIR` | `output_subdir` |

### [#](https://pagefind.app/docs/config-options/#output-path "Link to Output path")Output path

The folder to output the search bundle into, relative to the working directory. Overrides `output-subdir` if supplied.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--output-path <PATH>` | `PAGEFIND_OUTPUT_PATH` | `output_path` |

### [#](https://pagefind.app/docs/config-options/#root-selector "Link to Root selector")Root selector

The element that Pagefind should treat as the root of the document. Defaults to `html`.

Note that filters and metadata outside of this selector will **not** be detected, all Pagefind behaviour will be limited to this element and below. In most cases, you should use the `data-pagefind-body` attribute detailed in [Customizing the index](https://pagefind.app/docs/indexing/).

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--root-selector <S>` | `PAGEFIND_ROOT_SELECTOR` | `root_selector` |

### [#](https://pagefind.app/docs/config-options/#exclude-selectors "Link to Exclude selectors")Exclude selectors

Pass extra element selectors that Pagefind should ignore when indexing. For example, in `pagefind.yml`:

```
exclude_selectors:
  - "#my_navigation"
  - "blockquote > span"
  - "[id^='prefix-']"
```

All children will also be ignored, so using a `#my_navigation *` selector is not required — in other words, the semantics are the same as the [data-pagefind-ignore](https://pagefind.app/docs/indexing/#removing-individual-elements-from-the-index) attribute.

Note that currently Pagefind only supports lists of options via configuration files. If using the `--exclude-selectors` CLI flag or the `PAGEFIND_EXCLUDE_SELECTORS` environment variable, only one selector may be supplied. The selector may be a comma-separated CSS selector though, so the above example can be passed as `--exclude-selectors "#my_navigation, blockquote > span, [id^='prefix-']"`.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--exclude-selectors <S>` | `PAGEFIND_EXCLUDE_SELECTORS` | `exclude_selectors` |

### [#](https://pagefind.app/docs/config-options/#glob "Link to Glob")Glob

Configures the glob used by Pagefind to discover HTML files. Defaults to `**/*.{html}`. See [Wax patterns documentation](https://github.com/olson-sean-k/wax#patterns) for more details.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--glob <GLOB>` | `PAGEFIND_GLOB` | `glob` |

### [#](https://pagefind.app/docs/config-options/#force-language "Link to Force Language")Force Language

Ignores any detected languages and creates a single index for the entire site as the provided language. Expects an ISO 639-1 code, such as `en` or `pt`.

See [Multilingual search](https://pagefind.app/docs/multilingual/) for more details.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--force-language <LANG>` | `PAGEFIND_FORCE_LANGUAGE` | `force_language` |

### [#](https://pagefind.app/docs/config-options/#keep-index-url "Link to Keep Index URL")Keep Index URL

Keeps `index.html` at the end of search result paths. By default, a file at `animals/cat/index.html` will be given the URL `/animals/cat/`. Setting this option to `true` will result in the URL `/animals/cat/index.html`.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--keep-index-url` | `KEEP_INDEX_URL` | `keep_index_url` |

### [#](https://pagefind.app/docs/config-options/#verbose "Link to Verbose")Verbose

Prints extra logging while indexing the site. Only affects the CLI, does not impact web-facing search.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--verbose` | `PAGEFIND_VERBOSE` | `verbose` |

### [#](https://pagefind.app/docs/config-options/#quiet "Link to Quiet")Quiet

Only logs errors and warnings while indexing the site. Only affects the CLI, does not impact web-facing search.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--quiet` | `PAGEFIND_QUIET` | `quiet` |

### [#](https://pagefind.app/docs/config-options/#silent "Link to Silent")Silent

Only logs errors while indexing the site. Only affects the CLI, does not impact web-facing search.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--silent` | `PAGEFIND_SILENT` | `silent` |

### [#](https://pagefind.app/docs/config-options/#logfile "Link to Logfile")Logfile

Writes logs to the given logfile, in addition to the console. Replaces the file on each run.

| CLI Flag | ENV Variable | Config Key |
| --- | --- | --- |
| `--logfile <PATH>` | `PAGEFIND_LOGFILE` | `logfile` |


