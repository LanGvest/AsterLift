import Head from "next/head";
import {isDevelopment, microdataToString} from "@/utils/helpers";

interface Props {
	microdata: any
}

export default function MicrodataMeta({microdata}: Props) {
	return (
		<Head>
			<script
				type="application/ld+json"
				data-schema={isDevelopment() && microdata["@type"] ? microdata["@type"] : undefined}
				dangerouslySetInnerHTML={{
					__html: microdataToString(microdata)
				}}
			/>
		</Head>
	);
}