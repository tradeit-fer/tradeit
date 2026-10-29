/**
 * @file scripts/components/ui.js
 * Reusable HTML components: buttons, links, inputs, avatars, badges and section headings.
 */
"use strict";

const renderLink = (url, label, icon = "", cls = "btn") =>
  /* HTML */ `<a
    class="${cls}"
    href="#/${url}"
    ${label ? "" : `aria-label="${url.startsWith("rental/") ? "View rental details" : "Open details"}"`}
    >${icon ? renderIcon(icon) : ""}${label}</a
  >`;

const renderButton = (action, label, icon = "", cls = "btn", attrs = "") =>
  /* HTML */ `<button class="${cls}" data-action="${action}" ${attrs}>
    ${icon ? renderIcon(icon) : ""}${label}
  </button>`;

const renderBadge = (label, color = "", icon = "") =>
  /* HTML */ `<span class="badge ${color}">${icon ? renderIcon(icon) : ""}${label}</span>`;

const renderImage = (name, alt, cls = "", extra = "") =>
  /* HTML */ `<img
    src="assets/images/${name}"
    alt="${escapeHtml(alt)}"
    class="${cls}"
    ${extra}
    loading="lazy"
  />`;

const renderAvatar = (who = "marko", size = "") =>
  who === "me"
    ? /* HTML */ `<span class="avatar ${size}">IP</span>`
    : renderImage(
        who === "ana" ? "avatar-ana.jpg" : "avatar.jpg",
        who === "ana" ? "Ana Horvat" : "Marko Kovač",
        `avatar ${size}`,
      );

const renderSectionHeading = (title, sub = "", url = "", label = "View all") =>
  /* HTML */ `<div class="section-head">
    <div>
      <h2>${title}</h2>
      ${sub ? /* HTML */ `<p>${sub}</p>` : ""}
    </div>
    ${url ? renderLink(url, label, "arrow", "link") : ""}
  </div>`;

const renderPageHeading = (title, sub = "", action = "") =>
  /* HTML */ `<div class="page-title ${action ? "between" : ""}">
    <div>
      <h1>${title}</h1>
      ${sub ? /* HTML */ `<p>${sub}</p>` : ""}
    </div>
    ${action}
  </div>`;

const renderInputField = (label, name, value = "", type = "text", extra = "") =>
  /* HTML */ `<div class="field">
    <label for="${name}">${label}</label>
    <input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${extra} />
  </div>`;

const renderCheckbox = (label, name = "", checked = false) =>
  /* HTML */ `<label class="check-label">
    <input
      type="checkbox"
      ${name ? `name="${name}"` : ""}
      ${checked ? "checked" : ""}
    />${label}</label
  >`;
