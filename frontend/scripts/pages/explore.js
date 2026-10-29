/**
 * @file scripts/pages/explore.js
 * Page template: explore. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the explore screen using the shared TradeIt design system.
 * @param {*} mapMode See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderExplorePage(mapMode = false) {
  appState.map = mapMode;
  const list = getFilteredListings();
  return renderPublicLayout(
    /* HTML */ `${renderPageHeading("What do you need today?", "A great plan starts with the right thing. Find it in your neighbourhood.")}
      ${renderSearchForm()}
      <div class="explore-layout">
        <aside class="filters" id="filters">
          <div class="between">
            <h3>Filters</h3>
            ${renderButton("reset-filters", "Clear", "", "link small")}
          </div>
          <h4>Categories</h4>
          ${listingCategories
            .map(
              ([c, i]) =>
                /* HTML */ `<label class="checkrow">
                  <input
                    type="radio"
                    name="category-filter"
                    value="${c}"
                    ${appState.category === c ? "checked" : ""}
                  />${c}<span
                    >${c === "All" ? sampleListings.length : sampleListings.filter((p) => p.category === c).length}</span
                  >
                </label>`,
            )
            .join("")}
          <hr />
          <h4>Price per day</h4>
          <input
            type="range"
            id="price-range"
            aria-label="Maximum daily price"
            min="1"
            max="100"
            value="${appState.maxPrice}"
          />
          <div class="between small muted mt12">
            <span>1 €</span>
            <span id="price-label">Up to ${appState.maxPrice} €</span>
          </div>
          <hr />
          <h4>Availability</h4>
          <div class="field">
            <label for="filter-date" class="muted">Pickup date</label>
            <input type="date" id="filter-date" value="${appState.searchStart}" />
          </div>
          <label class="checkrow mt12">
            <input
              id="available-filter"
              type="checkbox"
              ${appState.availableOnly ? "checked" : ""}
            />Available today</label
          >
          <hr />
          <h4>More options</h4>
          <label class="checkrow">
            <input
              id="verified-filter"
              type="checkbox"
              ${appState.verifiedOnly ? "checked" : ""}
            />Verified members</label
          >
          <div class="notice mt28">
            ${renderIcon("shield")}
            <p>Your rental agreement and condition records stay together.</p>
          </div>
        </aside>
        <section>
          <div class="filterbar">
            <strong class="grow" style="font-size:12px"
              >${list.length} ${list.length === 1 ? "result" : "results"}
              <span class="muted" style="font-weight:400">near you</span>
            </strong>
            <button class="chip mobile-only" data-action="filters">
              ${renderIcon("filter")}Filters
            </button>
            <select id="sort" class="sort" aria-label="Sort listings">
              <option value="recommended" ${appState.sort === "recommended" ? "selected" : ""}>
                Recommended
              </option>
              <option value="price-up" ${appState.sort === "price-up" ? "selected" : ""}>
                Price: low to high
              </option>
              <option value="price-down" ${appState.sort === "price-down" ? "selected" : ""}>
                Price: high to low
              </option>
              <option value="rating" ${appState.sort === "rating" ? "selected" : ""}>
                Highest rated
              </option>
            </select>
            <div class="switcher">
              ${renderButton("view-list", "List", "grid", !mapMode ? "active" : "")}${renderButton("view-map", "Map", "map", mapMode ? "active" : "")}
            </div>
          </div>
          ${
            appState.category !== "All" || appState.query
              ? /* HTML */ `<div class="filterbar">
                  <span class="chip active">${escapeHtml(appState.query || appState.category)}</span
                  >${renderButton("reset-filters", "Clear filters", "close", "link small")}
                </div>`
              : ""
          }${
            mapMode
              ? renderIllustratedMap(true)
              : list.length
                ? /* HTML */ `<div class="product-grid">
                      ${list.map(renderListingCard).join("")}
                    </div>
                    <p class="state-line mt28">
                      You are viewing all listings that match your filters.
                    </p>`
                : /* HTML */ `<div class="empty">
                    <div class="empty-icon">${renderIcon("search")}</div>
                    <h2>We could not find that item.</h2>
                    <p>Try another search, a broader category or a higher price limit.</p>
                    ${renderButton("reset-filters", "View all listings", "arrow")}
                  </div>`
          }
        </section>
      </div>`,
  );
}
