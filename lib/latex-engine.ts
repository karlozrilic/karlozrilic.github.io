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
		if (navigator.serviceWorker?.controller) await prefetchBinaries();

		const texRunner = new BusyTexRunner({
			busytexBasePath: ASSET_BASE,
			preloadDataPackages: ['texlive-basic.js'],
			catalogDataPackages: ['texlive-recommended.js', 'texlive-extra.js']
			// engineMode: 'pdftex', // smaller than 'combined'; use 'xetex' if you need UTF-8/OpenType
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
		() => runCompile(source),
		() => runCompile(source),
	);
	chain = run.catch(() => {});
	return run;
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