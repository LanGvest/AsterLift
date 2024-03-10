import type {StaticImageData} from "next/image";
import type {CSSProperties, FunctionComponent, ReactNode} from "react";
import type {ProductCategory} from "@/enums/productCategory";
import type {FileMedia, ImageMedia} from "./media";

export interface ProductTag {
	id: string
	name: string
	style?: CSSProperties
}

export interface ProductFeature {
	id: string
	name: string
	description: string
	image: StaticImageData
}

export interface ProductSpecificationValueObject {
	text?: string
	another?: boolean
	available?: boolean
	color?: CSSProperties["backgroundColor"]
}

export type ProductSpecificationValueItem = string | boolean | ProductSpecificationValueObject;
export type ProductSpecificationValue = ProductSpecificationValueItem | Array<ProductSpecificationValueItem>;

export interface ProductSpecification {
	id: string
	name: string
	value: ProductSpecificationValue
	hint?: ReactNode
}

export interface ProductAdvantage {
	id: string
	value: ReactNode
}

export interface Product {
	id: string
	model: string
	group: string
	category: ProductCategory
	type: string
	extendedType?: string
	pluralType?: string
	catalogName: string
	keywords: Array<string>
	description: string
	shortDescription: string
	tags: Array<ProductTag>
	advantages: Array<ProductAdvantage>
	overview: Array<ImageMedia>
	preview: Array<StaticImageData>
	control: Array<ProductFeature>
	connection: Array<ProductFeature>
	specifications: Array<ProductSpecification>
	examples: Array<ImageMedia>
	files: Array<FileMedia>
	rating: {
		value: number
		count: number
	}
	About?: FunctionComponent
	getUrl(): string
	getTitle(): string
	getPageTitle(): string
	getName(): string
	getExtendedName(): string
	getPluralName(): string
	getMinPriceString(): string
	getMinPrice(): number
	getPageDescription(): string
}

export interface ProductSection {
	id: string
	name: string
	Component: FunctionComponent<ProductSectionProps>
	getDisplayAmount?(product: Product, products: Array<Product>): number
	shouldInclude(product: Product, products: Array<Product>): boolean
}

export interface ProductSectionProps {
	product: Product
}