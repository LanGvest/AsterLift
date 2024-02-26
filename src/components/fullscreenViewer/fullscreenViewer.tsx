import s from "./fullscreenViewer.module.scss";
import type {FullscreenData} from "@/store/app.slice";
import {useAppActions} from "@/hooks/useAppActions";
import React, {useEffect, useState} from "react";
import type {ReactNode} from "react";
import {combineClasses, getDefaultSliderProgress} from "@/utils/helpers";
import type {Nullable} from "@/utils/helpers";
import {Keyboard} from "swiper/modules";
import screenfull from "screenfull";
import CompressIcon from "@/assets/icons/compress.icon";
import ExpandIcon from "@/assets/icons/expand.icon";
import CrossIcon from "@/assets/icons/cross.icon";
import {useAppSelector} from "@/hooks/useAppSelector";
import SliderWithThumbs from "@/ui/slider/sliderWithThumbs";
import Image from "next/image";
import Head from "next/head";

const IMAGE_SIZE: number = 800;
const THUMB_IMAGE_SIZE: number = 100;

interface FullscreenViewProps {
	data: FullscreenData
}

function FullscreenView({data}: FullscreenViewProps) {
	const {closeFullscreen} = useAppActions();
	const [isFullscreenWindow, setIsFullscreenWindow] = useState<boolean>(false);

	useEffect(() => {
		if(!screenfull.isEnabled) return;

		function onChange(): void {
			setIsFullscreenWindow(() => screenfull.isFullscreen);
		}

		screenfull.on("change", onChange);

		return () => {
			screenfull.off("change", onChange);
		};
	}, []);

	// noinspection CssUnusedSymbol
	return (
		<>
			<Head>
				<meta name="theme-color" content="#1a1a1c"/>
			</Head>
			<style jsx global type="text/css">{`
                html, body, #__next {
			    overflow: hidden !important;
                background: #1a1a1c !important;
			  }
			  #__next {
			    scrollbar-gutter: stable;
			  }
			  #__next > :not(#fullscreen) {
                visibility: hidden !important;
			    pointer-events: none !important;
			  }
			  #__next > :not(#fullscreen, header) {
                opacity: 0 !important;
			  }
			`}</style>
			<div
				id="fullscreen"
				className={s.container}
				style={{
					paddingBottom: data.media.length === 1 ? "50px" : undefined
				}}
				data-slider-overlay={"static"}
			>
				<div className={s.header}>
					<div className={s.title}>
						<p>{data.title}</p>
						<span>{data.subTitle}</span>
					</div>
					<div className={s.buttons}>
						{screenfull.isEnabled && (
							<div
								title={isFullscreenWindow ? "Свернуть" : "Развернуть"}
								className={combineClasses(s.fullscreen, s.icon)}
								onClick={() => {
									if(screenfull.isFullscreen) {
										screenfull.exit().then();
									} else {
										try {
											screenfull.request(document.getElementById("fullscreen") || undefined).then();
										} catch(e) {}
									}
								}}
							>
								{isFullscreenWindow ? <CompressIcon/> : <ExpandIcon/>}
							</div>
						)}
						<div
							title={"Завершить просмотр"}
							className={combineClasses(s.cansel, s.icon)}
							onClick={() => {
								if(screenfull.isEnabled && screenfull.isFullscreen) screenfull.exit().then();
								closeFullscreen();
							}}
						>
							<CrossIcon/>
						</div>
					</div>
				</div>
				<SliderWithThumbs
					className={s.slider}
					mainGap={20}
					thumbsGap={12}
					initialSlideIndex={data.initialSlide}
					hideControlsWhenSingleItem={true}
					items={data.media}
					keyboardModule={Keyboard}
					getSlideKey={item => item.image.src}
					getMeta={activeItem => ({
						name: activeItem.name,
						description: activeItem.description,
						location: activeItem.location
					})}
					getProgress={getDefaultSliderProgress}
					controller={data.controller}
					renderMainSlide={item => (
						<Image
							src={item.image}
							width={IMAGE_SIZE}
							height={IMAGE_SIZE * (12 / 10)}
							priority
							alt={item.image.src}
						/>
					)}
					renderThumbSlide={item => (
						<Image
							src={item.image}
							alt={item.image.src}
							width={THUMB_IMAGE_SIZE}
							height={THUMB_IMAGE_SIZE}
							placeholder="blur"
						/>
					)}
				/>
			</div>
		</>
	);
}

export function FullscreenViewer(): Nullable<ReactNode> {
	const fullscreen = useAppSelector(state => state.app.fullscreen);

	return fullscreen ? <FullscreenView data={fullscreen}/> : null;
}