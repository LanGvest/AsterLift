import NextImage from "next/image";
import type {StaticImageData} from "next/image";
import {useCallback, useState} from "react";
import type {ComponentProps, ReactEventHandler} from "react";
import {combineClasses} from "@/utils/helpers";
import type {Nullable} from "@/utils/helpers";

const TRANSITION_TIME: number = 200;
const EMPTY_IMAGE_DATA: `data:image/${string}` = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"/>";

function getBackgroundImageUri(src: Props["src"], placeholder: Props["placeholder"]): Nullable<string> {
	if(typeof src === "object" && placeholder === "blur") {
		const image: StaticImageData = "default" in src ? src.default : src;
		if(image.blurDataURL) return image.blurDataURL;
	} else if(placeholder && placeholder.startsWith("data:image/")) {
		return placeholder;
	}
	return null;
}

interface Props extends ComponentProps<typeof NextImage> {
	skipAnimation?: boolean
}

export function SmoothImage({src, onLoad, onError, style, className, placeholder, skipAnimation = false, ...props}: Props) {
	const [backgroundImageUri, setBackgroundImageUri] = useState<Nullable<string>>(() => getBackgroundImageUri(src, placeholder));
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const onLoadHandler = useCallback<ReactEventHandler<HTMLImageElement>>(event => {
		requestIdleCallback(() => {
			setIsVisible(() => true);
			setTimeout(() => {
				requestIdleCallback(() => {
					setBackgroundImageUri(() => null);
				});
			}, TRANSITION_TIME);
		});

		onLoad?.(event);
	}, [onLoad]);

	const onErrorHandler = useCallback<ReactEventHandler<HTMLImageElement>>(event => {
		event.currentTarget.srcset = "";
		if(backgroundImageUri) event.currentTarget.src = backgroundImageUri;
		onError?.(event);
	}, [onError, backgroundImageUri]);

	return (
		<div
			className={combineClasses(className)}
			data-smooth-image=""
			style={{
				backgroundImage: backgroundImageUri ? `url(${backgroundImageUri})` : "none",
				...style
			}}
		>
			<NextImage
				src={src}
				placeholder={EMPTY_IMAGE_DATA}
				onLoad={onLoadHandler}
				onError={onErrorHandler}
				style={{
					opacity: Number(isVisible),
					transition: `opacity ${TRANSITION_TIME}ms ease-out`
				}}
				{...props}
			/>
		</div>
	);
}