/**
 * @file scripts/pages/home.js
 * Page template: home. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the home screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderHomePage() {
  return renderPublicLayout(
    /* HTML */ `<section class="hero">
        <div class="hero-copy">
          <div class="eyebrow">YOUR NEIGHBOURHOOD HAS IT ALL</div>
          <h1>
            More experiences.<br />
            <em>Less stuff.</em>
          </h1>
          <p>For big plans and little fixes.<br />Rent what you need, from people nearby.</p>
          ${renderLink("explore", "Find your next great plan", "arrow", "btn mt20")}
          <div class="hero-stats">
            <div class="mini-avatars">
              ${renderAvatar("marko")}${renderAvatar("ana")}<span class="avatar">LK</span>
            </div>
            <span>Things work best when we share them.</span>
          </div>
        </div>
        <div class="hero-art">
          <div class="float-note">
            <div class="icon-wrap">${renderIcon("shield")}</div>
            <div>
              <b>Good plans. Peace of mind.</b>
              <p>Everything in one place.</p>
            </div>
          </div>
          <a href="#/product/tent" class="hero-main"
            >${renderImage("camping.jpg", "A forest view from inside a tent")}
            <div class="photo-caption">
              <div>
                <b>A weekend outdoors</b>
                <span>Two-person tent</span>
              </div>
              <b>12 €<small>/day</small> </b>
            </div>
          </a>
          <a class="hero-secondary" href="#/product/camera"
            >${renderImage("camera.jpg", "Camera and lenses")}
            <div>
              <b>Capture the moment.</b>
              <span>25 €/day</span>
            </div> </a
          >
        </div>
      </section>
      ${renderSearchForm()}
      <section class="section">
        ${renderSectionHeading("For every plan you have", "Find the right thing, without buying it.")}
        <div class="category-strip">
          ${listingCategories
            .slice(1)
            .map(
              ([c, i]) =>
                /* HTML */ `<a href="#/explore" data-category="${c}" class="category-card"
                  >${renderIcon(i)}<span>${c}</span>
                </a>`,
            )
            .join("")}
        </div>
      </section>
      <section class="section">
        ${renderSectionHeading("Discover what is nearby", "A little rental for your next big plan.", "explore", "Explore everything")}
        <div class="product-grid">
          ${sampleListings.slice(0, 4).map(renderListingCard).join("")}
        </div>
      </section>
      <section class="section">${renderTrustBenefits()}</section>
      <section class="section">
        ${renderSectionHeading("Only need it sometimes?", "That is what TradeIt is for.", "explore", "Browse listings")}
        <div class="product-grid">${sampleListings.slice(4).map(renderListingCard).join("")}</div>
      </section>
      <section class="owner-banner">
        <div class="copy">
          <div class="eyebrow" style="color:#bcce9a">YOUR GEAR HAS MORE TO GIVE</div>
          <h2 class="mt12">Your equipment.<br />Their next great plan.</h2>
          <p>
            Turn the things you rarely use into extra income. Create a listing and connect with your
            neighbourhood.
          </p>
          ${renderLink("new-listing", "Start sharing", "arrow", "btn lime")}
        </div>
        ${renderImage("bike.jpg", "A bicycle ready for its next ride")}
      </section>`,
  );
}
