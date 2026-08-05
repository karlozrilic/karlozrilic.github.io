'use client';
import { BusyTexRunner, PdfLatex } from 'texlyre-busytex';

const ASSET_BASE = process.env.NEXT_PUBLIC_BUSYTEX_BASE ?? '/core/busytex';

export interface CompileResult {
	ok: boolean;
	pdf: Uint8Array | null;
	log: string;
}

let runner: BusyTexRunner | null = null;
let booting: Promise<BusyTexRunner> | null = null;
let chain: Promise<unknown> = Promise.resolve();

async function boot(): Promise<BusyTexRunner> {
	if (runner) return runner;
	if (booting) return booting;

	booting = (async () => {
		const r = new BusyTexRunner({
			busytexBasePath: ASSET_BASE,
			preloadDataPackages: ['texlive-basic.js'],
  			catalogDataPackages: ['texlive-recommended.js', 'texlive-extra.js'],
			// engineMode: 'pdftex', // smaller than 'combined'; use 'xetex' if you need UTF-8/OpenType
		});
		await r.initialize(true); // true = run in a Web Worker
		runner = r;
		return r;
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
	const r = await boot();
	const pdflatex = new PdfLatex(r);
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