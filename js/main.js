const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined) continue;
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) node.appendChild(c);
  return node;
};
const ms = (name, cls = "") => el("span", { class: `ms ${cls}`.trim(), text: name });

function renderText() {
  document.querySelectorAll("[data-t]").forEach(n => {
    const v = T[n.getAttribute("data-t")];
    if (typeof v !== "string") return;
    if (v.includes("\n\n")) {
      n.textContent = "";
      v.split("\n\n").forEach(p => n.appendChild(el("p", { text: p })));
    } else n.textContent = v;
  });
}

function renderNav() {
  const nav = document.getElementById("mainNav");
  T.nav.forEach(([label, href]) => nav.appendChild(el("a", { href, text: label })));
}

function renderWhy() {
  const grid = document.getElementById("whyGrid");
  T.why.forEach(([icon, text]) => grid.appendChild(el("div", { class: "why-item" }, [ms(icon), el("span", { text })])));
}

function renderCategories() {
  const grid = document.getElementById("catGrid");
  T.categories.forEach(([icon, name, en, desc, uses]) => {
    grid.appendChild(el("article", { class: "cat-card" }, [
      el("div", { class: "cat-icon" }, ms(icon)),
      el("h3", { class: "cat-name", text: name }),
      el("div", { class: "cat-en", text: en }),
      el("p", { class: "cat-desc", text: desc }),
      el("div", { class: "cat-uses" }, [
        el("span", { class: "uses-label", text: T.usesLabel }),
        el("span", { text: uses })
      ])
    ]));
  });
}

function modelCard(m) {
  const highlights = el("div", { class: "model-highlights" }, m.highlights.map(([label, value]) =>
    el("div", { class: "mh" }, [el("div", { class: "mh-value", text: value }), el("div", { class: "mh-label", text: label })])
  ));

  const specRows = m.specs.map(([k, v]) => el("tr", {}, [el("th", { text: k }), el("td", { text: v })]));
  const details = el("details", { class: "model-details" }, [
    el("summary", { text: T.detailsLabel }),
    el("div", { class: "model-details-body" }, [
      el("div", { class: "detail-block" }, [
        el("div", { class: "detail-title", text: T.specsLabel }),
        el("table", { class: "spec-table" }, el("tbody", {}, specRows))
      ]),
      el("div", { class: "detail-block" }, [
        el("div", { class: "detail-title", text: T.featuresLabel }),
        el("ul", { class: "feature-list" }, m.features.map(f => el("li", { text: f })))
      ]),
      m.options ? el("p", { class: "model-options" }, [
        el("span", { class: "opt-label", text: T.optionsLabel }),
        el("span", { text: " " + m.options })
      ]) : null
    ])
  ]);

  return el("article", { class: "model-card", "data-cat": m.cat }, [
    el("div", { class: "model-head" }, [
      el("div", { class: "model-cat", text: m.cat }),
      el("h3", { class: "model-name", text: m.name }),
      el("div", { class: "model-code" }, [
        el("span", { class: "code-label", text: T.modelNoLabel + ": " }),
        el("span", { class: "ltr", text: m.code })
      ]),
      el("p", { class: "model-tagline", text: m.tagline })
    ]),
    highlights,
    el("p", { class: "model-desc", text: m.desc }),
    details,
    el("a", { class: "model-cta", href: "#contact" }, [ms("request_quote"), el("span", { text: T.getQuote })])
  ]);
}

function renderModels() {
  const grid = document.getElementById("modelGrid");
  MODELS.forEach(m => grid.appendChild(modelCard(m)));

  const bar = document.getElementById("modelFilters");
  const cats = [T.modelFilterAll].concat(MODEL_CATS.filter(c => MODELS.some(m => m.cat === c)));
  cats.forEach((c, i) => {
    const count = c === T.modelFilterAll ? MODELS.length : MODELS.filter(m => m.cat === c).length;
    const chip = el("button", { type: "button", class: "chip" + (i === 0 ? " active" : "") }, [
      el("span", { text: c }),
      el("span", { class: "chip-count", text: String(count) })
    ]);
    chip.addEventListener("click", () => {
      bar.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
      chip.classList.add("active");
      grid.querySelectorAll(".model-card").forEach(card => {
        card.hidden = !(c === T.modelFilterAll || card.getAttribute("data-cat") === c);
      });
    });
    bar.appendChild(chip);
  });
}

function renderSectors() {
  const grid = document.getElementById("sectorGrid");
  T.sectors.forEach(([icon, name, desc]) => {
    grid.appendChild(el("article", { class: "sector-card" }, [
      ms(icon, "sector-icon"),
      el("div", { class: "sector-name", text: name }),
      el("p", { class: "sector-desc", text: desc })
    ]));
  });
}

