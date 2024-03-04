import Head from "next/head";
import {isDevelopment} from "@/utils/helpers";

interface Props {
	startPhrases?: Array<string>
	endPhrases?: Array<string>
}

const COMMON_PHRASES: Array<string> = [
	"подъёмник для инвалидов",
	"купить подъёмник для инвалидов",
	"инвалидные подъёмники",
	"подъёмник для инвалидов колясочников",
	"цена",
	"купить минск",
	"в минске",
	"в беларуси"
];

export default function KeywordsMeta({startPhrases = [], endPhrases = []}: Props) {
	const keywords: Array<string> = [...startPhrases, ...COMMON_PHRASES, ...endPhrases];
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
				name="keywords"
				content={keywords.join(",")}
				data-count={isDevelopment() ? keywords.length : undefined}
			/>
		</Head>
	);
}