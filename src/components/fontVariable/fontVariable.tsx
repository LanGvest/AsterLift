import type {NextFont} from "next/dist/compiled/@next/font";

interface Props {
	name: string
	font: NextFont
}

export function FontVariable({name, font}: Props): JSX.Element {
	return (
		<style global jsx>{`
			:root {
			  --font-${name}: ${font.style.fontFamily};
			}
		`}</style>
	);
}