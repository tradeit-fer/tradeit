/**
 * @file scripts/pages/help-centre.js
 * Page template: help centre. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the help centre screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderHelpCentrePage() {
  return renderAccountLayout(
    /* HTML */ `<section class="help-hero">
        <div class="eyebrow">HERE TO HELP YOU SHARE</div>
        <h1 class="mt12">How can we help?</h1>
        <p>Find an answer or contact our team.</p>
        <div class="help-search">
          ${renderIcon("search")}<input
            id="faq-search"
            placeholder="Search help, for example returns or deposits"
            value="${escapeHtml(appState.faqQuery)}"
            aria-label="Search help"
          />
        </div>
      </section>
      <div class="grid3">
        <a href="#/tickets/new" class="card">
          <span class="green">${renderIcon("flag")}</span>
          <h3 class="mt20">Report a problem</h3>
          <p class="small mt12">
            Something about your rental was not as agreed? Tell us what happened.
          </p>
          <span class="link small mt20">Open a support request ${renderIcon("arrow")}</span>
        </a>
        <a href="#/tickets/current" class="card">
          <span class="green">${renderIcon("file")}</span>
          <h3 class="mt20">My support requests</h3>
          <p class="small mt12">Track the status and add information to your case.</p>
          <span class="link small mt20">Track request ${renderIcon("arrow")}</span>
        </a>
        <button class="card" style="text-align:left" data-action="assistant">
          <span class="green">${renderIcon("chat")}</span>
          <h3 class="mt20">Ask the assistant</h3>
          <p class="small mt12">Quick help with getting started and using the platform.</p>
          <span class="link small mt20">Start a conversation ${renderIcon("arrow")}</span>
        </button>
      </div>
      <section class="card mt28">
        <h3 class="mb20">Frequently asked questions</h3>
        <div id="faq-results">
          ${faqs
            .map(
              ([q, a]) =>
                /* HTML */ `<details class="faq">
                  <summary>${q}</summary>
                  <p>${a}</p>
                </details>`,
            )
            .join("")}
        </div>
      </section>`,
  );
}
