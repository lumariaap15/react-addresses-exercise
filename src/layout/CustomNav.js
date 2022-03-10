import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const CustomNav = () => {

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2 }}
					>
						Customer Addresses
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default CustomNav;
