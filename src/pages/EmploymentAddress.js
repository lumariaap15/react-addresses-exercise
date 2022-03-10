import React, { useState, useEffect } from "react";
import AddressInput from "../components/AddressInput";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setEmploymentAddress } from "../store/addressesSlice";
import { changePageState } from "../store/pagesSlice";
import TextField from "@mui/material/TextField";

function EmploymentAddress() {
	const [previousEmployments, setPreviousEmployments] = useState(0);
	const [previousEmploymentsArr, setPreviousEmploymentsArr] = useState([]);
	const dispatch = useDispatch();
	const initialValues = useSelector(
		(state) => state.addresses.employmentAddress
	);

	const setAddress = (val) => {
		dispatch(setEmploymentAddress(val));
	};

	const handlePreviousEmployments = (e) => {
		console.log(e.target.value);
		setPreviousEmployments(e.target.value);
	};

	const formHasErrors = (val) => {
		dispatch(changePageState({ page: 2, invalid: val }));
	};

	useEffect(() => {
		var arr = [];
		for (var i = 0; i < previousEmployments; i++) {
			arr.push(i);
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
				<React.Fragment>
					<Typography sx={{ mt: 3, pl: 1 }} variant="h6">
						Employment {value + 1}
					</Typography>
					<AddressInput
						setAddress={setAddress}
						formHasErrors={formHasErrors}
						initialValues={initialValues}
					/>
				</React.Fragment>
			))}
		</div>
	);
}

export default EmploymentAddress;
