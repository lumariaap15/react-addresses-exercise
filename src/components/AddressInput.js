import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { CanadaProvinces } from "../helpers/CanadaProvinces";
import useValidation from "../hooks/useValidation";
import { useSelector } from "react-redux";
import { pageNumbers } from "../helpers/Constants";

export default function AddressInput({ setAddress, formHasErrors, initialValues }) {

	const [formValues, setFormValues] = useState(initialValues);
	const page = useSelector(state => state.pages.activePage);
	const [streetNumValidation] = useValidation(formValues.streetNumber, [
		"required",
		"numeric",
		"maxLengthCode",
	]);
	const [streetNameValidation] = useValidation(formValues.streetName, [
		"required",
		"maxLengthStreet",
		"isAlphabetic",
	]);
	const [cityValidation] = useValidation(formValues.city, [
		"required",
		"maxLengthStreet",
		"isAlphabetic",
	]);
	const [provinceValidation] = useValidation(formValues.province, ["required"]);
	const [codeValidation] = useValidation(formValues.code, [
		"required",
		"numeric",
		"maxLengthCode",
	]);

	const formValuesEmpty = () => {
		for (let val in formValues) {
			if (formValues[val].length === 0) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
        let formEmptyFields = formValuesEmpty();
		if (
			streetNumValidation.hasError ||
			streetNameValidation.hasError ||
			provinceValidation.hasError ||
			codeValidation.hasError ||
			formEmptyFields
		) {
			formHasErrors(true);
		} else {
			formHasErrors(false);
		}
        setAddress(formValues);
	}, [formValues]);

	const handleFormChange = (event, key) => {
		let val = event.target.value;
		setFormValues((prevState) => ({
			...prevState,
			[key]: val,
		}));
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				{page === pageNumbers.employment ? (
					<React.Fragment>
						<TextField
							id="filled-error"
							label="Employment Name"
							variant="filled"
							value={formValues.employmentName}
							onChange={(e) => {
								handleFormChange(e, "employmentName");
							}}
						/>
						<TextField
							id="filled-error"
							label="Employment Type"
							select
							variant="filled"
							value={formValues.employmentType}
							onChange={(e) => {
								handleFormChange(e, "employmentType");
							}}
						>
							{["Employed", "Retired", "Student"].map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</React.Fragment>
				) : null}
				<TextField
					label="Street Number"
					variant="filled"
					value={formValues.streetNumber}
					onChange={(e) => {
						handleFormChange(e, "streetNumber");
					}}
					error={streetNumValidation.hasError}
					helperText={streetNumValidation.error}
				/>
				<TextField
					label="Street Name"
					variant="filled"
					value={formValues.streetName}
					onChange={(e) => {
						handleFormChange(e, "streetName");
					}}
					error={streetNameValidation.hasError}
					helperText={streetNameValidation.error}
				/>
				<TextField
					value={formValues.city}
					onChange={(e) => {
						handleFormChange(e, "city");
					}}
					label="City"
					variant="filled"
					error={cityValidation.hasError}
					helperText={cityValidation.error}
				/>
				<TextField
					id="filled-select-currency"
					select
					label="Province"
					value={formValues.province}
					onChange={(e) => {
						handleFormChange(e, "province");
					}}
					variant="filled"
					error={provinceValidation.hasError}
					helperText={provinceValidation.error}
				>
					{CanadaProvinces.map((option) => {
						if (page === pageNumbers.property && option.name === "Quebec") {
							return "";
						}
						return (
							<MenuItem key={option.abbreviation} value={option.name}>
								{option.name}
							</MenuItem>
						);
					})}
				</TextField>
				<TextField
					value={formValues.code}
					onChange={(e) => {
						handleFormChange(e, "code");
					}}
					label="Code"
					variant="filled"
					error={codeValidation.hasError}
					helperText={codeValidation.error}
				/>
			</div>
		</Box>
	);
}
