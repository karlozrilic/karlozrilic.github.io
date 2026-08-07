'use client';
import { BusyTexRunner, PdfLatex } from 'texlyre-busytex';

const ASSET_BASE = process.env.NEXT_PUBLIC_BUSYTEX_BASE ?? '/core/busytex';

export interface CompileResult {
	ok: boolean;
	pdf: Uint8Array | null;
	log: string;
}

export interface BootProgress {
	loaded: number;
	total: number;
	pct: number;
}

let runner: BusyTexRunner | null = null;
let booting: Promise<BusyTexRunner> | null = null;
let chain: Promise<unknown> = Promise.resolve();

let lastProgress: BootProgress | null = null;
let lastEmit = 0;
const BINARIES = [
	{ name: 'busytex.wasm', size: 32501975 },
  	{ name: 'texlive-basic.data', size: 90786746 },
	{ name: 'texlive-extra.data', size: 339644138 },
	// catalogDataPackages below also allows texlive-recommended.js to be
	// pulled in on demand; without warming it here too, a compile that
	// needs it (or the resolver's "package didn't resolve, enable
	// everything" fallback) falls back to an unwarmed worker-side fetch
	// instead of a cache hit from this prefetch.
	{ name: 'texlive-recommended.data', size: 199273688 },
];
const listeners = new Set<(progress: BootProgress) => void>();

export function onBootProgress(fn: (progress: BootProgress) => void): () => void {
	if (lastProgress) fn(lastProgress);
	listeners.add(fn);
	return () => listeners.delete(fn);
}

function emit(loaded: number, total: number, force = false) {
	const now = performance.now();
  	if (!force && now - lastEmit < 100) return false;
	lastEmit = now;
	const progress = { loaded, total, pct: total ? Math.round((loaded / total) * 100) : 0 };
	lastProgress = progress;
	for (const fn of listeners) fn(progress);
	return true;
}

async function waitForServiceWorkerControl(): Promise<void> {
	if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
	if (navigator.serviceWorker.controller) return;

	const registration = await navigator.serviceWorker.getRegistration().catch(() => undefined);
	if (!registration) return; // no service worker for this origin (e.g. local dev)

	await Promise.race([
		navigator.serviceWorker.ready,
		new Promise((resolve) => setTimeout(resolve, 10000)),
	]);
	if (navigator.serviceWorker.controller) return;

	// Registration is active but hasn't claimed this client yet (e.g. it
	// activated after this page's own navigation). Wait for it to do so
	// rather than letting asset fetches race ahead uncontrolled.
	await new Promise<void>((resolve) => {
		const onChange = () => {
			navigator.serviceWorker.removeEventListener('controllerchange', onChange);
			resolve();
		};
		navigator.serviceWorker.addEventListener('controllerchange', onChange);
		setTimeout(resolve, 5000);
	});
}

async function prefetchBinaries() {
	const responses: { res: Response; size: number }[] = [];
	let total = 0;

	for (const { name, size } of BINARIES) {
		const res = await fetch(`${ASSET_BASE}/${name}`);
		if (!res.ok || !res.body) throw new Error(`prefetch failed: ${name} (${res.status})`);
		const declared = Number(res.headers.get('content-length')) || size;
		total += declared;
		responses.push({ res, size: declared });
	}

	let loaded = 0;
	for (const { res } of responses) {
		const reader = res.body!.getReader();
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			loaded += value.byteLength;
			if (emit(Math.min(loaded, total), total)) {
				await new Promise((resolve) => setTimeout(resolve, 0));
			}
    	}
  	}
}

async function boot(): Promise<BusyTexRunner> {
	if (runner) return runner;
	if (booting) return booting;

	booting = (async () => {
		await waitForServiceWorkerControl();

		if (navigator.serviceWorker?.controller) await prefetchBinaries();

		const texRunner = new BusyTexRunner({
			busytexBasePath: ASSET_BASE,
			// preloadDataPackages: ['texlive-basic.js', 'texlive-extra.js'],
			preloadDataPackages: ['texlive-basic.js'],
			catalogDataPackages: ['texlive-recommended.js', 'texlive-extra.js'],
			// engineMode: 'pdftex', // smaller than 'combined'; use 'xetex' if you need UTF-8/OpenType
			// Fires for packages pulled in on-demand mid-compile (not just the
			// initial boot fetch), so the UI can reflect that download too
			// instead of sitting frozen at the last boot progress value.
			onDownloadProgress: (progress) => emit(progress.loaded, progress.total, true),
			// Surfaces package resolution + on-demand load decisions (which
			// data package a \usepackage resolved to, or the "enabling all
			// available data packages" fallback when one doesn't resolve) in
			// the browser console. This is currently the only way to see why
			// a package ends up unavailable mid-compile - the compile log
			// only contains the pdflatex/bibtex/makeindex transcripts.
			verbose: true,
		});
		await texRunner.initialize(true); // true = run in a Web Worker
		runner = texRunner;
		emit(1, 1, true);
		return texRunner;
	})();

	booting.catch(() => {
		booting = null; // allow retry
	});
	return booting;
}

export function compile(source: string): Promise<CompileResult> {
	const run = chain.then(
		() => runCompileWithRetry(source),
		() => runCompileWithRetry(source),
	);
	chain = run.catch(() => {});
	return run;
}

// A rejection here means something in the boot/compile pipeline itself broke
// (worker init failure, network hiccup fetching assets, compile timeout) as
// opposed to a normal LaTeX error, which resolves with `ok: false` and never
// throws. Those infra failures are usually transient, so give it one retry
// against a freshly booted engine before surfacing an error to the user.
async function runCompileWithRetry(source: string, attempt = 0): Promise<CompileResult> {
	try {
		return await runCompile(source);
	} catch (err) {
		if (attempt >= 1) throw err;
		resetEngine();
		return runCompileWithRetry(source, attempt + 1);
	}
}

async function runCompile(source: string): Promise<CompileResult> {
	const texRunner = await boot();
	const pdflatex = new PdfLatex(texRunner);
	const result = await pdflatex.compile({ input: source });
	return {
		ok: result.success,
		pdf: result.pdf ?? null,
		log: result.log ?? '',
	};
}

export function resetEngine() {
	runner?.terminate();
	runner = null;
	booting = null;
}