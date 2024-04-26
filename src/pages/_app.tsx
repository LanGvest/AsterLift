import "@/styles/root.scss";
import "@/utils/global";
import "@/styles/global.scss";
import "swiper/scss";
import "swiper/scss/free-mode";
import "swiper/scss/virtual";
import "swiper/scss/autoplay";
import type {AppProps} from "next/app";
import ConsoleApp from "@/components/consoleApp";
import NormalApp from "@/components/normalApp";
import FontVariable from "@/components/fontVariable";
import {Inter} from "next/font/google";

const inter = Inter({
	weight: ["400", "600", "700"], // 800 можно будет убрать
	style: "normal",
	subsets: ["latin", "cyrillic"],
	display: "swap",
	preload: true
});

// noinspection JSUnusedGlobalSymbols
export default function App({Component, pageProps, router}: AppProps) {
	const isConsole = router.pathname.startsWith("/console");

	const AppComponent = isConsole ? ConsoleApp : NormalApp;

	return (
		<>
			<FontVariable name="inter" font={inter}/>
			<AppComponent Component={Component} router={router} pageProps={pageProps}/>
		</>
	);
}