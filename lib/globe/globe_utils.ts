// Pure math / astronomy — no DOM or canvas dependencies.

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
    s?: number; // relative size 0–1; omit for small fill dots
}

export type Vec3 = [number, number, number];

export interface Projected {
    sx: number;
    sy: number;
    z: number;
}

export type Ring = [number, number][]; // [lng, lat] pairs (TopoJSON convention)

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

// TopoJSON polygon nesting:
//   Polygon      → arcs: number[][]   (rings → arc indices)
//   MultiPolygon → arcs: number[][][] (polygons → rings → arc indices)
// Negative arc indices mean the arc is reversed.
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
// Full rotation in ~42 s — visually interesting without being dizzying
export const SPIN_SPEED_RAD_S = -0.15;

const TWILIGHT_HALF_BAND_DEG = 9.0;
const TWILIGHT_COS_OFFSET = Math.sin(TWILIGHT_HALF_BAND_DEG * DEG_TO_RAD);

// Greenwich Mean Sidereal Time in degrees — accurate to ~0.1°, good enough for a globe
export function getGMST(ms: number): number {
    const JD = ms / 86_400_000 + 2_440_587.5;
    const julianCenturies = (JD - 2_451_545.0) / 36_525.0;
    const gmstDegrees = 280.460_618_37
        + 360.985_647_366_29 * (JD - 2_451_545.0)
        + 0.000_387_933 * julianCenturies * julianCenturies
        - (julianCenturies * julianCenturies * julianCenturies) / 38_710_000;
    return ((gmstDegrees % 360) + 360) % 360;
}

// Sub-solar point — the lat/lng directly under the sun at a given timestamp
export function getSolarPosition(ms: number): SolarPosition {
    const JD = ms / 86_400_000 + 2_440_587.5;
    const daysSinceJ2000 = JD - 2_451_545.0;
    const sunMeanLong = (280.46 + 0.985_647_4 * daysSinceJ2000) % 360;
    const sunMeanAnomaly = ((357.528 + 0.985_600_3 * daysSinceJ2000) % 360) * DEG_TO_RAD;
    const eclipticLng = (sunMeanLong + 1.915 * Math.sin(sunMeanAnomaly) + 0.02 * Math.sin(2 * sunMeanAnomaly)) * DEG_TO_RAD;
    const obliquity = (23.439 - 0.000_000_4 * daysSinceJ2000) * DEG_TO_RAD;

    const sunLat = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLng)) * RAD_TO_DEG;
    const rightAscension = Math.atan2(Math.cos(obliquity) * Math.sin(eclipticLng), Math.cos(eclipticLng)) * RAD_TO_DEG;
    const sunLng = ((rightAscension - getGMST(ms)) % 360 + 540) % 360 - 180;

    return { sunLat, sunLng };
}

// Base Y rotation matching the prime meridian's real sidereal position
export function getEarthRotY(ms: number): number {
    return -getGMST(ms) * DEG_TO_RAD;
}

