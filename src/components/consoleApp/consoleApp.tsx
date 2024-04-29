import AppHead from "@/components/appHead";
import type {AppProps} from "next/app";
import RobotsMeta from "@/meta/robots.meta";
// import Script from "next/script";

export function ConsoleApp({Component, pageProps}: AppProps) {
	return (
		<>
			<AppHead title="Консоль управления"/>
			<RobotsMeta allowed={false}/>
			{/*<Script src="https://telegram.org/js/telegram-web-app.js"/>*/}
			<Component {...pageProps}/>
		</>
	);
}