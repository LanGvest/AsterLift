import Head from "next/head";
import {microdataToString} from "@/utils/helpers";
import type {BreadcrumbList, ListItem} from "schema-dts";
import Config from "@config";

function validateUrl(url: string): string {
	return url.startsWith("http") ? url : Config.PROJECT_ORIGIN + url;
}

interface BreadcrumbItem {
	name: string
	url: string
}

interface Props {
	currentName: string
	breadcrumbs?: Array<BreadcrumbItem>
}

export default function BreadcrumbsMeta({currentName, breadcrumbs = []}: Props) {
	let position = 1;
	const items: Array<ListItem> = [];

	for(let breadcrumb of breadcrumbs) {
		items.push({
			"@type": "ListItem",
			"position": position++,
			"name": breadcrumb.name,
			"item": validateUrl(breadcrumb.url)
		});
	}

	items.push({
		"@type": "ListItem",
		"position": position++,
		"name": currentName
	});

	const microdata: BreadcrumbList = {
		"@type": "BreadcrumbList",
		"itemListElement": items
	};

	// noinspection HtmlRequiredTitleElement
	return (
		<Head>
			<script type="application/ld+json" dangerouslySetInnerHTML={{
				__html: microdataToString(microdata)
			}}></script>
		</Head>
	);
}