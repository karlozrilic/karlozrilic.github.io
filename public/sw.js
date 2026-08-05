const R2_BASE = "https://assets.zrilich.com/busytex";
const PREFIX = "/core/busytex/";
const CACHE = "busytex-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    if (
        url.pathname.startsWith(PREFIX) &&
        (url.pathname.endsWith(".wasm") || url.pathname.endsWith(".data"))
    ) {
        event.respondWith(proxyAsset(event.request, url));
        return;
    }

    const destination = event.request.destination;
    if (
        event.request.mode === "navigate" ||
        destination === "worker" ||
        destination === "sharedworker" ||
        destination === "script"
    ) {
        event.respondWith(withCoiHeaders(event.request));
    }
});

async function proxyAsset(request, url) {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(request);
    if (hit) return hit;

    const rest = url.pathname.slice(PREFIX.length);
    const upstream = await fetch(`${R2_BASE}/${rest}`);
    if (!upstream.ok) return upstream;

    const headers = new Headers(upstream.headers);
    headers.set("Cross-Origin-Resource-Policy", "same-origin");
    if (rest.endsWith(".js")) headers.set("Content-Type", "text/javascript");
    if (rest.endsWith(".wasm")) headers.set("Content-Type", "application/wasm");

    const response = new Response(upstream.body, { status: 200, headers });
    if (upstream.status === 200) cache.put(request, response.clone());
    return response;
}

async function withCoiHeaders(request) {
    const res = await fetch(request);
    const headers = new Headers(res.headers);
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Resource-Policy", "same-origin");
    if (request.mode === "navigate") {
        headers.set("Cross-Origin-Opener-Policy", "same-origin");
    }
    return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers,
    });
}