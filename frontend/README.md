# TradeIt frontend

An English, build-free HTML/CSS/JavaScript handoff of the existing TradeIt design. The original forest-green palette, warm backgrounds, photography, typography, cards and responsive layouts are retained.

## Open the project

1. Extract the entire ZIP. Keep its folders together.
2. Open **START-HERE.html** for the developer guide, or **index.html** for the application.
3. Use **All screens** in the application to open any of the 35 screens.

No framework, build command, API key or runtime package installation is needed. All fonts, icons and images are included. A browser may restrict local storage on `file://` pages; use the optional local server if you need consistent persistence or plan to connect an API.

From the extracted project folder, optionally run:

```bash
python3 -m http.server 8000
```

On Windows, `py -m http.server 8000` is an alternative. Open `http://localhost:8000`. The files also work on any ordinary static web host. Hash routes such as `index.html#/messages` do not need server rewrite rules.

## What is included

- 35 connected entry screens, with additional listing-wizard steps, tabs and dialogs.
- English interface text, code comments, descriptive filenames and documentation.
- Reusable layout, form, listing, rental and support components.
- Working local interactions for search, saved listings, booking calculations, listing drafts, messages, reviews, profile edits and support requests.
- Original bundled assets and responsive styles for desktop, tablet and mobile.
- Eight automated DOM integration tests and a manual browser review checklist.

## Where to work

| Location | Responsibility |
| --- | --- |
| `index.html` | Document metadata, stylesheet links, ordered scripts and the three DOM mount points. |
| `styles/fonts.css` | Local DM Sans and Manrope font declarations. |
| `styles/styles.css` | Design tokens, base styles, components and page layouts. |
| `styles/responsive.css` | Responsive overrides and reduced-motion preference. |
| `scripts/config.js` | Storage key, locale, sample fee and screen-directory visibility. |
| `scripts/pages/` | Clearly named HTML-rendering functions for every screen. |
| `scripts/components/` | Reusable HTML fragments: layouts, cards, icons, inputs and rental widgets. |
| `scripts/data/` | Sample listings, categories, navigation, FAQs and administration records. |
| `scripts/core/` | State, routing, event handlers, dialogs, formatting and DOM utilities. |
| `scripts/app.js` | Initial render and hash-change listener. |
| `assets/` | Local images, icon and descriptively named font files. |
| `docs/` | Screen map, architecture, design system, backend handoff and review checklist. |
| `tests/frontend.test.cjs` | Optional repeatable DOM integration checks. |

This is one application with 35 routes, rather than 35 duplicated HTML documents. Each page file returns a readable HTML template. Shared headers, sidebars and controls live in `scripts/components/` so a single edit updates all screens.

## Start with these documents

- [Screen map](docs/SCREEN-MAP.md): every route, its purpose and its source file.
- [Architecture](docs/ARCHITECTURE.md): script order, naming, state and event flow.
- [Design system](docs/DESIGN-SYSTEM.md): colours, typography, components and breakpoints.
- [Backend integration](docs/BACKEND-INTEGRATION.md): integration points and proposed contracts.
- [Validation](docs/VALIDATION.md): completed checks and remaining browser review.
- [Asset credits](docs/ASSET-CREDITS.md): original asset sources and font notices.

## Data and service boundary

The interface currently runs with sample data in the browser. It does not authenticate accounts, charge cards, verify identity, send emails, deliver messages to other users or run AI checks. The map is an illustration with external location links. Server connections belong in the integration layer described in the backend guide.

Saved items, messages, created listings, profile edits, the current booking, support requests and reviews use local storage where available. Uploaded image previews and several administration controls last only for the current session. Sample dates, transaction amounts and activity history are fixtures. See the architecture document for the exact persistence boundary.

## Optional tests

The application itself has no runtime dependencies. Only the test runner uses jsdom:

```bash
npm install
npm test
```

The tests execute the actual ordered application scripts in a DOM environment. They do not replace a final visual check in a real browser.
