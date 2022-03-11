import { createSlice } from "@reduxjs/toolkit";
import { pageNumbers } from "../helpers/Constants";

const initialState = {
	activePage: pageNumbers.residential,
	nextDisabled: true,
    residentialPageInvalid: false,
    propertyPageInvalid: false,
    employmentPageInvalid: false,
};

export const pagesSlice = createSlice({
	name: "addresses",
	initialState,
	reducers: {
		setActivePage: (state, action) => {
			state.activePage = action.payload;
		},
		next: (state) => {
			state.activePage += 1;
		},
		previous: (state) => {
			state.activePage -= 1;
		},
		changePageState: (state, {payload}) => {
			if(payload.page === pageNumbers.residential){
                state.residentialPageInvalid = payload.invalid;
            } else if(payload.page === pageNumbers.property){
                state.propertyPageInvalid = payload.invalid;
            }else{
                state.employmentPageInvalid = payload.invalid;
            }
            state.nextDisabled = payload.invalid;
		},
	},
});

export const { setActivePage, next, previous, changePageState } = pagesSlice.actions;

export default pagesSlice.reducer;
