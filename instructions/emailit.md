Authentication

You'll need to authenticate your requests to access any of the endpoints in the Emailit API. In this guide, we'll look at how authentication works. Emailit offers one way to authenticate your API requests: Bearer authentication.

Bearer authentication

With Bearer authentication, you use your api key, generated in credentials, to authenticate your HTTP requests. Here's how to authenticate using cURL:

Example request with Bearer auth

curl -X POST 'https://api.emailit.com/v1/emails' \ -H "Authorization: Bearer {api_key}" \ -H "Content-Type: application/json" \ -d $'{ "from": "Name <test@emailit.com>", "to": "acme@emailit.com", "reply_to": "support@emailit.com", "subject": "Hello World", "html": "<h1>Hello World</h1>" }'



CopyCopied!

Please don't commit your Emailit API Key to GitHub!

Was this page helpful?

Yes

No



Errors

In this guide, we will talk about what happens when something goes wrong while you work with the API. Mistakes happen, and mostly they will be yours, not ours. Let's look at some status codes and error types you might encounter.

You can tell if your request was successful by checking the status code when receiving an API response. If a response comes back unsuccessful, you can use the error type and error message to figure out what has gone wrong and do some rudimentary debugging (before contacting support).



Before reaching out to support with an error, please be aware that 99% of all reported errors are, in fact, user errors. Therefore, please carefully check your code before contacting Emailit support.

Status codes

Here is a list of the different categories of status codes returned by the Emailit API. Use these to understand if a request was successful.

Name

2xx

Description



A 2xx status code indicates a successful response.

Name

4xx

Description



A 4xx status code indicates a client error — this means it's a you problem.

Name

5xx

Description



A 5xx status code indicates a server error — you won't be seeing these.

Was this page helpful?

Yes

No



Creating a sending domain

So you can start sending emails, you need to create and verify a sending domain.

You can create any sending domain you want, for example:

example.com

mail.example.com

Do not use http:// or any protocol prefix. Just the domain name.

Adding DNS records

To verify your sending domain, you need to add two DNS records to your domain. Those records are shown on the page after you create a sending domain.

Add a TXT record for DKIM verification.

Add a TXT record for SPF verification.

Add a MX record for email feedback.

(Optional) Add a DMARC record for email authentication.

All these records are setup on a subdomain of the chosen sending domain. For example, if you choose mail.example.com as your sending domain, you need to add the records to emailit.mail.example.com.

This allows you to use the subdomain to send emails, while the root domain is used for verification and you can use it for other purposes.



Checking your records

After you add the records, you need to wait for them to be verified. You can check the verification status on the sending domain page by clicking on the "Check DNS" button. It checks all the records and shows the results. It can take up to 24 hours for the records to be verified.

Was this page helpful?

Yes

No



Creating a credential

A credential is used to authenticate your SMTP server or API requests.





Create a credential

You can create a credential on the Credentials page. You can choose two types of credentials: SMTP or API.

You cannot use the same credential for both SMTP and API.



SMTP credentials

SMTP credentials are used to authenticate your SMTP server and used as password.





API credentials

API credentials are used to authenticate your API requests. This credential is an API Key.

Was this page helpful?

Yes

No



Sending using SMTP

Emailit offers SMTP support for sending emails. This is useful if you want to send emails using an SMTP server that is not supported by the Emailit API.

1. Create and verify a sending domain

Before you can send emails using SMTP, you need to create and verify a sending domain. Learn more about creating a sending domain.

2. Create a credential

You need to create a credential with SMTP type. Learn more about creating a credential.





SMTP Configuration

To connect to our SMTP server, you need to use the following configuration:

Host: smtp.emailit.com

Port: 587

Encryption: TLS

Username: emailit

Password: {credential}

From: Any Name <{any_address}@{verified_sending_domain}> for example John Doe <john@doe.com>

Make sure to use the credential you created for the password and it type is SMTP. You also need to use the verified sending domain, otherwise the email will not be accepted.

