// noinspection HtmlDeprecatedTag,XmlDeprecatedElement

import type {NextApiRequest, NextApiResponse} from "next";
import Telegram from "@/utils/telegram";
import {getCorrectWord, isDevelopment, Nullable} from "@/utils/helpers";
import {Product} from "@/types/product";
import Products from "@/assets/data/products";
import {validateUrl} from "@/utils/url";
import {child, get, ref, set} from "@firebase/database";
import {FBD} from "@/utils/firebase";
import {ProductData, ProductsData} from "@/utils/data";
import axios from "axios";

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

function cancel(res: NextApiResponse, status: number): void {
	res.status(status).end();
}

function isUserAllowed(uid: number): boolean {
	return Boolean(~Telegram.ALLOWED_USER_IDS.indexOf(uid));
}

const modelRegex = /(?<=[^\dа-яёa-z_-]|^)пп[\s_.-]?\d{1,3}[\s_.-]?[а-яё]{1,3}(?=[^\dа-яёa-z_-]|$)/ig;
const priceRegex = /(?<!пп)([^\dа-яёa-z_-]|^)\d{1,3}(\s?\d{3})*(?=[^\dа-яёa-z_-]|$)/ig;

function findProduct(model: string): Nullable<Product> {
	const modelHash = model.toLowerCase().replace(/[^\dа-яё]/ig, "");
	return Products.find(product => modelHash === product.model.toLowerCase().replace(/[^\dа-яё]/ig, "")) || null;
}

function isAnyChanges(productsData: ProductsData): boolean {
	for(const product of Products) {
		const dbMinPrice = productsData[product.id].price;
		const changed = product.getMinPrice() !== dbMinPrice;
		if(changed) return true;
	}
	return false;
}

