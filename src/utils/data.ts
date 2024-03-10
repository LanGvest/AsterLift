export interface ProductData {
	price: number
	pendingPrice?: number
	oldPrice?: number
}

export interface ProductsData {
	[id: string]: ProductData
}

export const PRODUCTS_DATA: ProductsData = (process.env.PRODUCTS_DATA) as any as ProductsData;