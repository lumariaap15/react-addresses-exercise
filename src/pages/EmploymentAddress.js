import React, { useState, useEffect } from "react";
import AddressInput from "../components/AddressInput";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
	setEmploymentAddress,
	setPreviousEmploymentAddress,
} from "../store/addressesSlice";
import { changePageState } from "../store/pagesSlice";
import TextField from "@mui/material/TextField";
import { pageNumbers } from "../helpers/Constants";

function EmploymentAddress() {
	const initialPreviousEmploymentsValues = useSelector(
		(state) => state.addresses.previousEmploymentAddress
	);

	//number of prev employments
	const [previousEmployments, setPreviousEmployments] = useState(
		initialPreviousEmploymentsValues.length
	);
	//array with integers (indexes)
	const [previousEmploymentsArr, setPreviousEmploymentsArr] = useState([]);
	//array with booleans indicating which forms have errors
	const [previousEmploymentsErrors, setPreviousEmploymentsErrors] = useState(
		[]
	);
	const [currentEmploymentError, setCurrentEmploymentError] = useState(true);
	const dispatch = useDispatch();
	const initialValues = useSelector(
		(state) => state.addresses.employmentAddress
	);

	const setAddress = (val) => {
		dispatch(setEmploymentAddress(val));
	};

	const setPreviousEmploymentsAddress = (val, idx) => {
		dispatch(setPreviousEmploymentAddress({ val, idx }));
	};

	const handlePreviousEmployments = (e) => {
		setPreviousEmployments(e.target.value);
	};

	const formHasErrors = (val) => {
		setCurrentEmploymentError(val);
	};

	const formPreviousHasErrors = (val, idx) => {
		let arr = [...previousEmploymentsErrors];
		arr[idx] = val;
		setPreviousEmploymentsErrors(arr);
	};

	useEffect(() => {
		let hasError = false;
		previousEmploymentsErrors.forEach((val) => {
			if (val) {
				hasError = true;
			}
		});
		if (currentEmploymentError) {
			hasError = true;
		}
		dispatch(changePageState({ page: pageNumbers.employment, invalid: hasError }));
	}, [currentEmploymentError, previousEmploymentsErrors]);

	useEffect(() => {
		var arr = [];
		for (var i = 0; i < previousEmployments; i++) {
			arr.push(i);
			if (!initialPreviousEmploymentsValues[i]) {
				setPreviousEmploymentsAddress(
					{
						streetNumber: "",
						streetName: "",
						city: "",
						province: "",
						code: "",
					},
					i
				);
			}
		}
		setPreviousEmploymentsArr(arr);
	}, [previousEmployments]);

	return (
		<div>
			<Typography variant="h4">Current Employment</Typography>
			<AddressInput
				setAddress={setAddress}
				formHasErrors={formHasErrors}
				initialValues={initialValues}
			/>
			<Typography sx={{ mt: 3 }} variant="h4">
				Previous Employments
			</Typography>
			<TextField
				label="Previous employments"
				variant="filled"
				value={previousEmployments}
				onChange={handlePreviousEmployments}
				type="number"
			/>
			{previousEmploymentsArr.map((value) => (
				<React.Fragment key={value}>
					<Typography sx={{ mt: 3, pl: 1 }} variant="h6">
						Employment {value + 1}
					</Typography>
					<AddressInput
						setAddress={(e) => {
							setPreviousEmploymentsAddress(e, value);
						}}
						formHasErrors={(e) => {
							formPreviousHasErrors(e, value);
						}}
						initialValues={initialPreviousEmploymentsValues[value]}
					/>
				</React.Fragment>
			))}
		</div>
	);
}

export default EmploymentAddress;
