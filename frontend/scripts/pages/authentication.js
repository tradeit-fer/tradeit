/**
 * @file scripts/pages/authentication.js
 * Page template: authentication. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the authentication screen using the shared TradeIt design system.
 * @param {*} mode See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderAuthenticationPage(mode = "login") {
  const isRegister = mode === "register",
    forgot = mode === "forgot";
  return /* HTML */ `${renderSiteHeader()}
    <main id="main" tabindex="-1" class="auth">
      <section class="auth-story">
        <div class="eyebrow">WELCOME TO THE NEIGHBOURHOOD</div>
        <h1>Big plans.<br />Without big purchases.</h1>
        <p>Find what you need. Share what you have. Make room for new experiences.</p>
        ${renderImage("camping.jpg", "A morning outdoors", "auth-photo")}
        <div class="host-mini mt28">
          ${renderAvatar("ana")}
          <div>
            <h4>“Exactly what I need. Just when I need it.”</h4>
            <p class="small">Ana · TradeIt community member · example profile</p>
          </div>
        </div>
      </section>
      <section class="auth-main">
        <div class="auth-form">
          ${
            forgot
              ? /* HTML */ `<div class="empty-icon green mb20">${renderIcon("lock")}</div>
                  <h1>Forgot your password?</h1>
                  <p>It happens. Enter your email to preview the account recovery flow.</p>
                  <form id="forgot-form">
                    ${renderInputField("Email address", "forgot-email", "", "email", 'required placeholder="name@example.com"')}<button
                      class="btn wide"
                      type="submit"
                    >
                      Continue ${renderIcon("arrow")}
                    </button>
                  </form>
                  <p class="state-line mt20">No email is sent from this preview.</p>
                  ${renderLink("login", "Back to sign in", "back", "link small mt28")}`
              : /* HTML */ `<h1>
                    ${isRegister ? "Join a good circle." : "Good to see you again."}
                  </h1>
                  <p>
                    ${isRegister ? "Your next great plan starts here." : "Sign in and pick up where you left off."}
                  </p>
                  ${renderButton("google-login", "Continue with Google", "", "btn light wide", 'style="font-size:12px"')}
                  <div class="or">or with your email</div>
                  <form id="auth-form" data-mode="${mode}">
                    ${isRegister ? renderInputField("Full name", "auth-name", "", "text", 'required placeholder="Your full name"') : ""}${renderInputField("Email address", "auth-email", "", "email", 'required placeholder="name@example.com"')}
                    <div class="field">
                      <div class="between">
                        <label for="auth-password">Password</label
                        >${!isRegister ? renderLink("forgot", "Forgot your password?", "", "link small") : ""}
                      </div>
                      <div class="flex gap8">
                        <input
                          id="auth-password"
                          name="auth-password"
                          type="password"
                          required
                          placeholder="${isRegister ? "Create a password" : "Enter your password"}"
                          autocomplete="${isRegister ? "new-password" : "current-password"}"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          class="iconbtn"
                          data-action="password"
                          aria-label="Show password"
                        >
                          ${renderIcon("eye")}
                        </button>
                      </div>
                    </div>
                    ${isRegister ? /* HTML */ `<div class="mb20">${renderCheckbox("I have read and agree to the User Agreement.", "auth-terms")}</div>` : ""}<button
                      class="btn wide"
                      type="submit"
                    >
                      ${isRegister ? "Create account" : "Sign in"}
                      ${renderIcon("arrow")}
                    </button>
                  </form>
                  <div class="center small mt28">
                    ${isRegister ? "Already have an account?" : "New here?"}
                    ${renderLink(isRegister ? "login" : "register", isRegister ? "Sign in" : "Sign up", "", "link")}
                  </div>
                  <div class="center mt20">
                    ${renderLink("explore", "Continue as a guest", "arrow", "link small")}
                  </div>`
          }
        </div>
      </section>
    </main>
    ${renderScreenNavigator()}`;
}
