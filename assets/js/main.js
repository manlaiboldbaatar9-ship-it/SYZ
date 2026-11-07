/* =====================================================================
   syz — rendering & interactions
   All content comes from window.SITE (content.js). You normally
   don't need to edit this file.
   ===================================================================== */
(() => {
  "use strict";

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ICON_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/";

  // ── Language ────────────────────────────────────────────────────
  const LANG_KEY = "syz-lang";
  let lang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "mn" || q === "en") return q;
    try { const s = localStorage.getItem(LANG_KEY); if (s === "mn" || s === "en") return s; } catch (_) {}
    return S.defaultLang || "mn";
  })();

  /** Translate a value: string or {mn, en}. */
  const t = (v) => (v && typeof v === "object" ? (v[lang] ?? v.en ?? v.mn ?? "") : (v ?? ""));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /** Escaped text with *word* → accent span. */
  const rich = (v) => esc(t(v)).replace(/\*(.+?)\*/g, '<span class="accent">$1</span>');
  const plain = (v) => t(v).replace(/\*/g, "");
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), S);
  const price = (n) => Number(n).toLocaleString("en-US") + (S.ui.currency || "₮");
  const pad = (n) => String(n).padStart(2, "0");

  const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  const sections = [
    { id: "work", key: "work" },
    { id: "services", key: "services" },
    { id: "process", key: "process" },
    { id: "about", key: "about" },
    { id: "contact", key: "contact" },
  ];

  const C = S.contact;
  const links = {
    email: C.email && { k: "email", v: C.email, href: `mailto:${C.email}` },
    instagram: C.instagram && { k: "instagram", v: "@" + C.instagram, href: `https://instagram.com/${C.instagram}`, ext: true },
    phone: C.phone && { k: { mn: "утас", en: "phone" }, v: C.phone, href: `tel:${C.phone.replace(/[^\d+]/g, "")}` },
    telegram: C.telegram && { k: "telegram", v: "@" + C.telegram, href: `https://t.me/${C.telegram}`, ext: true },
  };
  const ext = (l) => (l.ext ? ' target="_blank" rel="noopener noreferrer"' : "");

  const head = (sec, idx, id) => `
    <div class="head">
      <div>
        <p class="label reveal"><span class="idx">${pad(idx)}</span>// ${esc(sec.label)}</p>
        <h2 class="title reveal" id="${id}-title" style="--d:.05s">${rich(sec.title)}</h2>
      </div>
      ${sec.intro ? `<p class="head__intro reveal" style="--d:.1s">${esc(t(sec.intro))}</p>` : ""}
    </div>`;

  // ── Renderers ───────────────────────────────────────────────────
  function renderNav() {
    const items = sections.map((s, i) =>
      `<a class="nav__link" href="#${s.id}" data-section="${s.id}">${esc(t(S.ui.nav[s.key]))}</a>`
    ).join("");
    $("#nav-links").innerHTML = items;
    $("#mobile-links").innerHTML = sections.map((s, i) =>
      `<a href="#${s.id}" style="animation-delay:${0.04 * i}s"><span class="idx">//</span>${esc(t(S.ui.nav[s.key]))}</a>`
    ).join("");
    $("#mobile-foot").innerHTML = `
      <a class="btn btn--primary" href="#contact">${esc(t(S.ui.navCta))} <span class="btn__arrow" aria-hidden="true">→</span></a>
      <div class="mobile-menu__socials">
        ${[links.instagram, links.telegram, links.email].filter(Boolean).map((l) => `<a href="${l.href}"${ext(l)}>${esc(t(l.k))}</a>`).join("")}
      </div>`;
  }

  function renderHero() {
    const h = S.hero;
    $("#hero").innerHTML = `
      <div class="hero__copy">
        <a href="#contact" class="status reveal"><span class="status__dot" aria-hidden="true"></span>${esc(t(h.status))}</a>
        <p class="greet reveal" style="--d:.05s" aria-label="${esc(t(h.greeting))}">
          <span class="greet__prompt" aria-hidden="true">&gt;</span><span class="greet__typed" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span>
        </p>
        <h1 class="hero__title reveal" id="hero-title" style="--d:.1s">${rich(h.headline)}</h1>
        <p class="hero__sub reveal" style="--d:.15s">${esc(t(h.sub))}</p>
        <div class="hero__ctas reveal" style="--d:.2s">
          <a class="btn btn--primary" href="#work" data-magnetic>${esc(t(h.primaryCta))} <span class="btn__arrow" aria-hidden="true">→</span></a>
          <a class="btn btn--ghost" href="#contact" data-magnetic>${esc(t(h.secondaryCta))}</a>
        </div>
      </div>
      <div class="term reveal" style="--d:.25s" role="img" aria-label="${esc(h.terminal.map((l) => `$ ${l.cmd} — ${plain(l.out)}`).join("; "))}">
        <div class="term__bar" aria-hidden="true"><i></i><i></i><i></i><span class="term__title">syz@ulaanbaatar: ~</span></div>
        <div class="term__body" aria-hidden="true" id="term-body"></div>
      </div>`;
  }

  function renderWork() {
    const items = S.projects.map((p, i) => `
      <article class="project reveal" style="--d:${(i % 2) * 0.08}s">
        <a class="project__media" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" tabindex="-1">
          <img src="${esc(p.image)}" alt="${esc(t(p.alt))}" width="1600" height="1000" loading="lazy" decoding="async" />
          <div class="project__overlay"><p>${esc(t(p.description))}</p></div>
          <span class="project__visit">${esc(t(S.ui.liveSite))} ${ARROW}</span>
        </a>
        <div class="project__info">
          <div class="project__top">
            <h3 class="project__name">${esc(p.name)}</h3>
            <span class="project__year">${esc(p.year || "")}</span>
          </div>
          <p class="project__cat">${esc(t(p.category))}</p>
          <p class="project__desc-m">${esc(t(p.description))}</p>
          <div class="project__foot">
            <ul class="tags" aria-label="Tech">${p.tags.map((tg) => `<li class="tag">${esc(tg)}</li>`).join("")}</ul>
            <a class="link-arrow" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
              ${esc(t(S.ui.liveSite))}<span class="sr-only"> — ${esc(p.name)}</span> ${ARROW}
            </a>
          </div>
        </div>
      </article>`).join("");
    const single = S.projects.length === 1 ? " projects--single" : "";
    $("#work-inner").innerHTML = head(S.work, 1, "work") + `<div class="projects${single}">${items}</div>`;
  }

  function renderServices() {
    const items = S.services.map((s, i) => `
      <article class="service reveal" style="--d:${i * 0.06}s">
        <span class="service__code">/${esc(s.code)}</span>
        <h3 class="service__title">${esc(t(s.title))}</h3>
        <p class="service__desc">${esc(t(s.description))}</p>
        <ul class="service__points">${(s.points || []).map((pt) => `<li>${esc(t(pt))}</li>`).join("")}</ul>
        <p class="service__price"><small>${esc(t(S.ui.startingAt))}</small><strong>${price(s.price)}</strong></p>
      </article>`).join("");
    $("#services-inner").innerHTML = head(S.servicesSection, 2, "services") + `<div class="services">${items}</div>`;
  }

  function renderProcess() {
    const n = S.process.length;
    const items = S.process.map((s, i) => `
      <li class="step reveal" style="--d:${i * 0.08}s">
        <span class="step__num">${pad(i + 1)}</span>
        <p class="step__cmd"><span>$</span> ./${esc(s.cmd)}</p>
        <h3 class="step__title">${esc(t(s.title))}${i < n - 1 ? ' <span class="step__arrow" aria-hidden="true">→</span>' : ""}</h3>
        <p class="step__desc">${esc(t(s.description))}</p>
        <span class="step__time">${esc(t(s.time))}</span>
      </li>`).join("");
    $("#process-inner").innerHTML = head(S.processSection, 3, "process") + `<ol class="steps">${items}</ol>`;
  }

  function renderAbout() {
    const a = S.about;
    const stack = S.stack.map((s, i) => `
      <li class="stack__item reveal" style="--d:${(i % 6) * 0.03}s">
        <span class="stack__icon" style="--icon:url('${ICON_CDN}${encodeURIComponent(s.icon)}.svg')" aria-hidden="true"></span>
        ${esc(s.name)}
      </li>`).join("");
    $("#about-inner").innerHTML = `
      ${head(a, 4, "about")}
      <div class="about">
        <figure class="about__photo reveal">
          <img src="${esc(a.photo)}" alt="${esc(t(a.photoAlt))}" width="800" height="1000" loading="lazy" decoding="async" />
          <figcaption class="about__photo-tag"><b>●</b> Ulaanbaatar, MN · UTC+8</figcaption>
        </figure>
        <div>
          <div class="about__bio">${a.bio.map((p, i) => `<p class="reveal" style="--d:${i * 0.06}s">${esc(t(p))}</p>`).join("")}</div>
          <ul class="stats reveal">
            ${a.stats.map((s) => `<li><span class="stat__value">${esc(s.value)}</span><span class="stat__label">${esc(t(s.label))}</span></li>`).join("")}
          </ul>
          <h3 class="stack__title reveal"><span>~/</span>${esc(t(a.stackTitle))}</h3>
          <ul class="stack">${stack}</ul>
        </div>
      </div>`;
  }

  function renderTestimonials() {
    const section = $("#testimonials");
    section.hidden = !S.testimonials.length;
    if (section.hidden) return;
    const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);
    const items = S.testimonials.map((q, i) => `
      <figure class="quote reveal" style="--d:${i * 0.08}s">
        <span class="quote__mark" aria-hidden="true">“</span>
        <blockquote><p>${esc(t(q.quote))}</p></blockquote>
        <figcaption>
          <span class="quote__avatar" aria-hidden="true">${esc(initials(t(q.name)))}</span>
          <span><span class="quote__name">${esc(t(q.name))}</span><br><span class="quote__role">${esc(t(q.role))}</span></span>
        </figcaption>
      </figure>`).join("");
    $("#testimonials-inner").innerHTML = head(S.testimonialsSection, 5, "testimonials") + `<div class="quotes">${items}</div>`;
  }

  function renderContact() {
    const c = S.contactSection, f = c.form;
    const direct = [links.email, links.instagram, links.phone, links.telegram].filter(Boolean).map((l) => `
      <a href="${l.href}"${ext(l)}>
        <span class="direct__k">${esc(t(l.k))}</span><span class="direct__v">${esc(l.v)}</span>${ARROW}
      </a>`).join("");
    $("#contact-inner").innerHTML = `
      <p class="label reveal"><span class="idx">${pad(S.testimonials.length ? 6 : 5)}</span>// ${esc(c.label)}</p>
      <h2 class="contact__big reveal" id="contact-title" style="--d:.05s">${rich(c.title)}</h2>
      <p class="contact__intro reveal" style="--d:.1s">${esc(t(c.intro))}</p>
      <div class="contact">
        <form class="form reveal" id="contact-form" novalidate>
          <div class="form__row">
            <div class="field">
              <label for="f-name">${esc(t(f.name))}</label>
              <input id="f-name" name="name" type="text" autocomplete="name" required placeholder="${esc(t(f.namePh))}" />
            </div>
            <div class="field">
              <label for="f-email">${esc(t(f.email))}</label>
              <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required placeholder="${esc(t(f.emailPh))}" />
            </div>
          </div>
          <div class="field">
            <label for="f-msg">${esc(t(f.message))}</label>
            <textarea id="f-msg" name="message" rows="5" required placeholder="${esc(t(f.messagePh))}"></textarea>
          </div>
          <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="form__foot">
            <button class="btn btn--primary" type="submit" data-magnetic>${esc(t(f.submit))} <span class="btn__arrow" aria-hidden="true">→</span></button>
            <p class="form__status" role="status" aria-live="polite"></p>
          </div>
        </form>
        <div class="reveal" style="--d:.1s">
          <h3 class="direct__title">${esc(t(c.directTitle))}</h3>
          <div class="direct">${direct}</div>
        </div>
      </div>`;
    bindForm();
  }

  function renderFooter() {
    const l = [links.instagram, links.telegram, links.email].filter(Boolean);
    $("#footer").innerHTML = `
      <a class="logo" href="#top" aria-label="syz — ${esc(t(S.ui.backToTop))}"><span class="logo__br">&lt;</span>syz<span class="logo__br">/&gt;</span></a>
      <nav class="footer__links" aria-label="Social">
        ${l.map((x) => `<a href="${x.href}"${ext(x)}>${esc(t(x.k))}</a>`).join("")}
        <a href="#top">${esc(t(S.ui.backToTop))} ↑</a>
      </nav>
      <p class="footer__meta">© ${new Date().getFullYear()} syz. ${esc(t(S.ui.madeIn))}</p>`;
  }

  // ── Typing animations ───────────────────────────────────────────
  let typingToken = 0;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function typeInto(el, text, token, speed = 55) {
    if (reduceMotion) { el.textContent = text; return; }
    for (let i = 1; i <= text.length; i++) {
      if (token !== typingToken) return;
      el.textContent = text.slice(0, i);
      await sleep(speed + Math.random() * 40);
    }
  }

  async function runTyping() {
    const token = ++typingToken;
    const greet = $(".greet__typed");
    const body = $("#term-body");
    const greetText = t(S.hero.greeting);
    const lines = S.hero.terminal;

    if (reduceMotion) {
      greet.textContent = greetText;
      body.innerHTML = lines.map((l) => termLine(l, true)).join("") + promptLine();
      return;
    }

    greet.textContent = "";
    body.innerHTML = "";
    await sleep(350);
    const termTask = (async () => {
      await sleep(500);
      for (const l of lines) {
        if (token !== typingToken) return;
        const row = document.createElement("div");
        row.className = "term__line";
        row.innerHTML = `<span class="p">➜</span> <span class="path">~</span> <span class="cmd"></span><span class="caret"></span>`;
        body.appendChild(row);
        await typeInto($(".cmd", row), l.cmd, token, 38);
        await sleep(220);
        if (token !== typingToken) return;
        $(".caret", row).remove();
        const out = document.createElement("div");
        out.className = "term__out" + (l.accent ? " term__out--accent" : "");
        out.textContent = t(l.out);
        body.appendChild(out);
        await sleep(260);
      }
      if (token === typingToken) body.insertAdjacentHTML("beforeend", promptLine());
    })();
    await typeInto(greet, greetText, token, 70);
    await termTask;
  }
  const termLine = (l) =>
    `<div class="term__line"><span class="p">➜</span> <span class="path">~</span> ${esc(l.cmd)}</div><div class="term__out${l.accent ? " term__out--accent" : ""}">${esc(t(l.out))}</div>`;
  const promptLine = () => `<div class="term__line"><span class="p">➜</span> <span class="path">~</span> <span class="caret"></span></div>`;

  // ── Reveal on scroll ────────────────────────────────────────────
  const revealObserver = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-in"); revealObserver.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function observeReveals(instant) {
    $$(".reveal:not(.is-in)").forEach((el) => {
      if (!revealObserver || instant) el.classList.add("is-in");
      else revealObserver.observe(el);
    });
  }

  // ── Active nav link ─────────────────────────────────────────────
  function trackActive() {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".nav__link").forEach((a) => {
          const on = a.dataset.section === e.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["top", ...sections.map((s) => s.id), "testimonials"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  // ── Navbar & mobile menu ────────────────────────────────────────
  function bindNav() {
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 12);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const burger = $("#burger");
    const menu = $("#mobile-menu");
    const setOpen = (open) => {
      burger.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      if (open) nav.classList.add("is-scrolled");
      else nav.classList.toggle("is-scrolled", scrollY > 12);
    };
    burger.addEventListener("click", () => setOpen(burger.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setOpen(false); burger.focus(); } });
    matchMedia("(min-width: 1000px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
  }

  // ── Language switch ─────────────────────────────────────────────
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t(S.seo.title);
    const md = $('meta[name="description"]');
    if (md) md.setAttribute("content", t(S.seo.description));
    $$("[data-i18n]").forEach((el) => {
      const v = get(el.dataset.i18n);
      if (el.classList.contains("nav__cta")) el.innerHTML = `${esc(t(v))}`;
      else el.textContent = t(v);
    });
    $$(".lang__btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  function renderAll(instant) {
    applyStatic();
    renderNav();
    renderHero();
    renderWork();
    renderServices();
    renderProcess();
    renderAbout();
    renderTestimonials();
    renderContact();
    renderFooter();
    observeReveals(instant);
    bindMagnetic();
    runTyping();
  }

  function bindLang() {
    $$(".lang__btn").forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
      renderAll(true);
    }));
  }

  // ── Contact form ────────────────────────────────────────────────
  function bindForm() {
    const form = $("#contact-form");
    const status = $(".form__status", form);
    const f = S.contactSection.form;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      if (!form.checkValidity()) {
        const bad = $$("input:invalid, textarea:invalid", form)[0];
        bad && bad.focus();
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      if (data._gotcha) return; // bot
      const btn = $("button[type=submit]", form);

      if (C.formEndpoint) {
        btn.disabled = true;
        status.textContent = t(f.sending);
        try {
          const res = await fetch(C.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
          });
          if (!res.ok) throw new Error(res.status);
          form.reset();
          status.textContent = t(f.success);
          status.classList.add("is-ok");
        } catch (_) {
          status.textContent = t(f.error);
          status.classList.add("is-err");
        } finally {
          btn.disabled = false;
        }
      } else {
        const subject = encodeURIComponent(`Website project — ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name}\n${data.email}`);
        location.href = `mailto:${C.email}?subject=${subject}&body=${body}`;
        status.textContent = t(f.mailtoNote);
        status.classList.add("is-ok");
      }
    });
  }

  // ── Custom cursor + magnetic buttons (desktop only) ─────────────
  let magneticBound = new WeakSet();
  function bindMagnetic() {
    if (!finePointer || reduceMotion) return;
    $$("[data-magnetic]").forEach((el) => {
      if (magneticBound.has(el)) return;
      magneticBound.add(el);
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const root = $(".cursor"), dot = $(".cursor__dot"), ring = $(".cursor__ring");
    document.documentElement.classList.add("has-cursor");
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      root.classList.remove("is-hidden");
      if (!raf) raf = requestAnimationFrame(loop);
      const interactive = e.target.closest("a, button, [data-magnetic], .project, .stack__item");
      root.classList.toggle("is-hover", !!interactive);
    }, { passive: true });
    document.addEventListener("pointerdown", () => root.classList.add("is-down"));
    document.addEventListener("pointerup", () => root.classList.remove("is-down"));
    document.documentElement.addEventListener("pointerleave", () => root.classList.add("is-hidden"));
  }

  // ── Boot ────────────────────────────────────────────────────────
  renderAll(false);
  bindNav();
  bindLang();
  trackActive();
  initCursor();
})();
