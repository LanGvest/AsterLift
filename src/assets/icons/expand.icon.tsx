import type {IconProps} from "@/types/icon";

export default function ExpandIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
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
				d="M21 8.75a.75.75 0 0 1-.75-.75V4.5c0-.589-.161-.75-.75-.75H16a.75.75 0 0 1 0-1.5h3.5a2.067 2.067 0 0 1 2.25 2.25V8a.75.75 0 0 1-.75.75zM3.75 8V4.5c0-.589.161-.75.75-.75H8a.75.75 0 0 0 0-1.5H4.5A2.067 2.067 0 0 0 2.25 4.5V8a.75.75 0 0 0 1.5 0zm5 13a.75.75 0 0 0-.75-.75H4.5c-.589 0-.75-.161-.75-.75V16a.75.75 0 0 0-1.5 0v3.5a2.067 2.067 0 0 0 2.25 2.25H8a.75.75 0 0 0 .75-.75zm13-1.5V16a.75.75 0 0 0-1.5 0v3.5c0 .589-.161.75-.75.75H16a.75.75 0 0 0 0 1.5h3.5a2.067 2.067 0 0 0 2.25-2.25z"
			/>
		</svg>
	);
}