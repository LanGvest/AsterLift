import PageLayout from "@/layouts/page";
import GradientBackground from "@/components/gradientBackground";
import React from "react";

export default function AboutPage() {
	return (
		<PageLayout title="О предприятии">
			<GradientBackground/>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<div
				style={{
					width: 500,
					height: 500
				}}
				dangerouslySetInnerHTML={{
					__html: `
							<script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.54/build/spline-viewer.js"></script>
							<spline-viewer url="https://prod.spline.design/TIzmdWxfkIhYg9Gs/scene.splinecode"></spline-viewer>
						`
				}}
			/>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
		</PageLayout>
	);
}