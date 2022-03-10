import AddressInput from "../components/AddressInput";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyAddress } from "../store/addressesSlice";
import { changePageState } from "../store/pagesSlice";

function PropertyAddress() {
	const dispatch = useDispatch();
	const initialValues = useSelector(
		(state) => state.addresses.propertyAddress
	);

	const setAddress = (val) => {
		dispatch(setPropertyAddress(val));
	};

	const formHasErrors = (val) => {
		dispatch(changePageState({ page: 1, invalid: val }));
	};

	return (
		<div>
			<Typography variant="h4">Property Address</Typography>
			<AddressInput setAddress={setAddress} formHasErrors={formHasErrors} initialValues={initialValues} />
		</div>
	);
}

export default PropertyAddress;
