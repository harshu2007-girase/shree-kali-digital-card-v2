const CONTACT = {
  company: "Shree Kali Manufacturers",
  owner: "Ashish Gaikwad",
  title: "Founder",
  call: "+919737555169",
  secondaryCall: "+919737555196",
  whatsapp: "917500220015",
  inquiryWhatsapp: "919737555169",
  email: "shreekalimanufacturers@gmail.com",
  website: "https://shreekalimanufacturers.com/",
  review: "https://g.page/r/CeIciWCA748dEBM/review",
  address:
    "U-10, Krishna Complex, Vijaynagar, Udyog Nagar, Vejalpore, Navsari, Gujarat 396445, India",
  message:
    "Hello Shree Kali Manufacturers, I am interested in your gold melting furnace. Please guide me on the best model for my requirement, availability, delivery, and order process."
};

const INQUIRY_STORAGE_KEY = "shreeKaliInquiryRecords";
const VISITOR_STORAGE_KEY = "shreeKaliVisitorId";
const THEME_STORAGE_KEY = "shreeKaliThemeMode";
const OWNER_PASSWORD = "shreekali100cr";
let ownerInquiryRecordsCache = [];
let ownerInquiryPassword = "";
let aiLanguage = "en";
let aiVoiceEnabled = false;
let aiRecognition = null;
let aiListening = false;

const productImages = Array.from(
  { length: 33 },
  (_, index) => `assets/images/products/machine-${String(index + 1).padStart(2, "0")}.webp`
);

const catalogueImages = Array.from(
  { length: 8 },
  (_, index) => `assets/images/catalogue/catalogue-page-${String(index + 1).padStart(2, "0")}.jpg`
);

const products = [
  {
    name: "Nexon 1KG Economic",
    capacity: "Up to 1 KG Gold",
    image: "assets/images/catalogue/products/nexon-1kg-economic-display.webp",
    base: "Rs. 28,000",
    price: "Rs. 33,040",
    tags: ["Up to 1150 C", "Energy Efficient", "Smart Operation"]
  },
  {
    name: "Nexon 1KG Commercial",
    capacity: "Up to 1 KG Gold",
    image: "assets/images/catalogue/products/nexon-1kg-commercial-display.webp",
    base: "Rs. 33,000",
    price: "Rs. 38,940",
    tags: ["Safe Melting", "Stainless Steel", "Low Maintenance"]
  },
  {
    name: "Nexon 1KG Thyristor",
    capacity: "Up to 1 KG Gold",
    image: "assets/images/catalogue/products/nexon-1kg-thyristor-catalogue.webp",
    base: "Rs. 46,000",
    price: "Rs. 54,280",
    tags: ["Thyristor Control", "Uniform Heating", "Premium Quality"]
  },
  {
    name: "Nexon 3KG Thyristor",
    capacity: "Up to 3 KG Gold",
    image: "assets/images/catalogue/products/nexon-3kg-thyristor-display.webp",
    base: "Rs. 62,500",
    price: "Rs. 73,750",
    tags: ["Single Phase", "3 KW Approx.", "Stainless Steel"]
  },
  {
    name: "Nexon 5KG Economic",
    capacity: "Up to 5 KG Gold",
    image: "assets/images/catalogue/products/nexon-5kg-economic-display.png",
    base: "Rs. 80,500",
    price: "Rs. 94,990",
    tags: ["Up to 1300 C", "Strong Build", "Safe Melting"]
  },
  {
    name: "Nexon 5KG Commercial High Load",
    capacity: "Up to 5 KG Gold",
    image: "assets/images/catalogue/products/nexon-5kg-commercial-high-load-display.png",
    base: "Rs. 97,500",
    price: "Rs. 1,15,050",
    tags: ["High Load", "Continuous Use", "Durable Body"]
  },
  {
    name: "Nexon 10KG Economic",
    capacity: "Up to 10 KG Gold",
    image: "assets/images/catalogue/products/nexon-10kg-economic-display.png",
    base: "Rs. 1,15,000",
    price: "Rs. 1,35,700",
    tags: ["Thyristor Control", "Industrial Grade", "Uniform Heating"]
  },
  {
    name: "Nexon 10KG Thyristor",
    capacity: "Up to 10 KG Gold",
    image: "assets/images/catalogue/products/nexon-10kg-thyristor-display.png",
    base: "Rs. 1,50,000",
    price: "Rs. 1,75,700",
    tags: ["Stainless Steel", "Energy Efficient", "Compact Design"]
  },
  {
    name: "Nexon 10KG Commercial High Load",
    capacity: "Up to 10 KG Gold",
    image: "assets/images/catalogue/products/nexon-10kg-commercial-high-load-display.png",
    base: "Rs. 1,30,000",
    price: "Rs. 1,53,400",
    tags: ["Heavy Duty", "High Load Capacity", "Long Durability"]
  },
  {
    name: "Nexon 20KG Commercial High Load",
    capacity: "Up to 20 KG Gold",
    image: "assets/images/catalogue/products/nexon-20kg-commercial-high-load-catalogue.webp",
    base: "Rs. 1,45,000",
    price: "Rs. 1,71,100",
    tags: ["Heavy Operation", "Energy Efficient", "Easy Maintenance"]
  }
];

const galleries = {
  "Exterior View": [2, 3, 4, 5, 10, 11, 12, 21, 30, 33],
  "Internal Structure": [6, 7, 15, 16, 18, 20, 27, 28, 32],
  "Control Panel": [2, 3, 4, 5, 10, 11, 29, 30],
  "Working Demo": [8, 9, 17, 23, 24, 25]
};

const reviews = [
  {
    name: "Javid Memon",
    meta: "Using furnace for 10 years",
    text: "Service feels number one. I recommend Ashishbhai from Navsari to anyone looking for a reliable furnace."
  },
  {
    name: "Janak Soni",
    meta: "4 years product use",
    text: "The machine solved melting-loss issues and made the process completely tension-free."
  },
  {
    name: "Anand Narvekar",
    meta: "1KG furnace user for 6 years",
    text: "Not a single problem till today. Good quality and good service from Kali Manufacturers."
  },
  {
    name: "Ketan Porwal",
    meta: "Electric furnace user for 8+ years",
    text: "Amazing speed for melting gold, with no loss of gold while melting."
  },
  {
    name: "Abhishek Pawar",
    meta: "Repeat buyer",
    text: "The 1KG machine is still working well after years, and the 5KG machine order also received a good response."
  },
  {
    name: "Uvaise Memon",
    meta: "Two furnace owner",
    text: "Fully satisfied. Ashishbhai's steel furnace is fast and number one."
  },
  {
    name: "Shatish Palla",
    meta: "Gold melting customer",
    text: "Very helpful for gold melting. Timing is excellent and I suggest Shree Kali Manufacturers, Navsari."
  },
  {
    name: "Imran Choksi",
    meta: "Fast furnace user",
    text: "Very thankful to Ashishbhai for this fast furnace. I am very happy with the machine."
  }
];

const paymentRows = [
  ["A/C Name", "Shree Kali Manufacturers"],
  ["Bank Name", "Bank of Maharashtra"],
  ["A/C No.", "60561840319"],
  ["IFSC Code", "MAHB0000432"],
  ["Branch", "Sayaji Library, Navsari"]
];

const aiFallbackTopics = [
  "product prices",
  "best machine model",
  "payment details",
  "contact number",
  "address and location",
  "certificates and trust",
  "inquiry form"
];

