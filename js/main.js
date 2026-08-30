const T = {
  en: {
    dir: "ltr",
    hours: "Sun–Thu 8:00–17:00", langSwitch: "العربية", getQuote: "Request a quote",
    badge: "Authorised sales, parts & service",
    heroTitle: "Forklifts, parts and service across Palestine.",
    heroSub: "New and used material handling equipment, genuine spare parts, and field service teams covering Ramallah, Nablus, Hebron and Gaza.",
    browseStock: "Browse stock", bookService: "Book a service", heroAlt: "NobleLift equipment",
    findMachine: "Find your machine", stockCount: "142 machines in stock", search: "Search",
    kickerStock: "Current stock", featuredTitle: "Featured machines", viewAll: "View all stock", arrowIcon: "arrow_forward",
    priceFrom: "From", enquire: "Enquire", photoSoon: "Photo coming soon",
    kickerCats: "Categories", catsTitle: "Browse by equipment type",
    kickerService: "Aftersales", serviceTitle: "Service that keeps the fleet moving",
    serviceBody: "Palift runs its own workshops and mobile service units. Every machine we sell is registered by serial number, so warranty, job cards and parts history stay in one record for its whole life.",
    kickerTeam: "Our team", teamTitle: "Talk to a specialist",
    contactTitle: "Tell us what you need to lift.", contactBody: "Send the load, height and site conditions and we will come back with two or three machines that fit, with pricing and lead time.",
    formTitle: "Request a quote", sendRequest: "Send request",
    fMessage: "What do you need?", fMessagePh: "Load weight, lift height, indoor or outdoor…",
    footerBlurb: "Palift Equipment supplies, services and rents material handling equipment across the West Bank and Gaza.",
    copyright: "© 2026 Palift Equipment. All rights reserved.", vatLine: "VAT reg. 562841903 · Ramallah, Palestine",
    filters: [["Equipment type", "All types"], ["Brand", "All brands"], ["Capacity", "Any capacity"], ["Fuel", "Any fuel"]],
    machines: [
      { brand: "NobleLift", model: "Avant Electric Pallet Truck", tag: "New", tagBg: "#921A1D", price: "₪38,500", img: "images/pallet-truck.webp",
        specs: [["fitness_center", "1.5 t"], ["bolt", "Electric"], ["battery_charging_full", "Li-ion"], ["speed", "Pedestrian"]] },
      { brand: "NobleLift", model: "30 Series Forklift", tag: "New", tagBg: "#921A1D", price: "₪182,000", img: "images/forklift.webp",
        specs: [["fitness_center", "3.0 t"], ["local_gas_station", "Diesel/LPG"], ["height", "Duplex/Triplex mast"], ["chair", "Full cabin"]] },
      { brand: "NobleLift", model: "Li-Ion Reach Stacker", tag: "New", tagBg: "#921A1D", price: "₪96,400", img: "images/stacker.webp",
        specs: [["fitness_center", "1.0–1.5 t"], ["bolt", "Electric"], ["battery_charging_full", "Li-ion"], ["height", "Elevating mast"]] },
      { brand: "Toyota", model: "8FD30 Diesel", tag: "Used · 2021", tagBg: "#252523", price: "₪118,000", img: null,
        specs: [["fitness_center", "3.0 t"], ["height", "4,700 mm"], ["local_gas_station", "Diesel"], ["schedule", "3,240 h"]] },
      { brand: "Jungheinrich", model: "ETV 216 Reach", tag: "Used · 2022", tagBg: "#252523", price: "₪147,900", img: null,
        specs: [["fitness_center", "1.6 t"], ["height", "8,400 mm"], ["bolt", "Electric"], ["schedule", "1,860 h"]] },
      { brand: "Manitou", model: "MT 1440 Telehandler", tag: "New", tagBg: "#921A1D", price: "₪392,000", img: null,
        specs: [["fitness_center", "4.0 t"], ["height", "13,500 mm"], ["local_gas_station", "Diesel"], ["terrain", "4x4"]] }
    ],
    categories: [["forklift", "Diesel forklifts", "38 machines"], ["bolt", "Electric forklifts", "44 machines"], ["conveyor_belt", "Reach trucks", "17 machines"], ["pallet", "Pallet stackers", "23 machines"], ["agriculture", "Telehandlers", "9 machines"], ["build", "Attachments & parts", "1,400+ items"]],
    services: [
      ["build", "Maintenance contracts", "Scheduled servicing with fixed hourly rates and priority response."],
      ["engineering", "Repairs & overhaul", "Workshop rebuilds, hydraulics, masts and transmission work."],
      ["inventory_2", "Genuine spare parts", "Stocked filters, forks, tyres and hydraulic components."],
      ["event_available", "Short & long term rental", "Daily, monthly and project rental with operator training."]
    ],
    stats: [["18", "Years operating"], ["11", "Field engineers"], ["4h", "Average response"]],
    team: [["Ziyad Rafidi", "Sales Director", "+970 59 812 4477", "Z"], ["Layan Odeh", "Parts & Aftersales", "+970 59 640 2210", "L"], ["Bashar Qawasmi", "Service Manager", "+970 59 337 8865", "B"]],
    contactLines: [["location_on", "Al-Balou' Industrial Area, Ramallah"], ["call", "+970 2 298 4400"], ["mail", "sales@palift.ps"]],
    formFields: [["Full name", "Your name", "1 / 2"], ["Company", "Company name", "2 / 3"], ["Phone", "+970…", "1 / 2"], ["Email", "you@company.ps", "2 / 3"]],
    footerCols: [["Stock", ["Diesel forklifts", "Electric forklifts", "Reach trucks", "Telehandlers"]], ["Company", ["About Palift", "Our workshops", "Careers", "News"]], ["Support", ["Book a service", "Order parts", "Warranty", "Contact"]]],
    nav: [["Stock", "#stock"], ["Machines", "#machines"], ["Parts", "#parts"], ["Service", "#service"], ["Company", "#company"], ["Contact", "#contact"]]
  },
  ar: {
    dir: "rtl",
    hours: "الأحد–الخميس ٨:٠٠–١٧:٠٠", langSwitch: "English", getQuote: "اطلب عرض سعر",
    badge: "وكيل معتمد للبيع وقطع الغيار والصيانة",
    heroTitle: "رافعات شوكية وقطع غيار وصيانة في كل فلسطين.",
    heroSub: "معدات مناولة جديدة ومستعملة، قطع غيار أصلية، وفرق صيانة ميدانية تغطي رام الله ونابلس والخليل وغزة.",
    browseStock: "تصفّح المخزون", bookService: "احجز صيانة", heroAlt: "معدات نوبل ليفت",
    findMachine: "ابحث عن آلتك", stockCount: "١٤٢ آلة في المخزون", search: "بحث",
    kickerStock: "المخزون الحالي", featuredTitle: "آلات مختارة", viewAll: "كل المخزون", arrowIcon: "arrow_back",
    priceFrom: "يبدأ من", enquire: "استفسار", photoSoon: "الصورة قريباً",
    kickerCats: "الأقسام", catsTitle: "تصفّح حسب نوع المعدة",
    kickerService: "خدمات ما بعد البيع", serviceTitle: "صيانة تحافظ على حركة الأسطول",
    serviceBody: "تدير بالِفت ورشها الخاصة ووحدات صيانة متنقلة. كل آلة نبيعها تُسجّل برقم تسلسلي، ليبقى الضمان وبطاقات العمل وسجل القطع في ملف واحد طوال عمرها.",
    kickerTeam: "فريقنا", teamTitle: "تحدّث إلى مختص",
    contactTitle: "أخبرنا ما تحتاج رفعه.", contactBody: "أرسل الحمولة والارتفاع وظروف الموقع وسنعود إليك باثنتين أو ثلاث آلات مناسبة مع السعر ومدة التوريد.",
    formTitle: "طلب عرض سعر", sendRequest: "إرسال الطلب",
    fMessage: "ما الذي تحتاجه؟", fMessagePh: "وزن الحمولة، ارتفاع الرفع، داخلي أو خارجي…",
    footerBlurb: "بالِفت للمعدات توفّر معدات المناولة وخدماتها وتأجيرها في الضفة الغربية وغزة.",
    copyright: "© ٢٠٢٦ بالِفت للمعدات. جميع الحقوق محفوظة.", vatLine: "رقم ضريبي ٥٦٢٨٤١٩٠٣ · رام الله، فلسطين",
    filters: [["نوع المعدة", "كل الأنواع"], ["الماركة", "كل الماركات"], ["الحمولة", "أي حمولة"], ["الوقود", "أي نوع"]],
    machines: [
      { brand: "نوبل ليفت", model: "Avant عربة نقل كهربائية", tag: "جديدة", tagBg: "#921A1D", price: "₪٣٨,٥٠٠", img: "images/pallet-truck.webp",
        specs: [["fitness_center", "١.٥ طن"], ["bolt", "كهربائية"], ["battery_charging_full", "ليثيوم"], ["speed", "سائق راجل"]] },
      { brand: "نوبل ليفت", model: "رافعة سلسلة 30", tag: "جديدة", tagBg: "#921A1D", price: "₪١٨٢,٠٠٠", img: "images/forklift.webp",
        specs: [["fitness_center", "٣.٠ طن"], ["local_gas_station", "ديزل/غاز"], ["height", "صاري مزدوج/ثلاثي"], ["chair", "كابينة كاملة"]] },
      { brand: "نوبل ليفت", model: "ستاكر ليثيوم", tag: "جديدة", tagBg: "#921A1D", price: "₪٩٦,٤٠٠", img: "images/stacker.webp",
        specs: [["fitness_center", "١.٠–١.٥ طن"], ["bolt", "كهربائية"], ["battery_charging_full", "ليثيوم"], ["height", "صاري رافع"]] },
      { brand: "تويوتا", model: "8FD30 ديزل", tag: "مستعملة · ٢٠٢١", tagBg: "#252523", price: "₪١١٨,٠٠٠", img: null,
        specs: [["fitness_center", "٣.٠ طن"], ["height", "٤,٧٠٠ مم"], ["local_gas_station", "ديزل"], ["schedule", "٣,٢٤٠ ساعة"]] },
      { brand: "يونجهاينريش", model: "ETV 216 ريتش", tag: "مستعملة · ٢٠٢٢", tagBg: "#252523", price: "₪١٤٧,٩٠٠", img: null,
        specs: [["fitness_center", "١.٦ طن"], ["height", "٨,٤٠٠ مم"], ["bolt", "كهربائية"], ["schedule", "١,٨٦٠ ساعة"]] },
      { brand: "مانيتو", model: "MT 1440 تيليهاندلر", tag: "جديدة", tagBg: "#921A1D", price: "₪٣٩٢,٠٠٠", img: null,
        specs: [["fitness_center", "٤.٠ طن"], ["height", "١٣,٥٠٠ مم"], ["local_gas_station", "ديزل"], ["terrain", "4x4"]] }
    ],
    categories: [["forklift", "رافعات ديزل", "٣٨ آلة"], ["bolt", "رافعات كهربائية", "٤٤ آلة"], ["conveyor_belt", "رافعات ريتش", "١٧ آلة"], ["pallet", "ستاكر بالتات", "٢٣ آلة"], ["agriculture", "تيليهاندلر", "٩ آلات"], ["build", "ملحقات وقطع غيار", "+١,٤٠٠ صنف"]],
    services: [
      ["build", "عقود صيانة", "صيانة دورية بأسعار ساعة ثابتة وأولوية في الاستجابة."],
      ["engineering", "إصلاح وعمرة", "إعادة تأهيل في الورشة، هيدروليك، صواري وناقل حركة."],
      ["inventory_2", "قطع غيار أصلية", "فلاتر، شوك، إطارات ومكوّنات هيدروليكية متوفرة."],
      ["event_available", "تأجير قصير وطويل", "تأجير يومي وشهري وللمشاريع مع تدريب المشغلين."]
    ],
    stats: [["١٨", "سنة خبرة"], ["١١", "مهندس ميداني"], ["٤س", "متوسط الاستجابة"]],
    team: [["زياد رفيدي", "مدير المبيعات", "+٩٧٠ ٥٩ ٨١٢ ٤٤٧٧", "ز"], ["ليان عودة", "قطع الغيار وما بعد البيع", "+٩٧٠ ٥٩ ٦٤٠ ٢٢١٠", "ل"], ["بشار قواسمي", "مدير الصيانة", "+٩٧٠ ٥٩ ٣٣٧ ٨٨٦٥", "ب"]],
    contactLines: [["location_on", "المنطقة الصناعية، البالوع، رام الله"], ["call", "+٩٧٠ ٢ ٢٩٨ ٤٤٠٠"], ["mail", "sales@palift.ps"]],
    formFields: [["الاسم الكامل", "اسمك", "1 / 2"], ["الشركة", "اسم الشركة", "2 / 3"], ["الهاتف", "+٩٧٠…", "1 / 2"], ["البريد الإلكتروني", "you@company.ps", "2 / 3"]],
    footerCols: [["المخزون", ["رافعات ديزل", "رافعات كهربائية", "رافعات ريتش", "تيليهاندلر"]], ["الشركة", ["عن بالِفت", "ورشنا", "وظائف", "أخبار"]], ["الدعم", ["احجز صيانة", "اطلب قطع", "الضمان", "تواصل"]]],
    nav: [["المخزون", "#stock"], ["الآلات", "#machines"], ["قطع الغيار", "#parts"], ["الصيانة", "#service"], ["الشركة", "#company"], ["تواصل", "#contact"]]
  }
};