// 1 = full daylight, 0 = full night, smoothed through a civil twilight band
export function getDaylightFactor(lat: number, lng: number, sunLat: number, sunLng: number): number {
    const cosAngle =
        Math.sin(lat * DEG_TO_RAD) * Math.sin(sunLat * DEG_TO_RAD) +
        Math.cos(lat * DEG_TO_RAD) * Math.cos(sunLat * DEG_TO_RAD) * Math.cos((lng - sunLng) * DEG_TO_RAD);
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

// Y rotation then X rotation — same camera transform applied to every world point
export function applyRotation(vec: Vec3, rotY: number, rotX: number): Vec3 {
    const [vecX, vecY, vecZ] = vec;
    const xAfterRotY = vecX * Math.cos(rotY) + vecZ * Math.sin(rotY);
    const zAfterRotY = -vecX * Math.sin(rotY) + vecZ * Math.cos(rotY);
    const yAfterRotX = vecY * Math.cos(rotX) - zAfterRotY * Math.sin(rotX);
    const zAfterRotX = vecY * Math.sin(rotX) + zAfterRotY * Math.cos(rotX);
    return [xAfterRotY, yAfterRotX, zAfterRotX];
}

export function projectLatLng(
    lat: number, lng: number,
    rotY: number, rotX: number,
    radius: number, cx: number, cy: number,
): Projected {
    const [vecX, vecY, vecZ] = applyRotation(latLngToVec3(lat, lng), rotY, rotX);
    return { sx: cx + vecX * radius, sy: cy - vecY * radius, z: vecZ * radius };
}

// Fades out as a point approaches the horizon so pins don't pop in/out
export function getHorizonAlpha(cameraZ: number, radius: number): number {
    return Math.max(0, Math.min(1, (cameraZ / radius - 0.04) / 0.10));
}

// Dividing by zoom means dragging at high zoom moves the globe less per pixel
export function getDragSensitivity(canvasSize: number, zoom: number): number {
    return (Math.PI / canvasSize) / zoom;
}

// Short-arc normalisation so we always fly the shorter way around the globe
export function buildFlyState(
    targetLat: number,
    targetLng: number,
    currentOffsetY: number,
    currentRotX: number,
    earthBaseRotY: number,
): FlyState {
    const targetRY = -(targetLng + 90) * DEG_TO_RAD;
    let delta = targetRY - earthBaseRotY - currentOffsetY;
    while (delta >  Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;

    const toOffsetY = currentOffsetY + delta;

    // rotX that vertically centres the target city after the Y rotation
    const [targetVecX, targetVecY, targetVecZ] = latLngToVec3(targetLat, targetLng);
    const zAfterRotY = -targetVecX * Math.sin(targetRY) + targetVecZ * Math.cos(targetRY);
    const toRotX = Math.max(-1.3, Math.min(1.3, Math.atan2(targetVecY, zAfterRotY)));

    return { active: true, t: 0, fromOffsetY: currentOffsetY, fromRotX: currentRotX, toOffsetY, toRotX };
}

export function stepFlyAnimation(state: FlyState, dt = 0.03): { offsetY: number; rotX: number; active: boolean } {
    const progress = Math.min(1, state.t + dt);
    const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress; // ease in-out quadratic
    return {
        offsetY: state.fromOffsetY + (state.toOffsetY - state.fromOffsetY) * eased,
        rotX:    state.fromRotX   + (state.toRotX   - state.fromRotX)   * eased,
        active: progress < 1,
    };
}

// Decodes one TopoJSON arc into [lng, lat] quantized points; negative index = reversed
function decodeArc(index: number, arcs: [number, number][][]): [number, number][] {
    const reversed = index < 0;
    const arc = arcs[reversed ? ~index : index];
    let accX = 0, accY = 0;
    const points = arc.map(([dx, dy]): [number, number] => {
        accX += dx; accY += dy;
        return [accX, accY];
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
    // Wrap back to [−180, 180] — delta accumulation can push antimeridian arcs past ±180°
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
        arcIndices.flatMap(i => decodeArc(i, arcs)).map(pt => dequantize(pt, scale, translate));

    if (geometry.type === "Polygon") return geometry.arcs.map(ring => decodeRing(ring));
    return geometry.arcs.flatMap(polygon => polygon.map(ring => decodeRing(ring)));
}

// Returns [] on network failure so the globe renders without land outlines
export async function fetchGeoFeatures(): Promise<GeoFeature[]> {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json');
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

export function hitTestPins(mx: number, my: number, pins: PinPosition[], minAlpha = 0.3): PinPosition | undefined {
    for (const pin of pins) {
        if (pin.horizonAlpha < minAlpha) continue;
        const distX = mx - pin.sx, distY = my - pin.sy;
        if (distX * distX + distY * distY < pin.hitRadius * pin.hitRadius) return pin;
    }
    return undefined;
}

export function isInsideGlobe(mx: number, my: number, cx: number, cy: number, radius: number): boolean {
    const distX = mx - cx, distY = my - cy;
    return distX * distX + distY * distY <= radius * radius;
}

// Unprojects a canvas point back to lat/lng on the globe surface; null if outside the disc
export function inverseProjectGlobe(
    mx: number, my: number,
    rotY: number, rotX: number,
    radius: number, cx: number, cy: number,
): { lat: number; lng: number } | null {
    const normX = (mx - cx) / radius;
    const normY = -(my - cy) / radius;
    const distSq = normX * normX + normY * normY;
    if (distSq > 1) return null;
    const sphereZ = Math.sqrt(1 - distSq);
    const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
    const worldY = normY * cosRX + sphereZ * sinRX;
    const rotatedZ = -normY * sinRX + sphereZ * cosRX;
    const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
    const worldX = normX * cosRY - rotatedZ * sinRY;
    const worldZ = normX * sinRY + rotatedZ * cosRY;
    const rawLng = Math.atan2(worldZ, -worldX) * RAD_TO_DEG - 180;
    return {
        lat: Math.asin(Math.max(-1, Math.min(1, worldY))) * RAD_TO_DEG,
        lng: rawLng < -180 ? rawLng + 360 : rawLng,
    };
}

// Spherical great-circle crossing test — handles antimeridian countries (Russia, Alaska, Kiribati)
// that break 2D lat/lng ray-casting. Works in 3D unit-vector space so there is no antimeridian.
// Casts an arc from P toward (0°N, 90°E) — open Indian Ocean, never inside a country polygon —
// and counts how many polygon edges (as great-circle arcs) it crosses. Odd count = inside.
// Reference (0°N, 90°E) avoids the poles: south pole is inside Antarctica (wrong count),
// north pole causes the arc to coincide with antimeridian splits near 180°E (spurious crossing).

// Per-click scratch buffers — avoids Float64Array allocation per ring
let _vx: Float64Array = new Float64Array(0);
let _vy: Float64Array = new Float64Array(0);
let _vz: Float64Array = new Float64Array(0);
function ensureVecBufs(size: number): void {
    if (_vx.length < size) { _vx = new Float64Array(size); _vy = new Float64Array(size); _vz = new Float64Array(size); }
}

export function hitTestCountry(lat: number, lng: number, features: GeoFeature[]): number | null {
    const phi = (90 - lat) * DEG_TO_RAD, theta = (lng + 180) * DEG_TO_RAD;
    const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi);
    const testX = -sinPhi * Math.cos(theta);
    const testY = cosPhi;
    const testZ = sinPhi * Math.sin(theta);

    // half-plane normal: testPoint × [0, 0, −1] = [−testY, testX, 0]
    const planeNormX = -testY, planeNormY = testX;

    let bestIdx: number | null = null;
    let bestArea = Infinity;

    for (let featIdx = 0; featIdx < features.length; featIdx++) {
        // lat bounding box pre-filter — fast, no trig, antimeridian-safe
        let fMinLat = Infinity, fMaxLat = -Infinity;
        let fMinLng = Infinity, fMaxLng = -Infinity;
        for (const ring of features[featIdx].rings) {
            for (const pt of ring) {
                if (pt[1] < fMinLat) fMinLat = pt[1];
                if (pt[1] > fMaxLat) fMaxLat = pt[1];
                if (pt[0] < fMinLng) fMinLng = pt[0];
                if (pt[0] > fMaxLng) fMaxLng = pt[0];
            }
        }
        if (lat < fMinLat || lat > fMaxLat) continue;

        // 3D great-circle crossing count
        let crossings = 0;
        for (const ring of features[featIdx].rings) {
            const ringLen = ring.length;
            if (ringLen < 3) continue;
            ensureVecBufs(ringLen);

            for (let k = 0; k < ringLen; k++) {
                const vertPolar = (90 - ring[k][1]) * DEG_TO_RAD;
                const vertAzimuth = (ring[k][0] + 180) * DEG_TO_RAD;
                const sinPolar = Math.sin(vertPolar), cosPolar = Math.cos(vertPolar);
                _vx[k] = -sinPolar * Math.cos(vertAzimuth);
                _vy[k] = cosPolar;
                _vz[k] = sinPolar * Math.sin(vertAzimuth);
            }

            for (let i = 0, j = ringLen - 1; i < ringLen; j = i++) {
                const prevX = _vx[j], prevY = _vy[j], prevZ = _vz[j];
                const currX = _vx[i], currY = _vy[i], currZ = _vz[i];
                const dotEdgeA = planeNormX * prevX + planeNormY * prevY;
                const dotEdgeB = planeNormX * currX + planeNormY * currY;
                if (dotEdgeA * dotEdgeB >= 0) continue;
                const crossX = prevY * currZ - prevZ * currY;
                const crossY = prevZ * currX - prevX * currZ;
                const crossZ = prevX * currY - prevY * currX;
                if ((crossX * testX + crossY * testY + crossZ * testZ) * (-crossZ) < 0) crossings++;
            }
        }

        if (crossings % 2 !== 1) continue;
        const area = (fMaxLat - fMinLat) * (fMaxLng - fMinLng);
        if (area < bestArea) { bestArea = area; bestIdx = featIdx; }
    }

    return bestIdx;
}
