import React from "react";
import bg from "@/assets/images/bg.webp";

export function GradientBackground() {
	return (
		<style jsx global>{`
			body {
				background-image: url(${bg.src});
				background-repeat: no-repeat;
				background-size: 73%;
			}

			@media (width < 900px) {
				body {
					background-position-x: -100px;
					background-size: 190%;
				}
			}
		`}</style>
	);
}