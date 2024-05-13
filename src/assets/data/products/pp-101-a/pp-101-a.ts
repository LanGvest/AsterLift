import type {Product} from "@/types/product";
import {ProductCategory} from "@/enums/productCategory";
import {getNextId} from "@/utils/helpers";
import {TOP_SALES} from "@/assets/data/productTags";
import About from "./about";
import * as Media from "./media";
import {makeProduct} from "@/utils/product";

export const PP_101_A: Product = makeProduct({
	id: "pp-101-a",
	model: "ПП-101.А",
	group: "ПП-101",
	category: ProductCategory.DISABLED_PEOPLE,
	type: "Вертикальный подъёмник для инвалидов",
	pluralType: "Вертикальные подъёмники для инвалидов",
	catalogName: "Вертикальный ПП-101.А",
	description: "Электрический, со складной платформой и боковыми ограждениями, подъём до 2 м.",
	shortDescription: "Электрический, со складной платформой и боковыми ограждениями, подъём до 2 м.",
	tags: [
		TOP_SALES
	],
	advantages: [
		{
			id: getNextId(),
			value: "Удобный кнопочный пост управления на правой стойке"
		}
	],
	overview: [
		Media.PP_101_A_IMG_1,
		Media.PP_101_A_IMG_2,
		Media.PP_101_A_IMG_3,
		Media.PP_101_A_IMG_4,
		Media.PP_101_A_IMG_5,
		Media.PP_101_A_IMG_6,
		Media.PP_101_A_IMG_7,
		Media.PP_101_A_IMG_8,
		Media.PP_101_A_IMG_9
	],
	preview: [
		Media.PP_101_A_IMG_1.image,
		Media.PP_101_A_IMG_2.image,
		Media.PP_101_A_IMG_3.image,
		Media.PP_101_A_IMG_4.image,
		// Media.PP_101_A_IMG_5.image,
		// Media.PP_101_A_IMG_6.image,
		Media.PP_101_A_IMG_7.image,
		// Media.PP_101_A_IMG_8.image,
		Media.PP_101_A_IMG_9.image
	],
	marketPreview: [
		Media.PP_101_A_IMG_27.image
	],
	control: [
		{
			id: getNextId(),
			image: Media.PP_101_A_IMG_8.image,
			name: "Кнопочный пост",
			description: "Стандартный вид подъёмника, подключённого к кабелю питания, проложенному в стяжке крыльца. Имеет стационарный кнопочный пост управления на правой стойке."
		},
		{
			id: getNextId(),
			image: Media.PP_101_A_IMG_25C.image,
			name: "Проводной пульт",
			description: "Для удобства управления подъёмником человек в инвалидной коляске самостоятельно может воспользоваться подключаемым проводным пультом."
		}
	],
	connection: [
		{
			id: getNextId(),
			image: Media.PP_101_A_IMG_18C.image,
			name: "Через удлинитель",
			description: "При отсутствии питающего кабеля в конструкции крыльца может быть использован вариант подключения подъёмника к питающей сети 220 В через удлинитель."
		},
		{
			id: getNextId(),
			image: Media.PP_101_A_IMG_24C.image,
			name: "Комбинированное",
			description: "Возможен вариант совместного использования проводного пульта управления с подключением подъёмника к питающей сети 220 В через удлинитель."
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
				"Кнопочный пост",
				{
					text: "Проводной пульт",
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
		Media.PP_101_A_IMG_10A,
		Media.PP_101_A_IMG_10B,
		Media.PP_101_A_IMG_11A,
		Media.PP_101_A_IMG_11B,
		Media.PP_101_A_IMG_12A,
		Media.PP_101_A_IMG_12B,
		Media.PP_101_A_IMG_12C,
		Media.PP_101_A_IMG_13A,
		Media.PP_101_A_IMG_13B,
		Media.PP_101_A_IMG_14A,
		Media.PP_101_A_IMG_14B,
		Media.PP_101_A_IMG_15A,
		Media.PP_101_A_IMG_15B,
		Media.PP_101_A_IMG_16A,
		Media.PP_101_A_IMG_16B,
		Media.PP_101_A_IMG_17A,
		Media.PP_101_A_IMG_17B,
		Media.PP_101_A_IMG_18A,
		Media.PP_101_A_IMG_18B,
		Media.PP_101_A_IMG_18C,
		Media.PP_101_A_IMG_19A,
		Media.PP_101_A_IMG_19B,
		Media.PP_101_A_IMG_20A,
		Media.PP_101_A_IMG_20B,
		Media.PP_101_A_IMG_20C,
		Media.PP_101_A_IMG_21A,
		Media.PP_101_A_IMG_21B,
		Media.PP_101_A_IMG_22A,
		Media.PP_101_A_IMG_22B,
		Media.PP_101_A_IMG_23A,
		Media.PP_101_A_IMG_23B,
		Media.PP_101_A_IMG_24A,
		Media.PP_101_A_IMG_24B,
		Media.PP_101_A_IMG_24C,
		Media.PP_101_A_IMG_25A,
		Media.PP_101_A_IMG_25B,
		Media.PP_101_A_IMG_25C,
		Media.PP_101_A_IMG_26A,
		Media.PP_101_A_IMG_26B
	],
	files: [
		// Media.PP_101_A_FILE_1,
		// Media.PP_101_A_FILE_2
	],
	keywords: [
		"вертикальный",
		"электрический",
		"уличный",
		"складная платформа"
	],
	rating: {
		value: 4.8,
		count: 47
	},
	About,
	getMinPrice() {
		return 3900;
	}
});