function whatsappUrl(extra = "") {
  const message = extra ? `${CONTACT.message}\n\nProduct: ${extra}` : CONTACT.message;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl();
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function switchPage(pageName) {
  document.querySelectorAll("[data-page]").forEach((page) => {
    page.hidden = page.dataset.page !== pageName;
  });

  document.querySelectorAll(".bottom-nav [data-switch-page]").forEach((button) => {
    button.classList.toggle("active", button.dataset.switchPage === pageName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindPageSwitching() {
  document.querySelectorAll("[data-switch-page]").forEach((control) => {
    control.addEventListener("click", () => {
      switchPage(control.dataset.switchPage);
      if (control.dataset.galleryFocus === "video") {
        requestAnimationFrame(() => {
          document.getElementById("videoBlock")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  });
}

function renderProducts() {
  const list = document.getElementById("productList");
  if (!list) return;

  list.innerHTML = products
    .map(
      (product, index) => `
        <article class="product-row">
          <button class="product-photo" type="button" data-lightbox="${product.image}">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </button>
          <div class="product-info">
            <div class="product-title-line">
              <span class="product-number">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>Nexon Series</small>
                <h3>${product.name}</h3>
              </div>
            </div>
            <div class="capacity">${product.capacity}</div>
            <div class="feature-tags">${product.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="price-pair">
              <div><small>Without GST</small><strong>${product.base}</strong></div>
              <div><small>With GST</small><strong>${product.price}</strong></div>
            </div>
            <div class="row-actions">
              <button type="button" data-open-modal="inquiryModal" data-inquiry-product="${product.name}">Enquiry Form</button>
              <a href="tel:${CONTACT.call}">Call</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGallery(category = "Exterior View") {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  grid.innerHTML = galleries[category]
    .map((num) => {
      const src = productImages[num - 1];
      return `
        <button class="gallery-item" type="button" data-lightbox="${src}">
          <img src="${src}" alt="${category} ${num}" loading="lazy">
        </button>
      `;
    })
    .join("");
}

function renderCataloguePages() {
  const grid = document.getElementById("catalogueGrid");
  if (!grid) return;

  grid.innerHTML = catalogueImages
    .map(
      (src, index) => `
        <button class="catalogue-page" type="button" data-lightbox="${src}">
          <img src="${src}" alt="Shree Kali catalogue page ${index + 1}" loading="lazy">
          <span>Page ${index + 1}</span>
        </button>
      `
    )
    .join("");
}

function bindGalleryTabs() {
  document.querySelectorAll("[data-gallery-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-gallery-tab]").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      renderGallery(button.dataset.galleryTab);
    });
  });
}

function bindLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  if (!lightbox || !lightboxImage) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox]");
    if (!trigger) return;

    const image = trigger.querySelector("img");
    lightboxImage.src = trigger.dataset.lightbox;
    lightboxImage.alt = image?.alt || "Shree Kali machine image";
    openDialog(lightbox);
    refreshIcons();
  });

  document.querySelector("[data-close-lightbox]")?.addEventListener("click", () => closeDialog(lightbox));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeDialog(lightbox);
  });
}

function renderPayment() {
  const container = document.getElementById("paymentDetails");
  if (!container) return;

  container.innerHTML = paymentRows
    .map(
      ([label, value]) => `
        <div class="payment-row">
          <span>${label}</span>
          <strong>${value}</strong>
          <button type="button" data-copy="${value}" aria-label="Copy ${label}">
            <i data-lucide="copy"></i>
          </button>
        </div>
      `
    )
    .join("");
}

function populateInquiryProducts() {
  const select = document.getElementById("inquiryProduct");
  if (!select) return;

  const options = products
    .map((product) => `<option value="${product.name}">${product.name}</option>`)
    .join("");
  select.innerHTML = `<option value="">Select machine model</option>${options}`;
}

function prefillInquiryProduct(productName) {
  const select = document.getElementById("inquiryProduct");
  if (!select || !productName) return;
  select.value = productName;
}

function inquiryTimestampText(date) {
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

function makeInquiryId(date) {
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0")
  ].join("");
  return `SKM-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function collectInquiryRecord(form) {
  const now = new Date();
  const data = new FormData(form);
  return {
    id: makeInquiryId(now),
    submittedAt: now.toISOString(),
    submittedAtText: inquiryTimestampText(now),
    name: String(data.get("name") || "").trim(),
    mobile: String(data.get("mobile") || "").trim(),
    city: String(data.get("city") || "").trim(),
    product: String(data.get("product") || "").trim(),
    message: String(data.get("message") || "").trim(),
    requirementDetails: String(data.get("message") || "").trim(),
    source: window.location.href,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Local time",
    device: navigator.userAgent || "Unknown device"
  };
}

function serverInquiryStorageAvailable() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

function visitorCountingAllowed() {
  return serverInquiryStorageAvailable() && !new URLSearchParams(window.location.search).has("noVisitorCount");
}

function makeVisitorId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId() {
  try {
    let visitorId = localStorage.getItem(VISITOR_STORAGE_KEY);
    if (!visitorId) {
      visitorId = makeVisitorId();
      localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
    }
    return visitorId;
  } catch {
    return makeVisitorId();
  }
}

function setVisitorCounterState(stats, status, note) {
  const totalUnique = document.getElementById("visitorTotalUnique");
  const totalViews = document.getElementById("visitorTotalViews");
  const todayUnique = document.getElementById("visitorTodayUnique");
  const statusEl = document.getElementById("visitorCountStatus");
  const noteEl = document.getElementById("visitorCountNote");

  if (totalUnique) totalUnique.textContent = stats?.totalVisitors ?? "--";
  if (totalViews) totalViews.textContent = stats?.totalViews ?? "--";
  if (todayUnique) todayUnique.textContent = stats?.todayVisitors ?? "--";
  if (statusEl) statusEl.textContent = status;
  if (noteEl) noteEl.textContent = note;
}

async function registerVisitorCount() {
  if (!document.getElementById("visitorTotalUnique")) return;

  if (!visitorCountingAllowed()) {
    setVisitorCounterState(
      null,
      "Server required",
      "Open this card through preview-server.js to count real visitors across all devices."
    );
    return;
  }

  try {
    const response = await fetch("./api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        visitedAt: new Date().toISOString(),
        source: window.location.href,
        referrer: document.referrer || "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Local time",
        device: navigator.userAgent || "Unknown device"
      })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.error || "Visitor API failed");
    setVisitorCounterState(data.stats, "Live", "Real visitor count from this DziCard server link.");
  } catch {
    setVisitorCounterState(
      null,
      "Offline",
      "Visitor server is not reachable. Start preview-server.js and open the card from the network link."
    );
  }
}

function normalizeAiText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+\u0900-\u097F ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function aiLooksHindi(input) {
  const query = normalizeAiText(input);
  return (
    /[\u0900-\u097F]/.test(String(input || "")) ||
    /\b(kya|kitna|kitne|daam|bhav|batao|bolo|kholo|dikhao|madad|hindi|kaise|payment karo|sampark|pata)\b/.test(query)
  );
}

function aiResolveLanguage(input) {
  if (aiLanguage === "hi" || aiLooksHindi(input)) return "hi";
  return "en";
}

function productLine(product, language = "en") {
  if (language === "hi") {
    return `${product.name}: क्षमता ${product.capacity}, बिना GST ${product.base}, GST के साथ ${product.price}. Highlights: ${product.tags.join(", ")}.`;
  }
  return `${product.name}: ${product.capacity}, without GST ${product.base}, with GST ${product.price}. Highlights: ${product.tags.join(", ")}.`;
}

function productScore(product, query) {
  const normalizedName = normalizeAiText(product.name);
  const normalizedCapacity = normalizeAiText(product.capacity);
  let score = 0;

  if (query.includes(normalizedName)) score += 12;
  if (query.includes(normalizedCapacity)) score += 5;

  const kgMatch = product.name.match(/(\d+)KG/i);
  if (kgMatch) {
    const kg = kgMatch[1];
    if (query.includes(`${kg}kg`) || query.includes(`${kg} kg`) || query.includes(`${kg} किलो`) || query.includes(`${kg} किग्रा`)) score += 4;
  }

  ["economic", "commercial", "thyristor", "high load"].forEach((term) => {
    if (query.includes(term) && normalizedName.includes(term)) score += 4;
  });

  if (query.includes("20kg") && normalizedName.includes("20kg")) score += 6;
  return score;
}

function findAiProduct(query) {
  return products
    .map((product) => ({ product, score: productScore(product, query) }))
    .sort((a, b) => b.score - a.score)[0];
}

function productPriceListAnswer(language = "en") {
  if (language === "hi") {
    return [
      "इस DZ card की official product price list:",
      ...products.map((product, index) => `${index + 1}. ${productLine(product, language)}`),
      "",
      "Final order confirmation के लिए Inquiry Form खोलें या 9737555169 पर call करें."
    ].join("\n");
  }

  return [
    "Here is the official product price list from this DZ card:",
    ...products.map((product, index) => `${index + 1}. ${productLine(product)}`),
    "",
    "For final order confirmation, open Inquiry Form or call 9737555169."
  ].join("\n");
}

function recommendationAnswer(query, language = "en") {
  const hasOne = query.includes("1kg") || query.includes("1 kg") || query.includes("1 किलो");
  const hasThree = query.includes("3kg") || query.includes("3 kg") || query.includes("3 किलो");
  const hasFive = query.includes("5kg") || query.includes("5 kg") || query.includes("5 किलो");
  const hasTen = query.includes("10kg") || query.includes("10 kg") || query.includes("10 किलो");
  const hasTwenty = query.includes("20kg") || query.includes("20 kg") || query.includes("20 किलो");

  if (language === "hi") {
    if (hasOne) {
      return [
        "1KG gold melting के लिए:",
        "- Budget/simple use: Nexon 1KG Economic",
        "- Regular commercial use: Nexon 1KG Commercial",
        "- Better control और uniform heating: Nexon 1KG Thyristor",
        "",
        "Inquiry Form में usage details भेजें, team best model guide करेगी."
      ].join("\n");
    }
    if (hasThree) return `3KG capacity के लिए इस card में ${productLine(products[3], language)}`;
    if (hasFive) {
      return [
        "5KG gold melting के लिए:",
        `- Standard/economic option: ${productLine(products[4], language)}`,
        `- Commercial heavy-load option: ${productLine(products[5], language)}`,
        "",
        "Continuous workshop use के लिए Commercial High Load model बेहतर रहेगा."
      ].join("\n");
    }
    if (hasTen) {
      return [
        "10KG gold melting के लिए:",
        `- Economic option: ${productLine(products[6], language)}`,
        `- Thyristor option: ${productLine(products[7], language)}`,
        `- Commercial High Load option: ${productLine(products[8], language)}`,
        "",
        "Heavy usage के लिए Commercial High Load option पूछें."
      ].join("\n");
    }
    if (hasTwenty) return `20KG high-load work के लिए ${productLine(products[9], language)}`;
    return "Capacity बताइए: 1KG, 3KG, 5KG, 10KG या 20KG. मैं इसी DZ card के हिसाब से best model suggest करूंगा.";
  }

  if (hasOne) {
    return [
      "For 1KG gold melting:",
      "- Budget/simple use: Nexon 1KG Economic",
      "- Commercial regular use: Nexon 1KG Commercial",
      "- Better control and uniform heating: Nexon 1KG Thyristor",
      "",
      "Tap Inquiry Form and share your usage style, so Shree Kali can guide the best option."
    ].join("\n");
  }
  if (hasThree) return `For 3KG capacity, this card lists ${productLine(products[3])}`;
  if (hasFive) {
    return [
      "For 5KG gold melting:",
      `- Standard/economic option: ${productLine(products[4])}`,
      `- Commercial heavy-load option: ${productLine(products[5])}`,
      "",
      "Choose Commercial High Load for continuous workshop use."
    ].join("\n");
  }
  if (hasTen) {
    return [
      "For 10KG gold melting:",
      `- Economic option: ${productLine(products[6])}`,
      `- Thyristor option: ${productLine(products[7])}`,
      `- Commercial High Load option: ${productLine(products[8])}`,
      "",
      "For high usage and durability, ask about the Commercial High Load model."
    ].join("\n");
  }
  if (hasTwenty) return `For 20KG high-load work, this card lists ${productLine(products[9])}`;

  return [
    "Tell me your melting capacity like 1KG, 3KG, 5KG, 10KG, or 20KG and I will suggest the best model from this DZ card.",
    "For immediate help, call 9737555169."
  ].join("\n");
}

function aiPaymentAnswer(language = "en") {
  if (language === "hi") {
    return [
      "इस DZ card के secure payment details:",
      ...paymentRows.map(([label, value]) => `${label}: ${value}`),
      "",
      "Payment करने से पहले order amount confirm करें. Official payment image Pay section में है."
    ].join("\n");
  }

  return [
    "Secure payment details from this DZ card:",
    ...paymentRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Please confirm order amount before payment. You can also open the Pay section for the official payment image."
  ].join("\n");
}

function aiContactAnswer(language = "en") {
  if (language === "hi") {
    return [
      "Shree Kali Manufacturers contact:",
      `Call: ${CONTACT.call}`,
      `WhatsApp: +${CONTACT.whatsapp}`,
      `Inquiry WhatsApp: ${CONTACT.inquiryWhatsapp}`,
      `Email: ${CONTACT.email}`,
      `Website: ${CONTACT.website}`,
      "",
      "New order के लिए Inquiry Form खोलकर details WhatsApp पर भेजें."
    ].join("\n");
  }

  return [
    "Contact Shree Kali Manufacturers:",
    `Call: ${CONTACT.call}`,
    `WhatsApp: +${CONTACT.whatsapp}`,
    `Inquiry WhatsApp: ${CONTACT.inquiryWhatsapp}`,
    `Email: ${CONTACT.email}`,
    `Website: ${CONTACT.website}`,
    "",
    "For a new order, open Inquiry Form and submit details to WhatsApp."
  ].join("\n");
}

function aiResolveAction(input) {
  const query = normalizeAiText(input);
  const wantsOpen =
    /\b(open|show|go|navigate|take|display|kholo|dikhao|jana|jao)\b/.test(query) ||
    query.includes("खोल") ||
    query.includes("दिखा") ||
    query.includes("जाओ");

  if (!wantsOpen) return null;

  const escapeRegExp = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const includesAny = (words) =>
    words.some((word) => {
      if (/^[a-z0-9 ]+$/.test(word)) {
        return word.includes(" ") ? query.includes(word) : new RegExp(`\\b${escapeRegExp(word)}\\b`).test(query);
      }
      return query.includes(word);
    });

  if (includesAny(["payment", "pay", "bank", "upi", "account", "भुगतान", "पेमेंट", "बैंक"])) {
    return { type: "modal", modal: "paymentModal", en: "Payment", hi: "Payment" };
  }
  if (includesAny(["inquiry", "enquiry", "form", "order", "buy", "पूछताछ", "इन्क्वायरी", "फॉर्म", "ऑर्डर"])) {
    return { type: "modal", modal: "inquiryModal", en: "Inquiry Form", hi: "Inquiry Form" };
  }
  if (includesAny(["about", "company", "about us", "कंपनी", "हमारे बारे"])) {
    return { type: "modal", modal: "aboutModal", en: "About Us", hi: "About Us" };
  }
  if (includesAny(["legal", "info", "information", "gst", "gstin", "जानकारी", "लीगल"])) {
    return { type: "modal", modal: "legalModal", en: "Legal Info", hi: "Legal Info" };
  }
  if (includesAny(["qr", "scanner", "scan", "क्यूआर", "स्कैन"])) {
    return { type: "modal", modal: "cardQrModal", en: "Business QR", hi: "Business QR" };
  }
  if (includesAny(["rod", "rod change", "रॉड"])) {
    return { type: "modal", modal: "rodChangeModal", en: "Rod Change Scanner", hi: "Rod Change Scanner" };
  }
  if (includesAny(["share", "शेयर"])) {
    return { type: "modal", modal: "shareModal", en: "Share Card", hi: "Share Card" };
  }
  if (includesAny(["product", "products", "machine", "price list", "catalog", "catalogue", "प्रोडक्ट", "उत्पाद", "मशीन", "कैटलॉग"])) {
    return { type: "page", page: "products", en: "Products section", hi: "Products section" };
  }
  if (includesAny(["gallery", "photo", "image", "video", "गैलरी", "फोटो", "वीडियो"])) {
    return { type: "page", page: "gallery", en: "Gallery section", hi: "Gallery section" };
  }
  if (includesAny(["trust", "review", "certificate", "map", "location", "visitor", "ट्रस्ट", "रिव्यू", "सर्टिफिकेट", "मैप", "लोकेशन"])) {
    return { type: "page", page: "trust", en: "Trust section", hi: "Trust section" };
  }
  if (includesAny(["home", "main", "होम"])) {
    return { type: "page", page: "home", en: "Home section", hi: "Home section" };
  }

  return null;
}

function aiActionIntro(action, language = "en") {
  if (!action) return "";
  return language === "hi" ? `${action.hi} खोल रहा हूं.` : `Opening ${action.en} now.`;
}

function aiQuestionIsActionOnly(input) {
  const query = normalizeAiText(input);
  const detailWords = ["price", "rate", "cost", "best", "suggest", "recommend", "detail", "gst", "kitna", "daam", "भव", "दाम", "कितना"];
  return !detailWords.some((word) => query.includes(word));
}

function aiAnswerQuestion(input, language = aiResolveLanguage(input)) {
  const query = normalizeAiText(input);
  if (!query) {
    return language === "hi"
      ? "आप इस DZ card के products, prices, payment, contact, catalogue, certificates, QR या inquiry के बारे में पूछ सकते हैं."
      : "Ask me anything about this DZ card: products, prices, payment, contact, catalogue, certificates, QR, or inquiry.";
  }

  if (/\b(hi|hello|hey|namaste|नमस्ते)\b/.test(query)) {
    return language === "hi"
      ? "नमस्ते. मैं Shree Kali DZ Card assistant हूं. मैं product price, model selection, payment, contact, certificates, QR और inquiry में मदद कर सकता हूं."
      : "Hello. I am the Shree Kali DZ Card assistant. I can answer product price, model selection, payment, contact, certificates, QR, and inquiry questions from this card.";
  }

  if (query.includes("price list") || query.includes("all price") || query.includes("all product") || query.includes("पूरी price") || query.includes("सभी price") || (query.includes("catalog") && query.includes("price"))) {
    return productPriceListAnswer(language);
  }

  if (query.includes("best") || query.includes("suggest") || query.includes("recommend") || query.includes("which model") || query.includes("कौन") || query.includes("suggest karo")) {
    return recommendationAnswer(query, language);
  }

  const matchedProduct = findAiProduct(query);
  const wantsPrice = query.includes("price") || query.includes("rate") || query.includes("cost") || query.includes("gst") || query.includes("दाम") || query.includes("कितना") || query.includes("bhav") || query.includes("daam");
  if (matchedProduct && matchedProduct.score > 3 && (wantsPrice || query.includes("detail") || query.includes("capacity") || query.includes("machine") || query.includes("मशीन"))) {
    const nextStep =
      language === "hi"
        ? "Availability, delivery और exact order confirmation के लिए Inquiry Form खोलें."
        : "Open Inquiry Form to ask availability, delivery, and exact order confirmation.";
    return `${productLine(matchedProduct.product, language)}\n\n${nextStep}`;
  }

  if (query.includes("payment") || query.includes("bank") || query.includes("ifsc") || query.includes("account") || query.includes("upi") || query.includes("pay") || query.includes("भुगतान") || query.includes("पेमेंट")) {
    return aiPaymentAnswer(language);
  }

  if (query.includes("call") || query.includes("phone") || query.includes("mobile") || query.includes("whatsapp") || query.includes("contact") || query.includes("email") || query.includes("sampark") || query.includes("संपर्क")) {
    return aiContactAnswer(language);
  }

  if (query.includes("address") || query.includes("location") || query.includes("map") || query.includes("navsari") || query.includes("pata") || query.includes("लोकेशन") || query.includes("पता")) {
    return language === "hi"
      ? `Location:\n${CONTACT.address}\n\nNavigation के लिए Trust section का map खोलें.`
      : `Location from this DZ card:\n${CONTACT.address}\n\nOpen the Trust section map for navigation.`;
  }

  if (query.includes("inquiry") || query.includes("enquiry") || query.includes("order") || query.includes("buy") || query.includes("requirement") || query.includes("पूछताछ") || query.includes("ऑर्डर")) {
    return language === "hi"
      ? "Inquiry Form खोलें, name, mobile, city, product और requirement details भरें. Submit करने पर WhatsApp में पूरा message 9737555169 के लिए ready हो जाएगा."
      : "Open Inquiry Form, fill customer name, mobile, city, product, and requirement details. On submit, WhatsApp opens with the full message ready for 9737555169.";
  }

  if (query.includes("certificate") || query.includes("award") || query.includes("trust") || query.includes("review") || query.includes("सर्टिफिकेट") || query.includes("रिव्यू")) {
    return language === "hi"
      ? "Trust section में certificate/award images, Google-style reviews, business links, location map और real visitor counter है."
      : "The Trust section includes real certificate/award images, Google-style review cards, business links, location map, and the real DZ card visitor counter when opened through preview-server.js.";
  }

  if (query.includes("visitor") || query.includes("views") || query.includes("count")) {
    return language === "hi"
      ? "Visitor counter real है जब card server/mobile link से open होता है. Direct file open करने पर सभी devices का count share नहीं हो सकता."
      : "The Trust section visitor counter is real when this card is opened through the server/mobile link. Direct file opening cannot count visitors across devices.";
  }

  if (query.includes("rod") || query.includes("scanner") || query.includes("scan") || query.includes("qr") || query.includes("रॉड") || query.includes("स्कैन")) {
    return language === "hi"
      ? "Rod Change button से rod-change scanner open करें. QR rod change video/scanner details के लिए है."
      : "Use the Rod Change button to open the rod-change scanner. The QR opens the rod change video/scanner information added in this card.";
  }

  if (query.includes("gallery") || query.includes("video") || query.includes("photo") || query.includes("image") || query.includes("गैलरी") || query.includes("वीडियो")) {
    return language === "hi"
      ? "Gallery में product photos, 360-style product view, catalogue pages और video demo sections हैं."
      : "Open Gallery to view product photos, 360-style product view, catalogue pages, and video demo sections.";
  }

  if (query.includes("service") || query.includes("delivery") || query.includes("worker") || query.includes("since")) {
    return language === "hi"
      ? "यह card Shree Kali Manufacturers को 2014 से gold melting furnace solutions, service support और jewellers/workshops के लिए machines के रूप में present करता है."
      : "This card presents Shree Kali Manufacturers as established since 2014, with gold melting furnace solutions, service support, fast delivery messaging, and machines for jewellers and workshops across India.";
  }

  return language === "hi"
    ? [
        "मैं इस Shree Kali DZ card के data से answer देता हूं. आप पूछ सकते हैं:",
        aiFallbackTopics.map((topic) => `- ${topic}`).join("\n"),
        "",
        "Custom requirement के लिए Inquiry Form खोलें या 9737555169 पर call करें."
      ].join("\n")
    : [
        "I can answer from this Shree Kali DZ card only. Try asking about:",
        aiFallbackTopics.map((topic) => `- ${topic}`).join("\n"),
        "",
        "For custom requirements, open Inquiry Form or call 9737555169."
      ].join("\n");
}

function aiHandleQuestion(input) {
  const language = aiResolveLanguage(input);
  const action = aiResolveAction(input);
  const answer = aiAnswerQuestion(input, language);

  if (action && aiQuestionIsActionOnly(input)) {
    return { language, action, text: aiActionIntro(action, language) };
  }

  return {
    language,
    action,
    text: action ? `${aiActionIntro(action, language)}\n\n${answer}` : answer
  };
}

function executeAiAction(action) {
  if (!action) return;

  if (action.type === "page") {
    switchPage(action.page);
    refreshIcons();
    return;
  }

  if (action.type === "modal") {
    openDialog(document.getElementById(action.modal));
    refreshIcons();
  }
}

function stripAiSpeechText(text, language = "en") {
  const clean = String(text || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= 850) return clean;
  return language === "hi"
    ? "पूरा जवाब chat में दे दिया है. कृपया screen पर details देखें."
    : "I have added the full answer in chat. Please read the complete details on screen.";
}

function updateAiVoiceControls() {
  const voiceButton = document.querySelector("[data-ai-voice-toggle]");
  const micButton = document.querySelector("[data-ai-voice-input]");
  const status = document.getElementById("aiVoiceStatus");

  voiceButton?.setAttribute("aria-pressed", aiVoiceEnabled ? "true" : "false");
  voiceButton?.classList.toggle("active", aiVoiceEnabled);
  micButton?.classList.toggle("listening", aiListening);

  const voiceText = voiceButton?.querySelector("span");
  if (voiceText) voiceText.textContent = aiVoiceEnabled ? "Voice On" : "Voice Off";

  const micText = micButton?.querySelector("span");
  if (micText) micText.textContent = aiListening ? "Listening" : "Speak";

  if (status) {
    if (aiListening) {
      status.textContent = aiLanguage === "hi" ? "सुन रहा हूं... अपना सवाल बोलिए." : "Listening... speak your question.";
    } else {
      status.textContent = aiVoiceEnabled
        ? aiLanguage === "hi"
          ? "Voice mode on है. जवाब बोलकर भी सुनाई देगा."
          : "Voice mode is on. Replies will be spoken aloud."
        : aiLanguage === "hi"
          ? "Typing से पूछें, या Voice On करके Speak दबाएं."
          : "Ask by typing, or turn on voice and use Speak.";
    }
  }
}

function speakAiText(text, language = "en") {
  if (!aiVoiceEnabled || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(stripAiSpeechText(text, language));
  utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = language === "hi" ? 0.88 : 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function startAiVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    addAiChatMessage(
      "bot",
      aiLanguage === "hi"
        ? "इस browser में voice input support नहीं है. कृपया type करके पूछें."
        : "This browser does not support voice input. Please type your question."
    );
    return;
  }

  if (!aiRecognition) {
    aiRecognition = new SpeechRecognition();
    aiRecognition.continuous = false;
    aiRecognition.interimResults = false;
    aiRecognition.maxAlternatives = 1;

    aiRecognition.addEventListener("start", () => {
      aiListening = true;
      updateAiVoiceControls();
    });

    aiRecognition.addEventListener("end", () => {
      aiListening = false;
      updateAiVoiceControls();
    });

    aiRecognition.addEventListener("error", () => {
      aiListening = false;
      updateAiVoiceControls();
      addAiChatMessage(
        "bot",
        aiLanguage === "hi" ? "Voice सुनने में problem आई. कृपया फिर से बोलें या type करें." : "Voice listening had a problem. Please try again or type your question."
      );
    });

    aiRecognition.addEventListener("result", (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript) {
        const input = document.getElementById("aiChatInput");
        if (input) input.value = transcript;
        handleAiQuestion(transcript);
      }
    });
  }

  if (aiListening) {
    aiRecognition.stop();
    return;
  }

  aiRecognition.lang = aiLanguage === "hi" ? "hi-IN" : "en-IN";
  aiRecognition.start();
}

function setAiLanguage(language) {
  aiLanguage = language === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-ai-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.aiLang === aiLanguage);
  });
  updateAiVoiceControls();
}

function addAiChatMessage(role, text) {
  const messages = document.getElementById("aiChatMessages");
  if (!messages) return;

  const item = document.createElement("article");
  item.className = `ai-chat-message ${role}`;

  if (role === "bot") {
    const avatar = document.createElement("img");
    avatar.src = "assets/images/brand/ai-chatbot-avatar.png";
    avatar.alt = "";
    item.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className = "ai-chat-bubble";
  bubble.textContent = text;
  item.appendChild(bubble);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

function seedAiChat() {
  const messages = document.getElementById("aiChatMessages");
  if (!messages || messages.childElementCount) return;
  addAiChatMessage("bot", "Welcome. I can answer in English or Hindi, speak replies, listen to voice questions, and open card sections like Products, Payment, Inquiry, Gallery, QR, Rod Change, and Trust.");
}

function setAiChatOpen(open) {
  const panel = document.getElementById("aiChatPanel");
  const launcher = document.querySelector("[data-ai-chat-toggle]");
  if (!panel) return;

  panel.hidden = !open;
  launcher?.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) {
    seedAiChat();
    updateAiVoiceControls();
    requestAnimationFrame(() => document.getElementById("aiChatInput")?.focus());
  }
}

function handleAiQuestion(question) {
  const cleanQuestion = String(question || "").trim();
  if (!cleanQuestion) return;

  addAiChatMessage("user", cleanQuestion);
  const response = aiHandleQuestion(cleanQuestion);
  window.setTimeout(() => {
    addAiChatMessage("bot", response.text);
    speakAiText(response.text, response.language);
    window.setTimeout(() => executeAiAction(response.action), 220);
  }, 180);
}

function bindAiAssistant() {
  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");

  document.querySelectorAll("[data-ai-chat-open], [data-ai-chat-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById("aiChatPanel");
      setAiChatOpen(panel?.hidden !== false);
      refreshIcons();
    });
  });

  document.querySelector("[data-ai-chat-close]")?.addEventListener("click", () => {
    window.speechSynthesis?.cancel();
    setAiChatOpen(false);
  });

  document.querySelectorAll("[data-ai-lang]").forEach((button) => {
    button.addEventListener("click", () => setAiLanguage(button.dataset.aiLang));
  });

  document.querySelector("[data-ai-voice-toggle]")?.addEventListener("click", () => {
    aiVoiceEnabled = !aiVoiceEnabled;
    updateAiVoiceControls();
    if (aiVoiceEnabled) {
      speakAiText(aiLanguage === "hi" ? "Voice mode on है." : "Voice mode is on.", aiLanguage);
    } else {
      window.speechSynthesis?.cancel();
    }
  });

  document.querySelector("[data-ai-voice-input]")?.addEventListener("click", startAiVoiceInput);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = String(input?.value || "").trim();
    if (!question) return;
    if (input) input.value = "";
    handleAiQuestion(question);
  });

  setAiLanguage(aiLanguage);
}

function aiIntentText(input) {
  return normalizeAiText(input)
    .replace(/\b(inquery|inquirie|inquiryy|enquery|enquiry)\b/g, "inquiry")
    .replace(/\b(payemnt|paymant)\b/g, "payment")
    .replace(/\b(proeduct|prodect|prodcut)\b/g, "product")
    .replace(/\b(thyritsor|thyristar|thyristur)\b/g, "thyristor")
    .replace(/\b(scetion|seciton)\b/g, "section");
}

function aiHasAny(query, words) {
  const escapeRegExp = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return words.some((word) => {
    if (/^[a-z0-9 +]+$/.test(word)) {
      return word.includes(" ") ? query.includes(word) : new RegExp(`\\b${escapeRegExp(word)}\\b`).test(query);
    }
    return query.includes(word);
  });
}

function productLine(product, language = "en") {
  if (language === "hi") {
    return `${product.name}: ${product.capacity}. बिना GST ${product.base}, GST सहित ${product.price}.`;
  }
  return `${product.name}: ${product.capacity}. Without GST ${product.base}, with GST ${product.price}.`;
}

function productScore(product, rawQuery) {
  const query = aiIntentText(rawQuery);
  const normalizedName = normalizeAiText(product.name);
  let score = 0;

  if (query.includes(normalizedName)) score += 14;

  const kgMatch = product.name.match(/(\d+)KG/i);
  if (kgMatch) {
    const kg = kgMatch[1];
    if (aiHasAny(query, [`${kg}kg`, `${kg} kg`, `${kg} किलो`, `${kg} किग्रा`])) score += 5;
  }

  [
    ["economic", ["economic", "economy", "इकॉनॉमिक"]],
    ["commercial", ["commercial", "कमर्शियल"]],
    ["thyristor", ["thyristor", "थायरिस्टर"]],
    ["high load", ["high load", "heavy load", "हाई लोड"]]
  ].forEach(([nameTerm, queryTerms]) => {
    if (normalizedName.includes(nameTerm) && aiHasAny(query, queryTerms)) score += 5;
  });

  if (query.includes(normalizeAiText(product.capacity))) score += 3;
  return score;
}

function findAiProduct(query) {
  return products
    .map((product) => ({ product, score: productScore(product, query) }))
    .sort((a, b) => b.score - a.score)[0];
}

function productPriceListAnswer(language = "en") {
  const lines = products.map((product, index) => `${index + 1}. ${productLine(product, language)}`);
  if (language === "hi") {
    return [
      "Official price list:",
      ...lines,
      "",
      "Final amount confirm करने के लिए Inquiry Form खोलें या 9737555169 / 9737555196 पर call करें."
    ].join("\n");
  }

  return [
    "Official product price list:",
    ...lines,
    "",
    "For final amount confirmation, open Inquiry Form or call 9737555169 / 9737555196."
  ].join("\n");
}

function recommendationAnswer(query, language = "en") {
  const hasOne = aiHasAny(query, ["1kg", "1 kg", "1 किलो"]);
  const hasThree = aiHasAny(query, ["3kg", "3 kg", "3 किलो"]);
  const hasFive = aiHasAny(query, ["5kg", "5 kg", "5 किलो"]);
  const hasTen = aiHasAny(query, ["10kg", "10 kg", "10 किलो"]);
  const hasTwenty = aiHasAny(query, ["20kg", "20 kg", "20 किलो"]);

  if (language === "hi") {
    if (hasOne) return "1KG के लिए: budget use में Nexon 1KG Economic, regular commercial use में Nexon 1KG Commercial, और better control के लिए Nexon 1KG Thyristor.";
    if (hasThree) return `3KG के लिए ${productLine(products[3], language)}`;
    if (hasFive) return `5KG के लिए standard use में ${products[4].name}; continuous/heavy use में ${products[5].name}.`;
    if (hasTen) return `10KG के लिए standard use में ${products[6].name}, better control में ${products[7].name}, heavy load में ${products[8].name}.`;
    if (hasTwenty) return `20KG high-load work के लिए ${productLine(products[9], language)}`;
    return "Capacity बताइए: 1KG, 3KG, 5KG, 10KG या 20KG. मैं इस DZ card से best model suggest कर दूंगा.";
  }

  if (hasOne) return "For 1KG: choose Nexon 1KG Economic for budget use, Nexon 1KG Commercial for regular work, and Nexon 1KG Thyristor for better control.";
  if (hasThree) return `For 3KG: ${productLine(products[3])}`;
  if (hasFive) return `For 5KG: ${products[4].name} for standard use; ${products[5].name} for continuous or heavy use.`;
  if (hasTen) return `For 10KG: ${products[6].name} for standard use, ${products[7].name} for better control, ${products[8].name} for high-load work.`;
  if (hasTwenty) return `For 20KG high-load work: ${productLine(products[9])}`;
  return "Tell me the capacity: 1KG, 3KG, 5KG, 10KG, or 20KG, and I will suggest the best model from this DZ card.";
}

function aiPaymentAnswer(language = "en") {
  const details = paymentRows.map(([label, value]) => `${label}: ${value}`);
  if (language === "hi") {
    return ["Payment details:", ...details, "", "Payment से पहले order amount confirm करें."].join("\n");
  }
  return ["Payment details:", ...details, "", "Please confirm the order amount before payment."].join("\n");
}

function aiContactAnswer(language = "en") {
  if (language === "hi") {
    return [
      `Call: ${CONTACT.call}`,
      `Second Call: ${CONTACT.secondaryCall}`,
      `WhatsApp: +${CONTACT.whatsapp}`,
      `Inquiry WhatsApp: +${CONTACT.inquiryWhatsapp}`,
      `Email: ${CONTACT.email}`,
      "Order के लिए Inquiry Form खोलें."
    ].join("\n");
  }
  return [
    `Call: ${CONTACT.call}`,
    `Second Call: ${CONTACT.secondaryCall}`,
    `WhatsApp: +${CONTACT.whatsapp}`,
    `Inquiry WhatsApp: +${CONTACT.inquiryWhatsapp}`,
    `Email: ${CONTACT.email}`,
    "For orders, open Inquiry Form."
  ].join("\n");
}

function aiResolveAction(input) {
  const query = aiIntentText(input);
  const wantsOpen =
    aiHasAny(query, ["open", "show", "go", "navigate", "take", "display", "launch", "kholo", "dikhao", "jana", "jao"]) ||
    query.includes("खोल") ||
    query.includes("दिखा") ||
    query.includes("जाओ") ||
    query.includes("section") ||
    query.includes("button");

  if (!wantsOpen) return null;

  if (aiHasAny(query, ["sensor", "sensor change", "sensor video", "sensor scanner", "सेंसर"])) {
    return { type: "modal", modal: "sensorChangeModal", en: "Sensor Change Scanner", hi: "Sensor Change Scanner" };
  }
  if (aiHasAny(query, ["gold process", "gold melting process", "melting process", "process video", "melting video", "गल्ड", "गोल्ड", "प्रोसेस"])) {
    return { type: "modal", modal: "goldProcessModal", en: "Gold Melting Process Scanner", hi: "Gold Melting Process Scanner" };
  }
  if (aiHasAny(query, ["rod", "rod change", "scan video", "रॉड"])) {
    return { type: "modal", modal: "rodChangeModal", en: "Rod Change Scanner", hi: "Rod Change Scanner" };
  }
  if (aiHasAny(query, ["payment", "pay", "bank", "upi", "account", "भुगतान", "पेमेंट", "बैंक"])) {
    return { type: "modal", modal: "paymentModal", en: "Payment", hi: "Payment" };
  }
  if (aiHasAny(query, ["inquiry", "form", "order", "buy", "lead", "पूछताछ", "इन्क्वायरी", "फॉर्म", "ऑर्डर"])) {
    return { type: "modal", modal: "inquiryModal", en: "Inquiry Form", hi: "Inquiry Form" };
  }
  if (aiHasAny(query, ["about", "company", "about us", "कंपनी", "हमारे बारे"])) {
    return { type: "modal", modal: "aboutModal", en: "About Us", hi: "About Us" };
  }
  if (aiHasAny(query, ["legal", "info", "information", "gst", "gstin", "जानकारी", "लीगल"])) {
    return { type: "modal", modal: "legalModal", en: "Legal Info", hi: "Legal Info" };
  }
  if (aiHasAny(query, ["product", "products", "machine", "price list", "catalog", "catalogue", "प्रोडक्ट", "उत्पाद", "मशीन", "कैटलॉग"])) {
    return { type: "page", page: "products", en: "Products section", hi: "Products section" };
  }
  if (aiHasAny(query, ["gallery", "photo", "image", "video", "गैलरी", "फोटो", "वीडियो"])) {
    return { type: "page", page: "gallery", en: "Gallery section", hi: "Gallery section" };
  }
  if (aiHasAny(query, ["trust", "review", "certificate", "map", "location", "visitor", "ट्रस्ट", "रिव्यू", "सर्टिफिकेट", "मैप", "लोकेशन"])) {
    return { type: "page", page: "trust", en: "Trust section", hi: "Trust section" };
  }
  if (aiHasAny(query, ["qr", "scanner", "scan", "क्यूआर", "स्कैन"])) {
    return { type: "modal", modal: "cardQrModal", en: "Business QR", hi: "Business QR" };
  }
  if (aiHasAny(query, ["share", "शेयर"])) {
    return { type: "modal", modal: "shareModal", en: "Share Card", hi: "Share Card" };
  }
  if (aiHasAny(query, ["home", "main", "होम"])) {
    return { type: "page", page: "home", en: "Home section", hi: "Home section" };
  }

  return null;
}

function aiActionIntro(action, language = "en") {
  if (!action) return "";
  return language === "hi" ? `${action.hi} खोल रहा हूं.` : `Opening ${action.en}.`;
}

function aiQuestionIsActionOnly(input) {
  const query = aiIntentText(input);
  const detailWords = ["price", "rate", "cost", "best", "suggest", "recommend", "detail", "gst", "kitna", "daam", "bhav", "दाम", "कितना"];
  return !detailWords.some((word) => query.includes(word));
}

function aiAnswerQuestion(input, language = aiResolveLanguage(input)) {
  const query = aiIntentText(input);
  if (!query) {
    return language === "hi"
      ? "Products, price, payment, contact, inquiry, gallery, QR, rod change, sensor change, gold melting process या trust के बारे में पूछें."
      : "Ask about products, prices, payment, contact, inquiry, gallery, QR, rod change, sensor change, gold melting process, or trust.";
  }

  if (aiHasAny(query, ["hi", "hello", "hey", "namaste", "नमस्ते"])) {
    return language === "hi"
      ? "नमस्ते. मैं Shree Kali DZ Card assistant हूं. Price, model, payment, scanner और sections खोलने में मदद कर सकता हूं."
      : "Hello. I can help with Shree Kali prices, model choice, payment, contact, scanners, and opening card sections.";
  }

  if (aiHasAny(query, ["price list", "all price", "all product", "पूरी price", "सभी price"]) || (query.includes("catalog") && query.includes("price"))) {
    return productPriceListAnswer(language);
  }

  if (aiHasAny(query, ["best", "suggest", "recommend", "which model", "कौन", "suggest karo"])) {
    return recommendationAnswer(query, language);
  }

  const matchedProduct = findAiProduct(query);
  const wantsPrice = aiHasAny(query, ["price", "rate", "cost", "gst", "दाम", "कितना", "bhav", "daam"]);
  if (matchedProduct && matchedProduct.score > 3 && (wantsPrice || aiHasAny(query, ["detail", "capacity", "machine", "मशीन"]))) {
    const nextStep =
      language === "hi"
        ? "Delivery/availability confirm करने के लिए Inquiry Form खोलें."
        : "Open Inquiry Form to confirm availability and delivery.";
    return `${productLine(matchedProduct.product, language)}\n${nextStep}`;
  }

  if (aiHasAny(query, ["payment", "bank", "ifsc", "account", "upi", "pay", "भुगतान", "पेमेंट"])) {
    return aiPaymentAnswer(language);
  }

  if (aiHasAny(query, ["call", "phone", "mobile", "whatsapp", "contact", "email", "sampark", "संपर्क"])) {
    return aiContactAnswer(language);
  }

  if (aiHasAny(query, ["address", "location", "map", "navsari", "pata", "लोकेशन", "पता"])) {
    return language === "hi"
      ? `Location: ${CONTACT.address}\nMap देखने के लिए Trust section खोलें.`
      : `Location: ${CONTACT.address}\nOpen Trust section for the map.`;
  }

  if (aiHasAny(query, ["inquiry", "order", "buy", "requirement", "पूछताछ", "ऑर्डर"])) {
    return language === "hi"
      ? "Inquiry Form में name, mobile, city, product और requirement भरें. Submit पर WhatsApp message 9737555169 के लिए ready होगा."
      : "Fill Inquiry Form with name, mobile, city, product, and requirement. Submit opens WhatsApp with the message ready for 9737555169.";
  }

  if (aiHasAny(query, ["certificate", "award", "trust", "review", "visitor", "सर्टिफिकेट", "रिव्यू"])) {
    return language === "hi"
      ? "Trust section में certificates, Google-style reviews, visitor counter, map और business links हैं."
      : "Trust section has certificates, Google-style reviews, visitor counter, map, and business links.";
  }

  if (aiHasAny(query, ["sensor", "sensor change", "sensor video", "sensor scanner", "सेंसर"])) {
    return language === "hi"
      ? "Sensor Change Video button से exact scanner open करें. Supported browser में Open Video From QR button video link खोलने की कोशिश करेगा."
      : "Use the Sensor Change Video button to open the exact scanner. In supported browsers, Open Video From QR tries to open the video link directly.";
  }

  if (aiHasAny(query, ["gold process", "gold melting process", "melting process", "process video", "melting video", "गोल्ड", "प्रोसेस"])) {
    return language === "hi"
      ? "Gold Melting Process button से exact scanner open करें. Supported browser में Open Video From QR button video link खोलने की कोशिश करेगा."
      : "Use the Gold Melting Process button to open the exact scanner. In supported browsers, Open Video From QR tries to open the video link directly.";
  }

  if (aiHasAny(query, ["rod", "scanner", "scan", "qr", "रॉड", "स्कैन"])) {
    return language === "hi"
      ? "Rod Change से rod scanner, Sensor Change Video से sensor scanner, Gold Melting Process से melting process scanner और QR Code से business QR open करें."
      : "Use Rod Change for the rod scanner, Sensor Change Video for the sensor scanner, Gold Melting Process for the melting process scanner, and QR Code for the business QR.";
  }

  if (aiHasAny(query, ["gallery", "video", "photo", "image", "गैलरी", "वीडियो"])) {
    return language === "hi"
      ? "Gallery में product photos, 360 view, catalogue pages और video demo हैं."
      : "Gallery has product photos, 360 view, catalogue pages, and video demo.";
  }

  return language === "hi"
    ? "मैं इस DZ card से short answer देता हूं. Product price, payment, contact, inquiry, gallery, QR, rod change, sensor change, gold melting process या trust के बारे में पूछें."
    : "I answer from this DZ card. Ask about product price, payment, contact, inquiry, gallery, QR, rod change, sensor change, gold melting process, or trust.";
}

function aiHandleQuestion(input) {
  const language = aiResolveLanguage(input);
  const action = aiResolveAction(input);
  const answer = aiAnswerQuestion(input, language);

  if (action && aiQuestionIsActionOnly(input)) {
    return { language, action, text: aiActionIntro(action, language) };
  }

  return {
    language,
    action,
    text: action ? `${aiActionIntro(action, language)}\n${answer}` : answer
  };
}

function stripAiSpeechText(text, language = "en") {
  const clean = String(text || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= 420) return clean;
  return language === "hi"
    ? "Details chat में दे दिए हैं. कृपया screen पर पढ़ें."
    : "I added the details in chat. Please read them on screen.";
}

function updateAiVoiceControls() {
  const voiceButton = document.querySelector("[data-ai-voice-toggle]");
  const micButton = document.querySelector("[data-ai-voice-input]");
  const status = document.getElementById("aiVoiceStatus");

  voiceButton?.setAttribute("aria-pressed", aiVoiceEnabled ? "true" : "false");
  voiceButton?.classList.toggle("active", aiVoiceEnabled);
  micButton?.classList.toggle("listening", aiListening);

  const voiceText = voiceButton?.querySelector("span");
  if (voiceText) voiceText.textContent = aiVoiceEnabled ? "Talk Back On" : "Talk Back Off";

  const micText = micButton?.querySelector("span");
  if (micText) micText.textContent = aiListening ? "Listening" : "Speak";

  if (status) {
    if (aiListening) {
      status.textContent = aiLanguage === "hi" ? "सुन रहा हूं... सवाल बोलिए." : "Listening... speak your question.";
    } else if (aiVoiceEnabled) {
      status.textContent = aiLanguage === "hi"
        ? "Voice सवाल पर जवाब बोलेगा. Typed जवाब silent रहेगा."
        : "Voice questions will speak back. Typed replies stay silent.";
    } else {
      status.textContent = aiLanguage === "hi"
        ? "Type करें, या Speak दबाकर voice सवाल पूछें."
        : "Type below, or press Speak to ask by voice.";
    }
  }
}

function speakAiText(text, language = "en", force = false) {
  if ((!force && !aiVoiceEnabled) || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(stripAiSpeechText(text, language));
  utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = language === "hi" ? 0.9 : 0.96;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function startAiVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    addAiChatMessage(
      "bot",
      aiLanguage === "hi"
        ? "इस browser में voice input support नहीं है. Type करके पूछें."
        : "This browser does not support voice input. Please type your question."
    );
    return;
  }

  aiVoiceEnabled = true;
  updateAiVoiceControls();

  if (!aiRecognition) {
    aiRecognition = new SpeechRecognition();
    aiRecognition.continuous = false;
    aiRecognition.interimResults = false;
    aiRecognition.maxAlternatives = 1;

    aiRecognition.addEventListener("start", () => {
      aiListening = true;
      updateAiVoiceControls();
    });

    aiRecognition.addEventListener("end", () => {
      aiListening = false;
      updateAiVoiceControls();
    });

    aiRecognition.addEventListener("error", () => {
      aiListening = false;
      updateAiVoiceControls();
      addAiChatMessage(
        "bot",
        aiLanguage === "hi" ? "Voice सुनने में problem आई. फिर से बोलें या type करें." : "Voice listening had a problem. Please try again or type your question."
      );
    });

    aiRecognition.addEventListener("result", (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript) {
        const input = document.getElementById("aiChatInput");
        if (input) input.value = "";
        handleAiQuestion(transcript, { voice: true });
      }
    });
  }

  if (aiListening) {
    aiRecognition.stop();
    return;
  }

  aiRecognition.lang = aiLanguage === "hi" ? "hi-IN" : "en-IN";
  aiRecognition.start();
}

function setAiLanguage(language) {
  aiLanguage = language === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-ai-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.aiLang === aiLanguage);
  });
  const input = document.getElementById("aiChatInput");
  if (input) {
    input.placeholder = aiLanguage === "hi" ? "Is DZ card ke baare mein poochhein..." : "Ask about this DZ card...";
  }
  updateAiVoiceControls();
}

