import type {ProductSectionProps} from "@/types/product";
import {memo} from "react";
import ProductFeaturesSection from "@/components/productSections/features";
import {useAppActions} from "@/hooks/useAppActions";

function Section({product}: ProductSectionProps) {
	const {openFullscreenProductControl} = useAppActions();

	return (
		<ProductFeaturesSection
			product={product}
			features={product.control}
			openFullscreenFeatures={openFullscreenProductControl}
		/>
	);
}

export const ProductControlSection = memo(Section);