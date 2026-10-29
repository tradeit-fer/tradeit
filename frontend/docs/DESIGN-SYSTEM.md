# Design system

The existing TradeIt visual language is retained: warm light surfaces, deep green actions, sage/lime accents, rounded cards, photography and generous spacing.

## Design tokens

Change these at the start of `styles/styles.css` to update the shared theme.

| Token | Value | Purpose |
| --- | --- | --- |
| `--ink` | `#20372f` | Main text and strong headings. |
| `--muted` | `#7a847d` | Secondary metadata and supporting text. |
| `--green` | `#184d42` | Primary actions and brand emphasis. |
| `--green2` | `#28705e` | Secondary green treatment. |
| `--lime` | `#e4efb5` | Soft accent surfaces. |
| `--bg` | `#fafbf8` | Page canvas. |
| `--line` | `#e5e9e1` | Subtle borders and dividers. |
| `--soft` | `#f0f3ec` | Secondary panels and inputs. |
| `--white` | `#ffffff` | Card and control surfaces. |
| `--orange` | `#e9a46e` | Warm decorative accent. |
| `--radius` | `18px` | Shared rounded corners. |
| `--shadow` | `0 12px 45px #243e2d09` | Soft raised-surface shadow. |

## Typography and assets

DM Sans is the body/interface family. Manrope is used for headings and brand emphasis. Both are bundled locally in `assets/fonts/`; `styles/fonts.css` maps readable filenames to their weights. The base body type is 14px with a 1.6 line height. Individual controls and mobile layouts use the original per-component sizes.

Photos live in `assets/images/`. The application icon is in `assets/icons/`. Most interface icons are inline SVG generated from the named paths in `components/icons.js`; no icon font or external icon service is required.

## Shared components

| Component or CSS family | Use |
| --- | --- |
| `renderLink`, `renderButton`, `.btn`, `.iconbtn` | Navigation, actions and icon controls. |
| `renderInputField`, `renderCheckbox`, `.field`, `.form-grid` | Consistent form labels and controls. |
| `renderBadge`, `.badge` | Status, category and trust labels. |
| `renderListingCard`, `.product-card`, `.product-grid` | Discovery and saved-item cards. |
| `renderAccountLayout`, `.app-layout`, `.sidebar`, `.mobile-nav` | Account and administration navigation. |
| `.card`, `.section-card`, `.panel`, `.notice` | Main, grouped, secondary and informational surfaces. |
| `.grid2`, `.grid3`, `.grid4`, `.two-col`, `.stack` | Reusable page composition. |
| `renderPriceBreakdown`, `.cost-row` | Rental cost, illustrative fee and deposit display. |
| `renderPhotoUploadSlots`, `.upload-grid` | Pickup, return and listing photo slots. |
| `.screen-overlay`, `.modal-panel`, `.screen-panel` | Dialog and complete-screen-directory surfaces. |

Some page-specific inline styles are retained from the source to preserve the exact composition. They can be moved into named classes during your team's normal CSS cleanup.

## Responsive behaviour

| Width / preference | Main changes |
| --- | --- |
| 1500px and above | Wider content container, larger hero and product images. |
| 1100px and below | Tighter spacing, narrower sidebars and adjusted grids. |
| 850px and below | Mobile account navigation, simplified header and stacked listing details. |
| 600px and below | Single-column forms and detail layouts, compact cards and horizontal category/chat navigation. |
| Reduced motion | Animations and transitions disabled; scroll behaviour becomes immediate. |

## Accessibility hooks

Semantic landmarks, form labels, image alternatives, visible keyboard focus, dialog focus containment, Escape-to-close, status announcements and an operational skip link are included. Icon-only rental links have explicit accessible names. The DOM tests check names and label targets across the screen inventory. Real-browser zoom, focus-order, contrast and screen-reader review remain part of final product QA.
