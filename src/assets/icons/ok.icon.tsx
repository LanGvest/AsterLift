import type {IconProps} from "@/types/icon";

export default function OkIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 45 45"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			style={{
				width: size,
				height: size,
				fill: color,
				strokeWidth: strokeSize,
				stroke: strokeColor,
				...style
			}}
		>
			<polyline
				points="5.5 23 16.5 34 39.5 11"
			/>
		</svg>
	);
}