// Service Worker (PWA Enabler) para Krypton Tienda
const CACHE_NAME = 'krypton-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Fuerza la activación inmediata del SW
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Passthrough puro: No hacemos caché offline pesado para no interferir con Firebase Firestore y Auth.
  // El objetivo principal de este SW es habilitar el botón "Instalar Aplicación".
  event.respondWith(fetch(event.request));
});
