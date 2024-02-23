import type {IconProps} from "@/types/icon";

export default function LocationIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 28 28"
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
				d="M14 1.999c-4.87 0-8.82 3.95-8.82 8.82 0 3.48 4.5 10.52 7.07 14.26.85 1.23 2.66 1.23 3.5 0 2.57-3.74 7.07-10.78 7.07-14.26 0-4.87-3.95-8.82-8.82-8.82zm0 12.95a4.136 4.136 0 0 1-4.14-4.13A4.144 4.144 0 0 1 14 6.678a4.136 4.136 0 0 1 4.13 4.14 4.128 4.128 0 0 1-4.13 4.13z"
			/>
		</svg>
	);
}