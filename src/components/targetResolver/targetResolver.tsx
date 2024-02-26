import {useEffect} from "react";
import {useRouter} from "next/router";

export function TargetResolver() {
	const router = useRouter();

	useEffect(() => {
		// console.log(router);
	}, [router]);

	return null;
}