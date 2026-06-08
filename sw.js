const CACHE_NAME = 'bangolf-app-v4';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './image_96b70a.png',
  './image_9718e7.png',
  './image_971888.png',
  './image_97155f.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});