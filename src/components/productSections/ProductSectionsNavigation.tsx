import s from "./productSections.module.scss";
import {memo} from "react";
import type {Product, ProductSection} from "@/types/product";
import type {Nullable, SetState} from "@/utils/helpers";
import React from "react";
import Products from "../../assets/data/products";

interface Props {
	sections: Array<ProductSection>
	product: Product
	activeSectionId: Nullable<string>
	setActiveSectionId: SetState<Nullable<string>>
}

function Component({activeSectionId, setActiveSectionId, product, sections}: Props) {
	return (
		<nav className={s.navigation}>
			<h6>Содержание</h6>
			{sections.map(section => {
				const isActive: boolean = section.id === activeSectionId;
				let key: string = section.id;
				if(isActive) key += "-active";

				const amount: number = section.getDisplayAmount?.(product, Products) || 0;

				return (
					<div
						key={key}
						className={s.anchor}
						data-active={isActive ? "" : undefined}
						onClick={() => {
							const $section = document.getElementById(section.id);
							if($section) $section.scrollIntoView();
							setActiveSectionId(() => section.id);
						}}
					>
						<p>{section.name}</p>
						{amount > 0 && <span>{amount}</span>}
					</div>
				);
			})}
			{/*<hr/>*/}
			{/*<p>{Config.CONTACTS.PHONE_NUMBER}</p>*/}
		</nav>
	);
}

export const ProductSectionsNavigation = memo(Component);