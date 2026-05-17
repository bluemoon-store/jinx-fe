self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Pass-through fetch handler. Required for PWA installability —
  // Chrome only treats the site as installable if the SW responds
  // to a navigation request for the start_url.
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request))
  }
})
