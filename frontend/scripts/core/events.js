/**
 * @file scripts/core/events.js
 * Delegated form, click, input, file and keyboard handlers. Browser-local actions are the integration points for backend calls.
 */
"use strict";

document.addEventListener("click", async (event) => {
  // The skip link moves focus without changing the hash route.
  if (event.target.closest(".skip-link")) {
    event.preventDefault();
    const main = selectElement("#main");
    main?.focus();
    main?.scrollIntoView({ block: "start" });
    return;
  }
  const category = event.target.closest("[data-category]");
  if (category) {
    appState.category = category.dataset.category;
    appState.query = "";
    if (currentRoute.startsWith("explore")) {
      event.preventDefault();
      renderCurrentRoute();
    }
    return;
  }
  const screen = event.target.closest("[data-screen-link]");
  if (screen) {
    const target = screen.getAttribute("href").replace("#/", "");
    if (target === "new-listing") {
      appState.listingStep = 0;
      appState.listing = {
        title: "",
        description: "",
        category: "Photo & video",
        price: 15,
        deposit: 50,
        location: "Zagreb",
        type: "Item",
      };
    }
    if (target === "edit-listing") {
      prefillListingDraft(sampleListings[5]);
      appState.listingStep = 0;
    }
    closeModal();
    if (target === currentRoute) {
      event.preventDefault();
      renderCurrentRoute();
    }
    return;
  }
  if (event.target.matches("[data-overlay]")) {
    closeModal();
    return;
  }
  const el = event.target.closest("[data-action]");
  if (!el) return;
  event.preventDefault();
  const a = el.dataset.action;
  switch (a) {
    case "screens":
      openScreenNavigator();
      break;
    case "close":
      closeModal();
      break;
    case "save": {
      const id = el.dataset.id;
      appState.saved = appState.saved.includes(id)
        ? appState.saved.filter((x) => x !== id)
        : [...appState.saved, id];
      saveLocalState();
      if (currentRoute === "saved") renderCurrentRoute();
      else {
        selectElements(`[data-action="save"][data-id="${id}"]`).forEach((b) => {
          b.classList.toggle("saved", appState.saved.includes(id));
          b.setAttribute("aria-pressed", String(appState.saved.includes(id)));
          b.setAttribute(
            "aria-label",
            appState.saved.includes(id) ? "Remove from saved" : "Save listing",
          );
        });
      }
      showToast(
        appState.saved.includes(id) ? "Listing saved for later." : "Listing removed from saved.",
      );
      break;
    }
    case "reset-filters":
      appState.category = "All";
      appState.query = "";
      appState.maxPrice = 100;
      appState.sort = "recommended";
      appState.location = "Zagreb";
      appState.verifiedOnly = false;
      appState.availableOnly = false;
      appState.searchStart = "";
      renderCurrentRoute();
      break;
    case "filters":
      selectElement("#filters").classList.toggle("show");
      break;
    case "view-list":
      navigateTo("explore");
      break;
    case "view-map":
      navigateTo("explore-map");
      break;
    case "gallery": {
      const p = findListing(el.dataset.id);
      showModal(
        /* HTML */ `${renderDialogHeading(p.name)}<img
            src="assets/images/${p.img}"
            alt="${p.name}"
            style="width:100%;max-height:65vh;object-fit:contain;border-radius:12px;margin-top:20px"
          />
          <p>Sample listing photo.</p>`,
        true,
      );
      break;
    }
    case "share":
      try {
        await navigator.clipboard.writeText(location.href);
        showToast("Listing link copied.");
      } catch {
        showModal(
          /* HTML */ `${renderDialogHeading("Share listing")}
            <p>Copy this link.</p>
            <input value="${escapeHtml(location.href)}" readonly aria-label="Listing link" />`,
        );
      }
      break;
    case "rental-tab":
      appState.rentalsTab = el.dataset.tab;
      renderCurrentRoute();
      break;
    case "accept-rental":
      el.textContent = "Accepted";
      el.disabled = true;
      el.closest(".rental-card").querySelector(".badge").outerHTML = renderBadge("Confirmed");
      showToast("Sample request accepted.");
      break;
    case "cancel-rental":
      showModal(
        /* HTML */ `${renderDialogHeading("Request cancellation")}
          <p>
            This rental has already started. Describe your reason so the owner and support team can
            consider a change to the agreement.
          </p>
          <form id="cancel-form">
            <label for="cancel-reason">Cancellation reason</label>
            <textarea
              id="cancel-reason"
              name="reason"
              required
              minlength="10"
              placeholder="Describe what has changed..."
            ></textarea>
            <button type="submit" class="btn wide mt20">Send sample request</button>
          </form>`,
      );
      break;
    case "rental-document":
      showModal(
        /* HTML */ `${renderDialogHeading("Rental summary TI-0284")}
          <p>Sony Alpha · camera & lenses</p>
          <div class="cost-row">
            <span>Owner</span>
            <strong>Marko Kovač</strong>
          </div>
          <div class="cost-row">
            <span>Dates</span>
            <strong>10–13 October</strong>
          </div>
          ${renderPriceBreakdown(sampleListings[0])}
          <hr />
          <p class="small">
            In-person pickup. Condition reports and photos at pickup and return. This sample summary
            is not a rental contract.
          </p>
          ${renderLink("handover", "View condition report", "camera", "btn wide mt20")}`,
      );
      break;
    case "sample-photos": {
      const mode = el.dataset.mode;
      for (let i = 0; i < 3; i++) appState.uploads[mode + "-" + i] = "assets/images/camera.jpg";
      if (mode === "listing") captureListingDraft();
      renderCurrentRoute();
      showToast("Sample photos added.");
      break;
    }
    case "rate":
      appState.rating = Number(el.dataset.rating);
      selectElements('[data-action="rate"]').forEach((b) => {
        b.classList.toggle("selected", Number(b.dataset.rating) <= appState.rating);
        b.setAttribute("aria-pressed", String(Number(b.dataset.rating) === appState.rating));
      });
      selectElement("#rating-label").textContent = [
        "",
        "Poor",
        "Could be better",
        "Good",
        "Very good",
        "Excellent, everything as agreed!",
      ][appState.rating];
      break;
    case "edit-listing": {
      let p = el.dataset.id.startsWith("own-")
        ? appState.ownListings[Number(el.dataset.id.slice(4))]
        : findListing(el.dataset.id);
      prefillListingDraft({ ...p, id: el.dataset.id, img: p.img || "camera.jpg" });
      appState.listingStep = 0;
      navigateTo("edit-listing");
      break;
    }
    case "pause-listing": {
      const id = el.dataset.id;
      appState.paused = appState.paused.includes(id)
        ? appState.paused.filter((x) => x !== id)
        : [...appState.paused, id];
      renderCurrentRoute();
      showToast(
        appState.paused.includes(id) ? "Listing paused locally." : "Listing is active again.",
      );
      break;
    }
    case "listing-type":
      captureListingDraft();
      appState.listing.type = el.dataset.type;
      if (el.dataset.type === "Service") appState.listing.category = "Services";
      renderCurrentRoute();
      break;
    case "listing-back":
      captureListingDraft();
      appState.listingStep = Math.max(0, appState.listingStep - 1);
      renderCurrentRoute();
      window.scrollTo(0, 0);
      break;
    case "ai-check":
      if (!appState.uploads["listing-0"]) {
        showToast("Add a photo first or use the sample photos.");
        break;
      }
      appState.listing.aiChecked = true;
      renderCurrentRoute();
      showToast("Sample review result displayed.");
      break;
    case "chat-select":
      appState.chat = el.dataset.chat;
      renderCurrentRoute();
      break;
    case "host-reviews":
      selectElement("#profile-reviews").innerHTML = renderSampleReviews();
      el.parentElement.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      el.classList.add("active");
      break;
    case "renter-reviews":
      selectElement("#profile-reviews").innerHTML = /* HTML */ `<div class="review-block">
        <div class="host-mini">
          ${renderAvatar("ana")}
          <div>
            <h4>Ana Horvat</h4>
            <p>Tent rental · ★★★★★</p>
          </div>
        </div>
        <p>
          Pickup and return exactly as agreed. The equipment came back clean and tidy. A great
          experience!
        </p>
      </div>`;
      el.parentElement.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      el.classList.add("active");
      break;
    case "settings-tab":
      appState.settingsTab = el.dataset.tab;
      renderCurrentRoute();
      break;
    case "toggle":
      el.classList.toggle("on");
      el.setAttribute("aria-checked", String(el.classList.contains("on")));
      showToast("Preference updated in this preview.");
      break;
    case "delete-account":
      showModal(
        /* HTML */ `${renderDialogHeading("Account deletion")}
          <p>
            Production account deletion must account for active rentals. This action only clears the
            sample data stored in this browser.
          </p>
          ${renderButton("reset-demo", "Clear local sample data", "", "btn danger wide")}`,
      );
      break;
    case "reset-demo":
      try {
        localStorage.removeItem(APP_CONFIG.storageKey);
      } catch {}
      closeModal();
      location.reload();
      break;
    case "verify-identity":
      showModal(
        /* HTML */ `${renderDialogHeading("Identity verification")}
          <p>The planned identity verification flow.</p>
          <div class="stack">
            <div class="notice">
              ${renderIcon("user")}1. Choose an account type and check the basic details.
            </div>
            <div class="notice">
              ${renderIcon("shield")}2. Redirect securely to your verification provider.
            </div>
            <div class="notice">
              ${renderIcon("check")}3. Return to TradeIt with the verification result.
            </div>
          </div>
          <p class="small mt20">This preview does not accept real identity documents.</p>
          ${renderButton("close", "Got it", "", "btn wide mt20")}`,
      );
      break;
    case "tax-summary":
      showModal(
        /* HTML */ `${renderDialogHeading("Tax & documents")}
          <p>Monthly overview · October 2026</p>
          <div class="cost-row">
            <span>Rental income</span>
            <strong>148.00 €</strong>
          </div>
          <div class="cost-row">
            <span>Tax calculation status</span>${renderBadge("Awaiting calculation", "amber")}
          </div>
          <div class="cost-row">
            <span>Documents</span>
            <strong>In preparation</strong>
          </div>
          <div class="notice mt20">
            ${renderIcon("info")}
            <p>
              The interface includes a place for platform tax calculations. This preview does not
              calculate tax; the production rules need to be defined separately.
            </p>
          </div>
          ${renderButton("close", "Close", "", "btn wide mt20")}`,
      );
      break;
    case "payout-account":
      showModal(
        /* HTML */ `${renderDialogHeading("Payout account")}
          <p>Preview of adding a payout account. Do not enter real bank details here.</p>
          <label>Account holder</label>
          <input readonly value="Sample member" />
          <label class="mt20">IBAN</label>
          <input readonly value="HR •••• •••• •••• 1234" />
          <div class="notice mt20">
            ${renderIcon("lock")}Payouts are not active in this preview.
          </div>
          ${renderButton("close", "Close", "", "btn wide mt20")}`,
      );
      break;
    case "receipt": {
      const idx = Number(el.dataset.id),
        data = [
          ["TI-0284", "Camera rental", 82.5],
          ["TI-0261", "Calculator rental payout", 24],
          ["TI-0251", "Speaker rental", 19.8],
          ["TI-0245", "Tent rental payout", 36],
        ][idx];
      showModal(
        /* HTML */ `${renderDialogHeading("Transaction details")}
          <p>${data[1]} · ${data[0]}</p>
          <div class="cost-row">
            <span>Status</span>${renderBadge(idx % 2 ? "Paid out" : "Recorded")}
          </div>
          <div class="cost-row total">
            <span>Amount</span>
            <strong>${formatCurrency(data[2])}</strong>
          </div>
          <div class="notice mt20">
            ${renderIcon("file")}Sample view. This is not an invoice or proof of payment.
          </div>
          ${renderButton("close", "Close", "", "btn wide mt20")}`,
      );
      break;
    }
    case "read-notifications":
      appState.notificationsRead = true;
      renderCurrentRoute();
      showToast("All notifications marked as read.");
      break;
    case "assistant":
      showModal(
        /* HTML */ `${renderDialogHeading("Your TradeIt assistant")}
          <p>A local FAQ assistant for common questions.</p>
          <div id="assistant-conversation" class="stack">
            <div class="notice">
              Hi! I can help with bookings, deposits, creating listings or reporting a problem. What
              would you like to know?
            </div>
          </div>
          <form id="assistant-form" class="chat-input" style="padding:18px 0 0">
            <input
              name="question"
              required
              placeholder="For example: How do I create a listing?"
              aria-label="Ask the assistant"
            />
            <button class="btn" type="submit" aria-label="Send question">
              ${renderIcon("send")}
            </button>
          </form>`,
      );
      break;
    case "google-login":
      navigateTo("dashboard");
      showToast("Welcome to TradeIt. Google sign-in is not connected.");
      break;
    case "password": {
      const p = selectElement("#auth-password");
      p.type = p.type === "password" ? "text" : "password";
      el.setAttribute("aria-label", p.type === "password" ? "Show password" : "Hide password");
      break;
    }
    case "admin-filter":
      appState.adminFilter = el.dataset.filter;
      renderCurrentRoute();
      break;
    case "moderate-approve": {
      const row = el.closest(".rental-card");
      row.querySelector(".badge").outerHTML = renderBadge("Listing approved", "", "check");
      row.querySelectorAll("button").forEach((b) => (b.disabled = true));
      showToast("Sample listing approved.");
      break;
    }
    case "moderate-reject":
      showModal(
        /* HTML */ `${renderDialogHeading("Request listing changes")}
          <p>Clearly explain what the owner needs to change.</p>
          <form id="moderation-form" data-id="${el.dataset.id}">
            <label for="moderation-reason">Reason & instructions</label>
            <textarea
              id="moderation-reason"
              name="reason"
              required
              minlength="10"
              placeholder="For example: Add a photo showing all accessories listed in the description."
            ></textarea>
            <button type="submit" class="btn wide mt20">Record change request</button>
          </form>`,
      );
      break;
    case "user-details":
      showModal(
        /* HTML */ `${renderDialogHeading(el.dataset.name)}
          <p>${escapeHtml(el.dataset.email)}</p>
          <div class="cost-row">
            <span>Account type</span>
            <strong>Registered member</strong>
          </div>
          <div class="cost-row"><span>Status</span>${renderBadge("Active")}</div>
          <div class="cost-row"><span>Identity</span>${renderBadge("Confirmed", "", "shield")}</div>
          <hr />
          ${renderLink("host/marko", "View public profile", "user", "btn light wide")}${renderButton("user-warning", "Add admin note", "file", "link small mt20", `data-name="${escapeHtml(el.dataset.name)}"`)}`,
      );
      break;
    case "user-warning":
      showModal(
        /* HTML */ `${renderDialogHeading("Admin note")}
          <p>Member: ${escapeHtml(el.dataset.name)}. This note is not publicly visible.</p>
          <form id="user-note-form">
            <label for="user-note">Note</label>
            <textarea id="user-note" name="note" required minlength="10"></textarea>
            <button type="submit" class="btn wide mt20">Save note</button>
          </form>`,
      );
      break;
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  const f = new FormData(form);
  switch (form.id) {
    case "search-form":
      appState.query = String(f.get("query") || "").trim();
      appState.location = String(f.get("location") || "").trim();
      appState.searchStart = String(f.get("start") || "");
      navigateTo("explore");
      break;
    case "product-booking-form": {
      const b = updateBookingPrice();
      if (!b) {
        showToast("Choose a valid return date.");
        break;
      }
      appState.booking = b;
      saveLocalState();
      navigateTo("booking/" + form.dataset.id);
      break;
    }
    case "checkout-form": {
      const b = updateBookingPrice();
      if (!b) {
        showToast("The return date must be after the pickup date.");
        break;
      }
      if (!f.has("terms")) {
        showToast("Confirm that you have reviewed the rental terms.");
        break;
      }
      appState.booking = { ...b, message: String(f.get("message") || "") };
      saveLocalState();
      navigateTo("booking-success");
      break;
    }
    case "handover-form": {
      const mode = form.dataset.mode === "return" ? "return" : "before";
      if ([0, 1, 2].some((i) => !appState.uploads[mode + "-" + i])) {
        showToast("Add three photos or use the sample photos.");
        break;
      }
      if (["equipment1", "equipment2", "equipment3", "condition"].some((k) => !f.has(k))) {
        showToast("Check the equipment and tick every confirmation.");
        break;
      }
      if (mode === "return") {
        appState.returnDone = true;
        showModal(
          /* HTML */ `${renderDialogHeading("Return recorded.")}
            <div class="empty success" style="padding:25px 0 0">
              <div class="empty-icon">${renderIcon("check")}</div>
              <p>
                The return photos and condition report have been saved for this session. You can now
                share your rental experience.
              </p>
              ${renderLink("review", "Leave a review", "star", "btn wide")}${renderLink("rental/current", "Back to rental", "arrow", "link small mt20")}
            </div>`,
        );
      } else {
        appState.handoverDone = true;
        navigateTo("rental/current");
        showToast("Pickup confirmed locally.");
      }
      break;
    }
    case "review-form":
      appState.reviews.push({ rating: appState.rating, text: String(f.get("text") || "") });
      saveLocalState();
      navigateTo("host/marko");
      showToast("Your sample review has been published.");
      break;
    case "listing-form": {
      captureListingDraft();
      const n = appState.listingStep;
      if (n === 1 && !appState.uploads["listing-0"]) {
        showToast("Add at least one photo.");
        break;
      }
      if (n === 2 && appState.listing.to < appState.listing.from) {
        showToast("The availability end date must be after the start date.");
        break;
      }
      if (n < 3) {
        appState.listingStep++;
        renderCurrentRoute();
        window.scrollTo(0, 0);
      } else {
        if (!f.has("listing-terms")) {
          showToast("Confirm that the listing details are accurate.");
          break;
        }
        const p = { ...appState.listing, name: appState.listing.title, img: "camera.jpg" };
        if (currentRoute === "edit-listing" && appState.editId?.startsWith("own-"))
          appState.ownListings[Number(appState.editId.slice(4))] = p;
        else if (currentRoute === "edit-listing" && appState.editId) {
          const original = findListing(appState.editId);
          Object.assign(original, {
            name: p.name,
            desc: p.description,
            category: p.category,
            price: p.price,
            deposit: p.deposit,
            location: p.location,
          });
        } else appState.ownListings.push(p);
        saveLocalState();
        appState.listingStep = 0;
        navigateTo("listings");
        showToast(
          currentRoute === "edit-listing" ? "Listing changes saved." : "Listing saved locally.",
        );
      }
      break;
    }
    case "message-form": {
      const msg = String(f.get("message") || "").trim();
      if (!msg) return;
      appState.messages.push({
        chat: appState.chat,
        text: msg,
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      });
      saveLocalState();
      const body = selectElement("#chat-body");
      body.insertAdjacentHTML(
        "beforeend",
        /* HTML */ `<div class="bubble me">${escapeHtml(msg)}<small>Just now · ✓</small></div>`,
      );
      form.reset();
      body.scrollTop = body.scrollHeight;
      break;
    }
    case "settings-form":
      for (const [k, v] of f.entries()) appState.profile[k] = String(v);
      saveLocalState();
      renderCurrentRoute();
      showToast("Profile changes saved.");
      break;
    case "ticket-form":
      if (!f.has("ticket-terms")) {
        showToast("Confirm that the information is accurate.");
        break;
      }
      appState.tickets.push({
        title: String(f.get("ticket-title")),
        description: String(f.get("description")),
        reason: String(f.get("reason")),
        resolution: String(f.get("resolution")),
        rental: String(f.get("rental")),
      });
      saveLocalState();
      navigateTo("tickets/current");
      showToast("Sample support request received.");
      break;
    case "ticket-reply-form":
      selectElement("#ticket-replies").insertAdjacentHTML(
        "beforeend",
        /* HTML */ `<div class="ticket-message">
          <div class="host-mini">
            ${renderAvatar("me")}
            <div>
              <h4>${escapeHtml(appState.profile.first)}</h4>
              <p>Just now</p>
            </div>
          </div>
          <p>${escapeHtml(f.get("reply"))}</p>
        </div>`,
      );
      form.reset();
      showToast("Reply added to the sample request.");
      break;
    case "auth-form":
      if (form.dataset.mode === "register" && !f.has("auth-terms")) {
        showToast("Please agree to the User Agreement to create an account.");
        break;
      }
      navigateTo("dashboard");
      showToast("Welcome to TradeIt.");
      break;
    case "forgot-form":
      showModal(
        /* HTML */ `${renderDialogHeading("Check your email.")}
          <div class="empty success" style="padding:20px 0 0">
            <div class="empty-icon">${renderIcon("mail")}</div>
            <p>
              In the connected application, a recovery link would be sent to
              <b>${escapeHtml(f.get("forgot-email"))}</b> if an account exists.
            </p>
            <div class="notice">No email has been sent from this preview.</div>
            ${renderLink("login", "Back to sign in", "back", "btn wide mt20")}
          </div>`,
      );
      break;
    case "cancel-form":
      closeModal();
      showToast("Sample cancellation request recorded.");
      break;
    case "assistant-form": {
      const q = String(f.get("question")).toLocaleLowerCase("en");
      let index = q.includes("deposit")
        ? 1
        : q.includes("photo")
          ? 2
          : q.includes("problem") || q.includes("damag")
            ? 3
            : q.includes("cancel")
              ? 4
              : q.includes("listing") || q.includes("publish")
                ? 5
                : 0;
      selectElement("#assistant-conversation").insertAdjacentHTML(
        "beforeend",
        /* HTML */ `<div class="bubble me">${escapeHtml(f.get("question"))}</div>
          <div class="notice">${faqs[index][1]}</div>`,
      );
      form.reset();
      break;
    }
    case "admin-note-form":
      selectElement("#admin-notes").insertAdjacentHTML(
        "beforeend",
        /* HTML */ `<div class="notice mt20">
          ${renderIcon("file")}
          <p>
            <b>Ana Kovač · just now</b>
            <br />${escapeHtml(f.get("note"))}
          </p>
        </div>`,
      );
      form.reset();
      showToast("Internal note added.");
      break;
    case "admin-decision-form":
      if (!f.get("decision")) {
        showToast("Choose a proposed outcome.");
        break;
      }
      appState.adminDecision = String(f.get("decision"));
      showModal(
        /* HTML */ `${renderDialogHeading("Outcome recorded.")}
          <p>${escapeHtml(appState.adminDecision)}</p>
          <div class="notice">
            ${renderIcon("file")}
            <p>${escapeHtml(f.get("reason"))}</p>
          </div>
          <p class="small mt20">
            This change is local to the frontend preview. No real messages have been sent to
            members.
          </p>
          ${renderLink("admin/tickets", "Back to requests", "arrow", "btn wide mt20")}`,
      );
      break;
    case "moderation-form": {
      const row = selectElement("#moderation-" + form.dataset.id);
      if (row) {
        row.querySelector(".badge").outerHTML = renderBadge("Changes requested", "amber");
        row.querySelectorAll("button").forEach((b) => (b.disabled = true));
      }
      closeModal();
      showToast("Sample change request recorded.");
      break;
    }
    case "user-note-form":
      closeModal();
      showToast("Admin note recorded for this session.");
      break;
  }
});

document.addEventListener("change", (event) => {
  const el = event.target;
  if (el.name === "category-filter") {
    appState.category = el.value;
    renderCurrentRoute();
  }
  if (el.id === "sort") {
    appState.sort = el.value;
    renderCurrentRoute();
  }
  if (el.id === "price-range") {
    appState.maxPrice = Number(el.value);
    renderCurrentRoute();
  }
  if (el.id === "verified-filter") {
    appState.verifiedOnly = el.checked;
    renderCurrentRoute();
  }
  if (el.id === "available-filter") {
    appState.availableOnly = el.checked;
    renderCurrentRoute();
  }
  if (el.id === "filter-date") {
    appState.searchStart = el.value;
    renderCurrentRoute();
  }
  if (el.id === "date-start" || el.id === "date-end") updateBookingPrice();
  if (el.id === "ticket-priority") filterAdminRequests();
  if (el.dataset.upload && el.files?.[0]) {
    const file = el.files[0];
    if (!file.type.startsWith("image/")) {
      showToast("Choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showToast("The maximum photo size is 8 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    appState.uploads[el.dataset.upload] = url;
    const slot = el.closest(".upload-slot");
    let img = slot.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      slot.prepend(img);
    }
    img.src = url;
    img.alt = "Photo added";
    slot.querySelector(".upload-label").textContent = "Change photo";
    showToast("Photo added for this session.");
  }
});

document.addEventListener("input", (event) => {
  const el = event.target;
  if (el.id === "price-range")
    selectElement("#price-label").textContent = "Up to " + el.value + " €";
  if (el.id === "contact-search")
    selectElements(".chat-contact").forEach(
      (c) =>
        (c.hidden = !c.textContent
          .toLocaleLowerCase("en")
          .includes(el.value.toLocaleLowerCase("en"))),
    );
  if (el.id === "admin-user-search")
    selectElements("#users-table tbody tr").forEach(
      (r) =>
        (r.hidden = !r.textContent
          .toLocaleLowerCase("en")
          .includes(el.value.toLocaleLowerCase("en"))),
    );
  if (el.id === "admin-ticket-search") filterAdminRequests();
  if (el.id === "faq-search") {
    const list = faqs.filter(([q, a]) =>
      (q + " " + a).toLocaleLowerCase("en").includes(el.value.toLocaleLowerCase("en")),
    );
    selectElement("#faq-results").innerHTML = list.length
      ? list
          .map(
            ([q, a]) =>
              /* HTML */ `<details class="faq">
                <summary>${q}</summary>
                <p>${a}</p>
              </details>`,
          )
          .join("")
      : '<p class="small">No answer matches that search. Try another phrase or open a support request.</p>';
  }
});

document.addEventListener("keydown", (event) => {
  if (!selectElement("#modal-root").children.length) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab") {
    const focusable = selectElements(
      "#modal-root a[href], #modal-root button:not([disabled]), #modal-root input, #modal-root select, #modal-root textarea",
    ).filter((el) => !el.hidden);
    const first = focusable[0],
      last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});
