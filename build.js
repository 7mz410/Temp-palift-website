/* مولّد صفحات ثابتة — يقرأ js/content.js و js/models.js ويكتب HTML جاهز */
const fs = require("fs");
const path = require("path");

const load = f => eval(fs.readFileSync(f, "utf8").replace(/^const (\w+) = /gm, "globalThis.$1 = "));
load("js/content.js");
load("js/models.js");

const SITE = "PALIFT";
const slug = s => s.replace(/\//g, "-").replace(/\s+/g, "").replace(/-+/g, "-").toLowerCase();
const catSlug = en => en.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ms = (n, c = "") => `<span class="ms${c ? " " + c : ""}" aria-hidden="true">${n}</span>`;

const CATS = T.categories.map(([icon, name, en, desc, uses, photo]) => ({
  icon, name, en, desc, uses, photo: "/" + photo, slug: catSlug(en),
  url: `/equipment/${catSlug(en)}/`,
  models: MODELS.filter(m => m.cat === name)
}));
const catByName = Object.fromEntries(CATS.map(c => [c.name, c]));
const modelUrl = m => `/models/${slug(m.code)}/`;
const img = m => "/" + m.img;

const NAV = [
  ["الرئيسية", "/", "home"],
  ["من نحن", "/#about", "about"],
  ["المعدات", "/equipment/", "equipment"],
  ["الطرازات", "/models/", "models"],
  ["الخدمات", "/#services", "services"],
  ["التمويل", "/#financing", "financing"],
  ["تواصل معنا", "/#contact", "contact"]
];

const waLink = text => `https://wa.me/${SALES_WA}?text=${encodeURIComponent(text)}`;

function layout({ title, desc, active, body, breadcrumb }) {
  const nav = NAV.map(([label, href, key]) =>
    `<a href="${href}"${key === active ? ' class="active" aria-current="page"' : ""}>${esc(label)}</a>`).join("\n        ");
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ar_PS">
<link rel="icon" href="/brand/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

  <div class="topbar">
    <div class="wrap">
      <span class="item">${ms("call")}<a class="ltr" href="tel:+970567888444">${SALES_PHONE}</a></span>
      <span class="item">${ms("mail")}<a class="ltr" href="mailto:${EMAIL}">${EMAIL}</a></span>
      <span class="spacer"></span>
      <span class="item hours">${ms("schedule")}<span>${esc(T.hours)}</span></span>
    </div>
  </div>

  <header>
    <div class="wrap">
      <a class="logo-link" href="/"><img class="logo" src="/brand/logo-white.png" alt="${SITE}"></a>
      <nav id="mainNav">
        ${nav}
      </nav>
      <a href="/#contact" class="btn-quote">${ms("request_quote")}<span>${esc(T.getQuote)}</span></a>
      <button class="nav-toggle" id="navToggle" aria-label="القائمة" aria-expanded="false" aria-controls="mainNav">${ms("menu")}</button>
    </div>
  </header>
${breadcrumb || ""}
${body}

  <footer>
    <div class="footer-grid">
      <div>
        <img class="footer-logo" src="/brand/logo-white.png" alt="${SITE}">
        <div class="footer-slogan">${esc(T.slogan)}</div>
        <p class="footer-blurb">${esc(T.footerBlurb)}</p>
      </div>
      ${footerCols()}
    </div>
    <p class="footer-disclaimer">${esc(T.disclaimer)}</p>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span>${esc(T.copyright)}</span>
        <span class="spacer"></span>
        <span>${esc(T.addressShort)}</span>
      </div>
    </div>
  </footer>

  <a class="wa-float" href="${waLink("مرحباً، أود الاستفسار عن معدات PALIFT.")}" target="_blank" rel="noopener" aria-label="واتساب">${ms("chat")}</a>

<script src="/js/app.js"></script>
</body>
</html>
`;
}

function footerCols() {
  const cols = [
    ["المعدات", CATS.slice(0, 5).map(c => [c.name, c.url])],
    ["الشركة", [["من نحن", "/#about"], ["لماذا PALIFT؟", "/#about"], ["كل المعدات", "/equipment/"], ["حلول حسب القطاع", "/equipment/#sectors"]]],
    ["الدعم", [["الخدمات وما بعد البيع", "/#services"], ["حلول التمويل", "/#financing"], ["كيف نختار المعدة", "/equipment/#choose"], ["تواصل معنا", "/#contact"]]]
  ];
  return cols.map(([title, items]) => `<div>
        <div class="footer-col-title">${esc(title)}</div>
        <div class="footer-links">${items.map(([l, h]) => `<a href="${h}">${esc(l)}</a>`).join("")}</div>
      </div>`).join("\n      ");
}

function crumbs(items) {
  const parts = items.map((it, i) => i === items.length - 1
    ? `<span aria-current="page">${esc(it[0])}</span>`
    : `<a href="${it[1]}">${esc(it[0])}</a>${ms("chevron_left", "crumb-sep")}`).join("");
  return `
  <nav class="breadcrumb" aria-label="مسار التصفح"><div class="wrap">${parts}</div></nav>`;
}

/* ---------- الصفحة الرئيسية ---------- */
function homePage() {
  const why = T.why.map(([icon, text]) =>
    `<div class="why-item">${ms(icon)}<span>${esc(text)}</span></div>`).join("\n        ");
  const services = T.services.map(([icon, name, desc]) => `<article class="service-card">
          <div class="service-icon">${ms(icon)}</div>
          <h3 class="service-name">${esc(name)}</h3>
          <p class="service-desc">${esc(desc)}</p>
        </article>`).join("\n        ");
  const contactLines = T.contactLines.map(([icon, label, value, href]) => {
    const ltr = /^[+\d]/.test(value) || value.includes("@");
    const inner = href
      ? `<a href="${href}"${ltr ? ' class="ltr"' : ""}>${esc(value)}</a>`
      : `<span${ltr ? ' class="ltr"' : ""}>${esc(value)}</span>`;
    return `<div class="contact-line">${ms(icon)}<span class="cl-body"><span class="cl-label">${esc(label)}</span>${inner}</span></div>`;
  }).join("\n          ");
  const fields = T.formFields.map(([name, label, ph, span]) => `<div class="form-field" style="grid-column:${span};">
            <label for="f-${name}">${esc(label)}</label>
            <input id="f-${name}" name="${name}" type="${name === "email" ? "email" : "text"}" placeholder="${esc(ph)}">
          </div>`).join("\n          ");
  const aboutParas = T.aboutBody.split("\n\n").map(p => `<p>${esc(p)}</p>`).join("\n        ");

  const body = `
  <section id="home">
    <img class="hero-pattern-red" src="/images/pattern-red.png" alt="">
    <img class="hero-pattern-gray" src="/images/pattern-gray.png" alt="">
    <div class="wrap hero-inner">
      <div class="hero-grid">
        <div>
          <span class="hero-badge">${ms("verified")}<span>${esc(T.badge)}</span></span>
          <h1 class="hero-title">${esc(T.heroTitle)}</h1>
          <p class="hero-sub">${esc(T.heroSub)}</p>
          <div class="hero-ctas">
            <a href="/equipment/" class="btn-primary">${esc(T.ctaBrowse)}</a>
            <a href="#contact" class="btn-outline">${esc(T.ctaQuote)}</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-gallery" id="heroGallery">
            <img src="/images/models/pte15-20qa.webp" alt="جك كهربائي ATOM" class="active">
            <img src="/images/models/fe4p20-35gh.webp" alt="رافعة شوكية كهربائية G-Series">
            <img src="/images/models/rt16-20pro.webp" alt="ريتش تراك RT16/20 Pro">
          </div>
          <div class="hero-dots" id="heroDots"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="message-strip">
    <div class="msg-inner">
      ${ms("format_quote")}
      <p>${esc(T.brandMessage)}</p>
    </div>
  </section>

  <section id="about">
    <div class="section-head">
      <div>
        <div class="kicker"><span class="bar"></span><span>${esc(T.kickerAbout)}</span></div>
        <h2>${esc(T.aboutTitle)}</h2>
      </div>
    </div>
    <div class="about-grid">
      <div class="about-body">
        ${aboutParas}
      </div>
      <div class="vm-grid">
        <div class="vm-card">${ms("visibility")}
          <h3 class="vm-title">${esc(T.visionTitle)}</h3>
          <p>${esc(T.visionBody)}</p>
        </div>
        <div class="vm-card">${ms("flag")}
          <h3 class="vm-title">${esc(T.missionTitle)}</h3>
          <p>${esc(T.missionBody)}</p>
        </div>
      </div>
    </div>
    <div class="why-block">
      <h3 class="why-head">${esc(T.whyTitle)}</h3>
      <div class="why-grid">
        ${why}
      </div>
    </div>
    <a class="inline-link" href="/equipment/">${esc("تصفّح المعدات والطرازات")}${ms("arrow_back", "il-arrow")}</a>
  </section>

  <section id="services">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="kicker"><span class="bar"></span><span>${esc(T.kickerServices)}</span></div>
          <h2>${esc(T.servicesTitle)}</h2>
        </div>
      </div>
      <p class="section-lead">${esc(T.servicesLead)}</p>
      <div class="services-grid">
        ${services}
      </div>
    </div>
  </section>

  <section id="financing">
    <div class="financing-inner">
      <div>
        <div class="kicker"><span class="bar"></span><span>${esc(T.kickerFinancing)}</span></div>
        <h2>${esc(T.financingTitle)}</h2>
        <p class="section-lead">${esc(T.financingBody)}</p>
        <a href="#contact" class="btn-primary financing-cta">${esc(T.financingCta)}</a>
      </div>
      <div class="notice">${ms("info")}
        <div>
          <h3 class="notice-title">${esc(T.financeTitle)}</h3>
          <p>${esc(T.financeBody)}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact">
    <svg class="bg" width="420" height="100%" viewBox="0 0 420 380" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      <polygon points="0,0 200,0 0,240" fill="#921A1D" opacity="0.55"></polygon>
      <polygon points="0,240 200,0 200,240" fill="#921A1D" opacity="0.2"></polygon>
    </svg>
    <div class="contact-inner">
      <div>
        <div class="kicker light"><span class="bar"></span><span>${esc(T.kickerContact)}</span></div>
        <h2 class="contact-title">${esc(T.contactTitle)}</h2>
        <p class="contact-body">${esc(T.contactBody)}</p>
        <div class="contact-lines">
          ${contactLines}
        </div>
      </div>
      <form class="contact-form" id="quoteForm">
        <h3 class="form-title">${esc(T.formTitle)}</h3>
        <div class="form-grid">
          ${fields}
          <div class="col-full">
            <label for="f-message">${esc(T.fMessage)}</label>
            <textarea id="f-message" name="message" rows="3" placeholder="${esc(T.fMessagePh)}"></textarea>
          </div>
        </div>
        <button type="submit" class="btn-send">${ms("chat")}<span>${esc(T.sendWhatsapp)}</span></button>
        <button type="button" class="btn-mail" id="mailBtn">${ms("mail")}<span>${esc(T.sendMail)}</span></button>
        <p class="form-note">${esc(T.formNote)}</p>
      </form>
    </div>
  </section>
`;
  return layout({
    title: `${SITE} | ${T.heroTitle}`,
    desc: "PALIFT Equipment Trading Co. — الوكيل الرسمي لعلامة Noblelift في فلسطين: رافعات شوكية كهربائية، جكات كهربائية ويدوية، ريتش تراك، رافعات مقص وآلات تنظيف، مع خدمات ما بعد البيع وحلول التمويل.",
    active: "home",
    body
  });
}

/* ---------- صفحة المعدات ---------- */
function equipmentPage() {
  const cards = CATS.map(c => `<a class="cat-card" href="${c.url}">
        <div class="cat-photo">
          <img src="${c.photo}" alt="${esc(c.name)}" loading="lazy">
          <span class="cat-icon">${ms(c.icon)}</span>
        </div>
        <h2 class="cat-name">${esc(c.name)}</h2>
        <div class="cat-en">${esc(c.en)}</div>
        <p class="cat-desc">${esc(c.desc)}</p>
        <div class="cat-foot">
          <span class="cat-count">${c.models.length ? `${c.models.length} طراز متوفر` : "حسب الطلب"}</span>
          <span class="cat-go">${esc("عرض التفاصيل")}${ms("arrow_back")}</span>
        </div>
      </a>`).join("\n      ");

  const sectors = T.sectors.map(([icon, name, desc]) => `<article class="sector-card">
        ${ms(icon, "sector-icon")}
        <h3 class="sector-name">${esc(name)}</h3>
        <p class="sector-desc">${esc(desc)}</p>
      </article>`).join("\n      ");

  const checks = T.checks.map(t => `<div class="check-item">${ms("check_circle")}<span>${esc(t)}</span></div>`).join("\n      ");

  const body = `
  <section class="page-head">
    <div class="kicker"><span class="bar"></span><span>${esc(T.kickerProducts)}</span></div>
    <h1>${esc(T.productsTitle)}</h1>
    <p class="section-lead">${esc(T.productsLead)}</p>
  </section>

  <section id="categories">
    <div class="cat-grid">
      ${cards}
    </div>
    <a class="inline-link" href="/models/">${esc(`عرض كل الطرازات (${MODELS.length}) في صفحة واحدة`)}${ms("arrow_back", "il-arrow")}</a>
  </section>

  <section id="sectors">
    <div class="section-head">
      <div>
        <div class="kicker"><span class="bar"></span><span>${esc(T.kickerSectors)}</span></div>
        <h2>${esc(T.sectorsTitle)}</h2>
      </div>
    </div>
    <div class="sector-grid">
      ${sectors}
    </div>
  </section>

  <section id="choose">
    <div class="section-head">
      <div>
        <div class="kicker"><span class="bar"></span><span>${esc(T.kickerChoose)}</span></div>
        <h2>${esc(T.chooseTitle)}</h2>
      </div>
    </div>
    <p class="section-lead">${esc(T.chooseLead)}</p>
    <div class="check-grid">
      ${checks}
    </div>
    <div class="result-card">${ms("task_alt")}
      <div>
        <h3 class="result-title">${esc(T.resultTitle)}</h3>
        <p>${esc(T.resultBody)}</p>
      </div>
    </div>
    <div class="cta-row">
      <a class="btn-primary" href="/#contact">${esc(T.getQuote)}</a>
      <a class="btn-outline" href="${waLink("مرحباً، أحتاج مساعدة في اختيار المعدة المناسبة.")}" target="_blank" rel="noopener">${esc("تواصل عبر واتساب")}</a>
    </div>
  </section>
`;
  return layout({
    title: `المعدات | ${SITE}`,
    desc: T.productsLead,
    active: "equipment",
    breadcrumb: crumbs([["الرئيسية", "/"], ["المعدات"]]),
    body
  });
}

/* ---------- معرض كل الطرازات ---------- */
function galleryPage() {
  const chips = [`<button type="button" class="chip filter active" data-cat="*">${esc(T.modelFilterAll)}<span class="chip-count">${MODELS.length}</span></button>`]
    .concat(CATS.filter(c => c.models.length).map(c =>
      `<button type="button" class="chip filter" data-cat="${esc(c.name)}">${esc(c.name)}<span class="chip-count">${c.models.length}</span></button>`))
    .join("\n      ");

  const tiles = MODELS.map(m => modelTile(m, true)).join("\n      ");

  const body = `
  <section class="page-head">
    <div class="kicker"><span class="bar"></span><span>${esc(T.kickerModels)}</span></div>
    <h1>${esc(T.modelsTitle)}</h1>
    <p class="section-lead">${esc(T.modelsLead)}</p>
  </section>

  <section id="gallery">
    <div class="filter-bar" id="modelFilters">
      ${chips}
    </div>
    <p class="filter-status" id="filterStatus" role="status">${esc(`${MODELS.length} طرازاً`)}</p>
    <div class="model-grid" id="modelGrid">
      ${tiles}
    </div>
    <div class="cta-row">
      <a class="btn-primary" href="/#contact">${esc(T.getQuote)}</a>
      <a class="btn-outline" href="/equipment/">${esc("تصفّح حسب الفئة")}</a>
    </div>
  </section>
`;
  return layout({
    title: `الطرازات | ${SITE}`,
    desc: `كل طرازات Noblelift المتوفرة لدى PALIFT (${MODELS.length} طرازاً) مع المواصفات وسعة الحمل وارتفاع الرفع ونوع البطارية.`,
    active: "models",
    breadcrumb: crumbs([["الرئيسية", "/"], ["الطرازات"]]),
    body
  });
}

/* ---------- كرت طراز مختصر ---------- */
function modelTile(m, showCat) {
  const hi = m.highlights.map(([l, v]) =>
    `<div class="mh"><div class="mh-value">${esc(v)}</div><div class="mh-label">${esc(l)}</div></div>`).join("");
  return `<article class="model-tile" data-cat="${esc(m.cat)}">
        <a class="model-tile-photo" href="${modelUrl(m)}">
          <img src="${img(m)}" alt="${esc(m.name)} — ${esc(m.code)}" loading="lazy">
        </a>
        <div class="model-tile-body">
          ${showCat ? `<a class="tile-cat" href="${catByName[m.cat].url}">${esc(m.cat)}</a>` : ""}
          <h3 class="model-name"><a href="${modelUrl(m)}">${esc(m.name)}</a></h3>
          <div class="model-code"><span class="code-label">${esc(T.modelNoLabel)}: </span><span class="ltr">${esc(m.code)}</span></div>
          <p class="model-tagline">${esc(m.tagline)}</p>
          <div class="model-highlights">${hi}</div>
          <a class="model-cta" href="${modelUrl(m)}">${esc("المواصفات الكاملة")}${ms("arrow_back")}</a>
        </div>
      </article>`;
}

/* ---------- صفحة فئة ---------- */
function categoryPage(c) {
  const list = c.models.length
    ? `<div class="model-grid">
      ${c.models.map(modelTile).join("\n      ")}
    </div>`
    : `<div class="empty-note">${ms("info")}
      <div>
        <h3 class="notice-title">${esc("متوفرة حسب الطلب")}</h3>
        <p>${esc("لم تُدرج طرازات هذه الفئة في الوثائق الرسمية المنشورة بعد. تواصل مع فريق المبيعات بوصف المهمة والحمولة وموقع العمل، وسنحدد لك الطراز والتجهيزات المناسبة ونصدر عرض سعر رسمياً.")}</p>
      </div>
    </div>`;

  const others = CATS.filter(x => x.slug !== c.slug).map(x =>
    `<a class="chip" href="${x.url}">${esc(x.name)}</a>`).join("\n      ");

  const body = `
  <section class="page-head cat-head">
    <div class="cat-head-grid">
      <div>
        <div class="kicker"><span class="bar"></span><span>${esc(T.kickerProducts)}</span></div>
        <h1>${esc(c.name)}</h1>
        <div class="page-head-en">${esc(c.en)}</div>
        <p class="section-lead">${esc(c.desc)}</p>
        <div class="uses-band">${ms("checklist")}<span><strong>${esc(T.usesLabel)}</strong> ${esc(c.uses)}</span></div>
      </div>
      <div class="cat-head-photo"><img src="${c.photo}" alt="${esc(c.name)}"></div>
    </div>
  </section>

  <section id="models">
    ${c.models.length ? `<div class="section-head"><div><h2>${esc(`الطرازات المتوفرة (${c.models.length})`)}</h2></div></div>` : ""}
    ${list}
    <div class="cta-row">
      <a class="btn-primary" href="/#contact">${esc(T.getQuote)}</a>
      <a class="btn-outline" href="${waLink(`مرحباً، أود الاستفسار عن ${c.name}.`)}" target="_blank" rel="noopener">${esc("تواصل عبر واتساب")}</a>
    </div>
  </section>

  <section id="other-cats">
    <h2 class="small-head">${esc("فئات أخرى")}</h2>
    <div class="chip-row">
      ${others}
    </div>
  </section>
`;
  return layout({
    title: `${c.name} | ${SITE}`,
    desc: c.desc,
    active: "equipment",
    breadcrumb: crumbs([["الرئيسية", "/"], ["المعدات", "/equipment/"], [c.name]]),
    body
  });
}

/* ---------- صفحة طراز ---------- */
function modelPage(m) {
  const c = catByName[m.cat];
  const hi = m.highlights.map(([l, v]) =>
    `<div class="mh"><div class="mh-value">${esc(v)}</div><div class="mh-label">${esc(l)}</div></div>`).join("\n          ");
  const specs = m.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("\n            ");
  const feats = m.features.map(f => `<li>${esc(f)}</li>`).join("\n            ");
  const related = c.models.filter(x => x.code !== m.code).slice(0, 3);
  const relatedHtml = related.length ? `
  <section id="related">
    <h2 class="small-head">${esc(`طرازات أخرى في ${m.cat}`)}</h2>
    <div class="related-grid">
      ${related.map(r => `<a class="related-card" href="${modelUrl(r)}">
        <img src="${img(r)}" alt="${esc(r.name)}" loading="lazy">
        <div>
          <div class="related-name">${esc(r.name)}</div>
          <div class="related-code ltr">${esc(r.code)}</div>
        </div>
      </a>`).join("\n      ")}
    </div>
  </section>` : "";

  const body = `
  <section class="model-hero">
    <div class="model-hero-grid">
      <div class="model-hero-photo">
        <img src="${img(m)}" alt="${esc(m.name)} — ${esc(m.code)}">
      </div>
      <div>
        <a class="model-cat-link" href="${c.url}">${esc(m.cat)}</a>
        <h1>${esc(m.name)}</h1>
        <div class="model-code big"><span class="code-label">${esc(T.modelNoLabel)}: </span><span class="ltr">${esc(m.code)}</span></div>
        <p class="model-tagline">${esc(m.tagline)}</p>
        <div class="model-highlights">
          ${hi}
        </div>
        <div class="cta-row">
          <a class="btn-primary" href="${waLink(`مرحباً، أود عرض سعر للطراز ${m.name} (${m.code}).`)}" target="_blank" rel="noopener">${ms("chat")}<span>${esc("اطلب عرض سعر عبر واتساب")}</span></a>
          <a class="btn-outline" href="/#contact">${esc("نموذج طلب العرض")}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="model-body">
    <div class="model-body-grid">
      <div>
        <h2 class="small-head">${esc("نبذة")}</h2>
        <p class="model-desc">${esc(m.desc)}</p>

        <h2 class="small-head mt">${esc(T.featuresLabel)}</h2>
        <ul class="feature-list">
            ${feats}
        </ul>
        ${m.options ? `<p class="model-options"><span class="opt-label">${esc(T.optionsLabel)}</span> ${esc(m.options)}</p>` : ""}
      </div>
      <aside class="spec-panel">
        <h2 class="small-head">${esc(T.specsLabel)}</h2>
        <table class="spec-table">
          <tbody>
            ${specs}
          </tbody>
        </table>
        <p class="spec-note">${esc("تختلف المواصفات والتجهيزات والتوفر وفق الطراز وعرض السعر والاتفاق النهائي.")}</p>
      </aside>
    </div>
  </section>
${relatedHtml}
`;
  return layout({
    title: `${m.name} ${m.code} | ${SITE}`,
    desc: `${m.name} (${m.code}) — ${m.tagline}. ${m.highlights.map(([l, v]) => `${l}: ${v}`).join("، ")}.`,
    active: "equipment",
    breadcrumb: crumbs([["الرئيسية", "/"], ["المعدات", "/equipment/"], [m.cat, c.url], [m.name]]),
    body
  });
}

/* ---------- الكتابة ---------- */
function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

let n = 0;
write("index.html", homePage()); n++;
write("equipment/index.html", equipmentPage()); n++;
write("models/index.html", galleryPage()); n++;
CATS.forEach(c => { write(`equipment/${c.slug}/index.html`, categoryPage(c)); n++; });
MODELS.forEach(m => { write(`models/${slug(m.code)}/index.html`, modelPage(m)); n++; });

const urls = ["/", "/equipment/", "/models/"]
  .concat(CATS.map(c => c.url))
  .concat(MODELS.map(modelUrl));
write("sitemap.txt", urls.map(u => "https://palift.ps" + u).join("\n") + "\n");

console.log(`built ${n} pages (+ sitemap.txt)`);
console.log(`categories: ${CATS.length}, models: ${MODELS.length}`);
