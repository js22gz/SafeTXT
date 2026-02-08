// Cache versioning for automatic cleanup
const CACHE_VERSION = 1;
const CACHE_NAME = `SafeTXT-v${CACHE_VERSION}`;
const ASSETS = [
  './index.html',
  './manifest.json',
  './sw.js'
];

// Install event: Cache assets and activate immediately
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing version', CACHE_VERSION);
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching assets');
        return cache.addAll(ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Assets cached, skipping waiting');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[Service Worker] Install failed:', err);
        throw err; // Propagate error to fail installation
      })
  );
});

// Activate event: Clean up old caches and take control
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activating version', CACHE_VERSION);
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event: Cache-first strategy with error handling
self.addEventListener('fetch', (e) => {
  // Only cache GET requests
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) {
          return response;
        }
        // No cache, try network
        return fetch(e.request).catch(err => {
          console.warn('[Service Worker] Network failed for:', e.request.url);
          // Return a basic error response
          return new Response('Offline - Resource not cached', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        });
      })
  );
});
