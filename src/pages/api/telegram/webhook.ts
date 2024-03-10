import type {NextApiRequest, NextApiResponse} from "next";
import Telegram from "@/utils/telegram";

interface MessageData {
	update_id: number,
	message: {
		message_id: number,
		from: {
			id: number,
			is_bot: boolean,
			first_name: string,
			last_name: string,
			username: string,
			language_code: string
		},
		chat: {
			id: number,
			first_name: string,
			last_name: string,
			username: string,
			type: string
		},
		date: number,
		text: string
	}
}

/**
 * To set DEVELOPMENT webhook:
 * https://api.telegram.org/bot6901873383:AAEr-pAJFZM_O-VdgxE95hRENe7GAyhKxQo/setWebhook?url=https://pc112.grosser.keenetic.pro/api/telegram/webhook&secret_token=MYrvso_ZtH4R3Zb-LpbIq-tO7dK8C0qkJY43we_SE3KgY-6ymXAc&drop_pending_updates=true&allowed_updates=["message"]
 *
 * To set PRODUCTION webhook:
 * https://api.telegram.org/bot6901873383:AAEr-pAJFZM_O-VdgxE95hRENe7GAyhKxQo/setWebhook?url=https://asterlift.by/api/telegram/webhook&secret_token=MYrvso_ZtH4R3Zb-LpbIq-tO7dK8C0qkJY43we_SE3KgY-6ymXAc&drop_pending_updates=true&allowed_updates=["message"]
 */

function cancel(res: NextApiResponse, status: number): void {
	res.status(status).end();
}

function isUserAllowed(uid: number): boolean {
	return Boolean(~Telegram.ALLOWED_USER_IDS.indexOf(uid));
}

export default async function telegramWebHook(req: NextApiRequest, res: NextApiResponse) {
	if(req.method !== "POST") return cancel(res, 405);

	const secretToken = req.headers["x-telegram-bot-api-secret-token"];
	if(secretToken !== process.env.TELEGRAM_SECRET_TOKEN) return cancel(res, 403);

	if(!req.body || !req.body.message) return cancel(res, 405);

	const {chat, from, text} = req.body.message as MessageData["message"];

	if(!isUserAllowed(from.id)) return cancel(res, 403);

	console.log(from, text);

	await Telegram.sendMessage({
		chatId: chat.id,
		text
	});

	res.status(200).end();
}