/**
 * @file scripts/pages/payments-and-payouts.js
 * Page template: payments and payouts. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the payments and payouts screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderPaymentsPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Payments & payouts", "A clear view of what you pay and what you earn.", renderButton("tax-summary", "Tax & documents", "file", "btn light small"))}
      <div class="grid3">
        ${renderStatisticCard("Earnings this month", "148.00 €", "wallet", "2 payouts completed")}${renderStatisticCard("Next payout", "42.00 €", "calendar", "Expected on 16 October")}${renderStatisticCard("Active deposit", "150.00 €", "shield", "Rental #TI-0284")}
      </div>
      <div class="grid2 mt28">
        <div class="credit-card">
          <div class="between">
            <span>Payment method</span>
            <b style="font-size:18px;font-style:italic">VISA</b>
          </div>
          <div class="card-num">•••• •••• •••• 4242</div>
          <div class="between">
            <span class="small">EXAMPLE CARD</span>
            <span class="small">12/28</span>
          </div>
        </div>
        <div class="card">
          <div class="between">
            <h3>Payout account</h3>
            ${renderIcon("building")}
          </div>
          <p class="small mt20">
            Personal account · ${escapeHtml(appState.profile.first + " " + appState.profile.last)}
          </p>
          <h3 class="mt12" style="letter-spacing:.04em">HR •••• •••• •••• 1234</h3>
          ${renderButton("payout-account", "View payout settings", "edit", "link small mt20")}
        </div>
      </div>
      <section class="section-card mt28">
        <div class="section-card-head">
          <h3>Transaction history</h3>
          ${renderBadge("Sample amounts", "gray")}
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${[
                ["Camera rental", "#TI-0284", "10. 10. 2026.", "Payment", "−82.50 €", "Recorded"],
                ["Calculator rental", "#TI-0261", "8. 10. 2026.", "Payout", "+24.00 €", "Paid out"],
                ["Speaker rental", "#TI-0251", "3. 10. 2026.", "Payment", "−19.80 €", "Recorded"],
                ["Tent rental", "#TI-0245", "1. 10. 2026.", "Payout", "+36.00 €", "Paid out"],
              ]
                .map(
                  (r, i) =>
                    /* HTML */ `<tr>
                      <td>
                        <b>${r[0]}</b>
                        <div class="table-sub">${r[1]}</div>
                      </td>
                      <td>${r[2]}</td>
                      <td>${r[3]}</td>
                      <td>
                        <strong>${r[4]}</strong>
                      </td>
                      <td>${renderBadge(r[5])}</td>
                      <td>
                        ${renderButton("receipt", "", "file", "iconbtn", `data-id="${i}" aria-label="View transaction ${r[1]}"`)}
                      </td>
                    </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
      <div class="notice mt20">
        ${renderIcon("info")}
        <p>
          Financial screens use sample data. Real charges, payouts and tax calculations require
          backend integration.
        </p>
      </div>`,
  );
}
