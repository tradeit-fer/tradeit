/**
 * @file scripts/pages/identity-verification.js
 * Page template: identity verification. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the identity verification screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderVerificationPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Trust starts with clear information.", "A verified profile makes arranging and sharing easier.")}
      <div class="two-col">
        <div class="stack">
          <div class="card">
            <div class="between">
              <h3>Email address</h3>
              ${renderBadge("Confirmed", "", "check")}
            </div>
            <p class="small mt12">${escapeHtml(appState.profile.email)}</p>
          </div>
          <div class="card">
            <div class="between">
              <h3>Phone number</h3>
              ${renderBadge("Confirmed", "", "check")}
            </div>
            <p class="small mt12">${escapeHtml(appState.profile.phone)}</p>
          </div>
          <div class="card">
            <div class="between">
              <h3>Member identity</h3>
              ${renderBadge("Sample view", "gray")}
            </div>
            <p class="small mt12">
              Identity verification needs a connected provider. Do not upload real identity
              documents to this frontend preview.
            </p>
            <div class="panel mt20">
              <div class="flex">
                ${renderIcon("shield")}
                <div>
                  <h4>Identity verification</h4>
                  <p class="small">A secure process in a few simple steps.</p>
                </div>
              </div>
              ${renderButton("verify-identity", "View verification steps", "arrow", "btn light mt20")}
            </div>
          </div>
        </div>
        <aside class="notice">
          ${renderIcon("lock")}
          <p>
            Identity documents and full identification details are never shown on your public
            profile. Other members only see your verification status.
          </p>
        </aside>
      </div>`,
  );
}
