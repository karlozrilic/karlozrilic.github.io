import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: 'export', // 👈 This enables static export
	images: {
		unoptimized: true, // Required for GitHub Pages
	},
	basePath: '', // if deploying to username.github.io
	assetPrefix: '',
	reactStrictMode: true
};

export default nextConfig;
