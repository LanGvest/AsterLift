import Head from "next/head";
import {isDevelopment} from "@/utils/helpers";

interface Props {
	allowed?: boolean
}

export default function RobotsMeta({allowed = !isDevelopment()}: Props) {
	const content: string = allowed ? "index, follow" : "noindex, nofollow";

	// noinspection HtmlRequiredTitleElement
	return (
		<Head>
			<meta name="robots" content={content}/>
		</Head>
	);
}