function seedAiChat() {
  const messages = document.getElementById("aiChatMessages");
  if (!messages || messages.childElementCount) return;
  addAiChatMessage(
    "bot",
    "Hi. Ask in English or Hindi. I can answer prices, payment, contact, inquiry, and open Products, Pay, Gallery, QR, Rod Change, Sensor Change, Gold Melting Process, or Trust."
  );
}

function setAiChatOpen(open) {
  const panel = document.getElementById("aiChatPanel");
  const launcher = document.querySelector("[data-ai-chat-toggle]");
  if (!panel) return;

  panel.hidden = !open;
  launcher?.setAttribute("aria-expanded", open ? "true" : "false");
  launcher?.classList.toggle("chat-open", open);
  if (open) {
    seedAiChat();
    updateAiVoiceControls();
    requestAnimationFrame(() => document.getElementById("aiChatInput")?.focus());
  } else {
    window.speechSynthesis?.cancel();
  }
}

function handleAiQuestion(question, options = {}) {
  const cleanQuestion = String(question || "").trim();
  if (!cleanQuestion) return;

  addAiChatMessage("user", cleanQuestion);
  const response = aiHandleQuestion(cleanQuestion);
  window.setTimeout(() => {
    addAiChatMessage("bot", response.text);
    if (options.voice === true) speakAiText(response.text, response.language, true);
    window.setTimeout(() => executeAiAction(response.action), 220);
  }, 180);
}

