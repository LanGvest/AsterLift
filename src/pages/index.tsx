import s from "../styles/index.module.scss";
import Products from "../assets/data/products";
import React from "react";
import PageLayout from "../layouts/page";
import ContentBlock from "../ui/contentBlock";
import ProductCard from "../components/productCard";
import GradientBackground from "@/components/gradientBackground";
import Config from "@config";
import ExternalLinkIcon from "@/assets/icons/externalLink.icon";
import Link from "next/link";

export default function IndexPage() {
	// noinspection HtmlUnknownAnchorTarget
	return (
		<PageLayout title="Подъёмное оборудование">
			<GradientBackground/>
			<ContentBlock className={s.learnMore}>
				<h1>{Config.PROJECT_NAME}</h1>
				<p>Производитель подъёмного оборудования в Беларуси</p>
				<div className={s.buttons}>
					<Link href="/about" data-role="btn">
						<p>Узнать больше</p>
						{/*<ExternalLinkIcon/>*/}
					</Link>
					<Link href="/about#certs" data-role="btn" className={s.secondary}>
						<p>Сертификаты</p>
						<ExternalLinkIcon/>
					</Link>
				</div>
			</ContentBlock>
			<ContentBlock id="products" className={s.productCards}>
				{Products.map(product => <ProductCard key={product.id} product={product}/>)}
			</ContentBlock>
		</PageLayout>
	);
}