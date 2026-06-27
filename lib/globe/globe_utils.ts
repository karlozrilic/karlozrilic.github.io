// Pure math/astronomy utilities — no DOM or canvas dependencies here.

export interface Visitor {
    city: string;
    flag: string;
    country: string;
    lat: number;
    lng: number;
    count: number;
    live: boolean;
    isUser?: boolean;
}

export interface CityLight {
    lat: number;
    lng: number;
}

/** A 3-element tuple [x, y, z] in 3D space. */
export type Vec3 = [number, number, number];

/** Result of projecting a world point onto the canvas. z > 0 means it faces the viewer. */
export interface Projected {
    sx: number;
    sy: number;
    z: number;
}

/** One polygon ring as an array of [lng, lat] pairs (TopoJSON convention). */
export type Ring = [number, number][];

export interface GeoFeature {
    id: number;
    name?: string;
    rings: Ring[];
}

export interface TopoJSON {
    transform: {
        scale: [number, number];
        translate: [number, number];
    };
    arcs: [number, number][][];
    objects: {
        countries: {
            geometries: TopoGeometry[];
        };
    };
}

/**
 * TopoJSON nesting (one level less than you might expect):
 *
 *   Polygon      → arcs: number[][]   (rings → arc indices)
 *   MultiPolygon → arcs: number[][][] (polygons → rings → arc indices)
 *
 * Negative arc indices mean the arc is reversed (TopoJSON spec).
 */
export interface TopoPolygon {
    type: "Polygon";
    id?: number | string;
    properties?: { name?: string };
    arcs: number[][];
}

export interface TopoMultiPolygon {
    type: "MultiPolygon";
    id?: number | string;
    properties?: { name?: string };
    arcs: number[][][];
}

export type TopoGeometry = TopoPolygon | TopoMultiPolygon;

export interface SolarPosition {
    sunLat: number;
    sunLng: number;
}

export interface PinPosition {
    visitor: Visitor;
    sx: number;
    sy: number;
    hitRadius: number;
    horizonAlpha: number;
}

export interface FlyState {
    active: boolean;
    t: number;
    fromOffsetY: number;
    fromRotX: number;
    toOffsetY: number;
    toRotX: number;
}

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

// Civil twilight band on either side of the terminator line
const TWILIGHT_HALF_BAND_DEG = 9.0;
const TWILIGHT_COS_OFFSET = Math.sin(TWILIGHT_HALF_BAND_DEG * DEG_TO_RAD);

// Greenwich Mean Sidereal Time in degrees — accurate to ~0.1°, good enough for a globe
export function getGMST(ms: number): number {
    const JD = ms / 86_400_000 + 2_440_587.5;
    const T = (JD - 2_451_545.0) / 36_525.0;
    const g = 280.460_618_37
        + 360.985_647_366_29 * (JD - 2_451_545.0)
        + 0.000_387_933 * T * T
        - (T * T * T) / 38_710_000;
    return ((g % 360) + 360) % 360;
}

// Sub-solar point — the lat/lng directly under the sun at a given time
export function getSolarPosition(ms: number): SolarPosition {
    const JD = ms / 86_400_000 + 2_440_587.5;
    const n = JD - 2_451_545.0;
    const L = (280.46 + 0.985_647_4 * n) % 360;
    const g = ((357.528 + 0.985_600_3 * n) % 360) * DEG_TO_RAD;
    const lam = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * DEG_TO_RAD;
    const eps = (23.439 - 0.000_000_4 * n) * DEG_TO_RAD;

    const sunLat = Math.asin(Math.sin(eps) * Math.sin(lam)) * RAD_TO_DEG;
    const RA = Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)) * RAD_TO_DEG;
    const sunLng = ((RA - getGMST(ms)) % 360 + 540) % 360 - 180;

    return { sunLat, sunLng };
}

// Base Y rotation so the prime meridian stays at its real sidereal position
export function getEarthRotY(ms: number): number {
    return -getGMST(ms) * DEG_TO_RAD;
}

