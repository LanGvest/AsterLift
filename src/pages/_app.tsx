import "@/styles/root.scss";
import "@/styles/global.scss";
import "@/utils/global";
import "swiper/scss";
import "swiper/scss/free-mode";
import "swiper/scss/virtual";
import "swiper/scss/autoplay";
import type {AppProps} from "next/app";
import Head from "next/head";
import {Provider} from "react-redux";
import {Store} from "@/utils/store";
import Config from "@config";
import RobotsMeta from "@/meta/robots.meta";
import PageHeader from "@/components/pageHeader/pageHeader";
import PageFooter from "@/components/pageFooter/pageFooter";
import {Inter} from "next/font/google";
import FontVariable from "@/components/fontVariable";
import FullscreenViewer from "@/components/fullscreenViewer";
import OrganizationMeta from "@/meta/organization.meta";
import YandexWebmasterMeta from "@/meta/yandexWebmaster.meta";
import TargetResolver from "@/components/targetResolver";
import bg from "@/assets/images/bg.webp";

const inter = Inter({
	weight: ["400", "600", "700", "800"], // 800 можно будет убрать
	style: "normal",
	subsets: ["latin", "cyrillic"],
	display: "swap",
	preload: true
});

// noinspection JSUnusedGlobalSymbols
export default function App({Component, pageProps}: AppProps) {
	return (
		<Provider store={Store}>
			<Head>
				<title>{Config.PROJECT_NAME}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<meta name="description" content={Config.PROJECT_DESCRIPTION}/>
				<meta name="theme-color" content="#1a1a1c"/>
				<meta name="color-scheme" content="light only"/>
				<link rel="preload" as="image" href={bg.src} fetchPriority="high"/>
			</Head>
			<RobotsMeta/>
			<YandexWebmasterMeta/>
			<OrganizationMeta/>
			<FontVariable name="inter" font={inter}/>
			<TargetResolver/>
			<FullscreenViewer/>
			<PageHeader/>
			<Component {...pageProps}/>
			<PageFooter/>
		</Provider>
	);
}