function bindAiAssistant() {
  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");

  document.querySelectorAll("[data-ai-chat-open], [data-ai-chat-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById("aiChatPanel");
      setAiChatOpen(panel?.hidden !== false);
      refreshIcons();
    });
  });

  document.querySelector("[data-ai-chat-close]")?.addEventListener("click", () => {
    setAiChatOpen(false);
  });

  document.querySelectorAll("[data-ai-lang]").forEach((button) => {
    button.addEventListener("click", () => setAiLanguage(button.dataset.aiLang));
  });

  document.querySelector("[data-ai-voice-toggle]")?.addEventListener("click", () => {
    aiVoiceEnabled = !aiVoiceEnabled;
    updateAiVoiceControls();
    if (!aiVoiceEnabled) window.speechSynthesis?.cancel();
  });

  document.querySelector("[data-ai-voice-input]")?.addEventListener("click", startAiVoiceInput);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = String(input?.value || "").trim();
    if (!question) return;
    if (input) input.value = "";
    handleAiQuestion(question, { voice: false });
  });

  setAiLanguage(aiLanguage);
}

function loadLocalInquiryRecords() {
  try {
    const records = JSON.parse(localStorage.getItem(INQUIRY_STORAGE_KEY) || "[]");
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

function saveLocalInquiryRecord(record) {
  const records = loadLocalInquiryRecords();
  records.unshift(record);
  localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(records.slice(0, 250)));
}

async function saveServerInquiryRecord(record) {
  if (!serverInquiryStorageAvailable()) return false;
  try {
    const response = await fetch("./api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function saveInquiryRecord(record) {
  saveLocalInquiryRecord(record);
  return saveServerInquiryRecord(record);
}

async function loadOwnerInquiryRecords(password) {
  if (password !== OWNER_PASSWORD) {
    return { ok: false, mode: "locked", records: [], error: "Wrong password" };
  }

  if (serverInquiryStorageAvailable()) {
    try {
      const response = await fetch(`./api/inquiries?password=${encodeURIComponent(password)}`);
      const data = await response.json();
      if (!response.ok || !data.ok) {
        return { ok: false, mode: "server", records: [], error: data.error || "Wrong password" };
      }
      return { ok: true, mode: "shared", records: Array.isArray(data.records) ? data.records : [] };
    } catch {
      return { ok: true, mode: "local-fallback", records: loadLocalInquiryRecords() };
    }
  }

  return { ok: true, mode: "local-only", records: loadLocalInquiryRecords() };
}

async function clearOwnerInquiryRecords(password) {
  localStorage.removeItem(INQUIRY_STORAGE_KEY);
  if (!serverInquiryStorageAvailable()) return true;

  try {
    const response = await fetch(`./api/inquiries?password=${encodeURIComponent(password)}`, {
      method: "DELETE"
    });
    return response.ok;
  } catch {
    return false;
  }
}

function customerInquiryMessage(record) {
  const lines = [
    "New customer enquiry from Shree Kali DG Card",
    "",
    `Inquiry ID: ${record.id}`,
    `Inquiry Time: ${record.submittedAtText}`,
    `Customer Name: ${record.name}`,
    `Mobile Number: ${record.mobile}`,
    record.city ? `City / Location: ${record.city}` : "",
    `Product Requirement: ${record.product}`,
    record.message ? `Requirement Details: ${record.message}` : "",
    "",
    "Please contact this customer."
  ].filter(Boolean);

  return lines.join("\n");
}

function customerInquiryLinks(record) {
  const encodedMessage = encodeURIComponent(customerInquiryMessage(record));
  return {
    app: `whatsapp://send?phone=${CONTACT.inquiryWhatsapp}&text=${encodedMessage}`,
    web: `https://wa.me/${CONTACT.inquiryWhatsapp}?text=${encodedMessage}`
  };
}

function bindCustomerInquiryForm() {
  const form = document.getElementById("customerInquiryForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fallback = document.getElementById("inquiryWhatsAppFallback");
    const record = collectInquiryRecord(form);
    await saveInquiryRecord(record);
    const links = customerInquiryLinks(record);
    if (fallback) {
      fallback.href = links.web;
      fallback.hidden = true;
    }

    window.location.href = links.app;

    window.setTimeout(() => {
      if (document.visibilityState === "visible" && fallback) {
        fallback.hidden = false;
      }
    }, 1600);
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function ownerStorageText(mode) {
  if (mode === "shared") return "Shared server data: inquiries from every phone using this card link are shown here.";
  if (mode === "local-fallback") return "Server data is not reachable right now, showing this device's saved backup.";
  return "Local file mode: shared data works only when the card is opened from the server link.";
}

function renderOwnerInquiries(records = ownerInquiryRecordsCache, mode = "local-only") {
  const count = document.getElementById("ownerInquiryCount");
  const list = document.getElementById("ownerInquiryList");
  const storageMode = document.getElementById("ownerStorageMode");
  if (!count || !list) return;

  ownerInquiryRecordsCache = records;
  count.textContent = `${records.length} ${records.length === 1 ? "inquiry" : "inquiries"}`;
  if (storageMode) storageMode.textContent = ownerStorageText(mode);

  if (!records.length) {
    list.innerHTML = `<div class="empty-inquiries">No inquiry records stored yet.</div>`;
    return;
  }

  list.innerHTML = records
    .map(
      (record) => `
        <article class="owner-inquiry-card">
          <div>
            <span>${escapeHtml(record.id)}</span>
            <strong>${escapeHtml(record.name)}</strong>
          </div>
          <p>${escapeHtml(record.product)}</p>
          <dl>
            <div><dt>Mobile</dt><dd>${escapeHtml(record.mobile)}</dd></div>
            <div><dt>City</dt><dd>${escapeHtml(record.city || "Not added")}</dd></div>
            <div><dt>Time</dt><dd>${escapeHtml(record.submittedAtText)}</dd></div>
            <div><dt>Timezone</dt><dd>${escapeHtml(record.timezone)}</dd></div>
          </dl>
          <section class="owner-message">
            <span>Requirement Details</span>
            <p>${escapeHtml(record.requirementDetails || record.message || "Not added")}</p>
          </section>
          <small>${escapeHtml(record.source)}</small>
          <small>${escapeHtml(record.device)}</small>
        </article>
      `
    )
    .join("");
}

function exportInquiryRecords() {
  const records = ownerInquiryRecordsCache.length ? ownerInquiryRecordsCache : loadLocalInquiryRecords();
  const headers = ["Inquiry ID", "Date Time", "Name", "Mobile", "City", "Product", "Requirement", "Timezone", "Source", "Device"];
  const rows = records.map((record) => [
    record.id,
    record.submittedAtText,
    record.name,
    record.mobile,
    record.city,
    record.product,
    record.requirementDetails || record.message,
    record.timezone,
    record.source,
    record.device
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "shree-kali-inquiries.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function bindOwnerInquiryPanel() {
  const dialog = document.getElementById("ownerInquiryModal");
  const login = document.getElementById("ownerInquiryLogin");
  const panel = document.getElementById("ownerInquiryPanel");
  const error = document.getElementById("ownerLoginError");

  document.querySelector("[data-open-owner-inquiries]")?.addEventListener("click", () => {
    if (login) login.hidden = false;
    if (panel) panel.hidden = true;
    if (error) error.hidden = true;
    login?.reset();
    openDialog(dialog);
    refreshIcons();
  });

  login?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = String(new FormData(login).get("password") || "");
    const result = await loadOwnerInquiryRecords(password);
    if (!result.ok) {
      if (error) error.hidden = false;
      return;
    }

    ownerInquiryPassword = password;
    if (login) login.hidden = true;
    if (panel) panel.hidden = false;
    if (error) error.hidden = true;
    renderOwnerInquiries(result.records, result.mode);
  });

  document.querySelector("[data-export-inquiries]")?.addEventListener("click", exportInquiryRecords);
  document.querySelector("[data-clear-inquiries]")?.addEventListener("click", async () => {
    if (!confirm("Clear all stored inquiry records?")) return;
    const cleared = await clearOwnerInquiryRecords(ownerInquiryPassword);
    ownerInquiryRecordsCache = [];
    renderOwnerInquiries([], cleared && serverInquiryStorageAvailable() ? "shared" : "local-only");
  });
}

function googleLogoSvg() {
  return `
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#4285f4" d="M45.12 24.5c0-1.54-.14-3.02-.4-4.45H24v8.41h11.84c-.51 2.76-2.06 5.1-4.39 6.66v5.45h7.11c4.16-3.83 6.56-9.48 6.56-16.07z"></path>
      <path fill="#34a853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.45c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.33v5.63C7.94 41.06 15.36 46 24 46z"></path>
      <path fill="#fbbc05" d="M11.69 28.25c-.44-1.32-.69-2.73-.69-4.25s.25-2.93.69-4.25v-5.63H4.33A21.94 21.94 0 0 0 2 24c0 3.55.85 6.91 2.33 9.88l7.36-5.63z"></path>
      <path fill="#ea4335" d="M24 10.68c3.23 0 6.14 1.11 8.42 3.29l6.31-6.31C34.91 4.1 29.94 2 24 2 15.36 2 7.94 6.94 4.33 14.12l7.36 5.63c1.73-5.2 6.58-9.07 12.31-9.07z"></path>
    </svg>
  `;
}

function renderReviews() {
  const track = document.getElementById("reviewTrack");
  if (!track) return;

  const googleStars = Array.from({ length: 5 }, () => "<span>&#9733;</span>").join("");
  const googleLogo = googleLogoSvg();

  track.innerHTML = reviews
    .map(
      (review, index) => {
        const initials = review.name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join("");

        return `
        <article class="review-card google-review-card">
          <div class="google-review-head">
            <div class="review-avatar" style="--avatar-hue: ${28 + index * 31}deg">${initials}</div>
            <div class="reviewer-info">
              <strong>${review.name}</strong>
              <span>${review.meta}</span>
            </div>
            <div class="google-mark" aria-label="Google">${googleLogo}</div>
          </div>
          <div class="google-rating-row">
            <div class="google-stars" aria-label="5 star rating">${googleStars}</div>
            <span>5.0</span>
            <small>Google Review</small>
          </div>
          <p>${review.text}</p>
          <a href="${CONTACT.review}" target="_blank" rel="noopener">View on Google</a>
        </article>
      `;
      }
    )
    .join("");
}

function bindCopyActions() {
  document.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-copy]");
    if (!copyButton) return;

    await copyText(copyButton.dataset.copy || "");
    copyButton.classList.add("copied");
    setTimeout(() => copyButton.classList.remove("copied"), 900);
  });

  document.querySelector("[data-copy-current-url]")?.addEventListener("click", () => {
    copyText(window.location.href);
  });
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

function bindModals() {
  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-modal]");
    if (openButton) {
      prefillInquiryProduct(openButton.dataset.inquiryProduct);
      openDialog(document.getElementById(openButton.dataset.openModal));
      refreshIcons();
    }

    const closeButton = event.target.closest("[data-close-modal]");
    if (closeButton) {
      closeDialog(closeButton.closest("dialog"));
    }
  });

  document.querySelectorAll("dialog.modal-card").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });
}

