import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import EmploymentAddress from "../pages/EmploymentAddress";
import PropertyAddress from "../pages/PropertyAddress";
import ResidentialAddress from "../pages/ResidentialAddress";
import { useDispatch, useSelector } from "react-redux";
import { next, previous } from "../store/pagesSlice";
import Confirmation from "../pages/Confirmation";

const steps = ["Residential Address", "Property Address", "Employment Address"];



export default function Main() {
    const activeStep = useSelector((state) => state.pages.activePage);
    const nextDisabled = useSelector((state) => state.pages.nextDisabled);
    const dispatch = useDispatch();

	const handleNext = () => {
        dispatch(next());
	};

    const pages = {
			"Residential Address": <ResidentialAddress handleNext={handleNext} />,
			"Property Address": <PropertyAddress />,
			"Employment Address": <EmploymentAddress />,
		};

	const handleBack = () => {
        dispatch(previous());
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<Confirmation />
			) : (
				<React.Fragment>
					<Box sx={{ py: 4 }}>{pages[steps[activeStep]]}</Box>

					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />

						<Button disabled={nextDisabled} onClick={handleNext}>
							{activeStep === steps.length - 1 ? "Finish" : "Next"}
						</Button>
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
