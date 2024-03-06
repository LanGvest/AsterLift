import type {Product} from "@/types/product";
import React, {memo} from "react";
import s from "./productInfo.module.scss";
import ProductTags from "../productTags";
import PhoneIcon from "../../assets/icons/phone.icon";
import Note from "../../ui/note";
import OkIcon from "@/assets/icons/ok.icon";
import Link from "next/link";
import NoWrap from "@/ui/noWrap";

interface Props {
	product: Product
}

function Component({product}: Props) {
	return (
		<div className={s.container}>
			<h1 className={s.name}>{product.type} <ProductTags product={product} className={s.tags}/></h1>
			<p className={s.shortDescription}>{product.shortDescription}</p>
			<div className={s.features}>
				<div className={s.feature}>
					<OkIcon/>
					<p>Имеется обязательный <Link href={"/about#certs"}>сертификат безопасности <NoWrap>ТР-ТС 010</NoWrap></Link></p>
				</div>
				{product.advantages.map(advantage => (
					<div key={advantage.id} className={s.feature}>
						<OkIcon/>
						{typeof advantage.value === "string" ? (
							<p>{advantage.value}</p>
						) : advantage.value}
					</div>
				))}
				<div className={s.feature}>
					<OkIcon/>
					<p>Изготовление, доставка и монтаж за 14 дней</p>
				</div>
				<div className={s.feature}>
					<OkIcon/>
					<p>Гарантия 12 месяцев</p>
				</div>
			</div>
			<div>
				<p className={s.minPrice}>от <span>{product.minPrice.toLocaleString("ru-RU")}</span> BYN</p>
				{/*<p className={s.minPriceNote}>Цена указана без учёта монтажных работ и доставки</p>*/}
			</div>
			{/*<p className={s.minPrice}></p>*/}
			<Note
				icon={<PhoneIcon/>}
				withPhone={true}
			>Для заказа или получения дополнительной информации звоните по номеру:</Note>
			{/*<button>Оставить заявку</button>*/}
		</div>
	);
}

export const ProductInfo = memo(Component);