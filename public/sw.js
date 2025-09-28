// Simple Service Worker untuk caching static assets
const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/images/profile.jpg',
  '/images/fahrezi_white_logo.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip caching for API calls and external resources
  if (
    event.request.url.includes('/api/') ||
    event.request.url.includes('github.com') ||
    event.request.url.includes('supabase.co')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache static assets only
            if (
              event.request.url.includes('.js') ||
              event.request.url.includes('.css') ||
              event.request.url.includes('.png') ||
              event.request.url.includes('.jpg') ||
              event.request.url.includes('.jpeg') ||
              event.request.url.includes('.webp') ||
              event.request.url.includes('.svg')
            ) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // Fallback for offline
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});
