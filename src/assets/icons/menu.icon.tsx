import type {IconProps} from "@/types/icon";

export default function MenuIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
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
				d="M29 8H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4zM29 28H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4zM29 18H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4z"
			/>
		</svg>
	);
}