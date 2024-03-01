import s from "./productCard.module.scss";
import type {StaticImageData} from "next/image";
import Image from "next/image";
import Link from "next/link";
import React, {useCallback, useEffect, useRef, useState} from "react";
import type {MouseEventHandler} from "react";
import type SwiperClass from "swiper";
import ProductTags from "@/components/productTags";
import type {Product} from "@/types/product";
import type {Nullable} from "@/utils/helpers";
import Slider from "@/ui/slider";
import Config from "@config";

interface Props {
	product: Product
}

const IMAGE_SIZE: number = 260;

export function ProductCard({product}: Props) {
	const [swiper, setSwiper] = useState<Nullable<SwiperClass>>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const activeIndexRef = useRef<number>(0);
	const [allPriority, setAllPriority] = useState(false);

	const mouseMoveHandler = useCallback<MouseEventHandler<HTMLDivElement>>(event => {
		if(!swiper || product.preview.length <= 1) return;
		const width: number = event.currentTarget.offsetWidth;
		const x: number = event.nativeEvent.offsetX;
		if(x < 0 || x > width) return;
		const length: number = product.preview.length;
		const halfWidth: number = width / length;
		const newActiveIndex: number = Math.floor(x / halfWidth);
		if(activeIndexRef.current === newActiveIndex) return;
		activeIndexRef.current = newActiveIndex;
		swiper.slideTo(newActiveIndex, 0);
	}, [swiper, product]);

	const mouseLeaveHandler = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
		if(!swiper || product.preview.length <= 1 || activeIndexRef.current === 0) return;
		activeIndexRef.current = 0;
		swiper.slideTo(0, 0);
	}, [swiper, product]);

	const renderSlide = useCallback((image: StaticImageData, index: number) => (
		<Image
			src={image}
			alt={product.getName()}
			title={product.getTitle()}
			width={IMAGE_SIZE}
			height={IMAGE_SIZE * (12 / 10)}
			priority={allPriority}
			placeholder="blur"
		/>
	), [product, allPriority]);

	useEffect(() => {
		requestIdleCallback(() => {
			setAllPriority(true);
		});
	}, []);

	return (
		<Link
			href={`/${product.id}`}
			className={s.card}
		>
			<div
				className={s.sliderContainer}
				onMouseEnter={mouseMoveHandler}
				onMouseMove={mouseMoveHandler}
				onMouseLeave={mouseLeaveHandler}
			>
				<Slider
					onSwiper={setSwiper}
					items={product.preview}
					getSlideKey={image => image.src}
					renderSlide={renderSlide}
					simulateTouch={false}
					resistanceRatio={0}
					navigationButtons={false}
					className={s.slider}
					speed={Config.SLIDER.SPEED_FAST}
					onRealIndexChange={swiper => {
						setActiveIndex(() => swiper.realIndex);
					}}
				/>
			</div>
			{product.preview.length > 1 && (
				<div className={s.dots}>
					{product.preview.map((image, index) => (
						<div
							key={image.src}
							className={s.dot}
							data-active={index === activeIndex ? "" : undefined}
						/>
					))}
				</div>
			)}
			<p className={s.name}>{product.type} <ProductTags product={product} className={s.tags}/></p>
			<p className={s.shortDescription}>{product.shortDescription}</p>
			<p className={s.minPrice}>от <b>{product.getMinPrice()}</b> BYN</p>
		</Link>
	);
}