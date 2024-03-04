import Head from "next/head";
import type {Product} from "@/types/product";
import {validateUrl} from "@/utils/url";

interface Props {
	product: Product
}

export default function TwitterCardProductMeta({product}: Props) {
	return (
		<Head>
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:title" content={product.getTitle()}/>
			<meta name="twitter:description" content={product.getPageDescription()}/>
			<meta name="twitter:image" content={validateUrl(product.overview[0].image.src)}/>
			<meta name="twitter:image:alt" content={product.getName()}/>
		</Head>
	);
}