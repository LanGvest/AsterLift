import type {GetServerSidePropsContext} from "next";
import Products from "@/assets/data/products";
import Config from "@config";
import {xml} from "@/utils/helpers";
import {validateUrl} from "@/utils/url";
import {Product} from "@/types/product";
import PP_101_A from "@/assets/data/products/pp-101-a";
import PP_110_M from "@/assets/data/products/pp-110-m";

const LIFT_FOR_THE_DISABLED_CATEGORY_ID: number = 1;
const VERTICAL_LIFT_FOR_THE_DISABLED_CATEGORY_ID: number = 2;
const INCLINED_LIFT_FOR_THE_DISABLED_CATEGORY_ID: number = 3;

export default function FeedYml() {}

function getFeedDate(): string {
	return Config.BUILT_AT.replace(/\.\d{3}Z$/i, "+03:00");
}

function getCategoryId(product: Product): number {
	if(product.group === PP_101_A.group) return VERTICAL_LIFT_FOR_THE_DISABLED_CATEGORY_ID;
	if(product.group === PP_110_M.group) return INCLINED_LIFT_FOR_THE_DISABLED_CATEGORY_ID;
	return LIFT_FOR_THE_DISABLED_CATEGORY_ID;
}

function generateFeed(): string {
	// noinspection HtmlUnknownAttribute
	return xml`
		<yml_catalog date="${getFeedDate()}">
			<shop>
				<name>${Config.ORGANIZATION.NAME_RU}</name>
				<company>${Config.ORGANIZATION.SHORT_LEGAL_NAME}</company>
				<url>${Config.PROJECT_ORIGIN}</url>
				<currencies>
					<currency id="BYN" rate="1"/>
				</currencies>
				<categories>
					<category id="${LIFT_FOR_THE_DISABLED_CATEGORY_ID}">Подъёмники для инвалидов</category>
                    <category id="${VERTICAL_LIFT_FOR_THE_DISABLED_CATEGORY_ID}" parentId="1">Вертикальные</category>
                    <category id="${INCLINED_LIFT_FOR_THE_DISABLED_CATEGORY_ID}" parentId="1">Наклонные</category>
				</categories>
				<delivery>true</delivery>
				<delivery-options>
					<option cost="400" days="1"/>
				</delivery-options>
				<pickup-options>
				    <option cost="0" days="1"/>
				</pickup-options>
				<offers>
					${Products.map(product => `
						<offer id="${product.id}" available="true">
							<name>${product.getName()}</name>
							<vendor>${Config.ORGANIZATION.NAME_RU}</vendor>
							<vendorCode>${product.model}</vendorCode>
							<url>${validateUrl(product.getUrl())}</url>
							<price>${product.getMinPrice()}</price>
							${product.hasDiscount() ? `<oldprice>${product.getOldMinPrice()}</oldprice>` : ""}
							<currencyId>BYN</currencyId>
							<categoryId>${getCategoryId(product)}</categoryId>
							<picture>${validateUrl(product.marketPreview[0].src)}</picture>
							<pickup>true</pickup>
							<description>${product.description}</description>
						</offer>
					`).join("")}
				</offers>
			</shop>
		</yml_catalog>
	`;
}

export async function getServerSideProps({res}: GetServerSidePropsContext) {
	const feed = generateFeed();

	// res.setHeader("Content-Length", feed.length);
	res.setHeader("Content-Type", "application/xml");
	res.write(feed);
	res.end();

	return {
		props: {}
	};
}