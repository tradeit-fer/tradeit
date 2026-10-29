/**
 * @file scripts/pages/rental-details.js
 * Page template: rental details. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the rental details screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderRentalDetailsPage() {
  const p = sampleListings[0];
  return renderAccountLayout(
    /* HTML */ `<div class="breadcrumbs" style="margin-top:0">
        <a href="#/rentals">My rentals</a>${renderIcon("chevron")}<span>TI-0284</span>
      </div>
      ${renderPageHeading("Your camera. Your memories.", "Rental #TI-0284 · Created 8 October 2026", renderBadge(appState.returnDone ? "Return recorded" : "Active rental"))}${renderRentalTimeline(appState.returnDone ? 4 : 2)}
      <div class="two-col">
        <div class="stack">
          <div class="card">
            <div class="listing-preview">
              ${renderImage(p.img, p.name)}
              <div>
                <h3>${p.name}</h3>
                <p class="small mt12">${p.location}</p>
                ${renderLink("product/camera", "View listing", "external", "link small mt12")}
              </div>
            </div>
            <div class="grid2 mt28">
              <div>
                <span class="eyebrow">PICKUP</span>
                <h3 class="mt12">10 October · 10:00</h3>
                <p class="small mt12">
                  Trešnjevka, Zagreb<br />Exact address arranged in Messages.
                </p>
              </div>
              <div>
                <span class="eyebrow">RETURN</span>
                <h3 class="mt12">13 October · 10:00</h3>
                <p class="small mt12">Same location<br />Agree any date changes with Marko.</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="between">
              <h3>Item condition</h3>
              ${renderBadge("Condition photos", "", "camera")}
            </div>
            <p class="small mt12">
              Before and after: a clear record of your equipment's condition.
            </p>
            <div class="grid2 mt20">
              <div class="panel">
                <div class="flex">${renderIcon("check")}<b class="small">Pickup</b></div>
                <p class="small mt12">The pickup condition report is ready.</p>
                ${renderLink("handover", "View condition report", "arrow", "link small mt12")}
              </div>
              <div class="panel">
                <div class="flex">${renderIcon("camera")}<b class="small">Return</b></div>
                <p class="small mt12">
                  ${appState.returnDone ? "Return photos have been added." : "Add photos before returning the item."}
                </p>
                ${renderLink("return", "Prepare return", "arrow", "link small mt12")}
              </div>
            </div>
          </div>
          <div class="card">
            <h3>Documents & agreement</h3>
            <div class="setting-row">
              <div class="flex">
                ${renderIcon("file")}
                <div>
                  <h4>Rental summary</h4>
                  <p>Dates, item and agreed terms</p>
                </div>
              </div>
              ${renderButton("rental-document", "", "eye", "iconbtn", 'aria-label="View rental summary"')}
            </div>
            <div class="setting-row">
              <div class="flex">
                ${renderIcon("credit")}
                <div>
                  <h4>Payment overview</h4>
                  <p>Rental price and refundable deposit</p>
                </div>
              </div>
              ${renderLink("payments", "", "chevron", "iconbtn")}
            </div>
          </div>
        </div>
        <aside class="stack">
          <div class="card">
            <h3>Your owner</h3>
            <a href="#/host/marko" class="host-mini mt20"
              >${renderAvatar()}
              <div>
                <h4>Marko Kovač</h4>
                <p>★ 4.9 · 32 reviews</p>
              </div> </a
            >${renderLink("messages", "Send message", "chat", "btn light wide mt20")}
            <hr />
            ${renderPriceBreakdown(p)}
          </div>
          <div class="panel">
            <h4>Something not going to plan?</h4>
            <p class="small mt12">
              Describe what happened and attach photos. The support team will review your case.
            </p>
            ${renderLink("tickets/new", "Report a problem", "flag", "link small mt20")}
          </div>
          ${renderButton("cancel-rental", "Request cancellation", "", "link small")}
        </aside>
      </div>`,
  );
}
