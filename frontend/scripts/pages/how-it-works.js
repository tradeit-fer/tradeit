/**
 * @file scripts/pages/how-it-works.js
 * Page template: how it works. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the how it works screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderHowItWorksPage() {
  return renderPublicLayout(
    /* HTML */ `<section class="help-hero mt28">
        <div class="eyebrow">GOOD THINGS GO AROUND</div>
        <h1 class="mt12">Need it for a day?<br />It does not have to be forever.</h1>
        <p>TradeIt connects people who need things with people who already have them.</p>
        ${renderLink("explore", "Explore listings", "arrow")}
      </section>
      <section class="grid3">
        <div class="card how-step">
          <div class="step-number">01</div>
          <h3>Find your next plan.</h3>
          <p>
            Explore items and services, choose your location and dates, and compare prices, terms
            and other members' experiences.
          </p>
        </div>
        <div class="card how-step">
          <div class="step-number">02</div>
          <h3>Agree on the details.</h3>
          <p>
            Send a request, exchange messages and arrange pickup. All your rental details stay
            together in your account.
          </p>
        </div>
        <div class="card how-step">
          <div class="step-number">03</div>
          <h3>Use. Return. Repeat.</h3>
          <p>
            Photograph the item before and after your rental. Share your experience after returning
            it and help the community grow.
          </p>
        </div>
      </section>
      <section class="section">${renderTrustBenefits()}</section>
      <div class="grid2">
        <div class="card">
          <span class="eyebrow">FOR RENTERS</span>
          <h2 class="mt12">Lower costs.<br />More possibilities.</h2>
          <p class="small mt20">
            From a calculator for one exam to a camera for a trip. Use what you need without a
            long-term commitment.
          </p>
          ${renderLink("explore", "Find an item", "arrow", "link mt20")}
        </div>
        <div class="card" style="background:#edf2e4">
          <span class="eyebrow">FOR OWNERS</span>
          <h2 class="mt12">Give your things<br />a new purpose.</h2>
          <p class="small mt20">
            Add photos, set a price and choose availability. Review requests and manage every rental
            in one place.
          </p>
          ${renderLink("new-listing", "List an item", "arrow", "link mt20")}
        </div>
      </div>
      <section class="section">
        ${renderSectionHeading("What if something does not go to plan?")}
        <div class="notice">
          ${renderIcon("help")}
          <p>
            Open a support request from your rental details. The team reviews your agreement, photos
            and messages, and follows the case through to resolution.
            ${renderLink("support", "Meet your support team", "arrow", "link")}
          </p>
        </div>
      </section>`,
  );
}
