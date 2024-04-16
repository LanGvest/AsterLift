import type {Product} from "@/types/product";
import React, {memo} from "react";
import s from "./productInfo.module.scss";
import ProductTags from "../productTags";
import PhoneIcon from "../../assets/icons/phone.icon";
import Note from "../../ui/note";
import OkIcon from "@/assets/icons/ok.icon";
import Link from "next/link";
import NoWrap from "@/ui/noWrap";
import {getDiscountDeadline} from "@/utils/helpers";
import StarIcon from "@/assets/icons/star.icon";

// const POINTS_AMOUNT: number = 5;
//
// interface Points {
// 	[x: number]: number
// }

// function getOldPriceChartPoints(product: Product): string {
// 	const seed = Math.abs(getHashCode(product.id));
// 	const random: Random = new Random(seed);
// 	const xStep = 100 / POINTS_AMOUNT;
// 	const yFactor = random.nextRange(10, 20);
// 	const yPadding = random.nextRange(10, 20);
// 	const yStep = (100 - yFactor * 2 - yPadding * 2) / POINTS_AMOUNT;
// 	const points: Points = {};
// 	let trendLineY = 100 - yFactor - yPadding;
//
// 	for(let x = 0; x <= 100; x += xStep) {
// 		points[x] = random.nextRange(trendLineY - yFactor, trendLineY + yFactor);
// 		trendLineY -= yStep;
// 	}
//
// 	const keys: Array<string> = Object.keys(points);
// 	const lastX1 = +keys[keys.length - 1];
// 	const lastX2 = +keys[keys.length - 2];
//
// 	if(points[lastX1] < points[lastX2]) {
// 		const diff = points[lastX2] - points[lastX1];
// 		const temp = points[lastX1];
// 		points[lastX1] = points[lastX2];
// 		points[lastX2] = temp + (diff / 2);
// 	}
//
// 	return Object.keys(points).map(x => `${x},${points[+x]}`).join(" ");
// }

interface Props {
	product: Product
}

function Component({product}: Props) {
	return (
		<div className={s.container}>
			<div>
				<div className={s.name}>
					<h1>{product.type}</h1>
					<span className={s.space}> </span>
					<ProductTags product={product} className={s.tags}/>
				</div>
				<div className={s.meta}>
					<div className={s.rateMeta}>
						<StarIcon/>
						<span>{product.rating.value.toLocaleString("ru")}</span>
					</div>
					<div className={s.skuMeta}>
						<span>Арт.</span>
						<span>{product.model.replace(/\./, "-")}</span>
					</div>
					<div className={s.orderMeta}>
						<div className={s.availabilitySignal}><div/></div>
						{/*<span>Есть в наличии</span>*/}
						<span>По предзаказу</span>
					</div>
				</div>
			</div>
			<p className={s.shortDescription}>{product.shortDescription}</p>
			<div className={s.advantages}>
				<div className={s.advantage}>
					<OkIcon/>
					<p>Имеется обязательный <Link href={"/about#certs"} target={"_blank"}>сертификат безопасности <NoWrap>ТР-ТС 010</NoWrap></Link></p>
				</div>
				{product.advantages.map(advantage => (
					<div key={advantage.id} className={s.advantage}>
						<OkIcon/>
						{typeof advantage.value === "string" ? (
							<p>{advantage.value}</p>
						) : advantage.value}
					</div>
				))}
				<div className={s.advantage}>
					<OkIcon/>
					<p>Изготовление, доставка и монтаж за <NoWrap>14 дней</NoWrap></p>
				</div>
				<div className={s.advantage}>
					<OkIcon/>
					<p>Гарантия <NoWrap>12 месяцев</NoWrap></p>
				</div>
			</div>
			<div>
				<div className={s.minPriceWrapper}>
					<p className={s.minPrice}>от <span>{product.getMinPriceString()}</span> BYN</p>
					{product.hasDiscount() && (
						<div className={s.oldMinPriceWrapper}>
							<p className={s.oldMinPrice}>{product.getOldMinPriceString()} BYN</p>
							<p className={s.oldMinPriceBonus}>-{product.getDiscountPercentage()}% {getDiscountDeadline()}</p>
						</div>
					)}
				</div>
				{/*<p className={s.minPriceNote}>Цена указана без учёта монтажных работ и доставки</p>*/}
			</div>
			<Note
				icon={<PhoneIcon/>}
				withPhone={true}
			>Для заказа или получения дополнительной информации звоните по номеру:</Note>
			{/*<button>Оставить заявку</button>*/}
		</div>
	);
}

export const ProductInfo = memo(Component);