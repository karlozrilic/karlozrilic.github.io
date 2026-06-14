'use client'
import { useEffect, useRef } from 'react';
import {
    AmbientLight,
    ACESFilmicToneMapping,
    SRGBColorSpace,
    BackSide,
    ColorRepresentation,
    ConeGeometry,
    CylinderGeometry,
    ExtrudeGeometry,
    ExtrudeGeometryOptions,
    GridHelper,
    Group,
    HemisphereLight,
    IcosahedronGeometry,
    Matrix4,
    Mesh,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    OctahedronGeometry,
    PerspectiveCamera,
    Plane,
    PointLight,
    Points,
    PointsMaterial,
    BufferGeometry,
    BufferAttribute,
    Quaternion,
    Raycaster,
    Scene,
    Shape,
    SphereGeometry,
    SpotLight,
    TetrahedronGeometry,
    Vector2,
    Vector3,
    WebGLRenderer,
    TorusGeometry,
    TorusKnotGeometry,
    FrontSide,
    Timer,
} from 'three';

export default function ThreeJsHero() {
    const wrapRef   = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const rafRef    = useRef<number>(0);

    useEffect(() => {
        const wrap   = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas || canvas.hasChildNodes()) return;

        let W = wrap.clientWidth;
        let H = wrap.clientHeight;

        // ── Renderer ──────────────────────────────────────────────────────────
        const renderer = new WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setClearColor(0x06070e, 1);
        renderer.toneMapping         = ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
        renderer.outputColorSpace    = SRGBColorSpace;
        canvas.appendChild(renderer.domElement);

        const scene  = new Scene();
        const camera = new PerspectiveCamera(50, W / H, 0.1, 200);
        camera.position.set(0, 0, 22);

        // ── LIGHTING ─────────────────────────────────────────────────────────
        // Hemisphere: sky (blue-violet) vs ground (deep orange) — gives a rich
        // gradient base that prevents objects from ever looking flat
        const hemi = new HemisphereLight(0x223366, 0x441100, 8);
        scene.add(hemi);

        // KEY — warm gold from upper-front-right, primary scene light
        const keyLight = new PointLight(0xffeebb, 600, 90);
        keyLight.position.set(9, 12, 16);
        scene.add(keyLight);

        // FILL — cool cobalt from left, wide range
        const fillLight = new PointLight(0x4488ff, 350, 80);
        fillLight.position.set(-14, 3, 6);
        scene.add(fillLight);

        // RIM — vivid magenta from behind-below, makes shapes pop off bg
        const rimLight = new PointLight(0xff22bb, 300, 65);
        rimLight.position.set(-3, -8, -14);
        scene.add(rimLight);

        // ORBIT ACCENT — teal/cyan that slowly circles, paints specular streaks on glass
        const accentLight = new PointLight(0x00eedd, 280, 55);
        accentLight.position.set(0, 6, 10);
        scene.add(accentLight);

        // KICKER — deep orange from below-right for dramatic underlighting
        const kickLight = new PointLight(0xff5500, 220, 55);
        kickLight.position.set(16, -9, 3);
        scene.add(kickLight);

        // SLOW TOP SPOT — a soft wide spotlight from high above, drifts gently
        // Creates a "god-ray" feeling that shifts across the cluster
        const topSpot = new SpotLight(0xffffff, 180, 80, Math.PI / 5, 0.6, 1.5);
        topSpot.position.set(0, 22, 4);
        topSpot.target.position.set(0, 0, 0);
        scene.add(topSpot);
        scene.add(topSpot.target);

        // Grid
        const grid = new GridHelper(60, 40, 0x111122, 0x0c0c1a);
        grid.position.y = -7;
        scene.add(grid);

        // Stars
        const starCount     = 400;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3]     = (Math.random() - 0.5) * 120;
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
            starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 25;
        }
        const starGeo = new BufferGeometry();
        starGeo.setAttribute('position', new BufferAttribute(starPositions, 3));
        scene.add(new Points(starGeo, new PointsMaterial({ color: 0x99aacf, size: 0.07, transparent: true, opacity: 0.75 })));

        // ── Materials ─────────────────────────────────────────────────────────
        function stdMat(color: ColorRepresentation, emissive: ColorRepresentation) {
            return new MeshStandardMaterial({
                color, emissive, emissiveIntensity: 0.9,
                roughness: 0.2, metalness: 0.7,
            });
        }

        function glassMat(side: typeof BackSide | typeof FrontSide, tint = 0xffffff) {
            return new MeshPhysicalMaterial({
                color: tint, metalness: 0.0, roughness: 0.0,
                transmission: 1.0, thickness: 0.5, ior: 1.5,
                reflectivity: 0.6, envMapIntensity: 2.0,
                transparent: true, opacity: 0.22,
                side, depthWrite: false,
            });
        }

        // ── Geometry helpers ──────────────────────────────────────────────────
        function roundedBox(w: number, h: number, d: number, r: number, segs = 3) {
            const shape = new Shape();
            const x = -w / 2 + r, y = -h / 2 + r;
            shape.moveTo(x, -h / 2);
            shape.lineTo(-x, -h / 2);
            shape.quadraticCurveTo(w / 2, -h / 2, w / 2, y);
            shape.lineTo(w / 2, -y);
            shape.quadraticCurveTo(w / 2, h / 2, -x, h / 2);
            shape.lineTo(x, h / 2);
            shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, -y);
            shape.lineTo(-w / 2, y);
            shape.quadraticCurveTo(-w / 2, -h / 2, x, -h / 2);
            const opts: ExtrudeGeometryOptions = {
                depth: d, bevelEnabled: true,
                bevelSize: r, bevelThickness: r,
                bevelSegments: segs, curveSegments: segs,
            };
            const geo = new ExtrudeGeometry(shape, opts);
            geo.center();
            return geo;
        }

        // ── Object definitions ────────────────────────────────────────────────
        type ObjDef = {
            label: string; innerGeo: () => any; glassGeo: () => any;
            color: ColorRepresentation; emissive: ColorRepresentation;
            glassTint: number; radius: number;
        };

        const S = 1.18;

        const definitions: ObjDef[] = [
            { label: 'Code',     glassTint: 0xaabbff, color: 0x2255cc, emissive: 0x1133aa, radius: 1.4,
              innerGeo: () => roundedBox(1.8, 1.3, 0.5, 0.22), glassGeo: () => roundedBox(1.8*S, 1.3*S, 0.5*S, 0.22*S) },
            { label: 'Camera',   glassTint: 0xccccff, color: 0x3040aa, emissive: 0x202255, radius: 1.1,
              innerGeo: () => new SphereGeometry(0.9, 32, 32), glassGeo: () => new SphereGeometry(0.9*S, 32, 32) },
            { label: 'Music',    glassTint: 0xffdd88, color: 0xd4a830, emissive: 0x7a5500, radius: 1.2,
              innerGeo: () => new TorusGeometry(0.75, 0.3, 16, 48), glassGeo: () => new TorusGeometry(0.75*S, 0.3*S, 16, 48) },
            { label: 'Photo',    glassTint: 0xffaadd, color: 0xcc44aa, emissive: 0x991155, radius: 1.3,
              innerGeo: () => roundedBox(1.5, 1.5, 0.45, 0.28), glassGeo: () => roundedBox(1.5*S, 1.5*S, 0.45*S, 0.28*S) },
            { label: 'Video',    glassTint: 0xaaffcc, color: 0x22bb66, emissive: 0x117733, radius: 1.1,
              innerGeo: () => new ConeGeometry(0.85, 1.5, 3, 1), glassGeo: () => new ConeGeometry(0.85*S, 1.5*S, 3, 1) },
            { label: 'Design',   glassTint: 0xccbbff, color: 0x5533dd, emissive: 0x3311bb, radius: 1.35,
              innerGeo: () => roundedBox(1.6, 1.6, 0.5, 0.30), glassGeo: () => roundedBox(1.6*S, 1.6*S, 0.5*S, 0.30*S) },
            { label: 'Script',   glassTint: 0xffaaaa, color: 0xe84545, emissive: 0xaa2020, radius: 1.1,
              innerGeo: () => new OctahedronGeometry(0.9, 0), glassGeo: () => new OctahedronGeometry(0.9*S, 0) },
            { label: '3D',       glassTint: 0xaaffff, color: 0x22ccdd, emissive: 0x117799, radius: 1.1,
              innerGeo: () => new IcosahedronGeometry(0.88, 0), glassGeo: () => new IcosahedronGeometry(0.88*S, 0) },
            { label: 'Terminal', glassTint: 0xaaffaa, color: 0x117711, emissive: 0x005500, radius: 1.3,
              innerGeo: () => roundedBox(1.7, 1.1, 0.45, 0.20), glassGeo: () => roundedBox(1.7*S, 1.1*S, 0.45*S, 0.20*S) },
            { label: 'Lens',     glassTint: 0xdddddd, color: 0x556677, emissive: 0x223344, radius: 1.0,
              innerGeo: () => new CylinderGeometry(0.55, 0.65, 1.0, 32), glassGeo: () => new CylinderGeometry(0.55*S, 0.65*S, 1.0*S, 32) },
            { label: 'Waveform', glassTint: 0xffbbdd, color: 0xff6b9d, emissive: 0xaa2255, radius: 1.0,
              innerGeo: () => new TorusKnotGeometry(0.55, 0.18, 80, 12), glassGeo: () => new TorusKnotGeometry(0.55*S, 0.18*S, 80, 12) },
            { label: 'Vinyl',    glassTint: 0xddaaff, color: 0x551166, emissive: 0x330044, radius: 1.1,
              innerGeo: () => new CylinderGeometry(0.9, 0.9, 0.08, 48), glassGeo: () => new CylinderGeometry(0.9*S, 0.9*S, 0.08*S, 48) },
            { label: 'Globe',    glassTint: 0xaabbff, color: 0x1166cc, emissive: 0x003388, radius: 1.05,
              innerGeo: () => new SphereGeometry(0.85, 20, 20), glassGeo: () => new SphereGeometry(0.85*S, 20, 20) },
            { label: 'Crystal',  glassTint: 0xeeffff, color: 0x88ddff, emissive: 0x3366aa, radius: 1.2,
              innerGeo: () => new TetrahedronGeometry(1.0, 0), glassGeo: () => new TetrahedronGeometry(1.0*S, 0) },
            { label: 'Gear',     glassTint: 0xccddee, color: 0x8899aa, emissive: 0x334455, radius: 1.1,
              innerGeo: () => new TorusGeometry(0.7, 0.25, 8, 12), glassGeo: () => new TorusGeometry(0.7*S, 0.25*S, 8, 12) },
        ];

        // ── Spawn positions — rejection sampler so no two start overlapping ──
        const MIN_SPAWN_DIST = 3.0;
        const spawnPositions: Vector3[] = [];

        for (let i = 0; i < definitions.length; i++) {
            let pos: Vector3;
            let attempts = 0;
            do {
                // Spread evenly in a wide 3D cloud, not a ring
                pos = new Vector3(
                    (Math.random() - 0.5) * 18,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                );
                attempts++;
            } while (
                attempts < 80 &&
                spawnPositions.some(p => p.distanceTo(pos) < MIN_SPAWN_DIST)
            );
            spawnPositions.push(pos);
        }

        // ── Build scene objects ───────────────────────────────────────────────
        const sceneGroup = new Group();
        scene.add(sceneGroup);
        const allObjects: Object3D[] = [];

        definitions.forEach(({ label, innerGeo, glassGeo, color, emissive, glassTint, radius }, i) => {
            const group = new Group();
            const inner = new Mesh(innerGeo(), stdMat(color, emissive));
            group.add(inner);
            const gGeo = glassGeo();
            const shellBack  = new Mesh(gGeo, glassMat(BackSide, glassTint));
            const shellFront = new Mesh(gGeo, glassMat(FrontSide, glassTint));
            shellBack.renderOrder  = 1;
            shellFront.renderOrder = 2;
            group.add(shellBack, shellFront);

            const sp = spawnPositions[i];
            group.position.copy(sp);
            group.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            group.userData = {
                label,
                radius,
                // Physics: full 3D rest position + velocity
                // restPos is the "home" the object drifts around — updated by physics
                restPos: sp.clone(),
                velocity: new Vector3(),
                // Float parameters — applied as an additive offset over restPos
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed:  0.35 + Math.random() * 0.25,
                floatAmp:    0.3  + Math.random() * 0.2,
                // Spin
                spinAxis: new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
                spinSpeed: 0.003 + Math.random() * 0.005,
                targetQuat: group.quaternion.clone(),
                dragging: false,
            };

            allObjects.push(group);
            sceneGroup.add(group);
        });

        // ── Input state ───────────────────────────────────────────────────────
        const raycaster  = new Raycaster();
        const mouse2D    = new Vector2();
        const worldMouse = new Vector3();

        const dragState = {
            active:  false,
            object:  null as Object3D | null,
            plane:   new Plane(),
            offset:  new Vector3(),
            prevPos: new Vector3(),
            throwVel: new Vector3(),
        };

        // Camera orbit — ±15° limit, snaps back
        const MAX_THETA = 0.26;
        const MAX_PHI_D = 0.20;
        const BASE_PHI  = Math.PI / 2;
        const SNAP_K    = 0.10;

        const orbitState = {
            active: false, snapping: false,
            startX: 0, startY: 0,
            thetaStart: 0, phiStart: 0,
            targetTheta: 0, targetPhi: BASE_PHI,
            currentTheta: 0, currentPhi: BASE_PHI,
            radius: 22,
        };

        let hoveredObj: Object3D | null = null;

        // ── Helpers ───────────────────────────────────────────────────────────
        function getRay(e: MouseEvent) {
            if (!wrap) return undefined;
            const rect = wrap.getBoundingClientRect();
            mouse2D.x =  ((e.clientX - rect.left) / W) * 2 - 1;
            mouse2D.y = -((e.clientY - rect.top)  / H) * 2 + 1;
            raycaster.setFromCamera(mouse2D, camera);
            return raycaster;
        }

        function findTopObject(o: Object3D): Object3D | null {
            while (o.parent && o.parent !== sceneGroup) o = o.parent;
            return allObjects.includes(o) ? o : null;
        }

        // ── Events ────────────────────────────────────────────────────────────
        function onMouseMove(e: MouseEvent) {
            const ray = getRay(e);
            const camDir = camera.position.clone().normalize();
            ray?.ray.intersectPlane(
                new Plane().setFromNormalAndCoplanarPoint(camDir, new Vector3()),
                worldMouse,
            );

            if (dragState.active && dragState.object) {
                const pt = new Vector3();
                ray?.ray.intersectPlane(dragState.plane, pt);
                if (pt.lengthSq() > 0) {
                    const newPos = pt.clone().add(dragState.offset);
                    // Track throw velocity as delta between frames
                    dragState.throwVel.copy(newPos).sub(dragState.prevPos);
                    dragState.prevPos.copy(newPos);
                    dragState.object.position.copy(newPos);
                    // Keep restPos in sync so float doesn't pull it back
                    dragState.object.userData.restPos.copy(newPos);
                }
                return;
            }

            if (orbitState.active) {
                const dx = e.clientX - orbitState.startX;
                const dy = e.clientY - orbitState.startY;
                orbitState.targetTheta = Math.max(-MAX_THETA, Math.min(MAX_THETA,
                    orbitState.thetaStart + dx * 0.004));
                // drag down (dy>0) → look down → phi decreases (camera goes above horizon)
                orbitState.targetPhi = Math.max(BASE_PHI - MAX_PHI_D, Math.min(BASE_PHI + MAX_PHI_D,
                    orbitState.phiStart - dy * 0.004));
                orbitState.snapping = false;
                return;
            }

            const hits = ray?.intersectObjects(allObjects, true);
            const newHov = hits && hits.length > 0 ? findTopObject(hits[0].object) : null;
            if (newHov !== hoveredObj) {
                hoveredObj = newHov;
                if (wrap) wrap.style.cursor = hoveredObj ? 'grab' : 'default';
            }
        }

        function onMouseDown(e: MouseEvent) {
            const ray  = getRay(e);
            const hits = ray?.intersectObjects(allObjects, true);
            if (hits && hits.length > 0) {
                const o = findTopObject(hits[0].object);
                if (o) {
                    dragState.active      = true;
                    dragState.object      = o;
                    o.userData.dragging   = true;
                    o.userData.velocity.set(0, 0, 0);
                    const normal = camera.position.clone().normalize();
                    dragState.plane.setFromNormalAndCoplanarPoint(normal, o.position);
                    const pt = new Vector3();
                    ray?.ray.intersectPlane(dragState.plane, pt);
                    dragState.offset.copy(o.position).sub(pt);
                    dragState.prevPos.copy(o.position);
                    dragState.throwVel.set(0, 0, 0);
                    if (wrap) wrap.style.cursor = 'grabbing';
                    return;
                }
            }
            orbitState.active = true; orbitState.snapping = false;
            orbitState.startX = e.clientX; orbitState.startY = e.clientY;
            orbitState.thetaStart = orbitState.targetTheta;
            orbitState.phiStart   = orbitState.targetPhi;
        }

        function releaseObject() {
            if (!dragState.object) return;
            // Transfer throw velocity — clamp so it can't go wild
            const tv = dragState.throwVel.clone().multiplyScalar(0.5);
            const maxV = 0.25;
            if (tv.length() > maxV) tv.setLength(maxV);
            dragState.object.userData.velocity.copy(tv);
            dragState.object.userData.dragging = false;
            dragState.object = null;
            dragState.active = false;
        }

        function onMouseUp() {
            releaseObject();
            if (orbitState.active) { orbitState.active = false; orbitState.snapping = true; }
            if (wrap) wrap.style.cursor = hoveredObj ? 'grab' : 'default';
        }

        function onMouseLeave() {
            releaseObject();
            if (orbitState.active) { orbitState.active = false; orbitState.snapping = true; }
            hoveredObj = null;
            if (wrap) wrap.style.cursor = 'default';
        }

        function onResize() {
            if (!wrap) return;
            W = wrap.clientWidth; H = wrap.clientHeight;
            renderer.setSize(W, H);
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
        }

        wrap.addEventListener('mousemove',  onMouseMove);
        wrap.addEventListener('mousedown',  onMouseDown);
        wrap.addEventListener('mouseup',    onMouseUp);
        wrap.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('resize',   onResize);

        // ── Animation ─────────────────────────────────────────────────────────
        const timer    = new Timer();
        const quatSpin = new Quaternion();
        const _up      = new Vector3(0, 1, 0);
        const _m4      = new Matrix4();
        const _sep     = new Vector3();

        // ── Physics: proper elastic collision in 3D ───────────────────────────
        // Treats each object as a unit-mass sphere. On contact:
        //  1. Separate positions so they no longer overlap (positional correction)
        //  2. Exchange velocity components along the contact normal (elastic bounce)
        //  3. Apply a tiny restitution < 1 so energy slowly bleeds out
        const RESTITUTION = 0.35; // 0=perfectly inelastic, 1=perfectly elastic

        function resolveCollisions() {
            for (let i = 0; i < allObjects.length; i++) {
                const a  = allObjects[i];
                const ud_a = a.userData;
                for (let jo = i + 1; jo < allObjects.length; jo++) {
                    const b    = allObjects[jo];
                    const ud_b = b.userData;

                    _sep.copy(b.position).sub(a.position);
                    const dist    = _sep.length();
                    const minDist = ud_a.radius + ud_b.radius;

                    if (dist >= minDist || dist < 0.0001) continue;

                    const normal  = _sep.clone().normalize();
                    const overlap = minDist - dist;

                    // ── Positional correction (split by inverse mass, both equal) ──
                    const correction = overlap * 0.5 * 0.8; // 0.8 = baumgarte factor
                    if (!ud_a.dragging) {
                        a.position.addScaledVector(normal, -correction);
                        ud_a.restPos.addScaledVector(normal, -correction);
                    }
                    if (!ud_b.dragging) {
                        b.position.addScaledVector(normal, correction);
                        ud_b.restPos.addScaledVector(normal, correction);
                    }

                    // ── Velocity exchange along normal ────────────────────────────
                    // Relative velocity along contact normal
                    const velA = ud_a.dragging ? new Vector3() : ud_a.velocity;
                    const velB = ud_b.dragging ? new Vector3() : ud_b.velocity;
                    const relVelAlongNormal = velB.clone().sub(velA).dot(normal);

                    // Only resolve if approaching (negative relative vel = separating, skip)
                    if (relVelAlongNormal >= 0) continue;

                    // Impulse scalar (equal masses → j = -(1+e)*relVel / 2)
                    const j = -(1 + RESTITUTION) * relVelAlongNormal / 2;
                    const impulse = normal.clone().multiplyScalar(j);

                    if (!ud_a.dragging) ud_a.velocity.sub(impulse);
                    if (!ud_b.dragging) ud_b.velocity.add(impulse);
                }
            }
        }

        function animate() {
            rafRef.current = requestAnimationFrame(animate);
            timer.update();
            const t = timer.getElapsed();

            // ── Camera snap-back ──────────────────────────────────────────────
            if (orbitState.snapping) {
                orbitState.targetTheta += (0        - orbitState.targetTheta) * SNAP_K;
                orbitState.targetPhi   += (BASE_PHI - orbitState.targetPhi)   * SNAP_K;
                if (Math.abs(orbitState.targetTheta) < 0.0005 &&
                    Math.abs(orbitState.targetPhi - BASE_PHI) < 0.0005) {
                    orbitState.targetTheta = 0;
                    orbitState.targetPhi   = BASE_PHI;
                    orbitState.snapping    = false;
                }
            }
            orbitState.currentTheta += (orbitState.targetTheta - orbitState.currentTheta) * 0.08;
            orbitState.currentPhi   += (orbitState.targetPhi   - orbitState.currentPhi)   * 0.08;

            const r = orbitState.radius;
            camera.position.x = r * Math.sin(orbitState.currentPhi) * Math.sin(orbitState.currentTheta);
            camera.position.y = r * Math.cos(orbitState.currentPhi);
            camera.position.z = r * Math.sin(orbitState.currentPhi) * Math.cos(orbitState.currentTheta);
            camera.lookAt(0, 0, 0);

            // ── Animate lights ────────────────────────────────────────────────
            keyLight.position.x  =  9  + Math.cos(t * 0.15) * 5;
            keyLight.position.y  = 12  + Math.sin(t * 0.10) * 4;
            keyLight.position.z  = 16  + Math.sin(t * 0.13) * 3;
            keyLight.intensity   = 550 + Math.sin(t * 0.4) * 100;

            fillLight.position.x = -14 + Math.sin(t * 0.17) * 4;
            fillLight.position.y =   3 + Math.cos(t * 0.12) * 3;
            fillLight.intensity  = 320 + Math.sin(t * 0.55) * 80;

            accentLight.position.x = Math.cos(t * 0.48) * 11;
            accentLight.position.y = 7 + Math.sin(t * 0.37) * 5;
            accentLight.position.z = 10 + Math.cos(t * 0.41) * 6;
            accentLight.intensity  = 250 + Math.sin(t * 1.2) * 100;

            rimLight.position.x = -3 + Math.sin(t * 0.20) * 4;
            rimLight.intensity  = 270 + Math.sin(t * 0.65) * 80;

            kickLight.position.x = 16 + Math.sin(t * 0.22) * 5;
            kickLight.intensity  = 200 + Math.sin(t * 0.85) * 70;

            // Top spotlight drifts slowly
            topSpot.position.x = Math.sin(t * 0.08) * 6;
            topSpot.position.z = 4 + Math.cos(t * 0.11) * 5;

            // ── Objects ───────────────────────────────────────────────────────
            allObjects.forEach(obj => {
                const ud = obj.userData;
                if (ud.dragging) return;

                // 1. Apply velocity to restPos and damp it
                if (ud.velocity.lengthSq() > 1e-6) {
                    ud.restPos.addScaledVector(ud.velocity, 1);
                    ud.velocity.multiplyScalar(0.90); // space drag
                    if (ud.velocity.lengthSq() < 1e-6) ud.velocity.set(0, 0, 0);
                }

                // 2. Soft boundary — no center pull, just cancel outward velocity
                //    when an object drifts too far. Feels like hitting a gentle invisible wall.
                const BOUND_X = 11, BOUND_Y = 6, BOUND_Z = 7;
                const rp = ud.restPos;
                if (Math.abs(rp.x) > BOUND_X) {
                    ud.velocity.x *= -0.4;
                    rp.x = Math.sign(rp.x) * BOUND_X;
                }
                if (Math.abs(rp.y) > BOUND_Y) {
                    ud.velocity.y *= -0.4;
                    rp.y = Math.sign(rp.y) * BOUND_Y;
                }
                if (Math.abs(rp.z) > BOUND_Z) {
                    ud.velocity.z *= -0.4;
                    rp.z = Math.sign(rp.z) * BOUND_Z;
                }

                // 3. Float: pure vertical sine on top of restPos, starts immediately
                const phase = t * ud.floatSpeed + ud.floatOffset;
                const floatOffset = new Vector3(0, Math.sin(phase) * ud.floatAmp, 0);

                obj.position.copy(ud.restPos).add(floatOffset);

                // 4. Rotation toward cursor
                if (worldMouse.lengthSq() > 0.01) {
                    _m4.lookAt(obj.position, worldMouse, _up);
                    ud.targetQuat.setFromRotationMatrix(_m4);
                }
                obj.quaternion.slerp(ud.targetQuat, 0.02);

                // 5. Idle spin
                quatSpin.setFromAxisAngle(ud.spinAxis, ud.spinSpeed);
                obj.quaternion.multiply(quatSpin);
                ud.targetQuat.copy(obj.quaternion);
            });

            // Collision after all positions settled for this frame
            resolveCollisions();

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            cancelAnimationFrame(rafRef.current);
            wrap.removeEventListener('mousemove',  onMouseMove);
            wrap.removeEventListener('mousedown',  onMouseDown);
            wrap.removeEventListener('mouseup',    onMouseUp);
            wrap.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('resize',   onResize);
            renderer.dispose();
            if (canvas.hasChildNodes()) canvas.removeChild(canvas.firstChild!);
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#06070e' }}
        >
            <div ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 10,
            }}>
                <h1 style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    fontWeight: 700, color: '#f0ece0',
                    letterSpacing: '-0.03em', textAlign: 'center', lineHeight: 1.1, margin: 0,
                }}>
                    Your Name
                </h1>
                <p style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                    color: '#555566', letterSpacing: '0.2em',
                    textTransform: 'uppercase', marginTop: '0.75rem',
                }}>
                    Developer · Photographer · Musician
                </p>
            </div>
            <div style={{
                position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'system-ui, sans-serif', fontSize: '0.7rem',
                color: '#2a2a3a', letterSpacing: '0.1em', whiteSpace: 'nowrap', pointerEvents: 'none',
            }}>
                drag objects · drag background to orbit
            </div>
        </div>
    );
}