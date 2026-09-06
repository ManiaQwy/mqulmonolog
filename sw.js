const CACHE_NAME = "mq-app-pwa";

const FILES = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener("fetch", event => {

    if (event.request.url.startsWith("https://status.mqulmonolog.uk/")) {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then(response => {
                return response || new Response("Offline", {
                    status: 503,
                    statusText: "Offline"
                });
            })
        )
    );
});