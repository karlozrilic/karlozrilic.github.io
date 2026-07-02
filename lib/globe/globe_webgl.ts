// WebGL2 globe renderer — runs inside the render worker.
// Per-frame cost: 4 uniform uploads + 4 drawArrays calls. No Path2D, no per-frame allocation.

import type { GeoFeature } from './globe_utils';
import type { PrecomputedFeature, PrecomputedGrid, PrecomputedLight } from './globe_renderer';

const SPHERE_VERT = `#version 300 es
in vec3 a_pos;
in vec2 a_uv;
uniform mat4 u_rot;
uniform mat4 u_proj;
out vec3 v_world;
out vec2 v_uv;
out float v_camZ;
void main() {
    v_world = a_pos;
    v_uv = a_uv;
    vec4 c = u_rot * vec4(a_pos, 1.0);
    v_camZ = c.z;
    gl_Position = u_proj * c;
}`;

// Day/night blend in a single pass
const SPHERE_FRAG = `#version 300 es
precision mediump float;
in vec3 v_world;
in vec2 v_uv;
in float v_camZ;
uniform sampler2D u_land;
uniform vec3 u_sun;
out vec4 fragColor;
const float TW = 0.15643; // sin(9°) twilight half-band
void main() {
    if (v_camZ < 0.0) discard;
    float day = clamp((dot(v_world, u_sun) + TW) / (2.0 * TW), 0.0, 1.0);
    float h = v_world.y * 0.5 + 0.5;
    vec3 dayOcean   = mix(vec3(0.063, 0.502, 0.941), vec3(0.039, 0.314, 0.729), h);
    vec3 nightOcean = mix(vec3(0.035, 0.082, 0.122), vec3(0.016, 0.055, 0.082), h);
    vec3 dayLand    = vec3(0.216, 0.451, 0.243);
    vec3 nightLand  = vec3(0.039, 0.110, 0.063);
    float land = texture(u_land, v_uv).a;
    vec3 dc = mix(dayOcean, dayLand, land);
    vec3 nc = mix(nightOcean, nightLand, land);
    float limb = v_camZ;
    fragColor = vec4(mix(nc, dc, day) * (0.75 + 0.25 * limb), 1.0);
}`;

// Shared vert for borders and grid.
// u_zOff nudges geometry in front of the sphere surface to avoid z-fighting.
const LINE_VERT = `#version 300 es
in vec3 a_pos;
uniform mat4 u_rot;
uniform mat4 u_proj;
uniform float u_zOff;
out float v_camZ;
void main() {
    vec4 c = u_rot * vec4(a_pos, 1.0);
    v_camZ = c.z;
    c.z += u_zOff;
    gl_Position = u_proj * c;
}`;

const LINE_FRAG = `#version 300 es
precision lowp float;
in float v_camZ;
uniform vec4 u_color;
out vec4 fragColor;
void main() {
    if (v_camZ < 0.0) discard;
    fragColor = u_color;
}`;

// City lights as gl.POINTS — visibility and day/night entirely in the vertex shader
const POINTS_VERT = `#version 300 es
in vec3 a_pos;
in float a_size;
in vec3 a_col;
uniform mat4 u_rot;
uniform mat4 u_proj;
uniform vec3 u_sun;
uniform float u_twinkle;
uniform float u_scale;
out vec3 v_col;
out float v_alpha;
const float TW = 0.15643;
void main() {
    vec4 c = u_rot * vec4(a_pos, 1.0);
    float hz = clamp((c.z - 0.04) / 0.1, 0.0, 1.0);
    float df = clamp((dot(a_pos, u_sun) + TW) / (2.0 * TW), 0.0, 1.0);
    float alpha = hz * (1.0 - df) * (0.55 + u_twinkle * 0.15);
    if (alpha < 0.02 || c.z < 0.0) {
        gl_PointSize = 0.0; v_alpha = 0.0; v_col = vec3(0.0);
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        return;
    }
    c.z += 0.015;
    gl_Position = u_proj * c;
    gl_PointSize = clamp(a_size * u_scale * 0.025, 1.5, 16.0);
    v_col = a_col; v_alpha = alpha;
}`;

