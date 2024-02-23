import type {Product, ProductSection} from "@/types/product";
import {memo, useEffect, useMemo, useState} from "react";
import s from "./productSections.module.scss";
import type {Nullable} from "@/utils/helpers";
import Products from "@/assets/data/products";
import AvailableProductSections from "@/assets/data/productSections";
import {ProductSectionsNavigation} from "./ProductSectionsNavigation";
import {ProductSectionsContent} from "./ProductSectionsContent";

interface Props {
	product: Product
}

function Component({product}: Props) {
	const sections = useMemo<Array<ProductSection>>(() => AvailableProductSections.filter(section => section.shouldInclude(product, Products)), [product]);
	const [activeSectionId, setActiveSectionId] = useState<Nullable<string>>(null);

	useEffect(() => {
		const observableHeight: number = window.innerHeight * 0.1;
		const $sectionDividers = document.querySelectorAll("." + s.divider);

		const productSectionsObserver = new IntersectionObserver(entries => {
			for(const entry of entries) {
				if(entry.boundingClientRect.y > observableHeight) return;

				const sectionId: Nullable<string> = entry.target.getAttribute("data-section");
				if(!sectionId) return;

				if(entry.isIntersecting) {
					const prevSectionId: Nullable<string> = entry.target.getAttribute("data-prev-section");
					setActiveSectionId(() => prevSectionId);
				} else {
					setActiveSectionId(() => sectionId);
				}
			}
		});

		$sectionDividers.forEach($sectionDivider => productSectionsObserver.observe($sectionDivider));

		return () => {
			productSectionsObserver.disconnect();
		};
	}, []);

	return (
		<>
			<ProductSectionsNavigation
				sections={sections}
				product={product}
				activeSectionId={activeSectionId}
				setActiveSectionId={setActiveSectionId}
			/>
			<ProductSectionsContent
				sections={sections}
				product={product}
			/>
		</>
	);
}

export const ProductSections = memo(Component);