// 1 = full daylight, 0 = full night, smoothed through a civil twilight band
export function getDaylightFactor(
    lat: number,
    lng: number,
    sunLat: number,
    sunLng: number,
): number {
    const cosAngle =
        Math.sin(lat * DEG_TO_RAD) * Math.sin(sunLat * DEG_TO_RAD) +
        Math.cos(lat * DEG_TO_RAD) *
            Math.cos(sunLat * DEG_TO_RAD) *
            Math.cos((lng - sunLng) * DEG_TO_RAD);

    return Math.max(0, Math.min(1, (cosAngle + TWILIGHT_COS_OFFSET) / (2 * TWILIGHT_COS_OFFSET)));
}

// Standard geographic → Cartesian mapping used throughout
export function latLngToVec3(lat: number, lng: number): Vec3 {
    const phi = (90 - lat) * DEG_TO_RAD;
    const theta = (lng + 180) * DEG_TO_RAD;
    return [
        -Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
    ];
}

// Y rotation then X rotation — the camera transform applied to every world point
export function applyRotation(vec: Vec3, rotY: number, rotX: number): Vec3 {
    const [x, y, z] = vec;
    const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
    const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
    const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
    return [x1, y2, z2];
}

export function projectLatLng(
    lat: number,
    lng: number,
    rotY: number,
    rotX: number,
    r: number,
    cx: number,
    cy: number,
): Projected {
    const [x, y, z] = applyRotation(latLngToVec3(lat, lng), rotY, rotX);
    return { sx: cx + x * r, sy: cy - y * r, z: z * r };
}

// Fades out smoothly as a point approaches the horizon so pins/lights don't pop
export function getHorizonAlpha(z: number, r: number): number {
    return Math.max(0, Math.min(1, (z / r - 0.04) / 0.10));
}

// Dividing by zoom means dragging at high zoom moves the globe less per pixel
export function getDragSensitivity(canvasSize: number, zoom: number): number {
    return (Math.PI / canvasSize) / zoom;
}

// Short-arc normalisation ensures we always spin the shorter way around
export function buildFlyState(
    targetLat: number,
    targetLng: number,
    currentOffsetY: number,
    currentRotX: number,
    earthBaseRotY: number,
): FlyState {
    const targetRY = -(targetLng + 90) * DEG_TO_RAD;
    let delta = targetRY - earthBaseRotY - currentOffsetY;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;

    const toOffsetY = currentOffsetY + delta;

    // Exact vertical centering: after the Y rotation the y-component is unchanged
    // and z1 is the forward depth; atan2(wy, z1) is the rotX that puts the city at cy.
    const [wx, wy, wz] = latLngToVec3(targetLat, targetLng);
    const z1 = -wx * Math.sin(targetRY) + wz * Math.cos(targetRY);
    const toRotX = Math.max(-1.3, Math.min(1.3, Math.atan2(wy, z1)));

    return {
        active: true,
        t: 0,
        fromOffsetY: currentOffsetY,
        fromRotX: currentRotX,
        toOffsetY,
        toRotX,
    };
}

export function stepFlyAnimation(
    state: FlyState,
    dt: number = 0.03,
): { offsetY: number; rotX: number; active: boolean } {
    const t = Math.min(1, state.t + dt);
    // Ease in-out quadratic
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    return {
        offsetY: state.fromOffsetY + (state.toOffsetY - state.fromOffsetY) * eased,
        rotX: state.fromRotX + (state.toRotX - state.fromRotX) * eased,
        active: t < 1,
    };
}

// Decodes one TopoJSON arc into [x, y] quantized points; negative index = reversed
function decodeArc(index: number, arcs: [number, number][][]): [number, number][] {
    const reversed = index < 0;
    const arc = arcs[reversed ? ~index : index];
    let x = 0, y = 0;
    const points = arc.map(([dx, dy]): [number, number] => {
        x += dx; y += dy;
        return [x, y];
    });
    if (reversed) points.reverse();
    return points;
}

