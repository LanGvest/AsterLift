import type {Product} from "@/types/product";
import type {Product as ProductSchema} from "schema-dts";
import Config from "@config";
import {validateUrl} from "@/utils/url";
import MicrodataMeta from "@/meta/microdata.meta";

interface Props {
	product: Product
}

export default function ProductMeta({product}: Props) {
	const microdata: ProductSchema = {
		"@type": "Product",
		"url": validateUrl(product.getUrl()),
		"productID": product.id,
		"name": product.getName(),
		"description": product.getPageDescription(),
		"category": product.type,
		"model": product.model,
		"sku": product.id,
		"image": product.overview.map(image => validateUrl(image.image.src)),
		"brand": Config.PROJECT_NAME,
		"manufacturer": Config.PROJECT_NAME,
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": product.rating.value,
			"reviewCount": product.rating.count
		},
		"offers": {
			"@type": "AggregateOffer",
			"url": validateUrl(product.getUrl()),
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

	return (
		<MicrodataMeta microdata={microdata}/>
	);
}