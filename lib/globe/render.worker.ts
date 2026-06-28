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
import { MASK_RESOLUTION } from './globe_renderer';
import { CITY_LIGHTS } from './globe_data';

// ─── Main 2D canvas (transferred from main thread) ────────────────────────────
let mainCanvas: OffscreenCanvas | null = null;
let mainCtx: OffscreenCanvasRenderingContext2D | null = null;

// ─── WebGL canvas (created internally in the worker) ──────────────────────────
let webglCanvas: OffscreenCanvas | null = null;
let glState: WebGLGlobeState | null = null;

let geoFeatures: GeoFeature[] = [];
let precomputedFeatures: PrecomputedFeature[] = [];
let visitors: Visitor[] = [];

let precomputedGrid: PrecomputedGrid | null = null;
let precomputedLights: PrecomputedLight[] = [];

function buildPrecomputed(features: GeoFeature[]): PrecomputedFeature[] {
    const D = Math.PI / 180;
    return features.map(f => ({
        rings: f.rings
            .filter(ring => ring.length >= 3)
            .map(ring => {
                const n = ring.length;
                const vecs = new Float32Array(n * 3);
                for (let i = 0; i < n; i++) {
                    const [lng, lat] = ring[i];
                    const phi = (90 - lat) * D, theta = (lng + 180) * D;
                    const sp = Math.sin(phi), cp = Math.cos(phi);
                    vecs[i * 3]     = -sp * Math.cos(theta);
                    vecs[i * 3 + 1] =  cp;
                    vecs[i * 3 + 2] =  sp * Math.sin(theta);
                }
                let sx = 0, sy = 0, sz = 0;
                for (let i = 0; i < n; i++) {
                    sx += vecs[i * 3]; sy += vecs[i * 3 + 1]; sz += vecs[i * 3 + 2];
                }
                const len = Math.sqrt(sx * sx + sy * sy + sz * sz);
                const centroid = len > 0
                    ? new Float32Array([sx / len, sy / len, sz / len])
                    : new Float32Array([0, 1, 0]);
                let minDot = 1;
                for (let i = 0; i < n; i++) {
                    const d = centroid[0] * vecs[i * 3] + centroid[1] * vecs[i * 3 + 1] + centroid[2] * vecs[i * 3 + 2];
                    if (d < minDot) minDot = d;
                }
                const coneSin = minDot >= 1 ? 0 : Math.sqrt(1 - minDot * minDot);
                return { vecs, centroid, coneSin };
            }),
    }));
}

// ─── Animation state ──────────────────────────────────────────────────────────
const ZOOM_LERP_SPEED = 0.10;
let workerSpinAngle = 0;
let workerZoom = 1.0;
let workerLastNowMs = 0;
let workerSpinInit = false;
let lastSolarMs = 0;

