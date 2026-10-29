/**
 * @file scripts/app.js
 * Application entry point. All deferred scripts above it must finish loading before the initial render.
 */
"use strict";

window.addEventListener("hashchange", () => {
  renderCurrentRoute();
  window.scrollTo(0, 0);
});

renderCurrentRoute();
