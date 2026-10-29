/**
 * @file scripts/core/router.js
 * Hash router connecting all page renderers. It supports direct static links and the browser back button.
 */
"use strict";

let currentRoute = "",
  lastModalFocus = null,
  toastTimer;

/**
 * navigate to
 * @param {*} route See docs/ARCHITECTURE.md for data flow and page variants.
 */
function navigateTo(route) {
  closeModal();
  if (location.hash === "#/" + route) {
    renderCurrentRoute();
    window.scrollTo(0, 0);
  } else location.hash = "/" + route;
}

/**
 * Render the current hash route into #app and update the document title.
 * @returns {void}
 */
function renderCurrentRoute() {
  currentRoute = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  closeModal();
  const [base, id] = currentRoute.split("/");
  let html;
  switch (base) {
    case "":
      html = renderHomePage();
      break;
    case "explore":
      html = renderExplorePage(false);
      break;
    case "explore-map":
      html = renderExplorePage(true);
      break;
    case "product":
      html = renderListingDetailsPage(id);
      break;
    case "booking":
      html = renderBookingPage(id);
      break;
    case "booking-success":
      html = renderBookingConfirmationPage();
      break;
    case "how":
      html = renderHowItWorksPage();
      break;
    case "dashboard":
      html = renderDashboardPage();
      break;
    case "rentals":
      html = renderRentalsPage();
      break;
    case "rental":
      html = renderRentalDetailsPage();
      break;
    case "handover":
      html = renderHandoverPage();
      break;
    case "return":
      html = renderHandoverPage(true);
      break;
    case "review":
      html = renderReviewPage();
      break;
    case "listings":
      html = renderMyListingsPage();
      break;
    case "new-listing":
      html = renderListingWizardPage();
      break;
    case "edit-listing":
      if (!appState.listing.title) {
        prefillListingDraft(sampleListings[5]);
        appState.listingStep = 0;
      }
      html = renderListingWizardPage(true);
      break;
    case "saved":
      html = renderSavedListingsPage();
      break;
    case "messages":
      html = renderMessagesPage();
      break;
    case "host":
      html = renderProfilePage(true);
      break;
    case "profile":
      html = renderProfilePage();
      break;
    case "settings":
      html = renderSettingsPage();
      break;
    case "verification":
      html = renderVerificationPage();
      break;
    case "payments":
      html = renderPaymentsPage();
      break;
    case "notifications":
      html = renderNotificationsPage();
      break;
    case "support":
      html = renderHelpCentrePage();
      break;
    case "tickets":
      html = id === "new" ? renderNewSupportRequestPage() : renderSupportRequestPage();
      break;
    case "login":
    case "register":
    case "forgot":
      html = renderAuthenticationPage(base);
      break;
    case "admin":
      html =
        id === "tickets"
          ? renderAdminRequestsPage()
          : id === "ticket"
            ? renderAdminRequestDetailPage(currentRoute.split("/")[2])
            : id === "listings"
              ? renderAdminModerationPage()
              : id === "users"
                ? renderAdminMembersPage()
                : renderAdminDashboardPage();
      break;
    default:
      html = renderPublicLayout(
        /* HTML */ `<div class="empty">
          <div class="empty-icon">${renderIcon("search")}</div>
          <h1>This plan leads somewhere else.</h1>
          <p>Page not found. Go back home and keep exploring.</p>
          ${renderLink("", "Go home", "home")}
        </div>`,
      );
  }
  selectElement("#app").innerHTML = html;
  document.title =
    (base
      ? ({
          explore: "Explore",
          product: "Listing details",
          booking: "Booking",
          dashboard: "My overview",
          rentals: "My rentals",
          messages: "Messages",
          admin: "Administration",
          support: "Help & support",
        }[base] || "Your next great plan") + " · "
      : "") + "TradeIt";
  if (base === "product" || base === "booking") updateBookingPrice();
}
