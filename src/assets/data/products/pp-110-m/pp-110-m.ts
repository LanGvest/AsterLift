import type {Product} from "@/types/product";
import {ProductCategory} from "@/enums/productCategory";
import {
	getDefaultProductExtendedName,
	getDefaultProductMinPrice,
	getDefaultProductName, getDefaultProductPageDescription,
	getDefaultProductPageTitle, getDefaultProductPluralName,
	getDefaultProductTitle, getDefaultProductUrl,
	getNextId
} from "@/utils/helpers";
import About from "./about";
import * as Media from "./media";

export const PP_110_M: Product = {
	id: "pp-110-m",
	model: "ПП-110.М",
	group: "ПП-110",
	category: ProductCategory.DISABLED_PEOPLE,
	type: "Наклонный подъёмник для инвалидов",
	extendedType: "Наклонный лестничный подъёмник для инвалидов",
	pluralType: "Наклонные подъёмники для инвалидов",
	catalogName: "Наклонный ПП-110.М",
	description: "Механический, со складной платформой, боковыми поручнями и пандусами",
	shortDescription: "Механический, со складной платформой, боковыми поручнями и пандусами",
	minPrice: 6900,
	tags: [],
	overview: [
		Media.PP_110_M_IMG_1,
		Media.PP_110_M_IMG_2,
		Media.PP_110_M_IMG_3,
		Media.PP_110_M_IMG_4,
		Media.PP_110_M_IMG_5,
		Media.PP_110_M_IMG_6,
		Media.PP_110_M_IMG_7,
		Media.PP_110_M_IMG_8,
		Media.PP_110_M_IMG_9,
		Media.PP_110_M_IMG_10
	],
	preview: [
		Media.PP_110_M_IMG_1.image,
		Media.PP_110_M_IMG_2.image,
		Media.PP_110_M_IMG_3.image,
		Media.PP_110_M_IMG_4.image,
		Media.PP_110_M_IMG_5.image,
		Media.PP_110_M_IMG_6.image
		// Media.PP_110_M_IMG_7.image,
		// Media.PP_110_M_IMG_8.image,
		// Media.PP_110_M_IMG_9.image,
		// Media.PP_110_M_IMG_10.image
	],
	control: [
		{
			id: getNextId(),
			image: Media.PP_110_M_IMG_1.image,
			name: "Лебёдка на направляющих",
			description: "Подъёмник с лебёдкой на направляющих управляется человеком, сопровождающим инвалида-колясочника."
		},
		{
			id: getNextId(),
			image: Media.PP_110_M_IMG_7.image,
			name: "Лебёдка на платформе",
			description: "Подъёмник с лебёдкой на платформе управляется непосредственно самим инвалидом-колясочником."
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
			name: "Тип привода",
			value: "Механическая лебёдка с автоматическим тормозом"
		},
		{
			id: getNextId(),
			name: "Тяговый элемент",
			value: "Трос 4..5 мм"
		},
		{
			id: getNextId(),
			name: "Управление",
			value: [
				"Лебёдка на направляющих",
				{
					text: "Лебёдка на платформе",
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
			name: "Демпфирование платформы (компенсация веса)",
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
		Media.PP_110_M_IMG_1,
		Media.PP_110_M_IMG_2,
		Media.PP_110_M_IMG_3,
		Media.PP_110_M_IMG_4,
		Media.PP_110_M_IMG_5,
		Media.PP_110_M_IMG_6,
		Media.PP_110_M_IMG_7,
		Media.PP_110_M_IMG_8,
		Media.PP_110_M_IMG_9,
		Media.PP_110_M_IMG_10
	],
	files: [],
	getTitle: getDefaultProductTitle,
	getPageTitle: getDefaultProductPageTitle,
	getName: getDefaultProductName,
	getExtendedName: getDefaultProductExtendedName,
	getPluralName: getDefaultProductPluralName,
	getMinPrice: getDefaultProductMinPrice,
	getUrl: getDefaultProductUrl,
	About,
	keywords: [
		"наклонный",
		"лестничный",
		"механический",
		"складная платформа"
	],
	rating: {
		value: 4.5,
		count: 29
	},
	getPageDescription: getDefaultProductPageDescription
};