function dequantize(
    point: [number, number],
    scale: [number, number],
    translate: [number, number],
): [number, number] {
    let lng = point[0] * scale[0] + translate[0];
    const lat = point[1] * scale[1] + translate[1];
    // Delta-accumulation in decodeArc can push lng past ±180° for arcs that
    // touch the antimeridian (e.g. Russia/Chukotka, Alaska, Kiribati).
    // Wrap back to [−180, 180] so bounding-box hit-testing is correct.
    if (lng > 180) lng -= 360;
    else if (lng < -180) lng += 360;
    return [lng, lat];
}

function decodeGeometry(
    geometry: TopoGeometry,
    arcs: [number, number][][],
    scale: [number, number],
    translate: [number, number],
): Ring[] {
    const decodeRing = (arcIndices: number[]): Ring =>
        arcIndices
        .flatMap(i => decodeArc(i, arcs))
        .map(pt => dequantize(pt, scale, translate));

    if (geometry.type === "Polygon") {
        return geometry.arcs.map(ring => decodeRing(ring));
    }

    return geometry.arcs.flatMap(polygon => polygon.map(ring => decodeRing(ring)));
}

// Returns an empty array on network failure so the globe renders without land outlines
export async function fetchGeoFeatures(): Promise<GeoFeature[]> {
    try {
        const response = await fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
        );
        const topo: TopoJSON = await response.json();
        const { scale, translate } = topo.transform;
        return topo.objects.countries.geometries.map(geometry => ({
            id: Number(geometry.id) || 0,
            name: geometry.properties?.name,
            rings: decodeGeometry(geometry, topo.arcs, scale, translate),
        }));
    } catch {
        return [];
    }
}

// Per-pixel night/day alpha mask — unprojecting each pixel back to world lat/lng
// and sampling getDaylightFactor. alpha=255 → night, alpha=0 → day.
export function buildTerminatorMask(
    resolution: number,
    rotY: number,
    rotX: number,
    globeRadius: number,
    sunLat: number,
    sunLng: number,
): ImageData {
    const size = resolution;
    const cx = size / 2;
    const cy = size / 2;
    const r = globeRadius;
    const r2 = r * r;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);

    const imageData = new ImageData(size, size);
    const data = imageData.data;

    for (let py = 0; py < size; py++) {
        for (let px = 0; px < size; px++) {
            const dx = px - cx, dy = py - cy;
            const idx = (py * size + px) * 4;

            const distSq = dx * dx + dy * dy;
            let xS: number, yS: number, zS: number;

            if (distSq > r2) {
                // Outside the disc. Project to the nearest limb point (z=0) so the
                // mask value here matches the value just inside the disc edge.
                // Bilinear interpolation during drawImage stretching then sees a
                // near-zero gradient at the boundary — no bleed, no hard cutoff.
                const dist = Math.sqrt(distSq);
                xS = dx / dist;
                yS = -dy / dist;
                zS = 0;
            } else {
                xS = dx / r;
                yS = -dy / r;
                const zSq = 1 - xS * xS - yS * yS;
                if (zSq < 0) { data[idx + 3] = 255; continue; }
                zS = Math.sqrt(zSq);
            }

            // Inverse X rotation
            const yW = yS * cosRX + zS * sinRX;
            const zW = -yS * sinRX + zS * cosRX;
            // Inverse Y rotation
            const xF = xS * cosRY - zW * sinRY;
            const zF = xS * sinRY + zW * cosRY;

            const lat = Math.asin(Math.max(-1, Math.min(1, yW))) * RAD_TO_DEG;
            const lng = Math.atan2(zF, -xF) * RAD_TO_DEG - 180;

            const df = getDaylightFactor(lat, lng, sunLat, sunLng);
            data[idx] = 0;
            data[idx + 1] = 0;
            data[idx + 2] = 0;
            data[idx + 3] = Math.round((1 - df) * 255);
        }
    }

    return imageData;
}

