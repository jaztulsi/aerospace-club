/* ============================================================================
   Aerospace Club — site behavior
   Renders everything from window.SITE (assets/js/data.js).
   You shouldn't need to edit this file to update club content.
   ========================================================================== */
(() => {
  "use strict";

  const S = window.SITE;
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Escape user-supplied text before it goes into innerHTML. */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* --- Simple {{key}} bindings for the few inline spots -------------------- */
  const bindings = {
    school: S.club.school,
    location: S.club.location,
    intro: S.club.intro,
    advisor: S.club.advisor,
  };
  $$("[data-bind]").forEach((el) => { el.textContent = bindings[el.dataset.bind] ?? ""; });

  /* --- Nav ---------------------------------------------------------------- */
  const nav = $("#nav"), toggle = $("#navToggle"), menu = $("#navMenu");

  addEventListener("scroll", () => nav.classList.toggle("is-stuck", scrollY > 24), { passive: true });

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Close the mobile menu after tapping a link.
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* --- Hero telemetry (count-up on load) ---------------------------------- */
  $("#telemetry").innerHTML = S.telemetry.map((t) => `
    <div>
      <dt>${esc(t.label)}</dt>
      <dd><span data-count="${Number(t.value) || 0}">0</span>${esc(t.suffix || "")}</dd>
      ${t.note ? `<small>${esc(t.note)}</small>` : ""}
    </div>`).join("");

  /* --- Mission ------------------------------------------------------------ */
  $("#missionBody").innerHTML = S.mission.body.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#pillars").innerHTML = S.mission.pillars.map((p) => `
    <li data-reveal><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join("");

  /* --- Projects ----------------------------------------------------------- */
  $("#projects-list").innerHTML = S.projects.map((p) => `
    <li class="card" data-reveal>
      <div class="card__top">
        <span class="card__code">${esc(p.code)}</span>
        <span class="badge ${/active/i.test(p.status) ? "badge--active" : ""}">${esc(p.status)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
      <ul class="card__tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </li>`).join("");

  /* --- Events ------------------------------------------------------------- */
  const fmtDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
  const fmtTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

  const events = S.events
    .map((e) => ({ ...e, at: new Date(e.date) }))
    .filter((e) => !isNaN(e.at))          // skip typo'd dates instead of rendering "Invalid Date"
    .sort((a, b) => a.at - b.at);

  const now = Date.now();
  $("#events-list").innerHTML = events.map((e) => `
    <li data-reveal class="${e.at < now ? "is-past" : ""}">
      <time class="events__date" datetime="${e.at.toISOString()}">
        ${fmtDate.format(e.at)} · ${fmtTime.format(e.at)}
      </time>
      <div>
        <p class="events__title">${esc(e.title)}</p>
        <p class="events__meta">${esc(e.text)}</p>
      </div>
      <span class="badge ${/launch/i.test(e.kind) ? "badge--launch" : ""}">${esc(e.kind)} · ${esc(e.place)}</span>
    </li>`).join("");

  /* --- Countdown to the next future event --------------------------------- */
  const next = events.find((e) => e.at > new Date());
  if (next) {
    const box = $("#countdown");
    box.hidden = false;
    $("#cdName").textContent = next.title;
    $("#cdWhen").textContent = `${fmtDate.format(next.at)} · ${fmtTime.format(next.at)} · ${next.place}`;

    const clock = $("#cdClock");
    const tick = () => {
      let left = Math.max(0, next.at - Date.now());
      const d = Math.floor(left / 864e5);
      const h = Math.floor(left / 36e5) % 24;
      const m = Math.floor(left / 6e4) % 60;
      const s = Math.floor(left / 1e3) % 60;
      clock.innerHTML = [[d, "Days"], [h, "Hours"], [m, "Min"], [s, "Sec"]]
        .map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`)
        .join("");
    };
    tick();
    setInterval(tick, 1000);
  }

  /* --- Team --------------------------------------------------------------- */
  const initials = (n) => n.replace(/TODO:\s*/i, "").trim().split(/\s+/).slice(0, 2)
    .map((w) => w[0] || "").join("").toUpperCase() || "··";

  $("#team-list").innerHTML = S.officers.map((o) => `
    <li data-reveal>
      ${o.photo
        ? `<img class="team__photo" src="${esc(o.photo)}" alt="${esc(o.name)}, ${esc(o.role)}" loading="lazy">`
        : `<div class="team__photo team__photo--ph" role="img" aria-label="Photo placeholder for ${esc(o.role)}">${esc(initials(o.name))}</div>`}
      <div class="team__body">
        <p class="team__role">${esc(o.role)}</p>
        <p class="team__name">${esc(o.name)}</p>
        <p class="team__grade">${esc(o.grade)}</p>
      </div>
    </li>`).join("");

  /* --- Gallery ------------------------------------------------------------ */
  const shots = S.gallery;
  $("#gallery-list").innerHTML = shots.map((g, i) => `
    <li data-reveal>
      <button type="button" data-shot="${i}" aria-label="Open photo: ${esc(g.alt)}">
        ${g.src
          ? `<img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy">`
          : `<span class="gallery__ph">IMG ${String(i + 1).padStart(2, "0")}<br>${esc(g.caption)}</span>`}
      </button>
    </li>`).join("");

  /* --- Lightbox ----------------------------------------------------------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let at = 0;

  const show = (i) => {
    at = (i + shots.length) % shots.length;
    const g = shots[at];
    lbImg.src = g.src || "";
    lbImg.alt = g.alt || "";
    lbImg.hidden = !g.src;
    lbCap.textContent = g.src ? g.caption : `${g.caption} — no photo added yet`;
  };

  $("#gallery-list").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-shot]");
    if (!btn) return;
    show(Number(btn.dataset.shot));
    lb.showModal();          // <dialog> gives us focus trap + Esc for free
  });
  $("#lbClose").addEventListener("click", () => lb.close());
  $("#lbPrev").addEventListener("click", () => show(at - 1));
  $("#lbNext").addEventListener("click", () => show(at + 1));
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
  // Click the backdrop (i.e. the dialog itself, not its children) to close.
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });

  /* --- Join --------------------------------------------------------------- */
  $("#join-steps").innerHTML = S.join.steps.map((s) => `<li>${esc(s)}</li>`).join("");
  $("#join-cta").innerHTML = S.join.signupUrl
    ? `<a class="btn" href="${esc(S.join.signupUrl)}" target="_blank" rel="noopener">Sign up</a>`
    : `<span class="btn btn--ghost" aria-disabled="true">Sign-up link coming soon</span>
       <span class="join__note">${esc(S.join.signupNote)}</span>`;

  const m = S.club.meeting;
  $("#meeting-specs").innerHTML = [
    ["When", m.day], ["Time", m.time], ["Where", m.room], ["Advisor", S.club.advisor],
  ].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

  // A social with an empty url renders as plain text, not a dead link.
  const socialHTML = S.socials.map((s) => s.url
    ? `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)} — ${esc(s.handle)}</a></li>`
    : `<li><span>${esc(s.name)} — ${esc(s.handle)}</span></li>`).join("");
  $("#social-links").innerHTML = socialHTML;
  $("#footer-links").innerHTML = socialHTML;

  /* --- Scroll reveal ------------------------------------------------------ */
  if (reduced) {
    $$("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        // Stagger siblings slightly so grids cascade instead of popping.
        setTimeout(() => en.target.classList.add("is-in"), i * 60);
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .12 });
    $$("[data-reveal]").forEach((el) => io.observe(el));
  }

  /* --- Telemetry count-up ------------------------------------------------- */
  $$("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    if (reduced || !target) { el.textContent = target; return; }
    const start = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  /* --- Hero starfield ----------------------------------------------------- */
  // Canvas dots with a slow parallax drift. Skipped entirely if the visitor
  // asked for reduced motion (the CSS hides the canvas too).
  const cv = $("#stars");
  if (cv && !reduced) {
    const ctx = cv.getContext("2d");
    let stars = [], w = 0, h = 0;

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scales with area so phones don't render 400 stars.
      const n = Math.round((w * h) / 9000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + .25,
        a: Math.random() * .6 + .2,
        v: Math.random() * .045 + .008,      // drift speed
        tw: Math.random() * Math.PI * 2,     // twinkle phase
      }));
    };

    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y -= s.v;
        if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
        const a = s.a * (.65 + .35 * Math.sin(s.tw + t / 900));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.r > 1.1 ? "#9fe9ff" : "#ffffff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);
    addEventListener("resize", build);
    // Stop burning CPU when the tab isn't visible.
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    });
  }
})();
