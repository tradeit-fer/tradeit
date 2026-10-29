/**
 * @file scripts/pages/booking.js
 * Page template: booking. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the booking screen using the shared TradeIt design system.
 * @param {*} id See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderBookingPage(id) {
  const p = findListing(id),
    b = appState.booking?.product === p.id ? appState.booking : null;
  const days = b?.days || 3;
  return renderPublicLayout(
    /* HTML */ `<div class="breadcrumbs">
        <a href="#/product/${p.id}">Listing</a>${renderIcon("chevron")}<span>Booking</span>
      </div>
      <div class="wizard">
        <div class="flow-strip">
          <span class="active">01 Dates & details</span>${renderIcon("chevron")}<span class="active"
            >02 Review booking</span
          >${renderIcon("chevron")}<span>03 Confirmation</span>
        </div>
        ${renderPageHeading("Your next plan is almost here.", "Check your rental details and send a request to the owner.")}
        <form id="checkout-form" data-id="${p.id}" class="two-col">
          <div class="stack">
            <div class="card">
              <h3>Your rental</h3>
              ${renderDateFields(b?.start, b?.end)}
              <div class="field">
                <label for="pickup">Pickup method</label>
                <select id="pickup" name="pickup">
                  <option>In-person pickup · ${p.location}</option>
                </select>
              </div>
              <div class="field" style="margin:0">
                <label for="booking-message"
                  >Message to the owner <span class="muted">(optional)</span>
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  placeholder="Hi! Would Friday around 5 pm work for pickup?"
                ></textarea>
              </div>
            </div>
            <div class="card">
              <div class="between mb20">
                <h3>Payment method</h3>
                ${renderIcon("lock")}
              </div>
              <label class="check-label">
                <input type="radio" checked name="pay-method" />Example card · Visa •••• 4242</label
              >
              <div class="notice mt20">
                ${renderIcon("info")}
                <p>
                  This frontend preview does not collect payments or card details. Prices, fees and
                  rental terms shown here are sample data.
                </p>
              </div>
            </div>
            <div class="card">
              <h3>Clear expectations from the start.</h3>
              <p class="small mt12">
                The deposit is shown separately from the rental price. Pickup and return photos help
                record the actual condition of the item.
              </p>
              <hr />
              ${renderCheckbox("I understand the displayed rental terms and have reviewed my booking.", "terms")}
            </div>
          </div>
          <aside class="card">
            <div class="listing-preview" style="padding:0;background:none">
              ${renderImage(p.img, p.name)}
              <div>
                <h3>${p.name}</h3>
                <p class="small mt12">★ ${p.rating} · ${p.location}</p>
              </div>
            </div>
            <hr />
            <div id="costs">${renderPriceBreakdown(p, days)}</div>
            <button type="submit" class="btn wide mt20">Send request ${renderIcon("arrow")}</button>
            <p class="state-line">No payment is collected in this preview.</p>
            ${renderLink("product/" + p.id, "Back to listing", "back", "link small mt20")}
          </aside>
        </form>
      </div>`,
  );
}
