/**
 * @file scripts/pages/admin-members.js
 * Page template: admin members. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the admin members screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderAdminMembersPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Users", "Review accounts, verification and community activity.", renderBadge("1,284 members", "gray"))}
      <div class="header-search">
        <input
          id="admin-user-search"
          placeholder="Search by name or email"
          aria-label="Search members"
        />
      </div>
      <div class="section-card">
        <div class="table-scroll">
          <table id="users-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Account type</th>
                <th>Verification</th>
                <th>Rentals</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ["Marko Kovač", "marko@example.com", "Personal", "48"],
                ["Ana Horvat", "ana@example.com", "Personal", "32"],
                ["Studio North", "studio@example.com", "Personal", "18"],
                ["Ivan Petrović", "ivan.petrovic@example.com", "Personal", "18"],
                ["Luka Babić", "luka@example.com", "Personal", "12"],
              ]
                .map(
                  (u, i) =>
                    /* HTML */ `<tr>
                      <td>
                        <div class="flex">
                          ${
                            i === 0
                              ? renderAvatar()
                              : i === 1
                                ? renderAvatar("ana")
                                : /* HTML */ `<span
                                    class="avatar"
                                    style="background:#e4eacb;color:#738450"
                                    >${u[0]
                                      .split(" ")
                                      .map((w) => w[0])
                                      .join("")}</span
                                  >`
                          }
                          <div>
                            <b>${u[0]}</b>
                            <div class="table-sub">${u[1]}</div>
                          </div>
                        </div>
                      </td>
                      <td>${u[2]}</td>
                      <td>
                        ${renderBadge(i === 4 ? "In progress" : "Confirmed", i === 4 ? "amber" : "")}
                      </td>
                      <td>${u[3]}</td>
                      <td>${renderBadge("Active")}</td>
                      <td>
                        ${renderButton("user-details", "Overview", "", "btn light small", `data-name="${u[0]}" data-email="${u[1]}"`)}
                      </td>
                    </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>`,
    true,
  );
}
