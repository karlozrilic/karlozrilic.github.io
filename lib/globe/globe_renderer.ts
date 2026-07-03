import type { Visitor, PinPosition, Vec3 } from '@/lib/globe/globe_utils';
import { applyRotation, latLngToVec3, projectLatLng, getHorizonAlpha } from '@/lib/globe/globe_utils';

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

export interface DrawPinsOptions {
    frame: number;
    onPinRendered: (pin: PinPosition) => void;
}

// 3D unit vectors per polygon vertex, built once when geo data arrives.
// Per-frame cost is just rotation (8 mults + 6 adds) instead of latLngToVec3 trig.
export interface PrecomputedRing {
    vecs: Float32Array;     // [x,y,z, x,y,z, ...] one triple per vertex
    centroid: Float32Array; // unit vector used for back-face culling
    coneSin: number;        // sin of bounding half-angle; cull when centroid_z + coneSin < 0
}
export interface PrecomputedFeature {
    rings: PrecomputedRing[];
}

export interface PrecomputedGrid {
    lines: Float32Array[];
}

export function buildPrecomputedGrid(): PrecomputedGrid {
    const degToRad = Math.PI / 180;
    const lines: Float32Array[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
        const pts: number[] = [];
        for (let lng = -180; lng <= 180; lng += 4) {
            const phi = (90 - lat) * degToRad, theta = (lng + 180) * degToRad;
            const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi), sinTheta = Math.sin(theta), cosTheta = Math.cos(theta);
            pts.push(-sinPhi * cosTheta, cosPhi, sinPhi * sinTheta);
        }
        lines.push(new Float32Array(pts));
    }
    for (let lng = -180; lng <= 180; lng += 20) {
        const pts: number[] = [];
        for (let lat = -88; lat <= 88; lat += 4) {
            const phi = (90 - lat) * degToRad, theta = (lng + 180) * degToRad;
            const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi), sinTheta = Math.sin(theta), cosTheta = Math.cos(theta);
            pts.push(-sinPhi * cosTheta, cosPhi, sinPhi * sinTheta);
        }
        lines.push(new Float32Array(pts));
    }
    return { lines };
}

// Per-light data built once — only rotation and sun dot-product vary per frame.
export interface PrecomputedLight {
    vx: number; vy: number; vz: number;
    dotSize: number;
    color: string; // '255,195,85' warm or '195,210,255' cool
}

export function buildPrecomputedLights(lights: { lat: number; lng: number; s?: number }[]): PrecomputedLight[] {
    const degToRad = Math.PI / 180;
    return lights.map(({ lat, lng, s: size }) => {
        const phi = (90 - lat) * degToRad, theta = (lng + 180) * degToRad;
        const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi), sinTheta = Math.sin(theta), cosTheta = Math.cos(theta);
        const fuzz = Math.sin(lat * 53.1 + lng * 47.3) * 0.5 + 0.5;
        const warm = Math.sin(lat * 17.3 + lng * 31.7) * 0.5 + 0.5;
        const green = Math.round(155 + warm * 55);
        const blue = Math.round(30 + warm * 70);
        return {
            vx: -sinPhi * cosTheta, vy: cosPhi, vz: sinPhi * sinTheta,
            dotSize: size !== undefined ? 0.12 + size * 0.83 : 0.18 + 0.22 * fuzz,
            color: `255,${green},${blue}`,
        };
    });
}

// Reusable scratch buffers for projected vertices — avoids TypedArray allocation per ring.
let _sx: Float32Array = new Float32Array(0);
let _sy: Float32Array = new Float32Array(0);
let _sz: Float32Array = new Float32Array(0);
function ensureProjectionBuffers(count: number): void {
    if (_sx.length < count) { _sx = new Float32Array(count); _sy = new Float32Array(count); _sz = new Float32Array(count); }
}

const DEDUP_SQ = 0.25;    // (0.5 px)² skip lineTo when movement is sub-pixel
const DEDUP_SQ_SEL = 16;  // (4 px)² coarser for selected fill, fewer draw commands

