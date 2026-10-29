/**
 * @file scripts/components/rentals.js
 * Rental tables, price breakdowns, date fields, timelines and condition-photo controls.
 */
"use strict";

/**
 * render price breakdown
 * @param {*} p See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} days See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderPriceBreakdown(p, days = 3) {
  const sum = p.price * days,
    fee = Math.round(sum * APP_CONFIG.platformFeeRate * 100) / 100;
  return /* HTML */ `<div class="cost-row">
      <span>${formatCurrency(p.price)} × <span data-days>${days}</span> days</span>
      <strong data-subtotal>${formatCurrency(sum)}</strong>
    </div>
    <div class="cost-row">
      <span>Platform fee (${Math.round(APP_CONFIG.platformFeeRate * 100)}%)</span>
      <strong data-fee>${formatCurrency(fee)}</strong>
    </div>
    <div class="cost-row total">
      <span>Total</span>
      <strong data-total>${formatCurrency(sum + fee)}</strong>
    </div>
    <div class="cost-row">
      <span>Refundable deposit</span>
      <strong>${formatCurrency(p.deposit)}</strong>
    </div>`;
}

/**
 * render date fields
 * @param {*} start See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} end See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderDateFields(start = "2026-10-16", end = "2026-10-19") {
  return /* HTML */ `<div class="date-grid mt20">
      <div class="field">
        <label for="date-start">Pickup</label>
        <input name="start" type="date" id="date-start" value="${start}" required />
      </div>
      <div class="field">
        <label for="date-end">Return</label>
        <input name="end" type="date" id="date-end" value="${end}" required />
      </div>
    </div>
    <p id="date-error" class="small" style="color:#b2574a;display:none" role="alert">
      The return date must be after the pickup date.
    </p>`;
}

/**
 * render statistic card
 * @param {*} label See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} value See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} icon See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} trend See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderStatisticCard(label, value, icon, trend = "") {
  return /* HTML */ `<div class="stat">
    <div class="between">
      <span class="stat-icon">${renderIcon(icon)}</span>${renderIcon("more")}
    </div>
    <div class="stat-label">${label}</div>
    <div class="stat-value">${value}</div>
    ${trend ? /* HTML */ `<div class="trend mt12">${trend}</div>` : ""}
  </div>`;
}

/**
 * render rental table
 * @param {*} owner See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderRentalTable(owner = false) {
  return /* HTML */ `<div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>${owner ? "Renter" : "Owner"}</th>
          <th>Dates</th>
          <th>Status</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${[sampleListings[0], sampleListings[2], sampleListings[4]]
          .map(
            (p, i) =>
              /* HTML */ `<tr>
                <td>
                  <div class="flex">
                    ${renderImage(p.img, p.name, "thumb")}
                    <div class="table-name">
                      ${p.name.split(" · ")[0]}
                      <div class="table-sub">#TI-${["0284", "0291", "0251"][i]}</div>
                    </div>
                  </div>
                </td>
                <td>${owner ? ["Ana Horvat", "Luka Babić", "Petra Novak"][i] : p.host}</td>
                <td>${["10–13 Oct", "14–16 Oct", "3–5 Oct"][i]}</td>
                <td>
                  ${renderBadge(["Active rental", "Confirmed", "Completed"][i], ["", "blue", "gray"][i])}
                </td>
                <td>
                  <strong>${formatCurrency([82.5, 17.6, 19.8][i])}</strong>
                </td>
                <td>${renderLink("rental/current", "", "chevron", "link")}</td>
              </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
}

/**
 * render rental timeline
 * @param {*} step See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderRentalTimeline(step = 2) {
  return /* HTML */ `<div class="timeline">
    ${["Request", "Confirmed", "Pickup", "Return", "Review"]
      .map(
        (l, i) =>
          /* HTML */ `<div class="timeline-step ${i < step ? "done" : i === step ? "current" : ""}">
            <span class="step-dot">${i < step ? renderIcon("check") : i + 1}</span>${l}
          </div>`,
      )
      .join("")}
  </div>`;
}

/**
 * render photo upload slots
 * @param {*} key See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} count See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderPhotoUploadSlots(key, count = 3) {
  const names = ["Front view", "Back view", "Equipment & accessories", "Condition close-up"];
  return /* HTML */ `<div class="upload-grid mt20">
    ${Array.from(
      { length: count },
      (_, i) =>
        /* HTML */ `<label class="upload-slot"
          >${appState.uploads[key + "-" + i] ? /* HTML */ `<img src="${escapeHtml(appState.uploads[key + "-" + i])}" alt="Photo added ${i + 1}" />` : renderIcon("camera")}<span
            class="upload-label"
            >${appState.uploads[key + "-" + i] ? "Change photo" : names[i]}</span
          >
          <input
            type="file"
            accept="image/*"
            data-upload="${key}-${i}"
            aria-label="Add photo: ${names[i]}"
          />
        </label>`,
    ).join("")}
  </div>`;
}

/**
 * update booking price
 */
function updateBookingPrice() {
  const a = selectElement("#date-start"),
    b = selectElement("#date-end");
  if (!a || !b) return null;
  const days = Math.round(
      (new Date(b.value + "T12:00:00") - new Date(a.value + "T12:00:00")) / 86400000,
    ),
    valid = Number.isFinite(days) && days > 0;
  selectElement("#date-error").style.display = valid ? "none" : "block";
  const form = a.closest("form"),
    id = form.dataset.id || "camera",
    p = findListing(id);
  if (valid) {
    const subtotal = days * p.price,
      fee = Math.round(subtotal * APP_CONFIG.platformFeeRate * 100) / 100;
    const old = selectElement("#costs");
    if (old) old.innerHTML = renderPriceBreakdown(p, days);
    return {
      product: id,
      start: a.value,
      end: b.value,
      days,
      subtotal,
      fee,
      total: subtotal + fee,
    };
  }
  return null;
}
