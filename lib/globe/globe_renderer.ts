import type { GeoFeature, Visitor, CityLight, PinPosition, Vec3 } from '@/lib/globe/globe_utils';
import {
    applyRotation,
    latLngToVec3,
    projectLatLng,
    getHorizonAlpha,
    getDaylightFactor,
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
    vecs: Float32Array; // [x,y,z, x,y,z, ...] — one triple per polygon vertex
}
export interface PrecomputedFeature {
    rings: PrecomputedRing[];
}

// Reusable projection scratch buffers — avoids per-ring TypedArray allocation.
let _sx: Float32Array = new Float32Array(0);
let _sy: Float32Array = new Float32Array(0);
let _sz: Float32Array = new Float32Array(0);
function ensureProjectionBuffers(n: number): void {
    if (_sx.length < n) { _sx = new Float32Array(n); _sy = new Float32Array(n); _sz = new Float32Array(n); }
}

// Builds one Path2D per polygon ring using pre-computed 3D vecs.
// Rotation constants (cosRY etc.) are computed once per call — not per point.
// The returned paths are drawn on BOTH the day and night canvases, halving
// the geometry work vs calling drawLand twice.
export function buildLandPaths(
    features: PrecomputedFeature[],
    state: GlobeRenderState,
    selectedIdx = -1,
): { normal: Path2D[]; selected: Path2D[] } {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy } = state;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    const normal: Path2D[] = [];
    const selected: Path2D[] = [];

    for (let fi = 0; fi < features.length; fi++) {
        const targetArr = fi === selectedIdx ? selected : normal;
        for (const { vecs } of features[fi].rings) {
            const count = vecs.length / 3;
            if (count < 3) continue;

            ensureProjectionBuffers(count);

            // Project each point — only rotation math, no trig
            for (let i = 0; i < count; i++) {
                const si = i * 3;
                const x0 = vecs[si], y0 = vecs[si + 1], z0 = vecs[si + 2];
                const x1 = x0 * cosRY + z0 * sinRY;
                const z1 = -x0 * sinRY + z0 * cosRY;
                const y2 = y0 * cosRX - z1 * sinRX;
                const z2 = y0 * sinRX + z1 * cosRX;
                _sx[i] = cx + x1 * r;
                _sy[i] = cy - y2 * r;
                _sz[i] = z2 * r;
            }

            // Limb-clip the ring (same algorithm as drawLand, but reads from buffers)
            const path = new Path2D();
            let started = false;
            let exitAngle = NaN;
            let firstIsLimb = false, firstAngle = 0;
            let lastIsLimb = false, lastAngle = 0;

            for (let i = 0; i < count; i++) {
                const ax = _sx[i], ay = _sy[i], az = _sz[i];
                const bi = (i + 1) % count;
                const bz = _sz[bi];

                if (az > 0) {
                    if (!started) { path.moveTo(ax, ay); started = true; }
                    else { path.lineTo(ax, ay); }
                    lastIsLimb = false;
                    if (bz <= 0) {
                        const t = az / (az - bz);
                        const px = ax + t * (_sx[bi] - ax), py = ay + t * (_sy[bi] - ay);
                        path.lineTo(px, py);
                        exitAngle = Math.atan2(py - cy, px - cx);
                        lastIsLimb = true; lastAngle = exitAngle;
                    }
                } else if (bz > 0) {
                    const t = az / (az - bz);
                    const px = ax + t * (_sx[bi] - ax), py = ay + t * (_sy[bi] - ay);
                    const entryAngle = Math.atan2(py - cy, px - cx);
                    if (!isNaN(exitAngle)) {
                        let diff = entryAngle - exitAngle;
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;
                        path.arc(cx, cy, r, exitAngle, entryAngle, diff < 0);
                        exitAngle = NaN; lastIsLimb = false;
                    } else if (!started) {
                        path.moveTo(px, py); started = true;
                        firstIsLimb = true; firstAngle = entryAngle; lastIsLimb = false;
                    } else {
                        path.lineTo(px, py); lastIsLimb = false;
                    }
                }
            }

            if (!started) continue;
            if (lastIsLimb && firstIsLimb) {
                let diff = firstAngle - lastAngle;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                path.arc(cx, cy, r, lastAngle, firstAngle, diff < 0);
            }
            path.closePath();
            targetArr.push(path);
        }
    }
    return { normal, selected };
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

