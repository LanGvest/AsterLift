import s from "./pageFooter.module.scss";
import Link from "next/link";
import ContentBlock from "@/ui/contentBlock";
import React, {useCallback, memo} from "react";
import type {MouseEvent} from "react";
import type {AppNavigationAnchor, AppNavigationItem} from "@/types/navigation";
import AppNavigation from "@/assets/data/appNavigation";
import Products from "@/assets/data/products";
import {useRouter} from "next/router";
import Config from "@config";
import LogoIcon from "@/assets/icons/logo.icon";
import {combineClasses} from "@/utils/helpers";
import TelegramLogoIcon from "@/assets/icons/telegramLogo.icon";
import ViberLogoIcon from "@/assets/icons/viberLogo.icon";
import WhatsappLogoIcon from "@/assets/icons/whatsappLogo.icon";

function getNavigationAnchors(ignorePath: string): Array<AppNavigationItem> {
	const result: Array<AppNavigationAnchor> = [];
	for(const item of AppNavigation) {
		if(item.path === ignorePath) continue;
		result.push(item);
		if(item.anchors?.length) for(const anchor of item.anchors) result.push(anchor);
	}
	return result;
}

interface NavigationProductCategories {
	[category: string]: Array<AppNavigationAnchor>
}

interface NavigationProductCategory {
	label: string
	anchors: Array<AppNavigationAnchor>
}

function getNavigationProductCategories(): Array<NavigationProductCategory> {
	const categories: NavigationProductCategories = {};
	for(const product of Products) {
		if(!categories[product.category]) categories[product.category] = [];
		categories[product.category].push({
			path: product.getUrl(),
			name: product.catalogName
		});
	}
	const result: Array<NavigationProductCategory> = [];
	for(const category in categories) result.push({
		label: category,
		anchors: categories[category]
	});
	return result;
}

const NAVIGATION_PRODUCT_CATEGORIES: Array<NavigationProductCategory> = getNavigationProductCategories();

function PageFooter() {
	const router = useRouter();

	const resetRoute = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
		if(router.route === "/") {
			event.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}, [router]);

	// const goToRoute = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
	// 	if(router.route === "/") {
	// 		event.preventDefault();
	// 		window.scrollTo({
	// 			top: 0,
	// 			behavior: "smooth"
	// 		});
	// 	}
	// }, [router]);

	return (
		<footer className={s.footer}>
			<ContentBlock className={s.container}>
				<div className={s.info}>
					<div className={s.infoItem}>
						<p className={s.name}>Дополнительно</p>
						{getNavigationAnchors(router.pathname).map(anchor => (
							<Link
								key={anchor.path}
								href={anchor.path}
							>{anchor.name}</Link>
						))}
					</div>
					<div className={s.infoItem}>
						<p className={s.name}>Каталог</p>
						{NAVIGATION_PRODUCT_CATEGORIES.map(category => (
							<React.Fragment key={category.label}>
								<p className={s.label}>{category.label}</p>
								{category.anchors.map(anchor => (
									<Link
										key={anchor.path}
										href={anchor.path}
									>{anchor.name}</Link>
								))}
							</React.Fragment>
						))}
					</div>
					<div className={s.infoItem}>
						<p className={s.name}>График работы</p>
						<p className={s.label}>Без перерывов</p>
						<p>ПН – с 9:00 до 18:00</p>
						<p>ВТ – с 9:00 до 18:00</p>
						<p>СР – с 9:00 до 18:00</p>
						<p>ЧТ – с 9:00 до 18:00</p>
						<p>ПТ – с 9:00 до 18:00</p>
						<p>СБ – выходной</p>
						<p>ВС – выходной</p>
					</div>
					<div className={s.infoItem}>
						<p className={s.name}>Контакты</p>
						<p className={s.label}>{`Телефон (${Config.CONTACTS.PHONE_OPERATOR})`}</p>
						<a href={`tel:${Config.CONTACTS.PHONE_NUMBER.replace(/[^\d+]/g, "")}`}>{Config.CONTACTS.PHONE_NUMBER}</a>
						<p className={s.label}>Email</p>
						<a href={`mailto:${Config.CONTACTS.EMAIL}`}>{Config.CONTACTS.EMAIL}</a>
						{/*<p className={s.label}>Мессенджеры</p>*/}
						<div className={s.social}>
							<Link
								href={"https://t.me/asterlift"}
								className={combineClasses(s.socialLink, s.telegram)}
								title={"Telegram"}
							>
								<TelegramLogoIcon/>
							</Link>
							<Link
								href={"https://viber.click/375291377466"}
								className={combineClasses(s.socialLink, s.viber)}
								title={"Viber"}
							>
								<ViberLogoIcon/>
							</Link>
							<Link
								href={"https://wa.me/375291377466"}
								className={combineClasses(s.socialLink, s.whatsapp)}
								title={"WhatsApp"}
							>
								<WhatsappLogoIcon/>
							</Link>
						</div>
						{/*<iframe className={s.review} src="https://yandex.ru/sprav/widget/rating-badge/95597498734?type=rating" width="150" height="50"/>*/}
					</div>
				</div>
				<div className={s.copyrightContainer}>
					<Link
						href="/"
						className={s.logo}
						onClick={event => resetRoute(event)}
					>
						<LogoIcon/>
						<p>Астер-Лифт</p>
					</Link>
					<p className={s.copyright}>{`© ${new Date().getFullYear()} ЧПУП Астер-Лифт. Все права защищены.`}</p>
				</div>
			</ContentBlock>
		</footer>
	);
}

export default memo(PageFooter, () => true);