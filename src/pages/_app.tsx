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
import PageHeader from "@/components/pageHeader/pageHeader";
import PageFooter from "@/components/pageFooter/pageFooter";
import {Inter} from "next/font/google";
import RobotsMeta from "@/meta/robots.meta";
import FontVariable from "@/components/fontVariable";
import FullscreenViewer from "@/components/fullscreenViewer";
import OrganizationMeta from "@/meta/organization.meta";
import YandexWebmasterMeta from "@/meta/yandexWebmaster.meta";
import YandexMetrikaMeta from "@/meta/yandexMetrika.meta";
import CanonicalPageMeta from "@/meta/canonicalPage.meta";
import PageProgress from "@/components/pageProgress/pageProgress";

const inter = Inter({
	weight: ["400", "600", "700"], // 800 можно будет убрать
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
				<meta name="theme-color" content="#1a1a1c"/>
				<meta name="color-scheme" content="light only"/>
			</Head>
			<RobotsMeta/>
			<YandexMetrikaMeta/>
			<YandexWebmasterMeta/>
			<CanonicalPageMeta/>
			<OrganizationMeta/>
			<FontVariable name="inter" font={inter}/>
			<FullscreenViewer/>
			<PageProgress/>
			<PageHeader/>
			<Component {...pageProps}/>
			<PageFooter/>
		</Provider>
	);
}