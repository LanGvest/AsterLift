import type {Product} from "@/types/product";
import React, {memo} from "react";
import s from "./productInfo.module.scss";
import ProductTags from "../productTags";
import PhoneIcon from "../../assets/icons/phone.icon";
import Note from "../../ui/note";

interface Props {
	product: Product
}

function Component({product}: Props) {
	return (
		<div className={s.container}>
			<h1 className={s.name}>{product.type} <ProductTags product={product} className={s.tags}/></h1>
			<p className={s.shortDescription}>{product.shortDescription}</p>
			<p className={s.minPrice}>от <span>{product.minPrice.toLocaleString("ru-RU")}</span> BYN</p>
			<Note
				icon={<PhoneIcon/>}
				withPhone={true}
			>Для заказа или получения дополнительной информации звоните по номеру:</Note>
			{/*<button>Как заказать</button>*/}
		</div>
	);
}

export const ProductInfo = memo(Component);