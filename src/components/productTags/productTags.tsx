import s from "./productTags.module.scss";
import React from "react";
import type {Product, ProductTag} from "@/types/product";
import {combineClasses} from "@/utils/helpers";
import type {Stylized} from "@/utils/helpers";

interface Props extends Stylized {
	product: Product
}

export function ProductTags({product, style, className}: Props) {
	const tags: Array<ProductTag> = [
		{
			id: "model",
			name: product.model
		},
		...product.tags
	];

	return (
		<div
			style={style}
			className={combineClasses(s.container, className)}
		>
			{tags.map(tag => (
				<React.Fragment key={tag.id}><span style={tag.style}>{tag.name}</span> </React.Fragment>
			))}
		</div>
	);
}