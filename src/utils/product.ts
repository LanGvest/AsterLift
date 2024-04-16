import type {Product, ProductDefinition, ProductPrototype} from "@/types/product";
import {lowerCaseFirst, withoutDot} from "@/utils/helpers";
import {PRODUCTS_DATA} from "@/utils/data";

export const productPrototype: ProductPrototype = {
	getTitle(this: Product) {
		return `${this.getName()} от ${this.getMinPriceString()} BYN`;
	},
	getPageTitle(this: Product) {
		return `${this.type} от ${this.getMinPriceString()} BYN в Беларуси`;
	},
	getName(this: Product) {
		return `${this.type} ${this.model}`;
	},
	getExtendedName(this: Product) {
		return `${this.extendedType || this.type} ${this.model}`;
	},
	getPluralName(this: Product) {
		return `${this.pluralType || this.type} ${this.model}`;
	},
	getMinPrice(this: Product) {
		return PRODUCTS_DATA[this.id].price;
	},
	getMinPriceString(this: Product) {
		return this.getMinPrice().toLocaleString("ru-RU");
	},
	getOldMinPrice(this: Product) {
		return this.getMinPrice() + 600;
	},
	getOldMinPriceString(this: Product) {
		return this.getOldMinPrice().toLocaleString("ru-RU");
	},
	hasDiscount(this: Product): boolean {
		return this.getMinPrice() < this.getOldMinPrice();
	},
	getDiscountPercentage(this: Product) {
		const price = this.getMinPrice();
		const oldPrice = this.getOldMinPrice();
		return Math.round(((oldPrice - price) / oldPrice) * 100);
	},
	getUrl(this: Product) {
		return "/" + this.id;
	},
	getPageDescription(this: Product) {
		return `Купить ${lowerCaseFirst(this.getExtendedName())} от ${this.getMinPriceString()} BYN в Беларуси у производителя. ${withoutDot(this.shortDescription)}. Изготовление, доставка и монтаж за 14 дней.`;
	}
};

export function makeProduct(definition: ProductDefinition): Product {
	const product: Product = definition as Product;
	Reflect.setPrototypeOf(product, productPrototype);
	return product;
}