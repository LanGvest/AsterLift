import Head from "next/head";
import type {Product} from "@/types/product";
import type {Product as ProductSchema} from "schema-dts";
import {microdataToString} from "@/utils/helpers";
import Config from "@config";

interface Props {
	product: Product
}

export default function ProductMeta({product}: Props) {
	const microdata: ProductSchema = {
		"@type": "Product",
		"url": `${Config.PROJECT_ORIGIN}/${product.id}`,
		"productID": product.id,
		"category": product.type,
		"description": product.getPageDescription(),
		"name": product.getName(),
		"model": product.model,
		"image": product.overview.map(image => image.image.src),
		"brand": {
			"@type": "Brand",
			"name": Config.PROJECT_NAME
		},
		"manufacturer": {
			"@type": "Organization",
			"name": Config.PROJECT_NAME
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": product.rating.value,
			"reviewCount": product.rating.count
		},
		"offers": {
			"@type": "AggregateOffer",
			"url": `${Config.PROJECT_ORIGIN}/${product.id}`,
			"availability": "https://schema.org/PreOrder",
			"itemCondition": "https://schema.org/NewCondition",
			"lowPrice": product.minPrice,
			"priceCurrency": "BYN",
			"shippingDetails": {
				"@type": "OfferShippingDetails",
				"shippingDestination": {
					"@type": "DefinedRegion",
					"addressCountry": "BY"
				}
			}
		}
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