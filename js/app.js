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

/* معرض الصور في الهيرو */
(function () {
  const gallery = document.getElementById("heroGallery");
  const dots = document.getElementById("heroDots");
  if (!gallery || !dots) return;
  const imgs = [...gallery.querySelectorAll("img")];
  if (imgs.length < 2) return;

  let i = 0, timer = null;
  imgs.forEach((img, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = idx === 0 ? "active" : "";
    dot.setAttribute("aria-label", img.alt || `صورة ${idx + 1}`);
    dot.addEventListener("click", () => { show(idx); start(); });
    dots.appendChild(dot);
  });
  const buttons = [...dots.children];

  function show(n) {
    i = n;
    imgs.forEach((img, idx) => img.classList.toggle("active", idx === i));
    buttons.forEach((b, idx) => b.classList.toggle("active", idx === i));
  }
  function start() {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => show((i + 1) % imgs.length), 4500);
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
