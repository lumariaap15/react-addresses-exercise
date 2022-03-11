import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	residentialAddress: {
		streetNumber: "",
		streetName: "",
		city: "",
		province: "",
		code: "",
	},
	propertyAddress: {
		streetNumber: "",
		streetName: "",
		city: "",
		province: "",
		code: "",
	},
	employmentAddress: {
		streetNumber: "",
		streetName: "",
		city: "",
		province: "",
		code: "",
		employmentName: "",
		employmentType: "",
	},
	previousEmploymentAddress: [],
};

export const addressesSlice = createSlice({
	name: "addresses",
	initialState,
	reducers: {
		setResidentialAddress: (state, action) => {
			state.residentialAddress = action.payload;
		},
		setPropertyAddress: (state, action) => {
			state.propertyAddress = action.payload;
		},
		setEmploymentAddress: (state, action) => {
			state.employmentAddress = action.payload;
		},
		setPreviousEmploymentAddress: (state, action) => {
			state.previousEmploymentAddress[action.payload.idx] = action.payload.val; 
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setResidentialAddress,
	setPropertyAddress,
	setEmploymentAddress,
	setPreviousEmploymentAddress,
} = addressesSlice.actions;

export default addressesSlice.reducer;
