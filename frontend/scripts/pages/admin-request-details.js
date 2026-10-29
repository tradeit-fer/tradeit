/**
 * @file scripts/pages/admin-request-details.js
 * Page template: admin request details. Keep presentation here and data operations in the core/service layer.
 */
"use strict";

/**
 * Render the admin request details screen using the shared TradeIt design system.
 * @param {*} id See docs/ARCHITECTURE.md for data flow and page variants.
 * @returns {string} HTML for this view.
 */
function renderAdminRequestDetailPage(id) {
  const t = adminTickets.find((t) => t.id === id) || adminTickets[0];
  return renderAccountLayout(
    /* HTML */ `<div class="breadcrumbs" style="margin-top:0">
<a href="#/admin/tickets">Reports & disputes</a>${renderIcon("chevron")}<span>${t.id}</span>
</div>${renderPageHeading(t.name, `Request #${t.id} · Rental #TI-0284`, renderBadge(appState.adminDecision ? "Resolved" : t.status, appState.adminDecision ? "" : "amber"))}<div class="two-col">
<div class="stack">
<div class="card">
<div class="between">
<h3>Request summary</h3>${renderBadge(t.priority + " priority", t.priority === "High" ? "red" : "amber")}</div>
<p class="small mt20">The member reports a disagreement about the item's condition. Review the agreement, pickup report and photos attached to the request.</p>
<div class="grid2 mt20">
<div class="panel">
<div class="host-mini">${renderAvatar("me")}<div>
<h4>${t.person}</h4>
<p>Submitted by · renter</p>
</div>
</div>
</div>
<div class="panel">
<div class="host-mini">${renderAvatar()}<div>
<h4>Marko Kovač</h4>
<p>Owner</p>
</div>
</div>
</div>
</div>
</div>
<div class="card">
<div class="between">
<h3>Photos & evidence</h3>${renderButton("gallery", "Enlarge", "eye", "link small", 'data-id="camera"')}</div>
<div class="split-evidence mt20">
<div class="evidence-box">${renderImage("camera.jpg", "Pickup condition report")}<p>
<b>Before rental</b>
<br>10 October, 10:04 · condition report</p>
</div>
<div class="evidence-box">${renderImage("camera.jpg", "Photo attached to the request", "", 'style="object-position:65% 25%"')}<p>
<b>Photo from the request</b>
<br>10 October, 12:42 · attachment</p>
</div>
</div>
<div class="notice mt20">${renderIcon("info")}<p>These are sample photos. The comparison does not establish that any real damage occurred.</p>
</div>
</div>
<div class="card">
<h3>Messages & notes</h3>
<div class="ticket-message">
<div class="host-mini">${renderAvatar("me")}<div>
<h4>${t.person}</h4>
<p>10 October · 12:42</p>
</div>
</div>
<p>I noticed a mark on the lens body and would like to check whether it was present at pickup.</p>
</div>
<div class="ticket-message">
<div class="host-mini">${renderAvatar()}<div>
<h4>Marko Kovač</h4>
<p>10 October · 15:20</p>
</div>
</div>
<p>The lens has a small mark from earlier use. I can add a photo taken before pickup.</p>
</div>
<form id="admin-note-form" class="mt20">
<label for="admin-note">Internal note</label>
<textarea id="admin-note" name="note" placeholder="Record the facts reviewed and the next step..." required>
</textarea>
<button class="btn light mt12" type="submit">Add note</button>
<div id="admin-notes">
</div>
</form>
</div>
</div>
<aside class="stack">
<form id="admin-decision-form" class="card">
<h3>Case management</h3>
<div class="field mt20">
<label for="ticket-owner">Assigned to</label>
<select id="ticket-owner">
<option>Ana Kovač · me</option>Luka Horvat</option>Petra Jurić</option>
</select>
</div>
<div class="field">
<label for="decision">Proposed outcome</label>
<select id="decision" name="decision">
<option value="">Choose an outcome</option>
<option>Additional information requested</option>
<option>Both parties reached an agreement</option>
<option>Request closed with no further action</option>
<option>Referred to the relevant team</option>
</select>
</div>
<div class="field">
<label for="decision-reason">Reasoning</label>
<textarea id="decision-reason" name="reason" style="min-height:140px" placeholder="State the facts supporting your decision." required minlength="15">
</textarea>
</div>
<button type="submit" class="btn wide">Record outcome ${renderIcon("check")}</button>
<p class="state-line">This preview saves the outcome locally.</p>
</form>
<div class="card">
<h4>Related rental</h4>
<a href="#/rental/current" class="host-mini mt20">${renderImage("camera.jpg", "Camera", "thumb", 'style="width:48px;height:48px;border-radius:8px"')}<div>
<h4>Sony Alpha</h4>
<p class="small">TI-0284 · €82.50</p>
</div>${renderIcon("chevron")}</a>
<hr>
<div class="cost-row">
<span>Refundable deposit</span>
<strong>150.00 €</strong>
</div>
</div>
</aside>
</div>`,
    true,
  );
}
