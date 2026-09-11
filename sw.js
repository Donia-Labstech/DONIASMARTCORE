/* DONIA SMART CORE v3.0 - SW disabled for reliability */
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(k) {
      return Promise.all(k.map(function(n) { return caches.delete(n); }));
    }).then(function() { return self.clients.claim(); })
  );
});
// No fetch handler = network-first, always fresh
