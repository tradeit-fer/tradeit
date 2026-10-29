/**
 * @file scripts/pages/messages.js
 * Page template: messages. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the messages screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderMessagesPage() {
  const contacts = [
    ["marko", "Marko Kovač", "See you tomorrow at 10!", "10:24"],
    ["ana", "Ana Horvat", "Thanks, the speaker was great!", "Yesterday"],
    ["support", "TradeIt support", "We have reviewed your request.", "10 Oct"],
  ];
  const selected = contacts.find((c) => c[0] === appState.chat) || contacts[0];
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Messages", "Good agreements start with a conversation.")}
      <div class="message-layout">
        <aside class="chat-list">
          <div class="chat-list-head">
            <input
              id="contact-search"
              placeholder="Search conversations"
              aria-label="Search conversations"
              style="font-size:11px"
            />
          </div>
          ${contacts
            .map(
              ([id, n, t, time]) =>
                /* HTML */ `<button
                  class="chat-contact ${id === appState.chat ? "active" : ""}"
                  data-action="chat-select"
                  data-chat="${id}"
                >
                  ${id === "support" ? '<span class="avatar" style="background:#e6efda;color:#50773b">T</span>' : renderAvatar(id)}
                  <div class="grow">
                    <div class="between">
                      <h4>${n}</h4>
                      <small>${time}</small>
                    </div>
                    <p>${t}</p>
                  </div>
                </button>`,
            )
            .join("")}
        </aside>
        <section class="chat-area">
          <div class="chat-head">
            <div class="host-mini">
              ${appState.chat === "support" ? '<span class="avatar">T</span>' : renderAvatar(appState.chat)}
              <div>
                <h3>${selected[1]}</h3>
                <p>
                  ${appState.chat === "support" ? "Customer support team" : "Verified member · Replies within an hour"}
                </p>
              </div>
            </div>
            ${renderLink(appState.chat === "support" ? "tickets/current" : "host/marko", "", "user", "iconbtn")}
          </div>
          <a
            href="#/${appState.chat === "support" ? "tickets/current" : "rental/current"}"
            class="chat-product"
            >${renderImage(appState.chat === "ana" ? "speaker.jpg" : "camera.jpg", "Rented item")}
            <div class="grow">
              <h4>
                ${appState.chat === "ana" ? "JBL portable speaker" : "Sony Alpha · camera & lenses"}
              </h4>
              <p>
                ${appState.chat === "support" ? "Support request TI-0248" : "Rental #TI-0284 · 10–13 October"}
              </p>
            </div>
            ${renderBadge(appState.chat === "support" ? "In review" : "Active rental")}${renderIcon("chevron")}</a
          >
          <div class="chat-body" id="chat-body">
            <div class="chat-day">12 OCTOBER 2026</div>
            ${
              appState.chat === "marko"
                ? /* HTML */ `<div class="bubble me">
                      Hi Marko! Just checking, would tomorrow around 10 am work for the
                      return?<small>10:12 · ✓✓</small>
                    </div>
                    <div class="bubble">
                      Hi Ivan, of course! Same place as pickup. Hope your photos turned out
                      great!<small>10:19</small>
                    </div>
                    <div class="bubble me">
                      Perfect, thanks! We are really happy with them. I will photograph the
                      condition before returning it.<small>10:22 · ✓✓</small>
                    </div>
                    <div class="bubble">Great, see you tomorrow at 10!<small>10:24</small></div>`
                : appState.chat === "ana"
                  ? /* HTML */ `<div class="bubble">
                        Hi Ivan, thanks for making everything so easy. The speaker was great!<small
                          >Yesterday · 17:30</small
                        >
                      </div>
                      <div class="bubble me">
                        Glad to hear it! Thank you for taking such good care of it.<small
                          >Yesterday · 17:42</small
                        >
                      </div>`
                  : /* HTML */ `<div class="bubble">
                      Hello, we have received your request TI-0248. We are comparing the reports and
                      photos. Please add any further information to your request.<small
                        >10 Oct · 14:10</small
                      >
                    </div>`
            }${appState.messages
              .filter((m) => m.chat === appState.chat)
              .map(
                (m) =>
                  /* HTML */ `<div class="bubble me">
                    ${escapeHtml(m.text)}<small>${m.time} · ✓</small>
                  </div>`,
              )
              .join("")}
          </div>
          <form id="message-form" class="chat-input">
            <input
              name="message"
              placeholder="Write a message..."
              aria-label="Message"
              required
              maxlength="2000"
              autocomplete="off"
            />
            <button class="btn" type="submit" aria-label="Send message">
              ${renderIcon("send")}
            </button>
          </form>
        </section>
      </div>`,
  );
}
