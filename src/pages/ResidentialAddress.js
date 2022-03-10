import AddressInput from "../components/AddressInput";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setResidentialAddress } from "../store/addressesSlice";
import { changePageState } from "../store/pagesSlice";

function ResidentialAddress({ handleNext }) {
	const dispatch = useDispatch();
	const initialValues = useSelector(
		(state) => state.addresses.residentialAddress
	);

	const setAddress = (val) => {
		dispatch(setResidentialAddress(val));
	};

	const formHasErrors = (val) => {
		dispatch(changePageState({page: 0, invalid: val}));
	};

	return (
		<div>
			<Typography variant="h4">Residential Address</Typography>
			<AddressInput setAddress={setAddress} formHasErrors={formHasErrors} initialValues={initialValues} />
		</div>
	);
}

export default ResidentialAddress;
