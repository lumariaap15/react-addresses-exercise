import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activePage: 2,
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
			if(payload.page === 0){
                state.residentialPageInvalid = payload.invalid;
            } else if(payload.page === 1){
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
