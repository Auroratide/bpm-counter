// Minimal service worker for PWA installability
// This service worker enables the app to be installable but doesn't implement caching

const CACHE_NAME = 'bpm-counter-v1';

// Install event - required for PWA
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - required for PWA  
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim());
});

// Fetch event - minimal implementation for PWA compliance
// Just passes through all requests without caching
self.addEventListener('fetch', (event) => {
  // Let the browser do its default thing for all requests
  return;
});