import type {IconProps} from "@/types/icon";

/**
 * @see https://www.flaticon.com/free-icon/right-arrow_8066407
 */
export default function ArrowIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
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
				d="M9 19.75a.75.75 0 0 1-.53-1.28L14.939 12 8.47 5.53a.75.75 0 0 1 1.06-1.06l7 7a.749.749 0 0 1 0 1.06l-7 7a.744.744 0 0 1-.53.22z"
			/>
		</svg>
	);
}