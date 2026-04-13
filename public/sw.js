// Minimal offline shell. Caches static assets only; lets all dynamic
// routes (including Next.js server actions) pass straight to network.
const CACHE = "proofforge-v1";
const SHELL = [
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Cache-first only for the declared shell assets. Everything else is
  // network-only so server actions, RSC payloads, and fresh HTML stay live.
  if (!SHELL.includes(url.pathname)) return;
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
