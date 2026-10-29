# Architecture and editing guide

## Runtime model

`index.html` loads classic scripts with `defer`, in a deliberate order. They share a global lexical scope. There is no bundler, transpilation, framework or network dependency. Keep unique top-level names and preserve script order when adding files. Do not add `async`, which would allow scripts to execute out of order.

The application uses hash navigation. `renderCurrentRoute()` reads the hash, calls the matching page function and writes the resulting HTML into `#app`. Every page uses either the public layout, the account layout or the authentication layout. `#modal-root` holds dialogs; `#toast` announces short status messages.

## Load order

1. Configuration and DOM/formatting helpers.
2. Icon and basic UI components.
3. Sample data and navigation definitions.
4. Application state and draft helpers.
5. Shared layout, marketplace, rental and support components.
6. All page rendering functions.
7. Dialogs, router and delegated event handlers.
8. `scripts/app.js`, which performs the first render.

Function declarations may reference a later declaration because no page is rendered until the entry point runs. Initial state reads happen immediately, so configuration must load first.

## Naming conventions

| Pattern | Meaning | Example |
| --- | --- | --- |
| `render…Page()` | Return the complete screen HTML. | `renderBookingPage(id)` |
| `render…()` | Return a reusable HTML fragment. | `renderListingCard(listing)` |
| `appState` | Current UI state and locally stored sample records. | `appState.listingStep` |
| `data-action` | Name of a delegated click action. | `data-action="save"` |
| `data-id` | Record identifier consumed by an action. | `data-id="camera"` |
| Form `id` | Selects a submit handler in `core/events.js`. | `id="checkout-form"` |
| Kebab-case filenames | Feature or page responsibility. | `payments-and-payouts.js` |

`p` commonly means a listing, `d` a listing draft, `f` a FormData object, `el` a DOM element and `n` the current wizard-step index. These local abbreviations are kept inside short functions; file and public function names describe their purpose.

## Event and state flow

A button or form event reaches a listener in `core/events.js`. The listener reads form values or `data-*` attributes, updates `appState`, optionally calls `saveLocalState()`, then rerenders the current route or opens a dialog. Delegation on `document` avoids rebinding listeners after each render.

For backend integration, replace the local mutation at that handler with an asynchronous service call. Update state from the returned server record, then render. Handle pending, validation-error and retry states at the same boundary. Page renderers should remain presentation functions.

## State and persistence

`core/state.js` defines the complete `appState` shape. Its persistence key is configured in `config.js`.

| Data | Lifetime in this handoff |
| --- | --- |
| Saved listing IDs, sent messages, created listings, profile, latest booking, created tickets, reviews | Local storage, when the browser permits it. |
| Search/filter settings, wizard progress, current tab, current conversation, rating selection | Current page session. |
| Uploaded images | Temporary browser object URLs; lost after refresh. |
| Pickup and return completion, paused listings, recorded admin outcome, notification read state | Current page session. |
| Replies, internal notes, moderation button changes, preference switches | Current rendered view; some reset when navigating away. |
| Edits to original sample listings | In-memory sample catalogue; lost after refresh. |

Created listings are visible under **My listings**, not added automatically to the discovery catalogue. Their saved records currently use a sample thumbnail, while their chosen upload is shown during the wizard. `uploads` is intentionally not serialized. Replace this with backend media IDs and durable image URLs when connecting uploads.

The local FAQ assistant matches English keywords against canned FAQ answers. The availability and verified-owner filters use fixture conditions, not live scheduling or identity checks. Dashboard totals and transaction history are illustrative records. No account role is enforced by the browser router.

## Editing a screen

1. Locate it in `SCREEN-MAP.md`.
2. Edit the HTML template in its `scripts/pages/` file.
3. Reuse existing component functions for consistent controls.
4. Find the matching class in `styles/styles.css` and its responsive overrides.
5. Add a unique `data-action` or form ID only when introducing a new interaction.
6. Extend the handler in `core/events.js`, then check the affected flow.

User-controlled text inserted into templates must pass through `escapeHtml()`. Text assigned with `textContent` is already handled as text. Use `encodeURIComponent()` for external search parameters. The shared UI helpers expect trusted markup for labels that intentionally contain icons or emphasis.

## Adding a route

Create a uniquely named `render…Page()` function in a new page file. Include its script before dialogs/router/events in `index.html`. Add the route to the switch in `renderCurrentRoute()` and to the relevant group in `data/navigation.js`. The screen count updates automatically. Add the route and purpose to `docs/screen-map.json` and `SCREEN-MAP.md`.

## Team handoff

Suggested independent areas are discovery; booking and rental lifecycle; listing management; profiles and account access; messaging and notifications; support and administration; and shared UI/integration. Agree on changes to shared components, `appState` and event names before merging. Keep credentials and production data outside this static project.
