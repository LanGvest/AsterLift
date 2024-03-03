import type {Organization as OrganizationSchema} from "schema-dts";
import Config from "@config";
import Head from "next/head";
import {microdataToString} from "@/utils/helpers";

export default function OrganizationMeta() {
	const microdata: OrganizationSchema = {
		"@type": "Organization",
		"url": Config.PROJECT_ORIGIN + "/",
		"name": "Астер-Лифт",
		"alternateName": [
			"Aster-Lift",
			"Астэр-Ліфт",
			"ЧПУП Астер-Лифт"
		],
		"legalName": "Частное производственное унитарное предприятие «Астер-Лифт»",
		"logo": "https://asterlift.by/images/logo.png",
		"image": "https://asterlift.by/images/logo.png",
		"description": "Производитель подъёмного оборудования в Беларуси.",
		"telephone": Config.CONTACTS.PHONE_NUMBER,
		"email": Config.CONTACTS.EMAIL,
		"taxID": "491316077",
		"isicV4": "2816",
		"areaServed": "Беларусь",
		"foundingDate": "2014-12-11",
		"location": {
			"@type": "Place",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "BY",
				"addressRegion": "Гомельская область",
				"addressLocality": "Гомель",
				"postalCode": "246018",
				"streetAddress": "ул. Интендантская, д. 1А"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "52.442356",
				"longitude": "30.955855"
			}
		},
		"address": {
			"@type": "PostalAddress",
			"addressCountry": "BY",
			"addressRegion": "Гомельская область",
			"addressLocality": "Гомель",
			"postalCode": "246018",
			"streetAddress": "ул. Интендантская, д. 1А"
		}
	};

	// noinspection HtmlRequiredTitleElement
	return (
		<Head>
			<script type="application/ld+json" dangerouslySetInnerHTML={{
				__html: microdataToString(microdata)
			}}></script>
		</Head>
	);
}