function bindQrVideoButton(buttonSelector, imageId) {
  const button = document.querySelector(buttonSelector);
  const qrImage = document.getElementById(imageId);
  if (!button || !qrImage) return;

  const originalLabel = button.textContent;

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Opening...";

    const directUrl = String(button.dataset.videoUrl || "").trim();
    if (directUrl) {
      window.open(directUrl, "_blank", "noopener");
      button.textContent = originalLabel;
      button.disabled = false;
      return;
    }

    try {
      if ("BarcodeDetector" in window) {
        const detector = new BarcodeDetector({ formats: ["qr_code"] });
        const matches = await detector.detect(qrImage);
        const videoUrl = matches.find((match) => match.rawValue)?.rawValue;
        if (videoUrl) {
          window.open(videoUrl, "_blank", "noopener");
          button.textContent = originalLabel;
          button.disabled = false;
          return;
        }
      }
    } catch {
      // Some browsers do not support QR decoding from an image.
    }

    qrImage.scrollIntoView({ behavior: "smooth", block: "center" });
    button.textContent = "Scan QR With Camera";
    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.disabled = false;
    }, 2200);
  });
}

function bindRodChangeScanner() {
  bindQrVideoButton("[data-open-rod-video]", "rodChangeQr");
  bindQrVideoButton("[data-open-sensor-video]", "sensorChangeQr");
  bindQrVideoButton("[data-open-gold-process-video]", "goldProcessQr");
}

