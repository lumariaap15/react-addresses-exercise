import { configureStore } from "@reduxjs/toolkit";
import addressesReducer from "./addressesSlice";
import pagesReducer from "./pagesSlice";

export const store = configureStore({
	reducer: {
        addresses: addressesReducer,
        pages: pagesReducer,
    },
});
