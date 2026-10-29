/**
 * @file scripts/core/dialogs.js
 * Accessible dialogs, focus restoration, screen directory and non-blocking status messages.
 */
"use strict";

/**
 * show toast
 * @param {*} message See docs/ARCHITECTURE.md for data flow and page variants.
 */
function showToast(message) {
  const el = selectElement("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3800);
}

/**
 * show modal
 * @param {*} html See docs/ARCHITECTURE.md for data flow and page variants.
 * @param {*} wide See docs/ARCHITECTURE.md for data flow and page variants.
 */
function showModal(html, wide = false) {
  lastModalFocus = document.activeElement;
  selectElement("#modal-root").innerHTML = /* HTML */ `<div
    class="screen-overlay"
    data-overlay="true"
  >
    <section
      class="${wide ? "screen-panel" : "modal-panel"}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      ${html}
    </section>
  </div>`;
  document.body.style.overflow = "hidden";
  setTimeout(
    () => selectElement("#modal-root button, #modal-root a, #modal-root input")?.focus(),
    0,
  );
}

/**
 * close modal
 */
function closeModal() {
  if (!selectElement("#modal-root")) return;
  selectElement("#modal-root").innerHTML = "";
  document.body.style.overflow = "";
  if (lastModalFocus?.isConnected) lastModalFocus.focus();
  lastModalFocus = null;
}

/**
 * render dialog heading
 * @param {*} title See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderDialogHeading(title) {
  return /* HTML */ `<div class="between">
    <h2 id="modal-title">${title}</h2>
    ${renderButton("close", "", "close", "iconbtn", 'aria-label="Close dialog"')}
  </div>`;
}

/**
 * open screen navigator
 */
function openScreenNavigator() {
  showModal(
    /* HTML */ `${renderDialogHeading("Every screen. One connected journey.")}
      <p>From the first search to a successful return. Choose a screen to explore the interface.</p>
      <div class="screen-groups">
        ${screenGroups
          .map(
            ([title, routes], g) =>
              /* HTML */ `<section class="screen-group">
                <h3>${title}</h3>
                ${routes
                  .map(
                    ([r, label, icon], i) =>
                      /* HTML */ `<a class="screen-link" href="#/${r}" data-screen-link="true"
                        >${renderIcon(icon)}${label}<span class="screen-num"
                          >${String(screenGroups.slice(0, g).reduce((n, v) => n + v[1].length, 0) + i + 1).padStart(2, "0")}</span
                        >
                      </a>`,
                  )
                  .join("")}
              </section>`,
          )
          .join("")}
      </div>
      <div class="notice mt28">
        ${renderIcon("info")}
        <p>
          Interactive frontend with sample data. Actions stay in this browser. Payments,
          authentication, AI checks and support services require backend integration.
        </p>
      </div>`,
    true,
  );
}