// Gaussian glow — with additive blending overlapping halos accumulate into bright hotspots
const POINTS_FRAG = `#version 300 es
precision mediump float;
in vec3 v_col;
in float v_alpha;
out vec4 fragColor;
void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = v_alpha * exp(-d * d * 2.8);
    if (a < 0.006) discard;
    fragColor = vec4(v_col, a);
}`;

// Orthographic projection matching sx = cx + x*r, sy = cy - y*r
function buildOrtho(r: number, cx: number, cy: number, w: number, h: number): Float32Array {
    const sx = 2 * r / w, sy = 2 * r / h;
    return new Float32Array([
        sx, 0,   0,    0,
        0,  sy,  0,    0,
        0,  0,  -0.5,  0,
        2 * cx / w - 1, 1 - 2 * cy / h, 0, 1,
    ]);
}

// Combined rotY then rotX — same convention as applyRotation() in globe_utils
function buildRotMat(rotY: number, rotX: number): Float32Array {
    const cy = Math.cos(rotY), sy = Math.sin(rotY);
    const cx = Math.cos(rotX), sx = Math.sin(rotX);
    return new Float32Array([
        cy,      sx * sy,  -cx * sy, 0,
        0,       cx,        sx,      0,
        sy,     -sx * cy,   cx * cy, 0,
        0,       0,         0,       1,
    ]);
}

function buildSunVec(sunLat: number, sunLng: number): Float32Array {
    const D = Math.PI / 180;
    const phi = (90 - sunLat) * D, theta = (sunLng + 180) * D;
    const sp = Math.sin(phi), cp = Math.cos(phi);
    return new Float32Array([-sp * Math.cos(theta), cp, sp * Math.sin(theta)]);
}

function buildSphere(lngSegs: number, latSegs: number): { verts: Float32Array; idx: Uint16Array } {
    const D = Math.PI / 180;
    const verts: number[] = [];
    const idx: number[] = [];
    for (let li = 0; li <= latSegs; li++) {
        const lat = 90 - li * 180 / latSegs;
        const phi = (90 - lat) * D;
        const sp = Math.sin(phi), cp = Math.cos(phi);
        const v = li / latSegs;
        for (let gi = 0; gi <= lngSegs; gi++) {
            const lng = -180 + gi * 360 / lngSegs;
            const theta = (lng + 180) * D;
            const st = Math.sin(theta), ct = Math.cos(theta);
            verts.push(-sp * ct, cp, sp * st, gi / lngSegs, v);
        }
    }
    for (let li = 0; li < latSegs; li++) {
        for (let gi = 0; gi < lngSegs; gi++) {
            const a = li * (lngSegs + 1) + gi, b = a + lngSegs + 1;
            idx.push(a, b, a + 1, b, b + 1, a + 1);
        }
    }
    return { verts: new Float32Array(verts), idx: new Uint16Array(idx) };
}

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        throw new Error(`Shader: ${gl.getShaderInfoLog(s)}`);
    return s;
}

function makeProgram(gl: WebGL2RenderingContext, vert: string, frag: string): WebGLProgram {
    const p = gl.createProgram()!;
    gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vert));
    gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS))
        throw new Error(`Program: ${gl.getProgramInfoLog(p)}`);
    return p;
}

function loc(gl: WebGL2RenderingContext, p: WebGLProgram, n: string): WebGLUniformLocation {
    return gl.getUniformLocation(p, n)!;
}

export interface WebGLGlobeState {
    gl: WebGL2RenderingContext;
    w: number; h: number;
    sphereProg: WebGLProgram; sphereVAO: WebGLVertexArrayObject; sphereIdxBuf: WebGLBuffer; sphereIdxCount: number;
    lineProg: WebGLProgram;
    ptsProg: WebGLProgram;
    landTex: WebGLTexture | null;
    borderBuf: WebGLBuffer | null; borderCount: number;
    gridBuf: WebGLBuffer | null; gridCount: number;
    lightBuf: WebGLBuffer | null; lightCount: number;
    uSphere: { rot: WebGLUniformLocation; proj: WebGLUniformLocation; sun: WebGLUniformLocation; land: WebGLUniformLocation };
    uLine: { rot: WebGLUniformLocation; proj: WebGLUniformLocation; zOff: WebGLUniformLocation; color: WebGLUniformLocation };
    uPts: { rot: WebGLUniformLocation; proj: WebGLUniformLocation; sun: WebGLUniformLocation; twinkle: WebGLUniformLocation; scale: WebGLUniformLocation };
    aLine: number; aPts: number; aPtsSize: number; aPtsCol: number;
}

