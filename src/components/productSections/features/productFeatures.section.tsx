import type {ProductFeature, ProductSectionProps} from "@/types/product";
import {memo} from "react";
import Image from "next/image";
import s from "./productFeatures.module.scss";
import LogoIcon from "@/assets/icons/logo.icon";
import type {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import type {FullscreenProduct} from "@/store/app.slice";
import {FULLSCREEN_HINT} from "@/utils/helpers";

const IMAGE_SIZE: number = 220;

interface Props extends ProductSectionProps {
	features: Array<ProductFeature>
	openFullscreenFeatures: ActionCreatorWithPayload<FullscreenProduct>
}

function Section({product, features, openFullscreenFeatures}: Props) {
	return (
		<div className={s.container}>
			{features.map((feature, index) => (
				<div key={feature.id} className={s.card}>
					<div
						className={s.imageContainer}
						onClick={() => {
							openFullscreenFeatures({
								product,
								initialSlide: index
							});
						}}
						title={FULLSCREEN_HINT}
					>
						<Image
							className={s.image}
							src={feature.image}
							alt={feature.name}
							title={feature.name}
							width={IMAGE_SIZE}
							height={IMAGE_SIZE * (12 / 10)}
							loading="lazy"
							fetchPriority="low"
							placeholder="blur"
						/>
					</div>
					<div>
						<p className={s.name}>{feature.name}</p>
						<p className={s.description}>{feature.description}</p>
					</div>
					<LogoIcon className={s.logo}/>
				</div>
			))}
		</div>
	);
}

export const ProductFeaturesSection = memo(Section);