const CACHE_NAME = 'bangolf-pwa-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Enkel "Network First" - Försöker alltid hämta från nätet så bilderna inte förstörs
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});