function renderServices() {
  const grid = document.getElementById("serviceGrid");
  T.services.forEach(([icon, name, desc]) => {
    grid.appendChild(el("article", { class: "service-card" }, [
      el("div", { class: "service-icon" }, ms(icon)),
      el("div", { class: "service-name", text: name }),
      el("p", { class: "service-desc", text: desc })
    ]));
  });
}

function renderChecks() {
  const grid = document.getElementById("checkGrid");
  T.checks.forEach(text => grid.appendChild(el("div", { class: "check-item" }, [ms("check_circle"), el("span", { text })])));
}

function renderContactLines() {
  const box = document.getElementById("contactLines");
  T.contactLines.forEach(([icon, label, value, href]) => {
    const isLtr = /^[+\d]/.test(value) || value.includes("@");
    const val = el(href ? "a" : "span", { href, class: isLtr ? "ltr" : null, text: value });
    box.appendChild(el("div", { class: "contact-line" }, [
      ms(icon),
      el("span", { class: "cl-body" }, [el("span", { class: "cl-label", text: label }), val])
    ]));
  });
}

function renderForm() {
  const grid = document.getElementById("formGrid");
  const messageField = document.getElementById("messageField");
  T.formFields.forEach(([name, label, ph, span]) => {
    grid.insertBefore(el("div", { class: "form-field", style: `grid-column:${span};` }, [
      el("label", { for: "f-" + name, text: label }),
      el("input", { id: "f-" + name, name, placeholder: ph, type: name === "email" ? "email" : "text" })
    ]), messageField);
  });
  const ta = messageField.querySelector("textarea");
  messageField.querySelector("label").textContent = T.fMessage;
  messageField.querySelector("label").setAttribute("for", "f-message");
  ta.placeholder = T.fMessagePh;
  ta.id = "f-message";
  ta.name = "message";
}

function buildMessage() {
  const v = id => (document.getElementById(id)?.value || "").trim();
  return [
    "طلب عرض سعر — palift.ps",
    "",
    `الاسم: ${v("f-name") || "—"}`,
    `المنشأة: ${v("f-company") || "—"}`,
    `الهاتف: ${v("f-phone") || "—"}`,
    `البريد: ${v("f-email") || "—"}`,
    `وزن الحمولة: ${v("f-load") || "—"}`,
    `ارتفاع الرفع: ${v("f-height") || "—"}`,
    "",
    "وصف المهمة وموقع العمل:",
    v("f-message") || "—"
  ].join("\n");
}

function wireForm() {
  document.getElementById("quoteForm").addEventListener("submit", e => {
    e.preventDefault();
    window.open(`https://wa.me/${SALES_WA}?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
  });
  document.getElementById("mailBtn").addEventListener("click", () => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("طلب عرض سعر — palift.ps")}&body=${encodeURIComponent(buildMessage())}`;
  });
  const wa = document.getElementById("waFloat");
  wa.href = `https://wa.me/${SALES_WA}`;
  wa.target = "_blank";
}

function renderFooter() {
  const grid = document.getElementById("footerCols");
  T.footerCols.forEach(([title, items]) => {
    grid.appendChild(el("div", {}, [
      el("div", { class: "footer-col-title", text: title }),
      el("div", { class: "footer-links" }, items.map(([label, href]) => el("a", { href, text: label })))
    ]));
  });
}

const heroGallerySrc = ["images/stacker.webp", "images/forklift.webp", "images/pallet-truck.webp"];
let heroIndex = 0;
let heroTimer = null;

function renderHeroGallery() {
  const gallery = document.getElementById("heroGallery");
  const dots = document.getElementById("heroDots");
  heroGallerySrc.forEach((src, i) => {
    gallery.appendChild(el("img", { src, alt: T.gallery[i], class: i === heroIndex ? "active" : "" }));
    const dot = el("button", { type: "button", class: i === heroIndex ? "active" : "", "aria-label": T.gallery[i] });
    dot.addEventListener("click", () => setHeroImage(i, true));
    dots.appendChild(dot);
  });
}

function setHeroImage(i, userTriggered) {
  heroIndex = i;
  document.querySelectorAll("#heroGallery img").forEach((img, idx) => img.classList.toggle("active", idx === heroIndex));
  document.querySelectorAll("#heroDots button").forEach((d, idx) => d.classList.toggle("active", idx === heroIndex));
  if (userTriggered) startHeroRotation();
}

function startHeroRotation() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => setHeroImage((heroIndex + 1) % heroGallerySrc.length, false), 4500);
}

renderText();
renderNav();
renderWhy();
renderCategories();
renderModels();
renderSectors();
renderServices();
renderChecks();
renderContactLines();
renderForm();
wireForm();
renderFooter();
renderHeroGallery();
startHeroRotation();
