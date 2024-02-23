import type {ProductSectionProps} from "@/types/product";
import {memo} from "react";
import ProductFeaturesSection from "@/components/productSections/features";
import {useAppActions} from "@/hooks/useAppActions";

function Section({product}: ProductSectionProps) {
	const {openFullscreenProductConnection} = useAppActions();

	return (
		<ProductFeaturesSection
			product={product}
			features={product.connection}
			openFullscreenFeatures={openFullscreenProductConnection}
		/>
	);
}

export const ProductConnectionSection = memo(Section);