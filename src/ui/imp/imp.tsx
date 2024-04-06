import s from "./imp.module.scss";
import type {ComponentProps} from "react";

export function Imp(props: ComponentProps<"b">) {
	return (
		<span className={s.content}><b {...props}/></span>
	);
}