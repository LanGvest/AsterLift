import type {Product} from "@/types/product";

import PP_101_A from "./pp-101-a";
import PP_101_B from "./pp-101-b";
import PP_110_M from "./pp-110-m";
import PP_110_E from "./pp-110-e";

export const Products: Array<Product> = [
	PP_101_A,
	PP_101_B,
	PP_110_M,
	PP_110_E
];

export const LOWEST_PRICE: string = getLowestPrice();

function getLowestPrice(): string {
	return Math.min(...Products.map(product => product.getMinPrice())).toLocaleString("ru-RU");
}