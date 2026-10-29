# Validation

Validated on 14 October 2026.

## Automated checks completed

Eight integration tests passed against the actual ordered application scripts:

1. All 35 primary routes, four listing wizard states, four settings panels and registration render with a main landmark, unique element IDs, existing local images, alternative text, valid label targets and named links/buttons.
2. English catalogue search, filter reset, saved-item removal and saved-item persistence work.
3. Reversed dates are rejected; a three-day camera booking produces a €75.00 subtotal, €7.50 fee and €82.50 total; accepted terms permit confirmation.
4. The four-step listing editor requires a photo, creates a local record and opens the existing record for editing.
5. Message text containing HTML stays text and is persisted without becoming an executable element.
6. Return confirmation requires photo evidence and all checklist confirmations; the subsequent review saves its rating.
7. Support request content and a selected admin outcome are retained by their local flows.
8. The screen directory contains 35 entries, Escape closes its dialog and the skip link focuses the page content without changing the route.

The checks use jsdom and do not evaluate physical layout. A real-browser visual pass was not available in the export environment. The original responsive styles were preserved.

## Manual browser review

| Check | Suggested coverage |
| --- | --- |
| Layout | 1440px desktop, 1024px tablet, 768px portrait and 390px phone widths. |
| Primary pages | Home, exploration, listing details, checkout, dashboard, messages and admin case. |
| Interaction | Keyboard-only navigation; labels, focus rings, dialogs and Escape; browser Back/Forward. |
| Forms | Required fields, date changes, long titles/descriptions, upload previews and empty search. |
| Accessibility | 200% zoom, reduced motion, contrast and a screen-reader pass. |
| Storage | Reload after saving a favourite/profile; also test when browser storage is unavailable. |
| Hosting | Open a direct hash link and verify every local font, image, stylesheet and script loads. |

Run the automated suite after changing routing, event handlers, storage or the booking calculator. Purely decorative changes usually need a targeted browser review.
