import type {ImageMedia} from "@/types/media";
import {MediaType} from "@/enums/mediaType";

import img1 from "./images/1.webp";
import img2 from "./images/2.webp";
import img3 from "./images/3.webp";
import img4 from "./images/4.webp";
import img5 from "./images/5.webp";
import img6 from "./images/6.webp";

export const CERTS_IMG_1: ImageMedia = {
	type: MediaType.IMAGE,
	image: img1,
	name: "Свидетельство"
};

export const CERTS_IMG_2: ImageMedia = {
	type: MediaType.IMAGE,
	image: img2,
	name: "Регистрация в БелГИСС"
};

export const CERTS_IMG_3: ImageMedia = {
	type: MediaType.IMAGE,
	image: img3,
	name: "Сертификат безопасности ТР-ТС 010"
};

export const CERTS_IMG_4: ImageMedia = {
	type: MediaType.IMAGE,
	image: img4,
	name: "Декларация ТР-ТС 004-2011, 020-2011"
};

export const CERTS_IMG_5: ImageMedia = {
	type: MediaType.IMAGE,
	image: img5,
	name: "Сертификат ISO-9001, ISO-14001, OHSAS-180010; 1 стр."
};

export const CERTS_IMG_6: ImageMedia = {
	type: MediaType.IMAGE,
	image: img6,
	name: "Сертификат ISO-9001, ISO-14001, OHSAS-180010; 2 стр."
};