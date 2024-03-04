import {Config} from "@/types/config";

const Config: Config = {
	PROJECT_NAME: "Астер-Лифт",
	PROJECT_DESCRIPTION: "Астер-Лифт – производитель подъёмного оборудования в Беларуси.",
	PROJECT_COLOR: "#1c7bd0",
	PROJECT_ORIGIN: "https://asterlift.by",
	BUILT_AT: "%BUILT_AT%",
	CONTACTS: {
		PHONE_NUMBER: "+375 29 137-74-66",
		PHONE_OPERATOR: "A1",
		EMAIL: "asterlift@yandex.by"
	},
	SLIDER: {
		SPEED: 600,
		SPEED_FAST: 400,
		AUTOPLAY_DELAY: 4000
	},
	ADDRESS: {
		POSTAL_CODE: "246018",
		STREET: "ул. Интендантская, д. 1А",
		CITY: "Гомель",
		REGION: "Гомельская область",
		COUNTRY: {
			CODE: "BY",
			NAME_EN: "Belarus",
			NAME_RU: "Беларусь"
		}
	},
	ORGANIZATION: {
		NAME_RU: "Астер-Лифт",
		NAME_EN: "Aster-Lift",
		NAME_BE: "Астэр-Ліфт",
		LEGAL_NAME: "Частное производственное унитарное предприятие «Астер-Лифт»",
		SHORT_LEGAL_NAME: "ЧПУП «Астер-Лифт»",
		DESCRIPTION: "Астер-Лифт – производитель подъёмников для инвалидов и маломобильных групп населения в Беларуси.",
		FOUNDING_DATE: "2014-12-11",
		LOGO_URL: "/images/logo.png",
		COVER_URL: "/images/logo.png",
		ISIC_V4: 2816,
		UNP: 491316077,
		GEO: {
			LATITUDE: 52.442356,
			LONGITUDE: 30.955855
		}
	}
};

export default Config;