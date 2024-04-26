import type {AppProps} from "next/app";
import {Store} from "@/utils/store";
import ReCaptchaProvider from "@/components/reCaptchaProvider";
import AppHead from "@/components/appHead";
import GlobalInlineStyle from "@/components/globalInlineStyle";
import CanonicalPageMeta from "@/meta/canonicalPage.meta";
import PageProgress from "@/components/pageProgress";
import {Provider} from "react-redux";
import RobotsMeta from "@/meta/robots.meta";
import YandexMetrikaMeta from "@/meta/yandexMetrika.meta";
import YandexVerificationMeta from "@/meta/yandexVerification.meta";
import GoogleAnalyticsMeta from "@/meta/googleAnalytics.meta";
import GoogleVerificationMeta from "@/meta/googleVerification.meta";
import PinterestVerificationMeta from "@/meta/pinterestVerification.meta";
import OrganizationMeta from "@/meta/organization.meta";
import FullscreenViewer from "@/components/fullscreenViewer";
import PageHeader from "@/components/pageHeader";
import PageFooter from "@/components/pageFooter";

export function NormalApp({Component, pageProps}: AppProps) {
	return (
		<Provider store={Store}>
			<ReCaptchaProvider>
				<AppHead/>
				<GlobalInlineStyle/>
				<CanonicalPageMeta/>
				<PageProgress/>
				<RobotsMeta/>
				<YandexMetrikaMeta/>
				<YandexVerificationMeta/>
				<GoogleAnalyticsMeta/>
				<GoogleVerificationMeta/>
				<PinterestVerificationMeta/>
				<OrganizationMeta/>
				<FullscreenViewer/>
				<PageHeader/>
				<Component {...pageProps}/>
				<PageFooter/>
			</ReCaptchaProvider>
		</Provider>
	);
}