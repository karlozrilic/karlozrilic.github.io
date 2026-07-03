'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { FlyState, GeoFeature, PinPosition, Visitor } from '@/lib/globe/globe_utils';
import {
    buildFlyState,
    fetchGeoFeatures,
    getDragSensitivity,
    getEarthRotY,
    isInsideGlobe,
    hitTestPins,
    hitTestCountry,
    inverseProjectGlobe,
    stepFlyAnimation,
} from '@/lib/globe/globe_utils';

import { VISITORS } from '@/lib/globe/globe_data';

export interface VisitorGlobeProps {
    radiusFraction?: number;
    visitors?: Visitor[];
    initialZoom?: number;
    maxChips?: number;
}

interface GlobeAnimState {
    rotX: number;
    userOffsetY: number;
    zoom: number;
    targetZoom: number;
    frame: number;
    flyState: FlyState | null;
}

const DEFAULT_ROT_X = 0.20;
const DEFAULT_OFFSET_Y = 0;
const FLY_ZOOM_LEVEL = 2.0;
const ZOOM_MIN = 0.55;
const ZOOM_MAX = 8.0;
const ZOOM_BUTTON_FACTOR = 1.4; // ×1.4 per button click

export default function VisitorGlobe({
    radiusFraction = 0.435,
    visitors = VISITORS,
    initialZoom = 1.0,
    maxChips = 8,
}: VisitorGlobeProps): React.ReactElement {

    // Both dimensions observed independently so the canvas can be any aspect ratio.
    // Height falls back to width when the parent has no explicit height (flow layout).
    const canvasAreaRef = useRef<HTMLDivElement>(null);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    useEffect(() => {
        const el = canvasAreaRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            const pixelWidth = Math.floor(width);
            const pixelHeight = Math.floor(height);
            if (pixelWidth > 0) {
                setCanvasWidth(pixelWidth);
                setCanvasHeight(pixelHeight > 0 ? pixelHeight : pixelWidth);
            }
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const renderWorkerRef = useRef<Worker | null>(null);
    const canvasTransferredRef = useRef(false);
    const workerIdleRef = useRef(true);
    const pendingFrameRef = useRef(false);
    const sendFrameRef = useRef<() => void>(() => {});

    const animRef = useRef<GlobeAnimState>({
        rotX: DEFAULT_ROT_X,
        userOffsetY: DEFAULT_OFFSET_Y,
        zoom: initialZoom,
        targetZoom: initialZoom,
        frame: 0,
        flyState: null,
    });

    const draggingRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const lastTouchRef = useRef({ x: 0, y: 0, pinchDist: 0 });
    const mouseDownPosRef = useRef({ x: 0, y: 0 });
    const [selectedFeatureIdx, setSelectedFeatureIdx] = useState(-1);
    const selectedFeatureIdxRef = useRef(-1);
    selectedFeatureIdxRef.current = selectedFeatureIdx;

    const [rotateEnabled, setRotateEnabled] = useState(true);
    useEffect(() => {
        const stored = localStorage.getItem('globe-rotate');
        if (stored !== null) setRotateEnabled(stored === 'true');
    }, []);

    // Last values reported by the worker — used for click hit-testing so the
    // inverse projection matches exactly what the user is looking at.
    const initEarthBase = getEarthRotY(Date.now());
    const lastWorkerFrameRef = useRef({
        rotY: initEarthBase + DEFAULT_OFFSET_Y,
        rotX: DEFAULT_ROT_X,
        effectiveRadius: 300,
        zoom: initialZoom,
        spinAngle: initEarthBase,
    });

    useEffect(() => {
        let firstPaintDone = false;
        const worker = new Worker(new URL('@/lib/globe/render.worker.ts', import.meta.url));
        worker.onmessage = (e: MessageEvent<{
            type: string; pins: PinPosition[];
            rotY: number; rotX: number; effectiveRadius: number;
            zoom: number; spinAngle: number; solarText?: string;
        }>) => {
            if (e.data.type === 'debug') { console.log('[globe worker]', (e.data as unknown as { msg: string }).msg); return; }
            if (e.data.type === 'pins') {
                if (!firstPaintDone) { firstPaintDone = true; setFirstFrameReady(true); }
                const { pins, rotY, rotX, effectiveRadius, zoom, spinAngle, solarText } = e.data;
                pinPositionsRef.current = pins;
                // Sync worker-computed animation state so click handlers use the exact
                // rotation from the frame the user is looking at.
                lastWorkerFrameRef.current = { rotY, rotX, effectiveRadius, zoom, spinAngle };
                animRef.current.zoom = zoom;
                if (solarText) setSolarInfo(solarText);
                // If a new frame was queued while the worker was busy, dispatch it
                // immediately instead of waiting for the next RAF tick. This removes
                // the ~16ms gap and pushes effective frame rate close to 1/worker_render_time.
                if (pendingFrameRef.current) {
                    sendFrameRef.current();
                } else {
                    workerIdleRef.current = true;
                }
            }
        };
        renderWorkerRef.current = worker;
        return () => worker.terminate();
    }, []);

    const rotateEnabledRef = useRef(rotateEnabled);
    rotateEnabledRef.current = rotateEnabled;
    // spin angle snapshot taken when rotation is paused — worker locks to this
    const pausedAngleRef = useRef(initEarthBase);

    const pinPositionsRef = useRef<PinPosition[]>([]);

    const [geoFeatures, setGeoFeatures] = useState<GeoFeature[]>([]);
    const [userLocation, setUserLocation] = useState<{
        lat: number; lng: number; city: string; country: string; flag: string;
    } | null>(null);
    const [ipReady, setIpReady] = useState(false);
    const [geoFeaturesReady, setGeoFeaturesReady] = useState(false);
    const [firstFrameReady, setFirstFrameReady] = useState(false);
    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        // Derive longitude from the browser's UTC offset as a fallback center point.
        // getTimezoneOffset() returns minutes *west* of UTC, so negate and divide by 4
        // (each hour = 15°) to get approximate degrees east.
        const timezoneLng = Math.max(-180, Math.min(180, -new Date().getTimezoneOffset() / 4));
        const applyFallback = () => setInitialCenter({ lat: 0, lng: timezoneLng });

        fetch('https://ipwho.is/', { signal: controller.signal })
            .then(r => r.json())
            .then(data => {
                if (data.success && data.latitude && data.longitude) {
                    const code: string = data.country_code ?? '';
                    const flagEmoji = code.length === 2
                        ? [...code.toUpperCase()].map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('')
                        : (data.flag?.emoji ?? '📍');
                    setUserLocation({
                        lat: data.latitude,
                        lng: data.longitude,
                        city: data.city ?? 'Your Location',
                        country: data.country ?? '',
                        flag: flagEmoji,
                    });
                } else {
                    applyFallback();
                }
            })
            .catch(() => applyFallback())
            .finally(() => { clearTimeout(timeout); setIpReady(true); });

        return () => { controller.abort(); clearTimeout(timeout); };
    }, []);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [tooltipVisitor, setTooltipVisitor] = useState<Visitor | null>(null);
    const [zoomLabel, setZoomLabel] = useState(initialZoom.toFixed(1) + '×');
    const [solarInfo, setSolarInfo] = useState('loading…');

    // Globe is ready to display once both the IP lookup and geo data are done.
    // Waiting for continents ensures the first visible frame already has country outlines.
    const readyToShow = ipReady && geoFeaturesReady;

    // Merge user location into the visitors list — mark a matching city or prepend a new entry
    const enrichedVisitors = useMemo<Visitor[]>(() => {
        if (!userLocation) return visitors;
        const userCity = userLocation.city.toLowerCase().trim();
        const matchIdx = visitors.findIndex(v => v.city.toLowerCase().trim() === userCity);
        if (matchIdx >= 0) {
            return visitors.map((v, i) => (i === matchIdx ? { ...v, isUser: true } : v));
        }
        return [
            { city: userLocation.city, flag: userLocation.flag, country: userLocation.country,
              lat: userLocation.lat, lng: userLocation.lng, count: 1, live: false, isUser: true },
            ...visitors,
        ];
    }, [visitors, userLocation]);

    // Globe radius derived from the smaller canvas dimension so it always fits
    const baseRadius = Math.min(canvasWidth, canvasHeight) * radiusFraction;

    const dpr = useMemo(
        () => Math.min(typeof devicePixelRatio === 'number' ? devicePixelRatio : 1, 2),
        [],
    );

    useEffect(() => {
        fetchGeoFeatures().then(features => {
            setGeoFeatures(features);
            setGeoFeaturesReady(true);
        });
    }, []);

    // Push geoFeatures and visitors to the render worker whenever they change
    useEffect(() => {
        renderWorkerRef.current?.postMessage({ type: 'geofeatures', features: geoFeatures });
    }, [geoFeatures]);

    useEffect(() => {
        renderWorkerRef.current?.postMessage({ type: 'visitors', visitors: enrichedVisitors });
    }, [enrichedVisitors]);

    // Refs so the RAF closure always reads current values without restarting
    const baseRadiusRef = useRef(baseRadius);
    baseRadiusRef.current = baseRadius;
    const canvasWidthRef = useRef(canvasWidth);
    canvasWidthRef.current = canvasWidth;
    const canvasHeightRef = useRef(canvasHeight);
    canvasHeightRef.current = canvasHeight;
    // Transfer canvas control to render worker on first valid size; send resize on subsequent changes.
    // After transferControlToOffscreen() the canvas element stays in the DOM (events, getBoundingClientRect
    // still work) but the main thread can no longer call getContext() on it.
    useEffect(() => {
        if (canvasWidth === 0 || canvasHeight === 0) return;
        const canvas = canvasRef.current;
        const worker = renderWorkerRef.current;
        if (!canvas || !worker) return;

        if (!canvasTransferredRef.current) {
            canvasTransferredRef.current = true;
            const offscreen = canvas.transferControlToOffscreen();
            worker.postMessage(
                { type: 'init', canvas: offscreen, dpr, width: canvasWidth, height: canvasHeight },
                [offscreen],
            );
        } else {
            worker.postMessage({ type: 'resize', width: canvasWidth, height: canvasHeight, dpr });
        }
    }, [canvasWidth, canvasHeight, dpr, readyToShow]);

    // Snap globe to user location the moment the globe becomes ready to display.
    // Runs synchronously before the first RAF tick so the very first rendered frame
    // is already centred.  buildFlyState is idempotent: if Strict Mode fires this
    // twice the second call computes delta ≈ 0 and leaves the offset unchanged.
    useEffect(() => {
        if (!readyToShow) return;
        const center = userLocation ?? initialCenter;
        if (!center) return;
        const anim = animRef.current;
        const snap = buildFlyState(center.lat, center.lng, anim.userOffsetY, anim.rotX, getEarthRotY(Date.now()));
        anim.userOffsetY = snap.toOffsetY;
        anim.rotX      = snap.toRotX;
        anim.flyState  = null;
        if (userLocation) {
            anim.targetZoom = 1.5;
            anim.zoom       = 1.5;
            setZoomLabel('1.5×');
        }
    // updateZoomLabel is a stable useCallback([], []); omitting it avoids a
    // "used before declaration" error since it's defined further down.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyToShow, userLocation, initialCenter]);

    useEffect(() => {
        if (!readyToShow) return;

        function sendFrame(): void {
            const anim = animRef.current;
            const width = canvasWidthRef.current;
            const height = canvasHeightRef.current;
            workerIdleRef.current = false;
            pendingFrameRef.current = false;
            renderWorkerRef.current?.postMessage({
                type: 'frame',
                nowMs: Date.now(),
                userOffsetY: anim.userOffsetY,
                rotX: anim.rotX,
                targetZoom: anim.targetZoom,
                rotateEnabled: rotateEnabledRef.current,
                frozenEarthBase: pausedAngleRef.current,
                baseRadius: baseRadiusRef.current,
                cx: width / 2, cy: height / 2, width, height,
                frame: anim.frame,
                selectedFeatureIdx: selectedFeatureIdxRef.current,
            });
        }
        sendFrameRef.current = sendFrame;

        function tick(): void {
            const anim = animRef.current;

            // Fly animation — stays on main thread for zero-latency drag-cancel response
            if (anim.flyState?.active) {
                const result = stepFlyAnimation(anim.flyState);
                anim.userOffsetY = result.offsetY;
                anim.rotX = result.rotX;
                anim.flyState.active = result.active;
                anim.flyState.t += 0.03;
            }

            // Spin angle, zoom lerp, and solar info are computed inside the worker.
            // The worker sends them back via the 'pins' message so handlers always
            // reference the exact values used in the most recently rendered frame.
            pendingFrameRef.current = true;
            if (workerIdleRef.current) {
                sendFrame();
            }

            anim.frame++;
            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [readyToShow]);

    const clientToCanvas = useCallback((clientX: number, clientY: number): [number, number] => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return [0, 0];
        return [
            (clientX - rect.left) * (canvasWidth / rect.width),
            (clientY - rect.top) * (canvasHeight / rect.height),
        ];
    }, [canvasWidth, canvasHeight]);

    const checkInsideGlobe = useCallback((mx: number, my: number): boolean => {
        return isInsideGlobe(mx, my, canvasWidth / 2, canvasHeight / 2, baseRadius * animRef.current.zoom);
    }, [canvasWidth, canvasHeight, baseRadius]);

    const updateZoomLabel = useCallback((z: number) => {
        setZoomLabel(z.toFixed(1) + '×');
    }, []);

    const handleGlobeClick = useCallback((mx: number, my: number) => {
        // Use the exact rotation from the last rendered frame — more accurate than
        // reading a stale ref that may have advanced past what the user sees.
        const { rotY, rotX, effectiveRadius: radius } = lastWorkerFrameRef.current;
        const hit = inverseProjectGlobe(mx, my, rotY, rotX, radius, canvasWidthRef.current / 2, canvasHeightRef.current / 2);
        if (!hit) { setSelectedFeatureIdx(-1); return; }
        const clickedIdx = hitTestCountry(hit.lat, hit.lng, geoFeatures);
        if (clickedIdx === null) { setSelectedFeatureIdx(-1); return; }
        setSelectedFeatureIdx(prev => prev === clickedIdx ? -1 : clickedIdx);
    }, [geoFeatures]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const [mx, my] = clientToCanvas(e.clientX, e.clientY);
        if (!checkInsideGlobe(mx, my)) return;
        draggingRef.current = true;
        animRef.current.flyState = null;
        lastMouseRef.current = { x: mx, y: my };
        mouseDownPosRef.current = { x: mx, y: my };
        e.preventDefault();
    }, [clientToCanvas, checkInsideGlobe]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const [mx, my] = clientToCanvas(e.clientX, e.clientY);

        if (draggingRef.current) {
            const sens = getDragSensitivity(Math.min(canvasWidth, canvasHeight), animRef.current.zoom);
            animRef.current.userOffsetY += (mx - lastMouseRef.current.x) * sens;
            animRef.current.rotX += (my - lastMouseRef.current.y) * sens;
            animRef.current.rotX = Math.max(-1.3, Math.min(1.3, animRef.current.rotX));
            lastMouseRef.current = { x: mx, y: my };
        }

        const hit = hitTestPins(mx, my, pinPositionsRef.current);
        if (hit) {
            let tx = hit.sx + 16;
            let ty = hit.sy - 14;
            if (tx > canvasWidth - 160) tx = hit.sx - 150;
            setTooltipPosition({ x: tx, y: ty });
            setTooltipVisitor(hit.visitor);
            setTooltipVisible(true);
        } else {
            setTooltipVisible(false);
        }
    }, [clientToCanvas, canvasWidth, canvasHeight]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        const [mx, my] = clientToCanvas(e.clientX, e.clientY);
        const dx = mx - mouseDownPosRef.current.x;
        const dy = my - mouseDownPosRef.current.y;
        if (dx * dx + dy * dy < 36) handleGlobeClick(mx, my); // < 6px movement = click
    }, [clientToCanvas, handleGlobeClick]);

    const handleWheel = useCallback((e: WheelEvent) => {
        const [mx, my] = clientToCanvas(e.clientX, e.clientY);
        if (!checkInsideGlobe(mx, my)) return;
        e.preventDefault();
        e.stopPropagation();
        const next = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, animRef.current.targetZoom * Math.exp(-e.deltaY * 0.001)));
        animRef.current.targetZoom = next;
        updateZoomLabel(next);
    }, [clientToCanvas, checkInsideGlobe, updateZoomLabel]);

    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        const [mx, my] = clientToCanvas(e.touches[0].clientX, e.touches[0].clientY);
        if (e.touches.length === 1 && !checkInsideGlobe(mx, my)) return;
        e.preventDefault();
        draggingRef.current = true;
        animRef.current.flyState = null;
        if (e.touches.length === 1) {
            lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, pinchDist: 0 };
        } else if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastTouchRef.current.pinchDist = Math.sqrt(dx * dx + dy * dy);
        }
    }, [clientToCanvas, checkInsideGlobe]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!draggingRef.current) return;
        if (e.touches.length === 1) {
            const rect = canvasRef.current!.getBoundingClientRect();
            const scaleX = canvasWidth / rect.width;
            const scaleY = canvasHeight / rect.height;
            const dmx = (e.touches[0].clientX - lastTouchRef.current.x) * scaleX;
            const dmy = (e.touches[0].clientY - lastTouchRef.current.y) * scaleY;
            const sens = getDragSensitivity(Math.min(canvasWidth, canvasHeight), animRef.current.zoom);
            animRef.current.userOffsetY += dmx * sens;
            animRef.current.rotX += dmy * sens;
            animRef.current.rotX = Math.max(-1.3, Math.min(1.3, animRef.current.rotX));
            lastTouchRef.current.x = e.touches[0].clientX;
            lastTouchRef.current.y = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const next = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, animRef.current.targetZoom * (dist / lastTouchRef.current.pinchDist)));
            animRef.current.targetZoom = next;
            lastTouchRef.current.pinchDist = dist;
            updateZoomLabel(next);
        }
    }, [canvasWidth, canvasHeight, updateZoomLabel]);

    const handleTouchEnd = useCallback(() => { draggingRef.current = false; }, []);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handleMouseUp, handleMouseMove, handleTouchEnd, handleTouchMove]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.addEventListener('wheel', handleWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', handleWheel);
    }, [handleWheel, readyToShow]);

    const handleZoomIn = useCallback(() => {
        const next = Math.min(ZOOM_MAX, animRef.current.targetZoom * ZOOM_BUTTON_FACTOR);
        animRef.current.targetZoom = next;
        updateZoomLabel(next);
    }, [updateZoomLabel]);

    const handleZoomOut = useCallback(() => {
        const next = Math.max(ZOOM_MIN, animRef.current.targetZoom / ZOOM_BUTTON_FACTOR);
        animRef.current.targetZoom = next;
        updateZoomLabel(next);
    }, [updateZoomLabel]);

    const handleReset = useCallback(() => {
        if (userLocation) {
            pausedAngleRef.current = lastWorkerFrameRef.current.spinAngle;
            setRotateEnabled(false);
            localStorage.setItem('globe-rotate', 'false');
            animRef.current.flyState = buildFlyState(
                userLocation.lat,
                userLocation.lng,
                animRef.current.userOffsetY,
                animRef.current.rotX,
                pausedAngleRef.current,
            );
            animRef.current.targetZoom = 1.5;
            updateZoomLabel(1.5);
        } else {
            animRef.current.flyState = {
                active: true,
                t: 0,
                fromOffsetY: animRef.current.userOffsetY,
                fromRotX: animRef.current.rotX,
                toOffsetY: DEFAULT_OFFSET_Y,
                toRotX: DEFAULT_ROT_X,
            };
            animRef.current.targetZoom = initialZoom;
            updateZoomLabel(initialZoom);
        }
    }, [userLocation, initialZoom, updateZoomLabel]);


    const flyToCity = useCallback((visitor: Visitor) => {
        pausedAngleRef.current = lastWorkerFrameRef.current.spinAngle;
        setRotateEnabled(false);
        localStorage.setItem('globe-rotate', 'false');
        animRef.current.flyState = buildFlyState(
            visitor.lat,
            visitor.lng,
            animRef.current.userOffsetY,
            animRef.current.rotX,
            pausedAngleRef.current,
        );
        animRef.current.targetZoom = FLY_ZOOM_LEVEL;
        updateZoomLabel(FLY_ZOOM_LEVEL);
    }, [updateZoomLabel]);

    const handleToggleRotate = useCallback(() => {
        setRotateEnabled(prev => {
            const next = !prev;
            localStorage.setItem('globe-rotate', String(next));
            if (!next) {
                pausedAngleRef.current = lastWorkerFrameRef.current.spinAngle;
            }
            return next;
        });
    }, []);

    const totalVisits = enrichedVisitors.reduce((sum, v) => sum + v.count, 0);
    const totalCountries = new Set(enrichedVisitors.map(v => v.country)).size;
    const liveCount = enrichedVisitors.filter(v => v.live).length;

    // User chip always first so it's never pushed off by maxChips
    const displayVisitors = useMemo(() => {
        const userV = enrichedVisitors.find(v => v.isUser);
        const rest = enrichedVisitors.filter(v => !v.isUser);
        return userV ? [userV, ...rest].slice(0, maxChips) : enrichedVisitors.slice(0, maxChips);
    }, [enrichedVisitors, maxChips]);

    return (
        <div className={`globe-root${firstFrameReady ? '' : ' globe-root--loading'}`}>

            <div ref={canvasAreaRef} className='globe-canvas-area'>
                {/* Skeleton: shown until the worker delivers its first painted frame.
                    This covers both the IP/geo loading window AND the brief worker-init
                    gap that would otherwise flash a blank canvas. */}
                {!firstFrameReady && (
                    <div className='globe-skeleton'>
                        <div className='globe-skeleton__circle' />
                    </div>
                )}
                {/* Canvas enters the DOM as soon as dimensions are known so
                    transferControlToOffscreen() can run while skeleton is still visible.
                    It stays hidden until the first frame is ready to avoid a blank flash. */}
                {readyToShow && canvasWidth > 0 && canvasHeight > 0 && (
                    <div
                        className={`globe-container${firstFrameReady ? '' : ' globe-container--hidden'}`}
                        style={{ width: canvasWidth, height: canvasHeight }}
                    >
                        <canvas
                            ref={canvasRef}
                            className='globe-canvas'
                            style={{ width: canvasWidth, height: canvasHeight }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                        />

                        {selectedFeatureIdx >= 0 && geoFeatures[selectedFeatureIdx] && (
                            <div className='globe-country-label'>
                                {geoFeatures[selectedFeatureIdx].name ?? `Country #${geoFeatures[selectedFeatureIdx].id}`}
                            </div>
                        )}

                        <div
                            className={['globe-tooltip', tooltipVisible ? 'globe-tooltip--visible' : ''].join(' ')}
                            style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                        >
                            <div className='globe-tooltip__city'>
                                {tooltipVisitor?.flag} {tooltipVisitor?.city}
                                {tooltipVisitor?.isUser && <span className='globe-tooltip__you'> (you)</span>}
                            </div>
                            <div className='globe-tooltip__meta'>
                                {tooltipVisitor && (
                                    <>
                                        {tooltipVisitor.count} visit{tooltipVisitor.count !== 1 ? 's' : ''}{' '}
                                        · {tooltipVisitor.country}
                                        {tooltipVisitor.live ? ' · 🔴 live' : ''}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='globe-stats-bar'>
                            <div className='globe-stat'>
                                <span className='globe-stat__number'>{totalVisits}</span>
                                <span className='globe-stat__label'>visitors</span>
                            </div>
                            <div className='globe-stat-divider' />
                            <div className='globe-stat'>
                                <span className='globe-stat__number'>{totalCountries}</span>
                                <span className='globe-stat__label'>countries</span>
                            </div>
                            <div className='globe-stat-divider' />
                            <div className='globe-stat'>
                                <span className='globe-stat__number globe-stat__number--live'>{liveCount}</span>
                                <span className='globe-stat__label'>live now</span>
                            </div>
                        </div>

                        <div className='globe-chip-row'>
                            {displayVisitors.map(visitor => (
                                <button
                                    key={visitor.city}
                                    className={['globe-chip', visitor.isUser ? 'globe-chip--user' : ''].join(' ')}
                                    onClick={() => flyToCity(visitor)}
                                >
                                    <span
                                        className={[
                                            'globe-chip__dot',
                                            visitor.isUser ? 'globe-chip__dot--user' :
                                            visitor.live ? 'globe-chip__dot--live' : 'globe-chip__dot--visited',
                                        ].join(' ')}
                                    />
                                    {visitor.flag} {visitor.city}
                                    <span className='globe-chip__count'>{visitor.isUser ? '' : `${visitor.count}×`}</span>
                                    {visitor.live && <span className='globe-chip__live-badge'>live</span>}
                                    {visitor.isUser && <span className='globe-chip__you-badge'>you</span>}
                                </button>
                            ))}
                        </div>

                        <div className='globe-controls'>
                            <div className='globe-zoom-group'>
                                <button className='globe-zoom-button' onClick={handleZoomOut} aria-label='Zoom out'>
                                    −
                                </button>
                                <span className='globe-zoom-label'>{zoomLabel}</span>
                                <button className='globe-zoom-button' onClick={handleZoomIn} aria-label='Zoom in'>
                                    +
                                </button>
                                <div className='globe-zoom-divider' />
                                <button
                                    className='globe-zoom-button globe-zoom-button--icon'
                                    onClick={handleReset}
                                    aria-label='Reset view'
                                >
                                    ↺
                                </button>
                                <div className='globe-zoom-divider' />
                                <button
                                    className='globe-zoom-button globe-zoom-button--icon'
                                    onClick={handleToggleRotate}
                                    aria-label={rotateEnabled ? 'Pause rotation' : 'Resume rotation'}
                                    title={rotateEnabled ? 'Pause rotation' : 'Resume rotation'}
                                >
                                    {rotateEnabled ? '⏸' : '⏵'}
                                </button>
                            </div>
                            <div className='globe-solar-info'>{solarInfo}</div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
