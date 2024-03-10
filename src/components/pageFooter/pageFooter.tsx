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
import NoWrap from "@/ui/noWrap";

interface CatalogNavigationAnchor extends AppNavigationAnchor {
	path: string
	name: string
	shortName: string
}

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
	[category: string]: Array<CatalogNavigationAnchor>
}

interface NavigationProductCategory {
	label: string
	anchors: Array<CatalogNavigationAnchor>
}

function getNavigationProductCategories(): Array<NavigationProductCategory> {
	const categories: NavigationProductCategories = {};
	for(const product of Products) {
		if(!categories[product.category]) categories[product.category] = [];
		categories[product.category].push({
			path: product.getUrl(),
			name: product.catalogName,
			shortName: product.model
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

const SHORT_TELEPHONE: string = Config.CONTACTS.PHONE_NUMBER.replace("+375", "8").replace(/ (\d{1,3}) /, (_, $1) => ` ${$1.padStart(3, "0")} `);
const SHORT_EMAIL: string = Config.CONTACTS.EMAIL.replace("yandex.by", "ya.ru");

function Component() {
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
										data-alt={anchor.shortName}
									><span>{anchor.name}</span></Link>
								))}
							</React.Fragment>
						))}
					</div>
					<div className={s.infoItem}>
						<p className={s.name}>График работы</p>
						<p className={s.label}>Без перерывов</p>
						<div className={s.schedule}>
							<p>ПН – <NoWrap>с 9:00</NoWrap> <NoWrap>до 18:00</NoWrap></p>
							<p>ВТ – <NoWrap>с 9:00</NoWrap> <NoWrap>до 18:00</NoWrap></p>
							<p>СР – <NoWrap>с 9:00</NoWrap> <NoWrap>до 18:00</NoWrap></p>
							<p>ЧТ – <NoWrap>с 9:00</NoWrap> <NoWrap>до 18:00</NoWrap></p>
							<p>ПТ – <NoWrap>с 9:00</NoWrap> <NoWrap>до 18:00</NoWrap></p>
							<p>СБ – выходной</p>
							<p>ВС – выходной</p>
						</div>
						<div className={s.mobileSchedule}>
							<p>По будням <NoWrap>с 9:00</NoWrap> <NoWrap>до 18:00</NoWrap></p>
						</div>
					</div>
					<div className={s.infoItem}>
						<p className={s.name}>Контакты</p>
						<p className={s.label}>{`Телефон (${Config.CONTACTS.PHONE_OPERATOR})`}</p>
						<a
							href={`tel:${Config.CONTACTS.PHONE_NUMBER.replace(/[^\d+]/g, "")}`}
							data-alt={SHORT_TELEPHONE}
						><span>{Config.CONTACTS.PHONE_NUMBER}</span></a>
						<p className={s.label}>Email</p>
						<a
							href={`mailto:${Config.CONTACTS.EMAIL}`}
							data-alt={SHORT_EMAIL}
						><span>{Config.CONTACTS.EMAIL}</span></a>
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
					<p className={s.copyright}>{`© 2014-${new Date().getFullYear()}`} <NoWrap>ЧПУП Астер-Лифт</NoWrap>. <NoWrap>Все права защищены</NoWrap>.</p>
				</div>
			</ContentBlock>
		</footer>
	);
}

export const PageFooter = memo(Component, () => true);