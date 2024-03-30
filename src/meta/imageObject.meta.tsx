import type {ImageObject} from "schema-dts";
import {validateUrl} from "@/utils/url";
import MicrodataMeta from "@/meta/microdata.meta";
import type {StaticImageData} from "next/image";

interface Props {
	image: StaticImageData
	name?: string
	caption?: string
	description?: string
}

export default function ImageObjectMeta({image, name, caption, description}: Props) {
	const microdata: ImageObject = {
		"@type": "ImageObject",
		"contentUrl": validateUrl(image.src),
		"name": name,
		"caption": caption,
		"description": description,
		"height": `${image.height} px`,
		"width": `${image.width} px`
	};

	return (
		<MicrodataMeta microdata={microdata}/>
	);
}