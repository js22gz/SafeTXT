// Cache versioning for automatic cleanup
const CACHE_VERSION = 1.0;
const CACHE_NAME = `SafeTXT-v${CACHE_VERSION}`;
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Resolve asset paths for reliable matching
const resolvedAssets = new Set(ASSETS.map(a => new URL(a, self.location).pathname));

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
        throw err;
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

// Add Cache-Control: no-store to prevent intermediate HTTP caches from storing
// sensitive app content outside the service worker's managed cache.
function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Fetch event: Scoped strategy — only handle known assets
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Only intercept requests for pre-cached app-shell assets
  if (!resolvedAssets.has(url.pathname)) return;

  // Navigation requests (index.html): network-first ensures security patches
  // are delivered promptly while still working offline via cache fallback.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return withSecurityHeaders(response);
        })
        .catch(() =>
          caches.match(e.request).then(cached =>
            cached
              ? withSecurityHeaders(cached)
              : new Response('Offline - Resource not cached', {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({ 'Content-Type': 'text/plain' })
                })
          )
        )
    );
    return;
  }

  // Static sub-resources (icons, manifest): cache-first with network fallback
  e.respondWith(
    caches.match(e.request)
      .then(cached => {
        if (cached) return withSecurityHeaders(cached);
        return fetch(e.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return withSecurityHeaders(response);
        });
      })
      .catch(() =>
        new Response('Offline - Resource not cached', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        })
      )
  );
});

// Message handler: allows the app to clear cached content on session lock
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'CLEAR_CACHE') {
    e.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[Service Worker] Cache cleared on session lock');
      })
    );
  }
});
