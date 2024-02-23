import type {StaticImageData} from "next/image";
import type {MediaType} from "@/enums/mediaType";

export type Location = "Гомель"
	| "Минск"
	| "Борисов"
	| "Бобруйск"
	| "Пинск"
	| "Могилёв"
	| "Жлобин"
	| "Полоцк"
	| "Витебск"
	| "Брест"
	| "Слуцк"
	| "Солигорск"
	| "Гродно";

export interface MediaMeta {
	location?: Location | string
	name?: string
	description?: string
}

export interface Media extends MediaMeta {
	type: MediaType
}

export interface ImageMedia extends Media {
	type: MediaType.IMAGE
	image: StaticImageData
}

export type FileExtension = "png" | "jpg" | "jpeg" | "pdf" | "doc" | "docx";
export type FilePath = `${string}.${FileExtension}`;

export interface FileMedia extends Media {
	type: MediaType.FILE
	path: FilePath
	size: number
	name: string
}

export type AnyMedia = ImageMedia | FileMedia;