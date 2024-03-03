import s from "./productSections.module.scss";
import {memo} from "react";
import type {Product, ProductSection} from "@/types/product";
import type {Nullable, SetState} from "@/utils/helpers";
import React from "react";
import Products from "../../assets/data/products";
import Link from "next/link";

interface Props {
	sections: Array<ProductSection>
	product: Product
	activeSectionId: Nullable<string>
	setActiveSectionId: SetState<Nullable<string>>
}

function Component({activeSectionId, product, sections}: Props) {
	return (
		<nav className={s.navigation}>
			<p className={s.title}>Быстрая навигация</p>
			{sections.map((section, index) => (
				<Link
					key={section.id}
					href={"#" + section.id}
					className={s.anchor}
					data-active={section.id === activeSectionId ? "" : undefined}
					onClick={(event) => {
						event.preventDefault();
						const $section = document.getElementById(section.id);
						if($section) $section.scrollIntoView();
					}}
				>{index + 1}. {section.name}</Link>
			))}
			{/*<hr/>*/}
			{/*<p>{Config.CONTACTS.PHONE_NUMBER}</p>*/}
		</nav>
	);
}

export const ProductSectionsNavigation = memo(Component);