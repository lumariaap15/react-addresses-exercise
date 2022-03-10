export function isNumeric(value) {
	return /^\d+$/.test(value);
}

export function isMaxLength(value, length) {
	return value.length <= length;
}

export function isAlphabetic(value, length) {
	return /^[A-Za-z ]+$/.test(value);
}