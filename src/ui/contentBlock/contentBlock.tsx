import s from "./contentBlock.module.scss";
import type {ComponentProps} from "react";
import {combineClasses} from "@/utils/helpers";

export function ContentBlock({className, ...props}: ComponentProps<"div">) {
	return (
		<div className={combineClasses(s.content, className)} {...props}/>
	);
}