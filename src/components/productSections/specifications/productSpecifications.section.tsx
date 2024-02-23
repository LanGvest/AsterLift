import React, {memo} from "react";
import type {ReactNode} from "react";
import type {
	ProductSectionProps, ProductSpecification,
	ProductSpecificationValue,
	ProductSpecificationValueItem
} from "@/types/product";
import s from "./productSpecifications.module.scss";
import PhoneIcon from "@/assets/icons/phone.icon";
import LogoIcon from "@/assets/icons/logo.icon";
import Note from "@/ui/note";
import Val from "@/ui/val";
import InlineColor from "@/ui/inlineColor";

function getValueKey(item: ProductSpecificationValueItem): string {
	if(typeof item === "string") return item;
	if(typeof item === "boolean") return String(item);
	return item.text || "";
}

interface ValueProps {
	value: ProductSpecificationValue
}

function Value({value}: ValueProps) {
	if(value instanceof Array) return (
		<span className={s.variants}>{value.map(item => (
			<Val
				key={getValueKey(item)}
				darken={typeof item === "object" && item.another}
			><Value value={item}/></Val>
		))}</span>
	);

	if(typeof value == "object" && typeof value.available === "boolean") {
		return <>{value.available ? "Есть" : "Нет"}</>;
	}

	if(typeof value === "boolean") {
		return <>{value ? "Есть" : "Нет"}</>;
	}

	if(typeof value === "string") return <>{value}</>;

	let component: ReactNode = value.text;

	if(value.color) component = <InlineColor inlineColor={value.color}>{component}</InlineColor>;

	return <>{component}</>;
}

function hasDarkenValues(specifications: Array<ProductSpecification>) {
	for(const specification of specifications) {
		const value = specification.value;
		if(typeof value !== "object") continue;

		if(value instanceof Array) {
			for(const valueItem of value) {
				if(typeof valueItem !== "object") continue;
				if(valueItem.another) return true;
			}
		} else if(value.another) return true;
	}
	return false;
}

function Section({product}: ProductSectionProps) {
	return (
		<>
			{hasDarkenValues(product.specifications) && (
				<div className={s.notations}>
					<div className={s.notation}>
						<p><span className={s.mark}/> – характеристики, не входящие в стандартную цену</p>
					</div>
				</div>
			)}
			<div className={s.content}>
				<div className={s.row}>
					<p className={s.name}>Производитель</p>
					<div className={s.logo}>
						<LogoIcon/>
						<p>Астер-Лифт</p>
					</div>
				</div>
				<div className={s.row}>
					<p className={s.name}>Модель</p>
					<p className={s.value}>{product.model}</p>
				</div>
				<div className={s.row}>
					<p className={s.name}>Тип</p>
					<p className={s.value}>{product.type}</p>
				</div>
				{product.specifications.map(specification => (
					<div key={specification.id} className={s.row}>
						<p className={s.name}>{specification.name}</p>
						<p className={s.value}><Value value={specification.value}/></p>
					</div>
				))}
			</div>
			<Note
				className={s.note}
				icon={<PhoneIcon/>}
				withPhone={true}
			>Написать про индивидуальный подход и возможность гибко подобрать другие характеристики по телефону:</Note>
		</>
	);
}

export const ProductSpecificationsSection = memo(Section);