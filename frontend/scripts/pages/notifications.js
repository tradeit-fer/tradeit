/**
 * @file scripts/pages/notifications.js
 * Page template: notifications. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the notifications screen using the shared TradeIt design system.
 * @returns {string} HTML for this view.
 */
function renderNotificationsPage() {
  return renderAccountLayout(
    /* HTML */ `${renderPageHeading("Notifications", "Everything important, at a glance.", renderButton("read-notifications", appState.notificationsRead ? "All caught up" : "Mark all as read", "check", "btn light small"))}
      <div class="section-card">
        ${[
          [
            "chat",
            "New message from Marko",
            "“All good, see you tomorrow at 10!”",
            "12 minutes ago",
            "messages",
          ],
          [
            "calendar",
            "Your camera is due back tomorrow",
            "Add condition photos before returning the item.",
            "30 minutes ago",
            "return",
          ],
          [
            "check",
            "Booking confirmed",
            "Cordless drill · 14–16 October.",
            "1 hour ago",
            "rental/current",
          ],
          [
            "star",
            "Ana left a review",
            "“Everything as agreed, a great owner!”",
            "Yesterday",
            "profile",
          ],
          [
            "wallet",
            "Payout recorded",
            "€24.00 · Graphing calculator rental.",
            "8 October",
            "payments",
          ],
        ]
          .map(
            ([i, t, d, time, r], n) =>
              /* HTML */ `<a
                href="#/${r}"
                class="activity ${n < 3 && !appState.notificationsRead ? "notification-unread" : ""}"
              >
                <div class="activity-icon">${renderIcon(i)}</div>
                <div class="grow">
                  <h4>${t}</h4>
                  <p>${d}</p>
                </div>
                <time>${time}</time
                >${n < 3 && !appState.notificationsRead ? '<span class="notification-dot"></span>' : ""}</a
              >`,
          )
          .join("")}
      </div>`,
  );
}
