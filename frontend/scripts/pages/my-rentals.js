/**
 * @file scripts/pages/my-rentals.js
 * Page template: my rentals. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the my rentals screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderRentalsPage() {
  const t = appState.rentalsTab;
  let rows =
    t === "active"
      ? [
          {
            p: sampleListings[0],
            status: appState.returnDone ? "Return recorded" : "Active rental",
            date: "10–13 October 2026",
            price: 82.5,
            code: "0284",
          },
          {
            p: sampleListings[2],
            status: "Confirmed",
            date: "14–16 October 2026",
            price: 17.6,
            code: "0291",
          },
        ]
      : t === "requests"
        ? appState.booking
          ? [
              {
                p: findListing(appState.booking.product),
                status: "Awaiting confirmation",
                date: `${formatDate(appState.booking.start)} – ${formatDate(appState.booking.end)}`,
                price: appState.booking.total,
                code: "0302",
              },
            ]
          : []
        : t === "completed"
          ? [
              {
                p: sampleListings[4],
                status: "Completed",
                date: "3–5 October 2026",
                price: 19.8,
                code: "0251",
              },
            ]
          : [
              {
                p: sampleListings[5],
                status: "Rental request",
                date: "18–20 October 2026",
                price: 8.8,
                code: "0301",
              },
            ];
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("My rentals", "Keep track of your plans, agreements and everything you share.", renderLink("explore", "Find a new rental", "plus", "btn small"))}
      <div class="tabs">
        ${[
          ["active", "Active", 2],
          ["requests", "My requests", appState.booking ? 1 : 0],
          ["completed", "Completed", 1],
          ["owner", "As an owner", 1],
        ]
          .map(([id, l, n]) =>
            renderButton(
              "rental-tab",
              `${l} <b>${n}</b>`,
              "",
              `tab ${t === id ? "active" : ""}`,
              `data-tab="${id}"`,
            ),
          )
          .join("")}
      </div>
      ${
        rows.length
          ? rows
              .map(
                ({ p, status, date, price, code }) =>
                  /* HTML */ `<article class="rental-card">
                    ${renderImage(p.img, p.name)}
                    <div>
                      <span class="small muted">RENTAL #TI-${code}</span>
                      <h3>${p.name}</h3>
                      <p>${renderIcon("calendar")} ${date}</p>
                      <p class="mt12">
                        ${t === "owner" ? "Renter: Ana Horvat" : `Owner: ${p.host}`}
                      </p>
                    </div>
                    <div class="rental-actions">
                      ${renderBadge(status, status.includes("Pending") || status.includes("Request") ? "amber" : status === "Completed" ? "gray" : "")}
                      <div>
                        <b>${formatCurrency(price)}</b>
                        <br />
                        <small>total including fees</small>
                      </div>
                      <div class="flex">
                        ${t === "completed" ? renderLink("review", "Leave a review", "star", "btn small light") : t === "owner" ? renderButton("accept-rental", "Accept", "check", "btn small") : ""}${renderLink("rental/current", "Rental details", "arrow", "btn small light")}
                      </div>
                    </div>
                  </article>`,
              )
              .join("")
          : /* HTML */ `<div class="card empty">
              <div class="empty-icon">${renderIcon("calendar")}</div>
              <h2>New plans are on their way.</h2>
              <p>The requests you send to owners will appear here.</p>
              ${renderLink("explore", "Find your next rental", "search")}
            </div>`
      }
      <div class="notice mt28">
        ${renderIcon("help")}
        <p>
          Need help with a rental? Open its details and contact support.
          ${renderLink("support", "Help centre", "", "link")}
        </p>
      </div>`,
  );
}
