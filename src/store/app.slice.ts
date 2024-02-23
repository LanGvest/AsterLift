import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {MediaType} from "@/enums/mediaType";
import type {Nullable} from "@/utils/helpers";
import type {StaticImageData} from "next/image";
import type {Product} from "@/types/product";
import type SwiperClass from "swiper";
import type {Media} from "@/types/media";

export interface FullscreenProduct {
	product: Product
	controller?: FullscreenController
	initialSlide?: number
}

export interface FullscreenImage extends Media {
	image: StaticImageData
}

export interface FullscreenController {
	swiper: SwiperClass
	loop?: boolean
}

export interface FullscreenData {
	title: string
	subTitle?: string
	media: Array<FullscreenImage>
	controller?: FullscreenController
	initialSlide?: number
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
				title: `${product.type} ${product.model}`,
				subTitle: "Обзор",
				media: product.overview,
				controller: controller as any,
				initialSlide
			};
		},
		openFullscreenProductExamples(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				controller,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: `${product.type} ${product.model}`,
				subTitle: "Примеры работ",
				media: product.examples,
				controller: controller as any,
				initialSlide
			};
		},
		openFullscreenProductControl(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: `${product.type} ${product.model}`,
				subTitle: "Управление",
				media: product.control.map(feature => ({
					type: MediaType.IMAGE,
					image: feature.image,
					name: feature.name,
					description: validateFeatureDescription(feature.description)
				})),
				initialSlide
			};
		},
		openFullscreenProductConnection(state, action: PayloadAction<FullscreenProduct>) {
			const {
				product,
				initialSlide = 0
			} = action.payload;

			state.fullscreen = {
				title: `${product.type} ${product.model}`,
				subTitle: "Подключение",
				media: product.connection.map(feature => ({
					type: MediaType.IMAGE,
					image: feature.image,
					name: feature.name,
					description: validateFeatureDescription(feature.description)
				})),
				initialSlide
			};
		},
		closeFullscreen(state) {
			state.fullscreen = null;
		}
	}
});

function validateFeatureDescription(text: string): string {
	text = text.trim();
	if(text.endsWith(".")) text = text.substring(0, text.length-1);
	return text;
}

export const AppSliceActions = appSlice.actions;
export const AppSliceReducer = appSlice.reducer;