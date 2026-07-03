import type { GeoFeature, Visitor, PinPosition } from './globe_utils';
import { getSolarPosition, getEarthRotY, SPIN_SPEED_RAD_S } from './globe_utils';
import {
    drawVisitorPins,
    buildLandPaths,
    buildPrecomputedGrid,
    buildPrecomputedLights,
    type PrecomputedFeature,
    type PrecomputedGrid,
    type PrecomputedLight,
} from './globe_renderer';
import {
    initWebGL, resizeWebGL,
    uploadLandTexture, uploadBorderData, uploadGridData, uploadLightData,
    renderWebGLFrame,
    type WebGLGlobeState,
} from './globe_webgl';
import { CITY_LIGHTS } from './globe_data';

// Starfield generated once with a deterministic LCG so it's the same every load
interface Star { nx: number; ny: number; alpha: number; radius: number }
const STARS: Star[] = (() => {
    const arr: Star[] = [];
    let seed = 0xdeadbeef;
    const rand = (): number => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 0xFFFFFFFF; };
    for (let i = 0; i < 900; i++) {
        arr.push({
            nx: rand(), ny: rand(),
            alpha: 0.35 + rand() * 0.65,
            radius: rand() < 0.12 ? 0.9 + rand() * 1.3 : 0.3 + rand() * 0.55,
        });
    }
    return arr;
})();

