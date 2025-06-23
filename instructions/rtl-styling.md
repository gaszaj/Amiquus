Title: Right to Left Styling 101

URL Source: https://rtlstyling.com/posts/rtl-styling/

Markdown Content:
Do you like my content? You can support and [buy me a coffee](https://ko-fi.com/ahmadshadeed). Thank you so much!

![Image 1](https://rtlstyling.com/img/rtl-styling-intro@2x.jpg)

Over 292 million people around the world speak Arabic as their first language. Arabic (al-Arabiyyah, pronounced /al ʕarabijja/, /ʕarabiː/) is my native language, and I sometimes build websites that need to support both left-to-right (LTR) and right-to-left (RTL) styles.

Introduction to RTL styling [#](https://rtlstyling.com/posts/rtl-styling/#introduction-to-rtl-styling)
------------------------------------------------------------------------------------------------------

The default page direction in CSS is LTR. If you check the browser of your choice and inspect the browser’s default agent styles for the `html` element, you will notice that `ltr` is the default value for the `dir` (or “direction”) property. Below is a basic example to show the difference between an LTR and an RTL layout.

![Image 2](https://rtlstyling.com/img/rtl-intro-1.png)

Notice for the RTL section, the text reads from right to left, which is the opposite of the LTR text. Luckily, the browser did all of the work for this simple example. To switch a document’s language direction, you will need to add the `dir` attribute to the root element.

`<html dir="rtl">  ...</html>`
When the `dir` is changed, the following elements should flip automatically: headings, paragraphs, links, images, and form elements.

It’s worth mentioning that there is a `dir="auto"` attribute, which switches the direction automatically based on the content parsed. According to the [HTML specification](https://www.w3.org/TR/2011/WD-html5-author-20110809/global-attributes.html):

> Authors are urged to only use this value as a last resort when the direction of the text is truly unknown, and no better server-side heuristic can be applied.

In addition to setting the `dir=rtl` attribute on the HTML element, we may also add `direction: rtl` as a CSS style.

`.element {  direction: rtl;}`
However, the CSSWG recommends that the direction should be defined on the `html` root element to ensure the correct bidirectional layout in the absence of CSS.

Basic Example of Flipping a Design [#](https://rtlstyling.com/posts/rtl-styling/#basic-example-of-flipping-a-design)
--------------------------------------------------------------------------------------------------------------------

Let’s see a more detailed example to explore how to flip a design from LTR to RTL.

![Image 3: rtl-intro-ltr.jpg](https://rtlstyling.com/img/rtl-intro-ltr.jpg)

`<article class="media">  <img src="blueberry-cheesecake.jpg" alt="" />  <div class="media__content">    <h2>Blueberry Cheesecake</h2>    <p>...</p>    <p><a href="#" class="link">View Recipe</a></p>  </div></article>`
Initially, I used the good old float to align the image to the left in the LTR design — and, of course, I used a clearfix.

`.media:after {  content: "";  display: block;  clear: both;}.media__photo {  float: left;  width: 200px;  margin-right: 16px;}`
After we add `dir="rtl"` for the Arabic element, the result looks like this:

![Image 4](https://rtlstyling.com/img/rtl-intro-ltr-2.jpg)

Everything is flipped except for the image. That’s because it has `float: left` and `margin-right: 16px`. To solve that, we need to override those styles:

`.media[dir="rtl] img {    float: right;    margin-right: 0;    margin-left: 16px;}`
Mixing English and Arabic Content in an LTR Layout [#](https://rtlstyling.com/posts/rtl-styling/#mixing-english-and-arabic-content-in-an-ltr-layout)
----------------------------------------------------------------------------------------------------------------------------------------------------

What would happen if some text had a mix of English and Arabic words, while the layout was LTR? Well, the result would look weird.

![Image 5](https://rtlstyling.com/img/ltr-mix-1.jpg)

The browser shows the title improperly. For an Arabic speaker, the title would be confusing to read, unless you’re the author who wrote it. It should read in the order shown in the figure below.

![Image 6](https://rtlstyling.com/img/ltr-mix-2.jpg)

To avoid this issue, set the appropriate language direction whenever possible. Once `dir="rtl"` is set on the element, it will appear as expected.

![Image 7](https://rtlstyling.com/img/ltr-mix-3.jpg)

It can get more complex when the title is longer. Below, I’ve made the title a bit longer, and the result was unexpected. I’ve affixed numbers to show the correct order.

![Image 8](https://rtlstyling.com/img/ltr-mix-4.jpg)

When `dir="rtl` is set on the element, the title is much clearer. That is, the sentence looks grammatically correct and in the right order.

![Image 9](https://rtlstyling.com/img/ltr-mix-5.jpg)

Handling Fonts [#](https://rtlstyling.com/posts/rtl-styling/#handling-fonts)
----------------------------------------------------------------------------

Based on the design for both LTR and RTL layouts, there should be a specific font for each direction. Some fonts can work for multiple languages, which are great. However, brands and businesses tend to use a different font for RTL.

To account for that, we should define a different font in the font settings of your project. See [Automation Tools](https://rtlstyling.com/posts/rtl-styling/#automation-tools) for more details.

Font Family [#](https://rtlstyling.com/posts/rtl-styling/#font-family)
----------------------------------------------------------------------

In CSS, `font-family` works in a way that makes it easy to fall back to another font, in case a font didn't load. However, it turned out that if specific glyphs are not supported by the first font in the declaration, it will try to use the second font.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family):

> Font selection does not simply stop at the first font in the list that is on the user's system. Rather, font selection is done one character at a time, so that if an available font does not have a glyph for a needed character, the latter fonts are tried.

[Omar Bourhaouta](https://codepen.io/bourhaouta/pen/GRgLqYL?editors=0100) made the following demo which proves the above concept:

`body {  font-family: "Roboto", "Amiri", sans-serif;}`
The Roboto font didn't recongnize the Arabic glyphs, so it falled back to the second font declaration.

Flexbox Layout Module [#](https://rtlstyling.com/posts/rtl-styling/#flexbox-layout-module)
------------------------------------------------------------------------------------------

Flexbox is based on the writing mode of the document. The writing mode is used to specify how blocks are laid out on the page. For example, a Chinese website is laid out from top to bottom. The writing mode is for this purpose. In flexbox, items are distributed according to the writing mode of the document. The default value for `writing-mode` in English and Arabic is `horizontal-tb`.

According to [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) (MDN), `horizontal-tb` means the following:

> Content flows horizontally from left to right, vertically from top to bottom. The next horizontal line is positioned below the previous line.

When the page’s direction is changed to RTL, flexbox will flip its items accordingly. That’s a huge benefit! The illustration below shows how the flexbox axis is flipped based on the direction.

![Image 10](https://rtlstyling.com/img/flexbox-axis.jpg)

In the example below, I’ve laid out three items and numbered each of them to show the difference when the direction changes.

`<div class="element">  <div class="item">1</div>  <div class="item">2</div>  <div class="item">3</div></div>``.element {  display: flex;  flex-direction: row; /* Default value, added for clarity */}`
![Image 11](https://rtlstyling.com/img/rtl-flexbox-1.jpg)

Grid Layout Module [#](https://rtlstyling.com/posts/rtl-styling/#grid-layout-module)
------------------------------------------------------------------------------------

Like flexbox, the grid layout module depends on the writing mode of the document, which gives us the same benefit that we get from using flexbox.

In the example below, the sidebar should be on the left and the `main` content on the right when the direction is LTR. For RTL, it’s vice versa. When we use CSS grid, the flipping will be done automatically according to the page’s direction.

`<div class="element">  <div class="side">Side</div>  <div class="main">Main</div></div>``.element {  display: grid;  grid-template-columns: 220px 1fr;  grid-gap: 1rem;}`
Common Mistakes When Flipping to RTL [#](https://rtlstyling.com/posts/rtl-styling/#common-mistakes-when-flipping-to-rtl)
------------------------------------------------------------------------------------------------------------------------

Non-Arabic speakers make some common mistakes that are easy to spot.

### 1. Letter-Spacing [#](https://rtlstyling.com/posts/rtl-styling/#1.-letter-spacing)

In English, it’s common to add `letter-spacing` to adjust the letters of a word. It’s also known as tracking in typography. Consider the following example for English content. It looks normal.

![Image 12](https://rtlstyling.com/img/letter-spacing.jpg)

However, if the same `letter-spacing` style was added to Arabic content, it would look weird. Consider the following real-life example.

![Image 13](https://rtlstyling.com/img/letter-spacing-rtl.jpg)

Notice that in the content with `letter-spacing`, each word’s letters look disconnected from each other. That’s not right. Arabic letters are supposed to look connected, and keeping the English `letter-spacing` works against that. Make sure to set `letter-spacing: 0` when working on a multilingual layout.

### 2. Text Transparency [#](https://rtlstyling.com/posts/rtl-styling/#2.-text-transparency)

It’s common to change the transparency of text color — to make it look secondary, for example. That works in English. However, when the content is Arabic, it causes a weird text-rendering issue.

![Image 14](https://rtlstyling.com/img/rtl-transparency.jpg)

There are some areas with a different color between letters. In this example, `letter-spacing` hasn’t been adjusted, so the issue is not related to that. The solution is simply to set the color without RGBa or opacity.

### 3. Differences in Word Sizes Between Languages [#](https://rtlstyling.com/posts/rtl-styling/#3.-differences-in-word-sizes-between-languages)

Sometimes, when a website is translated into Arabic, the sizing of elements changes due to some words becoming bigger or smaller after translation. Consider the following example, in which I’ve mocked up the navigation of Smashing Magazine’s website.

![Image 15](https://rtlstyling.com/img/website-header.png)

In the Arabic version, some of the words are almost the same size as their English counterparts, some are the same, and some are bigger. To make it clearer, here is a comparison of each word and its Arabic translation.

![Image 16](https://rtlstyling.com/img/website-header-translation.png)

You might be wondering why I’m talking about differences in word sizes, since this is normal and expected. Consider the following real-life example from LinkedIn.

![Image 17](https://rtlstyling.com/img/word-length-linkedin.png)

The button “Done” is translated to “تم” in Arabic, which makes the button too small and looks weird. It would be better to have a `min-width` for the button to account for such cases. I’ve added that in the browser’s developer tools to show how it’s meant to look:

![Image 18](https://rtlstyling.com/img/word-length-linkedin-2.png)

And here is a very similar example from Twitter:

![Image 19](https://rtlstyling.com/img/word-length-twitter.png)

Please note that the issues above on LinkedIn and Twitter have been spotted by yours truly as of the time of writing (13 December 2019).

### 4. Text Truncation [#](https://rtlstyling.com/posts/rtl-styling/#4.-text-truncation)

I once worked on a project with mixed content, and I faced an issue related to text truncation in the wrong direction. Consider the following example.

![Image 20](https://rtlstyling.com/img/text-trun.png)

The truncation for the English text is incorrect. It should be at the end of the element, not the start of it. To solve that, set the attribute `dir="auto"` on the element itself, and then the browser will automatically parse the content and decide which `dir` it is.

`<p dir="auto">  أهلاً وسهلاً بكم في المقال الذي يتحدث عن تصميم صفحات الويب للغة العربية</p><p dir="auto">  Welcome to the article that explains how to design for RTL pages.</p>`
![Image 21](https://rtlstyling.com/img/text-trun-2.png)

### 5. Picking a Bad RTL Font [#](https://rtlstyling.com/posts/rtl-styling/#5.-picking-a-bad-rtl-font)

Having an RTL version of a design doesn’t mean you can pick the system’s default font and call it a day. The font has to be picked carefully to ensure good readability. An example of this is Twitter:

![Image 22](https://rtlstyling.com/img/en-vs-ar.png)

From an Arabic speaker’s point of view, the word “تغريد” is hard to read for a few reasons:

*   The font is not good.
*   The bold weight hinders readability.
*   The word’s dots are small and really close to the letters.

I’ve mocked up a design that looks clearer:

![Image 23](https://rtlstyling.com/img/en-vs-ar-2.png)

### 6. Mixing Hindi and Arabic Numerals [#](https://rtlstyling.com/posts/rtl-styling/#6.-mixing-hindi-and-arabic-numerals)

In Arabic, there are two ways of writing numbers:

*   Hindi: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩
*   Arabic: 0 1 2 3 4 5 6 7 8 9

The numbers used in English are inherited from the Arabic ones: “0, 1, 2, 3, 4, 5, 6, 7, 8, 9”. Content that has numbers should be consistent, either Hindi or Arabic numerals.

According to Wikipedia:

> The reason the digits are more commonly known as "Arabic numerals" in Europe and the Americas is that they were introduced to Europe in the 10th century by Arabic-speakers of North Africa, who were then using the digits from Libya to Morocco.

The following mockup has a mix of Hindi and Arabic numbers. It looks inconsistent, and it should look unified with one type of numerals.

![Image 24](https://rtlstyling.com/img/ar-numbers.png)

Common Things That Might Not Work for RTL [#](https://rtlstyling.com/posts/rtl-styling/#common-things-that-might-not-work-for-rtl)
----------------------------------------------------------------------------------------------------------------------------------

### 1. Line Height [#](https://rtlstyling.com/posts/rtl-styling/#1.-line-height)

It’s common to set a different typeface for a RTL layout. In this case, test how the content looks on one and multiple lines. In the following example, the spacing between lines for the Arabic text is less than for the English one, even though both of them have the same `line-height`.

![Image 25](https://rtlstyling.com/img/line-height-1.png)

It’s important to account for this and to provide a suitable `line-height` for the Arabic content.

On Twitter, for example, there is a button with cut-off content due to an unsuitable value for `line-height`.

![Image 26](https://rtlstyling.com/img/ar-kasra.png)

Notice that in the first image, an Arabic diacritic is cut off. It’s called the “kasra”, and it’s vital for reading the word correctly. In the adjoining image, I’ve fixed the line height, and now it appears in full without being cut off.

### 2. Underlined Links [#](https://rtlstyling.com/posts/rtl-styling/#2.-underlined-links)

The default text underline looks bad when used with Arabic words. This relates to how words and letters are written in Arabic. See the following illustration:

![Image 27](https://rtlstyling.com/img/rtl-underline-1.png)

I’ve highlighted the weird areas with a red circle. The underline is kind of covering the dots of the letters. Still not clear? Here is a close-up:

![Image 28](https://rtlstyling.com/img/rtl-underline-2.png)

The dots highlighted in blue overlap with the underline. This is not good, and it makes the text hard to read. The solution is to use a custom underline with CSS.

#### 2.1. Text Decoration [#](https://rtlstyling.com/posts/rtl-styling/#2.1.-text-decoration)

~~It’s possible to change the underline’s style and color with the new `text-decoration-style` and `text-decoration-color` properties. However, it is not guaranteed to work with all typefaces and font sizes. At the time of writing, Firefox is the browser that has the best support for these properties.~~

**Update: 18 Jan 2020**

 Based on [this](https://github.com/shadeed/rtl-styling/issues/4) issue on Github, it turned out that using `text-decoration-skip-ink` property can solve the issue of dots overlapping with the underline. The default value for it is `skip`.

At the time of writing, it's not supported in Safari, old Edge (The chromium Edge supports it). Here is how it looks in Safari:

![Image 29](https://rtlstyling.com/img/text-deco-safari.png)

#### 2.2. Box Shadow [#](https://rtlstyling.com/posts/rtl-styling/#2.2.-box-shadow)

Browser support for `box-shadow` is much better than for `text-decoration`. It’s possible to detect support for one of the new `text-decoration` properties, and if the browser does not support it, then it will fall back to the `box-shadow` property.

`.link-3 {  color: #000;  text-decoration-color: rgba(21, 132, 196, 0.2);  text-decoration-style: normal;  text-underline-offset: 4px;  text-decoration-thickness: 2px;  box-shadow: inset 0 -5px 0 0 rgba(#1584c4, 0.2);}@supports (text-decoration-color: red) {  .link-3 {    box-shadow: none;  }}`
![Image 30](https://rtlstyling.com/img/text-deco-2.png)

### 3. Line Break [#](https://rtlstyling.com/posts/rtl-styling/#3.-line-break)

If your CSS has the `word-break` property, you’ll need to test it because it might break Arabic words. Consider the following:

![Image 31](https://rtlstyling.com/img/word-break.png)

The circled areas are broken Arabic words due to the effect of `word-break`. In Arabic, there is no such thing as word breaks. The letters of a word are connected with each other, so it’s not possible to break a word.

### 4. Abbreviations [#](https://rtlstyling.com/posts/rtl-styling/#4.-abbreviations)

In English, it’s common to use abbreviations for, say, the days of the week. So, “Saturday” becomes “Sat”.

![Image 32](https://rtlstyling.com/img/en-shorcuts.png)

In Arabic, this not possible at all because a word’s letters are meant to be connected.

![Image 33](https://rtlstyling.com/img/ar-shorcuts.png)

Bidirectional Icons [#](https://rtlstyling.com/posts/rtl-styling/#bidirectional-icons)
--------------------------------------------------------------------------------------

Symmetrical icons don’t need to be flipped between LTR and RTL layouts. Here are some examples:

![Image 34](https://rtlstyling.com/img/general-icons.png)

For some icons, though, it’s important to flip their direction in RTL layouts, so that they can be clearly understood by the user.

![Image 35](https://rtlstyling.com/img/bidi-icons.png)

However, there are always exceptions. As per the [material design](https://material.io/design/usability/bidirectionality.html#mirroring-elements) guidelines, if an icon represents an object that can be held with a person's right hand, then it doesn't need flipping. Here are some examples:

![Image 36](https://rtlstyling.com/img/bidi-icons-2.png)

### Media Player Icons [#](https://rtlstyling.com/posts/rtl-styling/#media-player-icons)

I went back in time for about 15 years ago when my dad got me an MP3 player. It has a play button, and its direction points to the left.

![Image 37](https://rtlstyling.com/img/mp3-player.jpeg)

Some icons are universal, and it doesn't require us to flip them. The reason is that because those playback buttons represent the direction of the tape being played, not the direction of the time. Here is how Spotify app looks in English and Arabic:

![Image 38](https://rtlstyling.com/img/spotify-icons.png)

Notice that the playback icons are not flipped since they are universal icons.

### Messaging Apps [#](https://rtlstyling.com/posts/rtl-styling/#messaging-apps)

In an [interesting](https://twitter.com/AndaristRake/status/1210508742225285120) Twitter discussion, I got asked about whether to flip the send icon of a messaging app or not. I did some research for Facebook Messenger, WhatsApp, and Twitter.

![Image 39](https://rtlstyling.com/img/message-icons-1.png)

The send icon is flipped, and in my personal opinion, this is the correct thing to do as it feels more logical for me. Adding on that, the position of the send and "+" buttons should be flipped to make it more correct. See below mockup:

![Image 40](https://rtlstyling.com/img/message-icons-1-fixed.png)

On the other hand, neither Facebook nor Twitter did flip the send icon.

![Image 41](https://rtlstyling.com/img/message-icons-2.png)

Flipping Components [#](https://rtlstyling.com/posts/rtl-styling/#flipping-components)
--------------------------------------------------------------------------------------

While working on some components, I need a way to quickly flip them. In the Sketch app, I’ll copy a component and then flip it with the “flip” command. The same functionality is available in Adobe XD and Figma.

![Image 42](https://rtlstyling.com/img/sketch-flip.png)

To see what I mean, here is a GIF showing what I did after flipping a component.

![Image 43](https://rtlstyling.com/img/sketch-flip.gif)

RTL Design Considerations [#](https://rtlstyling.com/posts/rtl-styling/#rtl-design-considerations)
--------------------------------------------------------------------------------------------------

In this section, I’ll go through the most common components and show how they should look in RTL mode.

### Button Icons [#](https://rtlstyling.com/posts/rtl-styling/#button-icons)

It’s common to have a button with an icon that opens a menu for more actions. In this case, the icon’s position should be flipped in the RTL layout.

![Image 44](https://rtlstyling.com/img/button-icons.png)

### Form Inputs [#](https://rtlstyling.com/posts/rtl-styling/#form-inputs)

Some form inputs should remain left-aligned in RTL — for example, email and mobile-number inputs.

![Image 45](https://rtlstyling.com/img/form-inputs.png)

It's worth noting that if the placeholder content is in Arabic or other RTL language, then the placeholder should be aligned to the right. Once the input is focused and the user starts typing, the alignment will be flipped to the left.

![Image 46](https://rtlstyling.com/img/form-inputs-2.png)

Thanks to [YuanHao Chiang](https://github.com/shadeed/rtl-styling/issues/6) for letting me know about the use-case above.

The arrows in the breadcrumb pattern should be flipped, too.

![Image 47](https://rtlstyling.com/img/breadcrumbs.png)

A page header component contains start and end sections. Each one of them should be flipped in RTL.

![Image 48](https://rtlstyling.com/img/page-header.png)

### Tables [#](https://rtlstyling.com/posts/rtl-styling/#tables)

A table should also be flipped.

![Image 49](https://rtlstyling.com/img/tables.png)

### Tabs [#](https://rtlstyling.com/posts/rtl-styling/#tabs)

For a tabs component in LTR, the icons would be to the left of the label. In RTL, these should be flipped.

![Image 50](https://rtlstyling.com/img/tabs.png)

### Card [#](https://rtlstyling.com/posts/rtl-styling/#card)

For a horizontal card, the order of the image and the text should be flipped in RTL.

![Image 51](https://rtlstyling.com/img/card.png)

### Toasts [#](https://rtlstyling.com/posts/rtl-styling/#toasts)

As you might expect, “close” and warning icons should flipped.

![Image 52](https://rtlstyling.com/img/toasts.png)

### Blockquotes [#](https://rtlstyling.com/posts/rtl-styling/#blockquotes)

The icon should be flipped as in the mockup below.

![Image 53](https://rtlstyling.com/img/blockquotes.png)

### Toggle switches [#](https://rtlstyling.com/posts/rtl-styling/#toggle-switches)

If we go back to the basics, a toggle switch is similar to a checkbox, so should they flip? The answer is yes.

Consider the following example.

![Image 54](https://rtlstyling.com/img/toggle-switch.png)

We have a checkbox. When the layout is RTL, it's flipped.

The same concept applies to the toggle switch. Whatever the UI was in the LTR, it should flip in RTL.

![Image 55](https://rtlstyling.com/img/toggle-switch-2.png)

CSS Logical Properties [#](https://rtlstyling.com/posts/rtl-styling/#css-logical-properties)
--------------------------------------------------------------------------------------------

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties):

> CSS Logical Properties and Values is a module of CSS introducing logical properties and values that provide the ability to control layout through logical, rather than physical, direction and dimension mappings.

Let’s take a simple example. Suppose we need to align a string of text to the left. So, we add the following:

`.page-header {  text-align: right;}`
And for the RTL:

`[dir="rtl"] .nav-item {  text-align: left;}`
What if there was a way to add one `text-align` value that changes the direction based on the page’s direction? CSS logical properties to the rescue!

`.page-header {  text-align: end;}`
By having this, the direction of `text-align` will be based on the page. [Demo](https://codepen.io/shadeed/pen/fb4e2f89ca23ab53f8b37112f027c85b?editors=1100)

To make it easy to see the difference between `start` and `end`, I’ve made the mockup below. The `start` value is equal to left in LTR, and `end` is equal to right in RTL. The same applies for `end` as well.

![Image 56](https://rtlstyling.com/img/start-end.png)

Now that you’ve got a basic idea of how it works, let’s explore more examples and use cases for CSS logical properties.

### Logical Padding [#](https://rtlstyling.com/posts/rtl-styling/#logical-padding)

![Image 57](https://rtlstyling.com/img/css-logical-padding.png)

Suppose we have a search input, with a search icon on the right. We should add padding on both the left and the right. The padding on the right would be a bit bigger to prevent the text from dropping below the search icon.

`.input--search {  padding-inline-start: 1rem;  padding-inline-end: 2.5rem;}`
### Logical Margin [#](https://rtlstyling.com/posts/rtl-styling/#logical-margin)

![Image 58](https://rtlstyling.com/img/css-logical-margin.png)

The margin on the right side of this icon needs to be logical, so we’ll use `margin-inline-start` for that.

`.page-header__avatar {  margin-inline-start: 1rem;}`
### Logical Borders [#](https://rtlstyling.com/posts/rtl-styling/#logical-borders)

![Image 59](https://rtlstyling.com/img/css-logical-border.png)

Often times, you might need to add a border to indicate that a navigation element is active. In the design above, there is a border on the left side of each navigation element. How do we make it logical?

`.nav__item {  border-inline-start: 3px solid transparent;}.nav__item.is-active {  border-color: #1e9ada;}`
### Logical Border Radius [#](https://rtlstyling.com/posts/rtl-styling/#logical-border-radius)

![Image 60](https://rtlstyling.com/img/css-logical-border-radius.png)

In the design above, the navigation element’s background has a border radius only for the top-right and bottom-right corners. In order to do that logically, we use the following:

`.nav__item {  border-start-end-radius: 30px;  border-end-end-radius: 30px;  background-color: transparent;}.nav__item.is-active {  background-color: #ecf6fb;}`
### Logical Properties Cheat Sheet [#](https://rtlstyling.com/posts/rtl-styling/#logical-properties-cheat-sheet)

When in doubt about the logical equivalent of a directional CSS property, use the cheat sheet below. Please note that the properties included are limited to what is useful for LRT and RTL. I made it based on a great [article](https://adrianroselli.com/2019/11/css-logical-properties.html) by Adrian Roselli.

Adding on that, Adrian created a demo that makes it easy to understand the difference between a logical and a directional CSS property.

### Browser Support [#](https://rtlstyling.com/posts/rtl-styling/#browser-support)

Browser support is quite good for `padding`, `margin`, and `text-align`. However, it’s not good for the border-radius properties. Here are the support tables from [Can I Use](https://caniuse.com/):

![Image 61: Support for CSS logical properties from Can I Use website](https://rtlstyling.com/img/caniuse-css-logical.png)

![Image 62: Support for CSS logical properties from Can I Use website](https://rtlstyling.com/img/caniuse-css-logical-2.png)

Even though support is not perfect (and it won’t ever be perfect), I advise you to use CSS logical properties with fallbacks. For example:

`.input--search {  padding-left: 1rem;  padding-right: 2.5rem;  padding-inline-start: 1rem;  padding-inline-end: 2.5rem;}`
Also, you can use the [PostCSS Logical](https://github.com/csstools/postcss-logical) plugin, which adds a fallback for each logical property used.

CSS Naming Conventions [#](https://rtlstyling.com/posts/rtl-styling/#css-naming-conventions)
--------------------------------------------------------------------------------------------

In general, avoid giving CSS classes names that are tied to their elements. Use names that can be extracted to reusable components. Consider the following:

`<div class="c-section">  <p><a href="#" class="see-link">See more</a></p></div><div class="c-section">  <p><a href="#" class="see-link">Learn more</a></p></div>`
In both sections, the links are the same but their labels are different. In the second section, `see-link` doesn’t make sense. A good name might be `c-link`. The `c` stands for component, which I learned from the ITCSS framework.

Now that you’ve got the idea, we can apply it to RTL styling as well. The design mockup below has a section with two children.

![Image 63](https://rtlstyling.com/img/css-naming.png)

Instead of giving the elements presentational names, like `.c-page-header__left` and `.c-page-header__right`, I’ve named them `.c-page-header__start` and `.c-page-header__end`. This is more future-proof and doesn’t assume that the website is only LTR or only RTL.

To my knowledge, the vertical scrollbar direction inside a container in CSS changes based on the page direction. For an RTL layout, the scrollbar direction is on the left, and for LTR, it's on the right.

Consider the below figure.

![Image 64](https://rtlstyling.com/img/scroll-bar.png)

However, for operating systems, the browser's scrollbar doesn't change and it stays on the right side no matter the OS language. But for the operating system itself, the scrollbar changes depending on its language.

Automation Tools [#](https://rtlstyling.com/posts/rtl-styling/#automation-tools)
--------------------------------------------------------------------------------

Great tools exist to make our job easier when we need to flip a design from LTR to RTL.

### 1. Bi-App-Sass [#](https://rtlstyling.com/posts/rtl-styling/#1.-bi-app-sass)

[Bi-App-Sass](https://github.com/anasnakawa/bi-app-sass) by Anas Nakawa lets you write style sheets once, and then it compiles them to two different style sheets, one for LTR and the other for RTL.

This tool would be useful for a large project. The result would be multiple style sheets for each language direction. Consider the following:

`.elem {  display: flex;  @include margin-left(10px);  @include border-right(2px solid #000);}`
The resulting CSS would be this:

`app-ltr.css`

`.elem {  display: flex;  margin-left: 10px;  border-right: 2px solid #000;}`
`app-rtl.css`

`.elem {  display: flex;  margin-right: 10px;  border-left: 2px solid #000;}`
Note, however, that the last commit in the GitHub repository was four years ago (November 2015).

### 2. RTLCSS [#](https://rtlstyling.com/posts/rtl-styling/#2.-rtlcss)

[RTLCSS](https://rtlcss.com/) by Mohammad Younes is a framework for converting LTR style sheets to RTL.

The difference with this tool is that it only runs on the build version of a CSS file. For example, if you have a project with 50+ Sass components, RTLCSS will come in handy for parsing the compiled CSS file and creating an RTL version of it.

Practical Examples [#](https://rtlstyling.com/posts/rtl-styling/#practical-examples)
------------------------------------------------------------------------------------

I’ve designed a layout specially to show you how I would approach and think about flipping it to a RTL layout.

![Image 65](https://rtlstyling.com/img/blog.png)

Let’s start with the header component. To code it properly, I’ve outlined a general skeleton. Notice that I’ve divided the header into a main section and subsections. Also, I’ve added start and end classes for the sections.

![Image 66](https://rtlstyling.com/img/header-skeleton-1.png)

`.header__main,.header__sub {  display: flex;  justify-content: space-between;}`
And because CSS flexbox works based on the direction of the page, as explained previously in this guide, it will flip automatically for RTL.

![Image 67](https://rtlstyling.com/img/header-skeleton-2.png)

The next thing is the dividing line between the logo and navigation. At first, I thought about using `border-right`. It works but is not ideal. Using a pseudo-element would be better because it will flip based on the page’s direction.

![Image 68](https://rtlstyling.com/img/before-after.png)

`.c-brand:after {  content: "";  display: inline-block;  vertical-align: middle;  width: 3px;  height: 38px;  border-radius: 5px;  background: #e4e4e4;  margin-inline-start: 1.25rem;}`
Here is the result so far:

![Image 69](https://rtlstyling.com/img/header-initial.png)

Next, I’ll work on the topics component (the one in the subheader with labels and counters). Here is a design mockup of how the topics component should look in LTR and RTL. Notice that the placement of the counters is different.

![Image 70](https://rtlstyling.com/img/topics.png)

It might seem simple at first, but multiple declarations of padding and margin need to be handled between LTR and RTL. Here is a mockup illustrating that:

![Image 71](https://rtlstyling.com/img/topics-p-m.png)

`.topics-heading {  margin-inline-end: 1.5rem;}.topics-list {  margin-inline-end: 1rem;}.c-topic {  padding-inline-start: 0.5rem;}.c-topic:not(:last-child) {  margin-inline-end: 10px;}.c-topic__counter {  margin-inline-start: 1rem;}`
As you can see, I’ve used CSS logical properties, instead of `left` and `right`.

The next step is the “See All” link. Notice the arrow at the end of it. Below are its requirements:

*   The arrow’s color should change on hover.
*   The arrow should animate to the right on hover.

I chose to use inline SVG for this purpose. When I added a `translate` animation to the arrow, I thought about RTL. There is no logical property for this, and I needed to explore other solutions. One solution I came up with was to animate the margins.

`.c-link svg {  margin-inline-start: 4px;  transition: 0.15s ease-in;}.c-link:hover svg {  margin-inline-start: 8px;}`
But animating margins is not good for performance, although it works. The other solution is to detect the page’s direction, and set the `translate` declaration based on that.

`.c-link:hover svg {  transform: translateX(6px);}/* I’m using dir=rtl in the header for the purpose of clarity. It should be added to the root element. */.c-header[dir="rtl"] .c-link svg {  transform: scaleX(-1);}.c-header[dir="rtl"] .c-link:hover svg {  transform: scaleX(-1) translateX(6px);}`
Notice that for RTL, I’ve added `scaleX(-1)` to flip the arrow icon horizontally. You could use `rotate(180deg)` instead, but the scale is more straightforward to me.

![Image 72](https://rtlstyling.com/img/see-all.gif)

Next is the search input. Here are the requirements:

*   A search icon must appear at the end of the input element.
*   The placement of the search icon must be dynamic.

`.c-input--search {  background-image: url("data:image/svg+xml...");  background-position: right 6px center;}.c-header[dir="rtl"] .c-input--search {  /* We replace the original icon with a flipped one. */  background-image: url("data:image/svg+xml...");  background-position: right 6px center;}`
Also, when the user types in the search box, the text shouldn’t slide under the icon. To avoid this, add padding on either the right or left side.

![Image 73](https://rtlstyling.com/img/input-padding.png)

`.c-input {  padding-inline-end: 32px;}`
Here is the result thus far for both LTR and RTL:

![Image 74](https://rtlstyling.com/img/header-current-result.png)

Next is the mobile menu. I will use a hamburger icon to indicate the menu. The placement of the icon will change between LTR and RTL. The same goes for the direction of the `translate` animation.

![Image 75](https://rtlstyling.com/img/header-menu-mobile.png)

Check out the [demo](https://codepen.io/shadeed/pen/aa0c9f6c73fe62d206b674c52dc4426e?editors=0100) on CodePen.

Thanks [#](https://rtlstyling.com/posts/rtl-styling/#thanks)
------------------------------------------------------------

Special thanks to my wife, [Kholoud](https://twitter.com/kholoud840), for her continuous support and for reading the guide multiple times. Thanks to both [Adebiyi Adedotun Lukman](https://twitter.com/AdebiyiAL) and [Šime Vidas](https://twitter.com/simevidas) for their amazing feedback.

Resources and Related Articles [#](https://rtlstyling.com/posts/rtl-styling/#resources-and-related-articles)
------------------------------------------------------------------------------------------------------------

*   [(Right to Left (The Mirror World](https://labs.spotify.com/2019/04/15/right-to-left-the-mirror-world/)
*   [Let’s Talk About RTL](https://alfy.me/2014/07/26/lets-talk-about-rtl.html)
*   [Basic Concepts of Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
*   [Basic Concepts of Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
*   [Right-to-Left Development: Tips and Tricks](https://steelkiwi.com/blog/right-left-development-tips-and-tricks/)
*   [Arabic Numerals](https://en.wikipedia.org/wiki/Arabic_numerals)

Do you like my content? You can support and [buy me a coffee](https://ko-fi.com/ahmadshadeed). Thank you so much!