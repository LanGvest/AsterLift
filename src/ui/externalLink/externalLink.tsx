import type {ComponentProps} from "react";
import Link from "next/link";
import s from "./externalLink.module.scss";
import {combineClasses} from "@/utils/helpers";
import ExternalLinkIcon from "@/assets/icons/externalLink.icon";

interface Props extends ComponentProps<typeof Link> {
	withIcon?: boolean
	primary?: boolean
}

export function ExternalLink({withIcon = true, primary = false, target = "_blank", className, children, ...props}: Props) {
	return (
		<Link className={combineClasses(s.content, className)} target={target} {...props}>
			{children}
			<ExternalLinkIcon/>
		</Link>
	);
}