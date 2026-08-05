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

const listeners = new Set<(progress: BootProgress) => void>();

export function onBootProgress(fn: (progress: BootProgress) => void): () => void {
	listeners.add(fn);
	return () => listeners.delete(fn);
}

function emit(loaded: number, total: number) {
	const progress = { loaded, total, pct: total ? Math.round((loaded / total) * 100) : 0 };
	for (const fn of listeners) fn(progress);
}

async function boot(): Promise<BusyTexRunner> {
	if (runner) return runner;
	if (booting) return booting;

	booting = (async () => {
		const originalLog = console.log;

		console.log = (...args: unknown[]) => {
			const first = typeof args[0] === 'string' ? args[0] : '';
			const message = PROGRESS_RE.exec(first);
			if (message) {
				emit(Number(message[1]), Number(message[2]));
				return;
			}
			originalLog.apply(console, args);
		};

		try {
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
		} finally {
			console.log = originalLog;
		}
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