import React from "react";

export function GlobalInlineStyle() {
	return (
		<style jsx global>{`
            [data-hidden-jsx] {
                pointer-events: none;
                z-index: -99;
                top: -9000px;
                left: -9000px;
                width: 0;
                height: 0;
                opacity: 0;
                position: absolute;
            }
		`}</style>
	);
}