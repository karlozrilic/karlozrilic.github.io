import type { NextConfig } from "next";

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