// Builds one Path2D for all land rings and one for the selected country.
// Back-face culling skips ~50% of rings. Sub-pixel vertex dedup trims the rest.
// Limb crossings are arced along the globe edge to avoid polygon winding artifacts.
export function buildLandPaths(
    features: PrecomputedFeature[],
    state: GlobeRenderState,
    selectedIdx = -1,
    selOnly = false,
): { normal: Path2D; selected: Path2D } {
    const { rotY, rotX, effectiveRadius: radius, canvasCX: cx, canvasCY: cy } = state;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);

    const normalPath = new Path2D();
    const selectedPath = new Path2D();

    for (let featIdx = 0; featIdx < features.length; featIdx++) {
        if (selOnly && featIdx !== selectedIdx) continue;
        const isSelected = featIdx === selectedIdx;
        const target = isSelected ? selectedPath : normalPath;
        const dedupSq = isSelected ? DEDUP_SQ_SEL : DEDUP_SQ;

        for (const { vecs, centroid, coneSin } of features[featIdx].rings) {
            // rotate centroid, check z — if entire bounding cone faces away, skip ring
            const centX = centroid[0], centY = centroid[1], centZ = centroid[2];
            const centZRotY = -centX * sinRY + centZ * cosRY;
            const centZRotX = centY * sinRX + centZRotY * cosRX;
            if (centZRotX + coneSin < 0) continue;

            const count = vecs.length / 3;
            if (count < 3) continue;
            ensureProjectionBuffers(count);

            for (let i = 0; i < count; i++) {
                const vecBase = i * 3;
                const rawX = vecs[vecBase], rawY = vecs[vecBase + 1], rawZ = vecs[vecBase + 2];
                const xRotY = rawX * cosRY + rawZ * sinRY;
                const zRotY = -rawX * sinRY + rawZ * cosRY;
                const yRotX = rawY * cosRX - zRotY * sinRX;
                const cameraDepth = rawY * sinRX + zRotY * cosRX;
                _sx[i] = cx + xRotY * radius;
                _sy[i] = cy - yRotX * radius;
                _sz[i] = cameraDepth;
            }

            let started = false;
            let exitAngle = NaN;
            let firstIsLimb = false, firstAngle = 0;
            let lastIsLimb = false, lastAngle = 0;
            let lastX = 0, lastY = 0;

            for (let i = 0; i < count; i++) {
                const screenX = _sx[i], screenY = _sy[i], cameraZ = _sz[i];
                const nextIdx = (i + 1) % count;
                const nextCameraZ = _sz[nextIdx];

                if (cameraZ > 0) {
                    if (!started) {
                        target.moveTo(screenX, screenY);
                        lastX = screenX; lastY = screenY;
                        started = true;
                    } else {
                        const deltaX = screenX - lastX, deltaY = screenY - lastY;
                        if (deltaX * deltaX + deltaY * deltaY >= dedupSq) {
                            target.lineTo(screenX, screenY);
                            lastX = screenX; lastY = screenY;
                        }
                    }
                    lastIsLimb = false;
                    if (nextCameraZ <= 0) {
                        // front→back: draw the limb exit point
                        const blend = cameraZ / (cameraZ - nextCameraZ);
                        const limbX = screenX + blend * (_sx[nextIdx] - screenX);
                        const limbY = screenY + blend * (_sy[nextIdx] - screenY);
                        target.lineTo(limbX, limbY);
                        exitAngle = Math.atan2(limbY - cy, limbX - cx);
                        lastIsLimb = true; lastAngle = exitAngle;
                        lastX = limbX; lastY = limbY;
                    }
                } else if (nextCameraZ > 0) {
                    // back→front: draw limb entry point
                    const blend = cameraZ / (cameraZ - nextCameraZ);
                    const limbX = screenX + blend * (_sx[nextIdx] - screenX);
                    const limbY = screenY + blend * (_sy[nextIdx] - screenY);
                    const entryAngle = Math.atan2(limbY - cy, limbX - cx);
                    if (!isNaN(exitAngle)) {
                        let diff = entryAngle - exitAngle;
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;
                        target.arc(cx, cy, radius, exitAngle, entryAngle, diff < 0);
                        exitAngle = NaN; lastIsLimb = false;
                        lastX = cx + Math.cos(entryAngle) * radius;
                        lastY = cy + Math.sin(entryAngle) * radius;
                    } else if (!started) {
                        target.moveTo(limbX, limbY);
                        lastX = limbX; lastY = limbY;
                        started = true;
                        firstIsLimb = true; firstAngle = entryAngle; lastIsLimb = false;
                    } else {
                        target.lineTo(limbX, limbY);
                        lastX = limbX; lastY = limbY;
                        lastIsLimb = false;
                    }
                }
            }

            if (!started) continue;
            if (lastIsLimb && firstIsLimb) {
                let diff = firstAngle - lastAngle;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                target.arc(cx, cy, radius, lastAngle, firstAngle, diff < 0);
            }
            target.closePath();
        }
    }

    return { normal: normalPath, selected: selectedPath };
}

export function drawVisitorPins(
    ctx: CanvasRenderingContext2D,
    visitors: Visitor[],
    state: GlobeRenderState,
    options: DrawPinsOptions,
): void {
    const { rotY, rotX, effectiveRadius: radius, canvasCX: cx, canvasCY: cy } = state;
    const pulse = Math.sin(options.frame * 0.05) * 0.5 + 0.5;

    visitors.forEach(visitor => {
        const proj = projectLatLng(visitor.lat, visitor.lng, rotY, rotX, radius, cx, cy);
        const alpha = getHorizonAlpha(proj.z, radius);
        if (alpha <= 0) return;

        const isUser = !!visitor.isUser;
        const pinColor = isUser ? '#68D391' : (visitor.live ? '#63B3ED' : '#F6AD55');
        const dotRadius = Math.max(isUser ? 4 : 3, Math.min(isUser ? 7 : 6, (isUser ? 3 : 2.5) + Math.log2(visitor.count + 1)));

        // spike tip points outward along the surface normal
        const normal = applyRotation(latLngToVec3(visitor.lat, visitor.lng), rotY, rotX) as Vec3;
        const spikeLen = dotRadius * 2.2;
        const tipX = proj.sx + normal[0] * spikeLen;
        const tipY = proj.sy - normal[1] * spikeLen;

        ctx.globalAlpha = alpha;

        if (isUser) {
            ctx.beginPath();
            ctx.arc(tipX, tipY, dotRadius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(104,211,145,0.45)';
            ctx.lineWidth = 1;
            ctx.stroke();
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
        ctx.moveTo(proj.sx, proj.sy);
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

        options.onPinRendered({ visitor, sx: tipX, sy: tipY, hitRadius: dotRadius + 10, horizonAlpha: alpha });
    });
}
