import type {GetServerSidePropsContext} from "next";
import Products from "@/assets/data/products";
import AppNavigation from "@/assets/data/appNavigation";
import Config from "@config";
import {validateUrl} from "@/utils/url";
import {xml} from "@/utils/helpers";

export default function SitemapXml() {}

interface SiteMapEntry {
	url: string
	priority: number
	lastModified?: string
}

function getSiteMapEntries(): Array<SiteMapEntry> {
	const entries: Array<SiteMapEntry> = [];

	for(const product of Products) {
		entries.push({
			url: product.getUrl(),
			priority: 1
		});
	}

	for(const navItem of AppNavigation) {
		entries.push({
			url: navItem.path,
			priority: navItem.path === "/" ? 1 : 0.7
		});
	}

	return entries;
}

function generateSiteMap(): string {
	const entries = getSiteMapEntries();

	// noinspection HttpUrlsUsage
	return xml`
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${entries.map(entry => `
				<url>
					<loc>${validateUrl(entry.url)}</loc>
					<lastmod>${entry.lastModified || Config.BUILT_AT}</lastmod>
					<priority>${entry.priority}</priority>
				</url>
			`).join("")}
		</urlset>
	`;
}

export async function getServerSideProps({res}: GetServerSidePropsContext) {
	const sitemap = generateSiteMap();

	// res.setHeader("Content-Length", sitemap.length);
	res.setHeader("Content-Type", "application/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {}
	};
}