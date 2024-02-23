import {bindActionCreators} from "redux";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {AppSliceActions} from "@/store/app.slice";

const actions = {
	...AppSliceActions
};

export const useAppActions = () => {
	const dispatch = useDispatch();
	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};