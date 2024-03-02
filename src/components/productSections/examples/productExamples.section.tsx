import {memo} from "react";
import s from "./productExamples.module.scss";
import {useAppActions} from "@/hooks/useAppActions";
import type {ProductSectionProps} from "@/types/product";
import Slider from "../../../ui/slider";
import {FreeMode} from "swiper/modules";
import SmoothImage from "@/ui/smoothImage";

const IMAGE_SIZE: number = 280;

function Section({product}: ProductSectionProps) {
	const {openFullscreenProductExamples} = useAppActions();

	return (
		<div className={s.container}>
			<Slider
				gap={12}
				slidesPerView={"auto"}
				items={product.examples}
				freeModeModule={FreeMode}
				onClickSlide={(swiper, _item, index) => {
					openFullscreenProductExamples({
						product,
						controller: {
							swiper,
							loop: false
						},
						initialSlide: index
					});
				}}
				getSlideMeta={item => item}
				getSlideKey={example => example.image.src}
				renderSlide={example => (
					<SmoothImage
						src={example.image}
						width={IMAGE_SIZE}
						height={IMAGE_SIZE * (12 / 10)}
						placeholder="blur"
						loading="lazy"
						alt={product.getName()}
						title={product.getTitle()}
						fetchPriority="low"
					/>
				)}
			/>
		</div>
	);
}

export const ProductExamplesSection = memo(Section);