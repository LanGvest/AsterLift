import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {MediaType} from "@/enums/mediaType";
import {Nullable, withoutDot} from "@/utils/helpers";
import type {Product} from "@/types/product";
import type SwiperClass from "swiper";
import type {ImageMedia} from "@/types/media";

export interface FullscreenProduct {
	product: Product
	controller?: FullscreenController
	initialSlide?: number
}

export interface FullscreenController {
	swiper: SwiperClass
	loop?: boolean
}

export interface FullscreenData {
	title: string
	subTitle?: string
	media: Array<ImageMedia>
	controller?: FullscreenController
	initialSlide?: number
	getImageAlt(image: ImageMedia, index: number): string
	getImageTitle(image: ImageMedia, index: number): string
}

interface InitialState {
	fullscreen: Nullable<FullscreenData>
}

const initialState: InitialState = {
	fullscreen: null
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		openFullscreenProductOverview(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				controller,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: product.getName(),
				subTitle: "Обзор",
				media: product.overview,
				controller: controller as any,
				initialSlide,
				getImageAlt(): string {
					return product.getName();
				},
				getImageTitle(): string {
					return product.getPageTitle();
				}
			};
		},
		openFullscreenProductExamples(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				controller,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: product.getName(),
				subTitle: "Примеры работ",
				media: product.examples,
				controller: controller as any,
				initialSlide,
				getImageAlt(): string {
					return product.getName();
				},
				getImageTitle(): string {
					return product.getPageTitle();
				}
			};
		},
		openFullscreenProductControl(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: product.getName(),
				subTitle: "Управление",
				media: product.control.map(feature => ({
					type: MediaType.IMAGE,
					image: feature.image,
					name: feature.name,
					description: withoutDot(feature.description)
				})),
				initialSlide,
				getImageAlt(image): string {
					return image.name || image.image.src;
				},
				getImageTitle(image): string {
					return image.name || image.image.src;
				}
			};
		},
		openFullscreenProductConnection(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: product.getName(),
				subTitle: "Подключение",
				media: product.connection.map(feature => ({
					type: MediaType.IMAGE,
					image: feature.image,
					name: feature.name,
					description: withoutDot(feature.description)
				})),
				initialSlide,
				getImageAlt(image): string {
					return image.name || image.image.src;
				},
				getImageTitle(image): string {
					return image.name || image.image.src;
				}
			};
		},
		closeFullscreen(state) {
			state.fullscreen = null;
		}
	}
});

export const AppSliceActions = appSlice.actions;
export const AppSliceReducer = appSlice.reducer;