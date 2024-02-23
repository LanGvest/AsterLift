import type {IconProps} from "@/types/icon";

export default function LogoIcon({style, className, size, color, strokeSize, strokeColor}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 392.75 334.79"
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
			<polygon
				name="outer"
				points="45.56 334.79 196.28 77.87 196.16 77.67 196.38 77.71 196.28 77.87 347 334.79 392.75 334.79 392.54 334.74 196.28 0.2 0 334.79 45.56 334.79"
			/>
			<polygon
				name="inner"
				points="168.5 317.96 196.36 270.45 196.31 270.36 196.41 270.38 196.36 270.45 224.23 317.96 291.31 317.96 291.2 317.93 196.58 156.64 101.95 317.96 168.5 317.96"
			/>
		</svg>
	);
}