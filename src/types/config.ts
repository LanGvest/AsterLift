export interface Config {
	PROJECT_NAME: string
	PROJECT_DESCRIPTION: string
	PROJECT_COLOR: string
	PROJECT_ORIGIN: string
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
}