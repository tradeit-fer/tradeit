/**
 * @file scripts/pages/write-review.js
 * Page template: write review. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the write review screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderReviewPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("How was your rental?", "Your experience helps others find a great match.")}
      <form id="review-form" class="card" style="max-width:650px;margin:0 auto">
        <div class="center">
          ${renderAvatar("marko", "large")}
          <h2 class="mt20">Rate Marko as an owner</h2>
          <p class="small mt12">
            Sony Alpha · camera & lenses<br />Rental #TI-0284 · 10–13 October
          </p>
          <div class="rating-stars">
            ${[1, 2, 3, 4, 5].map((n) => renderButton("rate", "★", "", n <= appState.rating ? "selected" : "", `data-rating="${n}" type="button" aria-label="Ocjena ${n}" aria-pressed="${n === appState.rating}"`)).join("")}
          </div>
          <p class="small" id="rating-label">
            ${["", "Poor", "Could be better", "Good", "Very good", "Excellent, everything as agreed!"][appState.rating]}
          </p>
        </div>
        <hr />
        <div class="field">
          <label for="review-text">What would you like others to know?</label>
          <textarea
            id="review-text"
            name="text"
            required
            minlength="10"
            maxlength="1000"
            placeholder="How were the communication, pickup and condition of the item?"
          ></textarea>
        </div>
        <div class="notice">
          ${renderIcon("info")}
          <p>
            Your review appears on the member's profile alongside the rented item, keeping the whole
            experience in one place.
          </p>
        </div>
        <button class="btn wide mt20" type="submit">Publish review ${renderIcon("star")}</button>
      </form>`,
  );
}