function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
    return;
  }
  dialog.setAttribute("open", "");
}

function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    dialog.close();
    return;
  }
  dialog.removeAttribute("open");
}

function bindSaveContact() {
  document.querySelectorAll("[data-save-contact]").forEach((button) => {
    button.addEventListener("click", () => {
      const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${CONTACT.owner}`,
        `ORG:${CONTACT.company}`,
        `TITLE:${CONTACT.title}`,
        `TEL;TYPE=CELL:${CONTACT.call}`,
        `TEL;TYPE=VOICE:${CONTACT.secondaryCall}`,
        `TEL;TYPE=WORK:${CONTACT.whatsapp}`,
        `EMAIL:${CONTACT.email}`,
        `URL:${CONTACT.website}`,
        `ADR;TYPE=WORK:;;${CONTACT.address}`,
        "NOTE:Gold Melting Furnace Manufacturer since 2014",
        "END:VCARD"
      ].join("\n");

      const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ashish-gaikwad-shree-kali-manufacturers.vcf";
      link.click();
      URL.revokeObjectURL(url);
    });
  });
}

function bindShare() {
  document.querySelector("[data-share-card]")?.addEventListener("click", async () => {
    const shareData = {
      title: "Shree Kali Manufacturers DG Card",
      text: "Premium gold melting furnace manufacturer in Navsari.",
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await copyText(window.location.href);
  });
}

function setThemeMode(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // Local storage can be blocked in some embedded browsers.
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const isDark = nextTheme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    const label = button.querySelector("span");
    const detail = button.querySelector("small");
    if (label) label.textContent = isDark ? "Dark Mode" : "Light Mode";
    if (detail) detail.textContent = isDark ? "Professional" : "White Gold";
  });
}

function bindThemeMode() {
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  } catch {
    savedTheme = "dark";
  }

  setThemeMode(savedTheme);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setThemeMode(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
  });
}

function bindSpinViewer() {
  const stage = document.querySelector("[data-spin-stage]");
  const image = document.getElementById("spinImage");
  const model = document.getElementById("spinModel");
  if (!stage) return;

  let index = 0;
  let dragging = false;
  let lastX = 0;
  let accumulated = 0;
  let modelReady = false;

  const updateViewer = () => {
    if (image) {
      image.src = productImages[index];
      image.alt = `Shree Kali furnace 360 angle ${index + 1}`;
    }
    if (model) {
      const angle = Math.round((index / productImages.length) * 360);
      model.cameraOrbit = `${angle}deg 64deg 118%`;
    }
  };

  const rotate = (step) => {
    index = (index + step + productImages.length) % productImages.length;
    updateViewer();
  };

  if (image) {
    productImages.slice(0, 8).forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
    updateViewer();
    stage.classList.add("fallback-ready");
  }

  if (model) {
    model.addEventListener("load", () => {
      modelReady = true;
      stage.classList.add("model-ready");
      stage.classList.remove("model-failed");
    });

    model.addEventListener("error", () => {
      modelReady = false;
      stage.classList.add("model-failed");
      stage.classList.remove("model-ready");
    });

    window.setTimeout(() => {
      if (!modelReady) stage.classList.add("model-failed");
    }, 4500);
  }

  document.querySelector("[data-spin-prev]")?.addEventListener("click", () => rotate(-1));
  document.querySelector("[data-spin-next]")?.addEventListener("click", () => rotate(1));

  stage.addEventListener("pointerdown", (event) => {
    if (modelReady) return;
    if (!image) return;
    dragging = true;
    lastX = event.clientX;
    accumulated = 0;
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    accumulated += event.clientX - lastX;
    lastX = event.clientX;

    if (Math.abs(accumulated) > 18) {
      rotate(accumulated > 0 ? -1 : 1);
      accumulated = 0;
    }
  });

  stage.addEventListener("pointerup", () => {
    dragging = false;
  });

  stage.addEventListener("pointercancel", () => {
    dragging = false;
  });
}

function bindMobileAppMode() {
  const isStandalone =
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  const isMobile =
    window.matchMedia("(max-width: 1024px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  if (!isMobile || isStandalone || !document.documentElement.requestFullscreen) return;

  let triedFullscreen = false;

  const enterFullscreen = () => {
    if (triedFullscreen || document.fullscreenElement) return;
    triedFullscreen = true;
    document.documentElement.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  };

  document.addEventListener("pointerdown", enterFullscreen, {
    once: true,
    passive: true,
    capture: true
  });
}

function init() {
  setWhatsAppLinks();
  renderProducts();
  renderGallery();
  renderCataloguePages();
  renderPayment();
  populateInquiryProducts();
  renderReviews();
  registerVisitorCount();
  bindPageSwitching();
  bindGalleryTabs();
  bindLightbox();
  bindCopyActions();
  bindModals();
  bindRodChangeScanner();
  bindCustomerInquiryForm();
  bindOwnerInquiryPanel();
  bindAiAssistant();
  bindSaveContact();
  bindShare();
  bindThemeMode();
  bindSpinViewer();
  bindMobileAppMode();
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
