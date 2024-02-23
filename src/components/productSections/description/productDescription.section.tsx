import {memo} from "react";
import type {ProductSectionProps} from "@/types/product";
import s from "./productDescription.module.scss";

function Section({product}: ProductSectionProps) {
	return (
		<article className={s.content}>
			{product.About ? (
				<product.About/>
			): (
				<p>{product.description}</p>
			)}
		</article>
	);
}

export const ProductDescriptionSection = memo(Section);