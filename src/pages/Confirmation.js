import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

function Confirmation() {
	const residentialAddress = useSelector(
		(state) => state.addresses.residentialAddress
	);
	const propertyAddress = useSelector(
		(state) => state.addresses.propertyAddress
	);
	const employmentAddress = useSelector(
		(state) => state.addresses.employmentAddress
	);
	const previousEmploymentAddress = useSelector(
		(state) => state.addresses.previousEmploymentAddress
	);

    const AddressComponent = ({address}) => {
			return (
				<Box>
					<Typography variant="p">
						{address.streetNumber} {address.streetName} {address.city}{" "}
						{address.province} {address.code}
					</Typography>
				</Box>
			);
		};

	return (
		<div>
			<Typography variant="h2" sx={{ mt: 4 }}>
				Confirmation
			</Typography>
			<Typography variant="h6" sx={{ mt: 4 }}>
				Residential Address
			</Typography>
			<AddressComponent address={residentialAddress} />
			<Typography variant="h6" sx={{ mt: 4 }}>
				Property Address
			</Typography>
			<AddressComponent address={propertyAddress} />
			<Typography variant="h6" sx={{ mt: 4 }}>
				Employment Address
			</Typography>
			<AddressComponent address={employmentAddress} />
			<Typography variant="h6" sx={{ mt: 4 }}>
				Previous Employments Address
			</Typography>
			{previousEmploymentAddress.map((address, idx) => {
				return <AddressComponent key={"add" + idx} address={address} />;
			})}
		</div>
	);
}

export default Confirmation;
