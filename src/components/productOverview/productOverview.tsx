import s from "./productOverview.module.scss";
import Image from "next/image";
import "swiper/css/free-mode";
import {getDefaultSliderProgress} from "@/utils/helpers";
import type {Product} from "@/types/product";
import SliderWithThumbs from "@/ui/slider/sliderWithThumbs";
import {Autoplay} from "swiper/modules";
import {useAppActions} from "@/hooks/useAppActions";

interface Props {
	product: Product
}

export function ProductOverview({product}: Props) {
	const {openFullscreenProductOverview} = useAppActions();

	return (
		<SliderWithThumbs
			className={s.container}
			mainGap={12}
			thumbsGap={12}
			items={product.overview}
			getSlideKey={item => item.image.src}
			getMeta={activeItem => ({
				location: activeItem.location
			})}
			getProgress={getDefaultSliderProgress}
			autoplayModule={Autoplay}
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
			renderMainSlide={item => (
				<Image
					style={{
						backgroundImage: `url(${item.image.blurDataURL})`
					}}
					src={item.image}
					placeholder="blur"
					alt={`${product.type} ${product.model}`}
				/>
			)}
			renderThumbSlide={item => (
				<Image
					src={item.image}
					placeholder="blur"
					alt={`${product.type} ${product.model}`}
				/>
			)}
		/>
	);
}