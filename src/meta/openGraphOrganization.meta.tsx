import Head from "next/head";
import Config from "@config";
import {validateUrl} from "@/utils/url";

export default function OpenGraphOrganizationMeta() {
	return (
		<Head>
			<meta property="og:type" content="business.business"/>
			<meta property="og:title" content={Config.ORGANIZATION.NAME_RU}/>
			<meta property="og:url" content={Config.PROJECT_ORIGIN}/>
			<meta property="og:image" content={validateUrl(Config.ORGANIZATION.COVER_URL)}/>
			<meta property="og:description" content={Config.ORGANIZATION.DESCRIPTION}/>
			<meta property="business:contact_data:street_address" content={Config.ADDRESS.STREET}/>
			<meta property="business:contact_data:locality" content={Config.ADDRESS.CITY}/>
			<meta property="business:contact_data:region" content={Config.ADDRESS.REGION}/>
			<meta property="business:contact_data:country_name" content={Config.ADDRESS.COUNTRY.NAME_EN}/>
		</Head>
	);
}