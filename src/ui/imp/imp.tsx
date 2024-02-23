import s from "./imp.module.scss";
import type {ComponentProps} from "react";

export function Imp(props: ComponentProps<"strong">) {
	return (
		<span className={s.content}><strong {...props}/></span>
	);
}