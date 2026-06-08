const CACHE_NAME = 'bangolf-app-v3';

// UPDATERAT TILL BARA PNG-FILER
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './image_96b70a.png',
  './image_9718e7.png',
  './image_971888.png',
  './image_97155f.png'
];

// Installerar service workern
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cachar app-filer');
        return cache.addAll(urlsToCache);
      })
  );
});

// Hämtar från cachen i första hand (gör appen blixtsnabb)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Returnera filen om den finns cachad, annars hämta via nätet
        return response || fetch(event.request);
      })
  );
});