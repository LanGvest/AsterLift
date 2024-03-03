import Head from "next/head";
import {useRouter} from "next/router";
import Config from "@config";

export default function CanonicalPageMeta() {
	const router = useRouter();

	const path: string = router.asPath.replace(/\?.*/, "");

	return (
		<Head>
			<link rel="canonical" href={Config.PROJECT_ORIGIN + path}/>
		</Head>
	);
}