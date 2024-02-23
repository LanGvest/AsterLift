import type {SetStateRef, StateRef} from "@/utils/helpers";
import {useCallback, useRef, useState} from "react";

export default function useStateRef<T>(initialState: T | (() => T)): [StateRef<T>, SetStateRef<T>] {
	const [state, _setState] = useState<T>(initialState);
	const stateRef: StateRef<T> = useRef<T>(state);

	const setState: SetStateRef<T> = useCallback(value => {
		stateRef.current = value(stateRef.current);
		_setState(value);
	}, []);

	return [stateRef, setState];
}