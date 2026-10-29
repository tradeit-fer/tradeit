/**
 * @file scripts/pages/pickup-and-return.js
 * Page template: pickup and return. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the pickup and return screen using the shared TradeIt design system.
 * @param {*} isReturn See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderHandoverPage(isReturn = false) {
  return renderAccountLayout(
    /* HTML */ `<div class="breadcrumbs" style="margin-top:0">
        <a href="#/rental/current">Rental TI-0284</a>${renderIcon("chevron")}<span
          >${isReturn ? "Return" : "Pickup"}</span
        >
      </div>
      ${renderPageHeading(isReturn ? "Return the item. Complete a good plan." : "Ready for pickup?", isReturn ? "Record the condition of the item and confirm its return." : "A few photos now mean fewer questions later.")}${renderRentalTimeline(isReturn ? 3 : 2)}
      <form id="handover-form" data-mode="${isReturn ? "return" : "handover"}" class="two-col">
        <div class="stack">
          <div class="card">
            <div class="between">
              <h3>1. Photograph the item</h3>
              ${renderBadge("Required", "gray")}
            </div>
            <p class="small mt12">
              Add photos from at least three angles, including all accessories. Take close-ups of
              any existing damage.
            </p>
            ${renderPhotoUploadSlots(isReturn ? "return" : "before")}${renderButton("sample-photos", "Add sample photos", "image", "link small mt20", `data-mode="${isReturn ? "return" : "before"}"`)}
          </div>
          ${
            isReturn
              ? /* HTML */ `<div class="card">
                  <h3>Compare with the pickup condition</h3>
                  <div class="split-evidence mt20">
                    <div class="evidence-box">
                      ${renderImage("camera.jpg", "Condition recorded before rental")}
                      <p>Before rental · 10 October, 10:04</p>
                    </div>
                    <div class="evidence-box">
                      ${appState.uploads["return-0"] ? /* HTML */ `<img src="${escapeHtml(appState.uploads["return-0"])}" alt="Condition at return" />` : /* HTML */ `<div class="upload-slot" style="height:150px">${renderIcon("camera")}Add a return photo</div>`}
                      <p>After rental · your photo</p>
                    </div>
                  </div>
                </div>`
              : ""
          }
          <div class="card">
            <h3>2. Check that everything is there</h3>
            <div class="stack mt20">
              ${renderCheckbox("Camera and both lenses", "equipment1")}${renderCheckbox("Charger, battery and memory card", "equipment2")}${renderCheckbox("Bag and included accessories", "equipment3")}
            </div>
            <hr />
            <div class="field">
              <label for="condition-note"
                >Condition notes <span class="muted">(optional)</span>
              </label>
              <textarea
                id="condition-note"
                placeholder="Describe anything worth recording..."
              ></textarea>
            </div>
            ${renderCheckbox("I confirm that these photos and notes describe the item's condition.", "condition")}
          </div>
          <div class="between">
            ${renderLink("rental/current", "Back to rental", "back", "link small")}<button
              type="submit"
              class="btn"
            >
              ${isReturn ? "Confirm return" : "Confirm pickup"} ${renderIcon("check")}
            </button>
          </div>
        </div>
        <aside class="stack">
          <div class="card">
            <span class="eyebrow">RENTAL #TI-0284</span>
            <div
              class="listing-preview mt20"
              style="flex-direction:column;padding:0;background:none"
            >
              <img src="assets/images/camera.jpg" alt="Camera" style="height:160px;width:100%" />
              <h3>Sony Alpha · camera & lenses</h3>
            </div>
            <hr />
            <div class="host-mini">
              ${renderAvatar()}
              <div>
                <h4>Marko Kovač</h4>
                <p>Owner</p>
              </div>
            </div>
            <div class="cost-row mt20">
              <span>Rental dates</span>
              <strong>10–13 Oct</strong>
            </div>
          </div>
          <div class="notice">
            ${renderIcon("shield")}
            <p>
              Photos document your agreement. If you disagree about the condition, open a support
              request.
            </p>
          </div>
          ${renderLink("tickets/new", "Report a problem", "flag", "link small")}
        </aside>
      </form>`,
  );
}
