const CACHE_NAME = 'bangolf-pwa-v2';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Rensar gammal cache när en ny version aktiveras
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Nätverk först, fallback till cache. Spara automatiskt allt nytt i cachen så appen blir nedladdningsbar.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (event.request.url.startsWith('http')) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
