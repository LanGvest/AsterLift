import type {OfferCatalog} from "schema-dts";
import {validateUrl} from "@/utils/url";
import Products from "@/assets/data/products";
import {LOWEST_PRICE_STRING} from "@/assets/data/products/products";
import MicrodataMeta from "@/meta/microdata.meta";

export default function CatalogMeta() {
	const microdata: OfferCatalog = {
		"@type": "OfferCatalog",
		"name": "Подъёмники для инвалидов",
		"image": validateUrl(Products[0].overview[0].image.src),
		"description": `Сертифицированные подъёмники для инвалидов от ${LOWEST_PRICE_STRING} BYN в Беларуси.`,
		"itemListElement": Products.map(product => ({
			"@type": "Offer",
			"name": product.getName(),
			"description": product.getPageDescription(),
			"url": validateUrl(product.getUrl()),
			"price": product.getMinPrice(),
			"priceCurrency": "BYN",
			"image": validateUrl(product.overview[0].image.src),
			"availability": "https://schema.org/PreOrder"
		}))
	};

	return (
		<MicrodataMeta microdata={microdata}/>
	);
}