const STORAGE_KEY = "palift-lang";
let lang = localStorage.getItem(STORAGE_KEY) || "ar";

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) node.appendChild(c);
  return node;
}
const ms = (name, extraClass = "") => el("span", { class: `ms ${extraClass}`.trim(), text: name });

function renderNav(t) {
  const nav = document.getElementById("mainNav");
  nav.innerHTML = "";
  t.nav.forEach(([label, href]) => nav.appendChild(el("a", { href }, el("span", { text: label }))));
}

function renderFilters(t) {
  const grid = document.getElementById("filterGrid");
  grid.querySelectorAll(".filter-field").forEach(n => n.remove());
  const searchBtn = grid.querySelector(".btn-search");
  t.filters.forEach(([label, value]) => {
    const field = el("div", { class: "filter-field" }, [
      el("label", { text: label }),
      el("div", { class: "select-fake" }, [el("span", { text: value }), ms("expand_more")])
    ]);
    grid.insertBefore(field, searchBtn);
  });
}

function machineCard(t, m) {
  const photo = m.img
    ? el("div", { class: "machine-photo" }, el("img", { src: m.img, alt: m.model, loading: "lazy" }))
    : el("div", { class: "machine-photo placeholder" }, [ms("photo_camera"), el("span", { class: "label", text: t.photoSoon })]);
  photo.appendChild(el("div", { class: "machine-tag", style: `background:${m.tagBg}` }, el("span", { text: m.tag })));

  const specs = el("div", { class: "machine-specs" }, m.specs.map(([icon, value]) =>
    el("div", { class: "spec" }, [ms(icon), el("span", { text: value })])
  ));

  return el("div", { class: "machine-card" }, [
    photo,
    el("div", { class: "machine-body" }, [
      el("div", { class: "machine-brand", text: m.brand }),
      el("div", { class: "machine-model", text: m.model }),
      specs,
      el("div", { class: "spacer1" }),
      el("div", { class: "machine-foot" }, [
        el("div", {}, [el("div", { class: "price-label", text: t.priceFrom }), el("div", { class: "price-value", text: m.price })]),
        el("a", { class: "btn-enquire", href: "#contact" }, el("span", { text: t.enquire }))
      ])
    ])
  ]);
}

