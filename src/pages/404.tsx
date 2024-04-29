import PageLayout from "../layouts/page";
import Link from "next/link";
import ContentBlock from "@/ui/contentBlock";
import s from "@/styles/404.module.scss";
import GradientBackground from "@/components/gradientBackground";

// noinspection JSUnusedGlobalSymbols
export default function NotFoundPage() {
	return (
		<PageLayout title="Страница не найдена">
			<GradientBackground/>
			<ContentBlock className={s.container}>
				<h1>404</h1>
				<p>Запрашиваемая страница не найдена</p>
				<Link
					href="/"
					data-role="btn"
				>
					<p>На главную</p>
				</Link>
			</ContentBlock>
		</PageLayout>
	);
}