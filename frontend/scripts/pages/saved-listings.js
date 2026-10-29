/**
 * @file scripts/pages/saved-listings.js
 * Page template: saved listings. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the saved listings screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderSavedListingsPage() {
  const selected = sampleListings.filter((p) => appState.saved.includes(p.id));
  return renderAccountLayout(
    `${renderPageHeading("Great plans for later.", "Everything that caught your eye, together in one place.", renderBadge(`${selected.length} saved`, "gray"))}${
      selected.length
        ? /* HTML */ `<div
            class="product-grid"
            style="grid-template-columns:repeat(auto-fill,minmax(210px,1fr))"
          >
            ${selected.map(renderListingCard).join("")}
          </div>`
        : /* HTML */ `<div class="card empty">
            <div class="empty-icon">${renderIcon("heart")}</div>
            <h2>Save an idea for later.</h2>
            <p>
              Tap the heart on a listing and find it here when you are ready for your next plan.
            </p>
            ${renderLink("explore", "Start exploring", "arrow")}
          </div>`
    }`,
  );
}
