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

const IMAGE_SIZE: number = 500;
const THUMB_IMAGE_SIZE: number = 100;

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
			renderMainSlide={(item, index) => (
				<Image
					style={{
						backgroundImage: `url(${item.image.blurDataURL})`
					}}
					src={item.image}
					width={IMAGE_SIZE}
					height={IMAGE_SIZE * (12 / 10)}
					priority={index == 0}
					placeholder="blur"
					alt={product.getName()}
					title={product.getPageTitle()}
				/>
			)}
			renderThumbSlide={item => (
				<Image
					src={item.image}
					width={THUMB_IMAGE_SIZE}
					height={THUMB_IMAGE_SIZE}
					placeholder="blur"
					alt={product.getName()}
					title={product.getPageTitle()}
				/>
			)}
		/>
	);
}