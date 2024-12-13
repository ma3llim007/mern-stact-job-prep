import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { loggerMiddleware } from "./middleware/getData";
import dataReducer from "./slices/dataSlice";
import { apiSlice } from "./slices/apiSlice";

export const Store = configureStore({
    reducer: {
        counter: counterReducer,
        data: dataReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware).concat(apiSlice.middleware),
});
