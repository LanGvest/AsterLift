import s from "./pageHeader.module.scss";
import React, {memo, useCallback, useEffect, useRef} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {useForceUpdate} from "@/hooks/useForceUpdate";
import type {Nullable} from "@/utils/helpers";
import ContentBlock from "@/ui/contentBlock";
import LogoIcon from "@/assets/icons/logo.icon";
import AppNavigation from "@/assets/data/appNavigation";
import Config from "@config";
import useStateRef from "@/hooks/useStateRef";
import MenuIcon from "@/assets/icons/menu.icon";

interface InTopCache {
	[path: string]: boolean
}

const inTopCache: InTopCache = {};

let isRouteChangedByLink: boolean = false;

function normalizeUrl(url: string): string {
	if(!/^https?:\/\//.test(url)) url = location.origin + (url.startsWith("/") ? url : "/" + url);
	return url.replace(/#.+$/, "");
}

function getInTop(): boolean {
	return document.documentElement.scrollTop === 0;
}

function PageHeader() {
	const router = useRouter();
	const forceUpdate = useForceUpdate();
	const fromPathRef = useRef<string>(router.asPath);
	const inTopRef = useRef<boolean>(true);
	const isRouteChangingRef = useRef<boolean>(false);
	const [isMobileNavOpenRef, setIsMobileNavOpen] = useStateRef<boolean>(false);

	if(fromPathRef.current !== router.asPath) {
		if(normalizeUrl(fromPathRef.current) === normalizeUrl(router.asPath)) {
			inTopRef.current = false;
		} else if(isRouteChangedByLink) {
			inTopRef.current = true;
		} else {
			inTopRef.current = inTopCache[router.asPath] ?? true;
		}
		fromPathRef.current = router.asPath;
	}

	const scrollHandler = useCallback((): void => {
		const newInTop: boolean = getInTop();
		if(inTopRef.current === newInTop) return;
		inTopRef.current = newInTop;
		if(isMobileNavOpenRef.current) setIsMobileNavOpen(() => false);
		forceUpdate();
	}, [forceUpdate, isMobileNavOpenRef, setIsMobileNavOpen]);

	const changeRoute = useCallback((event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
		if(isMobileNavOpenRef.current) setIsMobileNavOpen(() => false);
		if(router.route === to) {
			event.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}, [isMobileNavOpenRef, router.route, setIsMobileNavOpen]);

	useEffect(() => {
		function onResize(): void {
			if(isMobileNavOpenRef.current) setIsMobileNavOpen(() => false);
		}

		document.addEventListener("scroll", scrollHandler);
		window.addEventListener("resize", onResize);

		return () => {
			document.removeEventListener("scroll", scrollHandler);
			window.removeEventListener("resize", onResize);
		};
	}, [isMobileNavOpenRef, scrollHandler, setIsMobileNavOpen]);

	useEffect(() => {
		function routeChangeStartHandler() {
			isRouteChangingRef.current = true;
			inTopCache[router.asPath] = getInTop();
		}

		function routeChangeCompleteHandler() {
			isRouteChangingRef.current = false;
			isRouteChangedByLink = false;
		}

		router.events.on("routeChangeStart", routeChangeStartHandler);
		router.events.on("routeChangeComplete", routeChangeCompleteHandler);

		return () => {
			router.events.off("routeChangeStart", routeChangeStartHandler);
			router.events.off("routeChangeComplete", routeChangeCompleteHandler);
		};
	}, [router]);

	useEffect(() => {
		function linkClickHandler(event: MouseEvent): void {
			const $element: Nullable<HTMLElement> = event.target as HTMLElement || null;
			if(!$element) return;
			const $a: Nullable<HTMLAnchorElement> = $element.closest("a") || null;
			if(!$a) return;
			const fromUrl: string = normalizeUrl(location.href);
			const toUrl: string = normalizeUrl($a.href);
			if(toUrl === fromUrl || !toUrl.startsWith(location.origin + "/")) return;
			isRouteChangedByLink = true;
		}

		const handlerOptions: AddEventListenerOptions = {
			capture: true
		};

		document.addEventListener("click", linkClickHandler, handlerOptions);
		
		return () => {
			document.removeEventListener("click", linkClickHandler, handlerOptions);
		};
	}, []);

	const toggleMobileNav: (value?: boolean) => void = useCallback(value => {
		setIsMobileNavOpen(prevState => typeof value === "boolean" ? value : !prevState);
	}, [setIsMobileNavOpen]);

	return (
		<div className={s.headerContainer}>
			<header
				className={s.header}
				data-no-transition={isRouteChangingRef.current ? "" : undefined}
				data-in-scroll={!inTopRef.current ? "" : undefined}
				data-expanded={isMobileNavOpenRef.current ? "" : undefined}
			>
				<ContentBlock className={s.container}>
					<div className={s.logoContainer}>
						<Link
							href="/"
							className={s.logo}
							onClick={event => changeRoute(event, "/")}
						>
							<LogoIcon/>
							<p>Астер-Лифт</p>
						</Link>
					</div>
					<nav className={s.nav}>
						{AppNavigation.map(item => (
							<Link
								key={item.path}
								href={item.path}
								data-active={router.pathname === item.path ? "" : undefined}
								className={s.navItem}
								onClick={event => changeRoute(event, item.path)}
							>{item.name}</Link>
						))}
					</nav>
					<div className={s.contactsContainer}>
						<div className={s.contacts}>
							<p>{Config.CONTACTS.PHONE_NUMBER}</p>
							<span>{Config.CONTACTS.EMAIL}</span>
						</div>
					</div>
					<div className={s.mobileNavMenuButton} onClick={() => toggleMobileNav()}>
						<MenuIcon/>
					</div>
				</ContentBlock>
				<ContentBlock className={s.mobileNavContainer}>
					<div className={s.mobileNavWrapper}>
						<nav className={s.mobileNav}>
							{AppNavigation.map(item => (
								<Link
									key={item.path}
									href={item.path}
									data-active={router.pathname === item.path ? "" : undefined}
									className={s.navItem}
									onClick={event => changeRoute(event, item.path)}
								>{item.name}</Link>
							))}
						</nav>
						<div className={s.mobileContactsWrapper}>
							<hr/>
							<div className={s.mobileContacts}>
								<p>{Config.CONTACTS.PHONE_NUMBER}</p>
								<span>{Config.CONTACTS.EMAIL}</span>
							</div>
						</div>
					</div>
				</ContentBlock>
			</header>
			<div
				className={s.backgroundFilter}
				data-enabled={isMobileNavOpenRef.current ? "" : undefined}
				onMouseDown={() => toggleMobileNav(false)}
			/>
		</div>
	);
}

export default memo(PageHeader, () => true);