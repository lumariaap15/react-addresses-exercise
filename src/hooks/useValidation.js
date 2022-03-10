import { useState, useEffect, useRef } from "react";
import {
	isNumeric,
	isMaxLength,
	isAlphabetic,
} from "../helpers/CustomValidations";

const useValidation = (value, rules) => {
	const [hasError, setHasError] = useState(false);
	const [error, setError] = useState("");
	const isInitialMount = useRef(true);

	const rulesMap = {
		required: {
			isValid(value) {
				return value.length > 0;
			},
			message: "Please enter a value",
		},
		numeric: {
			isValid(value) {
				return isNumeric(value);
			},
			message: "Please enter a numeric value",
		},
		maxLengthCode: {
			isValid(value) {
				return isMaxLength(value, 3);
			},
			message: "Please enter no more than 3 digits",
		},
		maxLengthStreet: {
			isValid(value) {
				return isMaxLength(value, 100);
			},
			message: "Please enter no more than 100 characters",
		},
		isAlphabetic: {
			isValid(value) {
				return isAlphabetic(value);
			},
			message: "Please enter only alphabetic characters",
		},
	};

	const validate = () => {
		for (let rule of rules) {
			if (!rulesMap[rule].isValid(value)) {
				return rulesMap[rule].message;
			}
		}
		return false;
	};

	useEffect(() => {
		if (!isInitialMount.current) {
			let validationResult = validate();
			if (validationResult) {
				setError(validationResult);
				setHasError(true);
			} else {
				setError("");
				setHasError(false);
			}
		} else {
			isInitialMount.current = false;
		}
	}, [value]);

	return [{ error, hasError, value }];
};

export default useValidation;
