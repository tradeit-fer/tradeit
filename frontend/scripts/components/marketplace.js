/**
 * @file scripts/components/marketplace.js
 * Shared listing cards, search fields, illustrated map and sample review blocks.
 */
"use strict";

/**
 * render listing card
 * @param {*} p See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderListingCard(p) {
  return /* HTML */ `<article class="product-card">
    <div class="product-photo">
      <a href="#/product/${p.id}">${renderImage(p.img, p.name)}</a
      >${renderBadge(p.tag, "", "shield")}${renderButton("save", "", "heart", `iconbtn save ${appState.saved.includes(p.id) ? "saved" : ""}`, `data-id="${p.id}" aria-label="${appState.saved.includes(p.id) ? "Remove from saved" : "Save listing"}" aria-pressed="${appState.saved.includes(p.id)}"`)}
    </div>
    <div class="product-info">
      <div class="loc">${renderIcon("pin")}${p.location} · ${p.distance}</div>
      <a href="#/product/${p.id}">
        <h3>${p.name}</h3>
      </a>
      <div class="product-meta">
        <span> <b>${p.price} €</b> <small>/ day</small> </span>
        <span> <span class="star">★</span> ${p.rating} <small>(${p.reviews})</small> </span>
      </div>
    </div>
  </article>`;
}

/**
 * render search form
 * @returns {string} HTML for this view.
 */
function renderSearchForm() {
  return /* HTML */ `<form id="search-form" class="searchbar">
    <div class="searchcell">
      ${renderIcon("search")}
      <div>
        <label for="search-query">What would you like to rent?</label>
        <input
          id="search-query"
          name="query"
          value="${escapeHtml(appState.query)}"
          placeholder="Camera, drill, tent..."
        />
      </div>
    </div>
    <div class="searchcell">
      ${renderIcon("pin")}
      <div>
        <label for="search-location">Where?</label>
        <input
          id="search-location"
          name="location"
          placeholder="Zagreb and nearby"
          value="${escapeHtml(appState.location)}"
        />
      </div>
    </div>
    <div class="searchcell">
      ${renderIcon("calendar")}
      <div>
        <label for="search-start">From when?</label>
        <input id="search-start" name="start" type="date" value="${appState.searchStart}" />
      </div>
    </div>
    <button class="btn" type="submit">${renderIcon("search")}<span>Search</span></button>
  </form>`;
}

/**
 * render trust benefits
 * @returns {string} HTML for this view.
 */
function renderTrustBenefits() {
  return /* HTML */ `<div class="benefits">
    <div class="benefit">
      ${renderIcon("shield")}
      <div>
        <h4>Everything agreed in one place</h4>
        <p>Clear terms and support throughout your rental.</p>
      </div>
    </div>
    <div class="benefit">
      ${renderIcon("camera")}
      <div>
        <h4>A clear picture, before and after</h4>
        <p>Condition photos at pickup and return.</p>
      </div>
    </div>
    <div class="benefit">
      ${renderIcon("leaf")}
      <div>
        <h4>Buy less. Experience more.</h4>
        <p>Use things when you really need them.</p>
      </div>
    </div>
  </div>`;
}

/**
 * render illustrated map
 * @param {*} big See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderIllustratedMap(big = false) {
  return /* HTML */ `<div
    class="map ${big ? "explore-map" : ""}"
    style="${big ? "height:590px" : ""}"
  >
    <svg class="base" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="480" fill="#edf0e5" />
      <g fill="#e0e7d6">
        <rect x="65" y="52" width="150" height="104" rx="14" />
        <rect x="300" y="60" width="165" height="84" rx="12" />
        <rect x="560" y="45" width="169" height="140" rx="22" />
        <rect x="80" y="277" width="153" height="131" rx="13" />
        <rect x="335" y="260" width="185" height="146" rx="13" />
      </g>
      <path
        d="M-20 430C180 360 285 480 435 420S685 335 825 395"
        fill="none"
        stroke="#c5dbda"
        stroke-width="25"
      />
      <g fill="none" stroke="#fff" stroke-width="13">
        <path d="M-20 215h840M258-20v540M529-20v540M-20 47l850 255M90-20l90 540M700-20l-30 540" />
      </g>
      <path d="M0 222h800M265 0v480" stroke="#e4d5b7" stroke-width="4" fill="none" />
    </svg>
    <span class="map-label" style="left:42%;top:22%;font-size:21px;letter-spacing:.12em"
      >ZAGREB</span
    >
    <span class="map-label" style="left:10%;top:48%;font-size:9px">TREŠNJEVKA</span>
    <span class="map-label" style="left:60%;top:58%;font-size:10px">TRNJE</span>
    <span class="map-label" style="left:69%;top:20%;font-size:9px">MAKSIMIR</span>${sampleListings
      .slice(0, 6)
      .map(
        (p, i) =>
          /* HTML */ `<a
            class="map-pin"
            href="#/product/${p.id}"
            style="left:${[20, 28, 67, 48, 60, 39][i]}%;top:${[37, 72, 32, 43, 64, 54][i]}%"
            >${p.price} €</a
          >`,
      )
      .join("")}<span class="map-note">Illustrated location map</span>
    <a
      href="https://www.google.com/maps/search/?api=1&query=Zagreb"
      target="_blank"
      rel="noopener"
      class="btn small light"
      style="position:absolute;right:12px;bottom:12px;font-size:9px"
      >${renderIcon("external")}Google Maps</a
    >
  </div>`;
}

/**
 * render sample reviews
 * @returns {string} HTML for this view.
 */
function renderSampleReviews() {
  return /* HTML */ `<div class="review-block">
      <div class="between">
        <div class="host-mini">
          ${renderAvatar("ana")}
          <div>
            <h4>Ana Horvat</h4>
            <p>September 2026 · Camera rental</p>
          </div>
        </div>
        <span class="stars">★★★★★</span>
      </div>
      <p>
        Great communication and equipment in perfect condition. Marko explained everything at
        pickup. I would happily rent again!
      </p>
    </div>
    <div class="review-block">
      <div class="between">
        <div class="host-mini">
          <span class="avatar" style="background:#e4e9d1;color:#6a8053">LB</span>
          <div>
            <h4>Luka Babić</h4>
            <p>August 2026 · Camera rental</p>
          </div>
        </div>
        <span class="stars">★★★★★</span>
      </div>
      <p>Everything as agreed, quick replies and an easy return. Highly recommended.</p>
    </div>`;
}
