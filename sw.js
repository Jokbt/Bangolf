const CACHE_NAME = 'bangolf-app-v10';

self.addEventListener('install', event => {
  // Hoppar över väntetiden och tvingar fram uppdateringen direkt
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Detta rensar omedelbart bort alla gamla trasiga filer från telefonen
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // "Network First"
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // VIKTIGT: Spara bara i cachen om bilden faktiskt hittades (status 200 OK).
        // Om den sparar ett 404-fel förblir skärmen grå för alltid!
        if (response && response.ok && event.request.url.startsWith('http')) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});