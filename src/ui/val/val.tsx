import s from "./val.module.scss";
import {useEffect, useRef} from "react";
import type {ComponentProps} from "react";
import {combineClasses} from "@/utils/helpers";

interface Props extends ComponentProps<"span"> {
	darken?: boolean
}

export function Val({darken, className, children, ...props}: Props) {
	const spanRef = useRef<HTMLSpanElement>(null);
	const childSpanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const parentSpan = spanRef.current!;
		const span = childSpanRef.current!;

		onResize();

		function onResize() {
			parentSpan.style.width = "auto";
			const size = span.offsetWidth;
			parentSpan.style.width = size + 14 + "px";
		}

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<span
			ref={spanRef}
			className={combineClasses(s.content, darken && s.darken, className)}
			{...props}
		>
			<span ref={childSpanRef}>{children}</span>
		</span>
	);
}