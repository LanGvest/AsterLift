import {Swiper, SwiperSlide} from "swiper/react";
import s from "./slider.module.scss";
import {memo, useCallback, useRef, useState} from "react";
import type {CSSProperties, ReactNode} from "react";
import type {SwiperModule} from "swiper/types";
import {combineClasses} from "@/utils/helpers";
import type {Nullable, Optional, Stylized} from "@/utils/helpers";
import Config from "@config";
import SliderNavButtons from "./sliderNavButtons";
import type {SliderHoverNav} from "@/types/slider";
import type SwiperClass from "swiper";
import LocationIcon from "@/assets/icons/location.icon";
import type {MediaMeta} from "@/types/media";

interface Props<T> extends Stylized {
	sliderType?: "main" | "thumbs"
	virtualModule?: SwiperModule
	freeModeModule?: SwiperModule
	autoplayModule?: SwiperModule
	keyboardModule?: SwiperModule
	loop?: boolean
	gap?: number | string
	initialSlideIndex?: number
	centerInsufficientSlides?: boolean
	slidesPerView?: number | "auto"
	items: Array<T>
	visible?: boolean
	simulateTouch?: boolean
	resistanceRatio?: number
	navigationButtons?: boolean
	speed?: number
	getMeta?(): MediaMeta
	getProgress?(): Optional<string>
	getSlideKey(item: T, index: number): string
	renderSlide(item: T, index: number): ReactNode
	onClickSlide?(swiper: SwiperClass, item: T, index: number): void
	getSlideMeta?(item: T, index: number): MediaMeta
	getSlideClassName?(item: T, index: number): string
	onRealIndexChange?(swiper: SwiperClass): void
	onSwiper?(swiper: SwiperClass): void
}