// Returns undefined if nothing is hit or the pin is too close to the limb to be readable
export function hitTestPins(
    mx: number,
    my: number,
    pins: PinPosition[],
    minAlpha: number = 0.3,
): PinPosition | undefined {
    for (const pin of pins) {
        if (pin.horizonAlpha < minAlpha) continue;
        const dx = mx - pin.sx, dy = my - pin.sy;
        if (dx * dx + dy * dy < pin.hitRadius * pin.hitRadius) return pin;
    }
    return undefined;
}

export function isInsideGlobe(
    mx: number,
    my: number,
    cx: number,
    cy: number,
    effectiveRadius: number,
): boolean {
    const dx = mx - cx, dy = my - cy;
    return dx * dx + dy * dy <= effectiveRadius * effectiveRadius;
}

// Unprojects a canvas point back to world lat/lng on the globe surface.
// Returns null if the point is outside the globe disc.
export function inverseProjectGlobe(
    mx: number, my: number,
    rotY: number, rotX: number,
    r: number, cx: number, cy: number,
): { lat: number; lng: number } | null {
    const x1 = (mx - cx) / r;
    const y2 = -(my - cy) / r;
    const d2 = x1 * x1 + y2 * y2;
    if (d2 > 1) return null;
    const z2 = Math.sqrt(1 - d2);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    const y = y2 * cosRX + z2 * sinRX;
    const z1 = -y2 * sinRX + z2 * cosRX;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const x = x1 * cosRY - z1 * sinRY;
    const z = x1 * sinRY + z1 * cosRY;
    const rawLng = Math.atan2(z, -x) * RAD_TO_DEG - 180;
    return {
        lat: Math.asin(Math.max(-1, Math.min(1, y))) * RAD_TO_DEG,
        lng: rawLng < -180 ? rawLng + 360 : rawLng,
    };
}

// Spherical great-circle crossing test.
//
// Every 2D lat/lng ray-casting approach breaks for countries that straddle the
// antimeridian (Russia, USA/Alaska, Kiribati) because their decoded ring
// coordinates span [−180°, 180°], making bounding-box rejection useless and
// edge-skip heuristics unreliable.
//
// This implementation works entirely in 3D unit-vector space:
//   • Cast an arc from click point P toward the north pole S = [0,1,0].
//     (South pole would land inside Antarctica and corrupt its crossing count.)
//   • For each polygon edge A→B (as a great-circle arc), count a crossing when
//     the arc P→S intersects the arc A→B.
//   • Crossing condition: A and B must straddle the plane(P,S), AND P and S
//     must straddle the plane(A,B).
//   • Latitude bounding-box pre-filter rejects features before trig work.
//
// There is no antimeridian in 3D — the algorithm is correct for any polygon.
// "Best match" = smallest lat/lng bounding-box area (prefers Iceland over Russia
// if both somehow qualify, which they won't with correct spherical math).

// Reusable per-click scratch buffers — avoids Float64Array allocation per ring.
let _vx: Float64Array = new Float64Array(0);
let _vy: Float64Array = new Float64Array(0);
let _vz: Float64Array = new Float64Array(0);
function _ensureVecBufs(n: number): void {
    if (_vx.length < n) { _vx = new Float64Array(n); _vy = new Float64Array(n); _vz = new Float64Array(n); }
}

