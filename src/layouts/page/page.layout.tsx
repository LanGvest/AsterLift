import type {ReactNode} from "react";
import s from "./pageMain.module.scss";
import Head from "next/head";
import Config from "@config";

interface Props {
	title: string
	children: ReactNode
}

export function PageLayout({children, title}: Props) {
	return (
		<>
			<Head>
				<title>{`${title} | ${Config.PROJECT_NAME}`}</title>
			</Head>
			<main className={s.container}>
				{children}
			</main>
		</>
	);
}