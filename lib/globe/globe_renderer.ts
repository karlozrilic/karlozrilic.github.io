import type { GeoFeature, Visitor, PinPosition, Vec3 } from '@/lib/globe/globe_utils';
import {
    applyRotation,
    latLngToVec3,
    projectLatLng,
    getHorizonAlpha,
    buildTerminatorMask,
} from '@/lib/globe/globe_utils';

export interface GlobeRenderState {
    rotY: number;
    rotX: number;
    effectiveRadius: number;
    canvasCX: number;
    canvasCY: number;
    canvasWidth: number;
    canvasHeight: number;
    sunLat: number;
    sunLng: number;
    frame: number;
}

export interface DrawLandOptions {
    fillColor: string;
    strokeColor: string;
}

export interface DrawLightsOptions {
    frame: number;
}

export interface DrawPinsOptions {
    frame: number;
    onPinRendered: (pin: PinPosition) => void;
}

// Higher = sharper terminator edge, lower = faster
export const MASK_RESOLUTION = 440;

// Pre-computed 3D unit vectors per polygon point. Built once when geo features
// arrive; per frame we only apply the rotation (8 mults + 6 adds), eliminating
// the 4 trig calls latLngToVec3 would otherwise make per point per draw.
export interface PrecomputedRing {
    vecs: Float32Array;     // [x,y,z, x,y,z, ...] — one triple per polygon vertex
    centroid: Float32Array; // [cx,cy,cz] unit vector — used for back-face culling
    coneSin: number;        // sin of bounding half-angle; skip ring when rotated_centroid.z + coneSin < 0
}
export interface PrecomputedFeature {
    rings: PrecomputedRing[];
}

// Pre-computed 3D unit vectors for all grid lines. Built once at startup — only rotation applied per frame.
export interface PrecomputedGrid {
    lines: Float32Array[]; // each element: [x,y,z, x,y,z, ...] for one line's points
}

export function buildPrecomputedGrid(): PrecomputedGrid {
    const D = Math.PI / 180;
    const lines: Float32Array[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
        const pts: number[] = [];
        for (let lng = -180; lng <= 180; lng += 4) {
            const phi = (90 - lat) * D, theta = (lng + 180) * D;
            const sp = Math.sin(phi), cp = Math.cos(phi), st = Math.sin(theta), ct = Math.cos(theta);
            pts.push(-sp * ct, cp, sp * st);
        }
        lines.push(new Float32Array(pts));
    }
    for (let lng = -180; lng <= 180; lng += 20) {
        const pts: number[] = [];
        for (let lat = -88; lat <= 88; lat += 4) {
            const phi = (90 - lat) * D, theta = (lng + 180) * D;
            const sp = Math.sin(phi), cp = Math.cos(phi), st = Math.sin(theta), ct = Math.cos(theta);
            pts.push(-sp * ct, cp, sp * st);
        }
        lines.push(new Float32Array(pts));
    }
    return { lines };
}

// Builds a single Path2D for all grid lines. Call once per frame, stroke on both day + night.
// Eliminates 28 separate ctx.stroke() calls and all projectLatLng trig.
export function buildGridPath(grid: PrecomputedGrid, state: GlobeRenderState): Path2D {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    const path = new Path2D();
    for (const vecs of grid.lines) {
        const n = vecs.length / 3;
        let penDown = false;
        for (let i = 0; i < n; i++) {
            const si = i * 3;
            const x0 = vecs[si], y0 = vecs[si + 1], z0 = vecs[si + 2];
            const x1 = x0 * cosRY + z0 * sinRY;
            const z1 = -x0 * sinRY + z0 * cosRY;
            const y2 = y0 * cosRX - z1 * sinRX;
            const z2 = y0 * sinRX + z1 * cosRX;
            if (z2 <= 0) { penDown = false; continue; }
            const sx = cx + x1 * r, sy = cy - y2 * r;
            penDown ? path.lineTo(sx, sy) : path.moveTo(sx, sy);
            penDown = true;
        }
    }
    return path;
}

// Per-light data precomputed once at load — only rotation and sun dot-product change per frame.
export interface PrecomputedLight {
    vx: number; vy: number; vz: number; // world-space unit vector
    dotSize: number;
    color: string; // '255,195,85' (warm) or '195,210,255' (cool)
}

