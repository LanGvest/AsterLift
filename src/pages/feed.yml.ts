import type {GetServerSidePropsContext} from "next";
import Products from "@/assets/data/products";
import Config from "@config";
import {xml} from "@/utils/helpers";

export default function FeedYml() {}

function getFeedDate(): string {
	return Config.BUILT_AT.replace(/\.\d{3}Z$/i, "+03:00");
}

/*

<name>${Config.ORGANIZATION.NAME_RU}</name>
<company>${Config.ORGANIZATION.SHORT_LEGAL_NAME}</company>

 */

function generateFeed(): string {
	return xml`
		<yml_catalog date="${getFeedDate()}">
			<shop>
				<name>${Config.ORGANIZATION.NAME_RU}</name>
				<company>${Config.ORGANIZATION.SHORT_LEGAL_NAME}</company>
				<url>${Config.PROJECT_ORIGIN}</url>
				<offers>
					${Products.map(product => `
						<offer id="${product.id}">
						
						</offer>
					`).join("")}
				</offers>
			</shop>
		</yml_catalog>
	`;
}

export async function getServerSideProps({res}: GetServerSidePropsContext) {
	return {
		notFound: true
	};

	// const feed = generateFeed();
	//
	// console.log(feed.length);
	//
	// // res.setHeader("Content-Length", feed.length);
	// res.setHeader("Content-Type", "application/xml");
	// res.write(feed);
	// res.end();
	//
	// return {
	// 	props: {}
	// };
}