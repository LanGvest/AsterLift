export interface Config {
	PROJECT_NAME: string
	PROJECT_DESCRIPTION: string
	PROJECT_COLOR: string
	PROJECT_ORIGIN: string
	BUILT_AT: string
	CONTACTS: {
		PHONE_NUMBER: string
		PHONE_OPERATOR: string
		EMAIL: string
	}
	SLIDER: {
		SPEED: number
		SPEED_FAST: number
		AUTOPLAY_DELAY: number
	}
	ADDRESS: {
		POSTAL_CODE: string
		LEGAL_STREET: string
		POSTAL_STREET: string
		CITY: string
		REGION: string
		COUNTRY: {
			CODE: string
			FULL_NAME: string
			NAME_EN: string
			NAME_RU: string
		}
		POSTAL_ADDRESS_LINK: string
	}
	ORGANIZATION: {
		NAME_RU: string
		NAME_EN: string
		NAME_BE: string
		LEGAL_NAME: string
		SHORT_LEGAL_NAME: string
		DESCRIPTION: string
		FOUNDING_DATE: string
		LOGO_URL: string
		COVER_URL: string
		/** Код вида деятельности */
		ISIC_V4: number
		/** Учетный номер плательщика */
		UNP: number,
		GEO: {
			LATITUDE: number,
			LONGITUDE: number
		}
	}
	LINKS: {
		LIFTS_FOR_THE_DISABLED: string
		WHEELCHAIR: string
		PUSH_BUTTON_POST: string
		DIFFERENTIAL_CURRENT_DEVICE: string
		GROUNDING: string
		WINCH: string
	}
}