const CACHE_NAME = "shree-kali-dg-card-v60";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        "./",
        "./index.html",
        "./styles.css",
        "./script.js",
        "./manifest.webmanifest",
        "./assets/images/brand/logo.webp",
        "./assets/images/brand/ai-chatbot-avatar.png",
        "./assets/images/brand/premium-white-green-hero.webp",
        "./assets/images/brand/ashish-gaikwad.webp",
        "./assets/images/payments/bank-of-maharashtra-new-payment.jpeg",
        "./assets/images/qr/digital-business-application.jpeg",
        "./assets/images/qr/gold-melting-process.png",
        "./assets/images/qr/rod-change-scanner-v2.jpeg",
        "./assets/images/qr/sensor-change-video.png",
        "./assets/images/videos/machine-demo-thumbnail.jpg",
        "./assets/images/videos/rod-change-thumbnail.jpg",
        "./assets/images/videos/sensor-change-thumbnail.jpg",
        "./assets/images/videos/gold-melting-process-thumbnail.jpg",
        "./assets/docs/shree-kali-manufacturers-catalogue.pdf",
        "./assets/images/catalogue/products/nexon-1kg-economic-display.webp",
        "./assets/images/catalogue/products/nexon-1kg-commercial-display.webp",
        "./assets/images/catalogue/products/nexon-1kg-thyristor-catalogue.webp",
        "./assets/images/catalogue/products/nexon-3kg-thyristor-display.webp",
        "./assets/images/catalogue/products/nexon-5kg-economic-display.png",
        "./assets/images/catalogue/products/nexon-5kg-commercial-high-load-display.png",
        "./assets/images/catalogue/products/nexon-10kg-economic-display.png",
        "./assets/images/catalogue/products/nexon-10kg-thyristor-display.png",
        "./assets/images/catalogue/products/nexon-10kg-commercial-high-load-display.png",
        "./assets/images/catalogue/products/nexon-20kg-commercial-high-load-catalogue.webp",
        "./assets/images/certificates/certificate-01.jpeg",
        "./assets/images/certificates/certificate-02.jpeg",
        "./assets/images/certificates/certificate-03.jpeg",
        "./assets/images/certificates/certificate-04.jpeg",
        "./assets/images/certificates/certificate-05.jpeg",
        "./assets/images/certificates/certificate-06.jpeg"
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.endsWith(".glb") || requestUrl.pathname.endsWith(".mp4")) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