function drawStars(ctx: OffscreenCanvasRenderingContext2D, width: number, height: number): void {
    for (const star of STARS) {
        ctx.fillStyle = `rgba(255,255,255,${star.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.nx * width, star.ny * height, star.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

let mainCanvas: OffscreenCanvas | null = null;
let mainCtx: OffscreenCanvasRenderingContext2D | null = null;

let webglCanvas: OffscreenCanvas | null = null;
let glState: WebGLGlobeState | null = null;

let geoFeatures: GeoFeature[] = [];
let precomputedFeatures: PrecomputedFeature[] = [];
let visitors: Visitor[] = [];

let precomputedGrid: PrecomputedGrid | null = null;
let precomputedLights: PrecomputedLight[] = [];

function buildPrecomputed(features: GeoFeature[]): PrecomputedFeature[] {
    const degToRad = Math.PI / 180;
    return features.map(feature => ({
        rings: feature.rings
            .filter(ring => ring.length >= 3)
            .map(ring => {
                const vertexCount = ring.length;
                const vecs = new Float32Array(vertexCount * 3);
                for (let i = 0; i < vertexCount; i++) {
                    const [lng, lat] = ring[i];
                    const phi = (90 - lat) * degToRad, theta = (lng + 180) * degToRad;
                    const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi);
                    vecs[i * 3]     = -sinPhi * Math.cos(theta);
                    vecs[i * 3 + 1] =  cosPhi;
                    vecs[i * 3 + 2] =  sinPhi * Math.sin(theta);
                }
                let sumX = 0, sumY = 0, sumZ = 0;
                for (let i = 0; i < vertexCount; i++) { sumX += vecs[i * 3]; sumY += vecs[i * 3 + 1]; sumZ += vecs[i * 3 + 2]; }
                const len = Math.sqrt(sumX * sumX + sumY * sumY + sumZ * sumZ);
                const centroid = len > 0
                    ? new Float32Array([sumX / len, sumY / len, sumZ / len])
                    : new Float32Array([0, 1, 0]);
                let minDot = 1;
                for (let i = 0; i < vertexCount; i++) {
                    const dot = centroid[0] * vecs[i * 3] + centroid[1] * vecs[i * 3 + 1] + centroid[2] * vecs[i * 3 + 2];
                    if (dot < minDot) minDot = dot;
                }
                const coneSin = minDot >= 1 ? 0 : Math.sqrt(1 - minDot * minDot);
                return { vecs, centroid, coneSin };
            }),
    }));
}

// Animation state
const ZOOM_LERP_SPEED = 0.10;
const SPIN_RAMP_MS = 5000; // ease from 0 → full speed on load
let spinAngle = 0;
let zoom = 1.0;
let lastNowMs = 0;
let spinStartMs = 0;
let initialized = false;
let lastSolarMs = 0;

// Russia / Canada have thousands of vertices; Path2D rebuild each frame causes jank.
// Cache the last-built path and the camera state it was built from, rebuild only when
// the view shifts by more than 1 px (eps = 3/radius radians).
interface SelPathCache {
    path: Path2D;
    selIdx: number;
    rotY: number; rotX: number;
    radius: number; cx: number; cy: number;
}
let selPathCache: SelPathCache | null = null;

type WorkerMsg =
    | { type: 'init'; canvas: OffscreenCanvas; dpr: number; width: number; height: number }
    | { type: 'geofeatures'; features: GeoFeature[] }
    | { type: 'visitors'; visitors: Visitor[] }
    | { type: 'resize'; width: number; height: number; dpr: number }
    | {
          type: 'frame';
          nowMs: number;
          userOffsetY: number;
          rotX: number;
          targetZoom: number;
          rotateEnabled: boolean;
          frozenEarthBase: number;
          baseRadius: number;
          cx: number; cy: number;
          width: number; height: number;
          frame: number;
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

        webglCanvas = new OffscreenCanvas(msg.width, msg.height);
        glState = initWebGL(webglCanvas, msg.width, msg.height);

        precomputedGrid = buildPrecomputedGrid();
        precomputedLights = buildPrecomputedLights(CITY_LIGHTS);

        if (glState) {
            uploadGridData(glState, precomputedGrid);
            uploadLightData(glState, precomputedLights);
            // geo features may arrive before init — upload now if so
            if (geoFeatures.length > 0) {
                uploadLandTexture(glState, geoFeatures);
                uploadBorderData(glState, precomputedFeatures);
            }
        }
        return;
    }

    if (msg.type === 'geofeatures') {
        geoFeatures = msg.features;
        precomputedFeatures = buildPrecomputed(msg.features);
        if (glState) {
            uploadLandTexture(glState, geoFeatures);
            uploadBorderData(glState, precomputedFeatures);
        }
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
        if (webglCanvas && glState) {
            webglCanvas.width = msg.width;
            webglCanvas.height = msg.height;
            resizeWebGL(glState, msg.width, msg.height);
        }
        return;
    }

    if (msg.type === 'frame') {
        if (!mainCtx || !glState || !webglCanvas) return;

        const {
            nowMs, userOffsetY, rotX, targetZoom, rotateEnabled, frozenEarthBase,
            baseRadius, cx, cy, width, height, frame, selectedFeatureIdx,
        } = msg;

        // spin angle + zoom
        if (!initialized) {
            spinAngle = getEarthRotY(nowMs);
            zoom = targetZoom;
            lastNowMs = nowMs;
            spinStartMs = nowMs;
            initialized = true;
        } else {
            const elapsed = (nowMs - lastNowMs) / 1000;
            if (rotateEnabled) {
                // smoothstep ramp from 0→1 over SPIN_RAMP_MS so the globe eases into rotation
                const rampT = Math.min((nowMs - spinStartMs) / SPIN_RAMP_MS, 1);
                const ramp = rampT * rampT * (3 - 2 * rampT);
                spinAngle += SPIN_SPEED_RAD_S * elapsed * ramp;
            } else {
                spinAngle = frozenEarthBase;
            }
            lastNowMs = nowMs;
        }
        zoom += (targetZoom - zoom) * ZOOM_LERP_SPEED;

        const rotY = spinAngle + userOffsetY;
        const effectiveRadius = baseRadius * zoom;

        // solar position
        const { sunLat, sunLng } = getSolarPosition(nowMs);

        let solarText: string | undefined;
        if (nowMs - lastSolarMs >= 1000) {
            lastSolarMs = nowMs;
            const date = new Date(nowMs);
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            const seconds = date.getUTCSeconds().toString().padStart(2, '0');
            solarText = `☀ ${sunLat >= 0 ? '+' : ''}${sunLat.toFixed(1)}°  ${sunLng >= 0 ? 'E' : 'W'}${Math.abs(sunLng).toFixed(1)}°  UTC ${hours}:${minutes}:${seconds}`;
        }

        // WebGL render
        renderWebGLFrame(glState, {
            rotY, rotX, sunLat, sunLng,
            radius: effectiveRadius, cx, cy,
            width, height, frame,
        });

        // 2D canvas: background + stars
        mainCtx.fillStyle = '#08090d';
        mainCtx.fillRect(0, 0, width, height);
        drawStars(mainCtx, width, height);

        // Solid disc behind the WebGL blit — without it, semi-transparent globe edges
        // blend with star colours instead of the background, making stars bleed through coastlines.
        mainCtx.beginPath();
        mainCtx.arc(cx, cy, effectiveRadius, 0, Math.PI * 2);
        mainCtx.fillStyle = '#08090d';
        mainCtx.fill();

        mainCtx.drawImage(webglCanvas as unknown as CanvasImageSource, 0, 0, width, height);

        // atmosphere glow
        const radius = effectiveRadius;
        const atm = mainCtx.createRadialGradient(cx, cy, radius * 0.97, cx, cy, radius * 1.08);
        atm.addColorStop(0,    'rgba(80,160,255,0)');
        atm.addColorStop(0.30, 'rgba(80,160,255,0.18)');
        atm.addColorStop(1,    'rgba(80,160,255,0)');
        mainCtx.beginPath();
        mainCtx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
        mainCtx.fillStyle = atm;
        mainCtx.fill();

        // selected country highlight
        const selIdx = selectedFeatureIdx;
        if (selIdx >= 0 && precomputedFeatures.length > selIdx) {
            const eps = 3 / radius;
            const cache = selPathCache;
            const stale = !cache
                || cache.selIdx !== selIdx
                || Math.abs(cache.rotY - rotY) > eps
                || Math.abs(cache.rotX - rotX) > eps
                || cache.radius !== radius || cache.cx !== cx || cache.cy !== cy;

            if (stale) {
                const renderState = { rotY, rotX, effectiveRadius: radius, canvasCX: cx, canvasCY: cy, canvasWidth: width, canvasHeight: height, sunLat, sunLng, frame };
                const { selected } = buildLandPaths(precomputedFeatures, renderState, selIdx, true);
                selPathCache = { path: selected, selIdx, rotY, rotX, radius, cx, cy };
            }

            const mc = mainCtx as unknown as CanvasRenderingContext2D;
            mc.save();
            mc.beginPath();
            mc.arc(cx, cy, radius, 0, Math.PI * 2);
            mc.clip();
            mc.fillStyle = 'rgba(251,191,36,0.82)';
            mc.fill(selPathCache!.path);
            mc.restore();
        } else {
            selPathCache = null;
        }

        // visitor pins
        const collectedPins: PinPosition[] = [];
        const pinState = {
            rotY, rotX, effectiveRadius: radius,
            canvasCX: cx, canvasCY: cy,
            canvasWidth: width, canvasHeight: height,
            sunLat, sunLng, frame,
        };
        drawVisitorPins(
            mainCtx as unknown as CanvasRenderingContext2D,
            visitors, pinState,
            { frame, onPinRendered: (pin) => collectedPins.push(pin) },
        );

        postMessage({ type: 'pins', pins: collectedPins, rotY, rotX, effectiveRadius, zoom, spinAngle, solarText });
    }
});
