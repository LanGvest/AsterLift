import {useCallback, useState} from "react";

export function useForceUpdate(): () => void {
	const setState = useState(0)[1];
	return useCallback(() => setState(prev => prev + 1), [setState]);
}