export function buildPrecomputedLights(lights: { lat: number; lng: number }[]): PrecomputedLight[] {
    const D = Math.PI / 180;
    return lights.map(({ lat, lng }) => {
        const phi = (90 - lat) * D, theta = (lng + 180) * D;
        const sp = Math.sin(phi), cp = Math.cos(phi), st = Math.sin(theta), ct = Math.cos(theta);
        return {
            vx: -sp * ct, vy: cp, vz: sp * st,
            dotSize: 0.8 + 0.45 * (Math.sin(lat * 53.1 + lng * 47.3) * 0.5 + 0.5),
            color: Math.sin(lat * 17.3 + lng * 31.7) > 0 ? '255,195,85' : '195,210,255',
        };
    });
}

// Reusable projection scratch buffers — avoids per-ring TypedArray allocation.
let _sx: Float32Array = new Float32Array(0);
let _sy: Float32Array = new Float32Array(0);
let _sz: Float32Array = new Float32Array(0);
function ensureProjectionBuffers(n: number): void {
    if (_sx.length < n) { _sx = new Float32Array(n); _sy = new Float32Array(n); _sz = new Float32Array(n); }
}

// Builds ONE combined Path2D for all normal-land rings and ONE for the selected
// country. Using a single Path2D cuts draw calls from O(rings) to O(1) per canvas
// and lets the browser batch geometry into a single fill.
//
// Optimisations vs the old per-ring approach:
//   1. Back-face culling — precomputed centroid normal; skip rings whose entire
//      bounding cone is behind the globe (saves ~50% of all rings).
//   2. Screen-space vertex dedup — skip lineTo when the next projected point is
//      within 0.5 px of the last one (adaptive LOD at no extra precompute cost).
const DEDUP_SQ = 0.25; // (0.5 px)²

export function buildLandPaths(
    features: PrecomputedFeature[],
    state: GlobeRenderState,
    selectedIdx = -1,
    selOnly = false,  // when true, skip all non-selected features (worker path)
): { normal: Path2D; selected: Path2D } {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);

    const normalPath = new Path2D();
    const selectedPath = new Path2D();

    for (let fi = 0; fi < features.length; fi++) {
        if (selOnly && fi !== selectedIdx) continue;
        const target = fi === selectedIdx ? selectedPath : normalPath;
        for (const { vecs, centroid, coneSin } of features[fi].rings) {
            // ── Back-face culling ─────────────────────────────────────────────
            // Rotate the precomputed centroid unit vector; check its z-component.
            // If centroid_z + sin(halfAngle) < 0 the entire ring faces away.
            const ccx = centroid[0], ccy = centroid[1], ccz = centroid[2];
            // Only the z-component of the rotated centroid is needed
            const cz1c = -ccx * sinRY + ccz * cosRY;
            const cz2c = ccy * sinRX + cz1c * cosRX;
            if (cz2c + coneSin < 0) continue;
            // ─────────────────────────────────────────────────────────────────

            const count = vecs.length / 3;
            if (count < 3) continue;
            ensureProjectionBuffers(count);

            // Project — rotation only, no trig; store raw z2 (sign is all we need,
            // and t = az/(az-bz) is scale-invariant so r cancels out)
            for (let i = 0; i < count; i++) {
                const si = i * 3;
                const x0 = vecs[si], y0 = vecs[si + 1], z0 = vecs[si + 2];
                const x1 = x0 * cosRY + z0 * sinRY;
                const z1 = -x0 * sinRY + z0 * cosRY;
                const y2 = y0 * cosRX - z1 * sinRX;
                const z2 = y0 * sinRX + z1 * cosRX;
                _sx[i] = cx + x1 * r;
                _sy[i] = cy - y2 * r;
                _sz[i] = z2; // raw (not ×r) — sign identical, t formula correct
            }

            let started = false;
            let exitAngle = NaN;
            let firstIsLimb = false, firstAngle = 0;
            let lastIsLimb = false, lastAngle = 0;
            // Dedup tracking — reset per ring
            let lastX = 0, lastY = 0;

            for (let i = 0; i < count; i++) {
                const ax = _sx[i], ay = _sy[i], az = _sz[i];
                const bi = (i + 1) % count;
                const bz = _sz[bi];

                if (az > 0) {
                    if (!started) {
                        target.moveTo(ax, ay);
                        lastX = ax; lastY = ay;
                        started = true;
                    } else {
                        // ── Screen-space vertex dedup ─────────────────────────
                        const ddx = ax - lastX, ddy = ay - lastY;
                        if (ddx * ddx + ddy * ddy >= DEDUP_SQ) {
                            target.lineTo(ax, ay);
                            lastX = ax; lastY = ay;
                        }
                        // ─────────────────────────────────────────────────────
                    }
                    lastIsLimb = false;
                    if (bz <= 0) {
                        // Front→back: draw the limb-exit point (always, dedup exempt)
                        const t = az / (az - bz);
                        const px = ax + t * (_sx[bi] - ax), py = ay + t * (_sy[bi] - ay);
                        target.lineTo(px, py);
                        exitAngle = Math.atan2(py - cy, px - cx);
                        lastIsLimb = true; lastAngle = exitAngle;
                        lastX = px; lastY = py;
                    }
                } else if (bz > 0) {
                    // Back→front: limb-entry point
                    const t = az / (az - bz);
                    const px = ax + t * (_sx[bi] - ax), py = ay + t * (_sy[bi] - ay);
                    const entryAngle = Math.atan2(py - cy, px - cx);
                    if (!isNaN(exitAngle)) {
                        let diff = entryAngle - exitAngle;
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;
                        target.arc(cx, cy, r, exitAngle, entryAngle, diff < 0);
                        exitAngle = NaN; lastIsLimb = false;
                        // Track the arc endpoint for the next dedup check
                        lastX = cx + Math.cos(entryAngle) * r;
                        lastY = cy + Math.sin(entryAngle) * r;
                    } else if (!started) {
                        target.moveTo(px, py);
                        lastX = px; lastY = py;
                        started = true;
                        firstIsLimb = true; firstAngle = entryAngle; lastIsLimb = false;
                    } else {
                        target.lineTo(px, py);
                        lastX = px; lastY = py;
                        lastIsLimb = false;
                    }
                }
            }

            if (!started) continue;
            if (lastIsLimb && firstIsLimb) {
                let diff = firstAngle - lastAngle;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                target.arc(cx, cy, r, lastAngle, firstAngle, diff < 0);
            }
            target.closePath();
        }
    }

    return { normal: normalPath, selected: selectedPath };
}

