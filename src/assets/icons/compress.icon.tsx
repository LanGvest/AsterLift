import type {IconProps} from "@/types/icon";

export default function CompressIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
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
				d="M21 8.75h-3.5a2.067 2.067 0 0 1-2.25-2.25V3a.75.75 0 0 1 1.5 0v3.5c0 .589.161.75.75.75H21a.75.75 0 0 1 0 1.5zM8.75 6.5V3a.75.75 0 0 0-1.5 0v3.5c0 .589-.161.75-.75.75H3a.75.75 0 0 0 0 1.5h3.5A2.067 2.067 0 0 0 8.75 6.5zm0 14.5v-3.5a2.067 2.067 0 0 0-2.25-2.25H3a.75.75 0 0 0 0 1.5h3.5c.589 0 .75.161.75.75V21a.75.75 0 0 0 1.5 0zm8 0v-3.5c0-.589.161-.75.75-.75H21a.75.75 0 0 0 0-1.5h-3.5a2.067 2.067 0 0 0-2.25 2.25V21a.75.75 0 0 0 1.5 0z"
			/>
		</svg>
	);
}