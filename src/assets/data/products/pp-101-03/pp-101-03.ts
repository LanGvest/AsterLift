import type {Product} from "@/types/product";
import {ProductCategory} from "@/enums/productCategory";
import {getDefaultProductName, getDefaultProductPageTitle, getNextId} from "@/utils/helpers";
import About from "./about";
import * as Media from "./media";
import {
	PP_101_02_IMG_18C,
	PP_101_02_IMG_24C,
	PP_101_02_IMG_25C
} from "@/assets/data/products/pp-101-02/media";

export const PP_101_03: Product = {
	id: "pp-101-03",
	model: "ПП-101.03",
	group: "ПП-101",
	category: ProductCategory.DISABLED_PEOPLE,
	type: "Вертикальный подъёмник для инвалидов",
	catalogName: "Вертикальный ПП-101.03",
	description: "Полное описание. Бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла.",
	shortDescription: "Электрический, со стационарной платформой и боковыми ограждениями, подъём до 2 м.",
	minPrice: 8300,
	tags: [],
	overview: [
		Media.PP_101_03_IMG_1,
		Media.PP_101_03_IMG_2,
		Media.PP_101_03_IMG_3,
		Media.PP_101_03_IMG_4,
		Media.PP_101_03_IMG_5,
		Media.PP_101_03_IMG_6,
		Media.PP_101_03_IMG_7,
		Media.PP_101_03_IMG_8
	],
	preview: [
		Media.PP_101_03_IMG_1.image,
		Media.PP_101_03_IMG_2.image,
		// Media.PP_101_03_IMG_3.image,
		// Media.PP_101_03_IMG_4.image,
		Media.PP_101_03_IMG_5.image,
		Media.PP_101_03_IMG_6.image,
		Media.PP_101_03_IMG_7.image
		// Media.PP_101_03_IMG_8.image
	],
	control: [
		{
			id: getNextId(),
			image: Media.PP_101_03_IMG_5.image,
			name: "Стационарный пульт управления",
			description: "Стандартный вид подъёмника, подключённого к кабелю питания, проложенному в стяжке крыльца. Имеет стационарный пульт управления на правой стойке."
		},
		{
			id: getNextId(),
			image: PP_101_02_IMG_25C.image,
			name: "Проводной пульт управления",
			description: "Для удобства управления подъёмником человек в инвалидной коляске самостоятельно может воспользоваться подключаемым проводным пультом."
		}
	],
	connection: [
		{
			id: getNextId(),
			image: PP_101_02_IMG_18C.image,
			name: "Подключение через удлинитель",
			description: "При отсутствии питающего кабеля в конструкции крыльца может быть использован вариант подключения подъёмника к питающей сети 220 В через удлинитель."
		},
		{
			id: getNextId(),
			image: PP_101_02_IMG_24C.image,
			name: "Комбинированное подключение",
			description: "Возможен вариант совместного использования проводного пульта управления и подключения подъёмника к питающей сети 220 В через удлинитель."
		}
	],
	specifications: [
		{
			id: getNextId(),
			name: "Тип платформы",
			value: "Стационарная (не складная)"
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
				"Стационарный пульт управления",
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
			name: "Ограждение на платформе",
			value: "Распашная калитка с фиксацией"
		},
		{
			id: getNextId(),
			name: "Ограждение на направляющих",
			value: "Одностворчатая калитка с защёлкой"
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
			value: "90..120 (в зависимости от комплектации)"
		}
	],
	examples: [
		Media.PP_101_03_IMG_1,
		Media.PP_101_03_IMG_5,
		Media.PP_101_03_IMG_6,
		Media.PP_101_03_IMG_7,
		Media.PP_101_03_IMG_8
	],
	files: [],
	getPageTitle: getDefaultProductPageTitle,
	getName: getDefaultProductName,
	About
};