if ("serviceWorker" in navigator && location.hostname !== "localhost") {
    navigator.serviceWorker.register("./sw.js").then(() => {
        if (!window.crossOriginIsolated && !sessionStorage.getItem("coi-reload")) {
            sessionStorage.setItem("coi-reload", "1");
            location.reload();
        }
    });
}