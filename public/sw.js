// Service Worker PWA basique
// Intercepte les requêtes réseau et sert une page hors-ligne ou permet de recevoir des Push

self.addEventListener("install", (event) => {
    console.log("Service Worker: Instalation...");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activation...");
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass through fetch
});