export function initWebGL(canvas: OffscreenCanvas, w: number, h: number): WebGLGlobeState | null {
    const gl = canvas.getContext('webgl2', {
        antialias: true, alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null;
    if (!gl) return null;

    gl.viewport(0, 0, w, h);
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const sphereProg = makeProgram(gl, SPHERE_VERT, SPHERE_FRAG);
    const lineProg   = makeProgram(gl, LINE_VERT,   LINE_FRAG);
    const ptsProg    = makeProgram(gl, POINTS_VERT,  POINTS_FRAG);

    // sphere VAO — static, never rebuilt
    const { verts, idx } = buildSphere(64, 32);
    const sphereVAO = gl.createVertexArray()!;
    gl.bindVertexArray(sphereVAO);

    const vbuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPosS = gl.getAttribLocation(sphereProg, 'a_pos');
    const aUvS  = gl.getAttribLocation(sphereProg, 'a_uv');
    gl.enableVertexAttribArray(aPosS);
    gl.vertexAttribPointer(aPosS, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(aUvS);
    gl.vertexAttribPointer(aUvS, 2, gl.FLOAT, false, 20, 12);

    const sphereIdxBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIdxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.bindVertexArray(null);

    // placeholder 1×1 texture (alpha=0 = all ocean) until geo features arrive
    const landTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, landTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return {
        gl, w, h,
        sphereProg, sphereVAO, sphereIdxBuf, sphereIdxCount: idx.length,
        lineProg, ptsProg,
        landTex,
        borderBuf: null, borderCount: 0,
        gridBuf: null, gridCount: 0,
        lightBuf: null, lightCount: 0,
        uSphere: {
            rot:  loc(gl, sphereProg, 'u_rot'),
            proj: loc(gl, sphereProg, 'u_proj'),
            sun:  loc(gl, sphereProg, 'u_sun'),
            land: loc(gl, sphereProg, 'u_land'),
        },
        uLine: {
            rot:   loc(gl, lineProg, 'u_rot'),
            proj:  loc(gl, lineProg, 'u_proj'),
            zOff:  loc(gl, lineProg, 'u_zOff'),
            color: loc(gl, lineProg, 'u_color'),
        },
        uPts: {
            rot:     loc(gl, ptsProg, 'u_rot'),
            proj:    loc(gl, ptsProg, 'u_proj'),
            sun:     loc(gl, ptsProg, 'u_sun'),
            twinkle: loc(gl, ptsProg, 'u_twinkle'),
            scale:   loc(gl, ptsProg, 'u_scale'),
        },
        aLine:    gl.getAttribLocation(lineProg, 'a_pos'),
        aPts:     gl.getAttribLocation(ptsProg, 'a_pos'),
        aPtsSize: gl.getAttribLocation(ptsProg, 'a_size'),
        aPtsCol:  gl.getAttribLocation(ptsProg, 'a_col'),
    };
}

export function resizeWebGL(s: WebGLGlobeState, w: number, h: number): void {
    s.w = w; s.h = h;
    s.gl.viewport(0, 0, w, h);
}

// Bakes all country polygons into a 4096×2048 equirectangular RGBA8 texture.
// Alpha=1 for land, alpha=0 for ocean. Sampled as .a in SPHERE_FRAG.
export function uploadLandTexture(s: WebGLGlobeState, features: GeoFeature[]): void {
    const { gl } = s;
    const W = 4096, H = 2048;
    const offscreen = new OffscreenCanvas(W, H);
    const ctx = offscreen.getContext('2d');
    if (!ctx) { console.error('[globe] land texture: no 2D ctx'); return; }
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff';

    for (const feature of features) {
        const path = new Path2D();
        for (const ring of feature.rings) {
            if (ring.length < 3) continue;

            // Pre-normalise longitudes so lineTo never takes the short route across the antimeridian
            const nLngs: number[] = [ring[0][0]];
            for (let i = 1; i < ring.length; i++) {
                let lng = ring[i][0];
                while (lng - nLngs[i - 1] >  180) lng -= 360;
                while (nLngs[i - 1] - lng >  180) lng += 360;
                nLngs.push(lng);
            }
            let minNL = nLngs[0], maxNL = nLngs[0];
            for (const l of nLngs) { if (l < minNL) minNL = l; if (l > maxNL) maxNL = l; }

            // Rings spanning > 300° of longitude encircle a pole; add corner points to close them
            let poleY = -1;
            if (maxNL - minNL > 300) {
                let latSum = 0;
                for (const p of ring) latSum += p[1];
                poleY = latSum / ring.length < 0 ? H : 0;
            }

            // Draw 3× (dx = 0, +W, −W) so antimeridian rings fill both sides
            for (const dx of [0, W, -W]) {
                path.moveTo((nLngs[0] + 180) / 360 * W + dx, (90 - ring[0][1]) / 180 * H);
                for (let i = 1; i < ring.length; i++) {
                    path.lineTo((nLngs[i] + 180) / 360 * W + dx, (90 - ring[i][1]) / 180 * H);
                }
                if (poleY >= 0) {
                    path.lineTo((maxNL + 180) / 360 * W + dx, poleY);
                    path.lineTo((minNL + 180) / 360 * W + dx, poleY);
                }
                path.closePath();
            }
        }
        ctx.fill(path);
    }

    const imgData = ctx.getImageData(0, 0, W, H);
    let landPx = 0;
    for (let i = 3; i < imgData.data.length; i += 4) if (imgData.data[i]) landPx++;
    try { (self as unknown as { postMessage: (m: unknown) => void }).postMessage({ type: 'debug', msg: `land texture: ${features.length} features, ${landPx} land px` }); } catch {}

    if (s.landTex) gl.deleteTexture(s.landTex);
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);
    const glErr = gl.getError();
    if (glErr) console.error('[globe] land texImage2D GL error:', glErr);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    s.landTex = tex;
}

// Country borders as GL_LINES — one segment per ring edge
export function uploadBorderData(s: WebGLGlobeState, features: PrecomputedFeature[]): void {
    const { gl } = s;
    const segs: number[] = [];
    for (const feat of features) {
        for (const { vecs } of feat.rings) {
            const n = vecs.length / 3;
            for (let i = 0; i < n; i++) {
                const j = (i + 1) % n;
                const si = i * 3, sj = j * 3;
                segs.push(vecs[si], vecs[si + 1], vecs[si + 2]);
                segs.push(vecs[sj], vecs[sj + 1], vecs[sj + 2]);
            }
        }
    }
    if (s.borderBuf) gl.deleteBuffer(s.borderBuf);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segs), gl.STATIC_DRAW);
    s.borderBuf = buf; s.borderCount = segs.length / 3;
}

