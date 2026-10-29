/**
 * @file scripts/pages/listing-details.js
 * Page template: listing details. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the listing details screen using the shared TradeIt design system.
 * @param {*} id See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderListingDetailsPage(id) {
  const p = findListing(id);
  return renderPublicLayout(
    /* HTML */ `<div class="breadcrumbs">
        <a href="#/explore">Explore</a>${renderIcon("chevron")}<a
          href="#/explore"
          data-category="${p.category}"
          >${p.category}</a
        >${renderIcon("chevron")}<span>${p.name}</span>
      </div>
      <div class="gallery">
        <img src="assets/images/${p.img}" class="gallery-main" alt="${p.name}" />
        <div class="gallery-side">
          <img src="assets/images/${p.img}" alt="The listed item" style="object-position:65% 60%" />
          <div class="gallery-last">
            <img
              src="assets/images/${p.img}"
              alt="Equipment detail"
              style="object-position:40% 80%;transform:scale(1.3)"
            />${renderButton("gallery", "View photo", "image", "btn small light", `data-id="${p.id}"`)}
          </div>
        </div>
      </div>
      <div class="product-detail-grid">
        <div>
          <div class="detail-heading">
            <div class="between">
              <span class="eyebrow">${p.category}</span>
              <div class="flex gap8">
                ${renderButton("share", "", "link", "iconbtn", `aria-label="Copy link"`)}${renderButton("save", "", "heart", `iconbtn save ${appState.saved.includes(p.id) ? "saved" : ""}`, `data-id="${p.id}" aria-label="Save listing" aria-pressed="${appState.saved.includes(p.id)}"`)}
              </div>
            </div>
            <h1 class="mt12">${p.name}</h1>
            <div class="meta">
              <span> <span class="stars">★</span> <b>${p.rating}</b> (${p.reviews} reviews)</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.location)}"
                target="_blank"
                rel="noopener"
                >${renderIcon("pin")} ${p.location}</a
              >
              <span>${renderIcon("shield")} Verified member</span>
            </div>
          </div>
          <div class="detail-section">
            <a href="#/host/marko" class="host-mini"
              >${renderAvatar(p.host === "Ana Horvat" ? "ana" : "marko")}
              <div>
                <h4>Shared by ${p.host}</h4>
                <p>Member since 2024 · Usually replies within an hour</p>
              </div>
              ${renderIcon("chevron")}</a
            >
          </div>
          <div class="detail-section">
            <h3>For your next great plan.</h3>
            <p>${p.desc}</p>
            <div class="grid3 mt20">
              ${p.features.map((f, i) => /* HTML */ `<div class="detail-feature">${renderIcon(["box", "check", "shield"][i])}${f}</div>`).join("")}
            </div>
          </div>
          <div class="detail-section">
            <h3>Good to know</h3>
            <div class="stack">
              <div class="flex small">
                ${renderIcon("camera")} Take condition photos at pickup and return.
              </div>
              <div class="flex small">
                ${renderIcon("calendar")} Free cancellation up to 24 hours before pickup.
              </div>
              <div class="flex small">
                ${renderIcon("pin")} Arrange the exact address after your booking is confirmed.
              </div>
            </div>
          </div>
          <div class="detail-section">
            <div class="between mb20">
              <h3 style="margin:0">Good experiences leave a mark.</h3>
              <span class="small">★ ${p.rating}</span>
            </div>
            ${renderSampleReviews()}
          </div>
          <div class="detail-section">
            <h3>In your neighbourhood</h3>
            <p class="mb20">Approximate location · ${p.location}</p>
            ${renderIllustratedMap()}
          </div>
        </div>
        <aside>
          <form id="product-booking-form" data-id="${p.id}" class="card price-card">
            <div class="between">
              <div class="main-price">${p.price} € <span>/ day</span></div>
              ${renderBadge("Available", "", "check")}
            </div>
            ${renderDateFields(appState.searchStart || "2026-10-16")}
            <div id="costs">${renderPriceBreakdown(p)}</div>
            <button class="btn wide mt20" type="submit">
              Choose your dates ${renderIcon("arrow")}
            </button>
            <p class="state-line">The owner confirms your request.</p>
            <hr />
            <a href="#/messages" class="btn light wide">${renderIcon("chat")}Send a message</a>
            <div class="notice mt20">
              ${renderIcon("shield")}
              <p>Your terms, photos and messages are available throughout the rental.</p>
            </div>
          </form>
          ${renderLink("tickets/new", "Report this listing", "flag", "link small mt20")}
        </aside>
      </div>
      <section class="section">
        ${renderSectionHeading("You might need these too", "Keep exploring things in your neighbourhood.", "explore", "Everything nearby")}
        <div class="product-grid">
          ${sampleListings
            .filter((v) => v.id !== p.id)
            .slice(0, 4)
            .map(renderListingCard)
            .join("")}
        </div>
      </section>`,
  );
}
