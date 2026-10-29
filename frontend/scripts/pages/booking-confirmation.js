/**
 * @file scripts/pages/booking-confirmation.js
 * Page template: booking confirmation. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the booking confirmation screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderBookingConfirmationPage() {
  const p = findListing(appState.booking?.product || "camera");
  return renderPublicLayout(
    /* HTML */ `<div class="wizard">
      <div class="empty success">
        <div class="empty-icon">${renderIcon("check")}</div>
        <div class="eyebrow">REQUEST SAVED</div>
        <h1 class="mt12">Your next great plan is one step closer.</h1>
        <p>
          ${p.host} will review your request. Track its status in My rentals and arrange the details
          in Messages.
        </p>
      </div>
      <div class="card" style="max-width:580px;margin:0 auto">
        <div class="listing-preview">
          ${renderImage(p.img, p.name)}
          <div>
            <h3>${p.name}</h3>
            <p class="small mt12">
              ${formatDate(appState.booking?.start || "2026-10-16")} –
              ${formatDate(appState.booking?.end || "2026-10-19")}
            </p>
            <p class="small">${p.location}</p>
          </div>
        </div>
        <div class="between mt20">
          <span class="small muted">Request status</span
          >${renderBadge("Awaiting confirmation", "amber")}
        </div>
        <hr />
        <div class="grid2">
          ${renderLink("rentals", "My rentals", "calendar")}${renderLink("messages", "Open messages", "chat", "btn light")}
        </div>
      </div>
      <div class="center mt28">${renderLink("explore", "Keep exploring", "arrow", "link")}</div>
    </div>`,
  );
}