export function uploadGridData(s: WebGLGlobeState, grid: PrecomputedGrid): void {
    const { gl } = s;
    const segs: number[] = [];
    for (const vecs of grid.lines) {
        const n = vecs.length / 3;
        for (let i = 0; i < n - 1; i++) {
            const si = i * 3;
            segs.push(vecs[si], vecs[si + 1], vecs[si + 2]);
            segs.push(vecs[si + 3], vecs[si + 4], vecs[si + 5]);
        }
    }
    if (s.gridBuf) gl.deleteBuffer(s.gridBuf);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segs), gl.STATIC_DRAW);
    s.gridBuf = buf; s.gridCount = segs.length / 3;
}

// Interleaved [vx, vy, vz, dotSize, r, g, b] per light
export function uploadLightData(s: WebGLGlobeState, lights: PrecomputedLight[]): void {
    const { gl } = s;
    const data = new Float32Array(lights.length * 7);
    for (let i = 0; i < lights.length; i++) {
        const { vx, vy, vz, dotSize, color } = lights[i];
        const parts = color.split(',');
        const b = i * 7;
        data[b] = vx; data[b + 1] = vy; data[b + 2] = vz;
        data[b + 3] = dotSize;
        data[b + 4] = +parts[0] / 255;
        data[b + 5] = +parts[1] / 255;
        data[b + 6] = +parts[2] / 255;
    }
    if (s.lightBuf) gl.deleteBuffer(s.lightBuf);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    s.lightBuf = buf; s.lightCount = lights.length;
}

