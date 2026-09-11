/* DONIA SMART CORE — Service Worker v2.1.1 */
const CACHE = 'dsc-v2.1.1';
const ASSETS = [
  './',
  './index.html',
  './donia-smart-core.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(ASSETS);
    }).catch(function(){}).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        var r = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, r); });
        return resp;
      }).catch(function(){ return cached; });
    })
  );
});
