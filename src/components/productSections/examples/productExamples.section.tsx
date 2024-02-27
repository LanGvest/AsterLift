import {memo} from "react";
import Image from "next/image";
import s from "./productExamples.module.scss";
import {useAppActions} from "@/hooks/useAppActions";
import type {ProductSectionProps} from "@/types/product";
import Slider from "../../../ui/slider";
import {FreeMode} from "swiper/modules";

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
					<Image
						src={example.image}
						width={IMAGE_SIZE}
						height={IMAGE_SIZE * (12 / 10)}
						placeholder="blur"
						alt={product.getName()}
						title={product.getPageTitle()}
					/>
				)}
			/>
		</div>
	);
}

export const ProductExamplesSection = memo(Section);