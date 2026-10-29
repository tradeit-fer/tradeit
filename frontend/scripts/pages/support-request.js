/**
 * @file scripts/pages/support-request.js
 * Page template: support request. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the support request screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderSupportRequestPage() {
  const t = appState.tickets.at(-1);
  return renderAccountLayout(
    /* HTML */ `<div class="breadcrumbs" style="margin-top:0">
        <a href="#/support">Support</a>${renderIcon("chevron")}<span
          >${t ? "TI-0303" : "TI-0248"}</span
        >
      </div>
      ${renderPageHeading(t ? escapeHtml(t.title) : "Disagreement about lens condition", `Request #${t ? "TI-0303" : "TI-0248"} · ${t ? "Just received" : "10 October 2026"}`, renderBadge(t ? "Received" : appState.adminDecision ? "Resolved" : "In review", appState.adminDecision ? "" : "amber"))}
      <div class="two-col">
        <div class="stack">
          <div class="card">
            <h3>Case conversation</h3>
            <div class="ticket-message">
              <div class="host-mini">
                ${renderAvatar("me")}
                <div>
                  <h4>${escapeHtml(appState.profile.first)} · your request</h4>
                  <p>${t ? "Just now" : "10 October · 12:42"}</p>
                </div>
              </div>
              <p>
                ${escapeHtml(t?.description || "While checking the equipment, I noticed a mark on the lens body. I would like to confirm whether it was present at pickup. I have attached a photo to compare with the condition report.")}
              </p>
              ${renderImage("camera.jpg", "Evidence attached to the request", "ticket-image")}
            </div>
            <div class="ticket-message">
              <div class="host-mini">
                <span class="avatar" style="background:#e3edd5;color:#52713c">T</span>
                <div>
                  <h4>TradeIt support</h4>
                  <p>${t ? "Automatic acknowledgement" : "10 October · 14:10"}</p>
                </div>
              </div>
              <p>
                ${t ? "Your request has been saved locally. This preview shows the support process without contacting a real support team." : appState.adminDecision ? `The request has been reviewed. Recorded outcome: ${escapeHtml(appState.adminDecision)}.` : "We have received your request. We will review the pickup and return photos and ask the owner for their account. Status updates will appear here."}
              </p>
            </div>
            <div id="ticket-replies"></div>
            <form id="ticket-reply-form" class="mt20">
              <label for="ticket-reply">Add information</label>
              <textarea
                id="ticket-reply"
                name="reply"
                required
                placeholder="Add new information that may help resolve the case..."
              ></textarea>
              <button class="btn mt12" type="submit">Send reply ${renderIcon("send")}</button>
            </form>
          </div>
        </div>
        <aside class="stack">
          <div class="card">
            <h3>Case details</h3>
            <div class="cost-row mt20">
              <span>Type</span>
              <strong>${escapeHtml(t?.reason || "Item damage")}</strong>
            </div>
            <div class="cost-row">
              <span>Rental</span>${renderLink("rental/current", "TI-0284", "", "link")}
            </div>
            <div class="cost-row">
              <span>Assigned to</span>
              <strong>${t ? "Awaiting assignment" : "Ana Kovač"}</strong>
            </div>
            <div class="cost-row">
              <span>Status</span>
              <strong>${t ? "Received" : appState.adminDecision ? "Resolved" : "In review"}</strong>
            </div>
            <hr />
            <a href="#/rental/current" class="listing-preview" style="padding:0;background:none"
              >${renderImage("camera.jpg", "Rented item")}
              <div>
                <h4>Sony Alpha</h4>
                <p class="small mt12">10–13 October</p>
              </div>
            </a>
          </div>
          <div class="notice">
            ${renderIcon("info")}
            <p>While the case is open, keep the item, photos and relevant messages.</p>
          </div>
        </aside>
      </div>`,
  );
}
