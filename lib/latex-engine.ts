'use client';
import { BusyTexRunner, PdfLatex } from 'texlyre-busytex';

const ASSET_BASE = process.env.NEXT_PUBLIC_BUSYTEX_BASE ?? '/core/busytex';
const PROGRESS_RE = /Downloading data\.\.\.\s*\((\d+)\/(\d+)\)/;

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

const BINARIES = ['busytex.wasm', 'texlive-basic.data'];
const listeners = new Set<(progress: BootProgress) => void>();

export function onBootProgress(fn: (progress: BootProgress) => void): () => void {
	listeners.add(fn);
	return () => listeners.delete(fn);
}

function emit(loaded: number, total: number) {
	const progress = { loaded, total, pct: total ? Math.round((loaded / total) * 100) : 0 };
	for (const fn of listeners) fn(progress);
}

async function prefetchBinaries() {
	const responses: Response[] = [];
	let total = 0;

	for (const name of BINARIES) {
		const res = await fetch(`${ASSET_BASE}/${name}`);
		if (!res.ok || !res.body) throw new Error(`prefetch failed: ${name} (${res.status})`);
		total += Number(res.headers.get('content-length') ?? 0);
		responses.push(res);
	}

	let loaded = 0;
	for (const res of responses) {
		const reader = res.body!.getReader();
		let chunks = 0;
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks++;
			loaded += value.byteLength;
			console.log('[prefetch] chunk', chunks, loaded, '/', total);
			emit(loaded, total);
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
		emit(1, 1);
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