function Component<T>(props: Props<T>) {
	const {
		sliderType = "main",
		virtualModule,
		freeModeModule,
		autoplayModule,
		keyboardModule,
		loop = false,
		gap = 0,
		initialSlideIndex = 0,
		centerInsufficientSlides = true,
		className,
		style,
		slidesPerView = 1,
		items,
		simulateTouch = true,
		resistanceRatio = 0.7,
		navigationButtons = true,
		speed = Config.SLIDER.SPEED,
		getProgress,
		getMeta,
		getSlideMeta,
		onClickSlide,
		getSlideKey,
		renderSlide,
		onRealIndexChange,
		onSwiper,
		getSlideClassName
	} = props;

	const isVirtual: boolean = Boolean(virtualModule);
	const isFreeMode: boolean = Boolean(freeModeModule);
	const isAutoplay: boolean = Boolean(autoplayModule);
	const isKeyboard: boolean = Boolean(keyboardModule);
	const isLoop: boolean = Boolean(loop);

	const modules: Array<SwiperModule> = [];
	if(virtualModule) modules.push(virtualModule);
	if(freeModeModule) modules.push(freeModeModule);
	if(autoplayModule) modules.push(autoplayModule);
	if(keyboardModule) modules.push(keyboardModule);

	const swiperRef = useRef<Nullable<SwiperClass>>(null);
	const stepRef = useRef<number>(0);
	const [hoverNav, setHoverNav] = useState<SliderHoverNav>("none");
	const [reachStart, setReachStart] = useState<boolean>(!isLoop);
	const [reachEnd, setReachEnd] = useState<boolean>(!isLoop);
	const [visibility, setVisibility] = useState<CSSProperties["visibility"]>("hidden");

	const prevNavButtonHandler = useCallback(() => {
		const swiper = swiperRef.current;
		if(!swiper) return;
		if(isFreeMode) {
			const newProgress: number = Math.max(swiper.progress - stepRef.current, 0);
			const diff: number = swiper.progress - newProgress;
			const newProgressSpeed: number = diff > 0 ? diff * Config.SLIDER.SPEED / stepRef.current : 0;
			swiper.setProgress(newProgress, newProgressSpeed);
		} else {
			swiper.slidePrev();
		}
	}, [isFreeMode]);

	const nextNavButtonHandler = useCallback(() => {
		const swiper = swiperRef.current;
		if(!swiper) return;
		if(isFreeMode) {
			const newProgress: number = Math.min(swiper.progress + stepRef.current, 1);
			const diff: number = newProgress - swiper.progress;
			const newProgressSpeed: number = diff > 0 ? diff * Config.SLIDER.SPEED / stepRef.current : 0;
			swiper.setProgress(newProgress, newProgressSpeed);
		} else {
			swiper.slideNext();
		}
	}, [isFreeMode]);

	const meta = getMeta?.();
	const progress = getProgress?.();

	const showOverlay: boolean = Boolean(meta?.location || meta?.name || meta?.description || progress);

	return (
		<Swiper
			onSwiper={swiper => {
				swiperRef.current = swiper;
				if(isFreeMode && getSize(swiper) && getVirtualSize(swiper)) {
					stepRef.current = getSize(swiper) / (getVirtualSize(swiper) - getSize(swiper));
				}
				if(!style?.visibility) setVisibility(() => "visible");
				onSwiper?.(swiper);
			}}
			modules={modules}
			freeMode={isFreeMode}
			loop={loop}
			slidesPerView={slidesPerView}
			spaceBetween={gap}
			autoplay={isAutoplay && {
				delay: Config.SLIDER.AUTOPLAY_DELAY,
				disableOnInteraction: true
			}}
			keyboard={isKeyboard && {
				enabled: true,
				onlyInViewport: true
			}}
			centerInsufficientSlides={centerInsufficientSlides}
			className={combineClasses(s.container, className)}
			style={{
				visibility,
				...style
			}}
			virtual={isVirtual}
			simulateTouch={simulateTouch}
			resistanceRatio={resistanceRatio}
			speed={speed}
			initialSlide={initialSlideIndex}
			data-type={sliderType}
			data-hover-nav={hoverNav}
			data-slider-overlay={"hover"}
			onProgress={swiper => {
				let newReachStart: boolean;
				let newReachEnd: boolean;
				if(isLoop) newReachEnd = newReachStart = items.length === 1;
				else {
					newReachStart = swiper.progress <= 0;
					newReachEnd = swiper.progress >= 1 || getSize(swiper) === getVirtualSize(swiper);
				}
				if(reachStart !== newReachStart) setReachStart(() => newReachStart);
				if(reachEnd !== newReachEnd) setReachEnd(() => newReachEnd);
				if(hoverNav !== "none" && (newReachStart || newReachEnd)) setHoverNav(() => "none");
			}}
			onResize={swiper => {
				if(!isFreeMode || !getSize(swiper) || !getVirtualSize(swiper)) return;
				stepRef.current = getSize(swiper) / (getVirtualSize(swiper) - getSize(swiper));
			}}
			onRealIndexChange={onRealIndexChange}
		>
			{navigationButtons && (
				<SliderNavButtons
					reachStart={reachStart}
					reachEnd={reachEnd}
					setHoverNav={setHoverNav}
					onClickPrev={prevNavButtonHandler}
					onClickNext={nextNavButtonHandler}
				/>
			)}
			{showOverlay && (
				<div className={s.overlay}>
					<div className={s.meta}>
						{meta?.location && <span data-role="loc"><LocationIcon/> {meta.location}</span>}
						{Boolean(meta?.name || meta?.description) && (
							<div data-role="desc">
								{meta?.name && <h6>{meta.name}</h6>}
								{meta?.description && <p>{meta.description}</p>}
							</div>
						)}
					</div>
					{progress && <p className={s.progress}>{progress}</p>}
				</div>
			)}
			{items.map((item, index) => {
				const slideMeta = getSlideMeta?.(item, index);

				const showSliderOverlay: boolean = Boolean(slideMeta?.location || slideMeta?.description);

				return (
					<SwiperSlide
						key={getSlideKey(item, index)}
						virtualIndex={index}
						className={getSlideClassName?.(item, index)}
						onClick={() => {
							const swiper = swiperRef.current;
							if(!swiper) return;
							onClickSlide?.(swiper, item, index);
						}}
					>
						{showSliderOverlay && (
							<div className={s.overlay}>
								<div className={s.meta}>
									{slideMeta?.location && <span data-role="loc"><LocationIcon/> {slideMeta.location}</span>}
									{slideMeta?.description && <span data-role="desc">{slideMeta.description}</span>}
								</div>
							</div>
						)}
						{renderSlide(item, index)}
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}

function getSize(swiper: SwiperClass): number {
	// @ts-ignore
	return swiper.size;
}

function getVirtualSize(swiper: SwiperClass): number {
	// @ts-ignore
	return swiper.virtualSize;
}

export const Slider = memo(Component, function(prevProps, nextProps) {
	return prevProps.style === nextProps.style
		&& prevProps.className === nextProps.className
		&& prevProps.renderSlide === nextProps.renderSlide
		&& prevProps.getSlideClassName === nextProps.getSlideClassName
		&& prevProps.getMeta === nextProps.getMeta
		&& prevProps.getProgress === nextProps.getProgress;
}) as typeof Component;