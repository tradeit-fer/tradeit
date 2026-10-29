/**
 * @file scripts/pages/admin-requests.js
 * Page template: admin requests. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the admin requests screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderAdminRequestsPage() {
  let rows = adminTickets.filter(
    (t) =>
      appState.adminFilter === "all" ||
      (appState.adminFilter === "new" && t.status === "New") ||
      (appState.adminFilter === "open" &&
        (t.status === "In review" || t.status === "Awaiting reply")) ||
      (appState.adminFilter === "closed" &&
        (t.status === "Resolved" || (t.id === "TI-0248" && appState.adminDecision))),
  );
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Reports & disputes", "Review the agreement, hear both sides and record an outcome.", renderBadge("12 open", "amber"))}
      <div class="tabs">
        ${[
          ["all", "All requests"],
          ["new", "New"],
          ["open", "In review"],
          ["closed", "Resolved"],
        ]
          .map(([id, l]) =>
            renderButton(
              "admin-filter",
              l,
              "",
              `tab ${appState.adminFilter === id ? "active" : ""}`,
              `data-filter="${id}"`,
            ),
          )
          .join("")}
      </div>
      <div class="header-search">
        <input
          id="admin-ticket-search"
          placeholder="Search by number, title or member"
          aria-label="Search requests"
        />
        <select id="ticket-priority" class="sort">
          <option value="all">All priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div class="section-card" id="admin-ticket-results">${renderSupportRequestTable(rows)}</div>`,
    true,
  );
}
