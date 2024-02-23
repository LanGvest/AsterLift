import s from "../styles/index.module.scss";
import Products from "../assets/data/products";
import React from "react";
import PageLayout from "../layouts/page";
import ContentBlock from "../ui/contentBlock";
import ProductCard from "../components/productCard";
import GradientBackground from "@/components/gradientBackground";

export default function IndexPage() {
	return (
		<PageLayout title="Подъёмное оборудование">
			<GradientBackground/>
			<ContentBlock className={s.learnMore}>
				<h1>Астер-Лифт</h1>
				<p>Производитель подъёмного оборудования в Беларуси.</p>
				<button>Узнать больше</button>
			</ContentBlock>
			<ContentBlock className={s.productCards}>
				{Products.map(product => <ProductCard key={product.id} product={product}/>)}
			</ContentBlock>
		</PageLayout>
	);
}