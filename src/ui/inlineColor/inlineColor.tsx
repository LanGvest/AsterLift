import s from "./inlineColor.module.scss";
import type {ComponentProps, CSSProperties} from "react";
import {combineClasses} from "@/utils/helpers";

interface Props extends ComponentProps<"span"> {
	inlineColor: CSSProperties["backgroundColor"]
}

export function InlineColor({inlineColor, children, className, ...props}: Props) {
	return (
		<span className={combineClasses(s.content, className)} {...props}><span className={s.color} style={{
			backgroundColor: inlineColor
		}}/>{children}</span>
	);
}