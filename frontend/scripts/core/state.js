/**
 * @file scripts/core/state.js
 * Browser-local state, persistence and listing draft helpers. This is sample storage, not authentication or a database.
 */
"use strict";

/**
 * load local state
 */
function loadLocalState() {
  try {
    return JSON.parse(localStorage.getItem(APP_CONFIG.storageKey)) || {};
  } catch {
    return {};
  }
}

const storedState = loadLocalState();

const appState = {
  saved: storedState.saved || ["camera", "tent"],
  messages: storedState.messages || [],
  ownListings: storedState.ownListings || [],
  profile: storedState.profile || {
    first: "Ivan",
    last: "Petrović",
    email: "ivan.petrovic@example.com",
    phone: "+385 91 234 5678",
    city: "Zagreb",
  },
  booking: storedState.booking || null,
  tickets: storedState.tickets || [],
  reviews: storedState.reviews || [],
  query: "",
  category: "All",
  maxPrice: 100,
  sort: "recommended",
  location: "Zagreb",
  verifiedOnly: false,
  availableOnly: false,
  searchStart: "",
  searchEnd: "",
  map: false,
  rentalsTab: "active",
  listingStep: 0,
  listing: {
    title: "",
    description: "",
    category: "Photo & video",
    price: 15,
    deposit: 50,
    location: "Zagreb",
    type: "Item",
  },
  uploads: {},
  rating: 5,
  chat: "marko",
  adminFilter: "all",
  notificationsRead: false,
  handoverDone: false,
  returnDone: false,
  settingsTab: "profile",
  faqQuery: "",
  adminDecision: "",
  paused: [],
  published: false,
};

/**
 * save local state
 */
function saveLocalState() {
  try {
    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify({
        saved: appState.saved,
        messages: appState.messages,
        ownListings: appState.ownListings,
        profile: appState.profile,
        booking: appState.booking,
        tickets: appState.tickets,
        reviews: appState.reviews,
      }),
    );
  } catch {}
}

const findListing = (id) => sampleListings.find((p) => p.id === id) || sampleListings[0];

/**
 * get filtered listings
 */
function getFilteredListings() {
  let list = sampleListings.filter(
    (p) =>
      (appState.category === "All" || p.category === appState.category) &&
      p.price <= appState.maxPrice &&
      (!appState.query ||
        [p.name, p.category, p.desc]
          .join(" ")
          .toLocaleLowerCase("en")
          .includes(appState.query.toLocaleLowerCase("en"))) &&
      (!appState.location ||
        p.location.toLocaleLowerCase("en").includes(appState.location.toLocaleLowerCase("en")) ||
        appState.location.toLowerCase() === "zagreb and nearby") &&
      (!appState.verifiedOnly || p.id !== "workspace") &&
      (!appState.availableOnly || p.id !== "camera"),
  );
  if (appState.sort === "price-up") list.sort((a, b) => a.price - b.price);
  if (appState.sort === "price-down") list.sort((a, b) => b.price - a.price);
  if (appState.sort === "rating")
    list.sort((a, b) => Number(b.rating.replace(",", ".")) - Number(a.rating.replace(",", ".")));
  return list;
}

/**
 * prefill listing draft
 * @param {*} p See docs/ARCHITECTURE.md for data flow and page variants.
 */
function prefillListingDraft(p) {
  appState.listing = {
    title: p.title || p.name,
    description: p.description || p.desc,
    category: p.category,
    price: p.price,
    deposit: p.deposit ?? 30,
    location: p.location || "Zagreb",
    type: "Item",
    aiChecked: false,
  };
  appState.editId = p.id;
  appState.uploads["listing-0"] = "assets/images/" + p.img;
}

/**
 * capture listing draft
 */
function captureListingDraft() {
  const n = appState.listingStep,
    d = appState.listing;
  if (n === 0) {
    d.title = selectElement("#listing-title")?.value || d.title;
    d.description = selectElement("#listing-description")?.value || d.description;
    d.category = selectElement("#listing-category")?.value || d.category;
  }
  if (n === 2) {
    d.price = Number(selectElement("#listing-price")?.value || d.price);
    d.deposit = Number(selectElement("#listing-deposit")?.value || 0);
    d.location = selectElement("#listing-location")?.value || d.location;
    d.from = selectElement("#listing-from")?.value;
    d.to = selectElement("#listing-to")?.value;
    d.condition = selectElement("#listing-condition")?.value;
  }
}
