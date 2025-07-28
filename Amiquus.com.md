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
- hvala.astro tahnk you page after successfull purchase. Consists of thank you message with suername to make it more personal and a button to the user profile
- cakalna-lista.astro with the help of the load bar, the avaliable capacities are shown. Below that there is a form which users fill in order to get notified whn the capacities are available again.
- prijava.astro login page with an option to log in using google account
- registracija.astro register page whre user can also regsiter using google account

Here's detailed description of which sections and logic each .astro file should have:


