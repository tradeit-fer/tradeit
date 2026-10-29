/**
 * @file scripts/components/support.js
 * Shared support-request table and client-side admin filters.
 */
"use strict";

/**
 * render support request table
 * @param {*} rows See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderSupportRequestTable(rows = adminTickets) {
  return /* HTML */ `<div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th>Sign in</th>
          <th>Member</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (t) =>
              /* HTML */ `<tr>
                <td>
                  <a href="#/admin/ticket/${t.id}" class="table-name">${t.name}</a>
                  <div class="table-sub">${t.id} · ${t.cat}</div>
                </td>
                <td>${t.person}</td>
                <td>
                  ${renderBadge(t.priority, t.priority === "High" ? "red" : t.priority === "Medium" ? "amber" : "gray")}
                </td>
                <td>
                  ${renderBadge(t.id === "TI-0248" && appState.adminDecision ? "Resolved" : t.status, t.status === "New" ? "blue" : t.status === "Resolved" ? "" : t.status === "In review" ? "amber" : "gray")}
                </td>
                <td>${t.age}</td>
                <td>${renderLink("admin/ticket/" + t.id, "", "chevron", "link")}</td>
              </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
}

/**
 * filter admin requests
 */
function filterAdminRequests() {
  const q = (selectElement("#admin-ticket-search")?.value || "").toLocaleLowerCase("en"),
    priority = selectElement("#ticket-priority")?.value || "all";
  const list = adminTickets.filter(
    (t) =>
      (appState.adminFilter === "all" ||
        (appState.adminFilter === "new" && t.status === "New") ||
        (appState.adminFilter === "open" && ["In review", "Awaiting reply"].includes(t.status)) ||
        (appState.adminFilter === "closed" && t.status === "Resolved")) &&
      [t.id, t.name, t.person].join(" ").toLocaleLowerCase("en").includes(q) &&
      (priority === "all" || t.priority === priority),
  );
  selectElement("#admin-ticket-results").innerHTML = list.length
    ? renderSupportRequestTable(list)
    : '<div class="empty"><h3>No requests match the selected filters.</h3></div>';
}
