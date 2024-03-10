import axios from "axios";
import type {AxiosRequestConfig} from "axios";

interface SendMessageParams {
	chatId: number
	text: string
}

export default class Telegram {
	private static readonly BASE_URL: string = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
	public static readonly ALLOWED_USER_IDS: Array<number> = [1103980354];

	private static readonly axiosRequestConfig: AxiosRequestConfig = {
		baseURL: Telegram.BASE_URL
	};

	private static readonly axiosInstance = axios.create(Telegram.axiosRequestConfig);

	public static async sendMessage({chatId, text}: SendMessageParams) {
		return Telegram.axiosInstance.post("/sendMessage", null, {
			params: {
				"chat_id": chatId,
				"text": text
			}
		});
	}
}