export interface WebGLFrameParams {
    rotY: number; rotX: number;
    sunLat: number; sunLng: number;
    r: number; cx: number; cy: number;
    w: number; h: number;
    frame: number;
}

export function renderWebGLFrame(s: WebGLGlobeState, p: WebGLFrameParams): void {
    const { gl } = s;

    if (s.w !== p.w || s.h !== p.h) resizeWebGL(s, p.w, p.h);

    const rotMat  = buildRotMat(p.rotY, p.rotX);
    const projMat = buildOrtho(p.r, p.cx, p.cy, p.w, p.h);
    const sunVec  = buildSunVec(p.sunLat, p.sunLng);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // sphere
    gl.useProgram(s.sphereProg);
    gl.uniformMatrix4fv(s.uSphere.rot,  false, rotMat);
    gl.uniformMatrix4fv(s.uSphere.proj, false, projMat);
    gl.uniform3fv(s.uSphere.sun, sunVec);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, s.landTex);
    gl.uniform1i(s.uSphere.land, 0);
    gl.bindVertexArray(s.sphereVAO);
    gl.drawElements(gl.TRIANGLES, s.sphereIdxCount, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);

    // lines: disable depth test to avoid z-fighting with the sphere surface
    gl.disable(gl.DEPTH_TEST);
    gl.useProgram(s.lineProg);
    gl.uniformMatrix4fv(s.uLine.rot,  false, rotMat);
    gl.uniformMatrix4fv(s.uLine.proj, false, projMat);
    gl.uniform1f(s.uLine.zOff, 0);

    if (s.borderBuf && s.borderCount > 0) {
        gl.uniform4f(s.uLine.color, 0.294, 0.569, 0.314, 0.55);
        gl.bindBuffer(gl.ARRAY_BUFFER, s.borderBuf);
        gl.enableVertexAttribArray(s.aLine);
        gl.vertexAttribPointer(s.aLine, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINES, 0, s.borderCount);
        gl.disableVertexAttribArray(s.aLine);
    }

    if (s.gridBuf && s.gridCount > 0) {
        gl.uniform4f(s.uLine.color, 1, 1, 1, 0.13);
        gl.bindBuffer(gl.ARRAY_BUFFER, s.gridBuf);
        gl.enableVertexAttribArray(s.aLine);
        gl.vertexAttribPointer(s.aLine, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINES, 0, s.gridCount);
        gl.disableVertexAttribArray(s.aLine);
    }

    // city lights — additive blend, overlapping halos accumulate into bright hotspots
    if (s.lightBuf && s.lightCount > 0) {
        gl.useProgram(s.ptsProg);
        gl.uniformMatrix4fv(s.uPts.rot,  false, rotMat);
        gl.uniformMatrix4fv(s.uPts.proj, false, projMat);
        gl.uniform3fv(s.uPts.sun, sunVec);
        gl.uniform1f(s.uPts.twinkle, Math.sin(p.frame * 0.04) * 0.12);
        gl.uniform1f(s.uPts.scale, p.r);
        gl.depthMask(false);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        gl.bindBuffer(gl.ARRAY_BUFFER, s.lightBuf);
        gl.enableVertexAttribArray(s.aPts);
        gl.vertexAttribPointer(s.aPts, 3, gl.FLOAT, false, 28, 0);
        gl.enableVertexAttribArray(s.aPtsSize);
        gl.vertexAttribPointer(s.aPtsSize, 1, gl.FLOAT, false, 28, 12);
        gl.enableVertexAttribArray(s.aPtsCol);
        gl.vertexAttribPointer(s.aPtsCol, 3, gl.FLOAT, false, 28, 16);
        gl.drawArrays(gl.POINTS, 0, s.lightCount);
        gl.disableVertexAttribArray(s.aPts);
        gl.disableVertexAttribArray(s.aPtsSize);
        gl.disableVertexAttribArray(s.aPtsCol);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
    }
}
