import Head from "next/head";
import {validateUrl} from "@/utils/url";
import Config from "@config";

export default function TwitterCardOrganizationMeta() {
	return (
		<Head>
			<meta name="twitter:card" content="summary"/>
			<meta name="twitter:title" content={Config.ORGANIZATION.NAME_RU}/>
			<meta name="twitter:description" content={Config.ORGANIZATION.DESCRIPTION}/>
			<meta name="twitter:image" content={validateUrl(Config.ORGANIZATION.COVER_URL)}/>
			<meta name="twitter:image:alt" content={Config.ORGANIZATION.NAME_RU}/>
		</Head>
	);
}