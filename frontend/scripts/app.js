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

async function initializeAuthentication() {
    try {
        const user = await authService.getCurrentUser();

        if (user) {
            console.log("Logged in:", user.name, user.role);
        } else {
            console.log("Not logged in");
        }
    } catch (error) {
        console.error("Authentication check failed:", error);
    }
}

initializeAuthentication();
