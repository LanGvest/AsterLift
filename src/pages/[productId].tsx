import type {GetServerSideProps, GetServerSidePropsResult} from "next";
import type {Product} from "@/types/product";
import type {Nullable} from "@/utils/helpers";
import s from "../styles/product.module.scss";
import Products from "../assets/data/products";
import ContentBlock from "../ui/contentBlock";
import PageLayout from "../layouts/page";
import ProductMeta from "../meta/product.meta";
import ProductInfo from "../components/productInfo";
import ProductOverview from "../components/productOverview";
import ProductSections from "../components/productSections";

interface Props {
	productId: string
	key: string
}

export default function Product({productId}: Props) {
	const product: Product = Products.find(product => product.id === productId)!;

	return (
		<PageLayout title={product.getPageTitle()}>
			<ProductMeta product={product}/>
			<ContentBlock className={s.summary}>
				<ProductInfo product={product}/>
				<ProductOverview product={product}/>
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