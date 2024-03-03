import NextDocument, {Html, Main, Head, NextScript} from "next/document";
import Config from "@config";
import React from "react";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="ru" dir="ltr">
				<Head>
					<meta name="format-detection" content="telephone=no, email=no, address=no, date=no"/>
					<meta name="google" content="notranslate"/>
					<meta name="copyright" content={Config.PROJECT_NAME}/>
					<meta name="developer" content="LanGvest"/>
					<link rel="icon" type="image/x-icon" href="/favicon.ico"/>
					<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
					<link rel="mask-icon" href="/icons/mask-icon.svg" color={Config.PROJECT_COLOR}/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}