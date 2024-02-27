import s from "../styles/index.module.scss";
import Products from "../assets/data/products";
import React from "react";
import PageLayout from "../layouts/page";
import ContentBlock from "../ui/contentBlock";
import ProductCard from "../components/productCard";
import GradientBackground from "@/components/gradientBackground";
import {useRouter} from "next/router";
import BelarusIcon from "@/assets/icons/belarus.icon";
import Config from "@config";

export default function IndexPage() {
	const router = useRouter();

	function goToAboutPage(): void {
		router.push("/about").then();
	}

	return (
		<PageLayout title="Подъёмное оборудование">
			<GradientBackground/>
			<ContentBlock className={s.learnMore}>
				<h1>{Config.PROJECT_NAME}</h1>
				<p>Производитель подъёмного оборудования в Беларуси</p>
				{/*<button onClick={goToAboutPage}>Узнать больше</button>*/}
				{/*<button>Более 8 лет на рынке</button>*/}
				{/*<BelarusIcon className={s.belarus}/>*/}
				{/*<BelarusIcon className={s.belarus}/>*/}
			</ContentBlock>
			<ContentBlock id="products" className={s.productCards}>
				{Products.map(product => <ProductCard key={product.id} product={product}/>)}
			</ContentBlock>
		</PageLayout>
	);
}