import type { GeoFeature, Visitor, PinPosition } from './globe_utils';
import { renderGlobeFrame, MASK_RESOLUTION, type PrecomputedFeature } from './globe_renderer';
import { CITY_LIGHTS } from './globe_data';

// Canvas and 2D contexts owned entirely by this worker
let mainCanvas: OffscreenCanvas | null = null;
let mainCtx: OffscreenCanvasRenderingContext2D | null = null;
let dayCtx: OffscreenCanvasRenderingContext2D | null = null;
let nightCtx: OffscreenCanvasRenderingContext2D | null = null;
let nightMaskedCtx: OffscreenCanvasRenderingContext2D | null = null;
let maskCtx: OffscreenCanvasRenderingContext2D | null = null;

let geoFeatures: GeoFeature[] = [];
let precomputedFeatures: PrecomputedFeature[] = [];
let visitors: Visitor[] = [];

function initLayerCanvases(w: number, h: number): void {
    // Intermediate canvases are intentionally 1× (CSS-pixel size, no DPR scaling).
    // The final drawImage onto mainCtx (which carries scale(dpr,dpr)) upscales for free,
    // making polygon drawing and compositing 4× cheaper on dpr=2 displays.
    const day = new OffscreenCanvas(w, h);
    dayCtx = day.getContext('2d')!;

    const night = new OffscreenCanvas(w, h);
    nightCtx = night.getContext('2d')!;

    const masked = new OffscreenCanvas(w, h);
    nightMaskedCtx = masked.getContext('2d')!;

    const mask = new OffscreenCanvas(MASK_RESOLUTION, MASK_RESOLUTION);
    maskCtx = mask.getContext('2d')!;
}

// ─── Fast terminator mask ────────────────────────────────────────────────────
// Per-pixel sphere-local positions (xS, yS, zS) only depend on pixel position
// and globe radius — they are constant across frames. Pre-compute them once so
// the per-frame loop only does rotations + a dot product: no sqrt/asin/atan2.
//
// Derivation that eliminates per-pixel trig:
//   sinLat = yW            (identity: yW is the y component of a unit vector)
//   cosAngle = sinLat·sinSunLat + cosSunLat·(-xF·cosSunLng + zF·sinSunLng)
// The last term uses cos(lng−sunLng) expanded via the unit-circle components
// of xF, zF (valid because xF²+yW²+zF²=1 ⟹ cosLat=sqrt(xF²+zF²) cancels).
const DEG = Math.PI / 180;
const TWILIGHT = Math.sin(9.0 * DEG); // = TWILIGHT_COS_OFFSET from globe_utils
const TWO_TWILIGHT = 2 * TWILIGHT;

let sphereVecs: Float32Array | null = null; // [xS, yS, zS] per pixel, 3×MASK_RES² floats
let maskDataCache: ImageData | null = null;  // reused every frame — avoids 775 KB alloc/GC

function initMaskPrecompute(): void {
    const sz = MASK_RESOLUTION;
    const cx = sz / 2, cy = sz / 2, r = sz / 2;
    const r2 = r * r;
    sphereVecs = new Float32Array(sz * sz * 3);
    maskDataCache = new ImageData(sz, sz); // r/g/b stay 0 permanently; only alpha is updated

    for (let py = 0; py < sz; py++) {
        for (let px = 0; px < sz; px++) {
            const dx = px - cx, dy = py - cy;
            const distSq = dx * dx + dy * dy;
            const i = (py * sz + px) * 3;
            if (distSq > r2) {
                // Outside the disc — project to the nearest limb point (z = 0) so the
                // terminator value here matches the disc edge; avoids a hard seam.
                const d = Math.sqrt(distSq);
                sphereVecs[i] = dx / d;
                sphereVecs[i + 1] = -dy / d;
                sphereVecs[i + 2] = 0;
            } else {
                const xS = dx / r;
                const yS = -dy / r;
                const zSq = 1 - xS * xS - yS * yS;
                sphereVecs[i] = xS;
                sphereVecs[i + 1] = yS;
                sphereVecs[i + 2] = zSq > 0 ? Math.sqrt(zSq) : 0;
            }
        }
    }
}

