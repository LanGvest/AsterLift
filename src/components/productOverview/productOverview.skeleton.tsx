import type {Product} from "@/types/product";
import s from "./productOverview.module.scss";

interface Props {
	product: Product
}

export default function ProductOverviewSkeleton({product}: Props) {
	return (
		<div className={s.skeletonContainer}>
			<div
				style={{
					backgroundImage: `url(${product.overview[0].image.blurDataURL})`
				}}
				className={s.skeletonMainSwiper}
			/>
			<div className={s.skeletonThumbsSwiper}>
				<div className={s.skeletonThumbs}>
					{product.overview.map((image, index) => (
						<div
							key={image.image.src + 1}
							style={{
								backgroundImage: `url(${image.image.blurDataURL})`
							}}
							className={s.skeletonThumb}
							data-active={index === 0 ? "" : undefined}
						/>
					))}
				</div>
			</div>
		</div>
	);
}