function renderMachines(t) {
  const grid = document.getElementById("machineGrid");
  grid.innerHTML = "";
  t.machines.forEach(m => grid.appendChild(machineCard(t, m)));
}

function renderCategories(t) {
  const grid = document.getElementById("catGrid");
  grid.innerHTML = "";
  t.categories.forEach(([icon, name, count]) => {
    grid.appendChild(el("a", { class: "cat-card", href: "#stock" }, [
      ms(icon, "icon"),
      el("div", { style: "flex:1;" }, [
        el("div", { class: "cat-name", text: name }),
        el("div", { class: "cat-count", text: count })
      ]),
      ms(t.arrowIcon, "arrow")
    ]));
  });
}

function renderServices(t) {
  const grid = document.getElementById("serviceGrid");
  grid.innerHTML = "";
  t.services.forEach(([icon, name, desc]) => {
    grid.appendChild(el("div", { class: "service-card" }, [
      el("div", { class: "service-icon" }, ms(icon)),
      el("div", { class: "service-name", text: name }),
      el("div", { class: "service-desc", text: desc })
    ]));
  });
}

function renderStats(t) {
  const row = document.getElementById("statsRow");
  row.innerHTML = "";
  t.stats.forEach(([value, label]) => {
    row.appendChild(el("div", {}, [el("div", { class: "stat-value", text: value }), el("div", { class: "stat-label", text: label })]));
  });
}

