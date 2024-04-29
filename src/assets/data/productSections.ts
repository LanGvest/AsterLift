import type {ProductSection} from "@/types/product";

import ProductDescriptionSection from "@/components/productSections/description";
import ProductSpecificationsSection from "@/components/productSections/specifications";
import ProductExamplesSection from "@/components/productSections/examples";
import ProductAlternativesSection from "@/components/productSections/alternatives";
import ProductFilesSection from "@/components/productSections/files";
import ProductControlSection from "@/components/productSections/control";
import ProductConnectionSection from "@/components/productSections/connection";

const ProductSections: Array<ProductSection> = [
	{
		id: "desc",
		name: "Описание",
		Component: ProductDescriptionSection,
		shouldInclude() {
			return true;
		}
	},
	{
		id: "control",
		name: "Управление",
		Component: ProductControlSection,
		shouldInclude(product) {
			return product.control.length > 0;
		}
	},
	{
		id: "connection",
		name: "Подключение",
		Component: ProductConnectionSection,
		shouldInclude(product) {
			return product.connection.length > 0;
		}
	},
	{
		id: "spec",
		name: "Характеристики",
		Component: ProductSpecificationsSection,
		shouldInclude() {
			return true;
		}
	},
	{
		id: "files",
		name: "Проектировщикам",
		Component: ProductFilesSection,
		getDisplayAmount(product): number {
			return product.files.length;
		},
		shouldInclude(product) {
			return product.files.length > 0;
			// return true;
		}
	},
	{
		id: "examples",
		name: "Примеры работ",
		Component: ProductExamplesSection,
		getDisplayAmount(product): number {
			return product.examples.length;
		},
		shouldInclude(product) {
			return product.examples.length > 0;
		}
	},
	{
		id: "alt",
		name: "Другие модели",
		Component: ProductAlternativesSection,
		getDisplayAmount(product, products): number {
			return products.length - 1;
			// const alternatives = products.filter(alternativeProduct => alternativeProduct.group === product.group && alternativeProduct.id !== product.id);
			// return alternatives.length;
		},
		shouldInclude(product, products) {
			return true;
			// for(const otherProduct of products) {
			// 	if(otherProduct.group === product.group && otherProduct.id !== product.id) return true;
			// }
			// return false;
		}
	}
];

export default ProductSections;