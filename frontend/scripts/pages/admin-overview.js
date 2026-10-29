/**
 * @file scripts/pages/admin-overview.js
 * Page template: admin overview. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the admin overview screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderAdminDashboardPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Good morning, Ana.", "Platform overview · Monday, 12 October 2026", renderBadge("Administration", "", "shield"))}
      <div class="grid4">
        ${renderStatisticCard("Active rentals", "128", "calendar", "+ 12% compared with last month")}${renderStatisticCard("Open requests", "12", "flag", "3 high-priority requests")}${renderStatisticCard("Listings to review", "8", "box", "5 passed automatic review")}${renderStatisticCard("Active members", "1.284", "users", "+ 42 new members this week")}
      </div>
      <div class="admin-banner mt28">
        <div class="flex">
          ${renderIcon("flag")}
          <div>
            <b>3 requests need priority review.</b>
            <p class="small">Two damage disputes and one unreturned item.</p>
          </div>
        </div>
        ${renderLink("admin/tickets", "Review", "arrow", "btn small")}
      </div>
      <div class="grid2 mt28">
        <div class="card">
          <div class="between">
            <h3>Rental activity</h3>
            <span class="small muted">Last 7 days</span>
          </div>
          <div class="bar-chart">
            ${["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
              .map(
                (day, i) =>
                  /* HTML */ `<div class="bar-group">
                    <i style="height:${[44, 62, 48, 79, 95, 82, 72][i]}%"> </i>
                    <i style="height:${[25, 42, 35, 54, 70, 63, 53][i]}%"> </i>
                    <span>${day}</span>
                  </div>`,
              )
              .join("")}
          </div>
          <div class="bar-key">
            <span>Bookings</span>
            <span>Completed rentals</span>
          </div>
        </div>
        <div class="card">
          <h3>Request status</h3>
          <div class="flex mt20">
            <div class="status-ring">
              <div>48<small>this month</small></div>
            </div>
            <div class="stack grow" style="font-size:11px">
              <div class="between">
                <span>Resolved</span>
                <b>31</b>
              </div>
              <div class="between">
                <span>In review</span>
                <b>11</b>
              </div>
              <div class="between">
                <span>New</span>
                <b>6</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="section-card mt28">
        <div class="section-card-head">
          <h3>Requests needing attention</h3>
          ${renderLink("admin/tickets", "All requests", "arrow", "link")}
        </div>
        ${renderSupportRequestTable(adminTickets.slice(0, 3))}
      </section>
      <p class="state-line mt20">
        Sample administration data. Member and admin views are available for frontend development.
      </p>`,
    true,
  );
}
