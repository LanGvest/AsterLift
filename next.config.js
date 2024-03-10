const loaderUtils = require("loader-utils");
const path = require( "path");
const {initializeApp} = require( "firebase/app");
const {getDatabase, ref, get} = require( "firebase/database");

const cache = {};

const app = initializeApp({
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

const database = getDatabase(app);
const productsRef = ref(database, "products");

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

async function getProductsData() {
	if(cache["productsData"]) return cache["productsData"];
	console.log("[ASTER-LIFT WEBPACK]: Fetching products data from Firebase Realtime Database...");
	const snapshot = await get(productsRef);
	console.log("[ASTER-LIFT WEBPACK]: Products data was SUCCESSFULLY fetched from Firebase Realtime Database!");
	const data = snapshot.val();
	// console.log("[ASTER-LIFT WEBPACK]: Products data:", data);
	return cache["productsData"] = data;
}

module.exports = async () => {
	const productsData = await getProductsData();

	/** @type {import("next").NextConfig} */
	const nextConfig = {
		reactStrictMode: false,
		swcMinify: true,
		experimental: {
			scrollRestoration: true
		},
		webpack(config, {dev, webpack}) {
			// noinspection JSCheckFunctionSignatures
			config.plugins.push(
				new webpack.DefinePlugin({
					"process.env.BUILT_AT": JSON.stringify(new Date().toISOString()),
					"process.env.PRODUCTS_DATA": productsData
				})
			);

			const rules = config.module.rules.find(rule => typeof rule.oneOf === "object").oneOf.filter(rule => Array.isArray(rule.use));

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

	return withBundleAnalyzer(nextConfig);
};