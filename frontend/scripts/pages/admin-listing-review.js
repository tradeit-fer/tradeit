/**
 * @file scripts/pages/admin-listing-review.js
 * Page template: admin listing review. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the admin listing review screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderAdminModerationPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Listing review", "Automatic checks help. The final review is yours.", renderBadge("8 awaiting review", "amber"))}
      <div class="notice">
        ${renderIcon("info")}
        <p>
          Check that the photo matches the category, the description is clear and the content is
          suitable for publication.
        </p>
      </div>
      <div class="stack mt28">
        ${[sampleListings[0], sampleListings[2], sampleListings[5]]
          .map(
            (p, i) =>
              /* HTML */ `<article class="rental-card" id="moderation-${p.id}">
                ${renderImage(p.img, p.name)}
                <div class="grow">
                  <div class="flex gap8">
                    ${renderBadge(i === 1 ? "Review required" : "Automatic review passed", i === 1 ? "amber" : "", i === 1 ? "info" : "check")}
                  </div>
                  <h3>${p.name}</h3>
                  <p>${p.host} · ${p.category}</p>
                  <p class="mt12">
                    ${i === 1 ? "Note: check whether all listed accessories are visible in the photos." : "No issue was flagged in this sample review result."}
                  </p>
                </div>
                <div class="rental-actions">
                  <b>${p.price} €<small>/day</small> </b>
                  <div class="flex">
                    ${renderButton("moderate-reject", "Request changes", "", "btn light small", `data-id="${p.id}"`)}${renderButton("moderate-approve", "Approve", "check", "btn small", `data-id="${p.id}"`)}
                  </div>
                </div>
              </article>`,
          )
          .join("")}
      </div>`,
    true,
  );
}
