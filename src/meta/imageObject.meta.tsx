/* eslint-disable @next/next/no-img-element */

import type {ImageObject} from "schema-dts";
import {validateUrl} from "@/utils/url";
import MicrodataMeta from "@/meta/microdata.meta";
import type {StaticImageData} from "next/image";

interface Props {
	image: StaticImageData
	alt: string
	name?: string
	caption?: string
	description?: string
}

export default function ImageObjectMeta({image, alt, name, caption, description}: Props) {
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
		<>
			<MicrodataMeta microdata={microdata}/>
			<noscript>
				<div itemScope itemType="https://schema.org/ImageObject" data-hidden-jsx="">
					<img
						itemProp="contentUrl"
						src={validateUrl(image.src)}
						height={image.height}
						width={image.width}
						alt={alt}
					/>
					<p itemProp="name">{name}</p>
					<p itemProp="caption">{caption}</p>
					<p itemProp="description">{description}</p>
				</div>
			</noscript>
		</>
	);
}