function buildMaskFast(rotY: number, rotX: number, sunLat: number, sunLng: number): ImageData {
    // 4 trig calls once per frame (rotations are in the inner loop as plain mults)
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    // Sun-direction constants — expands cos(lng − sunLng) without atan2 or asin
    const sinSunLat = Math.sin(sunLat * DEG);
    const cosSunLat = Math.cos(sunLat * DEG);
    const sunLngR = (sunLng + 180) * DEG;
    const cosSunLng = Math.cos(sunLngR);
    const sinSunLng = Math.sin(sunLngR);

    const sp = sphereVecs!;
    const data = maskDataCache!.data;
    const n = MASK_RESOLUTION * MASK_RESOLUTION;

    for (let p = 0; p < n; p++) {
        const si = p * 3;
        const xS = sp[si], yS = sp[si + 1], zS = sp[si + 2];

        // Inverse X rotation
        const yW = yS * cosRX + zS * sinRX;
        const zW = -yS * sinRX + zS * cosRX;
        // Inverse Y rotation
        const xF = xS * cosRY - zW * sinRY;
        const zF = xS * sinRY + zW * cosRY;

        // cosAngle with no per-pixel asin / atan2 / sqrt
        const cosAngle = yW * sinSunLat + cosSunLat * (zF * sinSunLng - xF * cosSunLng);
        let alpha = (TWILIGHT - cosAngle) / TWO_TWILIGHT;
        if (alpha < 0) alpha = 0;
        else if (alpha > 1) alpha = 1;

        data[p * 4 + 3] = alpha * 255;
    }

    return maskDataCache!;
}
// ─────────────────────────────────────────────────────────────────────────────

type WorkerMsg =
    | { type: 'init'; canvas: OffscreenCanvas; dpr: number; width: number; height: number }
    | { type: 'geofeatures'; features: GeoFeature[] }
    | { type: 'visitors'; visitors: Visitor[] }
    | { type: 'resize'; width: number; height: number; dpr: number }
    | {
          type: 'frame';
          rotY: number; rotX: number; effectiveRadius: number;
          cx: number; cy: number; width: number; height: number;
          sunLat: number; sunLng: number; frame: number;
          selectedFeatureIdx: number;
      };

addEventListener('message', (e: MessageEvent<WorkerMsg>) => {
    const msg = e.data;

    if (msg.type === 'init') {
        mainCanvas = msg.canvas;
        mainCanvas.width = msg.width * msg.dpr;
        mainCanvas.height = msg.height * msg.dpr;
        mainCtx = mainCanvas.getContext('2d')!;
        mainCtx.scale(msg.dpr, msg.dpr);
        initLayerCanvases(msg.width, msg.height);
        initMaskPrecompute();
        return;
    }

    if (msg.type === 'geofeatures') {
        geoFeatures = msg.features;
        // Pre-compute latLngToVec3 for every polygon point so the per-frame draw
        // loop only needs rotation math (8 mults+6 adds) — no trig per point.
        const D = Math.PI / 180;
        precomputedFeatures = msg.features.map(f => ({
            rings: f.rings
                .filter(ring => ring.length >= 3)
                .map(ring => {
                    const vecs = new Float32Array(ring.length * 3);
                    for (let i = 0; i < ring.length; i++) {
                        const [lng, lat] = ring[i];
                        const phi = (90 - lat) * D;
                        const theta = (lng + 180) * D;
                        const sp = Math.sin(phi), cp = Math.cos(phi);
                        const st = Math.sin(theta), ct = Math.cos(theta);
                        vecs[i * 3]     = -sp * ct;
                        vecs[i * 3 + 1] =  cp;
                        vecs[i * 3 + 2] =  sp * st;
                    }
                    return { vecs };
                }),
        }));
        return;
    }

    if (msg.type === 'visitors') {
        visitors = msg.visitors;
        return;
    }

    if (msg.type === 'resize') {
        if (!mainCanvas || !mainCtx) return;
        mainCanvas.width = msg.width * msg.dpr;
        mainCanvas.height = msg.height * msg.dpr;
        mainCtx.scale(msg.dpr, msg.dpr);
        initLayerCanvases(msg.width, msg.height);
        return;
    }

    if (msg.type === 'frame') {
        if (!mainCtx || !dayCtx || !nightCtx || !nightMaskedCtx || !maskCtx) return;

        const { rotY, rotX, effectiveRadius, cx, cy, width, height, sunLat, sunLng, frame, selectedFeatureIdx } = msg;

        const maskImageData = buildMaskFast(rotY, rotX, sunLat, sunLng);

        const collectedPins: PinPosition[] = [];

        renderGlobeFrame({
            state: { rotY, rotX, effectiveRadius, canvasCX: cx, canvasCY: cy, canvasWidth: width, canvasHeight: height, sunLat, sunLng, frame },
            mainCtx: mainCtx as unknown as CanvasRenderingContext2D,
            dayCtx,
            nightCtx,
            nightMaskedCtx,
            maskCtx,
            geoFeatures,
            precomputedFeatures,
            selectedFeatureIdx,
            cityLights: CITY_LIGHTS,
            visitors,
            onPinRendered: (pin) => collectedPins.push(pin),
            maskImageData,
        });

        postMessage({ type: 'pins', pins: collectedPins });
    }
});
