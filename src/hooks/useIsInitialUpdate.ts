import {useRef} from "react";

export function useIsInitialUpdate(): boolean {
	const updateCountRef = useRef(0);
	updateCountRef.current++;
	return updateCountRef.current === 1;
}