/* =========================================================================
   Muhamad Ariffadhlullah: portfolio behaviour
   Theme, local time, scroll progress, section index, and scroll reveals.
   No dependencies. Everything degrades without JS.
   ========================================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------- theme */
  var themeToggle = document.getElementById("themeToggle");

  function readTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F3EEE4" : "#0C0C0E");
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  }

  applyTheme(readTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = readTheme() === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------- local time */
  var clock = document.getElementById("localTime");
  var timeFormat = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta"
  });

  function tick() {
    if (!clock) return;
    clock.textContent = timeFormat.format(new Date());
  }
  tick();
  setInterval(tick, 30000);

  /* ------------------------------------------------------------- year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------- scroll progress */
  var bar = document.getElementById("progressBar");

  /* -------------------------------------------------- active section */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".index a"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      var el = id && id.charAt(0) === "#" ? document.querySelector(id) : null;
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  var nav = document.querySelector(".index");
  var currentId = null;

  function setActive(id) {
    if (id === currentId) return;
    currentId = id;
    sections.forEach(function (item) {
      var on = item.el.id === id;
      if (on) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
      if (on && nav && nav.scrollWidth > nav.clientWidth + 4) {
        var target = item.link.offsetLeft - nav.clientWidth / 2 + item.link.offsetWidth / 2;
        nav.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  }

  function measure() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (bar) {
      var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
    }

    var line = window.scrollY + Math.min(160, window.innerHeight * 0.25);
    var active = null;
    sections.forEach(function (item) {
      if (item.el.offsetTop <= line) active = item.el.id;
    });
    setActive(active);

    reveal();
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () {
      queued = false;
      measure();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);

  /* ------------------------------------------------------ reveal rows */
  /* Geometry check rather than IntersectionObserver: observers can be
     throttled or miss elements during fast programmatic scrolling, which
     would leave a section permanently invisible. */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".section-head, .work-row, .edu-row, .tool-group, .cred-row, .contact-title, .contact-grid, .contact-actions"
    )
  );

  function reveal() {
    if (reduceMotion || !revealTargets) return;
    var limit = window.innerHeight * 0.94;
    revealTargets.forEach(function (el) {
      if (el.classList.contains("is-in")) return;
      if (el.getBoundingClientRect().top < limit) el.classList.add("is-in");
    });
  }

  if (!reduceMotion) {
    revealTargets.forEach(function (el) { el.setAttribute("data-reveal", ""); });
  }

  document.querySelectorAll("details").forEach(function (row) {
    row.addEventListener("toggle", onScroll);
  });

  measure();

  /* ------------------------------------------- deep link to a project */
  function openFromHash() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    var target = document.querySelector(hash);
    if (!target) return;
    if (target.tagName === "DETAILS" && !target.open) {
      target.open = true;
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }, 80);
    }
  }

  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  /* -------------------------------------------------------- back to top */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      var first = document.querySelector(".topbar .mark");
      if (first) {
        first.setAttribute("tabindex", "-1");
        first.focus({ preventScroll: true });
      }
    });
  }
})();
