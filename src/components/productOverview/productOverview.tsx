import s from "./productOverview.module.scss";
import Image from "next/image";
import "swiper/css/free-mode";
import {getDefaultSliderProgress, getPriorityIndexes, isPriority} from "@/utils/helpers";
import type {Product} from "@/types/product";
import SliderWithThumbs from "@/ui/slider/sliderWithThumbs";
import {Autoplay} from "swiper/modules";
import {useAppActions} from "@/hooks/useAppActions";
import {useEffect, useState} from "react";
import {useIsInitialUpdate} from "@/hooks/useIsInitialUpdate";
import {useForceUpdate} from "@/hooks/useForceUpdate";

interface Props {
	product: Product
}

const IMAGE_SIZE: number = 500;
const THUMB_IMAGE_SIZE: number = 100;

export function ProductOverview({product}: Props) {
	const isInitialUpdate = useIsInitialUpdate();
	const forceUpdate = useForceUpdate();
	const [activeIndex, setActiveIndex] = useState(0);
	// const [isVisible, setIsVisible] = useState(false);
	const {openFullscreenProductOverview} = useAppActions();

	const priorityIndexes = isInitialUpdate ? [] : getPriorityIndexes(activeIndex, product.overview.length, 1);

	// const style = useMemo<CSSProperties>(() => ({
	// 	// display: isVisible ? undefined : "none"
	// }), [isVisible]);

	useEffect(() => {
		forceUpdate();
	}, [forceUpdate]);

	return (
		<SliderWithThumbs
			// style={style}
			className={s.container}
			mainGap={12}
			thumbsGap={12}
			items={product.overview}
			getSlideKey={item => item.image.src}
			getMeta={activeItem => ({
				location: activeItem.location
			})}
			onActiveIndexChange={index => setActiveIndex(index)}
			getProgress={getDefaultSliderProgress}
			autoplayModule={Autoplay}
			// onVisibilityChange={newVisibility => setIsVisible(() => newVisibility === "visible")}
			onClickMainSlide={(swiper, _item, index) => {
				openFullscreenProductOverview({
					product,
					controller: {
						swiper,
						loop: false
					},
					initialSlide: index
				});
			}}
			renderMainSlide={(item, index) => (
				<Image
					style={{
						backgroundImage: `url(${item.image.blurDataURL})`
					}}
					src={item.image}
					width={IMAGE_SIZE}
					height={IMAGE_SIZE * (12 / 10)}
					priority={isPriority(index, priorityIndexes)}
					alt={product.getName()}
					title={product.getTitle()}
				/>
			)}
			renderThumbSlide={item => (
				<Image
					src={item.image}
					width={THUMB_IMAGE_SIZE}
					height={THUMB_IMAGE_SIZE}
					loading="lazy"
					placeholder="blur"
					fetchPriority="high"
					alt={product.getName()}
					title={product.getTitle()}
				/>
			)}
		/>
	);
}