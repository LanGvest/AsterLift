import Head from "next/head";
import {useRouter} from "next/router";
import {validateUrl} from "@/utils/url";

export default function CanonicalPageMeta() {
	const router = useRouter();

	const path: string = router.asPath.replace(/\?.*/, "");

	return (
		<Head>
			<link rel="canonical" href={validateUrl(path)}/>
		</Head>
	);
}