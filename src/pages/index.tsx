import s from "@/styles/index.module.scss";
import Products from "@/assets/data/products";
import PageLayout from "@/layouts/page";
import ContentBlock from "@/ui/contentBlock";
import ProductCard from "@/components/productCard";
import GradientBackground from "@/components/gradientBackground";
import Config from "@config";
import ExternalLinkIcon from "@/assets/icons/externalLink.icon";
import Link from "next/link";
import DescriptionMeta from "@/meta/description.meta";
import {LOWEST_PRICE_STRING} from "@/assets/data/products/products";
import KeywordsMeta from "@/meta/keywords.meta";
import CatalogMeta from "@/meta/catalog.meta";
import OpenGraphOrganizationMeta from "@/meta/openGraphOrganization.meta";
import TwitterCardOrganizationMeta from "@/meta/twitterCardOrganization.meta";
import {getCompanyAge, getCorrectWord} from "@/utils/helpers";

const COMPANY_AGE: number = getCompanyAge();
const COMPANY_AGE_PHRASE: string = `${COMPANY_AGE} ${getCorrectWord("лет", "год", "года", COMPANY_AGE)}`;
const DESCRIPTION: string = `Купить сертифицированный подъёмник для инвалидов от ${LOWEST_PRICE_STRING} BYN в Беларуси у производителя. Изготовление, доставка и монтаж за 14 дней. Гарантия 12 месяцев.`;

export default function IndexPage() {
	// noinspection HtmlUnknownAnchorTarget
	return (
		<PageLayout title="Подъёмники для инвалидов в Беларуси">
			<GradientBackground/>
			<KeywordsMeta endPhrases={[Config.PROJECT_NAME.toLowerCase()]}/>
			<DescriptionMeta text={DESCRIPTION}/>
			<CatalogMeta/>
			<OpenGraphOrganizationMeta/>
			<TwitterCardOrganizationMeta/>
			<ContentBlock className={s.learnMore}>
				<div className={s.title}>
					<h1>{Config.PROJECT_NAME}</h1>
					{/*<span>{COMPANY_AGE_PHRASE}</span>*/}
				</div>
				<p className={s.description}>Производитель подъёмного оборудования в Беларуси</p>
				<div className={s.buttons}>
					<Link
						href="/about"
						data-role="btn"
					>
						<p>Узнать больше</p>
					</Link>
					<Link
						href="/about#certs"
						data-role="btn"
						data-style="secondary"
						className={s.secondary}
					>
						<p>Сертификаты</p>
						<ExternalLinkIcon/>
					</Link>
				</div>
			</ContentBlock>
			<ContentBlock id="catalog" className={s.productCards}>
				{Products.map(product => <ProductCard key={product.id} product={product}/>)}
			</ContentBlock>
		</PageLayout>
	);
}