import s from "./note.module.scss";
import {memo} from "react";
import type {ReactElement, ReactNode} from "react";
import {combineClasses} from "@/utils/helpers";
import type {Stylized} from "@/utils/helpers";
import Config from "@config";

interface Props extends Stylized {
	icon?: ReactElement
	withPhone?: boolean
	label?: string
	children: ReactNode
}

function Component({icon, withPhone, label, children, className, style}: Props) {
	return (
		<div className={combineClasses(s.container, className)} style={style}>
			{icon}
			<div>
				{label && <h6 className={s.label}>{label}</h6>}
				{typeof children === "string" ? (
					<p>{children}</p>
				): children}
				{withPhone && <p className={s.phone}>{Config.CONTACTS.PHONE_NUMBER}</p>}
			</div>
		</div>
	);
}

export const Note = memo(Component, (prevProps, nextProps) => prevProps.className === nextProps.className && prevProps.style === nextProps.style);