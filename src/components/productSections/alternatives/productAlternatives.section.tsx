import {memo} from "react";
import s from "./productAlternatives.module.scss";
import type {ProductSectionProps} from "@/types/product";
import ProductCard from "@/components/productCard";
import Products from "@/assets/data/products";

function Section({product}: ProductSectionProps) {
	const alternatives = Products.filter(alternativeProduct => alternativeProduct.group === product.group && alternativeProduct.id !== product.id);

	return (
		<div className={s.productCards}>
			{alternatives.map(alternativeProduct => <ProductCard key={alternativeProduct.id} product={alternativeProduct}/>)}
		</div>
	);
}

export const ProductAlternativesSection = memo(Section);