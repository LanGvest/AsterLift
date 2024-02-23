import type {Product} from "@/types/product";
import {ProductCategory} from "@/enums/productCategory";
import {getDefaultProductName, getDefaultProductPageTitle, getNextId} from "@/utils/helpers";
import {TOP_SALES} from "@/assets/data/productTags";
import About from "./about";
import * as Media from "./media";

export const PP_101_02: Product = {
	id: "pp-101-02",
	model: "ПП-101.02",
	group: "ПП-101",
	category: ProductCategory.DISABLED_PEOPLE,
	type: "Вертикальный подъёмник для инвалидов",
	catalogName: "Вертикальный ПП-101.02",
	description: "Электрический, со складной платформой и боковыми ограждениями, подъём до 2 м.",
	shortDescription: "Электрический, со складной платформой и боковыми ограждениями, подъём до 2 м.",
	minPrice: 10800,
	tags: [
		TOP_SALES
	],
	overview: [
		Media.PP_101_02_IMG_1,
		Media.PP_101_02_IMG_2,
		Media.PP_101_02_IMG_3,
		Media.PP_101_02_IMG_4,
		Media.PP_101_02_IMG_5,
		Media.PP_101_02_IMG_6,
		Media.PP_101_02_IMG_7,
		Media.PP_101_02_IMG_8,
		Media.PP_101_02_IMG_9
	],
	preview: [
		Media.PP_101_02_IMG_1.image,
		Media.PP_101_02_IMG_2.image,
		Media.PP_101_02_IMG_3.image,
		Media.PP_101_02_IMG_4.image,
		Media.PP_101_02_IMG_5.image,
		Media.PP_101_02_IMG_6.image,
		Media.PP_101_02_IMG_7.image,
		Media.PP_101_02_IMG_8.image,
		Media.PP_101_02_IMG_9.image
	],
	control: [
		{
			id: getNextId(),
			image: Media.PP_101_02_IMG_25C.image,
			name: "Проводной пульт управления",
			description: "Для удобства управления подъёмником человеком в инвалидной коляске без сопровождающего может быть использован отключаемый проводной пульт управления."
		}
	],
	connection: [
		{
			id: getNextId(),
			image: Media.PP_101_02_IMG_18C.image,
			name: "Подключение к сети 220 В",
			description: "При отсутствии питающего кабеля в конструкции крыльца может быть использован вариант подключения подъёмника к питающей сети 220 В."
		},
		{
			id: getNextId(),
			image: Media.PP_101_02_IMG_24C.image,
			name: "Подключение через удлинитель",
			description: " Подъёмник может быть подключён к питающей сети 220 В через удлинитель совместно с проводным пультом управления."
		},
		{
			id: getNextId(),
			image: Media.PP_101_02_IMG_8.image,
			name: "Подключение к кабелю крыльца",
			description: "Стандартный вид подъёмника подключенного к кабелю питания проложенного в стяжке крыльца, со стационарным пультом управления на правой стойке."
		}
	],
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
			value: "1100"
		},
		{
			id: getNextId(),
			name: "Тип привода",
			value: "Электрический, канатный"
		},
		{
			id: getNextId(),
			name: "Количество приводов, шт",
			value: "2"
		},
		{
			id: getNextId(),
			name: "Управление",
			value: [
				"Стационарный кнопочный пульт",
				{
					text: "Проводной пульт управления",
					another: true
				}
			]
		},
		{
			id: getNextId(),
			name: "Высота подъёма, мм",
			value: [
				"До 1500",
				{
					text: "До 2000",
					another: true
				}
			]
		},
		{
			id: getNextId(),
			name: "Размер платформы (Ш×Г), мм",
			value: [
				"900×1200",
				{
					text: "900×1600",
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
			value: "Ограждения по бокам платформы"
		},
		{
			id: getNextId(),
			name: "Ловитель",
			value: false
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
			value: "70..90 (в зависимости от комплектации)"
		}
	],
	examples: [
		Media.PP_101_02_IMG_10A,
		Media.PP_101_02_IMG_10B,
		Media.PP_101_02_IMG_11A,
		Media.PP_101_02_IMG_11B,
		Media.PP_101_02_IMG_12A,
		Media.PP_101_02_IMG_12B,
		Media.PP_101_02_IMG_12C,
		Media.PP_101_02_IMG_13A,
		Media.PP_101_02_IMG_13B,
		Media.PP_101_02_IMG_14A,
		Media.PP_101_02_IMG_14B,
		Media.PP_101_02_IMG_15A,
		Media.PP_101_02_IMG_15B,
		Media.PP_101_02_IMG_16A,
		Media.PP_101_02_IMG_16B,
		Media.PP_101_02_IMG_17A,
		Media.PP_101_02_IMG_17B,
		Media.PP_101_02_IMG_18A,
		Media.PP_101_02_IMG_18B,
		Media.PP_101_02_IMG_18C,
		Media.PP_101_02_IMG_19A,
		Media.PP_101_02_IMG_19B,
		Media.PP_101_02_IMG_20A,
		Media.PP_101_02_IMG_20B,
		Media.PP_101_02_IMG_20C,
		Media.PP_101_02_IMG_21A,
		Media.PP_101_02_IMG_21B,
		Media.PP_101_02_IMG_22A,
		Media.PP_101_02_IMG_22B,
		Media.PP_101_02_IMG_23A,
		Media.PP_101_02_IMG_23B,
		Media.PP_101_02_IMG_24A,
		Media.PP_101_02_IMG_24B,
		Media.PP_101_02_IMG_24C,
		Media.PP_101_02_IMG_25A,
		Media.PP_101_02_IMG_25B,
		Media.PP_101_02_IMG_25C,
		Media.PP_101_02_IMG_26A,
		Media.PP_101_02_IMG_26B
	],
	files: [
		// {
		// 	type: MediaType.FILE,
		// 	name: "Инструкция №1",
		// 	path: "mydoc.pdf",
		// 	size: 2_345
		// }
		// {
		// 	type: MediaType.FILE,
		// 	name: "Инструкция №2",
		// 	path: "Курсовая работа.docx",
		// 	size: 53_422_345
		// }
	],
	getPageTitle: getDefaultProductPageTitle,
	getName: getDefaultProductName,
	About
};