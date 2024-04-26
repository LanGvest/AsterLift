import type {GetServerSideProps, GetServerSidePropsResult} from "next";

interface Props {

}

export default function ConsolePage() {
	return (
		<>
			<h1>Hello World!</h1>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async (context): Promise<GetServerSidePropsResult<Props>> => {
	const hasToken: boolean = context.query["token"] === process.env.CONSOLE_TOKEN;

	if(!hasToken) return {
		notFound: true
	};

	// console.log(context.req);
	// console.log("=======================================================");
	// console.log(context.query);
	// console.log("=======================================================");
	// console.log(context.params);
	// console.log("=======================================================");
	// console.log(context.req.headers);

	return {
		props: {
			// productId: product.id,
			// key: product.id
		}
	};
};