function renderTeam(t) {
  const grid = document.getElementById("teamGrid");
  grid.innerHTML = "";
  t.team.forEach(([name, role, phone, initial]) => {
    grid.appendChild(el("div", { class: "team-card" }, [
      el("div", { class: "team-avatar", text: initial }),
      el("div", { style: "min-width:0;" }, [
        el("div", { class: "team-name", text: name }),
        el("div", { class: "team-role", text: role }),
        el("div", { class: "team-phone" }, [ms("call"), el("span", { text: phone })])
      ])
    ]));
  });
}

function renderContactLines(t) {
  const box = document.getElementById("contactLines");
  box.innerHTML = "";
  t.contactLines.forEach(([icon, value]) => {
    box.appendChild(el("div", { class: "contact-line" }, [ms(icon), el("span", { text: value })]));
  });
}

function renderForm(t) {
  const grid = document.getElementById("formGrid");
  grid.querySelectorAll(".form-field").forEach(n => n.remove());
  const messageField = document.getElementById("messageField");
  t.formFields.forEach(([label, ph, span]) => {
    const field = el("div", { class: "form-field", style: `grid-column:${span};` }, [
      el("label", { text: label }),
      el("input", { placeholder: ph })
    ]);
    grid.insertBefore(field, messageField);
  });
  messageField.querySelector("label").textContent = t.fMessage;
  messageField.querySelector("textarea").placeholder = t.fMessagePh;
}

function renderFooter(t) {
  const grid = document.getElementById("footerCols");
  grid.innerHTML = "";
  t.footerCols.forEach(([title, items]) => {
    grid.appendChild(el("div", {}, [
      el("div", { class: "footer-col-title", text: title }),
      el("div", { class: "footer-links" }, items.map(i => el("a", { href: "#stock", text: i })))
    ]));
  });
}

function applyLang() {
  const t = T[lang];
  document.documentElement.setAttribute("dir", t.dir);
  document.documentElement.setAttribute("lang", lang);
  document.querySelectorAll("[data-t]").forEach(node => {
    node.textContent = t[node.getAttribute("data-t")];
  });
  document.getElementById("heroImg").alt = t.heroAlt;
  document.getElementById("stockCount").textContent = t.stockCount;
  document.getElementById("langLabel").textContent = t.langSwitch;
  document.getElementById("viewAllArrow").textContent = t.arrowIcon;
  renderNav(t);
  renderFilters(t);
  renderMachines(t);
  renderCategories(t);
  renderServices(t);
  renderStats(t);
  renderTeam(t);
  renderContactLines(t);
  renderForm(t);
  renderFooter(t);
  localStorage.setItem(STORAGE_KEY, lang);
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  applyLang();
});

applyLang();
