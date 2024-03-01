import type {AppNavigationItem} from "@/types/navigation";

const AppNavigation: Array<AppNavigationItem> = [
	{
		path: "/",
		name: "Главная"
	},
	{
		path: "/about",
		name: "О предприятии",
		anchors: [
			{
				path: "/about#certs",
				name: "Сертификаты и свидетельства"
			},
			{
				path: "/about#contacts",
				name: "Контактная информация"
			}
		]
	}
	// {
	// 	path: "/order",
	// 	name: "Как заказать"
	// }
];

export default AppNavigation;