export function hitTestCountry(lat: number, lng: number, features: GeoFeature[]): number | null {
    // Convert click to 3D unit vector (same convention as the renderer)
    const phi = (90 - lat) * DEG_TO_RAD;
    const theta = (lng + 180) * DEG_TO_RAD;
    const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi);
    const sinTheta = Math.sin(theta), cosTheta = Math.cos(theta);
    const px = -sinPhi * cosTheta;
    const py =  cosPhi;
    const pz =  sinPhi * sinTheta;

    // Reference point S = (0°N, 90°E) = [0, 0, −1] in 3D — open Indian Ocean.
    // Requirements: S must be (a) outside every country polygon and (b) non-meridional
    // relative to typical click points.
    //
    // Why not the poles?
    //   South pole → inside Antarctica → every click gives 1 spurious Antarctica crossing.
    //   North pole → arc P→S travels along P's exact meridian. For Pacific clicks near
    //   180°E the arc coincides with Russia's antimeridian polygon split, producing an
    //   odd crossing count (1 entry, no matching exit in the same sub-polygon) → false hit.
    //
    // (0°N, 90°E) is deep ocean (~3500 km from any land). The arc P→S travels diagonally
    // across the globe so it never coincides with any country's antimeridian boundary.
    //
    // n1 = P × [0, 0, −1]:
    //   [py·(−1) − pz·0,  pz·0 − px·(−1),  px·0 − py·0]  =  [−py, px, 0]
    const n1x = -py, n1y = px; // n1z = 0 always

    let bestIdx: number | null = null;
    let bestArea = Infinity;

    for (let fi = 0; fi < features.length; fi++) {
        // ── Pass 1: bounding box (no trig) ──────────────────────────────────
        // A point inside a polygon is always within its bounding box.
        // Rejecting on latitude alone is antimeridian-safe and eliminates Antarctica
        // (maxLat ≈ −60°) for any click in the Northern Hemisphere.
        let fMinLat = Infinity, fMaxLat = -Infinity;
        let fMinLng = Infinity, fMaxLng = -Infinity;
        for (const ring of features[fi].rings) {
            for (const pt of ring) {
                if (pt[1] < fMinLat) fMinLat = pt[1];
                if (pt[1] > fMaxLat) fMaxLat = pt[1];
                if (pt[0] < fMinLng) fMinLng = pt[0];
                if (pt[0] > fMaxLng) fMaxLng = pt[0];
            }
        }
        if (lat < fMinLat || lat > fMaxLat) continue; // definitively outside

        // ── Pass 2: spherical great-circle crossing count ────────────────────
        // Cast arc P→S and count how many polygon edges (as great-circle arcs) it crosses.
        // Entirely antimeridian-safe — no lat/lng arithmetic in the inner loop.
        let crossings = 0;
        for (const ring of features[fi].rings) {
            const n = ring.length;
            if (n < 3) continue;
            _ensureVecBufs(n);

            for (let k = 0; k < n; k++) {
                const p2 = (90 - ring[k][1]) * DEG_TO_RAD;
                const t2 = (ring[k][0] + 180) * DEG_TO_RAD;
                const sp2 = Math.sin(p2), cp2 = Math.cos(p2);
                _vx[k] = -sp2 * Math.cos(t2);
                _vy[k] =  cp2;
                _vz[k] =  sp2 * Math.sin(t2);
            }

            for (let i = 0, j = n - 1; i < n; j = i++) {
                const ax = _vx[j], ay = _vy[j], az = _vz[j];
                const bx = _vx[i], by = _vy[i], bz = _vz[i];
                // Condition 1: A and B straddle the plane(P, S)
                const d1a = n1x * ax + n1y * ay; // n1 = [−py, px, 0]  (n1z = 0)
                const d1b = n1x * bx + n1y * by;
                if (d1a * d1b >= 0) continue;
                // Condition 2: P and S straddle the plane(A, B)
                const n2x = ay * bz - az * by;
                const n2y = az * bx - ax * bz;
                const n2z = ax * by - ay * bx; // n2·S = −n2z  (S = [0,0,−1])
                if ((n2x * px + n2y * py + n2z * pz) * (-n2z) < 0) crossings++;
            }
        }

        if (crossings % 2 !== 1) continue;
        const area = (fMaxLat - fMinLat) * (fMaxLng - fMinLng);
        if (area < bestArea) { bestArea = area; bestIdx = fi; }
    }

    return bestIdx;
}