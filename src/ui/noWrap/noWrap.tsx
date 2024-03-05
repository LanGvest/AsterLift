import s from "./noWrap.module.scss";
import type {ComponentProps} from "react";
import {combineClasses} from "@/utils/helpers";

export function NoWrap({className, ...props}: ComponentProps<"span">) {
	return (
		<span className={combineClasses(s.content, className)} {...props}/>
	);
}