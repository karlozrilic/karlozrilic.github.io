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
    vec4 camPos = u_rot * vec4(a_pos, 1.0);
    v_camZ = camPos.z;
    gl_Position = u_proj * camPos;
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
const float TWILIGHT = 0.15643; // sin(9°) twilight half-band
void main() {
    if (v_camZ < 0.0) discard;
    float day = clamp((dot(v_world, u_sun) + TWILIGHT) / (2.0 * TWILIGHT), 0.0, 1.0);
    float heightFactor = v_world.y * 0.5 + 0.5;
    vec3 dayOcean = mix(vec3(0.063, 0.502, 0.941), vec3(0.039, 0.314, 0.729), heightFactor);
    vec3 nightOcean = mix(vec3(0.035, 0.082, 0.122), vec3(0.016, 0.055, 0.082), heightFactor);
    vec3 dayLand = vec3(0.216, 0.451, 0.243);
    vec3 nightLand = vec3(0.039, 0.110, 0.063);
    float land = texture(u_land, v_uv).a;
    vec3 dayColor = mix(dayOcean, dayLand, land);
    vec3 nightColor = mix(nightOcean, nightLand, land);
    float limb = v_camZ;
    fragColor = vec4(mix(nightColor, dayColor, day) * (0.75 + 0.25 * limb), 1.0);
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
    vec4 camPos = u_rot * vec4(a_pos, 1.0);
    v_camZ = camPos.z;
    camPos.z += u_zOff;
    gl_Position = u_proj * camPos;
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
const float TWILIGHT = 0.15643;
void main() {
    vec4 camPos = u_rot * vec4(a_pos, 1.0);
    float horizonFactor = clamp((camPos.z - 0.04) / 0.1, 0.0, 1.0);
    float daylightFactor = clamp((dot(a_pos, u_sun) + TWILIGHT) / (2.0 * TWILIGHT), 0.0, 1.0);
    float alpha = horizonFactor * (1.0 - daylightFactor) * (0.55 + u_twinkle * 0.15);
    if (alpha < 0.02 || camPos.z < 0.0) {
        gl_PointSize = 0.0; v_alpha = 0.0; v_col = vec3(0.0);
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        return;
    }
    camPos.z += 0.015;
    gl_Position = u_proj * camPos;
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
    float dist = length(gl_PointCoord - 0.5) * 2.0;
    float glowAlpha = v_alpha * exp(-dist * dist * 2.8);
    if (glowAlpha < 0.006) discard;
    fragColor = vec4(v_col, glowAlpha);
}`;

// Orthographic projection matching sx = cx + x*radius, sy = cy - y*radius
function buildOrtho(radius: number, cx: number, cy: number, width: number, height: number): Float32Array {
    const scaleX = 2 * radius / width, scaleY = 2 * radius / height;
    return new Float32Array([
        scaleX, 0,      0,    0,
        0,      scaleY, 0,    0,
        0,      0,     -0.5,  0,
        2 * cx / width - 1, 1 - 2 * cy / height, 0, 1,
    ]);
}

// Combined rotY then rotX — same convention as applyRotation() in globe_utils
function buildRotMat(rotY: number, rotX: number): Float32Array {
    const cosRotY = Math.cos(rotY), sinRotY = Math.sin(rotY);
    const cosRotX = Math.cos(rotX), sinRotX = Math.sin(rotX);
    return new Float32Array([
        cosRotY, sinRotX * sinRotY,  -cosRotX * sinRotY, 0,
        0,       cosRotX,             sinRotX,            0,
        sinRotY, -sinRotX * cosRotY,  cosRotX * cosRotY,  0,
        0,       0,                   0,                   1,
    ]);
}

function buildSunVec(sunLat: number, sunLng: number): Float32Array {
    const phi = (90 - sunLat) * Math.PI / 180;
    const theta = (sunLng + 180) * Math.PI / 180;
    const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi);
    return new Float32Array([-sinPhi * Math.cos(theta), cosPhi, sinPhi * Math.sin(theta)]);
}

function buildSphere(lngSegs: number, latSegs: number): { verts: Float32Array; idx: Uint16Array } {
    const degToRad = Math.PI / 180;
    const verts: number[] = [];
    const idx: number[] = [];
    for (let latIdx = 0; latIdx <= latSegs; latIdx++) {
        const lat = 90 - latIdx * 180 / latSegs;
        const phi = (90 - lat) * degToRad;
        const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi);
        const texV = latIdx / latSegs;
        for (let lngIdx = 0; lngIdx <= lngSegs; lngIdx++) {
            const lng = -180 + lngIdx * 360 / lngSegs;
            const theta = (lng + 180) * degToRad;
            const sinTheta = Math.sin(theta), cosTheta = Math.cos(theta);
            verts.push(-sinPhi * cosTheta, cosPhi, sinPhi * sinTheta, lngIdx / lngSegs, texV);
        }
    }
    for (let latIdx = 0; latIdx < latSegs; latIdx++) {
        for (let lngIdx = 0; lngIdx < lngSegs; lngIdx++) {
            const topIdx = latIdx * (lngSegs + 1) + lngIdx, bottomIdx = topIdx + lngSegs + 1;
            idx.push(topIdx, bottomIdx, topIdx + 1, bottomIdx, bottomIdx + 1, topIdx + 1);
        }
    }
    return { verts: new Float32Array(verts), idx: new Uint16Array(idx) };
}

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(`Shader: ${gl.getShaderInfoLog(shader)}`);
    return shader;
}

function makeProgram(gl: WebGL2RenderingContext, vert: string, frag: string): WebGLProgram {
    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(`Program: ${gl.getProgramInfoLog(program)}`);
    return program;
}

function loc(gl: WebGL2RenderingContext, prog: WebGLProgram, name: string): WebGLUniformLocation {
    return gl.getUniformLocation(prog, name)!;
}

export interface WebGLGlobeState {
    gl: WebGL2RenderingContext;
    width: number; height: number;
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

export function initWebGL(canvas: OffscreenCanvas, width: number, height: number): WebGLGlobeState | null {
    const gl = canvas.getContext('webgl2', {
        antialias: true, alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null;
    if (!gl) return null;

    gl.viewport(0, 0, width, height);
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
        gl, width, height,
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

export function resizeWebGL(state: WebGLGlobeState, width: number, height: number): void {
    state.width = width; state.height = height;
    state.gl.viewport(0, 0, width, height);
}

// Bakes all country polygons into a 4096×2048 equirectangular RGBA8 texture.
// Alpha=1 for land, alpha=0 for ocean. Sampled as .a in SPHERE_FRAG.
export function uploadLandTexture(state: WebGLGlobeState, features: GeoFeature[]): void {
    const { gl } = state;
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
            for (const nLng of nLngs) { if (nLng < minNL) minNL = nLng; if (nLng > maxNL) maxNL = nLng; }

            // Rings spanning > 300° of longitude encircle a pole; add corner points to close them
            let poleY = -1;
            if (maxNL - minNL > 300) {
                let latSum = 0;
                for (const pt of ring) latSum += pt[1];
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

    if (state.landTex) gl.deleteTexture(state.landTex);
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);
    const glErr = gl.getError();
    if (glErr) console.error('[globe] land texImage2D GL error:', glErr);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    state.landTex = tex;
}

// Country borders as GL_LINES — one segment per ring edge
export function uploadBorderData(state: WebGLGlobeState, features: PrecomputedFeature[]): void {
    const { gl } = state;
    const segs: number[] = [];
    for (const feat of features) {
        for (const { vecs } of feat.rings) {
            const vertexCount = vecs.length / 3;
            for (let i = 0; i < vertexCount; i++) {
                const j = (i + 1) % vertexCount;
                const iBase = i * 3, jBase = j * 3;
                segs.push(vecs[iBase], vecs[iBase + 1], vecs[iBase + 2]);
                segs.push(vecs[jBase], vecs[jBase + 1], vecs[jBase + 2]);
            }
        }
    }
    if (state.borderBuf) gl.deleteBuffer(state.borderBuf);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segs), gl.STATIC_DRAW);
    state.borderBuf = buf; state.borderCount = segs.length / 3;
}

export function uploadGridData(state: WebGLGlobeState, grid: PrecomputedGrid): void {
    const { gl } = state;
    const segs: number[] = [];
    for (const vecs of grid.lines) {
        const pointCount = vecs.length / 3;
        for (let i = 0; i < pointCount - 1; i++) {
            const iBase = i * 3;
            segs.push(vecs[iBase], vecs[iBase + 1], vecs[iBase + 2]);
            segs.push(vecs[iBase + 3], vecs[iBase + 4], vecs[iBase + 5]);
        }
    }
    if (state.gridBuf) gl.deleteBuffer(state.gridBuf);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segs), gl.STATIC_DRAW);
    state.gridBuf = buf; state.gridCount = segs.length / 3;
}

// Interleaved [vx, vy, vz, dotSize, r, g, b] per light
export function uploadLightData(state: WebGLGlobeState, lights: PrecomputedLight[]): void {
    const { gl } = state;
    const data = new Float32Array(lights.length * 7);
    for (let i = 0; i < lights.length; i++) {
        const { vx, vy, vz, dotSize, color } = lights[i];
        const parts = color.split(',');
        const offset = i * 7;
        data[offset]     = vx; data[offset + 1] = vy; data[offset + 2] = vz;
        data[offset + 3] = dotSize;
        data[offset + 4] = +parts[0] / 255;
        data[offset + 5] = +parts[1] / 255;
        data[offset + 6] = +parts[2] / 255;
    }
    if (state.lightBuf) gl.deleteBuffer(state.lightBuf);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    state.lightBuf = buf; state.lightCount = lights.length;
}

export interface WebGLFrameParams {
    rotY: number; rotX: number;
    sunLat: number; sunLng: number;
    radius: number; cx: number; cy: number;
    width: number; height: number;
    frame: number;
}

export function renderWebGLFrame(state: WebGLGlobeState, params: WebGLFrameParams): void {
    const { gl } = state;

    if (state.width !== params.width || state.height !== params.height) resizeWebGL(state, params.width, params.height);

    const rotMat  = buildRotMat(params.rotY, params.rotX);
    const projMat = buildOrtho(params.radius, params.cx, params.cy, params.width, params.height);
    const sunVec  = buildSunVec(params.sunLat, params.sunLng);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // sphere
    gl.useProgram(state.sphereProg);
    gl.uniformMatrix4fv(state.uSphere.rot,  false, rotMat);
    gl.uniformMatrix4fv(state.uSphere.proj, false, projMat);
    gl.uniform3fv(state.uSphere.sun, sunVec);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, state.landTex);
    gl.uniform1i(state.uSphere.land, 0);
    gl.bindVertexArray(state.sphereVAO);
    gl.drawElements(gl.TRIANGLES, state.sphereIdxCount, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);

    // lines: disable depth test to avoid z-fighting with the sphere surface
    gl.disable(gl.DEPTH_TEST);
    gl.useProgram(state.lineProg);
    gl.uniformMatrix4fv(state.uLine.rot,  false, rotMat);
    gl.uniformMatrix4fv(state.uLine.proj, false, projMat);
    gl.uniform1f(state.uLine.zOff, 0);

    if (state.borderBuf && state.borderCount > 0) {
        gl.uniform4f(state.uLine.color, 0.294, 0.569, 0.314, 0.55);
        gl.bindBuffer(gl.ARRAY_BUFFER, state.borderBuf);
        gl.enableVertexAttribArray(state.aLine);
        gl.vertexAttribPointer(state.aLine, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINES, 0, state.borderCount);
        gl.disableVertexAttribArray(state.aLine);
    }

    if (state.gridBuf && state.gridCount > 0) {
        gl.uniform4f(state.uLine.color, 1, 1, 1, 0.13);
        gl.bindBuffer(gl.ARRAY_BUFFER, state.gridBuf);
        gl.enableVertexAttribArray(state.aLine);
        gl.vertexAttribPointer(state.aLine, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINES, 0, state.gridCount);
        gl.disableVertexAttribArray(state.aLine);
    }

    // city lights — additive blend, overlapping halos accumulate into bright hotspots
    if (state.lightBuf && state.lightCount > 0) {
        gl.useProgram(state.ptsProg);
        gl.uniformMatrix4fv(state.uPts.rot,  false, rotMat);
        gl.uniformMatrix4fv(state.uPts.proj, false, projMat);
        gl.uniform3fv(state.uPts.sun, sunVec);
        gl.uniform1f(state.uPts.twinkle, Math.sin(params.frame * 0.04) * 0.12);
        gl.uniform1f(state.uPts.scale, params.radius);
        gl.depthMask(false);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        gl.bindBuffer(gl.ARRAY_BUFFER, state.lightBuf);
        gl.enableVertexAttribArray(state.aPts);
        gl.vertexAttribPointer(state.aPts, 3, gl.FLOAT, false, 28, 0);
        gl.enableVertexAttribArray(state.aPtsSize);
        gl.vertexAttribPointer(state.aPtsSize, 1, gl.FLOAT, false, 28, 12);
        gl.enableVertexAttribArray(state.aPtsCol);
        gl.vertexAttribPointer(state.aPtsCol, 3, gl.FLOAT, false, 28, 16);
        gl.drawArrays(gl.POINTS, 0, state.lightCount);
        gl.disableVertexAttribArray(state.aPts);
        gl.disableVertexAttribArray(state.aPtsSize);
        gl.disableVertexAttribArray(state.aPtsCol);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
    }
}
