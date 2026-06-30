const CACHE = 'almacen-v29';
const ARCHIVOS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/iconos/icono-192.png',
  '/iconos/icono-512.png',
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

// Network-first: siempre intenta la versión más reciente de la red y actualiza
// la caché; si no hay conexión, responde con lo último guardado en caché.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(respuesta => {
        const copia = respuesta.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
        return respuesta;
      })
      .catch(() => caches.match(e.request))
  );
});
