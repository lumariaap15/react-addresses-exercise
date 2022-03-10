import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { CanadaProvinces } from "../helpers/CanadaProvinces";
import useValidation from "../hooks/useValidation";

export default function AddressInput() {
	const [formIsValid, setFormIsValid] = useState(false);
	const [formValues, setFormValues] = useState({
		streetNumber: "",
		streetName: "",
		city: "",
		province: "",
		code: "",
	});
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

	const formValuesInvalid = () => {
		for (let val in formValues) {
			if (val.length === 0) {
				return true;
			}
		}

		return false;
	};

	useEffect(() => {
		if (
			streetNumValidation.hasError ||
			streetNameValidation.hasError ||
			provinceValidation.hasError ||
			codeValidation.hasError ||
			formValuesInvalid()
		) {
			setFormIsValid(false);
		} else {
			setFormIsValid(true);
		}
	}, [
		formValues,
		streetNumValidation,
		streetNameValidation,
		cityValidation,
		provinceValidation,
		codeValidation
	]);

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
            {formIsValid ? "valid" : "invalid"}
				<TextField
					id="filled-error"
					label="Street Number"
					variant="filled"
					value={formValues.streetNumber}
					onChange={(e) => {
						handleFormChange(e, "streetNumber");
					}}
					error={streetNumValidation.hasError}
					helperText={streetNumValidation.error}
					type="number"
				/>
				<TextField
					id="filled-error"
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
					id="filled-error"
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
					{CanadaProvinces.map((option) => (
						<MenuItem key={option.abbreviation} value={option.name}>
							{option.name}
						</MenuItem>
					))}
				</TextField>
				<TextField
					value={formValues.code}
					onChange={(e) => {
						handleFormChange(e, "code");
					}}
					id="filled-error"
					label="Code"
					variant="filled"
					error={codeValidation.hasError}
					helperText={codeValidation.error}
				/>
			</div>
		</Box>
	);
}
