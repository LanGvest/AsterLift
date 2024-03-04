import Head from "next/head";
import type {Product} from "@/types/product";
import {validateUrl} from "@/utils/url";

interface Props {
	product: Product
}

export default function OpenGraphProductMeta({product}: Props) {
	return (
		<Head>
			<meta property="og:type" content="product"/>
			<meta property="og:title" content={product.getTitle()}/>
			<meta property="og:url" content={validateUrl(product.getUrl())}/>
			<meta property="og:image" content={validateUrl(product.overview[0].image.src)}/>
			<meta property="og:description" content={product.getPageDescription()}/>
			<meta property="product:plural_title" content={product.getPluralName()}/>
			<meta property="product:price.amount" content={product.minPrice.toString()}/>
			<meta property="product:price.currency" content="BYN"/>
		</Head>
	);
}