if ("serviceWorker" in navigator && location.hostname !== "localhost") {
    navigator.serviceWorker.register("./sw.js").then(async () => {
        // Wait for the worker to actually finish installing + activating
        // (not just for register() to resolve) before deciding whether a
        // reload is needed. Reacting to register() alone races the install.
        await navigator.serviceWorker.ready;

        if (navigator.serviceWorker.controller) {
            // Already controlled (e.g. worker was active from an earlier
            // navigation in this session) - nothing to do on this page.
            return;
        }

        // This navigation started before the worker could control it, so
        // this document's response headers can't carry COOP/COEP and its
        // subresource fetches won't be proxied. Reload once, now that the
        // worker is confirmed active, so the next navigation is controlled
        // from the start. Guarded so an unreachable isolation state can't
        // loop, and no longer keyed off crossOriginIsolated, which is
        // false-by-design on every page outside the isolated set.
        if (!sessionStorage.getItem("coi-reload")) {
            sessionStorage.setItem("coi-reload", "1");
            location.reload();
        }
    });
}