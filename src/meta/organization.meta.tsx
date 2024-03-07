import type {Organization as OrganizationSchema, PostalAddress} from "schema-dts";
import Config from "@config";
import MicrodataMeta from "@/meta/microdata.meta";
import {validateUrl} from "@/utils/url";

const address: PostalAddress = {
	"@type": "PostalAddress",
	"addressCountry": Config.ADDRESS.COUNTRY.CODE,
	"addressRegion": Config.ADDRESS.REGION,
	"addressLocality": Config.ADDRESS.CITY,
	"postalCode": Config.ADDRESS.POSTAL_CODE,
	"streetAddress": Config.ADDRESS.LEGAL_STREET
};

const postalAddress: PostalAddress = {
	...address,
	"streetAddress": Config.ADDRESS.POSTAL_STREET
};

export default function OrganizationMeta() {
	const microdata: OrganizationSchema = {
		"@type": "Organization",
		"url": validateUrl("/"),
		"name": Config.ORGANIZATION.NAME_RU,
		"alternateName": [
			Config.ORGANIZATION.NAME_EN,
			Config.ORGANIZATION.NAME_BE,
			Config.ORGANIZATION.SHORT_LEGAL_NAME
		],
		"legalName": Config.ORGANIZATION.LEGAL_NAME,
		"logo": validateUrl(Config.ORGANIZATION.LOGO_URL),
		"image": validateUrl(Config.ORGANIZATION.COVER_URL),
		"description": Config.ORGANIZATION.DESCRIPTION,
		"telephone": Config.CONTACTS.PHONE_NUMBER,
		"email": Config.CONTACTS.EMAIL,
		"taxID": Config.ORGANIZATION.UNP.toString(),
		"isicV4": Config.ORGANIZATION.ISIC_V4.toString(),
		"areaServed": Config.ADDRESS.COUNTRY.NAME_RU,
		"foundingDate": Config.ORGANIZATION.FOUNDING_DATE,
		"location": {
			"@type": "Place",
			"address": address,
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": Config.ORGANIZATION.GEO.LATITUDE,
				"longitude": Config.ORGANIZATION.GEO.LONGITUDE
			}
		},
		"address": postalAddress
	};

	return (
		<MicrodataMeta microdata={microdata}/>
	);
}