Was this page helpful?

Yes

No



Audiences

Audiences are a core part of Emailit for Marketers On this page, we'll dive into the different audience endpoints you can use to manage audiences programmatically. We'll look at how to query, create, update, and delete audiences.

The audience model

The audience model contains all the information about your audience.

Properties

Name

id

Type

string

Description



Unique identifier for the audience.

Name

name

Type

string

Description



Name of the audience.

Name

subcribers_count

Type

integer

Description



Number of subscribers in the audience.

Name

created_at

Type

date

Description



The timestamp of when the audience was created.

Name

updated_at

Type

date

Description



The timestamp of when the audience was last updated.

GET

/v1/audiences

List all audiences

This endpoint allows you to retrieve a paginated list of all your audiences. By default, a maximum of 25 audiences are shown per page.

Optional attributes

Name

per_page

Type

integer

Description



Limit the number of audiences returned.

Name

page

Type

integer

Description



The page number to retrieve.

Name

filter[name]

Type

string

Description



Filter audiences by name.

Request

GET

/v1/audiences

curl -G https://api.emailit.com/v1/audiences \ -H 'Authorization: Bearer {api_key}' \ -H 'Content-Type: application/json' \ -d $'{ "per_page": 25, "page": 1, "filter[name]": "My Audience" }'



CopyCopied!

Response

