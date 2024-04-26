import Config from "@config";
import Head from "next/head";

interface Props {
	title?: string
}

function makeTitle(title?: string): string {
	if(!title) return Config.PROJECT_NAME;
	return `${title} | ${Config.PROJECT_NAME}`;
}

export function AppHead({title}: Props) {
	return (
		<Head>
			<title>{makeTitle(title)}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta name="theme-color" content="#1a1a1c"/>
			<meta name="color-scheme" content="light only"/>
		</Head>
	);
}