import type {IconProps} from "@/types/icon";

export default function CrossIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
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
			<path
				d="M18.53 17.47a.75.75 0 1 1-1.06 1.06L12 13.061 6.53 18.53a.75.75 0 0 1-1.06-1.06L10.939 12 5.47 6.53a.75.75 0 0 1 1.06-1.06L12 10.939l5.47-5.469a.75.75 0 0 1 1.06 1.06L13.061 12z"
			/>
		</svg>
	);
}