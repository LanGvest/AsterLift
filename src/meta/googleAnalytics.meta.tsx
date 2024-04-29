/* eslint-disable @next/next/no-img-element */

import Script from "next/script";
import {isDevelopment} from "@/utils/helpers";
import {useEffect, useState} from "react";
import type {ReactNode} from "react";

const DATA_THREAD_ID: string = "G-W1DGED52X8";

function getGoogleAnalyticsScriptCode(): string {
	return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${DATA_THREAD_ID}");`;
}

const GOOGLE_ANALYTICS_SCRIPT_CODE: string = getGoogleAnalyticsScriptCode();

function Analytics() {
	return (
		<>
			<Script async src={`https://www.googletagmanager.com/gtag/js?id=${DATA_THREAD_ID}`}/>
			<Script id="google-analitycs" strategy="afterInteractive">{GOOGLE_ANALYTICS_SCRIPT_CODE}</Script>
		</>
	);
}

export default function GoogleAnalyticsMeta() {
	const [jsx, setJsx] = useState<ReactNode>(null);

	useEffect(() => {
		if(isDevelopment()) return;

		setTimeout(() => {
			setJsx(<Analytics/>);
		}, 3_000);
	}, []);
	
	return jsx;
}