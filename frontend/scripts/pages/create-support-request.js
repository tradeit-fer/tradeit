/**
 * @file scripts/pages/create-support-request.js
 * Page template: create support request. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the create support request screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderNewSupportRequestPage() {
  return renderAccountLayout(
    /* HTML */ `<div class="breadcrumbs" style="margin-top:0">
        <a href="#/support">Support</a>${renderIcon("chevron")}<span>New support request</span>
      </div>
      ${renderPageHeading("Let us work it out.", "The clearer your description, the easier it is for us to help.")}
      <form id="ticket-form" class="two-col">
        <div class="card">
          <div class="field">
            <label for="ticket-rental">Which rental is this about?</label>
            <select id="ticket-rental" name="rental">
              <option>TI-0284 · Sony Alpha camera</option>
              <option>TI-0291 · Cordless drill</option>
              <option>TI-0251 · JBL speaker</option>
              <option>Listing report / other</option>
            </select>
          </div>
          <div class="field">
            <label for="ticket-reason">Issue type</label>
            <select id="ticket-reason" name="reason">
              <option>Item damage</option>
              <option>Item not returned</option>
              <option>Item not as described</option>
              <option>Payment disagreement</option>
              <option>Inappropriate communication</option>
              <option>Other</option>
            </select>
          </div>
          ${renderInputField("Request title", "ticket-title", "", "text", 'required minlength="5" placeholder="Describe the issue in one sentence"')}
          <div class="field">
            <label for="ticket-description">What happened?</label>
            <textarea
              id="ticket-description"
              name="description"
              required
              minlength="20"
              placeholder="Include when it happened, what was agreed and what you have already tried."
            ></textarea>
          </div>
          <h4>Photos & evidence <span class="muted">(optional)</span></h4>
          ${renderPhotoUploadSlots("ticket", 2)}
          <div class="field mt20">
            <label for="ticket-resolution">What resolution would you suggest?</label>
            <textarea
              id="ticket-resolution"
              name="resolution"
              style="min-height:90px"
              placeholder="For example, an agreement on repairs or a partial refund."
            ></textarea>
          </div>
          ${renderCheckbox("I confirm that this information is accurate to the best of my knowledge.", "ticket-terms")}<button
            type="submit"
            class="btn wide mt20"
          >
            Submit request ${renderIcon("send")}
          </button>
        </div>
        <aside class="stack">
          <div class="card">
            <span class="eyebrow">WHAT HAPPENS NEXT?</span>
            <div class="activity" style="padding:20px 0">
              <div class="activity-icon">1</div>
              <div>
                <h4>Request received</h4>
                <p>You receive a case number and status.</p>
              </div>
            </div>
            <div class="activity" style="padding:20px 0">
              <div class="activity-icon">2</div>
              <div>
                <h4>Information review</h4>
                <p>The team compares the agreement and evidence.</p>
              </div>
            </div>
            <div class="activity" style="padding:20px 0">
              <div class="activity-icon">3</div>
              <div>
                <h4>Response & next steps</h4>
                <p>Follow everything within your request.</p>
              </div>
            </div>
          </div>
          <div class="notice">
            ${renderIcon("shield")}
            <p>
              Record the facts and attach relevant photos. Communication about the issue stays
              linked to the rental.
            </p>
          </div>
        </aside>
      </form>`,
  );
}
