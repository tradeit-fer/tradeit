/**
 * @file scripts/pages/member-profile.js
 * Page template: member profile. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the member profile screen using the shared TradeIt design system.
 * @param {*} publicView See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderProfilePage(publicView = false) {
  const name = publicView
    ? "Marko Kovač"
    : escapeHtml(appState.profile.first + " " + appState.profile.last);
  const content = /* HTML */ `<div class="profile-banner"></div>
    <div class="profile-header">
      ${renderAvatar(publicView ? "marko" : "me", "large")}
      <div>
        <h1>${name}</h1>
        <p>${renderIcon("pin")} Zagreb · Member since ${publicView ? "2024." : "2025."}</p>
      </div>
      ${publicView ? renderLink("messages", "Send message", "chat", "btn light small") : renderLink("settings", "Edit profile", "edit", "btn light small")}
    </div>
    <div class="two-col mt28">
      <aside class="stack">
        <div class="card">
          <span class="eyebrow">${publicView ? "OWNER & RENTER" : "YOUR PROFILE"}</span>
          <div class="profile-facts">
            <div>
              <b>4.9</b>
              <span>Average rating</span>
            </div>
            <div>
              <b>${publicView ? "32" : "12"}</b>
              <span>Reviews</span>
            </div>
            <div>
              <b>${publicView ? "48" : "18"}</b>
              <span>Rentals</span>
            </div>
          </div>
          <h4 class="mt20">A little about me</h4>
          <p class="small mt12">
            ${publicView ? "Photography, outdoor trips and small home projects. I love things having more than one user. Get in touch if you have any questions about the equipment." : "I enjoy trying new things and sharing equipment I do not use every day. There is always time for a good agreement."}
          </p>
          <hr />
          <div class="stack">
            <div class="flex small green">${renderIcon("shield")}Identity verified</div>
            <div class="flex small green">${renderIcon("mail")}Email verified</div>
            <div class="flex small green">${renderIcon("check")}Phone number verified</div>
          </div>
          ${!publicView ? renderLink("verification", "Identity verification settings", "arrow", "link small mt20") : ""}
        </div>
      </aside>
      <section class="stack">
        <div class="card">
          <div class="between mb20">
            <h3>Community experiences</h3>
            <span class="stars small">★★★★★</span>
          </div>
          <div class="tabs">
            <button class="tab active" data-action="host-reviews">As an owner</button>
            <button class="tab" data-action="renter-reviews">As a renter</button>
          </div>
          <div id="profile-reviews">
            ${appState.reviews
              .map(
                (r) =>
                  /* HTML */ `<div class="review-block">
                    <div class="host-mini">
                      ${renderAvatar("me")}
                      <div>
                        <h4>${escapeHtml(appState.profile.first)} · camera rental</h4>
                        <p>${"★".repeat(r.rating)}</p>
                      </div>
                    </div>
                    <p>${escapeHtml(r.text)}</p>
                  </div>`,
              )
              .join("")}${renderSampleReviews()}
          </div>
        </div>
        <div>
          <div class="section-head">
            <h2 style="font-size:21px">${publicView ? "Marko's listings" : "My listings"}</h2>
            ${renderLink(publicView ? "explore" : "listings", "All listings", "arrow", "link")}
          </div>
          <div class="product-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">
            ${(publicView ? [sampleListings[0], sampleListings[2]] : [sampleListings[5], sampleListings[1]]).map(renderListingCard).join("")}
          </div>
        </div>
      </section>
    </div>`;
  return publicView
    ? renderPublicLayout(
        /* HTML */ `<div class="breadcrumbs">
            <a href="#/explore">Explore</a>${renderIcon("chevron")}<span>Owner profile</span>
          </div>
          ${content}`,
      )
    : renderAccountLayout(
        `${renderPageHeading("My profile", "Your place in a community that shares.")}${content}`,
      );
}
