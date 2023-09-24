const path = require("path");

/** @type {import('next').NextConfig} */

const config = {
	output: "standalone",
	swcMinify: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "app/sass")],
	},
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ["mysql2", "Swiper"],
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	env: {
		BASE_URL: "http://localhost:3002/",
		BASE_IMG_URL: "http://control.mg2.org/images/",
		COMPANY_NAME: "Jacob Daniel",
	},
	distDir: "build",
	basePath: "",
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "control.mg2.org",
				port: "",
				pathname: "/images/**",
			},
		],
	},
};
module.exports = config;
