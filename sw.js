const CACHE_NAME = "mq-app-pwa-v3";

const FILES = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Do not intercept requests to other domains
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .catch(() =>
                caches.match(event.request).then(response => {
                    return response || new Response("Offline", {
                        status: 503
                    });
                })
            )
    );
});