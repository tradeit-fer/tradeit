# Backend integration handoff

This document proposes service contracts for the completed frontend. These endpoints are not implemented or called by this package. Choose names and payloads with your backend team before wiring the handlers.

## Integration map

| Frontend feature | Current integration point | Proposed server operation |
| --- | --- | --- |
| Discovery | `getFilteredListings()` in `core/state.js` | `GET /api/listings` with query, category, location, price, dates and sort parameters. |
| Listing detail | `findListing()` and `renderListingDetailsPage(id)` | `GET /api/listings/:id`. |
| Saved items | Click action `save` | `PUT` or `DELETE /api/me/saved/:listingId`. |
| Sign in/register/recovery | `auth-form`, `forgot-form`, `google-login` | Session creation, registration and identity-provider flows. |
| Profile | `settings-form` | `GET /api/me`, `PATCH /api/me`. |
| Availability and quote | `updateBookingPrice()` | `POST /api/rental-quotes`. |
| Booking | `checkout-form` | `POST /api/rentals` with a server-issued quote ID. |
| Accept/cancel rental | `accept-rental`, `cancel-form` | Rental transition or cancellation-request endpoint. |
| Pickup/return | `handover-form` | Condition report with rental ID, stage, checklist and uploaded photo IDs. |
| Listing creation/edit | Final step of `listing-form` | `POST /api/listings` or `PATCH /api/listings/:id`. |
| Listing photos/evidence | Change handler for `[data-upload]` | Request an upload URL, upload the file and retain a durable media ID. |
| Listing review | `ai-check` | Request/observe an asynchronous moderation job. |
| Messages | `message-form`, conversation list | Conversations/messages API, then optional realtime transport. |
| Reviews | `review-form` | `POST /api/rentals/:id/reviews`. |
| Support | `ticket-form`, `ticket-reply-form` | Create a ticket and append authorized replies. |
| Admin cases | `admin-note-form`, `admin-decision-form` | Admin-only notes and audited case decisions. |
| Listing moderation | `moderate-approve`, `moderation-form` | Admin-only approve/request-changes operation. |
| Notifications | `read-notifications` | List notifications and mark them read. |
| Payouts, tax and verification | Corresponding page renderers and dialog actions | Provider-backed status and documents from the server. |

## Record shapes

The existing sample listing fields are `id`, `name`, `category`, `img`, `price`, `deposit`, `rating`, `reviews`, `location`, `distance`, `host`, `tag`, `desc` and `features`. The editor uses `title` and `description` for its draft. Normalize those names in an adapter rather than letting each page invent its own mapping.

Suggested backend records should use stable listing, user, rental, conversation and media IDs. Prices should travel in integer minor units, with an explicit currency. Dates should use ISO date strings for calendar days; events should use ISO timestamps with timezone information. Availability must come from server inventory rather than the fixture filter.

A proposed booking request can be as small as:

```json
{
  "quoteId": "quote_returned_by_your_backend",
  "messageToOwner": "Can we arrange pickup after 10?",
  "acceptedTermsVersion": "your_terms_version"
}
```

The server quote should contain dates, daily price, rental subtotal, fees, deposit and payment status. The current 10% fee is only a frontend example set by `APP_CONFIG.platformFeeRate`; the backend must calculate the final charge.

## Where to add asynchronous calls

Add a `scripts/services/` folder for API adapters. Load it before `core/events.js`. Keep request/response handling there and retain the existing page templates for rendering.

Example shape for a future submit-handler implementation:

```js
// Illustrative integration code; not executed by this package.
async function submitBooking(form) {
  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    const rental = await rentalService.create({
      quoteId: appState.quote.id,
      messageToOwner: new FormData(form).get("message") || "",
    });
    appState.booking = mapRentalToBookingView(rental);
    navigateTo("booking-success");
  } catch (error) {
    showToast(error.userMessage || "We could not create this booking. Please try again.");
  } finally {
    submitButton.disabled = false;
  }
}
```

## Behaviours the connected application must own

- Enforce authenticated access and admin roles on the server. Hiding a navigation item does not authorize a request.
- Validate listing ownership, availability and allowed rental transitions. Return field errors to the matching form.
- Use your payment provider's hosted or tokenized controls. Sample card visuals in this package are display-only.
- Save photo evidence to persistent media storage, then reference media IDs from the rental or support record.
- Request identity-verification status from the chosen provider through your backend.
- Deliver messages and notifications through authenticated server operations; the local array is only a preview.
- Replace fixture metrics, verification labels and transactions with server records. Resolve loading, empty, forbidden and failure states before rollout.

## Useful integration order

Connect catalogue and listing detail first, then sessions/profile, listing CRUD and uploads, rental quotes/bookings, pickup/return/reviews, conversations and finally support/admin operations. Keep sample mode available in a separate environment for UI development. None of the credentials or provider secrets belong in downloadable JavaScript.
