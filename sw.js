const CACHE = 'almacen-v21';
const ARCHIVOS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/estilos.css',
  '/js/modelos/material.js',
  '/js/modelos/categoria.js',
  '/js/modelos/item_vale.js',
  '/js/modelos/supervisor.js',
  '/js/modelos/vale.js',
  '/js/servicios/gestor_storage.js',
  '/js/servicios/gestor_pwa.js',
  '/js/servicios/diagnostico_pwa.js',
  '/js/servicios/generador_qr.js',
  '/js/servicios/catalogo_materiales.js',
  '/js/vistas/vista_base.js',
  '/js/vistas/vista_login.js',
  '/js/vistas/vista_dashboard.js',
  '/js/vistas/vista_formulario_vale.js',
  '/js/vistas/vista_vale_generado.js',
  '/js/vistas/vista_historial.js',
  '/js/controladores/controlador_login.js',
  '/js/controladores/controlador_vale.js',
  '/js/controladores/controlador_app.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ARCHIVOS.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
