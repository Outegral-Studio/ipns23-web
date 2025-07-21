import type { NextConfig } from "next";



export default {
	devIndicators: {
		position: "bottom-right",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tsnzy599vi.ufs.sh",  // UploadThing (Classmates)
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "foxp9d4zmo.ufs.sh",  // UploadThing (Memories)
				pathname: "/f/**",
			},
		]
	},
	turbopack: {
		resolveAlias: {
			"micromark-extension-math": "micromark-extension-llm-math",
		},
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"micromark-extension-math": "micromark-extension-llm-math",
		};
		return config;
	},
} satisfies NextConfig;