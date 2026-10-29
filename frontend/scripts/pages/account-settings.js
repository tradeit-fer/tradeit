/**
 * @file scripts/pages/account-settings.js
 * Page template: account settings. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the account settings screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderSettingsPage() {
  const tab = appState.settingsTab;
  let form =
    tab === "profile"
      ? /* HTML */ `<form id="settings-form">
          <div class="host-mini mb20">
            ${renderAvatar("me", "large")}
            <div>
              <h3>Personal details</h3>
              <p class="small mt12">Update your profile information.</p>
            </div>
          </div>
          <div class="form-grid">
            ${renderInputField("First name", "first", appState.profile.first, "text", "required")}${renderInputField("Last name", "last", appState.profile.last, "text", "required")}${renderInputField("Email", "email", appState.profile.email, "email", "required")}${renderInputField("Phone number", "phone", appState.profile.phone, "tel")}${renderInputField("City", "city", appState.profile.city, "text", "required")}
          </div>
          <div class="field">
            <label for="bio">About me</label>
            <textarea id="bio" name="bio">
${escapeHtml(appState.profile.bio || "I enjoy trying new things and sharing equipment I do not use every day.")}</textarea>
          </div>
          <button type="submit" class="btn">Save changes ${renderIcon("check")}</button>
        </form>`
      : tab === "security"
        ? /* HTML */ `<h3>Account security</h3>
            <div class="setting-row">
              <div>
                <h4>Identity verification</h4>
                <p>Review your verified account details.</p>
              </div>
              ${renderLink("verification", "Overview", "chevron", "link small")}
            </div>
            <div class="setting-row">
              <div>
                <h4>Password</h4>
                <p>Manage your alternative sign-in method.</p>
              </div>
              ${renderLink("forgot", "Change", "", "link small")}
            </div>
            <div class="setting-row">
              <div>
                <h4>Two-step verification</h4>
                <p>An extra layer of protection for your account.</p>
              </div>
              <button
                type="button"
                class="toggle on"
                data-action="toggle"
                role="switch"
                aria-checked="true"
                aria-label="Two-step verification"
              ></button>
            </div>
            <div class="notice mt20">
              ${renderIcon("info")}
              <p>
                Security controls are a frontend preview. Authentication must be connected before
                these settings can protect an account.
              </p>
            </div>`
        : tab === "notifications"
          ? /* HTML */ `<h3>Notifications your way</h3>
              ${["New messages", "Rental requests", "Return reminders", "News & recommendations"]
                .map(
                  (l, i) =>
                    /* HTML */ `<div class="setting-row">
                      <div>
                        <h4>${l}</h4>
                        <p>
                          ${["When you receive a new message.", "Booking confirmations and status changes.", "The day before an active rental is due back.", "Interesting listings and community updates."][i]}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="toggle ${i < 3 ? "on" : ""}"
                        data-action="toggle"
                        role="switch"
                        aria-checked="${i < 3}"
                        aria-label="${l}"
                      ></button>
                    </div>`,
                )
                .join("")}`
          : /* HTML */ `<h3>Privacy settings</h3>
              <div class="setting-row">
                <div>
                  <h4>Show my city on my profile</h4>
                  <p>Your exact address stays private.</p>
                </div>
                <button
                  type="button"
                  class="toggle on"
                  data-action="toggle"
                  role="switch"
                  aria-checked="true"
                  aria-label="Show city"
                ></button>
              </div>
              <div class="setting-row">
                <div>
                  <h4>Show active listings</h4>
                  <p>Visitors can see what you share.</p>
                </div>
                <button
                  type="button"
                  class="toggle on"
                  data-action="toggle"
                  role="switch"
                  aria-checked="true"
                  aria-label="Show listings"
                ></button>
              </div>
              <hr />
              ${renderButton("delete-account", "Request account deletion", "", "btn danger small")}
              <p class="small mt12">Review the request before confirming.</p>`;
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Account settings", "Your details, security and preferences, all in one place.")}
      <div class="settings-layout">
        <nav class="settings-nav">
          ${[
            ["profile", "Personal details"],
            ["security", "Security"],
            ["notifications", "Notifications"],
            ["privacy", "Privacy"],
          ]
            .map(
              ([id, l]) =>
                /* HTML */ `<a
                  href="#/settings"
                  data-action="settings-tab"
                  data-tab="${id}"
                  class="${tab === id ? "active" : ""}"
                  >${l}</a
                >`,
            )
            .join("")}
        </nav>
        <div class="card">${form}</div>
      </div>`,
  );
}
