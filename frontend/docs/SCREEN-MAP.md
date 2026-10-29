# Screen map

Open any route through `index.html#/…` or the **All screens** directory. Page source files live in `scripts/pages/`.

## Discovery & booking

| Screen | Route | Page file | Purpose |
| --- | --- | --- | --- |
| Home | `#/` | `home.js` | Brand introduction, categories, featured listings and local discovery. |
| Search & filters | `#/explore` | `explore.js` | Search items, choose a category, set a price limit and sort the catalogue. |
| Explore on a map | `#/explore-map` | `explore.js` | Illustrated location view with listing pins and external Google Maps links. |
| Listing details | `#/product/camera` | `listing-details.js` | Photo gallery, owner information, reviews, dates and rental cost breakdown. |
| Booking & payment | `#/booking/camera` | `booking.js` | Review selected dates, cost, deposit, message and rental terms. |
| Booking confirmation | `#/booking-success` | `booking-confirmation.js` | Confirmation summary with next steps and links to rentals and messages. |
| How TradeIt works | `#/how` | `how-it-works.js` | Explain discovery, booking, pickup, return and sharing unused equipment. |
| Public profile & reviews | `#/host/marko` | `member-profile.js` | Public host profile, trust information, listings and member reviews. |

## Your account

| Screen | Route | Page file | Purpose |
| --- | --- | --- | --- |
| Account overview | `#/dashboard` | `dashboard.js` | Rental activity, summary cards and shortcuts for a signed-in member. |
| My rentals | `#/rentals` | `my-rentals.js` | Active rentals, sent requests, completed rentals and owner-side views. |
| Rental details | `#/rental/current` | `rental-details.js` | Rental timeline, item, owner, agreement summary and condition reports. |
| Pickup & condition photos | `#/handover` | `pickup-and-return.js` | Record pickup photos and confirm equipment and item condition. |
| Return an item | `#/return` | `pickup-and-return.js` | Record return photos, confirm the checklist and continue to a review. |
| Write a review | `#/review` | `write-review.js` | Select a star rating and write a review of the rental experience. |
| Manage listings | `#/listings` | `my-listings.js` | View owned listings, edit details and pause or reactivate a listing. |
| Create a listing | `#/new-listing` | `listing-editor.js` | Four steps: basic details, photos, price and availability, final review. |
| Edit a listing | `#/edit-listing` | `listing-editor.js` | Reuse the four-step editor with a selected listing prefilled. |
| Messages | `#/messages` | `messages.js` | Select a conversation, review its rental context and send local messages. |
| Saved listings | `#/saved` | `saved-listings.js` | View saved items and remove favourites. |
| My profile | `#/profile` | `member-profile.js` | Own profile, account facts, reviews and profile-editing shortcut. |
| Account settings | `#/settings` | `account-settings.js` | Personal details, security, notification and privacy panels. |
| Identity verification | `#/verification` | `identity-verification.js` | Personal verification status interface. |
| Payments & payouts | `#/payments` | `payments-and-payouts.js` | Rental spending, earnings, sample transactions and payout overview. |
| Notifications | `#/notifications` | `notifications.js` | Activity feed with links to the relevant rental, message or account screen. |

## Access, support & administration

| Screen | Route | Page file | Purpose |
| --- | --- | --- | --- |
| Sign in | `#/login` | `authentication.js` | Email and password, Google sign-in entry and guest navigation. |
| Create an account | `#/register` | `authentication.js` | Account registration and acceptance of terms. |
| Password recovery | `#/forgot` | `authentication.js` | Recovery email entry and a confirmation dialog. |
| Help centre | `#/support` | `help-centre.js` | Search FAQs, open the local FAQ assistant or create a support request. |
| New support request | `#/tickets/new` | `create-support-request.js` | Describe an issue, select its rental and reason, and attach evidence. |
| Request status | `#/tickets/current` | `support-request.js` | Request details, progress, conversation and a reply form. |
| Admin overview | `#/admin` | `admin-overview.js` | Platform metrics, activity and an overview of support work. |
| Manage support requests | `#/admin/tickets` | `admin-requests.js` | Search requests and filter them by status and priority. |
| Dispute review & evidence | `#/admin/ticket/TI-0248` | `admin-request-details.js` | Compare evidence, add internal notes and record a proposed outcome. |
| Listing moderation | `#/admin/listings` | `admin-listing-review.js` | Review queued listings, approve them or request changes. |
| User management | `#/admin/users` | `admin-members.js` | Search members, inspect account details and add an administration note. |

## Shared page variants

- `explore.js`: list or map mode.
- `member-profile.js`: own profile or public host profile.
- `pickup-and-return.js`: pickup or return mode.
- `listing-editor.js`: create or edit mode, each with four steps.
- `authentication.js`: sign in, registration or password recovery.
- `account-settings.js`: profile, security, notifications and privacy tabs.
- `my-rentals.js`: active rentals, sent requests, completed rentals and owner-side tabs.

Product routes also accept the sample IDs `tent`, `drill`, `bike`, `speaker`, `calculator`, `cleaner` and `workspace`. The sample router falls back to the camera for an unknown product ID. Member and rental detail routes currently demonstrate fixed records; they are not yet database lookups.