export default async function telegramWebHook(req: NextApiRequest, res: NextApiResponse) {
	if(req.method !== "POST") return cancel(res, 405);
	const secretToken = req.headers["x-telegram-bot-api-secret-token"];
	if(secretToken !== process.env.TELEGRAM_SECRET_TOKEN) return cancel(res, 403);
	if(!req.body || !req.body.message) return cancel(res, 405);
	const {chat, from, text} = req.body.message as MessageData["message"];
	if(!isUserAllowed(from.id)) return cancel(res, 403);

	const command = text.replace(/\s+/, " ");

	if(/(?<=[^\dа-яёa-z_-]|^)цен[ау](?=[^\dа-яёa-z_-]|$)/i.test(command)) {
		const hasModel = modelRegex.test(command);
		const hasPrice = priceRegex.test(command);

		if(!hasModel && !hasPrice) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: "❗️ Чтобы я смог установить новую цену для какого-нибудь подъёмника Вам следует указать мне его модель и новую цену. Перефразируйте вашу просьбу и повторите попытку ещё раз, пожалуйста."
			});
			return cancel(res, 200);
		}

		if(!hasModel) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: "❗️ Чтобы я смог установить новую цену Вам следует указать мне ещё и модель, чтобы я знал, какому подъёмнику необходимо обновить цену. Перефразируйте вашу просьбу и повторите попытку ещё раз, пожалуйста."
			});
			return cancel(res, 200);
		}

		const modelMatch = command.match(modelRegex)!;

		if(modelMatch.length > 1) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: `❗️ Кажется, Вы указали сразу ${modelMatch.length} ${getCorrectWord("моделей", "модель", "модели", modelMatch.length)}. 🧐 Я запутался. Перефразируйте вашу просьбу и повторите попытку ещё раз, пожалуйста.`
			});
			return cancel(res, 200);
		}

		const product = findProduct(modelMatch[0]);

		if(!product) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: "❗️ Кажется, Вы указали несуществующую модель подъёмника, потому что я не могу найти его в своей базе. Возможно, Вы где-то ошиблись. 🤷‍♂️ Перефразируйте вашу просьбу и повторите попытку ещё раз, пожалуйста."
			});
			return cancel(res, 200);
		}

		if(!hasPrice) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: `❗️ Чтобы я смог установить новую цену для подъёмника ${product.model} Вам следует указать мне и саму новую цену, чтобы я знал, на что заменять старую. Перефразируйте вашу просьбу и повторите попытку ещё раз, пожалуйста.`
			});
			return cancel(res, 200);
		}

		const priceMatch = command.match(priceRegex)!;

		if(priceMatch.length > 1) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: `❗️ Кажется, Вы указали сразу ${priceMatch.length} ${getCorrectWord("цен", "цену", "цены", priceMatch.length)}. 🧐 Я запутался. Перефразируйте вашу просьбу и повторите попытку ещё раз, пожалуйста.`
			});
			return cancel(res, 200);
		}

		const newMinPrice = Number(priceMatch[0].replace(/\s/g, ""));

		const productRef = ref(FBD, `products/${product.id}`);
		const productSnapshot = await get(productRef);
		const productData = productSnapshot.val() as ProductData;

		if(product.getMinPrice() === newMinPrice) {
			if(newMinPrice === productData.price) {
				await Telegram.sendMessage({
					chatId: chat.id,
					text: `
					❕ У этого подъёмника уже установлена такая цена на сайте. Так что мне нечего менять, либо придумайте новую цену.
					
					<b>Подъёмник:</b> <a href="${validateUrl(product.getUrl())}">${product.getName()}</a>
					<b>Текущая цена:</b> от ${product.getMinPriceString()} BYN
				`
				});
				return cancel(res, 200);
			} else {
				await set(child(productRef, "price"), product.getMinPrice());

				await Telegram.sendMessage({
					chatId: chat.id,
					text: `
						↩️ Готово! Вернул цену как и была до этого.
						
						<b>Подъёмник:</b> <a href="${validateUrl(product.getUrl())}">${product.getName()}</a>
						<b>Старая цена (текущая):</b> от ${product.getMinPriceString()} BYN
						<b>Новая цена (в черновике):</b> <strike>от ${productData.price.toLocaleString("ru-RU")} BYN</strike>
					`
				});
				return cancel(res, 200);
			}
		}

		if(productData.price === newMinPrice) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: `
					❕ Я уже занёс эту цену в черновик. Так что когда будете готовы опубликовать её на сайте, попросите меня применить изменения.
					
					<b>Подъёмник:</b> <a href="${validateUrl(product.getUrl())}">${product.getName()}</a>
					<b>Старая цена (текущая):</b> <strike>от ${product.getMinPriceString()} BYN</strike>
					<b>Новая цена (в черновике):</b> от ${newMinPrice.toLocaleString("ru-RU")} BYN
				`
			});
			return cancel(res, 200);
		}

		await set(child(productRef, "price"), newMinPrice);

		await Telegram.sendMessage({
			chatId: chat.id,
			text: `
				📝 Готово! Занёс новую цену в черновик.
				
				<b>Подъёмник:</b> <a href="${validateUrl(product.getUrl())}">${product.getName()}</a>
				<b>Старая цена (текущая):</b> <strike>от ${product.getMinPriceString()} BYN</strike>
				<b>Новая цена (в черновике):</b> от ${newMinPrice.toLocaleString("ru-RU")} BYN
				
				⚠️ Чтобы новая цена появилась на сайте, не забудьте попросить меня применить изменения.
			`
		});
		return cancel(res, 200);
	}

	if(/(?<=[^\dа-яёa-z_-]|^)цены(?=[^\dа-яёa-z_-]|$)/i.test(command) && !modelRegex.test(command) && !priceRegex.test(command)) {
		const productsSnapshot = await get(ref(FBD, "products"));
		const productsData = productsSnapshot.val() as ProductsData;

		let anyChanges = isAnyChanges(productsData);

		const productsInfo = Products.map(product => {
			const dbMinPrice = productsData[product.id].price;
			const changed = product.getMinPrice() !== dbMinPrice;

			return `
				<a href="${validateUrl(product.getUrl())}">${product.getName()}</a>
				<b>Цена:</b> от ${dbMinPrice.toLocaleString("ru-RU")} BYN${changed ? ` <strike>(от ${product.getMinPriceString()} BYN)</strike>` : ""}
			`.trim();
		});

		await Telegram.sendMessage({
			chatId: chat.id,
			text: `
				🏷️ Актуальные цены на подъёмники.
				
				${productsInfo.join("\n\n")}
				
				${anyChanges ? "⚠️ Вы изменили некоторые цены. Пока-что они находятся в черновике. Чтобы опубликовать их на сайте, не забудьте попросить меня применить изменения." : ""}
			`
		});
		return cancel(res, 200);
	}

	if(/(?<=[^\dа-яёa-z_-]|^)(опублик(уй|овать)|примен(и|ить)|внести)\s([\dа-яёa-z]+?\s)*?изменения(?=[^\dа-яёa-z_-]|$)/i.test(command) && !modelRegex.test(command) && !priceRegex.test(command)) {
		const productsSnapshot = await get(ref(FBD, "products"));
		const productsData = productsSnapshot.val() as ProductsData;
		let anyChanges = isAnyChanges(productsData);

		if(!anyChanges) {
			await Telegram.sendMessage({
				chatId: chat.id,
				text: "❕ Никаких изменений к публикации пока нет."
			});
			return cancel(res, 200);
		}

		await Telegram.sendMessage({
			chatId: chat.id,
			text: `
				✅ Запрос на обновление данных отправлен! Изменения вступят в силу в течение 2-ух минут.
				
				💡 Пока что бот будет отображать неактуальную информацию. Нужно подождать 2 минуты, прежде чем пользоваться ботом снова.
				
				💡 Не забываем, что данные также необходимо вручную обновить на сайтах <a href="https://yandex.ru/sprav/34792489/edit/price-lists">Яндекс.Бизнеса</a> (карточки товаров) и <a href="https://direct.yandex.by/dna/campaigns-edit?ulogin=asterlift&campaigns-ids=108261483">Яндекс.Директа</a> (рекламные объявления).
			`
		});

		if(!isDevelopment()) await axios.post(process.env.VERCEL_REDEPLOY_HOOK_URL!);

		return cancel(res, 200);
	}

	if(/(?<=[^\dа-яёa-z_-]|^)помощь(?=[^\dа-яёa-z_-]|$)/i.test(command) && !modelRegex.test(command) && !priceRegex.test(command)) {
		await Telegram.sendMessage({
			chatId: chat.id,
			text: `
				🛠️ Список доступных команд.

				<code>Цены</code> – отобразить список цен на подъёмники.

				<code>Цена [модель] [новая цена]</code> – установить новую цену какому-либо подъёмнику.
				
				<code>Применить изменения</code> – опубликовать внесённые изменения на сайте.
				
				<code>Помощь</code> – отобразить список всех доступных команд.
			`
		});
		return cancel(res, 200);
	}

	await Telegram.sendMessage({
		chatId: chat.id,
		text: `
			❕ К сожалению, моим алгоритмом не предусмотрен ответ на саообщения подобного рода.
			
			💡 Вы можете спроисть у меня актуальные цены или установить новую цену на подъёмник.
			
			💡 Введите команду «Помощь» чтобы получить больше информации о доступных командах.
		`
	});
	return cancel(res, 200);
}