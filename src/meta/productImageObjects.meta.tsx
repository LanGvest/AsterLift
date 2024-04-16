import type {Product} from "@/types/product";
import ImageObjectMeta from "@/meta/imageObject.meta";
import {Optional, Undefinable} from "@/utils/helpers";

interface Props {
	product: Product
}

function getProductCaption(contents: Array<Optional<string>>): Undefinable<string> {
	const arr: Array<String> = contents.filter(content => content) as Array<string>;
	let result: string = "";

	for(let i = 0; i < arr.length; i++) {
		let text = arr[i].trim();
		result += text;
		if(i === arr.length - 1) break;
		if(/[\dа-яёa-z]$/i.test(text)) result += ".";
		result += " ";
	}

	return result || undefined;
}

export default function ProductImageObjectsMeta({product}: Props) {
	return (
		<>
			{product.overview.map(image => (
				<ImageObjectMeta
					key={image.image.src}
					image={image.image}
					alt={product.getName()}
					name={product.getName()}
					caption={getProductCaption([image.location, image.name, image.description])}
					description={product.getPageDescription()}
				/>
			))}
		</>
	);
}