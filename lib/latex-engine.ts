'use client';

// Compiles via the latex-api Vercel project (see latex-api/ in this repo)
// instead of running a LaTeX engine client-side. That WASM approach (busytex)
// turned out to have an unfixable-from-here bug in its on-demand package
// loading (a stale kpathsea filename database after loading new TeX packages
// mid-session - see git history on this file for the full investigation),
// on top of needing a service worker + cross-origin isolation dance just to
// serve its multi-hundred-MB assets from a static host. The API sidesteps
// both: Tectonic ships its own resource cache, and there's no browser-side
// asset loading at all.
const API_URL = process.env.NEXT_PUBLIC_LATEX_API_URL ?? 'https://latex-api-three.vercel.app/api/compile';

export interface CompileResult {
	ok: boolean;
	pdf: Uint8Array | null;
	log: string;
}

interface CompileResponseBody {
	ok: boolean;
	pdf: string | null; // base64
	log: string;
}

function base64ToBytes(base64: string): Uint8Array {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}

export async function compile(source: string): Promise<CompileResult> {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ source }),
	});

	// api/compile.ts always returns this same JSON shape, success or failure
	// (400/413/500 included) - no need to branch on res.ok separately.
	const data: CompileResponseBody = await res.json();
	const pdf = data.ok && data.pdf ? base64ToBytes(data.pdf) : null;

	return {
		ok: data.ok && pdf !== null,
		pdf,
		log: data.log ?? '',
	};
}