// ─── Terminator mask (still used for fallback / unused now but keep for removal safety) ──
// Not needed with WebGL — day/night computed per-fragment in the shader.
// Keeping MASK_RESOLUTION import to avoid globe_renderer.ts dead-export warnings.
void MASK_RESOLUTION;

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
        // Main 2D canvas (displayed to user)
        mainCanvas = msg.canvas;
        mainCanvas.width = msg.width * msg.dpr;
        mainCanvas.height = msg.height * msg.dpr;
        mainCtx = mainCanvas.getContext('2d')!;
        mainCtx.scale(msg.dpr, msg.dpr);

        // WebGL canvas (rendered in WebGL, then blitted to mainCanvas)
        webglCanvas = new OffscreenCanvas(msg.width, msg.height);
        glState = initWebGL(webglCanvas, msg.width, msg.height);

        // Static geometry — precomputed once
        precomputedGrid = buildPrecomputedGrid();
        precomputedLights = buildPrecomputedLights(CITY_LIGHTS);

        if (glState) {
            uploadGridData(glState, precomputedGrid);
            uploadLightData(glState, precomputedLights);
            // geofeatures may have arrived before WebGL was ready — upload now if so.
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
            // Texture bake: Canvas2D fills all polygons into a 2048×1024 equirectangular map.
            // This runs once and never again unless the dataset changes.
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

        // ── Spin angle + zoom ──────────────────────────────────────────────────
        if (!workerSpinInit) {
            workerSpinAngle = getEarthRotY(nowMs);
            workerZoom = targetZoom;
            workerLastNowMs = nowMs;
            workerSpinInit = true;
        } else {
            const elapsed = (nowMs - workerLastNowMs) / 1000;
            if (rotateEnabled) {
                workerSpinAngle += SPIN_SPEED_RAD_S * elapsed;
            } else {
                workerSpinAngle = frozenEarthBase;
            }
            workerLastNowMs = nowMs;
        }
        workerZoom += (targetZoom - workerZoom) * ZOOM_LERP_SPEED;

        const rotY = workerSpinAngle + userOffsetY;
        const effectiveRadius = baseRadius * workerZoom;

        // ── Solar position ─────────────────────────────────────────────────────
        const { sunLat, sunLng } = getSolarPosition(nowMs);

        let solarText: string | undefined;
        if (nowMs - lastSolarMs >= 1000) {
            lastSolarMs = nowMs;
            const d = new Date(nowMs);
            const H = d.getUTCHours().toString().padStart(2, '0');
            const M = d.getUTCMinutes().toString().padStart(2, '0');
            const S = d.getUTCSeconds().toString().padStart(2, '0');
            solarText = `☀ ${sunLat >= 0 ? '+' : ''}${sunLat.toFixed(1)}°  ${sunLng >= 0 ? 'E' : 'W'}${Math.abs(sunLng).toFixed(1)}°  UTC ${H}:${M}:${S}`;
        }

        // ── WebGL render ───────────────────────────────────────────────────────
        renderWebGLFrame(glState, {
            rotY, rotX, sunLat, sunLng,
            r: effectiveRadius, cx, cy,
            w: width, h: height, frame,
        });

        // ── Blit WebGL output to main 2D canvas ────────────────────────────────
        // mainCtx has scale(dpr, dpr) so the blit maps to full physical resolution.
        mainCtx.clearRect(0, 0, width, height);
        mainCtx.drawImage(webglCanvas as unknown as CanvasImageSource, 0, 0, width, height);

        // ── Atmosphere glow (2D overlay) ───────────────────────────────────────
        const r = effectiveRadius;
        const atm = mainCtx.createRadialGradient(cx, cy, r * 0.97, cx, cy, r * 1.08);
        atm.addColorStop(0, 'rgba(80,160,255,0)');
        atm.addColorStop(0.30, 'rgba(80,160,255,0.18)');
        atm.addColorStop(1, 'rgba(80,160,255,0)');
        mainCtx.beginPath();
        mainCtx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
        mainCtx.fillStyle = atm;
        mainCtx.fill();

        // ── Selected country highlight (2D overlay) ────────────────────────────
        const selIdx = selectedFeatureIdx;
        if (selIdx >= 0 && precomputedFeatures.length > selIdx) {
            const glRenderState = {
                rotY, rotX, effectiveRadius: r,
                canvasCX: cx, canvasCY: cy,
                canvasWidth: width, canvasHeight: height,
                sunLat, sunLng, frame,
            };
            const { selected } = buildLandPaths(precomputedFeatures, glRenderState, selIdx, true);
            const mc = mainCtx as unknown as CanvasRenderingContext2D;
            mc.save();
            mc.beginPath();
            mc.arc(cx, cy, r, 0, Math.PI * 2);
            mc.clip();
            mc.fillStyle = 'rgba(251,191,36,0.88)';
            mc.strokeStyle = 'rgba(253,224,71,1)';
            mc.lineWidth = 1.5;
            mc.fill(selected);
            mc.stroke(selected);
            mc.restore();
        }

        // ── Visitor pins (2D overlay) ──────────────────────────────────────────
        const collectedPins: PinPosition[] = [];
        const pinState = {
            rotY, rotX, effectiveRadius: r,
            canvasCX: cx, canvasCY: cy,
            canvasWidth: width, canvasHeight: height,
            sunLat, sunLng, frame,
        };
        drawVisitorPins(
            mainCtx as unknown as CanvasRenderingContext2D,
            visitors, pinState,
            { frame, onPinRendered: (pin) => collectedPins.push(pin) },
        );

        postMessage({
            type: 'pins',
            pins: collectedPins,
            rotY, rotX, effectiveRadius,
            zoom: workerZoom,
            spinAngle: workerSpinAngle,
            solarText,
        });
    }
});
