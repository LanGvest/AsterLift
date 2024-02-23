import {configureStore} from "@reduxjs/toolkit";
import {AppSliceReducer} from "@/store/app.slice";

export const Store = configureStore({
	reducer: {
		app: AppSliceReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: false
	})
});

export type RootState = ReturnType<typeof Store.getState>;