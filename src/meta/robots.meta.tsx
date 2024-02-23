import Head from "next/head";
import {isDevelopment} from "@/utils/helpers";

export default function RobotsMeta() {
	const content: string = isDevelopment() ? "noindex, nofollow" : "index, follow";

	// noinspection HtmlRequiredTitleElement
	return (
		<Head>
			<meta name="robots" content={content}/>
		</Head>
	);
}