import type {Product} from "@/types/product";
import {toLocalString} from "@/utils/helpers";

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

const minPrices: Array<number> = Products.map(product => product.getMinPrice());

export const LOWEST_PRICE: number = Math.min(...minPrices);
export const HIGHEST_PRICE: number = Math.max(...minPrices);
export const LOWEST_PRICE_STRING: string = toLocalString(LOWEST_PRICE);
export const HIGHEST_PRICE_STRING: string = toLocalString(HIGHEST_PRICE);