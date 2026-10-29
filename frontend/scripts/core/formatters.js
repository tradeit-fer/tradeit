/**
 * @file scripts/core/formatters.js
 * HTML escaping and English date/currency formatting. Escape every user-provided value before inserting HTML.
 */
"use strict";

const escapeHtml = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

const formatCurrency = (n) =>
  Number(n).toLocaleString(APP_CONFIG.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €";

/**
 * format date
 * @param {*} s See docs/ARCHITECTURE.md for data flow and page variants.
 */
function formatDate(s) {
  return s
    ? new Date(s + "T12:00:00").toLocaleDateString(APP_CONFIG.locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
}
