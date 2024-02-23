import type {Organization as OrganizationSchema} from "schema-dts";
import Config from "../../config";
import Head from "next/head";
import {microdataToString} from "@/utils/helpers";

export default function OrganizationMeta() {
	const microdata: OrganizationSchema = {
		"@type": "Organization",
		"url": "https://asterlift.by",
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
		"email": Config.CONTACTS.EMAIL,
		"taxID": "491316077",
		"isicV4": "2816",
		"keywords": [
			"подъёмное оборудование",
			"подъёмники для инвалидов"
		],
		"location": {
			"@type": "Place",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "Беларусь",
				"addressRegion": "Гомельская область",
				"addressLocality": "Гомель",
				"postalCode": "246018",
				"streetAddress": "ул. Интендантская, д. 1М"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "52.441910",
				"longitude": "30.948480"
			}
		},
		"telephone": Config.CONTACTS.PHONE_NUMBER,
		"address": {
			"@type": "PostalAddress",
			"addressCountry": "Беларусь",
			"addressRegion": "Гомельская область",
			"addressLocality": "Гомель",
			"postalCode": "246035",
			"streetAddress": "ул. Маневича, д. 18, кв. 62"
		},
		"areaServed": "Беларусь",
		"foundingDate": "2014-12-11"
	};

	// noinspection HtmlRequiredTitleElement
	return (
		<Head>
			<script type="application/ld+json">{microdataToString(microdata)}</script>
		</Head>
	);
}