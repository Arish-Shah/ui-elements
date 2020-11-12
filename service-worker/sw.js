const VERSION = '1';
const ASSETS = ['/', '/index.html', '/style.css', '/img/sage.jpg'];

self.addEventListener('install', event => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(VERSION);
      await cache.addAll(ASSETS);
    })()
  );
});

self.addEventListener('active', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(keys => keys !== VERSION).map(key => caches.delete())
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
