import {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {CSSProperties, ReactNode} from "react";
import {Slider} from "./slider";
import {combineClasses} from "@/utils/helpers";
import type {Nullable, Optional, Stylized} from "@/utils/helpers";
import type SwiperClass from "swiper";
import {FreeMode} from "swiper/modules";
import s from "./sliderWithThumbs.module.scss";
import type {SwiperModule} from "swiper/types";
import {useAppSelector} from "@/hooks/useAppSelector";
import Config from "@config";
import type {FullscreenController} from "@/store/app.slice";
import type {MediaMeta} from "@/types/media";

interface Props<T> extends Stylized {
	autoplayModule?: SwiperModule
	keyboardModule?: SwiperModule
	items: Array<T>
	mainGap?: number | string
	thumbsGap?: number | string
	initialSlideIndex?: number
	controller?: FullscreenController
	hideControlsWhenSingleItem?: boolean
	onClickMainSlide?(swiper: SwiperClass, item: T, index: number): void
	onClickThumbSlide?(swiper: SwiperClass, item: T, index: number): void
	renderMainSlide(item: T, index: number): ReactNode
	renderThumbSlide(item: T, index: number): ReactNode
	getSlideKey(item: T, index: number): string
	getMeta?(activeItem: T, activeIndex: number): MediaMeta
	getProgress?(activeItem: T, activeIndex: number, items: Array<T>): Optional<string>
}

function SliderWithThumbs<T>(props: Props<T>) {
	const {
		style,
		className,
		items,
		mainGap,
		thumbsGap,
		initialSlideIndex,
		autoplayModule,
		keyboardModule,
		controller,
		hideControlsWhenSingleItem,
		getSlideKey,
		renderMainSlide,
		renderThumbSlide,
		onClickMainSlide,
		onClickThumbSlide,
		getMeta,
		getProgress
	} = props;

	const isAutoplay: boolean = Boolean(autoplayModule);

	const containerRef = useRef<HTMLDivElement>(null);
	const mainSwiperRef = useRef<Nullable<SwiperClass>>(null);
	const thumbsSwiperRef = useRef<Nullable<SwiperClass>>(null);
	const isIntersectingRef = useRef<boolean>(false);
	const isFullscreenRef = useRef<boolean>(false);
	const listenForFullscreenUpdatesRef = useRef<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(initialSlideIndex || 0);
	const [visibility, setVisibility] = useState<CSSProperties["visibility"]>("hidden");
	const fullscreen = useAppSelector(state => state.app.fullscreen);
	
	const activeItem = items[activeIndex];

	const hideControls: boolean = Boolean(hideControlsWhenSingleItem && items.length == 1);

	const stopAutoplayHandler = useCallback(() => {
		if(!isAutoplay) return;
		const swiper = mainSwiperRef.current;
		if(!swiper) return;
		swiper.autoplay?.stop();
	}, [isAutoplay]);

	const startAutoplayHandler = useCallback(() => {
		if(!isAutoplay) return;
		const swiper = mainSwiperRef.current;
		if(!swiper) return;
		if(swiper.autoplay?.running) return;
		if(isFullscreenRef.current) return;
		if(!isIntersectingRef.current) return;
		swiper.autoplay?.start();
	}, [isAutoplay]);

	useEffect(() => {
		if(!isAutoplay) return;
		isFullscreenRef.current = fullscreen !== null;
		if(isFullscreenRef.current) {
			listenForFullscreenUpdatesRef.current = true;
			stopAutoplayHandler();
		} else {
			if(!listenForFullscreenUpdatesRef.current) return;
			listenForFullscreenUpdatesRef.current = false;
			setTimeout(() => {
				if(isIntersectingRef.current && containerRef.current && !containerRef.current.matches(":hover")) startAutoplayHandler();
			}, 1000);
		}
	}, [isAutoplay, fullscreen, stopAutoplayHandler, startAutoplayHandler]);

	useEffect(() => {
		if(!isAutoplay) return;
		setTimeout(() => {
			if(isIntersectingRef.current && containerRef.current && containerRef.current.matches(":hover")) stopAutoplayHandler();
		}, Config.SLIDER.AUTOPLAY_DELAY - 1000);
	}, [isAutoplay, stopAutoplayHandler]);

	useEffect(() => {
		if(!isAutoplay) return;
		if(!containerRef.current) return;

		const observer = new IntersectionObserver(entries => {
			for(const entry of entries) {
				isIntersectingRef.current = entry.isIntersecting;
				if(isIntersectingRef.current) {
					startAutoplayHandler();
				} else {
					stopAutoplayHandler();
				}
			}
		});

		observer.observe(containerRef.current);

		return () => {
			observer.disconnect();
		};
	}, [isAutoplay, startAutoplayHandler, stopAutoplayHandler]);

	const mainSliderStyle = useMemo<CSSProperties>(() => ({visibility}), [visibility]);
	
	const thumbsSliderStyle = useMemo<CSSProperties>(() => ({
		visibility,
		display: hideControls ? "none" : "block"
	}), [hideControls, visibility]);

	return (
		<div
			ref={containerRef}
			data-slider-overlay={"hover"}
			style={style}
			className={combineClasses(s.container, className)}
			onTouchStart={stopAutoplayHandler}
			onTouchEnd={startAutoplayHandler}
			onMouseEnter={stopAutoplayHandler}
			onMouseLeave={startAutoplayHandler}
		>
			<Slider
				sliderType="main"
				items={items}
				slidesPerView={1}
				loop={true}
				gap={mainGap}
				style={mainSliderStyle}
				autoplayModule={autoplayModule}
				keyboardModule={keyboardModule}
				getMeta={getMeta?.bind(null, activeItem, activeIndex)}
				getProgress={hideControls ? undefined : getProgress?.bind(null, activeItem, activeIndex, items)}
				initialSlideIndex={initialSlideIndex}
				onClickSlide={onClickMainSlide}
				getSlideKey={getSlideKey}
				renderSlide={renderMainSlide}
				onSwiper={swiper => {
					mainSwiperRef.current = swiper;
					if(thumbsSwiperRef.current) setVisibility(() => "visible");
				}}
				onRealIndexChange={swiper => {
					const newActiveIndex: number = swiper.realIndex;
					if(activeIndex === newActiveIndex) return;
					thumbsSwiperRef.current?.slideTo(newActiveIndex);
					if(controller) {
						if(controller.loop) controller.swiper.slideToLoop(newActiveIndex, 0, false);
						else controller.swiper.slideTo(newActiveIndex, 0, false);
					}
					setActiveIndex(() => newActiveIndex);
				}}
			/>
			<Slider
				sliderType="thumbs"
				freeModeModule={FreeMode}
				slidesPerView={"auto"}
				gap={thumbsGap}
				items={items}
				style={thumbsSliderStyle}
				initialSlideIndex={initialSlideIndex}
				onClickSlide={(swiper, item, index) => {
					if(index !== activeIndex) mainSwiperRef.current?.slideToLoop(index, 0);
					onClickThumbSlide?.(swiper, item, index);
				}}
				getSlideKey={getSlideKey}
				renderSlide={renderThumbSlide}
				getSlideClassName={(_item, index) => index === activeIndex ? s.activeThumb : ""}
				onSwiper={swiper => {
					thumbsSwiperRef.current = swiper;
					if(mainSwiperRef.current) setVisibility(() => "visible");
				}}
			/>
		</div>
	);
}

export default memo(SliderWithThumbs, function(prevProps, nextProps) {
	return prevProps.style === nextProps.style
		&& prevProps.className === nextProps.className
		&& prevProps.renderMainSlide === nextProps.renderMainSlide
		&& prevProps.renderThumbSlide === nextProps.renderThumbSlide
		&& prevProps.getProgress === nextProps.getProgress;
}) as typeof SliderWithThumbs;