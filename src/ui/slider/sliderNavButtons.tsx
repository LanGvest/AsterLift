import type {SetState} from "@/utils/helpers";
import {memo} from "react";
import type {MouseEvent} from "react";
import ArrowIcon from "@/assets/icons/arrow.icon";
import type {SliderHoverNav} from "@/types/slider";

interface SliderNavButtonsProps {
	setHoverNav: SetState<SliderHoverNav>
	onClickPrev: (event: MouseEvent<HTMLDivElement>) => void
	onClickNext: (event: MouseEvent<HTMLDivElement>) => void
	reachStart?: boolean
	reachEnd?: boolean
}

function SliderNavButtons({setHoverNav, onClickPrev, onClickNext, reachStart = false, reachEnd = false}: SliderNavButtonsProps) {
	return (
		<>
			<div
				className="swiper-nav-button"
				data-dir="prev"
				data-reach-start={reachStart ? "" : undefined}
				onClick={onClickPrev}
				onMouseEnter={() => {
					setHoverNav(() => "prev");
				}}
				onMouseLeave={() => {
					setHoverNav(() => "none");
				}}
			>
				<ArrowIcon/>
			</div>
			<div
				className="swiper-nav-button"
				data-dir="next"
				data-reach-end={reachEnd ? "" : undefined}
				onClick={onClickNext}
				onMouseEnter={() => {
					setHoverNav(() => "next");
				}}
				onMouseLeave={() => {
					setHoverNav(() => "none");
				}}
			>
				<ArrowIcon/>
			</div>
		</>
	);
}

export default memo(SliderNavButtons, function(prevProps, nextProps) {
	return prevProps.reachStart === nextProps.reachStart
		&& prevProps.reachEnd === nextProps.reachEnd;
});