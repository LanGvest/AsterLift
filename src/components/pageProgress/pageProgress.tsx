import s from "./pageProgress.module.scss";
import {memo, useCallback, useEffect, useRef, useState} from "react";
import Router from "next/router";
import type {Nullable} from "@/utils/helpers";

const SPEED_INDEX: number = 650;
const DELAY: number = 60;
const PROGRESS_INCREMENT_TIME: number = 650;

function PageProgress() {
	const transition1: string = `transform ${SPEED_INDEX}ms ease, opacity 300ms`;
	const transition2: string = "none";

	const [progress, setProgress] = useState<number>(() => 0);
	const [opacity, setOpacity] = useState<number>(() => 1);
	const [transition, setTransition] = useState<string>(() => transition1);

	const isRunningRef = useRef<boolean>(false);

	const incTimeoutRef = useRef<Nullable<NodeJS.Timeout>>(null);
	const resetTimeoutRef = useRef<Nullable<NodeJS.Timeout>>(null);
	const canEndRef = useRef(true);

	const incProgress = useCallback(() => {
		incTimeoutRef.current = setTimeout(() => {
			setProgress(prevState => {
				if(prevState < 95) {
					incProgress();
					return prevState + 5;
				} else {
					if(incTimeoutRef.current) clearTimeout(incTimeoutRef.current);
					incTimeoutRef.current = null;
					return prevState;
				}
			});
		}, PROGRESS_INCREMENT_TIME);
	}, []);

	const start = useCallback(() => {
		if(!isRunningRef.current) {
			isRunningRef.current = true;
			if(resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = null;
			setOpacity(() => 1);
			setTransition(() => transition1);
			setProgress(() => 10);
			if(!incTimeoutRef.current) incProgress();
		}
	}, [incProgress, transition1]);

	const end = useCallback(() => {
		if(canEndRef.current && isRunningRef.current) {
			canEndRef.current = false;
			if(incTimeoutRef.current) clearTimeout(incTimeoutRef.current);
			incTimeoutRef.current = null;
			setProgress(() => 100);
			resetTimeoutRef.current = setTimeout(() => {
				setOpacity(() => 0);
				resetTimeoutRef.current = setTimeout(() => {
					setTransition(() => transition2);
					setOpacity(() => 1);
					setProgress(() => 0);
					isRunningRef.current = false;
					canEndRef.current = true;
				}, 300);
			}, SPEED_INDEX);
		}
	}, []);

	useEffect(() => {
		let waitTimeout: NodeJS.Timeout | null;
		
		Router.events.on("routeChangeStart", () => {
			waitTimeout = setTimeout(() => {
				start();
				if(waitTimeout) clearTimeout(waitTimeout);
				waitTimeout = null;
			}, DELAY);
		});
		
		Router.events.on("routeChangeComplete", () => {
			if(waitTimeout) {
				clearTimeout(waitTimeout);
				waitTimeout = null;
			}
			end();
		});
		
		Router.events.on("routeChangeError", () => {
			if(waitTimeout) {
				clearTimeout(waitTimeout);
				waitTimeout = null;
			}
			end();
		});
	}, [end, start]);

	return (
		<div className={s.pageProgress}>
			<div style={{opacity, transform: `translateX(${progress - 100}%)`, transition}} className={s.bar}/>
		</div>
	);
}

export default memo(PageProgress, () => true);