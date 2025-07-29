Amiquus is a web application designed to notify users in real time about new car listings that match their specific criteria.
It monitors leading platforms for new and used vehicle listings, with additional platforms being added continuously.

Users can set detailed filters based on the type of vehicles they are interested in.
The monthly subscription starts at $99, with the final price depending on the number of platforms tracked and the selected monitoring frequency.

When a vehicle matching the user's criteria is found, Amiquus sends an instant Telegram notification that includes a photo of the vehicle and key details such as price, mileage, location, and contact phone number.

The service is particularly valued by individuals working in the used car dealership industry, where desirable listings at competitive prices are rare and competition is high.
Being the first to respond to a good listing can be the difference between profit and loss.
Amiquus automates the search process, removing the need to manually refresh multiple car listing platforms.

Subscriptions can be paused or canceled at any time.
Due to high demand and a focus on keeping users ahead of the competition, the number of active Amiquus slots is intentionally limited.

Amiquus.com project's file structure:
Every country code named fodler (/si, /hr, /en,...) contains the following sub-folders:
- index.astro (homepage)
- [EEATSlog].astro (for EEAT pages)
- /avtorji-in-uredniki/[authorSlug].astro (it will be only one - made up "seeker")
- uporabniski-profil.astro user can see the number of subscriptions, their name, email, telegram username,... on the left there are section: settings, payment methods, log out option. On the right (2/3 of the screen) there are two sections/tabs: one to edit payment methods and one to see all subsritpions and their status. Each subscription can be modified, paused, deleted,...
- vzpostavite-obvestila.astro page with the order form. If user is not logged in, they are first redirected to the login/register page. If there are no available capacities, users are redirected to the waitlist page.
- stran-za-placilo.astro checkout page where user sees the details of the order, inserts his/hers card details, confirms that they agree with monthly subscriptions and terms and conditions.
- hvala.astro thank you page after successfull purchase. Consists of thank you message with suername to make it more personal and a button to the user profile
- cakalna-lista.astro with the help of the load bar, the avaliable capacities are shown. Below that there is a form which users fill in order to get notified whn the capacities are available again.
- prijava.astro login page with an option to log in using google account
- registracija.astro register page whre user can also regsiter using google account

Here's detailed description of which sections and logic each .astro file should have:

- src/pages/si/index.astro
    - this is a homepage for Amiquus.com. It is made of a hero section, how it works section, subscription availability section, features section, faq section. Call to action button ("Setup the alerts") is placed in the header and after each section except the faq section.

- src/pages/si/[EEATSlug].astro
    - the same as in EU Signal

- src/pages/si/avtorji-in-uredniki/[authorSlug].astro
    - profile image, social media icons, a short description. Amiqqus Seeker is a made up (Ro)bot who is a fictional owner of Amiquus.com.

- src/pages/si/uporabniski-profil.astro
    - here user can manage his subscriptions, payment methods and general settings. On the left hand side there is a dashboard.On top of it is the username and below it an email. Then there are the following sections:
        - subscriptions - a list of all subscriptions (active and paused). When user clicks on an individual subscription, he can see its details (selected car filters, price, status (active/paused)) and can edit it - change status, filters deletes it. If there are no subscriptions, there is a sta button leading to the vzpostavite-obvestila.astro page. 
        - payment methods - user sees all payment methods (only credit cards) and can add new ones, remove any one,... On top is the primary payment card. User can change the primary one.
        - general settings - user can change their email and name
        - log out - user is logged out and redirected to the homepage

- src/pages/si/vzpostavite-obvestila.astro
    - user can reach it only if they are logged in, otherwise they are redirected to the login page. It contains an order form: user selects a brand, model, price range,... If facebook marketplace is selected instrictions on how to get the search url appear (also in a video form). Price is calculated based on the number of selected websites and selected scrapping frequency. User has to then insert their telegram username and are instructed to send a simple "Hi!" message to our Telegram bot, which they have to confirm by clicking a radio button below the form. Endi price with brakdown of each contribution is displayed below, together with a cehckbox that the user agress that the subscription means monthly payments. Then there is a "Checkout" button leading to the checkout page.

- src/pages/si/stran-za-placilo.astro checkout page where user sees the details of the order, inserts his/hers card details and clicks on the "Pay" button. After successful payment user is redirected to the hvala.astro page.

- src/pages/si/hvala.astro 
    - thank you page after successfull purchase. Consists of thank you message with username to make it more personal and a button leading to the user profile page

- src/pages/si/cakalna-lista.astro 
    - with the help of the load bar, the avaliable capacities are shown. Below that there is a form which users fill in order to get notified when the capacities are available again.

- src/pages/si/prijava.astro login page with an option to log in using google account. Also a link to the register page is present.

- src/pages/si/registracija.astro register page where user can also register using google account. Also a link to the login is present.