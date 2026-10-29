/** DOM integration tests. Run `npm install` once, then `npm test`. No browser is started. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { JSDOM, VirtualConsole } = require("jsdom");
const root = path.resolve(__dirname, "..");
function createApp(saved) {
  const errors = [];
  const consoleBridge = new VirtualConsole();
  consoleBridge.on("jsdomError", (e) => errors.push(e.message));
  const dom = new JSDOM(fs.readFileSync(path.join(root, "index.html"), "utf8"), {
    url: "https://tradeit.example/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: consoleBridge,
  });
  const w = dom.window;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.URL.createObjectURL = () => "blob:sample-image";
  if (saved) w.localStorage.setItem("tradeit.frontend.v1", saved);
  const context = dom.getInternalVMContext();
  for (const tag of w.document.querySelectorAll("script[src]")) {
    const source = tag.getAttribute("src");
    new vm.Script(fs.readFileSync(path.join(root, source), "utf8"), {
      filename: source,
    }).runInContext(context);
  }
  const evaluate = (s) => vm.runInContext(s, context);
  function route(p) {
    w.history.replaceState(null, "", "#/" + p);
    evaluate("renderCurrentRoute()");
  }
  function submit(selector) {
    const form = w.document.querySelector(selector);
    assert.ok(form, selector);
    form.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
  }
  function click(selector) {
    const el = w.document.querySelector(selector);
    assert.ok(el, selector);
    el.click();
  }
  function field(selector, value) {
    const el = w.document.querySelector(selector);
    assert.ok(el, selector);
    if (el.type === "checkbox") el.checked = value;
    else el.value = value;
    return el;
  }
  return {
    dom,
    w,
    d: w.document,
    errors,
    evaluate,
    route,
    submit,
    click,
    field,
    close: () => dom.window.close(),
  };
}

test("all 35 routes and additional states render with valid local assets and labels", () => {
  const a = createApp();
  try {
    const routes = a.evaluate("screenGroups.flatMap(group=>group[1].map(row=>row[0]))");
    assert.equal(routes.length, 35);
    function check(label) {
      assert.ok(a.d.querySelector("main"), label + ": main");
      const ids = [...a.d.querySelectorAll("[id]")].map((el) => el.id);
      assert.equal(new Set(ids).size, ids.length, label + ": duplicate ids");
      for (const img of a.d.querySelectorAll("img")) {
        assert.ok(img.hasAttribute("alt"), label + ": image alt");
        const src = img.getAttribute("src");
        if (!/^(blob:|data:|https?:)/.test(src))
          assert.ok(fs.existsSync(path.join(root, src)), label + ": " + src);
      }
      for (const el of a.d.querySelectorAll("label[for]"))
        assert.ok(a.d.getElementById(el.htmlFor), label + ": label " + el.htmlFor);
      assert.doesNotMatch(a.d.querySelector("#app").textContent, /\b(?:undefined|NaN)\b/, label);
      assert.equal(a.d.querySelectorAll("en").length, 0, label + ": invalid translated hr");
      for (const el of a.d.querySelectorAll("a,button")) {
        const name =
          el.textContent.trim() ||
          el.getAttribute("aria-label") ||
          el.getAttribute("title") ||
          el.querySelector("img[alt]")?.alt;
        assert.ok(name, label + ": unnamed " + el.outerHTML.slice(0, 170));
      }
    }
    for (const route of routes) {
      a.route(route);
      check(route);
    }
    for (let step = 0; step < 4; step++) {
      a.evaluate("appState.listingStep=" + step);
      a.route("new-listing");
      check("wizard " + step);
    }
    for (const tab of ["profile", "security", "notifications", "privacy"]) {
      a.evaluate("appState.settingsTab=" + JSON.stringify(tab));
      a.route("settings");
      check("settings " + tab);
    }
    a.route("register");
    check("signup");
    assert.deepEqual(a.errors, []);
  } finally {
    a.close();
  }
});

test("English catalogue search, filters and persistent saved listings", () => {
  const a = createApp();
  try {
    a.field('[name="query"]', "camera");
    a.submit("#search-form");
    a.route("explore");
    assert.ok(a.d.querySelectorAll(".product-card").length > 0);
    assert.ok(
      a.evaluate(
        'getFilteredListings().every(p=>[p.name,p.category,p.desc].join(" ").toLowerCase().includes("camera"))',
      ),
    );
    a.click('[data-action="reset-filters"]');
    a.click('[data-action="save"][data-id="camera"]');
    assert.equal(a.evaluate('appState.saved.includes("camera")'), false);
    const b = createApp(a.w.localStorage.getItem("tradeit.frontend.v1"));
    try {
      assert.equal(b.evaluate('appState.saved.includes("camera")'), false);
    } finally {
      b.close();
    }
  } finally {
    a.close();
  }
});

test("booking rejects reversed dates and calculates the configured platform fee", () => {
  const a = createApp();
  try {
    a.route("product/camera");
    a.field("#date-start", "2026-11-20");
    a.field("#date-end", "2026-11-19");
    a.submit("#product-booking-form");
    assert.equal(a.w.location.hash, "#/product/camera");
    assert.equal(a.evaluate("updateBookingPrice()"), null);
    a.field("#date-end", "2026-11-23");
    a.submit("#product-booking-form");
    assert.equal(a.w.location.hash, "#/booking/camera");
    a.route("booking/camera");
    const result = a.evaluate("updateBookingPrice()");
    assert.equal(result.days, 3);
    assert.equal(result.total, 82.5);
    assert.equal(result.fee, 7.5);
    a.field('[name="terms"]', true);
    a.submit("#checkout-form");
    assert.equal(a.w.location.hash, "#/booking-success");
  } finally {
    a.close();
  }
});

test("listing wizard validates photos, creates and edits a local listing", () => {
  const a = createApp();
  try {
    a.route("new-listing");
    a.field("#listing-title", "Weekend camera kit");
    a.field(
      "#listing-description",
      "A clean camera kit with two lenses and a protective carrying case.",
    );
    a.submit("#listing-form");
    assert.equal(a.evaluate("appState.listingStep"), 1);
    a.submit("#listing-form");
    assert.equal(a.evaluate("appState.listingStep"), 1);
    a.click('[data-action="sample-photos"]');
    a.submit("#listing-form");
    a.field("#listing-price", "20");
    a.field("#listing-from", "2026-11-01");
    a.field("#listing-to", "2026-12-31");
    a.submit("#listing-form");
    a.field('[name="listing-terms"]', true);
    a.submit("#listing-form");
    assert.equal(a.evaluate("appState.ownListings[0].title"), "Weekend camera kit");
    a.route("listings");
    a.click('[data-action="edit-listing"][data-id="own-0"]');
    a.route("edit-listing");
    assert.equal(a.d.querySelector("#listing-title").value, "Weekend camera kit");
  } finally {
    a.close();
  }
});

test("messages treat typed HTML as text and persist it", () => {
  const a = createApp();
  try {
    a.route("messages");
    const value = '<img src=x onerror="alert(1)"> Hello!';
    a.field('[name="message"]', value);
    a.submit("#message-form");
    assert.equal(a.d.querySelectorAll('#chat-body img[src="x"]').length, 0);
    assert.ok(a.d.querySelector("#chat-body").textContent.includes(value));
    assert.equal(a.evaluate("appState.messages.at(-1).text"), value);
  } finally {
    a.close();
  }
});

test("return requires evidence and confirmations before opening a review", () => {
  const a = createApp();
  try {
    a.route("return");
    a.submit("#handover-form");
    assert.equal(a.evaluate("appState.returnDone"), false);
    a.click('[data-action="sample-photos"]');
    for (const name of ["equipment1", "equipment2", "equipment3", "condition"])
      a.field('[name="' + name + '"]', true);
    a.submit("#handover-form");
    assert.equal(a.evaluate("appState.returnDone"), true);
    assert.ok(a.d.querySelector('[role="dialog"]'));
    a.route("review");
    a.click('[data-action="rate"][data-rating="4"]');
    a.field('[name="text"]', "An easy rental and friendly pickup.");
    a.submit("#review-form");
    assert.equal(a.evaluate("appState.reviews.at(-1).rating"), 4);
  } finally {
    a.close();
  }
});

test("support requests and admin outcomes retain entered content", () => {
  const a = createApp();
  try {
    a.route("tickets/new");
    a.field('[name="ticket-title"]', "Pickup time needs updating");
    a.field('[name="description"]', "I would like to arrange a later pickup with the owner.");
    a.field('[name="ticket-terms"]', true);
    a.submit("#ticket-form");
    assert.equal(a.evaluate("appState.tickets.at(-1).title"), "Pickup time needs updating");
    a.route("tickets/current");
    assert.ok(a.d.querySelector("#app").textContent.includes("Pickup time needs updating"));
    a.route("admin/ticket/TI-0248");
    const option = a.d.querySelector("#decision option:nth-child(3)").value;
    a.field("#decision", option);
    a.field('[name="reason"]', "Both members have agreed to the revised pickup arrangement.");
    a.submit("#admin-decision-form");
    assert.equal(a.evaluate("appState.adminDecision"), option);
  } finally {
    a.close();
  }
});

test("screen directory, dialog Escape and skip link work without losing the route", () => {
  const a = createApp();
  try {
    a.route("dashboard");
    a.click(".skip-link");
    assert.equal(a.w.location.hash, "#/dashboard");
    assert.equal(a.d.activeElement.id, "main");
    a.click('[data-action="screens"]');
    assert.equal(a.d.querySelectorAll("[data-screen-link]").length, 35);
    a.d.dispatchEvent(new a.w.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    assert.equal(a.d.querySelector('[role="dialog"]'), null);
  } finally {
    a.close();
  }
});
