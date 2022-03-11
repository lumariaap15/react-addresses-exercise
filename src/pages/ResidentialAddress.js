import AddressInput from "../components/AddressInput";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setResidentialAddress } from "../store/addressesSlice";
import { changePageState } from "../store/pagesSlice";
import { pageNumbers } from "../helpers/Constants";

function ResidentialAddress() {
	const dispatch = useDispatch();
	const initialValues = useSelector(
		(state) => state.addresses.residentialAddress
	);

	const setAddress = (val) => {
		dispatch(setResidentialAddress(val));
	};

	const formHasErrors = (val) => {
		dispatch(changePageState({page: pageNumbers.residential, invalid: val}));
	};

	return (
		<div>
			<Typography variant="h4">Residential Address</Typography>
			<AddressInput setAddress={setAddress} formHasErrors={formHasErrors} initialValues={initialValues} />
		</div>
	);
}

export default ResidentialAddress;
