/**
 * @file scripts/pages/listing-editor.js
 * Page template: listing editor. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the listing editor screen using the shared TradeIt design system.
 * @param {*} edit See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderListingWizardPage(edit = false) {
  const n = appState.listingStep,
    d = appState.listing;
  const titles = [
    "First, tell us about your item.",
    "Photos that tell the story.",
    "Your terms. A clear agreement.",
    "Everything looks ready.",
  ];
  let content = "";
  if (n === 0)
    content = /* HTML */ `<div class="choice-cards mb20">
        <button
          type="button"
          data-action="listing-type"
          data-type="Item"
          class="choice ${d.type === "Item" ? "selected" : ""}"
        >
          ${renderIcon("box")}
          <h4>Item or equipment</h4>
          <p>Tools, cameras, sports equipment...</p>
        </button>
        <button
          type="button"
          data-action="listing-type"
          data-type="Service"
          class="choice ${d.type === "Service" ? "selected" : ""}"
        >
          ${renderIcon("users")}
          <h4>Service or space</h4>
          <p>Expert help or a space for your plans.</p>
        </button>
      </div>
      ${renderInputField("Listing title", "listing-title", d.title, "text", 'placeholder="e.g. Graphing calculator for exam season" required minlength="5" maxlength="80"')}
      <div class="field">
        <label for="listing-category">Category</label>
        <select id="listing-category" name="category">
          ${listingCategories
            .slice(1)
            .map(([c]) => /* HTML */ `<option ${c === d.category ? "selected" : ""}>${c}</option>`)
            .join("")}
        </select>
      </div>
      <div class="field">
        <label for="listing-description">Description & what is included</label>
        <textarea
          id="listing-description"
          name="description"
          placeholder="Explain what the item is for, its condition and what accessories are included."
          required
          minlength="20"
        >
${escapeHtml(d.description)}</textarea>
      </div>`;
  if (n === 1)
    content = /* HTML */ `<p class="small">
        Add at least one clear photo. We recommend front and back views, details and accessories.
      </p>
      ${renderPhotoUploadSlots("listing")}${renderButton("sample-photos", "Use sample photos", "image", "link small mt20", 'data-mode="listing" type="button"')}
      <hr />
      <div class="notice">
        ${renderIcon("info")}
        <div>
          <b>Automatic listing review</b>
          <p class="mt12">
            Checks the category, photo suitability and description. This preview returns a sample
            result; no AI service is connected.
          </p>
        </div>
      </div>
      <div id="ai-result" class="mt20">
        ${
          d.aiChecked
            ? /* HTML */ `<div class="panel">
                <div class="flex green">
                  ${renderIcon("check")}<b class="small">Sample review passed</b>
                </div>
                <div class="cost-row">
                  <span>Suggested category</span>
                  <strong>${escapeHtml(d.category)}</strong>
                </div>
                <p class="small">
                  The photos are clear and the description matches the selected category.
                </p>
              </div>`
            : ""
        }
      </div>
      ${renderButton("ai-check", d.aiChecked ? "Run review again" : "Review photos", "image", "btn light mt20", 'type="button"')}`;
  if (n === 2)
    content = /* HTML */ `<div class="form-grid">
        ${renderInputField("Daily price (€)", "listing-price", d.price, "number", 'min="1" max="9999" step="0.5" required')}${renderInputField("Refundable deposit (€)", "listing-deposit", d.deposit, "number", 'min="0" max="99999" step="1" required')}
      </div>
      <div class="field">
        <label for="listing-location">Pickup location</label>
        <input
          id="listing-location"
          name="location"
          value="${escapeHtml(d.location)}"
          placeholder="City or neighbourhood"
          required
        />
      </div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.location)}"
        target="_blank"
        rel="noopener"
        class="link small"
        >${renderIcon("map")}Check location on Google Maps ${renderIcon("external")}</a
      >
      <div class="notice mt20">
        ${renderIcon("pin")}
        <p>
          Only an approximate location is public. Share the exact address after the booking is
          confirmed.
        </p>
      </div>
      <hr />
      <h3>Availability</h3>
      <div class="form-grid mt20">
        ${renderInputField("Available from", "listing-from", d.from || "2026-10-16", "date", "required")}${renderInputField("Available until", "listing-to", d.to || "2026-12-31", "date", "required")}
      </div>
      <div class="field">
        <label for="listing-condition">Item condition</label>
        <select id="listing-condition" name="condition">
          <option>Excellent · minimal signs of use</option>
          <option>Good · visible signs of use</option>
          <option>New · unused</option>
        </select>
      </div>
      ${renderCheckbox("In-person pickup by arrangement", "personal-pickup", true)}`;
  if (n === 3)
    content = /* HTML */ `<div class="listing-preview">
        <img
          src="${escapeHtml(appState.uploads["listing-0"] || "assets/images/camera.jpg")}"
          alt="Main listing photo"
        />
        <div>
          <span class="eyebrow">${escapeHtml(d.category)}</span>
          <h3 class="mt12">${escapeHtml(d.title || "Your new listing")}</h3>
          <p class="small mt12">${renderIcon("pin")} ${escapeHtml(d.location)}</p>
          <b>${formatCurrency(d.price)} <small class="muted">/ day</small> </b>
        </div>
      </div>
      <div class="detail-section">
        <h3>Description</h3>
        <p>${escapeHtml(d.description)}</p>
      </div>
      <div class="cost-row">
        <span>Refundable deposit</span>
        <strong>${formatCurrency(d.deposit)}</strong>
      </div>
      <div class="cost-row">
        <span>Available</span>
        <strong>${formatDate(d.from || "2026-10-16")} – ${formatDate(d.to || "2026-12-31")}</strong>
      </div>
      <div class="cost-row">
        <span>Content review</span
        >${renderBadge(d.aiChecked ? "Sample review complete" : "Awaiting review", d.aiChecked ? "" : "amber")}
      </div>
      <hr />
      <div class="notice">
        ${renderIcon("info")}
        <p>
          The platform fee and estimated earnings appear with each booking. Listings created in this
          preview are saved only in this browser.
        </p>
      </div>
      <div class="mt20">
        ${renderCheckbox("I confirm that I have permission to rent out this item and that the listing is accurate.", "listing-terms")}
      </div>`;
  return renderAccountLayout(
    /* HTML */ `<div class="wizard">
      ${renderPageHeading(edit ? "Edit your listing." : "Let your things go further.", "A clear listing is the first step to a great rental.")}
      <div class="wizard-steps">
        ${["Basic details", "Photos & review", "Price & availability", "Review & publish"]
          .map(
            (l, i) =>
              /* HTML */ `<div class="wizard-step ${i === n ? "active" : i < n ? "done" : ""}">
                <b>${i < n ? "✓" : i + 1}</b>${l}
              </div>`,
          )
          .join("")}
      </div>
      <form id="listing-form">
        <div class="card">
          <div class="eyebrow">STEP ${n + 1} OF 4</div>
          <h2 class="mt12 mb20" style="font-size:25px">${titles[n]}</h2>
          ${content}
        </div>
        <div class="between mt28">
          ${n === 0 ? renderLink("listings", "Cancel", "back", "link small") : renderButton("listing-back", "Previous step", "back", "link small", 'type="button"')}<button
            type="submit"
            class="btn"
          >
            ${n === 3 ? (edit ? "Save changes" : "List an item") : "Continue"}
            ${renderIcon(n === 3 ? "check" : "arrow")}
          </button>
        </div>
      </form>
    </div>`,
  );
}
