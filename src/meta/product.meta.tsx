import Head from "next/head";
import type {Product} from "@/types/product";
import type {Product as ProductSchema} from "schema-dts";
import {microdataToString} from "@/utils/helpers";

interface Props {
	product: Product
}

export default function ProductMeta({product}: Props) {
	const microdata: ProductSchema = {
		"@type": "Product",
		"url": `https://asterlift.by/${product.id}`,
		"description": product.shortDescription,
		"name": `${product.type} ${product.model}`,
		"model": product.model,
		"image": product.overview[0].image.src
	};

	// noinspection HtmlRequiredTitleElement
	return (
		<Head>
			<script type="application/ld+json" dangerouslySetInnerHTML={{
				__html: microdataToString(microdata)
			}}/>
		</Head>
	);
}