/* تفاعلات الموقع فقط — كل المحتوى مبني مسبقاً في HTML */

/* قائمة الجوال */
(function () {
  const btn = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector(".ms").textContent = open ? "close" : "menu";
  });
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.querySelector(".ms").textContent = "menu";
    }
  });
})();

/* سلايدر صور الغلاف */
(function () {
  const wrap = document.getElementById("heroSlides");
  const dots = document.getElementById("heroDots");
  if (!wrap || !dots) return;
  const slides = [...wrap.querySelectorAll(".hero-slide")];
  if (slides.length < 2) return;

  let i = 0, timer = null;
  slides.forEach((slide, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = idx === 0 ? "active" : "";
    dot.setAttribute("aria-label", slide.alt || `صورة ${idx + 1}`);
    dot.addEventListener("click", () => { show(idx); start(); });
    dots.appendChild(dot);
  });
  const buttons = [...dots.children];

  function show(n) {
    i = n;
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    buttons.forEach((b, idx) => b.classList.toggle("active", idx === i));
  }
  function start() {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => show((i + 1) % slides.length), 6000);
  }
  start();
})();

/* نموذج طلب عرض السعر */
(function () {
  const form = document.getElementById("quoteForm");
  if (!form) return;
  const SALES_WA = "970567888444";
  const EMAIL = "info@palift.ps";
  const v = id => (document.getElementById(id)?.value || "").trim();

  const message = () => [
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

  form.addEventListener("submit", e => {
    e.preventDefault();
    window.open(`https://wa.me/${SALES_WA}?text=${encodeURIComponent(message())}`, "_blank", "noopener");
  });
  document.getElementById("mailBtn")?.addEventListener("click", () => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("طلب عرض سعر — palift.ps")}&body=${encodeURIComponent(message())}`;
  });
})();

/* فلتر الطرازات في المعرض */
(function () {
  const bar = document.getElementById("modelFilters");
  const grid = document.getElementById("modelGrid");
  const status = document.getElementById("filterStatus");
  if (!bar || !grid) return;
  const tiles = [...grid.querySelectorAll(".model-tile")];

  bar.addEventListener("click", e => {
    const chip = e.target.closest(".chip.filter");
    if (!chip) return;
    const cat = chip.dataset.cat;
    bar.querySelectorAll(".chip.filter").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    let shown = 0;
    tiles.forEach(t => {
      const match = cat === "*" || t.dataset.cat === cat;
      t.hidden = !match;
      if (match) shown++;
    });
    if (status) status.textContent = shown === 1 ? "طراز واحد" : `${shown} طرازاً`;
    history.replaceState(null, "", cat === "*" ? location.pathname : "?cat=" + encodeURIComponent(cat));
  });

  /* يفتح على الفئة المطلوبة إذا كانت في الرابط */
  const want = new URLSearchParams(location.search).get("cat");
  if (want) {
    const chip = bar.querySelector(`.chip.filter[data-cat="${CSS.escape(want)}"]`);
    if (chip) chip.click();
  }
})();
