import s from "./productSections.module.scss";
import {memo} from "react";
import type {Product, ProductSection} from "@/types/product";
import LinkIcon from "@/assets/icons/link.icon";
import Link from "next/link";

interface Props {
    product: Product
    sections: Array<ProductSection>
}

function Component({product, sections}: Props) {
	// const [isCopied, setIsCopied] = useState(false);

	return (
		<div className={s.content}>
			{sections.map((nav, index) => (
				<div key={nav.id} id={nav.id} className={s.container}>
					<div
						data-section={nav.id}
						data-prev-section={index > 0 ? sections[index-1].id : undefined}
						className={s.divider}
					/>
					<div className={s.section}>
						<div className={s.nameContainer}>
							<Link
								href={"#" + nav.id}
								className={s.name}
								onClick={() => {
									(async () => {
										if(!navigator.clipboard || !navigator.clipboard.writeText) return;
										const url = new URL(location.href);
										url.hash = nav.id;
										await navigator.clipboard.writeText(url.href);
										// setIsCopied(true);
									})();
								}}
								// onMouseLeave={() => {
								// 	setIsCopied(false);
								// }}
								// title={isCopied ? "Ссылка скопирована!" : "Нажмите, чтобы скопировать ссылку"}
								title={"Нажмите, чтобы скопировать ссылку"}
							>
								<h2>{nav.name}</h2>
								<div className={s.link}>
									<LinkIcon/>
								</div>
							</Link>
						</div>
						<hr/>
						<nav.Component product={product}/>
					</div>
				</div>
			))}
		</div>
	);
}

export const ProductSectionsContent = memo(Component);