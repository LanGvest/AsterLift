import Head from "next/head";
import {isDevelopment} from "@/utils/helpers";

interface Props {
	text: string
}

export default function DescriptionMeta({text}: Props) {
	// const [isHidden, setIsHidden] = useState(false);
	//
	// useEffect(() => {
	// 	if(isDevelopment()) return;
	//
	// 	requestIdleCallback(() => {
	// 		setIsHidden(true);
	// 	});
	// }, []);
	//
	// if(isHidden) return null;

	return (
		<Head>
			<meta
				name="description"
				content={text}
				data-lenth={isDevelopment() ? text.length : undefined}
			/>
		</Head>
	);
}