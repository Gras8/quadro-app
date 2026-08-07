/* Service worker del Quadro: app shell in cache per l'uso offline.
   Quando aggiorni i file dell'app, incrementa la versione qui sotto. */
const CACHE = 'quadro-v3';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './data.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      const url = e.request.url;
      if(res.ok && (url.startsWith(self.location.origin) || url.includes('cdnjs.cloudflare.com') || url.includes('fonts.g'))){
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});