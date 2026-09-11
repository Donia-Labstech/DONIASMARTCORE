/* DONIA SMART CORE v3.0 — Service Worker */
const V = 'dsc-v3.0';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c =>
    c.addAll(['./donia-smart-core.html','./index.html','./manifest.json'])
    .catch(()=>{})
  ));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks =>
      Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))
    ).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network first, fallback to cache
  e.respondWith(
    fetch(e.request).then(r=>{
      const clone=r.clone();
      caches.open(V).then(c=>c.put(e.request,clone));
      return r;
    }).catch(()=>caches.match(e.request))
  );
});