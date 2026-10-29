/**
 * @file scripts/pages/dashboard.js
 * Page template: dashboard. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the dashboard screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderDashboardPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading(`Hi, ${escapeHtml(appState.profile.first)}. What is the plan?`, "Monday, 12 October · Your things and your plans, all in one place.", renderLink("explore", "Explore listings", "search", "btn light small"))}
      <div class="grid4">
        ${renderStatisticCard("Active rentals", "2", "calendar", "Next return on 13 October")}${renderStatisticCard("My listings", String(3 + appState.ownListings.length), "box", "2 listings available to rent")}${renderStatisticCard("Earnings this month", "148 €", "wallet", "+ €24 compared with September")}${renderStatisticCard("My rating", "4.9", "star", "Based on 12 reviews")}
      </div>
      <div class="notice mt28">
        ${renderIcon("camera")}
        <p>
          <b>Time for new memories.</b> Your camera is due back tomorrow. Add condition photos
          before you return it.
        </p>
        ${renderLink("return", "Prepare return", "arrow", "link small")}
      </div>
      <section class="section-card mt28">
        <div class="section-card-head">
          <h3>Current rentals</h3>
          ${renderLink("rentals", "All rentals", "arrow", "link")}
        </div>
        ${renderRentalTable()}
      </section>
      <div class="grid2 mt28">
        <div class="section-card">
          <div class="section-card-head">
            <h3>Recent activity</h3>
            ${renderLink("notifications", "All", "arrow", "link")}
          </div>
          <div class="activity">
            <div class="activity-icon">${renderIcon("chat")}</div>
            <div>
              <h4>Marko sent you a message</h4>
              <p>“All good, see you tomorrow!”</p>
            </div>
            <time>12 minutes ago</time>
          </div>
          <div class="activity">
            <div class="activity-icon">${renderIcon("check")}</div>
            <div>
              <h4>Booking confirmed</h4>
              <p>Cordless drill · 14 October</p>
            </div>
            <time>1 hour ago</time>
          </div>
          <div class="activity">
            <div class="activity-icon">${renderIcon("star")}</div>
            <div>
              <h4>You have a new review</h4>
              <p>Ana rated your rental 5 stars.</p>
            </div>
            <time>Yesterday</time>
          </div>
        </div>
        <div class="card" style="background:#edf2e3">
          <div class="eyebrow">YOUR THINGS HAVE POTENTIAL</div>
          <h2 class="mt20">Something gathering dust?</h2>
          <p class="small mt12">
            It might be exactly what someone needs next weekend. Create a listing in a few simple
            steps.
          </p>
          <div class="flex mt28">
            <span style="color:#85a061"
              >${renderIcon("camera")}${renderIcon("tool")}${renderIcon("tent")}</span
            >
          </div>
          ${renderLink("new-listing", "Give your things a new plan", "plus", "btn mt28")}
        </div>
      </div>`,
  );
}
