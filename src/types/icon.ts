import type {Stylized} from "@/utils/helpers";
import type {CSSProperties} from "react";

export interface IconProps extends Stylized {
	size?: CSSProperties["width"] | number
	color?: CSSProperties["fill"]
	strokeSize?: CSSProperties["strokeWidth"] | number
	strokeColor?: CSSProperties["stroke"]
}