{ "data": [ { "id": "WAz8eIbvDR60rouK", "name": "My Audience", "subscribers_count": 100, "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z" }, { "id": "hSIhXBhNe8X1d8Et" // ... } ]}



CopyCopied!

POST

/v1/audiences

Create an audience

This endpoint allows you to add a new audience to your account. To add a audience, you must provide its name.

Required attributes

Name

name

Type

string

Description



The name for the audience.

Request

POST

/v1/audiences

curl https://api.emailit.com/v1/audiences \ -H "Authorization: Bearer {api_key}" \ -H 'Content-Type: application/json' \ -d $'{ "name": "My Audience" }'



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "name": "My Audience", "subscribers_count": 0, "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

GET

/v1/audiences/:id

Retrieve an audience

This endpoint allows you to retrieve a audience by providing their id. Refer to the list at the top of this page to see which properties are included with audience objects.

Request

GET

/v1/audiences/WAz8eIbvDR60rouK

curl https://api.emailit.com/v1/audiences/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {api_key}" \ -H "Content-Type: application/json",



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "name": "My Audience", "subscribers_count": 0, "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

PUT

/v1/audiences/:id

Update an audience

This endpoint allows you to perform an update on an audience. Currently, the only attribute that can be updated on audiences is the name attribute.

Optional attributes

Name

name

Type

string

Description



The name of the audience.

Request

PUT

/v1/audiences/WAz8eIbvDR60rouK

curl -X PUT https://api.emailit.com/v1/audiences/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {token}" \ -H "Content-Type: application/json" \ -d $'{ "name": "My Audience" }'



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "name": "My Audience", "subscribers_count": 0, "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

DELETE

/v1/audiences/:id

Delete an audience

This endpoint allows you to delete an audience. There always have to be at least one audience in your account.

Request

DELETE

/v1/audiences/WAz8eIbvDR60rouK

curl -X DELETE https://api.emailit.com/v1/audiences/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {api_key}" -H "Content-Type: application/json"



CopyCopied!

POST

/v1/audiences/subscribe/:token

Subscribe to an audience

This endpoint allows you to subscribe an email address to an audience. If not in contacts, it will be added to contacts too.

You can call this endpoint from anywhere you want. To get the token you need to go to the audience page and click on "Subscribe URL" button in the top right corner.

Required attributes

Name

email

Type

string

Description



The email address to subscribe.

Name

first_name

Type

string

Description



The first name of the subscriber.

Name

last_name

Type

string

Description



The last name of the subscriber.

Name

custom_fields



Type

object



Description

Custom fields to add to the subscriber.

Example: {'custom_field_key':'custom_field_value'}

Request

POST

/v1/audiences/subscribe/:token

curl -X POST https://api.emailit.com/v1/audiences/subscribe/:token \ -H "Authorization: Bearer {api_key}" -H "Content-Type: application/json" -d $'{ "email": "test@emailit.com", "first_name": "John", "last_name": "Doe", "custom_fields": {"custom_field_key": "custom_field_value"} }'



CopyCopied!

Was this page helpful?

Yes

No



Credentials

Credentials are a core part of Emailit for Marketers On this page, we'll dive into the different audience endpoints you can use to manage audiences programmatically. We'll look at how to query, create, update, and delete audiences.

The credential model

The credential model contains all the information about your credential.

Properties

Name

id

Type

string

Description



Unique identifier for the credential.

Name

name

Type

string

Description



Name of the credential.

Name

type

Type

string

Description



Type of the credential. Valid are smtp or api.

Name

key

Type

string

Description



The key of the credential. Only visible in creation.

Name

last_used_at

Type

date

Description



The timestamp of when the credential was last used.

Name

created_at

Type

date

Description



The timestamp of when the credential was created.

Name

updated_at

Type

date

Description



The timestamp of when the credential was last updated.

GET

/v1/credentials

List all credentials

This endpoint allows you to retrieve a paginated list of all your credentials. By default, a maximum of 25 credentials are shown per page.

Optional attributes

Name

per_page

Type

integer

Description



Limit the number of credentials returned.

Name

page

Type

integer

Description



The page number to retrieve.

Name

filter[name]

Type

string

Description



Filter credentials by name.

Name

filter[type]

Type

string

Description



Filter credentials by type.

Request

GET

/v1/credentials

curl -G https://api.emailit.com/v1/credentials \ -H 'Authorization: Bearer {api_key}' \ -H 'Content-Type: application/json' \ -d $'{ "per_page": 25, "page": 1, "filter[name]": "My Credential", "filter[type]": "smtp" }'



CopyCopied!

Response

{ "data": [ { "id": "WAz8eIbvDR60rouK", "name": "My Credential", "type": "smtp", "last_used_at": "2024-09-26T08:16:03.000000Z", "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z" }, { "id": "hSIhXBhNe8X1d8Et" // ... } ]}



CopyCopied!

POST

/v1/credentials

Create an credential

This endpoint allows you to add a new credential to your account. To add a credential, you must provide its name and type.

Required attributes

Name

name

Type

string

Description



The name for the credential.

Name

type

Type

string

Description



The type of the credential. Valid are smtp or api.

Request

POST

/v1/credentials

curl https://api.emailit.com/v1/credentials \ -H "Authorization: Bearer {api_key}" \ -H 'Content-Type: application/json' \ -d $'{ "name": "My Credential", "type": "smtp" }'



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "name": "My Credential", "type": "smtp", "key": "em_1234567890", "last_used_at": "2024-09-26T08:16:03.000000Z", "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

GET

/v1/credentials/:id

Retrieve an credential

This endpoint allows you to retrieve a credential by providing their id. Refer to the list at the top of this page to see which properties are included with credential objects.

Request

GET

/v1/credentials/WAz8eIbvDR60rouK

curl https://api.emailit.com/v1/credentials/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {api_key}" \ -H "Content-Type: application/json"



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "name": "My Credential", "type": "smtp", "last_used_at": "2024-09-26T08:16:03.000000Z", "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

PUT

/v1/credentials/:id

Update an credential

This endpoint allows you to perform an update on an credential. Currently, the only attribute that can be updated on credentials is the name attribute.

Optional attributes

Name

name

Type

string

Description



The name of the credential.

Request

PUT

/v1/credentials/WAz8eIbvDR60rouK

curl -X PUT https://api.emailit.com/v1/credentials/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {token}" \ -H "Content-Type: application/json" \ -d $'{ "name": "My Credential" }'



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "name": "My Credential", "type": "smtp", "last_used_at": "2024-09-26T08:16:03.000000Z", "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

DELETE

/v1/credentials/:id



Delete an credential

This endpoint allows you to delete an credential. There always have to be at least one credential in your account.

Request

DELETE

/v1/credentials/WAz8eIbvDR60rouK

curl -X DELETE https://api.emailit.com/v1/credentials/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {api_key}" -H "Content-Type: application/json"



CopyCopied!

Was this page helpful?

Yes

No



Emails

Email Messages are the core part of our API. These endpoints allow you to send emails and retrieve them.



POST

/v1/emails

Send Emails

This endpoint allows you to send email messages.

Required attributes

Name

from

Type

string

Description



From email address. Example: Name <test@emailit.com> or test@emailit.com.

Name

to

Type

string

Description



To email address. Example: acme@emailit.com.

Name

reply_to

Type

string

Description



Reply to email address. Example: support@emailit.com.

Name

subject

Type

string

Description



Subject line

Name

html

Type

string

Description



HTML content part

Name

text

Type

string

Description



Text content part

Name

attachments[]

Type

array

Description



Included files with the email message.

Name

attachments[][filename]

Type

string

Description



Attachment file name my_file.pdf.

Name

attachments[][content]

Type

string

Description



Attachment file content as string.

Name

attachments[][content_type]

Type

string

Description



Attachment file content as string.

Name

headers



Type

object



Description

Included headers within the message.

Example: {'header name': 'header value'}

Request

POST

/v1/emails

curl -X POST 'https://api.emailit.com/v1/emails' \ -H "Authorization: Bearer {api_key}" \ -H "Content-Type: application/json" \ -d $'{ "from": "Name <test@emailit.com>", "to": "acme@emailit.com", "reply_to": "support@emailit.com", "subject": "Hello World", "html": "<h1>Hello World</h1>" }'



CopyCopied!

Was this page helpful?

Yes

No



Events

Events are a core part of Emailit. On this page, we'll dive into the different event endpoints you can use to manage events programmatically. We'll look at how to query events.

The event model

The event model contains all the information about your event.

Properties

Name

id

Type

string

Description



Unique identifier for the event.

Name

uuid

Type

string

Description



UUID of the event.

Name

type

Type

string

Description



Type of the event.

Name

data

Type

object

Description



Data of the event.

Name

created_at

Type

date

Description



The timestamp of when the event was created.

Name

updated_at

Type

date

Description



The timestamp of when the event was last updated.

GET

/v1/events

List all events

This endpoint allows you to retrieve a paginated list of all your events. By default, a maximum of 25 events are shown per page.

Optional attributes

Name

per_page

Type

integer

Description



Limit the number of events returned.

Name

page

Type

integer

Description



The page number to retrieve.

Name

filter[type]

Type

string

Description



Filter events by type.

Request

GET

/v1/events

curl -G https://api.emailit.com/v1/events \ -H 'Authorization: Bearer {api_key}' \ -H 'Content-Type: application/json' \ -d $'{ "per_page": 25, "page": 1, "filter[type]": "email.delivery.sent", }'



CopyCopied!

Response

{ "data": [ { "id": "WAz8eIbvDR60rouK", "uuid": "123e4567-e89b-12d3-a456-426614174000", "type": "email.delivery.sent", "data": { }, "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z" } ]}



CopyCopied!

GET

/v1/events/:id

Retrieve an event

This endpoint allows you to retrieve an event by providing their id. Refer to the list at the top of this page to see which properties are included with event objects.

Request

GET

/v1/events/WAz8eIbvDR60rouK

curl https://api.emailit.com/v1/events/WAz8eIbvDR60rouK \ -H "Authorization: Bearer {api_key}" \ -H "Content-Type: application/json"



CopyCopied!

Response

{ "id": "WAz8eIbvDR60rouK", "uuid": "123e4567-e89b-12d3-a456-426614174000", "type": "email.delivery.sent", "data": { }, "created_at": "2024-09-26T08:16:03.000000Z", "updated_at": "2024-09-26T08:16:03.000000Z"}



CopyCopied!

Was this page helpful?

Yes

No



Webhooks

In this guide, we will look at how to register and consume webhooks to integrate your app with Emailit. With webhooks, your app can know when something happens in Emailit, such as someone sending an email or adding a contact.

Registering webhooks

To register a new webhook, you need to have a URL in your app that Emailit can call. You can configure a new webhook from the Emailit dashboard under Webhooks. Give your webhook a name, pick the events you want to listen for, and add your URL.

Now, whenever something of interest happens in your app, a webhook is fired off by Emailit. In the next section, we'll look at how to consume webhooks.



Consuming webhooks

When your app receives a webhook request from Emailit, check the type attribute to see what event caused it. The first part of the event type will tell you the payload type, e.g., a email, delivery, etc.

Example webhook payload

{ "event_id": "a056V7R7NmNRjl70", "type": "email.delivery.sent", "object": { "id": "WAz8eIbvDR60rouK" // ... }}



CopyCopied!

Was this page helpful?

Yes

No



Event Types

List of all event types that Emailit can fire off and its payloads.



Email Delivery

Email delivery event is fired off when an email is being sent. There are 7 possible statuses.

JSON payload

{ "webhook_request_id": "1234567890", "event_id": "1234567890", "type": "email.delivery.sent", "object": { "email": { "id": 3131351548, "token": "a654h0s56dh4a06", "type": "outgoing", "message_id": "<a654h0s56dh4a06@emailit.dev>", "to": "me@emailit.dev", "from": "support@emailit.dev", "subject": "Welcome to Emailit", "timestamp": "1727431822.8817", "spam_status": 0, "tag": null }, "status": "sent", "details": "...", "sent_with_ssl": true, "timestamp": 1727431826.041502, "time": 0.56 }}



CopyCopied!

Name

email.delivery.sent

Description



Email has been sent to the recipient.

Name

email.delivery.hardfail

Description



Email could not be delivered to the recipient.

Name

email.delivery.softfail

Description



Email could not be temporarily delivered and will be retried later.

Name

email.delivery.bounce

Description



Email could not be delivered.

Name

email.delivery.error

Description



System error has occured while trying to send this email. Will retry later.

Name

email.delivery.held

Description



Email has been held, your account could be blocked, limited or under review.

Name

email.delivery.delayed

Description



Email has been delayed, likely due to your rate limit.

Email Opens

Email load event is fired off when an email is being loaded.

JSON payload

{ "webhook_request_id": "1234567890", "event_id": "1234567890", "type": "email.loaded", "object": { "email": { "id": 3131351548, "token": "a654h0s56dh4a06", "type": "outgoing", "message_id": "<a654h0s56dh4a06@emailit.dev>", "to": "me@emailit.dev", "from": "support@emailit.dev", "subject": "Welcome to Emailit", "timestamp": "1727431822.8817", "spam_status": 0, "tag": null }, "ip_address": "127.0.0.1", "country": "...", "city": "...", "user_agent": "...", "timestamp": 1727431826.041502 }}



CopyCopied!

Name

email.loaded

Description



Email has been loaded.

Email Link Clicks

Email link click event is fired off when an email link is clicked.

JSON payload

{ "webhook_request_id": "1234567890", "event_id": "1234567890", "type": "email.link.clicked", "object": { "email": { "id": 3131351548, "token": "a654h0s56dh4a06", "type": "outgoing", "message_id": "<a654h0s56dh4a06@emailit.dev>", "to": "me@emailit.dev", "from": "support@emailit.dev", "subject": "Welcome to Emailit", "timestamp": "1727431822.8817", "spam_status": 0, "tag": null }, "link": { "id": 1234567890, "url": "https://emailit.dev", }, "ip_address": "127.0.0.1", "country": "...", "city": "...", "user_agent": "...", "timestamp": 1727431826.041502 }}



CopyCopied!

Name

email.link.clicked

Description



Email link has been clicked.

Was this page helpful?

Yes

No