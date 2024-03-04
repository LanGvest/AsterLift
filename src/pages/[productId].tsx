import type {GetServerSideProps, GetServerSidePropsResult} from "next";
import type {Product} from "@/types/product";
import type {Nullable} from "@/utils/helpers";
import s from "@/styles/product.module.scss";
import Products from "@/assets/data/products";
import ContentBlock from "@/ui/contentBlock";
import PageLayout from "@/layouts/page";
import ProductMeta from "@/meta/product.meta";
import ProductInfo from "@/components/productInfo";
import ProductSections from "@/components/productSections";
import ProductOverviewSkeleton from "@/components/productOverview/productOverview.skeleton";
import {createContext, useContext} from "react";
import dynamic from "next/dynamic";
import DescriptionMeta from "@/meta/description.meta";
import KeywordsMeta from "@/meta/keywords.meta";
import BreadcrumbsMeta from "@/meta/breadcrumbs.meta";
import OpenGraphProductMeta from "@/meta/openGraphProduct.meta";
import TwitterCardProductMeta from "@/meta/twitterCardProduct.meta";

const LoadingProductContext = createContext<Nullable<Product>>(null);

function LoadingProductOverviewSkeleton() {
	const product = useContext(LoadingProductContext)!;

	return (
		<ProductOverviewSkeleton product={product}/>
	);
}

const ProductOverview = dynamic(() => import("@/components/productOverview"), {
	loading: () => <LoadingProductOverviewSkeleton/>,
	ssr: false
});

interface Props {
	productId: string
	key: string
}

export default function Product({productId}: Props) {
	const product: Product = Products.find(product => product.id === productId)!;

	return (
		<PageLayout title={product.getPageTitle()}>
			<ProductMeta product={product}/>
			<KeywordsMeta startPhrases={product.keywords}/>
			<DescriptionMeta text={product.getPageDescription()}/>
			<BreadcrumbsMeta currentName={product.model}/>
			<OpenGraphProductMeta product={product}/>
			<TwitterCardProductMeta product={product}/>
			<ContentBlock className={s.summary}>
				<LoadingProductContext.Provider value={product}>
					<ProductInfo product={product}/>
					{/*<LoadingProductOverviewSkeleton/>*/}
					<ProductOverview product={product}/>
				</LoadingProductContext.Provider>
			</ContentBlock>
			<ContentBlock className={s.sections}>
				<ProductSections product={product}/>
			</ContentBlock>
		</PageLayout>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async (context): Promise<GetServerSidePropsResult<Props>> => {
	const product: Nullable<Product> = Products.find(product => product.id === context.query.productId) || null;

	if(!product) return {
		notFound: true
	};

	return {
		props: {
			productId: product.id,
			key: product.id
		}
	};
};