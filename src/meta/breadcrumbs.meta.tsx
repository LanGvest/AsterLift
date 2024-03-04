import type {BreadcrumbList, ListItem} from "schema-dts";
import {validateUrl} from "@/utils/url";
import MicrodataMeta from "@/meta/microdata.meta";

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

	return (
		<MicrodataMeta microdata={microdata}/>
	);
}