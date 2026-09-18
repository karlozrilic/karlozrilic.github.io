import type { NextConfig } from "next";

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
