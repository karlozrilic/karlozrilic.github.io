import type { NextConfig } from "next";

const COI = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
];

const ISOLATED = ["/preview", "/admin/cv"];

const nextConfig: NextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	basePath: '',
	assetPrefix: '',
	reactStrictMode: true,
	experimental: {
		optimizeCss: false,
	},
	async headers() {
		return [
			{ source: `/:path(${ISOLATED.map((path) => path.slice(1)).join("|")})`, headers: COI },
			{
				source: "/(.*)",
				headers: [
					{ key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
				],
			},
		];
	},
};

export default nextConfig;
