import {useCallback, useState} from "react";

export function useForceUpdate(): () => void {
	const state = useState(0);
	return useCallback(() => state[1](prev => prev + 1), [state]);
}