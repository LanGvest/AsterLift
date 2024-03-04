import Head from "next/head";

interface Props {
	title: string
	url: string
	image: string
	description: string
}

export default function OpenGraphWebsiteMeta({title, url, image, description}: Props) {
	return (
		<Head>
			<meta property="og:type" content="website"/>
			<meta property="og:title" content={title}/>
			<meta property="og:url" content={url}/>
			<meta property="og:image" content={image}/>
			<meta property="og:description" content={description}/>
		</Head>
	);
}