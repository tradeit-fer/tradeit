/**
 * @file scripts/config.js
 * Shared configuration. This build uses local sample data and makes no API calls.
 * Load this file before every other application script.
 */
"use strict";
const APP_CONFIG = Object.freeze({
  // Change when the persisted state schema changes.
  storageKey: "tradeit.frontend.v1",
  // Keep enabled while reviewing the 35 screens; disable for the final customer UI.
  showScreenNavigator: true,
  locale: "en-GB",
  // Illustrative fee. A connected backend must return the authoritative quote.
  platformFeeRate: 0.1,
});
