import {memo} from "react";
import s from "./productAlternatives.module.scss";
import type {Product, ProductSectionProps} from "@/types/product";
import ProductCard from "@/components/productCard";
import Products from "@/assets/data/products";

function getAlternatives(product: Product): Array<Product> {
	const arr: Array<Product> = [];
	arr.push(...Products.filter(alternativeProduct => alternativeProduct.id !== product.id && alternativeProduct.group === product.group));
	arr.push(...Products.filter(alternativeProduct => alternativeProduct.id !== product.id && !arr.includes(alternativeProduct)));
	return arr;
}

function Section({product}: ProductSectionProps) {
	const alternatives = getAlternatives(product);

	return (
		<div className={s.productCards}>
			{alternatives.map(alternativeProduct => <ProductCard key={alternativeProduct.id} product={alternativeProduct}/>)}
		</div>
	);
}

export const ProductAlternativesSection = memo(Section);