const CACHE_NAME = "submission-1.2";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/pages/about.html",
  "/pages/course.html",
  "/pages/home.html",
  "/pages/join.html",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/img/css.png",
  "/img/fotobanner_burned.png",
  "/img/html.png",
  "/img/js.png",
  "/img/python.jpeg",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/css/nav.css",
  "/css/style.css"
]


self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});



self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.open(CACHE_NAME)
    .then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      const networkResponse = await fetch(event.request);
      event.waitUntil(
        cache.put(event.request, networkResponse.clone())
      );
      return networkResponse;
    })
  );
});

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches
//     .match(event.request, {
//       cacheName: CACHE_NAME
//     })
//     .then(function (response) {
//       if (response) {
//         console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//         return response;
//       }

//       console.log(
//         "ServiceWorker: Memuat aset dari server: ",
//         event.request.url
//       );
//       return fetch(event.request);
//     })
//   );
// });