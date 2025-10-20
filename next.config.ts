import type { NextConfig } from "next";

const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	basePath: '',
	assetPrefix: '',
	reactStrictMode: true
};

export default nextConfig;
