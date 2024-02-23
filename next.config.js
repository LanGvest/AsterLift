const loaderUtils = require("loader-utils");
const path = require("path");

// noinspection JSUnresolvedReference
const hashOnlyIdent = (context, _, exportName) => loaderUtils
	.getHashDigest(
		Buffer.from(`filePath:${path.relative(context.rootContext, context.resourcePath).replace(/\\+/g, "/")}#className:${exportName}`),
		"md4",
		"base64",
		6
	)
	.replace(/[^a-zA-Z0-9-_]/g, "_")
	.replace(/^(-?\d|--)/, "_$1");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true"
});

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: false,
	swcMinify: true,
	experimental: {
		scrollRestoration: true
	},
	webpack(config, {dev}) {
		const rules = config.module.rules
			.find(rule => typeof rule.oneOf === "object")
			.oneOf.filter(rule => Array.isArray(rule.use));

		if(!dev) rules.forEach(rule => {
			rule.use.forEach(moduleLoader => {
				if(moduleLoader.loader?.includes("css-loader") && !moduleLoader.loader?.includes("postcss-loader")) {
					moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
				}
			});
		});

		return config;
	}
};

module.exports = withBundleAnalyzer(config);