export function drawGrid(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    state: GlobeRenderState,
    color: string,
): void {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.55;

    for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let penDown = false;
        for (let lng = -180; lng <= 180; lng += 4) {
            const p = projectLatLng(lat, lng, rotY, rotX, r, cx, cy);
            if (p.z <= 0) { penDown = false; continue; }
            penDown ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy);
            penDown = true;
        }
        ctx.stroke();
    }

    for (let lng = -180; lng <= 180; lng += 20) {
        ctx.beginPath();
        let penDown = false;
        for (let lat = -88; lat <= 88; lat += 4) {
            const p = projectLatLng(lat, lng, rotY, rotX, r, cx, cy);
            if (p.z <= 0) { penDown = false; continue; }
            penDown ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy);
            penDown = true;
        }
        ctx.stroke();
    }
}

// Clips polygon rings at the globe's horizon limb.
// Where the path crosses the limb, we draw a circular arc along the limb instead of a straight chord.
// This prevents the winding/fill artifacts ("green blobs", "continent goes blue") that a chord causes.
export function drawLand(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    features: GeoFeature[],
    state: GlobeRenderState,
    options: DrawLandOptions,
): void {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    ctx.fillStyle = options.fillColor;
    ctx.strokeStyle = options.strokeColor;
    ctx.lineWidth = 0.6;

    features.forEach(feature => {
        feature.rings.forEach(ring => {
            if (ring.length < 3) return;

            const projected = ring.map(([lng, lat]) => {
                const [x, y, z] = applyRotation(latLngToVec3(lat, lng), rotY, rotX);
                return { sx: cx + x * r, sy: cy - y * r, z: z * r };
            });

            ctx.beginPath();
            let started = false;
            // Angle on the limb circle of the last FRONT→BACK crossing; NaN when not pending.
            let exitAngle = NaN;
            // Whether the very first drawn point was a limb entry (back→front crossing).
            let firstIsLimb = false;
            let firstAngle = 0;
            // Whether the very last drawn point was a limb exit (front→back crossing).
            let lastIsLimb = false;
            let lastAngle = 0;

            for (let i = 0; i < projected.length; i++) {
                const a = projected[i];
                const b = projected[(i + 1) % projected.length];

                if (a.z > 0) {
                    if (!started) { ctx.moveTo(a.sx, a.sy); started = true; }
                    else { ctx.lineTo(a.sx, a.sy); }
                    lastIsLimb = false;

                    if (b.z <= 0) {
                        // Front → back: compute and draw the limb crossing point.
                        const t = a.z / (a.z - b.z);
                        const px = a.sx + t * (b.sx - a.sx);
                        const py = a.sy + t * (b.sy - a.sy);
                        ctx.lineTo(px, py);
                        exitAngle = Math.atan2(py - cy, px - cx);
                        lastIsLimb = true;
                        lastAngle = exitAngle;
                    }
                } else if (b.z > 0) {
                    // Back → front: compute the limb entry point.
                    const t = a.z / (a.z - b.z);
                    const px = a.sx + t * (b.sx - a.sx);
                    const py = a.sy + t * (b.sy - a.sy);
                    const entryAngle = Math.atan2(py - cy, px - cx);

                    if (!isNaN(exitAngle)) {
                        // We had a pending exit: arc along the limb from exit to entry.
                        // Use the shorter of the two possible arcs (minor arc heuristic).
                        let diff = entryAngle - exitAngle;
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;
                        ctx.arc(cx, cy, r, exitAngle, entryAngle, diff < 0);
                        exitAngle = NaN;
                        lastIsLimb = false;
                    } else if (!started) {
                        ctx.moveTo(px, py);
                        started = true;
                        firstIsLimb = true;
                        firstAngle = entryAngle;
                        lastIsLimb = false;
                    } else {
                        ctx.lineTo(px, py);
                        lastIsLimb = false;
                    }
                }
            }

            if (!started) return;

            // If the path exits at the limb and also started at a limb entry, arc to close
            // rather than drawing a chord, which would corrupt the polygon's fill.
            if (lastIsLimb && firstIsLimb) {
                let diff = firstAngle - lastAngle;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                ctx.arc(cx, cy, r, lastAngle, firstAngle, diff < 0);
            }

            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
    });
}

// svX/Y/Z = sun world-space unit vector, computed once per frame from sunLat/sunLng.
// lights must be built with buildPrecomputedLights() — no lat/lng trig in the hot loop.
export function drawCityLights(
    ctx: OffscreenCanvasRenderingContext2D,
    lights: PrecomputedLight[],
    svX: number, svY: number, svZ: number,
    state: GlobeRenderState,
    options: DrawLightsOptions,
): void {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    const subtleTwinkle = Math.sin(options.frame * 0.04) * 0.12;
    const TWILIGHT_OFF = Math.sin(9.0 * Math.PI / 180);
    const INV_TWO_TW = 1 / (2 * TWILIGHT_OFF);

    for (let li = 0; li < lights.length; li++) {
        const { vx, vy, vz, dotSize, color } = lights[li];

        // Rotate to camera space — only mults/adds, no trig
        const x1 = vx * cosRY + vz * sinRY;
        const z1 = -vx * sinRY + vz * cosRY;
        const y2 = vy * cosRX - z1 * sinRX;
        const z2 = vy * sinRX + z1 * cosRX;
        if (z2 <= 0) continue;

        // Horizon fade — z2 unscaled; equivalent to getHorizonAlpha(z2*r, r)
        const horizonAlpha = (z2 - 0.04) * 10;
        if (horizonAlpha <= 0) continue;
        const ha = horizonAlpha > 1 ? 1 : horizonAlpha;

        // Night factor: dot(lightWorldVec, sunWorldVec) — no trig, no per-light lat/lng
        const cosAngle = vx * svX + vy * svY + vz * svZ;
        let df = (cosAngle + TWILIGHT_OFF) * INV_TWO_TW;
        if (df > 1) df = 1; else if (df < 0) df = 0;
        const alpha = ha * (1 - df);
        if (alpha < 0.04) continue;

        const sx = cx + x1 * r, sy = cy - y2 * r;
        const twinkleAlpha = alpha * (0.88 + subtleTwinkle * Math.sin(vx * 7.1 + vz * 11.3));

        // Flat glow circle — avoids createRadialGradient per light (~10× faster)
        ctx.beginPath();
        ctx.arc(sx, sy, dotSize * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${0.22 * twinkleAlpha})`;
        ctx.fill();

        // Bright inner dot
        ctx.beginPath();
        ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${0.92 * twinkleAlpha})`;
        ctx.fill();
    }
}

export function drawVisitorPins(
    ctx: CanvasRenderingContext2D,
    visitors: Visitor[],
    state: GlobeRenderState,
    options: DrawPinsOptions,
): void {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    const pulse = Math.sin(options.frame * 0.05) * 0.5 + 0.5;

    visitors.forEach(visitor => {
        const projected = projectLatLng(visitor.lat, visitor.lng, rotY, rotX, r, cx, cy);
        const horizonAlpha = getHorizonAlpha(projected.z, r);
        if (horizonAlpha <= 0) return;

        const isUser = !!visitor.isUser;
        const pinColor = isUser ? '#68D391' : (visitor.live ? '#63B3ED' : '#F6AD55');
        const dotRadius = Math.max(isUser ? 4 : 3, Math.min(isUser ? 7 : 6, (isUser ? 3 : 2.5) + Math.log2(visitor.count + 1)));

        // Use the surface normal to point the spike away from the globe surface
        const normal = applyRotation(latLngToVec3(visitor.lat, visitor.lng), rotY, rotX) as Vec3;
        const normalX = normal[0];
        const normalY = -normal[1];
        const spikeLength = dotRadius * 2.2;
        const tipX = projected.sx + normalX * spikeLength;
        const tipY = projected.sy + normalY * spikeLength;

        ctx.globalAlpha = horizonAlpha;

        if (isUser) {
            // Static inner ring
            ctx.beginPath();
            ctx.arc(tipX, tipY, dotRadius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(104,211,145,0.45)';
            ctx.lineWidth = 1;
            ctx.stroke();
            // Pulsing outer ring
            ctx.beginPath();
            ctx.arc(tipX, tipY, dotRadius + 6 + pulse * 4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(104,211,145,${0.12 + pulse * 0.2})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        } else if (visitor.live) {
            ctx.beginPath();
            ctx.arc(tipX, tipY, dotRadius + 3 + pulse * 5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(99,179,237,${0.2 + pulse * 0.25})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, dotRadius * 4);
        glow.addColorStop(0, pinColor + '66');
        glow.addColorStop(1, pinColor + '00');
        ctx.beginPath();
        ctx.arc(tipX, tipY, dotRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(projected.sx, projected.sy);
        ctx.lineTo(tipX, tipY);
        ctx.strokeStyle = pinColor + '88';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tipX, tipY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = pinColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tipX, tipY, dotRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.globalAlpha = 1;

        options.onPinRendered({
            visitor,
            sx: tipX,
            sy: tipY,
            hitRadius: dotRadius + 10,
            horizonAlpha,
        });
    });
}

export interface CompositeGlobeOptions {
    state: GlobeRenderState;
    mainCtx: CanvasRenderingContext2D;
    dayCtx: OffscreenCanvasRenderingContext2D;
    nightCtx: OffscreenCanvasRenderingContext2D;
    nightMaskedCtx: OffscreenCanvasRenderingContext2D;
    maskCtx: OffscreenCanvasRenderingContext2D;
    geoFeatures: GeoFeature[];
    /** Pre-computed 3D vecs per polygon point. When present, land is drawn via Path2D
     *  (built once, stamped on both day + night), cutting land geometry work in half. */
    precomputedFeatures?: PrecomputedFeature[];
    selectedFeatureIdx?: number;
    precomputedGrid?: PrecomputedGrid;
    precomputedLights?: PrecomputedLight[];
    visitors: Visitor[];
    onPinRendered: (pin: PinPosition) => void;
    /** Pre-computed terminator mask from the Web Worker. Falls back to inline computation when null. */
    maskImageData: ImageData | null;
}

// Render order: day layer → night layer → terminator mask → composite → limb darken → atmosphere → specular → pins
export function renderGlobeFrame(opts: CompositeGlobeOptions): void {
    const {
        state, mainCtx, dayCtx, nightCtx, nightMaskedCtx, maskCtx,
        geoFeatures, precomputedFeatures, selectedFeatureIdx,
        precomputedGrid, precomputedLights,
        visitors, onPinRendered,
        maskImageData,
    } = opts;

    const { effectiveRadius: r, canvasCX: cx, canvasCY: cy, canvasWidth: w, canvasHeight: h,
        rotY, rotX, sunLat, sunLng, frame } = state;

    // Sun world-space unit vector — computed once per frame, used by drawCityLights
    const _sunD = Math.PI / 180;
    const _sunPhi = (90 - sunLat) * _sunD, _sunTheta = (sunLng + 180) * _sunD;
    const svX = -Math.sin(_sunPhi) * Math.cos(_sunTheta);
    const svY = Math.cos(_sunPhi);
    const svZ = Math.sin(_sunPhi) * Math.sin(_sunTheta);

    // Grid path built once, shared between day and night — saves 28 stroke() calls and ~13 000 trig ops
    const gridPath = precomputedGrid ? buildGridPath(precomputedGrid, state) : null;

    const clipToSphere = (c: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => {
        c.beginPath();
        c.arc(cx, cy, r, 0, Math.PI * 2);
        c.clip();
    };

    const selIdx = selectedFeatureIdx ?? -1;
    const hasPrecomputed = (precomputedFeatures?.length ?? 0) > 0;
    const { normal: landNormal, selected: landSelected } = hasPrecomputed
        ? buildLandPaths(precomputedFeatures!, state, selIdx)
        : { normal: new Path2D(), selected: new Path2D() };

    // Day layer
    dayCtx.clearRect(0, 0, w, h);
    dayCtx.save();
    clipToSphere(dayCtx);
    const dayOcean = dayCtx.createRadialGradient(cx - r * 0.22, cy - r * 0.22, r * 0.04, cx, cy, r);
    dayOcean.addColorStop(0, '#4aabf0');
    dayOcean.addColorStop(0.5, '#2080c0');
    dayOcean.addColorStop(1, '#10508a');
    dayCtx.fillStyle = dayOcean;
    dayCtx.fillRect(0, 0, w, h);
    if (gridPath) {
        dayCtx.strokeStyle = 'rgba(255,255,255,0.09)';
        dayCtx.lineWidth = 0.55;
        dayCtx.stroke(gridPath);
    } else {
        drawGrid(dayCtx, state, 'rgba(255,255,255,0.09)');
    }
    if (hasPrecomputed) {
        dayCtx.lineWidth = 0.6;
        dayCtx.fillStyle = 'rgba(55,115,62,0.92)';
        dayCtx.strokeStyle = 'rgba(75,145,80,0.5)';
        dayCtx.fill(landNormal); dayCtx.stroke(landNormal);
        if (selIdx >= 0) {
            dayCtx.fillStyle = 'rgba(251,191,36,0.88)';
            dayCtx.strokeStyle = 'rgba(253,224,71,1)';
            dayCtx.lineWidth = 1.5;
            dayCtx.fill(landSelected); dayCtx.stroke(landSelected);
        }
    } else if (geoFeatures.length) {
        drawLand(dayCtx, geoFeatures, state, { fillColor: 'rgba(55,115,62,0.92)', strokeColor: 'rgba(75,145,80,0.5)' });
    }
    dayCtx.restore();

    // Night layer — reuses the same land paths, skipping all geometry recomputation
    nightCtx.clearRect(0, 0, w, h);
    nightCtx.save();
    clipToSphere(nightCtx);
    const nightOcean = nightCtx.createRadialGradient(cx - r * 0.18, cy - r * 0.18, r * 0.04, cx, cy, r);
    nightOcean.addColorStop(0, '#0e2035');
    nightOcean.addColorStop(0.6, '#091522');
    nightOcean.addColorStop(1, '#040c14');
    nightCtx.fillStyle = nightOcean;
    nightCtx.fillRect(0, 0, w, h);
    if (gridPath) {
        nightCtx.strokeStyle = 'rgba(99,179,237,0.055)';
        nightCtx.lineWidth = 0.55;
        nightCtx.stroke(gridPath);
    } else {
        drawGrid(nightCtx, state, 'rgba(99,179,237,0.055)');
    }
    if (hasPrecomputed) {
        nightCtx.lineWidth = 0.6;
        nightCtx.fillStyle = 'rgba(10,28,16,0.97)';
        nightCtx.strokeStyle = 'rgba(20,50,25,0.5)';
        nightCtx.fill(landNormal); nightCtx.stroke(landNormal);
        if (selIdx >= 0) {
            nightCtx.fillStyle = 'rgba(92,56,7,0.95)';
            nightCtx.strokeStyle = 'rgba(202,138,4,0.9)';
            nightCtx.lineWidth = 1.5;
            nightCtx.fill(landSelected); nightCtx.stroke(landSelected);
        }
    } else if (geoFeatures.length) {
        drawLand(nightCtx, geoFeatures, state, { fillColor: 'rgba(10,28,16,0.97)', strokeColor: 'rgba(20,50,25,0.5)' });
    }
    if (precomputedLights && precomputedLights.length > 0) {
        drawCityLights(nightCtx, precomputedLights, svX, svY, svZ, state, { frame });
    }
    nightCtx.restore();

    // Terminator mask — always square, always fills the globe's bounding box.
    // Using MASK_RESOLUTION/2 as the radius makes the disc fill the whole 220×220 mask,
    // so when we drawImage it onto the globe's bounding box below it maps perfectly.
    const maskData = maskImageData ?? buildTerminatorMask(MASK_RESOLUTION, rotY, rotX, MASK_RESOLUTION / 2, sunLat, sunLng);
    maskCtx.putImageData(maskData, 0, 0);
    // Clip the mask canvas to its own disc with an anti-aliased arc so the disc
    // boundary uses canvas arc quality (sub-pixel coverage) instead of relying on
    // bilinear interpolation of the pixel-computed hard step.  This eliminates the
    // terminator-limb junction spots without needing a fade on the night layer.
    maskCtx.globalCompositeOperation = 'destination-in';
    maskCtx.beginPath();
    maskCtx.arc(MASK_RESOLUTION / 2, MASK_RESOLUTION / 2, MASK_RESOLUTION / 2, 0, Math.PI * 2);
    maskCtx.fillStyle = 'rgba(0,0,0,1)';
    maskCtx.fill();
    maskCtx.globalCompositeOperation = 'source-over';

    // Mask the night layer. Intermediate canvases (day/night/masked) are 1× CSS-pixel size —
    // the final drawImage onto mainCtx (which has dpr scaling) handles the upscale for free,
    // making all compositing 4× cheaper on dpr=2 displays.
    nightMaskedCtx.clearRect(0, 0, w, h);
    nightMaskedCtx.drawImage((nightCtx as unknown as { canvas: OffscreenCanvas }).canvas, 0, 0);
    nightMaskedCtx.globalCompositeOperation = 'destination-in';
    nightMaskedCtx.drawImage(
        (maskCtx as unknown as { canvas: OffscreenCanvas }).canvas,
        0, 0, MASK_RESOLUTION, MASK_RESOLUTION,
        cx - r, cy - r, 2 * r, 2 * r,
    );
    nightMaskedCtx.globalCompositeOperation = 'source-over';

    // Composite day + masked night onto the main canvas.
    // mainCtx has scale(dpr,dpr) so CSS destination coords auto-upscale to physical resolution.
    mainCtx.clearRect(0, 0, w, h);
    mainCtx.drawImage(
        (dayCtx as unknown as { canvas: OffscreenCanvas }).canvas,
        0, 0, w, h, 0, 0, w, h,
    );
    mainCtx.drawImage(
        (nightMaskedCtx as unknown as { canvas: OffscreenCanvas }).canvas,
        0, 0, w, h, 0, 0, w, h,
    );

    // Hard-clip the composite to the sphere disc. A plain arc fill (no gradient)
    // uses only the arc's own sub-pixel anti-aliasing (~1-2 px) so the interior is
    // untouched and there is no visible dark ring — but stray pixels sitting right
    // at the boundary from terminator-limb junction bleed are eliminated.
    mainCtx.globalCompositeOperation = 'destination-in';
    mainCtx.beginPath();
    mainCtx.arc(cx, cy, r, 0, Math.PI * 2);
    mainCtx.fillStyle = 'rgba(0,0,0,1)';
    mainCtx.fill();
    mainCtx.globalCompositeOperation = 'source-over';

    // Atmosphere glow — tight ring just outside the sphere boundary
    const atmosphere = mainCtx.createRadialGradient(cx, cy, r * 0.97, cx, cy, r * 1.08);
    atmosphere.addColorStop(0, 'rgba(80,160,255,0)');
    atmosphere.addColorStop(0.30, 'rgba(80,160,255,0.18)');
    atmosphere.addColorStop(1, 'rgba(80,160,255,0)');
    mainCtx.beginPath();
    mainCtx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
    mainCtx.fillStyle = atmosphere;
    mainCtx.fill();

    // Pins last so they always sit on top
    drawVisitorPins(mainCtx, visitors, state, { frame, onPinRendered });
}