export function drawCityLights(
    ctx: OffscreenCanvasRenderingContext2D,
    lights: CityLight[],
    state: GlobeRenderState,
    options: DrawLightsOptions,
): void {
    const { rotY, rotX, effectiveRadius: r, canvasCX: cx, canvasCY: cy, sunLat, sunLng } = state;
    const subtleTwinkle = Math.sin(options.frame * 0.04) * 0.12;

    lights.forEach(({ lat, lng }) => {
        const p = projectLatLng(lat, lng, rotY, rotX, r, cx, cy);
        if (p.z <= 0) return;

        const horizonAlpha = getHorizonAlpha(p.z, r);
        if (horizonAlpha <= 0) return;

        // Only visible on the night side
        const nightFactor = 1 - getDaylightFactor(lat, lng, sunLat, sunLng);
        const alpha = horizonAlpha * nightFactor;
        if (alpha < 0.04) return;

        // Deterministic values based on position — avoids per-frame Math.random()
        const isWarm = Math.sin(lat * 17.3 + lng * 31.7) > 0;
        const color = isWarm ? '255,195,85' : '195,210,255';
        const dotSize = 0.8 + 0.45 * (Math.sin(lat * 53.1 + lng * 47.3) * 0.5 + 0.5);
        const twinkleAlpha = alpha * (0.88 + subtleTwinkle * Math.sin(lat * 7.1 + lng * 11.3));

        const gradient = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, dotSize * 5.5);
        gradient.addColorStop(0, `rgba(${color},${0.5 * twinkleAlpha})`);
        gradient.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, dotSize * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${0.92 * twinkleAlpha})`;
        ctx.fill();
    });
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
    cityLights: CityLight[];
    visitors: Visitor[];
    onPinRendered: (pin: PinPosition) => void;
    /** Pre-computed terminator mask from the Web Worker. Falls back to inline computation when null. */
    maskImageData: ImageData | null;
}

// Render order: day layer → night layer → terminator mask → composite → limb darken → atmosphere → specular → pins
export function renderGlobeFrame(opts: CompositeGlobeOptions): void {
    const {
        state, mainCtx, dayCtx, nightCtx, nightMaskedCtx, maskCtx,
        geoFeatures, precomputedFeatures, selectedFeatureIdx, cityLights, visitors, onPinRendered,
        maskImageData,
    } = opts;

    const { effectiveRadius: r, canvasCX: cx, canvasCY: cy, canvasWidth: w, canvasHeight: h,
        rotY, rotX, sunLat, sunLng, frame } = state;

    const clipToSphere = (c: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => {
        c.beginPath();
        c.arc(cx, cy, r, 0, Math.PI * 2);
        c.clip();
    };

    const selIdx = selectedFeatureIdx ?? -1;
    const { normal: landNormal, selected: landSelected } = precomputedFeatures?.length
        ? buildLandPaths(precomputedFeatures, state, selIdx)
        : { normal: [] as Path2D[], selected: [] as Path2D[] };
    const hasLand = landNormal.length > 0 || landSelected.length > 0;

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
    drawGrid(dayCtx, state, 'rgba(255,255,255,0.09)');
    if (hasLand) {
        dayCtx.lineWidth = 0.6;
        dayCtx.fillStyle = 'rgba(55,115,62,0.92)';
        dayCtx.strokeStyle = 'rgba(75,145,80,0.5)';
        for (const p of landNormal) { dayCtx.fill(p); dayCtx.stroke(p); }
        if (landSelected.length) {
            dayCtx.fillStyle = 'rgba(251,191,36,0.88)';
            dayCtx.strokeStyle = 'rgba(253,224,71,1)';
            dayCtx.lineWidth = 1.5;
            for (const p of landSelected) { dayCtx.fill(p); dayCtx.stroke(p); }
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
    drawGrid(nightCtx, state, 'rgba(99,179,237,0.055)');
    if (hasLand) {
        nightCtx.lineWidth = 0.6;
        nightCtx.fillStyle = 'rgba(10,28,16,0.97)';
        nightCtx.strokeStyle = 'rgba(20,50,25,0.5)';
        for (const p of landNormal) { nightCtx.fill(p); nightCtx.stroke(p); }
        if (landSelected.length) {
            nightCtx.fillStyle = 'rgba(92,56,7,0.95)';
            nightCtx.strokeStyle = 'rgba(202,138,4,0.9)';
            nightCtx.lineWidth = 1.5;
            for (const p of landSelected) { nightCtx.fill(p); nightCtx.stroke(p); }
        }
    } else if (geoFeatures.length) {
        drawLand(nightCtx, geoFeatures, state, { fillColor: 'rgba(10,28,16,0.97)', strokeColor: 'rgba(20,50,25,0.5)' });
    }
    drawCityLights(nightCtx, cityLights, state, { frame });
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
