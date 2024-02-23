import type {ImageMedia} from "@/types/media";
import {MediaType} from "@/enums/mediaType";

import img1 from "./images/1.webp";
import img2 from "./images/2.webp";
import img3 from "./images/3.webp";
import img4 from "./images/4.webp";

export const PP_110_E_IMG_1: ImageMedia = {
	type: MediaType.IMAGE,
	image: img1,
	description: "С дистанционным управлением"
};

export const PP_110_E_IMG_2: ImageMedia = {
	type: MediaType.IMAGE,
	image: img2,
	description: "С дистанционным управлением"
};

export const PP_110_E_IMG_3: ImageMedia = {
	type: MediaType.IMAGE,
	image: img3,
	description: "С дистанционным управлением"
};

export const PP_110_E_IMG_4: ImageMedia = {
	type: MediaType.IMAGE,
	image: img4,
	description: "С кнопочным управлением"
};