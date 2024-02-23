import type {Product} from "@/types/product";
import {ProductCategory} from "@/enums/productCategory";
import {getDefaultProductName, getDefaultProductPageTitle, getNextId} from "@/utils/helpers";
import About from "./about";
import * as Media from "./media";

export const PP_110_02: Product = {
	id: "pp-110-e",
	model: "ПП-110.Э",
	group: "ПП-110",
	category: ProductCategory.DISABLED_PEOPLE,
	type: "Наклонный подъёмник для инвалидов",
	catalogName: "Наклонный ПП-110.Э",
	description: "Электрический, со складной платформой, боковыми поручнями и пандусами",
	shortDescription: "Электрический, со складной платформой, боковыми поручнями и пандусами",
	minPrice: 19300,
	tags: [],
	overview: [
		Media.PP_110_E_IMG_1,
		Media.PP_110_E_IMG_2,
		Media.PP_110_E_IMG_3,
		Media.PP_110_E_IMG_4
	],
	preview: [
		Media.PP_110_E_IMG_1.image,
		Media.PP_110_E_IMG_2.image,
		Media.PP_110_E_IMG_3.image,
		Media.PP_110_E_IMG_4.image
	],
	control: [
		{
			id: getNextId(),
			image: Media.PP_110_E_IMG_4.image,
			name: "Кнопочное управление",
			description: "Подъёмник управляется человеком, сопровождающим инвалида-колясочника."
		},
		{
			id: getNextId(),
			image: Media.PP_110_E_IMG_3.image,
			name: "Дистанционное управление",
			description: "Подъёмник управляется непосредственно самим инвалидом-колясочником."
		}
	],
	connection: [],
	specifications: [
		{
			id: getNextId(),
			name: "Тип платформы",
			value: "Складная"
		},
		{
			id: getNextId(),
			name: "Грузоподъёмность, кг",
			value: "225"
		},
		{
			id: getNextId(),
			name: "Напряжение питания, В",
			value: "220"
		},
		{
			id: getNextId(),
			name: "Потребляемая мощность, Вт",
			value: "600"
		},
		{
			id: getNextId(),
			name: "Тип привода",
			value: "Электрический, цепной"
		},
		{
			id: getNextId(),
			name: "Количество приводов, шт",
			value: "1"
		},
		{
			id: getNextId(),
			name: "Управление",
			value: [
				"Кнопочное",
				{
					text: "Дистанционное",
					another: true
				}
			]
		},
		{
			id: getNextId(),
			name: "Размер платформы (Ш×Г), мм",
			value: [
				"900×1000",
				{
					text: "900×1200",
					another: true
				}
			]
		},
		{
			id: getNextId(),
			name: "Настил платформы",
			value: "Алюминий (рифлёный)"
		},
		{
			id: getNextId(),
			name: "Безопасность",
			value: "Боковые поручни и пандусы на платформе"
		},
		{
			id: getNextId(),
			name: "Компенсация веса платформы",
			value: [
				false,
				{
					available: true,
					another: true
				}
			]
		},
		{
			id: getNextId(),
			name: "Ловитель",
			value: false
		},
		{
			id: getNextId(),
			name: "Монтаж",
			value: [
				"Крепление на стену",
				{
					text: "Крепление на стойках",
					another: true
				}
			]
		},
		{
			id: getNextId(),
			name: "Лакокрасочное покрытие, цвет",
			value: [
				{
					text: "Серый",
					color: "#637386"
				},
				{
					text: "Коричневый",
					color: "#6b4847"
				}
			]
		},
		{
			id: getNextId(),
			name: "Вес, кг",
			value: "150..200 (в зависимости от комплектации)"
		}
	],
	examples: [
		Media.PP_110_E_IMG_1,
		Media.PP_110_E_IMG_2,
		Media.PP_110_E_IMG_3,
		Media.PP_110_E_IMG_4
	],
	files: [],
	getPageTitle: getDefaultProductPageTitle,
	getName: getDefaultProductName,
	About
};