/**
 * @file scripts/pages/my-listings.js
 * Page template: my listings. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the my listings screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderMyListingsPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("My listings", "Your things could be someone else's next great plan.", renderLink("new-listing", "New listing", "plus", "btn small"))}
      <div class="grid3">
        ${renderStatisticCard("Active listings", String(3 + appState.ownListings.length), "box")}${renderStatisticCard("Views this month", "246", "eye")}${renderStatisticCard("Rental earnings", "148 €", "wallet")}
      </div>
      <section class="section-card mt28">
        <div class="section-card-head">
          <h3>All listings</h3>
          ${renderBadge("Manage availability", "gray")}
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price / day</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ...appState.ownListings.map((p, i) => ({
                  ...p,
                  id: "own-" + i,
                  img: "camera.jpg",
                  tag: "New",
                })),
                sampleListings[5],
                sampleListings[2],
                sampleListings[1],
              ]
                .map(
                  (p, i) =>
                    /* HTML */ `<tr>
                      <td>
                        <div class="flex">
                          ${renderImage(p.img, p.name || p.title, "thumb")}
                          <div>
                            <div class="table-name">${escapeHtml(p.name || p.title)}</div>
                            <div class="table-sub">${escapeHtml(p.category)}</div>
                          </div>
                        </div>
                      </td>
                      <td>${formatCurrency(p.price)}</td>
                      <td>
                        ${renderBadge(appState.paused.includes(p.id) ? "Paused" : i === 2 ? "On rental" : "Active", appState.paused.includes(p.id) ? "gray" : i === 2 ? "blue" : "")}
                      </td>
                      <td>${[128, 82, 36][i % 3]}</td>
                      <td>
                        <div class="flex gap8">
                          ${renderButton("edit-listing", "", "edit", "iconbtn", `data-id="${p.id}" aria-label="Edit listing"`)}${renderButton("pause-listing", appState.paused.includes(p.id) ? "Activate" : "Pause", "", "btn light small", `data-id="${p.id}"`)}
                        </div>
                      </td>
                    </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
      <div class="notice mt28">
        ${renderIcon("info")}
        <p>
          <b>A great listing starts with a great photo.</b> Show the item from several angles,
          include accessories and describe its condition honestly.
        </p>
      </div>`,
  );
}
